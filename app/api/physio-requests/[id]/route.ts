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

    // Get current request data
    const requestDoc = await adminDb.collection('physio-requests').doc(id).get()
    if (!requestDoc.exists) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }
    const requestData = requestDoc.data()

    // Update the request
    await adminDb.collection('physio-requests').doc(id).update({
      ...body,
      updatedAt: new Date().toISOString(),
    })

    // If status changed to "accepted", automatically create patient record
    if (body.status === "accepted" && requestData) {
      console.log("✅ Request accepted - Creating patient record for user:", requestData.userId)
      
      // Check if patient already exists
      const existingPatients = await adminDb
        .collection('physiotherapists')
        .doc(requestData.physioId)
        .collection('patients')
        .where('userId', '==', requestData.userId)
        .get()

      if (existingPatients.empty) {
        // Create new patient record
        const patientData = {
          userId: requestData.userId,
          name: requestData.userName || "Unknown User",
          email: requestData.userEmail || "",
          phone: requestData.userPhone || "",
          age: requestData.userAge || 0,
          gender: requestData.userGender || "",
          condition: requestData.injuryType || "Unknown",
          painLevel: requestData.painPercent || 0,
          notes: requestData.notes || "",
          joinDate: new Date().toISOString().split("T")[0],
          sessionCount: 0,
          progress: 0,
          isActive: true,
          physiotherapistId: requestData.physioId,
          requestId: id,
          // Add appointment info if provided
          appointment: body.appointment || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        console.log("🆕 Creating patient with data:", patientData)

        const newPatientRef = await adminDb
          .collection('physiotherapists')
          .doc(requestData.physioId)
          .collection('patients')
          .add(patientData)

        console.log("✅ Patient record created successfully with ID:", newPatientRef.id)
        console.log("📍 Collection path: physiotherapists/" + requestData.physioId + "/patients/" + newPatientRef.id)
      } else {
        console.log("ℹ️ Patient already exists, skipping creation")
      }
    }

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
