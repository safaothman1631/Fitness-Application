import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 Starting database backup...")

    // Get all collections
    const collections = ['users', 'workouts', 'exercises', 'physiotherapists', 'patients', 'pro-requests', 'physio-requests']
    
    const backupData: any = {
      timestamp: new Date().toISOString(),
      collections: {}
    }

    // Backup each collection
    for (const collectionName of collections) {
      try {
        const snapshot = await adminDb.collection(collectionName).get()
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        backupData.collections[collectionName] = docs
        console.log(`✅ Backed up ${collectionName}: ${docs.length} documents`)
      } catch (error) {
        console.error(`❌ Error backing up ${collectionName}:`, error)
        backupData.collections[collectionName] = { error: String(error) }
      }
    }

    // Calculate backup size
    const backupString = JSON.stringify(backupData)
    const backupSize = new Blob([backupString]).size

    // Save backup metadata
    const backupMetadata = {
      timestamp: new Date(),
      size: backupSize,
      collections: Object.keys(backupData.collections).length,
      status: 'success'
    }

    await adminDb.collection('backups').add(backupMetadata)

    console.log("✅ Backup completed successfully")
    
    return NextResponse.json({
      success: true,
      backup: backupData,
      metadata: {
        ...backupMetadata,
        timestamp: backupMetadata.timestamp.toISOString()
      }
    })
  } catch (error) {
    console.error("❌ Error creating backup:", error)
    return NextResponse.json({ 
      error: "Failed to create backup", 
      details: String(error) 
    }, { status: 500 })
  }
}

// GET - Fetch recent backups
export async function GET(request: NextRequest) {
  try {
    const snapshot = await adminDb
      .collection('backups')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get()

    const backups = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
    }))

    return NextResponse.json(backups)
  } catch (error) {
    console.error("❌ Error fetching backups:", error)
    return NextResponse.json({ error: "Failed to fetch backups" }, { status: 500 })
  }
}
