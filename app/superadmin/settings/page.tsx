"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Save, Lock, Settings, Shield, Database } from "lucide-react"

export default function SuperAdminSettings() {
  return (
    <FitproLayout role="superadmin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400">Configure system-wide settings and security</p>
        </div>

        {/* Account Security */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Account Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Current Password</Label>
              <Input type="password" placeholder="Enter current password" className="fitpro-input rounded-xl" />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">New Password</Label>
              <Input type="password" placeholder="Enter new password" className="fitpro-input rounded-xl" />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">Confirm Password</Label>
              <Input type="password" placeholder="Confirm new password" className="fitpro-input rounded-xl" />
            </div>
            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Lock className="w-4 h-4" />
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="w-5 h-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Site Name</Label>
              <Input defaultValue="FitPro System" className="fitpro-input rounded-xl" />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Site URL</Label>
              <Input defaultValue="https://fitpro.com" className="fitpro-input rounded-xl" />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Support Email</Label>
              <Input defaultValue="support@fitpro.com" className="fitpro-input rounded-xl" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Maintenance Mode</p>
                <p className="text-gray-400 text-sm">Prevent user access during maintenance</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-slate-600 rounded-xl">
                Create Backup
              </Button>
              <Button variant="outline" className="border-slate-600 rounded-xl">
                View Backups
              </Button>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4">
              <p className="text-white font-semibold mb-2">Last Backup</p>
              <p className="text-gray-400 text-sm">2024-11-09 at 02:00 AM</p>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Backup Frequency</Label>
              <select className="fitpro-input rounded-xl w-full py-2">
                <option>Daily</option>
                <option selected>Hourly</option>
                <option>Weekly</option>
              </select>
            </div>

            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Save className="w-4 h-4" />
              Save Backup Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="fitpro-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm">Enable 2FA for admin accounts</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">Force HTTPS</p>
                <p className="text-gray-400 text-sm">Enforce secure connections</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Session Timeout (minutes)</Label>
              <Input defaultValue="30" type="number" className="fitpro-input rounded-xl" />
            </div>

            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Save className="w-4 h-4" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
