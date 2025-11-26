import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

export const dynamic = 'force-dynamic'

// Save or update physiotherapist profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { physiotherapistId, profileData, professionalData } = body

    if (!physiotherapistId) {
      return NextResponse.json(
        { error: "Physiotherapist ID is required" },
        { status: 400 }
      )
    }

    // Save profile data
    const profileDocRef = doc(db, "physiotherapists", physiotherapistId)
    await setDoc(
      profileDocRef,
      {
        profile: profileData,
        professional: professionalData,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    )

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Error saving profile:", error)
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    )
  }
}

// Get physiotherapist profile
export async function GET(request: NextRequest) {
  try {
    const physiotherapistId = request.nextUrl.searchParams.get("id")

    if (!physiotherapistId) {
      return NextResponse.json(
        { error: "Physiotherapist ID is required" },
        { status: 400 }
      )
    }

    const profileDocRef = doc(db, "physiotherapists", physiotherapistId)
    const profileDoc = await getDoc(profileDocRef)

    if (!profileDoc.exists()) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(profileDoc.data())
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}
