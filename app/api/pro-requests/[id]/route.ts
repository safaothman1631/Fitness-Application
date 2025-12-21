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
      // Get user details first
      const userDoc = await adminDb.collection('users').doc(userId).get()
      const userData = userDoc.data()

      if (!userData) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }

      const startDate = new Date()
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + (proDuration || 30))
      const durationMonths = Math.floor((proDuration || 30) / 30)

      await adminDb.collection('users').doc(userId).update({
        membership: 'Pro',
        membershipDate: startDate,
        subscriptionStatus: 'active',
        proExpiryDate: expiryDate,
        subscriptionStart: startDate,
        subscriptionEnd: expiryDate,
        subscriptionAmount: amount || 0,
        subscriptionDuration: durationMonths,
        isActive: true,
        updatedAt: new Date()
      })

      console.log("✅ User upgraded to Pro until:", expiryDate)

      // Create expense record
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

      // Create payment record for subscription history
      await adminDb.collection('payments').add({
        userId: userId,
        userName: userData?.name || userData?.firstName || 'Unknown',
        userEmail: userData?.email || null,
        amount: Number(amount) || 0,
        currency: 'IQD',
        duration: durationMonths,
        type: 'pro-subscription',
        method: 'Admin Approved',
        status: 'completed',
        subscriptionStart: startDate,
        subscriptionEnd: expiryDate,
        relatedId: id,
        relatedType: 'pro-request',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log("✅ Payment record created for subscription history")

      // Log activity
      try {
        await adminDb.collection('activity-logs').add({
          type: 'pro_approved',
          performedBy: 'superadmin',
          performedByName: 'Super Admin',
          performedByRole: 'superadmin',
          targetUserId: userId,
          targetUserName: userData?.name || userData?.firstName || 'Unknown',
          targetUserEmail: userData?.email || null,
          description: `PRO approved for ${userData?.name || 'user'} - ${amount} IQD for ${durationMonths} months`,
          amount: Number(amount) || 0,
          currency: 'IQD',
          category: 'subscription',
          metadata: { duration: durationMonths, requestId: id },
          timestamp: new Date(),
          createdAt: new Date(),
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
        })
        console.log("✅ Activity logged")
      } catch (logError) {
        console.error("⚠️ Failed to log activity:", logError)
      }
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
