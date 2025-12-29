"use client"

import { useEffect, useState } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Key, Activity, TrendingUp, Shield, Zap, Database, UserPlus, FileText, AlertCircle, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import Link from "next/link"

export default function SuperAdminPage() {
  const { t } = useLanguage()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    programs: 0,
    trainers: 0,
    keys: 0,
    loading: true
  })
  const [systemStatus, setSystemStatus] = useState({
    database: 'healthy',
    apiServer: 'running',
    storagePercent: 0,
    loading: true
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    async function fetchStats() {
      try {
        const allowedRoles = ["user", "trainer"]
        // Fetch users
        const usersRes = await fetch('/api/users')
        const usersData = usersRes.ok ? await usersRes.json() : []
        const filteredUsers = Array.isArray(usersData) ? usersData.filter((u: any) => allowedRoles.includes(u.role)) : []
        const totalUsers = filteredUsers.length
        const activeUsers = filteredUsers.filter((u: any) => u.status === 'active' || u.isActive === true || u.subscriptionStatus === 'active').length
        
        // Fetch programs
        const programsRes = await fetch('/api/programs')
        const programsData = programsRes.ok ? await programsRes.json() : []
        const programs = Array.isArray(programsData) ? programsData.length : 0
        
        // Fetch trainers
        const trainersRes = await fetch('/api/trainers')
        const trainersData = trainersRes.ok ? await trainersRes.json() : { count: 0 }
        
        // Fetch system status
        const systemRes = await fetch('/api/system-status')
        const systemData = systemRes.ok ? await systemRes.json() : {}
        
        setStats({
          totalUsers,
          activeUsers,
          programs,
          trainers: trainersData.count || 0,
          keys: 0,
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
        <div className="space-y-12 p-4 md:p-6">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 p-8">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">{t("superadminDashboard")}</h1>
                  <p className="text-cyan-400">{t("systemManagementControl")}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">{t("totalUsers")}</p>
                  <p className="text-2xl font-bold text-white">{stats.loading ? '...' : stats.totalUsers}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">{t("activeUsers")}</p>
                  <p className="text-2xl font-bold text-green-400">{stats.loading ? '...' : stats.activeUsers}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-xs mb-1">{t("programs")}</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.loading ? '...' : stats.programs}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Users Card */}
            <Link href="/superadmin/users">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:border-blue-400/60 hover:shadow-[0_20px_60px_-30px_rgba(59,130,246,0.9)]">
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Users className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1 group-hover:text-gray-300 transition-colors">{t("totalUsers")}</h3>
                  <p className="text-3xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
                    {stats.loading ? '...' : stats.totalUsers}
                  </p>
                  <p className="text-blue-400 text-xs flex items-center gap-1 group-hover:text-blue-300 transition-colors">
                    <CheckCircle2 className="w-3 h-3" />
                    {stats.activeUsers} {t("active")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Registration Requests Card */}
            <Link href="/superadmin/registration-requests">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/30 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:border-orange-400/60 hover:shadow-[0_20px_60px_-30px_rgba(249,115,22,0.9)]">
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <FileText className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1 group-hover:text-gray-300 transition-colors">{t("pendingRequests")}</h3>
                  <p className="text-3xl font-bold text-white mb-2 group-hover:text-orange-100 transition-colors">
                    {stats.loading ? '...' : stats.pendingRequests}
                  </p>
                  <p className="text-orange-400 text-xs flex items-center gap-1 group-hover:text-orange-300 transition-colors">
                    <Clock className="w-3 h-3" />
                    {t("awaitingReview")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Programs Card */}
            <Link href="/superadmin/programs">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:border-purple-400/60 hover:shadow-[0_20px_60px_-30px_rgba(168,85,247,0.9)]">
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Zap className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1 group-hover:text-gray-300 transition-colors">{t("programs")}</h3>
                  <p className="text-3xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                    {stats.loading ? '...' : stats.programs}
                  </p>
                  <p className="text-purple-400 text-xs flex items-center gap-1 group-hover:text-purple-300 transition-colors">
                    <Activity className="w-3 h-3" />
                    {t("totalPrograms")}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* System Status & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status Card */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  {t("systemStatus")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {systemStatus.loading ? (
                  <div className="text-center py-8 text-gray-400">{t("loading")}...</div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          systemStatus.database === 'healthy' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          <Database className={`w-5 h-5 ${
                            systemStatus.database === 'healthy' ? 'text-green-400' : 'text-red-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{t("database")}</p>
                          <p className="text-xs text-gray-400">{t("firestoreConnection")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          systemStatus.database === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className={`text-sm font-semibold ${
                          systemStatus.database === 'healthy' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {systemStatus.database === 'healthy' ? t("healthy") : 'Error'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          systemStatus.apiServer === 'running' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                        }`}>
                          <Activity className={`w-5 h-5 ${
                            systemStatus.apiServer === 'running' ? 'text-green-400' : 'text-yellow-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{t("apiServer")}</p>
                          <p className="text-xs text-gray-400">{t("nextjsRuntime")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          systemStatus.apiServer === 'running' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className={`text-sm font-semibold ${
                          systemStatus.apiServer === 'running' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {systemStatus.apiServer === 'running' ? t("running") : 'Stopped'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            systemStatus.storagePercent < 80 ? 'bg-cyan-500/20' : 'bg-orange-500/20'
                          }`}>
                            <TrendingUp className={`w-5 h-5 ${
                              systemStatus.storagePercent < 80 ? 'text-cyan-400' : 'text-orange-400'
                            }`} />
                          </div>
                          <div>
                            <p className="text-white font-medium">{t("storage")}</p>
                            <p className="text-xs text-gray-400">{t("firebaseStorage")}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold ${
                          systemStatus.storagePercent < 80 ? 'text-cyan-400' : 'text-orange-400'
                        }`}>
                          {systemStatus.storagePercent}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            systemStatus.storagePercent < 80 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                              : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}
                          style={{ width: `${systemStatus.storagePercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  {t("quickActions")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/superadmin/users">
                    <button
                      type="button"
                      className="group relative w-full p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-400/60 hover:shadow-[0_18px_50px_-28px_rgba(59,130,246,0.85)] overflow-hidden"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                      <div className="relative flex flex-col items-start">
                        <Users className="w-8 h-8 text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-white font-medium text-sm">{t("manageUsers")}</p>
                      </div>
                    </button>
                  </Link>
                  <Link href="/superadmin/registration-requests">
                    <button
                      type="button"
                      className="group relative w-full p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-orange-400/60 hover:shadow-[0_18px_50px_-28px_rgba(249,115,22,0.85)] overflow-hidden"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                      <div className="relative flex flex-col items-start">
                        <FileText className="w-8 h-8 text-orange-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-white font-medium text-sm">{t("reviewRequests")}</p>
                      </div>
                    </button>
                  </Link>
                  <Link href="/superadmin/programs">
                    <button
                      type="button"
                      className="group relative w-full p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-purple-400/60 hover:shadow-[0_18px_50px_-28px_rgba(168,85,247,0.85)] overflow-hidden"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                      <div className="relative flex flex-col items-start">
                        <Zap className="w-8 h-8 text-purple-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-white font-medium text-sm">{t("programs")}</p>
                      </div>
                    </button>
                  </Link>
                  <Link href="/superadmin/analytics">
                    <button
                      type="button"
                      className="group relative w-full p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-green-400/60 hover:shadow-[0_18px_50px_-28px_rgba(34,197,94,0.85)] overflow-hidden"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-out" aria-hidden="true" />
                      <div className="relative flex flex-col items-start">
                        <TrendingUp className="w-8 h-8 text-green-400 mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <p className="text-white font-medium text-sm">{t("analytics")}</p>
                      </div>
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
