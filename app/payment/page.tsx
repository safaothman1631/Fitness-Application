"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

function PaymentContent() {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [plan, setPlan] = useState("")
  const [cycle, setCycle] = useState("")
  const [processing, setProcessing] = useState(false)
  
  const isRTL = language === "ar" || language === "ku"

  useEffect(() => {
    setPlan(searchParams.get("plan") || "premium")
    setCycle(searchParams.get("cycle") || "monthly")
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    }
  }, [searchParams, isRTL])
  
  const convertToArabicNumerals = (num: number): string => {
    if (!isRTL) return num.toString()
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('')
  }

  const prices: Record<string, number> = {
    pro: 99,
    "pro-plus": 249,
    elite: 449,
    legend: 799,
  }

  const planNames: Record<string, string> = {
    pro: `Pro (${t("oneMonth")})`,
    "pro-plus": `Pro Plus (${t("threeMonths")})`,
    elite: `Elite (${t("sixMonths")})`,
    legend: `Legend (${t("oneYear")})`,
  }

  const selectedPrice = prices[plan] || 99

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      router.push("/payment/success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5" dir={isRTL ? "rtl" : "ltr"}>
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className={`container mx-auto px-4 py-4 ${isRTL ? "flex items-center justify-end" : "flex items-center justify-start"}`}>
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            {isRTL ? (
              <>
                <div className="flex items-center gap-2 flex-row-reverse">
                  <span className="text-2xl font-bold">{t("payment")}</span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
                <Link href="/membership">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/membership">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold">{t("payment")}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h1 className={`text-3xl font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}>{t("paymentInformation")}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 border-2">
                <h2 className={`text-xl font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}>{t("cardInformation")}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className={isRTL ? "text-right block" : ""}>{t("cardholderName")}</Label>
                    <Input id="cardName" placeholder={t("cardholderNamePlaceholder")} required className={isRTL ? "text-right" : ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className={isRTL ? "text-right block" : ""}>{t("cardNumber")}</Label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder={isRTL ? "٣٤٥٦ ٢٠١٩ ٨٧٦٥ ١٢٣٤" : "1234 5678 9012 3456"} maxLength={19} required className={isRTL ? "text-right" : ""} />
                      <CreditCard className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className={isRTL ? "text-right block" : ""}>{t("expiration")}</Label>
                      <Input id="expiry" placeholder={isRTL ? "٢٥/٠١" : "MM/YY"} maxLength={5} required className={isRTL ? "text-right" : ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className={isRTL ? "text-right block" : ""}>{t("cvv")}</Label>
                      <Input id="cvv" type="password" placeholder="***" maxLength={3} required className={isRTL ? "text-right" : ""} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2">
                <h2 className={`text-xl font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}>{t("billingAddress")}</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className={isRTL ? "text-right block" : ""}>{t("address")}</Label>
                    <Input id="address" placeholder={t("streetNeighborhoodPlaceholder")} required className={isRTL ? "text-right" : ""} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className={isRTL ? "text-right block" : ""}>{t("city")}</Label>
                      <Input id="city" placeholder={t("cityPlaceholder")} required className={isRTL ? "text-right" : ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip" className={isRTL ? "text-right block" : ""}>{t("postalCode")}</Label>
                      <Input id="zip" placeholder={t("postalCodePlaceholder")} required className={isRTL ? "text-right" : ""} />
                    </div>
                  </div>
                </div>
              </Card>

              <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90" disabled={processing}>
                {processing ? t("processing") : `${t("pay")} ${isRTL ? convertToArabicNumerals(Math.round(selectedPrice * 1.2)) : Math.round(selectedPrice * 1.2)}$`}
              </Button>
              <div className={`flex items-center justify-center gap-2 text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                <Lock className="w-4 h-4" />
                <span>{t("securePaymentSSL")}</span>
              </div>
            </form>
          </div>

          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isRTL ? "text-right" : "text-left"}`}>{t("orderSummary")}</h2>
            <Card className="p-6 border-2 mb-6" dir={isRTL ? "rtl" : "ltr"}>
              <div className="space-y-4">
                <div className={`flex items-center justify-between pb-4 border-b border-border ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={isRTL ? "text-right" : ""}>
                    <h3 className="font-semibold text-lg">{planNames[plan] || `Pro (${t("oneMonth")})`}</h3>
                    <p className="text-sm text-muted-foreground">{t("oneTimePayment")}</p>
                  </div>
                  <div className={isRTL ? "text-left" : "text-right"}>
                    <p className="text-2xl font-bold w-full" dir={isRTL ? "rtl" : "ltr"}>
                      {isRTL ? `${convertToArabicNumerals(selectedPrice)}$` : `$${selectedPrice}`}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-muted-foreground">{t("subtotal")}</span>
                    <span dir={isRTL ? "rtl" : "ltr"}>{isRTL ? `${convertToArabicNumerals(selectedPrice)}$` : `$${selectedPrice}`}</span>
                  </div>
                  <div className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span className="text-muted-foreground">{t("tax")} ({isRTL ? "٪٢٠" : "20%"})</span>
                    <span dir={isRTL ? "rtl" : "ltr"}>{isRTL ? `${convertToArabicNumerals(Math.round(selectedPrice * 0.2))}$` : `$${Math.round(selectedPrice * 0.2)}`}</span>
                  </div>
                  <div className={`flex justify-between pt-2 border-t border-border font-semibold text-base ${isRTL ? "flex-row-reverse" : ""}`}>
                    <span>{t("total")}</span>
                    <span dir={isRTL ? "rtl" : "ltr"}>{isRTL ? `${convertToArabicNumerals(Math.round(selectedPrice * 1.2))}$` : `$${Math.round(selectedPrice * 1.2)}`}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" dir={isRTL ? "rtl" : "ltr"}>
              <h3 className={`font-semibold mb-3 ${isRTL ? "text-right" : "text-left"}`}>{t("includedInPlan")}</h3>
              <div className="space-y-2">
                {[
                  t("completeExerciseLibrary"),
                  t("detailedProgressTracking"),
                  t("prioritySupport")
                ].map((feature, index) => (
                  <div key={index} className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className={`text-sm ${isRTL ? "text-right w-full" : ""}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 mt-6 border-2" dir={isRTL ? "rtl" : "ltr"}>
              <div className={`flex items-start gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className={`text-sm text-muted-foreground ${isRTL ? "text-right" : ""}`}>
                  <p className="font-semibold text-foreground mb-1">{t("securePayment")}</p>
                  <p>{t("securePaymentInfo")}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
