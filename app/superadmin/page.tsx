"use client"

import { useEffect, useState } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Key, Activity, TrendingUp, Shield, Zap } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export default function SuperAdminPage() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    trainers: 0,
    users: 0,
    keys: 0,
    loading: true
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const trainersRes = await fetch('/api/trainers')
        const trainersData = await trainersRes.json()
        
        setStats({
          trainers: trainersData.count || 0,
          users: 0, // Will be implemented later
          keys: 0, // Will be implemented later
          loading: false
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }

    fetchStats()
  }, [])
  
  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4 shadow-lg shadow-cyan-500/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{t("superadminDashboard")}</h1>
            <p className="text-gray-400">{t("systemManagementControl")}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Trainers Card */}
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">ترەینەرەکان</p>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.loading ? '...' : stats.trainers}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">کۆی گشتی ترەینەرەکان</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                {t("quickActions")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  👥 {t("manageUsers")}
                </button>
                <button className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  🔑 {t("generateKeys")}
                </button>
                <button className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  📊 {t("viewReports")}
                </button>
                <button className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  ⚙️ {t("settings")}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-white text-lg font-semibold mb-4">{t("systemStatus")}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-300">{t("database")}</span>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">{t("healthy")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-300">{t("apiServer")}</span>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">{t("running")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-300">{t("storage")}</span>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">67% {t("percentUsed")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
