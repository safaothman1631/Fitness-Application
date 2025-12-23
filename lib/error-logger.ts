import { adminDb } from './firebase-admin'

export type LogType = 'info' | 'success' | 'warning' | 'error'

interface LogData {
  type: LogType
  message: string
  user?: string
  details?: string
  action?: string
  metadata?: any
}

/**
 * Logs an activity or error to the system logs
 */
export async function logActivity(data: LogData) {
  try {
    const logData = {
      type: data.type || 'info',
      message: data.message,
      user: data.user || 'System',
      details: data.details || '',
      action: data.action || '',
      metadata: data.metadata || {},
      timestamp: new Date(),
      createdAt: new Date()
    }

    await adminDb.collection('logs').add(logData)
    
    // Also log to console for debugging
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[data.type] || 'ℹ️'
    
    console.log(`${emoji} [${data.type.toUpperCase()}] ${data.message}`, data.details || '')
  } catch (error) {
    // Don't throw errors from logging to avoid breaking the main flow
    console.error('Failed to write to system log:', error)
  }
}

/**
 * Logs an error with details
 */
export async function logError(message: string, error: any, user?: string, action?: string) {
  await logActivity({
    type: 'error',
    message,
    user,
    details: error?.message || String(error),
    action,
    metadata: {
      stack: error?.stack,
      code: error?.code,
      name: error?.name
    }
  })
}

/**
 * Logs a success event
 */
export async function logSuccess(message: string, user?: string, details?: string, action?: string) {
  await logActivity({
    type: 'success',
    message,
    user,
    details,
    action
  })
}

/**
 * Logs a warning
 */
export async function logWarning(message: string, user?: string, details?: string, action?: string) {
  await logActivity({
    type: 'warning',
    message,
    user,
    details,
    action
  })
}

/**
 * Logs an info message
 */
export async function logInfo(message: string, user?: string, details?: string, action?: string) {
  await logActivity({
    type: 'info',
    message,
    user,
    details,
    action
  })
}
