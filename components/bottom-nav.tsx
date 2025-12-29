"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Dumbbell, Utensils, HeartPulse, MoreHorizontal, User, Settings, Bell, LogOut } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

interface BottomNavProps {
  activeTab: string
  setActiveTab?: (tab: string) => void
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  
  const isRTL = language === "ar" || language === "ku"

  const handleLogout = async () => {
    try {
      // Clear any localStorage data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('app_language')
        localStorage.removeItem('userRole')
        localStorage.removeItem('userId')
      }
      
      // Sign out from Firebase
      await signOut(auth)
      
      // Redirect to login
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const moreMenuItems = [
    { id: "profile", icon: User, label: t("profile"), path: "/profile", color: "#10B981" },
    { id: "settings", icon: Settings, label: t("settingsPage"), path: "/settings", color: "#8B5CF6" },
    { id: "notifications", icon: Bell, label: t("notificationsPage"), path: "/notifications", color: "#EC4899" },
  ]
  
  const navItemsLTR = [
    { id: "dashboard", icon: LayoutDashboard, label: t("dashboard"), path: "/dashboard", color: "#10B2E3" },
    { id: "workout", icon: Dumbbell, label: t("workoutLabel"), path: "/workout", color: "#9333EA" },
    { id: "meals", icon: Utensils, label: t("mealsLabel"), path: "/meals", color: "#F59E0B" },
    { id: "physio", icon: HeartPulse, label: t("physioLabel"), path: "/physio", color: "#EF4444" },
    { id: "more", icon: MoreHorizontal, label: t("more") || "More", path: "#", color: "#6366F1" }
  ]
  
  const navItems = isRTL ? [...navItemsLTR].reverse() : navItemsLTR

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.id === "more") return // More opens sheet, not navigation
    if (item.id === activeTab) return
    
    if (setActiveTab) {
      setActiveTab(item.id)
    }
    
