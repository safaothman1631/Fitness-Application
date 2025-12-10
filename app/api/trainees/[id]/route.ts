import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, email, phone, goal, trainerId } = body
    const traineeId = params.id

    if (!name || !email || !trainerId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const traineeRef = adminDb.collection('trainees').doc(traineeId)
    const traineeDoc = await traineeRef.get()

    if (!traineeDoc.exists) {
      return NextResponse.json({ error: 'Trainee not found' }, { status: 404 })
    }

    const updateData = {
      name,
      email,
      phone: phone || '',
      goal: goal || '',
      updatedAt: new Date()
    }

    await traineeRef.update(updateData)

    const updated = await traineeRef.get()
    const data = updated.data()

    return NextResponse.json({
      id: updated.id,
      ...data
    })
  } catch (error) {
    console.error('Error updating trainee:', error)
    return NextResponse.json(
      { error: 'Failed to update trainee', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const traineeId = params.id

    const traineeRef = adminDb.collection('trainees').doc(traineeId)
    const traineeDoc = await traineeRef.get()

    if (!traineeDoc.exists) {
      return NextResponse.json({ error: 'Trainee not found' }, { status: 404 })
    }

    await traineeRef.delete()

    return NextResponse.json({ success: true, message: 'Trainee deleted successfully' })
  } catch (error) {
    console.error('Error deleting trainee:', error)
    return NextResponse.json(
      { error: 'Failed to delete trainee', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
