"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import AuthGuard from "@/components/auth-guard"
import { 
  Activity, TrendingUp, TrendingDown, Users, DollarSign, 
  FileText, Calendar, Clock, BarChart3, PieChart, Filter,
  ChevronDown, Search, Download, RefreshCw, Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityLog {
  id: string
  type: string
  performedBy: string
  performedByName: string
  performedByRole: string
  targetUserId?: string
  targetUserName?: string
  description: string
  timestamp: string
  amount?: number
  currency?: string
  metadata?: any
}

interface Stats {
  totalActivities: number
  byType: Record<string, number>
  byDay: Record<string, number>
  totalRevenue: number
  totalExpenses: number
  usersCreated: number
  usersUpdated: number
  usersDeleted: number
  proApprovals: number
  subscriptionRenewals: number
  paymentsRecorded: number
  totalPayments: number
  recentActivities: Array<{
    id: string
    type: string
    description: string
    performedByName: string
    timestamp: string
    amount?: number
  }>
  topActions: Array<{ type: string; count: number }>
}

export default function ActivityLogsPage() {
  const { t, language } = useLanguage()
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('month')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadLogs()
    loadStats()
  }, [period])

  const loadLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/activity-logs?period=${period}&limit=100`)
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Error loading logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      setStatsLoading(true)
      const response = await fetch(`/api/activity-logs/stats?period=${period}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error loading stats:", error)
    } finally {
      setStatsLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    if (type.includes('user')) return <Users className="w-5 h-5" />
    if (type.includes('payment') || type.includes('pro') || type.includes('subscription')) 
      return <DollarSign className="w-5 h-5" />
    if (type.includes('expense')) return <TrendingDown className="w-5 h-5" />
    return <Activity className="w-5 h-5" />
  }

  const getActivityColor = (type: string) => {
    if (type.includes('created')) return 'from-green-500/20 to-emerald-500/10 border-green-500/30 text-green-400'
    if (type.includes('updated')) return 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400'
    if (type.includes('deleted')) return 'from-red-500/20 to-pink-500/10 border-red-500/30 text-red-400'
    if (type.includes('payment') || type.includes('pro')) 
      return 'from-yellow-500/20 to-orange-500/10 border-yellow-500/30 text-yellow-400'
    if (type.includes('expense')) return 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400'
    return 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400'
  }

  const formatActivityType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType
    const matchesSearch = searchTerm === '' || 
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.performedByName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetUserName?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const uniqueTypes = Array.from(new Set(logs.map(log => log.type)))

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  راپۆرتی چالاکییەکان
                </h1>
                <p className="text-gray-400">Complete activity tracking and analytics dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => { loadLogs(); loadStats(); }}
                  variant="outline"
                  className="border-cyan-700/50 text-cyan-400 hover:bg-cyan-600/20"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  نوێکردنەوە
                </Button>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex gap-2">
              {(['today', 'week', 'month'] as const).map((p) => (
                <Button
                  key={p}
                  onClick={() => setPeriod(p)}
                  variant={period === p ? "default" : "outline"}
                  className={cn(
                    "transition-all duration-300",
                    period === p
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                      : "border-slate-700 text-gray-400 hover:bg-slate-800/50"
                  )}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {p === 'today' ? 'ئەمڕۆ' : p === 'week' ? 'ئەم هەفتەیە' : 'ئەم مانگە'}
                </Button>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Activities */}
              <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className="text-sm text-cyan-400 mb-1">کۆی گشتی</p>
                  <p className="text-3xl font-black text-white">{stats.totalActivities}</p>
                  <p className="text-xs text-cyan-300 mt-1">Total Activities</p>
                </CardContent>
              </Card>

              {/* Revenue */}
              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-sm text-green-400 mb-1">داهات</p>
                  <p className="text-3xl font-black text-white">{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-300 mt-1">IQD Revenue</p>
                </CardContent>
              </Card>

              {/* Users Activity */}
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-sm text-purple-400 mb-1">چالاکی یوزەران</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-white">{stats.usersCreated}</p>
                    <p className="text-sm text-gray-400">نوێ</p>
                  </div>
                  <p className="text-xs text-purple-300 mt-1">
                    {stats.usersUpdated} updated • {stats.usersDeleted} deleted
                  </p>
                </CardContent>
              </Card>

              {/* PRO Subscriptions */}
              <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <span className="text-2xl">👑</span>
                    </div>
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-sm text-yellow-400 mb-1">PRO ئیشتراکەکان</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-white">{stats.proApprovals}</p>
                    <p className="text-sm text-gray-400">پەسەند</p>
                  </div>
                  <p className="text-xs text-yellow-300 mt-1">
                    {stats.subscriptionRenewals} renewals
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Charts Section */}
          {stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Actions */}
              <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 border-slate-700/50">
                <CardHeader className="border-b border-slate-800/50">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <span>زۆرترین چالاکییەکان</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {stats.topActions.map((action, index) => (
                      <div key={action.type} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center text-cyan-400 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-white font-semibold text-sm">{formatActivityType(action.type)}</p>
                            <p className="text-cyan-400 font-bold">{action.count}</p>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                              style={{ width: `${(action.count / stats.totalActivities) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Financial Overview */}
              <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 border-slate-700/50">
                <CardHeader className="border-b border-slate-800/50">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span>پوختەی دارایی</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-green-400">کۆی داهات</p>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <p className="text-3xl font-black text-white mb-1">
                        {stats.totalRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-300">IQD</p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/10 border border-purple-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-purple-400">کۆی خەرجی</p>
                        <TrendingDown className="w-4 h-4 text-purple-400" />
                      </div>
                      <p className="text-3xl font-black text-white mb-1">
                        {stats.totalExpenses.toLocaleString()}
                      </p>
                      <p className="text-xs text-purple-300">IQD</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/10 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-blue-400">قازانجی خاو</p>
                        <Activity className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-3xl font-black text-white mb-1">
                        {(stats.totalRevenue - stats.totalExpenses).toLocaleString()}
                      </p>
                      <p className="text-xs text-blue-300">IQD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Activity Logs List */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 border-slate-700/50">
            <CardHeader className="border-b border-slate-800/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span>مێژووی چالاکییەکان</span>
                </CardTitle>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="گەڕان..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">هەموو جۆرەکان</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{formatActivityType(type)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">Loading activities...</p>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">هیچ چالاکییەک نەدۆزرایەوە</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300 hover:shadow-lg",
                        "bg-gradient-to-r",
                        getActivityColor(log.type)
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          {getActivityIcon(log.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-white font-semibold mb-1">{log.description}</p>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-gray-300">
                                  👤 {log.performedByName}
                                </span>
                                <span className="text-gray-400">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {new Date(log.timestamp).toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2">
                                {formatActivityType(log.type)}
                              </div>
                              {log.amount && (
                                <p className="text-lg font-black text-white">
                                  {log.amount.toLocaleString()} {log.currency}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
