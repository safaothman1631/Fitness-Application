"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import { StartButton } from "@/components/buttons"
import { Dumbbell, TrendingUp, Award, Calendar, Target, Zap } from "lucide-react"

export default function UserDashboard() {
  return (
    <AuthGuard requiredRole="user">
      <FitproLayout role="user">
        <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, User</h1>
          <p className="text-gray-400">Track your fitness journey and achieve your goals</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Workouts</p>
                  <p className="text-3xl font-bold text-white">24</p>
                </div>
                <Dumbbell className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Streak</p>
                  <p className="text-3xl font-bold text-white">12 days</p>
                </div>
                <Zap className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
                  <p className="text-3xl font-bold text-green-500">72%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Dumbbell className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="text-white font-semibold">Upper Body Workout</p>
                      <p className="text-gray-400 text-sm">Completed on Nov 8</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">Completed</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}
