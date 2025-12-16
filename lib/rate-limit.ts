/**
 * Rate Limiting Middleware
 * 
 * Implements rate limiting to prevent abuse and brute force attacks.
 * Uses Upstash Redis for distributed rate limiting.
 * 
 * Limits:
 * - Auth endpoints: 5 attempts per 15 minutes (prevent brute force)
 * - Write operations: 20 requests per minute (prevent spam)
 * - Read operations: 100 requests per minute (prevent abuse)
 */

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { logAuditEvent } from '@/lib/audit-logger'

// Check if Upstash is configured
const isUpstashConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN

// Create Redis client (only if configured)
let redis: Redis | null = null
if (isUpstashConfigured) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

/**
 * Authentication endpoints rate limiter
 * 5 attempts per 15 minutes to prevent brute force attacks
 */
export const authRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "@auth:",
  analytics: true,
}) : null

/**
 * Write operations rate limiter
 * 20 requests per minute to prevent spam
 */
export const writeRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 m"),
  prefix: "@write:",
  analytics: true,
}) : null

/**
 * Read operations rate limiter
 * 100 requests per minute to prevent abuse
 */
export const readRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"),
  prefix: "@read:",
  analytics: true,
}) : null

/**
 * Check rate limit for a given identifier
 * 
 * @param identifier - Unique identifier (IP address or user ID)
 * @param limiter - Rate limiter instance to use
 * @throws RateLimitError if limit exceeded
 */
export async function checkRateLimit(
  identifier: string, 
  limiter: Ratelimit | null
): Promise<void> {
  // Skip rate limiting if not configured
  if (!limiter || !isUpstashConfigured) {
    console.warn('⚠️  Rate limiting skipped: Upstash not configured')
    return
  }

  try {
    const { success, limit, reset, remaining, pending } = await limiter.limit(identifier)
    
    if (!success) {
      // Log rate limit violation
      await logAuditEvent({
        eventType: 'api.rate_limit',
        eventCategory: 'security',
        severity: 'medium',
        actorId: identifier.includes('@') ? identifier : null,
        actorIp: identifier.includes('.') ? identifier : undefined,
        action: `Rate limit exceeded for ${identifier}`,
        success: false,
        details: { limit, reset, remaining },
        ipAddress: identifier.includes('.') ? identifier : undefined
      })
      
      const error: any = new Error('Rate limit exceeded')
      error.code = 'RATE_LIMIT_EXCEEDED'
      error.limit = limit
      error.reset = reset
      error.remaining = remaining
      throw error
    }
    
    // Log rate limit stats (optional, for debugging)
    if (remaining < 5) {
      console.warn(`⚠️  Rate limit warning: ${remaining} attempts remaining for ${identifier}`)
    }
    
    // Wait for pending operations
    await pending
  } catch (error: any) {
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      throw error
    }
    // Log Redis errors but don't block the request
    console.error('❌ Rate limit check failed:', error)
    // Allow the request to proceed on Redis errors
  }
}

/**
 * Get client identifier from request
 * Uses IP address as primary identifier, falls back to "unknown"
 * 
 * @param request - NextRequest object
 * @returns Identifier string (IP address or "unknown")
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (common proxy headers)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  // Return first available IP
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  if (cfConnectingIp) {
    return cfConnectingIp
  }
  
  // Fallback to "unknown" (will apply rate limit to all unknown clients together)
  return 'unknown'
}

/**
 * Get user identifier from request
 * Uses authenticated user ID if available, falls back to IP address
 * 
 * @param request - NextRequest object
 * @param userId - Optional user ID from authentication
 * @returns Identifier string (user ID or IP address)
 */
export function getUserIdentifier(request: Request, userId?: string): string {
  if (userId) {
    return `user:${userId}`
  }
  return `ip:${getClientIdentifier(request)}`
}

/**
 * Format rate limit error response
 * 
 * @param error - Error object with rate limit details
 * @returns Formatted error object for JSON response
 */
export function formatRateLimitError(error: any): {
  error: string
  code: string
  message: string
  limit?: number
  reset?: number
  resetAt?: string
} {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    const resetDate = error.reset ? new Date(error.reset * 1000) : null
    
    return {
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
      limit: error.limit,
      reset: error.reset,
      resetAt: resetDate ? resetDate.toISOString() : undefined,
    }
  }
  
  return {
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred',
  }
}

/**
 * Check if rate limiting is enabled
 * 
 * @returns true if Upstash is configured, false otherwise
 */
export function isRateLimitingEnabled(): boolean {
  return !!isUpstashConfigured
}

/**
 * Get rate limiting status for monitoring
 * 
 * @returns Status object with configuration details
 */
export function getRateLimitingStatus() {
  return {
    enabled: isRateLimitingEnabled(),
    configured: isUpstashConfigured,
    limits: {
      auth: authRateLimit ? '5 per 15 minutes' : 'disabled',
      write: writeRateLimit ? '20 per minute' : 'disabled',
      read: readRateLimit ? '100 per minute' : 'disabled',
    },
    warning: !isUpstashConfigured ? 
      'Rate limiting is disabled. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable.' : 
      null,
  }
}

// Log rate limiting status on module load
if (typeof window === 'undefined') {
  const status = getRateLimitingStatus()
  if (status.enabled) {
    console.log('✅ Rate limiting enabled:', status.limits)
  } else {
    console.warn('⚠️  Rate limiting disabled:', status.warning)
  }
}
