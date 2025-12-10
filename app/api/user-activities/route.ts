import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Fetch recent workouts
    const workoutsSnapshot = await adminDb
      .collection('workouts')
      .where('userId', '==', userId)
      .orderBy('completedAt', 'desc')
      .limit(limit)
      .get()

    const activities = workoutsSnapshot.docs.map(doc => {
      const data = doc.data()
      const completedAt = data.completedAt?.toDate()
      
      // Calculate time ago
      let timeAgo = 'Recently'
      if (completedAt) {
        const now = new Date()
        const diffMs = now.getTime() - completedAt.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        
        if (diffDays === 0) {
          timeAgo = 'Today'
        } else if (diffDays === 1) {
          timeAgo = 'Yesterday'
        } else if (diffDays < 7) {
          timeAgo = `${diffDays} days ago`
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7)
          timeAgo = `${weeks} week${weeks > 1 ? 's' : ''} ago`
        } else {
          const months = Math.floor(diffDays / 30)
          timeAgo = `${months} month${months > 1 ? 's' : ''} ago`
        }
      }

      // Format completed date
      const completedDate = completedAt
        ? `Completed on ${completedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
        : 'Recently'

      return {
        id: doc.id,
        workoutName: data.workoutName || data.name || 'Workout',
        duration: data.duration || 0,
        timeAgo,
        completedDate,
        status: data.status || 'Completed',
        completedAt: completedAt?.toISOString()
      }
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error('Error fetching user activities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activities', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
