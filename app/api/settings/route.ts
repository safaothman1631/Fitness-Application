import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireAuth, isAdmin } from '@/lib/api-auth'
import { UpdateSettingsSchema, validateRequestSafe, sanitizeObject } from '@/lib/validation'
import { readRateLimit, writeRateLimit, checkRateLimit, getUserIdentifier, formatRateLimitError } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth(request)
    await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
    const { searchParams } = new URL(request.url)
    const physiotherapistId = searchParams.get('physiotherapistId')

    if (!physiotherapistId) {
      return NextResponse.json({ error: 'Physiotherapist ID is required' }, { status: 400 })
    }
    
    // User can only access their own settings, unless admin
    if (user.uid !== physiotherapistId && !isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth(request)
    await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
    
    const rawBody = await request.json()
    const targetUserId = rawBody.userId || rawBody.physiotherapistId
    
    if (!targetUserId) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: { userId: "User ID is required" }
      }, { status: 400 })
    }
    
    // User can only update their own settings, unless admin
    if (user.uid !== targetUserId && !isAdmin(user)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // If it's a physiotherapist with preferences format
    if (rawBody.preferences) {
      const validation = validateRequestSafe(UpdateSettingsSchema, rawBody)
      if (!validation.success) {
        return NextResponse.json({ 
          error: "Validation failed", 
          details: validation.errors 
        }, { status: 400 })
      }
      
      const body = sanitizeObject(validation.data)
      const settingsData = {
        physiotherapistId: targetUserId,
        preferences: body.preferences,
        updatedAt: new Date().toISOString()
      }

      await adminDb
        .collection('settings')
        .doc(targetUserId)
        .set(settingsData, { merge: true })
    } else {
      // General user settings - update user document directly
      const updateData: any = {
        updatedAt: new Date().toISOString()
      }
      
      if (rawBody.notificationsEnabled !== undefined) updateData.notificationsEnabled = rawBody.notificationsEnabled
      if (rawBody.darkMode !== undefined) updateData.darkMode = rawBody.darkMode
      if (rawBody.emailNotifications !== undefined) updateData.emailNotifications = rawBody.emailNotifications
      if (rawBody.language !== undefined) updateData.language = rawBody.language
      
      await adminDb
        .collection('users')
        .doc(targetUserId)
        .update(updateData)
    }

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    })
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }    console.error('Error saving settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings', details: error.message },
      { status: 500 }
    )
  }
}
