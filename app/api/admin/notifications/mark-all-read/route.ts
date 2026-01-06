import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const notificationsRef = adminDb.collection('admin_notifications')
    const snapshot = await notificationsRef.get()

    const batch = adminDb.batch()
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { isRead: true })
    })

    await batch.commit()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error marking notifications as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark notifications as read', details: error.message },
      { status: 500 }
    )
  }
}
