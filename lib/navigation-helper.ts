/**
 * Navigation Helper
 * Prevents users from going back to login page after authentication
 */

/**
 * Replace current URL in history (prevents back navigation)
 * Use this after successful login to prevent going back to login page
 */
export function replaceHistory(path: string) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', path)
  }
}

/**
 * Prevent going back to login pages
 * Call this in protected pages to ensure users stay authenticated
 */
export function preventBackToLogin() {
  if (typeof window === 'undefined') return

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const userRole = localStorage.getItem('userRole')

  if (isAuthenticated && userRole) {
    // Listen for back button
    window.addEventListener('popstate', (event) => {
      const currentPath = window.location.pathname
      
      // If user tries to go back to login, redirect to their dashboard
      if (currentPath.includes('/login') || currentPath.includes('/giris')) {
        event.preventDefault()
        
        // Redirect to appropriate dashboard based on role
        const dashboardMap: Record<string, string> = {
          superadmin: '/superadmin',
          admin: '/admin',
          trainer: '/trainer',
          physiotherapist: '/physiotherapist',
          owner: '/owner',
          patient: '/patient-panel',
          user: '/dashboard',
        }
        
        const dashboard = dashboardMap[userRole] || '/dashboard'
        window.location.replace(dashboard)
      }
    })
  }
}

/**
 * Get dashboard path for current user role
 */
export function getDashboardPath(): string {
  if (typeof window === 'undefined') return '/dashboard'
  
  const userRole = localStorage.getItem('userRole')
  
  const dashboardMap: Record<string, string> = {
    superadmin: '/superadmin',
    admin: '/admin',
    trainer: '/trainer',
    physiotherapist: '/physiotherapist',
    owner: '/owner',
    patient: '/patient-panel',
    user: '/dashboard',
  }
  
  return dashboardMap[userRole || 'user'] || '/dashboard'
}
