"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, Check, Trash2, Filter, RefreshCw } from "lucide-react"
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: any
  category?: string
}

export default function AdminPhysiotherapistNotificationsPage() {
  const { t } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const userId = auth.currentUser?.uid
      if (!userId) return

      // Fetch real notifications from database (without requiring index)
      const notificationsQuery = query(
        collection(db, "notifications"),
        where("userId", "==", userId)
      )
      
      const snapshot = await getDocs(notificationsQuery)
      const fetchedNotifications: Notification[] = []
      
      snapshot.forEach((doc) => {
        fetchedNotifications.push({
          id: doc.id,
          ...doc.data()
        } as Notification)
      })

      // Sort by createdAt in memory (descending)
      fetchedNotifications.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
        return dateB.getTime() - dateA.getTime()
      })

      // If no notifications exist, show welcome message
      if (fetchedNotifications.length === 0) {
        fetchedNotifications.push({
          id: "welcome",
          title: t("welcome") || "Welcome!",
          message: t("welcomeMessage") || "Welcome to your notification center. You'll receive updates here.",
          type: "info",
          read: false,
          createdAt: new Date(),
          category: "system"
        })
      }

      setNotifications(fetchedNotifications)
    } catch (error) {
      console.error("Error fetching notifications:", error)
      toast.error("Failed to load notifications")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      if (id === "welcome") {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
        return
      }
      
      await updateDoc(doc(db, "notifications", id), {
        read: true,
        readAt: new Date()
      })
      
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      )
      toast.success("Marked as read")
    } catch (error) {
      console.error("Error marking as read:", error)
      toast.error("Failed to mark as read")
    }
  }

  const markAllAsRead = async () => {
    try {
      const batch = notifications.filter(n => !n.read && n.id !== "welcome")
      
      for (const notification of batch) {
        await updateDoc(doc(db, "notifications", notification.id), {
          read: true,
          readAt: new Date()
        })
      }
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      toast.success("All notifications marked as read")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to mark all as read")
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      if (id !== "welcome") {
        await deleteDoc(doc(db, "notifications", id))
      }
      
      setNotifications(prev => prev.filter(n => n.id !== id))
      toast.success("Notification deleted")
    } catch (error) {
      console.error("Error deleting:", error)
      toast.error("Failed to delete")
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
    }
  }

  const formatDate = (date: any) => {
    if (!date) return ""
    const d = date.toDate ? date.toDate() : new Date(date)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes} ${t("minutesAgo") || "minutes ago"}`
    if (hours < 24) return `${hours} ${t("hoursAgo") || "hours ago"}`
    if (days < 7) return `${days} ${t("daysAgo") || "days ago"}`
    return d.toLocaleDateString()
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.read
    if (filter === "read") return n.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                      <Bell className="w-8 h-8 text-white" />
                    </div>
                    {unreadCount > 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                        {unreadCount}
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {t("notifications")}
                    </h1>
                    <p className="text-purple-400 mt-1 font-medium">
                      {unreadCount > 0 
                        ? `${unreadCount} ${t("unreadNotifications") || "unread notifications"}`
                        : t("allCaughtUp") || "You're all caught up!"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={fetchNotifications}
                    variant="outline"
                    className="border-white/10"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t("refresh")}
                  </Button>
                  {unreadCount > 0 && (
                    <Button
                      onClick={markAllAsRead}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {t("markAllRead")}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
            >
              {t("all")} ({notifications.length})
            </Button>
            <Button
              onClick={() => setFilter("unread")}
              variant={filter === "unread" ? "default" : "outline"}
              className={filter === "unread" ? "bg-yellow-500" : ""}
            >
              {t("unread")} ({unreadCount})
            </Button>
            <Button
              onClick={() => setFilter("read")}
              variant={filter === "read" ? "default" : "outline"}
              className={filter === "read" ? "bg-green-500" : ""}
            >
              {t("read")} ({notifications.length - unreadCount})
            </Button>
          </div>

          {/* Notifications List */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardContent className="p-12 text-center">
                <BellOff className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">{t("noNotifications") || "No notifications"}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`border-white/10 backdrop-blur-xl transition-all hover:bg-slate-800/50 ${
                    notification.read 
                      ? "bg-slate-900/30" 
                      : "bg-slate-900/50 border-purple-500/20"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Unread Indicator */}
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 animate-pulse" />
                      )}
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className={`font-semibold ${notification.read ? "text-slate-400" : "text-white"}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">{notification.message}</p>
                          </div>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs text-slate-500">
                            {formatDate(notification.createdAt)}
                          </span>
                          
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => markAsRead(notification.id)}
                                className="border-white/10 text-slate-400 hover:text-white"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteNotification(notification.id)}
                              className="border-white/10 text-red-400 hover:text-red-300 hover:border-red-500/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
