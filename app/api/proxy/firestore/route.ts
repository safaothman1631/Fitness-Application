import { NextRequest, NextResponse } from "next/server"

// Firebase Firestore REST API Proxy
// This proxy routes requests through Vercel's infrastructure to bypass regional blocks

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "final-database-51935"
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { collection, docId, method, data, updateMask } = body

    let url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${collection}`
    
    if (docId) {
      url += `/${docId}`
    }

    // Add API key to URL
    url += `?key=${FIREBASE_API_KEY}`
    
    // Add updateMask for PATCH requests
    if (method === 'PATCH' && updateMask) {
      const maskFields = updateMask.fieldPaths.join('&updateMask.fieldPaths=')
      url += `&updateMask.fieldPaths=${maskFields}`
    }

    const options: RequestInit = {
      method: method || 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (data && (method === 'PATCH' || method === 'POST')) {
      options.body = JSON.stringify(data)
    }

    console.log(`🔄 Proxy ${method} request to: ${url}`)
    console.log(`📦 Body:`, JSON.stringify(data, null, 2))
    
    const response = await fetch(url, options)
    const responseData = await response.json()

    if (!response.ok) {
      console.error('❌ Firebase API error:', responseData)
      return NextResponse.json(
        { error: 'Firebase API error', details: responseData },
        { status: response.status }
      )
    }

    console.log('✅ Proxy request successful')
    return NextResponse.json(responseData, { status: 200 })
  } catch (error: any) {
    console.error('❌ Proxy error:', error)
    return NextResponse.json(
      { error: 'Proxy error', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const collection = searchParams.get('collection')
    const docId = searchParams.get('docId')

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection parameter required' },
        { status: 400 }
      )
    }

    let url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${collection}`
    
    if (docId) {
      url += `/${docId}`
    }

    url += `?key=${FIREBASE_API_KEY}`

    console.log(`🔄 Proxy GET request to: ${url}`)
    
    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      console.error('❌ Firebase API error:', data)
      return NextResponse.json(
        { error: 'Firebase API error', details: data },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    console.error('❌ Proxy error:', error)
    return NextResponse.json(
      { error: 'Proxy error', details: error.message },
      { status: 500 }
    )
  }
}
