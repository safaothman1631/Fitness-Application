"use client"

import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/hooks/useLanguage"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, LogIn, Crown } from "lucide-react"
import AuthTopbar from "@/components/auth-topbar"
import LoginErrorModal, { LoginInputError } from "@/components/login-error"
import { toast } from "sonner"
import { loginUser } from "@/lib/auth-service"    }

        return (
            <div className="min-h-screen flex flex-col bg-slate-950 text-white relative overflow-hidden">
                {/* Animated SVG Background */}
                <div className="absolute inset-0 z-0">
                    <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
                        style={{
                            backgroundPosition: "top",
                            backgroundSize: "140% auto",
                            backgroundImage: "url('/images/bg-superadmin-mobile.svg')",
                            animation: "subtleFloat 20s ease-in-out infinite"
                        }}
                    />
                    {/* Gradient Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-950/55 via-slate-950/45 to-slate-950/70" />
                </div>
                
                <div className="relative z-10 bg-gradient-to-b from-violet-600/20 via-transparent to-transparent pb-24">
                    <AuthTopbar />
                    <div className="max-w-md mx-auto px-4 pb-10 pt-3 text-center">
                        <div className="w-24 h-24 rounded-xl bg-slate-900/60 mx-auto flex items-center justify-center mb-5 shadow-inner">
                            <Crown className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Superadmin Login</h1>
                        <p className="text-slate-100/80 mt-2 text-sm">Access your dashboard with your credentials</p>
                    </div>
                    <div className="max-w-md mx-auto px-6">
                        <Card className="bg-slate-900/80 backdrop-blur-xl border-violet-500/30 py-8 rounded-3xl shadow-2xl ring-1 ring-violet-400/20">
                            <CardContent className="px-6">
                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div className="space-y-2">
                                        <Input
                                            type="email"
                                            placeholder="Email or username"
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData({ ...formData, email: e.target.value })
                                                setEmailError("")
                                            }}
                                            className={`bg-slate-950 border-slate-800 text-sm rounded-[14px] ${emailError ? 'border-red-500 focus:border-red-500' : ''}`}
                                        />
                                        <LoginInputError message={emailError} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, password: e.target.value })
                                                        setPasswordError("")
                                                    }}
                                                    className={`bg-slate-950 border-slate-800 pr-10 text-sm rounded-[14px] ${passwordError ? 'border-red-500 focus:border-red-500' : ''}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                            <LoginInputError message={passwordError} />
                                        </div>
                                    <div className="flex items-center justify-between">
                                        <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                                            {t("forgotPassword")}
                                        </Link>
                                    </div>
                                    <Button type="submit" disabled={loading} className="w-full bg-violet-600 hover:bg-violet-600/90 h-12 rounded-[14px] font-semibold tracking-wide inline-flex items-center justify-center gap-2">
                                        <LogIn className="w-4 h-4" />
                                        <span>{loading ? "Signing in..." : "Login"}</span>
                                        <span>Login</span>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                        <div className="mt-6">
                            <Card className="bg-slate-900/70 backdrop-blur-lg border-slate-700/50 py-5 rounded-3xl shadow-lg ring-1 ring-white/10">
                                <CardContent className="px-6">
                                    <a
                                        href="/login"
                                        className="inline-flex items-center justify-center gap-2 w-full text-sm font-medium rounded-[14px] bg-slate-950 border border-slate-800 hover:border-slate-700 py-4"
                                    >
                                        <span>Switch Role</span>
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto pb-24" />
                <LoginErrorModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} />
            </div>
        )
}
