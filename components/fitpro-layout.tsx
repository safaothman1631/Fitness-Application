"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  ClipboardList,
  UserPlus,
  FileText,
  Sparkles,
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
  const [currentPath, setCurrentPath] = useState("")
  const router = useRouter()
  const { t } = useLanguage()
  const cfg = getRoleConfig((role as AppRole) || "user")
  const iconMap = { Home, Dumbbell, TrendingUp, Users, User, Settings, Bell, HelpCircle, Wrench, Zap, Eye, Bone, Utensils, ClipboardList, UserPlus, FileText, Sparkles } as const
  const navigationItems = cfg.main.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))
  const menuItems = cfg.menu.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))

  // Track current path for active state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
    }
  }, [])

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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
        <div className="grid grid-cols-5 gap-0.5 px-1 py-2.5">
          {navigationItems.slice(0, 4).map((item, idx) => {
            const Icon = item.icon
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}>
                <div className="relative flex flex-col items-center justify-center gap-1 px-1 py-1.5 group active:scale-90 transition-transform duration-200">
                  <div className={`relative p-2 rounded-xl transition-all duration-500 ease-out overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-cyan-400 shadow-lg shadow-cyan-500/50 scale-110'
                      : 'text-gray-400 group-hover:bg-gradient-to-br group-hover:from-cyan-500/10 group-hover:to-blue-500/10 group-hover:text-cyan-400 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-cyan-500/30'
                  }`}>
                    {/* Shimmer effect */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" aria-hidden="true"></span>
                    
                    {/* Active indicator ring */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl border-2 border-cyan-400/50 animate-pulse" aria-hidden="true"></span>
                    )}
                    
                    <Icon className={`relative z-10 w-5 h-5 transition-all duration-500 ease-out ${
                      isActive ? 'scale-110' : 'group-hover:scale-125 group-hover:rotate-12'
                    }`} />
                    
                    {/* Active dot indicator */}
                    {isActive && (
                      <div className="absolute -top-0.5 -right-0.5 z-20">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                        <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
                      </div>
                    )}
                  </div>
                  <span className={`text-[9px] font-medium text-center leading-tight line-clamp-1 max-w-[56px] transition-all duration-300 ${
                    isActive ? 'text-cyan-400 font-semibold' : 'text-gray-400 group-hover:text-cyan-400 group-hover:font-semibold'
                  }`}>{item.name}</span>
                </div>
              </Link>
            )
          })}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <div className="relative flex flex-col items-center justify-center gap-1 px-1 py-1.5 group">
              <div className="relative p-2 rounded-xl transition-all duration-500 ease-out overflow-hidden text-gray-400 group-hover:bg-gradient-to-br group-hover:from-cyan-500/10 group-hover:to-blue-500/10 group-hover:text-cyan-400 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-cyan-500/20">
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>
                <div className="relative w-5 h-5 flex flex-col justify-center gap-[3px]">
                  <span className="block h-[2px] rounded-full bg-current transition-all duration-500 ease-out w-5 group-hover:w-4"></span>
                  <span className="block h-[2px] rounded-full bg-current transition-all duration-500 ease-out w-5 group-hover:w-3 group-hover:translate-x-1"></span>
                  <span className="block h-[2px] rounded-full bg-current transition-all duration-500 ease-out w-5 group-hover:w-4"></span>
                </div>
              </div>
              <span className="text-[9px] font-medium text-center leading-tight line-clamp-1 max-w-[56px] transition-all duration-300 text-gray-400 group-hover:text-cyan-400">{t("more")}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Full Menu - Ultra Modern Design */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl">
          <div className="h-full flex flex-col relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/5 backdrop-blur-xl bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-rose-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Menu className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-xl bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">{t("menu")}</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="relative flex-1 overflow-y-auto px-6 py-6">
              {/* Main Navigation */}
              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 mb-4">{t("navigation")}</h3>
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div 
                        className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-300 hover:text-white transition-all duration-300 overflow-hidden"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Hover Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-rose-500/10 transition-all duration-500 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-2xl"></div>
                        
                        {/* Icon Container */}
                        <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-cyan-500/20 group-hover:to-rose-500/20 border border-white/5 group-hover:border-cyan-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                          <Icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                        
                        {/* Text */}
                        <span className="relative z-10 font-semibold text-base">{item.name}</span>
                        
                        {/* Arrow Indicator */}
                        <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400/20 to-rose-400/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

              {/* Settings Menu */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2 mb-4">{t("settings")}</h3>
                {menuItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div 
                        className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-300 hover:text-white transition-all duration-300 overflow-hidden"
                        style={{ animationDelay: `${(navigationItems.length + index) * 50}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-500/0 to-slate-500/0 group-hover:from-slate-500/10 group-hover:to-slate-600/10 transition-all duration-500 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-2xl"></div>
                        
                        <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 group-hover:from-slate-500/20 group-hover:to-slate-600/20 border border-white/5 group-hover:border-slate-400/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                          <Icon className="w-5 h-5 group-hover:text-slate-300 transition-colors duration-300" />
                        </div>
                        
                        <span className="relative z-10 font-semibold text-base">{item.name}</span>
                        
                        <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-slate-400/20 to-slate-500/20 flex items-center justify-center">
                            <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="group relative w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-300 hover:text-white transition-all duration-300 overflow-hidden mt-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/20 group-hover:to-rose-500/20 transition-all duration-500 rounded-2xl"></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-red-500/10 transition-all duration-300 rounded-2xl"></div>
                  <div className="absolute inset-0 border border-transparent group-hover:border-red-500/30 transition-all duration-300 rounded-2xl"></div>
                  
                  <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 group-hover:from-red-500/30 group-hover:to-rose-500/30 border border-red-500/20 group-hover:border-red-400/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                  </div>
                  
                  <span className="relative z-10 font-semibold text-base text-red-400 group-hover:text-red-300">{t("logout")}</span>
                  
                  <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-400/20 to-rose-400/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-rose-500/10 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-rose-400 animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-400">FitPro © 2025</span>
                  </div>
                </div>
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
