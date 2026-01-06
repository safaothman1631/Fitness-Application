"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth-guard"
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
  calories: number | string
  protein: number | string
  carbs: number | string
  fat?: number | string
  fats?: number | string
  ingredients?: string[] | string
  recipe?: string
  instructions?: string
  imageUrl?: string
  mealType?: string // Breakfast, Lunch, Dinner, Snack
  category?: string // breakfast, lunch, dinner, snack
  notes?: string
}

interface DayMeal {
  day: string
  meals: Meal[]
}

interface Ad {
  id: string
  title: string
  description?: string
  imageUrl?: string
  link?: string
  buttonText?: string
  gradientFrom?: string
  gradientTo?: string
  textColor?: string
  status: 'active' | 'inactive'
  position?: string
  targetAudience?: string
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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [showImageOverlay, setShowImageOverlay] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [refreshingImages, setRefreshingImages] = useState(false)
  const [userCalorieGoal, setUserCalorieGoal] = useState<number>(2000) // Default 2000 calories
  const [banners, setBanners] = useState<Ad[]>([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"

  // Refresh expired image URLs
  const refreshImageUrls = async (imageUrl: string): Promise<string> => {
    if (!imageUrl || refreshingImages) return imageUrl
    
    try {
      // Check if URL might be expired (simple heuristic: if it has X-Goog-Expires parameter)
      const urlObj = new URL(imageUrl)
      const expires = urlObj.searchParams.get('X-Goog-Expires')
      const signature = urlObj.searchParams.get('X-Goog-Signature')
      
      // If it's not a signed URL (no signature), no need to refresh
      if (!signature) return imageUrl
      
      setRefreshingImages(true)
      
      const imageUrls = imageUrl.split(',').map(u => u.trim())
      const response = await fetch('/api/refresh-meal-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrls })
      })
      
      if (response.ok) {
        const data = await response.json()
        const refreshedUrl = data.refreshedUrls.join(', ')
        console.log('✅ Refreshed meal image URLs')
        setRefreshingImages(false)
        return refreshedUrl
      }
    } catch (error) {
      console.error('❌ Error refreshing image URLs:', error)
    }
    
    setRefreshingImages(false)
    return imageUrl
  }

  // Update selected meal to refresh images when opened
  const handleMealClick = async (meal: Meal) => {
    setSelectedMeal(meal)
    
    // Refresh images if they exist
    if (meal.imageUrl) {
      const refreshedUrl = await refreshImageUrls(meal.imageUrl)
      if (refreshedUrl !== meal.imageUrl) {
        setSelectedMeal({ ...meal, imageUrl: refreshedUrl })
      }
    }
  }

  // Helper: Get accessible days for user (Saturday to today only)
  // Saturday = day 0, Sunday = day 1, ..., Friday = day 6
  const getAccessibleDays = (): string[] => {
    const daysOrder = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const jsDay = new Date().getDay() // JavaScript: Sunday = 0, Saturday = 6
    // Convert to our system: Saturday = 0, Sunday = 1, ..., Friday = 6
    const todayIndex = jsDay === 6 ? 0 : jsDay + 1
    
    // Return days from Saturday (0) to today (inclusive)
    return daysOrder.slice(0, todayIndex + 1)
  }

  // Get meal ordinal translation key
  const getMealOrdinal = (num: number): TranslationKey => {
    const ordinals: TranslationKey[] = [
      "mealFirst", "mealSecond", "mealThird", "mealFourth", "mealFifth",
      "mealSixth", "mealSeventh", "mealEighth", "mealNinth", "mealTenth"
    ]
    return ordinals[num - 1] || "mealFirst"
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
    
    // Fetch user calorie goal from profile
    fetchUserCalorieGoal()
    
    // Fetch meal programs from database
    fetchMealPrograms()
    
    // Fetch banner ads
    fetchBanners()
  }, [])

