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

export default function TopNavbar({ children, role = "user" }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
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
      {/* STYLE 3: TOP NAVBAR - Modern horizontal navigation */}
      
      {/* Desktop Top Navbar */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navigationItems.map((item, idx) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={`nav-${idx}-${item.href}`}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      active
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                        : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Menu Items Dropdown */}
              {menuItems.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800/50 transition-all"
                  >
                    <User size={18} />
                    <ChevronDown size={14} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-12 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
                      {menuItems.map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={`menu-${idx}-${item.href}`}
                            href={item.href}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-slate-800 hover:text-white transition-all"
                          >
                            <Icon size={16} />
                            <span className="text-sm">{item.name}</span>
                          </Link>
                        )
                      })}
                      <div className="border-t border-slate-800" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all w-full"
                      >
                        <LogOut size={16} />
                        <span className="text-sm">{t("logout")}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

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
      <main className="pt-24 lg:pt-20 p-4 lg:p-8 min-h-screen max-w-7xl mx-auto">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
