"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  Home,
  Dumbbell,
  TrendingUp,
  Users,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react"
import { Logo } from "../logo"
import { getRoleConfig, type AppRole } from "@/lib/roles"
import { PageTransition } from "../page-transition"

interface LayoutProps {
  children: React.ReactNode
  role?: string
}

export default function MobileBottomNav({ children, role = "user" }: LayoutProps) {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { t } = useLanguage()
  const cfg = getRoleConfig((role as AppRole) || "user")
  const iconMap = { Home, Dumbbell, TrendingUp, Users, User, Settings, Bell, HelpCircle } as const
  const navigationItems = cfg.main.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))
  const menuItems = cfg.menu.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))

  const handleLogout = () => {
    localStorage.clear()
    router.replace("/giris")
  }

  const isActive = (href: string) => pathname === href

  // Take first 4 items for bottom nav, rest go to menu
  const bottomNavItems = navigationItems.slice(0, 4)
  const moreMenuItems = [...navigationItems.slice(4), ...menuItems]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* MOBILE BOTTOM NAVIGATION - Modern App Style */}

      {/* Main Content */}
      <main className="pt-4 pb-20 px-4 min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {bottomNavItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={`bottom-${idx}-${item.href}`}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative group"
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-b-full" />
                )}
                
                {/* Icon Container */}
                <div className={`flex items-center justify-center w-12 h-8 rounded-2xl transition-all duration-300 ${
                  active 
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 scale-110" 
                    : "group-active:scale-95"
                }`}>
                  <Icon 
                    size={22} 
                    className={`transition-colors ${
                      active ? "text-cyan-400" : "text-gray-500"
                    }`}
                  />
                </div>
                
                {/* Label */}
                <span className={`text-xs mt-1 font-medium transition-colors ${
                  active ? "text-cyan-400" : "text-gray-500"
                }`}>
                  {item.name.split(' ')[0]}
                </span>
              </Link>
            )
          })}

          {/* More Menu Button */}
          <button
            onClick={() => setShowMenu(true)}
            className="flex flex-col items-center justify-center flex-1 h-full relative group"
          >
            <div className="flex items-center justify-center w-12 h-8 rounded-2xl transition-all group-active:scale-95">
              <Menu size={22} className="text-gray-500" />
            </div>
            <span className="text-xs mt-1 font-medium text-gray-500">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Drawer */}
      {showMenu && (
        <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={() => setShowMenu(false)}
              className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Content */}
          <div className="overflow-y-auto h-[calc(100vh-64px)] p-4">
            {/* User Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-6 mb-6 border border-slate-800/50">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {role?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-lg capitalize">{role}</p>
                  <p className="text-gray-400 text-sm">Account</p>
                </div>
              </div>
            </div>

            {/* All Menu Items */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider px-4 mb-3 font-semibold">
                All Pages
              </p>
              
              {moreMenuItems.map((item, idx) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={`more-${idx}-${item.href}`}
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                      active
                        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30"
                        : "bg-slate-800/30 hover:bg-slate-800/50 active:scale-95"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        active 
                          ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30" 
                          : "bg-slate-700/50"
                      }`}>
                        <Icon size={22} className={active ? "text-cyan-400" : "text-gray-400"} />
                      </div>
                      <span className={`font-medium ${active ? "text-white" : "text-gray-300"}`}>
                        {item.name}
                      </span>
                    </div>
                    <ChevronRight size={20} className="text-gray-500" />
                  </Link>
                )
              })}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full mt-6 flex items-center justify-between p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <LogOut size={22} />
                </div>
                <span className="font-medium">{t("logout")}</span>
              </div>
              <ChevronRight size={20} />
            </button>

            {/* Safe Area Bottom Padding */}
            <div className="h-8" />
          </div>
        </div>
      )}
    </div>
  )
}
