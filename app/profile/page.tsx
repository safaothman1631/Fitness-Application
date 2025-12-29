"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AuthGuard from "@/components/auth-guard"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Edit2, Save, Camera, Lock, Mail, Phone, Activity, Calendar, Settings as SettingsIcon, LayoutDashboard, Dumbbell, Utensils, HeartPulse, User, Weight, Ruler, Goal, LogOut, Bell, MoreVertical } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { PageTransition } from "@/components/page-transition"
import { User as UserIcon } from "lucide-react"
import { SubscriptionWarning } from "@/components/subscription-warning"
import { SubscriptionInfoCard } from "@/components/subscription-info-card"
import { checkSubscriptionStatus, getSubscriptionExpiry, getUserAccessKey, getUserJoinDate } from "@/lib/subscription"
import { useLanguage } from "@/hooks/useLanguage"
import { BottomNav } from "@/components/bottom-nav"

export default function ProfilePage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { language, setLanguage, t } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isActive: true,
    isExpired: false,
    daysRemaining: 30,
  })
  const [userKey, setUserKey] = useState('')
  const [joinDate, setJoinDate] = useState('')
  const [expiryDate, setExpiryDate] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    joinDate: "",
    weight: 0,
    height: 0,
    goal: "",
    experience: "",
  })
  const [avatar, setAvatar] = useState<string | null>(null)
  const [draft, setDraft] = useState(profile)
  const [draftAvatar, setDraftAvatar] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [changingPassword, setChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const isMobile = useMobile()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Load user data from Firestore
    const loadUserData = async () => {
      setLoading(true)
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) {
          console.error("No user ID found")
          setLoading(false)
          return
        }

        // Fetch user data from Firestore
        const { db } = await import("@/lib/firebase")
        const { doc, getDoc } = await import("firebase/firestore")
        
        const userDoc = await getDoc(doc(db, "users", userId))
        
        if (userDoc.exists()) {
          const userData = userDoc.data()
          
          // Handle createdAt - could be Timestamp, string, or undefined
          let joinDate = ""
          if (userData.createdAt) {
            try {
              if (typeof userData.createdAt === 'string') {
                joinDate = new Date(userData.createdAt).toLocaleDateString()
              } else if (userData.createdAt.toDate) {
                joinDate = new Date(userData.createdAt.toDate()).toLocaleDateString()
              } else {
                joinDate = new Date(userData.createdAt).toLocaleDateString()
              }
            } catch (error) {
              console.error("Error parsing createdAt:", error)
              joinDate = ""
            }
          }
          
          const profileData = {
            name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.name || "User",
            email: userData.email || "",
            phone: userData.phone || "",
            joinDate: joinDate,
            weight: userData.weight || 0,
            height: userData.height || 0,
            goal: userData.goal || "",
            experience: userData.activityLevel || "",
          }
          setProfile(profileData)
          setDraft(profileData)
        }
        
        // Load avatar from localStorage if exists
        const a = localStorage.getItem("profileAvatar")
        if (a) {
          setAvatar(a)
          setDraftAvatar(a)
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()

    // Check subscription status
    const updateSubscriptionData = () => {
      const expiry = getSubscriptionExpiry()
      const status = checkSubscriptionStatus(expiry)
      setSubscriptionStatus(status)
      setUserKey(getUserAccessKey())
      setJoinDate(getUserJoinDate())
      setExpiryDate(expiry)
    }

    // Initial check
    updateSubscriptionData()

    // Listen for storage changes (from test panel or login)
    const handleStorageChange = () => {
      console.log('=== Profile: Storage changed, updating subscription...') // Debug log
      updateSubscriptionData()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check on component mount with small delay to ensure localStorage is ready
    const timer = setTimeout(updateSubscriptionData, 100)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearTimeout(timer)
    }
  }, [])

  const isDirty = JSON.stringify(draft) !== JSON.stringify(profile) || draftAvatar !== avatar

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setDraftAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  const saveProfile = async () => {
    // Validation
    if (!draft.name.trim()) {
      toast({ description: t("pleaseEnterName") || "Please enter your name", variant: "destructive" })
      return
    }
    if (draft.weight < 0 || draft.weight > 500) {
      toast({ description: t("invalidWeight") || "Please enter a valid weight (0-500 kg)", variant: "destructive" })
      return
    }
    if (draft.height < 0 || draft.height > 300) {
      toast({ description: t("invalidHeight") || "Please enter a valid height (0-300 cm)", variant: "destructive" })
      return
    }

    setSaving(true)
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        toast({ description: t("userNotFound") || "Error: User not found", variant: "destructive" })
        setSaving(false)
        return
      }

      // Update Firestore
      const { db } = await import("@/lib/firebase")
      const { doc, updateDoc } = await import("firebase/firestore")
      
      const [firstName, ...lastNameParts] = draft.name.split(" ")
      const lastName = lastNameParts.join(" ")
      
      await updateDoc(doc(db, "users", userId), {
        firstName: firstName || "",
        lastName: lastName || "",
        phone: draft.phone || "",
        weight: draft.weight || 0,
        height: draft.height || 0,
        goal: draft.goal || "",
        activityLevel: draft.experience || "",
      })

      setProfile(draft)
      setAvatar(draftAvatar)
      
      // Save avatar to localStorage
      if (draftAvatar) localStorage.setItem("profileAvatar", draftAvatar)
      
      toast({ description: t("profileSavedSuccessfully") || "Profile saved successfully!" })
      setOpen(false)
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({ description: t("failedToSaveProfile") || "Failed to save profile", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const resetDraft = () => {
    setDraft(profile)
    setDraftAvatar(avatar)
    setOpen(false)
  }

  const changePassword = async () => {
    // Validation
    if (!currentPassword) {
      toast({ description: "Please enter your current password.", variant: "destructive" })
      return
    }
    if (newPassword.length < 6) {
      toast({ description: "New password must be at least 6 characters.", variant: "destructive" })
      return
    }
    if (newPassword !== confirmPassword) {
      toast({ description: "New passwords do not match.", variant: "destructive" })
      return
    }
    if (newPassword === currentPassword) {
      toast({ description: "New password must be different from current password.", variant: "destructive" })
      return
    }

    setChangingPassword(true)
    
    try {
      // Dynamic import of Firebase auth functions and app
      const { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } = await import("firebase/auth")
      const { auth } = await import("@/lib/firebase")
      
      const user = auth.currentUser
      
      if (!user || !user.email) {
        toast({ description: "User not authenticated. Please log in again.", variant: "destructive" })
        setChangingPassword(false)
        return
      }

      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)

      // Update password in Firebase Authentication
      await updatePassword(user, newPassword)

      // Clear form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      
      toast({ description: t("passwordChangedSuccessfully") || "Password changed successfully!", variant: "default" })
    } catch (error: any) {
      console.error("Password change error:", error)
      
      // Handle specific Firebase errors
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast({ description: t("currentPasswordIncorrect") || "Current password is incorrect.", variant: "destructive" })
      } else if (error.code === "auth/weak-password") {
        toast({ description: t("weakPassword") || "New password is too weak. Use at least 6 characters.", variant: "destructive" })
      } else if (error.code === "auth/requires-recent-login") {
        toast({ description: t("requiresRecentLogin") || "Please log out and log in again before changing password.", variant: "destructive" })
      } else {
        toast({ description: t("failedToChangePassword") || "Failed to change password. Please try again.", variant: "destructive" })
      }
    } finally {
      setChangingPassword(false)
    }
  }

  const handleLogout = () => {
    try {
      // Clear all user data
      const keysToRemove = [
        "userEmail",
        "userId", 
        "userRole",
        "isAuthenticated",
        "profileData",
        "profileAvatar",
        "workoutTasksCompleted",
        "mealTasksCompleted",
        "submittedWorkouts",
        "submittedMeals",
        "customScheduleItems"
      ]
      keysToRemove.forEach(key => localStorage.removeItem(key))
      
      toast({ description: t("loggedOutSuccessfully") || "Logged out successfully" })
      
      // Redirect to login after brief delay for toast
      setTimeout(() => {
        router.push('/login')
      }, 500)
    } catch (error) {
      console.error("Logout error:", error)
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="user">
        <div className="min-h-screen bg-[#0E151B] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-slate-400">{t("loading") || "Loading..."}</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="user" allowedRoles={["user"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Toaster />
        <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto pb-28">
          
          {/* Bento Grid Layout - Modern Design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            
            {/* Hero Card - Large */}
            <div className="lg:col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 p-8 md:p-10 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.2),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
              <div className="relative">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative group/avatar">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover/avatar:opacity-100 group-hover/avatar:blur-2xl transition-all duration-500 animate-pulse" />
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 shadow-2xl group-hover/avatar:scale-105 group-hover/avatar:rotate-3 transition-all duration-500">
                      <div className="w-full h-full rounded-[1.3rem] overflow-hidden bg-slate-800 flex items-center justify-center">
                        {avatar ? (
                          <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-12 h-12 text-purple-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center animate-in fade-in slide-in-from-left-4 duration-700">
                    <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-500">{profile.name || "User"}</h1>
                    <p className="text-purple-200/70 text-base mb-4 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-700 justify-center">
                      <Mail className="w-4 h-4" />
                      <span>{profile.email}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-200 text-sm font-medium flex items-center gap-2 hover:scale-[1.02] hover:bg-purple-500/30 transition-all duration-300 animate-in fade-in slide-in-from-left-4 delay-100">
                        <Calendar className="w-4 h-4 animate-pulse" />
                        {t("joined")} {joinDate}
                      </span>
                      <span className={`px-4 py-2 rounded-xl border text-sm font-medium flex items-center gap-2 hover:scale-[1.02] transition-all duration-300 animate-in fade-in slide-in-from-left-4 delay-200 ${
                        subscriptionStatus.isActive 
                          ? 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30' 
                          : 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
                      }`}>
                        <Activity className="w-4 h-4 animate-bounce" />
                        {subscriptionStatus.isActive ? t("active") : t("expired")}
                      </span>
                    </div>
                  </div>
                  <Dialog open={open} onOpenChange={o => { if(!o) resetDraft(); setOpen(o) }}>
                    <DialogTrigger asChild>
                      <Button className="group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 duration-300 animate-in fade-in zoom-in-50 delay-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                        <Edit2 className="w-5 h-5 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        {t("edit")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-purple-500/30 text-white max-w-3xl backdrop-blur-xl shadow-2xl shadow-purple-500/20">
                      <DialogHeader className="relative pb-6 border-b border-white/10">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
                        <DialogTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 flex items-center gap-3 relative justify-end">
                          <span>{t("editProfile")}</span>
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
                            <Edit2 className="w-6 h-6 text-white" />
                          </div>
                        </DialogTitle>
                        <p className="text-slate-400 text-sm mt-2 relative text-right">{t("updatePersonalInfo")}</p>
                      </DialogHeader>
                      <ScrollArea className="max-h-[65vh] pr-4">
                        <div className="space-y-6 py-6">
                          
                          {/* Avatar Upload Section */}
                          <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
                            <div className="relative group/upload">
                              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-50 group-hover/upload:opacity-100 transition-opacity duration-500" />
                              <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-xl">
                                <div className="w-full h-full rounded-[1.3rem] overflow-hidden bg-slate-800 flex items-center justify-center">
                                  {draftAvatar ? (
                                    <img src={draftAvatar} alt="Preview" className="w-full h-full object-cover" />
                                  ) : (
                                    <UserIcon className="w-10 h-10 text-purple-400" />
                                  )}
                                </div>
                              </div>
                              <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
                                <Camera className="w-5 h-5 text-white" />
                                <input 
                                  id="avatar-upload" 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={handleAvatarChange}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-slate-400 text-center">{t("clickCameraToUpload")}</p>
                          </div>

                          {/* Form Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="group relative">
                              <Label className="text-slate-300 font-semibold mb-2 flex flex-row-reverse items-center gap-2 group-hover:text-white transition-colors justify-end">
                                <User className="w-4 h-4 text-purple-400" />
                                {t("name")}
                              </Label>
                              <Input 
                                value={draft.name} 
                                onChange={e => setDraft({...draft, name: e.target.value})} 
                                className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all hover:bg-slate-800 backdrop-blur-sm text-right" 
                                placeholder={t("enterYourName")}
                              />
                            </div>
                            <div className="group relative">
                              <Label className="text-slate-300 font-semibold mb-2 flex flex-row-reverse items-center gap-2 group-hover:text-white transition-colors justify-end">
                                <Phone className="w-4 h-4 text-cyan-400" />
                                {t("phone")}
                              </Label>
                              <Input 
                                value={draft.phone} 
                                onChange={e => setDraft({...draft, phone: e.target.value})} 
                                className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all hover:bg-slate-800 backdrop-blur-sm text-right" 
                                placeholder={t("enterPhoneNumber")}
                              />
                            </div>
                            <div className="group relative">
                              <Label className="text-slate-300 font-semibold mb-2 flex flex-row-reverse items-center gap-2 group-hover:text-white transition-colors justify-end">
                                <Weight className="w-4 h-4 text-emerald-400" />
                                {t("weightLabel")}
                              </Label>
                              <div className="relative">
                                <Input 
                                  type="number" 
                                  value={draft.weight} 
                                  onChange={e => setDraft({...draft, weight: Number(e.target.value)})} 
                                  className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl pr-12 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all hover:bg-slate-800 backdrop-blur-sm text-right" 
                                  placeholder="0"
                                  min="0"
                                  max="500"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 font-semibold text-sm">kg</span>
                              </div>
                            </div>
                            <div className="group relative">
                              <Label className="text-slate-300 font-semibold mb-2 flex flex-row-reverse items-center gap-2 group-hover:text-white transition-colors justify-end">
                                <Ruler className="w-4 h-4 text-blue-400" />
                                {t("heightLabel")}
                              </Label>
                              <div className="relative">
                                <Input 
                                  type="number" 
                                  value={draft.height} 
                                  onChange={e => setDraft({...draft, height: Number(e.target.value)})} 
                                  className="bg-slate-800/50 border-slate-700 text-white h-12 rounded-xl pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:bg-slate-800 backdrop-blur-sm text-right" 
                                  placeholder="0"
                                  min="0"
                                  max="300"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-semibold text-sm">cm</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-4">
                            <Button 
                              onClick={resetDraft}
                              variant="outline"
                              className="flex-1 h-14 rounded-xl border-slate-700 bg-slate-800/50 text-white hover:bg-slate-800 hover:border-slate-600 transition-all group/cancel"
                            >
                              <span className="group-hover/cancel:scale-110 transition-transform">{t("cancel")}</span>
                            </Button>
                            <Button 
                              onClick={saveProfile} 
                              disabled={!isDirty || saving}
                              className="flex-1 h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group/save relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/save:translate-x-full transition-transform duration-1000" />
                              {saving ? (
                                <>
                                  <div className="w-5 h-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  {t("saving") || "Saving..."}
                                </>
                              ) : (
                                <>
                                  <Save className="w-5 h-5 mr-2 group-hover/save:rotate-12 transition-transform duration-300" />
                                  {t("saveChanges")}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            {/* Subscription Key Card */}
            <div className="lg:col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-cyan-500/30 p-6 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-150">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left-4 justify-end">
                  <div>
                    <p className="text-xs text-cyan-300/70 font-medium uppercase tracking-wider text-right">{t("accessKey")}</p>
                    <p className="text-lg font-bold text-white text-right">{userKey || t("notSet")}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-6 transition-all duration-500">
                    <Lock className="w-6 h-6 text-white group-hover:animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span className={subscriptionStatus.isActive ? 'text-green-400' : 'text-red-400'}>
                      {subscriptionStatus.isActive ? t("active") : t("expired")}
                    </span>
                    <span>{t("status")}</span>
                  </div>
                  {subscriptionStatus.daysRemaining > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-cyan-400 font-semibold">{subscriptionStatus.daysRemaining}</span>
                      <span>{t("daysLeft")}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid - 3 Cards */}
            <div className="lg:col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl border border-emerald-500/30 p-6 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-green-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-left-4 justify-end">
                  <p className="text-sm text-emerald-300/70 font-semibold uppercase tracking-wider group-hover:text-emerald-300 transition-colors">{t("weight")}</p>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center group-hover:scale-105 group-hover:rotate-12 transition-all duration-500">
                    <Weight className="w-5 h-5 text-white group-hover:animate-bounce" />
                  </div>
                </div>
                <p className="text-4xl font-black text-white group-hover:scale-105 transition-transform duration-300 text-right">{profile.weight}<span className="text-xl text-emerald-400 ml-1 animate-pulse">kg</span></p>
              </div>
            </div>

            <div className="lg:col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 p-6 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-300">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-left-4 justify-end">
                  <p className="text-sm text-cyan-300/70 font-semibold uppercase tracking-wider group-hover:text-cyan-300 transition-colors">{t("height")}</p>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:rotate-12 transition-all duration-500">
                    <Ruler className="w-5 h-5 text-white group-hover:animate-bounce" />
                  </div>
                </div>
                <p className="text-4xl font-black text-white group-hover:scale-105 transition-transform duration-300 text-right">{profile.height}<span className="text-xl text-cyan-400 ml-1 animate-pulse">cm</span></p>
              </div>
            </div>

            <div className="lg:col-span-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/30 p-6 group hover:scale-[1.005] hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 delay-500">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)] animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2 animate-in fade-in slide-in-from-left-4 justify-end">
                  <p className="text-sm text-purple-300/70 font-semibold uppercase tracking-wider group-hover:text-purple-300 transition-colors">{t("goal")}</p>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-105 group-hover:rotate-12 transition-all duration-500">
                    <Goal className="w-5 h-5 text-white group-hover:animate-spin" />
                  </div>
                </div>
                <p className="text-xl font-bold text-white group-hover:scale-105 transition-transform duration-300 text-right">{t("buildMuscle")}</p>
              </div>
            </div>



          </div>
        </div>

        {/* Settings Sheet - Outside of Grid */}
        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
          <SheetContent side="bottom" className="bg-slate-950 border-t border-slate-800 text-white rounded-t-2xl p-0 max-h-[88vh] h-[88vh]">
            <SheetHeader className="p-5 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
              <SheetTitle className="text-white flex items-center gap-2">
                <SettingsIcon className="w-5 h-5 text-indigo-400" /> 
                {t("settings")}
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(88vh-4rem)]">
              <div className="p-5 space-y-6">
                <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white flex items-center gap-2 justify-end">
                      <span>{t("appearance")}</span>
                      <SettingsIcon className="w-5 h-5 text-indigo-400" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: "light", label: t("light") },
                        { key: "dark", label: t("dark") },
                        { key: "system", label: t("system") },
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className={`p-4 rounded-xl border transition-all ${
                            theme === key
                              ? "bg-indigo-500/20 border-indigo-500/50 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white">Language</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { code: "en", label: "English" },
                        { code: "ar", label: "العربية" },
                        { code: "ku", label: "کوردی" },
                        { code: "tr", label: "Türkçe" }
                      ].map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code as any)}
                          className={`p-4 rounded-xl border transition-all ${
                            language === lang.code
                              ? "bg-purple-500/20 border-purple-500/50 text-white"
                              : "bg-white/5 border-white/10 text-slate-400"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => {
                    localStorage.clear()
                    router.push("/login")
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-6"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  {t("logout")}
                </Button>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <BottomNav activeTab="profile" />
      </div>
    </AuthGuard>
  )
}
