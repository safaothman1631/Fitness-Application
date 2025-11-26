"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Activity, DollarSign, ArrowUp, ArrowDown, BarChart3, PieChart, Crown } from "lucide-react"
import { useState, useEffect } from "react"

export default function AnalyticsPage() {
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
              <p className="text-gray-400">Loading analytics...</p>
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
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400 text-sm">Track performance and insights</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {analytics?.metrics?.totalUsers || 0}
                </p>
                <p className="text-xs text-gray-400">Total Users</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Activity className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {analytics?.metrics?.activeUsers || 0}
                </p>
                <p className="text-xs text-gray-400">Active Users (24h)</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {analytics?.metrics?.proMembers || 0}
                </p>
                <p className="text-xs text-gray-400">Pro Members ({analytics?.metrics?.proPercentage || 0}%)</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {analytics?.metrics?.totalWorkouts || 0}
                </p>
                <p className="text-xs text-gray-400">Total Workouts</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  User Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(analytics?.monthlyGrowth || []).map((item: any) => (
                    <div key={item.month} className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm w-8">{item.month}</span>
                      <div className="flex-1 h-8 bg-slate-800 rounded-lg overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-end pr-3"
                          style={{ width: `${Math.max(item.percentage, 5)}%` }}
                        >
                          <span className="text-white text-xs font-semibold">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  User Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics?.usersByRole || {}).map(([role, count]: [string, any]) => {
                    const total = analytics?.metrics?.totalUsers || 1
                    const percentage = Math.round((count / total) * 100)
                    const colors: any = {
                      user: 'bg-blue-500',
                      trainer: 'bg-purple-500',
                      physiotherapist: 'bg-green-500',
                      admin: 'bg-yellow-500',
                      superadmin: 'bg-red-500'
                    }
                    return (
                      <div key={role} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-3 h-3 rounded-full ${colors[role] || 'bg-gray-500'}`} />
                          <span className="text-gray-300 text-sm capitalize">{role}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">{count}</span>
                          <span className="text-white font-semibold text-sm w-12 text-right">{percentage}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(analytics?.recentActivity || []).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/20">
                      <Activity className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">
                        {activity.action || 'New user registered'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {activity.user || activity.userName || 'Unknown User'} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
