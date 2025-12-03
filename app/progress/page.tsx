"use client"

import { useState } from "react"
import AuthGuard from "@/components/auth-guard"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FitproLayout from "@/components/fitpro-layout"
import { Flame, TrendingUp, Award, Calendar, Activity, Zap } from "lucide-react"

export default function ProgressPage() {
  const [progressData] = useState([
    { week: "1", strength: 20, cardio: 25, flexibility: 15 },
    { week: "2", strength: 35, cardio: 32, flexibility: 28 },
    { week: "3", strength: 28, cardio: 38, flexibility: 22 },
    { week: "4", strength: 45, cardio: 42, flexibility: 35 },
    { week: "5", strength: 52, cardio: 48, flexibility: 40 },
    { week: "6", strength: 65, cardio: 58, flexibility: 52 },
  ])

  const [weeklyData] = useState([
    { day: "Monday", workouts: 1, duration: 45 },
    { day: "Tuesday", workouts: 1, duration: 30 },
    { day: "Wednesday", workouts: 0, duration: 0 },
    { day: "Thursday", workouts: 1, duration: 60 },
    { day: "Friday", workouts: 1, duration: 45 },
    { day: "Saturday", workouts: 1, duration: 75 },
    { day: "Sunday", workouts: 1, duration: 40 },
  ])

  const [stats] = useState([
    {
      icon: Flame,
      label: "Current Streak",
      value: "6",
      unit: "days",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Award,
      label: "Total Workouts",
      value: "124",
      unit: "completed",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Activity,
      label: "Total Duration",
      value: "87.5",
      unit: "hours",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: Zap,
      label: "Avg Per Week",
      value: "280",
      unit: "minutes",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ])

  return (
    <AuthGuard requiredRole="user">
    <FitproLayout role="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Progress</h1>
          <p className="text-gray-400">Track your fitness journey and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="fitpro-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <p className="text-gray-500 text-sm">{stat.unit}</p>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Progress Chart */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Progress Over 6 Weeks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="strength" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="cardio" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="flexibility" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-500" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="duration" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Personal Records */}
        <Card className="fitpro-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Personal Records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { exercise: "Bench Press", weight: "100 kg", date: "2 weeks ago" },
                { exercise: "Squats", weight: "140 kg", date: "3 weeks ago" },
                { exercise: "Deadlift", weight: "180 kg", date: "1 week ago" },
              ].map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">{record.exercise}</p>
                    <p className="text-gray-400 text-sm">{record.date}</p>
                  </div>
                  <div className="text-xl font-bold text-blue-400">{record.weight}</div>
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
