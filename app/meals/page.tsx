"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Apple, Sandwich, Utensils, Flame, Plus, Timer, CalendarDays, CheckCircle2, Circle, LayoutDashboard, Dumbbell, HeartPulse, User, Calendar, Award, Target, Play, Image as ImageIcon, Clock } from "lucide-react"
import { submitMeal, hasSubmittedMealToday } from "@/lib/submissions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import SubscriptionRequiredGuard from "@/components/subscription-guard"

type ViewMode = "day" | "week" | "month"

interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  ingredients?: string[]
  recipe?: string
  imageUrl?: string
  mealType: string // Breakfast, Lunch, Dinner, Snack
}

interface DayMeal {
  day: string
  meals: Meal[]
}

export default function MealsPage() {
  const router = useRouter()
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [view, setView] = useState<ViewMode>("week")
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [submittedToday, setSubmittedToday] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [mealSchedule, setMealSchedule] = useState<DayMeal[]>([])
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)

  useEffect(() => {
    const role = typeof window !== "undefined" ? localStorage.getItem("userRole") : null
    setIsSuperadmin(role === "superadmin")
    try {
      const raw = localStorage.getItem("mealTasksCompleted")
      if (raw) setCompleted(JSON.parse(raw))
    } catch {}
    setSubmittedToday(hasSubmittedMealToday())
    
    // Load meal schedule
    try {
      const saved = localStorage.getItem("weeklyMealSchedule")
      if (saved) {
        setMealSchedule(JSON.parse(saved))
      } else {
        setMealSchedule(defaultMealSchedule)
      }
    } catch {
      setMealSchedule(defaultMealSchedule)
    }
  }, [])

  // Default meal schedule - managed by superadmin
  const defaultMealSchedule: DayMeal[] = [
    {
      day: "Monday",
      meals: [
        {
          id: "mon-b",
          name: "Protein Oatmeal Bowl",
          calories: 450,
          protein: 25,
          carbs: 60,
          fat: 12,
          ingredients: ["Oats", "Protein powder", "Banana", "Almond butter", "Berries"],
          recipe: "Mix oats with protein powder, top with sliced banana, berries, and a drizzle of almond butter",
          imageUrl: "/meals/oatmeal.jpg",
          mealType: "Breakfast"
        },
        {
          id: "mon-l",
          name: "Grilled Chicken & Brown Rice",
          calories: 650,
          protein: 50,
          carbs: 70,
          fat: 15,
          ingredients: ["Chicken breast", "Brown rice", "Broccoli", "Olive oil"],
          recipe: "Grill chicken breast, serve with steamed broccoli and brown rice",
          imageUrl: "/meals/chicken-rice.jpg",
          mealType: "Lunch"
        },
        {
          id: "mon-d",
          name: "Salmon with Sweet Potato",
          calories: 580,
          protein: 45,
          carbs: 50,
          fat: 20,
          ingredients: ["Salmon fillet", "Sweet potato", "Asparagus", "Lemon"],
          recipe: "Bake salmon with lemon, roast sweet potato and asparagus",
          imageUrl: "/meals/salmon.jpg",
          mealType: "Dinner"
        }
      ]
    },
    {
      day: "Tuesday",
      meals: [
        {
          id: "tue-b",
          name: "Greek Yogurt Parfait",
          calories: 380,
          protein: 30,
          carbs: 45,
          fat: 10,
          ingredients: ["Greek yogurt", "Granola", "Honey", "Mixed berries"],
          mealType: "Breakfast"
        },
        {
          id: "tue-l",
          name: "Turkey Wrap",
          calories: 520,
          protein: 40,
          carbs: 55,
          fat: 15,
          ingredients: ["Whole wheat wrap", "Turkey breast", "Avocado", "Lettuce", "Tomato"],
          mealType: "Lunch"
        },
        {
          id: "tue-d",
          name: "Beef Stir-fry",
          calories: 620,
          protein: 48,
          carbs: 60,
          fat: 18,
          ingredients: ["Lean beef", "Mixed vegetables", "Quinoa", "Soy sauce"],
          mealType: "Dinner"
        }
      ]
    },
    {
      day: "Wednesday",
      meals: [
        {
          id: "wed-b",
          name: "Scrambled Eggs & Toast",
          calories: 420,
          protein: 28,
          carbs: 40,
          fat: 16,
          ingredients: ["Eggs", "Whole grain toast", "Spinach", "Cheese"],
          mealType: "Breakfast"
        },
        {
          id: "wed-l",
          name: "Tuna Salad Bowl",
          calories: 480,
          protein: 42,
          carbs: 35,
          fat: 18,
          ingredients: ["Tuna", "Mixed greens", "Chickpeas", "Olive oil", "Lemon"],
          mealType: "Lunch"
        },
        {
          id: "wed-d",
          name: "Chicken Pasta",
          calories: 680,
          protein: 52,
          carbs: 75,
          fat: 20,
          ingredients: ["Chicken", "Whole wheat pasta", "Marinara sauce", "Vegetables"],
          mealType: "Dinner"
        }
      ]
    },
    {
      day: "Thursday",
      meals: [
        {
          id: "thu-b",
          name: "Protein Smoothie Bowl",
          calories: 400,
          protein: 32,
          carbs: 50,
          fat: 10,
          ingredients: ["Protein powder", "Banana", "Berries", "Almond milk", "Granola"],
          mealType: "Breakfast"
        },
        {
          id: "thu-l",
          name: "Quinoa Buddha Bowl",
          calories: 550,
          protein: 25,
          carbs: 65,
          fat: 20,
          ingredients: ["Quinoa", "Chickpeas", "Avocado", "Kale", "Tahini"],
          mealType: "Lunch"
        },
        {
          id: "thu-d",
          name: "Pork Tenderloin & Veggies",
          calories: 590,
          protein: 48,
          carbs: 45,
          fat: 22,
          ingredients: ["Pork tenderloin", "Roasted vegetables", "Brown rice"],
          mealType: "Dinner"
        }
      ]
    },
    {
      day: "Friday",
      meals: [
        {
          id: "fri-b",
          name: "Avocado Toast with Eggs",
          calories: 460,
          protein: 22,
          carbs: 42,
          fat: 24,
          ingredients: ["Avocado", "Sourdough bread", "Eggs", "Cherry tomatoes"],
          mealType: "Breakfast"
        },
        {
          id: "fri-l",
          name: "Shrimp & Veggie Skillet",
          calories: 480,
          protein: 45,
          carbs: 40,
          fat: 15,
          ingredients: ["Shrimp", "Bell peppers", "Zucchini", "Quinoa"],
          mealType: "Lunch"
        },
        {
          id: "fri-d",
          name: "Grilled Steak & Potatoes",
          calories: 720,
          protein: 55,
          carbs: 60,
          fat: 28,
          ingredients: ["Sirloin steak", "Roasted potatoes", "Green beans"],
          mealType: "Dinner"
        }
      ]
    },
    {
      day: "Saturday",
      meals: [
        {
          id: "sat-b",
          name: "Pancakes & Berries",
          calories: 520,
          protein: 20,
          carbs: 75,
          fat: 15,
          ingredients: ["Whole wheat pancakes", "Mixed berries", "Maple syrup", "Greek yogurt"],
          mealType: "Breakfast"
        },
        {
          id: "sat-l",
          name: "Chicken Caesar Salad",
          calories: 550,
          protein: 45,
          carbs: 35,
          fat: 25,
          ingredients: ["Chicken breast", "Romaine lettuce", "Parmesan", "Caesar dressing"],
          mealType: "Lunch"
        },
        {
          id: "sat-d",
          name: "Pizza Night (Healthy)",
          calories: 650,
          protein: 38,
          carbs: 70,
          fat: 22,
          ingredients: ["Whole wheat crust", "Chicken", "Vegetables", "Mozzarella"],
          mealType: "Dinner"
        }
      ]
    },
    {
      day: "Sunday",
      meals: [
        {
          id: "sun-b",
          name: "Breakfast Burrito",
          calories: 580,
          protein: 35,
          carbs: 55,
          fat: 22,
          ingredients: ["Eggs", "Whole wheat tortilla", "Black beans", "Avocado", "Salsa"],
          mealType: "Breakfast"
        },
        {
          id: "sun-l",
          name: "Meal Prep Bowl",
          calories: 520,
          protein: 40,
          carbs: 50,
          fat: 18,
          ingredients: ["Chicken", "Brown rice", "Mixed vegetables", "Teriyaki sauce"],
          mealType: "Lunch"
        },
        {
          id: "sun-d",
          name: "Light Soup & Salad",
          calories: 420,
          protein: 25,
          carbs: 45,
          fat: 15,
          ingredients: ["Vegetable soup", "Grilled chicken", "Garden salad"],
          mealType: "Dinner"
        }
      ]
    }
  ]

  // Get today's meals
  const getTodayMeals = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = days[new Date().getDay()]
    return mealSchedule.find(d => d.day === today) || mealSchedule[0]
  }

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("mealTasksCompleted", JSON.stringify(next)) } catch {}
      return next
    })
  }

  const todayMeals = [
    { id: "m1", name: "Breakfast Oats", calories: 320, time: "08:00" },
    { id: "m2", name: "Grilled Chicken", calories: 540, time: "13:00" },
    { id: "m3", name: "Greek Yogurt", calories: 180, time: "16:30" },
  ]
  const macros = {
    protein: 92,
    carbs: 140,
    fat: 46,
    calories: todayMeals.reduce((a, m) => a + m.calories, 0)
  }

  const daySchedule = [
    { time: "08:00", title: "Breakfast" },
    { time: "13:00", title: "Lunch" },
    { time: "19:00", title: "Dinner" },
  ]
  const weekSchedule = [
    { day: "Mon", title: "High Protein" },
    { day: "Tue", title: "Low Carb" },
    { day: "Wed", title: "Balanced" },
    { day: "Thu", title: "High Fiber" },
    { day: "Fri", title: "Refuel" },
    { day: "Sat", title: "Free" },
    { day: "Sun", title: "Prep" },
  ]
  const monthSchedule = [
    { date: "Nov 10", title: "Meal Prep Week" },
    { date: "Nov 17", title: "Cut Phase" },
    { date: "Nov 24", title: "Refuel Weekend" },
  ]

  const handleSubmitDay = () => {
    if (submitting) return
    setSubmitting(true)
    const tasks = Object.entries(completed)
      .filter(([k,v]) => v && k.startsWith("day-"))
      .map(([k]) => k)
    submitMeal(tasks)
    setSubmittedToday(true)
    setTimeout(() => setSubmitting(false), 400)
  }

  return (
    <SubscriptionRequiredGuard>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent mb-2">
          Meals & Nutrition
        </h1>
        <p className="text-[#B6C4CF] mb-8">Track daily meals and macro goals.</p>

        <Card className="bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] border-none p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">Fuel Your Body Right</h3>
            <p className="text-white/90 text-sm mb-4">Balance your nutrition and reach your fitness goals</p>
            {isSuperadmin && (
              <Button className="bg-white text-[#F59E0B] hover:bg-white/90 font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Meal</Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Flame} label="Calories Today" value="1,450" color="#F59E0B" />
          <StatsCard icon={Apple} label="Protein" value="92g" color="#FB923C" />
          <StatsCard icon={Utensils} label="Meals Logged" value="3" color="#FCD34D" />
          <StatsCard icon={Target} label="Daily Goal" value="85%" color="#F59E0B" />
        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm flex items-center gap-2"><CalendarDays className="w-4 h-4 text-amber-400" /> Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              {(["day","week","month"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-white border-amber-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-amber-500/30"}`}
                >
                  {v === "day" ? "TODAY" : v.toUpperCase()}
                </button>
              ))}
            </div>

            {view === "day" && (
              <div className="space-y-2">
                {(() => {
                  const todayMeals = getTodayMeals()
                  const mealCount = todayMeals.meals.length
                  const totalCalories = todayMeals.meals.reduce((sum, m) => sum + m.calories, 0)
                  
                  return (
                    <button
                      onClick={() => setSelectedDay(todayMeals.day)}
                      className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-amber-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-500">
                          <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">Today's Meals - {todayMeals.day}</p>
                          <p className="text-[#B6C4CF] text-xs">{mealCount} meals • {totalCalories} kcal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                          {totalCalories} cal
                        </div>
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Play className="w-4 h-4 text-amber-400" />
                        </div>
                      </div>
                    </button>
                  )
                })()}
              </div>
            )}

            {view === "week" && (
              <div className="space-y-2">
                {mealSchedule.map((dayMeal, i) => {
                  const mealCount = dayMeal.meals.length
                  const totalCalories = dayMeal.meals.reduce((sum, m) => sum + m.calories, 0)
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(dayMeal.day)}
                      className="w-full flex items-center justify-between p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-amber-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-500">
                          <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">{dayMeal.day}</p>
                          <p className="text-[#B6C4CF] text-xs">{mealCount} meals • {totalCalories} kcal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                          {totalCalories} cal
                        </div>
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Play className="w-4 h-4 text-amber-400" />
                        </div>
                      </div>
                    </button>
                  )
                })}
                {!mealSchedule.length && <p className="text-slate-500 text-sm">No meal schedule available.</p>}
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
                    const dayMeal = mealSchedule[dayIndex]
                    const mealCount = dayMeal?.meals.length || 0
                    const totalCalories = dayMeal?.meals.reduce((sum, m) => sum + m.calories, 0) || 0
                    return (
                      <button
                        key={i}
                        onClick={() => dayMeal && setSelectedDay(dayMeal.day)}
                        className="aspect-square p-1 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-amber-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center"
                      >
                        <p className="text-white text-[9px] font-bold mb-0.5">{dayNum}</p>
                        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-500">
                          <Utensils className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-amber-400 text-[7px] mt-0.5">{mealCount}m</p>
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
              className="w-full bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] disabled:opacity-50 disabled:cursor-not-allowed hover:from-[#D97706] hover:to-[#FBBF24] text-white"
            >
              {submittedToday ? "Submitted" : submitting ? "Submitting..." : "Submit Today's Meals"}
            </Button>
            {submittedToday && <p className="text-[11px] text-[#B6C4CF] mt-2 text-center">You already submitted today. Trainers & superadmin can view it.</p>}
          </div>
        )}


      </section>
      </div>

      {/* Day Meals Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {selectedDay} Meals
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="space-y-4">
              {mealSchedule
                .find(d => d.day === selectedDay)
                ?.meals.map((meal, idx) => (
                  <Card
                    key={meal.id}
                    className="bg-slate-900/70 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer"
                    onClick={() => setSelectedMeal(meal)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-amber-400 font-bold text-lg">{idx + 1}.</span>
                            <h3 className="text-white font-semibold text-lg">{meal.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-2">
                            <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm">
                              {meal.calories} kcal
                            </div>
                            <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                              P: {meal.protein}g
                            </div>
                            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                              C: {meal.carbs}g
                            </div>
                            <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                              F: {meal.fat}g
                            </div>
                            <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                              {meal.mealType}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {meal.imageUrl && (
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

      {/* Meal Detail Dialog */}
      <Dialog open={!!selectedMeal} onOpenChange={(open) => !open && setSelectedMeal(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedMeal?.name}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            {selectedMeal && (
              <div className="space-y-6">
                {/* Macros Info */}
                <Card className="bg-slate-900/70 border-slate-800">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Calories</p>
                        <p className="text-white font-bold text-2xl">{selectedMeal.calories}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Protein</p>
                        <p className="text-blue-400 font-bold text-2xl">{selectedMeal.protein}g</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Carbs</p>
                        <p className="text-green-400 font-bold text-2xl">{selectedMeal.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">Fat</p>
                        <p className="text-yellow-400 font-bold text-2xl">{selectedMeal.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Image */}
                {selectedMeal.imageUrl && (
                  <Card className="bg-slate-900/70 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Meal Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                          <p className="text-slate-400 text-sm">Meal photo</p>
                          <p className="text-blue-400 text-xs mt-1">{selectedMeal.imageUrl}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Ingredients */}
                {selectedMeal.ingredients && selectedMeal.ingredients.length > 0 && (
                  <Card className="bg-slate-900/70 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedMeal.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Recipe */}
                {selectedMeal.recipe && (
                  <Card className="bg-green-500/10 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 text-lg flex items-center gap-2">
                        📝 Recipe Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white">{selectedMeal.recipe}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Meal Type */}
                <Card className="bg-amber-500/10 border-amber-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Meal Type</span>
                      <span className="text-amber-400 font-semibold">{selectedMeal.mealType}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

    </div>
      <BottomNav activeTab="meals" router={router} />
    </SubscriptionRequiredGuard>
  )
}

function StatsCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="bg-[#101A23] border-[#2E3944] p-6 hover:border-[#FCD34D]/30 transition-all">
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
            onClick={() => { if (item.path !== "/meals") router.push(item.path) }}
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
