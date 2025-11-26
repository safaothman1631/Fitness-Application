import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// PUT - Approve/Reject Pro request and update user
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { status, proDuration, userId, amount } = body

    console.log("📝 Updating Pro request:", id, "Status:", status)
    console.log("📦 Request body:", { status, proDuration, userId, amount })

    // Update request status
    await adminDb.collection('pro-requests').doc(id).update({
      status,
      amount: amount || 0,
      duration: proDuration || 30,
      updatedAt: new Date(),
      processedAt: new Date()
    })

    // If approved, update user to Pro
    if (status === 'approved' && userId) {
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + (proDuration || 30))

      await adminDb.collection('users').doc(userId).update({
        membership: 'Pro',
        subscriptionStatus: 'active',
        proExpiryDate: expiryDate,
        subscriptionEnd: expiryDate,
        subscriptionAmount: amount || 0,
        subscriptionDuration: Math.floor((proDuration || 30) / 30),
        updatedAt: new Date()
      })

      console.log("✅ User upgraded to Pro until:", expiryDate)

      // Get user details for expense record
      const userDoc = await adminDb.collection('users').doc(userId).get()
      const userData = userDoc.data()

      // Create expense record
      const durationMonths = Math.floor((proDuration || 30) / 30)
      await adminDb.collection('expenses').add({
        type: 'pro-subscription',
        amount: Number(amount) || 0,
        currency: 'IQD',
        description: `پەسەندکردنی ئەندامێتی PRO بۆ ${durationMonths} مانگ`,
        category: 'subscription',
        userId: userId,
        userName: userData?.name || userData?.firstName || 'Unknown',
        userEmail: userData?.email || null,
        relatedId: id,
        relatedType: 'pro-request',
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log("✅ Expense recorded:", amount, "IQD")
    }

    const updatedDoc = await adminDb.collection('pro-requests').doc(id).get()
    
    return NextResponse.json({
      success: true,
      data: { id: updatedDoc.id, ...updatedDoc.data() }
    })
  } catch (error) {
    console.error("❌ Error updating Pro request:", error)
    return NextResponse.json({ error: "Failed to update Pro request", details: String(error) }, { status: 500 })
  }
}

// DELETE - Delete a Pro request
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    console.log("🗑️ Deleting Pro request:", id)

    await adminDb.collection('pro-requests').doc(id).delete()

    console.log("✅ Pro request deleted successfully")
    return NextResponse.json({ success: true, message: "Pro request deleted" })
  } catch (error) {
    console.error("❌ Error deleting Pro request:", error)
    return NextResponse.json({ error: "Failed to delete Pro request", details: String(error) }, { status: 500 })
  }
}
