/**
 * Security Audit Logging System
 * Tracks security-relevant events for compliance and monitoring
 */

import { adminDb } from '@/lib/firebase-admin'
import { db as clientDb } from '@/lib/firebase'
import { collection, addDoc, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore'

export type AuditEventType = 
  | 'auth.login.success'
  | 'auth.login.failed'
  | 'auth.logout'
  | 'auth.register'
  | 'auth.password.changed'
  | 'auth.token.refreshed'
  | 'api.unauthorized'
  | 'api.forbidden'
  | 'api.rate_limit'
  | 'data.create'
  | 'data.read'
  | 'data.update'
  | 'data.delete'
  | 'security.xss_attempt'
  | 'security.injection_attempt'
  | 'security.csrf_failed'
  | 'admin.user.created'
  | 'admin.user.deleted'
  | 'admin.role.changed'
  | 'admin.settings.changed'

export interface AuditLogEntry {
  // Event identification
  eventType: AuditEventType
  eventCategory: 'authentication' | 'authorization' | 'data' | 'security' | 'admin'
  severity: 'low' | 'medium' | 'high' | 'critical'
  
  // Actor (who performed the action)
  actorId: string | null
  actorEmail?: string | null
  actorRole?: string | null
  actorIp?: string | null
  actorUserAgent?: string | null
  
  // Target (what was affected)
  targetType?: string // e.g., 'user', 'workout', 'patient'
  targetId?: string
  targetName?: string
  
  // Action details
  action: string // Human-readable description
  details?: Record<string, any> // Additional structured data
  
  // Result
  success: boolean
  errorMessage?: string
  
  // Metadata
  timestamp: Date
  requestId?: string
  sessionId?: string
  
  // Compliance
  ipAddress?: string
  location?: string
  deviceInfo?: string
}

/**
 * Log a security audit event (server-side)
 */
export async function logAuditEvent(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void> {
  try {
    const auditLog: AuditLogEntry = {
      ...entry,
      timestamp: new Date()
    }
    
    // Log to Firestore
    await adminDb.collection('audit_logs').add({
      ...auditLog,
      timestamp: new Date().toISOString()
    })
    
    // Log critical events to console for immediate visibility
    if (entry.severity === 'critical' || entry.severity === 'high') {
      console.warn('🚨 Security Audit:', {
        eventType: entry.eventType,
        severity: entry.severity,
        actorId: entry.actorId,
        action: entry.action,
        success: entry.success
      })
    }
    
    // In production, you might also send to external logging service
    // await sendToExternalLogger(auditLog)
    
  } catch (error) {
    console.error('❌ Failed to log audit event:', error)
    // Don't throw - logging should not break the main flow
  }
}

/**
 * Log audit event (client-side) - sends to API endpoint
 */
export async function logAuditEventClient(
  entry: Omit<AuditLogEntry, 'timestamp' | 'actorIp' | 'actorUserAgent'>
): Promise<void> {
  try {
    await fetch('/api/audit-logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    })
  } catch (error) {
    console.error('❌ Failed to log audit event:', error)
  }
}

/**
 * Query audit logs (server-side)
 */
export async function queryAuditLogs(options: {
  actorId?: string
  eventType?: AuditEventType
  eventCategory?: string
  severity?: string
  startDate?: Date
  endDate?: Date
  limit?: number
}): Promise<AuditLogEntry[]> {
  try {
    let queryRef = adminDb.collection('audit_logs').orderBy('timestamp', 'desc')
    
    if (options.actorId) {
      queryRef = queryRef.where('actorId', '==', options.actorId)
    }
    
    if (options.eventType) {
      queryRef = queryRef.where('eventType', '==', options.eventType)
    }
    
    if (options.eventCategory) {
      queryRef = queryRef.where('eventCategory', '==', options.eventCategory)
    }
    
    if (options.severity) {
      queryRef = queryRef.where('severity', '==', options.severity)
    }
    
    if (options.limit) {
      queryRef = queryRef.limit(options.limit)
    }
    
    const snapshot = await queryRef.get()
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      timestamp: new Date(doc.data().timestamp)
    } as AuditLogEntry))
    
  } catch (error) {
    console.error('❌ Failed to query audit logs:', error)
    return []
  }
}

/**
 * Get security statistics
 */
export async function getSecurityStats(days: number = 7): Promise<{
  totalEvents: number
  failedLogins: number
  unauthorizedAccess: number
  rateLimitHits: number
  suspiciousActivity: number
  criticalEvents: number
}> {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  
  try {
    const logs = await queryAuditLogs({
      startDate,
      limit: 10000
    })
    
    return {
      totalEvents: logs.length,
      failedLogins: logs.filter(l => l.eventType === 'auth.login.failed').length,
      unauthorizedAccess: logs.filter(l => l.eventType === 'api.unauthorized').length,
      rateLimitHits: logs.filter(l => l.eventType === 'api.rate_limit').length,
      suspiciousActivity: logs.filter(l => 
        l.eventType.startsWith('security.') && l.severity === 'high'
      ).length,
      criticalEvents: logs.filter(l => l.severity === 'critical').length
    }
  } catch (error) {
    console.error('❌ Failed to get security stats:', error)
    return {
      totalEvents: 0,
      failedLogins: 0,
      unauthorizedAccess: 0,
      rateLimitHits: 0,
      suspiciousActivity: 0,
      criticalEvents: 0
    }
  }
}

/**
 * Helper: Extract client info from request
 */
export function extractClientInfo(request: Request): {
  ipAddress?: string
  userAgent?: string
  referer?: string
} {
  return {
    ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0] || 
                request.headers.get('x-real-ip') || 
                'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    referer: request.headers.get('referer') || undefined
  }
}
