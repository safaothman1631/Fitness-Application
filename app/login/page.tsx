"use client"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { initializeUserSubscription } from "@/lib/subscription"
import { toast } from "sonner"
import AuthTopbar from "@/components/auth-topbar"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn, User, Mail, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function LoginPage() {
    const router = useRouter()
    const { t, language } = useLanguage()
    const isRTL = language === "ar" || language === "ku"
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [fieldError, setFieldError] = useState({ email: false, password: false })
    const [loginError, setLoginError] = useState("")
    
    // Forgot Password States
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [resetEmail, setResetEmail] = useState("")
    const [resetLoading, setResetLoading] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(false)

    useEffect(() => {
        // Check if user is already logged in
        const userId = localStorage.getItem("userId")
        if (userId) {
            // User is already logged in, redirect to dashboard
            router.replace("/dashboard")
            return
        }

        // Entry animation
        const loginForm = document.getElementById('login-form')
        if (loginForm) {
            loginForm.style.opacity = '0'
            loginForm.style.transform = 'scale(0.9) translateY(30px)'
            setTimeout(() => {
                loginForm.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                loginForm.style.opacity = '1'
                loginForm.style.transform = 'scale(1) translateY(0)'
            }, 100)
        }
    }, [router])

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!resetEmail || !resetEmail.includes('@')) {
            toast.error(t("pleaseEnterEmail"))
            return
        }
        
        setResetLoading(true)
        try {
            await sendPasswordResetEmail(auth, resetEmail)
            setResetSuccess(true)
            toast.success(t("resetLinkSent"))
        } catch (error: any) {
            console.error("Password reset error:", error)
            toast.error(t("incorrectCredentials"))
        } finally {
            setResetLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        let errorObj = { email: false, password: false }
        setLoginError("")
        
        if (!formData.email) errorObj.email = true
        if (!formData.password) errorObj.password = true
        setFieldError(errorObj)
        if (errorObj.email || errorObj.password) return
        
        setLoading(true)
        
        try {
            // Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            const user = userCredential.user
            
            // Check if email is verified
            if (!user.emailVerified) {
                toast.error(t("emailNotVerified"), {
                    description: t("pleaseCheckYourEmail"),
                    duration: 6000,
                })
                await auth.signOut()
                setLoading(false)
                return
            }
            
            // Get user data from Firestore to determine role
            const userDoc = await getDoc(doc(db, "users", user.uid))
            let role = "user"
            let redirectUrl = "/dashboard"
            
            if (userDoc.exists()) {
                const userData = userDoc.data()
                role = userData.role || "user"
                
                // Determine redirect URL based on role
                const roleRedirects: Record<string, string> = {
                    superadmin: "/superadmin",
                    admin: "/admin",
                    physiotherapist: "/physiotherapist",
                    trainer: "/trainer",
                    owner: "/owner",
                    patient: "/patient-panel",
                    user: "/dashboard",
                }
                redirectUrl = roleRedirects[role] || "/dashboard"
            }
            
            // Save to localStorage
            localStorage.setItem("userEmail", formData.email)
            localStorage.setItem("userId", user.uid)
            localStorage.setItem("userRole", role)
            localStorage.setItem("isAuthenticated", "true")
            
            // Initialize subscription from Firestore
            await initializeUserSubscription(user.uid, formData.email)
            
            toast.success(t("loginSuccessful"))
            
            // Add smooth fade out transition before redirect
            const loginForm = document.getElementById('login-form')
            if (loginForm) {
                loginForm.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
                loginForm.style.opacity = '0'
                loginForm.style.transform = 'scale(0.95)'
            }
            
            // Redirect to appropriate dashboard with transition
            setTimeout(() => {
                router.push(redirectUrl)
            }, 300)
            
        } catch (error: any) {
            console.error("Login error:", error)
            setLoginError(t("incorrectCredentials"))
            toast.error(t("incorrectCredentials"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#0E151B] text-white relative overflow-hidden">
            {/* Animated LED Glow Background */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
                    style={{
                        backgroundImage: "url('/images/bg-user-mobile.svg')",
                        animation: "subtleFloat 20s ease-in-out infinite"
                    }}
                />
                {/* Cyan LED Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#10B2E3]/15 via-[#0E151B]/80 to-[#0E151B]" />
                {/* Glow effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#73E8FF]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 pb-24">
                <AuthTopbar />
                <div className="max-w-md mx-auto pt-8 px-4">
                    <div className="w-24 h-24 rounded-2xl bg-[#101A23] border border-[#10B2E3]/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#73E8FF]/20">
                        <User className="w-12 h-12 text-[#73E8FF]" strokeWidth={1.5} />
                    </div>
                    <h1 style={{ textAlign: 'center' }} className="text-3xl font-bold tracking-tight mb-1 text-[#EEF4F8]">{t("welcomeBack")}</h1>
                </div>
                <div className="max-w-md mx-auto px-6 mt-8">
                    <Card id="login-form" dir={isRTL ? "rtl" : "ltr"} className="bg-[#101A23]/95 backdrop-blur-xl border-[#10B2E3]/40 rounded-3xl shadow-2xl shadow-[#10B2E3]/10 ring-1 ring-[#47D8FF]/20">
                        <CardContent className="p-6 space-y-6">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("emailAddress")}</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        placeholder={t("emailOrUsername")}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value })
                                            if (fieldError.email) setFieldError({ ...fieldError, email: false })
                                        }}
                                        style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                        className="bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3] placeholder:text-[#5E6F7C]"
                                    />
                                    {fieldError.email && (
                                        <div className="mt-2 rounded-2xl border border-red-700 bg-[#241B22] px-6 py-3 text-red-400 text-base">
                                            {t("pleaseEnterEmail")}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("password")}</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            placeholder={t("password")}
                                            onChange={(e) => {
                                                setFormData({ ...formData, password: e.target.value })
                                                if (fieldError.password) setFieldError({ ...fieldError, password: false })
                                            }}
                                            style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                            className={`bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] ${isRTL ? 'pl-10 pr-4' : 'pr-10 pl-4'} text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3] placeholder:text-[#5E6F7C]`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-2.5 text-[#778996] hover:text-[#EEF4F8] transition-colors`}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {fieldError.password && (
                                        <div className="mt-2 rounded-2xl border border-red-700 bg-[#241B22] px-6 py-3 text-red-400 text-base">
                                            {t("pleaseEnterPassword")}
                                        </div>
                                    )}
                                </div>
                                <div className={`flex items-center ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                    <Sheet open={showForgotPassword} onOpenChange={setShowForgotPassword}>
                                        <SheetTrigger asChild>
                                            <button 
                                                type="button"
                                                className="group relative text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                                            >
                                                <span className="relative z-10 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] bg-clip-text text-transparent group-hover:from-[#73E8FF] group-hover:to-[#47D8FF] transition-all duration-300">
                                                    {t("forgotPassword")}
                                                </span>
                                                {/* Underline animation */}
                                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] group-hover:w-full transition-all duration-300 rounded-full" />
                                            </button>
                                        </SheetTrigger>
                                        <SheetContent side="bottom" dir={isRTL ? "rtl" : "ltr"} className="bg-[#101A23]/40 backdrop-blur-md border-t-2 border-[#10B2E3]/50 shadow-[0_-20px_80px_-20px_rgba(16,178,227,0.4)] rounded-t-[32px] p-0 max-h-[90vh]">
                                            {/* Modern Handle Bar */}
                                            <div className="flex justify-center pt-4 pb-2">
                                                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#73E8FF] to-transparent rounded-full" />
                                            </div>
                                            
                                            <div className="px-6 pb-8 pt-4">
                                                <SheetHeader className="text-center mb-8 p-0 space-y-6">
                                                    {/* Icon with animated glow */}
                                                    <div className="relative mx-auto w-20 h-20">
                                                        {/* Animated glow ring */}
                                                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#10B2E3]/20 via-[#73E8FF]/30 to-[#47D8FF]/20 blur-xl animate-pulse" />
                                                        {/* Icon container */}
                                                        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0E151B] to-[#101A23] border-2 border-[#10B2E3]/40 flex items-center justify-center shadow-[0_8px_32px_rgba(16,178,227,0.25)] backdrop-blur-sm">
                                                            {resetSuccess ? (
                                                                <CheckCircle2 className="w-10 h-10 text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
                                                            ) : (
                                                                <Mail className="w-10 h-10 text-[#73E8FF] drop-shadow-[0_0_12px_rgba(115,232,255,0.6)]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Title with gradient */}
                                                    <div className="space-y-3">
                                                        <SheetTitle style={{ textAlign: 'center' }} className="text-3xl font-bold bg-gradient-to-r from-[#EEF4F8] via-[#73E8FF] to-[#EEF4F8] bg-clip-text text-transparent leading-tight tracking-tight">
                                                            {resetSuccess ? t("checkYourEmail") : t("resetPasswordTitle")}
                                                        </SheetTitle>
                                                        <SheetDescription style={{ textAlign: 'center' }} className="text-[#B6C4CF] text-base leading-relaxed px-4 max-w-md mx-auto">
                                                            {resetSuccess ? t("resetEmailSentMessage") : t("resetPasswordDesc")}
                                                        </SheetDescription>
                                                    </div>
                                                </SheetHeader>
                                            
                                                {!resetSuccess ? (
                                                    <form onSubmit={handleResetPassword} className="space-y-6">
                                                        {/* Email input with modern design */}
                                                        <div className="space-y-3">
                                                            <div className={`text-xs font-semibold uppercase tracking-wider text-[#73E8FF] flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                                                                <Mail className="w-3.5 h-3.5" />
                                                                <span>{t("emailAddress")}</span>
                                                            </div>
                                                            <div className="relative group">
                                                                {/* Gradient border effect */}
                                                                <div className="absolute inset-0 bg-gradient-to-r from-[#10B2E3]/0 via-[#73E8FF]/30 to-[#10B2E3]/0 rounded-[16px] blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                                                                <Input
                                                                    type="email"
                                                                    value={resetEmail}
                                                                    placeholder={t("enterEmailToReset")}
                                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                                    style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                                                    className="relative bg-[#0E151B]/80 backdrop-blur-sm border-2 border-[#2E3944] text-[#EEF4F8] text-base rounded-[16px] h-14 px-5 focus:ring-2 focus:ring-[#73E8FF]/40 focus:border-[#10B2E3] transition-all duration-300 placeholder:text-[#5E6F7C]"
                                                                    disabled={resetLoading}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Submit button with enhanced design */}
                                                        <AnimatedButton
                                                            type="submit"
                                                            disabled={resetLoading}
                                                            full
                                                            className="relative rounded-[16px] h-14 font-bold text-base tracking-wide inline-flex items-center justify-center gap-3 text-[#001015] shadow-[0_8px_32px_rgba(16,178,227,0.4)] transition-all duration-300 bg-gradient-to-r from-[#10B2E3] via-[#73E8FF] to-[#47D8FF] hover:from-[#0B94C1] hover:via-[#47D8FF] hover:to-[#10B2E3] hover:shadow-[0_12px_48px_rgba(16,178,227,0.6)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                                                        >
                                                            {/* Animated shine effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                                            <span className="relative z-10">{resetLoading ? t("sendingResetLink") : t("sendResetLink")}</span>
                                                            <Mail className="w-5 h-5 relative z-10" />
                                                        </AnimatedButton>
                                                    </form>
                                                ) : (
                                                    <div className="space-y-6">
                                                        {/* Success message card */}
                                                        <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-green-600/10 border-2 border-green-500/30 rounded-[20px] p-6 backdrop-blur-sm">
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 border border-green-400/30">
                                                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                                                </div>
                                                                <div className="flex-1 pt-1">
                                                                    <p className="text-green-400 font-semibold text-base mb-1">
                                                                        {t("resetLinkSent")}
                                                                    </p>
                                                                    <p className="text-[#B6C4CF] text-sm leading-relaxed">
                                                                        {resetEmail}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Close button */}
                                                        <AnimatedButton
                                                            type="button"
                                                            onClick={() => {
                                                                setShowForgotPassword(false)
                                                                setResetSuccess(false)
                                                                setResetEmail("")
                                                            }}
                                                            full
                                                            className="rounded-[16px] h-14 font-bold text-base tracking-wide inline-flex items-center justify-center gap-3 text-white shadow-[0_8px_32px_rgba(34,197,94,0.3)] transition-all duration-300 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 hover:shadow-[0_12px_48px_rgba(34,197,94,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                                                        >
                                                            <CheckCircle2 className="w-5 h-5" />
                                                            {t("close")}
                                                        </AnimatedButton>
                                                    </div>
                                                )}
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                                {loginError && (
                                    <div className="mb-4 rounded-2xl border border-red-700 bg-[#241B22] px-6 py-3 text-red-400 text-base text-center">
                                        {t("incorrectCredentials")}
                                    </div>
                                )}
                                <AnimatedButton
                                    type="submit"
                                    disabled={loading}
                                    full
                                    className="rounded-[14px] h-12 font-semibold tracking-wide inline-flex items-center justify-center gap-2 text-[#001015] shadow-lg shadow-[#10B2E3]/30 transition-all duration-300 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] hover:from-[#0B94C1] hover:to-[#47D8FF]"
                                >
                                    {loading ? t("loggingIn") : t("login")}
                                    <LogIn className="w-4 h-4" />
                                </AnimatedButton>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="mt-8 flex flex-col gap-4">
                        {/* Divider text between login and sign up */}
                        <p className="text-center text-base text-[#B6C4CF] font-medium mb-2">
                            {t("dontHaveAccount")}
                        </p>
                        <AnimatedButton
                            type="button"
                            full
                            className="rounded-[14px] h-12 font-semibold tracking-wide inline-flex items-center justify-center gap-2 text-[#001015] shadow-lg shadow-[#10B2E3]/30 transition-all duration-300 bg-gradient-to-r from-[#73E8FF] to-[#10B2E3] hover:from-[#47D8FF] hover:to-[#0B94C1]"
                            onClick={() => {
                                const loginForm = document.getElementById('login-form')
                                if (loginForm) {
                                    loginForm.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                                    loginForm.style.opacity = '0'
                                    loginForm.style.transform = 'scale(0.8) rotateX(20deg)'
                                }
                                setTimeout(() => router.push("/register"), 400)
                            }}
                        >
                            {t("createAccountTitle")}
                            <User className="w-4 h-4" />
                        </AnimatedButton>
                        <p className="text-center text-xs text-[#5E6F7C]">{t("copyrightNotice")}</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24" />
        </div>
    )
}