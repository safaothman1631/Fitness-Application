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
    const snapshot = await adminDb.collection(`physiotherapists/${id}/patients`).get()
    const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
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
    
    const docRef = await adminDb.collection(`physiotherapists/${id}/patients`).add({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    
    console.log("Patient created with ID:", docRef.id)
    const responseData = {
      id: docRef.id,
      ...body,
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
