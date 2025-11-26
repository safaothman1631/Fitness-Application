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
} from "lucide-react"
import { Logo } from "../logo"
import { getRoleConfig, type AppRole } from "@/lib/roles"
import { PageTransition } from "../page-transition"

interface LayoutProps {
  children: React.ReactNode
  role?: string
}

export default function SidebarGlass({ children, role = "user" }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* STYLE 4: GLASSMORPHISM - Frosted glass effect with vibrant colors */}
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-4 top-4 bottom-4 w-64 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 z-50 flex-col shadow-2xl overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Logo />
            <div className="mt-3 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full inline-block">
              <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">{role}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={`nav-${idx}-${item.href}`}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white shadow-lg shadow-cyan-500/20 border border-cyan-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
                  )}
                  <Icon size={20} className="relative z-10" />
                  <span className="font-medium relative z-10">{item.name}</span>
                </Link>
              )
            })}
            
            {menuItems.length > 0 && <div className="border-t border-white/10 my-4" />}
            
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={`menu-${idx}-${item.href}`}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white shadow-lg shadow-cyan-500/20 border border-cyan-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
                  )}
                  <Icon size={20} className="relative z-10" />
                  <span className="font-medium relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all w-full group border border-transparent hover:border-red-500/30"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="font-medium">{t("logout")}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <Logo />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/98 backdrop-blur pt-16">
          <nav className="p-4 space-y-2">
            {[...navigationItems, ...menuItems].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition-all"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all w-full"
            >
              <LogOut size={20} />
              <span>{t("logout")}</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-72 p-4 lg:p-8 pt-20 lg:pt-8 min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
