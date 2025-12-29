"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Mail, Phone, MapPin, Save, Award, User } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"

export default function TrainerProfile() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    certification: '',
    specialization: '',
    bio: '',
    location: ''
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await fetch(`/api/users?email=${user.email}`)
          if (response.ok) {
            const users = await response.json()
            const currentUser = users.find((u: any) => u.email === user.email)
            const uid = currentUser?.id || currentUser?.uid || user.uid
            setUserId(uid)

            // Populate form with user data
            setFormData({
              firstName: currentUser?.firstName || currentUser?.name?.split(' ')[0] || '',
              lastName: currentUser?.lastName || currentUser?.name?.split(' ')[1] || '',
              email: currentUser?.email || user.email,
              phone: currentUser?.phone || '',
              certification: currentUser?.certification || '',
              specialization: currentUser?.specialization || '',
              bio: currentUser?.bio || '',
              location: currentUser?.location || ''
            })
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
          toast.error('Failed to load profile')
        } finally {
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSave = async () => {
    if (!userId) {
      toast.error('User ID not found')
      return
    }

    setSaving(true)
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        toast.success('Profile updated successfully')
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const getInitials = () => {
    const first = formData.firstName?.charAt(0) || ''
    const last = formData.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || 'TR'
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="trainer">
        <SidebarSleek role="trainer">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">{t("loading")}...</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="trainer">
      <SidebarSleek role="trainer">
        <div className="space-y-12 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("myProfileHeading")}</h1>
              <p className="text-gray-400 text-sm">{t("manageFitnessProfileDesc")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30 md:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4 text-3xl text-white font-bold shadow-lg shadow-rose-500/30">
                  {getInitials()}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{formData.firstName} {formData.lastName}</h2>
                <p className="text-gray-400 text-sm mb-4">{formData.certification || t("certifiedFitnessTrainer")}</p>
                <div className="space-y-3 text-left text-sm">
                  <div className="flex items-center gap-2 text-gray-400 p-2 rounded-lg bg-slate-800/30">
                    <Phone className="w-4 h-4 text-rose-400" />
                    <span>{formData.phone || t("notSet")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 p-2 rounded-lg bg-slate-800/30">
                    <Mail className="w-4 h-4 text-rose-400" />
                    <span className="truncate">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 p-2 rounded-lg bg-slate-800/30">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{formData.location || t("notSet")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Profile */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">{t("editProfile")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">{t("firstName")}</Label>
                    <Input 
                      value={formData.firstName} 
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
                    <Input 
                      value={formData.lastName} 
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                  <Input 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors" 
                    type="email" 
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
                  <Input 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors" 
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">{t("certification")}</Label>
                  <Input 
                    value={formData.certification} 
                    onChange={(e) => setFormData({...formData, certification: e.target.value})}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors" 
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">{t("specialization")}</Label>
                  <Input 
                    value={formData.specialization} 
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors" 
                  />
                </div>

                <Button 
                  onClick={handleSave} 
                  disabled={saving} 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? t("saving") : t("saveChanges")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Professional Information */}
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                {t("professionalInformation")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">{t("location")}</Label>
                <Input 
                  value={formData.location} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-amber-500 transition-colors" 
                  placeholder={t("cityCountry")}
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">{t("bio")}</Label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                  rows={4}
                  placeholder={t("bioPlaceholder")}
                ></textarea>
              </div>
              <Button 
                onClick={handleSave} 
                disabled={saving} 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? t("saving") : t("saveChanges")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
