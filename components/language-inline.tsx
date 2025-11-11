"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { languages, Language } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function LanguageInline({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  const ordered: Language[] = ["en", "ar", "ku", "tr"]

  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      {ordered.map(l => (
        <button
          key={l}
          type="button"
          onClick={() => setLanguage(l)}
          className={cn(
            "px-2 py-1 rounded-md border border-white/10 hover:border-white/30 transition",
            language === l ? "bg-white/10 text-white" : "text-gray-400"
          )}
        >
          {languages[l]}
        </button>
      ))}
    </div>
  )
}
