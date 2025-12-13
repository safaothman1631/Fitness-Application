"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { LanguageSelector } from "@/components/language-selector"
import { UserCircle } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function PatientLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem("patient")) {
      window.location.replace("/patient-panel")
    }
  }, [])

  const handleLogin = () => {
    if (!email || !name) return
    setLoading(true)
    const payload = { name, email, loginTime: new Date().toISOString(), patientId: "P-" + Date.now().toString().slice(-6) }
    localStorage.setItem("patient", JSON.stringify(payload))
    router.replace("/patient-panel")  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
  <div className="bg-gradient-to-b from-sky-600 via-sky-600/90 to-slate-950 pb-24">
        <div className="max-w-md mx-auto px-4 pb-10 pt-6 text-center">
          <div className="w-24 h-24 rounded-xl bg-slate-900/60 mx-auto flex items-center justify-center mb-5 shadow-inner">
            <UserCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Login</h1>
          <p className="text-slate-100/80 mt-2 text-sm">Quick access to your patient panel</p>
        </div>
        <div className="max-w-md mx-auto px-6">
          <Card className="bg-slate-900 border-slate-800 py-8 rounded-3xl shadow-xl ring-1 ring-white/10">
            <CardContent className="px-6">
              <div className="space-y-6">
                <div>
                  <label className="text-slate-400 text-xs mb-2 block">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="bg-slate-950 border-slate-800 rounded-[14px] h-12 text-sm" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-2 block">Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email" className="bg-slate-950 border-slate-800 rounded-[14px] h-12 text-sm" />
                </div>
                <Button onClick={handleLogin} disabled={loading} className="w-full bg-sky-600 hover:bg-sky-600/90 h-12 rounded-[14px] font-semibold tracking-wide">
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <p className="text-xs text-center text-slate-500">This is a demo login. No password required.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-24" />
    </div>
  )
}
