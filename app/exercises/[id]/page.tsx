"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Clock, Target, CheckCircle2, Lock } from "lucide-react"
import { getExerciseById } from "@/lib/exercises-data"
import type { Exercise } from "@/lib/exercises-data"

export default function ExerciseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [exercise, setExercise] = useState<Exercise | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ex = getExerciseById(params.id as string)
    if (!ex) {
      router.push("/dashboard")
      return
    }

    setExercise(ex)

    const userRole = localStorage.getItem("userRole")
    const isAdmin = userRole === "superadmin" || userRole === "physiotherapist"

    if (isAdmin) {
      // Admins can view all exercises
      setIsAuthorized(true)
      setIsLoading(false)
      return
    }

    // For regular users, check if this exercise is assigned to them
    const assignedExercises = JSON.parse(localStorage.getItem("assignedExercises") || "[]")
    const hasAccess = assignedExercises.some((assignedEx: any) => assignedEx.id === params.id)

    if (!hasAccess) {
      setIsAuthorized(false)
      setIsLoading(false)
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [params.id, router])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Advanced":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized || !exercise) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to view this exercise. Only assigned exercises are visible to you.
          </p>
          <Button onClick={() => router.push("/dashboard")} className="w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/exercises">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Video Player */}
        <Card className="overflow-hidden mb-8 border-2">
          <div className="aspect-video relative bg-black">
            {!isPlaying ? (
              <>
                <img
                  src={exercise.videoUrl || "/placeholder.svg"}
                  alt={exercise.title}
                  className="w-full h-full object-cover opacity-70"
                />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Playing video...</p>
              </div>
            )}
          </div>
        </Card>

        {/* Exercise Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{exercise.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-sm">
                    {exercise.category}
                  </Badge>
                  <Badge className={getDifficultyColor(exercise.difficulty)}>{exercise.difficulty}</Badge>
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{exercise.description}</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 border-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{exercise.duration}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Muscles</p>
                  <p className="font-semibold">{exercise.targetMuscles.join(", ")}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="p-6 border-2">
            <h2 className="text-2xl font-bold mb-4">How to do it?</h2>
            <div className="space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{instruction}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Button */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Completed this exercise?</h3>
                <p className="text-muted-foreground">Save your progress</p>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Mark Complete
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
