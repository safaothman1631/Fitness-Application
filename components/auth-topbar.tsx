"use client"


import React, { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export default function AuthTopbar() {
  const { t } = useLanguage()
  const [showHelp, setShowHelp] = useState(false)
  return (
    <>
      {/* Empty topbar for spacing */}
      <div className="w-full h-16" />
      
      {/* Help Button - Fixed at bottom center */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[200px]">
        <button
          className="w-full group relative text-sm font-semibold transition-all duration-500 hover:scale-110 active:scale-90 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0E151B]/60 via-[#10B2E3]/30 to-[#0E151B]/60 hover:from-[#0E151B]/80 hover:via-[#10B2E3]/40 hover:to-[#0E151B]/80 backdrop-blur-md border-2 border-[#10B2E3]/50 hover:border-[#73E8FF]/70 px-5 py-3 rounded-full shadow-lg shadow-[#10B2E3]/20 hover:shadow-xl hover:shadow-[#73E8FF]/30"
          onClick={() => setShowHelp(true)}
        >
        <HelpCircle className="w-5 h-5 text-[#73E8FF] group-hover:text-[#47D8FF] transition-colors duration-300 drop-shadow-[0_0_4px_rgba(115,232,255,0.3)]" strokeWidth={2.5} />
        <span className="relative z-10 bg-gradient-to-r from-[#73E8FF] via-[#10B2E3] to-[#73E8FF] bg-clip-text text-transparent group-hover:from-[#47D8FF] group-hover:via-[#73E8FF] group-hover:to-[#47D8FF] transition-all duration-300 font-bold tracking-wide">
          {t("helpSupport")}
        </span>
        {/* Animated glow pulse */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#10B2E3]/0 via-[#73E8FF]/5 to-[#10B2E3]/0 group-hover:via-[#73E8FF]/15 blur-sm transition-all duration-500 animate-pulse" />
        </button>
      </div>
      <Sheet open={showHelp} onOpenChange={setShowHelp}>
        <SheetContent side="bottom" className="bg-[#0E151B]/70 backdrop-blur-xl text-white rounded-t-3xl p-0 max-w-full">
          <SheetHeader className="flex flex-col items-center justify-center pt-8">
            <div className="w-20 h-20 rounded-2xl bg-[#101A23] border border-[#10B2E3]/30 flex items-center justify-center mb-4 shadow-lg shadow-[#73E8FF]/20">
              <HelpCircle className="w-10 h-10 text-[#73E8FF]" strokeWidth={1.5} />
            </div>
            <SheetTitle className="text-2xl font-bold tracking-tight mb-2 text-[#EEF4F8]">{t("helpSupport")}</SheetTitle>
            <SheetDescription className="text-gray-400 mb-6 text-center max-w-md px-4">{t("helpDescription")}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center">
            <Card className="bg-[#101A23]/95 backdrop-blur-xl border-[#10B2E3]/40 rounded-3xl shadow-2xl shadow-[#10B2E3]/10 ring-1 ring-[#47D8FF]/20 w-full max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <p className="text-[#B6C4CF] text-base">{t("helpContactInfo")}</p>
              </CardContent>
            </Card>
            <p className="text-center text-xs text-[#5E6F7C] mt-8 mb-4">{t("copyrightNotice")}</p>
          </div>
          <SheetClose asChild>
            <button className="absolute top-4 right-4 text-[#73E8FF] hover:text-white transition-colors">{t("close")}</button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  )
}
