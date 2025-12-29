"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Save, Lock, Bell, Eye, Shield, Settings } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function TrainerSettings() {
  const { t } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  
  const [notificationSettings, setNotificationSettings] = useState({
    traineeMessages: true,
    sessionReminders: true,
    workoutUpdates: true,
    emailNotifications: false
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showClientList: false
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userResponse = await fetch(`/api/users?email=${user.email}`)
          if (userResponse.ok) {
            const users = await userResponse.json()
            const currentUser = users.find((u: any) => u.email === user.email)
            const uid = currentUser?.id || currentUser?.uid || user.uid
            setUserId(uid)

            // Fetch user data including 2FA status
            const token = await user.getIdToken()
            const userDataResponse = await fetch(`/api/users/${uid}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            })
            if (userDataResponse.ok) {
              const userData = await userDataResponse.json()
              setTwoFactorEnabled(userData.twoFactorEnabled ?? false)
            }

            const settingsResponse = await fetch(`/api/settings?userId=${uid}`)
            if (settingsResponse.ok) {
              const settings = await settingsResponse.json()
              if (settings) {
                setNotificationSettings({
                  traineeMessages: settings.traineeMessages ?? true,
                  sessionReminders: settings.sessionReminders ?? true,
                  workoutUpdates: settings.workoutUpdates ?? true,
                  emailNotifications: settings.emailNotifications ?? false
                })
                setPrivacySettings({
                  profileVisibility: settings.profileVisibility ?? true,
                  showClientList: settings.showClientList ?? false
                })
              }
            }
          }
        } catch (error) {
          console.error('Error fetching settings:', error)
          toast.error('Failed to load settings')
        } finally {
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleToggle2FA = async (enabled: boolean) => {
    if (enabled) {
      router.push('/trainer/settings/two-factor')
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

  const handleSaveNotifications = async () => {
    if (!userId) return
    setSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...notificationSettings })
      })
      if (response.ok) {
        toast.success('Notification preferences saved')
      } else {
        toast.error('Failed to save preferences')
      }
    } catch (error) {
      console.error('Error saving notifications:', error)
      toast.error('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  const handleSavePrivacy = async () => {
    if (!userId) return
    setSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...privacySettings })
      })
      if (response.ok) {
        toast.success('Privacy settings saved')
      } else {
        toast.error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving privacy settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!passwordData.newPassword || !passwordData.currentPassword) {
      toast.error('Please fill in all password fields')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/users/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })
      if (response.ok) {
        toast.success('Password updated successfully')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update password')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="trainer">
        <SidebarSleek role="trainer">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">{t("loading")}...</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="trainer">
      <SidebarSleek role="trainer">
        <div className="space-y-12 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("settingsPage")}</h1>
              <p className="text-gray-400 text-sm">{t("manageAccountPreferences")}</p>
            </div>
          </div>

          {/* Account Security */}
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                {t("accountSecurity")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-400" />
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
              <div className="p-4 rounded-xl bg-slate-800/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  {t("changePassword")}
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">{t("currentPassword")}</Label>
                    <Input 
                      type="password" 
                      placeholder={t("enterCurrentPassword")} 
                      className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">{t("newPassword")}</Label>
                    <Input 
                      type="password" 
                      placeholder={t("enterNewPassword")} 
                      className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">{t("confirmPassword")}</Label>
                    <Input 
                      type="password" 
                      placeholder={t("confirmNewPassword")} 
                      className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={handleUpdatePassword}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {saving ? t("updating") : t("updatePassword")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-400" />
                {t("notificationPreferences")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div>
                  <p className="text-white font-semibold">{t("traineeMessages")}</p>
                  <p className="text-gray-400 text-sm">{t("traineeMessagesDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.traineeMessages}
                    onChange={(e) => setNotificationSettings({...notificationSettings, traineeMessages: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div>
                  <p className="text-white font-semibold">{t("sessionReminders")}</p>
                  <p className="text-gray-400 text-sm">{t("sessionRemindersDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sessionReminders}
                    onChange={(e) => setNotificationSettings({...notificationSettings, sessionReminders: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div>
                  <p className="text-white font-semibold">{t("workoutUpdates")}</p>
                  <p className="text-gray-400 text-sm">{t("workoutUpdatesDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.workoutUpdates}
                    onChange={(e) => setNotificationSettings({...notificationSettings, workoutUpdates: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div>
                  <p className="text-white font-semibold">{t("emailNotifications")}</p>
                  <p className="text-gray-400 text-sm">{t("emailNotificationsDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-600"></div>
                </label>
              </div>

              <Button 
                onClick={handleSaveNotifications}
                disabled={saving}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white mt-2"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? t("saving") : t("savePreferences")}
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                {t("privacySettings")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div>
                  <p className="text-white font-semibold">{t("profileVisibility")}</p>
                  <p className="text-gray-400 text-sm">{t("profileVisibilityDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={privacySettings.profileVisibility}
                    onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div>
                  <p className="text-white font-semibold">{t("showClientList")}</p>
                  <p className="text-gray-400 text-sm">{t("showClientListDesc")}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={privacySettings.showClientList}
                    onChange={(e) => setPrivacySettings({...privacySettings, showClientList: e.target.checked})}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-600"></div>
                </label>
              </div>

              <Button 
                onClick={handleSavePrivacy}
                disabled={saving}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white mt-2"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? t("saving") : t("savePrivacySettings")}
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t("dangerZone")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500 rounded-xl transition-colors"
              >
                {t("deleteAccount")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
