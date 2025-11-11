"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Crown, Zap, Star } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageSelector } from "@/components/language-selector"

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const { t } = useLanguage()

  const plans = [
    {
      name: t("freePlan"),
      icon: Star,
      price: { monthly: 0, yearly: 0 },
      description: t("idealForBeginners"),
      features: [t("exerciseLibraryFull"), t("progressTracking"), t("videoGuidance")],
      limitations: [t("limitations")],
      color: "from-gray-500 to-gray-600",
      popular: false,
    },
    {
      name: t("premiumPlan"),
      icon: Zap,
      price: { monthly: 99, yearly: 990 },
      description: t("mostPopularChoice"),
      features: [
        t("exerciseLibraryFull"),
        t("personalizedPrograms"),
        t("progressTracking"),
        t("videoGuidance"),
        t("goalOriented"),
        t("achievementBadges"),
      ],
      limitations: [],
      color: "from-primary to-secondary",
      popular: true,
    },
    {
      name: t("proPlan"),
      icon: Crown,
      price: { monthly: 199, yearly: 1990 },
      description: t("forProfessionalAthletes"),
      features: [
        t("exerciseLibraryFull"),
        t("personalizedPrograms"),
        t("progressTracking"),
        t("videoGuidance"),
        t("achievementBadges"),
        t("analytics"),
        t("helpSupport"),
      ],
      limitations: [],
      color: "from-yellow-500 to-orange-500",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-black/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {t("membershipPlans")}
          </h1>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("back")}
            </Button>
          </Link>
          <LanguageSelector />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`font-medium ${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>
            {t("monthly")}
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-950"
            role="switch"
            aria-checked={billingCycle === "yearly"}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                billingCycle === "yearly" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`font-medium ${billingCycle === "yearly" ? "text-white" : "text-gray-400"}`}>
            {t("yearly")}
          </span>
          {billingCycle === "yearly" && (
            <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">
              {t("savePercent")}
            </Badge>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = plan.price[billingCycle]
            const displayPrice = price === 0 ? t("freePlan") : `$${price}`
            const periodLabel = billingCycle === "monthly" ? "/month" : "/year"

            return (
              <Card
                key={plan.name}
                className={`relative border backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden group ${
                  plan.popular
                    ? "border-primary/50 bg-gradient-to-br from-primary/10 to-secondary/10 md:scale-105"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <div className="relative p-6 sm:p-8">
                  {/* Popular Badge */}
                  {plan.popular && (
                    <Badge className="mb-4 bg-primary/80 text-white border-0">
                      {t("mostPopularBadge")}
                    </Badge>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`h-12 w-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{displayPrice}</span>
                      {price > 0 && <span className="text-gray-400">{periodLabel}</span>}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className={`w-full mb-6 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <Link href={plan.name === t("freePlan") ? "/" : "/payment"}>
                      {plan.name === t("freePlan") ? t("getStarted") : t("subscribeNow")}
                    </Link>
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="pt-6 border-t border-white/10 space-y-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t("limitations")}</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full border border-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("faqTitle")}</h2>
          <div className="space-y-4">
            {[
              { q: t("faqChangePlanQ"), a: t("faqChangePlanA") },
              { q: t("faqFreeTrialQ"), a: t("faqFreeTrialA") },
              { q: t("faqPaymentMethodsQ"), a: t("faqPaymentMethodsA") },
              { q: t("faqDataSecureQ"), a: t("faqDataSecureA") },
            ].map((faq, index) => (
              <Card
                key={index}
                className="border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-colors"
              >
                <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
