import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { requireAuth, requireRole } from '@/lib/api-auth'
import { z } from 'zod'
import { validateRequestSafe, sanitizeObject } from '@/lib/validation'
import { readRateLimit, writeRateLimit, checkRateLimit, getUserIdentifier, formatRateLimitError } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const CreateAccessKeySchema = z.object({
  name: z.string().min(1),
  membership: z.string().min(1)
})

// Get all access keys
export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    const keysRef = collection(db, "accessKeys")
    const snapshot = await getDocs(keysRef)
    const keys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(keys)
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    console.error("Error fetching access keys:", error)
    return NextResponse.json({ error: "Failed to fetch access keys" }, { status: 500 })
  }
}

// Create new access key
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
    
    const rawBody = await request.json()
    const validation = validateRequestSafe(CreateAccessKeySchema, rawBody)
    
    if (!validation.success) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)
    const { name, membership } = body

    // Generate unique key
    const key = `KEY-${Date.now().toString().slice(-6).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const keysRef = collection(db, "accessKeys")
    const docRef = await addDoc(keysRef, {
      key,
      name,
      membership,
      createdAt: new Date().toISOString(),
      isActive: true,
    })

    return NextResponse.json({ id: docRef.id, key, name, membership }, { status: 201 })
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    console.error("Error creating access key:", error)
    return NextResponse.json({ error: "Failed to create access key" }, { status: 500 })
  }
}
