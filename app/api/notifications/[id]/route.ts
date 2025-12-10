import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { isRead } = body

    if (typeof isRead !== 'boolean') {
      return NextResponse.json(
        { error: 'Read status must be a boolean' },
        { status: 400 }
      )
    }

    await adminDb.collection('notifications').doc(id).update({
      isRead,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ success: true, message: 'Notification updated' })
  } catch (error: any) {
    console.error('Error updating notification:', error)
    return NextResponse.json(
      { error: 'Failed to update notification', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await adminDb.collection('notifications').doc(id).delete()

    return NextResponse.json({ success: true, message: 'Notification deleted' })
  } catch (error: any) {
    console.error('Error deleting notification:', error)
    return NextResponse.json(
      { error: 'Failed to delete notification', details: error.message },
      { status: 500 }
    )
  }
}
