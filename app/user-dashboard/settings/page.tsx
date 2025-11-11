"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Save, Lock, Bell, Eye, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function UserSettings() {
  const { t } = useLanguage()
  return (
    <FitproLayout role="user">
      <div className="space-y-8 p-2">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white mb-2">{t("settings")}</h1>
          <p className="text-gray-400">{t("profileVisibilityDesc")}</p>
        </header>

        {/* Account Security */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t("accountSecurityTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300 mb-2 block">{t("currentPassword")}</Label>
              <Input type="password" placeholder={t("enterCurrentPassword")!} className="fitpro-input rounded-xl" />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">{t("newPassword")}</Label>
              <Input type="password" placeholder={t("enterNewPassword")!} className="fitpro-input rounded-xl" />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">{t("confirmPassword")}</Label>
              <Input type="password" placeholder={t("confirmNewPassword")!} className="fitpro-input rounded-xl" />
            </div>
            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Lock className="w-4 h-4" />
              {t("updatePassword")}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t("notificationPreferencesTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("workoutReminders")}</p>
                <p className="text-gray-400 text-sm">{t("workoutRemindersDesc")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("progressUpdates")}</p>
                <p className="text-gray-400 text-sm">{t("progressUpdatesDesc")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("achievementBadges")}</p>
                <p className="text-gray-400 text-sm">{t("achievementBadgesDesc")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("emailNotifications")}</p>
                <p className="text-gray-400 text-sm">{t("emailNotificationsDesc")}</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Save className="w-4 h-4" />
              {t("savePreferences")}
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t("privacySettingsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("profileVisibility")}</p>
                <p className="text-gray-400 text-sm">{t("profileVisibilityDesc")}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
              <div>
                <p className="text-white font-semibold">{t("showProgress")}</p>
                <p className="text-gray-400 text-sm">{t("showProgressDesc")}</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <Button className="w-full fitpro-button rounded-xl gap-2">
              <Save className="w-4 h-4" />
              {t("savePrivacySettings")}
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="fitpro-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">{t("dangerZone")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
              {t("deleteAccount")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
