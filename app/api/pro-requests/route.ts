import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Fetch all Pro upgrade requests
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Fetching all Pro upgrade requests")

    const snapshot = await adminDb
      .collection('pro-requests')
      .orderBy('createdAt', 'desc')
      .get()

    console.log("📊 Found", snapshot.size, "Pro requests")

    const requests = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    }))

    console.log("✅ Returning", requests.length, "Pro requests")
    return NextResponse.json(requests)
  } catch (error) {
    console.error("❌ Error fetching Pro requests:", error)
    return NextResponse.json({ error: "Failed to fetch Pro requests", details: String(error) }, { status: 500 })
  }
}

// POST - Create a new Pro upgrade request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userEmail, userName, requestedDuration } = body

    console.log("📝 Creating Pro upgrade request:", { userId, userEmail, requestedDuration })

    const requestData = {
      userId,
      userEmail,
      userName: userName || 'Unknown User',
      requestedDuration: requestedDuration || 30, // Default 30 days
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const docRef = await adminDb.collection('pro-requests').add(requestData)

    console.log("✅ Pro request created with ID:", docRef.id)
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: "Pro upgrade request created successfully"
    })
  } catch (error) {
    console.error("❌ Error creating Pro request:", error)
    return NextResponse.json({ error: "Failed to create Pro request", details: String(error) }, { status: 500 })
  }
}
