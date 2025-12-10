import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all meal plans
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const traineeId = searchParams.get('traineeId')
    
    let query = adminDb.collection("meal_plans")
    
    if (traineeId) {
      query = query.where("traineeId", "==", traineeId) as any
    }
    
    const snapshot = await query.orderBy("createdAt", "desc").limit(100).get()
    const meals = snapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    }))
    
    return NextResponse.json(meals)
  } catch (error) {
    console.error("Error fetching meals:", error)
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 })
  }
}

// Create new meal plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      traineeName, 
      traineeId, 
      date, 
      mealType, 
      foods, 
      totalCalories, 
      notes,
      createdBy 
    } = body

    if (!traineeName || !traineeId || !mealType || !foods) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const mealData = {
      traineeName,
      traineeId,
      date: date || new Date().toISOString().split('T')[0],
      mealType,
      foods,
      totalCalories: totalCalories || foods.reduce((sum: number, f: any) => sum + (f.calories || 0), 0),
      notes: notes || "",
      createdBy: createdBy || "trainer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await adminDb.collection("meal_plans").add(mealData)

    return NextResponse.json({ id: docRef.id, ...mealData }, { status: 201 })
  } catch (error) {
    console.error("Error creating meal plan:", error)
    return NextResponse.json({ error: "Failed to create meal plan" }, { status: 500 })
  }
}
