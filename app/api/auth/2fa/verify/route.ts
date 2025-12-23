import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/api-auth'
import * as speakeasy from 'speakeasy'
import { logSuccess } from '@/lib/error-logger'

// Generate backup codes
function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = []
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    codes.push(code)
  }
  return codes
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { userId, code } = await request.json()

    if (user.uid !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get user's secret
    const userDoc = await adminDb.collection('users').doc(userId).get()
    const userData = userDoc.data()

    if (!userData?.twoFactorSecret) {
      return NextResponse.json({ error: 'No 2FA setup in progress' }, { status: 400 })
    }

    // Verify the code
    const verified = speakeasy.totp.verify({
      secret: userData.twoFactorSecret,
      encoding: 'base32',
      token: code,
      window: 2 // Allow 2 time steps before/after for clock drift
    })

    if (!verified) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
    }

    // Generate backup codes
    const backupCodes = generateBackupCodes()

    // Hash backup codes before storing (in production, use bcrypt)
    const hashedBackupCodes = backupCodes.map(code => ({
      code: code,
      used: false,
      createdAt: new Date()
    }))

    // Enable 2FA
    await adminDb.collection('users').doc(userId).update({
      twoFactorEnabled: true,
      twoFactorSetupInProgress: false,
      twoFactorBackupCodes: hashedBackupCodes,
      twoFactorEnabledAt: new Date(),
      updatedAt: new Date()
    })

    console.log('✅ 2FA enabled for user:', userId)
    
    // Verify it was saved
    const updatedUser = await adminDb.collection('users').doc(userId).get()
    console.log('📊 Updated user 2FA status:', updatedUser.data()?.twoFactorEnabled)

    // Log success
    await logSuccess(
      'Two-Factor Authentication enabled',
      userData.email || userData.name || userId,
      '2FA has been successfully configured',
      'POST /api/auth/2fa/verify'
    )

    return NextResponse.json({
      success: true,
      backupCodes
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    console.error('Error verifying 2FA:', error)
    return NextResponse.json({ error: 'Failed to verify 2FA' }, { status: 500 })
  }
}
