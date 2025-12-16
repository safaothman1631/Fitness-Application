/**
 * Android Back Button Handler
 * Handles hardware back button on Android devices
 */

"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

/**
 * Hook to handle Android back button behavior
 * Prevents app exit on certain pages and provides custom navigation
 */
export function useAndroidBackButton() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only run on Android devices
    const isAndroid = /Android/i.test(navigator.userAgent)
    if (!isAndroid) return

    // Pages where back button should navigate to dashboard instead of exiting
    const protectedRoutes = ['/dashboard', '/workout', '/meals', '/physio', '/profile']
    const isProtectedRoute = protectedRoutes.includes(pathname)

    const handleBackButton = (event: PopStateEvent) => {
      if (isProtectedRoute) {
        // If on a protected route, go to dashboard instead of exiting
        if (pathname !== '/dashboard') {
          event.preventDefault()
          router.push('/dashboard')
        } else {
          // On dashboard, show exit confirmation
          const shouldExit = window.confirm('هەڵویستن لە بەرنامە؟ Exit app?')
          if (!shouldExit) {
            event.preventDefault()
            // Push state again to prevent exit
            window.history.pushState(null, '', pathname)
          }
        }
      }
    }

    // Add initial state to history
    window.history.pushState(null, '', pathname)

    // Listen for back button
    window.addEventListener('popstate', handleBackButton)

    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [pathname, router])
}

/**
 * Component wrapper for Android back button handling
 */
export function AndroidBackButtonHandler({ children }: { children: React.ReactNode }) {
  useAndroidBackButton()
  return <>{children}</>
}
