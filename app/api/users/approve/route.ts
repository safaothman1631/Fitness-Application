import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { userId, action, adminId } = await request.json()

    if (!userId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: userId, action" },
        { status: 400 }
      )
    }

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 }
      )
    }

    // Get user document
    const userRef = adminDb.collection("users").doc(userId)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const newStatus = action === "approve" ? "approved" : "rejected"

    // Update user approval status
    await userRef.update({
      approvalStatus: newStatus,
      approvedAt: action === "approve" ? new Date().toISOString() : null,
      approvedBy: action === "approve" ? adminId : null,
    })

    // Log activity
    if (adminId) {
      await adminDb.collection("activityLogs").add({
        userId: adminId,
        action: action === "approve" ? "approve_user" : "reject_user",
        targetType: "user",
        targetId: userId,
        targetName: userData?.name || userData?.email || "Unknown",
        details: `${action === "approve" ? "Approved" : "Rejected"} user registration`,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      message: `User ${action}d successfully`,
      userId,
      newStatus,
    })
  } catch (error: any) {
    console.error("Error approving/rejecting user:", error)
    return NextResponse.json(
      { error: "Failed to process approval", details: error.message },
      { status: 500 }
    )
  }
}
