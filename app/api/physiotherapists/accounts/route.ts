import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get all physiotherapist accounts with full details
export async function GET(request: NextRequest) {
  try {
    const snapshot = await adminDb.collection('physiotherapists').get()
    
    const accounts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Format dates for better readability
      createdAt: doc.data().createdAt || 'N/A',
      updatedAt: doc.data().updatedAt || 'N/A'
    }))
    
    return NextResponse.json({
      total: accounts.length,
      accounts: accounts
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  } catch (error: any) {
    console.error("Error fetching physiotherapist accounts:", error)
    return NextResponse.json({ 
      error: "Failed to fetch accounts", 
      details: String(error) 
    }, { status: 500 })
  }
}
