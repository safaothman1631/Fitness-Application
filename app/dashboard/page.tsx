"use client"

import AppBottomNav from "@/components/app-bottom-nav"
import AuthTopbar from "@/components/auth-topbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Tag, Dumbbell, Utensils, HeartPulse, Play, Clock, Apple, Sandwich, ChevronRight, Droplet, Music2, Plus } from "lucide-react"
// Tabs not needed here; custom animated rotator below

interface TimelineItem {
  id: string
  icon: any
  title: string
  subtitle: string
  time: string
  accent?: string
}

const timeline: TimelineItem[] = [
  { id: "offer", icon: Tag, title: "Limited Offer: 20% off Premium", subtitle: "Upgrade today to unlock custom plans", time: "Now", accent: "" },
  { id: "workout", icon: Dumbbell, title: "Today's Workout: Full Body Strength", subtitle: "8 exercises • 45 min • Intermediate", time: "07:00" },
  { id: "breakfast", icon: Apple, title: "Breakfast", subtitle: "Oats + Berries • 420 kcal", time: "08:30" },
  { id: "lunch", icon: Sandwich, title: "Lunch", subtitle: "Grilled Chicken Salad • 560 kcal", time: "12:45" },
  { id: "snack", icon: Utensils, title: "Snack", subtitle: "Greek Yogurt • 180 kcal", time: "16:00" },
]

const defaultSchedule = [
  { id: "sched-workout", icon: Dumbbell, title: "Full Body Strength", subtitle: "45 min • 8 exercises" },
  { id: "sched-meal", icon: Utensils, title: "Meal Plan", subtitle: "3 meals • 2 snacks" },
  { id: "sched-physio", icon: HeartPulse, title: "Physiotherapy", subtitle: "Mobility session • 20 min" },
]

