"use client"


import React, { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function AuthTopbar() {
  const [showHelp, setShowHelp] = useState(false)
  return (
    <div className="w-full h-16 flex items-center px-4 sm:px-6 justify-between">
      {/* Left side empty */}
      <div />
      {/* Help Button */}
      <button
        className="flex items-center gap-2 text-[#73E8FF] hover:text-white transition-colors text-lg font-medium"
        onClick={() => setShowHelp(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" stroke="#73E8FF" strokeWidth="2" fill="#101A23" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#73E8FF">?</text>
        </svg>
        Help
      </button>
      <Sheet open={showHelp} onOpenChange={setShowHelp}>
        <SheetContent side="bottom" className="bg-[#0E151B] text-white rounded-t-3xl p-0 max-w-full">
          <SheetHeader className="flex flex-col items-center justify-center pt-8">
            <div className="w-20 h-20 rounded-2xl bg-[#101A23] border border-[#10B2E3]/30 flex items-center justify-center mb-4 shadow-lg shadow-[#73E8FF]/20">
              <HelpCircle className="w-10 h-10 text-[#73E8FF]" strokeWidth={1.5} />
            </div>
            <SheetTitle className="text-2xl font-bold tracking-tight mb-2 text-[#EEF4F8]">Help & Support</SheetTitle>
            <SheetDescription className="text-gray-400 mb-6 text-center max-w-md">If you need assistance, please contact our support team at <span className="text-[#10B2E3]">support@fitpro.com</span>.<br />We are here to help you with any issues or questions.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center">
            <Card className="bg-[#101A23]/95 backdrop-blur-xl border-[#10B2E3]/40 rounded-3xl shadow-2xl shadow-[#10B2E3]/10 ring-1 ring-[#47D8FF]/20 w-full max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <p className="text-[#B6C4CF] text-base">For urgent matters, please email <span className="text-[#73E8FF]">support@fitpro.com</span> or call <span className="text-[#73E8FF]">+1 (555) 123-4567</span>.</p>
              </CardContent>
            </Card>
            <p className="text-center text-xs text-[#5E6F7C] mt-8 mb-4">© {new Date().getFullYear()} FitPro. All rights reserved.</p>
          </div>
          <SheetClose asChild>
            <button className="absolute top-4 right-4 text-[#73E8FF] hover:text-white transition-colors">Close</button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  )
}
