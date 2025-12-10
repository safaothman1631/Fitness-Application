"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import { Trash2, CheckCircle2, AlertCircle, Zap, Award } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "achievement" | "reminder" | "alert"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

export default function UserNotifications() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [achievementCount, setAchievementCount] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user from database to get userId
          const userResponse = await fetch(`/api/users?email=${user.email}`)
          if (userResponse.ok) {
            const users = await userResponse.json()
            const currentUser = users.find((u: any) => u.email === user.email)
            const uid = currentUser?.id || currentUser?.uid || user.uid
            setUserId(uid)

            // Fetch notifications
            await fetchNotifications(uid)
            
            // Fetch achievement count
            const achievementsResponse = await fetch(`/api/user-achievements?userId=${uid}`)
            if (achievementsResponse.ok) {
              const achievements = await achievementsResponse.json()
              setAchievementCount(achievements.length || 0)
            }
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
      case "achievement":
        return <Award className="w-5 h-5 text-yellow-400" />
      case "reminder":
        return <Zap className="w-5 h-5 text-blue-400" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-green-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <FitproLayout role="user">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading notifications...</p>
          </div>
        </div>
      </FitproLayout>
    )
  }

  return (
    <FitproLayout role="user">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
            <p className="text-gray-400">Stay updated with your fitness journey</p>
          </div>
          {notifications.filter(n => !n.isRead).length > 0 && (
            <Button onClick={handleMarkAllRead} variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
              Mark All as Read
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fitpro-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Notifications</p>
                  <p className="text-3xl font-bold text-white transition-all duration-300 group-hover:scale-110">{notifications.length}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-blue-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Unread</p>
                  <p className="text-3xl font-bold text-yellow-500 transition-all duration-300 group-hover:scale-110">{notifications.filter((n) => !n.isRead).length}</p>
                </div>
                <Zap className="w-10 h-10 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Achievements</p>
                  <p className="text-3xl font-bold text-green-500 transition-all duration-300 group-hover:scale-110">{achievementCount}</p>
                </div>
                <Award className="w-10 h-10 text-green-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`rounded-lg p-4 flex items-start gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] group ${
                      notif.isRead ? "bg-slate-800/30 border border-slate-700" : "bg-slate-800/50 border border-slate-600"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">{getIcon(notif.type)}</div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-blue-400">{notif.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{notif.message}</p>
                      <p className="text-gray-500 text-xs mt-2">{notif.timestamp}</p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      {!notif.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" onClick={() => handleDelete(notif.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">No notifications</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
