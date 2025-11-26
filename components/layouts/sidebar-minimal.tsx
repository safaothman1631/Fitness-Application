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

export default function SidebarMinimal({ children, role = "user" }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* STYLE 2: MINIMAL COLLAPSIBLE - Ultra clean with icons */}
      
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex fixed left-0 top-0 h-screen bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/50 z-50 flex-col transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-slate-800/50">
          {isExpanded ? (
            <Logo />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
              F
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {navigationItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={`nav-${idx}-${item.href}`}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                  active
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-r-full" />
                )}
                <Icon size={22} />
                {isExpanded && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            )
          })}
          
          {menuItems.length > 0 && <div className="border-t border-slate-800/50 my-3" />}
          
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={`menu-${idx}-${item.href}`}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                  active
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-500 rounded-r-full" />
                )}
                <Icon size={22} />
                {isExpanded && <span className="font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-800/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={22} />
            {isExpanded && <span className="font-medium whitespace-nowrap">{t("logout")}</span>}
          </button>
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
      <main className={`p-4 lg:p-8 pt-20 lg:pt-8 min-h-screen transition-all duration-300 ${isExpanded ? "lg:ml-64" : "lg:ml-20"}`}>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
