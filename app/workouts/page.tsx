"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import FitproLayout from "@/components/fitpro-layout"
<<<<<<< HEAD
import { Search, Dumbbell, Clock, Target, ChevronRight, Plus } from "lucide-react"
=======
import { Search, Dumbbell, Clock, Target, ChevronRight } from "lucide-react"
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf

interface WorkoutCategory {
  id: string
  name: string
  icon: string
  count: number
  duration: string
  difficulty: string
}

export default function WorkoutsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useLanguage()

<<<<<<< HEAD
  // Empty data - will be fetched from database
  const [categories] = useState<WorkoutCategory[]>([])
  const [workouts] = useState<any[]>([])
=======
  const [categories] = useState<WorkoutCategory[]>([
    { id: "1", name: "Strength", icon: "💪", count: 85, duration: "20 mins", difficulty: "Medium" },
    { id: "2", name: "Cardio", icon: "🏃", count: 86, duration: "30 mins", difficulty: "Hard" },
    { id: "3", name: "Yoga", icon: "🧘", count: 45, duration: "20 mins", difficulty: "Easy" },
    { id: "4", name: "Calisthenics", icon: "🤸", count: 52, duration: "25 mins", difficulty: "Medium" },
    { id: "5", name: "Flexibility", icon: "🤲", count: 38, duration: "15 mins", difficulty: "Easy" },
    { id: "6", name: "HIIT", icon: "⚡", count: 64, duration: "45 mins", difficulty: "Hard" },
  ])

  const [workouts] = useState([
    {
      id: "w1",
      name: "Full Body",
      category: "Strength",
      duration: "45 mins",
      exercises: 8,
      difficulty: "Medium",
      image: "💪",
    },
    {
      id: "w2",
      name: "Fat Burning",
      category: "Cardio",
      duration: "30 mins",
      exercises: 6,
      difficulty: "Hard",
      image: "🔥",
    },
    {
      id: "w3",
      name: "Morning Stretch",
      category: "Yoga",
      duration: "20 mins",
      exercises: 5,
      difficulty: "Easy",
      image: "🧘",
    },
    {
      id: "w4",
      name: "Core Blast",
      category: "Calisthenics",
      duration: "25 mins",
      exercises: 7,
      difficulty: "Medium",
      image: "🎯",
    },
  ])
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf

  const filteredWorkouts = workouts.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <FitproLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t("workouts")}</h1>
          <p className="text-gray-400">{t("browseWorkoutsSubtitle")}</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder={t("searchWorkoutsPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="fitpro-input pl-12 py-3 rounded-xl"
          />
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{t("categories")}</h2>
<<<<<<< HEAD
          {categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((cat) => (
                <Card key={cat.id} className="fitpro-card hover:border-blue-500/50 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <p className="text-white font-semibold text-sm">{cat.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{cat.count} {t("exercises")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="fitpro-card text-center p-8 border-dashed">
              <Dumbbell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No workout categories available</p>
              <p className="text-gray-500 text-sm">Categories will be added by your trainer</p>
            </Card>
          )}
=======
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Card key={cat.id} className="fitpro-card hover:border-blue-500/50 transition-all cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{cat.icon}</div>
                  <p className="text-white font-semibold text-sm">{cat.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{cat.count} {t("exercises")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
        </div>

        {/* Workouts List */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">{t("availableWorkouts")}</h2>

<<<<<<< HEAD
          {workouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workouts
                .filter((w) =>
                  w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  w.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((workout) => (
=======
          {filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWorkouts.map((workout) => (
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                <Card
                  key={workout.id}
                  className="fitpro-card hover:border-blue-500/50 transition-all overflow-hidden cursor-pointer group"
                >
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-500/20 p-6 text-center min-h-[180px] flex items-center justify-center">
                      <div className="text-6xl">{workout.image}</div>
                    </div>
                  </CardContent>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg">{workout.name}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">{workout.category}</p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-slate-800/50 rounded-lg p-2">
                        <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-white text-sm font-semibold">{workout.duration}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2">
                        <Dumbbell className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                        <p className="text-white text-sm font-semibold">{workout.exercises}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-2">
                        <Target className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <p className="text-white text-sm font-semibold">{workout.difficulty}</p>
                      </div>
                    </div>

                    <Button className="w-full fitpro-button rounded-xl py-2">
                      {t("start")} <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
<<<<<<< HEAD
            <Card className="fitpro-card text-center p-12 border-dashed">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Plus className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Workouts Yet</h3>
              <p className="text-gray-400 mb-4">Your trainer will assign workouts to you</p>
              <p className="text-gray-500 text-sm">Check back later or contact your trainer</p>
=======
            <Card className="fitpro-card text-center p-8">
              <p className="text-gray-400">{t("noWorkoutsFound")}</p>
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
            </Card>
          )}
        </div>
      </div>
    </FitproLayout>
  )
}
