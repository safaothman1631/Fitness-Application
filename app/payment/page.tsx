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

function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [plan, setPlan] = useState("")
  const [cycle, setCycle] = useState("")
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    setPlan(searchParams.get("plan") || "premium")
    setCycle(searchParams.get("cycle") || "monthly")
  }, [searchParams])

  const prices: Record<string, number> = {
    pro: 99,
    "pro-plus": 249,
    elite: 449,
    legend: 799,
  }

  const planNames: Record<string, string> = {
    pro: "Pro (1 Month)",
    "pro-plus": "Pro Plus (3 Months)",
    elite: "Elite (6 Months)",
    legend: "Legend (1 Year)",
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/membership">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">Payment Information</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 border-2">
                <h2 className="text-xl font-semibold mb-4">Card Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" placeholder="First Last Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" maxLength={19} required />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration</Label>
                      <Input id="expiry" placeholder="MM/YY" maxLength={5} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" type="password" placeholder="123" maxLength={3} required />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2">
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street, Neighborhood" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Istanbul" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Postal Code</Label>
                      <Input id="zip" placeholder="34000" required />
                    </div>
                  </div>
                </div>
              </Card>

              <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90" disabled={processing}>
                {processing ? "Processing..." : `Pay $${Math.round(selectedPrice * 1.2)}`}
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Secure payment - Protected with SSL encryption</span>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <Card className="p-6 border-2 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h3 className="font-semibold text-lg">{planNames[plan] || "Pro (1 Month)"}</h3>
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${selectedPrice}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${selectedPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (20%)</span>
                    <span>${Math.round(selectedPrice * 0.2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border font-semibold text-base">
                    <span>Total</span>
                    <span>${Math.round(selectedPrice * 1.2)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
              <h3 className="font-semibold mb-3">Included in this Plan:</h3>
              <div className="space-y-2">
                {["Complete exercise library", "Personalized programs", "Detailed progress tracking", "Video guidance", "Priority support"].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 mt-6 border-2">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-1">Secure Payment</p>
                  <p>Your payment information is protected with 256-bit SSL encryption. Card information is not stored.</p>
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
