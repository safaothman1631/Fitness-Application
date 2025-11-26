"use client"

import { useState, useEffect } from "react"
import AuthGuard from "@/components/auth-guard"    <FitproLayout role="user">
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
