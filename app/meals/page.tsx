"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth-guard"
  // Get today's meals
  const getTodayMeals = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = days[new Date().getDay()]
    if (mealSchedule.length === 0) return { day: days[new Date().getDay()], meals: [] }  const handleSubmitDay = () => {
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
    <AuthGuard requiredRole="user">        </div>

      <section className="space-y-4">
        {/* Schedule selector */}
        <Card className="bg-[#101A23] border-[#2E3944]">
          <CardHeader className={`pb-2 ${isRTL ? 'text-right' : ''}`}>
            <CardTitle className={`text-white text-sm flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}><CalendarDays className="w-4 h-4 text-amber-400" /> {t("schedule")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              {(["day","week"] as ViewMode[]).map(v => (                <button
                  key={v}
                  onClick={() => handleViewChange(v)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${view===v?"bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-white border-amber-500":"bg-[#0E151B] text-slate-300 border-[#2E3944] hover:border-amber-500/30"}`}
                >
                  {v === "day" ? t("today") : t("week")}                </button>
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
                )}              </div>
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
