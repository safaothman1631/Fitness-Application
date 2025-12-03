"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Shield, Crown, Save, Camera, Lock, Zap } from "lucide-react"
import { useState } from "react"

export default function SuperAdminProfile() {
  const { t } = useLanguage()
  const [editing, setEditing] = useState(false)

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("myProfile")}</h1>
              <p className="text-gray-400 text-sm">{t("manageAccountInfo")}</p>
            </div>
          </div>

          {/* Profile Header Card */}
          <Card className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-4xl text-white font-bold shadow-2xl shadow-purple-500/50">
                    SA
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-1">{t("systemAdministrator")}</h2>
                  <p className="text-gray-400 mb-4">admin@fitpro.com</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-semibold flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      {t("superadmin")}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-semibold">
                      {t("active")}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-semibold">
                      {t("fullAccess")}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => setEditing(!editing)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg"
                >
                  {editing ? t("cancelEdit") : t("editProfile")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  {t("personalInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("firstName")}</Label>
                  <Input 
                    defaultValue="System" 
                    disabled={!editing}
                    className="bg-slate-800/50 border-slate-700 text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("lastName")}</Label>
                  <Input 
                    defaultValue="Administrator" 
                    disabled={!editing}
                    className="bg-slate-800/50 border-slate-700 text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("emailAddress")}</Label>
                  <Input 
                    defaultValue="admin@fitpro.com" 
                    disabled
                    className="bg-slate-800/50 border-slate-700 text-white opacity-60 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">{t("emailCannotChange")}</p>
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("phoneNumber")}</Label>
                  <Input 
                    defaultValue="+964 750 123 4567" 
                    disabled={!editing}
                    className="bg-slate-800/50 border-slate-700 text-white disabled:opacity-100"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  {t("additionalDetails")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("department")}</Label>
                  <Input 
                    defaultValue="System Administration" 
                    disabled={!editing}
                    className="bg-slate-800/50 border-slate-700 text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("location")}</Label>
                  <Input 
                    defaultValue="Erbil, Kurdistan" 
                    disabled={!editing}
                    className="bg-slate-800/50 border-slate-700 text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("timezone")}</Label>
                  <Input 
                    defaultValue="GMT+3 (Baghdad)" 
                    disabled={!editing}
                    className="bg-slate-800/50 border-slate-700 text-white disabled:opacity-100"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-2 block">{t("languagePreference")}</Label>
                  <select 
                    disabled={!editing}
                    className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-3 py-2 disabled:opacity-100"
                  >
                    <option>English</option>
                    <option>Kurdish</option>
                    <option>Arabic</option>
                    <option>Turkish</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">2 Years</p>
                <p className="text-xs text-gray-400">{t("memberSince")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1,234</p>
                <p className="text-xs text-gray-400">{t("actions")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-gray-400">{t("securitySettings")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
              <CardContent className="p-4 text-center">
                <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">2FA</p>
                <p className="text-xs text-gray-400">{t("enabled")}</p>
              </CardContent>
            </Card>
          </div>

          {/* Admin Privileges */}
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
            <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  {t("adminPrivileges")}
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Full System Access", color: "text-red-400" },
                  { icon: User, label: "User Management", color: "text-blue-400" },
                  { icon: Lock, label: "Security Configuration", color: "text-purple-400" },
                  { icon: Zap, label: "System Control", color: "text-yellow-400" },
                  { icon: Mail, label: "Communication Tools", color: "text-green-400" },
                  { icon: Calendar, label: "Analytics & Reports", color: "text-cyan-400" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-white font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          {editing && (
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg py-6 text-lg">
              <Save className="w-5 h-5 mr-2" />
              {t("saveChanges")}
            </Button>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>  )
}
