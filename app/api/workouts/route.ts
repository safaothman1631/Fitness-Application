import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"

// Get all workouts
export async function GET(request: NextRequest) {
  try {
    const workoutsRef = collection(db, "workouts")
    const snapshot = await getDocs(workoutsRef)
    const workouts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(workouts)
  } catch (error) {
    console.error("Error fetching workouts:", error)
    return NextResponse.json({ error: "Failed to fetch workouts" }, { status: 500 })
  }
}

// Create new workout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, category, duration, difficulty, description, exercises } = body

    if (!name || !category || !difficulty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const workoutsRef = collection(db, "workouts")
    const docRef = await addDoc(workoutsRef, {
      name,
      category,
      duration,
      difficulty,
      description: description || "",
      exercises: exercises || [],
      createdBy: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating workout:", error)
    return NextResponse.json({ error: "Failed to create workout" }, { status: 500 })
  }
}
