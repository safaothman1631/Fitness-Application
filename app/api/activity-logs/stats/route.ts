import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// GET - Fetch activity statistics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get("period") || "month" // today, week, month

    const now = new Date()
    let startDate: Date

    if (period === "today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    } else if (period === "week") {
      startDate = new Date(now)
      startDate.setDate(now.getDate() - 7)
    } else { // month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    // Fetch all logs in the period
    const snapshot = await adminDb
      .collection("activity-logs")
      .where("timestamp", ">=", startDate)
      .get()

    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Calculate statistics
    const stats = {
      totalActivities: logs.length,
      
      // By type
      byType: {} as Record<string, number>,
      
      // By day
      byDay: {} as Record<string, number>,
      
      // By performer
      byPerformer: {} as Record<string, { count: number, name: string }>,
      
      // Financial stats
      totalRevenue: 0,
      totalExpenses: 0,
      
      // Recent activities (last 10)
      recentActivities: logs.slice(0, 10).map(log => ({
        id: log.id,
        type: log.type,
        description: log.description,
        performedByName: log.performedByName,
        timestamp: log.timestamp?.toDate?.()?.toISOString() || log.timestamp,
        amount: log.amount
      })),
      
      // Top actions
      topActions: [] as Array<{ type: string, count: number }>,
      
      // User activity
      usersCreated: 0,
      usersUpdated: 0,
      usersDeleted: 0,
      
      // PRO activity
      proApprovals: 0,
      subscriptionRenewals: 0,
      
      // Payment activity
      paymentsRecorded: 0,
      totalPayments: 0,
    }

    // Process logs
    logs.forEach(log => {
      // By type
      stats.byType[log.type] = (stats.byType[log.type] || 0) + 1

      // By day
      const day = new Date(log.timestamp?.toDate?.() || log.timestamp).toLocaleDateString()
      stats.byDay[day] = (stats.byDay[day] || 0) + 1

      // By performer
      if (log.performedBy) {
        if (!stats.byPerformer[log.performedBy]) {
          stats.byPerformer[log.performedBy] = { count: 0, name: log.performedByName || 'Unknown' }
        }
        stats.byPerformer[log.performedBy].count++
      }

      // Financial
      if (log.amount) {
        if (log.type.includes('payment') || log.type.includes('pro') || log.type.includes('subscription')) {
          stats.totalRevenue += parseFloat(log.amount) || 0
          stats.totalPayments += parseFloat(log.amount) || 0
        }
        if (log.type.includes('expense')) {
          stats.totalExpenses += parseFloat(log.amount) || 0
        }
      }

      // User activity
      if (log.type === 'user_created') stats.usersCreated++
      if (log.type === 'user_updated') stats.usersUpdated++
      if (log.type === 'user_deleted') stats.usersDeleted++

      // PRO activity
      if (log.type === 'pro_approved') stats.proApprovals++
      if (log.type === 'subscription_renewed') stats.subscriptionRenewals++

      // Payment activity
      if (log.type === 'payment_recorded') stats.paymentsRecorded++
    })

    // Top actions
    stats.topActions = Object.entries(stats.byType)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return NextResponse.json(stats)
  } catch (error: any) {
    console.error("Error fetching activity statistics:", error)
    return NextResponse.json(
      { error: "Failed to fetch statistics", details: error.message },
      { status: 500 }
    )
  }
}
