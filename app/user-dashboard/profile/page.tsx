"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Mail, Phone, MapPin, Zap, Save, Heart } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function UserProfile() {
  const { t } = useLanguage()
  return (
    <FitproLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t("myProfileHeading")}</h1>
          <p className="text-gray-400">{t("manageFitnessProfileDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="fitpro-card md:col-span-1 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] group">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-3xl text-blue-400 font-bold transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                JD
              </div>
              <h2 className="text-xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-blue-400">John Doe</h2>
              <p className="text-gray-400 text-sm mb-4">{t("premiumMember")}</p>
              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-1">
                  <Phone className="w-4 h-4" />
                  +92-300-5555555
                </div>
                <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-1">
                  <Mail className="w-4 h-4" />
                  john@example.com
                </div>
                <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-1">
                  <MapPin className="w-4 h-4" />
                  Lahore, Pakistan
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile */}
          <Card className="fitpro-card md:col-span-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <CardHeader>
              <CardTitle className="text-white">{t("editProfile")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="transition-all duration-300 focus-within:scale-105">
                  <Label className="text-gray-300 mb-2 block">{t("firstName")}</Label>
                  <Input defaultValue="John" className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" />
                </div>
                <div className="transition-all duration-300 focus-within:scale-105">
                  <Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
                  <Input defaultValue="Doe" className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" />
                </div>
              </div>

              <div className="transition-all duration-300 focus-within:scale-105">
                <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                <Input defaultValue="john@example.com" className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" type="email" />
              </div>

              <div className="transition-all duration-300 focus-within:scale-105">
                <Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
                <Input defaultValue="+92-300-5555555" className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" />
              </div>

              <div className="transition-all duration-300 focus-within:scale-105">
                <Label className="text-gray-300 mb-2 block">Location</Label>
                <Input defaultValue="Lahore, Pakistan" className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" />
              </div>

              <AnimatedButton full className="gap-2">
                <Save className="w-4 h-4" />
                {t("saveChanges")}
              </AnimatedButton>
            </CardContent>
          </Card>
        </div>

        {/* Fitness Goals */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Heart className="w-5 h-5" />
              {t("fitnessInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">{t("height")} (cm)</Label>
                <Input defaultValue="180" className="fitpro-input rounded-xl" />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">{t("weight")} (kg)</Label>
                <Input defaultValue="82" className="fitpro-input rounded-xl" />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">{t("primaryGoal")}</Label>
              <select className="fitpro-input rounded-xl w-full py-2">
                <option>{t("buildMuscle")}</option>
                <option selected>{t("weightLoss")}</option>
                <option>{t("endurance")}</option>
                <option>{t("flexibility")}</option>
              </select>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">{t("activityLevel")}</Label>
              <select className="fitpro-input rounded-xl w-full py-2">
                <option>{t("sedentary")}</option>
                <option selected>{t("lightlyActive")}</option>
                <option>{t("moderatelyActive")}</option>
                <option>{t("veryActive")}</option>
              </select>
            </div>

            <AnimatedButton full className="gap-2">
              <Save className="w-4 h-4" />
              {t("saveFitnessInfo")}
            </AnimatedButton>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
