import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { targetAudience, type, title, message } = body

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      )
    }

    // Get target users based on audience
    let usersQuery = adminDb.collection('users')
    
    if (targetAudience && targetAudience !== 'all') {
      usersQuery = usersQuery.where('role', '==', targetAudience)
    }

    const usersSnapshot = await usersQuery.get()
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    // Create notifications for each user
    const batch = adminDb.batch()
    const timestamp = new Date().toISOString()
    let sentCount = 0

    for (const user of users) {
      const notificationRef = adminDb.collection('notifications').doc()
      batch.set(notificationRef, {
        userId: user.id,
        type: type || 'info',
        title,
        message,
        timestamp,
        isRead: false,
        createdAt: timestamp,
        sentBy: 'superadmin'
      })
      sentCount++
    }

    // Also save to admin_notifications for tracking
    const adminNotificationRef = adminDb.collection('admin_notifications').doc()
    batch.set(adminNotificationRef, {
      targetAudience,
      type: type || 'info',
      title,
      message,
      timestamp,
      sentCount,
      sentBy: 'superadmin',
      createdAt: timestamp
    })

    await batch.commit()

    return NextResponse.json({
      success: true,
      sentCount,
      message: `Notification sent to ${sentCount} users`
    })
  } catch (error: any) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification', details: error.message },
      { status: 500 }
    )
  }
}
