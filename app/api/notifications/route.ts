import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const physiotherapistId = searchParams.get('physiotherapistId')

    if (!physiotherapistId) {
      return NextResponse.json({ error: 'Physiotherapist ID is required' }, { status: 400 })
    }

    const notificationsRef = adminDb
      .collection('notifications')
      .where('physiotherapistId', '==', physiotherapistId)

    const snapshot = await notificationsRef.get()
    const notifications = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .sort((a: any, b: any) => {
        // Sort by timestamp descending (newest first)
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      })

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
    const { physiotherapistId, type, title, message, isRead = false } = body

    if (!physiotherapistId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: physiotherapistId, type, title, message' },
        { status: 400 }
      )
    }

    const notification = {
      physiotherapistId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead,
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
