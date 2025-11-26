"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Mail, Phone, MapPin, Zap, Save, Heart, User } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { AnimatedButton } from "@/components/ui/animated-button"
import { useState, useEffect } from "react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"

export default function UserProfile() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    height: "",
    weight: "",
    goal: "",
    activityLevel: "",
    membership: "Free",
    role: "user"
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) {
          console.error("No user ID found")
          setLoading(false)
          return
        }

        const userDoc = await getDoc(doc(db, "users", userId))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            height: data.height || "",
            weight: data.weight || "",
            goal: data.goal || "",
            activityLevel: data.activityLevel || "",
            membership: data.membership || "Free",
            role: data.role || "user"
          })
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) throw new Error("No user ID")

      const userRef = doc(db, "users", userId)
      await updateDoc(userRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        location: userData.location,
        height: userData.height,
        weight: userData.weight,
        goal: userData.goal,
        activityLevel: userData.activityLevel,
      })

      toast.success(t("profileUpdated") || "Profile updated successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <FitproLayout role="user">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading profile...</p>
          </div>
        </div>
      </FitproLayout>
    )
  }

  const initials = userData.name 
    ? userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : userData.email?.[0]?.toUpperCase() || "U"

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
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 text-3xl text-white font-bold transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-blue-400">
                {userData.name || userData.email}
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                {userData.membership === "Pro" ? t("premiumMember") : t("freeMember") || "Free Member"}
              </p>
              {userData.membership === "Pro" && (
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-semibold mb-4">
                  👑 Pro
                </span>
              )}
              <div className="space-y-2 text-left text-sm mt-4">
                {userData.phone && (
                  <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-1">
                    <Phone className="w-4 h-4" />
                    {userData.phone}
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-1">
                  <Mail className="w-4 h-4" />
                  {userData.email}
                </div>
                {userData.location && (
                  <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 hover:text-blue-400 hover:translate-x-1">
                    <MapPin className="w-4 h-4" />
                    {userData.location}
                  </div>
                )}
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
                  <Input 
                    value={userData.firstName} 
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                    className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" 
                  />
                </div>
                <div className="transition-all duration-300 focus-within:scale-105">
                  <Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
                  <Input 
                    value={userData.lastName} 
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                    className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" 
                  />
                </div>
              </div>

              <div className="transition-all duration-300 focus-within:scale-105">
                <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                <Input 
                  value={userData.email} 
                  disabled
                  className="fitpro-input rounded-xl opacity-60 cursor-not-allowed" 
                  type="email" 
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div className="transition-all duration-300 focus-within:scale-105">
                <Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
                <Input 
                  value={userData.phone} 
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" 
                />
              </div>

              <div className="transition-all duration-300 focus-within:scale-105">
                <Label className="text-gray-300 mb-2 block">Location</Label>
                <Input 
                  value={userData.location} 
                  onChange={(e) => setUserData({...userData, location: e.target.value})}
                  className="fitpro-input rounded-xl transition-all duration-300 focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:scale-105" 
                />
              </div>

              <AnimatedButton 
                full 
                className="gap-2"
                onClick={handleSaveProfile}
                disabled={saving}
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : t("saveChanges")}
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
                <Input 
                  value={userData.height} 
                  onChange={(e) => setUserData({...userData, height: e.target.value})}
                  className="fitpro-input rounded-xl" 
                  type="number"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">{t("weight")} (kg)</Label>
                <Input 
                  value={userData.weight} 
                  onChange={(e) => setUserData({...userData, weight: e.target.value})}
                  className="fitpro-input rounded-xl" 
                  type="number"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">{t("primaryGoal")}</Label>
              <select 
                value={userData.goal}
                onChange={(e) => setUserData({...userData, goal: e.target.value})}
                className="fitpro-input rounded-xl w-full py-2"
              >
                <option value="buildMuscle">{t("buildMuscle")}</option>
                <option value="weightLoss">{t("weightLoss")}</option>
                <option value="endurance">{t("endurance")}</option>
                <option value="flexibility">{t("flexibility")}</option>
              </select>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">{t("activityLevel")}</Label>
              <select 
                value={userData.activityLevel}
                onChange={(e) => setUserData({...userData, activityLevel: e.target.value})}
                className="fitpro-input rounded-xl w-full py-2"
              >
                <option value="sedentary">{t("sedentary")}</option>
                <option value="lightlyActive">{t("lightlyActive")}</option>
                <option value="moderatelyActive">{t("moderatelyActive")}</option>
                <option value="veryActive">{t("veryActive")}</option>
              </select>
            </div>

            <AnimatedButton 
              full 
              className="gap-2"
              onClick={handleSaveProfile}
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : t("saveFitnessInfo")}
            </AnimatedButton>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
