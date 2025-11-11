"use client"

import AuthTopbar from "@/components/auth-topbar"
import AuthBottomNav from "@/components/auth-bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageSquare, Mail, Phone } from "lucide-react"

export default function LoginHelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white">
  <div className="bg-gradient-to-b from-cyan-600 via-cyan-600/90 to-slate-950 pb-24">
        <AuthTopbar />
        <div className="max-w-md mx-auto w-full px-4 pt-6 pb-10 text-center">
          <div className="w-24 h-24 rounded-xl bg-slate-900/60 mx-auto flex items-center justify-center mb-5 shadow-inner">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Help</h1>
          <p className="text-slate-100/80 text-sm mt-2">We’re here to help you sign in</p>
        </div>
        <div className="max-w-md mx-auto px-6">
          <div className="space-y-4">
            <Card className="bg-slate-900 border-slate-800 p-4 rounded-2xl ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Forgot password?</p>
                  <p className="text-xs text-slate-400 mt-1">Reset from the login page using the Forgot link under the password field.</p>
                </div>
              </div>
            </Card>
            <Card className="bg-slate-900 border-slate-800 p-4 rounded-2xl ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Live chat</p>
                  <p className="text-xs text-slate-400 mt-1">Chat with support for account access issues.</p>
                  <Button className="mt-3 bg-cyan-600 hover:bg-cyan-600/90 h-9 px-3 rounded-[10px]">Start Chat</Button>
                </div>
              </div>
            </Card>
            <Card className="bg-slate-900 border-slate-800 p-4 rounded-2xl ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-xs text-slate-400 mt-1">support@fitflow.com</p>
                </div>
              </div>
            </Card>
            <Card className="bg-slate-900 border-slate-800 p-4 rounded-2xl ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="text-xs text-slate-400 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-24" />
      <AuthBottomNav current="Login" />
    </div>
  )
}
