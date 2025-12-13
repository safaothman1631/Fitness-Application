import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userIds } = body

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json({ error: "User IDs are required" }, { status: 400 })
    }

    console.log(`🔄 Fixing membership dates for ${userIds.length} users`)

    let updated = 0
    const currentDate = new Date()

    for (const userId of userIds) {
      try {
        await adminDb.collection('users').doc(userId).update({
          membershipDate: currentDate
        })
        console.log(`✅ Updated membership date for user: ${userId}`)
        updated++
      } catch (error) {
        console.error(`❌ Failed to update user ${userId}:`, error)
      }
    }

    console.log(`✅ Successfully updated ${updated} out of ${userIds.length} users`)

    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updated} users`,
      updated 
    })
  } catch (error: any) {
    console.error("❌ Error fixing membership dates:", error)
    return NextResponse.json({
      error: "Failed to fix membership dates",
      details: error.message
    }, { status: 500 })
  }
}