  // Auto-slide banners every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  const fetchBanners = async () => {
    try {
      console.log('🎯 Fetching banner ads for meals...')
      const response = await fetch('/api/ads?status=active')
      console.log('📡 Banner response status:', response.status)
      if (response.ok) {
        const ads = await response.json()
        console.log('✅ Fetched all ads:', ads.length)
        const mealsBanners = ads.filter((ad: Ad) => ad.position === 'meals' || ad.position === 'top')
        console.log('🍽️ Meals banners found:', mealsBanners.length)
        if (mealsBanners.length > 0) {
          setBanners(mealsBanners)
        }
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
    }
  }

  const fetchUserCalorieGoal = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) return
      
      const response = await fetch(`/api/users/${userId}`)
      if (response.ok) {
        const user = await response.json()
        if (user.calorieGoal || user.dailyCalories || user.targetCalories) {
          const goal = Number(user.calorieGoal || user.dailyCalories || user.targetCalories)
          if (goal > 0) {
            setUserCalorieGoal(goal)
            console.log("🎯 Calorie goal set from user profile:", goal)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user calorie goal:", error)
    }
  }

  const fetchMealPrograms = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        console.log("⚠️ No userId found, skipping meal programs fetch")
        setMealSchedule(defaultMealSchedule)
        return
      }

      console.log("🔍 Fetching meal programs for user:", userId)
      const response = await fetch(`/api/programs?type=nutrition&userId=${userId}`)
      
      console.log("📡 Response status:", response.status)
      
      if (response.ok) {
        const programs = await response.json()
        console.log("✅ Fetched meal programs:", programs)
        console.log("📊 Number of programs:", programs.length)
        
        if (programs.length > 0) {
          // Use the first program's meals
          const program = programs[0]
          console.log("📋 Program data:", program)
          console.log("🍽️ Program meals:", program.meals)
          console.log("📅 Program weeklySchedule:", program.weeklySchedule)
          
          // Get calorie goal from program if available
          if (program.dailyCalories || program.calorieGoal || program.targetCalories) {
            const goal = Number(program.dailyCalories || program.calorieGoal || program.targetCalories)
            if (goal > 0) {
              setUserCalorieGoal(goal)
              console.log("🎯 Calorie goal set from program:", goal)
            }
          }
          
          // Check if program has weeklySchedule first (new format)
          if (program.weeklySchedule && Object.keys(program.weeklySchedule).length > 0) {
            console.log("✅ Using weeklySchedule format")
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const dayMapping: { [key: string]: string } = {
              'Sunday': 'sunday',
              'Monday': 'monday',
              'Tuesday': 'tuesday',
              'Wednesday': 'wednesday',
              'Thursday': 'thursday',
              'Friday': 'friday',
              'Saturday': 'saturday'
            }
            
            const schedule: DayMeal[] = daysOfWeek.map((day) => {
              const dayKey = dayMapping[day]
              const dayData = program.weeklySchedule[dayKey]
              const dayMeals = (dayData?.meals || []).map((meal: any) => ({
                ...meal,
                calories: Number(meal.calories || 0),
                protein: Number(meal.protein || 0),
                carbs: Number(meal.carbs || 0),
                fat: Number(meal.fat || meal.fats || 0),
                imageUrl: meal.imageUrl,
                ingredients: meal.ingredients ? 
                  (typeof meal.ingredients === 'string' ? 
                    meal.ingredients.split('\n').filter(Boolean) : 
                    meal.ingredients) : 
                  []
              }))
              
              return {
                day,
                meals: dayMeals
              }
            })
            
            setMealSchedule(schedule)
            console.log("✅ Meal schedule loaded from weeklySchedule:", schedule)
          }
          // Fall back to old meals array format
          else if (program.meals && Array.isArray(program.meals) && program.meals.length > 0) {
            console.log("✅ Using meals array format (fallback)")
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const mealsPerDay = Math.ceil(program.meals.length / 7)
            
            const schedule: DayMeal[] = daysOfWeek.map((day, index) => {
              const startIndex = index * mealsPerDay
              const endIndex = startIndex + mealsPerDay
              const dayMeals = program.meals.slice(startIndex, endIndex).map((meal: any) => ({
                ...meal,
                calories: Number(meal.calories || 0),
                protein: Number(meal.protein || 0),
                carbs: Number(meal.carbs || 0),
                fat: Number(meal.fat || meal.fats || 0),
                imageUrl: meal.imageUrl,
                ingredients: meal.ingredients ? 
                  (typeof meal.ingredients === 'string' ? 
                    meal.ingredients.split('\n').filter(Boolean) : 
                    meal.ingredients) : 
                  []
              }))
              
              return {
                day,
                meals: dayMeals
              }
            })
            
            setMealSchedule(schedule)
            console.log("✅ Meal schedule loaded from meals array:", schedule)
          } else {
            console.log("⚠️ Program has no meals or weeklySchedule")
            setMealSchedule(defaultMealSchedule)
          }
        } else {
          console.log("ℹ️ No meal programs assigned to user")
          setMealSchedule(defaultMealSchedule)
        }
      } else {
        console.error("❌ Failed to fetch meal programs")
        setMealSchedule(defaultMealSchedule)
      }
    } catch (error) {
      console.error("❌ Error fetching meal programs:", error)
      setMealSchedule(defaultMealSchedule)
    }
  }

  // Empty meal schedule - will be fetched from database
  const defaultMealSchedule: DayMeal[] = []

  // Get today's meals
  const getTodayMeals = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = days[new Date().getDay()]
    if (mealSchedule.length === 0) return { day: days[new Date().getDay()], meals: [] }
    return mealSchedule.find(d => d.day === today) || mealSchedule[0]
  }

  // Calculate today's stats from program meals (automatic, no click needed)
  const todayStats = (() => {
    const todayMeals = getTodayMeals().meals
    let totalCalories = 0
    let totalProtein = 0
    const mealsCount = todayMeals.length
    
    // Sum all meals for today from the program
    todayMeals.forEach((meal) => {
      totalCalories += Number(meal.calories) || 0
      totalProtein += Number(meal.protein) || 0
    })
    
    const dailyGoalPercent = userCalorieGoal > 0 
      ? Math.min(100, Math.round((totalCalories / userCalorieGoal) * 100))
      : 0
    
    return {
      calories: totalCalories,
      protein: totalProtein,
      mealsCount,
      dailyGoal: dailyGoalPercent
    }
  })()

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
    <AuthGuard requiredRole="user">
    <SubscriptionRequiredGuard>
    <PageTransition>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] bg-clip-text text-transparent mb-2">
          {t("mealsAndNutrition")}
        </h1>
        <p className="text-[#B6C4CF] mb-8">{t("trackDailyMealsDesc")}</p>

        {banners.length > 0 ? (
          <Card 
            className="border-none p-8 mb-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(to right, ${banners[currentBannerIndex].gradientFrom || '#F59E0B'}, ${banners[currentBannerIndex].gradientTo || '#FCD34D'})`,
              transition: 'background 1.5s ease-in-out'
            }}
          >
            <div 
              className="relative z-10"
              key={currentBannerIndex}
              style={{
                animation: 'fadeIn 1.2s ease-in-out'
              }}
            >
              <style jsx>{`
                @keyframes fadeIn {
                  0% {
                    opacity: 0;
                    transform: translateX(50px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
              `}</style>
              <h3 className="text-white text-xl font-bold mb-2">
                {banners[currentBannerIndex].title}
              </h3>
              <p className="text-white/90 text-sm mb-4">
                {banners[currentBannerIndex].description}
              </p>
              {banners[currentBannerIndex].link ? (
                <Button 
                  className="bg-white hover:bg-white/90 font-semibold"
                  style={{ color: banners[currentBannerIndex].gradientFrom || '#F59E0B' }}
                  onClick={() => window.open(banners[currentBannerIndex].link, '_blank')}
                >
                  {banners[currentBannerIndex].buttonText || 'Now'}
                </Button>
              ) : isSuperadmin ? (
                <Button className="bg-white hover:bg-white/90 font-semibold flex items-center gap-2" style={{ color: banners[currentBannerIndex].gradientFrom || '#F59E0B' }}>
                  <Plus className="w-4 h-4" /> Add Meal
                </Button>
              ) : null}
              
              {/* Slideshow Indicators */}
              {banners.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                        index === currentBannerIndex 
                          ? 'w-8 bg-white shadow-lg' 
                          : 'w-2 bg-white/50 hover:bg-white/75 hover:scale-110'
                      }`}
                      aria-label={`Go to banner ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>
        ) : (
          <Card className="bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] border-none p-8 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white text-xl font-bold mb-2">{t("fuelYourBodyRight")}</h3>
              <p className="text-white/90 text-sm mb-4">{t("fuelYourBodyRightDesc")}</p>
              {isSuperadmin && (
                <Button className="bg-white text-[#F59E0B] hover:bg-white/90 font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Meal
                </Button>
              )}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Flame} label={t("caloriesTodayLabel")} value={todayStats.calories.toLocaleString()} color="#F59E0B" />
          <StatsCard icon={Apple} label={t("protein")} value={`${todayStats.protein}g`} color="#FB923C" />
          <StatsCard icon={Utensils} label={t("mealsLogged")} value={todayStats.mealsCount.toString()} color="#FCD34D" />
          <StatsCard icon={Target} label={t("dailyGoal")} value={`${todayStats.dailyGoal}%`} color="#F59E0B" />
        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className={`pb-2 ${isRTL ? 'text-right' : ''}`}>
            <CardTitle className={`text-white text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><CalendarDays className="w-4 h-4 text-amber-400" /> {t("schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              {(["day","week"] as ViewMode[]).map(v => (
                <button
                  key={v}
                  onClick={() => handleViewChange(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-white border-amber-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-amber-500/30"}`}
                >
                  {v === "day" ? t("today") : t("week")}
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
                  
                  if (!todayMeals || todayMeals.meals.length === 0) {
                    return (
                      <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                        <CardContent className="text-center py-16 px-6">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/10 border border-amber-500/20">
                              <Utensils className="w-12 h-12 text-amber-400" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500/20 border-2 border-orange-500/50 flex items-center justify-center">
                              <span className="text-orange-400 text-lg">≡ƒì╜∩╕Å</span>
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-3">
                            {language === 'ku' ? '╪ª█ò┘à┌ò█å ╪«┘ê╪º╪▒╪»┘å ┘å█î█î█ò' : language === 'ar' ? '┘ä╪º ╪¬┘ê╪¼╪» ┘ê╪¼╪¿╪º╪¬ ╪º┘ä┘è┘ê┘à' : 'No Meals Today'}
                          </h3>
                          <p className="text-gray-400 mb-6 text-base max-w-sm mx-auto">
                            {language === 'ku' ? '┘ç█î┌å ╪«┘ê╪º╪▒╪»┘å█Ä┌⌐ ╪¿█å ╪ª█ò┘à┌ò█å ╪»█î╪º╪▒█î ┘å█ò┌⌐╪▒╪º┘ê█ò' : language === 'ar' ? '┘ä┘à ┘è╪¬┘à ╪¬╪¡╪»┘è╪» ┘ê╪¼╪¿╪º╪¬ ┘ä┘ç╪░╪º ╪º┘ä┘è┘ê┘à' : 'No meals scheduled for today'}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                              <Calendar className="w-4 h-4 mr-2" />
                              {language === 'ku' ? '┌ò█å┌ÿ╪º┘å█î ╪¬╪▒ ╪¿╪¿█î┘å█ò' : language === 'ar' ? '╪¬╪¡┘é┘é ┘à┘å ╪º┘ä╪ú┘è╪º┘à ╪º┘ä╪ú╪«╪▒┘ë' : 'Check Other Days'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  }
                  
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
                        <p className="text-[#B6C4CF] text-xs">{mealCount} {t("meals")} ΓÇó {totalCalories} {t("kcal")}</p>
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
                  {(() => {
                    // Get accessible days (Saturday to today)
                    const accessibleDays = getAccessibleDays()
                    
                    // ALWAYS SHOW ALL 7 DAYS
                    const daysOrder = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
                    
                    if (mealSchedule.length === 0) {
                      return (
                        <Card className="border-dashed border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30">
                          <CardContent className="text-center py-20 px-6">
                            <div className="relative inline-block mb-6">
                              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 flex items-center justify-center shadow-2xl shadow-amber-500/20 border border-amber-500/30">
                                <Utensils className="w-14 h-14 text-amber-400" />
                              </div>
                              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">🍽️</span>
                              </div>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                              {language === 'ku' ? 'خشتەی خواردن نییە' : language === 'ar' ? 'لا يوجد جدول وجبات' : 'No Meal Schedule'}
                            </h3>
                            <p className="text-gray-400 mb-2 text-lg max-w-md mx-auto">
                              {language === 'ku' ? 'مەشقگەرەکەت خشتەی خواردنت بۆ دیاری دەکات' : language === 'ar' ? 'سيقوم مدربك بتعيين جدول الوجبات لك' : 'Your trainer will assign a meal schedule to you'}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    }
                    
                    return daysOrder.map((dayName, i) => {
                      // Find this day's meals
                      const dayMeal = mealSchedule.find(d => d.day === dayName)
                      
                      // Check if this day is accessible (Saturday to today)
                      const isAccessible = accessibleDays.includes(dayName)
                      
                      const mealCount = dayMeal?.meals?.length || 0
                      const totalCalories = dayMeal?.meals?.reduce((sum, m) => sum + Number(m.calories || 0), 0) || 0
                      
                      // Check if it's a rest day (no meals assigned)
                      const isRestDay = !dayMeal || mealCount === 0
                      
                      return (
                        <div
                          key={i}
                          onClick={() => isAccessible && dayMeal && !isRestDay && setSelectedDay(dayName)}
                          className={`w-full grid items-center gap-0 p-4 rounded-lg border transition-all duration-300 ${
                            isAccessible && dayMeal && !isRestDay
                              ? 'bg-[#0E151B] border-[#2E3944] hover:border-amber-500/50 cursor-pointer group'
                              : 'bg-[#0E151B]/30 border-[#2E3944]/30 cursor-not-allowed opacity-50'
                          } ${isRTL ? 'grid-cols-[80px_1fr_auto]' : 'grid-cols-[80px_1fr_auto]'}`}
                        >
                          {/* Right column: Play button + calories */}
                          <div className={`flex items-center gap-2 justify-end ${isRTL ? 'order-3' : 'order-3'}`}>
                            {isAccessible && dayMeal && !isRestDay ? (
                              <>
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                                  <Play className={`w-4 h-4 text-amber-400 ${isRTL ? 'rotate-180' : ''}`} />
                                </div>
                                <div className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs whitespace-nowrap">
                                  {totalCalories} cal
                                </div>
                              </>
                            ) : !isAccessible ? (
                              <div className="px-2 py-1 rounded-full bg-slate-700/30 text-slate-500 text-xs">
                                🔒
                              </div>
                            ) : null}
                          </div>
                          
                          {/* Center: Text content */}
                          <div className={`order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <p className={`font-semibold text-sm flex items-center gap-2 ${
                              isAccessible ? 'text-white' : 'text-gray-500'
                            } ${isRTL ? 'flex-row-reverse' : ''}`}>
                              {t(dayName.toLowerCase() as any)}
                              {isRestDay && isAccessible && (
                                <span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 text-[10px] font-medium">
                                  {language === 'ku' ? 'پشوو' : language === 'ar' ? 'راحة' : language === 'tr' ? 'Dinlenme' : 'Rest'}
                                </span>
                              )}
                            </p>
                            <p className={`text-xs ${isAccessible ? 'text-[#B6C4CF]' : 'text-gray-600'}`}>
                              {!isAccessible 
                                ? (language === 'ku' ? 'قوڵفکراو' : language === 'ar' ? 'مقفل' : language === 'tr' ? 'Kilitli' : 'Locked')
                                : isRestDay
                                  ? (language === 'ku' ? 'خواردن دیاری نەکراوە' : language === 'ar' ? 'لا وجبات محددة' : language === 'tr' ? 'Öğün belirlenmedi' : 'No meals assigned')
                                  : `${mealCount} ${t("meals")} • ${totalCalories} ${t("kcal")}`
                              }
                            </p>
                          </div>
                          
                          {/* Left column: Icon */}
                          <div className={`flex ${isRTL ? 'justify-end order-1' : 'justify-start order-1'}`}>
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              !isAccessible 
                                ? 'bg-slate-800/30' 
                                : isRestDay 
                                  ? 'bg-slate-800/50' 
                                  : 'bg-gradient-to-br from-amber-600 to-amber-500'
                            }`}>
                              {!isAccessible ? (
                                <Calendar className="w-5 h-5 text-gray-600" />
                              ) : isRestDay ? (
                                <Calendar className="w-5 h-5 text-slate-400" />
                              ) : (
                                <Utensils className="w-5 h-5 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  })()}
                </div>
              )}
            </div>
          </CardContent>
          </Card>
        </section>
        </div>

      {/* Day Meals Dialog */}
      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-[96vw] sm:max-w-2xl max-h-[90vh]">
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
                    key={`${selectedDay}-meal-${idx}`}
                    className="bg-slate-900/70 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer"
                    onClick={() => handleMealClick(meal)}
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
                            {meal.mealType && (
                              <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                {t(meal.mealType.toLowerCase() as any)}
                              </div>
                            )}
                            {meal.category && !meal.mealType && (
                              <div className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm">
                                {meal.category}
                              </div>
                            )}
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
        <DialogContent className="bg-slate-950 border-slate-800 text-white max-w-[96vw] sm:max-w-3xl max-h-[90vh]">
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
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-400" />
                        {t("mealImage")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedMeal.imageUrl.split(',').map((url: string, idx: number) => (
                          <div 
                            key={idx} 
                            className="relative group cursor-pointer"
                            onClick={() => {
                              setSelectedImageIndex(idx)
                              setShowImageOverlay(true)
                            }}
                          >
                            <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-700 hover:border-amber-500/50 transition-all">
                              <img 
                                src={url.trim()} 
                                alt={`${selectedMeal.name} - view ${idx + 1} of ${selectedMeal.imageUrl.split(',').length}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center">
                                      <div class="text-center">
                                        <svg class="w-12 h-12 text-slate-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p class="text-slate-500 text-xs">Image not available</p>
                                      </div>
                                    </div>
                                  `;
                                }}
                              />
                            </div>
                            {selectedMeal.imageUrl.split(',').length > 1 && (
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                {idx + 1}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full">
                                🔍 {language === 'ku' ? 'کلیک بکە بۆ بینین' : language === 'ar' ? 'انقر للعرض' : 'Click to view'}
                              </div>
                            </div>
                          </div>
                        ))}
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
                        ≡ƒô¥ {t("recipeInstructions")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white">{selectedMeal.recipe}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Meal Type */}
                {(selectedMeal.mealType || selectedMeal.category) && (
                  <Card className="bg-amber-500/10 border-amber-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">{t("mealType")}</span>
                        <span className="text-amber-400 font-semibold">
                          {selectedMeal.mealType ? t(selectedMeal.mealType.toLowerCase() as any) : selectedMeal.category}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Image Overlay Dialog */}
      <Dialog open={showImageOverlay} onOpenChange={setShowImageOverlay}>
        <DialogContent className="max-w-[98vw] sm:max-w-7xl max-h-[95vh] bg-black/95 border-amber-500/30 p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedMeal?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[95vh]">
            {selectedMeal?.imageUrl && (
              <>
                {/* Background Image with Blur */}
                <div 
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30"
                  style={{ 
                    backgroundImage: `url(${selectedMeal.imageUrl.split(',')[selectedImageIndex]?.trim()})` 
                  }}
                />
                
                {/* Main Content */}
                <div className="relative z-10 h-full flex flex-col md:flex-row">
                  {/* Left: Image */}
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="relative max-w-4xl w-full">
                      <img 
                        src={selectedMeal.imageUrl.split(',')[selectedImageIndex]?.trim()} 
                        alt={`${selectedMeal.name} - detailed view (${selectedImageIndex + 1} of ${selectedMeal.imageUrl.split(',').length})`}
                        className="w-full h-auto rounded-2xl shadow-2xl border-4 border-amber-500/30"
                      />
                      {/* Image Navigation */}
                      {selectedMeal.imageUrl.split(',').length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                          {selectedMeal.imageUrl.split(',').map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImageIndex(idx)}
                              className={`w-3 h-3 rounded-full transition-all ${
                                idx === selectedImageIndex 
                                  ? 'bg-amber-500 w-8' 
                                  : 'bg-white/30 hover:bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Meal Info Overlay */}
                  <div className="w-full md:w-96 bg-gradient-to-b from-slate-900/95 to-black/95 backdrop-blur-xl p-6 overflow-y-auto border-l border-amber-500/20">
                    <ScrollArea className="h-full">
                      <div className="space-y-4">
                        {/* Header */}
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">{selectedMeal.name}</h2>
                          {(selectedMeal.mealType || selectedMeal.category) && (
                            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm">
                              {selectedMeal.mealType ? t(selectedMeal.mealType.toLowerCase() as any) : selectedMeal.category}
                            </div>
                          )}
                        </div>

                        {/* Nutrition Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                            <div className="text-red-400 text-xs uppercase mb-1">🔥 {t("calories")}</div>
                            <div className="text-white text-2xl font-bold">{selectedMeal.calories}</div>
                          </div>
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <div className="text-blue-400 text-xs uppercase mb-1">💪 {t("protein")}</div>
                            <div className="text-white text-2xl font-bold">{selectedMeal.protein}g</div>
                          </div>
                          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                            <div className="text-green-400 text-xs uppercase mb-1">🌾 {t("carbs")}</div>
                            <div className="text-white text-2xl font-bold">{selectedMeal.carbs}g</div>
                          </div>
                          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                            <div className="text-yellow-400 text-xs uppercase mb-1">🧈 {t("fat")}</div>
                            <div className="text-white text-2xl font-bold">{selectedMeal.fat || selectedMeal.fats}g</div>
                          </div>
                        </div>

                        {/* Ingredients */}
                        {selectedMeal.ingredients && (
                          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                              <Utensils className="w-4 h-4 text-amber-400" />
                              {t("ingredients")}
                            </h3>
                            <ul className="space-y-2">
                              {(typeof selectedMeal.ingredients === 'string' 
                                ? selectedMeal.ingredients.split(',') 
                                : selectedMeal.ingredients
                              ).map((ing: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                                  <span className="text-amber-400 mt-1">•</span>
                                  {ing.trim()}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Recipe/Instructions */}
                        {(selectedMeal.recipe || selectedMeal.instructions) && (
                          <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                            <h3 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                              📝 {t("recipeInstructions")}
                            </h3>
                            <p className="text-white text-sm leading-relaxed">
                              {selectedMeal.recipe || selectedMeal.instructions}
                            </p>
                          </div>
                        )}

                        {/* Notes */}
                        {selectedMeal.notes && (
                          <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                            <h3 className="text-purple-400 font-semibold mb-2">📌 {t("notes")}</h3>
                            <p className="text-white text-sm">{selectedMeal.notes}</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowImageOverlay(false)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all"
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
    </PageTransition>
      <BottomNav activeTab="meals" />
    </SubscriptionRequiredGuard>
    </AuthGuard>
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
