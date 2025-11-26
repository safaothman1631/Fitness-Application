"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface FloatingMenuItem {
  id: string
  icon: LucideIcon
  label: string
}

interface FloatingMenuProps {
  items: FloatingMenuItem[]
  activeSection: string
  onSectionChange: (section: string) => void
  themeColors: {
    gradient: string
    primary: string
    buttonGradient: string
    shadow: string
  }
  isFemale?: boolean
}

export function FloatingMenu({ items, activeSection, onSectionChange, themeColors, isFemale }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleItemClick = (id: string) => {
    onSectionChange(id)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <div
        className={cn(
          "absolute bottom-20 right-0 flex flex-col gap-3 transition-all duration-300 origin-bottom-right",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none",
        )}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300 hover:scale-105 group",
              activeSection === item.id
                ? cn(
                    "bg-gradient-to-r border-white/30",
                    isFemale ? "from-rose-500 via-purple-500 to-pink-500" : "from-primary via-secondary to-accent",
                  )
                : "bg-background/90 border-border/50 hover:border-border",
            )}
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
            }}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                activeSection === item.id
                  ? "bg-white/20"
                  : cn(
                      "bg-gradient-to-br",
                      isFemale ? "from-rose-500/20 to-purple-500/20" : "from-primary/20 to-secondary/20",
                    ),
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  activeSection === item.id ? "text-white" : "text-foreground",
                )}
              />
            </div>
            <span
              className={cn(
                "font-semibold whitespace-nowrap transition-colors",
                activeSection === item.id ? "text-white" : "text-foreground",
              )}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Toggle Button */}
      <Button
        onClick={toggleMenu}
        size="lg"
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-2",
          isOpen ? "rotate-90 border-white/30" : "border-transparent",
          cn("bg-gradient-to-br", themeColors.buttonGradient, `shadow-${themeColors.shadow}`),
        )}
      >
        {isOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
      </Button>
    </div>
  )
}
