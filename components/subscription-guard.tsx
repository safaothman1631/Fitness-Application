"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { checkSubscriptionStatus, getSubscriptionExpiry } from "@/lib/subscription"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, ArrowLeft } from "lucide-react"

export default function SubscriptionRequiredGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  useEffect(() => {
    const expiry = getSubscriptionExpiry()
    const status = checkSubscriptionStatus(expiry)
    
    if (!status.isActive) {
      // Redirect to dashboard if subscription is expired
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }
  }, [router])

  const expiry = getSubscriptionExpiry()
  const status = checkSubscriptionStatus(expiry)

  if (!status.isActive) {
    return (
      <div className="min-h-screen bg-[#0E151B] text-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-gradient-to-br from-rose-950/90 via-rose-900/80 to-rose-950/90 border-2 border-rose-400/60 backdrop-blur-sm shadow-2xl shadow-rose-500/20">
          <div className="p-8 text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse">
                <Lock className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Message */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3 drop-shadow-lg">
                Premium Feature Locked
              </h2>
              <p className="text-rose-50 font-medium leading-relaxed">
                This feature requires an active subscription. Please renew your subscription to continue accessing premium content.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/membership")}
                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-rose-500/40 hover:shadow-rose-500/60 transition-all"
              >
                Renew Subscription
              </Button>
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="w-full border-rose-300/50 bg-rose-950/50 text-rose-50 hover:bg-rose-900/50 hover:border-rose-300/70 font-semibold h-12 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            <p className="text-sm text-rose-100/70 font-medium">
              Redirecting to dashboard in 3 seconds...
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
