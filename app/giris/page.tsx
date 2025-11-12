"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { initializeUserSubscription } from "@/lib/subscription"

export default function LoginPage() {
    const router = useRouter()
    const { t } = useLanguage()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        // Save user email
        localStorage.setItem("userEmail", formData.email)
        
        // Initialize subscription based on user
        initializeUserSubscription(formData.email)
        
        // Trigger storage event manually for immediate update
        window.dispatchEvent(new Event('storage'))
        
        // Simulate login with shorter delay
        setTimeout(() => {
            router.push("/dashboard")
            setLoading(false)
        }, 300)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold text-white">{t("welcomeBack")}</h1>
                    <p className="text-gray-400 mt-2">{t("signInToAccount")}</p>
                </div>

                {/* Login Card */}
                <Card className="fitpro-card overflow-hidden">
                    <CardContent className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-semibold">{t("emailAddress")}</Label>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                    className="fitpro-input rounded-xl py-3"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-gray-300 text-sm font-semibold">{t("password")}</Label>
                                    <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                                        {t("forgotPassword")}
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                        className="fitpro-input rounded-xl py-3 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="w-4 h-4 rounded cursor-pointer border-slate-700/50 accent-blue-500" />
                                <label htmlFor="remember" className="text-gray-400 text-sm cursor-pointer">
                                    {t("rememberMe")}
                                </label>
                            </div>

                            {/* Login Button */}
                                                        <AnimatedButton type="submit" disabled={loading} full className="gap-2">
                                                            {loading ? t("loggingIn") : t("signIn")}
                                                            <LogIn className="w-4 h-4" />
                                                        </AnimatedButton>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-800/40 text-gray-400">{t("orContinueAs")}</span>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/giris/admin" className="group">
                                    <Button variant="outline" className="w-full border-slate-700/50 text-gray-400 hover:text-purple-400 hover:border-purple-500/50 rounded-xl group-hover:bg-purple-500/10">
                                        {t("admin")}
                                    </Button>
                                </Link>
                                <Link href="/giris/fizyoterapist" className="group">
                                    <Button variant="outline" className="w-full border-slate-700/50 text-gray-400 hover:text-green-400 hover:border-green-500/50 rounded-xl group-hover:bg-green-500/10">
                                        {t("physiotherapist")}
                                    </Button>
                                </Link>
                                <Link href="/giris/trainer" className="group">
                                    <Button variant="outline" className="w-full border-slate-700/50 text-gray-400 hover:text-rose-400 hover:border-rose-500/50 rounded-xl group-hover:bg-rose-500/10">
                                        {t("trainees")}
                                    </Button>
                                </Link>
                                <Link href="/giris/superadmin" className="group">
                                    <Button variant="outline" className="w-full border-slate-700/50 text-gray-400 hover:text-amber-400 hover:border-amber-500/50 rounded-xl group-hover:bg-amber-500/10">
                                        {t("superadmin")}
                                    </Button>
                                </Link>
                                <Link href="/giris/owner" className="group">
                                    <Button variant="outline" className="w-full border-slate-700/50 text-gray-400 hover:text-orange-400 hover:border-orange-500/50 rounded-xl group-hover:bg-orange-500/10">
                                        {t("owner") || "Owner"}
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Quick Test Accounts - Remove in production */}
                <Card className="fitpro-card mt-4 border-cyan-500/20">
                    <CardContent className="p-4">
                        <p className="text-xs text-cyan-400 mb-3 font-semibold">🧪 Quick Test Accounts:</p>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                onClick={() => {
                                    const email = "premium@darinfitness.com"
                                    setFormData({ email, password: "123456" })
                                    localStorage.setItem("userEmail", email)
                                    initializeUserSubscription(email)
                                    // Trigger storage event manually
                                    window.dispatchEvent(new Event('storage'))
                                    setTimeout(() => router.push("/dashboard"), 100)
                                }}
                                variant="outline"
                                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs h-auto py-2"
                            >
                                <div className="text-center">
                                    <div className="font-semibold text-[11px]">Premium</div>
                                    <div className="text-[9px] opacity-70">30 days</div>
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    const email = "warning@darinfitness.com"
                                    setFormData({ email, password: "123456" })
                                    localStorage.setItem("userEmail", email)
                                    initializeUserSubscription(email)
                                    // Trigger storage event manually
                                    window.dispatchEvent(new Event('storage'))
                                    setTimeout(() => router.push("/dashboard"), 100)
                                }}
                                variant="outline"
                                className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 text-xs h-auto py-2"
                            >
                                <div className="text-center">
                                    <div className="font-semibold text-[11px]">Warning</div>
                                    <div className="text-[9px] opacity-70">15 days</div>
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    const email = "user@darinfitness.com"
                                    setFormData({ email, password: "123456" })
                                    localStorage.setItem("userEmail", email)
                                    initializeUserSubscription(email)
                                    // Trigger storage event manually
                                    window.dispatchEvent(new Event('storage'))
                                    setTimeout(() => router.push("/dashboard"), 100)
                                }}
                                variant="outline"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-auto py-2"
                            >
                                <div className="text-center">
                                    <div className="font-semibold text-[11px]">Expired</div>
                                    <div className="text-[9px] opacity-70">0 days</div>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-gray-400 text-sm mt-8">
                    {t("dontHaveAccount")}{" "}
                    <Link href="/kayit" className="text-blue-400 hover:text-blue-300 font-semibold">
                        {t("signUp")}
                    </Link>
                </p>

                {/* FitPro Badge */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">{t("copyrightNotice")}</p>
                </div>
            </div>
        </div>
    )
}
