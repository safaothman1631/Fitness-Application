"use client"

import { useState, useEffect } from "react"
<<<<<<< HEAD
import AuthGuard from "@/components/auth-guard"
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import { Bell, Trash2, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Notification {
  id: string
  userId: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Helper function to format timestamp
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "Just now"
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  return date.toLocaleDateString()
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  // Get user ID from localStorage
  const getUserId = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId") || ""
    }
    return ""
  }

  // Fetch notifications from database
  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = getUserId()
      if (!userId) {
        setLoading(false)
        toast.error("Please log in to view notifications")
        return
      }

      try {
        const response = await dbService.getNotifications(userId)
        if (response.notifications) {
          setNotifications(response.notifications)
        }
      } catch (error) {
        console.error("Error fetching notifications:", error)
        toast.error("Failed to load notifications")
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await dbService.markNotificationAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      toast.success("Marked as read")
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast.error("Failed to update notification")
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.read)
      await Promise.all(unreadNotifications.map((n) => dbService.markNotificationAsRead(n.id)))
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      toast.success("All notifications marked as read")
    } catch (error) {
      console.error("Error marking all as read:", error)
      toast.error("Failed to update notifications")
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      await dbService.deleteNotification(id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      toast.success("Notification deleted")
    } catch (error) {
      console.error("Error deleting notification:", error)
      toast.error("Failed to delete notification")
    }
  }

  const clearAll = async () => {
    try {
      await Promise.all(notifications.map((n) => dbService.deleteNotification(n.id)))
      setNotifications([])
      toast.success("All notifications cleared")
    } catch (error) {
      console.error("Error clearing notifications:", error)
      toast.error("Failed to clear notifications")
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBackground = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/10 border-green-500/20"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20"
      default:
        return "bg-blue-500/10 border-blue-500/20"
    }
  }

  return (
<<<<<<< HEAD
    <AuthGuard requiredRole="user">
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    <FitproLayout role="user">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <Bell className="w-8 h-8 text-blue-500" />
            Notifications
          </h1>
          <p className="text-gray-400">Stay updated with your fitness activity</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-slate-700/50 text-gray-400 hover:text-white rounded-xl"
            onClick={markAllAsRead}
            disabled={loading || notifications.length === 0 || notifications.every(n => n.read)}
          >
            Mark all as read
          </Button>
          <Button 
            variant="outline" 
            className="border-slate-700/50 text-gray-400 hover:text-red-400 rounded-xl"
            onClick={clearAll}
            disabled={loading || notifications.length === 0}
          >
            Clear all
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {loading ? (
            <Card className="fitpro-card text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading notifications...</p>
            </Card>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border ${getBackground(notification.type)} ${!notification.read ? "bg-slate-800/50" : "bg-slate-800/30"} cursor-pointer hover:border-blue-500/30 transition-all`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold ${!notification.read ? "text-white" : "text-gray-300"}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>}
                      </div>

                      <p className="text-gray-400 text-sm mb-3">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatTimestamp(notification.timestamp)}
                        </span>

                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button
                              onClick={() => markAsRead(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="text-blue-400 hover:text-blue-300 text-xs"
                            >
                              Mark as read
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="fitpro-card text-center p-8">
              <Bell className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No notifications yet</p>
            </Card>
          )}
        </div>
      </div>
    </FitproLayout>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  )
}
