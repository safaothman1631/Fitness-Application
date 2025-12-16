import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { requireRole } from '@/lib/api-auth'
import { CreateLogSchema, validateRequestSafe, sanitizeObject } from '@/lib/validation'
import { readRateLimit, writeRateLimit, checkRateLimit, getUserIdentifier, formatRateLimitError } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    // Only admins and owners can view system logs
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // info, success, warning, error

    // Fetch logs from Firestore
    let logsQuery = adminDb.collection('logs').orderBy('timestamp', 'desc').limit(100)
    
    if (type) {
      logsQuery = logsQuery.where('type', '==', type) as any
    }

    const logsSnapshot = await logsQuery.get()
    const logs = logsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp
    }))

    // Calculate stats
    const allLogsSnapshot = await adminDb.collection('logs').get()
    const allLogs = allLogsSnapshot.docs.map(doc => doc.data())

    const stats = {
      info: allLogs.filter(log => log.type === 'info').length,
      success: allLogs.filter(log => log.type === 'success').length,
      warning: allLogs.filter(log => log.type === 'warning').length,
      error: allLogs.filter(log => log.type === 'error').length,
      total: allLogs.length
    }

    return NextResponse.json({ logs, stats })
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch logs', details: error.message },
      { status: 500 }
    )
  }
}

// Create a new log entry
export async function POST(request: NextRequest) {
  try {
    // Only admins and owners can create log entries manually
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
    
    const rawBody = await request.json()
    
    // Validate and sanitize input
    const validation = validateRequestSafe(CreateLogSchema, rawBody)
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: validation.errors 
      }, { status: 400 })
    }
    
    const body = sanitizeObject(validation.data)
    const { type, message, details, action } = body
    const logUser = (body as any).user

    const logData = {
      type: type || 'info',
      message,
      user: logUser || 'System',
      details: details || '',
      action: action || '',
      timestamp: new Date(),
      createdAt: new Date()
    }

    const logRef = await adminDb.collection('logs').add(logData)

    return NextResponse.json({
      id: logRef.id,
      ...logData,
      timestamp: logData.timestamp.toISOString()
    })
  } catch (error: any) {
    if (error?.code === 'RATE_LIMIT_EXCEEDED') {
      return NextResponse.json(formatRateLimitError(error), { status: 429 })
    }
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }
    console.error('Error creating log:', error)
    return NextResponse.json(
      { error: 'Failed to create log', details: error.message },
      { status: 500 }
    )
  }
}
