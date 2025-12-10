import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all workout plans
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const traineeId = searchParams.get('traineeId')
    
    let query = adminDb.collection("workout_plans")
    
    if (traineeId) {
      query = query.where("traineeId", "==", traineeId) as any
    }
    
    const snapshot = await query.orderBy("createdAt", "desc").limit(100).get()
    const workouts = snapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }))
    
    return NextResponse.json(workouts)
  } catch (error) {
    console.error("Error fetching workout plans:", error)
    return NextResponse.json({ error: "Failed to fetch workout plans" }, { status: 500 })
  }
}

// Create new workout plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      traineeName, 
      traineeId, 
      date, 
      workoutType, 
      exercises, 
      totalDuration, 
      difficulty,
      notes,
      createdBy 
    } = body

    if (!traineeName || !traineeId || !workoutType || !exercises || !difficulty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const workoutData = {
      traineeName,
      traineeId,
      date: date || new Date().toISOString().split('T')[0],
      workoutType,
      exercises,
      totalDuration: totalDuration || 60,
      difficulty,
      notes: notes || "",
      createdBy: createdBy || "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await adminDb.collection("workout_plans").add(workoutData)

    return NextResponse.json({ id: docRef.id, ...workoutData }, { status: 201 })
  } catch (error) {
    console.error("Error creating workout plan:", error)
    return NextResponse.json({ error: "Failed to create workout plan" }, { status: 500 })
  }
}
