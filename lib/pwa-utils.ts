/**
 * PWA Utilities
 * Helper functions for Progressive Web App features
 */

/**
 * Register Service Worker
 */
export async function registerServiceWorker() {
  if (typeof window === 'undefined') return

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })
      
      console.log('✅ Service Worker registered:', registration.scope)
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        console.log('🔄 New Service Worker found')
        
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🆕 New content available, refresh to update')
            // You can show a toast/notification here
          }
        })
      })
      
      return registration
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  } else {
    console.log('⚠️ Service Workers not supported')
  }
}

/**
 * Check if app is installed (running in standalone mode)
 */
export function isAppInstalled(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

/**
 * Check if PWA install is available
 */
export function isPWAInstallable(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check if browser supports installation
  return 'BeforeInstallPromptEvent' in window
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied'
  }
  
  if (Notification.permission === 'granted') {
    return 'granted'
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission
  }
  
  return Notification.permission
}

/**
 * Show notification
 */
export async function showNotification(
  title: string,
  options?: NotificationOptions
): Promise<void> {
  if (typeof window === 'undefined') return
  
  const permission = await requestNotificationPermission()
  
  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.getRegistration()
    
    if (registration) {
      await registration.showNotification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options,
      })
    } else {
      new Notification(title, options)
    }
  }
}

/**
 * Get PWA display mode
 */
export function getPWADisplayMode(): 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen' {
  if (typeof window === 'undefined') return 'browser'
  
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone'
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui'
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen'
  }
  return 'browser'
}

/**
 * Track PWA install event
 */
export function trackPWAInstall() {
  if (typeof window === 'undefined') return
  
  window.addEventListener('appinstalled', () => {
    console.log('🎉 PWA was installed')
    // Track with analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'PWA Installed',
      })
    }
  })
}
