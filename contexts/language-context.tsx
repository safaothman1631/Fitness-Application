"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, translations, type TranslationKey } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ku")

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = (localStorage.getItem("language") as Language) || "ku"
    const supported: Language[] = ["en", "ar", "ku", "tr"]
    const nextLang: Language = supported.includes(saved) ? saved : "ku"
    setLanguageState(nextLang)

    // Apply direction and lang on first paint
    const dir = nextLang === "ar" || nextLang === "ku" ? "rtl" : "ltr"
    document.documentElement.dir = dir
    document.documentElement.lang = nextLang
    if (!supported.includes(saved)) {
      localStorage.setItem("language", nextLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    const dir = lang === "ar" || lang === "ku" ? "rtl" : "ltr"
    document.documentElement.dir = dir
    document.documentElement.lang = lang
  }

  const t = (key: TranslationKey): string => {
    return (
      translations[language]?.[key] ??
      translations.en[key] ??
      key
    )
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
