"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutGrid, Dumbbell, Apple, HeartPulse, User } from "lucide-react"
import { checkSubscriptionStatus, getSubscriptionExpiry } from "@/lib/subscription"

const allTabs = [
  { key: "Dashboard", href: "/dashboard", icon: LayoutGrid, color: "#10B2E3", requiresPremium: false },
  { key: "Workout", href: "/workout", icon: Dumbbell, color: "#9333EA", requiresPremium: true },
  { key: "Meals", href: "/meals", icon: Apple, color: "#F59E0B", requiresPremium: true },
  { key: "Physio", href: "/physio", icon: HeartPulse, color: "#F43F5E", requiresPremium: true },
  { key: "Profile", href: "/profile", icon: User, color: "#6366F1", requiresPremium: false },
]

export default function AppBottomNav() {
  const pathname = usePathname()
  const [hasAccess, setHasAccess] = useState(true)
  
  useEffect(() => {
    const updateAccess = () => {
      const expiry = getSubscriptionExpiry()
      const status = checkSubscriptionStatus(expiry)
      setHasAccess(status.isActive)
    }

    updateAccess()

    // Listen for storage changes
    window.addEventListener('storage', updateAccess)
    return () => window.removeEventListener('storage', updateAccess)
  }, [])

  // Filter tabs based on subscription
  const tabs = allTabs.filter(tab => !tab.requiresPremium || hasAccess)
  
  // Find active tab index for sliding indicator
  const activeIndex = tabs.findIndex(t => pathname.startsWith(t.href))
  const activeTab = activeIndex >= 0 ? tabs[activeIndex] : null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50">
      <div className="mx-auto max-w-md relative">
        {/* Animated sliding indicator */}
        {activeTab && (
          <div
            className="absolute top-0 h-0.5 transition-all duration-500 ease-out"
            style={{
              left: `${(activeIndex / tabs.length) * 100}%`,
              width: `${100 / tabs.length}%`,
              background: `linear-gradient(90deg, transparent, ${activeTab.color}, transparent)`,
              boxShadow: `0 0 12px ${activeTab.color}80`
            }}
          />
        )}
        
        <div className="grid grid-cols-5">
          {tabs.map((t, i) => {
            const active = pathname.startsWith(t.href)
            return (
              <Link
                key={t.key}
                href={t.href}
                className="relative flex flex-col items-center justify-center py-3 text-xs group transition-all duration-300"
              >
                {/* Glow effect on active */}
                {active && (
                  <div 
                    className="absolute inset-0 opacity-10 blur-xl transition-opacity duration-500"
                    style={{ backgroundColor: t.color }}
                  />
                )}
                
                {/* Icon container with scale and glow */}
                <div
                  className={`relative p-2.5 rounded-xl transition-all duration-500 ease-out mb-1 ${
                    active 
                      ? "scale-110 animate-in zoom-in-95 fade-in-0" 
                      : "group-hover:scale-110 group-hover:rotate-6 group-active:rotate-0 group-active:scale-95"
                  }`}
                  style={{
                    backgroundColor: active ? `${t.color}20` : "transparent",
                    boxShadow: active ? `0 0 20px ${t.color}40, 0 4px 12px ${t.color}30` : "none"
                  }}
                >
                  <t.icon 
                    className="w-5 h-5 relative z-10 transition-all duration-500"
                    style={{ 
                      color: active ? t.color : "#64748B",
                      filter: active ? `drop-shadow(0 0 8px ${t.color}80)` : "none"
                    }}
                  />
                </div>
                
                {/* Label with color transition */}
                <span 
                  className="relative z-10 font-medium transition-all duration-500"
                  style={{ 
                    color: active ? t.color : "#64748B",
                    textShadow: active ? `0 0 8px ${t.color}60` : "none"
                  }}
                >
                  {t.key}
                </span>
                
                {/* Bottom dot indicator */}
                {active && (
                  <div
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: t.color,
                      boxShadow: `0 0 10px ${t.color}, 0 0 20px ${t.color}60`
                    }}
                  />
                )}
                
                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${active ? "" : "group-hover:bg-slate-800/30"}`} />
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
