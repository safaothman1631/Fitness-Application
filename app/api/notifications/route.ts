import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const notificationsRef = adminDb
      .collection('notifications')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')

    const snapshot = await notificationsRef.get()
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json({ notifications })
  } catch (error: any) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message } = body

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, type, title, message' },
        { status: 400 }
      )
    }

    const notification = {
      userId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      createdAt: new Date().toISOString()
    }

    const docRef = await adminDb.collection('notifications').add(notification)

    return NextResponse.json({
      success: true,
      notification: { id: docRef.id, ...notification }
    })
  } catch (error: any) {
    console.error('Error creating notification:', error)
    return NextResponse.json(
      { error: 'Failed to create notification', details: error.message },
      { status: 500 }
    )
  }
}
