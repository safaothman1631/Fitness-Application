import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"
import { adminAuth, adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all users or filter by role
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    const usersRef = collection(db, "users")

    if (role) {
      const q = query(usersRef, where("role", "==", role))
      const snapshot = await getDocs(q)
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return NextResponse.json(users)
    }

    const snapshot = await getDocs(usersRef)
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📝 Creating user with data:", { ...body, password: body.password ? "***" : undefined })
    
    const { email, name, firstName, lastName, phone, role, membership, subscriptionStatus, subscriptionEnd, password } = body

    if (!email || !name || !password) {
      console.error("❌ Missing required fields:", { email: !!email, name: !!name, password: !!password })
      return NextResponse.json({ error: "Missing required fields (email, name, password)" }, { status: 400 })
    }

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
    console.error("❌ Error creating user:", error)
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    return NextResponse.json({ 
      error: "Failed to create user",
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
