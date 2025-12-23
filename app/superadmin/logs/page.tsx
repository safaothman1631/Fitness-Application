"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Search, Filter, Download, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function SystemLogsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [logs, setLogs] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filterType, setFilterType] = useState<string | null>(null)

  useEffect(() => {
    fetchLogs()
  }, [filterType])

  const fetchLogs = async () => {
    try {
      if (typeof window === 'undefined') return
      
      setIsLoading(true)
      const url = filterType ? `/api/logs?type=${filterType}` : '/api/logs'
      const response = await fetch(url)
      
      if (response.ok) {
        const contentType = response.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          console.error('logs API returned non-JSON')
          setIsLoading(false)
          return
        }
        const data = await response.json()
        setLogs(data.logs || [])
        setStats(data.stats || {})
      }
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(logs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `system-logs-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    } catch {
      return timestamp
    }
  }

  const filteredLogs = logs.filter(log => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      log.message?.toLowerCase().includes(query) ||
      log.user?.toLowerCase().includes(query) ||
      log.details?.toLowerCase().includes(query)
    )
  })

  const getLogIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error": return <XCircle className="w-5 h-5 text-red-400" />
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default: return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-500/10 border-green-500/30"
      case "error": return "bg-red-500/10 border-red-500/30"
      case "warning": return "bg-yellow-500/10 border-yellow-500/30"
      default: return "bg-blue-500/10 border-blue-500/30"
    }
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Enhanced Header with Gradient Background */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600/20 via-red-600/20 to-pink-600/20 border border-orange-500/30 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl shadow-orange-500/40 ring-4 ring-orange-400/20">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-200 bg-clip-text text-transparent">
                      {t("systemLogs")}
                    </h1>
                    <p className="text-orange-200 text-sm mt-1">{t("monitorSystemActivity")}</p>
                  </div>
                </div>

                {/* Mini Stats in Header */}
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-300">{stats?.info || 0}</div>
                      <div className="text-[10px] text-blue-200 mt-1">Info</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">{stats?.success || 0}</div>
                      <div className="text-[10px] text-green-200 mt-1">Success</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-300">{stats?.warning || 0}</div>
                      <div className="text-[10px] text-yellow-200 mt-1">Warning</div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-300">{stats?.error || 0}</div>
                      <div className="text-[10px] text-red-200 mt-1">Error</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid with Modern Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-500/5 border-blue-500/40 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Info className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">{stats?.info || 0}</p>
                    <p className="text-xs text-blue-300 font-medium">{t("info")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 via-green-600/10 to-green-500/5 border-green-500/40 hover:border-green-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">{stats?.success || 0}</p>
                    <p className="text-xs text-green-300 font-medium">{t("success")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-yellow-500/5 border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">{stats?.warning || 0}</p>
                    <p className="text-xs text-yellow-300 font-medium">{t("warnings")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/20 via-red-600/10 to-red-500/5 border-red-500/40 hover:border-red-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                    <XCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">{stats?.error || 0}</p>
                    <p className="text-xs text-red-300 font-medium">{t("errors")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filter with Modern Design */}
          <Card className="bg-gradient-to-br from-slate-900/80 via-orange-900/10 to-slate-900/80 border-orange-500/30 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                  <Input
                    placeholder={t("searchLogs")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-gray-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterType(filterType === 'info' ? null : 'info')}
                    className={`border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all ${filterType === 'info' ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20' : ''}`}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    {t("info")}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterType(filterType === 'warning' ? null : 'warning')}
                    className={`border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400/50 transition-all ${filterType === 'warning' ? 'bg-yellow-500/20 border-yellow-400/50 shadow-lg shadow-yellow-500/20' : ''}`}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {t("warnings")}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterType(filterType === 'error' ? null : 'error')}
                    className={`border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-400/50 transition-all ${filterType === 'error' ? 'bg-red-500/20 border-red-400/50 shadow-lg shadow-red-500/20' : ''}`}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {t("errors")}
                  </Button>
                  <Button 
                    onClick={handleExport}
                    disabled={logs.length === 0}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/30 disabled:opacity-50 transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("exportLogs")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logs List with Modern Design */}
          <Card className="bg-gradient-to-br from-slate-900/80 via-orange-900/10 to-slate-900/80 border-orange-500/30 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">
                    {t("allLogs")} ({filteredLogs.length})
                  </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 shadow-lg shadow-orange-500/30"></div>
                  <p className="text-orange-300 mt-4 font-medium">Loading logs...</p>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-orange-400/50" />
                  </div>
                  <p className="text-gray-400 text-lg">{t("noLogsFound")}</p>
                </div>
              ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-4 rounded-xl border ${getLogColor(log.type)} hover:scale-[1.01] transition-all duration-200 hover:shadow-lg`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getLogIcon(log.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className="text-white font-medium">{log.message}</p>
                          <span className="text-xs text-gray-400 whitespace-nowrap font-medium">{formatTimestamp(log.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="font-medium">User: <span className="text-gray-300">{log.user}</span></span>
                          <span>•</span>
                          <span className="text-gray-300">{log.details}</span>
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
