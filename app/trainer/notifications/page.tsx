"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Trash2, CheckCircle2, AlertCircle, MessageSquare, Dumbbell, Bell } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "message" | "workout" | "alert"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

export default function TrainerNotifications() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [userId, setUserId] = useState<string | null>(null)

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
            await fetchNotifications(uid)
          }
        } catch (error) {
          console.error('Error fetching data:', error)
          toast.error('Failed to load notifications')
        } finally {
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchNotifications = async (uid: string) => {
    try {
      const response = await fetch(`/api/notifications?userId=${uid}`)
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      })
      if (response.ok) {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
        toast.success('Notification marked as read')
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
      toast.error('Failed to update notification')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setNotifications(notifications.filter((n) => n.id !== id))
        toast.success('Notification deleted')
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('Failed to delete notification')
    }
  }

  const handleMarkAllRead = async () => {
    if (!userId) return
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      if (response.ok) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })))
        toast.success('All notifications marked as read')
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
      toast.error('Failed to update notifications')
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-5 h-5 text-blue-400" />
      case "workout":
        return <Dumbbell className="w-5 h-5 text-green-400" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return <MessageSquare className="w-5 h-5 text-gray-400" />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{t("notifications")}</h1>
                <p className="text-gray-400 text-sm">{t("traineeMessagesReminders")}</p>
              </div>
            </div>
            {notifications.filter(n => !n.isRead).length > 0 && (
              <Button 
                onClick={handleMarkAllRead} 
                variant="outline" 
                className="border-rose-500/50 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500 transition-colors"
              >
                {t("markAllAsRead")}
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("totalNotifications")}</p>
                    <p className="text-3xl font-bold text-white">{notifications.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("unread")}</p>
                    <p className="text-3xl font-bold text-yellow-400">{notifications.filter((n) => !n.isRead).length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("read")}</p>
                    <p className="text-3xl font-bold text-green-400">{notifications.filter((n) => n.isRead).length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">{t("recentNotifications")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`rounded-xl p-4 flex items-start gap-4 transition-all ${
                        notif.isRead 
                          ? "bg-slate-800/30 border border-slate-700/50" 
                          : "bg-slate-800/60 border border-rose-500/30 shadow-lg shadow-rose-500/10"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{notif.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{notif.message}</p>
                        <p className="text-gray-500 text-xs mt-2">{notif.timestamp}</p>
                      </div>

                      <div className="flex gap-2 flex-shrink-0">
                        {!notif.isRead && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-green-400 hover:bg-green-500/10"
                            onClick={() => handleMarkAsRead(notif.id)}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10" 
                          onClick={() => handleDelete(notif.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">{t("noNotifications")}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
