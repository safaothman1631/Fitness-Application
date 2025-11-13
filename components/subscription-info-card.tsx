"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Key, Calendar, Shield, CheckCircle2, XCircle, Clock, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"

interface SubscriptionInfoCardProps {
  userKey: string
  joinDate: string
  expiryDate: string | null
  isActive: boolean
  daysRemaining: number
}

export function SubscriptionInfoCard({ 
  userKey, 
  joinDate, 
  expiryDate, 
  isActive,
  daysRemaining 
}: SubscriptionInfoCardProps) {
  const [copied, setCopied] = useState(false)
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  const copyKey = () => {
    navigator.clipboard.writeText(userKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  // Determine color scheme based on days remaining
  const getColorScheme = () => {
    if (!isActive || daysRemaining <= 0) {
      return {
        primary: "from-red-500 to-rose-500",
        bg: "from-red-950/50 to-rose-950/50",
        border: "border-red-500/30",
        icon: "text-red-400",
        glow: "shadow-red-500/30",
        text: "text-red-400"
      }
    } else if (daysRemaining <= 7) {
      return {
        primary: "from-orange-500 to-amber-500",
        bg: "from-orange-950/50 to-amber-950/50",
        border: "border-orange-500/30",
        icon: "text-orange-400",
        glow: "shadow-orange-500/30",
        text: "text-orange-400"
      }
    } else if (daysRemaining <= 15) {
      return {
        primary: "from-yellow-500 to-amber-500",
        bg: "from-yellow-950/50 to-amber-950/50",
        border: "border-yellow-500/30",
        icon: "text-yellow-400",
        glow: "shadow-yellow-500/30",
        text: "text-yellow-400"
      }
    } else {
      return {
        primary: "from-cyan-500 to-blue-500",
        bg: "from-cyan-950/50 to-blue-950/50",
        border: "border-cyan-500/30",
        icon: "text-cyan-400",
        glow: "shadow-cyan-500/30",
        text: "text-cyan-400"
      }
    }
  }

  const colors = getColorScheme()

  return (
    <Card className="bg-gradient-to-br from-[#101A23] to-[#0E151B] border-[#2E3944] overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full blur-3xl" />
      </div>

      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-white text-base flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          {t("subscriptionAndAccessKey")}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        {/* Access Key Section */}
        <div className={`p-4 rounded-xl bg-gradient-to-r ${colors.bg} border ${colors.border} transition-all duration-500`} dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.primary} flex items-center justify-center shadow-lg ${colors.glow} transition-all duration-500`}>
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-xs ${colors.icon} opacity-70 uppercase tracking-wider font-semibold`}>{t("yourAccessKey")}</p>
                <p className={`text-sm ${colors.icon} opacity-50 mt-0.5`}>{t("personalIdentifier")}</p>
              </div>
            </div>
          </div>

          {/* Key Display */}
          <div className="relative group">
            <div className={`flex items-center gap-2 p-3 rounded-lg bg-[#0E151B] border ${colors.border} font-mono text-sm transition-all duration-500`}>
              <code className={`flex-1 ${colors.text} tracking-wider transition-colors duration-500`}>
                {userKey}
              </code>
              <Button
                onClick={copyKey}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-opacity-20 transition-all"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className={`w-4 h-4 ${colors.icon} group-hover:opacity-80`} />
                )}
              </Button>
            </div>
            {copied && (
              <span className="absolute -top-8 right-0 text-xs text-green-400 bg-green-950/50 px-2 py-1 rounded border border-green-500/30 animate-in fade-in slide-in-from-bottom-2">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* Subscription Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir={isRTL ? "rtl" : "ltr"}>
          {/* Status Badge */}
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              {isActive ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="text-xs text-slate-400 uppercase tracking-wide">{t("statusLabel")}</span>
            </div>
            <p className={`font-semibold text-sm ${isActive ? "text-green-400" : "text-red-400"}`}>
              {isActive ? t("active") : t("expired")}
            </p>
          </div>

          {/* Days Remaining */}
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wide">{t("remainingLabel")}</span>
            </div>
            <p className={`font-semibold text-sm ${
              daysRemaining > 7 ? "text-green-400" : 
              daysRemaining > 0 ? "text-yellow-400" : 
              "text-red-400"
            }`}>
              {daysRemaining > 0 ? `${t("days")} ${daysRemaining}` : t("expired")}
            </p>
          </div>
        </div>

        {/* Date Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir={isRTL ? "rtl" : "ltr"}>
          {/* Join Date */}
          <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs text-slate-400">{t("joinedLabel")}</span>
            </div>
            <p className="text-sm text-white font-medium">{formatDate(joinDate)}</p>
          </div>

          {/* Expiry Date */}
          <div className="p-3 rounded-lg bg-slate-900/30 border border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs text-slate-400">{t("expiresLabel")}</span>
            </div>
            <p className="text-sm text-white font-medium">
              {expiryDate ? formatDate(expiryDate) : "Not set"}
            </p>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20" dir={isRTL ? "rtl" : "ltr"}>
          <p className="text-xs text-blue-300/70 leading-relaxed">
            {t("accessKeyNote")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
