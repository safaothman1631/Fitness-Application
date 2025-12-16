import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Update physiotherapist specialties
export async function GET(request: NextRequest) {
  try {
    const snapshot = await adminDb.collection('physiotherapists').get()
    
    const updates = [
      { name: 'Dr. Kemal Öztürk', specialty: 'Orthopedic Rehabilitation' },
      { name: 'Dr. Aylin Yılmaz', specialty: 'Sports Injury' },
      { name: 'Dr. Rana Ahmad', specialty: 'Manual Therapy' }
    ]
    
    let updated = 0
    for (const doc of snapshot.docs) {
      const data = doc.data()
      const update = updates.find(u => u.name === data.name)
      
      if (update) {
        await adminDb.collection('physiotherapists').doc(doc.id).update({
          specialty: update.specialty,
          updatedAt: new Date().toISOString()
        })
        updated++
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updated} physiotherapists` 
    })
  } catch (error: any) {
    console.error("Error updating physiotherapists:", error)
    return NextResponse.json({ 
      error: "Failed to update physiotherapists", 
      details: String(error) 
    }, { status: 500 })
  }
}
