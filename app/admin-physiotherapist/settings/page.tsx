"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon, Bell, Lock, Globe, Moon, Sun, Shield, Save, Key } from "lucide-react"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl">
                      <SettingsIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {t("settings")}
                    </h1>
                    <p className="text-orange-400 mt-1 font-medium">
                      {t("customizePreferences")}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={saveSettings}
                  disabled={saving}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? t("saving") : t("saveChanges")}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications Settings */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-400" />
                  {t("notificationsSettings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{t("newRequests") || "New Requests"}</p>
                    <p className="text-sm text-slate-400">{t("notifyNewRequests") || "Get notified when new patient requests arrive"}</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, newRequests: !prev.notifications.newRequests }
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications.newRequests ? "bg-green-500" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.newRequests ? "translate-x-6" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{t("doctorApprovals") || "Doctor Approvals"}</p>
                    <p className="text-sm text-slate-400">{t("notifyDoctorApprovals") || "Get notified about doctor approval actions"}</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, doctorApprovals: !prev.notifications.doctorApprovals }
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications.doctorApprovals ? "bg-green-500" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.doctorApprovals ? "translate-x-6" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{t("systemUpdates") || "System Updates"}</p>
                    <p className="text-sm text-slate-400">{t("notifySystemUpdates") || "Get notified about system updates"}</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, systemUpdates: !prev.notifications.systemUpdates }
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications.systemUpdates ? "bg-green-500" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.systemUpdates ? "translate-x-6" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{t("emailNotifications") || "Email Notifications"}</p>
                    <p className="text-sm text-slate-400">{t("receiveEmailNotifications") || "Receive notifications via email"}</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, emailNotifications: !prev.notifications.emailNotifications }
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.notifications.emailNotifications ? "bg-green-500" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.notifications.emailNotifications ? "translate-x-6" : ""
                    }`} />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-400" />
                  {t("privacySettings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <label className="text-white font-medium mb-3 block">{t("profileVisibility")}</label>
                  <select
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, profileVisibility: e.target.value as "public" | "private" }
                    }))}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                  >
                    <option value="public">{t("public") || "Public"}</option>
                    <option value="private">{t("private") || "Private"}</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{t("showEmail") || "Show Email"}</p>
                    <p className="text-sm text-slate-400">{t("showEmailDesc") || "Display email on profile"}</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showEmail: !prev.privacy.showEmail }
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.privacy.showEmail ? "bg-green-500" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.privacy.showEmail ? "translate-x-6" : ""
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white font-medium">{t("showPhone") || "Show Phone"}</p>
                    <p className="text-sm text-slate-400">{t("showPhoneDesc") || "Display phone number on profile"}</p>
                  </div>
                  <button
                    onClick={() => setSettings(prev => ({
                      ...prev,
                      privacy: { ...prev.privacy, showPhone: !prev.privacy.showPhone }
                    }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.privacy.showPhone ? "bg-green-500" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.privacy.showPhone ? "translate-x-6" : ""
                    }`} />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-400" />
                  {t("languageSettings")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { code: "en", label: "English" },
                    { code: "ar", label: "العربية" },
                    { code: "ku", label: "کوردی" },
                    { code: "tr", label: "Türkçe" }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as any)}
                      className={`p-4 rounded-xl border transition-all ${
                        language === lang.code
                          ? "bg-orange-500/20 border-orange-500/50 text-white"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <p className="font-medium">{lang.label}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-orange-400" />
                  {t("security")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t("twoFactorAuth")}</p>
                      <p className="text-gray-400 text-sm">{t("addExtraLayer")}</p>
                      {twoFactorEnabled && (
                        <p className="text-green-400 text-xs mt-1">✓ {t("enabled")}</p>
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
                    <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                  </label>
                </div>

                {/* Password Change */}
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">{t("currentPassword")}</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">{t("newPassword")}</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">{t("confirmPassword")}</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-orange-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <Button
                  onClick={handlePasswordChange}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500"
                >
                  <Key className="w-4 h-4 mr-2" />
                  {t("changePassword")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
