"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { Mail, Phone, MapPin, Save, Award } from "lucide-react"
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
      <FitproLayout role="trainer">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="inline-block w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </FitproLayout>
    )
  }

  return (
    <FitproLayout role="trainer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t("myProfileHeading")}</h1>
          <p className="text-gray-400">{t("manageFitnessProfileDesc")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="fitpro-card md:col-span-1">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 text-3xl text-purple-400 font-bold">
                {getInitials()}
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{formData.firstName} {formData.lastName}</h2>
              <p className="text-gray-400 text-sm mb-4">{formData.certification || t("certifiedFitnessTrainer")}</p>
              <div className="space-y-2 text-left text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4" />
                  {formData.phone || 'Not set'}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  {formData.email}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {formData.location || 'Not set'}
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
                  <Input 
                    value={formData.firstName} 
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="fitpro-input rounded-xl" 
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
                  <Input 
                    value={formData.lastName} 
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="fitpro-input rounded-xl" 
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                <Input 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="fitpro-input rounded-xl" 
                  type="email" 
                />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
                <Input 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="fitpro-input rounded-xl" 
                />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("certification")}</Label>
                <Input 
                  value={formData.certification} 
                  onChange={(e) => setFormData({...formData, certification: e.target.value})}
                  className="fitpro-input rounded-xl" 
                />
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">{t("specialization")}</Label>
                <Input 
                  value={formData.specialization} 
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  className="fitpro-input rounded-xl" 
                />
              </div>

              <AnimatedButton onClick={handleSave} disabled={saving} full className="rounded-xl gap-2">
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : t("saveChanges")}
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
              <Label className="text-gray-300 mb-2 block">{t("location")}</Label>
              <Input 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="fitpro-input rounded-xl" 
                placeholder="City, Country"
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">{t("bio")}</Label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            <AnimatedButton onClick={handleSave} disabled={saving} full className="rounded-xl gap-2">
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : t("saveChanges")}
            </AnimatedButton>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
