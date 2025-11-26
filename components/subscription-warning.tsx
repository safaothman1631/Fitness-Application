"use client"

import { AlertTriangle, Clock, CreditCard, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/useLanguage"

interface SubscriptionWarningProps {
  daysRemaining?: number
  variant?: "warning" | "expired"
}

export function SubscriptionWarning({ daysRemaining = 0, variant = "expired" }: SubscriptionWarningProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  if (variant === "expired") {
    return (
      <Card className="relative overflow-hidden border-2 border-rose-400/60 bg-gradient-to-br from-rose-950/90 via-rose-900/80 to-rose-950/90 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-top-4 duration-500 shadow-xl shadow-rose-500/20" dir={isRTL ? "rtl" : "ltr"}>
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0 animate-shimmer" />
        
        <div className="relative p-6 md:p-8">
          {isRTL ? (
            // RTL Layout: Icon on right, Content on left
            <div className="flex items-start gap-4">
              {/* Icon on right */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Content on left */}
              <div className="flex-1 text-right">
                <div className="flex items-center gap-2 mb-2 justify-end">
                  <span className="text-xs px-3 py-1 bg-rose-500/30 border border-rose-300/50 rounded-full text-rose-50 font-semibold whitespace-nowrap">
                    {t("actionRequired")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                    {t("subscriptionExpired")}
                  </h3>
                </div>
                <p className="text-rose-50 font-medium text-sm md:text-base mb-5 leading-relaxed">
                  {t("subscriptionExpiredMessage")}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                  <div className="text-rose-100 text-sm font-medium text-right">
                    {t("workoutPrograms")}
                  </div>
                  <div className="text-rose-100 text-sm font-medium text-right">
                    {t("mealPlans")}
                  </div>
                  <div className="text-rose-100 text-sm font-medium text-right">
                    {t("progressTracking")}
                  </div>
                  <div className="text-rose-100 text-sm font-medium text-right">
                    {t("expertSupport")}
                  </div>
                </div>

                {/* Info Label */}
                <div className="w-full bg-gradient-to-r from-rose-500/20 to-rose-600/20 border-2 border-rose-400/40 text-white font-bold px-6 py-4 h-auto rounded-xl shadow-lg backdrop-blur-sm flex items-center justify-center gap-3 flex-row-reverse">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-base">{t("renewSubscriptionNow")}</span>
                </div>              </div>
            </div>
          ) : (
            // LTR Layout: Icon on left, Content on right
            <div className="flex items-start gap-4">
              {/* Icon on left */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Content on right */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                    {t("subscriptionExpired")}
                  </h3>
                  <span className="text-xs px-3 py-1 bg-rose-500/30 border border-rose-300/50 rounded-full text-rose-50 font-semibold whitespace-nowrap">
                    {t("actionRequired")}
                  </span>
                </div>
                <p className="text-rose-50 font-medium text-sm md:text-base mb-5 leading-relaxed">
                  {t("subscriptionExpiredMessage")}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                  <div className="text-rose-100 text-sm font-medium">
                    {t("workoutPrograms")}
                  </div>
                  <div className="text-rose-100 text-sm font-medium">
                    {t("mealPlans")}
                  </div>
                  <div className="text-rose-100 text-sm font-medium">
                    {t("progressTracking")}
                  </div>
                  <div className="text-rose-100 text-sm font-medium">
                    {t("expertSupport")}
                  </div>
                </div>

                {/* Info Label */}
                <div className="w-full bg-gradient-to-r from-rose-500/20 to-rose-600/20 border-2 border-rose-400/40 text-white font-bold px-6 py-4 h-auto rounded-xl shadow-lg backdrop-blur-sm flex items-center justify-center gap-3">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-base">{t("renewSubscriptionNow")}</span>
                </div>              </div>
            </div>
          )}
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent animate-pulse" />
      </Card>
    )
  }

  // Warning variant (for approaching expiry)
  return (
    <Card className="relative overflow-hidden border border-amber-500/50 bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-amber-950/30 backdrop-blur-sm mb-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="p-4 md:p-6">
        <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          
          <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
            <h3 className="text-lg font-bold text-white mb-1">
              {t("subscriptionExpiringSoon")}
            </h3>
            <p className="text-amber-200/70 text-sm mb-3">
              {t("subscriptionExpiresInDays")} {daysRemaining} {daysRemaining === 1 ? (language === "ar" ? "يوم" : language === "ku" ? "ڕۆژ" : language === "tr" ? "gün" : "day") : (language === "ar" ? "أيام" : language === "ku" ? "ڕۆژ" : language === "tr" ? "gün" : "days")}.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/40 rounded-lg text-amber-300 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>{t("renewNow")}</span>
            </div>          </div>
        </div>
      </div>
    </Card>
  )
}
