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

    // Get activity logs (deletions and other tracked activities)
    const activityLogSnapshot = await adminDb.collection('activityLog').get()
    const activityLogs = activityLogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

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

    // Recent activity - Collect all activities from different sources
    const allActivities: any[] = []

    // 1. New user registrations
    users.forEach((user: any) => {
      if (user.createdAt?.toDate) {
        allActivities.push({
          action: 'New user registered',
          user: user.name || user.email || 'Unknown',
          time: user.createdAt.toDate(),
          timestamp: user.createdAt.toDate().getTime(),
          type: 'create',
          icon: 'UserPlus'
        })
      }
    })

    // 2. Pro requests
    const proRequests = proRequestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    proRequests.forEach((req: any) => {
      if (req.createdAt?.toDate) {
        allActivities.push({
          action: `Pro membership request - ${req.status || 'pending'}`,
          user: req.userName || req.userEmail || 'Unknown',
          time: req.createdAt.toDate(),
          timestamp: req.createdAt.toDate().getTime(),
          type: req.status === 'approved' ? 'success' : req.status === 'rejected' ? 'error' : 'pending',
          icon: 'Crown'
        })
      }
    })

    // 3. User updates (check for updatedAt field)
    users.forEach((user: any) => {
      if (user.updatedAt?.toDate) {
        const updatedDate = user.updatedAt.toDate()
        const createdDate = user.createdAt?.toDate?.() || new Date(0)
        // Only include if updated after creation (actual edit)
        if (updatedDate.getTime() > createdDate.getTime() + 60000) { // 1 minute buffer
          allActivities.push({
            action: 'User profile updated',
            user: user.name || user.email || 'Unknown',
            time: updatedDate,
            timestamp: updatedDate.getTime(),
            type: 'edit',
            icon: 'Edit'
          })
        }
      }
    })

    // 4. Membership renewals (users with recent subscription updates)
    users.forEach((user: any) => {
      if (user.subscriptionUpdatedAt?.toDate) {
        allActivities.push({
          action: `Membership renewed - ${user.membership || 'Free'}`,
          user: user.name || user.email || 'Unknown',
          time: user.subscriptionUpdatedAt.toDate(),
          timestamp: user.subscriptionUpdatedAt.toDate().getTime(),
          type: 'success',
          icon: 'RefreshCw'
        })
      }
    })

    // 5. Workout creations
    const workouts = workoutsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    workouts.forEach((workout: any) => {
      if (workout.createdAt?.toDate) {
        allActivities.push({
          action: `New workout created: ${workout.name || 'Untitled'}`,
          user: workout.createdBy || 'System',
          time: workout.createdAt.toDate(),
          timestamp: workout.createdAt.toDate().getTime(),
          type: 'create',
          icon: 'Dumbbell'
        })
      }
    })

    // 6. Activity logs (deletions, etc.)
    activityLogs.forEach((log: any) => {
      if (log.deletedAt?.toDate || log.timestamp) {
        const logTime = log.deletedAt?.toDate ? log.deletedAt.toDate() : new Date(log.timestamp)
        allActivities.push({
          action: log.action || 'Activity',
          user: log.user || 'Unknown',
          time: logTime,
          timestamp: logTime.getTime(),
          type: log.type || 'info',
          icon: log.icon || 'Activity'
        })
      }
    })

    // Sort by timestamp (most recent first) and take last 20
    const recentActivity = allActivities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20)
      .map(({ timestamp, ...activity }) => ({
        ...activity,
        time: new Date(timestamp).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
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
      recentActivity
    })
  } catch (error) {
    console.error("❌ Error fetching analytics:", error)
    return NextResponse.json({ 
      error: "Failed to fetch analytics", 
      details: String(error) 
    }, { status: 500 })
  }
}
