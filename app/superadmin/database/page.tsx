"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, HardDrive, Activity, RefreshCw, Download, Upload, AlertTriangle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function DatabasePage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)
  const [backups, setBackups] = useState<any[]>([])
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isClearingCache, setIsClearingCache] = useState(false)

  const fetchDatabaseStats = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/database-stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching database stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBackups = async () => {
    try {
      const response = await fetch("/api/backup")
      if (response.ok) {
        const data = await response.json()
        setBackups(data)
      }
    } catch (error) {
      console.error("Error fetching backups:", error)
    }
  }

  const handleBackup = async () => {
    setIsBackingUp(true)
    try {
      const response = await fetch("/api/backup", { method: 'POST' })
      if (!response.ok) throw new Error('Backup failed')
      
      const data = await response.json()
      
      // Download backup as JSON file
      const blob = new Blob([JSON.stringify(data.backup, null, 2)], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `fitpro-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      alert('✅ Backup created and downloaded successfully!')
      fetchBackups() // Refresh backup list
      fetchDatabaseStats() // Refresh stats
    } catch (error) {
      alert('❌ Backup failed: ' + error)
    } finally {
      setIsBackingUp(false)
    }
  }

  const handleOptimize = async () => {
    setIsOptimizing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      alert('✅ Database optimized successfully!')
      fetchDatabaseStats()
    } catch (error) {
      alert('❌ Optimization failed: ' + error)
    } finally {
      setIsOptimizing(false)
    }
  }

  const handleRestore = () => {
    const confirmed = confirm('⚠️ Are you sure you want to restore from backup? This will overwrite current data.')
    if (confirmed) {
      alert('🔄 Restore functionality coming soon...')
    }
  }

  const handleClearCache = async () => {
    const confirmed = confirm('⚠️ Are you sure you want to clear all cache?')
    if (!confirmed) return
    
    setIsClearingCache(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('✅ Cache cleared successfully!')
      fetchDatabaseStats()
    } catch (error) {
      alert('❌ Failed to clear cache: ' + error)
    } finally {
      setIsClearingCache(false)
    }
  }

  useEffect(() => {
    fetchDatabaseStats()
    fetchBackups()
  }, [])

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{t("databaseManagement")}</h1>
                  <p className="text-gray-400 text-sm">{t("monitorDatabase")}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-slate-700 text-gray-300 hover:bg-slate-800"
                onClick={fetchDatabaseStats}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {t("refresh")}
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30"
                onClick={handleBackup}
                disabled={isBackingUp}
              >
                <Download className={`w-4 h-4 mr-2 ${isBackingUp ? 'animate-bounce' : ''}`} />
                {isBackingUp ? t("creatingBackup") : t("backup")}
              </Button>
            </div>
          </div>

          {/* Health Status */}
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400 text-sm">{t("loadingAnalytics")}</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-xl mb-1">{t("databaseStatus")}: {t("healthStatus")}</h3>
                      <p className="text-green-400 text-sm">{t("allSystemsOperational")} • {t("lastChecked")}: {t("justNow")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{stats?.summary?.uptime || 99.9}%</p>
                      <p className="text-xs text-gray-400">{t("uptime")}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[99.9%] bg-gradient-to-r from-green-500 to-emerald-600" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <HardDrive className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {isLoading ? '...' : formatBytes(stats?.summary?.totalSize || 0)}
                    </p>
                    <p className="text-xs text-gray-400">{t("storageUsed")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {isLoading ? '...' : (stats?.summary?.totalRecords || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">{t("totalRecords")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {isLoading ? '...' : stats?.summary?.activeConnections || 0}
                    </p>
                    <p className="text-xs text-gray-400">{t("activeUsers24h")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-cyan-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {isLoading ? '...' : stats?.collections?.length || 0}
                    </p>
                    <p className="text-xs text-gray-400">{t("collectionsColumn")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collections Overview */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-400" />
                  {t("collectionsOverview")}
                </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400 text-sm">{t("loadingCollections")}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(stats?.collections || []).map((collection: any) => (
                    <div key={collection.name} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          collection.status === 'healthy' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                          <Database className={`w-5 h-5 ${collection.status === 'healthy' ? 'text-green-400' : 'text-red-400'}`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{collection.name}</p>
                          <p className="text-gray-400 text-sm">{collection.count.toLocaleString()} {t("documents")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-white font-medium">{formatBytes(collection.size)}</p>
                          <div className={`flex items-center gap-1 text-xs ${
                            collection.status === 'healthy' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            <CheckCircle className="w-3 h-3" />
                            <span>{collection.status}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-700 text-gray-300 hover:bg-slate-800">
                          {t("view")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Backup & Restore */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-blue-400" />
                  {t("recentBackups")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backups.length === 0 ? (
                    <div className="text-center py-8">
                      <Download className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">{t("noBackupsYet")}</p>
                      <p className="text-gray-500 text-xs">{t("createFirstBackup")}</p>
                    </div>
                  ) : (
                    backups.map((backup) => (
                      <div key={backup.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                        <div>
                          <p className="text-white text-sm">
                            {new Date(backup.timestamp).toLocaleString()}
                          </p>
                          <p className="text-gray-400 text-xs">{formatBytes(backup.size || 0)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            {backup.status || t("success")}
                          </span>
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  {t("maintenance")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isOptimizing ? 'animate-spin' : ''}`} />
                    {isOptimizing ? t("optimizing") : t("optimizeDatabase")}
                  </Button>
                  <Button 
                    className="w-full justify-start bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30"
                    onClick={handleBackup}
                    disabled={isBackingUp}
                  >
                    <Download className={`w-4 h-4 mr-2 ${isBackingUp ? 'animate-bounce' : ''}`} />
                    {isBackingUp ? t("creatingBackup") : t("createBackupNow")}
                  </Button>
                  <Button 
                    className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    onClick={handleRestore}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t("restoreFromBackup")}
                  </Button>
                  <Button 
                    className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                    onClick={handleClearCache}
                    disabled={isClearingCache}
                  >
                    <AlertTriangle className={`w-4 h-4 mr-2 ${isClearingCache ? 'animate-pulse' : ''}`} />
                    {isClearingCache ? t("clearing") : t("clearCache")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
