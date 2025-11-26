import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"

export const dynamic = 'force-dynamic'

// Get single workout
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const workoutRef = doc(db, "workouts", params.id)
    const workoutDoc = await getDoc(workoutRef)

    if (!workoutDoc.exists()) {
      return NextResponse.json({ error: "Workout not found" }, { status: 404 })
    }

    return NextResponse.json({ id: workoutDoc.id, ...workoutDoc.data() })
  } catch (error) {
    console.error("Error fetching workout:", error)
    return NextResponse.json({ error: "Failed to fetch workout" }, { status: 500 })
  }
}

// Update workout
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const workoutRef = doc(db, "workouts", params.id)

    await updateDoc(workoutRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: params.id, ...body })
  } catch (error) {
    console.error("Error updating workout:", error)
    return NextResponse.json({ error: "Failed to update workout" }, { status: 500 })
  }
}

// Delete workout
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const workoutRef = doc(db, "workouts", params.id)
    await deleteDoc(workoutRef)

    return NextResponse.json({ success: true, message: "Workout deleted" })
  } catch (error) {
    console.error("Error deleting workout:", error)
    return NextResponse.json({ error: "Failed to delete workout" }, { status: 500 })
  }
}
