"use client"

import TransitionLink from "@/components/transition-link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Crown, Zap } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export default function MembershipPage() {
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  // Set document direction
  if (typeof document !== 'undefined') {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }

  // Convert numbers to Arabic/Kurdish numerals for RTL
  const convertToArabicNumerals = (num: number): string => {
    if (!isRTL) return num.toString()
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('')
  }

  const plans = [
    {
      name: "Pro",
      duration: t("oneMonth"),
      icon: Zap,
      price: 99,
      description: t("idealForBeginners"),
      features: [
        t("exerciseLibraryFull"),
        t("progressTracking"),
        t("videoGuidance"),
        t("goalOriented"),
      ],
      limitations: [],
      color: "from-blue-500 to-cyan-500",
      popular: false,
    },
    {
      name: "Pro Plus",
      duration: t("threeMonths"),
      icon: Zap,
      price: 249,
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
      name: "Elite",
      duration: t("sixMonths"),
      icon: Crown,
      price: 449,
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
      color: "from-purple-500 to-pink-500",
      popular: false,
    },
    {
      name: "Legend",
      duration: t("oneYear"),
      icon: Crown,
      price: 799,
      description: t("ultimateFitnessTransformation"),
      features: [
        t("exerciseLibraryFull"),
        t("personalizedPrograms"),
        t("progressTracking"),
        t("videoGuidance"),
        t("achievementBadges"),
        t("analytics"),
        t("helpSupport"),
        t("priorityCustomerSupport"),
        t("exclusiveCommunityAccess"),
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
          <TransitionLink href="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              {t("back")}
            </Button>
          </TransitionLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Text */}
        <div className={`text-center mb-12 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("chooseYourPlan")}</h2>
          <p className="text-gray-400 text-lg">{t("selectPerfectPlan")}</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon
            const priceNumber = convertToArabicNumerals(plan.price)
            const displayPrice = isRTL ? `${priceNumber}$` : `$${plan.price}`

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

                <div className={`relative p-6 sm:p-8 ${isRTL ? "text-right" : ""}`}>
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className={`mb-4 flex ${isRTL ? "justify-end" : "justify-start"}`}>
                      <Badge className="bg-primary/80 text-white border-0">
                        {t("mostPopularBadge")}
                      </Badge>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className={`mb-6 ${isRTL ? "clear-both" : ""}`}>
                    <div className={`flex items-center gap-3 mb-3 ${isRTL ? "flex-row justify-end" : ""}`}>
                      {isRTL ? (
                        <>
                          <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                          <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                        </>
                      )}
                    </div>
                    <p className={`text-gray-400 text-sm`}>{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className={`flex flex-col gap-1 ${isRTL ? "items-end" : "items-start"}`}>
                      <span className={`text-4xl font-bold text-white ${isRTL ? "text-right w-full" : "text-left"}`}>{displayPrice}</span>
                      <span className={`text-gray-400 text-sm ${isRTL ? "text-right w-full" : "text-left"}`}>{plan.duration}</span>
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
                    <TransitionLink href="/payment">
                      {t("subscribeNow")}
                    </TransitionLink>
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className={`text-sm text-gray-300 flex-1`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="pt-6 border-t border-white/10 space-y-2">
                      <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider`}>{t("limitations")}</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                          <div className="h-5 w-5 rounded-full border border-gray-600 flex-shrink-0 mt-0.5" />
                          <span className={`text-sm text-gray-500 flex-1`}>{limitation}</span>
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
          <h2 className={`text-3xl font-bold text-white mb-8 text-center`}>{t("faqTitle")}</h2>
          <div className="space-y-4">
            {[
              { q: t("faqChangePlanQ"), a: t("faqChangePlanA") },
              { q: t("faqFreeTrialQ"), a: t("faqFreeTrialA") },
              { q: t("faqPaymentMethodsQ"), a: t("faqPaymentMethodsA") },
              { q: t("faqDataSecureQ"), a: t("faqDataSecureA") },
            ].map((faq, index) => (
              <Card
                key={index}
                className={`border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-white/20 transition-colors ${isRTL ? "text-right" : ""}`}
              >
                <h4 className={`font-semibold text-white mb-2`}>{faq.q}</h4>
                <p className={`text-gray-400 text-sm`}>{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
