import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
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
    const body = await request.json()
    const { type, message, user, details, action } = body

    const logData = {
      type: type || 'info',
      message,
      user: user || 'System',
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
    console.error('Error creating log:', error)
    return NextResponse.json(
      { error: 'Failed to create log', details: error.message },
      { status: 500 }
    )
  }
}
