import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Fetch user's workout history
    const workoutsSnapshot = await adminDb
      .collection('workouts')
      .where('userId', '==', userId)
      .get()

    const totalWorkouts = workoutsSnapshot.size

    // Calculate current streak
    const workoutDates = workoutsSnapshot.docs
      .map(doc => doc.data().completedAt?.toDate())
      .filter(date => date)
      .sort((a, b) => b.getTime() - a.getTime())

    let currentStreak = 0
    if (workoutDates.length > 0) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      let checkDate = new Date(today)
      for (const workoutDate of workoutDates) {
        const workout = new Date(workoutDate)
        workout.setHours(0, 0, 0, 0)
        
        if (workout.getTime() === checkDate.getTime()) {
          currentStreak++
          checkDate.setDate(checkDate.getDate() - 1)
        } else if (workout.getTime() < checkDate.getTime()) {
          break
        }
      }
    }

    // Fetch user progress
    const progressSnapshot = await adminDb
      .collection('progress')
      .where('userId', '==', userId)
      .orderBy('updatedAt', 'desc')
      .limit(1)
      .get()

    const overallProgress = progressSnapshot.empty
      ? 0
      : Math.round(progressSnapshot.docs[0].data().progressPercentage || 0)

    return NextResponse.json({
      totalWorkouts,
      currentStreak,
      overallProgress
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user stats', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
