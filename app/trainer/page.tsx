"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import DeleteDialog from "@/components/delete-dialog"
import { Users, Dumbbell, TrendingUp, Plus, Edit2, Trash2, Search, Award, CheckCircle2, Apple, Calendar, ListPlus, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { getPlan, savePlan, planSummary } from "@/lib/plans"
import { getMealSubmissions, getWorkoutSubmissions } from "@/lib/submissions"
import { useEffect } from "react"
import { toast } from "sonner"

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
  const [mealSubs, setMealSubs] = useState<any[]>([])
  const [workoutSubs, setWorkoutSubs] = useState<any[]>([])
  useEffect(() => {
    // Load recent submissions (client-only)
    setMealSubs(getMealSubmissions().slice(-10).reverse())
    setWorkoutSubs(getWorkoutSubmissions().slice(-10).reverse())
  }, [])
  const [trainees, setTrainees] = useState<Trainee[]>([
    {
      id: "1",
      name: "Muhammad Ali",
      email: "ali@example.com",
      phone: "+92-300-1234567",
      goal: "Build Muscle",
      joinDate: "2024-01-15",
      progress: 65,
      sessionsCompleted: 12,
      isActive: true,
    },
    {
      id: "2",
      name: "Aisha Khan",
      email: "aisha@example.com",
      phone: "+92-300-7654321",
      goal: "Weight Loss",
      joinDate: "2024-02-01",
      progress: 45,
      sessionsCompleted: 8,
      isActive: true,
    },
  ])

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

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill all required fields")
      return
    }

    if (editingId) {
      setTrainees(trainees.map((t) => (t.id === editingId ? { ...t, ...formData } : t)))
    } else {
      const newTrainee: Trainee = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        progress: 0,
        sessionsCompleted: 0,
        isActive: true,
      }
      setTrainees([...trainees, newTrainee])
    }
    setModalOpen(false)
  }

  const handleDeleteClick = (trainee: Trainee) => {
    setTraineeToDelete(trainee)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!traineeToDelete) return
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setTrainees(trainees.filter((t) => t.id !== traineeToDelete.id))
      toast.success("Trainee deleted successfully")
      setDeleteDialogOpen(false)
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

  return (
    <AuthGuard requiredRole="trainer">
      <FitproLayout role="trainer">
        <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Trainer Dashboard</h1>
          <p className="text-gray-400">Manage your trainees and track their progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Trainees</p>
                  <p className="text-3xl font-bold text-white">{trainees.length}</p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Trainees</p>
                  <p className="text-3xl font-bold text-white">{trainees.filter((t) => t.isActive).length}</p>
                </div>
                <Dumbbell className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-white">{trainees.reduce((sum, t) => sum + t.sessionsCompleted, 0)}</p>
                </div>
                <Award className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Avg Progress</p>
                  <p className="text-3xl font-bold text-cyan-500">{Math.round(trainees.reduce((sum, t) => sum + t.progress, 0) / trainees.length || 0)}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-cyan-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card className="fitpro-card">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white font-semibold">Recent User Submissions</h2>
              <span className="text-xs text-gray-400">Today & recent days</span>
            </div>
            {mealSubs.length === 0 && workoutSubs.length === 0 && (
              <p className="text-gray-400 text-sm">No submissions yet.</p>
            )}
            {[...workoutSubs.map(s => ({...s, _type: 'workout'})), ...mealSubs.map(s => ({...s, _type:'meals'}))]
              .sort((a,b)=>b.timestamp-a.timestamp)
              .slice(0,10)
              .map((s,idx)=> (
              <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-700/60 flex items-center justify-center">
                    {s._type==='workout' ? <Dumbbell className="w-4 h-4 text-blue-400"/> : <Apple className="w-4 h-4 text-green-400"/>}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium capitalize">{s.userName || 'User'} {s._type} submission</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1"><Calendar className="w-3 h-3"/> {s.date} • {s.tasks?.length || 0} items</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trainees List */}
        <Card className="fitpro-card">
          <CardContent className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search trainees..."
                  value={searchTrainee}
                  onChange={(e) => setSearchTrainee(e.target.value)}
                  className="fitpro-input pl-10 rounded-xl"
                />
              </div>
              <Button className="fitpro-button rounded-xl gap-2" onClick={handleAdd}>
                <Plus className="w-4 h-4" />
                Add Trainee
              </Button>
            </div>

            <div className="space-y-3">
              {filteredTrainees.length > 0 ? (
                filteredTrainees.map((trainee) => (
                  <div key={trainee.id} className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                            {trainee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{trainee.name}</p>
                            <p className="text-gray-400 text-sm">{trainee.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400">
                          <div>{trainee.phone}</div>
                          <div>Goal: {trainee.goal}</div>
                          <div>Sessions: {trainee.sessionsCompleted}</div>
                          <div>Joined: {trainee.joinDate}</div>
                        </div>
                      </div>

                        <div className="flex items-center gap-3">
                        <div className="text-center">
                          <p className="text-gray-400 text-xs mb-1">Progress</p>
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <p className="text-green-400 font-bold text-sm">{trainee.progress}%</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${trainee.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {trainee.isActive ? "Active" : "Inactive"}
                        </span>
                          {/* Plan summary badge */}
                          {(() => { const s = planSummary(trainee.id, today); return s.workouts || s.meals ? (
                            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">
                              Plan {s.workouts}W/{s.meals}M
                            </span>) : null })()}
                      </div>

                      <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400" onClick={() => handleEdit(trainee)}>
                      <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteClick(trainee)}>
                      <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-400" onClick={() => openPlan(trainee)}>
                        <ListPlus className="w-4 h-4" />
                      </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-8">No trainees found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Plan Dialog */}
        {planOpen && planUserId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={()=>setPlanOpen(false)} />
            <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <h2 className="text-white font-semibold flex items-center gap-2"><ListPlus className="w-5 h-5 text-emerald-400" /> Set Plan</h2>
                <button onClick={()=>setPlanOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6">
                <Tabs defaultValue="workouts" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="workouts">Workouts</TabsTrigger>
                    <TabsTrigger value="meals">Meals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="workouts" className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Workout title" value={newWorkoutTitle} onChange={e=>setNewWorkoutTitle(e.target.value)} className="flex-1" />
                      <Button onClick={addWorkoutItem} disabled={!newWorkoutTitle.trim()}>Add</Button>
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
                      <Input placeholder="Meal title" value={newMealTitle} onChange={e=>setNewMealTitle(e.target.value)} className="flex-1" />
                      <Button onClick={addMealItem} disabled={!newMealTitle.trim()}>Add</Button>
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
                  <Button variant="outline" onClick={()=>setPlanOpen(false)} className="border-slate-600">Cancel</Button>
                  <Button onClick={savePlanDialog} disabled={!workoutItems.length && !mealItems.length} className="bg-emerald-600 hover:bg-emerald-500">Save Plan</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trainee Modal */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">{editingId ? "Edit Trainee" : "Add New Trainee"}</DialogTitle>
              <DialogDescription className="text-gray-400">Fill in the trainee details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="fitpro-input rounded-xl"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                  className="fitpro-input rounded-xl"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone"
                  className="fitpro-input rounded-xl"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Fitness Goal</Label>
                <Input
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="e.g., Build Muscle, Weight Loss"
                  className="fitpro-input rounded-xl"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setModalOpen(false)} className="border-slate-600">
                Cancel
              </Button>
              <Button className="fitpro-button" onClick={handleSave}>
                {editingId ? "Update" : "Add"} Trainee
              </Button>
            </DialogFooter>
          </DialogContent>
          </Dialog>

             <DeleteDialog
                 isOpen={deleteDialogOpen}
          title="Delete Trainee?"
          description="Are you sure you want to delete this trainee? All associated data will be removed permanently."
          itemName={traineeToDelete?.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setDeleteDialogOpen(false)
            setTraineeToDelete(null)
          }}
          isLoading={isDeleting}
        />
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}
