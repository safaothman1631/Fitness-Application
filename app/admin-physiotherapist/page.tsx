"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard, Users, Calendar, TrendingUp, 
  AlertTriangle, CheckCircle2, Clock, UserCheck,
  Activity, FileText, Shield
} from "lucide-react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

interface DashboardStats {
  totalPhysiotherapists: number
  totalPatients: number
  totalRequests: number
  pendingRequests: number
  approvedRequests: number
  totalAppointments: number
  completedAppointments: number
  scheduledAppointments: number
  pendingDoctorRequests: number
}

export default function AdminPhysioDashboard() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalPhysiotherapists: 0,
    totalPatients: 0,
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    scheduledAppointments: 0,
    pendingDoctorRequests: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)

      // Fetch physiotherapists
      const physiosSnapshot = await getDocs(
        query(collection(db, "users"), where("role", "==", "physiotherapist"))
      )
      const totalPhysiotherapists = physiosSnapshot.size

      // Fetch patients
      const patientsSnapshot = await getDocs(collection(db, "physiotherapist_patients"))
      const totalPatients = patientsSnapshot.size

      // Fetch physiotherapist requests
      const requestsSnapshot = await getDocs(collection(db, "physiotherapist_requests"))
      let pendingRequests = 0
      let approvedRequests = 0
      requestsSnapshot.forEach(doc => {
        const data = doc.data()
        if (data.status === "pending") pendingRequests++
        if (data.status === "approved") approvedRequests++
      })

      // Fetch appointments
      const appointmentsSnapshot = await getDocs(collection(db, "appointments"))
      let completedAppointments = 0
      let scheduledAppointments = 0
      appointmentsSnapshot.forEach(doc => {
        const data = doc.data()
        if (data.status === "completed") completedAppointments++
        if (data.status === "scheduled") scheduledAppointments++
      })

      // Fetch doctor registration requests
      const doctorRequestsSnapshot = await getDocs(
        query(collection(db, "doctor_requests"), where("status", "==", "pending"))
      )
      const pendingDoctorRequests = doctorRequestsSnapshot.size

      setStats({
        totalPhysiotherapists,
        totalPatients,
        totalRequests: requestsSnapshot.size,
        pendingRequests,
        approvedRequests,
        totalAppointments: appointmentsSnapshot.size,
        completedAppointments,
        scheduledAppointments,
        pendingDoctorRequests
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const quickLinks = [
    {
      title: t("allRequests"),
      href: "/admin-physiotherapist/requests",
      icon: FileText,
      color: "purple",
      count: stats.totalRequests
    },
    {
      title: t("allPatients"),
      href: "/admin-physiotherapist/patients",
      icon: Users,
      color: "blue",
      count: stats.totalPatients
    },
    {
      title: t("physiotherapistProgress"),
      href: "/admin-physiotherapist/progress",
      icon: TrendingUp,
      color: "green",
      count: stats.totalPhysiotherapists
    },
    {
      title: t("managePhysiotherapists"),
      href: "/admin-physiotherapist/manage",
      icon: Shield,
      color: "orange",
      count: stats.pendingDoctorRequests
    }
  ]

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-50 animate-pulse" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl">
                    <LayoutDashboard className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white tracking-tight">
                    {t("adminPhysiotherapist")}
                  </h1>
                  <p className="text-cyan-400 mt-1 font-medium">
                    {t("welcomeBack")} - {t("medicalDashboard")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Physiotherapists */}
                <Card className="border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-400 font-medium">{t("totalPhysiotherapists")}</p>
                        <p className="text-3xl font-bold text-white mt-1">{stats.totalPhysiotherapists}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Patients */}
                <Card className="border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-400 font-medium">{t("totalPatients")}</p>
                        <p className="text-3xl font-bold text-white mt-1">{stats.totalPatients}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointments */}
                <Card className="border-white/10 bg-gradient-to-br from-green-500/10 to-green-500/5 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-400 font-medium">{t("totalAppointments")}</p>
                        <p className="text-3xl font-bold text-white mt-1">{stats.totalAppointments}</p>
                        <p className="text-xs text-green-300 mt-1">
                          {stats.completedAppointments} {t("completed")}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending Requests */}
                <Card className="border-white/10 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 hover:scale-105 transition-transform">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-yellow-400 font-medium">{t("pendingRequests")}</p>
                        <p className="text-3xl font-bold text-white mt-1">
                          {stats.pendingRequests + stats.pendingDoctorRequests}
                        </p>
                        <p className="text-xs text-yellow-300 mt-1">
                          {stats.pendingDoctorRequests} {t("doctorRequests")}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border-green-500/20 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      {t("completedSessions")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-green-400">{stats.completedAppointments}</p>
                    <p className="text-sm text-slate-400 mt-1">{t("totalCompletedAppointments")}</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/20 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      {t("scheduledSessions")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-blue-400">{stats.scheduledAppointments}</p>
                    <p className="text-sm text-slate-400 mt-1">{t("upcomingAppointments")}</p>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-400" />
                      {t("approvedRequests")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-purple-400">{stats.approvedRequests}</p>
                    <p className="text-sm text-slate-400 mt-1">{t("totalApprovedRequests")}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Links */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{t("quickAccess")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <div className={`p-6 rounded-xl bg-gradient-to-br from-${link.color}-500/10 to-${link.color}-500/5 border border-${link.color}-500/20 hover:scale-105 transition-all cursor-pointer group`}>
                          <div className="flex items-center justify-between mb-3">
                            <link.icon className={`w-8 h-8 text-${link.color}-400 group-hover:scale-110 transition-transform`} />
                            <Badge className={`bg-${link.color}-500/20 text-${link.color}-400 border-${link.color}-500/30`}>
                              {link.count}
                            </Badge>
                          </div>
                          <h3 className="text-white font-semibold">{link.title}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
