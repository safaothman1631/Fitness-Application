"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Activity, DollarSign, ArrowUp, ArrowDown, BarChart3, PieChart, Crown, UserPlus, Edit, RefreshCw, Dumbbell, Clock, CheckCircle, XCircle, AlertCircle, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/analytics")
        if (response.ok) {
          const data = await response.json()
          setAnalytics(data)
        }
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (isLoading) {
    return (
      <AuthGuard requiredRole="superadmin">
        <SidebarSleek role="superadmin">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">{t("loadingAnalytics")}</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Enhanced Header with Gradient Background */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40 ring-4 ring-cyan-400/20">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                      {t("analyticsDashboard")}
                    </h1>
                    <p className="text-cyan-200 text-sm mt-1">{t("trackPerformance")}</p>
                  </div>
                </div>

                {/* Mini Stats in Header */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{analytics?.metrics?.totalUsers || 0}</div>
                      <div className="text-[10px] text-blue-200 mt-1">Total</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">{analytics?.metrics?.activeUsers || 0}</div>
                      <div className="text-[10px] text-green-200 mt-1">Active</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300">{analytics?.metrics?.proMembers || 0}</div>
                      <div className="text-[10px] text-yellow-200 mt-1">Pro</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-500/5 border-blue-500/40 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">{analytics?.metrics?.totalUsers || 0}</p>
                    <p className="text-xs text-blue-300 font-medium">{t("totalUsers")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-500/5 border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">{analytics?.metrics?.activeUsers || 0}</p>
                    <p className="text-xs text-purple-300 font-medium">{t("activeUsers24h")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-yellow-500/5 border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">{analytics?.metrics?.proMembers || 0}</p>
                    <p className="text-xs text-yellow-300 font-medium">{t("proMembers")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/20 via-cyan-600/10 to-cyan-500/5 border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">{analytics?.metrics?.totalWorkouts || 0}</p>
                    <p className="text-xs text-cyan-300 font-medium">{t("totalWorkouts")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-900/80 via-blue-900/20 to-slate-900/80 border-blue-500/30 backdrop-blur-xl hover:border-blue-400/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                    {t("userGrowth")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analytics?.monthlyGrowth || []).map((item: any) => (
                    <div key={item.month}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-blue-300 font-medium">{item.month}</span>
                        <span className="text-white font-bold">{item.count}</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-3 border border-slate-700/50">
                        <div 
                          className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 h-3 rounded-full shadow-lg shadow-blue-500/40 transition-all duration-500"
                          style={{ width: `${Math.max(item.percentage, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                    {t("userDistribution")}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics?.usersByRole || {}).map(([role, count]: [string, any]) => {
                    const total = analytics?.metrics?.totalUsers || 1
                    const percentage = Math.round((count / total) * 100)
                    const colors: any = {
                      user: 'bg-blue-500',
                      trainer: 'bg-purple-500',

                      admin: 'bg-yellow-500',
                      superadmin: 'bg-red-500'
                    }
                    return (
                      <div key={role} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${colors[role] || 'bg-gray-500'} shadow-lg`}></div>
                          <span className="text-gray-200 text-sm font-medium capitalize">{role}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold text-lg">{count}</span>
                          <span className="text-purple-300 text-sm font-medium w-12 text-right">{percentage}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card className="bg-gradient-to-br from-slate-900/80 via-cyan-900/20 to-slate-900/80 border-cyan-500/30 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                    {t("recentActivity")}
                  </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(analytics?.recentActivity || []).map((activity, idx) => {
                  // Get icon based on activity type
                  const getActivityIcon = () => {
                    switch (activity.icon) {
                      case 'UserPlus': return <UserPlus className="w-5 h-5" />
                      case 'Edit': return <Edit className="w-5 h-5" />
                      case 'RefreshCw': return <RefreshCw className="w-5 h-5" />
                      case 'Crown': return <Crown className="w-5 h-5" />
                      case 'Dumbbell': return <Dumbbell className="w-5 h-5" />
                      case 'Trash2': return <Trash2 className="w-5 h-5" />
                      default: return <Activity className="w-5 h-5" />
                    }
                  }

                  // Get color based on activity type
                  const getActivityColor = () => {
                    switch (activity.type) {
                      case 'create': return 'from-green-400 to-emerald-400'
                      case 'edit': return 'from-blue-400 to-cyan-400'
                      case 'success': return 'from-green-400 to-lime-400'
                      case 'error': return 'from-red-400 to-orange-400'
                      case 'pending': return 'from-yellow-400 to-amber-400'
                      case 'delete': return 'from-red-500 to-pink-500'
                      default: return 'from-cyan-400 to-blue-400'
                    }
                  }

                  const getIconBgColor = () => {
                    switch (activity.type) {
                      case 'create': return 'bg-green-500/20'
                      case 'edit': return 'bg-blue-500/20'
                      case 'success': return 'bg-green-500/20'
                      case 'error': return 'bg-red-500/20'
                      case 'pending': return 'bg-yellow-500/20'
                      case 'delete': return 'bg-red-500/20'
                      default: return 'bg-cyan-500/20'
                    }
                  }

                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-200">
                      <div className={`w-10 h-10 rounded-xl ${getIconBgColor()} flex items-center justify-center shadow-lg`}>
                        <div className={`bg-gradient-to-r ${getActivityColor()} bg-clip-text text-transparent`}>
                          {getActivityIcon()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {activity.action || t("newUserRegistered")}
                        </p>
                        <p className="text-cyan-300 text-xs mt-1 font-medium">
                          {activity.user || activity.userName || 'Unknown User'} • {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
