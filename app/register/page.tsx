"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, UserPlus, User } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useEffect } from "react"
import AuthTopbar from "@/components/auth-topbar"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"


export default function RegisterPage() {
    const router = useRouter()
    const { t, language } = useLanguage()
    const isRTL = language === "ar" || language === "ku"
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    })
    const [error, setError] = useState("")

    useEffect(() => {
        // Check if user is already logged in
        const userId = localStorage.getItem("userId")
        if (userId) {
            // User is already logged in, redirect to dashboard
            router.push("/dashboard")
            return
        }

        // Entry animation
        const signupForm = document.getElementById('signup-form')
        if (signupForm) {
            signupForm.style.opacity = '0'
            signupForm.style.transform = 'scale(0.9) translateY(30px)'
            setTimeout(() => {
                signupForm.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                signupForm.style.opacity = '1'
                signupForm.style.transform = 'scale(1) translateY(0)'
            }, 100)
        }
    }, [router])

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            setError(t("pleaseFillAllFields"))
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setError(t("passwordsDoNotMatch"))
            return
        }

        if (!formData.agreeTerms) {
            setError(t("pleaseAgreeTerms"))
            return
        }

        setLoading(true)
        
        try {
            console.log("📤 Creating Firebase Auth user...")
            
            // 1. Create Firebase Authentication user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )
            
            const user = userCredential.user
            console.log("✅ Firebase Auth user created:", user.uid)
            
            // 2. Create Firestore user document with the Auth UID
            const userData = {
                email: formData.email,
                name: `${formData.firstName} ${formData.lastName}`,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: "user",
                membership: "Free",
                subscriptionStatus: "inactive",
                subscriptionEndDate: null,
                isActive: true,
                joinDate: new Date().toISOString(),
                createdAt: new Date().toISOString(),
            }
            
            console.log("💾 Creating Firestore document...")
            await setDoc(doc(db, "users", user.uid), userData)
            
            console.log("✅ Registration complete!")
            
            // Store user info in localStorage
            localStorage.setItem("user", JSON.stringify({ id: user.uid, ...userData }))
            localStorage.setItem("userId", user.uid)
            
            // Redirect to dashboard
            router.push("/dashboard")
            
        } catch (err: any) {
            console.error("❌ Registration error:", err)
            
            // Handle specific Firebase Auth errors
            if (err.code === 'auth/email-already-in-use') {
                setError(t("emailAlreadyInUse") || "This email is already registered")
            } else if (err.code === 'auth/weak-password') {
                setError(t("passwordTooWeak") || "Password should be at least 6 characters")
            } else if (err.code === 'auth/invalid-email') {
                setError(t("invalidEmail") || "Invalid email address")
            } else {
                setError(err.message || t("registrationFailed"))
            }
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
                    <h1 style={{ textAlign: 'center' }} className="text-3xl font-bold tracking-tight mb-1 text-[#EEF4F8]">{t("createAccountTitle")}</h1>
                    <p style={{ textAlign: 'center' }} className="text-gray-400 mt-2">{t("signupSubtitle")}</p>
                </div>
                <div className="max-w-md mx-auto px-6 mt-8">
                    <Card id="signup-form" dir={isRTL ? "rtl" : "ltr"} className="bg-[#101A23]/95 backdrop-blur-xl border-[#10B2E3]/40 rounded-3xl shadow-2xl shadow-[#10B2E3]/10 ring-1 ring-[#47D8FF]/20">
                        <CardContent className="p-6 space-y-6">
                            <form onSubmit={handleSignUp} className="space-y-6">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                                        <p className="text-red-400 text-sm">{error}</p>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("firstName")}</Label>
                                    <Input
                                        type="text"
                                        value={formData.firstName}
                                        placeholder={t("firstNamePlaceholder")}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                        className="bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3] placeholder:text-[#5E6F7C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("lastName")}</Label>
                                    <Input
                                        type="text"
                                        value={formData.lastName}
                                        placeholder={t("lastNamePlaceholder")}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                        className="bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3] placeholder:text-[#5E6F7C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("emailAddress")}</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        placeholder={t("emailOrUsername")}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                        className="bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3] placeholder:text-[#5E6F7C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("password")}</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            placeholder={t("password")}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                </div>
                                <div className="space-y-2">
                                    <Label style={{ textAlign: isRTL ? 'right' : 'left' }} className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("confirmPassword")}</Label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirm ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            placeholder={t("confirmPassword")}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            style={{ textAlign: isRTL ? 'right' : 'left', direction: isRTL ? 'rtl' : 'ltr' }}
                                            className={`bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] ${isRTL ? 'pl-10 pr-4' : 'pr-10 pl-4'} text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3] placeholder:text-[#5E6F7C]`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-2.5 text-[#778996] hover:text-[#EEF4F8] transition-colors`}
                                        >
                                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className={`flex items-start gap-2 pt-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        checked={formData.agreeTerms}
                                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                        className="w-4 h-4 rounded cursor-pointer mt-1 accent-blue-500 border-slate-700/50 flex-shrink-0"
                                    />
                                    <label htmlFor="terms" className={`text-gray-400 text-sm cursor-pointer ${isRTL ? 'text-right w-full' : ''}`}>
                                        {t("termsAgreement")} {" "}
                                        <Link href="#" className="text-blue-400 hover:text-blue-300">{t("termsOfService")}</Link>{" "}
                                        {t("privacyPolicy")}
                                    </label>
                                </div>
                                <AnimatedButton
                                    type="submit"
                                    disabled={loading}
                                    full
                                    className="rounded-[14px] h-12 font-semibold tracking-wide inline-flex items-center justify-center gap-2 text-[#001015] shadow-lg shadow-[#10B2E3]/30 transition-all duration-300 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] hover:from-[#0B94C1] hover:to-[#47D8FF]"
                                >
                                    {loading ? t("creatingAccount") : t("createAccountTitle")}
                                    <UserPlus className="w-4 h-4" />
                                </AnimatedButton>
                            </form>
                        </CardContent>
                    </Card>
                    <p className="text-center text-xs text-[#5E6F7C] mt-8">
                        {t("alreadyHaveAccount")} {" "}
                        <button 
                            onClick={() => {
                                const signupForm = document.getElementById('signup-form')
                                if (signupForm) {
                                    signupForm.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                                    signupForm.style.opacity = '0'
                                    signupForm.style.transform = 'scale(0.8) rotateX(-20deg)'
                                }
                                setTimeout(() => router.push("/login"), 400)
                            }}
                            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            {t("signInLink")}
                        </button>
                    </p>
                    <p className="text-center text-xs text-[#5E6F7C] mt-6">{t("copyrightNotice")}</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24" />
        </div>
    )
}
