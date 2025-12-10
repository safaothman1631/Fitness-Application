"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Save, Lock, Bell, Eye, Shield, Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"

export default function UserSettings() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  
  // Notification preferences
  const [notificationSettings, setNotificationSettings] = useState({
    workoutReminders: true,
    progressUpdates: true,
    achievementBadges: true,
    emailNotifications: false
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showProgress: false
  })

  // Password fields
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

            // Fetch user settings
            const settingsResponse = await fetch(`/api/settings?userId=${uid}`)
            if (settingsResponse.ok) {
              const settings = await settingsResponse.json()
              if (settings) {
                setNotificationSettings({
                  workoutReminders: settings.workoutReminders ?? true,
                  progressUpdates: settings.progressUpdates ?? true,
                  achievementBadges: settings.achievementBadges ?? true,
                  emailNotifications: settings.emailNotifications ?? false
                })
                setPrivacySettings({
                  profileVisibility: settings.profileVisibility ?? true,
                  showProgress: settings.showProgress ?? false
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
      <FitproLayout role="user">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading settings...</p>
          </div>
        </div>
      </FitproLayout>
    )
  }

  return (
    <FitproLayout role="user">
      <div className="space-y-8 p-2">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white mb-2">{t("settings")}</h1>
          <p className="text-gray-400">{t("profileVisibilityDesc")}</p>
        </header>

        {/* Account Security */}
        <Card className="fitpro-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 transition-all duration-300 hover:rotate-12 hover:scale-110" />
              {t("accountSecurityTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="transition-all duration-300 focus-within:scale-105">
              <Label className="text-gray-300 mb-2 block">{t("currentPassword")}</Label>
              <Input 
                type="password" 
                placeholder={t("enterCurrentPassword")!} 
                className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)] focus:scale-105"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              />
            </div>
            <div className="transition-all duration-300 focus-within:scale-105">
              <Label className="text-gray-300 mb-2 block">{t("newPassword")}</Label>
              <Input 
                type="password" 
                placeholder={t("enterNewPassword")!} 
                className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)] focus:scale-105"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              />
            </div>
            <div className="transition-all duration-300 focus-within:scale-105">
              <Label className="text-gray-300 mb-2 block">{t("confirmPassword")}</Label>
              <Input 
                type="password" 
                placeholder={t("confirmNewPassword")!} 
                className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)] focus:scale-105"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleUpdatePassword}
              disabled={saving}
              className="w-full fitpro-button rounded-xl gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] active:scale-95 group"
            >
              <Lock className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              {saving ? 'Updating...' : t("updatePassword")}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="fitpro-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5 transition-all duration-300 hover:rotate-12 hover:scale-110 hover:animate-pulse" />
              {t("notificationPreferencesTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg transition-all duration-300 hover:bg-slate-800/50 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer group">
              <div>
                <p className="text-white font-semibold transition-colors duration-300 group-hover:text-blue-400">{t("workoutReminders")}</p>
                <p className="text-gray-400 text-sm">{t("workoutRemindersDesc")}</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.workoutReminders}
                onChange={(e) => setNotificationSettings({...notificationSettings, workoutReminders: e.target.checked})}
                className="w-5 h-5 transition-all duration-300 hover:scale-110 cursor-pointer" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg transition-all duration-300 hover:bg-slate-800/50 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer group">
              <div>
                <p className="text-white font-semibold transition-colors duration-300 group-hover:text-blue-400">{t("progressUpdates")}</p>
                <p className="text-gray-400 text-sm">{t("progressUpdatesDesc")}</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.progressUpdates}
                onChange={(e) => setNotificationSettings({...notificationSettings, progressUpdates: e.target.checked})}
                className="w-5 h-5 transition-all duration-300 hover:scale-110 cursor-pointer" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg transition-all duration-300 hover:bg-slate-800/50 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer group">
              <div>
                <p className="text-white font-semibold transition-colors duration-300 group-hover:text-blue-400">{t("achievementBadges")}</p>
                <p className="text-gray-400 text-sm">{t("achievementBadgesDesc")}</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.achievementBadges}
                onChange={(e) => setNotificationSettings({...notificationSettings, achievementBadges: e.target.checked})}
                className="w-5 h-5 transition-all duration-300 hover:scale-110 cursor-pointer" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("emailNotifications")}</p>
                <p className="text-gray-400 text-sm">{t("emailNotificationsDesc")}</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <Button 
              onClick={handleSaveNotifications}
              disabled={saving}
              className="w-full fitpro-button rounded-xl gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : t("savePreferences")}
            </Button>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="fitpro-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Languages className="w-5 h-5 transition-all duration-300 hover:rotate-12 hover:scale-110" />
              {t("languageSettings")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-800/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-4">{t("selectLanguage")}</p>
              <LanguageSelector />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t("privacySettingsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("profileVisibility")}</p>
                <p className="text-gray-400 text-sm">{t("profileVisibilityDesc")}</p>
              </div>
              <input 
                type="checkbox" 
                checked={privacySettings.profileVisibility}
                onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("showProgress")}</p>
                <p className="text-gray-400 text-sm">{t("showProgressDesc")}</p>
              </div>
              <input 
                type="checkbox" 
                checked={privacySettings.showProgress}
                onChange={(e) => setPrivacySettings({...privacySettings, showProgress: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <Button 
              onClick={handleSavePrivacy}
              disabled={saving}
              className="w-full fitpro-button rounded-xl gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : t("savePrivacySettings")}
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="fitpro-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">{t("dangerZone")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
              {t("deleteAccount")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
