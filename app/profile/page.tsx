"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import AppBottomNav from "@/components/app-bottom-nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Edit2, Save, Camera, Lock, Mail, Phone, Activity, Calendar, Settings as SettingsIcon } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { User as UserIcon, Weight, Ruler, Goal } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
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

  return (
    <div className="pb-24 max-w-md mx-auto">
      <header className="pt-6 pb-4 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserIcon className="w-6 h-6 text-blue-400" /> Profile
          </h1>
          <button
            aria-label="Settings"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            onClick={() => setSettingsOpen(true)}
            title="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-slate-400 text-sm mt-1">Quick overview and shortcuts. Manage full settings in Profile Dashboard.</p>
      </header>

      <section className="px-4 space-y-5">
        <Card className="bg-slate-900/70 border-slate-800">
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
                    <SheetTitle className="text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-blue-400" /> Manage Profile</SheetTitle>
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
                              <Label className="text-slate-400 text-xs">Full Name</Label>
                              <Input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
                              <Input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</Label>
                              <Input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" /> Join Date</Label>
                              <Input value={draft.joinDate} onChange={e=>setDraft({...draft,joinDate:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Goal</Label>
                              <Input value={draft.goal} onChange={e=>setDraft({...draft,goal:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Experience</Label>
                              <Input value={draft.experience} onChange={e=>setDraft({...draft,experience:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Weight className="w-4 h-4 text-emerald-400" /> Physical</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-400 text-xs">Weight (kg)</Label>
                            <Input type="number" value={draft.weight} onChange={e=>setDraft({...draft,weight:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                          <div>
                            <Label className="text-slate-400 text-xs">Height (cm)</Label>
                            <Input type="number" value={draft.height} onChange={e=>setDraft({...draft,height:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> Security</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-slate-400 text-xs">Current</Label>
                              <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">New</Label>
                              <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Confirm</Label>
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
                    <DialogTitle className="text-white flex items-center gap-2"><UserIcon className="w-5 h-5 text-blue-400" /> Manage Profile</DialogTitle>
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
                              <Label className="text-slate-400 text-xs">Full Name</Label>
                              <Input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs flex items-center gap-1"><Mail className="w-3 h-3" /> Email</Label>
                              <Input type="email" value={draft.email} onChange={e=>setDraft({...draft,email:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</Label>
                              <Input value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs flex items-center gap-1"><Calendar className="w-3 h-3" /> Join Date</Label>
                              <Input value={draft.joinDate} onChange={e=>setDraft({...draft,joinDate:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Goal</Label>
                              <Input value={draft.goal} onChange={e=>setDraft({...draft,goal:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Experience</Label>
                              <Input value={draft.experience} onChange={e=>setDraft({...draft,experience:e.target.value})} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Weight className="w-4 h-4 text-emerald-400" /> Physical</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-400 text-xs">Weight (kg)</Label>
                            <Input type="number" value={draft.weight} onChange={e=>setDraft({...draft,weight:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                          <div>
                            <Label className="text-slate-400 text-xs">Height (cm)</Label>
                            <Input type="number" value={draft.height} onChange={e=>setDraft({...draft,height:parseInt(e.target.value||'0')})} className="mt-1 bg-slate-950 border-slate-800" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-900/70 border-slate-800">
                        <CardHeader className="pb-3"><CardTitle className="text-white text-sm flex items-center gap-2"><Lock className="w-4 h-4 text-purple-400" /> Security</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label className="text-slate-400 text-xs">Current</Label>
                              <Input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">New</Label>
                              <Input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="mt-1 bg-slate-950 border-slate-800" />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Confirm</Label>
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

        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-800/50">
                <Weight className="w-4 h-4 mx-auto text-emerald-400" />
                <p className="text-white font-semibold mt-1">{profile.weight}kg</p>
                <p className="text-slate-400 text-xs">Weight</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                <Ruler className="w-4 h-4 mx-auto text-cyan-400" />
                <p className="text-white font-semibold mt-1">{profile.height}cm</p>
                <p className="text-slate-400 text-xs">Height</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-800/50">
                {/* Goal icon fallback */}
                <span className="block w-4 h-4 mx-auto rounded-full bg-blue-400" />
                <p className="text-white font-semibold mt-1 truncate">{profile.goal}</p>
                <p className="text-slate-400 text-xs">Goal</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/70 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm">Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            <Link href="/workout"><Button variant="outline" className="w-full">Workout</Button></Link>
            <Link href="/meals"><Button variant="outline" className="w-full">Meals</Button></Link>
            <Link href="/physio"><Button variant="outline" className="w-full">Physio</Button></Link>
          </CardContent>
        </Card>
      </section>

      {/* Settings Bottom Sheet */}
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetContent side="bottom" className="bg-slate-950 border-t border-slate-800 text-white rounded-t-2xl p-0 max-h-[88vh] h-[88vh]">
          <SheetHeader className="p-5 border-b border-slate-800 bg-slate-900 rounded-t-2xl">
            <SheetTitle className="text-white flex items-center gap-2"><SettingsIcon className="w-5 h-5 text-blue-400" /> Settings</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(88vh-4rem)]">
            <div className="p-5 space-y-6">
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
                        className={`p-3 rounded-xl border text-xs font-medium ${theme===m.key?"border-blue-500 bg-blue-500/10 text-white":"border-slate-700 bg-slate-800/50 text-slate-300"}`}
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

              {/* Logout */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={() => { try { ["userRole","profileData","profileAvatar","workoutTasksCompleted","mealTasksCompleted","submittedWorkouts","submittedMeals","customScheduleItems"].forEach(k=>localStorage.removeItem(k)) } catch {}; router.push('/login') }}
                  className="w-full border-red-600 text-red-400 hover:bg-red-600/10"
                >
                  Logout
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <AppBottomNav />
    </div>
  )
}
