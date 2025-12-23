"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Save, Lock, Bell, Eye, Shield } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function TrainerSettings() {
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
      <FitproLayout role="trainer">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading settings...</p>
          </div>
        </div>
      </FitproLayout>
    )
  }

  return (
    <FitproLayout role="trainer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account preferences and security</p>
        </div>

        {/* Account Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-rose-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Two-Factor Authentication</p>
                  <p className="text-gray-400 text-sm">Add an extra layer of security</p>
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

            {/* Password Change */}
            <div>
              <Label className="text-gray-300 mb-2 block">Current Password</Label>
              <Input 
                type="password" 
                placeholder="Enter current password" 
                className="fitpro-input rounded-xl"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">New Password</Label>
              <Input 
                type="password" 
                placeholder="Enter new password" 
                className="fitpro-input rounded-xl"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">Confirm Password</Label>
              <Input 
                type="password" 
                placeholder="Confirm new password" 
                className="fitpro-input rounded-xl"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
              />
            </div>
            <Button 
              onClick={handleUpdatePassword}
              disabled={saving}
              className="w-full fitpro-button rounded-xl gap-2"
            >
              <Lock className="w-4 h-4" />
              {saving ? 'Updating...' : 'Update Password'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Trainee Messages</p>
                <p className="text-gray-400 text-sm">Get notified when trainees send messages</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.traineeMessages}
                onChange={(e) => setNotificationSettings({...notificationSettings, traineeMessages: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Session Reminders</p>
                <p className="text-gray-400 text-sm">Reminder before each training session</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.sessionReminders}
                onChange={(e) => setNotificationSettings({...notificationSettings, sessionReminders: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Workout Updates</p>
                <p className="text-gray-400 text-sm">Notify when trainee completes workout</p>
              </div>
              <input 
                type="checkbox" 
                checked={notificationSettings.workoutUpdates}
                onChange={(e) => setNotificationSettings({...notificationSettings, workoutUpdates: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Email Notifications</p>
                <p className="text-gray-400 text-sm">Receive weekly email summaries</p>
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
              {saving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Profile Visibility</p>
                <p className="text-gray-400 text-sm">Allow trainees to see your profile</p>
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
                <p className="text-white font-semibold">Show Client List</p>
                <p className="text-gray-400 text-sm">Display your client roster</p>
              </div>
              <input 
                type="checkbox" 
                checked={privacySettings.showClientList}
                onChange={(e) => setPrivacySettings({...privacySettings, showClientList: e.target.checked})}
                className="w-5 h-5" 
              />
            </div>

            <Button 
              onClick={handleSavePrivacy}
              disabled={saving}
              className="w-full fitpro-button rounded-xl gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Privacy Settings'}
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="fitpro-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
