import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { requireAuth, requireRole, isAdmin } from "@/lib/api-auth"
import { UpdateUserSchema, validateRequestSafe, sanitizeObject } from "@/lib/validation"

export const dynamic = 'force-dynamic'

// Get single user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Allow user to view their own profile, or admin to view any profile
    const user = await requireAuth(request)
    if (user.uid !== params.id && !isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    const userRef = doc(db, "users", params.id)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ id: userDoc.id, ...userDoc.data() })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// Update user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Allow user to update their own profile, or admin to update any profile
    const user = await requireAuth(request)
    if (user.uid !== params.id && !isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    const rawBody = await request.json()
    
    // Validate and sanitize input
    const validation = validateRequestSafe(UpdateUserSchema, rawBody)
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)
    const userRef = doc(db, "users", params.id)

    await updateDoc(userRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: params.id, ...body })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Partial update user (PATCH)
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Allow user to update their own profile, or admin to update any profile
    const user = await requireAuth(request)
    if (user.uid !== params.id && !isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    
    const rawBody = await request.json()
    console.log('📝 Patching user:', params.id)
    
    // Validate and sanitize input
    const validation = validateRequestSafe(UpdateUserSchema, rawBody)
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)
    const userRef = doc(db, "users", params.id)

    await updateDoc(userRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    console.log('✅ User patched successfully')
    return NextResponse.json({ success: true, id: params.id, ...body })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error("Error patching user:", error)
    return NextResponse.json({ error: "Failed to patch user" }, { status: 500 })
  }
}

// Delete user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Only admins can delete users
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    
    const userRef = doc(db, "users", params.id)
    await deleteDoc(userRef)

    return NextResponse.json({ success: true, message: "User deleted" })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
