/**
 * Next.js Middleware - Security & Request Processing
 * Runs before every request to add security headers and handle CSRF protection
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * CSRF Token validation
 * Validates that state-changing requests include a valid CSRF token
 */
function validateCsrfToken(request: NextRequest): boolean {
  const method = request.method
  
  // Only validate state-changing methods
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return true
  }
  
  // Skip CSRF for API routes (they use JWT authentication)
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return true
  }
  
  // Get CSRF token from header or cookie
  const csrfTokenFromHeader = request.headers.get('X-CSRF-Token')
  const csrfTokenFromCookie = request.cookies.get('csrf-token')?.value
  
  // If no token in cookie, allow (first request)
  if (!csrfTokenFromCookie) {
    return true
  }
  
  // Validate tokens match
  return csrfTokenFromHeader === csrfTokenFromCookie
}

/**
 * Generate CSRF token
 */
function generateCsrfToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add security headers (in addition to next.config.mjs headers)
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  // CSRF Protection
  const csrfToken = request.cookies.get('csrf-token')?.value
  
  if (!csrfToken) {
    // Set CSRF token cookie for new sessions
    const newToken = generateCsrfToken()
    response.cookies.set('csrf-token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    })
  } else {
    // Validate CSRF token for state-changing requests
    if (!validateCsrfToken(request)) {
      console.warn('⚠️ CSRF validation failed:', {
        method: request.method,
        path: request.nextUrl.pathname,
        hasHeader: !!request.headers.get('X-CSRF-Token'),
        hasCookie: !!csrfToken
      })
      
      return NextResponse.json(
        { 
          error: 'CSRF validation failed',
          message: 'Invalid or missing CSRF token'
        },
        { status: 403 }
      )
    }
  }
  
  // Add CSRF token to response header for client to read
  if (csrfToken) {
    response.headers.set('X-CSRF-Token', csrfToken)
  }
  
  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icon files (PWA icons)
     * - manifest.json (PWA manifest)
     * - public folder assets (images, icons, etc.)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|icon.*\\.(?:svg|png)|apple-icon\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
