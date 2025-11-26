"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { User, Mail, Phone, Calendar, Weight, Ruler, Activity, Edit2, Save, Camera, Lock, Moon, Bell, Globe, LogOut, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Safa",
    email: "safa@example.com",
    phone: "+1 (555) 123-4567",
    weight: 75,
    height: 180,
    joinDate: "January 2023",
    goal: "Build Muscle",
    experience: "Intermediate",
  })

  const [tempProfile, setTempProfile] = useState(profile)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [tempAvatar, setTempAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Load persisted profile + avatar from localStorage if available
    try {
      const p = localStorage.getItem("profileData")
      if (p) {
        const parsed = JSON.parse(p)
        setProfile(parsed)
        setTempProfile(parsed)
      }
      const a = localStorage.getItem("profileAvatar")
      if (a) {
        setAvatar(a)
        setTempAvatar(a)
      }
    } catch {}
  }, [])

  const isDirty =
    JSON.stringify(tempProfile) !== JSON.stringify(profile) || (tempAvatar || null) !== (avatar || null)

  const handleSave = () => {
    setProfile(tempProfile)
    setAvatar(tempAvatar)
    // persist
    try {
      localStorage.setItem("profileData", JSON.stringify(tempProfile))
      if (tempAvatar) localStorage.setItem("profileAvatar", tempAvatar)
    } catch {}
    setIsEditing(false)
    toast({ description: "Profile updated successfully." })
  }

  const handleCancel = () => {
    setTempProfile(profile)
    setTempAvatar(avatar)
    setIsEditing(false)
  }

  const onPickAvatar = () => fileInputRef.current?.click()
  const onAvatarSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setTempAvatar(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const logout = () => {
    try {
      const keysToClear = [
        "userRole","profileData","profileAvatar","workoutTasksCompleted","mealTasksCompleted","submittedWorkouts","submittedMeals","customScheduleItems"
      ]
      keysToClear.forEach(k => localStorage.removeItem(k))
    } catch {}
    router.push("/login")
  }

  return (
    <FitproLayout role="user">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-gray-400 mt-1">Manage your account and fitness preferences</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="fitpro-button rounded-xl gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Two column layout: left profile details, right settings */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">

  {/* Profile Header */}
        <Card className="fitpro-card overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-24" />
          <CardContent className="p-6 -mt-12 relative">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 border-4 border-slate-900 flex items-center justify-center">
                  {(isEditing ? tempAvatar : avatar) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={(isEditing ? tempAvatar : avatar) as string} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl">👤</span>
                  )}
                </div>
                {isEditing && (
                  <Button onClick={onPickAvatar} size="sm" className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-xl h-8 px-3 gap-2">
                    <Camera className="w-4 h-4" />
                    Change
                  </Button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={onAvatarSelected} className="hidden" />
              </div>
              <div className="flex-1 mb-2">
                <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                <p className="text-gray-400">{profile.goal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

  {/* Personal Information */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label className="text-gray-400 mb-2 block">Full Name</Label>
                {isEditing ? (
                  <Input
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="fitpro-input rounded-xl"
                  />
                ) : (
                  <p className="text-white font-semibold text-lg">{profile.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="text-gray-400 mb-2 block flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <p className="text-white font-semibold opacity-80">{profile.email}</p>              </div>

              {/* Phone */}
              <div>
                <Label className="text-gray-400 mb-2 block flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                {isEditing ? (
                  <Input
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className="fitpro-input rounded-xl"
                  />
                ) : (
                  <p className="text-white font-semibold">{profile.phone}</p>
                )}
              </div>

              {/* Join Date */}
              <div>
                <Label className="text-gray-400 mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Join Date
                </Label>
                <p className="text-white font-semibold">{profile.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

  {/* Physical Information */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-500" />
              Physical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight */}
              <div>
                <Label className="text-gray-400 mb-2 block flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  Weight (kg)
                </Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={tempProfile.weight}
                    onChange={(e) => setTempProfile({ ...tempProfile, weight: parseInt(e.target.value) })}
                    className="fitpro-input rounded-xl"
                  />
                ) : (
                  <p className="text-white font-semibold text-2xl">{profile.weight}</p>
                )}
              </div>

              {/* Height */}
              <div>
                <Label className="text-gray-400 mb-2 block flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Height (cm)
                </Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={tempProfile.height}
                    onChange={(e) => setTempProfile({ ...tempProfile, height: parseInt(e.target.value) })}
                    className="fitpro-input rounded-xl"
                  />
                ) : (
                  <p className="text-white font-semibold text-2xl">{profile.height}</p>
                )}
              </div>

              {/* Fitness Goal */}
              <div>
                <Label className="text-gray-400 mb-2 block">Fitness Goal</Label>
                {isEditing ? (
                  <Input
                    value={tempProfile.goal}
                    onChange={(e) => setTempProfile({ ...tempProfile, goal: e.target.value })}
                    className="fitpro-input rounded-xl"
                  />
                ) : (
                  <p className="text-white font-semibold">{profile.goal}</p>
                )}
              </div>

              {/* Experience Level */}
              <div>
                <Label className="text-gray-400 mb-2 block">Experience Level</Label>
                {isEditing ? (
                  <Input
                    value={tempProfile.experience}
                    onChange={(e) => setTempProfile({ ...tempProfile, experience: e.target.value })}
                    className="fitpro-input rounded-xl"
                  />
                ) : (
                  <p className="text-white font-semibold">{profile.experience}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

  {isEditing && (
          <div className="flex gap-4 justify-end">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!isDirty} className="fitpro-button rounded-xl gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              <Save className="w-4 h-4" />
              {isDirty ? "Save Changes" : "No Changes"}
            </Button>
          </div>
        )}

  {/* Security */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-500" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-400">Current Password</Label>
                <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="fitpro-input rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400">New Password</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="fitpro-input rounded-xl" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-400">Confirm New Password</Label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="fitpro-input rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  const valid = newPassword.length >= 8 && newPassword === confirmPassword && newPassword !== currentPassword
                  if (!valid) {
                    toast({ description: "Check password rules: min 8 chars, must match, and differ from current." })
                    return
                  }
                  setChangingPassword(true)
                  setTimeout(() => {
                    setChangingPassword(false)
                    setCurrentPassword("")
                    setNewPassword("")
                    setConfirmPassword("")
                    toast({ description: "Password updated successfully." })
                  }, 800)
                }}
                disabled={changingPassword}
                className="rounded-xl gap-2"
              >
                {changingPassword ? "Updating..." : "Change Password"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preferences moved to settings column below */}
          </div>
          {/* Settings column */}
          <div className="space-y-6">
            <Card className="fitpro-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2"><Lock className="w-5 h-5 text-purple-500" /> Quick Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {/* Appearance selector (Light / Dark / System) */}
                  <div>
                    <p className="text-white text-sm mb-2">Appearance</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
                        { key: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
                        { key: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
                      ].map((m) => {
                        return (
                          <button
                            key={m.key}
                            type="button"
                            onClick={() => setTheme(m.key as any)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-lg border text-xs ${theme === m.key ? "border-blue-500 bg-blue-500/10 text-white" : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600"}`}
                          >
                            {m.icon}
                            {m.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="flex items-center gap-2 text-white text-sm"><Bell className="w-4 h-4 text-emerald-400" /> Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="flex items-center gap-2 text-white text-sm"><Bell className="w-4 h-4 text-pink-400" /> Push Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="flex items-center gap-2 text-white text-sm"><Globe className="w-4 h-4 text-cyan-400" /> Language</span>
                    <select
                      onChange={(e)=>{
                        try { localStorage.setItem("app_language", e.target.value); } catch {}
                        toast({ description: `Language set to ${e.target.value}` })
                      }}
                      defaultValue={typeof window!=="undefined"?localStorage.getItem("app_language")||"en":"en"}
                      className="bg-slate-900 border border-slate-700 text-xs rounded px-2 py-1 text-white"
                    >
                      <option value="en">EN</option>
                      <option value="tr">TR</option>
                      <option value="ar">AR</option>
                      <option value="ku">KU</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="flex items-center gap-2 text-white text-sm"><Lock className="w-4 h-4 text-purple-400" /> Public Profile</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
                <Button onClick={logout} variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-600/10 gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FitproLayout>
  )
}
