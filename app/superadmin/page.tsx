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
  const [systemStatus, setSystemStatus] = useState({
    database: 'healthy',
    apiServer: 'running',
    storagePercent: 0,
    loading: true
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const trainersRes = await fetch('/api/trainers')
        if (!trainersRes.ok) {
          throw new Error(`Failed to fetch trainers: ${trainersRes.status}`)
        }
        const trainersData = await trainersRes.json()
        
        const systemRes = await fetch('/api/system-status')
        if (!systemRes.ok) {
          throw new Error(`Failed to fetch system status: ${systemRes.status}`)
        }
        const systemData = await systemRes.json()
        
        setStats({
          trainers: trainersData.count || 0,
          users: 0, // Will be implemented later
          keys: 0, // Will be implemented later
          loading: false
        })
        
        setSystemStatus({
          database: systemData.database || 'healthy',
          apiServer: systemData.apiServer || 'running',
          storagePercent: systemData.storagePercent || 0,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats(prev => ({ ...prev, loading: false }))
        setSystemStatus(prev => ({ ...prev, loading: false }))
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
                    <p className="text-gray-400 text-sm mb-1">{t("trainers")}</p>
                    <h3 className="text-3xl font-bold text-white">
                      {stats.loading ? '...' : stats.trainers}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/30 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-2">{t("totalTrainers")}</p>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-white text-lg font-semibold mb-4">{t("systemStatus")}</h2>
              {systemStatus.loading ? (
                <div className="text-center py-4 text-gray-400">Loading...</div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        systemStatus.database === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-gray-300">{t("database")}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      systemStatus.database === 'healthy' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {systemStatus.database === 'healthy' ? t("healthy") : 'Error'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        systemStatus.apiServer === 'running' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-gray-300">{t("apiServer")}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      systemStatus.apiServer === 'running' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {systemStatus.apiServer === 'running' ? t("running") : 'Stopped'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${
                        systemStatus.storagePercent < 80 ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <span className="text-gray-300">{t("storage")}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      systemStatus.storagePercent < 80 ? 'text-green-400' : 'text-orange-400'
                    }`}>
                      {systemStatus.storagePercent}% {t("percentUsed")}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
