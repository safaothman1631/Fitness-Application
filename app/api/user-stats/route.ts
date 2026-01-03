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
      .map(doc => {
        const data = doc.data()
        // Try different timestamp fields that might exist
        const timestamp = data.completedAt || data.createdAt || data.timestamp || data.date
        return timestamp?.toDate ? timestamp.toDate() : (timestamp ? new Date(timestamp) : null)
      })
      .filter(date => date && !isNaN(date.getTime()))
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

    // Fetch user progress - simplified to avoid index issues
    let overallProgress = 0
    try {
      const progressSnapshot = await adminDb
        .collection('progress')
        .where('userId', '==', userId)
        .limit(10)
        .get()

      if (!progressSnapshot.empty) {
        // Get the most recent progress by checking updatedAt client-side
        const progressDocs = progressSnapshot.docs
          .map(doc => doc.data())
          .filter(data => data.updatedAt)
          .sort((a, b) => {
            const aTime = a.updatedAt?.toDate?.() || new Date(a.updatedAt)
            const bTime = b.updatedAt?.toDate?.() || new Date(b.updatedAt)
            return bTime.getTime() - aTime.getTime()
          })
        
        if (progressDocs.length > 0) {
          overallProgress = Math.round(progressDocs[0].progressPercentage || 0)
        }
      }
    } catch (progressError) {
      console.warn('Could not fetch progress, using default:', progressError)
      overallProgress = 0
    }

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
