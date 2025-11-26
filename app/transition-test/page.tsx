"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Dumbbell, Utensils, HeartPulse, User, CheckCircle2, Flame, Calendar, Award } from "lucide-react"

export default function TransitionTestPage() {
  const router = useRouter()
  const [currentTransition, setCurrentTransition] = useState<string>("slide-right")
  const [currentPage, setCurrentPage] = useState<string>("dashboard")
  const [nextPage, setNextPage] = useState<string>("dashboard")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  const pages = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, color: "#10B2E3", gradient: "from-[#10B2E3] to-[#73E8FF]" },
    { id: "workout", name: "Workout", icon: Dumbbell, color: "#9333EA", gradient: "from-[#9333EA] to-[#C084FC]" },
    { id: "meals", name: "Meals", icon: Utensils, color: "#F59E0B", gradient: "from-[#F59E0B] to-[#FCD34D]" },
    { id: "physio", name: "Physio", icon: HeartPulse, color: "#F43F5E", gradient: "from-[#F43F5E] to-[#FB7185]" },
    { id: "profile", name: "Profile", icon: User, color: "#6366F1", gradient: "from-[#6366F1] to-[#818CF8]" }
  ]

  const transitions = [
    { id: "slide-right", name: "1. Slide Right", desc: "iOS Style", recommended: true },
    { id: "slide-left", name: "2. Slide Left", desc: "Android Style", recommended: false },
    { id: "slide-up", name: "3. Slide Up", desc: "Modal Style", recommended: true },
    { id: "fade", name: "4. Fade", desc: "Smooth Fade", recommended: true },
    { id: "zoom", name: "5. Zoom", desc: "Scale Effect", recommended: false },
    { id: "flip", name: "6. Flip 3D", desc: "Card Flip", recommended: false },
    { id: "door", name: "7. Door", desc: "Split Open", recommended: false },
    { id: "blur-fade", name: "8. Blur Fade", desc: "Modern Blur", recommended: true }
  ]

  const handlePageChange = (newPage: string) => {
    if (newPage === currentPage || isTransitioning) return
    
    // Determine direction
    const currentIndex = pages.findIndex(p => p.id === currentPage)
    const newIndex = pages.findIndex(p => p.id === newPage)
    setDirection(newIndex > currentIndex ? "forward" : "backward")
    
    setIsTransitioning(true)
    setNextPage(newPage)
    
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsTransitioning(false)
    }, 600)
  }

  const currentPageData = pages.find(p => p.id === currentPage)!
  const nextPageData = pages.find(p => p.id === nextPage)!

  return (
    <div className="min-h-screen bg-[#0E151B] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#101A23] to-[#0E151B] border-b border-[#2E3944] px-4 py-3 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] bg-clip-text text-transparent">
              🎬 Transition Test
            </h1>
            <button
              onClick={() => router.push("/animation-test")}
              className="text-xs text-[#10B2E3] hover:text-[#73E8FF] transition-colors px-3 py-1 rounded-lg bg-[#10B2E3]/10"
            >
              ← Nav Test
            </button>
          </div>
          <p className="text-xs text-[#B6C4CF]">تاقیکردنەوەی شێوازی بوونەوەی پەیجەکان</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Transition Selector - Compact */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <span className="bg-[#10B2E3] text-white px-2 py-0.5 rounded text-xs">شێواز</span>
            Transition Style
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {transitions.map(trans => (
              <button
                key={trans.id}
                onClick={() => setCurrentTransition(trans.id)}
                className={`p-2 rounded-lg border transition-all text-left relative ${
                  currentTransition === trans.id
                    ? "bg-[#10B2E3]/20 border-[#10B2E3] shadow-[0_0_15px_rgba(16,178,227,0.2)]"
                    : "bg-[#101A23] border-[#2E3944] hover:border-[#10B2E3]/30 active:scale-95"
                }`}
              >
                {trans.recommended && (
                  <div className="absolute top-1 right-1 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] text-[7px] px-1 py-0.5 rounded font-bold">
                    ★
                  </div>
                )}
                <div className="font-bold text-white text-xs mb-0.5">{trans.name}</div>
                <div className="text-[9px] text-[#B6C4CF]">{trans.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Page Navigation - Mobile Optimized */}
        <div className="bg-[#101A23] rounded-xl border border-[#2E3944] p-3 mb-4">
          <h3 className="text-sm font-bold text-white mb-2">گۆڕینی پەیج:</h3>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {pages.map(page => (
              <button
                key={page.id}
                onClick={() => handlePageChange(page.id)}
                disabled={isTransitioning}
                className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all ${
                  currentPage === page.id ? "border-2 shadow-lg scale-105" : "border-[#2E3944]"
                } ${isTransitioning ? "opacity-50" : "active:scale-95"}`}
                style={{
                  borderColor: currentPage === page.id ? page.color : undefined,
                  backgroundColor: currentPage === page.id ? `${page.color}15` : "#0E151B",
                  boxShadow: currentPage === page.id ? `0 0 15px ${page.color}30` : "none",
                  minWidth: "70px"
                }}
              >
                <page.icon className="w-6 h-6 mx-auto mb-1" style={{ color: page.color }} />
                <div className="text-[10px] font-medium text-white text-center">{page.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Page Content with Smooth Transition */}
        <div className="relative rounded-2xl border border-[#2E3944] overflow-hidden bg-[#0E151B]" style={{ height: "calc(100vh - 380px)", minHeight: "400px" }}>
          {currentTransition === "slide-right" && (
            <SlideRightTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning} 
              direction={direction}
            />
          )}
          {currentTransition === "slide-left" && (
            <SlideLeftTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning} 
              direction={direction}
            />
          )}
          {currentTransition === "slide-up" && (
            <SlideUpTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning}
            />
          )}
          {currentTransition === "fade" && (
            <FadeTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning}
            />
          )}
          {currentTransition === "zoom" && (
            <ZoomTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning}
            />
          )}
          {currentTransition === "flip" && (
            <FlipTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning}
            />
          )}
          {currentTransition === "door" && (
            <DoorTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning}
            />
          )}
          {currentTransition === "blur-fade" && (
            <BlurFadeTransition 
              currentPage={currentPageData} 
              nextPage={nextPageData}
              isTransitioning={isTransitioning}
            />
          )}
        </div>

        {/* Instructions */}
        <div className="bg-[#101A23]/50 border border-[#2E3944] rounded-lg p-3 mt-4 text-center backdrop-blur-sm">
          <p className="text-[#B6C4CF] text-xs">
            👆 کلیک بکە بۆ بینینی transition لە نێوان پەیجەکان
          </p>
        </div>
      </div>
    </div>
  )
}

// 1. Slide from Right (iOS Style)
function SlideRightTransition({ currentPage, nextPage, isTransitioning, direction }: any) {
  return (
    <>
      {/* Current Page - sliding out */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: isTransitioning ? (direction === "forward" ? "translateX(-30%)" : "translateX(100%)") : "translateX(0)",
          opacity: isTransitioning ? (direction === "forward" ? 0.7 : 0) : 1,
          transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
          zIndex: isTransitioning && direction === "backward" ? 2 : 1
        }}
      >
        <PageContent page={currentPage} />
      </div>
      
      {/* Next Page - sliding in */}
      {isTransitioning && (
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: direction === "forward" ? "translateX(0)" : "translateX(-30%)",
            opacity: direction === "forward" ? 1 : 0.7,
            transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
            zIndex: direction === "forward" ? 2 : 1
          }}
        >
          <PageContent page={nextPage} />
        </div>
      )}
    </>
  )
}

// 2. Slide from Left (Android Style)
function SlideLeftTransition({ currentPage, nextPage, isTransitioning, direction }: any) {
  return (
    <>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: isTransitioning ? (direction === "forward" ? "translateX(30%)" : "translateX(-100%)") : "translateX(0)",
          opacity: isTransitioning ? 0.7 : 1,
          transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
          zIndex: 1
        }}
      >
        <PageContent page={currentPage} />
      </div>
      
      {isTransitioning && (
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "translateX(0)",
            opacity: 1,
            transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
            zIndex: 2
          }}
        >
          <PageContent page={nextPage} />
        </div>
      )}
    </>
  )
}

// 3. Slide from Bottom (Modal Style)
function SlideUpTransition({ currentPage, nextPage, isTransitioning }: any) {
  return (
    <>
      <div className="absolute inset-0 will-change-transform">
        <PageContent page={currentPage} />
      </div>
      
      {isTransitioning && (
        <>
          <div 
            className="absolute inset-0 bg-black will-change-opacity"
            style={{
              opacity: 0.5,
              transition: "opacity 0.35s ease-out"
            }}
          />
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: "translateY(0)",
              transition: "transform 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)",
              zIndex: 2,
              borderRadius: "12px 12px 0 0"
            }}
          >
            <PageContent page={nextPage} />
          </div>
        </>
      )}
    </>
  )
}

// 4. Fade (Smooth Cross-fade)
function FadeTransition({ currentPage, nextPage, isTransitioning }: any) {
  return (
    <>
      <div
        className="absolute inset-0 will-change-opacity"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.35s ease-in-out"
        }}
      >
        <PageContent page={currentPage} />
      </div>
      
      {isTransitioning && (
        <div
          className="absolute inset-0 will-change-opacity"
          style={{
            opacity: 1,
            transition: "opacity 0.35s ease-in-out"
          }}
        >
          <PageContent page={nextPage} />
        </div>
      )}
    </>
  )
}

// 5. Zoom (Scale)
function ZoomTransition({ currentPage, nextPage, isTransitioning }: any) {
  return (
    <>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: isTransitioning ? "scale(0.9)" : "scale(1)",
          opacity: isTransitioning ? 0 : 1,
          transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)"
        }}
      >
        <PageContent page={currentPage} />
      </div>
      
      {isTransitioning && (
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "scale(1)",
            opacity: 1,
            transition: "all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)"
          }}
        >
          <PageContent page={nextPage} />
        </div>
      )}
    </>
  )
}

// 6. 3D Flip
function FlipTransition({ currentPage, nextPage, isTransitioning }: any) {
  return (
    <div className="absolute inset-0" style={{ perspective: "1200px" }}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: isTransitioning ? "rotateY(-90deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.35s ease-in-out",
          backfaceVisibility: "hidden"
        }}
      >
        <PageContent page={currentPage} />
      </div>
      
      {isTransitioning && (
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: "rotateY(0deg)",
            transformStyle: "preserve-3d",
            transition: "transform 0.35s ease-in-out",
            backfaceVisibility: "hidden"
          }}
        >
          <PageContent page={nextPage} />
        </div>
      )}
    </div>
  )
}

// 7. Door (Split)
function DoorTransition({ currentPage, nextPage, isTransitioning }: any) {
  return (
    <>
      <div className="absolute inset-0">
        <PageContent page={isTransitioning ? nextPage : currentPage} />
      </div>
      
      <div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0E151B] will-change-transform"
        style={{
          transform: isTransitioning ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
          zIndex: 10
        }}
      />
      
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0E151B] will-change-transform"
        style={{
          transform: isTransitioning ? "translateX(100%)" : "translateX(0)",
          transition: "transform 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
          zIndex: 10
        }}
      />
    </>
  )
}

// 8. Blur + Fade (Modern)
function BlurFadeTransition({ currentPage, nextPage, isTransitioning }: any) {
  return (
    <>
      <div
        className="absolute inset-0 will-change-transform will-change-opacity"
        style={{
          opacity: isTransitioning ? 0 : 1,
          filter: isTransitioning ? "blur(10px)" : "blur(0px)",
          transform: isTransitioning ? "scale(1.05)" : "scale(1)",
          transition: "all 0.35s ease-in-out"
        }}
      >
        <PageContent page={currentPage} />
      </div>
      
      {isTransitioning && (
        <div
          className="absolute inset-0 will-change-transform will-change-opacity"
          style={{
            opacity: 1,
            filter: "blur(0px)",
            transform: "scale(1)",
            transition: "all 0.35s ease-in-out"
          }}
        >
          <PageContent page={nextPage} />
        </div>
      )}
    </>
  )
}

// Realistic Page Content Component
function PageContent({ page }: any) {
  const getPageStats = () => {
    switch(page.id) {
      case "dashboard":
        return [
          { icon: Dumbbell, label: "Workouts", value: "124" },
          { icon: Flame, label: "Calories", value: "32.5K" },
          { icon: Calendar, label: "Days", value: "89" },
          { icon: Award, label: "Goals", value: "47" }
        ]
      case "workout":
        return [
          { icon: Dumbbell, label: "Total", value: "24" },
          { icon: Calendar, label: "Streak", value: "7" },
          { icon: Flame, label: "Burned", value: "1.4K" },
          { icon: CheckCircle2, label: "Done", value: "18" }
        ]
      case "meals":
        return [
          { icon: Flame, label: "Calories", value: "1,450" },
          { icon: Utensils, label: "Meals", value: "3" },
          { icon: CheckCircle2, label: "Logged", value: "12" },
          { icon: Award, label: "Goal", value: "85%" }
        ]
      case "physio":
        return [
          { icon: HeartPulse, label: "Sessions", value: "12" },
          { icon: CheckCircle2, label: "Done", value: "8" },
          { icon: Calendar, label: "Pending", value: "4" },
          { icon: Award, label: "Rate", value: "85%" }
        ]
      case "profile":
        return [
          { icon: User, label: "Views", value: "234" },
          { icon: Award, label: "Badges", value: "18" },
          { icon: Calendar, label: "Days", value: "180" },
          { icon: CheckCircle2, label: "Complete", value: "92%" }
        ]
    }
  }

  const stats = getPageStats()

  return (
    <div className="w-full h-full bg-[#0E151B] p-6 overflow-y-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 
          className={`text-2xl font-bold bg-gradient-to-r ${page.gradient} bg-clip-text text-transparent mb-2`}
        >
          {page.name}
        </h2>
        <p className="text-sm text-[#B6C4CF]">
          ئەمە نموونەی ڕاستەقینەی پەیجی {page.name}ە
        </p>
      </div>

      {/* Feature Card */}
      <div 
        className={`bg-gradient-to-r ${page.gradient} rounded-xl p-5 mb-6 shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">تایبەتمەندی نوێ! 🎯</h3>
            <p className="text-white/90 text-xs">بەدەستهێنانی نوێ و دەستکەوت</p>
          </div>
          <page.icon className="w-10 h-10 text-white/80" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats?.map((stat, idx) => (
          <div 
            key={idx}
            className="bg-[#101A23] rounded-xl p-4 border border-[#2E3944] hover:border-opacity-50 transition-all"
            style={{
              borderColor: `${page.color}20`
            }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: `${page.color}20` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: page.color }} />
            </div>
            <div className="text-[9px] uppercase text-[#B6C4CF] mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Content Cards */}
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div 
            key={i}
            className="bg-[#101A23] rounded-xl p-4 border border-[#2E3944] hover:border-opacity-50 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${page.color}20` }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: page.color }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">ناوەڕۆکی نموونە {i}</div>
                  <div className="text-xs text-[#B6C4CF]">وردەکاری زیاتر لێرە</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-[#B6C4CF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