export default function DashboardPage() {
  const router = useRouter()
  const [scheduleItems, setScheduleItems] = useState<typeof defaultSchedule>(defaultSchedule)
  const [workoutOpen, setWorkoutOpen] = useState(false)
  const [mealOpen, setMealOpen] = useState(false)
  const [role, setRole] = useState<string | null>(null)

  // Load custom items from localStorage (if any)
  useEffect(() => {
    // Read role once on mount
    const r = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    setRole(r)
    // Only superadmin can have custom schedule additions
    if (r === "superadmin") {
      try {
        const raw = localStorage.getItem("customScheduleItems")
        if (raw) {
          const parsed = JSON.parse(raw) as Array<{ id: string; type: string; title: string; subtitle: string }>
          const mapped = parsed.map((p) => ({
            id: p.id,
            icon: p.type === "workout" ? Dumbbell : Utensils,
            title: p.title,
            subtitle: p.subtitle,
          }))
          setScheduleItems([...defaultSchedule, ...mapped])
        }
      } catch {}
    }
  }, [])

  const persistCustom = (items: Array<{ id: string; type: "workout" | "meal"; title: string; subtitle: string }>) => {
    localStorage.setItem("customScheduleItems", JSON.stringify(items))
  }

  const addWorkout = (title: string, duration: number, exercises: number) => {
    const id = `user-workout-${Date.now()}`
    const subtitle = `${duration} min • ${exercises} exercises`
    const newItem = { id, icon: Dumbbell, title, subtitle }
    setScheduleItems((prev) => {
      const next = [...prev, newItem]
      const customs = next
        .filter((i) => i.id.startsWith("user-workout-") || i.id.startsWith("user-meal-"))
        .map((i) => ({ id: i.id, type: i.id.startsWith("user-workout-") ? "workout" as const : "meal" as const, title: i.title, subtitle: i.subtitle }))
      persistCustom(customs)
      return next
    })
    setWorkoutOpen(false)
  }

  const addMeal = (title: string, meals: number, snacks: number) => {
    const id = `user-meal-${Date.now()}`
    const subtitle = `${meals} meals • ${snacks} snacks`
    const newItem = { id, icon: Utensils, title, subtitle }
    setScheduleItems((prev) => {
      const next = [...prev, newItem]
      const customs = next
        .filter((i) => i.id.startsWith("user-workout-") || i.id.startsWith("user-meal-"))
        .map((i) => ({ id: i.id, type: i.id.startsWith("user-workout-") ? "workout" as const : "meal" as const, title: i.title, subtitle: i.subtitle }))
      persistCustom(customs)
      return next
    })
    setMealOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col pb-20">
      <AuthTopbar />
      <div className="px-4 pt-4 max-w-md mx-auto w-full">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome back, ready for today's plan?</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-600/90 rounded-lg h-12 px-4 font-medium flex flex-col items-start justify-center">
            <span className="text-sm font-semibold flex items-center"><Play className="w-4 h-4 mr-1" /> Start Workout</span>
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Card className="bg-slate-900 border-slate-800 p-4 flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wide text-slate-400">Active Streak</span>
            <div className="text-2xl font-bold mt-2">6 <span className="text-sm font-medium text-slate-400">days</span></div>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-4 flex flex-col justify-between">
            <span className="text-xs uppercase tracking-wide text-slate-400">Calories Today</span>
            <div className="text-2xl font-bold mt-2">1,240 <span className="text-sm font-medium text-slate-400">kcal</span></div>
          </Card>
        </div>

        {/* Auto-Rotating Display (3 tabs cycling every 3s) */}
        <RotatingShowcase />

        {/* Timeline */}
        <SectionTitle title="Today's Timeline" />
        <div className="space-y-3">
          {timeline.map((item, idx) => (
            <TimelineRow key={item.id} item={item} first={idx === 0} />
          ))}
        </div>

        {/* Schedule */}
        <SectionTitle title="Today's Schedule" />
        <div className="space-y-3">
          {scheduleItems.map((s) => {
            // Map schedule id/title to a destination route
            const lower = s.title.toLowerCase()
            let to: string | null = null
            if (lower.includes("workout") || lower.includes("strength")) to = "/workout"
            else if (lower.includes("meal")) to = "/meals"
            else if (lower.includes("physio") || lower.includes("physio")) to = "/physio"
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => to && router.push(to)}
                className="group relative w-full text-left"
              >
                <Card
                  className="relative bg-slate-900 border-slate-800 p-5 pr-12 flex items-center gap-4 min-h-[96px] transition-colors group-hover:border-slate-700"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-base font-semibold leading-tight">{s.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{s.subtitle}</p>
                  </div>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-hover:text-slate-400" />
                </Card>
              </button>
            )
          })}
        </div>

        {/* Quick Actions (superadmin only) */}
        {role === "superadmin" && (
          <>
            <SectionTitle title="Quick Actions" />
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Sheet open={workoutOpen} onOpenChange={setWorkoutOpen}>
                <SheetTrigger asChild>
                  <div>
                    <QuickActionButton
                      icon={<Plus className="w-5 h-5" />}
                      label="Add Workout"
                      accent="from-green-500/60 to-emerald-500/40"
                    />
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-slate-900 border-t border-slate-800 text-white">
                  <SheetHeader>
                    <SheetTitle>Add Workout</SheetTitle>
                  </SheetHeader>
                  <AddWorkoutForm onSubmit={addWorkout} />
                  <SheetFooter />
                </SheetContent>
              </Sheet>

              <Sheet open={mealOpen} onOpenChange={setMealOpen}>
                <SheetTrigger asChild>
                  <div>
                    <QuickActionButton
                      icon={<Apple className="w-5 h-5" />}
                      label="Log Meal"
                      accent="from-pink-500/60 to-rose-500/40"
                    />
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-slate-900 border-t border-slate-800 text-white">
                  <SheetHeader>
                    <SheetTitle>Log Meal</SheetTitle>
                  </SheetHeader>
                  <LogMealForm onSubmit={addMeal} />
                  <SheetFooter />
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
      <AppBottomNav />
    </div>
  )
}

