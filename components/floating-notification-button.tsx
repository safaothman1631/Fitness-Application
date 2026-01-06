"use client"

import { useState, useEffect } from "react"
import { Bell, Trash2, CheckCheck, X } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  type: string
  link?: string
}

export function FloatingNotificationButton() {
  const pathname = usePathname()
  const { t, language } = useLanguage()
  const [userId, setUserId] = useState<string | null>(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  
  // Check if RTL language
  const isRTL = language === "ar" || language === "ku"
  const positionClass = isRTL ? "left-20" : "right-20"

  // Get userId from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId')
      setUserId(storedUserId)
    }
  }, [])
  
  // Hide on login and register pages
  const hideOnPages = ['/login', '/register', '/giris', '/kayit']
  if (hideOnPages.some(page => pathname?.startsWith(page))) {
    return null
  }

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!userId) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/notifications?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications || [])
        const unread = (data.notifications || []).filter((n: Notification) => !n.read).length
        setUnreadCount(unread)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!userId) return
    
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId, read: true, userId })
      })
      
      if (response.ok) {
        const data = await response.json()
        // Update local state
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        )
        if (data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount)
        }
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    if (!userId) return
    
    try {
      const response = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAllAsRead: true, userId })
      })
      
      if (response.ok) {
        const data = await response.json()
        // Update local state
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        setUnreadCount(0)
        toast.success(t("allMarkedAsRead") || "All notifications marked as read")
      }
    } catch (error) {
      console.error("Error marking all as read:", error)
      toast.error(t("errorOccurred") || "An error occurred")
    }
  }

  // Delete notification
  const deleteNotification = async (notificationId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (!userId) return
    
    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId, userId })
      })
      
      if (response.ok) {
        const data = await response.json()
        // Update local state
        setNotifications(prev => prev.filter(n => n.id !== notificationId))
        if (data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount)
        }
        toast.success(t("notificationDeleted") || "Notification deleted")
      }
    } catch (error) {
      console.error("Error deleting notification:", error)
      toast.error(t("errorOccurred") || "An error occurred")
    }
  }

  // Delete all notifications
  const deleteAllNotifications = async () => {
    if (!userId) return
    
    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleteAll: true, userId })
      })
      
      if (response.ok) {
        const data = await response.json()
        setNotifications([])
        setUnreadCount(0)
        toast.success(t("allNotificationsDeleted") || "All notifications deleted")
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error)
      toast.error(t("errorOccurred") || "An error occurred")
    }
  }

  // Fetch on mount and when dialog opens
  useEffect(() => {
    if (userId) {
      fetchNotifications()
    }
  }, [userId])

  useEffect(() => {
    if (notificationOpen && userId) {
      fetchNotifications()
    }
  }, [notificationOpen])

  // Format time ago
  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000)
    
    if (diff < 60) return t("justNow")
    if (diff < 3600) return `${Math.floor(diff / 60)} ${t("minutesAgo")}`
    if (diff < 86400) return `${Math.floor(diff / 3600)} ${t("hoursAgo")}`
    return `${Math.floor(diff / 86400)} ${t("daysAgo")}`
  }

  return (
    <>
      <button
        onClick={() => setNotificationOpen(true)}
        className={`fixed top-4 ${positionClass} z-40 p-3 rounded-xl bg-[#101A23]/30 backdrop-blur-sm border border-[#2E3944]/50 hover:border-[#47D8FF]/50 transition-all duration-300 hover:bg-[#101A23] hover:shadow-[0_0_20px_rgba(16,178,227,0.3)] group opacity-60 hover:opacity-100`}
      >
        <Bell className="w-6 h-6 text-[#10B2E3] transition-all duration-300 group-hover:rotate-12" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#F43F5E] to-[#EF4444] rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent className="bg-[#0E151B] border-[#2E3944] text-white max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-[#10B2E3]">{t("notifications")}</DialogTitle>
              {notifications.length > 0 && (
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={markAllAsRead}
                      className="text-[#73E8FF] hover:text-[#10B2E3] hover:bg-[#101A23]"
                    >
                      <CheckCheck className="w-4 h-4 mr-1" />
                      {t("markAllRead")}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={deleteAllNotifications}
                    className="text-[#F43F5E] hover:text-[#EF4444] hover:bg-[#101A23]"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {t("deleteAll")}
                  </Button>
                </div>
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B2E3]"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-[#B6C4CF]">
                <Bell className="w-12 h-12 mb-3 opacity-30" />
                <p>{t("noNotifications")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer relative group ${
                      notification.read
                        ? "bg-[#101A23]/50 border-[#2E3944]"
                        : "bg-[#101A23] border-[#47D8FF]/30"
                    }`}
                  >
                    <button
                      onClick={(e) => deleteNotification(notification.id, e)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#0E151B]/80 text-[#F43F5E] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F43F5E] hover:text-white"
                      title={t("deleteNotification")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-start justify-between mb-2 pr-8">
                      <h4 className="font-semibold text-white">{notification.title}</h4>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-[#10B2E3] rounded-full flex-shrink-0 ml-2"></span>
                      )}
                    </div>
                    <p className="text-[#B6C4CF] text-sm mb-2">{notification.message}</p>
                    <span className="text-[#73E8FF] text-xs">{getTimeAgo(notification.timestamp)}</span>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
