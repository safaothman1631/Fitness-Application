import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET() {
  try {
    // Get Firebase Storage stats (approximate)
    const collections = ['trainers', 'users', 'workouts', 'meals', 'programs']
    let totalDocuments = 0
    
    for (const collection of collections) {
      const snapshot = await adminDb.collection(collection).count().get()
      totalDocuments += snapshot.data().count
    }
    
    // Calculate approximate storage usage
    // Assuming average document size and storage limits
    const estimatedStorageUsed = Math.min(Math.round((totalDocuments / 10000) * 100), 95)
    
    return NextResponse.json({
      database: 'healthy',
      apiServer: 'running',
      storagePercent: estimatedStorageUsed || 12, // Default to 12% if no data
      lastChecked: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching system status:', error)
    return NextResponse.json(
      { 
        database: 'unknown',
        apiServer: 'running',
        storagePercent: 0,
        error: 'Failed to fetch system status' 
      },
      { status: 500 }
    )
  }
}
