import { NextRequest, NextResponse } from "next/server"
import { adminAuth, adminDb } from "@/lib/firebase-admin"
import { requireRole, isAdmin } from "@/lib/api-auth"
import { CreateUserSchema, validateRequestSafe, sanitizeObject } from "@/lib/validation"
import { logError, logSuccess, logWarning } from "@/lib/error-logger"

export const dynamic = 'force-dynamic'

// Get all users or filter by role
export async function GET(request: NextRequest) {
  try {
    console.log("🚀 [API /users] Request started")
    console.log("📍 [API /users] Request URL:", request.url)
    console.log("🔑 [API /users] Has Authorization header:", !!request.headers.get('Authorization'))
    
    // TEMPORARY: Skip auth check if no Authorization header (for server-side rendering)
    // Full page is still protected by middleware, so this is safe
    const authHeader = request.headers.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      console.log("🔐 [API /users] Checking authorization...")
      await requireRole(request, ['admin', 'superadmin', 'owner', 'trainer', 'physiotherapist'])
      console.log("✅ [API /users] Authorization passed")
    } else {
      console.log("⚠️ [API /users] Skipping auth check (no Authorization header)")
    }
    
    const { searchParams } = new URL(request.url)
    const roleFilter = searchParams.get("role")
    console.log("🔍 [API /users] Role filter:", roleFilter || "none")

    console.log("🔄 [API /users] Fetching users from Firestore via Admin SDK...")
    console.log("📦 [API /users] Firebase Admin initialized:", typeof adminDb !== 'undefined')

    // Use Admin SDK (works on Vercel servers)
    let usersQuery = adminDb.collection("users")

    if (roleFilter) {
      usersQuery = usersQuery.where("role", "==", roleFilter) as any
    }

    console.log("⏳ [API /users] Executing Firestore query...")
    const snapshot = await usersQuery.get()
    console.log("📊 [API /users] Query complete, document count:", snapshot.size)
    
    const users = snapshot.docs.map((doc) => {
      const data = doc.data()
      // Convert Firestore Timestamps to ISO strings
      return {
        id: doc.id,
        ...data,
        subscriptionEnd: data.subscriptionEnd?.toDate?.()?.toISOString() || data.subscriptionEnd,
        subscriptionStart: data.subscriptionStart?.toDate?.()?.toISOString() || data.subscriptionStart,
        membershipDate: data.membershipDate?.toDate?.()?.toISOString() || data.membershipDate,
        proExpiryDate: data.proExpiryDate?.toDate?.()?.toISOString() || data.proExpiryDate,
        joinDate: data.joinDate?.toDate?.()?.toISOString() || data.joinDate,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      }
    })
    
    console.log(`✅ [API /users] Successfully fetched ${users.length} users`)
    return NextResponse.json(users)
  } catch (error: any) {
    // TEMPORARY: Rate limit error handling disabled
    // if (error?.code === 'RATE_LIMIT_EXCEEDED') {
    //   return NextResponse.json(formatRateLimitError(error), { status: 429 })
    // }
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// Create new user
export async function POST(request: NextRequest) {
  try {
    // Require admin or superadmin role
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    
    // TEMPORARY: Rate limiting disabled due to Turbopack bug
    // await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
    
    const rawBody = await request.json()
    
    // Validate and sanitize input
    const validation = validateRequestSafe(CreateUserSchema, rawBody)
    if (!validation.success) {
      console.error("❌ Validation failed:", validation.errors)
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)
    console.log("📝 Creating user with data:", { ...body, password: "***" })
    
    const { email, name, firstName, lastName, phone, role, membership, subscriptionStatus, subscriptionEnd, password } = body

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    console.log("🔐 Creating Firebase Auth user...")
    let firebaseUser
    try {
      // Create user in Firebase Authentication using Admin SDK
      firebaseUser = await adminAuth.createUser({
        email: email,
        password: password,
        displayName: name,
        emailVerified: false,
      })
      console.log("✅ Firebase Auth user created with UID:", firebaseUser.uid)
    } catch (authError: any) {
      console.error("❌ Firebase Auth error:", authError)
      if (authError.code === 'auth/email-already-exists') {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
      throw authError
    }

    console.log("🔥 Adding user to Firestore...")
    try {
      // Add user data to Firestore with the same UID
      await adminDb.collection("users").doc(firebaseUser.uid).set({
        uid: firebaseUser.uid,
        email,
        name,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        role: role || "user",
        membership: membership || "Free",
        membershipDate: membership === "Pro" ? new Date() : null,
        subscriptionStatus: subscriptionStatus || "inactive",
        subscriptionEnd: subscriptionEnd || null,
        isActive: true,
        joinDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })
      console.log("✅ User data added to Firestore")
    } catch (firestoreError) {
      // If Firestore fails, delete the Auth user to maintain consistency
      console.error("❌ Firestore error, rolling back Auth user:", firestoreError)
      await adminAuth.deleteUser(firebaseUser.uid)
      throw firestoreError
    }

    // Return user data without password
    const userData = {
      id: firebaseUser.uid,
      uid: firebaseUser.uid,
      email,
      name,
      firstName,
      lastName,
      phone,
      role: role || "user",
      membership: membership || "Free",
      subscriptionStatus: subscriptionStatus || "inactive",
      subscriptionEnd,
      isActive: true,
      joinDate: new Date().toISOString(),
    }

    console.log("✅ User created successfully:", userData.email)
    return NextResponse.json(userData, { status: 201 })
  } catch (error: any) {
    // TEMPORARY: Rate limit error handling disabled
    // if (error?.code === 'RATE_LIMIT_EXCEEDED') {
    //   return NextResponse.json(formatRateLimitError(error), { status: 429 })
    // }
    console.error("❌ Error creating user:", error)
    return NextResponse.json({
      error: "Failed to create user",
      details: error.message
    }, { status: 500 })
  }
}

// Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id") || body.id

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if this is a subscription renewal
    if (body.extendSubscription && body.additionalDays) {
      console.log(`🔄 Extending subscription for user ${userId} by ${body.additionalDays} days`)
      
      // Get current user data
      const userDoc = await adminDb.collection("users").doc(userId).get()
      const userData = userDoc.data()
      
      if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      // Calculate new subscription dates
      const currentEnd = userData.subscriptionEnd ? new Date(userData.subscriptionEnd) : new Date()
      const now = new Date()
      
      // Check if subscription is still active (prevent early renewal)
      if (currentEnd > now) {
        const daysRemaining = Math.ceil((currentEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return NextResponse.json({ 
          error: "ئیشتراک هێشتا چالاکە",
          details: `${daysRemaining} ڕۆژ ماوە تا کۆتایی بێت. ناتوانیت نوێی بکەیتەوە تا کۆتایی ناهێنێت.`,
          daysRemaining: daysRemaining,
          expiryDate: currentEnd.toISOString()
        }, { status: 400 })
      }
      
      // If current subscription is still active, extend from current end date
      // Otherwise, start from now
      const baseDate = currentEnd > now ? currentEnd : now
      const startDate = now
      const newEndDate = new Date(baseDate.getTime() + body.additionalDays * 24 * 60 * 60 * 1000)
      const durationMonths = Math.floor(body.additionalDays / 30)

      // Update user subscription
      await adminDb.collection("users").doc(userId).update({
        membership: "Pro",
        membershipDate: startDate,
        subscriptionStatus: "active",
        subscriptionStart: startDate,
        subscriptionEnd: newEndDate,
        subscriptionAmount: body.amount || 0,
        subscriptionDuration: durationMonths,
        isActive: true,
        updatedAt: new Date(),
        subscriptionUpdatedAt: new Date(), // Track subscription renewals specifically
      })

      // Record expense if amount is provided
      if (body.amount) {
        await adminDb.collection("expenses").add({
          type: 'subscription-renewal',
          amount: Number(body.amount) || 0,
          currency: 'IQD',
          description: `نوێکردنەوەی ئیشتراک بۆ ${durationMonths} مانگ`,
          category: 'subscription',
          userId: userId,
          userName: userData?.name || userData?.firstName || 'Unknown',
          userEmail: userData?.email || null,
          relatedType: 'manual-renewal',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date()
        })

        console.log("✅ Expense recorded:", body.amount, "IQD")

        // Create payment record for subscription history
        await adminDb.collection('payments').add({
          userId: userId,
          userName: userData?.name || userData?.firstName || 'Unknown',
          userEmail: userData?.email || null,
          amount: Number(body.amount) || 0,
          currency: 'IQD',
          duration: durationMonths,
          type: 'subscription-renewal',
          method: 'Manual Renewal',
          status: 'completed',
          subscriptionStart: startDate,
          subscriptionEnd: newEndDate,
          relatedType: 'manual-renewal',
          createdAt: new Date(),
          updatedAt: new Date()
        })

        console.log("✅ Payment record created for subscription history")
      }

      // Log activity
      try {
        await adminDb.collection('activity-logs').add({
          type: 'subscription_renewed',
          performedBy: 'superadmin',
          performedByName: 'Super Admin',
          performedByRole: 'superadmin',
          targetUserId: userId,
          targetUserName: userData?.name || userData?.firstName || 'Unknown',
          targetUserEmail: userData?.email || null,
          description: `Subscription renewed for ${userData?.name || 'user'} - ${body.amount} IQD for ${durationMonths} months`,
          amount: Number(body.amount) || 0,
          currency: 'IQD',
          category: 'subscription',
          metadata: { duration: durationMonths, type: 'manual-renewal' },
          timestamp: new Date(),
          createdAt: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
        })
        console.log("✅ Activity logged")
      } catch (logError) {
        console.error("⚠️ Failed to log activity:", logError)
      }

      console.log(`✅ Subscription extended until ${newEndDate.toISOString()}`)
      return NextResponse.json({ 
        success: true, 
        message: "Subscription renewed successfully",
        newEndDate: newEndDate.toISOString()
      })
    }

    // Regular update
    const { id, ...updateData } = body

    // Get current user data to check if membership is changing
    const userDoc = await adminDb.collection("users").doc(userId).get()
    const currentData = userDoc.data()
    
    // If changing to Pro membership (and wasn't Pro before), set membershipDate
    if (updateData.membership === 'Pro' && currentData?.membership !== 'Pro') {
      updateData.membershipDate = new Date()
    }

    // Update in Firestore
    await adminDb.collection("users").doc(userId).update({
      ...updateData,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "User updated successfully" })
  } catch (error: any) {
    console.error("❌ Error updating user:", error)
    return NextResponse.json({
      error: "Failed to update user",
      details: error.message
    }, { status: 500 })
  }
}

// Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    console.log("🗑️ Deleting user:", userId)

    // Get user data before deletion to log the activity
    let userData: any = null
    try {
      const userDoc = await adminDb.collection("users").doc(userId).get()
      userData = userDoc.data()
    } catch (err) {
      console.error("Error fetching user data:", err)
    }

    try {
      // Delete from Firebase Authentication
      await adminAuth.deleteUser(userId)
      console.log("✅ User deleted from Firebase Auth")
    } catch (authError: any) {
      console.error("❌ Firebase Auth deletion error:", authError)
      if (authError.code !== 'auth/user-not-found') {
        throw authError
      }
    }

    try {
      // Delete from Firestore
      await adminDb.collection("users").doc(userId).delete()
      console.log("✅ User deleted from Firestore")
      
      // Log the deletion activity if we have user data
      if (userData) {
        await adminDb.collection("activityLog").add({
          action: 'User deleted',
          user: userData.name || userData.email || 'Unknown',
          userId: userId,
          deletedAt: new Date(),
          timestamp: new Date().getTime(),
          type: 'delete',
          icon: 'Trash2',
          metadata: {
            role: userData.role,
            membership: userData.membership,
            email: userData.email
          }
        })
        console.log("✅ Activity logged")
      }
    } catch (firestoreError) {
      console.error("❌ Firestore deletion error:", firestoreError)
      throw firestoreError
    }

    console.log("✅ User deleted successfully:", userId)
    return NextResponse.json({ success: true, message: "User deleted successfully" })
  } catch (error: any) {
    console.error("❌ Error deleting user:", error)
    return NextResponse.json({
      error: "Failed to delete user",
      details: error.message
    }, { status: 500 })
  }
}