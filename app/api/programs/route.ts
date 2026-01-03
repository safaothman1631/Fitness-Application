import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // nutrition, workout, videos, schedule
    const userId = searchParams.get('userId') // Filter by assigned user

    console.log('🔍 Fetching programs:', { type, userId })

    let programsQuery = adminDb.collection('programs')
    
    if (type) {
      programsQuery = programsQuery.where('type', '==', type) as any
    }

    const programsSnapshot = await programsQuery.get()
    let programs = programsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
    }))

    // Sort by createdAt in memory (to avoid Firestore index requirement)
    programs.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime()
      const dateB = new Date(b.createdAt || 0).getTime()
      return dateB - dateA // DESC order (newest first)
    })

    // Filter by userId if provided (for user dashboard)
    if (userId) {
      console.log('🔍 Filtering programs for userId:', userId)
      programs = programs.filter((program: any) => {
        const hasUser = program.assignedUsers && program.assignedUsers.includes(userId)
        console.log(`  - Program "${program.title}" has assignedUsers:`, program.assignedUsers, '→ includes user?', hasUser)
        return hasUser
      })
      console.log(`✅ Found ${programs.length} programs for user ${userId}`)
    } else {
      console.log(`✅ Found ${programs.length} total programs`)
    }

    return NextResponse.json(programs)
  } catch (error: any) {
    console.error('❌ Error fetching programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch programs', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📝 Creating program with data:', body)
    
    const { 
      title, 
      description, 
      type, 
      duration, 
      difficulty, 
      calories,
      protein,
      carbs,
      fats,
      targetMuscles,
      videoUrl,
      imageUrl,
      exercises,
      meals,
      schedule,
      weeklySchedule,
      assignedUsers
    } = body

    if (!title || !type) {
      console.error('❌ Missing required fields:', { title, type })
      return NextResponse.json(
        { error: 'Title and type are required' },
        { status: 400 }
      )
    }

    const programData = {
      title,
      description: description || '',
      type, // nutrition, workout, videos, schedule
      duration: duration || '',
      difficulty: difficulty || 'beginner',
      calories: calories || '',
      protein: protein || '',
      carbs: carbs || '',
      fats: fats || '',
      targetMuscles: targetMuscles || '',
      videoUrl: videoUrl || '',
      imageUrl: imageUrl || '',
      exercises: exercises || [],
      meals: meals || [],
      schedule: schedule || [],
      weeklySchedule: weeklySchedule || {},
      assignedUsers: assignedUsers || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      views: 0,
      likes: 0
    }

    const programRef = await adminDb.collection('programs').add(programData)
    console.log('✅ Program created with ID:', programRef.id)

    // Create activity log
    await adminDb.collection('logs').add({
      type: 'success',
      message: 'New program created',
      user: 'System',
      details: `Program: ${title}`,
      action: 'create_program',
      timestamp: new Date(),
      createdAt: new Date()
    })

    const result = {
      id: programRef.id,
      ...programData,
      createdAt: programData.createdAt.toISOString()
    }
    console.log('✅ Returning result:', result)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Error creating program:', error)
    return NextResponse.json(
      { error: 'Failed to create program', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const updateData = {
      ...body,
      updatedAt: new Date()
    }

    await adminDb.collection('programs').doc(id).update(updateData)

    return NextResponse.json({ success: true, id })
  } catch (error: any) {
    console.error('Error updating program:', error)
    return NextResponse.json(
      { error: 'Failed to update program', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('programs').doc(id).delete()

    // Create activity log
    await adminDb.collection('logs').add({
      type: 'warning',
      message: 'Program deleted',
      user: 'System',
      details: `Program ID: ${id}`,
      action: 'delete_program',
      timestamp: new Date(),
      createdAt: new Date()
    })

    return NextResponse.json({ success: true, id })
  } catch (error: any) {
    console.error('Error deleting program:', error)
    return NextResponse.json(
      { error: 'Failed to delete program', details: error.message },
      { status: 500 }
    )
  }
}
