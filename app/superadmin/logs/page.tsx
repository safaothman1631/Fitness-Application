"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Search, Filter, Download, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function SystemLogsPage() {
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
      setIsLoading(true)
      const url = filterType ? `/api/logs?type=${filterType}` : '/api/logs'
      const response = await fetch(url)
      const data = await response.json()
      
      if (response.ok) {
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
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">System Logs</h1>
                  <p className="text-gray-400 text-sm">Monitor system events and activities</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleExport}
              disabled={logs.length === 0}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/30 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Info className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats?.info || 0}</p>
                    <p className="text-xs text-gray-400">Info</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats?.success || 0}</p>
                    <p className="text-xs text-gray-400">Success</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats?.warning || 0}</p>
                    <p className="text-xs text-gray-400">Warnings</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats?.error || 0}</p>
                    <p className="text-xs text-gray-400">Errors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filter */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterType(filterType === 'info' ? null : 'info')}
                    className={`border-blue-500/30 text-blue-400 hover:bg-blue-500/10 ${filterType === 'info' ? 'bg-blue-500/20' : ''}`}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Info
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterType(filterType === 'warning' ? null : 'warning')}
                    className={`border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 ${filterType === 'warning' ? 'bg-yellow-500/20' : ''}`}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Warnings
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilterType(filterType === 'error' ? null : 'error')}
                    className={`border-red-500/30 text-red-400 hover:bg-red-500/10 ${filterType === 'error' ? 'bg-red-500/20' : ''}`}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Errors
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logs List */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-400" />
                Recent Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No logs found</p>
                </div>
              ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-4 rounded-xl border ${getLogColor(log.type)} hover:scale-[1.01] transition-transform`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getLogIcon(log.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className="text-white font-medium">{log.message}</p>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{formatTimestamp(log.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>User: {log.user}</span>
                          <span>•</span>
                          <span>{log.details}</span>
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
