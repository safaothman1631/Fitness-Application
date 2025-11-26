"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Clock, Dumbbell, Play, Pause, SkipForward } from "lucide-react"

export default function WorkoutPage() {
  const router = useRouter()
  const [workoutDay, setWorkoutDay] = useState<any>(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [timer, setTimer] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])

  useEffect(() => {
    const storedWorkout = localStorage.getItem("currentWorkoutDay")
    if (storedWorkout) {
      setWorkoutDay(JSON.parse(storedWorkout))
    } else {
      router.push("/program")
    }
  }, [router])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isWorkoutActive])

  if (!workoutDay) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCompleteExercise = () => {
    if (!completedExercises.includes(currentExerciseIndex)) {
      setCompletedExercises([...completedExercises, currentExerciseIndex])
    }
    if (currentExerciseIndex < workoutDay.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const handleFinishWorkout = () => {
    // Mark workout as completed
    const user = localStorage.getItem("user")
    if (user) {
      // Here you would typically save to a database
      alert("Congratulations! You completed the workout!")
      router.push("/program")
    }
  }

  const progress = (completedExercises.length / workoutDay.exercises.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/program">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{workoutDay.title}</h1>
              <p className="text-sm text-muted-foreground">{workoutDay.day}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-lg font-bold">{formatTime(timer)}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <div>
            <p className="text-sm text-muted-foreground mb-1">Progress</p>
            <p className="text-2xl font-bold">
            {completedExercises.length} / {workoutDay.exercises.length} Exercises
            </p>
            </div>
            <div className="text-4xl font-bold text-primary">{Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-3" />
        </Card>

        <div className="space-y-4 mb-6">
          {workoutDay.exercises.map((exercise: string, index: number) => (
            <Card
              key={index}
              className={`p-6 border-2 transition-all ${
                completedExercises.includes(index)
                  ? "bg-primary/5 border-primary/30"
                  : currentExerciseIndex === index
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      completedExercises.includes(index)
                        ? "bg-primary text-white"
                        : currentExerciseIndex === index
                          ? "bg-gradient-to-br from-primary to-secondary text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {completedExercises.includes(index) ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Dumbbell className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{exercise}</h3>
                    <p className="text-sm text-muted-foreground">3 set x 12 tekrar</p>
                  </div>
                </div>
                {currentExerciseIndex === index && !completedExercises.includes(index) && (
                <Badge className="bg-primary">Now</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setIsWorkoutActive(!isWorkoutActive)}
            variant="outline"
            className="flex-1 h-14 text-lg"
          >
            {isWorkoutActive ? (
            <>
            <Pause className="w-5 h-5 mr-2" />
            Pause
            </>
            ) : (
            <>
            <Play className="w-5 h-5 mr-2" />
            Start
            </>
            )}
          </Button>

          {completedExercises.length === workoutDay.exercises.length ? (
            <Button
              onClick={handleFinishWorkout}
              className="flex-1 h-14 text-lg bg-gradient-to-r from-primary to-secondary"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Finish Workout
            </Button>
          ) : (
            <Button
              onClick={handleCompleteExercise}
              className="flex-1 h-14 text-lg bg-gradient-to-r from-primary to-secondary"
            >
              <SkipForward className="w-5 h-5 mr-2" />
              Complete Exercise
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
