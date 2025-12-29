import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    
    const userDoc = await adminDb
      .collection('users')
      .doc(user.uid)
      .get()

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userData = userDoc.data()
    
    // Return notification preferences with defaults
    const preferences = {
      notifyEmail: userData?.notifyEmail ?? true,
      notifyPush: userData?.notifyPush ?? true,
      notifySMS: userData?.notifySMS ?? false,
      notifyWorkout: userData?.notifyWorkout ?? true,
      notifyMeals: userData?.notifyMeals ?? true,
      notifyPhysio: userData?.notifyPhysio ?? false,
    }

    return NextResponse.json({ preferences })
  } catch (error: any) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    console.error('Error fetching notification preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notification preferences', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const body = await request.json()
    
    const updateData: any = {
      updatedAt: new Date().toISOString()
    }
    
    // Update only provided notification preferences
    if (body.notifyEmail !== undefined) updateData.notifyEmail = Boolean(body.notifyEmail)
    if (body.notifyPush !== undefined) updateData.notifyPush = Boolean(body.notifyPush)
    if (body.notifySMS !== undefined) updateData.notifySMS = Boolean(body.notifySMS)
    if (body.notifyWorkout !== undefined) updateData.notifyWorkout = Boolean(body.notifyWorkout)
    if (body.notifyMeals !== undefined) updateData.notifyMeals = Boolean(body.notifyMeals)
    if (body.notifyPhysio !== undefined) updateData.notifyPhysio = Boolean(body.notifyPhysio)
    
    await adminDb
      .collection('users')
      .doc(user.uid)
      .update(updateData)

    return NextResponse.json({ 
      success: true,
      message: 'Notification preferences updated successfully' 
    })
  } catch (error: any) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    console.error('Error updating notification preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update notification preferences', details: error.message },
      { status: 500 }
    )
  }
}
