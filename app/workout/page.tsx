"use client"

import AppBottomNav from "@/components/app-bottom-nav"
import { useEffect, useState } from "react"
import { Dumbbell, Clock, Plus, ListOrdered, Flame, CalendarDays, CheckCircle2, Circle } from "lucide-react"
import { submitWorkout, hasSubmittedWorkoutToday } from "@/lib/submissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ViewMode = "day" | "week" | "month"

export default function WorkoutPage() {
  // Role-gated UI: only superadmin can add
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [view, setView] = useState<ViewMode>("day")
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [submittedToday, setSubmittedToday] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    setIsSuperadmin(role === "superadmin")
    try {
      const raw = localStorage.getItem("workoutTasksCompleted")
      if (raw) setCompleted(JSON.parse(raw))
    } catch {}
    setSubmittedToday(hasSubmittedWorkoutToday())
  }, [])

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("workoutTasksCompleted", JSON.stringify(next)) } catch {}
      return next
    })
  }

  // Placeholder data; wire to Firestore later
  const recentWorkouts = [
    { id: "w1", name: "Full Body Blast", duration: 42, calories: 380 },
    { id: "w2", name: "Upper Strength", duration: 35, calories: 290 },
    { id: "w3", name: "Core Focus", duration: 25, calories: 180 },
  ]
  const muscleGroups = ["Chest", "Back", "Legs", "Core", "Arms", "Shoulders"]

  const daySchedule = [
    { time: "07:00", title: "Mobility & Warm-up" },
    { time: "18:00", title: "Strength - Upper Body" },
  ]
  const weekSchedule = [
    { day: "Mon", title: "Push" },
    { day: "Tue", title: "Pull" },
    { day: "Wed", title: "Legs" },
    { day: "Thu", title: "Core" },
    { day: "Fri", title: "Cardio" },
    { day: "Sat", title: "Rest" },
    { day: "Sun", title: "Active" },
  ]
  const monthSchedule = [
    { date: "Nov 10", title: "Deload Week Start" },
    { date: "Nov 17", title: "Volume Block" },
    { date: "Nov 24", title: "Testing" },
  ]

  const handleSubmitDay = () => {
    if (submitting) return
    setSubmitting(true)
    // Collect all completed ids for current view (limit to 'day' tasks for now)
    const tasks = Object.entries(completed)
      .filter(([k,v]) => v && k.startsWith("day-"))
      .map(([k]) => k)
    submitWorkout(tasks)
    setSubmittedToday(true)
    setTimeout(() => setSubmitting(false), 400)
  }

  return (
    <div className="pb-24 max-w-md mx-auto">
      <header className="pt-6 pb-4 px-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Dumbbell className="w-6 h-6 text-blue-400" /> Workout Center</h1>
        <p className="text-slate-400 text-sm mt-1">Plan, start, and review your training sessions.</p>
        {isSuperadmin && (
          <div className="mt-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> New Workout</Button>
          </div>
        )}
      </header>

      <section className="px-4 space-y-4">
        {/* Schedule selector */}
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><CalendarDays className="w-4 h-4 text-blue-400" /> Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              {(["day","week","month"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-blue-600 text-white border-blue-500":"bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800"}`}
                >
                  {v.toUpperCase()}
                </button>
              ))}
            </div>

            {view === "day" && (
              <div className="space-y-2">
                {daySchedule.map((s, i) => {
                  const id = `day-${s.time}-${s.title}`
                  const done = !!completed[id]
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <span className="text-slate-300 text-xs">{s.time}</span>
                      <button onClick={() => toggleTask(id)} className="flex items-center gap-2">
                        <span className={`text-white text-sm font-medium ${done ? 'line-through text-slate-500' : ''}`}>{s.title}</span>
                        {done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  )
                })}
                {!daySchedule.length && <p className="text-slate-500 text-sm">No items today.</p>}
              </div>
            )}

            {view === "week" && (
              <div className="space-y-2">
                {weekSchedule.map((d, i) => {
                  const id = `week-${d.day}-${d.title}`
                  const done = !!completed[id]
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <span className="text-slate-300 text-xs w-10">{d.day}</span>
                      <button onClick={() => toggleTask(id)} className="flex items-center gap-2 flex-1 justify-end">
                        <span className={`text-white text-sm font-medium ${done ? 'line-through text-slate-500' : ''}`}>{d.title}</span>
                        {done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  )
                })}
                {!weekSchedule.length && <p className="text-slate-500 text-sm">No items this week.</p>}
              </div>
            )}

            {view === "month" && (
              <div className="space-y-2">
                {monthSchedule.map((m, i) => {
                  const id = `month-${m.date}-${m.title}`
                  const done = !!completed[id]
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <span className="text-slate-300 text-xs">{m.date}</span>
                      <button onClick={() => toggleTask(id)} className="flex items-center gap-2">
                        <span className={`text-white text-sm font-medium ${done ? 'line-through text-slate-500' : ''}`}>{m.title}</span>
                        {done ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-slate-500" />}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit (user performs; superadmin & trainer will view externally) */}
        {view === "day" && (
          <div className="mt-2">
            <Button
              disabled={submittedToday || submitting}
              onClick={handleSubmitDay}
              className="w-full bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500"
            >
              {submittedToday ? "Submitted" : submitting ? "Submitting..." : "Submit Today's Workout"}
            </Button>
            {submittedToday && <p className="text-[11px] text-slate-500 mt-2 text-center">You already submitted today. Trainers & superadmin can view it.</p>}
          </div>
        )}

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentWorkouts.map(w => (
              <div key={w.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                <div>
                  <p className="text-white text-sm font-semibold">{w.name}</p>
                  <p className="text-slate-400 text-xs">{w.duration} min • {w.calories} kcal</p>
                </div>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
            ))}
            {!recentWorkouts.length && <p className="text-slate-500 text-sm">No workouts yet.</p>}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><ListOrdered className="w-4 h-4 text-blue-400" /> Muscle Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {muscleGroups.map(m => (
                <div key={m} className="p-3 rounded-lg bg-slate-800/40 text-center text-xs font-medium text-slate-200 border border-slate-700/50">
                  {m}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><Dumbbell className="w-4 h-4 text-blue-400" /> Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {isSuperadmin && (
              <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Plus className="w-4 h-4" />Template</Button>
            )}
            <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Dumbbell className="w-4 h-4" />Favorites</Button>
            <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Clock className="w-4 h-4" />History</Button>
            <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Flame className="w-4 h-4" />Calories</Button>
          </CardContent>
        </Card>
      </section>

      <AppBottomNav />
    </div>
  )
}
