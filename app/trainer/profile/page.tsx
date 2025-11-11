"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { LanguageSelector } from "@/components/language-selector"
import { Mail, Phone, MapPin, Save, Award } from "lucide-react"

export default function TrainerProfile() {
  const { t } = useLanguage()
  return (
    <FitproLayout role="trainer">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{t("myProfileHeading")}</h1>
              <p className="text-gray-400">{t("manageFitnessProfileDesc")}</p>
            </div>
            <LanguageSelector />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="fitpro-card md:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 text-3xl text-purple-400 font-bold">
                AC
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Ahmed Chaudhry</h2>
              <p className="text-gray-400 text-sm mb-4">{t("certifiedFitnessTrainer")}</p>
              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  +92-300-9876543
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  ahmed@example.com
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  Islamabad, Pakistan
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile */}
          <Card className="fitpro-card md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Edit Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("firstName")}</Label>
                  <Input defaultValue="Ahmed" className="fitpro-input rounded-xl" />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
                  <Input defaultValue="Chaudhry" className="fitpro-input rounded-xl" />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                <Input defaultValue="ahmed@example.com" className="fitpro-input rounded-xl" type="email" />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
                <Input defaultValue="+92-300-9876543" className="fitpro-input rounded-xl" />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("certification")}</Label>
                <Input defaultValue="ACE Personal Trainer Certification" className="fitpro-input rounded-xl" />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("specialization")}</Label>
                <Input defaultValue="Strength & Conditioning, Nutrition" className="fitpro-input rounded-xl" />
              </div>

              <AnimatedButton full className="rounded-xl gap-2">
                <Save className="w-4 h-4" />
                {t("saveChanges")}
              </AnimatedButton>
            </CardContent>
          </Card>
        </div>

        {/* Experience */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5" />
              {t("professionalInformation")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300 mb-2 block">{t("yearsOfExperience")}</Label>
              <Input defaultValue="6 years" className="fitpro-input rounded-xl" />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">{t("bio")}</Label>
              <textarea
                defaultValue="Experienced fitness trainer dedicated to helping clients achieve their fitness goals through personalized training programs and nutrition guidance."
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
              ></textarea>
            </div>
            <AnimatedButton full className="rounded-xl gap-2">
              <Save className="w-4 h-4" />
              {t("saveProfessionalInfo")}
            </AnimatedButton>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
