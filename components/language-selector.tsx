"use client"

import { Languages, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { languages, type Language } from "@/lib/translations"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

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
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
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
