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
  const iconMap = { Home, Dumbbell, TrendingUp, Users, User, Settings, Bell, HelpCircle, Wrench, Zap, Eye, Bone } as const
  const navigationItems = cfg.main.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))
  const menuItems = cfg.menu.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  // Use bottom navigation for physiotherapist role
  const useBottomNav = role === "physiotherapist"

  if (useBottomNav) {
    return (
      <div className="min-h-screen pb-20">
        {/* Main Content */}
        <main className="p-4 lg:p-8 min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 z-50">
          <div className="flex items-center justify-around py-3 px-4 max-w-screen-xl mx-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-slate-800 transition-all group">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-[#10B2E3] transition-colors" />
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                </Link>
              )
            })}
            {menuItems.slice(0, 1).map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-slate-800 transition-all group">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-[#10B2E3] transition-colors" />
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 border-r border-slate-800 fixed h-screen">
        <div className="p-6">
          <Logo />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">{t("logout")}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/95 backdrop-blur">
          <div className="p-6">
            <Logo />
          </div>
          <nav className="px-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
          <div className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{t("logout")}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 min-h-screen">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  )
}