    router.push(item.path)
  }

  const handleMoreItemClick = (item: typeof moreMenuItems[0]) => {
    if (setActiveTab) {
      setActiveTab(item.id)
    }
    router.push(item.path)
    setIsMoreOpen(false)
  }

  const isMoreActive = ["profile", "settings", "notifications"].includes(activeTab)

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/[0.02] backdrop-blur-3xl border-t border-white/20 z-50 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background: 'linear-gradient(to top, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
        boxShadow: '0 -20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent pointer-events-none" />
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          // More button with Sheet
          if (item.id === "more") {
            return (
              <Sheet key={item.id} open={isMoreOpen} onOpenChange={setIsMoreOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="flex flex-col items-center justify-center gap-1.5 py-2 px-3 min-w-[64px] group/more relative"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/0 to-purple-500/0 group-hover/more:from-purple-500/10 group-hover/more:to-transparent transition-all duration-500" />
                    <div
                      className="p-2.5 rounded-2xl transition-all duration-500 group-hover/more:scale-110 group-hover/more:-translate-y-1 relative z-10 shadow-lg backdrop-blur-xl border"
                      style={isMoreActive ? {
                        backgroundColor: `${item.color}25`,
                        borderColor: `${item.color}40`,
                        boxShadow: `0 0 25px ${item.color}60, 0 8px 20px rgba(0,0,0,0.3)`
                      } : {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/more:opacity-100 transition-opacity duration-500" />
                      <Icon 
                        className="w-6 h-6 transition-all duration-500 group-hover/more:rotate-180 relative z-10"
                        style={{ 
                          color: isMoreActive ? item.color : "#94A3B8",
                          filter: isMoreActive ? `drop-shadow(0 0 8px ${item.color})` : 'none'
                        }}
                      />
                    </div>
                    <span 
                      className="text-[11px] font-semibold transition-all duration-300 group-hover/more:scale-105 relative z-10"
                      style={{ 
                        color: isMoreActive ? "#fff" : "#94A3B8",
                        textShadow: isMoreActive ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none'
                      }}
                    >
                      {item.label}
                    </span>
                    {isMoreActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse shadow-lg shadow-purple-500/50" />
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent 
                  side="bottom" 
                  className="bg-white/5 backdrop-blur-3xl border-t border-white/20 rounded-t-3xl pb-safe shadow-[0_-20px_60px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-purple-500/10 before:via-pink-500/5 before:to-transparent before:rounded-t-3xl before:pointer-events-none"
                >
                  <div className="py-6 space-y-4 relative z-10">
                    <SheetHeader className="px-6">
                      <SheetTitle className="text-white text-2xl font-bold flex items-center gap-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50" />
                        {t("more") || "More Options"}
                      </SheetTitle>
                      <SheetDescription className="text-slate-300 text-sm mt-2">
                        {t("accessProfileSettings")}
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="space-y-2 px-4">
                      {moreMenuItems.map((menuItem, index) => {
                        const MenuIcon = menuItem.icon
                        const isMenuActive = activeTab === menuItem.id
                        return (
                          <button
                            key={menuItem.id}
                            onClick={() => handleMoreItemClick(menuItem)}
                            className={`w-full flex items-center justify-start gap-4 h-20 px-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] group/item relative overflow-hidden backdrop-blur-xl ${
                              isMenuActive
                                ? "bg-white/15 border border-white/30 text-white shadow-xl shadow-purple-500/20"
                                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                            }`}
                          >
                            
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover/item:scale-105 group-hover/item:rotate-6 relative shadow-lg"
                              style={{
                                backgroundColor: `${menuItem.color}20`,
                                boxShadow: isMenuActive ? `0 0 20px ${menuItem.color}50` : `0 4px 15px ${menuItem.color}20`
                              }}
                            >
                              <MenuIcon 
                                className="w-7 h-7 transition-transform duration-300 group-hover/item:scale-110" 
                                style={{ color: menuItem.color }} 
                              />
                            </div>
                            
                            <div className="flex flex-col flex-1">
                              <span className="text-lg font-bold">{menuItem.label}</span>
                              <span className="text-xs text-slate-500 group-hover/item:text-slate-400 transition-colors">
                                {menuItem.id === 'profile' ? t("viewYourProfile") : menuItem.id === 'settings' ? t("managePreferences") : t("notificationSettingsDesc")}
                              </span>
                            </div>
                            
                            <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                      
                      <div className="pt-3 mt-3 border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-start gap-4 h-20 px-4 rounded-2xl text-red-400 bg-red-500/5 hover:bg-red-500/15 hover:text-red-300 transition-all duration-300 hover:scale-[1.02] group/logout relative overflow-hidden border border-red-500/30 hover:border-red-500/50 backdrop-blur-xl shadow-lg shadow-red-500/10"
                        >
                          
                          <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/logout:scale-105 group-hover/logout:rotate-6 relative shadow-lg shadow-red-500/30">
                            <LogOut className="w-7 h-7 text-red-400 transition-all duration-300 group-hover/logout:text-red-300" />
                          </div>
                          
                          <div className="flex flex-col flex-1">
                            <span className="text-lg font-bold">{t("logout")}</span>
                            <span className="text-xs text-red-500/60 group-hover/logout:text-red-400/80 transition-colors">{t("signOutFromAccount")}</span>
                          </div>
                          
                          <div className="opacity-0 group-hover/logout:opacity-100 transition-opacity duration-300">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )
          }
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="flex flex-col items-center justify-center gap-1.5 py-2 px-3 min-w-[64px] group/nav relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/0 to-purple-500/0 group-hover/nav:from-purple-500/10 group-hover/nav:to-transparent transition-all duration-500" />
              <div
                className="p-2.5 rounded-2xl transition-all duration-500 group-hover/nav:scale-110 group-hover/nav:-translate-y-1 relative z-10 shadow-lg backdrop-blur-xl border"
                style={isActive ? {
                  backgroundColor: `${item.color}25`,
                  borderColor: `${item.color}40`,
                  boxShadow: `0 0 25px ${item.color}60, 0 8px 20px rgba(0,0,0,0.3)`
                } : {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500" />
                <Icon 
                  className="w-6 h-6 transition-all duration-500 group-hover/nav:rotate-12 group-hover/nav:scale-110 relative z-10"
                  style={{ 
                    color: isActive ? item.color : "#94A3B8",
                    filter: isActive ? `drop-shadow(0 0 8px ${item.color})` : 'none'
                  }}
                />
              </div>
              <span 
                className="text-[11px] font-semibold transition-all duration-300 group-hover/nav:scale-105 relative z-10"
                style={{ 
                  color: isActive ? "#fff" : "#94A3B8",
                  textShadow: isActive ? `0 0 10px ${item.color}80` : 'none'
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full shadow-lg" 
                  style={{
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}DD, ${item.color})`,
                    boxShadow: `0 0 20px ${item.color}, 0 0 10px ${item.color}AA`,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
