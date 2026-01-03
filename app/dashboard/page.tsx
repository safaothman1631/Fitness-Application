"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { LayoutDashboard, Dumbbell, Utensils, HeartPulse, User, TrendingUp, Calendar, Award, Target, Bell, Crown, CheckCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SubscriptionWarning } from "@/components/subscription-warning"
import { checkSubscriptionStatus, getSubscriptionExpiry } from "@/lib/subscription"
import { PageTransition } from "@/components/page-transition"
import { BottomNav } from "@/components/bottom-nav"
import AuthGuard from "@/components/auth-guard"
import { toast } from "sonner"
import { firestoreProxy } from "@/lib/firestore-proxy"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { AdBanner } from "@/components/ad-banner"

function UserDashboard() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isActive: boolean
    isExpired: boolean
    daysRemaining: number
  } | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [requestingPro, setRequestingPro] = useState(false)
  const [hasActiveProRequest, setHasActiveProRequest] = useState(false)
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 0,
    activeStreak: 0,
    caloriesToday: 0,
    overallProgress: 0
  })
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "achievement",
      title: "Milestone Reached",
      message: "You've completed 20 workouts! Keep up the great work!",
      timestamp: "2024-11-09 15:30",
      isRead: false,
    },
    {
      id: "2",
      type: "reminder",
      title: "Workout Reminder",
      message: "Don't forget to complete your evening workout",
      timestamp: "2024-11-09 18:00",
      isRead: false,
    },
    {
      id: "3",
      type: "alert",
      title: "Progress Update",
      message: "You've lost 2kg this month. Great progress!",
      timestamp: "2024-11-08 10:00",
      isRead: true,
    },
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Mark notification as read when clicked
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  // Mark all as read when dialog opens
  const handleDialogOpen = (open: boolean) => {
    setNotificationOpen(open)
    if (open) {
      setTimeout(() => {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, isRead: true }))
        )
      }, 500) // Delay to show animation first
    }
  }

  const requestProUpgrade = async () => {
    if (!userData) return
    
    setRequestingPro(true)
    try {
      const userId = localStorage.getItem("userId")
      const response = await fetch('/api/pro-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          userEmail: userData.email || localStorage.getItem("userEmail"),
          userName: userData.name || "User",
          requestedDuration: 30
        })
      })

      if (response.ok) {
        toast.success('Pro upgrade request sent successfully!')
        setHasActiveProRequest(true)
      } else {
        const errorData = await response.json()
        if (errorData.error === 'You already have an active Pro request') {
          toast.error('You already have a pending Pro request')
          setHasActiveProRequest(true)
        } else if (errorData.error === 'You are already a Pro member') {
          toast.error('You are already a Pro member')
        } else {
          toast.error(errorData.error || 'Failed to send request')
        }
      }
    } catch (error) {
      console.error('Error requesting Pro upgrade:', error)
      toast.error('Failed to send Pro upgrade request')
    } finally {
      setRequestingPro(false)
    }
  }

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) router.push("/login")

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (userId) {
          const userData = await firestoreProxy.getDoc("users", userId)
          if (userData) {
            setUserData(userData)
            
            // Check for active Pro request
            const proRequestsResponse = await fetch(`/api/pro-requests`)
            if (proRequestsResponse.ok) {
              const proRequests = await proRequestsResponse.json()
              const userRequest = proRequests.find((r: any) => 
                r.userId === userId && r.status === 'pending'
              )
              setHasActiveProRequest(!!userRequest)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()

    // Fetch workout stats
    const fetchWorkoutStats = async () => {
      try {
        if (typeof window === 'undefined') return
        
        const userId = localStorage.getItem("userId")
        if (!userId) return
        
        // For now, set default values - will be replaced with real API calls later
        // TODO: Create /api/user/workout-stats endpoint
        setWorkoutStats({
          totalWorkouts: 0,
          activeStreak: 0,
          caloriesToday: 0,
          overallProgress: 0
        })
      } catch (error) {
        console.error('Error fetching workout stats:', error)
      }
    }

    fetchWorkoutStats()

    // Check subscription status
    const updateSubscriptionStatus = () => {
      const expiry = getSubscriptionExpiry()
      const status = checkSubscriptionStatus(expiry)
      setSubscriptionStatus(status)
      console.log('≡ƒôè Subscription Status:', status) // Debug log
    }

    // Initial check
    updateSubscriptionStatus()

    // Listen for storage changes (from test panel and login)
    const handleStorageChange = () => {
      console.log('≡ƒöä Storage changed, updating subscription...') // Debug log
      updateSubscriptionStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also check on component mount with small delay to ensure localStorage is ready
    const timer = setTimeout(updateSubscriptionStatus, 100)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearTimeout(timer)
    }
  }, [router])

  return (
    <AuthGuard requiredRole="user" allowedRoles={["user"]}>
    <>
    <PageTransition>
    <div className="min-h-screen bg-[#0E151B] text-white pb-24 px-4 pt-6">
      <div className="max-w-6xl mx-auto">
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
        
        {/* Ad Banner */}
        <AdBanner position="top" userType="all" />

        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] bg-clip-text text-transparent mb-2">
              {t("welcomeBackUser")}
            </h1>
            <p className="text-[#B6C4CF] mb-8">{t("readyForToday")}</p>
          </div>
          {userData?.membership !== 'Pro' && (
            <Button
              onClick={requestProUpgrade}
              disabled={requestingPro || hasActiveProRequest}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-500/50 transition-all disabled:opacity-50"
            >
              {hasActiveProRequest ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Request Pending
                </>
              ) : requestingPro ? (
                'Sending...'
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Request Pro
                </>
              )}
            </Button>
          )}
        </div>

        {/* Subscription Warning */}
        {subscriptionStatus?.isExpired && (
          <SubscriptionWarning variant="expired" />
        )}
        {subscriptionStatus && !subscriptionStatus.isExpired && subscriptionStatus.daysRemaining <= 7 && subscriptionStatus.daysRemaining > 0 && (
          <SubscriptionWarning variant="warning" daysRemaining={subscriptionStatus.daysRemaining} />
        )}

        {subscriptionStatus && !subscriptionStatus.isExpired && (
          <Card className="bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] border-none p-8 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white text-xl font-bold mb-2">{t("limitedOffer")}</h3>
              <p className="text-white/90 text-sm mb-4">{t("upgradeToday")}</p>
              <Button className="bg-white text-[#10B2E3] hover:bg-white/90 font-semibold">{t("now")}</Button>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatsCard icon={Dumbbell} label={t("totalWorkouts")} value={workoutStats.totalWorkouts.toString()} color="#10B2E3" />
          <StatsCard icon={Calendar} label={t("activeStreak")} value={`${workoutStats.activeStreak} ${t("days")}`} color="#15C1B4" />
          <StatsCard icon={Target} label={t("caloriesToday")} value={workoutStats.caloriesToday.toLocaleString()} color="#73E8FF" />
          <StatsCard icon={Award} label={t("overallProgress")} value={`${workoutStats.overallProgress}%`} color="#10B2E3" />
        </div>
      </div>

      {/* Notification Dialog */}
      <Dialog open={notificationOpen} onOpenChange={handleDialogOpen}>
        <DialogContent className="bg-[#101A23] border-[#2E3944] text-white max-w-[92vw] sm:max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#10B2E3]" />
              Notifications
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(16,178,227,0.2)] cursor-pointer group ${
                      notif.isRead 
                        ? "bg-[#0E151B] border-[#2E3944]" 
                        : "bg-gradient-to-r from-[#10B2E3]/10 to-[#73E8FF]/10 border-[#10B2E3]/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {notif.type === "achievement" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 flex items-center justify-center">
                            <Award className="w-4 h-4 text-yellow-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                          </div>
                        )}
                        {notif.type === "reminder" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-blue-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                          </div>
                        )}
                        {notif.type === "alert" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-green-400 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-[#10B2E3]">
                          {notif.title}
                        </h3>
                        <p className="text-[#B6C4CF] text-sm mt-1">{notif.message}</p>
                        <p className="text-[#64748B] text-xs mt-2">{notif.timestamp}</p>
                      </div>

                      {!notif.isRead && (
                        <div className="flex-shrink-0">
                          <span className="w-2 h-2 bg-[#10B2E3] rounded-full block animate-pulse shadow-[0_0_10px_rgba(16,178,227,0.8)]" />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-[#2E3944] mx-auto mb-4" />
                  <p className="text-[#B6C4CF]">No notifications</p>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="flex gap-3 pt-4 border-t border-[#2E3944]">
            <Button
              onClick={() => setNotificationOpen(false)}
              className="flex-1 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,178,227,0.5)]"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </PageTransition>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
    </AuthGuard>
  )
}

function StatsCard({ icon: Icon, label, value, color }: any) {
  return (
    <Card className="bg-[#101A23] border-[#2E3944] p-6 hover:border-[#47D8FF]/30 transition-all">
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

export default UserDashboard
