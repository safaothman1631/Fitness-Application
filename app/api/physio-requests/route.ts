import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get physio requests - either for a user or for a physiotherapist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const physioId = searchParams.get("physioId")

    console.log("🔍 Fetching physio requests - userId:", userId, "physioId:", physioId)

    if (!userId && !physioId) {
      return NextResponse.json({ error: "Missing userId or physioId parameter" }, { status: 400 })
    }

    let snapshot
    if (physioId) {
      // Get all requests for this physiotherapist
      snapshot = await adminDb
        .collection('physio-requests')
        .where('physioId', '==', physioId)
        .get()
      console.log("📊 Found", snapshot.size, "requests for physio:", physioId)
    } else {
      // Get all requests from this user
      snapshot = await adminDb
        .collection('physio-requests')
        .where('userId', '==', userId)
        .get()
      console.log("📊 Found", snapshot.size, "requests for user:", userId)
    }

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
      userEmail: body.userEmail || "",
      userPhone: body.userPhone || "",
      userAge: body.userAge || 0,
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

    // Create notification for the physiotherapist
    try {
      await adminDb.collection('notifications').add({
        userId: physioId,
        title: "ریکوێستی نەخۆشی نوێ",
        message: `${userName || "نەخۆشێک"} (${body.userEmail || "بێ ئیمەیڵ"}) ریکوێستی ناردووە بۆ تۆ`,
        type: "info",
        category: "request",
        metadata: {
          requestId: docRef.id,
          patientName: userName,
          patientEmail: body.userEmail,
          injuryType: injuryType
        },
        read: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      console.log("✅ Notification created for physio:", physioId)
    } catch (notifError) {
      console.error("⚠️ Failed to create notification:", notifError)
    }

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
