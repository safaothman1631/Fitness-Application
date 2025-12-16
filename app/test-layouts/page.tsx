"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SidebarClassic from "@/components/layouts/sidebar-classic"
import SidebarMinimal from "@/components/layouts/sidebar-minimal"
import TopNavbar from "@/components/layouts/top-navbar"
import SidebarGlass from "@/components/layouts/sidebar-glass"
import MobileBottomNav from "@/components/layouts/mobile-bottom-nav"

export default function TestLayoutsPage() {
  const [currentLayout, setCurrentLayout] = useState<"classic" | "minimal" | "top" | "glass" | "mobile">("mobile")

  const layouts = {
    classic: SidebarClassic,
    minimal: SidebarMinimal,
    top: TopNavbar,
    glass: SidebarGlass || (() => <div>Loading...</div>),
    mobile: MobileBottomNav || (() => <div>Loading...</div>),
  }

  const CurrentLayout = layouts[currentLayout] || (() => <div>Loading...</div>)

  return (
    <CurrentLayout key={currentLayout} role="superadmin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🎨 Menu Layout Test</h1>
          <p className="text-gray-400">تاقیکردنەوەی 4 جۆر دیزاینی جیاواز</p>
        </div>

        {/* Layout Selector */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <h2 className="text-white text-lg font-semibold mb-4">هەڵبژاردنی دیزاین:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Button
                onClick={() => setCurrentLayout("mobile")}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  currentLayout === "mobile" 
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 ring-2 ring-pink-500" 
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">📱</span>
                <span className="font-semibold">Mobile Bottom Nav</span>
                <span className="text-xs opacity-80">App Style ⭐</span>
              </Button>

              <Button
                onClick={() => setCurrentLayout("classic")}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  currentLayout === "classic" 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">🖥️</span>
                <span className="font-semibold">Classic Sidebar</span>
                <span className="text-xs opacity-80">Gradient + Shadow</span>
              </Button>

              <Button
                onClick={() => setCurrentLayout("minimal")}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  currentLayout === "minimal" 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600" 
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">⚡</span>
                <span className="font-semibold">Minimal Collapsible</span>
                <span className="text-xs opacity-80">Icons Only → Expand</span>
              </Button>

              <Button
                onClick={() => setCurrentLayout("top")}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  currentLayout === "top" 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600" 
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">🔝</span>
                <span className="font-semibold">Top Navbar</span>
                <span className="text-xs opacity-80">Horizontal Menu</span>
              </Button>

              <Button
                onClick={() => setCurrentLayout("glass")}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  currentLayout === "glass" 
                    ? "bg-gradient-to-r from-cyan-500 to-pink-500" 
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                <span className="text-lg">✨</span>
                <span className="font-semibold">Glassmorphism</span>
                <span className="text-xs opacity-80">Frosted Glass Effect</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Layout Info */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-6">
            <h2 className="text-white text-lg font-semibold mb-4">
              {currentLayout === "mobile" && "📱 Mobile Bottom Navigation"}
              {currentLayout === "classic" && "🖥️ Classic Sidebar"}
              {currentLayout === "minimal" && "⚡ Minimal Collapsible"}
              {currentLayout === "top" && "🔝 Top Navbar"}
              {currentLayout === "glass" && "✨ Glassmorphism"}
            </h2>
            
            <div className="space-y-3 text-gray-300">
              {currentLayout === "mobile" && (
                <>
                  <p>✅ Bottom Navigation Bar - وەک Instagram, TikTok</p>
                  <p>✅ Top header بە notification badge</p>
                  <p>✅ Full screen menu drawer</p>
                  <p>✅ User profile card لە menu</p>
                  <p>✅ Smooth animations و transitions</p>
                  <p>🎯 باشترینە بۆ: Mobile Apps و PWA</p>
                </>
              )}
              
              {currentLayout === "classic" && (
                <>
                  <p>✅ Sidebar لە چەپ بە پانی 72</p>
                  <p>✅ Gradient background (blue → purple)</p>
                  <p>✅ Active item بە shadow و animation</p>
                  <p>✅ Role badge لە سەرەوە</p>
                  <p>🎯 باشترینە بۆ: پرۆژە پرۆفیشناڵە گەورەکان</p>
                </>
              )}
              
              {currentLayout === "minimal" && (
                <>
                  <p>✅ Collapsible: 20px → 64px کاتێک hover دەکەیت</p>
                  <p>✅ تەنها icon دەردەکەوێت بە default</p>
                  <p>✅ Clean و minimal design</p>
                  <p>✅ Left border بۆ active items</p>
                  <p>🎯 باشترینە بۆ: زیادکردنی screen space</p>
                </>
              )}
              
              {currentLayout === "top" && (
                <>
                  <p>✅ Horizontal navbar لە سەرەوە</p>
                  <p>✅ Full width content</p>
                  <p>✅ Dropdown بۆ user menu</p>
                  <p>✅ Modern و sleek look</p>
                  <p>🎯 باشترینە بۆ: Dashboards و analytics</p>
                </>
              )}
              
              {currentLayout === "glass" && (
                <>
                  <p>✅ Glassmorphism effect بە backdrop blur</p>
                  <p>✅ Rounded corners (3xl)</p>
                  <p>✅ Animated gradient background</p>
                  <p>✅ Vibrant colors (cyan, purple, pink)</p>
                  <p>🎯 باشترینە بۆ: Modern و creative apps</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demo Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">کارتی نموونە {i}</h3>
                <p className="text-gray-400 text-sm">
                  ئەمە ناوەرۆکی نموونەیە بۆ پیشاندانی شێوەی layout
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CurrentLayout>
  )
}
