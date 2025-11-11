"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import AuthTopbar from "@/components/auth-topbar"
import AuthBottomNav from "@/components/auth-bottom-nav"
import LoginErrorModal, { LoginInputError } from "@/components/login-error"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const { t } = useLanguage()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Reset errors
        setEmailError("")
        setPasswordError("")
        
        let hasError = false
        
        // Validate email
        if (!formData.email.trim()) {
            setEmailError("Please enter your email address")
            hasError = true
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(formData.email)) {
                setEmailError("Please enter a valid email address")
                hasError = true
            }
        }
        
        // Validate password
        if (!formData.password.trim()) {
            setPasswordError("Please enter your password")
            hasError = true
        } else if (formData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters")
            hasError = true
        }
        
        if (hasError) return
        
        setLoading(true)
        
        // TODO: Replace with actual Firebase authentication
        // For now, simulate API call
        setTimeout(() => {
            try { 
                // Mock validation - replace with Firebase auth
                if (formData.email === "user@darinfitness.com" && formData.password === "user1234") {
                    localStorage.setItem("isAuthenticated", "true")
                    localStorage.setItem("userRole", "user")
                    toast.success("Login successful!")
                    router.push("/dashboard")
                } else {
                    setShowErrorModal(true)
                }
            } catch (error) {
                toast.error("Login failed")
            }
            setLoading(false)
        }, 800)
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-white relative overflow-hidden">
            {/* Animated SVG Background */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
                    style={{
                        backgroundImage: "url('/images/bg-user-mobile.svg')",
                        animation: "subtleFloat 20s ease-in-out infinite"
                    }}
                />
                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-950/55 via-slate-950/45 to-slate-950/70" />
            </div>
            
            <div className="relative z-10 bg-gradient-to-b from-sky-400/20 via-transparent to-transparent pb-24">
                <AuthTopbar />
                <div className="max-w-md mx-auto pt-8 px-4 text-center">
                    <div className="w-24 h-24 rounded-xl bg-slate-900/60 flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <span className="text-3xl font-bold">⬛</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">{t("welcomeBack") || "Welcome back"}</h1>
                    <p className="text-slate-100/80 text-sm">{"Choose your role or sign in"}</p>
                </div>
                <div className="max-w-md mx-auto px-6 mt-8">
                    {/* Role buttons */}
                    <Card className="bg-slate-900/80 backdrop-blur-xl border-sky-500/30 mb-8 rounded-3xl shadow-2xl ring-1 ring-sky-400/20">
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/login/superadmin" className="group">
                                    <div className="flex items-center justify-center rounded-md border border-slate-800 py-3 text-sm font-medium bg-slate-900 group-hover:border-purple-500/40 transition">
                                        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>{t("superadmin") || "Superadmin"}</span>
                                    </div>
                                </Link>
                                <Link href="/login/physiotherapist" className="group">
                                    <div className="flex items-center justify-center rounded-md border border-slate-800 py-3 text-sm font-medium bg-slate-900 group-hover:border-green-500/40 transition">
                                        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>{t("physiotherapist") || "Physiotherapy"}</span>
                                    </div>
                                </Link>
                                <Link href="/login/admin" className="group">
                                    <div className="flex items-center justify-center rounded-md border border-slate-800 py-3 text-sm font-medium bg-slate-900 group-hover:border-blue-500/40 transition">
                                        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>{t("admin") || "Admin"}</span>
                                    </div>
                                </Link>
                                <Link href="/login/trainer" className="group">
                                    <div className="flex items-center justify-center rounded-md border border-slate-800 py-3 text-sm font-medium bg-slate-900 group-hover:border-rose-500/40 transition">
                                        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>{t("trainer") || "Trainer"}</span>
                                    </div>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Login form */}
                    <Card id="login-form" className="bg-slate-900/80 backdrop-blur-xl border-sky-500/30 rounded-3xl shadow-2xl ring-1 ring-sky-400/20">
                        <CardContent className="p-6 space-y-6">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-wide text-slate-400">{t("emailAddress") || "Email or username"}</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        placeholder="Email or username"
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value })
                                            setEmailError("")
                                        }}
                                        className={`bg-slate-950 border-slate-800 text-sm rounded-[14px] ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                                    />
                                    <LoginInputError message={emailError} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-wide text-slate-400">{t("password") || "Password"}</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            placeholder="Password"
                                            onChange={(e) => {
                                                setFormData({ ...formData, password: e.target.value })
                                                setPasswordError("")
                                            }}
                                            className={`bg-slate-950 border-slate-800 pr-10 text-sm rounded-[14px] ${passwordError ? 'border-red-500 focus:border-red-500' : ''}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-2.5 text-slate-500 hover:text-slate-300"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <LoginInputError message={passwordError} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link href="/forgot-password" className="text-xs text-slate-400 hover:text-slate-200">{t("forgotPassword") || "Forgot Password?"}</Link>
                                </div>
                                <Button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-500/90 h-12 rounded-[14px] font-semibold tracking-wide inline-flex items-center justify-center gap-2">
                                    {loading ? t("loggingIn") || "Logging in..." : t("login") || "Login"}
                                    <LogIn className="w-4 h-4" />
                                </Button>
                                <p className="text-center text-xs text-slate-400">{"Or sign in with a role above"}</p>
                            </form>
                        </CardContent>
                    </Card>
                    <p className="text-center text-xs text-slate-500 mt-8">© {new Date().getFullYear()} FitFlow. All rights reserved.</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24" />
            <AuthBottomNav current="Login" />
            <LoginErrorModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} />
        </div>
    )
}
