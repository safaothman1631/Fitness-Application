"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function FloatingNotificationButton() {
  const { language } = useLanguage()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [unreadCount] = useState(2)
  
  // Check if RTL language
  const isRTL = language === "ar" || language === "ku"
  const positionClass = isRTL ? "left-20" : "right-20"

  const notifications = [
    {
      id: 1,
      title: "Workout Reminder",
      message: "Don't forget your leg day workout!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Achievement Unlocked",
      message: "You've completed 7 day streak!",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "New Meal Plan",
      message: "Your nutritionist updated your meal plan",
      time: "2 days ago",
      read: true,
    },
  ]

  return (
    <>
      <button
        onClick={() => setNotificationOpen(true)}
        className={`fixed top-4 ${positionClass} z-40 p-3 rounded-xl bg-[#101A23] border border-[#2E3944] hover:border-[#47D8FF]/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(16,178,227,0.3)] group`}
      >
        <Bell className="w-6 h-6 text-[#10B2E3] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#F43F5E] to-[#EF4444] rounded-full text-white text-xs flex items-center justify-center font-bold animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]">
            {unreadCount}
          </span>
        )}
      </button>

      <Dialog open={notificationOpen} onOpenChange={setNotificationOpen}>
        <DialogContent className="bg-[#0E151B] border-[#2E3944] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#10B2E3]">Notifications</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                    notification.read
                      ? "bg-[#101A23]/50 border-[#2E3944]"
                      : "bg-[#101A23] border-[#47D8FF]/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white">{notification.title}</h4>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-[#10B2E3] rounded-full"></span>
                    )}
                  </div>
                  <p className="text-[#B6C4CF] text-sm mb-2">{notification.message}</p>
                  <span className="text-[#73E8FF] text-xs">{notification.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
