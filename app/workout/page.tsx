"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth-guard"
import { Dumbbell, Clock, Plus, ListOrdered, Flame, CalendarDays, CheckCircle2, Circle, LayoutDashboard, Utensils, HeartPulse, User, Calendar, Award, Target, Play, Image as ImageIcon, Film } from "lucide-react"
import { submitWorkout, hasSubmittedWorkoutToday, getWorkoutSubmissions } from "@/lib/submissions"
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
  videoUrls?: string[]
  videos?: Array<{ name: string; url: string; sets: string; reps: string; notes: string }>
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
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    activeStreak: 0,
    caloriesBurned: 0,
    totalTime: 0
  })
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  // Helper: Get accessible days for user (Saturday to today only)
  // Saturday = day 0, Sunday = day 1, ..., Friday = day 6
  const getAccessibleDays = (): string[] => {
    const daysOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    const jsDay = new Date().getDay() // JavaScript: Sunday = 0, Saturday = 6
    // Convert to our system: Saturday = 0, Sunday = 1, ..., Friday = 6
    const todayIndex = jsDay === 6 ? 0 : jsDay + 1
    
    // Return days from Saturday (0) to today (inclusive)
    return daysOrder.slice(0, todayIndex + 1)
  }

  // Get exercise ordinal translation key
  const getExerciseOrdinal = (num: number): TranslationKey => {
    const ordinals: TranslationKey[] = [
      "exerciseFirst", "exerciseSecond", "exerciseThird", "exerciseFourth", "exerciseFifth",
      "exerciseSixth", "exerciseSeventh", "exerciseEighth", "exerciseNinth", "exerciseTenth"
    ]
    return ordinals[num - 1] || "exerciseFirst"
  }

  const fetchWorkoutStats = async () => {
    try {
      if (typeof window === 'undefined') return
      
      const userId = localStorage.getItem("userId")
      if (!userId) return
      
      // Fetch real stats from Firebase
      const response = await fetch(`/api/user-stats?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        
        // Calculate total time and calories from submissions
        const submissions = getWorkoutSubmissions()
        const totalTime = submissions.length * 45 // Assume 45 min per workout
        const caloriesBurned = submissions.length * 350 // Assume 350 cal per workout
        
        setWorkoutStats({
          totalWorkouts: data.totalWorkouts || submissions.length,
          activeStreak: data.currentStreak || 0,
          caloriesBurned: caloriesBurned,
          totalTime: totalTime
        })
      } else {
        // Fallback to localStorage data
        const submissions = getWorkoutSubmissions()
        setWorkoutStats({
          totalWorkouts: submissions.length,
          activeStreak: 0,
          caloriesBurned: submissions.length * 350,
          totalTime: submissions.length * 45
        })
      }
    } catch (error) {
      console.error('Error fetching workout stats:', error)
      // Fallback to localStorage data
      const submissions = getWorkoutSubmissions()
      setWorkoutStats({
        totalWorkouts: submissions.length,
        activeStreak: 0,
        caloriesBurned: submissions.length * 350,
        totalTime: submissions.length * 45
      })
    }
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
    
    // Load workout programs from Firestore
    fetchUserWorkoutPrograms()
    
    // Fetch workout stats
    fetchWorkoutStats()
  }, [])

  const fetchUserWorkoutPrograms = async () => {
    try {
      const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null
      if (!userId) {
        console.log('ΓÜá∩╕Å No userId found')
        return
      }

      console.log('≡ƒöì Fetching workout programs for user:', userId)
      const response = await fetch(`/api/programs?type=workout&userId=${userId}`)
      
      if (!response.ok) {
        console.error('Γ¥î Failed to fetch programs')
        return
      }

      const programs = await response.json()
      console.log('Γ£à Fetched programs:', programs)

      // Helper: Check if URL is expired
      const isUrlExpired = (url: string): boolean => {
        try {
          const match = url.match(/Expires=(\d+)/)
          if (match) {
            const expiryTimestamp = parseInt(match[1]) * 1000
            return Date.now() >= expiryTimestamp
          }
        } catch {}
        return false
      }

      // Helper: Refresh expired video URL
      const refreshVideoUrl = async (videoName: string): Promise<string | null> => {
        try {
          console.log('🔄 Refreshing expired URL for:', videoName)
          const res = await fetch(`/api/videos?name=${encodeURIComponent(videoName)}`)
          if (res.ok) {
            const data = await res.json()
            if (data.videos && data.videos.length > 0) {
              console.log('✅ Got fresh URL for:', videoName)
              return data.videos[0].url
            }
          }
        } catch (err) {
          console.warn('⚠️ Could not refresh URL for:', videoName)
        }
        return null
      }

      // Convert programs to workout schedule format
      if (programs.length > 0) {
        const schedule: DayWorkout[] = []
        
        // Combine all programs' weekly schedules
        for (const program of programs) {
          if (program.weeklySchedule) {
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
            for (const day of days) {
              const dayData = program.weeklySchedule[day]
              if (dayData && dayData.exercises && dayData.exercises.length > 0 && !dayData.rest) {
                const dayName = day.charAt(0).toUpperCase() + day.slice(1)
                const existingDay = schedule.find(d => d.day === dayName)
                
                // Process exercises and check for expired videos
                const processedExercises = await Promise.all(
                  dayData.exercises.map(async (ex: any, idx: number) => {
                    let videos = ex.videos || []
                    
                    // Check and refresh expired video URLs
                    if (videos.length > 0) {
                      videos = await Promise.all(
                        videos.map(async (video: any) => {
                          if (video.url && video.name && isUrlExpired(video.url)) {
                            const freshUrl = await refreshVideoUrl(video.name)
                            if (freshUrl) {
                              return { ...video, url: freshUrl }
                            }
                          }
                          return video
                        })
                      )
                    }
                    
                    return {
                      id: `${program.id}-${day}-${idx}`,
                      name: ex.name,
                      sets: parseInt(ex.sets) || 0,
                      reps: ex.reps || '',
                      notes: ex.notes || '',
                      videoUrl: videos[0]?.url || ex.videoUrls?.[0] || '',
                      videoUrls: ex.videoUrls || [],
                      videos: videos,
                      muscleGroup: program.targetMuscles || 'General'
                    }
                  })
                )
                
                if (existingDay) {
                  existingDay.exercises.push(...processedExercises)
                } else {
                  schedule.push({
                    day: dayName,
                    exercises: processedExercises
                  })
                }
              }
            }
          }
        }

        setWorkoutSchedule(schedule)
        console.log('='.repeat(60))
        console.log('🏋️ Workout schedule set:')
        console.log('📊 Total days:', schedule.length)
        if (schedule.length > 0) {
          console.log('📅 First day:', schedule[0].day)
          console.log('💪 Exercises in first day:', schedule[0].exercises.length)
          if (schedule[0].exercises.length > 0) {
            const firstEx = schedule[0].exercises[0]
            console.log('🎯 First exercise:', firstEx.name)
            console.log('🎥 Videos array:', firstEx.videos)
            console.log('📹 VideoUrls array:', firstEx.videoUrls)
            console.log('🔗 Single videoUrl:', firstEx.videoUrl)
            if (firstEx.videos && firstEx.videos.length > 0) {
              console.log('✅ First video details:', firstEx.videos[0])
            }
          }
        }
        console.log('='.repeat(60))
      } else {
        console.log('Γä╣∩╕Å No programs assigned to user')
        setWorkoutSchedule([])
      }
    } catch (error) {
      console.error('Γ¥î Error fetching workout programs:', error)
      setWorkoutSchedule([])
    }
  }

  // Empty workout schedule - will be fetched from database
  const defaultWorkoutSchedule: DayWorkout[] = []

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
    <AuthGuard requiredRole="user">
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
          <StatsCard icon={Dumbbell} label={t("totalWorkouts")} value={workoutStats.totalWorkouts.toString()} color="#9333EA" isRTL={isRTL} />
          <StatsCard icon={Calendar} label={t("activeStreak")} value={`${workoutStats.activeStreak} ${t("days")}`} color="#A855F7" isRTL={isRTL} />
          <StatsCard icon={Flame} label={t("caloriesBurned")} value={workoutStats.caloriesBurned.toLocaleString()} color="#C084FC" isRTL={isRTL} />
          <StatsCard icon={Clock} label={t("totalTime")} value={`${workoutStats.totalTime} ${t("min")}`} color="#9333EA" isRTL={isRTL} />
        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className={`pb-2 ${isRTL ? 'text-right' : ''}`}>
            <CardTitle className={`text-white text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><CalendarDays className="w-4 h-4 text-purple-400" /> {t("schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              {(["day","week"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => handleViewChange(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-cyan-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-cyan-500/30"}`}
                >
                  {v === "day" ? t("today") : t("week")}
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
                  
                  if (!todayWorkout || todayWorkout.exercises.length === 0) {
                    return (
                      <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                        <CardContent className="text-center py-16 px-6">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/10 border border-purple-500/20">
                              <Calendar className="w-12 h-12 text-purple-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500/20 border-2 border-yellow-500/50 flex items-center justify-center">
                              <span className="text-yellow-400 text-lg">Γ£¿</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {language === 'ku' ? '╪ª█ò┘à┌ò█å ┘ê█ò╪▒╪▓╪┤ ┘å█î█î█ò' : language === 'ar' ? '┘ä╪º ╪¬┘ê╪¼╪» ╪¬┘à╪º╪▒┘è┘å ╪º┘ä┘è┘ê┘à' : 'No Workout Today'}
                          </h3>
                          <p className="text-gray-400 mb-6 text-base max-w-sm mx-auto">
                            {language === 'ku' ? '┘ç█î┌å ┘ê█ò╪▒╪▓╪┤█Ä┌⌐ ╪¿█å ╪ª█ò┘à┌ò█å ╪»█î╪º╪▒█î ┘å█ò┌⌐╪▒╪º┘ê█ò' : language === 'ar' ? '┘ä┘à ┘è╪¬┘à ╪¬╪¡╪»┘è╪» ╪¬┘à╪º╪▒┘è┘å ┘ä┘ç╪░╪º ╪º┘ä┘è┘ê┘à' : 'No workout scheduled for today'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                              <Calendar className="w-4 h-4 mr-2" />
                              {language === 'ku' ? '╪▒█å┌ÿ╪º┘å█î ╪¬╪▒ ╪¿╪¿█î┘å█ò' : language === 'ar' ? '╪¬╪¡┘é┘é ┘à┘å ╪º┘ä╪ú┘è╪º┘à ╪º┘ä╪ú╪«╪▒┘ë' : 'Check Other Days'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  
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
                {(() => {
                  // Filter workoutSchedule to show only accessible days (Saturday to today)
                  const accessibleDays = getAccessibleDays()
                  const filteredSchedule = workoutSchedule.filter(dayWorkout => 
                    accessibleDays.includes(dayWorkout.day.toLowerCase())
                  )
                  
                  // Sort by day order (Saturday first)
                  const daysOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
                  filteredSchedule.sort((a, b) => 
                    daysOrder.indexOf(a.day.toLowerCase()) - daysOrder.indexOf(b.day.toLowerCase())
                  )
                  
                  return filteredSchedule.map((dayWorkout, i) => {
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
                })})()}
                {!workoutSchedule.length && (
                  <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                    <CardContent className="text-center py-20 px-6">
                      <div className="relative inline-block mb-6">
                        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center shadow-2xl shadow-purple-500/20 border border-purple-500/30">
                          <Dumbbell className="w-14 h-14 text-purple-400" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">≡ƒÆ¬</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {language === 'ku' ? '╪«╪┤╪¬█ò█î ┘ê█ò╪▒╪▓╪┤ ┘å█î█î█ò' : language === 'ar' ? '┘ä╪º ┘è┘ê╪¼╪» ╪¼╪»┘ê┘ä ╪¬┘à╪º╪▒┘è┘å' : 'No Workout Schedule'}
                      </h3>
                      <p className="text-gray-400 mb-2 text-lg max-w-md mx-auto">
                        {language === 'ku' ? '┘à█ò╪┤┘é┌»█ò╪▒█ò┌⌐█ò╪¬ ╪«╪┤╪¬█ò█î ┘ê█ò╪▒╪▓╪┤╪¬ ╪¿█å ╪»█î╪º╪▒█î ╪»█ò┌⌐╪º╪¬' : language === 'ar' ? '╪│┘è┘é┘ê┘à ┘à╪»╪▒╪¿┘â ╪¿╪¬╪╣┘è┘è┘å ╪¼╪»┘ê┘ä ╪º┘ä╪¬┘à╪º╪▒┘è┘å ┘ä┘â' : 'Your trainer will assign a workout schedule to you'}
                      </p>
                      <p className="text-gray-500 text-sm mb-8">
                        {language === 'ku' ? '╪»┘ê╪º╪¬╪▒ ╪│█ò╪▒╪»╪º┘å█î ╪¿┌⌐█ò╪▒█ò┘ê█ò █î╪º┘å ┘╛█ò█î┘ê█ò┘å╪»█î ╪¿█ò ┘à█ò╪┤┘é┌»█ò╪▒█ò┌⌐█ò╪¬█ò┘ê█ò ╪¿┌⌐█ò' : language === 'ar' ? '╪¬╪¡┘é┘é ┘ä╪º╪¡┘é┘ï╪º ╪ú┘ê ╪º╪¬╪╡┘ä ╪¿┘à╪»╪▒╪¿┘â' : 'Check back later or contact your trainer'}
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-500">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span>{language === 'ku' ? '╪¿█ò╪▓┘ê┘ê╪º┘å█ò ┌å╪º┘ê█ò┌ò█Ä╪¿█ò' : language === 'ar' ? '╪º┘å╪¬╪╕╪▒ ┘é┘ä┘è┘ä╪º┘ï' : 'Coming Soon'}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                          <Target className="w-4 h-4 text-green-400" />
                          <span>{language === 'ku' ? '┘╛┘ä╪º┘å ╪¬╪º█î╪¿█ò╪¬' : language === 'ar' ? '╪«╪╖╪⌐ ┘à╪«╪╡╪╡╪⌐' : 'Personalized Plan'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            </div>
          </CardContent>
        </Card>

      </section>

      </div>

      {/* Day Workout Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-[96vw] sm:max-w-2xl max-h-[90vh]">
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
                            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                              <Film className="w-5 h-5 text-purple-400" />
                              {exercise.videoUrls && exercise.videoUrls.length > 1 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center border-2 border-slate-900">
                                  {exercise.videoUrls.length}
                                </div>
                              )}
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
                          <p className="text-slate-400 text-sm italic">≡ƒÆí {exercise.notes}</p>
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
        <DialogContent className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-purple-500/30 text-white max-w-[96vw] sm:max-w-4xl max-h-[90vh] shadow-2xl shadow-purple-500/20">
          <DialogHeader className="border-b border-purple-500/20 pb-4">
            <DialogTitle className={`text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent ${isRTL ? 'text-right pr-12' : ''} flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/50 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Dumbbell className="w-6 h-6 text-purple-400" />
              </div>
              {selectedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            {selectedExercise && (
              <div className="space-y-6">
                {/* Exercise Info Cards - Modern Grid */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${isRTL ? 'text-right' : ''}`}>
                  <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-500/40 hover:border-purple-400 transition-all hover:shadow-lg hover:shadow-purple-500/20 group">
                    <CardContent className="p-4">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                          <ListOrdered className="w-4 h-4 text-purple-400" />
                        </div>
                        <p className="text-purple-300 text-xs font-medium uppercase tracking-wide">{t("sets")}</p>
                      </div>
                      <p className="text-white font-bold text-3xl group-hover:text-purple-300 transition-colors">{selectedExercise.sets}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border-cyan-500/40 hover:border-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group">
                    <CardContent className="p-4">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                          <Target className="w-4 h-4 text-cyan-400" />
                        </div>
                        <p className="text-cyan-300 text-xs font-medium uppercase tracking-wide">{t("reps")}</p>
                      </div>
                      <p className="text-white font-bold text-3xl group-hover:text-cyan-300 transition-colors">{selectedExercise.reps}</p>
                    </CardContent>
                  </Card>

                  {selectedExercise.duration && (
                    <Card className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border-orange-500/40 hover:border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-500/20 group">
                      <CardContent className="p-4">
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                            <Clock className="w-4 h-4 text-orange-400" />
                          </div>
                          <p className="text-orange-300 text-xs font-medium uppercase tracking-wide">{t("duration")}</p>
                        </div>
                        <p className="text-white font-bold text-2xl group-hover:text-orange-300 transition-colors">{selectedExercise.duration}</p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 border-pink-500/40 hover:border-pink-400 transition-all hover:shadow-lg hover:shadow-pink-500/20 group">
                    <CardContent className="p-4">
                      <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center group-hover:bg-pink-500/30 transition-colors">
                          <HeartPulse className="w-4 h-4 text-pink-400" />
                        </div>
                        <p className="text-pink-300 text-xs font-medium uppercase tracking-wide">Target</p>
                      </div>
                      <p className="text-white font-bold text-lg group-hover:text-pink-300 transition-colors">{selectedExercise.muscleGroup}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Media Section */}
                {(selectedExercise.videoUrl || selectedExercise.gifUrl || selectedExercise.imageUrl) && (
                  <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-2 border-purple-500/30 shadow-xl shadow-purple-500/10 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-purple-500/30">
                      <CardTitle className={`text-white text-lg flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                          <Play className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                          Exercise Demo
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
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
                                <p className="text-amber-300 text-sm mb-2 italic">≡ƒÆí {video.notes}</p>
                              )}
                              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-purple-500/30 relative">
                                <video 
                                  src={video.url} 
                                  controls 
                                  loop
                                  autoPlay
                                  muted
                                  playsInline
                                  className="w-full h-full object-contain"
                                  preload="metadata"
                                  onError={(e) => {
                                    console.error('❌ Video load failed:', video.name || 'Unknown')
                                    console.error('   URL:', video.url)
                                    console.error('   Video object:', video)
                                    const target = e.currentTarget
                                    target.style.display = 'none'
                                    const parent = target.parentElement
                                    if (parent) {
                                      const errorDiv = document.createElement('div')
                                      errorDiv.className = 'absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90'
                                      errorDiv.innerHTML = `
                                        <svg class="w-16 h-16 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p class="text-red-300 text-lg font-bold">Video Unavailable</p>
                                        <p class="text-gray-400 text-sm mt-2">Video may have expired or been removed</p>
                                      `
                                      parent.appendChild(errorDiv)
                                    }
                                  }}
                                  onLoadStart={() => console.log('📹 Loading video:', video.name || video.url)}
                                  onCanPlay={() => console.log('✅ Video ready:', video.name || video.url)}
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
                                  Video {index + 1} of {selectedExercise.videoUrls?.length || 1}
                                </p>
                              </div>
                              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border-2 border-purple-500/30 relative">
                                <video 
                                  src={videoUrl} 
                                  controls 
                                  loop
                                  autoPlay
                                  muted
                                  playsInline
                                  className="w-full h-full object-contain"
                                  preload="metadata"
                                  crossOrigin="anonymous"
                                  onError={(e) => {
                                    console.error('❌ Video load failed:', videoUrl)
                                    const target = e.currentTarget
                                    target.style.display = 'none'
                                    const parent = target.parentElement
                                    if (parent && !parent.querySelector('.error-message')) {
                                      const errorDiv = document.createElement('div')
                                      errorDiv.className = 'error-message absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90'
                                      errorDiv.innerHTML = `
                                        <svg class="w-16 h-16 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p class="text-red-300 text-lg font-bold">Video Unavailable</p>
                                        <p class="text-gray-400 text-sm mt-2 text-center px-4">Video may have expired or been removed</p>
                                      `
                                      parent.appendChild(errorDiv)
                                    }
                                  }}
                                  onLoadStart={() => console.log('📹 Loading video from:', videoUrl.substring(0, 100))}
                                  onCanPlay={() => console.log('✅ Video ready to play')}
                                >
                                  <source src={videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedExercise.videoUrl ? (
                        <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden border-2 border-purple-500/40 shadow-2xl shadow-purple-500/20 relative group">
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
                          <video 
                            src={selectedExercise.videoUrl} 
                            controls 
                            loop
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                            preload="metadata"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              console.error('❌ Single video load failed:', selectedExercise.videoUrl)
                              const target = e.currentTarget
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent && !parent.querySelector('.error-message')) {
                                const errorDiv = document.createElement('div')
                                errorDiv.className = 'error-message absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90'
                                errorDiv.innerHTML = `
                                  <svg class="w-16 h-16 text-red-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p class="text-red-300 text-lg font-bold">Video Unavailable</p>
                                  <p class="text-gray-400 text-sm mt-2">Video link may have expired</p>
                                `
                                parent.appendChild(errorDiv)
                              }
                            }}
                            onLoadStart={() => console.log('📹 Loading single video')}
                            onCanPlay={() => console.log('✅ Single video ready')}
                          >
                            <source src={selectedExercise.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : null}
                      {selectedExercise.gifUrl && (
                        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-green-500/40 flex items-center justify-center shadow-lg shadow-green-500/10 hover:border-green-400/60 transition-all group">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-500/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/20">
                              <Play className="w-8 h-8 text-green-400" />
                            </div>
                            <p className="text-slate-300 text-base font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">GIF Animation Available</p>
                            <p className="text-green-400 text-xs font-mono bg-slate-900/50 px-3 py-2 rounded-lg inline-block">{selectedExercise.gifUrl}</p>
                          </div>
                        </div>
                      )}
                      {selectedExercise.imageUrl && (
                        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border-2 border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-500/10 hover:border-blue-400/60 transition-all group">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-2 border-blue-500/50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                              <ImageIcon className="w-8 h-8 text-blue-400" />
                            </div>
                            <p className="text-slate-300 text-base font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Reference Image</p>
                            <p className="text-blue-400 text-xs font-mono bg-slate-900/50 px-3 py-2 rounded-lg inline-block">{selectedExercise.imageUrl}</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Notes */}
                {selectedExercise.notes && (
                  <Card className="bg-gradient-to-br from-amber-900/30 via-amber-800/20 to-yellow-900/30 border-2 border-amber-500/40 shadow-xl shadow-amber-500/10 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-amber-900/40 to-yellow-900/40 border-b border-amber-500/30">
                      <CardTitle className={`text-transparent bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-lg flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
                          <span className="text-2xl">💡</span>
                        </div>
                        {t("importantNotes")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-white text-base leading-relaxed">{selectedExercise.notes}</p>
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
    </AuthGuard>
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
