"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import DeleteDialog from "@/components/delete-dialog"
import { useLanguage } from "@/hooks/useLanguage"
import { Users, Dumbbell, TrendingUp, Plus, Edit2, Trash2, Search, Award, CheckCircle2, Apple, Calendar, ListPlus, X, Target, Zap, Phone, Activity, Save } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getPlan, savePlan, planSummary } from "@/lib/plans"
import { getMealSubmissions, getWorkoutSubmissions } from "@/lib/submissions"
import { toast } from "sonner"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface Trainee {
  id: string
  name: string
  email: string
  phone: string
  goal: string
  joinDate: string
  progress: number
  sessionsCompleted: number
  isActive: boolean
}

export default function TrainerPage() {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [trainerId, setTrainerId] = useState<string | null>(null)
  const [mealSubs, setMealSubs] = useState<any[]>([])
  const [workoutSubs, setWorkoutSubs] = useState<any[]>([])
  const [trainees, setTrainees] = useState<Trainee[]>([])
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch trainer profile
          const userResponse = await fetch(`/api/users?email=${user.email}`)
          if (userResponse.ok) {
            const users = await userResponse.json()
            const currentUser = users.find((u: any) => u.email === user.email)
            const uid = currentUser?.id || currentUser?.uid || user.uid
            setTrainerId(uid)

            // Fetch trainees for this trainer
            const traineesResponse = await fetch(`/api/trainees?trainerId=${uid}`)
            if (traineesResponse.ok) {
              const traineesData = await traineesResponse.json()
              setTrainees(traineesData)
            }

            // Load recent submissions (client-only)
            setMealSubs(getMealSubmissions().slice(-10).reverse())
            setWorkoutSubs(getWorkoutSubmissions().slice(-10).reverse())
          }
        } catch (error) {
          console.error('Error fetching trainer data:', error)
          toast.error('Failed to load trainer data')
        } finally {
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const [searchTrainee, setSearchTrainee] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [traineeToDelete, setTraineeToDelete] = useState<Trainee | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goal: "",
  })
  // Plan dialog state
  const [planOpen, setPlanOpen] = useState(false)
  const [planUserId, setPlanUserId] = useState<string | null>(null)
  const today = new Date().toISOString().split("T")[0]
  const [workoutItems, setWorkoutItems] = useState<{ id: string; title: string }[]>([])
  const [mealItems, setMealItems] = useState<{ id: string; title: string }[]>([])
  const [newWorkoutTitle, setNewWorkoutTitle] = useState("")
  const [newMealTitle, setNewMealTitle] = useState("")

  const filteredTrainees = trainees.filter((t) => t.name.toLowerCase().includes(searchTrainee.toLowerCase()) || t.email.toLowerCase().includes(searchTrainee.toLowerCase()))

  const handleAdd = () => {
    setEditingId(null)
    setFormData({ name: "", email: "", phone: "", goal: "" })
    setModalOpen(true)
  }

  const handleEdit = (trainee: Trainee) => {
    setEditingId(trainee.id)
    setFormData({ name: trainee.name, email: trainee.email, phone: trainee.phone, goal: trainee.goal })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill all required fields")
      return
    }

    if (!trainerId) {
      toast.error("Trainer ID not found")
      return
    }

    try {
      if (editingId) {
        // Update existing trainee
        const response = await fetch(`/api/trainees/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, trainerId })
        })
        if (response.ok) {
          const updated = await response.json()
          setTrainees(trainees.map((t) => (t.id === editingId ? updated : t)))
          toast.success("Trainee updated successfully")
        } else {
          toast.error("Failed to update trainee")
        }
      } else {
        // Create new trainee
        const response = await fetch('/api/trainees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            trainerId,
            joinDate: new Date().toISOString().split("T")[0],
            progress: 0,
            sessionsCompleted: 0,
            isActive: true
          })
        })
        if (response.ok) {
          const newTrainee = await response.json()
          setTrainees([...trainees, newTrainee])
          toast.success("Trainee added successfully")
        } else {
          toast.error("Failed to add trainee")
        }
      }
      setModalOpen(false)
    } catch (error) {
      console.error('Error saving trainee:', error)
      toast.error("Failed to save trainee")
    }
  }

  const handleDeleteClick = (trainee: Trainee) => {
    setTraineeToDelete(trainee)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!traineeToDelete) return
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/trainees/${traineeToDelete.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setTrainees(trainees.filter((t) => t.id !== traineeToDelete.id))
        toast.success("Trainee deleted successfully")
        setDeleteDialogOpen(false)
      } else {
        toast.error("Failed to delete trainee")
      }
    } catch (error) {
      toast.error("Failed to delete trainee")
      console.error(error)
    } finally {
      setIsDeleting(false)
      setTraineeToDelete(null)
    }
  }

  const openPlan = (trainee: Trainee) => {
    setPlanUserId(trainee.id)
    const p = getPlan(trainee.id, today)
    setWorkoutItems(p?.workouts || [])
    setMealItems(p?.meals || [])
    setPlanOpen(true)
  }
  const addWorkoutItem = () => {
    if (!newWorkoutTitle.trim()) return
    const item = { id: Date.now()+"-w", title: newWorkoutTitle.trim() }
    const next = [...workoutItems, item]
    setWorkoutItems(next)
    setNewWorkoutTitle("")
  }
  const addMealItem = () => {
    if (!newMealTitle.trim()) return
    const item = { id: Date.now()+"-m", title: newMealTitle.trim() }
    const next = [...mealItems, item]
    setMealItems(next)
    setNewMealTitle("")
  }
  const removeWorkoutItem = (id: string) => setWorkoutItems(workoutItems.filter(i=>i.id!==id))
  const removeMealItem = (id: string) => setMealItems(mealItems.filter(i=>i.id!==id))
  const savePlanDialog = () => {
    if (!planUserId) return
    savePlan({ userId: planUserId, date: today, workouts: workoutItems, meals: mealItems })
    toast.success("Plan saved")
    setPlanOpen(false)
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
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{t("trainerDashboard")}</h1>
              <p className="text-gray-400 text-sm">{t("manageTraineesProgress")}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("totalTrainees")}</p>
                    <p className="text-3xl font-bold text-white">{trainees.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-rose-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("activeTrainees")}</p>
                    <p className="text-3xl font-bold text-white">{trainees.filter((t) => t.isActive).length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("totalSessions")}</p>
                    <p className="text-3xl font-bold text-white">{trainees.reduce((sum, t) => sum + t.sessionsCompleted, 0)}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-pink-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t("avgProgress")}</p>
                    <p className="text-3xl font-bold text-pink-400">{Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length || 0)}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-pink-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-rose-400" />
                  {t("recentActivity")}
                </CardTitle>
                <span className="text-xs text-gray-400">{t("todayAndRecent")}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mealSubs.length === 0 && workoutSubs.length === 0 && (
                <p className="text-gray-400 text-sm py-4 text-center">{t("noSubmissionsYet")}</p>
              )}
              {[...workoutSubs.map(s => ({...s, _type: 'workout'})), ...mealSubs.map(s => ({...s, _type:'meals'}))]
                .sort((a,b)=>b.timestamp-a.timestamp)
                .slice(0,10)
                .map((s,idx)=> (
                <div key={idx} className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-700/60 flex items-center justify-center">
                      {s._type==='workout' ? <Dumbbell className="w-6 h-6 text-rose-400"/> : <Apple className="w-6 h-6 text-pink-400"/>}
                    </div>
                    <div>
                      <p className="text-white font-semibold capitalize">{s.userName || 'User'} {s._type} {t("submission")}</p>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3"/> {t("completedOn")} {s.date}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">{t("completed")}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trainees List */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-400" />
                  {t("myTrainees")}
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <Input
                      type="text"
                      placeholder={t("searchTrainees")}
                      value={searchTrainee}
                      onChange={(e) => setSearchTrainee(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white pl-10 rounded-xl focus:border-rose-500 transition-colors"
                    />
                  </div>
                  <Button onClick={handleAdd} className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    {t("addTrainee")}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {filteredTrainees.length > 0 ? (
                filteredTrainees.map((trainee) => (
                  <div key={trainee.id} className="bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 transition-all duration-200 border border-slate-700/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-semibold shadow-lg shadow-rose-500/30">
                            {trainee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold text-lg">{trainee.name}</p>
                            <p className="text-gray-400 text-sm">{trainee.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Phone className="w-4 h-4" />
                            {trainee.phone}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Target className="w-4 h-4" />
                            {trainee.goal}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Zap className="w-4 h-4" />
                            {trainee.sessionsCompleted} {t("sessions")}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            {trainee.joinDate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-gray-400 text-xs mb-1">{t("progress")}</p>
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center border border-pink-500/30">
                            <p className="text-pink-400 font-bold">{trainee.progress}%</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          trainee.isActive 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}>
                          {trainee.isActive ? t("active") : t("inactive")}
                        </span>
                        {(() => { 
                          const s = planSummary(trainee.id, today); 
                          return s.workouts || s.meals ? (
                            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/30">
                              {t("plan")} {s.workouts}W/{s.meals}M
                            </span>
                          ) : null 
                        })()}
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10" 
                          onClick={() => handleEdit(trainee)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10" 
                          onClick={() => handleDeleteClick(trainee)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-pink-400 hover:bg-pink-500/10" 
                          onClick={() => openPlan(trainee)}
                        >
                          <ListPlus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">{t("noTraineesFound")}</p>
              )}
            </CardContent>
          </Card>

          {/* Plan Dialog */}
          {planOpen && planUserId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={()=>setPlanOpen(false)} />
              <div className="relative w-full max-w-xl bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-rose-500/30 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-gradient-to-r from-rose-500/10 to-pink-500/10">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <ListPlus className="w-5 h-5 text-rose-400" /> 
                    {t("setPlan")}
                  </h2>
                  <button onClick={()=>setPlanOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              <div className="p-6">
                <Tabs defaultValue="workouts" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="workouts">Workouts</TabsTrigger>
                    <TabsTrigger value="meals">Meals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="workouts" className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Workout title" value={newWorkoutTitle} onChange={e=>setNewWorkoutTitle(e.target.value)} className="trainer-input flex-1" />
                      <Button onClick={addWorkoutItem} disabled={!newWorkoutTitle.trim()} className="trainer-button">Add</Button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {workoutItems.map(w => (
                        <div key={w.id} className="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2 text-sm">
                          <span className="text-white truncate flex-1">{w.title}</span>
                          <button onClick={()=>removeWorkoutItem(w.id)} className="text-slate-400 hover:text-red-400 ml-2"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                      {!workoutItems.length && <p className="text-xs text-slate-500">No workouts yet.</p>}
                    </div>
                  </TabsContent>
                  <TabsContent value="meals" className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Meal title" value={newMealTitle} onChange={e=>setNewMealTitle(e.target.value)} className="trainer-input flex-1" />
                      <Button onClick={addMealItem} disabled={!newMealTitle.trim()} className="trainer-button">Add</Button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {mealItems.map(m => (
                        <div key={m.id} className="flex items-center justify-between bg-slate-800/60 rounded-lg px-3 py-2 text-sm">
                          <span className="text-white truncate flex-1">{m.title}</span>
                          <button onClick={()=>removeMealItem(m.id)} className="text-slate-400 hover:text-red-400 ml-2"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                      {!mealItems.length && <p className="text-xs text-slate-500">No meals yet.</p>}
                    </div>
                  </TabsContent>
                </Tabs>
                  <div className="flex justify-end gap-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={()=>setPlanOpen(false)} 
                      className="border-slate-600 hover:bg-slate-800"
                    >
                      {t("cancel")}
                    </Button>
                    <Button 
                      onClick={savePlanDialog} 
                      disabled={!workoutItems.length && !mealItems.length} 
                      className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {t("savePlan")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trainee Modal */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingId ? t("editTrainee") : t("addNewTrainee")}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {t("fillTraineeDetails")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("fullName")}</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("enterFullName")}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("email")}</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("enterEmail")}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t("enterPhone")}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">{t("fitnessGoal")}</Label>
                  <Input
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    placeholder={t("fitnessGoalPlaceholder")}
                    className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-rose-500 transition-colors"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setModalOpen(false)} 
                  className="border-slate-600 hover:bg-slate-800"
                >
                  {t("cancel")}
                </Button>
                <Button 
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white" 
                  onClick={handleSave}
                >
                  {editingId ? t("update") : t("add")} {t("trainee")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DeleteDialog
            isOpen={deleteDialogOpen}
            title={t("deleteTrainee")}
            description={t("deleteTraineeConfirm")}
            itemName={traineeToDelete?.name}
            onConfirm={handleDeleteConfirm}
            onCancel={() => {
              setDeleteDialogOpen(false)
              setTraineeToDelete(null)
            }}
            isLoading={isDeleting}
          />
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
