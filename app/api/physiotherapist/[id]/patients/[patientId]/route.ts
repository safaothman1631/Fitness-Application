import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get a specific patient
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; patientId: string }> }
) {
  try {
    const { id, patientId } = await params
    const patientDoc = await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).get()

    if (!patientDoc.exists) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    return NextResponse.json({ id: patientDoc.id, ...patientDoc.data() })
  } catch (error) {
    console.error("Error fetching patient:", error)
    return NextResponse.json({ error: "Failed to fetch patient" }, { status: 500 })
  }
}

// Update a patient
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; patientId: string }> }
) {
  try {
    const body = await request.json()
    const { id, patientId } = await params
    await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).update({
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Patient updated successfully" })
  } catch (error) {
    console.error("Error updating patient:", error)
    return NextResponse.json({ error: "Failed to update patient" }, { status: 500 })
  }
}

// Delete a patient
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; patientId: string }> }
) {
  try {
    const { id, patientId } = await params
    console.log("DELETE patient params:", { id, patientId })
    
    // Check if patient exists
    const patientDoc = await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).get()
    if (!patientDoc.exists) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }

    // Delete the patient document
    await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).delete()

    return NextResponse.json({ success: true, message: "Patient deleted successfully" })
  } catch (error) {
    console.error("Error deleting patient:", error)
    return NextResponse.json({ error: "Failed to delete patient", details: String(error) }, { status: 500 })
  }
}
