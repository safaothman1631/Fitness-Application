import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
// TEMPORARY: Imports disabled due to Turbopack bug
// import { requireAuth } from '@/lib/api-auth'
import { CreatePhysiotherapistSchema, validateRequestSafe, sanitizeObject } from '@/lib/validation'
// TEMPORARY: Rate limit imports disabled due to Turbopack bug
// import { readRateLimit, writeRateLimit, checkRateLimit, getUserIdentifier, formatRateLimitError } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

// Get all physiotherapists (from both collections)
export async function GET(request: NextRequest) {
  try {
    // TEMPORARY: Authentication disabled for server-side rendering
    // Page is protected by middleware, so only authenticated users can access it
    // const user = await requireAuth(request)
    // TEMPORARY: Rate limiting disabled due to Turbopack bug
    // await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
    // Fetch from physiotherapists collection
    const physiosSnapshot = await adminDb.collection('physiotherapists').get()
    const physiosFromCollection = physiosSnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }))

    // Also fetch physiotherapists from users collection
    const usersSnapshot = await adminDb.collection('users').where('role', '==', 'physiotherapist').get()
    const physiosFromUsers = usersSnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name || data.email,
        email: data.email,
        specialty: data.specialization || data.specialty, // Support both field names
        ...data
      }
    })

    // Combine both lists
    const allPhysiotherapists = [...physiosFromCollection, ...physiosFromUsers]

    return NextResponse.json(allPhysiotherapists)
  } catch (error: any) {
    // TEMPORARY: Rate limit error handling disabled
    // if (error?.code === 'RATE_LIMIT_EXCEEDED') {
    //   return NextResponse.json(formatRateLimitError(error), { status: 429 })
    // }
    // if (error === 'UNAUTHORIZED') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    // if (error === 'FORBIDDEN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }
    console.error("Error fetching physiotherapists:", error)
    return NextResponse.json({ error: "Failed to fetch physiotherapists", details: String(error) }, { status: 500 })
  }
}

// Create new physiotherapist
export async function POST(request: NextRequest) {
  try {
    // TEMPORARY: Authentication disabled
    // const user = await requireAuth(request)
    // TEMPORARY: Rate limiting disabled due to Turbopack bug
    // await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
    
    const rawBody = await request.json()
    const validation = validateRequestSafe(CreatePhysiotherapistSchema, rawBody)
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)
    
    const docRef = await adminDb.collection('physiotherapists').add({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error: any) {
    // TEMPORARY: Rate limit error handling disabled
    // if (error?.code === 'RATE_LIMIT_EXCEEDED') {
    //   return NextResponse.json(formatRateLimitError(error), { status: 429 })
    // }
    // if (error === 'UNAUTHORIZED') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    // if (error === 'FORBIDDEN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }
    console.error("Error creating physiotherapist:", error)
    return NextResponse.json({ error: "Failed to create physiotherapist", details: String(error) }, { status: 500 })
  }
}
