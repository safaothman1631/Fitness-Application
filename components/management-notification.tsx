"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ManagementMessage {
  id: string | number
  message: string
  type?: "info" | "warning" | "success" | "error"
  isActive?: boolean
}

interface ManagementNotificationProps {
  isFemale?: boolean
}

export function ManagementNotification({ isFemale = false }: ManagementNotificationProps) {
  const [messages, setMessages] = useState<ManagementMessage[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = localStorage.getItem("managementMessages")
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages)
        const activeMessages = parsedMessages.filter((msg: ManagementMessage) => msg.isActive !== false)
        setMessages(activeMessages)
      } catch (error) {
        console.error("Error parsing management messages:", error)
      }
    } else {
      // Default messages
      setMessages([
        {
        id: 1,
        message: "Welcome! New exercise programs have been added.",
        type: "info",
        isActive: true,
        },
      ])
    }
  }, [])

  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
      }, 5000) // Change message every 5 seconds
      return () => clearInterval(interval)
    }
  }, [messages.length])

  if (!isVisible || messages.length === 0) return null

  const currentMessage = messages[currentMessageIndex]
  const messageType = currentMessage?.type || "info"

  const typeConfig = {
    info: {
      icon: Info,
      bgColor: isFemale ? "bg-blue-500/10" : "bg-blue-600/10",
      borderColor: isFemale ? "border-blue-500/30" : "border-blue-600/30",
      textColor: isFemale ? "text-blue-400" : "text-blue-300",
      iconColor: isFemale ? "text-blue-500" : "text-blue-400",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      iconColor: "text-yellow-500",
    },
    success: {
      icon: CheckCircle,
      bgColor: isFemale ? "bg-green-500/10" : "bg-green-600/10",
      borderColor: isFemale ? "border-green-500/30" : "border-green-600/30",
      textColor: isFemale ? "text-green-400" : "text-green-300",
      iconColor: isFemale ? "text-green-500" : "text-green-400",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      textColor: "text-red-400",
      iconColor: "text-red-500",
    },
  }

  const config = typeConfig[messageType]
  const Icon = config.icon

  return (
    <div className="sticky top-0 z-40">
      <div
        className={cn(
          "backdrop-blur-xl border-b transition-all duration-300",
          isFemale ? "bg-pink-500/5 border-pink-500/20" : "bg-blue-600/5 border-blue-600/20",
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
          <h2 className={cn("text-sm md:text-base font-semibold", isFemale ? "text-pink-400" : "text-blue-400")}>
            Management Messages
          </h2>
        </div>
      </div>

      <div className={cn("backdrop-blur-xl border-b transition-all duration-300", config.bgColor, config.borderColor)}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 py-2.5 md:py-3">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <Icon className={cn("w-4 h-4 md:w-5 md:h-5 flex-shrink-0", config.iconColor)} />
              <p className={cn("text-xs md:text-sm font-medium truncate", config.textColor)}>
                {currentMessage?.message}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {messages.length > 1 && (
                <div className="flex gap-1">
                  {messages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMessageIndex(index)}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        currentMessageIndex === index
                          ? cn("w-4", config.iconColor.replace("text-", "bg-"))
                          : "bg-white/30 hover:bg-white/50",
                      )}
                      aria-label={`Go to message ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsVisible(false)}
                className={cn("p-1 rounded hover:bg-white/10 transition-colors", config.textColor)}
                aria-label="Close notification"
              >
                <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
