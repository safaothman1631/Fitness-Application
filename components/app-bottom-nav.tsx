"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Dumbbell, Apple, HeartPulse, User } from "lucide-react"

const tabs = [
  { key: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { key: "Workout", href: "/workout", icon: Dumbbell },
  { key: "Meals", href: "/meals", icon: Apple },
  { key: "Physio", href: "/physio", icon: HeartPulse },
  { key: "Profile", href: "/profile", icon: User },
]

export default function AppBottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 z-50">
      <div className="mx-auto max-w-md grid grid-cols-5">
        {tabs.map(t => {
          const active = pathname.startsWith(t.href)
          return (
            <Link
              key={t.key}
              href={t.href}
              className={`flex flex-col items-center justify-center py-3 text-xs transition-colors relative ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <t.icon className="w-5 h-5 mb-1" />
              {active && <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-green-500" />}
              {t.key}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
