import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export const dynamic = 'force-dynamic'

// Get single access key
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const keyRef = doc(db, "accessKeys", params.id)
    const keyDoc = await getDoc(keyRef)

    if (!keyDoc.exists()) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 })
    }

    return NextResponse.json({ id: keyDoc.id, ...keyDoc.data() })
  } catch (error) {
    console.error("Error fetching key:", error)
    return NextResponse.json({ error: "Failed to fetch key" }, { status: 500 })
  }
}

// Update access key (mark as used, etc)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const keyRef = doc(db, "accessKeys", params.id)

    await updateDoc(keyRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: params.id, ...body })
  } catch (error) {
    console.error("Error updating key:", error)
    return NextResponse.json({ error: "Failed to update key" }, { status: 500 })
  }
}

// Delete access key
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const keyRef = doc(db, "accessKeys", params.id)
    await deleteDoc(keyRef)

    return NextResponse.json({ success: true, message: "Key deleted" })
  } catch (error) {
    console.error("Error deleting key:", error)
    return NextResponse.json({ error: "Failed to delete key" }, { status: 500 })
  }
}
