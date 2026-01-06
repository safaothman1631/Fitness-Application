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
    longestStreak: 0,
    totalTime: 0
  })
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({})
  const [missedDays, setMissedDays] = useState<Record<string, boolean>>({})
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
      
      // Fetch workout completion data
      const response = await fetch(`/api/workout-completion?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        
        console.log('📊 Workout completion data:', data)
        console.log('📅 Missed days from API:', data.missedDays)
        
        setWorkoutStats({
          totalWorkouts: data.totalWorkouts || 0,
          activeStreak: data.currentStreak || 0,
          longestStreak: data.longestStreak || 0,
          totalTime: data.todayTime || 0  // Today's workout time only
        })
        
        // Mark completed days
        const completed: Record<string, boolean> = {}
        if (data.completions) {
          Object.keys(data.completions).forEach(date => {
            // Convert date to day name
            const dateObj = new Date(date + 'T00:00:00')
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const dayName = days[dateObj.getDay()]
            completed[dayName] = true
          })
        }
        setCompletedDays(completed)
        
        // Mark missed days (exclude rest days)
        const missed: Record<string, boolean> = {}
        if (data.missedDays && data.missedDays.length > 0) {
          console.log('🔴 Processing missed days:', data.missedDays)
          data.missedDays.forEach((date: string) => {
            const dateObj = new Date(date + 'T00:00:00')
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const dayName = days[dateObj.getDay()]
            
            // Check if this day is a rest day in the workout schedule
            const dayWorkout = workoutSchedule.find(d => d.day === dayName)
            const isRestDay = !dayWorkout || dayWorkout.exercises.length === 0 || dayWorkout.exercises[0]?.muscleGroup === "Recovery"
            
            // Only mark as missed if it's not a rest day
            if (!isRestDay) {
              console.log(`   ${date} -> ${dayName} (MISSED)`)
              missed[dayName] = true
            } else {
              console.log(`   ${date} -> ${dayName} (SKIPPED - Rest Day)`)
            }
          })
        }
        console.log('🔴 Final missed days state:', missed)
        setMissedDays(missed)
      } else {
        setWorkoutStats({
          totalWorkouts: 0,
          activeStreak: 0,
          longestStreak: 0,
          totalTime: 0
        })
        setCompletedDays({})
        setMissedDays({})
      }
    } catch (error) {
      console.error('Error fetching workout stats:', error)
      setWorkoutStats({
        totalWorkouts: 0,
        activeStreak: 0,
        longestStreak: 0,
        totalTime: 0
      })
      setCompletedDays({})
      setMissedDays({})
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
  }, [])

  // Fetch workout stats after workoutSchedule is loaded
  useEffect(() => {
    if (workoutSchedule.length > 0) {
      fetchWorkoutStats()
    }
  }, [workoutSchedule])

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

      // Helper: Check if URL is expired or will expire soon (within 1 day)
      const isUrlExpired = (url: string): boolean => {
        try {
          const match = url.match(/Expires=(\d+)/)
          if (match) {
            const expiryTimestamp = parseInt(match[1]) * 1000
            const oneDayFromNow = Date.now() + (24 * 60 * 60 * 1000)
            // Refresh if expired or will expire within 24 hours
            return Date.now() >= expiryTimestamp || oneDayFromNow >= expiryTimestamp
          }
        } catch {}
        // If no expiry found, assume it needs refresh
        return true
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
                      duration: program.duration || '',  // Use program duration
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
    const todayWorkout = workoutSchedule.find(d => d.day === today)
    
    // If no workout found for today, return a rest day object instead of the first day
    if (!todayWorkout) {
      return {
        day: today,
        exercises: [],
        isRestDay: true
      }
    }
    
    return todayWorkout
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard icon={Dumbbell} label={t("totalWorkouts")} value={workoutStats.totalWorkouts.toString()} color="#9333EA" isRTL={isRTL} />
          <StatsCard 
            icon={Calendar} 
            label={t("activeStreak")} 
            value={`${workoutStats.activeStreak} ${t("days")}`} 
            subtitle={workoutStats.longestStreak > workoutStats.activeStreak ? `${language === 'ku' ? 'باشترین' : language === 'ar' ? 'الأفضل' : 'Best'}: ${workoutStats.longestStreak} ${t("days")}` : undefined}
            color="#A855F7" 
            isRTL={isRTL} 
          />
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
                    const isRestDay = (todayWorkout as any)?.isRestDay
                    
                    return (
                      <Card className="border-0 bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-sm overflow-hidden relative">
                        {/* Animated background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-pulse" />
                        
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                        
                        <CardContent className="relative text-center py-20 px-6">
                          {/* Icon with glow effect */}
                          <div className="relative inline-block mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse" />
                            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-600/30 via-purple-500/20 to-pink-500/30 flex items-center justify-center shadow-2xl shadow-purple-500/20 border border-purple-500/30 backdrop-blur-sm">
                              <Calendar className="w-16 h-16 text-purple-300" />
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent text-center">
                            {isRestDay ? t("restDayTitle") : t("noWorkoutToday")}
                          </h2>
                          
                          {/* Description */}
                          <p className="text-gray-300 text-lg mb-3 max-w-md mx-auto leading-relaxed text-center">
                            {isRestDay ? t("restDayDescription") : t("noWorkoutScheduledForToday")}
                          </p>
                          
                          {isRestDay && (
                            <>
                              {/* Additional rest day info */}
                              <div className="flex justify-center mb-8">
                                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                                  <span className="text-purple-300 text-sm font-medium text-center">
                                    {t("musclesAreRecovering")}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Enjoy message */}
                              <p className="text-2xl font-semibold text-purple-200 mb-8 text-center">
                                {t("enjoyYourRestDay")} 🌟
                              </p>
                            </>
                          )}
                          
                          {/* Action button */}
                          <div className="flex justify-center">
                            <Button 
                              onClick={() => setView("week")}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-base rounded-xl shadow-lg shadow-purple-500/30 border-0 transition-all duration-300 hover:scale-105"
                            >
                              <Calendar className="w-5 h-5 mr-2" />
                              {t("checkOtherDays")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  
                  const exerciseCount = todayWorkout.exercises.length
                  const isRestDay = (todayWorkout as any).isRestDay || todayWorkout.exercises[0]?.muscleGroup === "Recovery"
                  
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
                  // Get accessible days (Saturday to today)
                  const accessibleDays = getAccessibleDays()
                  
                  // Create complete week schedule with all 7 days - ALWAYS SHOW ALL 7 DAYS
                  const daysOrder = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
                  
                  return daysOrder.map((dayName, i) => {
                    // Find this day in workoutSchedule
                    const dayWorkout = workoutSchedule.find(d => d.day.toLowerCase() === dayName)
                    
                    // Check if this day is accessible (Saturday to today)
                    const isAccessible = accessibleDays.includes(dayName)
                    
                    // If no workout for this day, show empty/rest day
                    const exerciseCount = dayWorkout?.exercises.length || 0
                    const isRestDay = dayWorkout?.exercises?.[0]?.muscleGroup === "Recovery" || !dayWorkout
                    const displayName = dayName.charAt(0).toUpperCase() + dayName.slice(1)
                    
                    // ALWAYS render the day, even if not accessible
                    return (
                      <div
                        key={i}
                        onClick={() => isAccessible && dayWorkout && setSelectedDay(displayName)}
                        className={`w-full grid items-center gap-0 p-4 rounded-lg border transition-all duration-300 ${
                          missedDays[displayName] && isAccessible
                            ? 'bg-red-950/20 border-red-900/30 cursor-pointer hover:border-red-500/50'
                            : isAccessible && dayWorkout
                              ? 'bg-[#0E151B] border-[#2E3944] hover:border-purple-500/50 cursor-pointer group'
                              : 'bg-[#0E151B]/30 border-[#2E3944]/30 cursor-not-allowed opacity-50'
                        } ${isRTL ? 'grid-cols-[80px_1fr_auto]' : 'grid-cols-[80px_1fr_auto]'}`}
                      >
                        {/* Right column: Play button + muscle tag */}
                        <div className={`flex items-center gap-2 justify-end ${isRTL ? 'order-3' : 'order-3'}`}>
                          {isAccessible && dayWorkout && (
                            <>
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
                            </>
                          )}
                          {!isAccessible && (
                            <div className="px-2 py-1 rounded-full bg-slate-700/30 text-slate-500 text-xs">
                              🔒
                            </div>
                          )}
                        </div>
                        
                        {/* Center: Text content */}
                        <div className={`order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <p className={`font-semibold text-sm flex items-center gap-2 ${
                            missedDays[displayName] ? 'text-red-400' : isAccessible ? 'text-white' : 'text-gray-500'
                          } ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {t(dayName as any)}
                            {completedDays[displayName] && isAccessible && (
                              <span className="text-green-400 text-xs">✓</span>
                            )}
                            {missedDays[displayName] && isAccessible && (
                              <span className="text-red-400 text-xs">⚠</span>
                            )}
                            {isRestDay && isAccessible && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 text-[10px] font-medium">
                                {language === 'ku' ? 'پشوو' : language === 'ar' ? 'راحة' : language === 'tr' ? 'Dinlenme' : 'Rest'}
                              </span>
                            )}
                          </p>
                          <p className={`text-xs ${
                            missedDays[displayName] ? 'text-red-300' : isAccessible ? 'text-[#B6C4CF]' : 'text-gray-600'
                          }`}>
                            {!isAccessible 
                              ? (language === 'ku' ? 'قوڵفکراو' : language === 'ar' ? 'مقفل' : language === 'tr' ? 'Kilitli' : 'Locked')
                              : missedDays[displayName]
                                ? language === 'ku' ? 'میسید - ئەو رۆژە بیرت چووە' : language === 'ar' ? 'فائت - نسيت ذلك اليوم' : 'Missed'
                                : completedDays[displayName]
                                  ? t("completed")
                                  : isRestDay 
                                    ? t("restAndRecovery") 
                                    : `${exerciseCount} ${t("exercisesCount")}`
                            }
                          </p>
                        </div>
                        
                        {/* Left column: Icon */}
                        <div className={`flex ${isRTL ? 'justify-end order-1' : 'justify-start order-1'}`}>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            !isAccessible 
                              ? 'bg-slate-800/30' 
                              : isRestDay 
                                ? 'bg-slate-800/50' 
                                : 'bg-gradient-to-br from-purple-600 to-purple-500'
                          }`}>
                            {!isAccessible ? (
                              <Calendar className="w-5 h-5 text-gray-600" />
                            ) : isRestDay ? (
                              <Calendar className="w-5 h-5 text-slate-400" />
                            ) : (
                              <Dumbbell className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                })()}
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

      {/* Day Workout Dialog - Modern Professional */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border border-slate-800 text-white max-w-[96vw] sm:max-w-2xl max-h-[92vh] p-0 gap-0">
          {/* Modern Header */}
          <div className="border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl px-6 py-5">
            <DialogTitle className={`text-2xl sm:text-3xl font-bold text-white ${isRTL ? 'text-right' : ''}`}>
              {selectedDay && t(selectedDay.toLowerCase() as any)} {t("workout")}
            </DialogTitle>
            <p className="text-slate-400 text-sm mt-1">
              {workoutSchedule.find(d => d.day === selectedDay)?.exercises.length || 0} {t("exercises")}
            </p>
            
            {/* Complete Workout Button */}
            {selectedDay && completedDays[selectedDay] ? (
              <Button
                disabled
                className="w-full mt-4 bg-green-500/20 text-green-300 font-semibold py-3 rounded-xl border border-green-500/30 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                {t("completed")} ✓
              </Button>
            ) : selectedDay && missedDays[selectedDay] ? (
              <div className="w-full mt-4 bg-red-500/20 text-red-300 font-semibold py-3 rounded-xl border border-red-500/30 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {language === 'ku' ? 'میسید - ئەو رۆژە بیرت چووە' : language === 'ar' ? 'فائت - نسيت هذا اليوم' : 'Missed - You forgot this day'}
              </div>
            ) : (
              <Button
                onClick={async () => {
                const userId = localStorage.getItem("userId")
                if (!userId) return
                
                const dayWorkout = workoutSchedule.find(d => d.day === selectedDay)
                if (!dayWorkout) return
                
                try {
                  // Calculate total time from program duration
                  let totalTime = 0
                  
                  // Get unique program durations from exercises
                  const programDurations = new Set<string>()
                  dayWorkout.exercises.forEach(exercise => {
                    if (exercise.duration) {
                      programDurations.add(exercise.duration)
                    }
                  })
                  
                  // If all exercises share the same program duration, use it once
                  if (programDurations.size === 1) {
                    const duration = Array.from(programDurations)[0]
                    const durationStr = duration.toLowerCase()
                    if (durationStr.includes('min')) {
                      totalTime = parseInt(durationStr) || 0
                    } else if (durationStr.includes('hour') || durationStr.includes('h')) {
                      totalTime = (parseInt(durationStr) || 0) * 60
                    } else {
                      totalTime = parseInt(durationStr) || 0
                    }
                  } else {
                    // Fallback: assume 3 minutes per exercise
                    totalTime = dayWorkout.exercises.length * 3
                  }
                  
                  const response = await fetch('/api/workout-completion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId,
                      day: selectedDay,
                      exerciseCount: dayWorkout.exercises.length,
                      totalTime
                    })
                  })
                  
                  if (response.ok) {
                    const data = await response.json()
                    
                    // Update stats
                    setWorkoutStats(prev => ({
                      ...prev,
                      totalWorkouts: data.totalWorkouts,
                      activeStreak: data.streak,
                      longestStreak: Math.max(data.streak, prev.longestStreak),
                      totalTime: totalTime  // Use today's time
                    }))
                    
                    // Show streak broken warning if applicable
                    if (data.wasStreakBroken && data.previousStreak > 0) {
                      const warningDiv = document.createElement('div')
                      warningDiv.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300'
                      warningDiv.innerHTML = `
                        <div class="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 border border-orange-400/30 animate-in zoom-in duration-500">
                          <div class="text-center">
                            <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6">
                              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                              </svg>
                            </div>
                            <div class="text-6xl mb-4">💔</div>
                            <h3 class="text-3xl font-bold mb-3">${language === 'ku' ? 'ستریک شکا' : language === 'ar' ? 'انقطعت السلسلة' : 'Streak Broken!'}</h3>
                            <p class="text-orange-100 text-lg mb-4">${language === 'ku' ? 'رۆژێکت بیر چوو' : language === 'ar' ? 'نسيت يوماً' : 'You missed days'}</p>
                            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
                              <p class="text-sm text-orange-50">${language === 'ku' ? 'ستریکی پێشوو' : language === 'ar' ? 'السلسلة السابقة' : 'Previous Streak'}</p>
                              <p class="font-bold text-2xl text-white">${data.previousStreak} ${language === 'ku' ? 'رۆژ' : language === 'ar' ? 'يوم' : 'days'}</p>
                            </div>
                            <div class="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30">
                              <p class="text-sm text-green-50">${language === 'ku' ? 'ستریکی نوێ' : language === 'ar' ? 'السلسلة الجديدة' : 'New Streak'}</p>
                              <p class="font-bold text-2xl text-white">1 ${language === 'ku' ? 'رۆژ' : language === 'ar' ? 'يوم' : 'day'}</p>
                            </div>
                          </div>
                        </div>
                      `
                      document.body.appendChild(warningDiv)
                      
                      setTimeout(() => {
                        warningDiv.style.animation = 'fade-out 300ms ease-out'
                        setTimeout(() => warningDiv.remove(), 300)
                      }, 4000)
                      
                      warningDiv.addEventListener('click', () => {
                        warningDiv.style.animation = 'fade-out 300ms ease-out'
                        setTimeout(() => warningDiv.remove(), 300)
                      })
                      
                      // Wait 4.5 seconds then show success
                      setTimeout(() => {
                        showSuccessAnimation()
                      }, 4500)
                    } else {
                      // Show success immediately if no streak break
                      showSuccessAnimation()
                    }
                    
                    function showSuccessAnimation() {
                      const successDiv = document.createElement('div')
                      successDiv.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300'
                      successDiv.innerHTML = `
                        <div class="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 border border-green-400/30 animate-in zoom-in duration-500">
                          <div class="text-center">
                            <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <div class="text-6xl mb-4 animate-pulse">🔥</div>
                            <h3 class="text-3xl font-bold mb-3">${language === 'ku' ? 'راهێنان تەواو بوو' : language === 'ar' ? 'اكتمل التمرين' : 'Workout Complete!'}</h3>
                            <p class="text-green-100 text-lg mb-4">${language === 'ku' ? 'ستریک' : language === 'ar' ? 'السلسلة' : 'Streak'}: ${data.streak} ${language === 'ku' ? 'رۆژ' : language === 'ar' ? 'يوم' : 'days'}</p>
                            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                              <p class="text-sm text-green-50">${language === 'ku' ? 'کۆی گشتی راهێنانەکان' : language === 'ar' ? 'إجمالي التمارين' : 'Total Workouts'}</p>
                              <p class="font-bold text-2xl text-white">${data.totalWorkouts}</p>
                            </div>
                          </div>
                        </div>
                      `
                      document.body.appendChild(successDiv)
                      
                      setTimeout(() => {
                        successDiv.style.animation = 'fade-out 300ms ease-out'
                        setTimeout(() => successDiv.remove(), 300)
                      }, 3000)
                      
                      successDiv.addEventListener('click', () => {
                        successDiv.style.animation = 'fade-out 300ms ease-out'
                        setTimeout(() => successDiv.remove(), 300)
                      })
                    }
                    
                    // Mark this day as completed
                    if (selectedDay) {
                      setCompletedDays(prev => ({ ...prev, [selectedDay]: true }))
                    }
                    
                    // Close dialog
                    setSelectedDay(null)
                    
                    // Refresh stats to update missed days
                    fetchWorkoutStats()
                  }
                } catch (error) {
                  console.error('Error completing workout:', error)
                }
              }}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              {t("completeWorkout")}
            </Button>
            )}
          </div>

          <ScrollArea className="h-[calc(92vh-100px)] px-6 py-4">
            <div className="space-y-3">
              {workoutSchedule
                .find(d => d.day === selectedDay)
                ?.exercises.map((exercise, idx) => (
                  <Card
                    key={exercise.id}
                    className="bg-slate-900/50 border-slate-800/50 hover:border-slate-700 hover:bg-slate-900/70 transition-all cursor-pointer group"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <CardContent className="p-4">
                      <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {/* Exercise Number Badge */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <span className="text-purple-400 font-bold text-lg">{idx + 1}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-white font-semibold text-base mb-2 ${isRTL ? 'text-right' : ''}`}>
                            {exercise.name?.replace(/\.(mp4|mov|avi|webm)$/i, '').replace(/\s*\(\d+\)\s*/g, '').trim()}
                          </h3>
                          
                          <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {exercise.sets && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                                <ListOrdered className="w-3 h-3 text-purple-400" />
                                <span className="text-xs text-slate-300 font-medium">{exercise.sets}×</span>
                              </div>
                            )}
                            {exercise.reps && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                                <Target className="w-3 h-3 text-pink-400" />
                                <span className="text-xs text-slate-300 font-medium">{exercise.reps}</span>
                              </div>
                            )}
                            {exercise.duration && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                                <Clock className="w-3 h-3 text-cyan-400" />
                                <span className="text-xs text-slate-300 font-medium">{exercise.duration}</span>
                              </div>
                            )}
                            <div className="px-2.5 py-1 rounded-full bg-slate-800/40 text-xs text-slate-400">
                              {exercise.muscleGroup}
                            </div>
                          </div>

                          {exercise.notes && (
                            <p className={`text-amber-400/80 text-xs mt-2 ${isRTL ? 'text-right' : ''}`}>
                              💡 {exercise.notes}
                            </p>
                          )}
                        </div>

                        {/* Media Indicators */}
                        <div className={`flex gap-1.5 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {exercise.videos && exercise.videos.length > 0 && (
                            <div className="relative">
                              <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                                <Film className="w-4 h-4 text-purple-400" />
                              </div>
                              {exercise.videos.length > 1 && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] font-bold flex items-center justify-center">
                                  {exercise.videos.length}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Exercise Detail Dialog - Modern European Style */}
      <Dialog open={!!selectedExercise} onOpenChange={(open) => !open && setSelectedExercise(null)}>
        <DialogContent className="bg-slate-950 border border-slate-800 text-white max-w-[98vw] sm:max-w-3xl max-h-[95vh] p-0 gap-0 overflow-hidden">
          <DialogTitle className="sr-only">{selectedExercise?.name}</DialogTitle>
          
          {/* Modern Professional Header */}
          <div className="relative border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-xl">
            <div className="px-4 sm:px-6 py-5">
              <div className={`${isRTL ? 'text-right' : ''}`}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  {selectedExercise?.name?.replace(/\.(mp4|mov|avi|webm)$/i, '').replace(/\s*\(\d+\)\s*/g, '').trim()}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {selectedExercise?.muscleGroup && (
                    <span className="text-slate-400 font-medium">
                      {selectedExercise.muscleGroup}
                    </span>
                  )}
                  {selectedExercise?.sets && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                      <ListOrdered className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-slate-300 font-semibold">{selectedExercise.sets} sets</span>
                    </div>
                  )}
                  {selectedExercise?.reps && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50">
                      <Target className="w-3.5 h-3.5 text-pink-400" />
                      <span className="text-slate-300 font-semibold">{selectedExercise.reps} reps</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="h-[calc(95vh-80px)]">
            {selectedExercise && (
              <div className="p-4 sm:p-6 space-y-4">
                {/* Videos Grid - Full Width */}
                {selectedExercise.videos && selectedExercise.videos.length > 0 ? (
                  <div className="space-y-4">
                    {selectedExercise.videos.map((video, index) => (
                      <div key={index} className="group">
                        {/* Video Header */}
                        <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                              {index + 1}
                            </div>
                            <p className="text-white text-sm font-semibold truncate max-w-[200px] sm:max-w-none">
                              {video.name?.replace(/\.(mp4|mov|avi|webm)$/i, '').replace(/\s*\(\d+\)\s*/g, '').trim()}
                            </p>
                          </div>
                          <div className={`flex gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {video.sets && (
                              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
                                {video.sets}×
                              </span>
                            )}
                            {video.reps && (
                              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold">
                                {video.reps}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Video Notes */}
                        {video.notes && (
                          <p className={`text-amber-300 text-xs mb-2 px-2 ${isRTL ? 'text-right' : ''}`}>
                            💡 {video.notes}
                          </p>
                        )}

                        {/* Video Player - Interactive Thumbnail Style */}
                        <div className="relative aspect-video bg-white rounded-xl overflow-hidden border border-slate-700 shadow-lg group">
                          <video 
                            src={video.url} 
                            loop
                            playsInline
                            muted
                            className="w-full h-full object-contain cursor-pointer"
                            preload="metadata"
                            poster={video.url + '#t=0.1'}
                            onClick={(e) => {
                              const vid = e.currentTarget
                              if (vid.paused) {
                                vid.play()
                              } else {
                                vid.pause()
                              }
                            }}
                            onError={async (e) => {
                              console.error('❌ Video load failed:', video.name || 'Unknown')
                              const target = e.currentTarget as HTMLVideoElement
                              
                              // Try to refresh the URL if we have the video name
                              if (video.name && !target.dataset.retried) {
                                target.dataset.retried = 'true'
                                console.log('🔄 Attempting to refresh video URL for:', video.name)
                                
                                try {
                                  const res = await fetch(`/api/videos?name=${encodeURIComponent(video.name)}`)
                                  if (res.ok) {
                                    const data = await res.json()
                                    if (data.videos && data.videos.length > 0) {
                                      const newUrl = data.videos[0].url
                                      console.log('✅ Got fresh URL, reloading video:', video.name)
                                      target.src = newUrl
                                      target.load()
                                      return // Don't show error if we got a new URL
                                    }
                                  }
                                } catch (err) {
                                  console.warn('⚠️ Could not refresh URL for:', video.name, err)
                                }
                              }
                              
                              // If refresh failed or no video name, show error
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent && !parent.querySelector('.video-error')) {
                                const errorDiv = document.createElement('div')
                                errorDiv.className = 'absolute inset-0 flex flex-col items-center justify-center bg-slate-900 video-error'
                                errorDiv.innerHTML = `
                                  <svg class="w-12 h-12 text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p class="text-red-300 text-sm font-medium">Video Unavailable</p>
                                  <p class="text-red-400 text-xs mt-1">${video.name || ''}</p>
                                `
                                parent.appendChild(errorDiv)
                              }
                            }}
                          >
                            <source src={video.url} type="video/mp4" />
                          </video>
                          
                          {/* Fullscreen Button - Bottom Corner */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const vid = e.currentTarget.previousElementSibling as HTMLVideoElement
                              if (vid.requestFullscreen) {
                                vid.requestFullscreen()
                              }
                            }}
                            className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : selectedExercise.videoUrls && selectedExercise.videoUrls.length > 0 ? (
                  <div className="space-y-4">
                    {selectedExercise.videoUrls.map((videoUrl, index) => (
                      <div key={index}>
                        <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                            {index + 1}
                          </div>
                          <p className="text-slate-400 text-sm font-semibold">
                            Video {index + 1} / {selectedExercise.videoUrls.length}
                          </p>
                        </div>
                        <div className="relative aspect-video bg-white rounded-xl overflow-hidden border border-slate-700 shadow-lg group">
                          <video 
                            src={videoUrl} 
                            loop
                            playsInline
                            muted
                            className="w-full h-full object-contain cursor-pointer"
                            preload="metadata"
                            poster={videoUrl + '#t=0.1'}
                            onClick={(e) => {
                              const vid = e.currentTarget
                              if (vid.paused) {
                                vid.play()
                              } else {
                                vid.pause()
                              }
                            }}
                          >
                            <source src={videoUrl} type="video/mp4" />
                          </video>
                          
                          {/* Fullscreen Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              const vid = e.currentTarget.previousElementSibling as HTMLVideoElement
                              if (vid.requestFullscreen) {
                                vid.requestFullscreen()
                              }
                            }}
                            className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : selectedExercise.videoUrl ? (
                  <div className="relative aspect-video bg-white rounded-xl overflow-hidden border border-slate-700 shadow-lg group">
                    <video 
                      src={selectedExercise.videoUrl} 
                      loop
                      playsInline
                      muted
                      className="w-full h-full object-contain cursor-pointer"
                      preload="metadata"
                      poster={selectedExercise.videoUrl + '#t=0.1'}
                      onClick={(e) => {
                        const vid = e.currentTarget
                        if (vid.paused) {
                          vid.play()
                        } else {
                          vid.pause()
                        }
                      }}
                    >
                      <source src={selectedExercise.videoUrl} type="video/mp4" />
                    </video>
                    
                    {/* Fullscreen Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        const vid = e.currentTarget.previousElementSibling as HTMLVideoElement
                        if (vid.requestFullscreen) {
                          vid.requestFullscreen()
                        }
                      }}
                      className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>
                ) : null}

                {/* Notes Section - Simplified */}
                {selectedExercise.notes && (
                  <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg p-4">
                    <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-2xl flex-shrink-0">💡</span>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold text-amber-300 mb-1 ${isRTL ? 'text-right' : ''}`}>
                          {t("importantNotes")}
                        </p>
                        <p className={`text-white text-sm leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                          {selectedExercise.notes}
                        </p>
                      </div>
                    </div>
                  </div>
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

function StatsCard({ icon: Icon, label, value, subtitle, color, isRTL }: any) {
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
        {subtitle && (
          <p className={`text-xs text-[#B6C4CF] mt-1 ${isRTL ? 'text-right' : ''}`}>
            🏆 {subtitle}
          </p>
        )}
      </div>
    </Card>
  )
}
