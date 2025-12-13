import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all patients for a physiotherapist
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log("Fetching patients for physiotherapist ID:", id)
    
    // Query from the main physiotherapist_patients collection
    const snapshot = await adminDb
      .collection("physiotherapist_patients")
      .where("physiotherapistId", "==", id)
      .get()
    
    const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    console.log(`Found ${patients.length} patients for physio ${id}`)
    
    return NextResponse.json(patients)
  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
  }
}

// Create a new patient
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log("Creating patient for physiotherapist:", id)
    const body = await request.json()
    console.log("Patient data:", body)
    
    // Get physiotherapist info
    const physioDoc = await adminDb.collection("users").doc(id).get()
    const physioData = physioDoc.data()
    
    // Add to main collection with physiotherapist reference
    const docRef = await adminDb.collection("physiotherapist_patients").add({
      ...body,
      physiotherapistId: id,
      physiotherapistName: physioData?.name || "Unknown",
      sessionPrice: body.sessionPrice || 50, // Default price if not provided
      status: body.status || "active", // Default status is active
      notes: body.notes || "", // Optional notes
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    
    // Log activity
    await adminDb.collection("activity_logs").add({
      timestamp: new Date().toISOString(),
      action: "patient_created",
      actorId: id,
      actorName: body.actorName || "Physiotherapist",
      actorRole: "physiotherapist",
      targetType: "patient",
      targetId: docRef.id,
      targetName: body.name,
      details: {
        email: body.email,
        condition: body.condition,
        age: body.age
      },
      description: `Created new patient: ${body.name}`
    })
    
    console.log("Patient created with ID:", docRef.id)
    const responseData = {
      id: docRef.id,
      ...body,
      physiotherapistId: id,
      physiotherapistName: physioData?.name || "Unknown",
      sessionPrice: body.sessionPrice || 50,
      status: body.status || "active",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    console.log("Sending response:", responseData)
    return NextResponse.json(responseData, { status: 201 })
  } catch (error) {
    console.error("Error creating patient:", error)
    return NextResponse.json({ error: "Failed to create patient", details: String(error) }, { status: 500 })
  }
}
