"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, ArrowLeft, LogIn } from "lucide-react"

export default function OwnerLoginPage() {
    const router = useRouter()
    const { t } = useLanguage()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            localStorage.setItem(
                "owner",
                JSON.stringify({
                    role: "owner",
                    name: "System Owner",
                    loginTime: new Date().toISOString(),
                }),
            )
            router.replace("/owner")
            setIsLoading(false)
        }, 800)
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-white">
            <div className="bg-gradient-to-b from-amber-600 via-amber-600/90 to-slate-950 pb-24">
                <div className="max-w-md mx-auto px-4 pb-10 pt-6 text-center">
                    <Link href="/login" className="text-xs text-slate-200/80 hover:text-white inline-flex items-center gap-1 mb-4">
                        <ArrowLeft className="w-3 h-3" />
                        {t("backToLogin")}
                    </Link>
                    <div className="w-24 h-24 rounded-xl bg-slate-900/60 mx-auto flex items-center justify-center mb-5 shadow-inner">
                        <Crown className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{t("ownerLogin")}</h1>
                    <p className="text-slate-100/80 mt-2 text-sm">{t("fullSystemControl")}</p>
                </div>
                <div className="max-w-md mx-auto px-6">
                    <Card className="bg-slate-900 border-slate-800 py-8 rounded-3xl shadow-xl ring-1 ring-white/10">
                        <CardContent className="px-6">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="bg-slate-950 border border-slate-800 rounded-[14px] p-4 text-left">
                                    <p className="text-slate-300 text-xs leading-relaxed">
                                        <span className="font-semibold">{t("owner")}</span>
                                        <br />
                                        Full system control and administrative access
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-amber-600 hover:bg-amber-600/90 h-12 rounded-[14px] font-semibold tracking-wide inline-flex items-center justify-center gap-2"
                                >
                                    {isLoading ? t("loggingIn") : t("signInAsOwner")}
                                    <LogIn className="w-4 h-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24" />
        </div>
    )
}
