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
    
    // Get current patient data for comparison
    const patientDoc = await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).get()
    const currentData = patientDoc.data()
    
    await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).update({
      ...body,
      updatedAt: new Date().toISOString(),
    })
    
    // Determine what fields were updated (exclude metadata fields)
    const fieldsUpdated = Object.keys(body).filter(
      key => !['updatedAt', 'actorName', 'actorRole'].includes(key)
    )
    
    // Log activity
    await adminDb.collection("activity_logs").add({
      timestamp: new Date().toISOString(),
      action: "patient_updated",
      actorId: id,
      actorName: body.actorName || "Physiotherapist",
      actorRole: body.actorRole || "physiotherapist",
      targetType: "patient",
      targetId: patientId,
      targetName: currentData?.name || body.name || "Unknown Patient",
      details: {
        fieldsUpdated,
        changes: fieldsUpdated.reduce((acc, field) => {
          if (currentData?.[field] !== body[field]) {
            acc[field] = { from: currentData?.[field], to: body[field] }
          }
          return acc
        }, {} as Record<string, any>)
      },
      description: `Updated patient: ${currentData?.name || body.name || "Unknown"} (${fieldsUpdated.join(", ")})`
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
    
    // Check if patient exists and get data before deletion
    const patientDoc = await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).get()
    if (!patientDoc.exists) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }
    
    const patientData = patientDoc.data()

    // Delete the patient document
    await adminDb.doc(`physiotherapists/${id}/patients/${patientId}`).delete()
    
    // Log activity
    await adminDb.collection("activity_logs").add({
      timestamp: new Date().toISOString(),
      action: "patient_deleted",
      actorId: id,
      actorName: "Physiotherapist", // Can be passed from frontend if needed
      actorRole: "physiotherapist",
      targetType: "patient",
      targetId: patientId,
      targetName: patientData?.name || "Unknown Patient",
      details: {
        email: patientData?.email,
        condition: patientData?.condition,
        sessionCount: patientData?.sessionCount || 0,
        progress: patientData?.progress || 0,
        totalSessions: patientData?.sessions?.length || 0
      },
      description: `Deleted patient: ${patientData?.name}`
    })

    return NextResponse.json({ success: true, message: "Patient deleted successfully" })
  } catch (error) {
    console.error("Error deleting patient:", error)
    return NextResponse.json({ error: "Failed to delete patient", details: String(error) }, { status: 500 })
  }
}
