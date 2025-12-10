import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const trainerId = searchParams.get('trainerId')

    if (!trainerId) {
      return NextResponse.json({ error: 'Trainer ID is required' }, { status: 400 })
    }

    // Fetch trainees for this trainer
    const traineesSnapshot = await adminDb
      .collection('trainees')
      .where('trainerId', '==', trainerId)
      .orderBy('joinDate', 'desc')
      .get()

    const trainees = traineesSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        goal: data.goal,
        joinDate: data.joinDate,
        progress: data.progress || 0,
        sessionsCompleted: data.sessionsCompleted || 0,
        isActive: data.isActive !== false
      }
    })

    return NextResponse.json(trainees)
  } catch (error) {
    console.error('Error fetching trainees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trainees', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { trainerId, name, email, phone, goal, joinDate, progress, sessionsCompleted, isActive } = body

    if (!trainerId || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const traineeData = {
      trainerId,
      name,
      email,
      phone: phone || '',
      goal: goal || '',
      joinDate: joinDate || new Date().toISOString().split('T')[0],
      progress: progress || 0,
      sessionsCompleted: sessionsCompleted || 0,
      isActive: isActive !== false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const docRef = await adminDb.collection('trainees').add(traineeData)

    return NextResponse.json({
      id: docRef.id,
      ...traineeData
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating trainee:', error)
    return NextResponse.json(
      { error: 'Failed to create trainee', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
