import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET: Fetch all ads or filter by status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') // 'active' or 'inactive'
    const targetAudience = searchParams.get('targetAudience')

    // Fetch all ads without complex queries to avoid index requirements
    const snapshot = await adminDb.collection('ads').get()
    
    let ads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Filter in memory to avoid composite index
    if (status) {
      ads = ads.filter(ad => ad.status === status)
    }

    if (targetAudience && targetAudience !== 'all') {
      ads = ads.filter(ad => ad.targetAudience === targetAudience || ad.targetAudience === 'all')
    }

    // Sort by createdAt in memory
    ads.sort((a, b) => {
      const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0
      const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0
      return bTime - aTime
    })

    return NextResponse.json(ads)
  } catch (error: any) {
    console.error('Error fetching ads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ads', details: error.message },
      { status: 500 }
    )
  }
}

// POST: Create new ad
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const { title, description, imageUrl, link, targetAudience, position, startDate, endDate, status } = data

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image are required' },
        { status: 400 }
      )
    }

    const adData = {
      title,
      description: description || '',
      imageUrl,
      link: link || '',
      targetAudience: targetAudience || 'all', // 'all', 'pro', 'free'
      position: position || 'top', // 'top', 'bottom', 'sidebar'
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || null,
      status: status || 'active', // 'active', 'inactive'
      clicks: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const docRef = await adminDb.collection('ads').add(adData)

    return NextResponse.json({ 
      id: docRef.id, 
      ...adData 
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating ad:', error)
    return NextResponse.json(
      { error: 'Failed to create ad', details: error.message },
      { status: 500 }
    )
  }
}

// PUT: Update ad
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: 'Ad ID is required' },
        { status: 400 }
      )
    }

    const adRef = adminDb.collection('ads').doc(id)
    const adDoc = await adRef.get()

    if (!adDoc.exists) {
      return NextResponse.json(
        { error: 'Ad not found' },
        { status: 404 }
      )
    }

    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    await adRef.update(updatedData)

    return NextResponse.json({ 
      id, 
      ...adDoc.data(),
      ...updatedData
    })
  } catch (error: any) {
    console.error('Error updating ad:', error)
    return NextResponse.json(
      { error: 'Failed to update ad', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE: Delete ad
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Ad ID is required' },
        { status: 400 }
      )
    }

    const adRef = adminDb.collection('ads').doc(id)
    const adDoc = await adRef.get()

    if (!adDoc.exists) {
      return NextResponse.json(
        { error: 'Ad not found' },
        { status: 404 }
      )
    }

    await adRef.delete()

    return NextResponse.json({ 
      message: 'Ad deleted successfully',
      id 
    })
  } catch (error: any) {
    console.error('Error deleting ad:', error)
    return NextResponse.json(
      { error: 'Failed to delete ad', details: error.message },
      { status: 500 }
    )
  }
}
