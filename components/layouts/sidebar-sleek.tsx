"use client"

import { ReactNode, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/hooks/useLanguage"
import { 
  Home, Users, Settings, Bell, User, TrendingUp, 
  Shield, Key, Database, Activity, FileText, Zap,
  LogOut, ChevronRight, Menu, X
} from "lucide-react"
import { AppRole } from "@/lib/roles"

interface SidebarSleekProps {
  children: ReactNode
  role: AppRole
}

const iconMap: Record<string, any> = {
  Home, Users, Settings, Bell, User, TrendingUp,
  Shield, Key, Database, Activity, FileText, Zap, Dumbbell: Activity
}

export default function SidebarSleek({ children, role }: SidebarSleekProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  // Role-specific navigation
  const navigationConfig = {
    superadmin: {
      main: [
        { label: t("dashboard"), path: "/superadmin", icon: "Home" },
        { label: t("users"), path: "/superadmin/users", icon: "Users" },
        { label: t("programs"), path: "/superadmin/programs", icon: "Zap" },
        { label: t("database"), path: "/superadmin/database", icon: "Database" },
        { label: t("analytics"), path: "/superadmin/analytics", icon: "TrendingUp" },
        { label: t("systemLogs"), path: "/superadmin/logs", icon: "FileText" },
      ],
      menu: [
        { label: t("profile"), path: "/superadmin/profile", icon: "User" },
        { label: t("settings"), path: "/superadmin/settings", icon: "Settings" },
        { label: t("notifications"), path: "/superadmin/notifications", icon: "Bell" },
      ]
    },
    physiotherapist: {
      main: [
        { label: t("dashboard"), path: "/physiotherapist", icon: "Home" },
        { label: t("requests"), path: "/physiotherapist/requests", icon: "Bell" },
        { label: t("patients"), path: "/physiotherapist/patients", icon: "Users" },
        { label: t("appointments"), path: "/physiotherapist/appointments", icon: "Activity" },
        { label: t("anatomy3D"), path: "/physiotherapist/anatomy", icon: "Zap" },
        { label: t("progress"), path: "/physiotherapist/progress", icon: "TrendingUp" },
      ],
      menu: [
        { label: t("profile"), path: "/physiotherapist/profile", icon: "User" },
        { label: t("settings"), path: "/physiotherapist/settings", icon: "Settings" },
        { label: t("notifications"), path: "/physiotherapist/notifications", icon: "Bell" },
      ]
    }
  }

  const mainNavItems = navigationConfig[role]?.main || navigationConfig.superadmin.main
  const menuItems = navigationConfig[role]?.menu || navigationConfig.superadmin.menu

  const isActive = (path: string) => {
    if (path === "/superadmin") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const handleLogout = async () => {
    try {
      // Clear any stored auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userRole')
        localStorage.removeItem('userId')
        localStorage.removeItem('userEmail')
        sessionStorage.clear()
      }
      
      // Try to sign out from Firebase if available
      try {
        const { signOut } = await import('firebase/auth')
        const { auth } = await import('@/lib/firebase')
        await signOut(auth)
      } catch (error) {
        console.log('Firebase signout skipped:', error)
      }
      
      // Redirect to login
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      // Force redirect anyway
      router.push("/login")
    }
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
            role === 'physiotherapist' 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30' 
              : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30'
          }`}>
            {role === 'physiotherapist' ? (
              <Activity className="w-6 h-6 text-white" />
            ) : (
              <Shield className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">
              {role === 'physiotherapist' ? 'Physiotherapist' : 'SuperAdmin'}
            </h1>
            <p className="text-xs text-gray-400">
              {role === 'physiotherapist' ? t("medicalDashboard") : t("controlPanel")}
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            {t("mainMenu")}
          </p>
          {mainNavItems.map((item, idx) => {
            const Icon = iconMap[item.icon] || Home
            const active = isActive(item.path)
            return (
              <button
                key={`main-${idx}`}
                onClick={() => {
                  router.push(item.path)
                  setMobileOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  active
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-cyan-400" : ""}`} />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {active && (
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
            {t("account")}
          </p>
          {menuItems.map((item, idx) => {
            const Icon = iconMap[item.icon] || Settings
            const active = isActive(item.path)
            return (
              <button
                key={`menu-${idx}`}
                onClick={() => {
                  router.push(item.path)
                  setMobileOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-cyan-400" : ""}`} />
                <span className="font-medium flex-1 text-left">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
            role === 'physiotherapist'
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
              : 'bg-gradient-to-br from-purple-500 to-pink-500'
          }`}>
            {role === 'physiotherapist' ? 'PT' : 'SA'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">
              {role === 'physiotherapist' ? 'Physiotherapist' : 'Super Admin'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {role === 'physiotherapist' ? 'physio@clinic.com' : 'admin@system.com'}
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
    </div>
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/10">
        <NavContent />
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">
          {mainNavItems.slice(0, 4).map((item, idx) => {
            const Icon = iconMap[item.icon] || Home
            const active = isActive(item.path)
            return (
              <button
                key={`mobile-${idx}`}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-1 min-w-0 flex-1"
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  active ? "bg-cyan-500/20 text-cyan-400" : "text-gray-400"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium truncate ${
                  active ? "text-cyan-400" : "text-gray-400"
                }`}>
                  {item.label}
                </span>
              </button>
            )
          })}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center gap-1 min-w-0 flex-1"
          >
            <div className="p-2 rounded-xl text-gray-400">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-400">{t("more")}</span>
          </button>
        </div>
      </div>

      {/* Mobile Full Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-xl">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <span className="text-white font-bold text-lg">{t("menu")}</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <NavContent />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="pb-20 lg:pb-0 min-h-full">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
