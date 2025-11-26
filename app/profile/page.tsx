"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
<<<<<<< HEAD
import AuthGuard from "@/components/auth-guard"
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Edit2, Save, Camera, Lock, Mail, Phone, Activity, Calendar, Settings as SettingsIcon, LayoutDashboard, Dumbbell, Utensils, HeartPulse, User, Weight, Ruler, Goal, LogOut } from "lucide-react"
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
<<<<<<< HEAD
    name: "",
    email: "",
    phone: "",
    joinDate: "",
    weight: 0,
    height: 0,
    goal: "",
    experience: "",
=======
    name: "Safa",
    email: "safa@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2023",
    weight: 75,
    height: 180,
    goal: "Build Muscle",
    experience: "Intermediate",
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  })
  const [avatar, setAvatar] = useState<string | null>(null)
  const [draft, setDraft] = useState(profile)
  const [draftAvatar, setDraftAvatar] = useState<string | null>(null)
<<<<<<< HEAD
  const [loading, setLoading] = useState(true)
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  const [changingPassword, setChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const isMobile = useMobile()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)

  useEffect(() => {
<<<<<<< HEAD
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

=======
    // Load user data from localStorage
    try {
      const userStr = localStorage.getItem("user")
      if (userStr) {
        const user = JSON.parse(userStr)
        const userData = {
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || "User",
          email: user.email || "",
          phone: user.phone || "",
          joinDate: user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "",
          weight: user.weight || profile.weight,
          height: user.height || profile.height,
          goal: user.goal || profile.goal,
          experience: user.experience || profile.experience,
        }
        setProfile(prev => ({ ...prev, ...userData }))
        setDraft(prev => ({ ...prev, ...userData }))
      }
      
      // Load saved profile data if exists (overrides user data)
      const p = localStorage.getItem("profileData")
      if (p) {
        const parsed = JSON.parse(p)
        setProfile(prev => ({ ...prev, ...parsed }))
        setDraft(prev => ({ ...prev, ...parsed }))
      }
      
      const a = localStorage.getItem("profileAvatar")
      if (a) {
        setAvatar(a)
        setDraftAvatar(a)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }

>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
      console.log('🔄 Profile: Storage changed, updating subscription...') // Debug log
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

<<<<<<< HEAD
  const saveProfile = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        toast({ description: "Error: User not found", variant: "destructive" })
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
      
      toast({ description: "Profile saved successfully!" })
      setOpen(false)
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({ description: "Failed to save profile", variant: "destructive" })
    }
=======
  const saveProfile = () => {
    setProfile(draft)
    setAvatar(draftAvatar)
    try {
      localStorage.setItem("profileData", JSON.stringify(draft))
      if (draftAvatar) localStorage.setItem("profileAvatar", draftAvatar)
    } catch {}
    toast({ description: "Profile saved." })
    setOpen(false)
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
      
      toast({ description: "✅ Password changed successfully!", variant: "default" })
    } catch (error: any) {
      console.error("Password change error:", error)
      
      // Handle specific Firebase errors
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast({ description: "Current password is incorrect.", variant: "destructive" })
      } else if (error.code === "auth/weak-password") {
        toast({ description: "New password is too weak. Use at least 6 characters.", variant: "destructive" })
      } else if (error.code === "auth/requires-recent-login") {
        toast({ description: "Please log out and log in again before changing password.", variant: "destructive" })
      } else {
        toast({ description: "Failed to change password. Please try again.", variant: "destructive" })
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
      
      toast({ description: "Logged out successfully" })
      
      // Redirect to login after brief delay for toast
      setTimeout(() => {
        router.push('/login')
      }, 500)
    } catch (error) {
      console.error("Logout error:", error)
      router.push('/login')
    }
  }

<<<<<<< HEAD
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
    <AuthGuard requiredRole="user">
=======
  return (
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    <>
    <Toaster />
    <PageTransition>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent mb-2">
          {t("profile")}
        </h1>
        <p className="text-[#B6C4CF] mb-8">{t("manageFitnessProfileDesc")}</p>

        {/* Subscription Warning */}
        {subscriptionStatus.isExpired && (
          <SubscriptionWarning variant="expired" />
        )}
        {!subscriptionStatus.isExpired && subscriptionStatus.daysRemaining <= 7 && subscriptionStatus.daysRemaining > 0 && (
          <SubscriptionWarning variant="warning" daysRemaining={subscriptionStatus.daysRemaining} />
        )}

        {/* Subscription Info Card */}
        <SubscriptionInfoCard
          userKey={userKey}
          joinDate={joinDate}
          expiryDate={expiryDate}
          isActive={subscriptionStatus.isActive}
          daysRemaining={subscriptionStatus.daysRemaining}
        />

        <section className="space-y-5">
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">{t("account")}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold leading-tight">{profile.name}</p>
              <p className="text-slate-400 text-sm">{profile.email}</p>
            </div>
            {isMobile ? (
              <Sheet open={open} onOpenChange={o => { if(!o) resetDraft(); setOpen(o) }}>
                <SheetTrigger asChild>
                  <Button className="h-9">{t("manageLabel")}</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[90vh] h-[90vh] bg-slate-950 border-slate-800">
                  <SheetHeader className="p-5 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
                    <SheetTitle className="text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-400" /> {t("manageProfile")}</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(90vh-4rem)]">
                    <div className="p-5 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                          {draftAvatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={draftAvatar} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            <UserIcon className="w-8 h-8 text-slate-500" />
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="inline-flex items-center gap-2 text-xs font-medium text-white cursor-pointer">
                            <Camera className="w-4 h-4" />
                            <span>{t("changeAvatar")}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                          </label>
                          <p className="text-slate-500 text-xs">PNG/JPG up to 2MB.</p>
                        </div>
                      </div>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> {t("personal")}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("fullName")}</Label>
                              <Input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Mail className="w-3 h-3" /> {t("email")}</Label>
<<<<<<< HEAD
                              <Input type="email" value={draft.email} disabled className="mt-1 bg-slate-950 border-slate-800 opacity-60 cursor-not-allowed" />
=======
                              <Input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Phone className="w-3 h-3" /> {t("phone")}</Label>
                              <Input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> {t("joinDate")}</Label>
                              <Input value={draft.joinDate} onChange={e=>setDraft({...draft,joinDate:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("goal")}</Label>
                              <Input value={draft.goal} onChange={e=>setDraft({...draft,goal:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("experience")}</Label>
                              <Input value={draft.experience} onChange={e=>setDraft({...draft,experience:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Weight className="w-4 h-4 text-emerald-400" /> {t("physical")}</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">{t("weight")}</Label>
                            <Input type="number" value={draft.weight} onChange={e=>setDraft({...draft,weight:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">{t("height")}</Label>
                            <Input type="number" value={draft.height} onChange={e=>setDraft({...draft,height:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> {t("security")}</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("current")}</Label>
                              <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("new")}</Label>
                              <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("confirm")}</Label>
                              <Input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                          <Button onClick={changePassword} disabled={changingPassword} variant="outline" className="w-full">
                            {changingPassword ? t("updating") : t("changePasswordLabel")}
                          </Button>
                        </CardContent>
                      </Card>
                      <div className="flex gap-3 justify-end pt-2">
                        <Button variant="outline" onClick={resetDraft} className="border-slate-700">Cancel</Button>
                        <Button onClick={saveProfile} disabled={!isDirty} className="gap-2 disabled:opacity-50"><Save className="w-4 h-4" /> {isDirty ? "Save" : "Saved"}</Button>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            ) : (
              <Dialog open={open} onOpenChange={o => { if(!o) resetDraft(); setOpen(o) }}>
                <DialogTrigger asChild>
                  <Button className="h-9">Manage</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] w-full sm:max-w-lg p-0 overflow-hidden">
                  <DialogHeader className="p-5 border-b border-slate-800 bg-slate-900">
                    <DialogTitle className="text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-400" /> {t("manageProfile")}</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-full max-h-[calc(85vh-4rem)]">
                    <div className="p-5 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center">
                          {draftAvatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={draftAvatar} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            <UserIcon className="w-8 h-8 text-slate-500" />
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="inline-flex items-center gap-2 text-xs font-medium text-white cursor-pointer">
                            <Camera className="w-4 h-4" />
                            <span>{t("changeAvatar")}</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                          </label>
                          <p className="text-slate-500 text-xs">PNG/JPG up to 2MB.</p>
                        </div>
                      </div>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> {t("personal")}</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("fullName")}</Label>
                              <Input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Mail className="w-3 h-3" /> {t("email")}</Label>
<<<<<<< HEAD
                              <Input type="email" value={draft.email} disabled className="mt-1 bg-slate-950 border-slate-800 opacity-60 cursor-not-allowed" />
=======
                              <Input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Phone className="w-3 h-3" /> {t("phone")}</Label>
                              <Input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> {t("joinDate")}</Label>
                              <Input value={draft.joinDate} onChange={e=>setDraft({...draft,joinDate:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("goal")}</Label>
                              <Input value={draft.goal} onChange={e=>setDraft({...draft,goal:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("experience")}</Label>
                              <Input value={draft.experience} onChange={e=>setDraft({...draft,experience:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Weight className="w-4 h-4 text-emerald-400" /> {t("physical")}</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">{t("weight")}</Label>
                            <Input type="number" value={draft.weight} onChange={e=>setDraft({...draft,weight:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">{t("height")}</Label>
                            <Input type="number" value={draft.height} onChange={e=>setDraft({...draft,height:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> {t("security")}</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("current")}</Label>
                              <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("new")}</Label>
                              <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">{t("confirm")}</Label>
                              <Input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                          <Button onClick={changePassword} disabled={changingPassword} variant="outline" className="w-full">
                            {changingPassword ? t("updating") : t("changePasswordLabel")}
                          </Button>
                        </CardContent>
                      </Card>
                      <div className="flex gap-3 justify-end pt-2">
                        <Button variant="outline" onClick={resetDraft} className="border-slate-700">Cancel</Button>
                        <Button onClick={saveProfile} disabled={!isDirty} className="gap-2 disabled:opacity-50"><Save className="w-4 h-4" /> {isDirty ? "Save" : "Saved"}</Button>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">{t("stats")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-800/50">
                <Weight className="w-4 h-4 mx-auto text-emerald-400" />
                <p className="text-white font-semibold mt-1">{profile.weight}kg</p>
                <p className="text-gray-200 text-sm font-medium">{t("weightLabel")}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <Ruler className="w-4 h-4 mx-auto text-cyan-400" />
                <p className="text-white font-semibold mt-1">{profile.height}cm</p>
                <p className="text-gray-200 text-sm font-medium">{t("heightLabel")}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                {/* Goal icon fallback */}
                <span className="block w-4 h-4 mx-auto rounded-full bg-blue-400" />
                <p className="text-white font-semibold mt-1 truncate">{t("buildMuscle")}</p>
                <p className="text-gray-200 text-sm font-medium">{t("goalLabel")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">{t("shortcuts")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            <Link href="/workout"><Button variant="outline" className="w-full">{t("workoutLabel")}</Button></Link>
            <Link href="/meals"><Button variant="outline" className="w-full">{t("mealsLabel")}</Button></Link>
            <Link href="/physio"><Button variant="outline" className="w-full">{t("physioLabel")}</Button></Link>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">{t("preferences")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setSettingsOpen(true)}
              variant="outline" 
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white transition-all duration-300"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              {t("settings")}
            </Button>
          </CardContent>
        </Card>

        {/* Settings Bottom Sheet */}
        <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent 
          side="bottom" 
          className="bg-slate-950 border-t border-slate-800 text-white rounded-t-2xl p-0 max-h-[88vh] h-[88vh] animate-slideUp"
        >
          <SheetHeader className="p-5 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
            <SheetTitle className="text-white flex items-center gap-2"><SettingsIcon className="w-5 h-5 text-indigo-400" /> {t("settings")}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(88vh-4rem)]">
            <div className="p-5 space-y-6"
              style={{
                animation: "fadeIn 0.4s ease-out"
              }}
            >
              {/* Appearance */}
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-3"><CardTitle className="text-white text-sm">{t("appearance")}</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: "light", label: t("light") },
                      { key: "dark", label: t("dark") },
                      { key: "system", label: t("system") },
                    ].map((m) => (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setTheme(m.key as any)}
                        className={`p-3 rounded-xl border text-xs font-medium ${theme===m.key?"border-indigo-500 bg-indigo-500/10 text-white":"border-slate-700 bg-slate-800/50 text-slate-300"}`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">{t("systemFollowsOS")}</p>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-3"><CardTitle className="text-white text-sm">{t("notificationsTitle")}</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-sm">{t("emailNotifications")}</span>
                    <input type="checkbox" checked={notifyEmail} onChange={e=>setNotifyEmail(e.target.checked)} className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-sm">{t("pushNotifications")}</span>
                    <input type="checkbox" checked={notifyPush} onChange={e=>setNotifyPush(e.target.checked)} className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>

              {/* Language */}
              <Card className="bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/70 border-slate-700/50 shadow-xl">
                <CardHeader className="pb-4 border-b border-slate-700/30">
                  <CardTitle className="text-white text-base font-semibold flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    {t("languageSettings")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-5">
                  <div className="space-y-3">
                    <label className="text-slate-300 text-sm font-medium block">
                      {t("selectLanguage")}
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value as "en" | "tr" | "ar" | "ku")}
                      className="w-full bg-slate-950/80 border-2 border-slate-700/60 hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm rounded-xl px-4 py-3.5 text-white transition-all duration-200 outline-none cursor-pointer shadow-inner"
                    >
                      <option value="en" className="bg-slate-900">🇬🇧 English</option>
                      <option value="tr" className="bg-slate-900">🇹🇷 Türkçe</option>
                      <option value="ar" className="bg-slate-900">🇸🇦 العربية</option>
                      <option value="ku" className="bg-slate-900">☀️ Kurdî</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => {
                      setLanguage(selectedLanguage as "en" | "tr" | "ar" | "ku");
                      toast({
                        title: "✓ Language Changed",
                        description: "Your language preference has been updated successfully.",
                      });
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t("applyLanguage")}
                  </button>
                </CardContent>
              </Card>

              {/* Logout Section */}
              <Card className="bg-red-950/20 border-red-900/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">{t("accountActions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-xs text-slate-400 mb-3">
                      {t("accountActionsDesc")}
                    </p>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("logoutButton")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </SheetContent>
        </Sheet>

      </section>
      </div>
    </div>
    </PageTransition>
      <BottomNav activeTab="profile" />
    </>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  )
}
