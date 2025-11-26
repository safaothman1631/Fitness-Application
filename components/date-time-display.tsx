"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Calendar, Clock } from "lucide-react"

interface DateTimeDisplayProps {
  isFemale?: boolean
  themeColors: {
    gradient: string
    primary: string
    secondary: string
    accent: string
    border: string
    shadow: string
  }
}

export function DateTimeDisplay({ isFemale, themeColors }: DateTimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayName = dayNames[currentTime.getDay()]
  const day = currentTime.getDate()
  const month = currentTime.getMonth() + 1
  const year = currentTime.getFullYear()
  const monthName = monthNames[currentTime.getMonth()]

  const hours = currentTime.getHours().toString().padStart(2, "0")
  const minutes = currentTime.getMinutes().toString().padStart(2, "0")
  const seconds = currentTime.getSeconds().toString().padStart(2, "0")

  return (
    <Card
      className={cn(
        "p-6 border backdrop-blur-xl transition-all",
        isFemale
          ? `bg-gradient-to-br from-rose-500/10 to-purple-500/10 border-${themeColors.border}`
          : "bg-black/40 border-white/20",
      )}
    >
      <div className="flex items-center justify-between gap-6">
        {/* Date Section */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
              isFemale
                ? "from-rose-500 to-purple-500 shadow-rose-500/30"
                : "from-primary to-secondary shadow-primary/30",
            )}
          >
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <div>
            <div
              className={cn(
                "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                isFemale ? "from-rose-500 to-purple-500" : "from-primary to-secondary",
              )}
            >
              {dayName}
            </div>
            <div className={cn("text-sm", isFemale ? "text-muted-foreground" : "text-gray-300")}>
              {day} {monthName} {year}
            </div>
            <div className={cn("text-xs font-mono", isFemale ? "text-muted-foreground/70" : "text-gray-400")}>
              {day.toString().padStart(2, "0")}.{month.toString().padStart(2, "0")}.{year}
            </div>
          </div>
        </div>

        {/* Clock Section */}
        <div className="flex items-center gap-4">
          <div>
            <div
              className={cn(
                "text-5xl font-bold font-mono bg-gradient-to-r bg-clip-text text-transparent tabular-nums",
                isFemale ? "from-purple-500 via-pink-500 to-rose-500" : "from-secondary via-accent to-primary",
              )}
            >
              {hours}:{minutes}
              <span className="text-3xl">:{seconds}</span>
            </div>
            <div className={cn("text-xs text-center mt-1", isFemale ? "text-muted-foreground" : "text-gray-400")}>
              24 Hour Format
            </div>
          </div>
          <div
            className={cn(
              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg animate-pulse",
              isFemale ? "from-pink-500 to-rose-500 shadow-pink-500/30" : "from-accent to-primary shadow-accent/30",
            )}
          >
            <Clock className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>
    </Card>
  )
}
