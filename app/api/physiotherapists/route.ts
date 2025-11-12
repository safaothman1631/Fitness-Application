import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all physiotherapists
export async function GET(request: NextRequest) {
  try {
    const snapshot = await adminDb.collection('physiotherapists').get()
    
    const physiotherapists = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }))

    return NextResponse.json(physiotherapists)
  } catch (error) {
    console.error("Error fetching physiotherapists:", error)
    return NextResponse.json({ error: "Failed to fetch physiotherapists", details: String(error) }, { status: 500 })
  }
}
