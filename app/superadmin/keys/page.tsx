"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Key, Plus, Copy, Trash2, Clock, CheckCircle, XCircle, Sparkles } from "lucide-react"
import { useState } from "react"

export default function AccessKeysPage() {
  const [generating, setGenerating] = useState(false)

  const keys = [
    { id: 1, key: "FP-2024-A7B3C9", type: "Premium", uses: "5/10", status: "Active", created: "2024-11-20", expires: "2025-11-20" },
    { id: 2, key: "FP-2024-X8Y2Z4", type: "Standard", uses: "3/5", status: "Active", created: "2024-11-15", expires: "2025-05-15" },
    { id: 3, key: "FP-2024-M5N1P7", type: "Trial", uses: "1/1", status: "Used", created: "2024-11-10", expires: "2024-12-10" },
    { id: 4, key: "FP-2024-Q3R9S2", type: "Premium", uses: "0/10", status: "Active", created: "2024-11-18", expires: "2025-11-18" },
    { id: 5, key: "FP-2024-T6U4V8", type: "Standard", uses: "5/5", status: "Expired", created: "2024-10-01", expires: "2024-11-01" },
  ]

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 1500)
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
                  <h1 className="text-3xl font-bold text-white">Access Keys</h1>
                  <p className="text-gray-400 text-sm">Generate and manage access keys</p>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={generating}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              {generating ? "Generating..." : "Generate New Key"}
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
                    <p className="text-xs text-gray-400">Total Keys</p>
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
                    <p className="text-xs text-gray-400">Active</p>
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
                    <p className="text-xs text-gray-400">Used</p>
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
                    <p className="text-xs text-gray-400">Expired</p>
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
                  <h3 className="text-white font-semibold text-lg mb-2">Quick Key Generator</h3>
                  <p className="text-gray-400 text-sm mb-4">Generate access keys for new members instantly</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      Trial (1 use)
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      Standard (5 uses)
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                      Premium (10 uses)
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
                All Access Keys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left text-gray-400 text-sm font-semibold p-3">Key</th>
                      <th className="text-left text-gray-400 text-sm font-semibold p-3">Type</th>
                      <th className="text-left text-gray-400 text-sm font-semibold p-3">Uses</th>
                      <th className="text-left text-gray-400 text-sm font-semibold p-3">Status</th>
                      <th className="text-left text-gray-400 text-sm font-semibold p-3">Expires</th>
                      <th className="text-right text-gray-400 text-sm font-semibold p-3">Actions</th>
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
                            <button className="text-gray-400 hover:text-cyan-400 transition-colors">
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
                        <td className="p-3 text-gray-400 font-mono text-sm">{key.uses}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            key.status === "Active" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                            key.status === "Used" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                            "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}>
                            {key.status}
                          </span>
                        </td>
                        <td className="p-3 text-gray-400 text-sm">{key.expires}</td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
