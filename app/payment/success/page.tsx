import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-12 text-center border-2">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl text-muted-foreground mb-8">Congratulations! Your Premium membership is activated. You can now access all features.</p>
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Membership Plan</p>
              <p className="font-semibold">Premium</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Billing Cycle</p>
              <p className="font-semibold">Monthly</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Next Payment</p>
              <p className="font-semibold">Jan 25 2025</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Amount</p>
              <p className="font-semibold">99₺</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-8">Invoice has been sent to your email. If you have any questions, please contact our support team.</p>
      </Card>
    </div>
  )
}
