"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Edit2, Save, Camera, Lock, Mail, Phone, Activity, Calendar, Settings as SettingsIcon, LayoutDashboard, Dumbbell, Utensils, HeartPulse, User, Weight, Ruler, Goal, LogOut } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { User as UserIcon } from "lucide-react"
import { SubscriptionWarning } from "@/components/subscription-warning"
import { SubscriptionInfoCard } from "@/components/subscription-info-card"
import { checkSubscriptionStatus, getSubscriptionExpiry, getUserAccessKey, getUserJoinDate } from "@/lib/subscription"

export default function ProfilePage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
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
    name: "Safa",
    email: "safa@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2023",
    weight: 75,
    height: 180,
    goal: "Build Muscle",
    experience: "Intermediate",
  })
  const [avatar, setAvatar] = useState<string | null>(null)
  const [draft, setDraft] = useState(profile)
  const [draftAvatar, setDraftAvatar] = useState<string | null>(null)
  const [changingPassword, setChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const isMobile = useMobile()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifyPush, setNotifyPush] = useState(true)

  useEffect(() => {
    try {
      const p = localStorage.getItem("profileData")
      if (p) {
        const parsed = JSON.parse(p)
        setProfile(parsed)
        setDraft(parsed)
      }
      const a = localStorage.getItem("profileAvatar")
      if (a) {
        setAvatar(a)
        setDraftAvatar(a)
      }
    } catch {}

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

  const saveProfile = () => {
    setProfile(draft)
    setAvatar(draftAvatar)
    try {
      localStorage.setItem("profileData", JSON.stringify(draft))
      if (draftAvatar) localStorage.setItem("profileAvatar", draftAvatar)
    } catch {}
    toast({ description: "Profile saved." })
    setOpen(false)
  }

  const resetDraft = () => {
    setDraft(profile)
    setDraftAvatar(avatar)
    setOpen(false)
  }

  const changePassword = () => {
    const valid = newPassword.length >= 8 && newPassword === confirmPassword && newPassword !== currentPassword
    if (!valid) {
      toast({ description: "Password rules: 8+ chars, match, differ from current." })
      return
    }
    setChangingPassword(true)
    setTimeout(() => {
      setChangingPassword(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast({ description: "Password changed." })
    }, 800)
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

  return (
    <>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent mb-2">
          Profile
        </h1>
        <p className="text-[#B6C4CF] mb-8">Manage your account and personalize your experience.</p>

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
            <CardTitle className="text-white text-sm">Account</CardTitle>
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
                  <Button className="h-9">Manage</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl p-0 max-h-[90vh] h-[90vh] bg-slate-950 border-slate-800">
                  <SheetHeader className="p-5 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
                    <SheetTitle className="text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-400" /> Manage Profile</SheetTitle>
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
                            <span>Change Avatar</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                          </label>
                          <p className="text-slate-500 text-xs">PNG/JPG up to 2MB.</p>
                        </div>
                      </div>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> Personal</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Full Name</Label>
                              <Input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
                              <Input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</Label>
                              <Input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> Join Date</Label>
                              <Input value={draft.joinDate} onChange={e=>setDraft({...draft,joinDate:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Goal</Label>
                              <Input value={draft.goal} onChange={e=>setDraft({...draft,goal:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Experience</Label>
                              <Input value={draft.experience} onChange={e=>setDraft({...draft,experience:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Weight className="w-4 h-4 text-emerald-400" /> Physical</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">Weight (kg)</Label>
                            <Input type="number" value={draft.weight} onChange={e=>setDraft({...draft,weight:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">Height (cm)</Label>
                            <Input type="number" value={draft.height} onChange={e=>setDraft({...draft,height:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> Security</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Current</Label>
                              <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">New</Label>
                              <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Confirm</Label>
                              <Input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                          <Button onClick={changePassword} disabled={changingPassword} variant="outline" className="w-full">
                            {changingPassword ? "Updating..." : "Change Password"}
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
                    <DialogTitle className="text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-indigo-400" /> Manage Profile</DialogTitle>
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
                            <span>Change Avatar</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                          </label>
                          <p className="text-slate-500 text-xs">PNG/JPG up to 2MB.</p>
                        </div>
                      </div>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> Personal</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Full Name</Label>
                              <Input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
                              <Input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</Label>
                              <Input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> Join Date</Label>
                              <Input value={draft.joinDate} onChange={e=>setDraft({...draft,joinDate:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Goal</Label>
                              <Input value={draft.goal} onChange={e=>setDraft({...draft,goal:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Experience</Label>
                              <Input value={draft.experience} onChange={e=>setDraft({...draft,experience:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Weight className="w-4 h-4 text-emerald-400" /> Physical</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">Weight (kg)</Label>
                            <Input type="number" value={draft.weight} onChange={e=>setDraft({...draft,weight:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                          <div>
                            <Label className="text-gray-200 text-sm font-medium">Height (cm)</Label>
                            <Input type="number" value={draft.height} onChange={e=>setDraft({...draft,height:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> Security</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Current</Label>
                              <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">New</Label>
                              <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-gray-200 text-sm font-medium">Confirm</Label>
                              <Input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                          <Button onClick={changePassword} disabled={changingPassword} variant="outline" className="w-full">
                            {changingPassword ? "Updating..." : "Change Password"}
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
            <CardTitle className="text-white text-sm">Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-800/50">
                <Weight className="w-4 h-4 mx-auto text-emerald-400" />
                <p className="text-white font-semibold mt-1">{profile.weight}kg</p>
                <p className="text-gray-200 text-sm font-medium">Weight</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <Ruler className="w-4 h-4 mx-auto text-cyan-400" />
                <p className="text-white font-semibold mt-1">{profile.height}cm</p>
                <p className="text-gray-200 text-sm font-medium">Height</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                {/* Goal icon fallback */}
                <span className="block w-4 h-4 mx-auto rounded-full bg-blue-400" />
                <p className="text-white font-semibold mt-1 truncate">{profile.goal}</p>
                <p className="text-gray-200 text-sm font-medium">Goal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            <Link href="/workout"><Button variant="outline" className="w-full">Workout</Button></Link>
            <Link href="/meals"><Button variant="outline" className="w-full">Meals</Button></Link>
            <Link href="/physio"><Button variant="outline" className="w-full">Physio</Button></Link>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setSettingsOpen(true)}
              variant="outline" 
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white transition-all duration-300"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Settings
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
            <SheetTitle className="text-white flex items-center gap-2"><SettingsIcon className="w-5 h-5 text-indigo-400" /> Settings</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(88vh-4rem)]">
            <div className="p-5 space-y-6"
              style={{
                animation: "fadeIn 0.4s ease-out"
              }}
            >
              {/* Appearance */}
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-3"><CardTitle className="text-white text-sm">Appearance</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { key: "light", label: "Light" },
                      { key: "dark", label: "Dark" },
                      { key: "system", label: "System" },
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
                  <p className="text-[11px] text-slate-500 mt-2">System follows your OS theme.</p>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-3"><CardTitle className="text-white text-sm">Notifications</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-sm">Email Notifications</span>
                    <input type="checkbox" checked={notifyEmail} onChange={e=>setNotifyEmail(e.target.checked)} className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-sm">Push Notifications</span>
                    <input type="checkbox" checked={notifyPush} onChange={e=>setNotifyPush(e.target.checked)} className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>

              {/* Language */}
              <Card className="bg-slate-900/70 border-slate-800">
                <CardHeader className="pb-3"><CardTitle className="text-white text-sm">Language</CardTitle></CardHeader>
                <CardContent>
                  <select
                    onChange={(e)=>{ try { localStorage.setItem("app_language", e.target.value) } catch {}; }}
                    defaultValue={typeof window!=="undefined"?localStorage.getItem("app_language")||"en":"en"}
                    className="bg-slate-950 border border-slate-800 text-xs rounded px-2 py-2 text-white"
                  >
                    <option value="en">English</option>
                    <option value="tr">Türkçe</option>
                    <option value="ar">العربية</option>
                    <option value="ku">Kurdî</option>
                  </select>
                </CardContent>
              </Card>

              {/* Logout Section */}
              <Card className="bg-red-950/20 border-red-900/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <p className="text-xs text-slate-400 mb-3">
                      Logging out will clear your session and return you to the login screen.
                    </p>
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white border-0 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
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
      <BottomNav activeTab="profile" router={router} />
    </>
  )
}

function BottomNav({ activeTab, router }: any) {
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", color: "#10B2E3" },
    { id: "workout", icon: Dumbbell, label: "Workout", path: "/workout", color: "#9333EA" },
    { id: "meals", icon: Utensils, label: "Meals", path: "/meals", color: "#F59E0B" },
    { id: "physio", icon: HeartPulse, label: "Physio", path: "/physio", color: "#F43F5E" },
    { id: "profile", icon: User, label: "Profile", path: "/profile", color: "#6366F1" }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(10px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .slide-scale-active {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => { if (item.path !== "/profile") router.push(item.path) }}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-300 relative ${
              activeTab === item.id ? "slide-scale-active" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                activeTab === item.id ? "scale-110" : ""
              }`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 20px ${item.color}40` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div 
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
