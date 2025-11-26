import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Fetching database statistics")

    // Get all collections
    const collections = ['users', 'workouts', 'exercises', 'physiotherapists', 'patients', 'pro-requests', 'physio-requests']
    
    const stats = await Promise.all(
      collections.map(async (collectionName) => {
        try {
          const snapshot = await adminDb.collection(collectionName).get()
          
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

    // Calculate totals
    const totalRecords = stats.reduce((sum, s) => sum + s.count, 0)
    const totalSize = stats.reduce((sum, s) => sum + s.size, 0)

    // Get active connections (estimate based on recent activity)
    const recentTime = new Date()
    recentTime.setHours(recentTime.getHours() - 1)
    
    let activeConnections = 0
    try {
      const usersSnapshot = await adminDb
        .collection('users')
        .where('lastActive', '>=', recentTime)
        .get()
      activeConnections = usersSnapshot.size
    } catch (error) {
      console.log('Could not fetch active connections')
    }

    console.log("✅ Database stats fetched successfully")
    
    return NextResponse.json({
      collections: stats,
      summary: {
        totalRecords,
        totalSize,
        activeConnections,
        uptime: 99.9 // This would come from Firebase status in production
      }
    })
  } catch (error) {
    console.error("❌ Error fetching database stats:", error)
    return NextResponse.json({ 
      error: "Failed to fetch database stats", 
      details: String(error) 
    }, { status: 500 })
  }
}
