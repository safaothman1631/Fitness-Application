"use client"

import { useState, useEffect } from "react"
import FitproLayout from "@/components/fitpro-layout"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, Activity, User, FileText, Key, Dumbbell, 
  Settings, Database, Shield, Clock, Filter, Download,
  UserPlus, Edit, Trash2, RefreshCw, Save, LogIn, LogOut
} from "lucide-react"
import { toast } from "sonner"

interface ActivityLog {
  id: string
  userId: string
  userName: string
  userRole: string
  action: string
  details: string
  targetType?: string
  targetId?: string
  targetName?: string
  timestamp: string
}

export default function ActivityLogsPage() {
  const { t } = useLanguage()
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterAction, setFilterAction] = useState("all")

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/activity-logs?limit=100')
      if (response.ok) {
        const data = await response.json()
        setLogs(data)
      } else {
        toast.error("Failed to load activity logs")
      }
    } catch (error) {
      console.error("Error fetching logs:", error)
      toast.error("Error loading activity logs")
    } finally {
      setLoading(false)
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes('create')) return <UserPlus className="w-4 h-4" />
    if (action.includes('update') || action.includes('edit')) return <Edit className="w-4 h-4" />
    if (action.includes('delete')) return <Trash2 className="w-4 h-4" />
    if (action.includes('backup')) return <Database className="w-4 h-4" />
    if (action.includes('login')) return <LogIn className="w-4 h-4" />
    if (action.includes('logout')) return <LogOut className="w-4 h-4" />
    if (action.includes('assign')) return <UserPlus className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  const getActionColor = (action: string) => {
    if (action.includes('create')) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (action.includes('update') || action.includes('edit')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    if (action.includes('delete')) return 'bg-red-500/20 text-red-400 border-red-500/30'
    if (action.includes('backup')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    if (action.includes('assign')) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }

  const getRoleColor = (role: string) => {
    if (role === 'superadmin') return 'bg-red-500/20 text-red-400 border-red-500/30'
    if (role === 'admin') return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    if (role === 'trainer') return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetName?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = filterRole === 'all' || log.userRole === filterRole
    const matchesAction = filterAction === 'all' || log.action.includes(filterAction)

    return matchesSearch && matchesRole && matchesAction
  })

  return (
    <FitproLayout role="owner">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-600/5 border-2 border-cyan-500/50 p-8 mb-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/40 to-blue-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {t("activityLogs")}
                  </span>
                </h1>
                <p className="text-gray-400">Monitor all system activities and changes</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <Card className="bg-slate-900/70 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Total Activities</p>
                      <p className="text-2xl font-bold text-white">{logs.length}</p>
                    </div>
                    <Activity className="w-8 h-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Today</p>
                      <p className="text-2xl font-bold text-white">
                        {logs.filter(log => {
                          const logDate = new Date(log.timestamp).toDateString()
                          const today = new Date().toDateString()
                          return logDate === today
                        }).length}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">Superadmin Actions</p>
                      <p className="text-2xl font-bold text-white">
                        {logs.filter(log => log.userRole === 'superadmin').length}
                      </p>
                    </div>
                    <Shield className="w-8 h-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/70 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">This Week</p>
                      <p className="text-2xl font-bold text-white">
                        {logs.filter(log => {
                          const logDate = new Date(log.timestamp)
                          const weekAgo = new Date()
                          weekAgo.setDate(weekAgo.getDate() - 7)
                          return logDate >= weekAgo
                        }).length}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/70 border-slate-800 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white"
                />
              </div>

              {/* Role Filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="h-12 px-4 rounded-lg bg-slate-800/50 border border-slate-700 text-white"
              >
                <option value="all">All Roles</option>
                <option value="superadmin">Superadmin</option>
                <option value="admin">Admin</option>
                <option value="trainer">Trainer</option>
                <option value="user">User</option>
              </select>

              {/* Action Filter */}
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="h-12 px-4 rounded-lg bg-slate-800/50 border border-slate-700 text-white"
              >
                <option value="all">All Actions</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="assign">Assign</option>
                <option value="backup">Backup</option>
                <option value="login">Login</option>
              </select>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={fetchLogs}
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs */}
        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Recent Activities ({filteredLogs.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Loading activities...</p>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No activities found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${getActionColor(log.action)}`}>
                          {getActionIcon(log.action)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{log.userName}</span>
                            <Badge className={getRoleColor(log.userRole)}>
                              {log.userRole}
                            </Badge>
                            <Badge className={getActionColor(log.action)}>
                              {log.action.replace(/_/g, ' ')}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-300 text-sm mb-1">{log.details}</p>
                          
                          {log.targetName && (
                            <p className="text-gray-500 text-xs">
                              Target: <span className="text-cyan-400">{log.targetName}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">{formatTimestamp(log.timestamp)}</p>
                        <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
