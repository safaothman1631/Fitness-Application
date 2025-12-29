"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, Camera } from "lucide-react"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { toast } from "sonner"

export default function AdminPhysiotherapistProfilePage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    licenseNumber: "",
    bio: "",
    joinDate: null as any
  })
  const [editData, setEditData] = useState(profileData)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const userId = auth.currentUser?.uid
      if (!userId) return

      const userDoc = await getDoc(doc(db, "users", userId))
      if (userDoc.exists()) {
        const data = userDoc.data()
        const profile = {
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          specialization: data.specialization || "",
          department: data.department || "",
          licenseNumber: data.licenseNumber || "",
          bio: data.bio || "",
          joinDate: data.createdAt
        }
        setProfileData(profile)
        setEditData(profile)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const userId = auth.currentUser?.uid
      if (!userId) return

      await updateDoc(doc(db, "users", userId), {
        name: editData.name,
        phone: editData.phone,
        specialization: editData.specialization,
        department: editData.department,
        licenseNumber: editData.licenseNumber,
        bio: editData.bio,
        updatedAt: new Date()
      })

      setProfileData(editData)
      setEditing(false)
      toast.success(t("profileUpdated") || "Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString()
  }

  if (loading) {
    return (
      <AuthGuard allowedRoles={["admin-physiotherapist"]}>
        <SidebarSleek role="admin-physiotherapist">
          <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="space-y-12 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B2E3] to-[#73E8FF] flex items-center justify-center shadow-lg shadow-[#10B2E3]/30">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{t("myProfile")}</h1>
                <p className="text-gray-400 text-sm">{t("adminPhysiotherapist")}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {!editing ? (
                <Button
                  onClick={() => setEditing(true)}
                  className="bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] hover:from-[#0E9FCC] hover:to-[#5DD5EE] text-white"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {t("editProfile")}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setEditData(profileData)
                      setEditing(false)
                    }}
                    variant="outline"
                    className="border-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? t("saving") : t("saveChanges")}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Avatar & Basic Info */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl lg:col-span-1">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-cyan-500/30">
                      {profileData.name.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">{profileData.name}</h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">{t("adminPhysiotherapist")}</span>
                  </div>

                  <div className="space-y-3 mt-6 text-left">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-400">{t("email")}</p>
                        <p className="text-sm text-white">{profileData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-400">{t("joinedDate")}</p>
                        <p className="text-sm text-white">{formatDate(profileData.joinDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    {t("personalInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">{t("fullName")}</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">{t("phone")}</label>
                      {editing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.phone || "-"}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    {t("professionalInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">{t("specialization")}</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editData.specialization}
                          onChange={(e) => setEditData({ ...editData, specialization: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.specialization || "-"}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">{t("department")}</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editData.department}
                          onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.department || "-"}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm text-slate-400 mb-2 block">{t("licenseNumber")}</label>
                      {editing ? (
                        <input
                          type="text"
                          value={editData.licenseNumber}
                          onChange={(e) => setEditData({ ...editData, licenseNumber: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium">{profileData.licenseNumber || "-"}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bio */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">{t("bio")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {editing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none resize-none"
                      placeholder={t("bioPlaceholder") || "Tell us about yourself..."}
                    />
                  ) : (
                    <p className="text-slate-300">{profileData.bio || t("noBioYet") || "No bio yet"}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
