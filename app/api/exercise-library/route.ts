import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Fetch all exercises from library
export async function GET(request: NextRequest) {
  try {
    const exercisesSnapshot = await adminDb
      .collection('exercise-library')
      .orderBy('savedAt', 'desc')
      .get()
    
    const exercises = exercisesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ exercises })
  } catch (error: any) {
    console.error('Error fetching exercise library:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercises', details: error.message },
      { status: 500 }
    )
  }
}

// POST - Save new exercise to library
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Exercise name is required' },
        { status: 400 }
      )
    }

    const exerciseData = {
      name: body.name,
      sets: body.sets || '',
      reps: body.reps || '',
      notes: body.notes || '',
      videoUrls: body.videoUrls || [],
      videos: body.videos || [],
      savedAt: new Date().toISOString(),
      createdBy: body.createdBy || 'unknown'
    }

    const docRef = await adminDb
      .collection('exercise-library')
      .add(exerciseData)
    
    const savedExercise = {
      id: docRef.id,
      ...exerciseData
    }

    return NextResponse.json(savedExercise, { status: 201 })
  } catch (error: any) {
    console.error('Error saving exercise:', error)
    return NextResponse.json(
      { error: 'Failed to save exercise', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE - Remove exercise from library
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Exercise ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('exercise-library').doc(id).delete()

    return NextResponse.json({ success: true, message: 'Exercise deleted' })
  } catch (error: any) {
    console.error('Error deleting exercise:', error)
    return NextResponse.json(
      { error: 'Failed to delete exercise', details: error.message },
      { status: 500 }
    )
  }
}
