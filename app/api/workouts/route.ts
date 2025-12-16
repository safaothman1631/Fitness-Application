import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { requireAuth } from '@/lib/api-auth'
import { CreateWorkoutSchema, validateRequestSafe, sanitizeObject } from '@/lib/validation'
import { readRateLimit, writeRateLimit, checkRateLimit, getUserIdentifier, formatRateLimitError } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

// Get all workouts
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
    const workoutsRef = collection(db, "workouts")
    const snapshot = await getDocs(workoutsRef)
    const workouts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(workouts)
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    console.error("Error fetching workouts:", error)
    return NextResponse.json({ error: "Failed to fetch workouts" }, { status: 500 })
  }
}

// Create new workout
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
    
    const rawBody = await request.json()
    const validation = validateRequestSafe(CreateWorkoutSchema, rawBody)
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)

    const workoutsRef = collection(db, "workouts")
    const docRef = await addDoc(workoutsRef, {
      ...body,
      createdBy: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    console.error("Error creating workout:", error)
    return NextResponse.json({ error: "Failed to create workout" }, { status: 500 })
  }
}
