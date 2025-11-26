"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, CheckCircle2, Dumbbell } from "lucide-react"

export default function ProgramPage() {
  const router = useRouter()
  const [userGender, setUserGender] = useState<"male" | "female">("male")

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      setUserGender(userData.gender || "male")
    }
  }, [])

  const weeklyProgram = {
    male: [
      {
        day: "Monday",
        title: "Chest & Triceps",
        exercises: ["Bench Press", "Incline Dumbbell Press", "Cable Flyes", "Tricep Dips"],
        duration: "45-60 min",
        completed: true,
      },
      {
        day: "Tuesday",
        title: "Back & Biceps",
        exercises: ["Deadlift", "Pull-ups", "Barbell Rows", "Bicep Curls"],
        duration: "50-65 min",
        completed: true,
      },
      {
        day: "Wednesday",
        title: "Rest or Cardio",
        exercises: ["Light Running", "Walking", "Stretching"],
        duration: "30 min",
        completed: false,
      },
      {
        day: "Thursday",
        title: "Leg Day",
        exercises: ["Squats", "Leg Press", "Lunges", "Leg Curls"],
        duration: "60-75 min",
        completed: false,
      },
      {
        day: "Friday",
        title: "Shoulders & Core",
        exercises: ["Shoulder Press", "Lateral Raises", "Planks", "Russian Twists"],
        duration: "45-55 min",
        completed: false,
      },
      {
        day: "Saturday",
        title: "Full Body",
        exercises: ["Compound Movements", "Functional Training"],
        duration: "50 min",
        completed: false,
      },
      {
        day: "Sunday",
        title: "Active Rest",
        exercises: ["Yoga", "Stretching", "Light Activity"],
        duration: "30 min",
        completed: false,
      },
    ],
    female: [
      {
        day: "Monday",
        title: "Lower Body & Glutes",
        exercises: ["Squats", "Glute Bridges", "Lunges", "Leg Raises"],
        duration: "45-55 min",
        completed: true,
      },
      {
        day: "Tuesday",
        title: "Upper Body",
        exercises: ["Push-ups", "Dumbbell Rows", "Shoulder Press", "Tricep Dips"],
        duration: "40-50 min",
        completed: true,
      },
      {
        day: "Wednesday",
        title: "Core & Cardio",
        exercises: ["Planks", "Mountain Climbers", "Bicycle Crunches", "Burpees"],
        duration: "35-45 min",
        completed: false,
      },
      {
        day: "Thursday",
        title: "Lower Body",
        exercises: ["Deadlifts", "Step-ups", "Glute Kickbacks", "Calf Raises"],
        duration: "45-55 min",
        completed: false,
      },
      {
        day: "Friday",
        title: "Full Body Toning",
        exercises: ["Compound Movements", "Resistance Training"],
        duration: "50 min",
        completed: false,
      },
      {
        day: "Saturday",
        title: "Pilates or Yoga",
        exercises: ["Flexibility", "Balance", "Core Strength"],
        duration: "45 min",
        completed: false,
      },
      {
        day: "Sunday",
        title: "Active Rest",
        exercises: ["Walking", "Stretching", "Light Activity"],
        duration: "30 min",
        completed: false,
      },
    ],
  }

  const program = weeklyProgram[userGender as keyof typeof weeklyProgram]

  const handleStartDailyWorkout = (dayIndex: number) => {
    // Store the current workout day in localStorage
    localStorage.setItem("currentWorkoutDay", JSON.stringify(program[dayIndex]))
    // Navigate to the program workout page
    router.push("/program/workout")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">My Weekly Program</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Personal Training Program</h1>
          <p className="text-muted-foreground">
            {userGender === "male" ? "Male" : "Female"} specific customized weekly program
          </p>
        </div>

        <div className="space-y-4">
          {program.map((day, index) => (
            <Card
              key={index}
              className={`p-6 border-2 transition-all ${
                day.completed ? "bg-primary/5 border-primary/30" : "hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{day.day}</h3>
                    {day.completed && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                    </Badge>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-3">{day.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {day.duration}
                    </div>
                    <div className="flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" />
                    {day.exercises.length} exercises
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {day.exercises.map((exercise, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {exercise}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {!day.completed && (
              <Button
              onClick={() => handleStartDailyWorkout(index)}
              className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
              Start Workout
              </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
