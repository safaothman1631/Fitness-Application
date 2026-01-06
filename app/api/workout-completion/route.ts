import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { userId, day, exerciseCount, totalTime } = await request.json()

    if (!userId || !day) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const userRef = adminDb.collection("users").doc(userId)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const today = new Date().toISOString().split('T')[0]
    
    // Get or initialize workout completion data
    const completions = userData?.workoutCompletions || {}
    const streakData = userData?.streakData || {
      currentStreak: 0,
      lastCompletionDate: null,
      longestStreak: 0
    }

    // Mark today as completed
    completions[today] = {
      day,
      exerciseCount,
      totalTime: totalTime || 0,
      completedAt: new Date().toISOString()
    }

    // Calculate streak
    const lastDate = streakData.lastCompletionDate
    let newStreak = 1
    let wasStreakBroken = false
    let previousStreak = 0

    if (lastDate) {
      const lastDateTime = new Date(lastDate).getTime()
      const todayTime = new Date(today).getTime()
      const daysDiff = Math.floor((todayTime - lastDateTime) / (1000 * 60 * 60 * 24))

      if (daysDiff === 1) {
        // Consecutive day
        newStreak = streakData.currentStreak + 1
      } else if (daysDiff === 0) {
        // Same day, keep current streak
        newStreak = streakData.currentStreak
      } else if (daysDiff > 1) {
        // Missed days in between - streak broken, reset to 1
        wasStreakBroken = true
        previousStreak = streakData.currentStreak
        newStreak = 1
      } else {
        // Streak broken
        wasStreakBroken = true
        previousStreak = streakData.currentStreak
        newStreak = 1
      }
    }

    const updatedStreakData = {
      currentStreak: newStreak,
      lastCompletionDate: today,
      longestStreak: Math.max(newStreak, streakData.longestStreak || 0)
    }

    // Calculate total workouts and time
    const totalWorkouts = Object.keys(completions).length
    const totalMinutes = Object.values(completions).reduce((sum: number, c: any) => sum + (c.totalTime || 0), 0)

    // Update user document
    await userRef.update({
      workoutCompletions: completions,
      streakData: updatedStreakData,
      totalWorkouts,
      totalTime: totalMinutes,
      updatedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      streak: newStreak,
      totalWorkouts,
      totalTime: totalMinutes,
      wasStreakBroken,
      previousStreak
    })

  } catch (error: any) {
    console.error("Error recording workout completion:", error)
    return NextResponse.json(
      { error: "Failed to record workout completion", details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      )
    }

    const userDoc = await adminDb.collection("users").doc(userId).get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const userData = userDoc.data()
    const completions = userData?.workoutCompletions || {}
    const streakData = userData?.streakData || {
      currentStreak: 0,
      lastCompletionDate: null,
      longestStreak: 0
    }

    // Get today's workout time
    const today = new Date().toISOString().split('T')[0]
    const todayCompletion = completions[today]
    const todayTime = todayCompletion ? todayCompletion.totalTime || 0 : 0
    
    // Check for missed days and mark them
    const missedDays: string[] = []
    
    console.log('🔍 Checking missed days for user:', userId)
    console.log('   Today:', today)
    console.log('   Completions:', Object.keys(completions))
    
    // Get Saturday (start of workout week) to today
    const currentDate = new Date(today)
    const currentDayOfWeek = currentDate.getDay() // 0 = Sunday, 6 = Saturday
    
    // Calculate how many days since Saturday (week start)
    // If today is Sunday (0), daysSinceSaturday = 1
    // If today is Monday (1), daysSinceSaturday = 2
    // If today is Tuesday (2), daysSinceSaturday = 3
    // If today is Saturday (6), daysSinceSaturday = 0
    const daysSinceSaturday = currentDayOfWeek === 6 ? 0 : currentDayOfWeek + 1
    
    console.log('   Current day of week:', currentDayOfWeek, '(0=Sun, 6=Sat)')
    console.log('   Days since Saturday:', daysSinceSaturday)
    
    // Check all days from Saturday until yesterday
    for (let i = daysSinceSaturday; i > 0; i--) {
      const checkDate = new Date(currentDate)
      checkDate.setDate(currentDate.getDate() - i)
      const checkDateStr = checkDate.toISOString().split('T')[0]
      
      // If this date is not in completions and not today, mark as missed
      if (!completions[checkDateStr] && checkDateStr !== today) {
        console.log('   ⚠ Missed:', checkDateStr)
        missedDays.push(checkDateStr)
      } else if (completions[checkDateStr]) {
        console.log('   ✓ Completed:', checkDateStr)
      }
    }
    
    console.log('🔴 Total missed days:', missedDays)

    return NextResponse.json({
      completions,
      currentStreak: streakData.currentStreak,
      longestStreak: streakData.longestStreak,
      totalWorkouts: userData?.totalWorkouts || 0,
      totalTime: userData?.totalTime || 0,
      todayTime: todayTime,
      missedDays: missedDays
    })

  } catch (error: any) {
    console.error("Error fetching workout completion:", error)
    return NextResponse.json(
      { error: "Failed to fetch workout completion", details: error.message },
      { status: 500 }
    )
  }
}
