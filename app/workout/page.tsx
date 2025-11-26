"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
<<<<<<< HEAD
import AuthGuard from "@/components/auth-guard"
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
import { Dumbbell, Clock, Plus, ListOrdered, Flame, CalendarDays, CheckCircle2, Circle, LayoutDashboard, Utensils, HeartPulse, User, Calendar, Award, Target, Play, Image as ImageIcon, Film } from "lucide-react"
import { submitWorkout, hasSubmittedWorkoutToday } from "@/lib/submissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import SubscriptionRequiredGuard from "@/components/subscription-guard"
import { PageTransition } from "@/components/page-transition"
import { useLanguage } from "@/hooks/useLanguage"
import { BottomNav } from "@/components/bottom-nav"
import type { TranslationKey } from "@/lib/translations"

type ViewMode = "day" | "week" | "month"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  duration?: string
  notes?: string
  videoUrl?: string
<<<<<<< HEAD
  videoUrls?: string[]
  videos?: Array<{ name: string; url: string; sets: string; reps: string; notes: string }>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  gifUrl?: string
  imageUrl?: string
  muscleGroup: string
}

interface DayWorkout {
  day: string // "Monday", "Tuesday", etc.
  exercises: Exercise[]
}

export default function WorkoutPage() {
  const router = useRouter()
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [view, setView] = useState<ViewMode>("week")
  const [viewTransition, setViewTransition] = useState(true)
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [submittedToday, setSubmittedToday] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [workoutSchedule, setWorkoutSchedule] = useState<DayWorkout[]>([])
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  // Get exercise ordinal translation key
  const getExerciseOrdinal = (num: number): TranslationKey => {
    const ordinals: TranslationKey[] = [
      "exerciseFirst", "exerciseSecond", "exerciseThird", "exerciseFourth", "exerciseFifth",
      "exerciseSixth", "exerciseSeventh", "exerciseEighth", "exerciseNinth", "exerciseTenth"
    ]
    return ordinals[num - 1] || "exerciseFirst"
  }

  useEffect(() => {
    setMounted(true)
    const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    setIsSuperadmin(role === "superadmin")
    try {
      const raw = localStorage.getItem("workoutTasksCompleted")
      if (raw) setCompleted(JSON.parse(raw))
    } catch {}
    setSubmittedToday(hasSubmittedWorkoutToday())
    
<<<<<<< HEAD
    // Load workout programs from Firestore
    fetchUserWorkoutPrograms()
  }, [])

  const fetchUserWorkoutPrograms = async () => {
    try {
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null
      if (!userId) {
        console.log('⚠️ No userId found')
        return
      }

      console.log('🔍 Fetching workout programs for user:', userId)
      const response = await fetch(`/api/programs?type=workout&userId=${userId}`)
      
      if (!response.ok) {
        console.error('❌ Failed to fetch programs')
        return
      }

      const programs = await response.json()
      console.log('✅ Fetched programs:', programs)

      // Convert programs to workout schedule format
      if (programs.length > 0) {
        const schedule: DayWorkout[] = []
        
        // Combine all programs' weekly schedules
        programs.forEach((program: any) => {
          if (program.weeklySchedule) {
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            days.forEach(day => {
              const dayData = program.weeklySchedule[day]
              if (dayData && dayData.exercises && dayData.exercises.length > 0 && !dayData.rest) {
                const dayName = day.charAt(0).toUpperCase() + day.slice(1)
                const existingDay = schedule.find(d => d.day === dayName)
                
                if (existingDay) {
                  // Add exercises to existing day
                  existingDay.exercises.push(...dayData.exercises.map((ex: any, idx: number) => ({
                    id: `${program.id}-${day}-${idx}`,
                    name: ex.name,
                    sets: parseInt(ex.sets) || 0,
                    reps: ex.reps || '',
                    notes: ex.notes || '',
                    videoUrl: ex.videos?.[0]?.url || ex.videoUrls?.[0] || '',
                    videoUrls: ex.videoUrls || [],
                    videos: ex.videos || [],
                    muscleGroup: program.targetMuscles || 'General'
                  })))
                } else {
                  // Create new day
                  schedule.push({
                    day: dayName,
                    exercises: dayData.exercises.map((ex: any, idx: number) => ({
                      id: `${program.id}-${day}-${idx}`,
                      name: ex.name,
                      sets: parseInt(ex.sets) || 0,
                      reps: ex.reps || '',
                      notes: ex.notes || '',
                      videoUrl: ex.videos?.[0]?.url || ex.videoUrls?.[0] || '',
                      videoUrls: ex.videoUrls || [],
                      videos: ex.videos || [],
                      muscleGroup: program.targetMuscles || 'General'
                    }))
                  })
                }
              }
            })
          }
        })

        setWorkoutSchedule(schedule)
        console.log('✅ Workout schedule set:', schedule)
      } else {
        console.log('ℹ️ No programs assigned to user')
        setWorkoutSchedule([])
      }
    } catch (error) {
      console.error('❌ Error fetching workout programs:', error)
      setWorkoutSchedule([])
    }
  }

  // Empty workout schedule - will be fetched from database
  const defaultWorkoutSchedule: DayWorkout[] = []
=======
    // Load workout schedule (from localStorage for now, later from Firestore)
    try {
      const saved = localStorage.getItem("weeklyWorkoutSchedule")
      if (saved) {
        setWorkoutSchedule(JSON.parse(saved))
      } else {
        // Default workout schedule
        setWorkoutSchedule(defaultWorkoutSchedule)
      }
    } catch {
      setWorkoutSchedule(defaultWorkoutSchedule)
    }
  }, [])

  // Default workout schedule - will be managed by superadmin
  const defaultWorkoutSchedule: DayWorkout[] = [
    {
      day: "Monday",
      exercises: [
        {
          id: "mon1",
          name: t("barbellBenchPress"),
          sets: 4,
          reps: "8-10",
          notes: t("focusControlledMovement"),
          muscleGroup: "Chest",
          videoUrl: "https://example.com/bench-press.mp4",
          imageUrl: "/exercises/bench-press.jpg"
        },
        {
          id: "mon2",
          name: t("inclineDumbbellPress"),
          sets: 3,
          reps: "10-12",
          muscleGroup: "Chest",
          gifUrl: "/exercises/incline-press.gif"
        },
        {
          id: "mon3",
          name: t("cableFlyes"),
          sets: 3,
          reps: "12-15",
          notes: t("squeezeAtPeak"),
          muscleGroup: "Chest"
        }
      ]
    },
    {
      day: "Tuesday",
      exercises: [
        {
          id: "tue1",
          name: "Deadlift",
          sets: 4,
          reps: "6-8",
          notes: t("keepBackStraightEngageCore"),
          muscleGroup: "Back",
          videoUrl: "https://example.com/deadlift.mp4"
        },
        {
          id: "tue2",
          name: "Pull-ups",
          sets: 3,
          reps: "8-10",
          muscleGroup: "Back"
        },
        {
          id: "tue3",
          name: "Barbell Rows",
          sets: 4,
          reps: "8-10",
          muscleGroup: "Back"
        }
      ]
    },
    {
      day: "Wednesday",
      exercises: [
        {
          id: "wed1",
          name: "Squats",
          sets: 4,
          reps: "8-10",
          notes: t("goDeepKeepChestUp"),
          muscleGroup: "Legs",
          videoUrl: "https://example.com/squats.mp4"
        },
        {
          id: "wed2",
          name: "Leg Press",
          sets: 3,
          reps: "12-15",
          muscleGroup: "Legs"
        },
        {
          id: "wed3",
          name: "Leg Curls",
          sets: 3,
          reps: "12-15",
          muscleGroup: "Legs"
        }
      ]
    },
    {
      day: "Thursday",
      exercises: [
        {
          id: "thu1",
          name: "Shoulder Press",
          sets: 4,
          reps: "8-10",
          muscleGroup: "Shoulders"
        },
        {
          id: "thu2",
          name: "Lateral Raises",
          sets: 3,
          reps: "12-15",
          muscleGroup: "Shoulders"
        },
        {
          id: "thu3",
          name: "Face Pulls",
          sets: 3,
          reps: "15-20",
          muscleGroup: "Shoulders"
        }
      ]
    },
    {
      day: "Friday",
      exercises: [
        {
          id: "fri1",
          name: "Barbell Curl",
          sets: 3,
          reps: "10-12",
          muscleGroup: "Arms"
        },
        {
          id: "fri2",
          name: "Tricep Dips",
          sets: 3,
          reps: "10-12",
          muscleGroup: "Arms"
        },
        {
          id: "fri3",
          name: "Hammer Curls",
          sets: 3,
          reps: "12-15",
          muscleGroup: "Arms"
        }
      ]
    },
    {
      day: "Saturday",
      exercises: [
        {
          id: "sat1",
          name: "Plank",
          sets: 3,
          duration: "60 seconds",
          reps: "Hold",
          muscleGroup: "Core"
        },
        {
          id: "sat2",
          name: "Russian Twists",
          sets: 3,
          reps: "20 each side",
          muscleGroup: "Core"
        },
        {
          id: "sat3",
          name: "Leg Raises",
          sets: 3,
          reps: "15-20",
          muscleGroup: "Core"
        }
      ]
    },
    {
      day: "Sunday",
      exercises: [
        {
          id: "sun1",
          name: "Rest Day",
          sets: 0,
          reps: "Active Recovery",
          notes: t("lightStretchingYogaWalking"),
          muscleGroup: "Recovery"
        }
      ]
    }
  ]
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("workoutTasksCompleted", JSON.stringify(next)) } catch {}
      return next
    })
  }

  const handleViewChange = (newView: ViewMode) => {
    if (newView === view) return
    // Fade out
    setViewTransition(false)
    setTimeout(() => {
      setView(newView)
      // Fade in
      setTimeout(() => setViewTransition(true), 50)
    }, 200)
  }

  // Get today's workout (find current day)
  const getTodayWorkout = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = days[new Date().getDay()]
    return workoutSchedule.find(d => d.day === today) || workoutSchedule[0]
  }

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

  if (!mounted) {
    return null
  }

  return (
<<<<<<< HEAD
    <AuthGuard requiredRole="user">
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    <SubscriptionRequiredGuard>
    <PageTransition>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent mb-2">
          {t("workoutCenter")}
        </h1>
        <p className="text-[#B6C4CF] mb-8">{t("workoutCenterSubtitle")}</p>

        <Card className="bg-gradient-to-r from-[#9333EA] to-[#C084FC] border-none p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">{t("buildYourStrength")}</h3>
            <p className="text-white/90 text-sm mb-4">{t("buildYourStrengthDesc")}</p>
            {isSuperadmin && (
              <Button className="bg-white text-[#9333EA] hover:bg-white/90 font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> New Workout</Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Dumbbell} label={t("totalWorkouts")} value="24" color="#9333EA" isRTL={isRTL} />
          <StatsCard icon={Calendar} label={t("activeStreak")} value={`7 ${t("days")}`} color="#A855F7" isRTL={isRTL} />
          <StatsCard icon={Flame} label={t("caloriesBurned")} value="1,450" color="#C084FC" isRTL={isRTL} />
          <StatsCard icon={Clock} label={t("totalTime")} value={`42 ${t("min")}`} color="#9333EA" isRTL={isRTL} />
        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className={`pb-2 ${isRTL ? 'text-right' : ''}`}>
            <CardTitle className={`text-white text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><CalendarDays className="w-4 h-4 text-purple-400" /> {t("schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
<<<<<<< HEAD
              {(["day","week"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => handleViewChange(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-cyan-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-cyan-500/30"}`}
                >
                  {v === "day" ? t("today") : t("week")}
=======
              {(["day","week","month"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => handleViewChange(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-[#9333EA] to-[#C084FC] text-white border-purple-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-purple-500/30"}`}
                >
                  {v === "day" ? t("today") : v === "week" ? t("week") : t("monthView")}
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                </button>
              ))}
            </div>

            <div 
              style={{
                opacity: viewTransition ? 1 : 0,
                transform: viewTransition ? 'scale(1)' : 'scale(0.98)',
                filter: viewTransition ? 'blur(0px)' : 'blur(8px)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out, filter 0.3s ease-out'
              }}
            >
            {view === "day" && (
              <div className="space-y-2">
                {(() => {
                  const todayWorkout = getTodayWorkout()
<<<<<<< HEAD
                  
                  if (!todayWorkout || todayWorkout.exercises.length === 0) {
                    return (
                      <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                        <CardContent className="text-center py-16 px-6">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/10 border border-purple-500/20">
                              <Calendar className="w-12 h-12 text-purple-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
                              <span className="text-yellow-400 text-lg">✨</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {language === 'ku' ? 'ئەمڕۆ وەرزش نییە' : language === 'ar' ? 'لا توجد تمارين اليوم' : 'No Workout Today'}
                          </h3>
                          <p className="text-gray-400 mb-6 text-base max-w-sm mx-auto">
                            {language === 'ku' ? 'هیچ وەرزشێک بۆ ئەمڕۆ دیاری نەکراوە' : language === 'ar' ? 'لم يتم تحديد تمارين لهذا اليوم' : 'No workout scheduled for today'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                              <Calendar className="w-4 h-4 mr-2" />
                              {language === 'ku' ? 'رۆژانی تر ببینە' : language === 'ar' ? 'تحقق من الأيام الأخرى' : 'Check Other Days'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                  const exerciseCount = todayWorkout.exercises.length
                  const isRestDay = todayWorkout.exercises[0]?.muscleGroup === "Recovery"
                  
                  return (
                    <button
                      onClick={() => setSelectedDay(todayWorkout.day)}
                      className={`w-full grid items-center gap-0 p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-purple-500/50 transition-all duration-300 group ${isRTL ? 'grid-cols-[80px_1fr_auto]' : 'grid-cols-[80px_1fr_auto]'}`}
                    >
                      {/* Right column for RTL: Play button + muscle tag */}
                      <div className={`flex items-center gap-2 justify-end ${isRTL ? 'order-3' : 'order-3'}`}>
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <Play className={`w-4 h-4 text-purple-400 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                        {!isRestDay && todayWorkout.exercises[0]?.muscleGroup && (
                          <div className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs whitespace-nowrap">
                            {t(todayWorkout.exercises[0].muscleGroup.toLowerCase() === "chest" ? "chest" : 
                               todayWorkout.exercises[0].muscleGroup.toLowerCase() === "back" ? "backMuscle" : 
                               todayWorkout.exercises[0].muscleGroup.toLowerCase() === "legs" ? "legs" : 
                               todayWorkout.exercises[0].muscleGroup.toLowerCase() === "shoulders" ? "shoulders" : 
                               todayWorkout.exercises[0].muscleGroup.toLowerCase() === "arms" ? "arms" : "core")}
                          </div>
                        )}
                      </div>
                      
                      {/* Center: Text content */}
                      <div className={`order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-white font-semibold text-sm">{t("todaysWorkout")} - {t(todayWorkout.day.toLowerCase() as any)}</p>
                        <p className="text-[#B6C4CF] text-xs">
                          {isRestDay ? t("restAndRecovery") : `${exerciseCount} ${t("exercisesCount")}`}
                        </p>
                      </div>
                      
                      {/* Left column for RTL: Icon */}
                      <div className={`flex ${isRTL ? 'justify-end order-1' : 'justify-start order-1'}`}>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isRestDay ? 'bg-slate-800/50' : 'bg-gradient-to-br from-purple-600 to-purple-500'}`}>
                          {isRestDay ? (
                            <Calendar className="w-5 h-5 text-slate-400" />
                          ) : (
                            <Dumbbell className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })()}
              </div>
            )}

            {view === "week" && (
              <div className="space-y-2">
                {workoutSchedule.map((dayWorkout, i) => {
                  const exerciseCount = dayWorkout.exercises.length
                  const isRestDay = dayWorkout.exercises[0]?.muscleGroup === "Recovery"
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(dayWorkout.day)}
                      className={`w-full grid items-center gap-0 p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-purple-500/50 transition-all duration-300 group ${isRTL ? 'grid-cols-[80px_1fr_auto]' : 'grid-cols-[80px_1fr_auto]'}`}
                    >
                      {/* Right column for RTL: Play button + muscle tag */}
                      <div className={`flex items-center gap-2 justify-end ${isRTL ? 'order-3' : 'order-3'}`}>
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <Play className={`w-4 h-4 text-purple-400 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                        {!isRestDay && dayWorkout.exercises[0]?.muscleGroup && (
                          <div className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs whitespace-nowrap">
                            {t(dayWorkout.exercises[0].muscleGroup.toLowerCase() === "chest" ? "chest" : 
                               dayWorkout.exercises[0].muscleGroup.toLowerCase() === "back" ? "backMuscle" : 
                               dayWorkout.exercises[0].muscleGroup.toLowerCase() === "legs" ? "legs" : 
                               dayWorkout.exercises[0].muscleGroup.toLowerCase() === "shoulders" ? "shoulders" : 
                               dayWorkout.exercises[0].muscleGroup.toLowerCase() === "arms" ? "arms" : "core")}
                          </div>
                        )}
                      </div>
                      
                      {/* Center: Text content */}
                      <div className={`order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-white font-semibold text-sm">{t(dayWorkout.day.toLowerCase() as any)}</p>
                        <p className="text-[#B6C4CF] text-xs">
                          {isRestDay ? t("restAndRecovery") : `${exerciseCount} ${t("exercisesCount")}`}
                        </p>
                      </div>
                      
                      {/* Left column for RTL: Icon */}
                      <div className={`flex ${isRTL ? 'justify-end order-1' : 'justify-start order-1'}`}>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isRestDay ? 'bg-slate-800/50' : 'bg-gradient-to-br from-purple-600 to-purple-500'}`}>
                          {isRestDay ? (
                            <Calendar className="w-5 h-5 text-slate-400" />
                          ) : (
                            <Dumbbell className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
<<<<<<< HEAD
                {!workoutSchedule.length && (
                  <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                    <CardContent className="text-center py-20 px-6">
                      <div className="relative inline-block mb-6">
                        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center shadow-2xl shadow-purple-500/20 border border-purple-500/30">
                          <Dumbbell className="w-14 h-14 text-purple-400" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">💪</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {language === 'ku' ? 'خشتەی وەرزش نییە' : language === 'ar' ? 'لا يوجد جدول تمارين' : 'No Workout Schedule'}
                      </h3>
                      <p className="text-gray-400 mb-2 text-lg max-w-md mx-auto">
                        {language === 'ku' ? 'مەشقگەرەکەت خشتەی وەرزشت بۆ دیاری دەکات' : language === 'ar' ? 'سيقوم مدربك بتعيين جدول التمارين لك' : 'Your trainer will assign a workout schedule to you'}
                      </p>
                      <p className="text-gray-500 text-sm mb-8">
                        {language === 'ku' ? 'دواتر سەردانی بکەرەوە یان پەیوەندی بە مەشقگەرەکەتەوە بکە' : language === 'ar' ? 'تحقق لاحقًا أو اتصل بمدربك' : 'Check back later or contact your trainer'}
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-500">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span>{language === 'ku' ? 'بەزووانە چاوەڕێبە' : language === 'ar' ? 'انتظر قليلاً' : 'Coming Soon'}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                          <Target className="w-4 h-4 text-green-400" />
                          <span>{language === 'ku' ? 'پلان تایبەت' : language === 'ar' ? 'خطة مخصصة' : 'Personalized Plan'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
=======
                {!workoutSchedule.length && <p className="text-slate-500 text-sm">No workout schedule available.</p>}
              </div>
            )}

            {view === "month" && (
              <div className="space-y-3">
                <div className={`grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-semibold mb-2 ${isRTL ? 'direction-rtl' : ''}`}>
                  {isRTL ? (
                    <>
                      <div>{t("sun")}</div>
                      <div>{t("sat")}</div>
                      <div>{t("fri")}</div>
                      <div>{t("thu")}</div>
                      <div>{t("wed")}</div>
                      <div>{t("tue")}</div>
                      <div>{t("mon")}</div>
                    </>
                  ) : (
                    <>
                      <div>{t("mon")}</div>
                      <div>{t("tue")}</div>
                      <div>{t("wed")}</div>
                      <div>{t("thu")}</div>
                      <div>{t("fri")}</div>
                      <div>{t("sat")}</div>
                      <div>{t("sun")}</div>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const dayNum = i + 1
                    const dayIndex = i % 7
                    const workout = workoutSchedule[dayIndex]
                    const exerciseCount = workout?.exercises.length || 0
                    const isRestDay = workout?.exercises[0]?.muscleGroup === "Recovery"
                    return (
                      <button
                        key={i}
                        onClick={() => workout && setSelectedDay(workout.day)}
                        className="aspect-square p-1 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
                      >
                        <p className="text-white text-[9px] font-bold mb-0.5">{dayNum}</p>
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isRestDay ? 'bg-slate-800/50' : 'bg-gradient-to-br from-purple-600 to-purple-500'}`}>
                          {isRestDay ? (
                            <Calendar className="w-3 h-3 text-slate-400" />
                          ) : (
                            <Dumbbell className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <p className="text-slate-400 text-[7px] mt-0.5">
                          {isRestDay ? t("rest") : `${exerciseCount}ex`}
                        </p>
                      </button>
                    )
                  })}
                </div>
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
              </div>
            )}
            </div>
          </CardContent>
        </Card>

<<<<<<< HEAD
=======
        {/* Submit (user performs; superadmin & trainer will view externally) */}
        {view === "day" && (
          <div className="mt-2">
            <Button
              disabled={submittedToday || submitting}
              onClick={handleSubmitDay}
              className="w-full bg-gradient-to-r from-[#9333EA] to-[#C084FC] disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#7E22CE] hover:to-[#A855F7]"
            >
              {submittedToday ? "Submitted" : submitting ? "Submitting..." : "Submit Today's Workout"}
            </Button>
            {submittedToday && <p className="text-[11px] text-[#B6C4CF] mt-2 text-center">You already submitted today. Trainers & superadmin can view it.</p>}
          </div>
        )}
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
      </section>

      </div>

      {/* Day Workout Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent ${isRTL ? 'text-right pr-12' : ''}`}>
              {selectedDay && t(selectedDay.toLowerCase() as any)} {t("workout")}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-6">
              {workoutSchedule
                .find(d => d.day === selectedDay)
                ?.exercises.map((exercise, idx) => (
                  <Card
                    key={exercise.id}
                    className="bg-slate-900/70 border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <CardContent className="p-4">
                      <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse justify-between' : 'justify-between'}`}>
                        {/* Title section - Right for RTL */}
                        <div className={`flex-1 ${isRTL ? 'order-1 text-right' : 'order-1'}`}>
                          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-start' : ''}`}>
                            <span className="text-purple-400 font-bold text-lg">{t(getExerciseOrdinal(idx + 1))}</span>
                            <h3 className="text-white font-semibold text-lg">{exercise.name}</h3>
                          </div>
                          <div className={`flex flex-wrap gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                              {exercise.sets} {t("sets")}
                            </div>
                            <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                              {exercise.reps} {t("reps")}
                            </div>
                            {exercise.duration && (
                              <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                                {exercise.duration}
                              </div>
                            )}
                            <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                              {t(exercise.muscleGroup.toLowerCase() === "chest" ? "chest" : 
                                 exercise.muscleGroup.toLowerCase() === "back" ? "backMuscle" : 
                                 exercise.muscleGroup.toLowerCase() === "legs" ? "legs" : 
                                 exercise.muscleGroup.toLowerCase() === "shoulders" ? "shoulders" : 
                                 exercise.muscleGroup.toLowerCase() === "arms" ? "arms" : "core")}
                            </div>
                          </div>
                        </div>
                        
                        {/* Icons section - Center for RTL */}
                        <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse order-2' : 'order-2'}`}>
                          {exercise.videoUrl && (
<<<<<<< HEAD
                            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                              <Film className="w-5 h-5 text-purple-400" />
                              {exercise.videoUrls && exercise.videoUrls.length > 1 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center border-2 border-slate-900">
                                  {exercise.videoUrls.length}
                                </div>
                              )}
=======
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                              <Film className="w-5 h-5 text-red-400" />
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                            </div>
                          )}
                          {exercise.gifUrl && (
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <Play className="w-5 h-5 text-green-400" />
                            </div>
                          )}
                          {exercise.imageUrl && (
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-blue-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Notes section - Below everything */}
                      {exercise.notes && (
                        <div className={`px-4 pb-4 ${isRTL ? 'text-right' : ''}`}>
                          <p className="text-slate-400 text-sm italic">💡 {exercise.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Exercise Detail Dialog */}
      <Dialog open={!!selectedExercise} onOpenChange={(open) => !open && setSelectedExercise(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold text-white ${isRTL ? 'text-right pr-12' : ''}`}>
              {selectedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedExercise && (
              <div className="space-y-8">
                {/* Exercise Info */}
                <Card className="bg-slate-900/70 border-slate-800">
                  <CardContent className="p-6">
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isRTL ? 'text-right' : ''}`}>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">{t("sets")}</p>
                        <p className="text-white font-bold text-2xl">{selectedExercise.sets}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">{t("reps")}</p>
                        <p className="text-white font-bold text-2xl">{selectedExercise.reps}</p>
                      </div>
                      {selectedExercise.duration && (
                        <div>
                          <p className="text-slate-400 text-xs mb-1">{t("duration")}</p>
                          <p className="text-white font-bold text-xl">{selectedExercise.duration}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Target</p>
                        <p className="text-purple-400 font-semibold text-lg">{selectedExercise.muscleGroup}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Media Section */}
                {(selectedExercise.videoUrl || selectedExercise.gifUrl || selectedExercise.imageUrl) && (
                  <Card className="bg-slate-900/70 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Exercise Demo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
<<<<<<< HEAD
                      {selectedExercise.videos && selectedExercise.videos.length > 0 ? (
                        <div className="space-y-6">
                          {selectedExercise.videos.map((video, index) => (
                            <div key={index}>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">
                                    {index + 1}
                                  </div>
                                  <p className="text-white text-sm font-bold">
                                    {video.name}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {video.sets && (
                                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold">
                                      {video.sets} sets
                                    </span>
                                  )}
                                  {video.reps && (
                                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-bold">
                                      {video.reps} reps
                                    </span>
                                  )}
                                </div>
                              </div>
                              {video.notes && (
                                <p className="text-amber-300 text-sm mb-2 italic">💡 {video.notes}</p>
                              )}
                              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-purple-500/30">
                                <video 
                                  src={video.url} 
                                  controls 
                                  className="w-full h-full object-contain"
                                  preload="metadata"
                                >
                                  <source src={video.url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedExercise.videoUrls && selectedExercise.videoUrls.length > 0 ? (
                        <div className="space-y-4">
                          {selectedExercise.videoUrls.map((videoUrl, index) => (
                            <div key={index}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">
                                  {index + 1}
                                </div>
                                <p className="text-slate-400 text-sm font-semibold">
                                  Video {index + 1} of {selectedExercise.videoUrls.length}
                                </p>
                              </div>
                              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-purple-500/30">
                                <video 
                                  src={videoUrl} 
                                  controls 
                                  className="w-full h-full object-contain"
                                  preload="metadata"
                                >
                                  <source src={videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedExercise.videoUrl ? (
                        <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-purple-500/30">
                          <video 
                            src={selectedExercise.videoUrl} 
                            controls 
                            className="w-full h-full object-contain"
                            preload="metadata"
                          >
                            <source src={selectedExercise.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : null}
=======
                      {selectedExercise.videoUrl && (
                        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Film className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                            <p className="text-slate-400 text-sm">Video demonstration</p>
                            <p className="text-purple-400 text-xs mt-1">{selectedExercise.videoUrl}</p>
                          </div>
                        </div>
                      )}
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                      {selectedExercise.gifUrl && (
                        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play className="w-12 h-12 text-green-400 mx-auto mb-2" />
                            <p className="text-slate-400 text-sm">GIF animation</p>
                            <p className="text-green-400 text-xs mt-1">{selectedExercise.gifUrl}</p>
                          </div>
                        </div>
                      )}
                      {selectedExercise.imageUrl && (
                        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                            <p className="text-slate-400 text-sm">Reference image</p>
                            <p className="text-blue-400 text-xs mt-1">{selectedExercise.imageUrl}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Notes */}
                {selectedExercise.notes && (
                  <Card className="bg-amber-500/10 border-amber-500/30">
                    <CardHeader>
                      <CardTitle className={`text-amber-400 text-lg flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        💡 {t("importantNotes")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white">{selectedExercise.notes}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

    </div>
    </PageTransition>
      <BottomNav activeTab="workout" />
    </SubscriptionRequiredGuard>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  )
}

function StatsCard({ icon: Icon, label, value, color, isRTL }: any) {
  return (
    <Card className="bg-[#101A23] border-[#2E3944] p-6 hover:border-[#C084FC]/30 transition-all">
      <div className="flex flex-col gap-3">
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 rounded-lg bg-[#0E151B] border flex items-center justify-center" style={{ borderColor: color }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <span className="text-xs text-[#B6C4CF] uppercase">{label}</span>
        </div>
        <p className={`text-3xl font-bold text-white ${isRTL ? 'text-right' : ''}`}>{value}</p>
      </div>
    </Card>
  )
}
