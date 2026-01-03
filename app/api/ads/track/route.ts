import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const { adId, type } = await request.json()

    if (!adId || !type) {
      return NextResponse.json(
        { error: 'adId and type are required' },
        { status: 400 }
      )
    }

    const adRef = adminDb.collection('ads').doc(adId)
    const adDoc = await adRef.get()

    if (!adDoc.exists) {
      return NextResponse.json(
        { error: 'Ad not found' },
        { status: 404 }
      )
    }

    const adData = adDoc.data()
    const incrementField = type === 'view' ? 'views' : 'clicks'
    const currentValue = adData?.[incrementField] || 0

    await adRef.update({
      [incrementField]: currentValue + 1,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true,
      [incrementField]: currentValue + 1
    })
  } catch (error: any) {
    console.error('Error tracking ad:', error)
    return NextResponse.json(
      { error: 'Failed to track ad', details: error.message },
      { status: 500 }
    )
  }
}
