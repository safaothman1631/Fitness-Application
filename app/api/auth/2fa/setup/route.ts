import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireAuth } from '@/lib/api-auth'
import * as speakeasy from 'speakeasy'
import * as QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { userId } = await request.json()

    if (user.uid !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `FitPro (${user.email || userId})`,
      length: 32
    })

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(secret.otpauth_url || '')

    // Save temporary secret to database (not enabled yet)
    await adminDb.collection('users').doc(userId).update({
      twoFactorSecret: secret.base32,
      twoFactorEnabled: false,
      twoFactorSetupInProgress: true,
      updatedAt: new Date()
    })

    return NextResponse.json({
      secret: secret.base32,
      qrCode: qrCodeDataUrl
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    console.error('Error setting up 2FA:', error)
    return NextResponse.json({ error: 'Failed to setup 2FA' }, { status: 500 })
  }
}