function QuickActionButton({ icon, label, accent, onClick }: { icon: React.ReactNode; label: string; accent: string; onClick?: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="group relative overflow-hidden h-14 rounded-2xl bg-slate-900 border-slate-800 text-white flex items-center justify-center gap-2"
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}></span>
      <span className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300`}></span>
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </span>
    </Button>
  )
}

function AddWorkoutForm({ onSubmit }: { onSubmit: (title: string, duration: number, exercises: number) => void }) {
  const [title, setTitle] = useState("Full Body (Custom)")
  const [duration, setDuration] = useState(40)
  const [exercises, setExercises] = useState(6)
  return (
    <form
      className="p-4 pt-0 space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(title.trim() || "Workout", Number(duration) || 30, Number(exercises) || 6)
      }}
    >
      <div className="space-y-2">
        <Label className="text-slate-300">Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-800 border-slate-700" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Duration (min)</Label>
          <Input type="number" min={5} max={180} value={duration} onChange={(e) => setDuration(parseInt(e.target.value || "0"))} className="bg-slate-800 border-slate-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Exercises</Label>
          <Input type="number" min={1} max={30} value={exercises} onChange={(e) => setExercises(parseInt(e.target.value || "0"))} className="bg-slate-800 border-slate-700" />
        </div>
      </div>
      <div className="pt-2">
        <Button type="submit" className="bg-green-600 hover:bg-green-600/90 w-full">Save Workout</Button>
      </div>
    </form>
  )
}

function LogMealForm({ onSubmit }: { onSubmit: (title: string, meals: number, snacks: number) => void }) {
  const [title, setTitle] = useState("Meal Plan (Custom)")
  const [meals, setMeals] = useState(3)
  const [snacks, setSnacks] = useState(2)
  return (
    <form
      className="p-4 pt-0 space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(title.trim() || "Meal Plan", Number(meals) || 3, Number(snacks) || 1)
      }}
    >
      <div className="space-y-2">
        <Label className="text-slate-300">Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-slate-800 border-slate-700" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Meals</Label>
          <Input type="number" min={1} max={8} value={meals} onChange={(e) => setMeals(parseInt(e.target.value || "0"))} className="bg-slate-800 border-slate-700" />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Snacks</Label>
          <Input type="number" min={0} max={6} value={snacks} onChange={(e) => setSnacks(parseInt(e.target.value || "0"))} className="bg-slate-800 border-slate-700" />
        </div>
      </div>
      <div className="pt-2">
        <Button type="submit" className="bg-pink-600 hover:bg-pink-600/90 w-full">Save Meal</Button>
      </div>
    </form>
  )
}

function RotatingShowcase() {
  // Simplified: single active index, map over items; CSS transitions handle fade/slide.
  const items = [
    {
      key: "one",
      title: "Hydrate Pro",
      desc: "Smart reminders and intake tracking",
      icon: <Droplet className="w-6 h-6 text-cyan-400" />,
      radius: "999px",
      bg: "rgba(34,211,238,0.25)",
      transform: "scale(1)",
    },
    {
      key: "two",
      title: "Fit Watch",
      desc: "Real-time stats on your wrist",
      icon: <Clock className="w-6 h-6 text-emerald-400" />,
      radius: "14px",
      bg: "rgba(16,185,129,0.25)",
      transform: "rotate(10deg) scale(1.05)",
    },
    {
      key: "three",
      title: "Gym Beats",
      desc: "Curated playlists for workouts",
      icon: <Music2 className="w-6 h-6 text-pink-400" />,
      radius: "10px",
      bg: "rgba(244,114,182,0.25)",
      transform: "scale(1.05)",
    },
  ] as const

  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % items.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const advance = () => setIndex(i => (i + 1) % items.length)

  return (
    <div className="mt-6 relative h-36">
      {items.map((item, i) => {
        const active = i === index
        return (
          <Card
            key={item.key}
            onClick={advance}
            className={`absolute inset-0 bg-slate-900 border-slate-800 p-6 flex items-center gap-5 overflow-hidden transition-all duration-500 ease-out cursor-pointer ${active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 pointer-events-none"}`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute right-4 bottom-4 w-8 h-8 transition-all duration-500 ease-in-out"
              style={{ borderRadius: item.radius, background: item.bg, transform: active ? item.transform : "scale(0.85)", opacity: active ? 1 : 0 }}
            />
            <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-base font-semibold leading-tight">{item.title}</p>
              <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              <p className="text-[10px] text-slate-500 mt-2">tap to next</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

// FeatureIcon replaced by AdStrip component

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-sm font-semibold mt-8 mb-4">{title}</h2>
}

function TimelineRow({ item, first }: { item: TimelineItem; first?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800" />
      <Card className="bg-slate-900 border-slate-800 p-4 pl-12 flex items-start gap-4">
        <div className="absolute left-2 top-4 w-4 h-4 rounded-full bg-green-500" />
        <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center">
          <item.icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-tight">{item.title}</p>
          <p className="text-xs text-slate-400 mt-1">{item.subtitle}</p>
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap">{item.time}</span>
      </Card>
    </div>
  )
}
