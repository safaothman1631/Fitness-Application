/**
 * API Route: Audit Logs
 * Endpoint for logging and retrieving security audit events
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireRole } from '@/lib/api-auth'
import { logAuditEvent, queryAuditLogs, getSecurityStats, extractClientInfo } from '@/lib/audit-logger'
import { checkRateLimit, getUserIdentifier, writeRateLimit, readRateLimit } from '@/lib/rate-limit'

/**
 * GET /api/audit-logs - Query audit logs
 * Requires admin role
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate and authorize
    const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
    await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const actorId = searchParams.get('actorId') || undefined
    const eventType = searchParams.get('eventType') as any
    const eventCategory = searchParams.get('eventCategory') || undefined
    const severity = searchParams.get('severity') || undefined
    const limitParam = searchParams.get('limit')
    const statsOnly = searchParams.get('stats') === 'true'
    
    // Return stats if requested
    if (statsOnly) {
      const days = parseInt(searchParams.get('days') || '7')
      const stats = await getSecurityStats(days)
      
      return NextResponse.json(stats)
    }
    
    // Query logs
    const logs = await queryAuditLogs({
      actorId,
      eventType,
      eventCategory,
      severity,
      limit: limitParam ? parseInt(limitParam) : 100
    })
    
    // Log this access
    await logAuditEvent({
      eventType: 'data.read',
      eventCategory: 'data',
      severity: 'low',
      actorId: user.uid,
      actorEmail: user.email,
      actorRole: user.role,
      targetType: 'audit_logs',
      action: 'Queried audit logs',
      success: true,
      details: { count: logs.length, filters: { actorId, eventType, severity } },
      ...extractClientInfo(request)
    })
    
    return NextResponse.json(logs)
    
  } catch (error: any) {
    console.error('❌ Error querying audit logs:', error)
    
    return NextResponse.json(
      { error: error.message || 'Failed to query audit logs' },
      { status: error.message === 'UNAUTHORIZED' ? 401 : 500 }
    )
  }
}

/**
 * POST /api/audit-logs - Create audit log entry
 * Anyone can log events (for client-side logging)
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit (more permissive for logging)
    const clientIp = extractClientInfo(request).ipAddress || 'unknown'
    await checkRateLimit(clientIp, writeRateLimit)
    
    // Parse request body
    const body = await request.json()
    
    // Validate required fields
    if (!body.eventType || !body.action) {
      return NextResponse.json(
        { error: 'Missing required fields: eventType, action' },
        { status: 400 }
      )
    }
    
    // Add client info
    const clientInfo = extractClientInfo(request)
    
    // Log the event
    await logAuditEvent({
      ...body,
      actorIp: clientInfo.ipAddress,
      actorUserAgent: clientInfo.userAgent,
      ipAddress: clientInfo.ipAddress,
      deviceInfo: clientInfo.userAgent
    })
    
    return NextResponse.json({ success: true })
    
  } catch (error: any) {
    console.error('❌ Error creating audit log:', error)
    
    // Don't fail the request even if logging fails
    return NextResponse.json(
      { error: error.message || 'Failed to create audit log' },
      { status: 500 }
    )
  }
}
