"use client"

import { useState, useEffect } from "react"
import FitproLayout from "@/components/fitpro-layout"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Calendar, User, Utensils, Clock, ChevronRight, ArrowLeft, X, Flame, Beef } from "lucide-react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Trainee {
  id: string
  name: string
  email: string
  mealsCount: number
  programs: any[]
}

interface MealPlan {
  id: string
  traineeName: string
  traineeId: string
  date: string
  mealType: string
  foods: {
    name: string
    calories: number
    protein: number
    carbs: number
    fats: number
  }[]
  totalCalories: number
  notes?: string
  imageUrl?: string
  videoUrl?: string
  instructions?: string
}

export default function TrainerMeals() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMealType, setSelectedMealType] = useState<string>("all")
  const [trainees, setTrainees] = useState<Trainee[]>([])
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("all")
  const [view, setView] = useState<"trainees" | "meals">("trainees")
  const [selectedMeal, setSelectedMeal] = useState<MealPlan | null>(null)
  const [isMealDialogOpen, setIsMealDialogOpen] = useState(false)

  useEffect(() => {
    fetchTrainees()
  }, [])

  const fetchTrainees = async () => {
    try {
      setLoading(true)
      
      // Fetch users and programs
      const [usersData, programsData] = await Promise.all([
        dbService.getUsers(),
        fetch('/api/programs?type=nutrition').then(res => res.json())
      ])
      
      // Filter users who have meal programs
      const traineesWithMeals = usersData
        .filter((user: any) => user.role === 'user' || user.role === 'trainee')
        .map((user: any) => {
          const userPrograms = programsData.filter((program: any) => 
            program.assignedUsers && program.assignedUsers.includes(user.id)
          )
          const mealsCount = userPrograms.reduce((sum: number, program: any) => 
            sum + (program.meals?.length || 0), 0
          )
          
          return {
            id: user.id,
            name: user.name || user.email,
            email: user.email,
            mealsCount,
            programs: userPrograms
          }
        })
        .filter((trainee: Trainee) => trainee.mealsCount > 0)
      
      setTrainees(traineesWithMeals)
      
    } catch (error) {
      console.error("Error fetching trainees:", error)
      toast.error("Failed to load trainees")
    } finally {
      setLoading(false)
    }
  }

  const loadTraineeMeals = async (trainee: Trainee) => {
    try {
      setLoading(true)
      setSelectedTrainee(trainee)
      setView("meals")
      
      // Convert programs to meal plans
      const allMeals: MealPlan[] = trainee.programs.flatMap((program: any) => {
        if (!program.meals || program.meals.length === 0) return []
        
        console.log('🔍 Processing program:', program.id, 'meals:', program.meals.length)
        
        return program.meals.map((meal: any, index: number) => {
          console.log('🍽️ Meal:', meal.name, 'imageUrl:', meal.imageUrl)
          
          return {
            id: `${program.id}-meal-${index}`,
            traineeName: trainee.name,
            traineeId: trainee.id,
            date: new Date().toISOString().split('T')[0],
            mealType: meal.category ? meal.category.charAt(0).toUpperCase() + meal.category.slice(1) : "Meal",
            foods: meal.ingredients ? 
              meal.ingredients.split('\n').filter((ing: string) => ing.trim()).map((ing: string) => {
                const cleanIng = ing.trim()
                return {
                  name: cleanIng,
                  calories: Math.floor(Number(meal.calories || 0) / 3),
                  protein: Math.floor(Number(meal.protein || 0) / 3),
                  carbs: Math.floor(Number(meal.carbs || 0) / 3),
                  fats: Math.floor(Number(meal.fats || 0) / 3)
                }
              }) : 
              [{
                name: meal.name || "Meal Item",
                calories: Number(meal.calories || 0),
                protein: Number(meal.protein || 0),
                carbs: Number(meal.carbs || 0),
                fats: Number(meal.fats || 0)
              }],
            totalCalories: Number(meal.calories || 0),
            notes: `${program.title} - ${meal.notes || meal.instructions || ""}`,
            imageUrl: meal.imageUrl,
            videoUrl: meal.videoUrl,
            instructions: meal.instructions
          }
        })
      })
      
      setMealPlans(allMeals)
      
    } catch (error) {
      console.error("Error fetching meal plans:", error)
      toast.error("Failed to load meal plans")
    } finally {
      setLoading(false)
    }
  }

  const filteredTrainees = trainees.filter(trainee =>
    trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainee.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMeals = mealPlans.filter(meal => {
    const matchesSearch = meal.mealType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedMealType === "all" || meal.mealType.toLowerCase() === selectedMealType.toLowerCase()
    const matchesDate = selectedDate === "all" || meal.date === selectedDate
    return matchesSearch && matchesType && matchesDate
  })

  // Get unique dates from meals
  const availableDates = Array.from(new Set(mealPlans.map(meal => meal.date))).sort().reverse()

  const mealTypes = ["all", "Breakfast", "Lunch", "Dinner", "Snack"]

  const getMealTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "breakfast": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "lunch": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "dinner": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "snack": return "bg-purple-500/20 text-purple-400 border-purple-500/30"
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
                  <Utensils className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {t("traineeMeals")}
                  </h1>
                  <p className="text-slate-400 text-sm mt-1">View all trainee meal plans and nutrition data</p>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search by trainee name or meal type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:border-cyan-500"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {mealTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedMealType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMealType(type)}
                      className={selectedMealType === type 
                        ? "bg-cyan-500 hover:bg-cyan-600 text-white border-0 whitespace-nowrap" 
                        : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap"
                      }
                    >
                      {type === "all" ? "All Meals" : type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {view === "trainees" ? (
            // Trainees List View
            loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          ) : filteredTrainees.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Trainees Found</h3>
                <p className="text-slate-400">No trainees with meal plans</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTrainees.map((trainee, index) => (
                <div key={trainee.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card 
                    className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group"
                    onClick={() => loadTraineeMeals(trainee)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
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
                          <Utensils className="w-5 h-5 text-cyan-400" />
                          <span className="text-sm text-slate-300 font-medium">Meal Plans</span>
                        </div>
                        <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          {trainee.mealsCount}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-slate-400">
                        <span>{trainee.programs.length} Programs</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )
        ) : (
          // Meals View for Selected Trainee
          <div>
              <div className="mb-6 flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setView("trainees")
                    setSelectedTrainee(null)
                    setSelectedDate("all")
                  }}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Trainees
                </Button>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedTrainee?.name}</h2>
                  <p className="text-sm text-slate-400">{selectedTrainee?.email}</p>
                </div>
              </div>

              {/* Date Filter */}
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={selectedDate === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate("all")}
                  className={selectedDate === "all" 
                    ? "bg-cyan-500 hover:bg-cyan-600 text-white border-0 whitespace-nowrap" 
                    : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap"
                  }
                >
                  All Dates
                </Button>
                {availableDates.map((date) => (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDate(date)}
                    className={selectedDate === date 
                      ? "bg-cyan-500 hover:bg-cyan-600 text-white border-0 whitespace-nowrap" 
                      : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white whitespace-nowrap"
                    }
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Button>
                ))}
              </div>

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
              ) : filteredMeals.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center">
                <Utensils className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">No Meal Plans Found</h3>
                <p className="text-slate-400">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
              ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredMeals.map((meal, index) => (
                <div key={meal.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  <Card 
                    className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group cursor-pointer"
                    onClick={() => {
                      setSelectedMeal(meal)
                      setIsMealDialogOpen(true)
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                            {meal.traineeName.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
                              {meal.traineeName}
                            </CardTitle>
                            <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(meal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${getMealTypeColor(meal.mealType)} border`}>
                          {meal.mealType}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Meal Image */}
                      {meal.imageUrl && (
                        <div className="relative h-48 -mx-6 -mt-2 mb-4 bg-slate-800 rounded-t-lg overflow-hidden">
                          <img 
                            src={meal.imageUrl} 
                            alt={meal.mealType}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Video Link */}
                      {meal.videoUrl && (
                        <a 
                          href={meal.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                          </svg>
                          <span className="text-sm font-medium">Watch Cooking Video</span>
                        </a>
                      )}

                      {/* Instructions */}
                      {meal.instructions && (
                        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                          <h4 className="text-sm font-medium text-cyan-400 mb-2">Instructions:</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{meal.instructions}</p>
                        </div>
                      )}

                      {/* Foods List */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-300">Ingredients:</h4>
                        {meal.foods.map((food, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-700/50">
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-cyan-400" />
                              <span className="text-sm text-slate-300 font-medium">{food.name}</span>
                            </div>
                            <span className="text-xs text-slate-400">{food.calories} cal</span>
                          </div>
                        ))}
                      </div>

                      {/* Nutrition Summary */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-700">
                        <div className="text-center">
                          <p className="text-xs text-slate-400">Calories</p>
                          <p className="text-sm font-bold text-cyan-400">{meal.totalCalories}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-400">Protein</p>
                          <p className="text-sm font-bold text-green-400">
                            {meal.foods.reduce((sum, f) => sum + f.protein, 0)}g
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-400">Carbs</p>
                          <p className="text-sm font-bold text-blue-400">
                            {meal.foods.reduce((sum, f) => sum + f.carbs, 0)}g
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-slate-400">Fats</p>
                          <p className="text-sm font-bold text-amber-400">
                            {meal.foods.reduce((sum, f) => sum + f.fats, 0)}g
                          </p>
                        </div>
                      </div>

                      {/* Notes */}
                      {meal.notes && (
                        <div className="pt-3 border-t border-slate-700">
                          <p className="text-xs text-slate-400 italic">"{meal.notes}"</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
          </div>
        )}
        </div>
      </div>

      {/* Meal Details Dialog */}
      <Dialog open={isMealDialogOpen} onOpenChange={setIsMealDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 border-2 border-cyan-500/30 shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">{selectedMeal?.mealType}</div>
                  <div className="text-sm text-slate-400 font-normal">{selectedMeal?.traineeName}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMealDialogOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedMeal && (
            <div className="space-y-6 mt-4">
              {/* Meal Image */}
              {selectedMeal.imageUrl && (
                <div className="relative h-64 rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-lg">
                  <img 
                    src={selectedMeal.imageUrl} 
                    alt={selectedMeal.mealType}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Nutrition Summary - Big Cards */}
              <div className="grid grid-cols-4 gap-3">
                <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/30">
                  <CardContent className="p-4 text-center">
                    <Flame className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 mb-1">Calories</p>
                    <p className="text-2xl font-bold text-cyan-400">{selectedMeal.totalCalories}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <Beef className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 mb-1">Protein</p>
                    <p className="text-2xl font-bold text-green-400">
                      {selectedMeal.foods.reduce((sum, f) => sum + f.protein, 0)}g
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="w-6 h-6 mx-auto mb-2 text-2xl">🍚</div>
                    <p className="text-xs text-slate-400 mb-1">Carbs</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {selectedMeal.foods.reduce((sum, f) => sum + f.carbs, 0)}g
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/30">
                  <CardContent className="p-4 text-center">
                    <div className="w-6 h-6 mx-auto mb-2 text-2xl">🥑</div>
                    <p className="text-xs text-slate-400 mb-1">Fats</p>
                    <p className="text-2xl font-bold text-amber-400">
                      {selectedMeal.foods.reduce((sum, f) => sum + f.fats, 0)}g
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Video Link */}
              {selectedMeal.videoUrl && (
                <a 
                  href={selectedMeal.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all hover:scale-105"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <span className="text-base font-bold">Watch Cooking Video</span>
                </a>
              )}

              {/* Instructions */}
              {selectedMeal.instructions && (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <h4 className="text-base font-bold text-cyan-400 mb-3 flex items-center gap-2">
                      <span>📝</span> Instructions
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{selectedMeal.instructions}</p>
                  </CardContent>
                </Card>
              )}

              {/* Ingredients List */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <h4 className="text-base font-bold text-cyan-400 mb-3 flex items-center gap-2">
                    <span>🥗</span> Ingredients
                  </h4>
                  <div className="space-y-2">
                    {selectedMeal.foods.map((food, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:border-cyan-500/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-sm text-slate-200 font-medium block">{food.name}</span>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              <span>{food.calories} cal</span>
                              <span>•</span>
                              <span>P: {food.protein}g</span>
                              <span>•</span>
                              <span>C: {food.carbs}g</span>
                              <span>•</span>
                              <span>F: {food.fats}g</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {selectedMeal.notes && (
                <Card className="bg-blue-500/10 border-blue-500/30">
                  <CardContent className="p-4">
                    <h4 className="text-base font-bold text-blue-400 mb-2 flex items-center gap-2">
                      <span>💡</span> Notes
                    </h4>
                    <p className="text-sm text-slate-300 italic">"{selectedMeal.notes}"</p>
                  </CardContent>
                </Card>
              )}

              {/* Date */}
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedMeal.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </FitproLayout>
  )
}
