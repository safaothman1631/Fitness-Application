import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Update a physio request (mark as completed, change status)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    await adminDb.collection('physio-requests').doc(id).update({
      ...body,
      updatedAt: new Date().toISOString(),
    })

    const updatedDoc = await adminDb.collection('physio-requests').doc(id).get()
    
    return NextResponse.json({ 
      id: updatedDoc.id, 
      ...updatedDoc.data() 
    })
  } catch (error) {
    console.error("Error updating physio request:", error)
    return NextResponse.json({ error: "Failed to update physio request", details: String(error) }, { status: 500 })
  }
}

// Delete a physio request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await adminDb.collection('physio-requests').doc(id).delete()
    
    return NextResponse.json({ success: true, message: "Physio request deleted" })
  } catch (error) {
    console.error("Error deleting physio request:", error)
    return NextResponse.json({ error: "Failed to delete physio request", details: String(error) }, { status: 500 })
  }
}
