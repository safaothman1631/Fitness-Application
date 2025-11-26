import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Fetch all expenses
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Fetching all expenses")

    const snapshot = await adminDb
      .collection('expenses')
      .orderBy('createdAt', 'desc')
      .get()

    console.log("📊 Found", snapshot.size, "expenses")

    const expenses = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    }))

    console.log("✅ Returning", expenses.length, "expenses")
    return NextResponse.json(expenses)
  } catch (error) {
    console.error("❌ Error fetching expenses:", error)
    return NextResponse.json({ error: "Failed to fetch expenses", details: String(error) }, { status: 500 })
  }
}

// POST - Create a new expense
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      type, 
      amount, 
      currency = 'IQD',
      description, 
      category,
      userId, 
      userName, 
      userEmail,
      relatedId,
      relatedType
    } = body

    console.log("📝 Creating expense:", { type, amount, currency, category })

    const expenseData = {
      type, // 'pro-subscription', 'purchase', 'refund', etc.
      amount: Number(amount),
      currency,
      description: description || '',
      category: category || 'subscription',
      userId: userId || null,
      userName: userName || 'Unknown',
      userEmail: userEmail || null,
      relatedId: relatedId || null, // ID of related document (pro-request, order, etc.)
      relatedType: relatedType || null, // 'pro-request', 'order', etc.
      status: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const docRef = await adminDb.collection('expenses').add(expenseData)

    console.log("✅ Expense created with ID:", docRef.id)
    
    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: "Expense recorded successfully"
    })
  } catch (error) {
    console.error("❌ Error creating expense:", error)
    return NextResponse.json({ error: "Failed to create expense", details: String(error) }, { status: 500 })
  }
}
