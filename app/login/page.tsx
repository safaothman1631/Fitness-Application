"use client"
import { signInWithEmailAndPassword } from "firebase/auth"
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
import { Eye, EyeOff, LogIn, User } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function LoginPage() {
    const router = useRouter()
    const { t } = useLanguage()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [fieldError, setFieldError] = useState({ email: false, password: false })

    useEffect(() => {
        // Redirect to /giris if needed
        // router.replace("/giris")
    }, [router])

    const [loginError, setLoginError] = useState("")
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
            
            toast.success("Login successful!")
            
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
            setLoginError("Incorrect email or password. Please try again.")
            toast.error("Incorrect email or password. Please try again.")
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
                <div className="max-w-md mx-auto pt-8 px-4 text-center">
                    <div className="w-24 h-24 rounded-2xl bg-[#101A23] border border-[#10B2E3]/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#73E8FF]/20">
                        <User className="w-12 h-12 text-[#73E8FF]" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1 text-[#EEF4F8]">{t("welcomeBack")}</h1>
                </div>
                <div className="max-w-md mx-auto px-6 mt-8">
                    <Card id="login-form" className="bg-[#101A23]/95 backdrop-blur-xl border-[#10B2E3]/40 rounded-3xl shadow-2xl shadow-[#10B2E3]/10 ring-1 ring-[#47D8FF]/20">
                        <CardContent className="p-6 space-y-6">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("emailAddress")}</Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        placeholder={t("emailOrUsername")}
                                        onChange={(e) => {
                                            setFormData({ ...formData, email: e.target.value })
                                            if (fieldError.email) setFieldError({ ...fieldError, email: false })
                                        }}
                                        className="bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3]"
                                    />
                                    {fieldError.email && (
                                        <div className="mt-2 rounded-2xl border border-red-700 bg-[#241B22] px-6 py-3 text-red-400 text-base">
                                            Please enter your email
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-wide text-[#B6C4CF]">{t("password")}</Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            placeholder={t("password")}
                                            onChange={(e) => {
                                                setFormData({ ...formData, password: e.target.value })
                                                if (fieldError.password) setFieldError({ ...fieldError, password: false })
                                            }}
                                            className="bg-[#0E151B] border-[#2E3944] text-[#EEF4F8] pr-10 text-sm rounded-[14px] focus:ring-2 focus:ring-[#47D8FF]/40 focus:border-[#10B2E3]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-2.5 text-[#778996] hover:text-[#EEF4F8] transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {fieldError.password && (
                                        <div className="mt-2 rounded-2xl border border-red-700 bg-[#241B22] px-6 py-3 text-red-400 text-base">
                                            Please enter your password
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Link href="/forgot-password" className="text-xs text-[#10B2E3] hover:text-[#73E8FF] font-semibold transition-colors">
                                        {"Forgot your password?"}
                                    </Link>
                                </div>
                                {loginError && (
                                    <div className="mb-4 rounded-2xl border border-red-700 bg-[#241B22] px-6 py-3 text-red-400 text-base text-center">
                                        {loginError}
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
                            {"Don't have an account yet?"}
                        </p>
                        <AnimatedButton
                            type="button"
                            full
                            className="rounded-[14px] h-12 font-semibold tracking-wide inline-flex items-center justify-center gap-2 text-[#001015] shadow-lg shadow-[#10B2E3]/30 transition-all duration-300 bg-gradient-to-r from-[#73E8FF] to-[#10B2E3] hover:from-[#47D8FF] hover:to-[#0B94C1]"
                            onClick={() => router.push("/register")}
                        >
                            {t("createAccountTitle")}
                            <User className="w-4 h-4" />
                        </AnimatedButton>
                        <p className="text-center text-xs text-[#5E6F7C]">© {new Date().getFullYear()} FitPro. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto pb-24" />
        </div>
    )
}