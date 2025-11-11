"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HelpCircle, LogIn, Shield, Crown, Activity, Dumbbell, User as UserIcon } from "lucide-react"

interface AuthBottomNavProps {
  current: "Login" | "Admin" | "Superadmin" | "Physio" | "Trainer"
}

const roleIconMap = {
  Login: LogIn,
  Admin: Shield,
  Superadmin: Crown,
  Physio: Activity,
  Trainer: Dumbbell,
} as const

export default function AuthBottomNav({ current }: AuthBottomNavProps) {
  const pathname = usePathname()
  const CurrentIcon = roleIconMap[current]
  const isHelp = pathname.startsWith("/login/help")
  const isProfile = pathname.startsWith("/profile")
  const inLogin = pathname.startsWith("/login")
  const leftHref = isHelp || isProfile ? "/login" : pathname

  // Build tabs, omitting Profile when in /login routes as requested
  // Only show Help button for regular "Login" role, not for Admin/Superadmin/Physio/Trainer
  const tabsBase = [
    { key: current, href: leftHref, icon: CurrentIcon },
    ...(current === "Login" ? [{ key: "Help" as const, href: "/login/help", icon: HelpCircle }] : []),
  ]
  const tabs = inLogin
    ? tabsBase
    : ([...tabsBase, { key: "Profile" as const, href: "/profile", icon: UserIcon }] as const)

  // Determine active index by matching current pathname to tab hrefs
  const activeIndex = tabs.findIndex((t) => {
    if (t.key === current) return !isHelp && !isProfile
    if (t.key === "Help") return isHelp
    if (t.key === "Profile") return isProfile
    return false
  })
  const cols = tabs.length

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl">
      <div className={`relative mx-auto max-w-md ${cols === 1 ? 'flex justify-center' : `grid ${cols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}`}>
        {/* Animated glowing indicator */}
        <span
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out shadow-sm shadow-blue-500/30 animate-pulse"
          style={{ width: `${100 / cols}%`, transform: `translateX(${(activeIndex < 0 ? 0 : activeIndex) * 100}%)` }}
        />
        {tabs.map((t, i) => (
          <Link
            key={t.key}
            href={t.href}
            className={`flex flex-col items-center justify-center py-3 relative group transition-all duration-500 ease-out transform ${
              i === activeIndex 
                ? 'text-white scale-110 animate-in fade-in-0 zoom-in-95' 
                : 'text-slate-400 hover:text-white hover:scale-110 active:scale-95'
            }`}
          >
            {/* Glow effect for active tab */}
            {i === activeIndex && (
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-lg blur-md animate-pulse" />
            )}
            
            {/* Icon with animations */}
            {t.icon ? (
              <t.icon 
                className={`w-6 h-6 mb-1 relative z-10 transition-all duration-500 ease-out ${
                  i === activeIndex 
                    ? 'scale-110 drop-shadow-lg drop-shadow-blue-500/50 animate-in fade-in-0 zoom-in-95 spin-in-0' 
                    : 'group-hover:scale-110 group-hover:rotate-12 group-active:rotate-0 group-active:scale-95'
                }`} 
              />
            ) : (
              <span className="w-6 h-6 mb-1" />
            )}
            
            {/* Text with fade animation */}
            <span 
              className={`text-sm font-medium relative z-10 transition-all duration-500 ${
                i === activeIndex 
                  ? 'opacity-100 translate-y-0 animate-in fade-in-0 slide-in-from-bottom-2' 
                  : 'opacity-70 group-hover:opacity-100 group-hover:translate-y-[-2px]'
              }`}
            >
              {t.key}
            </span>
            
            {/* Ripple effect on hover */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-white/5 rounded-lg animate-ping" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
