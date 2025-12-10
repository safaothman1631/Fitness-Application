"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Key, Plus, Copy, Trash2, Clock, CheckCircle, XCircle, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"

export default function AccessKeysPage() {
  const { t } = useLanguage()
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [keys, setKeys] = useState<any[]>([])

  useEffect(() => {
    fetchKeys()
  }, [])

  const fetchKeys = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/access-keys')
      if (response.ok) {
        const data = await response.json()
        setKeys(data)
      }
    } catch (error) {
      console.error('Error fetching keys:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/access-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Premium',
          maxUses: 10,
          duration: 365
        })
      })
      
      if (response.ok) {
        alert('✅ Access key generated successfully!')
        fetchKeys()
      } else {
        alert('❌ Failed to generate key')
      }
    } catch (error) {
      console.error('Error generating key:', error)
      alert('❌ Error generating key')
    } finally {
      setGenerating(false)
    }
  }

  const handleDelete = async (keyId: string) => {
    if (!confirm('⚠️ Are you sure you want to delete this key?')) return
    
    try {
      const response = await fetch(`/api/access-keys?id=${keyId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        alert('✅ Key deleted successfully!')
        fetchKeys()
      } else {
        alert('❌ Failed to delete key')
      }
    } catch (error) {
      console.error('Error deleting key:', error)
      alert('❌ Error deleting key')
    }
  }

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    alert('✅ Key copied to clipboard!')
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="superadmin">
        <SidebarSleek role="superadmin">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">{t("loading")}...</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{t("accessKeysPage")}</h1>
                  <p className="text-gray-400 text-sm">{t("generateAndManageKeys")}</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={generating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              {generating ? t("generating") : t("generateNewKey")}
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Key className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">56</p>
                    <p className="text-xs text-gray-400">{t("totalKeys")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">32</p>
                    <p className="text-xs text-gray-400">{t("active")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">15</p>
                    <p className="text-xs text-gray-400">{t("used")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">9</p>
                    <p className="text-xs text-gray-400">{t("expired")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Generator Card */}
          <Card className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{t("quickKeyGenerator")}</h3>
                  <p className="text-gray-400 text-sm mb-4">{t("generateKeysInstantly")}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      {t("trialOneUse")}
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      {t("standardFiveUses")}
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      {t("premiumTenUses")}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keys Table */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-400" />
                {t("allAccessKeys")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {keys.length === 0 ? (
                <div className="text-center py-12">
                  <Key className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No access keys found</p>
                  <p className="text-gray-500 text-sm">Generate your first key to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">{t("keyColumn")}</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">{t("typeColumn")}</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">{t("usesColumn")}</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">{t("statusColumn")}</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">{t("expiresColumn")}</th>
                        <th className="text-right text-gray-400 text-sm font-semibold p-3">{t("actionsColumn")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keys.map((key) => (
                        <tr key={key.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <code className="text-cyan-400 font-mono text-sm bg-slate-800/50 px-3 py-1 rounded-lg">
                                {key.key}
                              </code>
                              <button 
                                onClick={() => handleCopy(key.key)}
                                className="text-gray-400 hover:text-cyan-400 transition-colors"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              key.type === "Premium" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" :
                              key.type === "Standard" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                              "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                            }`}>
                              {key.type}
                            </span>
                          </td>
                          <td className="p-3 text-gray-400 font-mono text-sm">{key.usedCount || 0}/{key.maxUses || 0}</td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              key.status === "active" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                              key.status === "used" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                              "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}>
                              {key.status}
                            </span>
                          </td>
                          <td className="p-3 text-gray-400 text-sm">
                            {key.expiryDate ? new Date(key.expiryDate).toLocaleDateString() : '-'}
                          </td>
                          <td className="p-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDelete(key.id)}
                              className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
