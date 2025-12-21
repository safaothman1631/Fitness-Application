import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'
import type { DecodedIdToken } from 'firebase-admin/auth'
import { logAuditEvent, extractClientInfo } from '@/lib/audit-logger'

export interface AuthenticatedRequest extends NextRequest {
  user?: DecodedIdToken
}

/**
 * Verify Firebase authentication token from request headers
 * @param request - Next.js request object
 * @returns Decoded user token or null if not authenticated
 */
export async function verifyAuth(request: NextRequest): Promise<DecodedIdToken | null> {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    
    if (!token) {
      return null
    }
    
    // Verify token with Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(token)
    return decodedToken
    
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

/**
 * Middleware to require authentication on API routes
 * Returns 401 if not authenticated
 */
export async function requireAuth(request: NextRequest): Promise<DecodedIdToken> {
  const user = await verifyAuth(request)
  
  if (!user) {
    // Log unauthorized access attempt
    const clientInfo = extractClientInfo(request)
    await logAuditEvent({
      eventType: 'api.unauthorized',
      eventCategory: 'authorization',
      severity: 'medium',
      actorId: null,
      actorIp: clientInfo.ipAddress,
      actorUserAgent: clientInfo.userAgent,
      action: `Unauthorized API access attempt to ${request.nextUrl.pathname}`,
      success: false,
      errorMessage: 'No valid authentication token',
      ipAddress: clientInfo.ipAddress
    })
    
    throw new Error('UNAUTHORIZED')
  }
  
  return user
}

/**
 * Middleware to require specific role(s) on API routes
 * Returns 403 if user doesn't have required role
 */
export async function requireRole(
  request: NextRequest, 
  allowedRoles: string[]
): Promise<DecodedIdToken> {
  const user = await requireAuth(request)
  
  // Get user role from custom claims, token, or database
  let userRole = user.role || (user as any).customClaims?.role
  
  // If role not in token, fetch from Firestore
  if (!userRole) {
    try {
      const { adminDb } = await import('@/lib/firebase-admin')
      const userDoc = await adminDb.collection('users').doc(user.uid).get()
      if (userDoc.exists) {
        userRole = userDoc.data()?.role
      }
    } catch (error) {
      console.error('Error fetching user role from Firestore:', error)
    }
  }
  
  // Debug logging
  console.log('🔍 Role check:', {
    userRole,
    allowedRoles,
    hasRole: userRole ? allowedRoles.includes(userRole) : false,
    userEmail: user.email
  })
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    // Log forbidden access attempt
    const clientInfo = extractClientInfo(request)
    await logAuditEvent({
      eventType: 'api.forbidden',
      eventCategory: 'authorization',
      severity: 'high',
      actorId: user.uid,
      actorEmail: user.email,
      actorRole: userRole,
      actorIp: clientInfo.ipAddress,
      actorUserAgent: clientInfo.userAgent,
      action: `Access denied to ${request.nextUrl.pathname}`,
      success: false,
      errorMessage: `Required roles: ${allowedRoles.join(', ')}. User role: ${userRole || 'none'}`,
      details: { requiredRoles: allowedRoles, userRole },
      ipAddress: clientInfo.ipAddress
    })
    
    throw new Error('FORBIDDEN')
  }
  
  return user
}

/**
 * Wrapper to handle authentication errors in API routes
 */
export function withAuth(
  handler: (request: NextRequest, user: DecodedIdToken) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    try {
      const user = await requireAuth(request)
      return await handler(request, user)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'UNAUTHORIZED') {
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
          )
        }
        if (error.message === 'FORBIDDEN') {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          )
        }
      }
      
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

/**
 * Wrapper to handle role-based authentication in API routes
 */
export function withRole(
  allowedRoles: string[],
  handler: (request: NextRequest, user: DecodedIdToken) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    try {
      const user = await requireRole(request, allowedRoles)
      return await handler(request, user)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'UNAUTHORIZED') {
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
          )
        }
        if (error.message === 'FORBIDDEN') {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          )
        }
      }
      
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

/**
 * Get user role from Firestore if not in token
 */
export async function getUserRole(userId: string): Promise<string | null> {
  try {
    const { adminDb } = await import('@/lib/firebase-admin')
    const userDoc = await adminDb.collection('users').doc(userId).get()
    
    if (!userDoc.exists) {
      return null
    }
    
    return userDoc.data()?.role || null
  } catch (error) {
    console.error('Error fetching user role:', error)
    return null
  }
}

/**
 * Check if user is owner
 */
export function isOwner(user: DecodedIdToken): boolean {
  const role = user.role || (user as any).customClaims?.role
  return role === 'owner'
}

/**
 * Check if user is admin
 */
export function isAdmin(user: DecodedIdToken): boolean {
  const role = user.role || (user as any).customClaims?.role
  return role === 'admin' || role === 'superadmin' || role === 'owner'
}

/**
 * Check if user is superadmin
 */
export function isSuperAdmin(user: DecodedIdToken): boolean {
  const role = user.role || (user as any).customClaims?.role
  return role === 'superadmin' || role === 'owner'
}

/**
 * Check if user is trainer
 */
export function isTrainer(user: DecodedIdToken): boolean {
  const role = user.role || (user as any).customClaims?.role
  return role === 'trainer'
}

/**
 * Check if user is physiotherapist
 */
export function isPhysiotherapist(user: DecodedIdToken): boolean {
  const role = user.role || (user as any).customClaims?.role
  return role === 'physiotherapist'
}
