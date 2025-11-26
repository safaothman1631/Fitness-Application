import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

export const dynamic = 'force-dynamic'

// Get user settings
export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const settingsRef = doc(db, "settings", params.userId)
    const settingsDoc = await getDoc(settingsRef)

    if (!settingsDoc.exists()) {
      // Return default settings if none exist
      return NextResponse.json({
        notifications: { email: true, push: true, sms: false },
        privacy: { profileVisible: true, dataCollection: false },
      })
    }

    return NextResponse.json(settingsDoc.data())
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

// Update user settings
export async function PUT(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const body = await request.json()
    const settingsRef = doc(db, "settings", params.userId)

    await setDoc(
      settingsRef,
      {
        ...body,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return NextResponse.json(body)
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
