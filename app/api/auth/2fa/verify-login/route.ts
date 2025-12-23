import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { requireAuth } from "@/lib/api-auth"
import * as speakeasy from "speakeasy"

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    const { userId, code, isBackupCode } = await request.json()

    if (user.uid !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get user data
    const userDoc = await adminDb.collection("users").doc(userId).get()
    const userData = userDoc.data()

    if (!userData?.twoFactorEnabled || !userData?.twoFactorSecret) {
      return NextResponse.json({ error: "2FA not enabled" }, { status: 400 })
    }

    let verified = false

    if (isBackupCode) {
      // Verify backup code
      const backupCodes = userData.backupCodes || []
      const matchingCode = backupCodes.find((bc: any) => bc.code === code && !bc.used)

      if (matchingCode) {
        verified = true
        
        // Mark backup code as used
        const updatedCodes = backupCodes.map((bc: any) =>
          bc.code === code ? { ...bc, used: true, usedAt: new Date().toISOString() } : bc
        )
        
        await adminDb.collection("users").doc(userId).update({
          backupCodes: updatedCodes
        })
      }
    } else {
      // Verify TOTP code
      verified = speakeasy.totp.verify({
        secret: userData.twoFactorSecret,
        encoding: "base32",
        token: code,
        window: 2 // Allow 2 time steps before/after for clock drift
      })
    }

    if (!verified) {
      return NextResponse.json(
        { error: isBackupCode ? "Invalid backup code" : "Invalid verification code" },
        { status: 400 }
      )
    }

    // Update last login
    await adminDb.collection("users").doc(userId).update({
      lastLogin: new Date().toISOString(),
      lastActive: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: "2FA verification successful"
    })

  } catch (error: any) {
    console.error("2FA verification error:", error)
    
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }
    
    return NextResponse.json(
      { error: "Verification failed", details: error.message },
      { status: 500 }
    )
  }
}
