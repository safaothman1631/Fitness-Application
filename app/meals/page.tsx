"use client"

import AppBottomNav from "@/components/app-bottom-nav"
import { useEffect, useState } from "react"
import { Apple, Sandwich, Utensils, Flame, Plus, Timer, CalendarDays, CheckCircle2, Circle } from "lucide-react"
import { submitMeal, hasSubmittedMealToday } from "@/lib/submissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ViewMode = "day" | "week" | "month"

export default function MealsPage() {
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [view, setView] = useState<ViewMode>("day")
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [submittedToday, setSubmittedToday] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    setIsSuperadmin(role === "superadmin")
    try {
      const raw = localStorage.getItem("mealTasksCompleted")
      if (raw) setCompleted(JSON.parse(raw))
    } catch {}
    setSubmittedToday(hasSubmittedMealToday())
  }, [])

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("mealTasksCompleted", JSON.stringify(next)) } catch {}
      return next
    })
  }

  const todayMeals = [
    { id: "m1", name: "Breakfast Oats", calories: 320, time: "08:00" },
    { id: "m2", name: "Grilled Chicken", calories: 540, time: "13:00" },
    { id: "m3", name: "Greek Yogurt", calories: 180, time: "16:30" },
  ]
  const macros = {
    protein: 92,
    carbs: 140,
    fat: 46,
    calories: todayMeals.reduce((a, m) => a + m.calories, 0)
  }

  const daySchedule = [
    { time: "08:00", title: "Breakfast" },
    { time: "13:00", title: "Lunch" },
    { time: "19:00", title: "Dinner" },
  ]
  const weekSchedule = [
    { day: "Mon", title: "High Protein" },
    { day: "Tue", title: "Low Carb" },
    { day: "Wed", title: "Balanced" },
    { day: "Thu", title: "High Fiber" },
    { day: "Fri", title: "Refuel" },
    { day: "Sat", title: "Free" },
    { day: "Sun", title: "Prep" },
  ]
  const monthSchedule = [
    { date: "Nov 10", title: "Meal Prep Week" },
    { date: "Nov 17", title: "Cut Phase" },
    { date: "Nov 24", title: "Refuel Weekend" },
  ]

  const handleSubmitDay = () => {
    if (submitting) return
    setSubmitting(true)
    const tasks = Object.entries(completed)
      .filter(([k,v]) => v && k.startsWith("day-"))
      .map(([k]) => k)
    submitMeal(tasks)
    setSubmittedToday(true)
    setTimeout(() => setSubmitting(false), 400)
  }

  return (
    <div className="pb-24 max-w-md mx-auto">
      <header className="pt-6 pb-4 px-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Apple className="w-6 h-6 text-green-400" /> Meals & Nutrition</h1>
        <p className="text-slate-400 text-sm mt-1">Track daily meals and macro goals.</p>
        {isSuperadmin && (
          <div className="mt-4">
            <Button className="w-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Meal</Button>
          </div>
        )}
      </header>

      <section className="px-4 space-y-4">
        {/* Schedule selector */}
        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><CalendarDays className="w-4 h-4 text-green-400" /> Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              {(["day","week","month"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-green-600 text-white border-green-500":"bg-slate-800/50 text-slate-300 border-slate-700 hover:bg-slate-800"}`}
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
              className="w-full bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-500"
            >
              {submittedToday ? "Submitted" : submitting ? "Submitting..." : "Submit Today's Meals"}
            </Button>
            {submittedToday && <p className="text-[11px] text-slate-500 mt-2 text-center">You already submitted today. Trainers & superadmin can view it.</p>}
          </div>
        )}

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><Flame className="w-4 h-4 text-green-400" /> Today's Macros</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-xs text-slate-400">Protein</p>
              <p className="text-white font-semibold text-sm">{macros.protein}g</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Carbs</p>
              <p className="text-white font-semibold text-sm">{macros.carbs}g</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Fat</p>
              <p className="text-white font-semibold text-sm">{macros.fat}g</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Calories</p>
              <p className="text-white font-semibold text-sm">{macros.calories}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><Sandwich className="w-4 h-4 text-green-400" /> Today's Meals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMeals.map(m => {
              const id = `meal-${m.id}`
              const done = !!completed[id]
              return (
              <div key={m.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-white text-sm font-semibold leading-tight ${done ? 'line-through text-slate-500' : ''}`}>{m.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{m.time} • {m.calories} kcal</p>
                  </div>
                  <button onClick={() => toggleTask(id)} className="flex items-center gap-2 text-[10px] text-slate-400">
                    {done ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-500" />}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">Protein</p>
                    <p className="text-xs text-slate-200 font-medium">{Math.round(m.calories*0.3/4)}g</p>
                    <div className="h-1.5 mt-1 rounded bg-slate-700 overflow-hidden"><div className="h-full bg-green-500" style={{width:'60%'}}></div></div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">Carbs</p>
                    <p className="text-xs text-slate-200 font-medium">{Math.round(m.calories*0.45/4)}g</p>
                    <div className="h-1.5 mt-1 rounded bg-slate-700 overflow-hidden"><div className="h-full bg-emerald-400" style={{width:'50%'}}></div></div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-500">Fat</p>
                    <p className="text-xs text-slate-200 font-medium">{Math.round(m.calories*0.25/9)}g</p>
                    <div className="h-1.5 mt-1 rounded bg-slate-700 overflow-hidden"><div className="h-full bg-lime-400" style={{width:'40%'}}></div></div>
                  </div>
                </div>
              </div>
            )})}
            {!todayMeals.length && <p className="text-slate-500 text-sm">No meals logged.</p>}
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><Utensils className="w-4 h-4 text-green-400" /> Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {isSuperadmin && (
              <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Plus className="w-4 h-4" />Preset</Button>
            )}
            <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Sandwich className="w-4 h-4" />Snacks</Button>
            <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Apple className="w-4 h-4" />Fruits</Button>
            <Button variant="outline" className="h-14 flex flex-col items-center justify-center gap-1 border-slate-700 text-xs text-slate-200 bg-slate-800/40 hover:bg-slate-800"><Flame className="w-4 h-4" />Burn Rate</Button>
          </CardContent>
        </Card>
      </section>

      <AppBottomNav />
    </div>
  )
}
