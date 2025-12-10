import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const physiotherapistId = searchParams.get('physiotherapistId')

    if (!physiotherapistId) {
      return NextResponse.json({ error: 'Physiotherapist ID is required' }, { status: 400 })
    }

    const settingsDoc = await adminDb
      .collection('settings')
      .doc(physiotherapistId)
      .get()

    if (!settingsDoc.exists) {
      // Return default preferences if not found
      return NextResponse.json({
        preferences: {
          patientMessages: true,
          appointmentReminders: true,
          progressAlerts: true,
          emailNotifications: false,
        }
      })
    }

    return NextResponse.json(settingsDoc.data())
  } catch (error: any) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { physiotherapistId, preferences } = body

    if (!physiotherapistId || !preferences) {
      return NextResponse.json(
        { error: 'Missing required fields: physiotherapistId, preferences' },
        { status: 400 }
      )
    }

    const settingsData = {
      physiotherapistId,
      preferences,
      updatedAt: new Date().toISOString()
    }

    await adminDb
      .collection('settings')
      .doc(physiotherapistId)
      .set(settingsData, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    })
  } catch (error: any) {
    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings', details: error.message },
      { status: 500 }
    )
  }
}
