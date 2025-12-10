"use client"

import { useState, useEffect } from "react"
import FitproLayout from "@/components/fitpro-layout"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, User, Dumbbell, Timer, Target, TrendingUp, ChevronRight, ArrowLeft } from "lucide-react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Trainee {
  id: string
  name: string
  email: string
  workoutsCount: number
  programs: any[]
}

interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
  restTime: number
  videoUrl?: string
  imageUrl?: string
  instructions?: string
}

interface WorkoutPlan {
  id: string
  traineeName: string
  traineeId: string
  date: string
  workoutType: string
  exercises: Exercise[]
  totalDuration: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  notes?: string
}

export default function TrainerWorkouts() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [trainees, setTrainees] = useState<Trainee[]>([])
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null)
  const [selectedDay, setSelectedDay] = useState<string>("all")
  const [view, setView] = useState<"trainees" | "workouts">("trainees")

  useEffect(() => {
    fetchTrainees()
  }, [])

  const fetchTrainees = async () => {
    try {
      setLoading(true)
      
      // Fetch users and programs
      const [usersData, programsData] = await Promise.all([
        dbService.getUsers(),
        fetch('/api/programs?type=workout').then(res => res.json())
      ])
      
      // Filter users who have workout programs
      const traineesWithWorkouts = usersData
        .filter((user: any) => user.role === 'user' || user.role === 'trainee')
        .map((user: any) => {
          const userPrograms = programsData.filter((program: any) => 
            program.assignedUsers && program.assignedUsers.includes(user.id)
          )
          const workoutsCount = userPrograms.reduce((sum: number, program: any) => {
            if (program.weeklySchedule) {
              return sum + Object.values(program.weeklySchedule).filter((day: any) => 
                day.exercises && day.exercises.length > 0
              ).length
            }
            return sum + (program.exercises?.length > 0 ? 1 : 0)
          }, 0)
          
          return {
            id: user.id,
            name: user.name || user.email,
            email: user.email,
            workoutsCount,
            programs: userPrograms
          }
        })
        .filter((trainee: Trainee) => trainee.workoutsCount > 0)
      
      setTrainees(traineesWithWorkouts)
      
    } catch (error) {
      console.error("Error fetching trainees:", error)
      toast.error("Failed to load trainees")
    } finally {
      setLoading(false)
    }
  }

  const loadTraineeWorkouts = async (trainee: Trainee) => {
    try {
      setLoading(true)
      setSelectedTrainee(trainee)
      setView("workouts")
      
      // Convert programs to workout plans
      const allWorkouts: WorkoutPlan[] = trainee.programs.flatMap((program: any) => {
        // Group exercises by day if weeklySchedule exists
        if (program.weeklySchedule) {
          return Object.entries(program.weeklySchedule)
            .filter(([_, dayData]: [string, any]) => dayData.exercises && dayData.exercises.length > 0)
            .map(([day, dayData]: [string, any]) => ({
              id: `${program.id}-${day}`,
              traineeName: trainee.name,
              traineeId: trainee.id,
              date: new Date().toISOString().split('T')[0],
              workoutType: dayData.title || day,
              difficulty: (program.difficulty || "Intermediate") as "Beginner" | "Intermediate" | "Advanced",
              exercises: dayData.exercises.map((ex: any) => ({
                name: ex.name || ex.title || "Exercise",
                sets: ex.sets || 3,
                reps: ex.reps || 10,
                weight: ex.weight,
                duration: ex.duration,
                restTime: 60,
                videoUrl: ex.videoUrl,
                imageUrl: ex.imageUrl,
                instructions: ex.instructions
              })),
              totalDuration: Number(program.duration?.replace(/[^0-9]/g, '') || 60),
              notes: `${program.title} - ${day} - ${program.description || ""}`
            }))
        }
        
        // Single workout plan (if no weeklySchedule but has exercises)
        if (program.exercises && program.exercises.length > 0) {
          return [{
            id: program.id,
            traineeName: trainee.name,
            traineeId: trainee.id,
            date: new Date().toISOString().split('T')[0],
            workoutType: program.targetMuscles || "General",
            difficulty: (program.difficulty || "Intermediate") as "Beginner" | "Intermediate" | "Advanced",
            exercises: program.exercises.map((ex: any) => ({
              name: ex.name || ex.title || "Exercise",
              sets: ex.sets || 3,
              reps: ex.reps || 10,
              weight: ex.weight,
              duration: ex.duration,
              restTime: 60,
              videoUrl: ex.videoUrl,
              imageUrl: ex.imageUrl,
              instructions: ex.instructions
            })),
            totalDuration: Number(program.duration?.replace(/[^0-9]/g, '') || 60),
            notes: `${program.title} - ${program.description || ""}`
          }]
        }
        
        return []
      })
      
      setWorkoutPlans(allWorkouts)
      
    } catch (error) {
      console.error("Error fetching workouts:", error)
      toast.error("Failed to load workouts")
    } finally {
      setLoading(false)
    }
  }

  const filteredTrainees = trainees.filter(trainee =>
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredWorkouts = workoutPlans.filter(workout => {
    const matchesSearch = workout.workoutType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || workout.workoutType.toLowerCase() === selectedType.toLowerCase()
    const matchesDay = selectedDay === "all" || workout.workoutType.toLowerCase().includes(selectedDay.toLowerCase())
    return matchesSearch && matchesType && matchesDay
  })

  // Get unique days from workouts
  const availableDays = Array.from(new Set(workoutPlans.map(w => w.workoutType))).sort()

  const workoutTypes = ["all", "Strength", "Cardio", "HIIT", "Flexibility"]

  const getWorkoutTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "strength": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "cardio": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "hiit": return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "flexibility": return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "advanced": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <FitproLayout role="trainer">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header Section */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-slate-900/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <Dumbbell className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {t("traineeWorkouts")}
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">View all trainee workout plans and exercise routines</p>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search by trainee name or workout type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {workoutTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type)}
                      className={selectedType === type 
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white border-0 whitespace-nowrap" 
                        : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap"
                      }
                    >
                      {type === "all" ? "All Workouts" : type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700 animate-pulse">
                  <CardHeader className="space-y-3">
                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700 rounded"></div>
                      <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : view === "trainees" ? (
            // Trainees List View
            <>
              {filteredTrainees.length === 0 ? (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-12 text-center">
                    <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No Trainees Found</h3>
                    <p className="text-slate-400">No trainees with workout plans found</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTrainees.map((trainee, index) => (
                    <div key={trainee.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                      <Card 
                        className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
                        onClick={() => loadTraineeWorkouts(trainee)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                              {trainee.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                                {trainee.name}
                              </CardTitle>
                              <p className="text-xs text-slate-400 mt-1">{trainee.email}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                            <div className="flex items-center gap-2">
                              <Dumbbell className="w-5 h-5 text-cyan-400" />
                              <div>
                                <p className="text-sm font-medium text-slate-300">Workout Days</p>
                                <p className="text-xs text-slate-500">{trainee.programs.length} programs</p>
                              </div>
                            </div>
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-lg font-bold">
                              {trainee.workoutsCount}
                            </Badge>
                          </div>
                          <Button 
                            className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                            onClick={() => loadTraineeWorkouts(trainee)}
                          >
                            View Workouts
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Individual Trainee Workouts View
            <>
              <div className="mb-6 flex flex-col gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setView("trainees")
                    setSelectedTrainee(null)
                    setSelectedDay("all")
                  }}
                  className="w-fit border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Trainees
                </Button>
                
                {selectedTrainee && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {selectedTrainee.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedTrainee.name}</h2>
                      <p className="text-sm text-slate-400">{selectedTrainee.email}</p>
                    </div>
                  </div>
                )}

                {/* Day Filter Buttons */}
                {availableDays.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <Button
                      variant={selectedDay === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDay("all")}
                      className={selectedDay === "all"
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white border-0 whitespace-nowrap"
                        : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap"
                      }
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      All Days
                    </Button>
                    {availableDays.map((day) => (
                      <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDay(day)}
                        className={selectedDay === day
                          ? "bg-cyan-500 hover:bg-cyan-600 text-white border-0 whitespace-nowrap"
                          : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap"
                        }
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {filteredWorkouts.length === 0 ? (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-12 text-center">
                    <Dumbbell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No Workouts Found</h3>
                    <p className="text-slate-400">No workouts available for the selected day</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredWorkouts.map((workout, index) => (
                    <div key={workout.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                                {workout.workoutType}
                              </CardTitle>
                              <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                            </div>
                            <Badge variant="outline" className={`${getDifficultyColor(workout.difficulty)} border text-xs`}>
                              {workout.difficulty}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Exercises List */}
                          <div className="space-y-3">
                            {workout.exercises.map((exercise, idx) => (
                              <div key={idx} className="rounded-lg bg-slate-900/50 border border-slate-700/50 overflow-hidden">
                                {/* Exercise Image */}
                                {exercise.imageUrl && (
                                  <div className="relative h-40 bg-slate-800">
                                    <img 
                                      src={exercise.imageUrl} 
                                      alt={exercise.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                
                                {/* Exercise Info */}
                                <div className="p-3 space-y-2">
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-2 flex-1">
                                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                      <div className="flex-1">
                                        <span className="text-sm text-slate-300 font-medium block">{exercise.name}</span>
                                        <span className="text-xs text-slate-500 block mt-1">
                                          {exercise.duration ? `${exercise.duration} min` : `${exercise.sets}×${exercise.reps}`}
                                          {exercise.weight && ` • ${exercise.weight}kg`}
                                          {` • ${exercise.restTime}s rest`}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Video Link */}
                                  {exercise.videoUrl && (
                                    <a 
                                      href={exercise.videoUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                      </svg>
                                      Watch Video
                                    </a>
                                  )}
                                  
                                  {/* Instructions */}
                                  {exercise.instructions && (
                                    <p className="text-xs text-slate-400 italic leading-relaxed border-t border-slate-700/50 pt-2">
                                      {exercise.instructions}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Workout Summary */}
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-700">
                            <div className="text-center">
                              <Timer className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                              <p className="text-xs text-slate-400">Duration</p>
                              <p className="text-sm font-bold text-cyan-400">{workout.totalDuration} min</p>
                            </div>
                            <div className="text-center">
                              <Target className="w-4 h-4 text-green-400 mx-auto mb-1" />
                              <p className="text-xs text-slate-400">Exercises</p>
                              <p className="text-sm font-bold text-green-400">{workout.exercises.length}</p>
                            </div>
                            <div className="text-center">
                              <TrendingUp className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                              <p className="text-xs text-slate-400">Sets</p>
                              <p className="text-sm font-bold text-blue-400">
                                {workout.exercises.reduce((sum, e) => sum + e.sets, 0)}
                              </p>
                            </div>
                          </div>

                          {/* Notes */}
                          {workout.notes && (
                            <div className="pt-3 border-t border-slate-700">
                              <p className="text-xs text-slate-400 italic">"{workout.notes}"</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </FitproLayout>
  )
}
