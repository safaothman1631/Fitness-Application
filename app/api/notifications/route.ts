import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    // TEMPORARY: Skip auth check if no Authorization header (for server-side rendering)
    const authHeader = request.headers.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      await requireAuth(request)
    }
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const physiotherapistId = searchParams.get('physiotherapistId')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    // Support both userId and physiotherapistId for backwards compatibility
    const targetId = userId || physiotherapistId

    if (!targetId) {
      return NextResponse.json({ error: 'userId or physiotherapistId is required' }, { status: 400 })
    }

    let notificationsRef = adminDb.collection('notifications')
    
    // Check both userId and physiotherapistId fields
    if (userId) {
      notificationsRef = notificationsRef.where('userId', '==', userId)
    } else {
      notificationsRef = notificationsRef.where('physiotherapistId', '==', physiotherapistId)
    }

    if (unreadOnly) {
      notificationsRef = notificationsRef.where('read', '==', false)
    }

    const snapshot = await notificationsRef.get()
    const notifications = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .sort((a: any, b: any) => {
        // Sort by timestamp descending (newest first)
        const timeA = new Date(a.timestamp || a.createdAt).getTime()
        const timeB = new Date(b.timestamp || b.createdAt).getTime()
        return timeB - timeA
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
    const { userId, physiotherapistId, type, title, message, read = false, link } = body

    // Support both userId and physiotherapistId
    const targetId = userId || physiotherapistId
    const targetField = userId ? 'userId' : 'physiotherapistId'

    if (!targetId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId/physiotherapistId, type, title, message' },
        { status: 400 }
      )
    }

    const notification: any = {
      [targetField]: targetId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read,
      createdAt: new Date().toISOString()
    }

    if (link) {
      notification.link = link
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

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationId, notificationIds, read, userId, markAllAsRead } = body

    // Mark all as read for a user
    if (markAllAsRead && userId) {
      const unreadSnapshot = await adminDb
        .collection('notifications')
        .where('userId', '==', userId)
        .where('read', '==', false)
        .get()

      const batch = adminDb.batch()
      unreadSnapshot.docs.forEach(doc => {
        batch.update(doc.ref, { read: true, updatedAt: new Date().toISOString() })
      })

      await batch.commit()

      return NextResponse.json({
        success: true,
        unreadCount: 0,
        markedCount: unreadSnapshot.size
      })
    }

    // Mark multiple notifications as read
    if (notificationIds && Array.isArray(notificationIds)) {
      const batch = adminDb.batch()
      notificationIds.forEach(id => {
        const docRef = adminDb.collection('notifications').doc(id)
        batch.update(docRef, { read: true, updatedAt: new Date().toISOString() })
      })

      await batch.commit()

      if (userId) {
        const unreadSnapshot = await adminDb
          .collection('notifications')
          .where('userId', '==', userId)
          .where('read', '==', false)
          .get()

        return NextResponse.json({
          success: true,
          unreadCount: unreadSnapshot.size
        })
      }

      return NextResponse.json({ success: true })
    }

    // Mark single notification as read
    if (!notificationId) {
      return NextResponse.json(
        { error: 'notificationId or notificationIds is required' },
        { status: 400 }
      )
    }

    const updateData: any = {
      updatedAt: new Date().toISOString()
    }

    if (typeof read === 'boolean') {
      updateData.read = read
    }

    await adminDb.collection('notifications').doc(notificationId).update(updateData)

    // If marking as read and userId provided, return updated unread count
    if (read && userId) {
      const unreadSnapshot = await adminDb
        .collection('notifications')
        .where('userId', '==', userId)
        .where('read', '==', false)
        .get()

      return NextResponse.json({
        success: true,
        unreadCount: unreadSnapshot.size
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating notification:', error)
    return NextResponse.json(
      { error: 'Failed to update notification', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationId, notificationIds, userId, deleteAll } = body

    // Delete all notifications for a user
    if (deleteAll && userId) {
      const snapshot = await adminDb
        .collection('notifications')
        .where('userId', '==', userId)
        .get()

      const batch = adminDb.batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })

      await batch.commit()

      return NextResponse.json({
        success: true,
        deletedCount: snapshot.size
      })
    }

    // Delete multiple notifications
    if (notificationIds && Array.isArray(notificationIds)) {
      const batch = adminDb.batch()
      notificationIds.forEach(id => {
        batch.delete(adminDb.collection('notifications').doc(id))
      })

      await batch.commit()

      if (userId) {
        const unreadSnapshot = await adminDb
          .collection('notifications')
          .where('userId', '==', userId)
          .where('read', '==', false)
          .get()

        return NextResponse.json({
          success: true,
          deletedCount: notificationIds.length,
          unreadCount: unreadSnapshot.size
        })
      }

      return NextResponse.json({
        success: true,
        deletedCount: notificationIds.length
      })
    }

    // Delete single notification
    if (!notificationId) {
      return NextResponse.json(
        { error: 'notificationId or notificationIds is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('notifications').doc(notificationId).delete()

    if (userId) {
      const unreadSnapshot = await adminDb
        .collection('notifications')
        .where('userId', '==', userId)
        .where('read', '==', false)
        .get()

      return NextResponse.json({
        success: true,
        unreadCount: unreadSnapshot.size
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting notification:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification', details: error.message },
      { status: 500 }
    )
  }
}
