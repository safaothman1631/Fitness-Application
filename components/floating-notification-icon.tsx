"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingNotificationIcon() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-40 h-12 w-12 rounded-full bg-slate-800/95 backdrop-blur border-slate-700 hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5 text-cyan-400" />
      {/* Badge for notification count */}
      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-semibold">
        2
      </span>
    </Button>
  )
}
