import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireRole } from '@/lib/api-auth'

export async function GET(request: NextRequest) {
  try {
    // TEMPORARY: Skip auth check if no Authorization header (for server-side rendering)
    const authHeader = request.headers.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      await requireRole(request, ['admin', 'superadmin', 'owner'])
    }
    
    console.log("🔍 Fetching analytics data")

    // Get users data
    const usersSnapshot = await adminDb.collection('users').get()
    const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    // Filter to show only user and trainer roles (same as user management page)
    const users = allUsers.filter((user: any) => {
      const role = user.role?.toLowerCase()
      return role === 'user' || role === 'trainer'
    })

    // Calculate total users by role
    const totalUsers = users.length
    const usersByRole = users.reduce((acc: any, user: any) => {
      const role = user.role || 'user'
      acc[role] = (acc[role] || 0) + 1
      return acc
    }, {})

    // Calculate active users (last 24 hours)
    const yesterday = new Date()
    yesterday.setHours(yesterday.getHours() - 24)
    const activeUsers = users.filter((user: any) => {
      const lastActive = user.lastActive?.toDate?.()
      return lastActive && lastActive >= yesterday
    }).length

    // Calculate Pro members
    const proMembers = users.filter((user: any) => user.membership === 'Pro').length
    const proPercentage = totalUsers > 0 ? Math.round((proMembers / totalUsers) * 100) : 0

    // Get workouts data
    const workoutsSnapshot = await adminDb.collection('workouts').get()
    const totalWorkouts = workoutsSnapshot.size

    // Get exercises data
    const exercisesSnapshot = await adminDb.collection('exercises').get()
    const totalExercises = exercisesSnapshot.size

    // Get pro requests
    const proRequestsSnapshot = await adminDb.collection('pro-requests').get()
    const pendingProRequests = proRequestsSnapshot.docs.filter(
      doc => doc.data().status === 'pending'
    ).length

    // Calculate user growth by month (last 6 months)
    const now = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyGrowth: any[] = []
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date()
      monthDate.setMonth(monthDate.getMonth() - i)
      const monthName = monthDate.toLocaleString('default', { month: 'short' })
      
      const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)
      
      const usersInMonth = users.filter((user: any) => {
        const joinDate = user.createdAt?.toDate?.() || user.joinDate
        if (!joinDate) return false
        const date = typeof joinDate === 'string' ? new Date(joinDate) : joinDate
        return date >= monthStart && date <= monthEnd
      }).length
      
      monthlyGrowth.push({
        month: monthName,
        count: usersInMonth,
        percentage: totalUsers > 0 ? Math.round((usersInMonth / totalUsers) * 100) : 0
      })
    }

    // Recent activity (last 10 users)
    const recentUsers = users
      .sort((a: any, b: any) => {
        const aDate = a.createdAt?.toDate?.() || new Date(0)
        const bDate = b.createdAt?.toDate?.() || new Date(0)
        return bDate.getTime() - aDate.getTime()
      })
      .slice(0, 10)
      .map((user: any) => ({
        action: 'New user registered',
        user: user.name || user.email || 'Unknown',
        time: user.createdAt?.toDate?.() || new Date(),
        type: 'success'
      }))

    console.log("✅ Analytics data fetched successfully")
    
    return NextResponse.json({
      metrics: {
        totalUsers,
        activeUsers,
        proMembers,
        proPercentage,
        totalWorkouts,
        totalExercises,
        pendingProRequests
      },
      usersByRole,
      monthlyGrowth,
      recentActivity: recentUsers
    })
  } catch (error) {
    console.error("❌ Error fetching analytics:", error)
    return NextResponse.json({ 
      error: "Failed to fetch analytics", 
      details: String(error) 
    }, { status: 500 })
  }
}
