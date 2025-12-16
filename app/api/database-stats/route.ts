import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    // TEMPORARY: Authentication disabled for server-side rendering
    // Page is protected by middleware, so only authenticated admins can access it
    // const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    // await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
    console.log("🔍 Fetching database statistics")

    // Get all collections
    const collections = ['users', 'programs', 'exercises', 'physiotherapists', 'patients', 'pro-requests', 'physio-requests']
    
    const stats = await Promise.all(
      collections.map(async (collectionName) => {
        try {
          let snapshot = await adminDb.collection(collectionName).get()
          
          // For programs collection, split into workout and nutrition
          if (collectionName === 'programs') {
            const workoutPrograms = snapshot.docs.filter(doc => doc.data().type === 'workout')
            const nutritionPrograms = snapshot.docs.filter(doc => doc.data().type === 'nutrition')
            
            let workoutSize = 0
            workoutPrograms.forEach(doc => {
              const data = JSON.stringify(doc.data())
              workoutSize += new Blob([data]).size
            })
            
            let nutritionSize = 0
            nutritionPrograms.forEach(doc => {
              const data = JSON.stringify(doc.data())
              nutritionSize += new Blob([data]).size
            })
            
            return [
              {
                name: 'workout-programs',
                count: workoutPrograms.length,
                size: workoutSize,
                status: 'healthy'
              },
              {
                name: 'nutrition-programs',
                count: nutritionPrograms.length,
                size: nutritionSize,
                status: 'healthy'
              }
            ]
          }
          
          // Calculate approximate size (rough estimation)
          let size = 0
          snapshot.docs.forEach(doc => {
            const data = JSON.stringify(doc.data())
            size += new Blob([data]).size
          })

          return {
            name: collectionName,
            count: snapshot.size,
            size: size,
            status: 'healthy'
          }
        } catch (error) {
          console.error(`Error fetching ${collectionName}:`, error)
          return {
            name: collectionName,
            count: 0,
            size: 0,
            status: 'error'
          }
        }
      })
    )
    
    // Flatten stats array (because programs returns 2 items)
    const flatStats = stats.flat()

    // Calculate totals (only count users and trainers for totalRecords)
    const userStats = flatStats.find(s => s.name === 'users')
    let totalUsers = 0
    if (userStats && userStats.count > 0) {
      // Get actual user and trainer counts
      const usersSnapshot = await adminDb.collection('users').get()
      usersSnapshot.docs.forEach(doc => {
        const role = doc.data().role?.toLowerCase()
        if (role === 'user' || role === 'trainer') {
          totalUsers++
        }
      })
    }
    
    const totalRecords = totalUsers // Only count users and trainers
    const totalSize = flatStats.reduce((sum, s) => sum + s.size, 0)

    // Get active connections (estimate based on recent activity - last 24h for users/trainers only)
    const recentTime = new Date()
    recentTime.setHours(recentTime.getHours() - 24)
    
    let activeConnections = 0
    try {
      const usersSnapshot = await adminDb
        .collection('users')
        .where('lastActive', '>=', recentTime.toISOString())
        .get()
      usersSnapshot.docs.forEach(doc => {
        const role = doc.data().role?.toLowerCase()
        if (role === 'user' || role === 'trainer') {
          activeConnections++
        }
      })
    } catch (error) {
      console.log('Could not fetch active connections')
    }

    console.log("✅ Database stats fetched successfully")
    
    return NextResponse.json({
      collections: flatStats,
      summary: {
        totalRecords,
        totalSize,
        activeConnections,
        uptime: 99.9 // This would come from Firebase status in production
      }
    })
  } catch (error: any) {
    // TEMPORARY: Rate limit error handling disabled
    // if (error?.code === 'RATE_LIMIT_EXCEEDED') {
    //   return NextResponse.json(formatRateLimitError(error), { status: 429 })
    // }
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error("❌ Error fetching database stats:", error)
    return NextResponse.json({ 
      error: "Failed to fetch database stats", 
      details: String(error) 
    }, { status: 500 })
  }
}
