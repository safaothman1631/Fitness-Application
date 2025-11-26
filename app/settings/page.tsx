"use client"

import { useState } from "react"
<<<<<<< HEAD
import AuthGuard from "@/components/auth-guard"
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Lock, Bell, Eye, EyeOff, Save, Moon, Sun, Monitor, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    privateProfile: false,
  })
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const logout = () => {
    try {
      ["userRole","profileData","profileAvatar","workoutTasksCompleted","mealTasksCompleted","submittedWorkouts","submittedMeals","customScheduleItems"].forEach(k=>localStorage.removeItem(k))
    } catch {}
    router.push("/login")
  }

  return (
<<<<<<< HEAD
    <AuthGuard requiredRole="user">
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    <FitproLayout role="user">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        {/* Appearance */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-400" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
                { key: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
                { key: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
              ].map(m => (
                <button
                  key={m.key}
                  onClick={() => setTheme(m.key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-xs font-medium transition-colors ${theme===m.key?"border-blue-500 bg-blue-500/10 text-white":"border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600"}`}
                >
                  {m.icon}
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500">Your interface will follow the selected mode. System uses OS setting.</p>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-gray-300 mb-2 block">Current Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="fitpro-input rounded-xl pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">New Password</Label>
              <Input type="password" placeholder="Enter new password" className="fitpro-input rounded-xl" />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Confirm Password</Label>
              <Input type="password" placeholder="Confirm new password" className="fitpro-input rounded-xl" />
            </div>

            <Button className="w-full fitpro-button rounded-xl">
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                label: "Email Notifications",
                description: "Receive workout reminders via email",
                key: "emailNotifications",
              },
              {
                label: "Push Notifications",
                description: "Receive push notifications on your device",
                key: "pushNotifications",
              },
              {
                label: "SMS Notifications",
                description: "Receive workout updates via SMS",
                key: "smsNotifications",
              },
              {
                label: "Private Profile",
                description: "Hide your profile from other users",
                key: "privateProfile",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-white font-semibold">{item.label}</p>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof typeof settings]}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      [item.key]: e.target.checked,
                    })
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            ))}

            <Button className="w-full fitpro-button rounded-xl mt-4">
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone & Logout */}
        <Card className="fitpro-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm">These actions cannot be undone. Please proceed with caution.</p>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
                Download My Data
              </Button>
              <Button variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
                Delete Account
              </Button>
            </div>
            <Button onClick={logout} variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-red-600/10 hover:border-red-600 flex items-center justify-center gap-2 rounded-xl">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  )
}
