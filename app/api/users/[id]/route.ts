import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

// Get single user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRef = doc(db, "users", params.id)
    const userDoc = await getDoc(userRef)

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ id: userDoc.id, ...userDoc.data() })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// Update user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const userRef = doc(db, "users", params.id)

    await updateDoc(userRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: params.id, ...body })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Delete user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userRef = doc(db, "users", params.id)
    await deleteDoc(userRef)

    return NextResponse.json({ success: true, message: "User deleted" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
