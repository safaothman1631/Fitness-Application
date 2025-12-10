import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Fetch user achievements
    const achievementsSnapshot = await adminDb
      .collection('achievements')
      .where('userId', '==', userId)
      .orderBy('earnedAt', 'desc')
      .get()

    const achievements = achievementsSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        type: data.type,
        icon: data.icon,
        earnedAt: data.earnedAt?.toDate().toISOString(),
        points: data.points || 0
      }
    })

    return NextResponse.json(achievements)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
