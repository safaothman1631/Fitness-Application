"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  Wrench,
  Zap,
  Eye,
  Bone,
  Utensils,
} from "lucide-react"
import Logo from "./logo"
import { Button } from "./ui/button"
import { getRoleConfig, type AppRole } from "@/lib/roles"
import { PageTransition } from "./page-transition"

interface FitproLayoutProps {
  children: React.ReactNode
  role?: string
}

export default function FitproLayout({ children, role = "user" }: FitproLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()
  const cfg = getRoleConfig((role as AppRole) || "user")
  const iconMap = { Home, Dumbbell, TrendingUp, Users, User, Settings, Bell, HelpCircle, Wrench, Zap, Eye, Bone, Utensils } as const
  const navigationItems = cfg.main.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))
  const menuItems = cfg.menu.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  // Physiotherapist gets same layout as everyone else (modern sidebar)
  // No special bottom navigation anymore

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/10">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Logo />
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-800/50">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-all group">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br from-cyan-500 to-blue-500">
              {role === 'trainer' ? 'TR' : role === 'physiotherapist' ? 'PT' : 'SA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {role === 'trainer' ? 'Trainer' : role === 'physiotherapist' ? 'Physiotherapist' : 'Super Admin'}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {role}@clinic.com
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t("logout")}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-evenly px-2 py-3">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex flex-col items-center gap-1 px-2 min-w-[64px]">
                  <div className="p-2 rounded-xl transition-colors text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium text-center text-slate-400 leading-tight truncate w-full">{item.name}</span>
                </div>
              </Link>
            )
          })}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className="flex flex-col items-center gap-1 px-2 min-w-[64px]">
              <div className="p-2 rounded-xl text-gray-400 transition-colors hover:text-cyan-400 hover:bg-cyan-500/20">
                <Menu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-center text-gray-400 leading-tight">{t("more")}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Full Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-xl">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-white font-bold text-lg">{t("menu")}</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-all">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-all">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  )
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t("logout")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="pb-20 lg:pb-0 min-h-full">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </div>
      </main>
    </div>
  )
}
