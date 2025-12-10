import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { physiotherapistId, currentPassword, newPassword } = body

    if (!physiotherapistId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields: physiotherapistId, currentPassword, newPassword' },
        { status: 400 }
      )
    }

    // Get the user document
    const userDoc = await adminDb
      .collection('users')
      .doc(physiotherapistId)
      .get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const userData = userDoc.data()

    // Verify current password
    // For demo purposes, we'll check if password field exists
    // In production, you should use proper password verification
    if (userData?.password) {
      const isPasswordValid = await bcrypt.compare(currentPassword, userData.password)
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 401 }
        )
      }
    } else {
      // If no password exists (demo mode), just verify it matches a demo password
      if (currentPassword !== 'demo123' && currentPassword !== '123456') {
        return NextResponse.json(
          { error: 'Current password is incorrect. Try "demo123" or "123456"' },
          { status: 401 }
        )
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the password
    await adminDb
      .collection('users')
      .doc(physiotherapistId)
      .update({
        password: hashedPassword,
        passwordUpdatedAt: new Date().toISOString()
      })

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating password:', error)
    return NextResponse.json(
      { error: 'Failed to update password', details: error.message },
      { status: 500 }
    )
  }
}
