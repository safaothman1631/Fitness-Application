"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, Timestamp, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AuthGuard from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useLanguage } from "@/hooks/useLanguage"
import { toast } from "sonner"
import {
  Crown,
  Users,
  Activity,
  TrendingUp,
  Shield,
  Settings,
  Sparkles,
  UserPlus,
  Trash2,
  Search,
  Download,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Clock,
  Mail,
  Phone,
  Lock,
  Unlock,
  LogOut,
  FileText,
  DollarSign,
  Target,
  Zap,
  Star,
  Briefcase,
  Heart,
  Bell,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  ClipboardList,
  Package,
  Award
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  phone?: string
  createdAt: any
  lastLogin?: any
  membership?: string
  membershipDate?: any  // ⭐ زیادکراوە!
}

interface Stats {
  totalUsers: number
  activeUsers: number
  totalPhysios: number
  totalTrainers: number
  pendingApprovals: number
  todayActivity: number
  totalRequests: number
  totalNotifications: number
  proMembers: number
  totalSessions: number
}

interface MonthlyStats {
  month: string
  newUsers: number
  newPatients: number
  newDoctors: number
  proUpgrades: number
  totalSessions: number
  activeUsers: number
}

export default function OwnerDashboard() {
  const { t } = useLanguage()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState("dashboard")
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPhysios: 0,
    totalTrainers: 0,
    pendingApprovals: 0,
    todayActivity: 0,
    totalRequests: 0,
    totalNotifications: 0,
    proMembers: 0,
    totalSessions: 0
  })
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7))
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showMonthlyReport, setShowMonthlyReport] = useState(false)
  const [proDateFrom, setProDateFrom] = useState("")
  const [proDateTo, setProDateTo] = useState("")
  const [showProDateFilter, setShowProDateFilter] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [pendingStatusChange, setPendingStatusChange] = useState<{ userId: string, newStatus: string } | null>(null)

  // Fetch all data
  useEffect(() => {
    fetchData()
  }, [])

  // Export Functions
  const exportToJSON = (data: any, filename: string) => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('JSON report exported successfully!')
  }

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast.error('No data to export')
      return
    }
    
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    ).join('\n')
    
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success('CSV report exported successfully!')
  }

  const exportPatientsReport = () => {
    const patientsData = users.filter(u => u.role === 'user').map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone || 'N/A',
      Status: user.status,
      Membership: user.membership || 'Free',
      'Account Created': formatDateTime(user.createdAt),
      'Last Login': formatDateTime(user.lastLogin),
      'Pro Upgrade Date': user.membership === 'Pro' && user.membershipDate ? formatDateTime(user.membershipDate) : 'N/A',
      'Days Since Joined': user.createdAt ? (() => {
        let date: Date | null = null
        if (user.createdAt.seconds) {
          date = new Date(user.createdAt.seconds * 1000)
        } else if (typeof user.createdAt === 'string') {
          date = new Date(user.createdAt)
        }
        if (date && !isNaN(date.getTime())) {
          const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
          return days
        }
        return 'N/A'
      })() : 'N/A'
    }))
    return patientsData
  }

  const exportAllUsersReport = () => {
    const usersData = users.map(user => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone || 'N/A',
      Role: user.role,
      Status: user.status,
      Membership: user.membership || 'Free',
      'Account Created': formatDateTime(user.createdAt),
      'Last Login': formatDateTime(user.lastLogin),
      'Days Active': user.createdAt ? (() => {
        let date: Date | null = null
        if (user.createdAt.seconds) {
          date = new Date(user.createdAt.seconds * 1000)
        } else if (typeof user.createdAt === 'string') {
          date = new Date(user.createdAt)
        }
        if (date && !isNaN(date.getTime())) {
          return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
        }
        return 'N/A'
      })() : 'N/A'
    }))
    return usersData
  }

  const exportMonthlyStatsReport = () => {
    return monthlyStats.map(month => ({
      Month: month.month,
      'New Users': month.newUsers,
      'New Patients': month.newPatients,
      'New Doctors': month.newDoctors,
      'Pro Upgrades': month.proUpgrades,
      'Total Sessions': month.totalSessions,
      'Active Users': month.activeUsers
    }))
  }

  const exportFullReport = () => {
    const fullReport = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalUsers: stats.totalUsers,
        activeUsers: stats.activeUsers,
        totalPhysios: stats.totalPhysios,
        totalTrainers: stats.totalTrainers,
        pendingApprovals: stats.pendingApprovals,
        totalRequests: stats.totalRequests,
        totalNotifications: stats.totalNotifications,
        proMembers: stats.proMembers,
        totalSessions: stats.totalSessions
      },
      patients: {
        total: users.filter(u => u.role === 'user').length,
        active: users.filter(u => u.role === 'user' && u.status === 'active').length,
        pro: users.filter(u => u.role === 'user' && u.membership === 'Pro').length,
        new30Days: users.filter(u => {
          if (u.role !== 'user') return false
          let createdDate
          if (u.createdAt?.seconds) {
            createdDate = new Date(u.createdAt.seconds * 1000)
          } else if (u.createdAt) {
            createdDate = new Date(u.createdAt)
          }
          if (!createdDate) return false
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return createdDate >= thirtyDaysAgo
        }).length
      },
      monthlyStats: monthlyStats,
      users: users
    }
    return fullReport
  }

  // Filter users
  useEffect(() => {
    let filtered = users

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    setFilteredUsers(filtered)
  }, [users, searchQuery, roleFilter, statusFilter])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch users (force fresh data from server, not cache)
      const usersSnapshot = await getDocs(collection(db, "users"))
      const usersData = usersSnapshot.docs.map(doc => {
        const data = doc.data()
        console.log(`User ${data.name || data.email}: membershipDate =`, data.membershipDate)
        return {
          id: doc.id,
          name: data.name || data.email,
          email: data.email,
          role: data.role || "user",
          status: data.status || (data.isActive ? "active" : "inactive"),
          phone: data.phone,
          createdAt: data.createdAt,
          lastLogin: data.lastLogin,
          membership: data.membership,
          membershipDate: data.membershipDate  // ⭐ زیادکراوە!
        }
      })
      
      setUsers(usersData)
      setFilteredUsers(usersData)

      // Calculate stats
      const activeCount = usersData.filter(u => u.status === "active").length
      const physioCount = usersData.filter(u => u.role === "physiotherapist" || u.role === "admin-physiotherapist").length
      const trainerCount = usersData.filter(u => u.role === "trainer").length
      const proCount = usersData.filter(u => u.membership === "Pro").length

      // Get pending approvals
      const requestsSnapshot = await getDocs(collection(db, "doctor_requests"))
      const pendingCount = requestsSnapshot.docs.filter(doc => doc.data().status === "pending").length

      // Get physio requests
      const physioRequestsSnapshot = await getDocs(collection(db, "physio-requests"))
      
      // Get notifications
      const notificationsSnapshot = await getDocs(collection(db, "notifications"))

      // Get sessions (if available)
      let sessionsCount = 0
      try {
        const sessionsSnapshot = await getDocs(collection(db, "sessions"))
        sessionsCount = sessionsSnapshot.docs.length
      } catch (e) {
        console.log("Sessions collection not available")
      }

      setStats({
        totalUsers: usersData.length,
        activeUsers: activeCount,
        totalPhysios: physioCount,
        totalTrainers: trainerCount,
        pendingApprovals: pendingCount,
        todayActivity: 0,
        totalRequests: physioRequestsSnapshot.docs.length,
        totalNotifications: notificationsSnapshot.docs.length,
        proMembers: proCount,
        totalSessions: sessionsCount
      })

      // Calculate monthly stats
      await calculateMonthlyStats(usersData)

    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const calculateMonthlyStats = async (usersData: any[]) => {
    try {
      const monthlyData: { [key: string]: MonthlyStats } = {}
      
      // Get last 12 months
      const now = new Date()
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const monthKey = date.toISOString().slice(0, 7)
        monthlyData[monthKey] = {
          month: monthKey,
          newUsers: 0,
          newPatients: 0,
          newDoctors: 0,
          proUpgrades: 0,
          totalSessions: 0,
          activeUsers: 0
        }
      }

      // Count new users per month
      usersData.forEach(user => {
        if (user.createdAt) {
          let createdDate
          if (user.createdAt.seconds) {
            createdDate = new Date(user.createdAt.seconds * 1000)
          } else if (typeof user.createdAt === 'string') {
            createdDate = new Date(user.createdAt)
          }
          
          if (createdDate) {
            const monthKey = createdDate.toISOString().slice(0, 7)
            if (monthlyData[monthKey]) {
              monthlyData[monthKey].newUsers++
              
              // Count by role
              if (user.role === "user") {
                monthlyData[monthKey].newPatients++
              } else if (user.role === "physiotherapist" || user.role === "admin-physiotherapist") {
                monthlyData[monthKey].newDoctors++
              }
              
              // Count pro members
              if (user.membership === "Pro") {
                monthlyData[monthKey].proUpgrades++
              }
              
              // Count active users
              if (user.status === "active") {
                monthlyData[monthKey].activeUsers++
              }
            }
          }
        }
      })

      // Get sessions per month
      try {
        const sessionsSnapshot = await getDocs(collection(db, "sessions"))
        sessionsSnapshot.docs.forEach(doc => {
          const data = doc.data()
          if (data.createdAt) {
            let createdDate
            if (data.createdAt.seconds) {
              createdDate = new Date(data.createdAt.seconds * 1000)
            } else if (typeof data.createdAt === 'string') {
              createdDate = new Date(data.createdAt)
            }
            
            if (createdDate) {
              const monthKey = createdDate.toISOString().slice(0, 7)
              if (monthlyData[monthKey]) {
                monthlyData[monthKey].totalSessions++
              }
            }
          }
        })
      } catch (e) {
        console.log("Sessions collection not available")
      }

      setMonthlyStats(Object.values(monthlyData).sort((a, b) => b.month.localeCompare(a.month)))
    } catch (error) {
      console.error("Error calculating monthly stats:", error)
    }
  }

  const handleUpdateUserStatus = async (userId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        status: newStatus,
        isActive: newStatus === "active"
      })
      
      toast.success(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`)
      fetchData()
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Failed to update user status")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      await deleteDoc(doc(db, "users", userId))
      toast.success("User deleted successfully")
      fetchData()
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Failed to delete user")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "from-amber-500 to-orange-500"
      case "superadmin":
        return "from-purple-500 to-pink-500"
      case "admin-physiotherapist":
        return "from-cyan-500 to-blue-500"
      case "physiotherapist":
        return "from-green-500 to-emerald-500"
      case "trainer":
        return "from-blue-500 to-indigo-500"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="w-4 h-4" />
      case "superadmin":
        return <Shield className="w-4 h-4" />
      case "admin-physiotherapist":
        return <Activity className="w-4 h-4" />
      case "physiotherapist":
        return <Activity className="w-4 h-4" />
      case "trainer":
        return <Users className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const formatDate = (dateField: any) => {
    if (!dateField) return "N/A"
    
    let date: Date | null = null
    
    // Handle Firestore Timestamp
    if (dateField.seconds) {
      date = new Date(dateField.seconds * 1000)
    }
    // Handle ISO string
    else if (typeof dateField === "string") {
      date = new Date(dateField)
    }
    // Handle Date object
    else if (dateField instanceof Date) {
      date = dateField
    }
    
    if (!date || isNaN(date.getTime())) return "N/A"
    
    // Format: DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    
    return `${day}/${month}/${year}`
  }

  const formatDateTime = (dateField: any) => {
    if (!dateField) return "N/A"
    
    let date: Date | null = null
    
    // Handle Firestore Timestamp
    if (dateField.seconds) {
      date = new Date(dateField.seconds * 1000)
    }
    // Handle ISO string
    else if (typeof dateField === "string") {
      date = new Date(dateField)
    }
    // Handle Date object
    else if (dateField instanceof Date) {
      date = dateField
    }
    
    if (!date || isNaN(date.getTime())) return "N/A"
    
    // Format: DD/MM/YYYY HH:MM
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const formatDateForInput = (dateField: any) => {
    if (!dateField) return ""
    
    let date: Date | null = null
    
    if (dateField.seconds) {
      date = new Date(dateField.seconds * 1000)
    } else if (typeof dateField === "string") {
      date = new Date(dateField)
    } else if (dateField instanceof Date) {
      date = dateField
    }
    
    if (!date || isNaN(date.getTime())) return ""
    
    // Format: YYYY-MM-DD (for input type="date")
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    
    return `${year}-${month}-${day}`
  }

  if (loading) {
    return (
      <AuthGuard allowedRoles={["owner"]}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading Dashboard...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard allowedRoles={["owner"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      Owner Dashboard
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </h1>
                  <p className="text-slate-400 text-sm">Complete System Control</p>
                </div>
              </div>
              <Button
                onClick={async () => {
                  try {
                    console.log('🔐 Starting logout...')
                    
                    // 1. Clear storage FIRST (before signOut)
                    localStorage.clear()
                    sessionStorage.clear()
                    console.log('✅ Storage cleared')
                    
                    // 2. Sign out from Firebase and WAIT
                    const { signOut } = await import('firebase/auth')
                    const { auth } = await import('@/lib/firebase')
                    await signOut(auth)
                    console.log('✅ Firebase signed out')
                    
                    toast.success('چوویتە دەرەوە بە سەرکەوتوویی! 👋')
                    
                    // 3. Small delay to ensure Firebase state update propagates
                    await new Promise(resolve => setTimeout(resolve, 100))
                    
                    // 4. Force redirect
                    window.location.replace('/giris')
                  } catch (error) {
                    console.error('❌ Logout error:', error)
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.replace('/giris')
                  }
                }}
                variant="outline"
                className="border-white/20 hover:border-red-400/50 hover:bg-red-500/10 hover:scale-105 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                چوونەدەرەوە
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Navigation Menu */}
          <div className="mb-8 flex gap-3 flex-wrap">
            <Button
              onClick={() => setActiveTab("dashboard")}
              variant={activeTab === "dashboard" ? "default" : "outline"}
              className={activeTab === "dashboard" ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30" : "border-white/20 hover:border-amber-400/50"}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              onClick={() => setActiveTab("analytics")}
              variant={activeTab === "analytics" ? "default" : "outline"}
              className={activeTab === "analytics" ? "bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/30" : "border-white/20 hover:border-pink-400/50"}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button
              onClick={() => setActiveTab("patients")}
              variant={activeTab === "patients" ? "default" : "outline"}
              className={activeTab === "patients" ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30" : "border-white/20 hover:border-emerald-400/50"}
            >
              <Heart className="w-4 h-4 mr-2" />
              Patients ({users.filter(u => u.role === 'user').length})
            </Button>
            <Button
              onClick={() => setActiveTab("users")}
              variant={activeTab === "users" ? "default" : "outline"}
              className={activeTab === "users" ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30" : "border-white/20 hover:border-cyan-400/50"}
            >
              <Users className="w-4 h-4 mr-2" />
              All Users ({users.length})
            </Button>
            <Button
              onClick={() => setActiveTab("reports")}
              variant={activeTab === "reports" ? "default" : "outline"}
              className={activeTab === "reports" ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30" : "border-white/20 hover:border-indigo-400/50"}
            >
              <FileText className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button
              onClick={() => setActiveTab("activity")}
              variant={activeTab === "activity" ? "default" : "outline"}
              className={activeTab === "activity" ? "bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30" : "border-white/20 hover:border-green-400/50"}
            >
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </Button>
            <Button
              onClick={() => setActiveTab("settings")}
              variant={activeTab === "settings" ? "default" : "outline"}
              className={activeTab === "settings" ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30" : "border-white/20 hover:border-purple-400/50"}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Users */}
                <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-cyan-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        Total
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                      <p className="text-slate-400 text-sm">Total Users</p>
                    </div>
                  </div>
                </Card>

                {/* Active Users */}
                <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-green-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
                      <p className="text-slate-400 text-sm">Active Users</p>
                    </div>
                  </div>
                </Card>

                {/* Physiotherapists */}
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Medical
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.totalPhysios}</p>
                      <p className="text-slate-400 text-sm">Physiotherapists</p>
                    </div>
                  </div>
                </Card>

                {/* Trainers */}
                <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-purple-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Fitness
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.totalTrainers}</p>
                      <p className="text-slate-400 text-sm">Trainers</p>
                    </div>
                  </div>
                </Card>

                {/* Pending Approvals */}
                <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-orange-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                        <AlertCircle className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        Pending
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.pendingApprovals}</p>
                      <p className="text-slate-400 text-sm">Pending Approvals</p>
                    </div>
                  </div>
                </Card>

                {/* System Health */}
                <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-amber-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">100%</p>
                      <p className="text-slate-400 text-sm">System Health</p>
                    </div>
                  </div>
                </Card>

                {/* Total Requests */}
                <Card className="p-6 bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-rose-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/50">
                        <ClipboardList className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                        Requests
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.totalRequests}</p>
                      <p className="text-slate-400 text-sm">Total Requests</p>
                    </div>
                  </div>
                </Card>

                {/* Pro Members */}
                <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-yellow-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Premium
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.proMembers}</p>
                      <p className="text-slate-400 text-sm">Pro Members</p>
                    </div>
                  </div>
                </Card>

                {/* Total Sessions */}
                <Card className="p-6 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-teal-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/50">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                        Sessions
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{stats.totalSessions}</p>
                      <p className="text-slate-400 text-sm">Total Sessions</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setActiveTab("users")}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/30"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button
                    onClick={fetchData}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button
                    onClick={() => setActiveTab("settings")}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/30"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Month Selector */}
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-pink-400" />
                    Monthly Analytics
                  </h2>
                  <div className="flex items-center gap-3">
                    <input
                      type="month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white [color-scheme:dark]"
                    />
                    <Button
                      onClick={fetchData}
                      className="bg-gradient-to-r from-pink-500 to-rose-500"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-3 mb-6 flex-wrap">
                  <Button
                    onClick={() => exportToCSV(exportMonthlyStatsReport(), 'monthly_analytics')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Monthly Stats (CSV)
                  </Button>
                  <Button
                    onClick={() => exportToJSON(exportMonthlyStatsReport(), 'monthly_analytics')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Monthly Stats (JSON)
                  </Button>
                </div>

                {/* Monthly Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {monthlyStats.slice(0, 1).map(month => (
                    <div key={month.month} className="contents">
                      <Card className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <UserPlus className="w-5 h-5 text-cyan-400" />
                          <span className="text-slate-400 text-sm">New Users</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{month.newUsers}</p>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Heart className="w-5 h-5 text-green-400" />
                          <span className="text-slate-400 text-sm">New Patients</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{month.newPatients}</p>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="w-5 h-5 text-blue-400" />
                          <span className="text-slate-400 text-sm">New Doctors</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{month.newDoctors}</p>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="w-5 h-5 text-yellow-400" />
                          <span className="text-slate-400 text-sm">Pro Upgrades</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{month.proUpgrades}</p>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-purple-400" />
                          <span className="text-slate-400 text-sm">Sessions</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{month.totalSessions}</p>
                      </Card>

                      <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-orange-400" />
                          <span className="text-slate-400 text-sm">Active Users</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{month.activeUsers}</p>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Monthly Trends */}
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Last 12 Months Trends
                </h3>
                <div className="space-y-4">
                  {monthlyStats.map((month, index) => (
                    <div key={month.month} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{month.month}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-cyan-400">{month.newUsers} users</span>
                          <span className="text-green-400">{month.newPatients} patients</span>
                          <span className="text-blue-400">{month.newDoctors} doctors</span>
                          <span className="text-yellow-400">{month.proUpgrades} pro</span>
                          <span className="text-purple-400">{month.totalSessions} sessions</span>
                        </div>
                      </div>
                      <div className="relative h-8 bg-slate-800/50 rounded-lg overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                          style={{ width: `${(month.newUsers / Math.max(...monthlyStats.map(m => m.newUsers)) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-indigo-400" />
                  Comprehensive Reports
                </h2>

                {/* Report Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* User Statistics */}
                  <Card className="p-6 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-cyan-400" />
                      User Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Users</span>
                        <span className="text-white font-bold">{stats.totalUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Active Users</span>
                        <span className="text-green-400 font-bold">{stats.activeUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Inactive Users</span>
                        <span className="text-red-400 font-bold">{stats.totalUsers - stats.activeUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Pro Members</span>
                        <span className="text-yellow-400 font-bold">{stats.proMembers}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Staff Statistics */}
                  <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-blue-500/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-blue-400" />
                      Staff Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Physiotherapists</span>
                        <span className="text-white font-bold">{stats.totalPhysios}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Trainers</span>
                        <span className="text-purple-400 font-bold">{stats.totalTrainers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Pending Approvals</span>
                        <span className="text-orange-400 font-bold">{stats.pendingApprovals}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Staff</span>
                        <span className="text-white font-bold">{stats.totalPhysios + stats.totalTrainers}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Activity Statistics */}
                  <Card className="p-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-400" />
                      Activity Statistics
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Requests</span>
                        <span className="text-white font-bold">{stats.totalRequests}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Sessions</span>
                        <span className="text-purple-400 font-bold">{stats.totalSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Total Notifications</span>
                        <span className="text-cyan-400 font-bold">{stats.totalNotifications}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Pending Actions</span>
                        <span className="text-orange-400 font-bold">{stats.pendingApprovals}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Monthly Summary */}
                  <Card className="p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      This Month Summary
                    </h3>
                    {monthlyStats[0] && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">New Users</span>
                          <span className="text-cyan-400 font-bold">{monthlyStats[0].newUsers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">New Patients</span>
                          <span className="text-green-400 font-bold">{monthlyStats[0].newPatients}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">New Doctors</span>
                          <span className="text-blue-400 font-bold">{monthlyStats[0].newDoctors}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Pro Upgrades</span>
                          <span className="text-yellow-400 font-bold">{monthlyStats[0].proUpgrades}</span>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button 
                    onClick={() => exportToJSON(exportFullReport(), 'full_system_report')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Full Report (JSON)
                  </Button>
                  <Button 
                    onClick={() => exportToCSV(exportAllUsersReport(), 'all_users_report')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Users (CSV)
                  </Button>
                  <Button 
                    onClick={() => exportToCSV(exportMonthlyStatsReport(), 'monthly_statistics')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Analytics (CSV)
                  </Button>
                  <Button 
                    onClick={() => {
                      const summary = {
                        'Report Generated': new Date().toISOString(),
                        'Total Users': stats.totalUsers,
                        'Active Users': stats.activeUsers,
                        'Total Physiotherapists': stats.totalPhysios,
                        'Total Trainers': stats.totalTrainers,
                        'Pending Approvals': stats.pendingApprovals,
                        'Total Requests': stats.totalRequests,
                        'Pro Members': stats.proMembers,
                        'Total Sessions': stats.totalSessions,
                        'Total Notifications': stats.totalNotifications
                      }
                      const text = Object.entries(summary).map(([key, value]) => `${key}: ${value}`).join('\n')
                      const blob = new Blob([text], { type: 'text/plain' })
                      const url = URL.createObjectURL(blob)
                      const link = document.createElement('a')
                      link.href = url
                      link.download = `summary_report_${new Date().toISOString().split('T')[0]}.txt`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                      URL.revokeObjectURL(url)
                      toast.success('Summary report exported!')
                    }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/30"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Export Summary (TXT)
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Patients Tab */}
          {activeTab === "patients" && (
            <div className="space-y-6">
              {/* Patient Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/50">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        Total
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 'user').length}</p>
                      <p className="text-slate-400 text-sm">Total Patients</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-green-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 'user' && u.status === 'active').length}</p>
                      <p className="text-slate-400 text-sm">Active Patients</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-yellow-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Premium
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{users.filter(u => u.role === 'user' && u.membership === 'Pro').length}</p>
                      <p className="text-slate-400 text-sm">Pro Patients</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-orange-500/20 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        Recent
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-white">{users.filter(u => {
                        if (u.role !== 'user') return false
                        let createdDate
                        if (u.createdAt?.seconds) {
                          createdDate = new Date(u.createdAt.seconds * 1000)
                        } else if (u.createdAt) {
                          createdDate = new Date(u.createdAt)
                        }
                        if (!createdDate) return false
                        const thirtyDaysAgo = new Date()
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                        return createdDate >= thirtyDaysAgo
                      }).length}</p>
                      <p className="text-slate-400 text-sm">New (30 days)</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Export Buttons for Patients */}
              <Card className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">Export Patients Report</h3>
                  </div>
                  <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
                    {users.filter(u => u.role === 'user').length} Patients
                  </Badge>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={() => exportToCSV(exportPatientsReport(), 'patients_report')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button
                    onClick={() => exportToJSON(exportPatientsReport(), 'patients_report')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                  <Button
                    onClick={() => {
                      const proPatients = users.filter(u => u.role === 'user' && u.membership === 'Pro').map(user => ({
                        Name: user.name,
                        Email: user.email,
                        Phone: user.phone || 'N/A',
                        'Pro Since': formatDate(user.membershipDate)
                      }))
                      exportToCSV(proPatients, 'pro_patients_report')
                    }}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-lg shadow-yellow-500/30"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Export Pro Only
                  </Button>
                </div>
              </Card>

              {/* Search and Filters for Patients */}
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search patients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-900/50 border-white/10 text-white"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <select
                    className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white"
                    onChange={(e) => {
                      if (e.target.value === 'all') {
                        setFilteredUsers(users.filter(u => u.role === 'user'))
                      } else if (e.target.value === 'pro') {
                        setFilteredUsers(users.filter(u => u.role === 'user' && u.membership === 'Pro'))
                      } else if (e.target.value === 'free') {
                        setFilteredUsers(users.filter(u => u.role === 'user' && u.membership !== 'Pro'))
                      }
                    }}
                  >
                    <option value="all">All Memberships</option>
                    <option value="pro">Pro Members</option>
                    <option value="free">Free Members</option>
                  </select>
                </div>
              </Card>

              {/* Pro Date Range Filter */}
              <Card className="p-6 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-xl relative overflow-hidden group hover:shadow-xl hover:shadow-yellow-500/20 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Pro Upgrade Date Filter</h3>
                        <p className="text-xs text-slate-400">Filter patients by their Pro membership upgrade date</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowProDateFilter(!showProDateFilter)}
                      variant="outline"
                      size="sm"
                      className="border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all"
                    >
                      {showProDateFilter ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Hide
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          Show
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {showProDateFilter && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Quick Presets */}
                      <div className="space-y-3">
                        <Label className="text-white font-medium text-sm flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          Quick Date Ranges
                        </Label>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            onClick={() => {
                              const today = new Date()
                              const lastWeek = new Date()
                              lastWeek.setDate(today.getDate() - 7)
                              setProDateFrom(formatDateForInput({ seconds: lastWeek.getTime() / 1000 }))
                              setProDateTo(formatDateForInput({ seconds: today.getTime() / 1000 }))
                            }}
                            variant="outline"
                            size="sm"
                            className="border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-500/50 text-yellow-400 hover:text-yellow-300"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            Last 7 Days
                          </Button>
                          <Button
                            onClick={() => {
                              const today = new Date()
                              const lastMonth = new Date()
                              lastMonth.setDate(today.getDate() - 30)
                              setProDateFrom(formatDateForInput({ seconds: lastMonth.getTime() / 1000 }))
                              setProDateTo(formatDateForInput({ seconds: today.getTime() / 1000 }))
                            }}
                            variant="outline"
                            size="sm"
                            className="border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-500/50 text-amber-400 hover:text-amber-300"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            Last 30 Days
                          </Button>
                          <Button
                            onClick={() => {
                              const today = new Date()
                              const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
                              setProDateFrom(formatDateForInput({ seconds: firstDayOfMonth.getTime() / 1000 }))
                              setProDateTo(formatDateForInput({ seconds: today.getTime() / 1000 }))
                            }}
                            variant="outline"
                            size="sm"
                            className="border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500/50 text-orange-400 hover:text-orange-300"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            This Month
                          </Button>
                          <Button
                            onClick={() => {
                              const today = new Date()
                              const firstDayOfYear = new Date(today.getFullYear(), 0, 1)
                              setProDateFrom(formatDateForInput({ seconds: firstDayOfYear.getTime() / 1000 }))
                              setProDateTo(formatDateForInput({ seconds: today.getTime() / 1000 }))
                            }}
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50 text-purple-400 hover:text-purple-300"
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            This Year
                          </Button>
                        </div>
                      </div>

                      {/* Professional Date Range Picker */}
                      <div className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-yellow-500/20 rounded-2xl">
                        <Label className="text-white font-semibold text-base flex items-center gap-2 mb-5">
                          <Calendar className="w-5 h-5 text-yellow-400" />
                          Select Date Range
                        </Label>
                        
                        <div className="relative">
                          {/* Date Range Container */}
                          <div className="flex items-center gap-4">
                            {/* From Date */}
                            <div className="flex-1 space-y-2">
                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all"></div>
                                <div className="relative">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-lg">
                                      <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-yellow-400 font-medium text-sm">From</span>
                                  </div>
                                  <input
                                    type="date"
                                    value={proDateFrom}
                                    onChange={(e) => setProDateFrom(e.target.value)}
                                    max={proDateTo || undefined}
                                    className="w-full pl-28 pr-4 py-4 bg-slate-900/90 border-2 border-yellow-500/40 rounded-xl text-white font-medium placeholder:text-slate-500 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all [color-scheme:dark] shadow-inner"
                                  />
                                </div>
                              </div>
                              {proDateFrom && (
                                <div className="flex items-center gap-2 pl-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                  <span className="text-sm text-slate-300 font-medium">
                                    {formatDate({ seconds: new Date(proDateFrom).getTime() / 1000 })}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Arrow Separator */}
                            <div className="flex flex-col items-center gap-1 px-2">
                              <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-full"></div>
                              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 shadow-lg shadow-yellow-500/50 animate-pulse"></div>
                              <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-full"></div>
                            </div>

                            {/* To Date */}
                            <div className="flex-1 space-y-2">
                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all"></div>
                                <div className="relative">
                                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                                      <Calendar className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-amber-400 font-medium text-sm">To</span>
                                  </div>
                                  <input
                                    type="date"
                                    value={proDateTo}
                                    onChange={(e) => setProDateTo(e.target.value)}
                                    min={proDateFrom || undefined}
                                    className="w-full pl-24 pr-4 py-4 bg-slate-900/90 border-2 border-amber-500/40 rounded-xl text-white font-medium placeholder:text-slate-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 transition-all [color-scheme:dark] shadow-inner"
                                  />
                                </div>
                              </div>
                              {proDateTo && (
                                <div className="flex items-center gap-2 pl-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                  <span className="text-sm text-slate-300 font-medium">
                                    {formatDate({ seconds: new Date(proDateTo).getTime() / 1000 })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Results Display */}
                      {proDateFrom && proDateTo && (() => {
                        const filteredCount = users.filter(u => {
                          if (u.role !== 'user' || u.membership !== 'Pro' || !u.membershipDate) return false
                          let memberDate
                          if (u.membershipDate.seconds) {
                            memberDate = new Date(u.membershipDate.seconds * 1000)
                          } else if (typeof u.membershipDate === 'string') {
                            memberDate = new Date(u.membershipDate)
                          }
                          if (!memberDate || isNaN(memberDate.getTime())) return false
                          const from = new Date(proDateFrom)
                          const to = new Date(proDateTo)
                          from.setHours(0, 0, 0, 0)
                          to.setHours(23, 59, 59, 999)
                          return memberDate >= from && memberDate <= to
                        }).length
                        
                        return (
                          <div className="p-5 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex-1 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-8 h-8 rounded-lg bg-yellow-500/30 flex items-center justify-center">
                                    <Filter className="w-4 h-4 text-yellow-400" />
                                  </div>
                                  <span className="text-white font-bold text-lg">Filter Active</span>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-300 text-sm">
                                      <span className="text-yellow-400 font-semibold">
                                        {formatDate({ seconds: new Date(proDateFrom).getTime() / 1000 })}
                                      </span>
                                      {' to '}
                                      <span className="text-amber-400 font-semibold">
                                        {formatDate({ seconds: new Date(proDateTo).getTime() / 1000 })}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-400 text-xs">
                                      {Math.ceil((new Date(proDateTo).getTime() - new Date(proDateFrom).getTime()) / (1000 * 60 * 60 * 24))} days period
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-yellow-500/30 text-yellow-300 border-yellow-500/50 text-lg py-2 px-5 font-bold">
                                    <Award className="w-5 h-5 mr-2" />
                                    {filteredCount} {filteredCount === 1 ? 'User' : 'Users'}
                                  </Badge>
                                </div>
                                <span className="text-slate-400 text-sm">upgraded to Pro in this period</span>
                              </div>
                            </div>
                          </div>
                        )
                      })()}

                      {/* Actions */}
                      <div className="flex gap-3 flex-wrap">
                        <Button
                          onClick={() => {
                            setProDateFrom("")
                            setProDateTo("")
                            toast.success('Date filter cleared')
                          }}
                          variant="outline"
                          className="border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-all"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Clear Filter
                        </Button>
                        {proDateFrom && proDateTo && (
                          <Button
                            onClick={() => {
                              const filtered = users.filter(u => {
                                if (u.role !== 'user' || u.membership !== 'Pro' || !u.membershipDate) return false
                                let memberDate
                                if (u.membershipDate.seconds) {
                                  memberDate = new Date(u.membershipDate.seconds * 1000)
                                } else if (typeof u.membershipDate === 'string') {
                                  memberDate = new Date(u.membershipDate)
                                }
                                if (!memberDate || isNaN(memberDate.getTime())) return false
                                const from = new Date(proDateFrom)
                                const to = new Date(proDateTo)
                                from.setHours(0, 0, 0, 0)
                                to.setHours(23, 59, 59, 999)
                                return memberDate >= from && memberDate <= to
                              }).map(u => ({
                                Name: u.name,
                                Email: u.email,
                                Phone: u.phone || 'N/A',
                                'Pro Upgrade Date': formatDateTime(u.membershipDate),
                                'Days as Pro': (() => {
                                  let date: Date | null = null
                                  if (u.membershipDate?.seconds) {
                                    date = new Date(u.membershipDate.seconds * 1000)
                                  } else if (u.membershipDate) {
                                    date = new Date(u.membershipDate)
                                  }
                                  if (date && !isNaN(date.getTime())) {
                                    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
                                  }
                                  return 'N/A'
                                })()
                              }))
                              exportToCSV(filtered, `pro_upgrades_${proDateFrom}_to_${proDateTo}`)
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Export Filtered Results
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Debug Info - Show all Pro Users */}
              {proDateFrom && proDateTo && (() => {
                const allProUsers = users.filter(u => u.role === 'user' && u.membership === 'Pro')
                const proUsersWithoutDate = allProUsers.filter(u => !u.membershipDate)
                const proUsersWithDate = allProUsers.filter(u => u.membershipDate)
                
                return (
                  <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Award className="w-5 h-5 text-cyan-400" />
                          دۆخی یوزەرە پرۆکان لە دەیتابەیس
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">پیشاندانی هۆکاری ئەوەی بۆچی هەندێک یوزەر لە ئەنجامی فلتەرکراودا نایەن</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          کۆ: {allProUsers.length}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          بەرواریان هەیە: {proUsersWithDate.length}
                        </Badge>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          بەرواریان نییە: {proUsersWithoutDate.length}
                        </Badge>
                      </div>
                    </div>

                    {proUsersWithoutDate.length > 0 && (
                      <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-bold mb-1">⚠️ بەرواری پرۆ بوون نییە!</h4>
                            <p className="text-slate-300 text-sm mb-3 text-right" dir="rtl">
                              {proUsersWithoutDate.length} یوزەری پرۆ بەرواری پرۆبوونیان نییە. 
                              ئەم یوزەرانە لە فلتەری بەروار دا نایەن. بۆ چارەسەرکردنی ئۆتۆماتیک کلیک لە خوارەوە بکە.
                            </p>
                            <Button
                              onClick={async (e) => {
                                const btn = e.currentTarget
                                btn.disabled = true
                                const originalText = btn.textContent
                                btn.textContent = '⏳ چاوەڕێ بکە...'
                                
                                try {
                                  console.log('='.repeat(60))
                                  console.log('🔄 دەستپێکردنی چاککردنەوەی بەرواری پرۆ')
                                  console.log('یوزەرەکان کە بەرواریان نییە:', proUsersWithoutDate.length)
                                  
                                  let updated = 0
                                  let failed = 0
                                  
                                  // Update each user with serverTimestamp
                                  for (const user of proUsersWithoutDate) {
                                    try {
                                      console.log(`📝 نوێکردنەوەی ${user.name} (${user.id})`)
                                      const userRef = doc(db, "users", user.id)
                                      
                                      // Use serverTimestamp() which creates proper Firestore Timestamp
                                      await updateDoc(userRef, {
                                        membershipDate: serverTimestamp()
                                      })
                                      
                                      console.log(`✅ سەرکەوتوو: ${user.name}`)
                                      updated++
                                    } catch (error) {
                                      console.error(`❌ شکستی هێنا بۆ ${user.name}:`, error)
                                      failed++
                                    }
                                  }
                                  
                                  console.log('='.repeat(60))
                                  console.log(`✅ تەواو! سەرکەوتوو: ${updated}, شکستی هێنا: ${failed}`)
                                  console.log('='.repeat(60))
                                  
                                  if (updated > 0) {
                                    toast.success(`✅ بەرواری پرۆ بوون بۆ ${updated} یوزەر بە سەرکەوتوویی دانرا!`)
                                  }
                                  
                                  if (failed > 0) {
                                    toast.error(`⚠️ ${failed} یوزەر شکستی هێنا`)
                                  }
                                  
                                  // Refresh data - wait longer for serverTimestamp to resolve
                                  setTimeout(() => {
                                    console.log('🔄 نوێکردنەوەی داتا لە Firestore (fresh from server)...')
                                    fetchData()
                                  }, 3000)  // چاوەڕێی 3 چرکە بۆ ئەوەی server timestamp تەواو بێت
                                  
                                } catch (error: any) {
                                  console.error('❌ هەڵە:', error)
                                  toast.error('هەڵە: ' + (error?.message || 'Unknown error'))
                                } finally {
                                  setTimeout(() => {
                                    btn.disabled = false
                                    btn.textContent = originalText
                                  }, 2000)
                                }
                              }}
                              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              بەرواری ئێستا بۆ هەموویان دابنێ ({proUsersWithoutDate.length} یوزەر)
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {proUsersWithDate.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            یوزەرە پرۆکان کە بەرواریان هەیە ({proUsersWithDate.length})
                          </h4>
                          {proUsersWithDate.map(u => (
                            <div key={u.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-green-500/20 mb-2">
                              <div>
                                <span className="text-white font-medium">{u.name}</span>
                                <span className="text-slate-400 text-xs ml-2">({u.email})</span>
                              </div>
                              <div className="text-right">
                                <div className="text-green-400 text-sm font-medium">
                                  ✓ {formatDateTime(u.membershipDate)}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {u.membershipDate.seconds ? `کات: ${u.membershipDate.seconds}` : 'فۆرماتی تێکست'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {proUsersWithoutDate.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            یوزەرە پرۆکان کە بەرواریان نییە ({proUsersWithoutDate.length})
                          </h4>
                          {proUsersWithoutDate.map(u => (
                            <div key={u.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-red-500/20 mb-2">
                              <div>
                                <span className="text-white font-medium">{u.name}</span>
                                <span className="text-slate-400 text-xs ml-2">({u.email})</span>
                              </div>
                              <div className="text-right">
                                <span className="text-red-400 text-sm font-bold">❌ بەروار نییە</span>
                                <div className="text-xs text-slate-500">لە فلتەرکراودا نایەن</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {allProUsers.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                          <Award className="w-8 h-8 text-slate-600" />
                        </div>
                        <p className="text-slate-400">هیچ یوزەرێکی پرۆ لە دەیتابەیسدا نەدۆزرایەوە</p>
                      </div>
                    )}
                  </Card>
                )
              })()}

              {/* Patients List */}
              <div className="grid grid-cols-1 gap-4">
                {users.filter(user => {
                  if (user.role !== 'user') return false
                  
                  if (searchQuery) {
                    const query = searchQuery.toLowerCase()
                    if (!user.name.toLowerCase().includes(query) && !user.email.toLowerCase().includes(query)) {
                      return false
                    }
                  }
                  
                  if (statusFilter !== 'all' && user.status !== statusFilter) {
                    return false
                  }
                  
                  // Filter by Pro upgrade date range
                  if (proDateFrom && proDateTo) {
                    // Only filter if user is Pro and has membershipDate
                    if (user.membership === 'Pro' && user.membershipDate) {
                      let memberDate: Date | null = null
                      if (user.membershipDate.seconds) {
                        memberDate = new Date(user.membershipDate.seconds * 1000)
                      } else if (typeof user.membershipDate === 'string') {
                        memberDate = new Date(user.membershipDate)
                      }
                      
                      if (memberDate && !isNaN(memberDate.getTime())) {
                        const from = new Date(proDateFrom)
                        const to = new Date(proDateTo)
                        from.setHours(0, 0, 0, 0)
                        to.setHours(23, 59, 59, 999)
                        
                        // Check if memberDate is within range
                        if (memberDate >= from && memberDate <= to) {
                          return true // Include this user
                        } else {
                          return false // Exclude - outside date range
                        }
                      } else {
                        return false // Exclude - invalid date
                      }
                    } else {
                      return false // Exclude - not Pro or no membershipDate
                    }
                  }
                  
                  return true
                }).map((user) => (
                  <Card
                    key={user.id}
                    className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="w-14 h-14 border-2 border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                          <AvatarFallback className="text-white font-bold text-lg">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{user.name}</h3>
                            {user.membership === 'Pro' && (
                              <Badge className="gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 border-0 shadow-lg">
                                <Award className="w-3 h-3" />
                                Pro
                              </Badge>
                            )}
                            <Badge
                              className={
                                user.status === "active"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {user.status === "active" ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Inactive
                                </>
                              )}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {user.phone}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                              <span className="flex items-center gap-1" title={`Exact time: ${formatDateTime(user.createdAt)}`}>
                                <Calendar className="w-3 h-3" />
                                <span className="text-emerald-400 font-medium">Joined:</span> {formatDate(user.createdAt)}
                                <span className="text-xs text-slate-500">({(() => {
                                  let date: Date | null = null
                                  if (user.createdAt?.seconds) {
                                    date = new Date(user.createdAt.seconds * 1000)
                                  } else if (user.createdAt) {
                                    date = new Date(user.createdAt)
                                  }
                                  if (date && !isNaN(date.getTime())) {
                                    const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
                                    return `${days} days ago`
                                  }
                                  return ''
                                })()})</span>
                              </span>
                              {user.lastLogin && (
                                <span className="flex items-center gap-1" title={`Exact time: ${formatDateTime(user.lastLogin)}`}>
                                  <Clock className="w-3 h-3" />
                                  <span className="text-cyan-400 font-medium">Last:</span> {formatDate(user.lastLogin)}
                                </span>
                              )}
                              {user.membership === 'Pro' && user.membershipDate && (
                                <span className="flex items-center gap-1" title={`Exact time: ${formatDateTime(user.membershipDate)}`}>
                                  <Award className="w-3 h-3" />
                                  <span className="text-yellow-400 font-medium">Pro Since:</span> {formatDate(user.membershipDate)}
                                  <span className="text-xs text-slate-500">({(() => {
                                    let date: Date | null = null
                                    if (user.membershipDate?.seconds) {
                                      date = new Date(user.membershipDate.seconds * 1000)
                                    } else if (user.membershipDate) {
                                      date = new Date(user.membershipDate)
                                    }
                                    if (date && !isNaN(date.getTime())) {
                                      const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
                                      return `${days} days`
                                    }
                                    return ''
                                  })()})</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            setSelectedUser(user)
                            setDetailsDialogOpen(true)
                          }}
                          variant="outline"
                          size="sm"
                          className="border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:scale-105 transition-all"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          زانیاری تەواو
                        </Button>
                        {user.status === "active" ? (
                          <Button
                            onClick={() => handleUpdateUserStatus(user.id, "inactive")}
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUpdateUserStatus(user.id, "active")}
                            variant="outline"
                            size="sm"
                            className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
                          >
                            <Unlock className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {users.filter(u => u.role === 'user').length === 0 && (
                <Card className="p-12 bg-slate-900/50 border-white/10 backdrop-blur-xl text-center">
                  <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">No patients found</p>
                </Card>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Export Buttons for All Users */}
              <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Export Users Report</h3>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    {users.length} Total Users
                  </Badge>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={() => exportToCSV(exportAllUsersReport(), 'all_users_report')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All (CSV)
                  </Button>
                  <Button
                    onClick={() => exportToJSON(users, 'all_users_detailed')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/30"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export All (JSON)
                  </Button>
                  <Button
                    onClick={() => {
                      const activeUsers = users.filter(u => u.status === 'active').map(u => ({
                        Name: u.name,
                        Email: u.email,
                        Role: u.role,
                        'Last Login': formatDate(u.lastLogin)
                      }))
                      exportToCSV(activeUsers, 'active_users_report')
                    }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg shadow-green-500/30"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Export Active Only
                  </Button>
                </div>
              </Card>

              {/* Search and Filters */}
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-900/50 border-white/10 text-white"
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white"
                  >
                    <option value="all">All Roles</option>
                    <option value="owner">Owner</option>
                    <option value="superadmin">Superadmin</option>
                    <option value="admin-physiotherapist">Admin Physiotherapist</option>
                    <option value="physiotherapist">Physiotherapist</option>
                    <option value="trainer">Trainer</option>
                    <option value="user">User</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </Card>

              {/* Users List */}
              <div className="grid grid-cols-1 gap-4">
                {filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className={`w-14 h-14 border-2 bg-gradient-to-br ${getRoleColor(user.role)} shadow-lg`}>
                          <AvatarFallback className="text-white font-bold text-lg">
                            {user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{user.name}</h3>
                            <Badge className={`gap-1 bg-gradient-to-r ${getRoleColor(user.role)} border-0 shadow-lg`}>
                              {getRoleIcon(user.role)}
                              {user.role}
                            </Badge>
                            <Badge
                              className={
                                user.status === "active"
                                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                                  : "bg-red-500/20 text-red-400 border-red-500/30"
                              }
                            >
                              {user.status === "active" ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Inactive
                                </>
                              )}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {user.phone}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                              <span className="flex items-center gap-1" title={`Exact time: ${formatDateTime(user.createdAt)}`}>
                                <Calendar className="w-3 h-3" />
                                <span className="font-medium">Joined:</span> {formatDate(user.createdAt)}
                                <span className="text-xs text-slate-500">({(() => {
                                  let date: Date | null = null
                                  if (user.createdAt?.seconds) {
                                    date = new Date(user.createdAt.seconds * 1000)
                                  } else if (user.createdAt) {
                                    date = new Date(user.createdAt)
                                  }
                                  if (date && !isNaN(date.getTime())) {
                                    const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
                                    return `${days} days ago`
                                  }
                                  return ''
                                })()})</span>
                              </span>
                              {user.lastLogin && (
                                <span className="flex items-center gap-1" title={`Exact time: ${formatDateTime(user.lastLogin)}`}>
                                  <Clock className="w-3 h-3" />
                                  <span className="font-medium">Last:</span> {formatDate(user.lastLogin)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {user.status === "active" ? (
                          <Button
                            onClick={() => handleUpdateUserStatus(user.id, "inactive")}
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Deactivate
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUpdateUserStatus(user.id, "active")}
                            variant="outline"
                            size="sm"
                            className="border-green-500/30 hover:bg-green-500/10 hover:border-green-500/50"
                          >
                            <Unlock className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <Card className="p-12 bg-slate-900/50 border-white/10 backdrop-blur-xl text-center">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">No users found</p>
                </Card>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Activity Logs</h3>
                <p className="text-slate-400">Activity tracking feature coming soon</p>
              </div>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-xl">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">System Settings</h3>
                <p className="text-slate-400">Settings panel coming soon</p>
              </div>
            </Card>
          )}
        </div>

        {/* User Details Dialog */}
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border-2 border-emerald-500/40 text-white shadow-2xl shadow-emerald-500/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  زانیاری تەواوی پاتێنت
                </span>
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                هەموو زانیاریەکانی ئەم پاتێنتە لە خوارەوە پیشان دراوە
              </DialogDescription>
            </DialogHeader>

            {selectedUser && (
              <div className="space-y-6 mt-4">
                {/* User Avatar and Basic Info */}
                <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl">
                  <Avatar className="w-20 h-20 border-4 border-emerald-500 shadow-xl shadow-emerald-500/30">
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                      {selectedUser.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedUser.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedUser.membership === 'Pro' && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 border-0 shadow-lg">
                          <Award className="w-3 h-3 mr-1" />
                          Pro Member
                        </Badge>
                      )}
                      <Badge className={selectedUser.status === "active" 
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                      }>
                        {selectedUser.status === "active" ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            چالاک
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            ناچالاک
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-5 bg-slate-800/50 border-cyan-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">ئیمەیڵ</p>
                        <p className="text-white font-semibold">{selectedUser.email}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 bg-slate-800/50 border-purple-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">ژمارەی تەلەفۆن</p>
                        <p className="text-white font-semibold">{selectedUser.phone || 'نییە'}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Dates Information */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    زانیاری بەروار
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-emerald-500/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-400">بەرواری جۆین بوون:</span>
                      </div>
                      <span className="text-white font-semibold">{formatDateTime(selectedUser.createdAt)}</span>
                    </div>

                    {selectedUser.lastLogin && (
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-cyan-500/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-400">دوایین چوونەژوورەوە:</span>
                        </div>
                        <span className="text-white font-semibold">{formatDateTime(selectedUser.lastLogin)}</span>
                      </div>
                    )}

                    {selectedUser.membership === 'Pro' && selectedUser.membershipDate && (
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-yellow-500/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-400">بەرواری پرۆ بوون:</span>
                        </div>
                        <span className="text-white font-semibold">{formatDateTime(selectedUser.membershipDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setDetailsDialogOpen(false)}
                    variant="outline"
                    className="flex-1 border-2 border-slate-700 hover:bg-slate-800 hover:scale-105 transition-all"
                  >
                    داخستن
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Status Change Confirmation Dialog */}
        <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
          <DialogContent className="max-w-md bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 border-2 border-orange-500/40 text-white shadow-2xl shadow-orange-500/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  pendingStatusChange?.newStatus === 'active' 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-green-500/40'
                    : 'bg-gradient-to-br from-red-500 to-rose-500 shadow-red-500/40'
                }`}>
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  pendingStatusChange?.newStatus === 'active'
                    ? 'from-green-400 to-emerald-400'
                    : 'from-red-400 to-rose-400'
                }`}>
                  دڵنیابوونەوە
                </span>
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-right" dir="rtl">
                دڵنیایت لە گۆڕینی دۆخی ئەم یوزەرە؟
              </DialogDescription>
            </DialogHeader>

            {selectedUser && pendingStatusChange && (
              <div className="space-y-6 mt-4">
                {/* User Info */}
                <div className={`p-5 rounded-xl border-2 ${
                  pendingStatusChange.newStatus === 'active'
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12 border-2 border-white/20">
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
                        {selectedUser.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-white">{selectedUser.name}</h3>
                      <p className="text-sm text-slate-400">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-slate-400">دۆخی ئێستا:</span>
                    <Badge className={selectedUser.status === "active" 
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                    }>
                      {selectedUser.status === "active" ? "چالاک" : "ناچالاک"}
                    </Badge>
                    <span className="text-slate-500">→</span>
                    <Badge className={pendingStatusChange.newStatus === "active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                    }>
                      {pendingStatusChange.newStatus === "active" ? "چالاک" : "ناچالاک"}
                    </Badge>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-sm text-orange-300 text-center">
                    {pendingStatusChange.newStatus === 'active' 
                      ? '✅ ئەم یوزەرە دەتوانێت چووبێتە ژوورەوە و بەکاری بهێنێت'
                      : '🚫 ئەم یوزەرە ناتوانێت چووبێتە ژوورەوە تاوەکو دیسان چالاک بکرێتەوە'
                    }
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setStatusDialogOpen(false)
                      setPendingStatusChange(null)
                      setSelectedUser(null)
                    }}
                    variant="outline"
                    className="flex-1 border-2 border-slate-700 hover:bg-slate-800 hover:scale-105 transition-all"
                  >
                    پاشگەزبوونەوە
                  </Button>
                  <Button
                    onClick={async () => {
                      if (pendingStatusChange) {
                        await handleUpdateUserStatus(pendingStatusChange.userId, pendingStatusChange.newStatus)
                        setStatusDialogOpen(false)
                        setPendingStatusChange(null)
                        setSelectedUser(null)
                      }
                    }}
                    className={`flex-1 shadow-xl hover:scale-105 transition-all ${
                      pendingStatusChange.newStatus === 'active'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/40'
                        : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-red-500/40'
                    }`}
                  >
                    {pendingStatusChange.newStatus === 'active' ? (
                      <>
                        <Unlock className="w-4 h-4 mr-2" />
                        بەڵێ، چالاکی بکە
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        بەڵێ، ناچالاکی بکە
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AuthGuard>
  )
}
