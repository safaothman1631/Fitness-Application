"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Trash2, CheckCircle2, AlertCircle, Shield, Activity, Info, XCircle, Eye, Filter } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface Notification {
  id: string
  type: "alert" | "activity" | "security"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

export default function SuperAdminNotifications() {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        await fetchNotifications(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchNotifications = async (uid: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/notifications?userId=${uid}`)
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
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
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setNotifications(notifications.filter((n) => n.id !== id))
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
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
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="w-5 h-5 text-red-400" />
      case "activity":
        return <Activity className="w-5 h-5 text-blue-400" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="superadmin">
        <SidebarSleek role="superadmin">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
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
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{t("notificationsPage")}</h1>
                <p className="text-gray-400 text-sm">{t("stayUpdated")}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                <Filter className="w-4 h-4 mr-2" />
                {t("filterByType")}
              </Button>
              <Button 
                onClick={handleMarkAllRead}
                variant="outline" 
                className="border-slate-700 text-gray-300 hover:bg-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t("markAllRead")}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{notifications.length}</p>
                    <p className="text-xs text-gray-400">{t("total")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{notifications.filter((n) => !n.isRead).length}</p>
                    <p className="text-xs text-gray-400">{t("unreadNotifications")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{notifications.filter((n) => n.isRead).length}</p>
                    <p className="text-xs text-gray-400">{t("read")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{notifications.filter((n) => n.type === 'security').length}</p>
                    <p className="text-xs text-gray-400">{t("securitySettings")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  {t("allNotifications")}
                </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No notifications</p>
                  <p className="text-gray-500 text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => {
                    const typeColors = {
                      security: { bg: "from-red-500/10 to-red-600/10", border: "border-red-500/30", icon: "text-red-400" },
                      activity: { bg: "from-blue-500/10 to-blue-600/10", border: "border-blue-500/30", icon: "text-blue-400" },
                      alert: { bg: "from-yellow-500/10 to-yellow-600/10", border: "border-yellow-500/30", icon: "text-yellow-400" },
                    }
                    const colors = typeColors[notif.type]
                    
                    return (
                      <div
                        key={notif.id}
                        className={`rounded-xl p-4 flex items-start gap-4 border transition-all hover:scale-[1.01] ${
                          notif.isRead 
                            ? "bg-slate-800/30 border-slate-700" 
                            : `bg-gradient-to-r ${colors.bg} ${colors.border} shadow-lg`
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          notif.type === 'security' ? 'bg-red-500/20' :
                          notif.type === 'activity' ? 'bg-blue-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          {getIcon(notif.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-white">{notif.title}</h3>
                            {!notif.isRead && (
                              <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold whitespace-nowrap">
                                {t("new")}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{notif.message}</p>
                          <p className="text-gray-500 text-xs">{notif.timestamp}</p>
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {!notif.isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                              onClick={() => handleMarkAsRead(notif.id)}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                            onClick={() => handleDelete(notif.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>  )
}
