import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { requireAuth, requireRole, isAdminAsync } from "@/lib/api-auth"
import { UpdateUserSchema, validateRequestSafe, sanitizeObject } from "@/lib/validation"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  try {
    const user = await requireAuth(request)
    const userIsAdmin = await isAdminAsync(user)
    if (user.uid !== id && !userIsAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const userDoc = await adminDb.collection("users").doc(id).get()
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    return NextResponse.json({ id: userDoc.id, ...userDoc.data() })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  try {
    const user = await requireAuth(request)
    const userIsAdmin = await isAdminAsync(user)
    if (user.uid !== id && !userIsAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const rawBody = await request.json()
    const validation = validateRequestSafe(UpdateUserSchema, rawBody)
    if (!validation.success) {
      return NextResponse.json({ error: "Validation failed", details: validation.errors }, { status: 400 })
    }
    const body = sanitizeObject(validation.data)
    await adminDb.collection("users").doc(id).update({ ...body, updatedAt: new Date().toISOString() })
    return NextResponse.json({ success: true, id, ...body })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to patch user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const id = params.id
  try {
    await requireRole(request, ['admin', 'superadmin', 'owner'])
    await adminDb.collection("users").doc(id).delete()
    return NextResponse.json({ success: true, message: "User deleted" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}