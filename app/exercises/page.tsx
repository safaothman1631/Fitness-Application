"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowLeft, Dumbbell, Lock } from "lucide-react"
import { exercises, getExercisesByGender } from "@/lib/exercises-data"
import type { Exercise } from "@/lib/exercises-data"

export default function ExercisesPage() {
  const router = useRouter()
  // Internal gender state uses English values matching Exercise["gender"] type
  const [userGender, setUserGender] = useState<"male" | "female" | "both">("male")
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    const isAdmin = userRole === "superadmin" || userRole === "physiotherapist"

    if (!isAdmin) {
      router.push("/dashboard")
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)

    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      const normalizeGender = (g: string): "male" | "female" | "both" => {
        switch (g) {
          case "male":
          case "female":
          case "both":
            return g
          case "erkek":
            return "male"
          case "kadin":
            return "female"
          default:
            return "male"
        }
      }
      setUserGender(normalizeGender(userData.gender))
    }
  }, [router])

  useEffect(() => {
    if (!isAuthorized) return

    let filtered = getExercisesByGender(userGender)

    if (searchTerm) {
      filtered = filtered.filter(
        (ex) =>
          ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ex.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((ex) => ex.category === selectedCategory)
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter((ex) => ex.difficulty === selectedDifficulty)
    }

    setFilteredExercises(filtered)
  }, [userGender, searchTerm, selectedCategory, selectedDifficulty, isAuthorized])

  const categories = ["All", ...new Set(exercises.map((ex) => ex.category))]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

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

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to view the exercises library. Only assigned exercises are visible to you.
          </p>
          <Button onClick={() => router.push("/dashboard")} className="w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 glass-effect sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Exercise Library
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search exercise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-base bg-card/50 border-border/50 focus:border-primary/50"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">Category:</span>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    : "glass-effect border-border/50 hover:border-primary/50"
                }
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-foreground">Difficulty:</span>
            {difficulties.map((diff) => (
              <Button
                key={diff}
                variant={selectedDifficulty === diff ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(diff)}
                className={
                  selectedDifficulty === diff
                    ? "bg-gradient-to-r from-secondary to-accent hover:opacity-90"
                    : "glass-effect border-border/50 hover:border-secondary/50"
                }
              >
                {diff}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Link key={exercise.id} href={`/exercises/${exercise.id}`}>
              <Card className="overflow-hidden glass-effect border-border/30 hover:border-primary/50 transition-all h-full group hover:scale-105">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={exercise.thumbnail || "/placeholder.svg"}
                    alt={exercise.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className={`absolute top-3 right-3 ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{exercise.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs border-primary/30">
                      {exercise.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{exercise.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{exercise.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exercise.targetMuscles.slice(0, 3).map((muscle) => (
                      <Badge key={muscle} variant="secondary" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No exercises found</p>
          </div>
        )}
      </div>
    </div>
  )
}
