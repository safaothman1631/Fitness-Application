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
  ChevronDown,
} from "lucide-react"
import { Logo } from "../logo"
import { getRoleConfig, type AppRole } from "@/lib/roles"
import { PageTransition } from "../page-transition"

interface LayoutProps {
  children: React.ReactNode
  role?: string
}

export default function SidebarClassic({ children, role = "user" }: LayoutProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* STYLE 1: CLASSIC SIDEBAR - Dark with gradient accents */}
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 z-50 flex-col shadow-2xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-800/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <Logo />
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">{role} Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigationItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={`nav-${idx}-${item.href}`}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon size={20} className={active ? "animate-pulse" : ""} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
          
          {menuItems.length > 0 && <div className="border-t border-slate-800/50 my-4" />}
          
          {menuItems.map((item, idx) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={`menu-${idx}-${item.href}`}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">{t("logout")}</span>
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
      <main className="lg:ml-72 p-4 lg:p-8 pt-20 lg:pt-8 min-h-screen">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
