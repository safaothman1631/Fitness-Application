import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all physio requests for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    console.log("🔍 Fetching physio requests for userId:", userId)

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 })
    }

    const snapshot = await adminDb
      .collection('physio-requests')
      .where('userId', '==', userId)
      .get()

    console.log("📊 Found", snapshot.size, "requests for user:", userId)

    const requests = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }))

    // Sort by createdAt in JavaScript (descending - newest first)
    requests.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateB - dateA
    })

    console.log("✅ Returning", requests.length, "requests")
    return NextResponse.json(requests)
  } catch (error) {
    console.error("❌ Error fetching physio requests:", error)
    return NextResponse.json({ error: "Failed to fetch physio requests", details: String(error) }, { status: 500 })
  }
}

// Create a new physio request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userName, physioId, physioName, injuryType, painPercent, notes } = body

    console.log("📝 Creating physio request:", { userId, userName, physioId, physioName, injuryType })

    if (!userId || !physioId || !injuryType) {
      console.error("❌ Missing required fields:", { userId: !!userId, physioId: !!physioId, injuryType: !!injuryType })
      return NextResponse.json({ 
        error: "Missing required fields", 
        details: "userId, physioId, and injuryType are required" 
      }, { status: 400 })
    }

    const requestData = {
      userId,
      userName: userName || "User",
      physioId,
      physioName: physioName || "Unknown",
      injuryType,
      painPercent: painPercent || 0,
      notes: notes || "",
      status: "pending",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await adminDb.collection('physio-requests').add(requestData)

    const newRequest = {
      id: docRef.id,
      ...requestData
    }

    console.log("✅ Created physio request:", docRef.id, "for user:", userId)
    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error("❌ Error creating physio request:", error)
    return NextResponse.json({ error: "Failed to create physio request", details: String(error) }, { status: 500 })
  }
}
