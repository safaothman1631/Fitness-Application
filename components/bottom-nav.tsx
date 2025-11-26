"use client"

import { useRouter } from "next/navigation"
import { LayoutDashboard, Dumbbell, Utensils, HeartPulse, User } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

interface BottomNavProps {
  activeTab: string
  setActiveTab?: (tab: string) => void
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  
  // Check if RTL language
  const isRTL = language === "ar" || language === "ku"
  
  const navItemsLTR = [
    { id: "dashboard", icon: LayoutDashboard, label: t("dashboard"), path: "/dashboard", color: "#10B2E3" },
    { id: "workout", icon: Dumbbell, label: t("workoutLabel"), path: "/workout", color: "#9333EA" },
    { id: "meals", icon: Utensils, label: t("mealsLabel"), path: "/meals", color: "#F59E0B" },
    { id: "physio", icon: HeartPulse, label: t("physioLabel"), path: "/physio", color: "#F43F5E" },
    { id: "profile", icon: User, label: t("profile"), path: "/profile", color: "#6366F1" }
  ]
  
  // For RTL, reverse the order (right to left: Dashboard-Workout-Meals-Physio-Profile)
  const navItems = isRTL ? [...navItemsLTR].reverse() : navItemsLTR

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.id === activeTab) return // Already on this page
    
    if (setActiveTab) {
      setActiveTab(item.id)
    }
    
    router.push(item.path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50">
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(10px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .slide-scale-active {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-300 relative ${
              activeTab === item.id ? "slide-scale-active" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                activeTab === item.id ? "scale-110" : ""
              }`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 20px ${item.color}40` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
            {activeTab === item.id && (
              <div 
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
