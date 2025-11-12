"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dumbbell, Clock, Plus, ListOrdered, Flame, CalendarDays, CheckCircle2, Circle, LayoutDashboard, Utensils, HeartPulse, User, Calendar, Award, Target, Play, Image as ImageIcon, Film } from "lucide-react"
import { submitWorkout, hasSubmittedWorkoutToday } from "@/lib/submissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import SubscriptionRequiredGuard from "@/components/subscription-guard"

type ViewMode = "day" | "week" | "month"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  duration?: string
  notes?: string
  videoUrl?: string
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
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [submittedToday, setSubmittedToday] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [workoutSchedule, setWorkoutSchedule] = useState<DayWorkout[]>([])
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    setIsSuperadmin(role === "superadmin")
    try {
      const raw = localStorage.getItem("workoutTasksCompleted")
      if (raw) setCompleted(JSON.parse(raw))
    } catch {}
    setSubmittedToday(hasSubmittedWorkoutToday())
    
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
          name: "Barbell Bench Press",
          sets: 4,
          reps: "8-10",
          notes: "Focus on controlled movement",
          muscleGroup: "Chest",
          videoUrl: "https://example.com/bench-press.mp4",
          imageUrl: "/exercises/bench-press.jpg"
        },
        {
          id: "mon2",
          name: "Incline Dumbbell Press",
          sets: 3,
          reps: "10-12",
          muscleGroup: "Chest",
          gifUrl: "/exercises/incline-press.gif"
        },
        {
          id: "mon3",
          name: "Cable Flyes",
          sets: 3,
          reps: "12-15",
          notes: "Squeeze at the peak",
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
          notes: "Keep back straight, engage core",
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
          notes: "Go deep, keep chest up",
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
          notes: "Light stretching, yoga, or walking",
          muscleGroup: "Recovery"
        }
      ]
    }
  ]

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("workoutTasksCompleted", JSON.stringify(next)) } catch {}
      return next
    })
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

  return (
    <SubscriptionRequiredGuard>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent mb-2">
          Workout Center
        </h1>
        <p className="text-[#B6C4CF] mb-8">Plan, start, and review your training sessions.</p>

        <Card className="bg-gradient-to-r from-[#9333EA] to-[#C084FC] border-none p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">Build Your Strength</h3>
            <p className="text-white/90 text-sm mb-4">Track your progress and achieve your fitness goals</p>
            {isSuperadmin && (
              <Button className="bg-white text-[#9333EA] hover:bg-white/90 font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> New Workout</Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Dumbbell} label="Total Workouts" value="24" color="#9333EA" />
          <StatsCard icon={Calendar} label="Active Streak" value="7 Days" color="#A855F7" />
          <StatsCard icon={Flame} label="Calories Burned" value="1,450" color="#C084FC" />
          <StatsCard icon={Clock} label="Total Time" value="42 min" color="#9333EA" />
        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><CalendarDays className="w-4 h-4 text-purple-400" /> Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              {(["day","week","month"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-[#9333EA] to-[#C084FC] text-white border-purple-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-purple-500/30"}`}
                >
                  {v === "day" ? "TODAY" : v.toUpperCase()}
                </button>
              ))}
            </div>

            {view === "day" && (
              <div className="space-y-2">
                {(() => {
                  const todayWorkout = getTodayWorkout()
                  const exerciseCount = todayWorkout.exercises.length
                  const isRestDay = todayWorkout.exercises[0]?.muscleGroup === "Recovery"
                  
                  return (
                    <button
                      onClick={() => setSelectedDay(todayWorkout.day)}
                      className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isRestDay ? 'bg-slate-800/50' : 'bg-gradient-to-br from-purple-600 to-purple-500'}`}>
                          {isRestDay ? (
                            <Calendar className="w-5 h-5 text-slate-400" />
                          ) : (
                            <Dumbbell className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">Today's Workout - {todayWorkout.day}</p>
                          <p className="text-[#B6C4CF] text-xs">
                            {isRestDay ? "Rest & Recovery" : `${exerciseCount} exercises`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isRestDay && (
                          <div className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs">
                            {todayWorkout.exercises[0]?.muscleGroup}
                          </div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <Play className="w-4 h-4 text-purple-400" />
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
                      className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-purple-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isRestDay ? 'bg-slate-800/50' : 'bg-gradient-to-br from-purple-600 to-purple-500'}`}>
                          {isRestDay ? (
                            <Calendar className="w-5 h-5 text-slate-400" />
                          ) : (
                            <Dumbbell className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">{dayWorkout.day}</p>
                          <p className="text-[#B6C4CF] text-xs">
                            {isRestDay ? "Rest & Recovery" : `${exerciseCount} exercises`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isRestDay && (
                          <div className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs">
                            {dayWorkout.exercises[0]?.muscleGroup}
                          </div>
                        )}
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <Play className="w-4 h-4 text-purple-400" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                {!workoutSchedule.length && <p className="text-slate-500 text-sm">No workout schedule available.</p>}
              </div>
            )}

            {view === "month" && (
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-semibold mb-2">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
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
                          {isRestDay ? "Rest" : `${exerciseCount}ex`}
                        </p>
                      </button>
                    )
                  })}
                </div>
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
              className="w-full bg-gradient-to-r from-[#9333EA] to-[#C084FC] disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#7E22CE] hover:to-[#A855F7]"
            >
              {submittedToday ? "Submitted" : submitting ? "Submitting..." : "Submit Today's Workout"}
            </Button>
            {submittedToday && <p className="text-[11px] text-[#B6C4CF] mt-2 text-center">You already submitted today. Trainers & superadmin can view it.</p>}
          </div>
        )}
      </section>

      </div>

      {/* Day Workout Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              {selectedDay} Workout
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-4">
              {workoutSchedule
                .find(d => d.day === selectedDay)
                ?.exercises.map((exercise, idx) => (
                  <Card
                    key={exercise.id}
                    className="bg-slate-900/70 border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-purple-400 font-bold text-lg">{idx + 1}.</span>
                            <h3 className="text-white font-semibold text-lg">{exercise.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-2">
                            <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                              {exercise.sets} sets
                            </div>
                            <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                              {exercise.reps} reps
                            </div>
                            {exercise.duration && (
                              <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                                {exercise.duration}
                              </div>
                            )}
                            <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                              {exercise.muscleGroup}
                            </div>
                          </div>
                          {exercise.notes && (
                            <p className="text-slate-400 text-sm italic">💡 {exercise.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {exercise.videoUrl && (
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                              <Film className="w-5 h-5 text-red-400" />
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
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedExercise && (
              <div className="space-y-6">
                {/* Exercise Info */}
                <Card className="bg-slate-900/70 border-slate-800">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Sets</p>
                        <p className="text-white font-bold text-2xl">{selectedExercise.sets}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Reps</p>
                        <p className="text-white font-bold text-2xl">{selectedExercise.reps}</p>
                      </div>
                      {selectedExercise.duration && (
                        <div>
                          <p className="text-slate-400 text-xs mb-1">Duration</p>
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
                      {selectedExercise.videoUrl && (
                        <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Film className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                            <p className="text-slate-400 text-sm">Video demonstration</p>
                            <p className="text-purple-400 text-xs mt-1">{selectedExercise.videoUrl}</p>
                          </div>
                        </div>
                      )}
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
                      <CardTitle className="text-amber-400 text-lg flex items-center gap-2">
                        💡 Important Notes
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
      <BottomNav activeTab="workout" router={router} />
    </SubscriptionRequiredGuard>
  )
}

function StatsCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="bg-[#101A23] border-[#2E3944] p-6 hover:border-[#C084FC]/30 transition-all">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#0E151B] border flex items-center justify-center" style={{ borderColor: color }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <span className="text-xs text-[#B6C4CF] uppercase">{label}</span>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </Card>
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
            onClick={() => { if (item.path !== "/workout") router.push(item.path) }}
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
