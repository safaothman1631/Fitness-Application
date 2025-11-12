"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { setTestSubscription, getSubscriptionExpiry, checkSubscriptionStatus, getUserAccessKey, getUserJoinDate } from "@/lib/subscription"
import { Calendar, Check, X, Key, User } from "lucide-react"

export function SubscriptionTestPanel() {
  const [status, setStatus] = useState<any>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  const testSubscription = (days: number) => {
    setTestSubscription(days)
    // Trigger a small delay to ensure state updates
    setTimeout(() => {
      updateStatus()
      // Trigger page refresh to update all components
      window.dispatchEvent(new Event('storage'))
    }, 100)
  }

  const updateStatus = () => {
    const expiry = getSubscriptionExpiry()
    const result = checkSubscriptionStatus(expiry)
    const key = getUserAccessKey()
    const join = getUserJoinDate()
    setStatus(result)
    setUserInfo({ key, joinDate: join })
  }

  const clearSubscription = () => {
    localStorage.removeItem('subscriptionExpiry')
    localStorage.removeItem('userAccessKey')
    localStorage.removeItem('userJoinDate')
    setStatus(null)
    setUserInfo(null)
  }

  return (
    <Card className="bg-[#101A23] border-[#2E3944] p-6 max-w-2xl mx-auto mb-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-bold text-white">Subscription Test Panel</h3>
        </div>

        <p className="text-sm text-slate-400 mb-4">
          Test subscription expiry functionality (for development only)
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => testSubscription(30)}
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              size="sm"
            >
              30 Days 🟦
            </Button>
            <Button
              onClick={() => testSubscription(15)}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
              size="sm"
            >
              15 Days 🟨
            </Button>
            <Button
              onClick={() => testSubscription(7)}
              variant="outline"
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              size="sm"
            >
              7 Days 🟧
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => testSubscription(3)}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              size="sm"
            >
              3 Days 🔴
            </Button>
            <Button
              onClick={() => testSubscription(-1)}
              variant="outline"
              className="border-red-600/30 text-red-500 hover:bg-red-600/10"
              size="sm"
            >
              Expired ⛔
            </Button>
          </div>
        </div>

        <Button
          onClick={clearSubscription}
          variant="outline"
          className="w-full border-slate-500/30 text-slate-400 hover:bg-slate-500/10"
          size="sm"
        >
          <X className="w-4 h-4 mr-2" />
          Clear Test Data
        </Button>

        {status && (
          <div className="mt-4 space-y-3">
            {/* User Info */}
            {userInfo && (
              <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/30">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-400" />
                  User Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-slate-400">Access Key:</span>
                    <code className="text-indigo-300 font-mono text-xs">{userInfo.key}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-400">Join Date:</span>
                    <span className="text-cyan-300">{new Date(userInfo.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Status */}
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h4 className="text-sm font-semibold text-white mb-2">Subscription Status:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  {status.isActive ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-slate-300">
                    Active: <span className={status.isActive ? "text-green-400" : "text-red-400"}>
                      {status.isActive ? "Yes" : "No"}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {!status.isExpired ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-slate-300">
                    Expired: <span className={status.isExpired ? "text-red-400" : "text-green-400"}>
                      {status.isExpired ? "Yes" : "No"}
                    </span>
                  </span>
                </div>
                <div className="text-slate-300">
                  Days Remaining: <span className="text-blue-400 font-semibold">{status.daysRemaining}</span>
                </div>
                {status.expiryDate && (
                  <div className="text-slate-300">
                    Expiry Date: <span className="text-blue-400">{status.expiryDate.toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={updateStatus}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="sm"
        >
          Check Status
        </Button>
      </div>
    </Card>
  )
}
