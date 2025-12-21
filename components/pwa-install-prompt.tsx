"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, X } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const { t } = useLanguage()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('✅ App is already installed')
      return
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      console.log('💾 Install prompt available')
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after 3 seconds (don't be too aggressive)
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for user response
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response: ${outcome}`)

    if (outcome === 'accepted') {
      console.log('✅ User accepted the install prompt')
    } else {
      console.log('❌ User dismissed the install prompt')
    }

    // Clear the prompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for 7 days
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  if (!showPrompt || !deferredPrompt) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 p-4 shadow-lg border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm md:left-auto md:right-4 md:w-96">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 rounded-full bg-primary/20">
          <Download className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-sm">
            {t("installApp") || "Install FitPro App"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {t("installAppDescription") || "Install our app for a better experience with offline access and quick launch."}
          </p>
          
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="flex-1"
            >
              {t("install") || "Install"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
