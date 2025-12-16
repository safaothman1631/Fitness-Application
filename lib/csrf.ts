/**
 * CSRF Protection Utilities
 * Client-side helpers for CSRF token management
 */

/**
 * Get CSRF token from cookie
 */
export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const csrfCookie = cookies.find(c => c.trim().startsWith('csrf-token='))
  
  if (!csrfCookie) return null
  
  return csrfCookie.split('=')[1]
}

/**
 * Get CSRF token from response headers
 * Use this after a request to update the client-side token
 */
export function getCsrfTokenFromResponse(headers: Headers): string | null {
  return headers.get('X-CSRF-Token')
}

/**
 * Add CSRF token to fetch options
 * Use this for all state-changing requests (POST, PUT, PATCH, DELETE)
 */
export function withCsrfToken(options: RequestInit = {}): RequestInit {
  const token = getCsrfToken()
  
  if (!token) {
    console.warn('⚠️ No CSRF token found')
    return options
  }
  
  return {
    ...options,
    headers: {
      ...options.headers,
      'X-CSRF-Token': token
    }
  }
}

/**
 * Fetch wrapper with automatic CSRF token injection
 */
export async function fetchWithCsrf(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const method = options.method?.toUpperCase() || 'GET'
  
  // Add CSRF token for state-changing methods
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return fetch(url, withCsrfToken(options))
  }
  
  return fetch(url, options)
}
