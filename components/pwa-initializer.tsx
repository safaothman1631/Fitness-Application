"use client"

import { useEffect } from "react"
import { registerServiceWorker, trackPWAInstall } from "@/lib/pwa-utils"

export function PWAInitializer() {
  useEffect(() => {
    // Register service worker
    registerServiceWorker()
    
    // Track PWA install events
    trackPWAInstall()
  }, [])

  return null
}
