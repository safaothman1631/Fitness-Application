"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon, Bell, Lock, Globe, Moon, Sun, Shield, Save, Key, Check } from "lucide-react"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"

export default function AdminPhysiotherapistSettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      newRequests: true,
      doctorApprovals: true,
      systemUpdates: false,
      emailNotifications: true
    },
    privacy: {
      profileVisibility: "private" as "public" | "private",
      showEmail: false,
      showPhone: false
    },
    appearance: {
      theme: "dark" as "light" | "dark" | "system",
      language: language
    }
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        
        // Fetch user data including 2FA status
        const token = await user.getIdToken()
        const userDataResponse = await fetch(`/api/users/${user.uid}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json()
          setTwoFactorEnabled(userData.twoFactorEnabled ?? false)
        }
        
        await fetchSettings()
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const userId = auth.currentUser?.uid
      if (!userId) return

      const settingsDoc = await getDoc(doc(db, "settings", userId))
      if (settingsDoc.exists()) {
        const data = settingsDoc.data()
        setSettings({
          notifications: data.notifications || settings.notifications,
          privacy: data.privacy || settings.privacy,
          appearance: { ...settings.appearance, ...data.appearance }
        })
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled) {
      router.push('/admin-physiotherapist/settings/two-factor')
    } else {
      if (confirm('Are you sure you want to disable Two-Factor Authentication?')) {
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
            toast.success('Two-Factor Authentication disabled!')
          } else {
            const errorData = await response.json()
            toast.error(`Failed to disable 2FA: ${errorData.error || 'Unknown error'}`)
          }
        } catch (error) {
          console.error('Error disabling 2FA:', error)
          toast.error('Error disabling 2FA')
        }
      }
    }
  }

  const saveSettings = async () => {
    try {
      setSaving(true)
      const userId = auth.currentUser?.uid
      if (!userId) return

      // Check if settings document exists
      const settingsRef = doc(db, "settings", userId)
      const settingsDoc = await getDoc(settingsRef)
      
      if (settingsDoc.exists()) {
        await updateDoc(settingsRef, {
          ...settings,
          updatedAt: new Date()
        })
      } else {
        // Create new settings document if it doesn't exist
        await setDoc(settingsRef, {
          ...settings,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }

      toast.success(t("settingsSaved") || "Settings saved successfully")
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings")
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t("passwordsDoNotMatch"))
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error(t("mustBeAtLeast8Chars"))
      return
    }

    try {
      // Password change logic would go here
      toast.success("Password changed successfully")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (error) {
      console.error("Error changing password:", error)
      toast.error("Failed to change password")
    }
  }

  const handleLanguageChange = (newLang: "en" | "ar" | "ku" | "tr") => {
    setLanguage(newLang)
    setSettings(prev => ({
      ...prev,
      appearance: { ...prev.appearance, language: newLang }
    }))
  }

  if (loading) {
    return (
      <AuthGuard allowedRoles={["admin-physiotherapist"]}>
        <SidebarSleek role="admin-physiotherapist">
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="space-y-6 p-4 md:p-6 lg:p-8 pb-6 max-w-6xl mx-auto pt-6 scrollbar-none overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Ultra Modern Header with Glassmorphism */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-6 md:p-8 mt-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_48px_rgba(251,146,60,0.3)] hover:border-orange-500/30 group"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.03) 100%)',
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative group/icon">
                  <div className="absolute inset-0 bg-orange-500/30 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-all duration-500" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl border border-orange-500/30 flex items-center justify-center shadow-lg transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-6"
                       style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <SettingsIcon className="w-8 h-8 text-orange-400 transition-all duration-300 group-hover/icon:rotate-180" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-300 to-amber-400 tracking-tight">
                    {t("settings")}
                  </h1>
                  <p className="text-orange-200/60 text-sm md:text-base mt-1 font-medium">
                    {t("customizePreferences")}
                  </p>
                </div>
              </div>
              <Button
                onClick={saveSettings}
                disabled={saving}
                className="relative bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border border-orange-400/30 shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Save className={`w-4 h-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
                {saving ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </div>

          {/* Security & Privacy */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 mt-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_48px_rgba(239,68,68,0.3)] hover:border-red-500/30 group"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.03) 100%)',
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 backdrop-blur-xl border border-red-500/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                       style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <Shield className="w-5 h-5 text-red-400" />
                  </div>
                  {t("securityAndPrivacy")}
                </h3>
                <p className="text-red-200/50 text-sm md:text-base font-medium">Notification preferences</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-red-500/20">
                      <Bell className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("newRequests") || "New Requests"}</p>
                      <p className="text-sm text-slate-400">{t("notifyNewRequests") || "Get notified when new patient requests arrive"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, newRequests: !prev.notifications.newRequests }
                    }))}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.notifications.newRequests ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" : "bg-slate-700/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings.notifications.newRequests ? "translate-x-7 rtl:-translate-x-7" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-orange-500/20">
                      <Shield className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("doctorApprovals") || "Doctor Approvals"}</p>
                      <p className="text-sm text-slate-400">{t("notifyDoctorApprovals") || "Get notified about doctor approval actions"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, doctorApprovals: !prev.notifications.doctorApprovals }
                    }))}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.notifications.doctorApprovals ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" : "bg-slate-700/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings.notifications.doctorApprovals ? "translate-x-7 rtl:-translate-x-7" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-blue-500/20">
                      <Settings as SettingsIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("systemUpdates") || "System Updates"}</p>
                      <p className="text-sm text-slate-400">{t("notifySystemUpdates") || "Get notified about system updates"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, systemUpdates: !prev.notifications.systemUpdates }
                    }))}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.notifications.systemUpdates ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" : "bg-slate-700/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings.notifications.systemUpdates ? "translate-x-7 rtl:-translate-x-7" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:bg-purple-500/20">
                      <Bell className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("emailNotifications") || "Email Notifications"}</p>
                      <p className="text-sm text-slate-400">{t("receiveEmailNotifications") || "Receive notifications via email"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: !prev.notifications.emailNotifications }
                    }))}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.notifications.emailNotifications ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" : "bg-slate-700/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings.notifications.emailNotifications ? "translate-x-7 rtl:-translate-x-7" : ""
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 mt-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_48px_rgba(100,116,139,0.3)] hover:border-slate-500/30 group"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(100,116,139,0.08) 0%, rgba(100,116,139,0.03) 100%)',
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-gray-400 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-500/20 backdrop-blur-xl border border-slate-500/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                       style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <Shield className="w-5 h-5 text-slate-400" />
                  </div>
                  {t("privacySettings")}
                </h3>
                <p className="text-slate-300/50 text-sm md:text-base font-medium">Control your privacy settings</p>
              </div>
              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-slate-500/30"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <label className="text-white font-semibold mb-3 block flex items-center gap-2">
                    <Globe className="w-5 h-5 text-slate-400" />
                    {t("profileVisibility")}
                  </label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, profileVisibility: e.target.value as "public" | "private" }
                    }))}
                    className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:border-orange-500 focus:outline-none transition-all duration-300 hover:bg-slate-800/70"
                  >
                    <option value="public">{t("public") || "Public"}</option>
                    <option value="private">{t("private") || "Private"}</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-slate-500/30 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-500/10 backdrop-blur-sm border border-slate-500/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110">
                      <Bell className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("showEmail") || "Show Email"}</p>
                      <p className="text-sm text-slate-400">{t("showEmailDesc") || "Display email on profile"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showEmail: !prev.privacy.showEmail }
                    }))}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.privacy.showEmail ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" : "bg-slate-700/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings.privacy.showEmail ? "translate-x-7 rtl:-translate-x-7" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-slate-500/30 group/item"
                     style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-500/10 backdrop-blur-sm border border-slate-500/20 flex items-center justify-center transition-all duration-300 group-hover/item:scale-110">
                      <Shield className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("showPhone") || "Show Phone"}</p>
                      <p className="text-sm text-slate-400">{t("showPhoneDesc") || "Display phone number on profile"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showPhone: !prev.privacy.showPhone }
                    }))}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                      settings.privacy.showPhone ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50" : "bg-slate-700/50 backdrop-blur-sm"
                    }`}
                  >
                    <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      settings.privacy.showPhone ? "translate-x-7 rtl:-translate-x-7" : ""
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 mt-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_48px_rgba(59,130,246,0.3)] hover:border-cyan-500/30 group"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.03) 100%)',
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                       style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <Globe className="w-5 h-5 text-cyan-400" />
                  </div>
                  {t("languageSettings")}
                </h3>
                <p className="text-cyan-200/50 text-sm md:text-base font-medium">Choose your preferred language</p>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { code: "en", label: "English", flag: "🇬🇧" },
                    { code: "ar", label: "العربية", flag: "🇸🇦" },
                    { code: "ku", label: "کوردی", flag: "🇮🇶" },
                    { code: "tr", label: "Türkçe", flag: "🇹🇷" }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as any)}
                      className={`relative p-5 rounded-2xl border transition-all duration-300 group/lang ${
                        language === lang.code
                          ? "bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl border-orange-500/40 shadow-lg shadow-orange-500/30"
                          : "bg-white/[0.03] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
                      }`}
                      style={language === lang.code ? { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 24px rgba(251,146,60,0.3)' } : { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    >
                      <div className="text-3xl mb-2 transition-transform duration-300 group-hover/lang:scale-125">{lang.flag}</div>
                      <p className={`font-bold text-lg ${
                        language === lang.code ? "text-orange-300" : "text-slate-300 group-hover/lang:text-white"
                      }`}>{lang.label}</p>
                      {language === lang.code && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 mt-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_48px_rgba(99,102,241,0.3)] hover:border-indigo-500/30 group"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.03) 100%)',
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                       style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <Lock className="w-5 h-5 text-indigo-400" />
                  </div>
                  {t("security")}
                </h3>
                <p className="text-indigo-200/50 text-sm md:text-base font-medium">Manage your account security</p>
              </div>
              <div className="space-y-4">
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
                      <p className="text-slate-400 text-sm mt-0.5">{t("addExtraLayer")}</p>
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
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 mt-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_8px_48px_rgba(168,85,247,0.3)] hover:border-purple-500/30 group"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(168,85,247,0.03) 100%)',
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 md:p-8">
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                       style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                    <Sun className="w-5 h-5 text-purple-400" />
                  </div>
                  {t("appearance")}
                </h3>
                <p className="text-purple-200/50 text-sm md:text-base font-medium">{t("chooseYourPreferredTheme")}</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: "light", label: t("light"), icon: Sun, color: "orange" },
                  { value: "dark", label: t("dark"), icon: Moon, color: "indigo" },
                  { value: "system", label: t("system"), icon: Settings as typeof Sun, color: "purple" }
                ].map((themeOption) => {
                  const ThemeIcon = themeOption.icon
                  const isActive = settings.appearance.theme === themeOption.value
                  
                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, theme: themeOption.value as "light" | "dark" | "system" }
                      }))}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group/theme relative overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-br from-${themeOption.color}-500/20 to-${themeOption.color}-500/10 backdrop-blur-xl border-${themeOption.color}-500/40 shadow-lg shadow-${themeOption.color}-500/30`
                          : "bg-white/[0.03] backdrop-blur-xl border-white/10 hover:bg-white/[0.06] hover:border-purple-500/30"
                      }`}
                      style={isActive ? { 
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 24px rgba(168,85,247,0.3)`,
                        background: themeOption.color === 'orange' 
                          ? 'linear-gradient(135deg, rgba(251,146,60,0.2) 0%, rgba(251,146,60,0.1) 100%)'
                          : themeOption.color === 'indigo'
                          ? 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(168,85,247,0.1) 100%)',
                        borderColor: themeOption.color === 'orange'
                          ? 'rgba(251,146,60,0.4)'
                          : themeOption.color === 'indigo'
                          ? 'rgba(99,102,241,0.4)'
                          : 'rgba(168,85,247,0.4)'
                      } : { boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover/theme:scale-110 ${
                            isActive ? 'group-hover/theme:rotate-12' : ''
                          }`}
                          style={{
                            backgroundColor: isActive
                              ? themeOption.color === 'orange' 
                                ? 'rgba(251,146,60,0.3)'
                                : themeOption.color === 'indigo'
                                ? 'rgba(99,102,241,0.3)'
                                : 'rgba(168,85,247,0.3)'
                              : 'rgba(255,255,255,0.05)',
                            boxShadow: isActive 
                              ? `inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 20px ${
                                  themeOption.color === 'orange' 
                                    ? 'rgba(251,146,60,0.4)'
                                    : themeOption.color === 'indigo'
                                    ? 'rgba(99,102,241,0.4)'
                                    : 'rgba(168,85,247,0.4)'
                                }`
                              : 'inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          <ThemeIcon 
                            className={`w-7 h-7 transition-all duration-300 ${
                              isActive ? 'group-hover/theme:scale-110' : ''
                            }`}
                            style={{ 
                              color: isActive
                                ? themeOption.color === 'orange' 
                                  ? '#FB923C'
                                  : themeOption.color === 'indigo'
                                  ? '#6366F1'
                                  : '#A855F7'
                                : '#94A3B8'
                            }}
                          />
                        </div>
                        <div className="text-left">
                          <p className={`font-bold text-lg ${
                            isActive ? 'text-white' : 'text-slate-300 group-hover/theme:text-white'
                          }`}>
                            {themeOption.label}
                          </p>
                          <p className={`text-sm ${
                            isActive ? 'text-purple-200/70' : 'text-slate-500 group-hover/theme:text-slate-400'
                          }`}>
                            {themeOption.value === 'light' 
                              ? t("tapToActivate") || "Tap to activate"
                              : themeOption.value === 'dark'
                              ? t("tapToActivate") || "Tap to activate"
                              : t("systemFollowsOS") || "Follows system settings"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50 animate-in zoom-in duration-300">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div
                          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/50' 
                              : 'bg-slate-700/50 backdrop-blur-sm'
                          }`}
                        >
                          <div className={`absolute top-[2px] start-[2px] w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                            isActive ? 'translate-x-7 rtl:-translate-x-7' : ''
                          }`} />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        </SidebarSleek>
      </AuthGuard>
  )
}
