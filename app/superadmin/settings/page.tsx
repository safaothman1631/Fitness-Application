"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Lock, Shield, Bell, Monitor, Palette, Globe, Zap, Save, Download, Upload } from "lucide-react"
import { useState } from "react"

export default function SuperAdminSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400 text-sm">Customize your preferences and security</p>
            </div>
          </div>

          {/* Security Settings */}
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Two-Factor Authentication</p>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                </label>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/30">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  Change Password
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Current Password</Label>
                    <Input type="password" placeholder="Enter current password" className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">New Password</Label>
                    <Input type="password" placeholder="Enter new password" className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label className="text-gray-400 text-sm mb-2 block">Confirm Password</Label>
                    <Input type="password" placeholder="Confirm new password" className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <Bell className="w-6 h-6 text-yellow-400" />
                  <div>
                    <p className="text-white font-semibold">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Receive alerts and updates</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-2">
                {[
                  { label: "Security Alerts", checked: true },
                  { label: "System Updates", checked: true },
                  { label: "User Activities", checked: false },
                  { label: "Database Changes", checked: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/20">
                    <span className="text-gray-300">{item.label}</span>
                    <input type="checkbox" defaultChecked={item.checked} className="w-5 h-5 text-cyan-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <Monitor className="w-6 h-6 text-pink-400" />
                  <div>
                    <p className="text-white font-semibold">Dark Mode</p>
                    <p className="text-gray-400 text-sm">Use dark theme</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                </label>
              </div>

              <div>
                <Label className="text-gray-400 text-sm mb-3 block">Theme Color</Label>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    "from-cyan-500 to-blue-600",
                    "from-purple-500 to-pink-600",
                    "from-green-500 to-emerald-600",
                    "from-orange-500 to-red-600",
                    "from-yellow-500 to-orange-600",
                  ].map((gradient, idx) => (
                    <button 
                      key={idx}
                      className={`h-12 rounded-xl bg-gradient-to-r ${gradient} hover:scale-110 transition-transform ${idx === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Language</Label>
                <select className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3">
                  <option>English</option>
                  <option>کوردی (Kurdish)</option>
                  <option>العربية (Arabic)</option>
                  <option>Türkçe (Turkish)</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Time Zone</Label>
                <select className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3">
                  <option>GMT+3 (Baghdad)</option>
                  <option>GMT+0 (London)</option>
                  <option>GMT+1 (Paris)</option>
                  <option>GMT-5 (New York)</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-2 block">Date Format</Label>
                <select className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-3">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Download className="w-4 h-4 mr-2" />
                Export My Data
              </Button>
              <Button className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Upload className="w-4 h-4 mr-2" />
                Import Settings
              </Button>
              <Button className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30">
                <Shield className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
            </CardContent>
          </Card>

          {/* Save All Button */}
          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg py-6 text-lg">
            <Save className="w-5 h-5 mr-2" />
            Save All Settings
          </Button>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
