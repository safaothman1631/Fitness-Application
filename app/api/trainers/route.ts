import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    // Get trainers from users collection where role = "trainer"
    const trainersSnapshot = await adminDb
      .collection('users')
      .where('role', '==', 'trainer')
      .get()
    
    const trainers = trainersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({
      count: trainers.length,
      trainers
    })
  } catch (error) {
    console.error('Error fetching trainers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trainers' },
      { status: 500 }
    )
  }
}
