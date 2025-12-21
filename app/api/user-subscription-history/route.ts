import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    // Get user data
    const userDoc = await adminDb.collection("users").doc(userId).get()
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const rawUserData = userDoc.data()
    const userData = { 
      id: userDoc.id, 
      ...rawUserData,
      // Convert Firestore Timestamps to ISO strings
      subscriptionEnd: rawUserData?.subscriptionEnd?.toDate?.()?.toISOString() || rawUserData?.subscriptionEnd,
      subscriptionStart: rawUserData?.subscriptionStart?.toDate?.()?.toISOString() || rawUserData?.subscriptionStart,
      membershipDate: rawUserData?.membershipDate?.toDate?.()?.toISOString() || rawUserData?.membershipDate,
      proExpiryDate: rawUserData?.proExpiryDate?.toDate?.()?.toISOString() || rawUserData?.proExpiryDate,
      joinDate: rawUserData?.joinDate?.toDate?.()?.toISOString() || rawUserData?.joinDate,
    }

    // Get all payments for this user from 'payments' collection
    let payments: any[] = []
    try {
      const paymentsSnapshot = await adminDb
        .collection("payments")
        .where("userId", "==", userId)
        .get()

      payments = paymentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }))

      // Sort in memory instead of using orderBy
      payments.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA // Descending order
      })
    } catch (error) {
      console.error("Error fetching payments:", error)
      // Continue with empty payments array
    }

    // Calculate subscription statistics
    const totalPaid = payments.reduce((sum: number, payment: any) => 
      sum + (parseFloat(payment.amount) || 0), 0
    )

    const subscriptionCount = payments.length

    // Get pro upgrade dates
    const proUpgradeDates = payments.map((payment: any) => ({
      date: payment.createdAt,
      amount: payment.amount,
      duration: payment.duration || 1,
      method: payment.method || "Unknown"
    }))

    return NextResponse.json({
      user: userData,
      payments: payments,
      stats: {
        totalPaid,
        subscriptionCount,
        proUpgradeDates,
        currentMembership: (userData as any).membership || "Free",
        subscriptionStart: (userData as any).subscriptionStart,
        subscriptionEnd: (userData as any).subscriptionEnd,
        isActive: (userData as any).isActive || false
      }
    })

  } catch (error: any) {
    console.error("Error fetching subscription history:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscription history", details: error.message },
      { status: 500 }
    )
  }
}
