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

    // Check if user already has a pending or approved request
    const existingRequests = await adminDb
      .collection('pro-requests')
      .where('userId', '==', userId)
      .where('status', 'in', ['pending', 'approved'])
      .get()

    if (!existingRequests.empty) {
      const existingRequest = existingRequests.docs[0].data()
      console.log("⚠️ User already has an active request:", existingRequest.status)
      return NextResponse.json({ 
        error: "You already have an active Pro request",
        status: existingRequest.status
      }, { status: 400 })
    }

    // Check if user is already Pro
    const userDoc = await adminDb.collection('users').doc(userId).get()
    if (userDoc.exists && userDoc.data()?.membership === 'Pro') {
      console.log("⚠️ User is already Pro member")
      return NextResponse.json({ 
        error: "You are already a Pro member"
      }, { status: 400 })
    }

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
