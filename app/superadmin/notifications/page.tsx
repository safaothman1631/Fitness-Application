"use client"

import { useState } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Trash2, CheckCircle2, AlertCircle, Shield, Activity, Info, XCircle, Eye, Filter } from "lucide-react"
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
                <h1 className="text-3xl font-bold text-white">Notifications</h1>
                <p className="text-gray-400 text-sm">Stay updated with system alerts</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark All Read
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
                    <p className="text-xs text-gray-400">Total</p>
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
                    <p className="text-xs text-gray-400">Unread</p>
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
                    <p className="text-xs text-gray-400">Read</p>
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
                    <p className="text-xs text-gray-400">Security</p>
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
                All Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notif) => {
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
                                New
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
                  })
                ) : (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No notifications</p>
                    <p className="text-gray-500 text-sm">You're all caught up!</p>
                  </div>
                )}              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>  )
}
