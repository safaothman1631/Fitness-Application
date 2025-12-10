"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import { StartButton } from "@/components/buttons"
import { Dumbbell, TrendingUp, Award, Calendar, Target, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function UserDashboard() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    currentStreak: 0,
    overallProgress: 0
  })
  const [recentActivities, setRecentActivities] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data
          const userResponse = await fetch(`/api/users?email=${user.email}`)
          if (userResponse.ok) {
            const users = await userResponse.json()
            const currentUser = users.find((u: any) => u.email === user.email)
            setUserData(currentUser)

            // Fetch user stats
            const statsResponse = await fetch(`/api/user-stats?userId=${currentUser.id || currentUser.uid}`)
            if (statsResponse.ok) {
              const statsData = await statsResponse.json()
              setStats({
                totalWorkouts: statsData.totalWorkouts || 0,
                currentStreak: statsData.currentStreak || 0,
                overallProgress: statsData.overallProgress || 0
              })
            }

            // Fetch recent activities
            const activitiesResponse = await fetch(`/api/user-activities?userId=${currentUser.id || currentUser.uid}&limit=3`)
            if (activitiesResponse.ok) {
              const activitiesData = await activitiesResponse.json()
              setRecentActivities(activitiesData)
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <AuthGuard requiredRole="user">
        <FitproLayout role="user">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Loading...</p>
            </div>
          </div>
        </FitproLayout>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="user">
      <FitproLayout role="user">
        <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {userData?.name || 'User'}</h1>
          <p className="text-gray-400">Track your fitness journey and achieve your goals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fitpro-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Workouts</p>
                  <p className="text-3xl font-bold text-white transition-all duration-300 group-hover:scale-110">{stats.totalWorkouts}</p>
                </div>
                <Dumbbell className="w-10 h-10 text-blue-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Streak</p>
                  <p className="text-3xl font-bold text-white transition-all duration-300 group-hover:scale-110">{stats.currentStreak} days</p>
                </div>
                <Zap className="w-10 h-10 text-yellow-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold text-green-500 transition-all duration-300 group-hover:scale-110">{stats.overallProgress}%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="fitpro-card">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <StartButton icon={Dumbbell} label="Start Workout" className="rounded-xl w-full" />
            <StartButton icon={Target} label="Set Goal" className="rounded-xl w-full" />
            <StartButton icon={Award} label="View Achievements" className="rounded-xl w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="fitpro-card">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivities.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No recent activities</p>
                  <p className="text-sm mt-1">Start your first workout to see activity here</p>
                </div>
              ) : (
                recentActivities.map((activity, i) => (
                  <div key={i} className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <Dumbbell className="w-6 h-6 text-blue-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                      <div>
                        <p className="text-white font-semibold transition-colors duration-300 group-hover:text-blue-400">{activity.workoutName || 'Workout'}</p>
                        <p className="text-gray-400 text-sm">{activity.completedDate || 'Recently'}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold transition-all duration-300 group-hover:bg-green-500/30 group-hover:scale-105">{activity.status || 'Completed'}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}
