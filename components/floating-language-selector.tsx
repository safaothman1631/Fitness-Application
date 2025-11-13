"use client"

import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { languages, type Language } from "@/lib/translations"

export function FloatingLanguageSelector() {
  const { language, setLanguage } = useLanguage()
  
  // Check if RTL language
  const isRTL = language === "ar" || language === "ku"
  const positionClass = isRTL ? "left-4" : "right-4"

  // Fixed order
  const ordered: { code: Language; name: string }[] = [
    { code: "en", name: languages.en },
    { code: "ar", name: languages.ar },
    { code: "ku", name: languages.ku },
    { code: "tr", name: languages.tr },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`fixed top-4 ${positionClass} z-40 p-3 rounded-xl bg-[#101A23] border border-[#2E3944] hover:border-[#47D8FF]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(16,178,227,0.3)] group`}
          aria-label="Select language"
        >
          <Languages className="w-6 h-6 text-[#10B2E3] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {ordered.map(({ code, name }) => {
          const selected = language === code
          return (
            <DropdownMenuItem
              key={code}
              onClick={() => setLanguage(code)}
              className={selected ? "flex items-center justify-between font-medium" : "flex items-center justify-between"}
            >
              <span>{name}</span>
              {selected && <Check className="h-4 w-4 text-blue-500" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
