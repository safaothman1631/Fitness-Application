"use client"

import { useState } from "react"
import { LayoutDashboard, Dumbbell, Utensils, HeartPulse, User, Flame, Calendar, Award, Target, Apple, CheckCircle2, Clock } from "lucide-react"

export default function AnimationTestPage() {
  const [currentAnimation, setCurrentAnimation] = useState<string>("slide-scale")
  const [activeTab, setActiveTab] = useState("dashboard")

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", color: "#10B2E3", gradient: "from-[#10B2E3] to-[#73E8FF]" },
    { id: "workout", icon: Dumbbell, label: "Workout", color: "#9333EA", gradient: "from-[#9333EA] to-[#C084FC]" },
    { id: "meals", icon: Utensils, label: "Meals", color: "#F59E0B", gradient: "from-[#F59E0B] to-[#FCD34D]" },
    { id: "physio", icon: HeartPulse, label: "Physio", color: "#F43F5E", gradient: "from-[#F43F5E] to-[#FB7185]" },
    { id: "profile", icon: User, label: "Profile", color: "#6366F1", gradient: "from-[#6366F1] to-[#818CF8]" }
  ]

  const animations = [
    { id: "slide-scale", name: "1. Slide & Scale", desc: "Professional و smooth", recommended: true },
    { id: "magnetic", name: "2. Magnetic Pull", desc: "Interactive و elastic", recommended: false },
    { id: "wave", name: "3. Wave Ripple", desc: "Elegant wave effect", recommended: false },
    { id: "morphing", name: "4. Morphing Line", desc: "Modern sliding line", recommended: true },
    { id: "flip-3d", name: "5. 3D Flip", desc: "Fancy 3D transform", recommended: false },
    { id: "smooth-glide", name: "6. Smooth Glide", desc: "Clean و minimalist", recommended: true },
    { id: "bubble", name: "7. Bubble Pop", desc: "Playful spring", recommended: false },
    { id: "gradient-flow", name: "8. Gradient Flow", desc: "Colorful transition", recommended: false }
  ]

  const getPageContent = () => {
    const activeItem = navItems.find(item => item.id === activeTab)
    
    switch(activeTab) {
      case "dashboard":
        return {
          title: "Dashboard Overview",
          stats: [
            { icon: Dumbbell, label: "Total Workouts", value: "124", color: "#9333EA" },
            { icon: Flame, label: "Calories Burned", value: "32.5K", color: "#F59E0B" },
            { icon: Calendar, label: "Active Days", value: "89", color: "#10B2E3" },
            { icon: Award, label: "Goals Achieved", value: "47", color: "#F43F5E" }
          ]
        }
      case "workout":
        return {
          title: "Your Workout Plan",
          stats: [
            { icon: Dumbbell, label: "Total Workouts", value: "24", color: "#9333EA" },
            { icon: Calendar, label: "Active Streak", value: "7 Days", color: "#C084FC" },
            { icon: Flame, label: "Calories Burned", value: "1,450", color: "#A855F7" },
            { icon: Clock, label: "Total Time", value: "42 min", color: "#7E22CE" }
          ]
        }
      case "meals":
        return {
          title: "Nutrition Tracker",
          stats: [
            { icon: Flame, label: "Calories Today", value: "1,450", color: "#F59E0B" },
            { icon: Apple, label: "Protein", value: "92g", color: "#FB923C" },
            { icon: Utensils, label: "Meals Logged", value: "3", color: "#FCD34D" },
            { icon: Target, label: "Daily Goal", value: "85%", color: "#D97706" }
          ]
        }
      case "physio":
        return {
          title: "Recovery Center",
          stats: [
            { icon: HeartPulse, label: "Total Requests", value: "12", color: "#F43F5E" },
            { icon: CheckCircle2, label: "Completed", value: "8", color: "#FB7185" },
            { icon: Calendar, label: "Pending", value: "4", color: "#FDA4AF" },
            { icon: Target, label: "Recovery Rate", value: "85%", color: "#E11D48" }
          ]
        }
      case "profile":
        return {
          title: "Your Profile",
          stats: [
            { icon: User, label: "Profile Views", value: "234", color: "#6366F1" },
            { icon: Award, label: "Achievements", value: "18", color: "#818CF8" },
            { icon: Calendar, label: "Member Since", value: "6 mo", color: "#A5B4FC" },
            { icon: Target, label: "Goals Met", value: "92%", color: "#4F46E5" }
          ]
        }
    }
  }

  const pageContent = getPageContent()

  return (
    <div className="min-h-screen bg-[#0E151B] text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#101A23] to-[#0E151B] border-b border-[#2E3944] px-6 py-4 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] bg-clip-text text-transparent mb-1">
            🎬 Animation Test Center
          </h1>
          <p className="text-sm text-[#B6C4CF]">تاقیکردنەوەی هەموو جۆرەکانی animation</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Animation Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="bg-[#10B2E3] text-white px-2 py-0.5 rounded text-sm">هەڵبژێرە</span>
            جۆری Animation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {animations.map(anim => (
              <button
                key={anim.id}
                onClick={() => setCurrentAnimation(anim.id)}
                className={`p-3 rounded-xl border-2 transition-all text-left relative ${
                  currentAnimation === anim.id
                    ? "bg-[#10B2E3]/20 border-[#10B2E3] shadow-[0_0_20px_rgba(16,178,227,0.3)]"
                    : "bg-[#101A23] border-[#2E3944] hover:border-[#10B2E3]/50"
                }`}
              >
                {anim.recommended && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                    ★
                  </div>
                )}
                <div className="font-bold text-white text-sm mb-1">{anim.name}</div>
                <div className="text-[10px] text-[#B6C4CF]">{anim.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Animation Badge */}
        <div className="bg-[#101A23] border border-[#10B2E3]/50 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#B6C4CF] mb-1">ئێستا چالاکە:</div>
            <div className="text-lg font-bold text-[#10B2E3]">
              {animations.find(a => a.id === currentAnimation)?.name}
            </div>
          </div>
          <div className="text-3xl">✨</div>
        </div>

        {/* Realistic Page Simulation */}
        <div className="bg-[#101A23] rounded-2xl border border-[#2E3944] p-6 mb-6">
          {/* Page Title with Gradient */}
          <h2 className={`text-3xl font-bold bg-gradient-to-r ${navItems.find(item => item.id === activeTab)?.gradient} bg-clip-text text-transparent mb-6`}>
            {pageContent?.title}
          </h2>

          {/* Feature Card */}
          <div className={`bg-gradient-to-r ${navItems.find(item => item.id === activeTab)?.gradient} rounded-xl p-6 mb-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">تایبەتمەندی نوێ! 🎯</h3>
                <p className="text-white/90 text-sm">دەستکەوتی تازە و تایبەتمەندی نوێ بۆ تۆ</p>
              </div>
              {(() => {
                const Icon = navItems.find(item => item.id === activeTab)?.icon
                return Icon ? <Icon className="w-12 h-12 text-white/80" /> : null
              })()}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {pageContent?.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#0E151B] rounded-xl p-4 border border-[#2E3944] hover:border-[#10B2E3]/30 transition-all">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-[10px] uppercase text-[#B6C4CF] mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Sample Content Cards */}
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#0E151B] rounded-xl p-4 border border-[#2E3944] hover:border-[#10B2E3]/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${navItems.find(item => item.id === activeTab)?.color}20` }}
                    >
                      <CheckCircle2 className="w-5 h-5" style={{ color: navItems.find(item => item.id === activeTab)?.color }} />
                    </div>
                    <div>
                      <div className="text-white font-medium">نموونەی ناوەڕۆک {i}</div>
                      <div className="text-xs text-[#B6C4CF]">وردەکاری زیاتر لێرە</div>
                    </div>
                  </div>
                  <button className="text-[#B6C4CF] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instruction */}
        <div className="bg-[#101A23] border border-[#2E3944] rounded-xl p-4 text-center">
          <p className="text-[#B6C4CF] text-sm">
            👇 کلیک لەسەر دوگمەکانی خوارەوە بکە بۆ بینینی animation
          </p>
        </div>
      </div>

      {/* Test Navigation Bars */}
      {currentAnimation === "slide-scale" && <SlideScaleNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "magnetic" && <MagneticNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "wave" && <WaveNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "morphing" && <MorphingNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "flip-3d" && <Flip3DNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "smooth-glide" && <SmoothGlideNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "bubble" && <BubbleNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
      {currentAnimation === "gradient-flow" && <GradientFlowNav navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  )
}

// 1. Slide & Scale
function SlideScaleNav({ navItems, activeTab, setActiveTab }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
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
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
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

// 2. Magnetic Pull
function MagneticNav({ navItems, activeTab, setActiveTab }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <style jsx>{`
        @keyframes magnetPull {
          0% { transform: scale(0.8) rotate(-10deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .magnetic-active {
          animation: magnetPull 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-500 ${
              activeTab === item.id ? "magnetic-active" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-500`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 25px ${item.color}50` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// 3. Wave Ripple
function WaveNav({ navItems, activeTab, setActiveTab }: any) {
  const activeItem = navItems.find((item: any) => item.id === activeTab)
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] overflow-hidden">
      <style jsx>{`
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        .wave-active::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
          animation: ripple 0.8s ease-out;
          border-radius: 50%;
          opacity: 0.3;
        }
      `}</style>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-700 relative ${
              activeTab === item.id ? "" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-700 relative ${
                activeTab === item.id ? "wave-active" : ""
              }`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 15px ${item.color}40` : "none",
                color: item.color
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// 4. Morphing Line
function MorphingNav({ navItems, activeTab, setActiveTab }: any) {
  const activeIndex = navItems.findIndex((item: any) => item.id === activeTab)
  const activeItem = navItems[activeIndex]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto relative">
        <div 
          className="absolute bottom-0 h-1 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `calc(100% / ${navItems.length})`,
            left: `calc(100% / ${navItems.length} * ${activeIndex})`,
            background: `linear-gradient(to right, ${activeItem?.color}, ${activeItem?.color}90)`,
            boxShadow: `0 0 20px ${activeItem?.color}60`
          }}
        />
        <div className="flex items-center justify-between pt-2">
          {navItems.map((item: any) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-500 ${
                activeTab === item.id ? "scale-110" : "hover:scale-105"
              }`}
              style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
            >
              <div 
                className={`p-2.5 rounded-xl transition-all duration-500`}
                style={{
                  backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent"
                }}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 5. 3D Flip
function Flip3DNav({ navItems, activeTab, setActiveTab }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]" style={{ perspective: '1000px' }}>
      <style jsx>{`
        @keyframes flip3d {
          0% { transform: rotateY(90deg) scale(0.5); opacity: 0; }
          50% { transform: rotateY(-10deg) scale(1.1); }
          100% { transform: rotateY(0deg) scale(1); opacity: 1; }
        }
        .flip-active {
          animation: flip3d 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-style: preserve-3d;
        }
      `}</style>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-300 ${
              activeTab === item.id ? "flip-active" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-300`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 20px ${item.color}40` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// 6. Smooth Glide
function SmoothGlideNav({ navItems, activeTab, setActiveTab }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-300 ease-out ${
              activeTab === item.id ? "-translate-y-1" : "hover:-translate-y-0.5 translate-y-0"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                activeTab === item.id ? "scale-110 opacity-100" : "opacity-70 scale-100"
              }`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 15px ${item.color}40` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] font-medium transition-all duration-300 ${
              activeTab === item.id ? "opacity-100" : "opacity-60"
            }`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// 7. Bubble Pop
function BubbleNav({ navItems, activeTab, setActiveTab }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <style jsx>{`
        @keyframes bubblePop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); }
          75% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .bubble-active {
          animation: bubblePop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-300 ${
              activeTab === item.id ? "bubble-active" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-full transition-all duration-300`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 20px ${item.color}50` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// 8. Gradient Flow
function GradientFlowNav({ navItems, activeTab, setActiveTab }: any) {
  const activeIndex = navItems.findIndex((item: any) => item.id === activeTab)
  const activeItem = navItems[activeIndex]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#101A23]/95 backdrop-blur-lg border-t border-[#2E3944] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div 
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          background: `linear-gradient(to right, ${activeItem?.color}10, ${activeItem?.color}20, ${activeItem?.color}10)`,
          transform: `translateX(calc(${activeIndex * 20}% - 50%))`
        }}
      />
      <div className="max-w-md mx-auto flex items-center justify-between relative z-10">
        {navItems.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 min-w-[60px] transition-all duration-700 ${
              activeTab === item.id ? "scale-110" : "hover:scale-105"
            }`}
            style={{ color: activeTab === item.id ? item.color : "#B6C4CF" }}
          >
            <div 
              className={`p-2.5 rounded-xl transition-all duration-700`}
              style={{
                backgroundColor: activeTab === item.id ? `${item.color}30` : "transparent",
                boxShadow: activeTab === item.id ? `0 0 25px ${item.color}50` : "none"
              }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
