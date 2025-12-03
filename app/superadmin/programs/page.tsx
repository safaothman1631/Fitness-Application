"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Utensils, Dumbbell, Plus, Search, Clock, Flame, 
  Star, Edit, Trash2, X, Save, Apple, Pizza, Coffee,
  Award, Zap, Heart, TrendingUp, Target, Activity,
  Calendar, Lightbulb, Users, UserPlus, Check, Video, Play
} from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"

export default function ProgramsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'nutrition' | 'workout'>('nutrition')
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [programs, setPrograms] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [userSearchQuery, setUserSearchQuery] = useState("")
  const [isExerciseDialogOpen, setIsExerciseDialogOpen] = useState(false)
  const [exerciseFormData, setExerciseFormData] = useState({ 
    name: '', 
    sets: '', 
    reps: '', 
    notes: '', 
    videoUrls: [] as string[], 
    videos: [] as Array<{ name: string; url: string; sets: string; reps: string; notes: string }> 
  })
  const [showVideoDetailDialog, setShowVideoDetailDialog] = useState(false)
  const [currentVideoForDetail, setCurrentVideoForDetail] = useState<{ name: string; url: string } | null>(null)
  const [currentEditingDay, setCurrentEditingDay] = useState('')
  
  // Meal Dialog States
  const [isMealDialogOpen, setIsMealDialogOpen] = useState(false)
  const [mealFormData, setMealFormData] = useState({
    name: '',
    category: 'breakfast', // breakfast, lunch, dinner, snack
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    ingredients: '',
    instructions: '',
    notes: '',
    imageUrl: ''
  })
  const [showMealLibrary, setShowMealLibrary] = useState(false)
  const [mealLibrary, setMealLibrary] = useState<any[]>([])
  const [mealSearchQuery, setMealSearchQuery] = useState('')
  const [showCopyMealsDialog, setShowCopyMealsDialog] = useState(false)
  const [sourceDayForCopy, setSourceDayForCopy] = useState('')
  
  // Exercise Library States
  const [showExerciseLibrary, setShowExerciseLibrary] = useState(false)
  const [exerciseLibrary, setExerciseLibrary] = useState<any[]>([])
  const [exerciseSearchQuery, setExerciseSearchQuery] = useState('')
  const [showCopyExercisesDialog, setShowCopyExercisesDialog] = useState(false)
  const [sourceDayForExerciseCopy, setSourceDayForExerciseCopy] = useState('')
  
  const [videoPage, setVideoPage] = useState(1)
  const videosPerPage = 6
  const [videoFilters, setVideoFilters] = useState({
    gender: 'all', // all, male, female
    level: 'all',  // all, beginner, intermediate, advanced
    bodyPart: 'all' // all, chest, back, legs, shoulders, arms, core
  })
  const [availableVideos, setAvailableVideos] = useState<any[]>([])
  const [showVideoBrowser, setShowVideoBrowser] = useState(false)
  const [videoSearchQuery, setVideoSearchQuery] = useState('')
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  
  // Meal Images States
  const [availableMealImages, setAvailableMealImages] = useState<any[]>([])
  const [showMealImageBrowser, setShowMealImageBrowser] = useState(false)
  const [mealImageSearchQuery, setMealImageSearchQuery] = useState('')
  const [isLoadingMealImages, setIsLoadingMealImages] = useState(false)
  const [mealImagePage, setMealImagePage] = useState(1)
  const mealImagesPerPage = 12
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [savedProgramData, setSavedProgramData] = useState<any>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [programToDelete, setProgramToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteSuccessDialog, setShowDeleteSuccessDialog] = useState(false)
  const [deletedProgramData, setDeletedProgramData] = useState<any>(null)
  
  const [newProgram, setNewProgram] = useState<any>({
    title: "",
    description: "",
    type: activeTab,
    duration: "",
    difficulty: "beginner",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    targetMuscles: "",
    imageUrl: "",
    weeklySchedule: {
      monday: { exercises: [], meals: [], rest: false },
      tuesday: { exercises: [], meals: [], rest: false },
      wednesday: { exercises: [], meals: [], rest: false },
      thursday: { exercises: [], meals: [], rest: false },
      friday: { exercises: [], meals: [], rest: false },
      saturday: { exercises: [], meals: [], rest: false },
      sunday: { exercises: [], meals: [], rest: false }
    }
  })

  const [currentDay, setCurrentDay] = useState('monday')

  useEffect(() => {
    fetchPrograms()
    fetchUsers()
    fetchVideos()
    fetchMealImages()
  }, [activeTab])

  const fetchVideos = async () => {
    setIsLoadingVideos(true)
    try {
      // Check cache first
      const cached = sessionStorage.getItem('exerciseVideos')
      const cacheTime = sessionStorage.getItem('exerciseVideosTime')
      const now = Date.now()
      
      // Use cache if less than 5 minutes old
      if (cached && cacheTime && (now - parseInt(cacheTime)) < 5 * 60 * 1000) {
        setAvailableVideos(JSON.parse(cached))
        console.log('✅ Loaded videos from cache')
        setIsLoadingVideos(false)
        return
      }

      const response = await fetch('/api/videos')
      if (response.ok) {
        const data = await response.json()
        setAvailableVideos(data)
        // Cache the results
        sessionStorage.setItem('exerciseVideos', JSON.stringify(data))
        sessionStorage.setItem('exerciseVideosTime', now.toString())
        console.log('✅ Loaded', data.length, 'videos from storage')
      }
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setIsLoadingVideos(false)
    }
  }

  const fetchMealImages = async () => {
    setIsLoadingMealImages(true)
    try {
      // Check cache first
      const cached = sessionStorage.getItem('mealImages')
      const cacheTime = sessionStorage.getItem('mealImagesTime')
      const now = Date.now()
      
      // Use cache if less than 5 minutes old
      if (cached && cacheTime && (now - parseInt(cacheTime)) < 5 * 60 * 1000) {
        setAvailableMealImages(JSON.parse(cached))
        console.log('✅ Loaded meal images from cache')
        setIsLoadingMealImages(false)
        return
      }

      const response = await fetch('/api/meal-images')
      if (response.ok) {
        const data = await response.json()
        setAvailableMealImages(data)
        // Cache the results
        sessionStorage.setItem('mealImages', JSON.stringify(data))
        sessionStorage.setItem('mealImagesTime', now.toString())
        console.log('✅ Loaded', data.length, 'meal images from storage')
      }
    } catch (error) {
      console.error('Error loading meal images:', error)
    } finally {
      setIsLoadingMealImages(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (response.ok) {
        const data = await response.json()
        console.log('🔍 All users from API:', data)
        console.log('📊 Total users:', data.length)
        
        // Show only PRO users (not free, not admin roles)
        const filteredUsers = data.filter((user: any) => {
          const role = user.role || 'user'
          const membership = (user.membership || 'Free').toLowerCase()
          const subStatus = (user.subscriptionStatus || 'inactive').toLowerCase()
          
          // Exclude admin roles
          const isAdminRole = role === 'admin' || role === 'superadmin' || role === 'physiotherapist' || role === 'trainer'
          
          // Check if PRO (membership is Pro/Premium OR subscriptionStatus is active)
          const isPro = membership === 'pro' || membership === 'premium' || subStatus === 'active'
          
          console.log(`👤 ${user.email || user.name}: role="${role}" membership="${user.membership}" status="${user.subscriptionStatus}" -> ${!isAdminRole && isPro ? '✅ SHOW' : '❌ HIDE'}`)
          return !isAdminRole && isPro
        })
        
        console.log('✅ Filtered PRO users:', filteredUsers.length)
        setUsers(filteredUsers)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchPrograms = async () => {
    setIsLoading(true)
    try {
      console.log(`🔍 Fetching ${activeTab} programs from database...`)
      const response = await fetch(`/api/programs?type=${activeTab}`)
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Loaded ${data.length} ${activeTab} programs from Firestore:`, data)
        setPrograms(data)
      } else {
        console.error('❌ Failed to fetch programs:', response.status)
        setPrograms([])
      }
    } catch (error) {
      console.error('❌ Error fetching programs:', error)
      setPrograms([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProgram = async () => {
    try {
      setIsSaving(true)
      console.log('💾 Saving program...', {
        title: newProgram.title,
        type: activeTab,
        weeklySchedule: newProgram.weeklySchedule,
        assignedUsers: selectedUsers
      })

      const url = newProgram.id ? `/api/programs?id=${newProgram.id}` : '/api/programs'
      const response = await fetch(url, {
        method: newProgram.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...newProgram, 
          type: activeTab,
          assignedUsers: selectedUsers 
        })
      })
      
      console.log('📡 Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('✅ Program saved successfully:', result)
        
        // Calculate stats
        const totalExercises = Object.values(newProgram.weeklySchedule || {}).reduce(
          (sum: number, day: any) => sum + (day.exercises?.length || 0), 0
        )
        const activeDays = Object.values(newProgram.weeklySchedule || {}).filter(
          (day: any) => day.exercises?.length > 0
        ).length
        
        setSavedProgramData({
          ...result,
          totalExercises,
          activeDays,
          assignedUsersCount: selectedUsers.length
        })
        
        setIsDialogOpen(false)
        setShowSuccessDialog(true)
        
        // Auto-close success dialog after 3 seconds
        setTimeout(() => {
          setShowSuccessDialog(false)
          fetchPrograms()
          resetForm()
        }, 3500)
      } else {
        const error = await response.json()
        console.error('❌ Save failed:', error)
        alert('❌ هەڵە: ' + (error.error || 'Failed to save'))
      }
    } catch (error) {
      console.error('❌ Error saving program:', error)
      alert('❌ هەڵە لە پاشەکەوتکردن: ' + error)
    } finally {
      setIsSaving(false)
    }
  }

  const openDeleteDialog = (program: any) => {
    setProgramToDelete(program)
    setShowDeleteDialog(true)
  }

  const handleDeleteProgram = async () => {
    if (!programToDelete) return
    
    try {
      setIsDeleting(true)
      console.log('🗑️ Deleting program:', programToDelete.id)
      
      const response = await fetch(`/api/programs?id=${programToDelete.id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        console.log('✅ Program deleted successfully')
        
        // Save deleted program data for success dialog
        setDeletedProgramData(programToDelete)
        
        setShowDeleteDialog(false)
        setProgramToDelete(null)
        setShowDeleteSuccessDialog(true)
        
        // Auto-close success dialog after 3 seconds
        setTimeout(() => {
          setShowDeleteSuccessDialog(false)
          setDeletedProgramData(null)
          fetchPrograms()
        }, 3000)
      } else {
        console.error('❌ Delete failed')
        alert('❌ هەڵە لە سڕینەوە')
      }
    } catch (error) {
      console.error('❌ Error deleting program:', error)
      alert('❌ هەڵە لە سڕینەوە: ' + error)
    } finally {
      setIsDeleting(false)
    }
  }

  const resetForm = () => {
    setNewProgram({
      title: "",
      description: "",
      type: activeTab,
      duration: "",
      difficulty: "beginner",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
      targetMuscles: "",
      imageUrl: "",
      weeklySchedule: {
        monday: { exercises: [], meals: [], rest: false },
        tuesday: { exercises: [], meals: [], rest: false },
        wednesday: { exercises: [], meals: [], rest: false },
        thursday: { exercises: [], meals: [], rest: false },
        friday: { exercises: [], meals: [], rest: false },
        saturday: { exercises: [], meals: [], rest: false },
        sunday: { exercises: [], meals: [], rest: false }
      }
    })
    setCurrentDay('monday')
    setSelectedUsers([])
    setUserSearchQuery("")
  }

  const handleAddMeal = () => {
    setIsMealDialogOpen(true)
    setCurrentEditingDay(currentDay)
  }

  const handleSaveMeal = () => {
    if (!mealFormData.name.trim()) {
      alert('تکایە ناوی خواردن بنووسە')
      return
    }
    if (!mealFormData.calories.trim()) {
      alert('تکایە کالۆری بنووسە')
      return
    }

    const updatedSchedule = { ...newProgram.weeklySchedule }
    const currentDaySchedule = updatedSchedule[currentEditingDay]
    
    if (!currentDaySchedule.meals) {
      currentDaySchedule.meals = []
    }
    
    currentDaySchedule.meals.push({
      id: Date.now().toString(),
      ...mealFormData
    })

    setNewProgram({
      ...newProgram,
      weeklySchedule: updatedSchedule
    })

    // Reset meal form
    setMealFormData({
      name: '',
      category: 'breakfast',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      ingredients: '',
      instructions: '',
      notes: '',
      imageUrl: ''
    })
    
    setIsMealDialogOpen(false)
  }

  const handleRemoveMeal = (day: string, mealId: string) => {
    const updatedSchedule = { ...newProgram.weeklySchedule }
    updatedSchedule[day].meals = updatedSchedule[day].meals.filter((m: any) => m.id !== mealId)
    
    setNewProgram({
      ...newProgram,
      weeklySchedule: updatedSchedule
    })
  }

  const handleSaveMealToLibrary = () => {
    if (!mealFormData.name.trim() || !mealFormData.calories.trim()) {
      alert('تکایە ناو و کالۆری پڕبکەرەوە')
      return
    }

    const newMeal = {
      id: Date.now().toString(),
      ...mealFormData,
      savedAt: new Date().toISOString()
    }

    setMealLibrary([...mealLibrary, newMeal])
    alert('✅ خواردنەکە خەزێنکرا بۆ کتێبخانە!')
  }

  const handleSelectMealFromLibrary = (meal: any) => {
    setMealFormData({
      name: meal.name,
      category: meal.category,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      ingredients: meal.ingredients,
      instructions: meal.instructions,
      notes: meal.notes,
      imageUrl: meal.imageUrl
    })
    setShowMealLibrary(false)
  }

  const handleDeleteMealFromLibrary = (mealId: string) => {
    setMealLibrary(mealLibrary.filter(m => m.id !== mealId))
  }

  const handleCopyMealsToDay = (targetDay: string) => {
    if (!sourceDayForCopy) return

    const sourceMeals = newProgram.weeklySchedule[sourceDayForCopy]?.meals || []
    
    if (sourceMeals.length === 0) {
      alert('رۆژی سەرچاوە خواردنی تێدا نییە!')
      return
    }

    const copiedMeals = sourceMeals.map((meal: any) => ({
      ...meal,
      id: Date.now().toString() + Math.random() // Generate unique IDs
    }))

    const updatedSchedule = { ...newProgram.weeklySchedule }
    updatedSchedule[targetDay].meals = [
      ...(updatedSchedule[targetDay].meals || []),
      ...copiedMeals
    ]

    setNewProgram({
      ...newProgram,
      weeklySchedule: updatedSchedule
    })

    setShowCopyMealsDialog(false)
    setSourceDayForCopy('')
    alert(`✅ ${copiedMeals.length} خواردن کۆپی کرا!`)
  }

  const getAllUniqueMeals = () => {
    const allMeals: any[] = []
    const seenNames = new Set()

    Object.keys(newProgram.weeklySchedule || {}).forEach(day => {
      const dayMeals = newProgram.weeklySchedule[day]?.meals || []
      dayMeals.forEach((meal: any) => {
        if (!seenNames.has(meal.name)) {
          seenNames.add(meal.name)
          allMeals.push({ ...meal, day })
        }
      })
    })

    return allMeals
  }

  // Exercise Library Functions
  const handleSaveExerciseToLibrary = () => {
    if (!exerciseFormData.name.trim()) {
      alert('تکایە ناوی یاری بنووسە')
      return
    }

    const newExercise = {
      id: Date.now().toString(),
      ...exerciseFormData,
      savedAt: new Date().toISOString()
    }

    setExerciseLibrary([...exerciseLibrary, newExercise])
    alert('✅ یارییەکە خەزێنکرا بۆ کتێبخانە!')
  }

  const handleSelectExerciseFromLibrary = (exercise: any) => {
    setExerciseFormData({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      notes: exercise.notes,
      videoUrls: exercise.videoUrls || [],
      videos: exercise.videos || []
    })
    setShowExerciseLibrary(false)
  }

  const handleDeleteExerciseFromLibrary = (exerciseId: string) => {
    setExerciseLibrary(exerciseLibrary.filter(e => e.id !== exerciseId))
  }

  const handleCopyExercisesToDay = (targetDay: string) => {
    if (!sourceDayForExerciseCopy) return

    const sourceExercises = newProgram.weeklySchedule[sourceDayForExerciseCopy]?.exercises || []
    
    if (sourceExercises.length === 0) {
      alert('رۆژی سەرچاوە یاری تێدا نییە!')
      return
    }

    const copiedExercises = sourceExercises.map((exercise: any) => ({
      ...exercise,
      id: Date.now().toString() + Math.random()
    }))

    const updatedSchedule = { ...newProgram.weeklySchedule }
    updatedSchedule[targetDay].exercises = [
      ...(updatedSchedule[targetDay].exercises || []),
      ...copiedExercises
    ]

    setNewProgram({
      ...newProgram,
      weeklySchedule: updatedSchedule
    })

    setShowCopyExercisesDialog(false)
    setSourceDayForExerciseCopy('')
    alert(`✅ ${copiedExercises.length} یاری کۆپی کرا!`)
  }

  const getAllUniqueExercises = () => {
    const allExercises: any[] = []
    const seenNames = new Set()

    Object.keys(newProgram.weeklySchedule || {}).forEach(day => {
      const dayExercises = newProgram.weeklySchedule[day]?.exercises || []
      dayExercises.forEach((exercise: any) => {
        if (!seenNames.has(exercise.name)) {
          seenNames.add(exercise.name)
          allExercises.push({ ...exercise, day })
        }
      })
    })

    return allExercises
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const selectAllUsers = () => {
    const filteredUserIds = filteredUsers.map(u => u.id)
    setSelectedUsers(filteredUserIds)
  }

  const clearUserSelection = () => {
    setSelectedUsers([])
  }

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(userSearchQuery.toLowerCase())
  )

  const addExerciseToDay = (day: string) => {
    setCurrentEditingDay(day)
    setExerciseFormData({ name: '', sets: '', reps: '', notes: '', videoUrls: [], videos: [] })
    setCurrentVideoForDetail(null)
    setIsExerciseDialogOpen(true)
  }

  const handleSaveExercise = () => {
    if (!exerciseFormData.name) {
      alert('تکایە ناوی یارییەکە بنووسە!')
      return
    }

    if (exerciseFormData.videos.length === 0) {
      alert('تکایە لانیکەم یەک ڤیدیۆ هەڵبژێرە!')
      return
    }

    setNewProgram({
      ...newProgram,
      weeklySchedule: {
        ...newProgram.weeklySchedule,
        [currentEditingDay]: {
          ...newProgram.weeklySchedule[currentEditingDay],
          exercises: [
            ...newProgram.weeklySchedule[currentEditingDay].exercises,
            {
              name: exerciseFormData.name,
              notes: exerciseFormData.notes,
              videoUrls: exerciseFormData.videoUrls,
              videos: exerciseFormData.videos
            }
          ]
        }
      }
    })

    setIsExerciseDialogOpen(false)
    setExerciseFormData({ name: '', sets: '', reps: '', notes: '', videoUrls: [], videos: [] })
    setCurrentVideoForDetail(null)
  }

  const removeExerciseFromDay = (day: string, index: number) => {
    setNewProgram({
      ...newProgram,
      weeklySchedule: {
        ...newProgram.weeklySchedule,
        [day]: {
          ...newProgram.weeklySchedule[day],
          exercises: newProgram.weeklySchedule[day].exercises.filter((_: any, i: number) => i !== index)
        }
      }
    })
  }

  const toggleRestDay = (day: string) => {
    setNewProgram({
      ...newProgram,
      weeklySchedule: {
        ...newProgram.weeklySchedule,
        [day]: {
          ...newProgram.weeklySchedule[day],
          rest: !newProgram.weeklySchedule[day].rest,
          exercises: !newProgram.weeklySchedule[day].rest ? [] : newProgram.weeklySchedule[day].exercises,
          meals: !newProgram.weeklySchedule[day].rest ? [] : newProgram.weeklySchedule[day].meals || []
        }
      }
    })
  }

  const filteredPrograms = programs.filter(program => 
    program.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const dayNames = {
    monday: t('monday'),
    tuesday: t('tuesday'),
    wednesday: t('wednesday'),
    thursday: t('thursday'),
    friday: t('friday'),
    saturday: t('saturday'),
    sunday: t('sunday')
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-8">
          {/* Tab Switcher */}
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 ${
                activeTab === 'nutrition'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/50 scale-110'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Utensils className="w-6 h-6 inline mr-2" />
              {t("nutritionPrograms")}
            </button>
            <button
              onClick={() => setActiveTab('workout')}
              className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500 ${
                activeTab === 'workout'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-2xl shadow-blue-500/50 scale-110'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Dumbbell className="w-6 h-6 inline mr-2" />
              {t("workoutPrograms")}
            </button>
          </div>

          {/* ==================== NUTRITION SECTION ==================== */}
          {activeTab === 'nutrition' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Nutrition Header */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-green-600/5 border-2 border-green-500/50 p-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/40 to-emerald-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/30 to-green-600/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/50 rotate-3 hover:rotate-0 transition-transform">
                      <Utensils className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                          {t("nutritionPrograms")}
                        </span>
                      </h1>
                      <p className="text-gray-400 text-lg">{t("createAndManagePrograms")}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl shadow-green-500/30 px-8 py-6 text-lg rounded-2xl"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    {t("createNewProgram")}
                  </Button>
                </div>
              </div>

              {/* Nutrition Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-green-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-green-500/30 flex items-center justify-center">
                        <Apple className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">{programs.length}</p>
                        <p className="text-sm text-gray-400">Total Plans</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/20 to-amber-600/10 border-orange-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-orange-500/30 flex items-center justify-center">
                        <Pizza className="w-8 h-8 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">48</p>
                        <p className="text-sm text-gray-400">{t("meals")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/10 border-purple-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/30 flex items-center justify-center">
                        <Coffee className="w-8 h-8 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">156</p>
                        <p className="text-sm text-gray-400">Recipes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-600/10 border-yellow-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-yellow-500/30 flex items-center justify-center">
                        <Flame className="w-8 h-8 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">2.4K</p>
                        <p className="text-sm text-gray-400">Avg Calories</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Bar - Nutrition */}
              <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border-green-500/30">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    <Input
                      placeholder={t("searchPrograms")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Nutrition Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">{t("loading")}...</p>
                  </div>
                ) : filteredPrograms.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Utensils className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">{t("noProgramsFound")}</p>
                    <p className="text-gray-500 text-sm">{t("createFirstProgram")}</p>
                  </div>
                ) : (
                  filteredPrograms.map((program) => (
                    <Card 
                      key={program.id} 
                      className="relative overflow-hidden bg-gradient-to-br from-green-500/10 via-slate-900/80 to-slate-800/40 border-green-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
                      
                      <CardHeader className="relative z-10">
                        <CardTitle className="text-white flex items-center justify-between">
                          <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            {program.title}
                          </span>
                          <Utensils className="w-5 h-5 text-green-400" />
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10 space-y-4">
                        <p className="text-gray-400 text-sm line-clamp-2">{program.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {program.duration && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {program.duration}
                            </span>
                          )}
                          {program.calories && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                              <Flame className="w-3 h-3 inline mr-1" />
                              {program.calories} cal
                            </span>
                          )}
                          {program.difficulty && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              program.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              program.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              <Star className="w-3 h-3 inline mr-1" />
                              {program.difficulty}
                            </span>
                          )}
                        </div>

                        {(program.protein || program.carbs || program.fats) && (
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/50">
                            {program.protein && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Protein</p>
                                <p className="text-sm font-bold text-green-400">{program.protein}g</p>
                              </div>
                            )}
                            {program.carbs && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Carbs</p>
                                <p className="text-sm font-bold text-yellow-400">{program.carbs}g</p>
                              </div>
                            )}
                            {program.fats && (
                              <div className="text-center">
                                <p className="text-xs text-gray-500">Fats</p>
                                <p className="text-sm font-bold text-orange-400">{program.fats}g</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setNewProgram(program)
                              setIsDialogOpen(true)
                            }}
                            className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 hover:border-green-500/50 hover:text-green-400 transition-all"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDeleteDialog(program)}
                            className="border-red-700/50 text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ==================== WORKOUT SECTION ==================== */}
          {activeTab === 'workout' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Workout Header */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/5 border-2 border-blue-500/50 p-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/40 to-cyan-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/30 to-blue-600/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl shadow-blue-500/50 rotate-3 hover:rotate-0 transition-transform">
                      <Dumbbell className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          {t("workoutPrograms")}
                        </span>
                      </h1>
                      <p className="text-gray-400 text-lg">{t("createAndManagePrograms")}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/30 px-8 py-6 text-lg rounded-2xl"
                  >
                    <Plus className="w-6 h-6 mr-2" />
                    {t("createNewProgram")}
                  </Button>
                </div>
              </div>

              {/* Workout Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border-blue-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-blue-500/30 flex items-center justify-center">
                        <Award className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">{programs.length}</p>
                        <p className="text-sm text-gray-400">{t("workoutPrograms")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-cyan-500/20 to-teal-600/10 border-cyan-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/30 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">234</p>
                        <p className="text-sm text-gray-400">Exercises</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-500/20 to-rose-600/10 border-pink-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-pink-500/30 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">128</p>
                        <p className="text-sm text-gray-400">Video Guides</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/20 to-violet-600/10 border-purple-500/40 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/30 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-white">856</p>
                        <p className="text-sm text-gray-400">Active Users</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search Bar - Workout */}
              <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                    <Input
                      placeholder={t("searchPrograms")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Workout Programs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400">{t("loading")}...</p>
                  </div>
                ) : filteredPrograms.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Dumbbell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-2">{t("noProgramsFound")}</p>
                    <p className="text-gray-500 text-sm">{t("createFirstProgram")}</p>
                  </div>
                ) : (
                  filteredPrograms.map((program) => (
                    <Card 
                      key={program.id} 
                      className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-800/40 border-blue-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                      
                      <CardHeader className="relative z-10">
                        <CardTitle className="text-white flex items-center justify-between">
                          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {program.title}
                          </span>
                          <Dumbbell className="w-5 h-5 text-blue-400" />
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="relative z-10 space-y-4">
                        <p className="text-gray-400 text-sm line-clamp-2">{program.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {program.duration && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {program.duration}
                            </span>
                          )}
                          {program.targetMuscles && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                              <Target className="w-3 h-3 inline mr-1" />
                              {program.targetMuscles}
                            </span>
                          )}
                          {program.difficulty && (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              program.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              program.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              <Star className="w-3 h-3 inline mr-1" />
                              {program.difficulty}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setNewProgram(program)
                              setIsDialogOpen(true)
                            }}
                            className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDeleteDialog(program)}
                            className="border-red-700/50 text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Delete Success Dialog */}
        <Dialog open={showDeleteSuccessDialog} onOpenChange={setShowDeleteSuccessDialog}>
          <DialogContent className="bg-gradient-to-br from-orange-950 via-red-900 to-orange-950 border-4 border-orange-500/50 shadow-2xl max-w-2xl">
            <DialogHeader className="sr-only">
              <DialogTitle>بەرنامەکە سڕایەوە</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8 space-y-6">
              {/* Animated Success Icon */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />
                <div className="absolute inset-4 bg-orange-500/30 rounded-full animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Trash2 className="w-16 h-16 text-white animate-bounce" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white">
                  🗑️ سڕایەوە!
                </h2>
                <p className="text-2xl font-bold text-orange-300">
                  بەرنامەکە بە سەرکەوتوویی سڕایەوە
                </p>
              </div>

              {/* Deleted Program Details */}
              {deletedProgramData && (
                <Card className="bg-white/10 border-2 border-orange-500/30 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Title */}
                      <div className="flex items-center justify-center gap-3 pb-4 border-b border-orange-500/30">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                          {deletedProgramData.type === 'nutrition' ? (
                            <Utensils className="w-8 h-8 text-white" />
                          ) : (
                            <Dumbbell className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-orange-300 mb-1">بەرنامەی سڕاوە</p>
                          <h3 className="text-2xl font-black text-white">{deletedProgramData.title}</h3>
                        </div>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-blue-400" />
                            <p className="text-xs text-blue-300 font-bold">جۆری بەرنامە</p>
                          </div>
                          <p className="text-lg font-black text-white capitalize">
                            {deletedProgramData.type === 'nutrition' ? '🥗 خواردن' : '💪 وەرزش'}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-purple-400" />
                            <p className="text-xs text-purple-300 font-bold">ئاستەکە</p>
                          </div>
                          <p className="text-lg font-black text-white capitalize">
                            {deletedProgramData.difficulty || 'نادیار'}
                          </p>
                        </div>
                      </div>

                      {/* Confirmation Message */}
                      <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                        <div className="flex items-center justify-center gap-2 text-orange-300">
                          <Check className="w-5 h-5" />
                          <p className="text-sm font-bold">ئەم بەرنامەیە لە دەیتابەیس سڕایەوە</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Animation Dots */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>

              <p className="text-sm text-gray-400">
                ئەم پەنجەرەیە خۆکارانە دادەخرێت...
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-gradient-to-br from-red-950 via-red-900 to-red-950 border-4 border-red-500/50 shadow-2xl max-w-xl">
            <DialogHeader className="sr-only">
              <DialogTitle>سڕینەوەی بەرنامە</DialogTitle>
            </DialogHeader>
            <div className="text-center py-6 space-y-6">
              {/* Warning Icon */}
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-400">
                  <Trash2 className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>

              {/* Warning Message */}
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-white">
                  ⚠️ ئاگاداری!
                </h2>
                <p className="text-xl font-bold text-red-300">
                  دڵنیایت لە سڕینەوەی ئەم بەرنامەیە؟
                </p>
              </div>

              {/* Program Details */}
              {programToDelete && (
                <Card className="bg-white/10 border-2 border-red-500/30 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          {programToDelete.type === 'nutrition' ? (
                            <Utensils className="w-6 h-6 text-white" />
                          ) : (
                            <Dumbbell className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm text-gray-400">ناوی بەرنامە</p>
                          <p className="text-lg font-black text-white">{programToDelete.title}</p>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="text-sm text-red-300 text-center">
                          🚨 ئەم کردارە ناگەڕێتەوە! بەرنامەکە بە تەواوی دەسڕدرێتەوە.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => {
                    setShowDeleteDialog(false)
                    setProgramToDelete(null)
                  }}
                  variant="outline"
                  disabled={isDeleting}
                  className="flex-1 h-12 border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg font-bold"
                >
                  <X className="w-5 h-5 mr-2" />
                  {t("cancelAction")}
                </Button>
                <Button
                  onClick={handleDeleteProgram}
                  disabled={isDeleting}
                  className="flex-1 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg font-bold shadow-lg border-2 border-red-400"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      سڕینەوە...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5 mr-2" />
                      بەڵێ، بیسڕەوە
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className={`border-2 text-white max-w-4xl max-h-[90vh] overflow-y-auto transition-all ${
            activeTab === 'nutrition'
              ? 'bg-gradient-to-br from-slate-900 via-green-950/20 to-slate-900 border-green-500/40'
              : 'bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 border-blue-500/40'
          }`}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  activeTab === 'nutrition'
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-600'
                }`}>
                  {activeTab === 'nutrition' ? <Utensils className="w-5 h-5 text-white" /> : <Dumbbell className="w-5 h-5 text-white" />}
                </div>
                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  activeTab === 'nutrition'
                    ? 'from-green-400 to-emerald-400'
                    : 'from-blue-400 to-cyan-400'
                }`}>
                  {newProgram.id ? t("update") : activeTab === 'nutrition' ? t("createNutritionProgram") : t("createNewProgram")}
                </span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Instructions Card */}
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm text-blue-300 font-semibold">{t("instructions")}</p>
                      <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                        <li>{t("fillBasicInfo")}</li>
                        {activeTab === 'workout' && (
                          <>
                            <li>{t("selectDayFrom7Days")}</li>
                            <li>{t("clickAddExercise")}</li>
                            <li>{t("canAddMultipleExercises")}</li>
                            <li>{t("ifRestDayTurnOn")}</li>
                          </>
                        )}
                        <li>{t("whenComplete")}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-2 block font-semibold">📝 {t("programName")} *</Label>
                  <Input
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                    placeholder={activeTab === 'nutrition' ? 'Example: Keto Diet Plan' : 'Example: Full Body Workout'}
                    className="bg-slate-800/50 border-slate-700 text-white h-12"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 text-sm mb-2 block font-semibold">📋 {t("description")}</Label>
                  <textarea
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                    placeholder="Enter program description..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 text-sm mb-2 block font-semibold">⏱️ {t("duration")}</Label>
                    <Input
                      value={newProgram.duration}
                      onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                      placeholder="Example: 30 mins"
                      className="bg-slate-800/50 border-slate-700 text-white h-12"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-sm mb-2 block font-semibold">⭐ {t("level")}</Label>
                    <select
                      value={newProgram.difficulty}
                      onChange={(e) => setNewProgram({ ...newProgram, difficulty: e.target.value })}
                      className="w-full h-12 bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2"
                    >
                      <option value="beginner">🟢 {t("beginner")}</option>
                      <option value="intermediate">🟡 {t("intermediate")}</option>
                      <option value="advanced">🔴 {t("advanced")}</option>
                    </select>
                  </div>
                </div>

                {activeTab === 'nutrition' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block font-semibold">🔥 {t("calories")}</Label>
                      <Input
                        value={newProgram.calories}
                        onChange={(e) => setNewProgram({ ...newProgram, calories: e.target.value })}
                        placeholder="Example: 2000"
                        className="bg-slate-800/50 border-slate-700 text-white h-12"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block font-semibold">🥩 {t("protein")} (g)</Label>
                      <Input
                        value={newProgram.protein}
                        onChange={(e) => setNewProgram({ ...newProgram, protein: e.target.value })}
                        placeholder="Example: 150"
                        className="bg-slate-800/50 border-slate-700 text-white h-12"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block font-semibold">🍚 {t("carbs")} (g)</Label>
                      <Input
                        value={newProgram.carbs}
                        onChange={(e) => setNewProgram({ ...newProgram, carbs: e.target.value })}
                        placeholder="Example: 200"
                        className="bg-slate-800/50 border-slate-700 text-white h-12"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-2 block font-semibold">🧈 {t("fats")} (g)</Label>
                      <Input
                        value={newProgram.fats}
                        onChange={(e) => setNewProgram({ ...newProgram, fats: e.target.value })}
                        placeholder="Example: 60"
                        className="bg-slate-800/50 border-slate-700 text-white h-12"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label className="text-gray-300 text-sm mb-2 block font-semibold">💪 {t("targetMuscles")}</Label>
                    <Input
                      value={newProgram.targetMuscles}
                      onChange={(e) => setNewProgram({ ...newProgram, targetMuscles: e.target.value })}
                      placeholder="Example: Chest, Shoulders, Triceps"
                      className="bg-slate-800/50 border-slate-700 text-white h-12"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-gray-300 text-sm mb-2 block font-semibold">🖼️ {t("imageUrl")}</Label>
                  <Input
                    value={newProgram.imageUrl}
                    onChange={(e) => setNewProgram({ ...newProgram, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="bg-slate-800/50 border-slate-700 text-white h-12"
                  />
                </div>

                {/* User Selection Section */}
                <div className="space-y-3 pt-4 border-t-2 border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-purple-400" />
                      <div>
                        <h3 className="text-lg font-bold text-white">{t("userSelection")}</h3>
                        <p className="text-xs text-gray-400">{t("onlyProUsers")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                        👤 user
                      </span>
                      <span className="px-2 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-xs font-bold border border-yellow-500/30">
                        ⭐ PRO
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-sm font-bold border border-purple-500/30">
                        {selectedUsers.length} {t("selected")}
                      </span>
                    </div>
                  </div>

                  {/* Search Users */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                    <Input
                      placeholder={t("searchByNameOrEmail")}
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="pl-10 h-10 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>

                  {/* Select All / Clear */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={selectAllUsers}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {t("selectAllUsers")} ({filteredUsers.length})
                    </Button>
                    <Button
                      type="button"
                      onClick={clearUserSelection}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-slate-700 text-gray-400 hover:bg-slate-800"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t("clearAll")}
                    </Button>
                  </div>

                  {/* Users List */}
                  <Card className="bg-slate-800/30 border-slate-700 max-h-64 overflow-y-auto">
                    <CardContent className="p-3">
                      {filteredUsers.length === 0 ? (
                        <div className="text-center py-8">
                          <Users className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                          <p className="text-gray-400 text-sm">
                            {users.length === 0 ? 'هیچ یوزەرێکی ئاسایی (user) بە PRO نییە' : 'هیچ یوزەرێک نەدۆزرایەوە'}
                          </p>
                          {users.length === 0 && (
                            <p className="text-gray-500 text-xs mt-1">یوزەرە فریەکان و ئەدمین/فیزیۆ پیشان نادرێن</p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {filteredUsers.map((user) => (
                            <button
                              key={user.id}
                              type="button"
                              onClick={() => toggleUserSelection(user.id)}
                              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                                selectedUsers.includes(user.id)
                                  ? 'bg-purple-500/20 border-purple-500/40 hover:bg-purple-500/30'
                                  : 'bg-slate-900/50 border-slate-700 hover:bg-slate-900'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  selectedUsers.includes(user.id)
                                    ? 'bg-purple-500'
                                    : 'bg-slate-700'
                                }`}>
                                  {selectedUsers.includes(user.id) ? (
                                    <Check className="w-5 h-5 text-white" />
                                  ) : (
                                    <Users className="w-4 h-4 text-gray-400" />
                                  )}
                                </div>
                                <div className="text-left">
                                  <p className="text-white font-semibold text-sm">{user.name || 'No Name'}</p>
                                  <p className="text-gray-400 text-xs">{user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                  👤 {user.role || 'user'}
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                                  ⭐ PRO
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {selectedUsers.length > 0 && (
                    <Card className="bg-green-500/10 border-green-500/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          <p className="text-sm text-green-300">
                            ئەم بەرنامەیە بۆ <span className="font-bold">{selectedUsers.length}</span> یوزەری PRO دەنێردرێت
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Info about filtering */}
                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-blue-300">
                          <p className="font-semibold mb-1">⚠️ {t("noteLabel")}</p>
                          <ul className="space-y-0.5 text-gray-400">
                            <li>✅ {t("onlyProUsersShown")}</li>
                            <li>❌ {t("freeUsersHidden")}</li>
                            <li>❌ {t("adminsHidden")}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Weekly Schedule for Workout */}
                {activeTab === 'workout' && (
                  <div className="space-y-4 pt-4 border-t-2 border-blue-500/30">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-6 h-6 text-blue-400" />
                      <div>
                        <h3 className="text-lg font-bold text-white">{t("weeklySchedule")}</h3>
                        <p className="text-xs text-gray-400">{t("description")}</p>
                      </div>
                    </div>

                    {/* Days Tabs - Compact */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {Object.keys(newProgram.weeklySchedule || {}).map((day) => {
                        const dayData = newProgram.weeklySchedule?.[day]
                        const isActive = currentDay === day
                        const hasExercises = dayData?.exercises?.length > 0
                        const isRest = dayData?.rest
                        
                        return (
                          <button
                            key={day}
                            onClick={() => setCurrentDay(day)}
                            className={`relative px-2 py-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
                                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[10px]">{dayNames[day as keyof typeof dayNames]}</span>
                              {!isActive && (
                                <div className="flex items-center justify-center h-4">
                                  {isRest ? (
                                    <Heart className="w-3 h-3 text-orange-400" />
                                  ) : hasExercises ? (
                                    <div className="w-4 h-4 rounded-full bg-green-500/40 flex items-center justify-center">
                                      <span className="text-[9px] text-green-300 font-bold">{dayData.exercises.length}</span>
                                    </div>
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Current Day Content */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader className="border-b border-slate-700/50 pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-bold text-lg">
                            📅 {dayNames[currentDay as keyof typeof dayNames]}
                          </h4>
                          <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg px-3 py-1.5">
                            <span className="text-xs text-gray-400">{t("restDay")}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={newProgram.weeklySchedule?.[currentDay]?.rest || false}
                                onChange={() => toggleRestDay(currentDay)}
                                className="sr-only peer" 
                              />
                              <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4">
                        {!newProgram.weeklySchedule?.[currentDay]?.rest ? (
                          <div className="space-y-3">
                            {newProgram.weeklySchedule?.[currentDay]?.exercises?.length > 0 ? (
                              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                {newProgram.weeklySchedule[currentDay].exercises.map((exercise: any, index: number) => (
                                  <div 
                                    key={index} 
                                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30"
                                  >
                                    <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                                      <span className="text-white font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-white font-bold text-sm truncate">{exercise.name}</p>
                                      <div className="flex gap-2 mt-1">
                                        <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 text-xs font-bold">
                                          {exercise.sets} sets
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-cyan-500/30 text-cyan-300 text-xs font-bold">
                                          {exercise.reps} reps
                                        </span>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => removeExerciseFromDay(currentDay, index)}
                                      className="border-red-700/50 text-red-400 hover:bg-red-500/20 h-7 w-7 p-0"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-6 border-2 border-dashed border-slate-700 rounded-lg">
                                <Activity className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">{t("noExercisesAdded")}</p>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                onClick={() => addExerciseToDay(currentDay)}
                                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                              >
                                <Plus className="w-5 h-5 mr-2" />
                                {t("addExerciseButton")}
                              </Button>
                              <Button
                                onClick={() => {
                                  setSourceDayForExerciseCopy(currentDay)
                                  setShowCopyExercisesDialog(true)
                                }}
                                variant="outline"
                                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                                disabled={!newProgram.weeklySchedule?.[currentDay]?.exercises?.length}
                              >
                                <Dumbbell className="w-5 h-5 mr-2" />
                                {t("copyToDay")}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Heart className="w-12 h-12 text-orange-400 mx-auto mb-3 animate-pulse" />
                            <p className="text-lg font-bold text-white">رۆژی پشووە 😴</p>
                            <p className="text-sm text-gray-400 mt-1">کاتی ئاسایش و باشبوونەوەیە</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Week Summary - Compact */}
                    <Card className="bg-slate-800/30 border-slate-700">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-400">{t("weekSummaryLabel")}</span>
                          <div className="flex gap-3 text-xs">
                            <span className="text-green-400">
                              ✓ {Object.values(newProgram.weeklySchedule || {}).filter((d: any) => d.exercises?.length > 0).length} {t("activeLabel")}
                            </span>
                            <span className="text-orange-400">
                              ○ {Object.values(newProgram.weeklySchedule || {}).filter((d: any) => d.rest).length} {t("restLabel")}
                            </span>
                            <span className="text-blue-400">
                              Σ {Object.values(newProgram.weeklySchedule || {}).reduce((sum: number, d: any) => sum + (d.exercises?.length || 0), 0)} {t("exercisesLabel")}
                            </span>
                            <span className="text-cyan-400">
                              ◇ {getAllUniqueExercises().length} {t("uniqueLabel")}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Unique Exercises Overview */}
                    {getAllUniqueExercises().length > 0 && (
                      <Card className="bg-cyan-500/10 border-cyan-500/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-sm flex items-center gap-2">
                              <Dumbbell className="w-4 h-4 text-cyan-400" />
                              یارییە جیاوازەکانی هەفتە
                            </h4>
                            <span className="text-xs text-cyan-300">
                              {getAllUniqueExercises().length} جۆر
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                            {getAllUniqueExercises().map((exercise, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50 border border-cyan-500/20">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                                  <Activity className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-xs font-bold truncate">{exercise.name}</p>
                                  <p className="text-[10px] text-gray-400">{exercise.sets} × {exercise.reps}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                {/* Weekly Schedule for Nutrition */}
                {activeTab === 'nutrition' && (
                  <div className="space-y-4 pt-4 border-t-2 border-green-500/30">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-6 h-6 text-green-400" />
                      <div>
                        <h3 className="text-lg font-bold text-white">بەرنامەی هەفتانە</h3>
                        <p className="text-xs text-gray-400">خواردنەکانی هەر رۆژێک دیاری بکە</p>
                      </div>
                    </div>

                    {/* Days Tabs - Compact */}
                    <div className="grid grid-cols-7 gap-1.5">
                      {Object.keys(newProgram.weeklySchedule || {}).map((day) => {
                        const dayData = newProgram.weeklySchedule?.[day]
                        const isActive = currentDay === day
                        const hasMeals = dayData?.meals?.length > 0
                        const isRest = dayData?.rest
                        
                        return (
                          <button
                            key={day}
                            onClick={() => setCurrentDay(day)}
                            className={`relative px-2 py-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                              isActive
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-[10px]">{dayNames[day as keyof typeof dayNames]}</span>
                              {!isActive && (
                                <div className="flex items-center justify-center h-4">
                                  {isRest ? (
                                    <Heart className="w-3 h-3 text-orange-400" />
                                  ) : hasMeals ? (
                                    <div className="w-4 h-4 rounded-full bg-green-500/40 flex items-center justify-center">
                                      <span className="text-[9px] text-green-300 font-bold">{dayData.meals.length}</span>
                                    </div>
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Current Day Content */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader className="border-b border-slate-700/50 pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-bold text-lg">
                            📅 {dayNames[currentDay as keyof typeof dayNames]}
                          </h4>
                          <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg px-3 py-1.5">
                            <span className="text-xs text-gray-400">رۆژی پشوو؟</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={newProgram.weeklySchedule?.[currentDay]?.rest || false}
                                onChange={() => toggleRestDay(currentDay)}
                                className="sr-only peer" 
                              />
                              <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4">
                        {!newProgram.weeklySchedule?.[currentDay]?.rest ? (
                          <div className="space-y-3">
                            {newProgram.weeklySchedule?.[currentDay]?.meals?.length > 0 ? (
                              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                {newProgram.weeklySchedule[currentDay].meals.map((meal: any, index: number) => {
                                  const categoryEmojis = {
                                    breakfast: '🌅',
                                    lunch: '🍽️',
                                    dinner: '🌙',
                                    snack: '🍎'
                                  }
                                  const categoryNames = {
                                    breakfast: 'ناشتە',
                                    lunch: 'نیوەڕۆ',
                                    dinner: 'ئێوارە',
                                    snack: 'سناک'
                                  }
                                  
                                  return (
                                    <Card key={meal.id} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                                      <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-2xl">
                                            {categoryEmojis[meal.category as keyof typeof categoryEmojis]}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                              <span className="px-2 py-0.5 rounded-full bg-green-500/30 text-green-300 text-xs font-bold">
                                                {categoryNames[meal.category as keyof typeof categoryNames]}
                                              </span>
                                            </div>
                                            <p className="text-white font-bold text-base truncate mb-2">{meal.name}</p>
                                            
                                            {/* Macros */}
                                            <div className="grid grid-cols-4 gap-2 mb-2">
                                              <div className="text-center p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
                                                <p className="text-[10px] text-orange-300 font-bold">کالۆری</p>
                                                <p className="text-sm text-white font-black">{meal.calories}</p>
                                              </div>
                                              {meal.protein && (
                                                <div className="text-center p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                                  <p className="text-[10px] text-blue-300 font-bold">پرۆتین</p>
                                                  <p className="text-sm text-white font-black">{meal.protein}g</p>
                                                </div>
                                              )}
                                              {meal.carbs && (
                                                <div className="text-center p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                                                  <p className="text-[10px] text-yellow-300 font-bold">کاربز</p>
                                                  <p className="text-sm text-white font-black">{meal.carbs}g</p>
                                                </div>
                                              )}
                                              {meal.fats && (
                                                <div className="text-center p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                                                  <p className="text-[10px] text-purple-300 font-bold">چەورە</p>
                                                  <p className="text-sm text-white font-black">{meal.fats}g</p>
                                                </div>
                                              )}
                                            </div>

                                            {/* Optional Fields */}
                                            {meal.ingredients && (
                                              <div className="mt-2 p-2 rounded-lg bg-slate-900/50">
                                                <p className="text-xs text-gray-400 mb-1">🥘 پێکهاتەکان:</p>
                                                <p className="text-xs text-gray-300">{meal.ingredients}</p>
                                              </div>
                                            )}
                                            {meal.notes && (
                                              <p className="text-xs text-gray-400 mt-2 italic">💡 {meal.notes}</p>
                                            )}
                                          </div>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleRemoveMeal(currentDay, meal.id)}
                                            className="border-red-700/50 text-red-400 hover:bg-red-500/20 h-8 w-8 p-0"
                                          >
                                            <X className="w-4 h-4" />
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )
                                })}
                              </div>
                            ) : (
                              <div className="text-center py-6 border-2 border-dashed border-slate-700 rounded-lg">
                                <Utensils className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                                <p className="text-gray-400 text-sm">هیچ خواردنێک زیاد نەکراوە</p>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                onClick={handleAddMeal}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                              >
                                <Plus className="w-5 h-5 mr-2" />
                                زیادکردنی خواردن
                              </Button>
                              <Button
                                onClick={() => {
                                  setSourceDayForCopy(currentDay)
                                  setShowCopyMealsDialog(true)
                                }}
                                variant="outline"
                                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                                disabled={!newProgram.weeklySchedule?.[currentDay]?.meals?.length}
                              >
                                <Coffee className="w-5 h-5 mr-2" />
                                کۆپی بۆ رۆژی تر
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Heart className="w-12 h-12 text-orange-400 mx-auto mb-3 animate-pulse" />
                            <p className="text-lg font-bold text-white">رۆژی پشووە 😴</p>
                            <p className="text-sm text-gray-400 mt-1">کاتی ئاسایش و باشبوونەوەیە</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Week Summary - Compact */}
                    <Card className="bg-slate-800/30 border-slate-700">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-gray-400">پوختەی هەفتە:</span>
                          <div className="flex gap-3 text-xs">
                            <span className="text-green-400">
                              ✓ {Object.values(newProgram.weeklySchedule || {}).filter((d: any) => d.meals?.length > 0).length} چالاک
                            </span>
                            <span className="text-orange-400">
                              ○ {Object.values(newProgram.weeklySchedule || {}).filter((d: any) => d.rest).length} پشوو
                            </span>
                            <span className="text-green-400">
                              Σ {Object.values(newProgram.weeklySchedule || {}).reduce((sum: number, d: any) => sum + (d.meals?.length || 0), 0)} خواردن
                            </span>
                            <span className="text-purple-400">
                              ◇ {getAllUniqueMeals().length} جیاواز
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Unique Meals Overview */}
                    {getAllUniqueMeals().length > 0 && (
                      <Card className="bg-purple-500/10 border-purple-500/30">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-bold text-sm flex items-center gap-2">
                              <Pizza className="w-4 h-4 text-purple-400" />
                              خواردنە جیاوازەکانی هەفتە
                            </h4>
                            <span className="text-xs text-purple-300">
                              {getAllUniqueMeals().length} جۆر
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                            {getAllUniqueMeals().map((meal, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50 border border-purple-500/20">
                                <span className="text-lg">
                                  {meal.category === 'breakfast' && '🌅'}
                                  {meal.category === 'lunch' && '🍽️'}
                                  {meal.category === 'dinner' && '🌙'}
                                  {meal.category === 'snack' && '🍎'}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-xs font-bold truncate">{meal.name}</p>
                                  <p className="text-[10px] text-gray-400">{meal.calories} cal</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => {
                    setIsDialogOpen(false)
                    resetForm()
                  }}
                  variant="outline"
                  className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t("cancelAction")}
                </Button>
                <Button
                  onClick={handleCreateProgram}
                  disabled={!newProgram.title || isSaving}
                  className={`flex-1 h-12 text-lg font-bold shadow-lg ${
                    activeTab === 'nutrition'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t("saveProgram")}...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      {t("saveProgram")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 border-4 border-green-500/50 shadow-2xl max-w-2xl">
            <DialogHeader className="sr-only">
              <DialogTitle>بەرنامەکە پاشەکەوت کرا</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8 space-y-6">
              {/* Animated Success Icon */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="absolute inset-4 bg-green-500/30 rounded-full animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Check className="w-16 h-16 text-white animate-bounce" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white">
                  {activeTab === 'nutrition' ? '🥗' : '💪'} سەرکەوتوو بوو!
                </h2>
                <p className="text-2xl font-bold text-green-300">
                  بەرنامەکە بە سەرکەوتوویی پاشەکەوت کرا
                </p>
              </div>

              {/* Program Details */}
              {savedProgramData && (
                <Card className="bg-white/10 border-2 border-green-500/30 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Title */}
                      <div className="text-center pb-4 border-b border-green-500/30">
                        <p className="text-sm text-green-300 mb-1">ناوی بەرنامە</p>
                        <h3 className="text-2xl font-black text-white">{savedProgramData.title}</h3>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {/* Assigned Users */}
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                          <div className="w-12 h-12 mx-auto mb-2 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-3xl font-black text-white mb-1">
                            {savedProgramData.assignedUsersCount}
                          </p>
                          <p className="text-xs text-blue-300 font-bold">یوزەر</p>
                        </div>

                        {/* Active Days */}
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="w-12 h-12 mx-auto mb-2 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-3xl font-black text-white mb-1">
                            {savedProgramData.activeDays}
                          </p>
                          <p className="text-xs text-purple-300 font-bold">ڕۆژی چالاک</p>
                        </div>

                        {/* Total Exercises */}
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                          <div className="w-12 h-12 mx-auto mb-2 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Dumbbell className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-3xl font-black text-white mb-1">
                            {savedProgramData.totalExercises}
                          </p>
                          <p className="text-xs text-orange-300 font-bold">یاری</p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-green-500/30">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <div className="text-left">
                            <p className="text-xs text-gray-400">ئاستەکە</p>
                            <p className="text-sm font-bold text-white capitalize">{savedProgramData.difficulty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <div className="text-left">
                            <p className="text-xs text-gray-400">ماوە</p>
                            <p className="text-sm font-bold text-white">{savedProgramData.duration || 'نادیار'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Success Animation */}
              <div className="flex items-center justify-center gap-2 text-green-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Exercise Dialog */}
        <Dialog open={isExerciseDialogOpen} onOpenChange={setIsExerciseDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-cyan-500/30 shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">{t("addExerciseTitle")}</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    {currentEditingDay && `📅 ${dayNames[currentEditingDay as keyof typeof dayNames]}`}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowExerciseLibrary(true)}
                  variant="outline"
                  className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 h-10"
                >
                  <Dumbbell className="w-4 h-4 mr-2" />
                  {t("exerciseLibraryButton")}
                </Button>
                <Button
                  onClick={handleSaveExerciseToLibrary}
                  variant="outline"
                  className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 h-10"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {t("saveToLibrary")}
                </Button>
              </div>

              {/* Exercise Name */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-400" />
                  </div>
                  🏋️ {t("exerciseName")}
                </Label>
                <Input
                  value={exerciseFormData.name}
                  onChange={(e) => setExerciseFormData({ ...exerciseFormData, name: e.target.value })}
                  placeholder="Example: Push-ups, Squats, Bench Press..."
                  className="bg-slate-800/50 border-slate-700 text-white h-12 text-lg"
                />
              </div>

              {/* Video Selection */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                  🎥 {t("exerciseVideos")} ({t("optional")})
                </Label>
                
                {exerciseFormData.videos.length > 0 && (
                  <div className="space-y-2 mb-2">
                    {exerciseFormData.videos.map((video, index) => (
                      <Card key={index} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                              <Video className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-green-300 text-sm font-bold truncate">{video.name}</p>
                              <div className="flex gap-2 mt-1 flex-wrap">
                                {video.sets && (
                                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
                                    {video.sets} sets
                                  </span>
                                )}
                                {video.reps && (
                                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                                    {video.reps} reps
                                  </span>
                                )}
                              </div>
                              {video.notes && (
                                <p className="text-xs text-gray-400 mt-1 italic truncate">💡 {video.notes}</p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const newVideos = exerciseFormData.videos.filter((_, i) => i !== index)
                                const newUrls = exerciseFormData.videoUrls.filter((_, i) => i !== index)
                                setExerciseFormData({ ...exerciseFormData, videos: newVideos, videoUrls: newUrls })
                              }}
                              className="border-red-700/50 text-red-400 hover:bg-red-500/20 h-8 w-8 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                <Button
                  type="button"
                  onClick={() => setShowVideoBrowser(true)}
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700"
                >
                  <Video className="w-5 h-5 mr-2" />
                  {exerciseFormData.videos.length > 0 ? `${t("addAnotherVideo")} (${exerciseFormData.videos.length})` : t("selectVideoFromStorage")}
                </Button>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-purple-400" />
                  </div>
                  📝 {t("notesOptional")}
                </Label>
                <Input
                  value={exerciseFormData.notes}
                  onChange={(e) => setExerciseFormData({ ...exerciseFormData, notes: e.target.value })}
                  placeholder={t("additionalNotesPlaceholder")}
                  className="bg-slate-800/50 border-slate-700 text-white h-12"
                />
              </div>

              {/* Preview Card */}
              {exerciseFormData.name && (
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs font-bold text-gray-400">{t("preview")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                        <Dumbbell className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg">{exerciseFormData.name}</p>
                        {exerciseFormData.videos.length > 0 && (
                          <p className="text-purple-400 text-sm mt-1">
                            🎬 {exerciseFormData.videos.length} {t("videosSelected")}
                          </p>
                        )}
                        {exerciseFormData.notes && (
                          <p className="text-gray-400 text-sm mt-2 italic">"{exerciseFormData.notes}"</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setIsExerciseDialogOpen(false)}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
              >
                <X className="w-4 h-4 mr-2" />
                {t("cancel")}
              </Button>
              <Button
                onClick={handleSaveExercise}
                className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg font-bold shadow-lg"
              >
                <Check className="w-5 h-5 mr-2" />
                {t("addButton")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Browser Dialog */}
        <Dialog open={showVideoBrowser} onOpenChange={setShowVideoBrowser}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-pink-500/30 shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">{t("selectVideo")}</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    {availableVideos.length} {t("videosInStorage")}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            {isLoadingVideos ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : availableVideos.length === 0 ? (
              <div className="text-center py-20">
                <Video className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">{t("noVideosAvailable")}</p>
                <p className="text-gray-400">{t("uploadVideosToFirebase")}</p>
              </div>
            ) : (
              <>
                {/* Search & Filters */}
                <div className="mb-4 space-y-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                    <Input
                      placeholder={t("searchByVideoName")}
                      value={videoSearchQuery}
                      onChange={(e) => {
                        setVideoSearchQuery(e.target.value)
                        setVideoPage(1)
                      }}
                      className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Gender Filter */}
                    <select
                      value={videoFilters.gender}
                      onChange={(e) => {
                        setVideoFilters({ ...videoFilters, gender: e.target.value })
                        setVideoPage(1)
                      }}
                      className="h-10 px-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-sm"
                    >
                      <option value="all">{t("allGenders")}</option>
                      <option value="male">{t("male")}</option>
                      <option value="female">{t("female")}</option>
                    </select>

                    {/* Level Filter */}
                    <select
                      value={videoFilters.level}
                      onChange={(e) => {
                        setVideoFilters({ ...videoFilters, level: e.target.value })
                        setVideoPage(1)
                      }}
                      className="h-10 px-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-sm"
                    >
                      <option value="all">{t("allLevels")}</option>
                      <option value="beginner">{t("beginner")}</option>
                      <option value="intermediate">{t("intermediate")}</option>
                      <option value="advanced">{t("advanced")}</option>
                    </select>

                    {/* Body Part Filter */}
                    <select
                      value={videoFilters.bodyPart}
                      onChange={(e) => {
                        setVideoFilters({ ...videoFilters, bodyPart: e.target.value })
                        setVideoPage(1)
                      }}
                      className="h-10 px-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-sm"
                    >
                      <option value="all">{t("allBodyParts")}</option>
                      <option value="chest">{t("chest")}</option>
                      <option value="back">{t("back")}</option>
                      <option value="legs">{t("legs")}</option>
                      <option value="shoulders">{t("shoulders")}</option>
                      <option value="arms">{t("arms")}</option>
                      <option value="core">{t("core")}</option>
                    </select>
                  </div>

                  <p className="text-sm text-gray-400">
                    {availableVideos
                      .filter(v => {
                        const name = v.displayName.toLowerCase()
                        const matchesSearch = name.includes(videoSearchQuery.toLowerCase())
                        const matchesGender = videoFilters.gender === 'all' || name.includes(videoFilters.gender)
                        const matchesLevel = videoFilters.level === 'all' || name.includes(videoFilters.level)
                        const matchesBodyPart = videoFilters.bodyPart === 'all' || name.includes(videoFilters.bodyPart)
                        return matchesSearch && matchesGender && matchesLevel && matchesBodyPart
                      }).length} {t("videosFound")}
                  </p>
                </div>

                {/* Videos Grid */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {availableVideos
                    .filter(video => {
                      const name = video.displayName.toLowerCase()
                      const matchesSearch = name.includes(videoSearchQuery.toLowerCase())
                      const matchesGender = videoFilters.gender === 'all' || name.includes(videoFilters.gender)
                      const matchesLevel = videoFilters.level === 'all' || name.includes(videoFilters.level)
                      const matchesBodyPart = videoFilters.bodyPart === 'all' || name.includes(videoFilters.bodyPart)
                      return matchesSearch && matchesGender && matchesLevel && matchesBodyPart
                    })
                    .slice((videoPage - 1) * videosPerPage, videoPage * videosPerPage)
                    .map((video, index) => {
                      const isSelected = exerciseFormData.videoUrls.includes(video.url)
                      return (
                        <Card 
                          key={index} 
                          className={`border transition-all overflow-hidden group ${
                            isSelected 
                              ? 'bg-green-500/20 border-green-500/50' 
                              : 'bg-slate-800/50 border-slate-700 hover:border-pink-500/50'
                          }`}
                        >
                          <CardContent className="p-0">
                            {/* Video Preview on Hover */}
                            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group/video">
                              {video.url ? (
                                <>
                                  <video 
                                    src={video.url}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    preload="metadata"
                                    playsInline
                                    onMouseEnter={(e) => {
                                      const target = e.currentTarget
                                      target.play().catch(() => {})
                                    }}
                                    onMouseLeave={(e) => {
                                      const target = e.currentTarget
                                      target.pause()
                                      target.currentTime = 0
                                    }}
                                    onError={(e) => {
                                      console.error('Video load error:', video.displayName)
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 group-hover/video:opacity-30 transition-opacity" />
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover/video:opacity-0 transition-opacity">
                                    <div className="w-16 h-16 rounded-full bg-slate-800/80 backdrop-blur-sm flex items-center justify-center">
                                      <Play className="w-8 h-8 text-white ml-1" />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Video className="w-12 h-12 text-slate-600" />
                                </div>
                              )}
                              <div className="absolute top-2 right-2">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm ${
                                  isSelected 
                                    ? 'bg-green-500/80' 
                                    : 'bg-pink-500/80'
                                }`}>
                                  <Video className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Video Info */}
                            <div 
                              className="p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
                              onClick={() => {
                                if (isSelected) {
                                  // Remove video
                                  setExerciseFormData({ 
                                    ...exerciseFormData, 
                                    videoUrls: exerciseFormData.videoUrls.filter(u => u !== video.url),
                                    videos: exerciseFormData.videos.filter(v => v.url !== video.url)
                                  })
                                } else {
                                  // Open detail dialog for this video
                                  setCurrentVideoForDetail({ name: video.displayName, url: video.url })
                                  setShowVideoDetailDialog(true)
                                }
                              }}
                            >
                            <div className="flex items-center gap-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-bold text-lg truncate">{video.displayName}</p>
                                <div className="flex gap-4 mt-2 text-sm">
                                  <span className="text-gray-400">
                                    📦 {(video.size / (1024 * 1024)).toFixed(2)} MB
                                  </span>
                                  <span className="text-gray-400">
                                    🎬 {video.contentType.split('/')[1].toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <Button
                                  type="button"
                                  className={`${
                                    isSelected
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                                      : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700'
                                  }`}
                                >
                                  {isSelected ? (
                                    <>
                                      <Check className="w-4 h-4 mr-2" />
                                      {t("selected")}
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-4 h-4 mr-2" />
                                      {t("select")}
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>

                {/* Pagination */}
                {(() => {
                  const filteredVideos = availableVideos.filter(v => {
                    const name = v.displayName.toLowerCase()
                    const matchesSearch = name.includes(videoSearchQuery.toLowerCase())
                    const matchesGender = videoFilters.gender === 'all' || name.includes(videoFilters.gender)
                    const matchesLevel = videoFilters.level === 'all' || name.includes(videoFilters.level)
                    const matchesBodyPart = videoFilters.bodyPart === 'all' || name.includes(videoFilters.bodyPart)
                    return matchesSearch && matchesGender && matchesLevel && matchesBodyPart
                  })
                  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
                  
                  return filteredVideos.length > videosPerPage && (
                    <div className="flex items-center justify-center gap-2 pt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setVideoPage(prev => Math.max(1, prev - 1))}
                        disabled={videoPage === 1}
                        className="border-slate-700 text-gray-300 hover:bg-slate-800"
                      >
                        ← {t("previous")}
                      </Button>
                      <div className="px-4 py-2 rounded-lg bg-slate-800/50 text-white text-sm font-bold">
                        {videoPage} / {totalPages}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setVideoPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={videoPage >= totalPages}
                        className="border-slate-700 text-gray-300 hover:bg-slate-800"
                      >
                        {t("next")} →
                      </Button>
                    </div>
                  )
                })()}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-700 mt-4">
                  <Button
                    onClick={() => setShowVideoBrowser(false)}
                    variant="outline"
                    className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t("cancel")}
                  </Button>
                  <Button
                    onClick={() => setShowVideoBrowser(false)}
                    className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-bold shadow-lg"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    {t("saveWithCount")} ({exerciseFormData.videos.length})
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Video Detail Dialog */}
        <Dialog open={showVideoDetailDialog} onOpenChange={setShowVideoDetailDialog}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-2 border-purple-500/30 shadow-2xl max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white">{t("videoDetails")}</div>
                  <div className="text-sm text-gray-400 font-normal mt-1 truncate">
                    {currentVideoForDetail?.name}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-blue-400" />
                    </div>
                    📊 {t("setsCount")}
                  </Label>
                  <Input
                    id="video-sets"
                    type="number"
                    placeholder="3"
                    className="bg-slate-800/50 border-slate-700 text-white h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-bold flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Target className="w-3 h-3 text-cyan-400" />
                    </div>
                    🔢 {t("repsCount")}
                  </Label>
                  <Input
                    id="video-reps"
                    type="number"
                    placeholder="12"
                    className="bg-slate-800/50 border-slate-700 text-white h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Lightbulb className="w-3 h-3 text-purple-400" />
                  </div>
                  📝 {t("notesOptional")}
                </Label>
                <Input
                  id="video-notes"
                  placeholder={t("videoSpecificNotes")}
                  className="bg-slate-800/50 border-slate-700 text-white h-11"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setShowVideoDetailDialog(false)
                  setCurrentVideoForDetail(null)
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-11"
              >
                <X className="w-4 h-4 mr-2" />
                {t("cancel")}
              </Button>
              <Button
                onClick={() => {
                  if (currentVideoForDetail) {
                    const sets = (document.getElementById('video-sets') as HTMLInputElement)?.value || ''
                    const reps = (document.getElementById('video-reps') as HTMLInputElement)?.value || ''
                    const notes = (document.getElementById('video-notes') as HTMLInputElement)?.value || ''
                    
                    setExerciseFormData({
                      ...exerciseFormData,
                      videoUrls: [...exerciseFormData.videoUrls, currentVideoForDetail.url],
                      videos: [...exerciseFormData.videos, {
                        name: currentVideoForDetail.name,
                        url: currentVideoForDetail.url,
                        sets,
                        reps,
                        notes
                      }]
                    })
                    
                    setShowVideoDetailDialog(false)
                    setCurrentVideoForDetail(null)
                  }
                }}
                className="flex-1 h-11 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg font-bold shadow-lg"
              >
                <Check className="w-5 h-5 mr-2" />
                {t("addButton")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Meal Dialog */}
        <Dialog open={isMealDialogOpen} onOpenChange={setIsMealDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-green-500/30 shadow-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">زیادکردنی خواردن</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    {currentEditingDay === 'monday' && '📅 دووشەممە'}
                    {currentEditingDay === 'tuesday' && '📅 سێشەممە'}
                    {currentEditingDay === 'wednesday' && '📅 چوارشەممە'}
                    {currentEditingDay === 'thursday' && '📅 پێنجشەممە'}
                    {currentEditingDay === 'friday' && '📅 هەینی'}
                    {currentEditingDay === 'saturday' && '📅 شەممە'}
                    {currentEditingDay === 'sunday' && '📅 یەکشەممە'}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowMealLibrary(true)}
                  variant="outline"
                  className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/10 h-10"
                >
                  <Pizza className="w-4 h-4 mr-2" />
                  کتێبخانەی خواردن
                </Button>
                <Button
                  onClick={handleSaveMealToLibrary}
                  variant="outline"
                  className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 h-10"
                >
                  <Save className="w-4 h-4 mr-2" />
                  خەزنکردن بۆ کتێبخانە
                </Button>
              </div>

              {/* Meal Name */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Utensils className="w-4 h-4 text-green-400" />
                  </div>
                  🍽️ ناوی خواردن
                </Label>
                <Input
                  value={mealFormData.name}
                  onChange={(e) => setMealFormData({ ...mealFormData, name: e.target.value })}
                  placeholder="Example: Grilled Chicken & Rice"
                  className="bg-slate-800/50 border-slate-700 text-white h-12 text-lg"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  🕐 پۆلی خواردن
                </Label>
                <select
                  value={mealFormData.category}
                  onChange={(e) => setMealFormData({ ...mealFormData, category: e.target.value })}
                  className="w-full h-12 bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2 text-lg"
                >
                  <option value="breakfast">🌅 ناشتە (Breakfast)</option>
                  <option value="lunch">🍽️ نیوەڕۆ (Lunch)</option>
                  <option value="dinner">🌙 ئێوارە (Dinner)</option>
                  <option value="snack">🍎 سناک (Snack)</option>
                </select>
              </div>

              {/* Macros Grid */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-orange-400" />
                  </div>
                  📊 ماکرۆکان
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">🔥 کالۆری *</Label>
                    <Input
                      type="number"
                      value={mealFormData.calories}
                      onChange={(e) => setMealFormData({ ...mealFormData, calories: e.target.value })}
                      placeholder="Example: 450"
                      className="bg-slate-800/50 border-slate-700 text-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">🥩 پرۆتین (g)</Label>
                    <Input
                      type="number"
                      value={mealFormData.protein}
                      onChange={(e) => setMealFormData({ ...mealFormData, protein: e.target.value })}
                      placeholder="Example: 35"
                      className="bg-slate-800/50 border-slate-700 text-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">🍚 کاربز (g)</Label>
                    <Input
                      type="number"
                      value={mealFormData.carbs}
                      onChange={(e) => setMealFormData({ ...mealFormData, carbs: e.target.value })}
                      placeholder="Example: 50"
                      className="bg-slate-800/50 border-slate-700 text-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">🧈 چەورە (g)</Label>
                    <Input
                      type="number"
                      value={mealFormData.fats}
                      onChange={(e) => setMealFormData({ ...mealFormData, fats: e.target.value })}
                      placeholder="Example: 12"
                      className="bg-slate-800/50 border-slate-700 text-white h-11"
                    />
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Apple className="w-4 h-4 text-purple-400" />
                  </div>
                  🥘 پێکهاتەکان (ئیختیاری)
                </Label>
                <textarea
                  value={mealFormData.ingredients}
                  onChange={(e) => setMealFormData({ ...mealFormData, ingredients: e.target.value })}
                  placeholder="Example:&#10;- Chicken breast 150g&#10;- Rice 200g&#10;- Vegetables 100g&#10;- Olive oil 1 tsp"
                  rows={4}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-cyan-400" />
                  </div>
                  📝 ڕێنمایی (ئیختیاری)
                </Label>
                <textarea
                  value={mealFormData.instructions}
                  onChange={(e) => setMealFormData({ ...mealFormData, instructions: e.target.value })}
                  placeholder="Example:&#10;1. Grill chicken until fully cooked&#10;2. Cook rice separately&#10;3. Mix all ingredients in a bowl..."
                  rows={4}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                  💡 تێبینی (ئیختیاری)
                </Label>
                <Input
                  value={mealFormData.notes}
                  onChange={(e) => setMealFormData({ ...mealFormData, notes: e.target.value })}
                  placeholder="تێبینی تایبەت..."
                  className="bg-slate-800/50 border-slate-700 text-white h-11"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-yellow-400" />
                  </div>
                  🖼️ وێنەی خواردن (ئیختیاری)
                </Label>
                
                {/* Selected Images Preview */}
                {mealFormData.imageUrl && (() => {
                  const imageUrls = mealFormData.imageUrl.split(',').filter(Boolean)
                  return (
                    <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30 shadow-lg shadow-green-500/10">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              <p className="text-green-400 text-sm font-bold">
                                {imageUrls.length} وێنە هەڵبژێردراوە ✓
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setMealFormData({ ...mealFormData, imageUrl: '' })}
                              className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 h-8 px-3"
                            >
                              <X className="w-4 h-4 mr-1" />
                              لابردنی هەموو
                            </Button>
                          </div>
                          
                          {/* Images Grid */}
                          <div className="grid grid-cols-4 gap-2">
                            {imageUrls.map((url, idx) => (
                              <div key={idx} className="relative group">
                                <div className="aspect-square rounded-lg overflow-hidden bg-slate-900 border-2 border-green-500/50 shadow-md">
                                  <img 
                                    src={url} 
                                    alt={`Image ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23334155" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" dy=".3em" fill="%239ca3af"%3E🍽️%3C/text%3E%3C/svg%3E'
                                    }}
                                  />
                                </div>
                                {/* Remove individual image */}
                                <button
                                  onClick={() => {
                                    const newUrls = imageUrls.filter((_, i) => i !== idx)
                                    setMealFormData({ ...mealFormData, imageUrl: newUrls.join(',') })
                                  }}
                                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3 text-white" />
                                </button>
                                {/* Number Badge */}
                                <div className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                                  {idx + 1}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })()}
                
                <div className="space-y-3">
                  {/* Gallery Button - Featured */}
                  <Button
                    type="button"
                    onClick={() => {
                      // When opening dialog, load previously selected images
                      const currentUrls = mealFormData.imageUrl ? mealFormData.imageUrl.split(',').filter(Boolean) : []
                      setSelectedImages(currentUrls)
                      setShowMealImageBrowser(true)
                    }}
                    variant="outline"
                    className="w-full border-2 border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/60 h-12 font-bold transition-all shadow-lg shadow-yellow-500/10"
                  >
                    <Activity className="w-5 h-5 mr-2" />
                    📸 هەڵبژاردن لە گالەری ({availableMealImages.length} وێنە)
                  </Button>
                  
                  {/* Manual URL Input - Secondary */}
                  <div className="relative">
                    <Input
                      value={mealFormData.imageUrl}
                      onChange={(e) => setMealFormData({ ...mealFormData, imageUrl: e.target.value })}
                      placeholder="🔗 یان لینکی وێنە بنووسە..."
                      className="bg-slate-800/50 border-slate-700 text-white h-11 pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      🌐
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm text-blue-300 font-semibold">تێبینی گرنگ:</p>
                      <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                        <li>تەنها ناو و کالۆری پێویستە</li>
                        <li>پێکهاتە، ڕێنمایی و تێبینی ئیختیاریە</li>
                        <li>دەتوانی زیاتر لە خواردنێک زیاد بکەیت بۆ هەر رۆژێک</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setIsMealDialogOpen(false)
                  setMealFormData({
                    name: '',
                    category: 'breakfast',
                    calories: '',
                    protein: '',
                    carbs: '',
                    fats: '',
                    ingredients: '',
                    instructions: '',
                    notes: '',
                    imageUrl: ''
                  })
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
              >
                <X className="w-4 h-4 mr-2" />
                {t("cancel")}
              </Button>
              <Button
                onClick={handleSaveMeal}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-bold shadow-lg"
              >
                <Check className="w-5 h-5 mr-2" />
                زیادکردن
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Meal Library Dialog */}
        <Dialog open={showMealLibrary} onOpenChange={setShowMealLibrary}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-2 border-purple-500/30 shadow-2xl max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <Pizza className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">کتێبخانەی خواردن</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    {mealLibrary.length} خواردنی خەزێنکراو
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            {mealLibrary.length === 0 ? (
              <div className="text-center py-20">
                <Pizza className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">کتێبخانە بەتاڵە</p>
                <p className="text-gray-400">خواردنەکانی خۆت خەزێنە کردنی دواتر</p>
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <Input
                    placeholder="گەڕان لە کتێبخانە..."
                    value={mealSearchQuery}
                    onChange={(e) => setMealSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>

                {/* Meals Grid */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {mealLibrary
                    .filter(meal => meal.name.toLowerCase().includes(mealSearchQuery.toLowerCase()))
                    .map((meal) => {
                      const categoryEmojis = {
                        breakfast: '🌅',
                        lunch: '🍽️',
                        dinner: '🌙',
                        snack: '🍎'
                      }
                      const categoryNames = {
                        breakfast: 'ناشتە',
                        lunch: 'نیوەڕۆ',
                        dinner: 'ئێوارە',
                        snack: 'سناک'
                      }

                      return (
                        <Card key={meal.id} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 text-2xl">
                                {categoryEmojis[meal.category as keyof typeof categoryEmojis]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 text-xs font-bold">
                                    {categoryNames[meal.category as keyof typeof categoryNames]}
                                  </span>
                                </div>
                                <p className="text-white font-bold text-base mb-2">{meal.name}</p>
                                
                                <div className="flex gap-2 flex-wrap">
                                  <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-300 text-xs font-bold">
                                    🔥 {meal.calories} cal
                                  </span>
                                  {meal.protein && (
                                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold">
                                      🥩 {meal.protein}g
                                    </span>
                                  )}
                                  {meal.carbs && (
                                    <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-300 text-xs font-bold">
                                      🍚 {meal.carbs}g
                                    </span>
                                  )}
                                  {meal.fats && (
                                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-bold">
                                      🧈 {meal.fats}g
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSelectMealFromLibrary(meal)}
                                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 h-8 px-3"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  هەڵبژاردن
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteMealFromLibrary(meal.id)}
                                  className="border-red-700/50 text-red-400 hover:bg-red-500/20 h-8 px-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-700">
              <Button
                onClick={() => {
                  setShowMealLibrary(false)
                  setMealSearchQuery('')
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-11"
              >
                <X className="w-4 h-4 mr-2" />
                داخستن
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Copy Meals Dialog */}
        <Dialog open={showCopyMealsDialog} onOpenChange={setShowCopyMealsDialog}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 border-2 border-blue-500/30 shadow-2xl max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">کۆپی خواردنەکان</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    لە {dayNames[sourceDayForCopy as keyof typeof dayNames]} بۆ رۆژێکی تر
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Source Day Info */}
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <p className="text-blue-300 font-bold">
                      خواردنەکانی {dayNames[sourceDayForCopy as keyof typeof dayNames]}:
                    </p>
                  </div>
                  <div className="space-y-2">
                    {newProgram.weeklySchedule?.[sourceDayForCopy]?.meals?.map((meal: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-slate-900/50">
                        <span className="text-2xl">
                          {meal.category === 'breakfast' && '🌅'}
                          {meal.category === 'lunch' && '🍽️'}
                          {meal.category === 'dinner' && '🌙'}
                          {meal.category === 'snack' && '🍎'}
                        </span>
                        <p className="text-white text-sm flex-1">{meal.name}</p>
                        <span className="text-xs text-gray-400">{meal.calories} cal</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Target Days Selection */}
              <div className="space-y-3">
                <Label className="text-white font-bold">هەڵبژاردنی رۆژی ئامانج:</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(newProgram.weeklySchedule || {})
                    .filter(day => day !== sourceDayForCopy)
                    .map((day) => (
                      <Button
                        key={day}
                        onClick={() => handleCopyMealsToDay(day)}
                        className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 h-12"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        کۆپی بۆ {dayNames[day as keyof typeof dayNames]}
                      </Button>
                    ))}
                </div>
              </div>

              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-yellow-300">
                      <p className="font-semibold mb-1">⚠️ تێبینی:</p>
                      <ul className="space-y-0.5 text-gray-400">
                        <li>✅ خواردنەکان زیاد دەکرێن (ناسڕێنەوە)</li>
                        <li>✅ هەر خواردنێک ID ـی تایبەت بە خۆی دەبێت</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setShowCopyMealsDialog(false)
                  setSourceDayForCopy('')
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
              >
                <X className="w-4 h-4 mr-2" />
                {t("cancel")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Exercise Library Dialog */}
        <Dialog open={showExerciseLibrary} onOpenChange={setShowExerciseLibrary}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 border-2 border-cyan-500/30 shadow-2xl max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">{t("exerciseLibrary")}</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    {exerciseLibrary.length} {t("savedExercises")}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            {exerciseLibrary.length === 0 ? (
              <div className="text-center py-20">
                <Dumbbell className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">{t("libraryEmpty")}</p>
                <p className="text-gray-400">{t("saveYourExercisesForLater")}</p>
              </div>
            ) : (
              <>
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <Input
                    placeholder={t("searchInLibrary")}
                    value={exerciseSearchQuery}
                    onChange={(e) => setExerciseSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>

                {/* Exercises Grid */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {exerciseLibrary
                    .filter(exercise => exercise.name.toLowerCase().includes(exerciseSearchQuery.toLowerCase()))
                    .map((exercise) => (
                      <Card key={exercise.id} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-bold text-base mb-2">{exercise.name}</p>
                              
                              <div className="flex gap-2 flex-wrap mb-2">
                                {exercise.sets && (
                                  <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold">
                                    📊 {exercise.sets} sets
                                  </span>
                                )}
                                {exercise.reps && (
                                  <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                                    🔢 {exercise.reps} reps
                                  </span>
                                )}
                                {exercise.videos?.length > 0 && (
                                  <span className="px-2 py-1 rounded bg-pink-500/20 text-pink-300 text-xs font-bold">
                                    🎥 {exercise.videos.length} {t("videos")}
                                  </span>
                                )}
                              </div>
                              
                              {exercise.notes && (
                                <p className="text-xs text-gray-400 italic">💡 {exercise.notes}</p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSelectExerciseFromLibrary(exercise)}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 h-8 px-3"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                {t("select")}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteExerciseFromLibrary(exercise.id)}
                                className="border-red-700/50 text-red-400 hover:bg-red-500/20 h-8 px-3"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-700">
              <Button
                onClick={() => {
                  setShowExerciseLibrary(false)
                  setExerciseSearchQuery('')
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-11"
              >
                <X className="w-4 h-4 mr-2" />
                {t("close")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Copy Exercises Dialog */}
        <Dialog open={showCopyExercisesDialog} onOpenChange={setShowCopyExercisesDialog}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 border-2 border-cyan-500/30 shadow-2xl max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">کۆپی یارییەکان</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    لە {dayNames[sourceDayForExerciseCopy as keyof typeof dayNames]} بۆ رۆژێکی تر
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Source Day Info */}
              <Card className="bg-cyan-500/10 border-cyan-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <p className="text-cyan-300 font-bold">
                      یارییەکانی {dayNames[sourceDayForExerciseCopy as keyof typeof dayNames]}:
                    </p>
                  </div>
                  <div className="space-y-2">
                    {newProgram.weeklySchedule?.[sourceDayForExerciseCopy]?.exercises?.map((exercise: any, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded bg-slate-900/50">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                          <Activity className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-white text-sm flex-1">{exercise.name}</p>
                        <span className="text-xs text-gray-400">{exercise.sets} × {exercise.reps}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Target Days Selection */}
              <div className="space-y-3">
                <Label className="text-white font-bold">هەڵبژاردنی رۆژی ئامانج:</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(newProgram.weeklySchedule || {})
                    .filter(day => day !== sourceDayForExerciseCopy)
                    .map((day) => (
                      <Button
                        key={day}
                        onClick={() => handleCopyExercisesToDay(day)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 h-12"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        کۆپی بۆ {dayNames[day as keyof typeof dayNames]}
                      </Button>
                    ))}
                </div>
              </div>

              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-yellow-300">
                      <p className="font-semibold mb-1">⚠️ تێبینی:</p>
                      <ul className="space-y-0.5 text-gray-400">
                        <li>✅ یارییەکان زیاد دەکرێن (ناسڕێنەوە)</li>
                        <li>✅ هەر یارییەک ID ـی تایبەت بە خۆی دەبێت</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setShowCopyExercisesDialog(false)
                  setSourceDayForExerciseCopy('')
                }}
                variant="outline"
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
              >
                <X className="w-4 h-4 mr-2" />
                {t("cancel")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Meal Image Browser Dialog */}
        <Dialog open={showMealImageBrowser} onOpenChange={setShowMealImageBrowser}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-yellow-500/30 shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">گالەریی وێنەکانی خواردن</div>
                  <div className="text-sm text-gray-400 font-normal mt-1">
                    {availableMealImages.length} وێنە لە ستۆرج
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            {isLoadingMealImages ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : availableMealImages.length === 0 ? (
              <div className="text-center py-20">
                <Activity className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-xl font-bold text-white mb-2">هیچ وێنەیەک نییە</p>
                <p className="text-gray-400">وێنەکانی خواردن بۆ فایربەیس ستۆرج ئەپلۆد بکە</p>
                <p className="text-xs text-gray-500 mt-2">فۆڵدەر: meals/images/</p>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400" />
                    <Input
                      placeholder="گەڕان بە ناوی وێنە..."
                      value={mealImageSearchQuery}
                      onChange={(e) => {
                        setMealImageSearchQuery(e.target.value)
                        setMealImagePage(1)
                      }}
                      className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {availableMealImages
                      .filter(img => img.displayName.toLowerCase().includes(mealImageSearchQuery.toLowerCase()))
                      .length} وێنە دۆزرایەوە
                  </p>
                </div>

                {/* Images Grid */}
                <div className="flex-1 overflow-y-auto pr-2">
                  <div className="grid grid-cols-3 gap-3">
                    {availableMealImages
                      .filter(image => image.displayName.toLowerCase().includes(mealImageSearchQuery.toLowerCase()))
                      .slice((mealImagePage - 1) * mealImagesPerPage, mealImagePage * mealImagesPerPage)
                      .map((image, index) => {
                        const isSelected = selectedImages.includes(image.url)
                        return (
                          <Card 
                            key={index} 
                            className={`border transition-all overflow-hidden group cursor-pointer ${
                              isSelected 
                                ? 'bg-green-500/20 border-green-500/50 ring-2 ring-green-500 scale-95' 
                                : 'bg-slate-800/50 border-slate-700 hover:border-yellow-500/50 hover:scale-105'
                            }`}
                            onClick={() => {
                              // Toggle selection for multiple images
                              setSelectedImages(prev => {
                                if (prev.includes(image.url)) {
                                  // Remove from selection
                                  return prev.filter(url => url !== image.url)
                                } else {
                                  // Add to selection
                                  return [...prev, image.url]
                                }
                              })
                            }}
                          >
                            <CardContent className="p-0">
                              {/* Image Preview */}
                              <div className="relative aspect-square bg-slate-900 overflow-hidden">
                                <img 
                                  src={image.url}
                                  alt={image.displayName}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23334155" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="48" text-anchor="middle" dy=".3em" fill="%239ca3af"%3E🍽️%3C/text%3E%3C/svg%3E'
                                  }}
                                />
                                {isSelected && (
                                  <div className="absolute inset-0 bg-green-500/40 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-2xl">
                                      <Check className="w-10 h-10 text-white" />
                                    </div>
                                  </div>
                                )}
                                <div className="absolute top-2 right-2">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm ${
                                    isSelected 
                                      ? 'bg-green-500/80' 
                                      : 'bg-yellow-500/80'
                                  }`}>
                                    <Activity className="w-4 h-4 text-white" />
                                  </div>
                                </div>
                              </div>

                              {/* Image Info */}
                              <div className="p-3">
                                <p className="text-white font-bold text-sm truncate mb-1">{image.displayName}</p>
                                <div className="flex gap-2 text-xs">
                                  <span className="text-gray-400">
                                    📦 {(image.size / (1024 * 1024)).toFixed(2)} MB
                                  </span>
                                  <span className="text-gray-400">
                                    🖼️ {image.contentType.split('/')[1].toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                  </div>
                </div>

                {/* Pagination */}
                {(() => {
                  const filteredImages = availableMealImages.filter(img => 
                    img.displayName.toLowerCase().includes(mealImageSearchQuery.toLowerCase())
                  )
                  const totalPages = Math.ceil(filteredImages.length / mealImagesPerPage)
                  
                  if (totalPages > 1) {
                    return (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <Button
                          onClick={() => setMealImagePage(Math.max(1, mealImagePage - 1))}
                          disabled={mealImagePage === 1}
                          variant="outline"
                          className="border-slate-700 text-gray-300 hover:bg-slate-800 disabled:opacity-50"
                        >
                          پێشوو
                        </Button>
                        <span className="text-sm text-gray-400">
                          پەڕەی {mealImagePage} لە {totalPages}
                        </span>
                        <Button
                          onClick={() => setMealImagePage(Math.min(totalPages, mealImagePage + 1))}
                          disabled={mealImagePage === totalPages}
                          variant="outline"
                          className="border-slate-700 text-gray-300 hover:bg-slate-800 disabled:opacity-50"
                        >
                          دواتر
                        </Button>
                      </div>
                    )
                  }
                  return null
                })()}
              </>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-700 mt-4">
              {/* Selection Counter */}
              {selectedImages.length > 0 && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-green-400 font-bold">
                        {selectedImages.length} وێنە هەڵبژێردراوە
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedImages([])}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                    >
                      <X className="w-4 h-4 mr-1" />
                      پاککردنەوەی هەموو
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedImages.length > 0 ? (
                  <>
                    <Button
                      onClick={() => {
                        // Save selected images as comma-separated URLs
                        setMealFormData({ ...mealFormData, imageUrl: selectedImages.join(',') })
                        setShowMealImageBrowser(false)
                        setMealImageSearchQuery('')
                        setMealImagePage(1)
                        setSelectedImages([])
                      }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12 font-bold shadow-lg shadow-green-500/20"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      پەسەندکردن ({selectedImages.length} وێنە)
                    </Button>
                    <Button
                      onClick={() => {
                        setShowMealImageBrowser(false)
                        setMealImageSearchQuery('')
                        setMealImagePage(1)
                        setSelectedImages([])
                      }}
                      variant="outline"
                      className="border-slate-700 text-gray-300 hover:bg-slate-800 h-12 px-6"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t("cancel")}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setShowMealImageBrowser(false)
                      setMealImageSearchQuery('')
                      setMealImagePage(1)
                    }}
                    variant="outline"
                    className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t("cancel")}
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarSleek>
    </AuthGuard>
  )
}
