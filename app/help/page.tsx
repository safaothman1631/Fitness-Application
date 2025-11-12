"use client"

// Default export for Next.js page (returns nothing)
export default function HelpPage() {
  return null;
}

import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export function HelpSheetContent() {
  return (
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
  )
}
