"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/logo"
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { LanguageSelector } from "@/components/language-selector"

export default function RegisterPage() {
    const router = useRouter()
    const { t } = useLanguage()
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
        setTimeout(() => {
            router.push("/dashboard")
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/login" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        {t("backToLogin")}
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold text-white">{t("createAccountTitle")}</h1>
                    <p className="text-gray-400 mt-2">{t("signupSubtitle")}</p>
                </div>

                <Card className="fitpro-card overflow-hidden">
                    <CardContent className="p-8">
                        <form onSubmit={handleSignUp} className="space-y-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-semibold">{t("firstName")}</Label>
                                <Input
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="fitpro-input rounded-xl py-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-semibold">{t("lastName")}</Label>
                                <Input
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="fitpro-input rounded-xl py-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-semibold">{t("emailAddress")}</Label>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="fitpro-input rounded-xl py-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-semibold">{t("password")}</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="fitpro-input rounded-xl py-2 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{t("mustBeAtLeast8Chars")}</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-semibold">{t("confirmPassword")}</Label>
                                <div className="relative">
                                    <Input
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="fitpro-input rounded-xl py-2 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-400 transition-colors"
                                    >
                                        {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={formData.agreeTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                    className="w-4 h-4 rounded cursor-pointer mt-1 accent-blue-500 border-slate-700/50"
                                />
                                <label htmlFor="terms" className="text-gray-400 text-sm cursor-pointer">
                                    {t("termsAgreement")} {" "}
                                    <Link href="#" className="text-blue-400 hover:text-blue-300">{t("termsOfService")}</Link>{" "}
                                    {t("privacyPolicy")}
                                </label>
                            </div>

                            <AnimatedButton
                                type="submit"
                                disabled={loading}
                                full
                                className="rounded-xl py-2.5 mt-6 gap-2"
                            >
                                {loading ? t("creatingAccount") : t("createAccountTitle")}
                                <UserPlus className="w-4 h-4" />
                            </AnimatedButton>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-gray-400 text-sm mt-8">
                    {t("alreadyHaveAccount")} {" "}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                        {t("signInLink")}
                    </Link>
                </p>

                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">{t("copyrightNotice")}</p>
                </div>
            </div>
        </div>
    )
}
