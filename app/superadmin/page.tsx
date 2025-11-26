"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Key, Activity, TrendingUp, Shield, Zap } from "lucide-react"

export default function SuperAdminPage() {
  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4 shadow-lg shadow-cyan-500/30">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Superadmin Dashboard</h1>
            <p className="text-gray-400">System Management & Control</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Users</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">1,234</p>
                <p className="text-xs text-gray-400">Total Active</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Key className="w-8 h-8 text-purple-400" />
                  <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Keys</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">56</p>
                <p className="text-xs text-gray-400">Access Keys</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Activity className="w-8 h-8 text-green-400" />
                  <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">Active</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">892</p>
                <p className="text-xs text-gray-400">Online Now</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">Growth</span>
                </div>
                <p className="text-3xl font-bold text-white mb-1">+24%</p>
                <p className="text-xs text-gray-400">This Month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  👥 Manage Users
                </button>
                <button className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  🔑 Generate Keys
                </button>
                <button className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  📊 View Reports
                </button>
                <button className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 text-white font-medium hover:scale-95 active:scale-90 transition-transform">
                  ⚙️ Settings
                </button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <h2 className="text-white text-lg font-semibold mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-300">Database</span>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-300">API Server</span>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-300">Storage</span>
                  </div>
                  <span className="text-green-400 text-sm font-semibold">67% Used</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
