import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

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

    const profileDoc = await adminDb
      .collection("physiotherapists")
      .doc(physiotherapistId)
      .get()

    if (!profileDoc.exists) {
      // Return default empty profile
      return NextResponse.json({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        licenseNumber: "",
        specialization: "",
        location: "",
        experience: "",
        bio: "",
        certifications: ""
      })
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

// Save or update physiotherapist profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      physiotherapistId, 
      firstName,
      lastName,
      email,
      phone,
      licenseNumber,
      specialization,
      location,
      experience,
      bio,
      certifications
    } = body

    if (!physiotherapistId) {
      return NextResponse.json(
        { error: "Physiotherapist ID is required" },
        { status: 400 }
      )
    }

    // Save profile data
    await adminDb
      .collection("physiotherapists")
      .doc(physiotherapistId)
      .set(
        {
          firstName,
          lastName,
          email,
          phone,
          licenseNumber,
          specialization,
          location,
          experience,
          bio,
          certifications,
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
