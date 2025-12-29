"use client"

import { useState, useEffect } from "react"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Mail, MessageSquare, Check } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { BottomNav } from "@/components/bottom-nav"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function NotificationsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)
  const [notifySMS, setNotifySMS] = useState(false)
  const [notifyWorkout, setNotifyWorkout] = useState(true)
  const [notifyMeals, setNotifyMeals] = useState(true)
  const [notifyPhysio, setNotifyPhysio] = useState(false)

  // Wait for auth to be ready
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  // Load preferences from database when user is ready
  useEffect(() => {
    if (!userId) return

    const loadPreferences = async () => {
      try {
        const token = await auth.currentUser?.getIdToken()
        if (!token) {
          console.error('No auth token available')
          setLoading(false)
          return
        }

        const response = await fetch('/api/user/notification-preferences', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          const prefs = data.preferences
          setNotifyEmail(prefs.notifyEmail ?? true)
          setNotifyPush(prefs.notifyPush ?? true)
          setNotifySMS(prefs.notifySMS ?? false)
          setNotifyWorkout(prefs.notifyWorkout ?? true)
          setNotifyMeals(prefs.notifyMeals ?? true)
          setNotifyPhysio(prefs.notifyPhysio ?? false)
        } else {
          console.error('Failed to fetch preferences:', await response.text())
        }
      } catch (error) {
        console.error('Failed to load preferences:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPreferences()
  }, [userId])

  // Save individual preference to database
  const savePreference = async (key: string, value: boolean) => {
    if (!userId) {
      toast({
        title: t("error") || "Error",
        description: "User not authenticated",
        variant: "destructive"
      })
      return
    }

    try {
      const token = await auth.currentUser?.getIdToken()
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch('/api/user/notification-preferences', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [key]: value })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save preference')
      }
      
      // Success - show subtle confirmation
      console.log(`${key} saved:`, value)
    } catch (error) {
      console.error('Error saving preference:', error)
      toast({
        title: t("error") || "Error",
        description: error instanceof Error ? error.message : "Failed to save preference",
        variant: "destructive"
      })
      // Revert the change on error
      return false
    }
    return true
  }

  const handleToggle = async (key: string, currentValue: boolean, setter: (val: boolean) => void) => {
    const newValue = !currentValue
    setter(newValue) // Optimistic update
    
    const success = await savePreference(key, newValue)
    if (success === false) {
      // Revert on failure
      setter(currentValue)
    }
  }

  const handleSave = async () => {
    if (!userId) {
      toast({
        title: t("error") || "Error",
        description: "User not authenticated",
        variant: "destructive"
      })
      return
    }

    setSaving(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch('/api/user/notification-preferences', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          notifyEmail,
          notifyPush,
          notifySMS,
          notifyWorkout,
          notifyMeals,
          notifyPhysio
        })
      })

      if (response.ok) {
        toast({
          description: t("notificationsSaved") || "Preferences saved successfully!",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: t("error") || "Error",
        description: error instanceof Error ? error.message : "Failed to save preferences",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="user" allowedRoles={["user"]}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </AuthGuard>
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
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-200 animate-in fade-in slide-in-from-left-4 duration-500">
                  {t("notificationsPage")}
                </h1>
                <p className="text-slate-400 text-sm animate-in fade-in slide-in-from-left-4 delay-100 duration-500">{t("manageNotificationSettings")}</p>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl group hover:scale-105 hover:rotate-12 transition-all duration-500 animate-pulse">
                <Bell className="w-8 h-8 text-white group-hover:animate-bounce" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Notification Channels Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-600/10 backdrop-blur-xl border border-blue-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("notificationChannels")}</span>
                  <Bell className="w-5 h-5 text-blue-400 group-hover:animate-bounce" />
                </CardTitle>
                <p className="text-slate-400 text-sm text-right">{t("chooseNotificationMethod")}</p>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-blue-500/30 duration-300 group/item">
                  <button
                    onClick={() => handleToggle('notifyEmail', notifyEmail, setNotifyEmail)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                      notifyEmail ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      notifyEmail ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-semibold">{t("email")}</div>
                      <div className="text-xs text-slate-400">{t("receiveEmailNotifications")}</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover/item:scale-105 transition-all duration-300 shrink-0">
                      <Mail className="w-5 h-5 text-blue-400 group-hover/item:rotate-12 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-cyan-500/30 duration-300 group/item">
                  <button
                    onClick={() => handleToggle('notifyPush', notifyPush, setNotifyPush)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                      notifyPush ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      notifyPush ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-semibold">{t("pushNotifications")}</div>
                      <div className="text-xs text-slate-400">{t("getInstantAlerts")}</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover/item:scale-105 transition-all duration-300 shrink-0">
                      <Bell className="w-5 h-5 text-cyan-400 group-hover/item:animate-bounce" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.02] hover:border-purple-500/30 duration-300 group/item">
                  <button
                    onClick={() => handleToggle('notifySMS', notifySMS, setNotifySMS)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                      notifySMS ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      notifySMS ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-semibold">{t("sms")}</div>
                      <div className="text-xs text-slate-400">{t("textMessageAlerts")}</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover/item:scale-105 transition-all duration-300 shrink-0">
                      <MessageSquare className="w-5 h-5 text-purple-400 group-hover/item:rotate-12 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Notifications Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/30 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("activityNotifications")}</span>
                  <Bell className="w-5 h-5 text-purple-400 group-hover:animate-bounce" />
                </CardTitle>
                <p className="text-slate-400 text-sm text-right">{t("chooseActivityNotifications")}</p>
              </CardHeader>
              <CardContent className="relative space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-purple-500/30 duration-300 group/item">
                  <button
                    onClick={() => handleToggle('notifyWorkout', notifyWorkout, setNotifyWorkout)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                      notifyWorkout ? "bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-purple-500/50" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      notifyWorkout ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-semibold">{t("workoutReminders")}</div>
                      <div className="text-xs text-slate-400">{t("dailyWorkoutNotifications")}</div>
                    </div>
                    <div className="text-2xl group-hover/item:scale-110 transition-transform duration-300 shrink-0">💪</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-pink-500/30 duration-300 group/item">
                  <button
                    onClick={() => handleToggle('notifyMeals', notifyMeals, setNotifyMeals)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                      notifyMeals ? "bg-gradient-to-r from-pink-500 to-rose-600 shadow-lg shadow-pink-500/50" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      notifyMeals ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-semibold">{t("mealPlans")}</div>
                      <div className="text-xs text-slate-400">{t("nutritionUpdates")}</div>
                    </div>
                    <div className="text-2xl group-hover/item:scale-110 transition-transform duration-300 shrink-0">🍽️</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-red-500/30 duration-300 group/item">
                  <button
                    onClick={() => handleToggle('notifyPhysio', notifyPhysio, setNotifyPhysio)}
                    className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
                      notifyPhysio ? "bg-gradient-to-r from-red-500 to-orange-600 shadow-lg shadow-red-500/50" : "bg-slate-700"
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
                      notifyPhysio ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-semibold">{t("physioSessions")}</div>
                      <div className="text-xs text-slate-400">{t("therapyAppointments")}</div>
                    </div>
                    <div className="text-2xl group-hover/item:scale-110 group-hover/item:animate-pulse transition-transform duration-300 shrink-0">❤️</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-green-600/10 backdrop-blur-xl border border-emerald-500/30 lg:col-span-2 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-green-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="relative pb-4">
                <CardTitle className="text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 justify-end">
                  <span>{t("activeNotifications")}</span>
                  <Check className="w-5 h-5 text-emerald-400 group-hover:scale-105 group-hover:rotate-12 transition-all duration-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.01] hover:border-emerald-500/30 transition-all duration-300 group/stat">
                    <div className="text-2xl font-bold text-white mb-1 group-hover/stat:scale-105 transition-transform duration-300">
                      {[notifyEmail, notifyPush, notifySMS].filter(Boolean).length}
                    </div>
                    <div className="text-sm text-slate-400">{t("activeChannels")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.01] hover:border-emerald-500/30 transition-all duration-300 group/stat">
                    <div className="text-2xl font-bold text-white mb-1 group-hover/stat:scale-105 transition-transform duration-300">
                      {[notifyWorkout, notifyMeals, notifyPhysio].filter(Boolean).length}
                    </div>
                    <div className="text-sm text-slate-400">{t("activeActivities")}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.01] hover:border-emerald-500/30 transition-all duration-300 group/stat">
                    <div className="text-2xl font-bold text-white mb-1 group-hover/stat:scale-105 transition-transform duration-300">
                      {[notifyEmail, notifyPush, notifySMS, notifyWorkout, notifyMeals, notifyPhysio].filter(Boolean).length}
                    </div>
                    <div className="text-sm text-slate-400">{t("totalActive")}</div>
                  </div>
                </div>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/30 duration-300 group/btn relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  <Check className="w-5 h-5 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                  {saving ? "Saving..." : t("savePreferences")}
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
        <BottomNav activeTab="notifications" />
      </div>
    </AuthGuard>
  )
}
