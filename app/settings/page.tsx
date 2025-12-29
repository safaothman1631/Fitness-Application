"use client"

import { useState, useEffect } from "react"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon, Moon, Sun, Monitor, Globe, Info, LogOut, Smartphone, Shield, Key, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/hooks/useLanguage"
import { BottomNav } from "@/components/bottom-nav"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"
import { onAuthStateChanged } from "firebase/auth"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        const token = await user.getIdToken()
        const userDataResponse = await fetch(`/api/users/${user.uid}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json()
          setTwoFactorEnabled(userData.twoFactorEnabled ?? false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled) {
      router.push('/settings/two-factor')
    } else {
      if (confirm(t("areYouSure") || 'Are you sure you want to disable Two-Factor Authentication?')) {
        try {
          const token = await auth.currentUser?.getIdToken()
          const response = await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ twoFactorEnabled: false })
          })
          if (response.ok) {
            setTwoFactorEnabled(false)
            toast({ description: t("twoFactorAuth") + ' disabled!' })
          } else {
            toast({ description: 'Failed to disable 2FA', variant: "destructive" })
          }
        } catch (error) {
          console.error('Error disabling 2FA:', error)
          toast({ description: 'Error disabling 2FA', variant: "destructive" })
        }
      }
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ description: t("passwordsDoNotMatch"), variant: "destructive" })
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast({ description: t("weakPassword"), variant: "destructive" })
      return
    }

    try {
      const user = auth.currentUser
      if (!user || !user.email) {
        toast({ description: "User not authenticated", variant: "destructive" })
        return
      }

      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, passwordData.newPassword)
      
      toast({ description: t("passwordChangedSuccessfully") })
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error: any) {
      console.error("Password change error:", error)
      if (error.code === 'auth/wrong-password') {
        toast({ description: t("currentPasswordIncorrect"), variant: "destructive" })
      } else if (error.code === 'auth/weak-password') {
        toast({ description: t("weakPassword"), variant: "destructive" })
      } else if (error.code === 'auth/requires-recent-login') {
        toast({ description: t("requiresRecentLogin"), variant: "destructive" })
      } else {
        toast({ description: t("failedToChangePassword"), variant: "destructive" })
      }
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut(auth)
      toast({
        description: "Logged out successfully!",
      })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  const languageOptions = [
    { value: "en", label: "English", flag: "EN", colors: { from: "#012169", to: "#C8102E" } },
    { value: "ar", label: "العربية", flag: "AR", colors: { from: "#006C35", to: "#14532d" } },
    { value: "ku", label: "کوردی", flag: "KU", colors: { from: "#EF4444", to: "#FBBF24" } },
    { value: "tr", label: "Türkçe", flag: "TR", colors: { from: "#E30A17", to: "#dc2626" } },
  ]

  const renderFlag = (option: typeof languageOptions[0], isActive: boolean) => {
    const baseClasses = "w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-300 shadow-lg relative overflow-hidden"
    const activeClasses = isActive 
      ? "scale-110 shadow-blue-500/30" 
      : "group-hover/lang:scale-105 shadow-black/20"
    
    return (
      <div className={`${baseClasses} ${activeClasses}`}
        style={{
          background: isActive 
            ? `linear-gradient(135deg, ${option.colors.from}, ${option.colors.to})`
            : `linear-gradient(135deg, ${option.colors.from}40, ${option.colors.to}40)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <span className={`relative z-10 transition-all duration-300 ${
          isActive ? 'text-white text-shadow-lg' : 'text-slate-200 group-hover/lang:text-white'
        }`}>
          {option.flag}
        </span>
        {isActive && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
      </div>
    )
  }

  return (
    <AuthGuard requiredRole="user" allowedRoles={["user"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Toaster />
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto pb-28">
          
          {/* Header */}
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex flex-row-reverse items-center gap-4 mb-2 justify-end">
              <div className="text-right">
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 animate-in fade-in slide-in-from-left-4 duration-500">
                  {t("settingsPage")}
                </h1>
                <p className="text-slate-400 text-sm animate-in fade-in slide-in-from-left-4 delay-100 duration-500">{t("customizeYourExperience")}</p>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl group hover:scale-110 hover:rotate-12 transition-all duration-500 animate-pulse">
                <SettingsIcon className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Security Settings Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-500/10 to-purple-600/10 backdrop-blur-xl border border-indigo-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 lg:col-span-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("security")}</span>
                  <Shield className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                </CardTitle>
                <p className="text-slate-400 text-sm text-right">{t("manageAccountSecurity")}</p>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl border border-orange-500/30 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6"
                         style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                      <Shield className="w-7 h-7 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg">{t("twoFactorAuth")}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{t("addExtraLayer") || "Add an extra layer of security"}</p>
                      {twoFactorEnabled && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-green-400 text-xs font-semibold">{t("enabled")}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={twoFactorEnabled}
                      onChange={(e) => handleToggle2FA(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-16 h-8 bg-slate-700/50 backdrop-blur-sm peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 rtl:peer-checked:after:-translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-7 after:w-7 after:transition-all after:shadow-lg peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600 peer-checked:shadow-lg peer-checked:shadow-green-500/50"></div>
                  </label>
                </div>

                {/* Password Change */}
                <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4 transition-all duration-300 hover:border-indigo-500/30"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-indigo-400" />
                    {t("changePassword")}
                  </h4>
                  <div>
                    <label className="text-sm text-slate-300 font-medium mb-2 block">{t("currentPassword")}</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 font-medium mb-2 block">{t("newPassword")}</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 font-medium mb-2 block">{t("confirmPassword")}</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button
                    onClick={handlePasswordChange}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 border border-orange-400/30 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02] font-semibold text-base py-6"
                  >
                    <Key className="w-5 h-5 mr-2" />
                    {t("changePassword")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("appearance")}</span>
                  <Moon className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-500" />
                </CardTitle>
                <p className="text-slate-400 text-sm text-right">{t("chooseYourPreferredTheme")}</p>
              </CardHeader>
              <CardContent className="relative space-y-3">
                {themeOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = theme === option.value
                  return (
                    <div
                      key={option.value}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-500 group/theme cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-2 border-purple-400/50 shadow-xl shadow-purple-500/20"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/30"
                      }`}
                      onClick={() => setTheme(option.value)}
                    >
                      <button className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                        isActive 
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50" 
                          : "bg-slate-700"
                      }`}>
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                          isActive ? 'left-6' : 'left-1'
                        }`} />
                      </button>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className={`font-bold text-lg transition-all duration-300 ${
                            isActive ? "text-white" : "text-slate-300 group-hover/theme:text-white"
                          }`}>
                            {option.label}
                          </div>
                          <div className={`text-xs transition-colors duration-300 ${
                            isActive ? "text-purple-200" : "text-slate-500 group-hover/theme:text-slate-400"
                          }`}>
                            {isActive ? t("active") : "Tap to activate"}
                          </div>
                        </div>
                        
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                          isActive 
                            ? "bg-gradient-to-br from-purple-500 to-pink-600 scale-110 shadow-lg shadow-purple-500/50" 
                            : "bg-white/10 group-hover/theme:bg-white/20"
                        }`}>
                          <Icon className={`w-6 h-6 transition-all duration-500 ${
                            isActive ? "text-white rotate-12 scale-110" : "text-slate-400 group-hover/theme:text-slate-300"
                          }`} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Language Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-xl border border-blue-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("languagePreference")}</span>
                  <Globe className="w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-700" />
                </CardTitle>
                <p className="text-slate-400 text-sm text-right">{t("selectYourPreferredLanguage")}</p>
              </CardHeader>
              <CardContent className="relative space-y-2">
                {languageOptions.map((option, index) => {
                  const isActive = language === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => setLanguage(option.value as any)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 hover:scale-[1.01] group/lang relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/20 border-2 border-blue-400 shadow-xl shadow-blue-500/30"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10"
                      }`}
                      style={{
                        animationDelay: `${index * 80}ms`,
                      }}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20 animate-pulse" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover/lang:translate-x-full transition-transform duration-1000" />
                      
                      <div className="flex items-center gap-4 relative">
                        {renderFlag(option, isActive)}
                        <div className="text-left">
                          <div className={`font-bold text-lg transition-all duration-300 ${
                            isActive ? "text-white" : "text-slate-300 group-hover/lang:text-white"
                          }`}>
                            {option.label}
                          </div>
                          <div className={`text-xs transition-colors duration-300 ${
                            isActive ? "text-blue-200" : "text-slate-500 group-hover/lang:text-slate-400"
                          }`}>
                            {option.value === 'en' ? 'English' : option.value === 'ar' ? 'Arabic' : option.value === 'ku' ? 'Kurdish' : 'Turkish'}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`relative transition-all duration-300 ${isActive ? 'scale-100' : 'scale-0'}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-in zoom-in-50 duration-300">
                          <svg className="w-5 h-5 text-white animate-in zoom-in-0 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* App Info Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-xl border border-emerald-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-green-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("appInformation")}</span>
                  <Info className="w-5 h-5 text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:border-emerald-500/30 transition-all duration-300 group/item">
                  <div className="text-white font-semibold group-hover/item:scale-110 transition-transform duration-300">1.0.0</div>
                  <div className="text-slate-400 group-hover/item:text-slate-300 transition-colors">{t("appVersion")}</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:border-emerald-500/30 transition-all duration-300 group/item">
                  <div className="text-white font-semibold group-hover/item:scale-110 transition-transform duration-300">2024.01</div>
                  <div className="text-slate-400 group-hover/item:text-slate-300 transition-colors">{t("appBuild")}</div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:border-emerald-500/30 transition-all duration-300 group/item">
                  <div className="text-white font-semibold flex items-center gap-2 group-hover/item:scale-110 transition-transform duration-300">
                    <span>{t("mobileAndWeb")}</span>
                    <Smartphone className="w-4 h-4 group-hover/item:animate-bounce" />
                  </div>
                  <div className="text-slate-400 group-hover/item:text-slate-300 transition-colors">{t("appPlatform")}</div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-red-500/10 to-orange-600/10 backdrop-blur-xl border border-red-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-500">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-orange-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("accountActions")}</span>
                  <LogOut className="w-5 h-5 text-red-400 group-hover:-rotate-12 transition-transform duration-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white py-6 rounded-xl shadow-lg shadow-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/30 duration-300 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <LogOut className="w-5 h-5 mr-2 group-hover/btn:-rotate-12 transition-transform duration-300" />
                  {isLoggingOut ? t("loggingOut") : t("logoutButton")}
                </Button>
                <p className="text-xs text-slate-400 text-right mt-3 animate-in fade-in slide-in-from-bottom-2 delay-700 duration-500">
                  {t("youWillBeRedirectedToLogin")}
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
        <BottomNav activeTab="settings" />
      </div>
    </AuthGuard>
  )
}
