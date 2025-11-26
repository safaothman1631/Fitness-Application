"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
<<<<<<< HEAD
import AuthGuard from "@/components/auth-guard"
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
import { Apple, Sandwich, Utensils, Flame, Plus, Timer, CalendarDays, CheckCircle2, Circle, LayoutDashboard, Dumbbell, HeartPulse, User, Calendar, Award, Target, Play, Image as ImageIcon, Clock } from "lucide-react"
import { submitMeal, hasSubmittedMealToday } from "@/lib/submissions"
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
  const [viewTransition, setViewTransition] = useState(true)
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [submittedToday, setSubmittedToday] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [mealSchedule, setMealSchedule] = useState<DayMeal[]>([])
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [mounted, setMounted] = useState(false)
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  // Get meal ordinal translation key (reusing exercise keys)
  const getMealOrdinal = (num: number): TranslationKey => {
    const ordinals: TranslationKey[] = [
      "exerciseFirst", "exerciseSecond", "exerciseThird", "exerciseFourth", "exerciseFifth",
      "exerciseSixth", "exerciseSeventh", "exerciseEighth", "exerciseNinth", "exerciseTenth"
    ]
    return ordinals[num - 1] || "exerciseFirst"
  }

  useEffect(() => {
    setMounted(true)
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

<<<<<<< HEAD
  // Empty meal schedule - will be fetched from database
  const defaultMealSchedule: DayMeal[] = []
=======
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
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf

  // Get today's meals
  const getTodayMeals = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = days[new Date().getDay()]
<<<<<<< HEAD
    if (mealSchedule.length === 0) return { day: days[new Date().getDay()], meals: [] }
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    return mealSchedule.find(d => d.day === today) || mealSchedule[0]
  }

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try { localStorage.setItem("mealTasksCompleted", JSON.stringify(next)) } catch {}
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

<<<<<<< HEAD
=======
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

>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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

  if (!mounted) {
    return null
  }

  return (
<<<<<<< HEAD
    <AuthGuard requiredRole="user">
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    <SubscriptionRequiredGuard>
    <PageTransition>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent mb-2">
          {t("mealsAndNutrition")}
        </h1>
        <p className="text-[#B6C4CF] mb-8">{t("trackDailyMealsDesc")}</p>

        <Card className="bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] border-none p-8 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-white text-xl font-bold mb-2">{t("fuelYourBodyRight")}</h3>
            <p className="text-white/90 text-sm mb-4">{t("fuelYourBodyRightDesc")}</p>
            {isSuperadmin && (
              <Button className="bg-white text-[#F59E0B] hover:bg-white/90 font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Add Meal</Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
<<<<<<< HEAD
          <StatsCard icon={Flame} label={t("caloriesTodayLabel")} value="0" color="#F59E0B" />
          <StatsCard icon={Apple} label={t("protein")} value="0g" color="#FB923C" />
          <StatsCard icon={Utensils} label={t("mealsLogged")} value="0" color="#FCD34D" />
          <StatsCard icon={Target} label={t("dailyGoal")} value="0%" color="#F59E0B" />
=======
          <StatsCard icon={Flame} label={t("caloriesTodayLabel")} value="1,450" color="#F59E0B" />
          <StatsCard icon={Apple} label={t("protein")} value="92g" color="#FB923C" />
          <StatsCard icon={Utensils} label={t("mealsLogged")} value="3" color="#FCD34D" />
          <StatsCard icon={Target} label={t("dailyGoal")} value="85%" color="#F59E0B" />
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className={`pb-2 ${isRTL ? 'text-right' : ''}`}>
            <CardTitle className={`text-white text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><CalendarDays className="w-4 h-4 text-amber-400" /> {t("schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
<<<<<<< HEAD
              {(["day","week"] as ViewMode[]).map(v => (
=======
              {(["day","week","month"] as ViewMode[]).map(v => (
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                <button
                  key={v}
                  onClick={() => handleViewChange(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-white border-amber-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-amber-500/30"}`}
                >
<<<<<<< HEAD
                  {v === "day" ? t("today") : t("week")}
=======
                  {v === "day" ? t("today") : v === "week" ? t("week") : t("monthView")}
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
                  const todayMeals = getTodayMeals()
<<<<<<< HEAD
                  
                  if (!todayMeals || todayMeals.meals.length === 0) {
                    return (
                      <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                        <CardContent className="text-center py-16 px-6">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/10 border border-amber-500/20">
                              <Utensils className="w-12 h-12 text-amber-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center">
                              <span className="text-orange-400 text-lg">🍽️</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {language === 'ku' ? 'ئەمڕۆ خواردن نییە' : language === 'ar' ? 'لا توجد وجبات اليوم' : 'No Meals Today'}
                          </h3>
                          <p className="text-gray-400 mb-6 text-base max-w-sm mx-auto">
                            {language === 'ku' ? 'هیچ خواردنێک بۆ ئەمڕۆ دیاری نەکراوە' : language === 'ar' ? 'لم يتم تحديد وجبات لهذا اليوم' : 'No meals scheduled for today'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                              <Calendar className="w-4 h-4 mr-2" />
                              {language === 'ku' ? 'ڕۆژانی تر ببینە' : language === 'ar' ? 'تحقق من الأيام الأخرى' : 'Check Other Days'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                  const mealCount = todayMeals.meals.length
                  const totalCalories = todayMeals.meals.reduce((sum, m) => sum + m.calories, 0)
                  
                  return (
                    <button
                      onClick={() => setSelectedDay(todayMeals.day)}
                      className={`w-full grid items-center gap-0 p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-amber-500/50 transition-all duration-300 group ${isRTL ? 'grid-cols-[80px_1fr_auto]' : 'grid-cols-[80px_1fr_auto]'}`}
                    >
                      {/* Right column: Play button + calories */}
                      <div className={`flex items-center gap-2 justify-end ${isRTL ? 'order-3' : 'order-3'}`}>
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Play className={`w-4 h-4 text-amber-400 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                        <div className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs whitespace-nowrap">
                          {totalCalories} cal
                        </div>
                      </div>
                      
                      {/* Center: Text content */}
                      <div className={`order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-white font-semibold text-sm">{t("todaysMeals")} - {t(todayMeals.day.toLowerCase() as any)}</p>
                        <p className="text-[#B6C4CF] text-xs">{mealCount} {t("meals")} • {totalCalories} {t("kcal")}</p>
                      </div>
                      
                      {/* Left column: Icon */}
                      <div className={`flex ${isRTL ? 'justify-end order-1' : 'justify-start order-1'}`}>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-500">
                          <Utensils className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </button>
                  )
                })()}
              </div>
            )}

            {view === "week" && (
              <div className="space-y-2">
<<<<<<< HEAD
                {mealSchedule.length > 0 ? mealSchedule.map((dayMeal, i) => {
=======
                {mealSchedule.map((dayMeal, i) => {
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
                  const mealCount = dayMeal.meals.length
                  const totalCalories = dayMeal.meals.reduce((sum, m) => sum + m.calories, 0)
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDay(dayMeal.day)}
                      className={`w-full grid items-center gap-0 p-4 rounded-lg bg-[#0E151B] border border-[#2E3944] hover:border-amber-500/50 transition-all duration-300 group ${isRTL ? 'grid-cols-[80px_1fr_auto]' : 'grid-cols-[80px_1fr_auto]'}`}
                    >
                      {/* Right column: Play button + calories */}
                      <div className={`flex items-center gap-2 justify-end ${isRTL ? 'order-3' : 'order-3'}`}>
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Play className={`w-4 h-4 text-amber-400 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                        <div className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs whitespace-nowrap">
                          {totalCalories} cal
                        </div>
                      </div>
                      
                      {/* Center: Text content */}
                      <div className={`order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        <p className="text-white font-semibold text-sm">{t(dayMeal.day.toLowerCase() as any)}</p>
                        <p className="text-[#B6C4CF] text-xs">{mealCount} {t("meals")} • {totalCalories} {t("kcal")}</p>
                      </div>
                      
                      {/* Left column: Icon */}
                      <div className={`flex ${isRTL ? 'justify-end order-1' : 'justify-start order-1'}`}>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-600 to-amber-500">
                          <Utensils className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </button>
                  )
<<<<<<< HEAD
                }) : (
                  <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                    <CardContent className="text-center py-20 px-6">
                      <div className="relative inline-block mb-6">
                        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 flex items-center justify-center shadow-2xl shadow-amber-500/20 border border-amber-500/30">
                          <Utensils className="w-14 h-14 text-amber-400" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">🍽️</span>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                        {language === 'ku' ? 'خشتەی خواردن نییە' : language === 'ar' ? 'لا يوجد جدول وجبات' : 'No Meal Plan'}
                      </h3>
                      <p className="text-gray-400 mb-2 text-lg max-w-md mx-auto">
                        {language === 'ku' ? 'مەشقگەرەکەت خشتەی خواردنت بۆ دیاری دەکات' : language === 'ar' ? 'سيقوم مدربك بتعيين خطة الوجبات لك' : 'Your trainer will assign a meal plan to you'}
                      </p>
                      <p className="text-gray-500 text-sm mb-8">
                        {language === 'ku' ? 'دواتر سەردانی بکەرەوە یان پەیوەندی بە مەشقگەرەکەتەوە بکە' : language === 'ar' ? 'تحقق لاحقًا أو اتصل بمدربك' : 'Check back later or contact your trainer'}
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-500">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span>{language === 'ku' ? 'بەزوویانە چاوەڕێبە' : language === 'ar' ? 'انتظر قليلاً' : 'Coming Soon'}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
                          <Target className="w-4 h-4 text-green-400" />
                          <span>{language === 'ku' ? 'خواردنی تەندروست' : language === 'ar' ? 'وجبات صحية' : 'Healthy Meals'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
=======
                })}
                {!mealSchedule.length && <p className="text-slate-500 text-sm">No meal schedule available.</p>}
              </div>
            )}

            {view === "month" && (
              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-500 font-semibold mb-2">
                  <div>{t("mon")}</div>
                  <div>{t("tue")}</div>
                  <div>{t("wed")}</div>
                  <div>{t("thu")}</div>
                  <div>{t("fri")}</div>
                  <div>{t("sat")}</div>
                  <div>{t("sun")}</div>
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
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
              </div>
            )}
            </div>
          </CardContent>
        </Card>
<<<<<<< HEAD
=======

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


>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
      </section>
      </div>

      {/* Day Meals Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent ${isRTL ? 'text-right pr-12' : ''}`}>
              {selectedDay && t(selectedDay.toLowerCase() as any)} {t("meals")}
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
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-amber-400 font-bold text-lg">{t(getMealOrdinal(idx + 1))}</span>
                            <h3 className="text-white font-semibold text-lg">{meal.name}</h3>
                          </div>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm">
                              {meal.calories} {t("kcal")}
                            </div>
                            <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                              {t("protein")}: {meal.protein}g
                            </div>
                            <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                              {t("carbs")}: {meal.carbs}g
                            </div>
                            <div className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm">
                              {t("fat")}: {meal.fat}g
                            </div>
                            <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                              {t(meal.mealType.toLowerCase() as any)}
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
            <DialogTitle className={`text-2xl font-bold text-white ${isRTL ? 'text-right pr-12' : ''}`}>
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
                        <p className="text-slate-400 text-xs mb-1">{t("calories")}</p>
                        <p className="text-white font-bold text-2xl">{selectedMeal.calories}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">{t("protein")}</p>
                        <p className="text-blue-400 font-bold text-2xl">{selectedMeal.protein}g</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">{t("carbs")}</p>
                        <p className="text-green-400 font-bold text-2xl">{selectedMeal.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs mb-1">{t("fat")}</p>
                        <p className="text-yellow-400 font-bold text-2xl">{selectedMeal.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Image */}
                {selectedMeal.imageUrl && (
                  <Card className="bg-slate-900/70 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{t("mealImage")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                          <p className="text-slate-400 text-sm">{t("mealPhoto")}</p>
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
                      <CardTitle className="text-white text-lg">{t("ingredients")}</CardTitle>
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
                      <CardTitle className={`text-green-400 text-lg flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        📝 {t("recipeInstructions")}
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
                      <span className="text-slate-400 text-sm">{t("mealType")}</span>
                      <span className="text-amber-400 font-semibold">{t(selectedMeal.mealType.toLowerCase() as any)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

    </div>
    </PageTransition>
      <BottomNav activeTab="meals" />
    </SubscriptionRequiredGuard>
<<<<<<< HEAD
    </AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
