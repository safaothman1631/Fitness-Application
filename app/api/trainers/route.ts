import { NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection('users')
      .where('role', '==', 'trainer')
      .get()
    
    const trainers = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }))

    return NextResponse.json({
      count: trainers.length,
      trainers
    })
  } catch (error: any) {
    console.error("Error fetching trainers:", error)
    return NextResponse.json({ error: "Failed to fetch trainers", details: String(error) }, { status: 500 })
  }
}
