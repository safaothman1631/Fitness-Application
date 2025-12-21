import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireRole } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // TEMPORARY: Skip auth check if no Authorization header (for server-side rendering)
    const authHeader = request.headers.get('Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      await requireRole(request, ['admin', 'superadmin', 'owner'])
    }
    
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'daily' // daily, weekly, monthly
    
    console.log(`📊 Fetching ${period} active users analytics`)

    // Calculate time range based on period
    const now = new Date()
    let startDate = new Date()
    
    switch (period) {
      case 'daily':
        startDate.setHours(startDate.getHours() - 24)
        break
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7)
        break
      case 'monthly':
        startDate.setDate(startDate.getDate() - 30)
        break
      default:
        startDate.setHours(startDate.getHours() - 24)
    }

    // Get users active since startDate
    const usersSnapshot = await adminDb
      .collection('users')
      .where('lastActive', '>=', startDate.toISOString())
      .get()

    const activeUsers: Array<{
      id: string
      email: string
      name: string
      role: string
      lastActive: string
      lastLogin: string
    }> = []
    const usersByRole: Record<string, number> = {}
    const usersByDay: Record<string, number> = {}

    usersSnapshot.forEach(doc => {
      const data = doc.data()
      activeUsers.push({
        id: doc.id,
        email: data.email,
        name: data.name,
        role: data.role,
        lastActive: data.lastActive,
        lastLogin: data.lastLogin
      })

      // Count by role
      const role = data.role || 'unknown'
      usersByRole[role] = (usersByRole[role] || 0) + 1

      // Count by day (for daily breakdown)
      if (period === 'weekly' || period === 'monthly') {
        const date = new Date(data.lastActive)
        const dayKey = date.toISOString().split('T')[0] // YYYY-MM-DD
        usersByDay[dayKey] = (usersByDay[dayKey] || 0) + 1
      }
    })

    // Get total users for comparison
    const allUsersSnapshot = await adminDb.collection('users').get()
    const totalUsers = allUsersSnapshot.size

    // Calculate percentage
    const activePercentage = totalUsers > 0 ? ((activeUsers.length / totalUsers) * 100).toFixed(1) : '0'

    console.log(`✅ Found ${activeUsers.length} active users out of ${totalUsers} total`)

    return NextResponse.json({
      period,
      startDate: startDate.toISOString(),
      endDate: now.toISOString(),
      totalUsers,
      activeUsers: activeUsers.length,
      activePercentage: parseFloat(activePercentage),
      usersByRole,
      usersByDay: period !== 'daily' ? usersByDay : undefined,
      users: activeUsers
    })

  } catch (error: any) {
    console.error('❌ Error fetching analytics:', error)
    return NextResponse.json({
      error: 'Failed to fetch analytics',
      details: String(error)
    }, { status: 500 })
  }
}
