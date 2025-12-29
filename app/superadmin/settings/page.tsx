"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Lock, Shield, Bell, Monitor, Palette, Globe, Zap, Save, Download, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function SuperAdminSettings() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        await fetchSettings(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  // Refresh settings when page becomes visible (e.g., returning from 2FA setup)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && userId) {
        fetchSettings(userId)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('focus', () => {
      if (userId) fetchSettings(userId)
    })

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', () => {})
    }
  }, [userId])

  const fetchSettings = async (uid: string) => {
    setLoading(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      console.log('🔑 Fetching settings for UID:', uid)
      console.log('👤 Current user email:', auth.currentUser?.email)
      
      const response = await fetch(`/api/users/${uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Settings data fetched:', data)
        console.log('🔐 twoFactorEnabled:', data.twoFactorEnabled)
        if (data) {
          setNotificationsEnabled(data.notificationsEnabled ?? true)
          setDarkMode(data.darkMode ?? true)
          setTwoFactorEnabled(data.twoFactorEnabled ?? false)
          setEmailNotifications(data.emailNotifications ?? true)
          setLanguage(data.language || 'en')
        }
      } else {
        console.error('Failed to fetch settings:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled) {
      // Navigate to 2FA setup page
      router.push('/superadmin/settings/two-factor')
    } else {
      // Disable 2FA
      if (confirm('Are you sure you want to disable Two-Factor Authentication?')) {
        try {
          console.log('🔴 Disabling 2FA for user:', userId)
          const token = await auth.currentUser?.getIdToken()
          console.log('🔑 Token obtained')
          
          const response = await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              twoFactorEnabled: false
            })
          })

          console.log('📡 Response status:', response.status)
          
          if (response.ok) {
            const data = await response.json()
            console.log('✅ 2FA disabled successfully:', data)
            setTwoFactorEnabled(false)
            alert('✅ Two-Factor Authentication disabled!')
          } else {
            const errorData = await response.json()
            console.error('❌ Failed to disable 2FA:', response.status, errorData)
            alert(`❌ Failed to disable 2FA: ${errorData.error || 'Unknown error'}`)
          }
        } catch (error) {
          console.error('❌ Error disabling 2FA:', error)
          alert('❌ Error disabling 2FA')
        }
      }
    }
  }

  const handleSaveSettings = async () => {
    if (!userId) return
    
    setSaving(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          notificationsEnabled,
          darkMode,
          twoFactorEnabled,
          emailNotifications,
          language
        })
      })

      if (response.ok) {
        alert('✅ Settings saved successfully!')
      } else {
        alert('❌ Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('❌ Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="superadmin">
        <SidebarSleek role="superadmin">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">{t("loading")}...</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-12 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("settingsPage")}</h1>
              <p className="text-gray-400 text-sm">{t("customizePreferences")}</p>
            </div>
          </div>

          {/* Security Settings */}
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  {t("securityAndPrivacy")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t("twoFactorAuth")}</p>
                    <p className="text-gray-400 text-sm">{t("addExtraLayer")}</p>
                    {twoFactorEnabled && (
                      <p className="text-green-400 text-xs mt-1">✓ Enabled</p>
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

              <div className="p-4 rounded-xl bg-slate-800/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  {t("changePassword")}
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">{t("currentPassword")}</Label>
                    <Input type="password" placeholder={t("currentPasswordPlaceholder")} className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">{t("newPassword")}</Label>
                    <Input type="password" placeholder={t("newPasswordPlaceholder")} className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">{t("confirmPassword")}</Label>
                    <Input type="password" placeholder={t("confirmPasswordPlaceholder")} className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                    <Lock className="w-4 h-4 mr-2" />
                    {t("updatePassword")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  {t("notificationsSettings")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <Bell className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">{t("pushNotifications")}</p>
                    <p className="text-gray-400 text-sm">{t("receiveSystemAlerts")}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-2">
                {[
                  { label: t("securityAlerts"), checked: true },
                  { label: t("systemUpdates"), checked: true },
                  { label: t("userActivities"), checked: false },
                  { label: t("databaseChanges"), checked: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/20">
                    <span className="text-gray-300">{item.label}</span>
                    <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 text-cyan-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                {t("appearance")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <Monitor className="w-6 h-6 text-pink-400" />
                  <div>
                    <p className="text-white font-semibold">{t("darkModeLabel")}</p>
                    <p className="text-gray-400 text-sm">{t("darkModeDesc")}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                </label>
              </div>

              <div>
                <Label className="text-gray-400 text-sm mb-3 block">{t("themeColor")}</Label>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    "from-cyan-500 to-blue-600",
                    "from-purple-500 to-pink-600",
                    "from-green-500 to-emerald-600",
                    "from-orange-500 to-red-600",
                    "from-yellow-500 to-orange-600",
                  ].map((gradient, idx) => (
                    <button 
                      key={idx}
                      className={`h-12 rounded-xl bg-gradient-to-r ${gradient} hover:scale-110 transition-transform ${idx === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  {t("languageAndRegion")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">{t("languagePreference")}</Label>
                <select className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3">
                  <option>English</option>
                  <option>┌⌐┘ê╪▒╪»█î (Kurdish)</option>
                  <option>╪º┘ä╪╣╪▒╪¿┘è╪⌐ (Arabic)</option>
                  <option>T├╝rk├ºe (Turkish)</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">{t("timezone")}</Label>
                <select className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3">
                  <option>GMT+3 (Baghdad)</option>
                  <option>GMT+0 (London)</option>
                  <option>GMT+1 (Paris)</option>
                  <option>GMT-5 (New York)</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">{t("dateFormat")}</Label>
                <select className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  {t("dataManagement")}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Download className="w-4 h-4 mr-2" />
                {t("exportMyData")}
              </Button>
              <Button className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Upload className="w-4 h-4 mr-2" />
                {t("importSettings")}
              </Button>
              <Button className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30">
                <Shield className="w-4 h-4 mr-2" />
                {t("clearCache")}
              </Button>
            </CardContent>
          </Card>

          {/* Save All Button */}
          <Button 
            onClick={handleSaveSettings}
            disabled={saving}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg py-6 text-lg disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-2" />
            {saving ? t("saving") + '...' : t("saveAllSettings")}
          </Button>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
