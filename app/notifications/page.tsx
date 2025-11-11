"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import { Bell, Trash2, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Workout Complete",
      message: "You've finished your Full Body workout! Great effort! 🎉",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Reminder: Evening Workout",
      message: "Time to start your evening yoga session",
      timestamp: "30 minutes ago",
      read: false,
    },
    {
      id: "3",
      type: "success",
      title: "Achievement Unlocked",
      message: "You've reached 100 workout sessions! 🌟",
      timestamp: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "info",
      title: "New Workout Available",
      message: "Check out our new HIIT training program",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "warning",
      title: "Membership Expiring Soon",
      message: "Your Premium membership expires in 7 days",
      timestamp: "3 days ago",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
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
          <Button variant="outline" className="border-slate-700/50 text-gray-400 hover:text-white rounded-xl">
            Mark all as read
          </Button>
          <Button variant="outline" className="border-slate-700/50 text-gray-400 hover:text-red-400 rounded-xl">
            Clear all
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
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
                          {notification.timestamp}
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
  )
}
