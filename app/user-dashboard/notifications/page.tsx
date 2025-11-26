"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import { Trash2, CheckCircle2, AlertCircle, Zap, Award } from "lucide-react"

interface Notification {
  id: string
  type: "achievement" | "reminder" | "alert"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

export default function UserNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Milestone Reached",
      message: "You've completed 20 workouts! Keep up the great work!",
      timestamp: "2024-11-09 15:30",
      isRead: false,
    },
    {
      id: "2",
      type: "reminder",
      title: "Workout Reminder",
      message: "Don't forget to complete your evening workout",
      timestamp: "2024-11-09 18:00",
      isRead: false,
    },
    {
      id: "3",
      type: "alert",
      title: "Progress Update",
      message: "You've lost 2kg this month. Great progress!",
      timestamp: "2024-11-08 10:00",
      isRead: true,
    },
  ])

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
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

  return (
    <FitproLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">Stay updated with your fitness journey</p>
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
                  <p className="text-3xl font-bold text-green-500 transition-all duration-300 group-hover:scale-110">12</p>
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
