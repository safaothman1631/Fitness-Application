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
  const iconMap = { Home, Dumbbell, TrendingUp, Users, User, Settings, Bell, HelpCircle } as const
  const navigationItems = cfg.main.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))
  const menuItems = cfg.menu.map((i) => ({ name: t(i.key as any), href: i.path, icon: iconMap[i.icon as keyof typeof iconMap] }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile Header - logo and menu removed */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 h-16" />

      {/* Main Content Only - sidebar removed */}
      <main className="p-4 lg:p-8 min-h-screen">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
    </div>
  )
}
