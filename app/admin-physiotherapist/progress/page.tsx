"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, Activity, CheckCircle2, Clock, User } from "lucide-react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface PhysioProgress {
  id: string
  name: string
  email: string
  totalPatients: number
  activeSessions: number
  completedSessions: number
  avgRating: number
  totalReviews: number
  joinDate: any
  specialization?: string
  workingHours?: string
}

interface SessionData {
  physiotherapistId: string
  patientId: string
  status: string
  date: any
}

export default function AdminPhysioProgressPage() {
  const { t } = useLanguage()
  const [physiotherapists, setPhysiotherapists] = useState<PhysioProgress[]>([])
  const [sessions, setSessions] = useState<SessionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    try {
      setLoading(true)
      
      const allPhysios: PhysioProgress[] = []
      
      // Fetch from physiotherapists collection
      const physioSnapshot = await getDocs(collection(db, "physiotherapists"))
      physioSnapshot.forEach((doc) => {
        const data = doc.data()
        allPhysios.push({
          id: doc.id,
          name: data.name || "Unknown",
          email: data.email || "",
          totalPatients: 0,
          activeSessions: 0,
          completedSessions: 0,
          avgRating: data.rating || 0,
          totalReviews: data.reviewCount || 0,
          joinDate: data.createdAt,
          specialization: data.specialty || data.specialization,
          workingHours: data.workingHours
        })
      })
      
      // Also fetch from users collection with physiotherapist role
      const usersSnapshot = await getDocs(
        query(collection(db, "users"), where("role", "==", "physiotherapist"))
      )
      usersSnapshot.forEach((doc) => {
        const data = doc.data()
        allPhysios.push({
          id: doc.id,
          name: data.name || "Unknown",
          email: data.email || "",
          totalPatients: 0,
          activeSessions: 0,
          completedSessions: 0,
          avgRating: data.rating || 0,
          totalReviews: data.reviewCount || 0,
          joinDate: data.createdAt,
          specialization: data.specialization,
          workingHours: data.workingHours
        })
      })
      
      // Fetch all sessions/appointments
      const appointmentsSnapshot = await getDocs(collection(db, "appointments"))
      const allSessions: SessionData[] = []
      appointmentsSnapshot.forEach((doc) => {
        const data = doc.data()
        allSessions.push({
          physiotherapistId: data.physiotherapistId,
          patientId: data.patientId,
          status: data.status,
          date: data.date
        })
      })
      setSessions(allSessions)

      // Calculate progress data for each physio
      const physiosWithProgress = allPhysios.map(physio => {
        const physioSessions = allSessions.filter(s => s.physiotherapistId === physio.id)
        const uniquePatients = new Set(physioSessions.map(s => s.patientId)).size
        const active = physioSessions.filter(s => s.status === "scheduled").length
        const completed = physioSessions.filter(s => s.status === "completed").length

        return {
          ...physio,
          totalPatients: uniquePatients,
          activeSessions: active,
          completedSessions: completed
        }
      })

      setPhysiotherapists(physiosWithProgress)
    } catch (error) {
      console.error("Error fetching progress data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString()
  }

  const getTotalStats = () => {
    return {
      totalPhysios: physiotherapists.length,
      totalPatients: physiotherapists.reduce((sum, p) => sum + p.totalPatients, 0),
      totalActive: physiotherapists.reduce((sum, p) => sum + p.activeSessions, 0),
      totalCompleted: physiotherapists.reduce((sum, p) => sum + p.completedSessions, 0)
    }
  }

  const stats = getTotalStats()

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-2xl">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {t("physiotherapistProgress")}
                    </h1>
                    <p className="text-green-400 mt-1 font-medium">
                      {t("viewAllPhysioData")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-400 font-medium">{t("totalPhysiotherapists")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.totalPhysios}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-400 font-medium">{t("totalPatients")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.totalPatients}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-400 font-medium">{t("activeSessions")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.totalActive}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-400 font-medium">{t("completedSessions")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{stats.totalCompleted}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Physiotherapist Progress List */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {physiotherapists.length === 0 ? (
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">{t("noPhysiotherapistsFound")}</p>
                  </CardContent>
                </Card>
              ) : (
                physiotherapists.map((physio) => (
                  <Card key={physio.id} className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-green-400" />
                            {physio.name}
                          </CardTitle>
                          <p className="text-sm text-slate-400 mt-1">{physio.email}</p>
                        </div>
                        {physio.avgRating > 0 && (
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                            ⭐ {physio.avgRating.toFixed(1)} ({physio.totalReviews})
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Patients */}
                        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-xs text-purple-400 font-semibold">{t("patients")}</span>
                          </div>
                          <p className="text-2xl font-bold text-white">{physio.totalPatients}</p>
                        </div>

                        {/* Active Sessions */}
                        <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span className="text-xs text-yellow-400 font-semibold">{t("active")}</span>
                          </div>
                          <p className="text-2xl font-bold text-white">{physio.activeSessions}</p>
                        </div>

                        {/* Completed Sessions */}
                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-xs text-green-400 font-semibold">{t("completed")}</span>
                          </div>
                          <p className="text-2xl font-bold text-white">{physio.completedSessions}</p>
                        </div>

                        {/* Join Date */}
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-blue-400 font-semibold">{t("joinDate")}</span>
                          </div>
                          <p className="text-sm font-bold text-white">{formatDate(physio.joinDate)}</p>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {(physio.specialization || physio.workingHours) && (
                        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            {physio.specialization && (
                              <div>
                                <span className="text-slate-500">{t("specialization")}:</span>
                                <span className="text-slate-300 ml-2">{physio.specialization}</span>
                              </div>
                            )}
                            {physio.workingHours && (
                              <div>
                                <span className="text-slate-500">{t("workingHours")}:</span>
                                <span className="text-slate-300 ml-2">{physio.workingHours}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
