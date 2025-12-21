import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { requireAuth } from "@/lib/api-auth"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    // Require authentication
    const user = await requireAuth(request)
    if (user.uid !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get user document from Firestore
    const userDoc = await adminDb.collection("users").doc(userId).get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const userData = userDoc.data()!

    return NextResponse.json(
      {
        uid: userId,
        email: userData.email,
        displayName: userData.displayName || null,
        role: userData.role || "user",
        photoURL: userData.photoURL || null,
        approvedDate: userData.approvedDate || null,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error fetching user settings:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    )
  }
}
