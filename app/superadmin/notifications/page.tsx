"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import { Trash2, CheckCircle2, AlertCircle, Shield, Activity } from "lucide-react"

interface Notification {
  id: string
  type: "alert" | "activity" | "security"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

export default function SuperAdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "security",
      title: "Failed Login Attempt",
      message: "3 failed login attempts from IP 192.168.1.100",
      timestamp: "2024-11-09 14:20",
      isRead: false,
    },
    {
      id: "2",
      type: "activity",
      title: "New Admin Created",
      message: "User 'john@example.com' was promoted to Admin",
      timestamp: "2024-11-09 10:15",
      isRead: false,
    },
    {
      id: "3",
      type: "alert",
      title: "High Server Load",
      message: "CPU usage is at 85% - monitor performance",
      timestamp: "2024-11-08 16:45",
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

  return (
    <FitproLayout role="superadmin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Notifications</h1>
          <p className="text-gray-400">Security alerts, system activity, and important updates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Alerts</p>
                  <p className="text-3xl font-bold text-white">{notifications.length}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Unread</p>
                  <p className="text-3xl font-bold text-red-500">{notifications.filter((n) => !n.isRead).length}</p>
                </div>
                <Shield className="w-10 h-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Read</p>
                  <p className="text-3xl font-bold text-green-500">{notifications.filter((n) => n.isRead).length}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white">Recent System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`rounded-lg p-4 flex items-start gap-4 ${
                      notif.isRead ? "bg-slate-800/30 border border-slate-700" : "bg-slate-800/50 border-l-4 border-l-red-500 border border-slate-600"
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
                          className="text-gray-400 hover:text-green-400"
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400" onClick={() => handleDelete(notif.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">No alerts</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
