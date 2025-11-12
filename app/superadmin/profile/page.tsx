"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Mail, Shield, Save } from "lucide-react"

export default function SuperAdminProfile() {
  const { t } = useLanguage()
  return (
    <FitproLayout role="superadmin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t("adminProfile")}</h1>
          <p className="text-gray-400">{t("fullSystemControl")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="fitpro-card md:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4 text-3xl text-red-400 font-bold">
                SA
              </div>
              <h2 className="text-xl font-bold text-white mb-1">System Administrator</h2>
              <p className="text-gray-400 text-sm mb-4">{t("superadmin")}</p>
              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  admin@fitpro.com
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-4 h-4" />
                  Full System Access
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile */}
          <Card className="fitpro-card md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">{t("editAdminProfile")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("firstName")}</Label>
                  <Input defaultValue="System" className="fitpro-input rounded-xl" />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
                  <Input defaultValue="Administrator" className="fitpro-input rounded-xl" />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                <Input defaultValue="admin@fitpro.com" className="fitpro-input rounded-xl" type="email" />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("department")}</Label>
                <Input defaultValue="System Administration" className="fitpro-input rounded-xl" />
              </div>

              <AnimatedButton full className="rounded-xl gap-2">
                <Save className="w-4 h-4" />
                {t("saveChanges")}
              </AnimatedButton>
            </CardContent>
          </Card>
        </div>

        {/* Admin Rights Info */}
        <Card className="fitpro-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-400">{t("administratorPrivileges")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Full system access and control</li>
              <li>✓ User and admin management</li>
              <li>✓ Access key generation and management</li>
              <li>✓ System settings configuration</li>
              <li>✓ Database and security access</li>
              <li>✓ Analytics and reporting</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
