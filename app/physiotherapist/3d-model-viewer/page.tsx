"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Eye, Info, ExternalLink, Play, Pause } from "lucide-react"

export default function SketchfabModelViewerPage() {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(true)
  const modelId = "c6bdf175506347f5a4b508510ac6d5f3"

  const handleDownload = () => {
    // Open Sketchfab download page
    window.open(`https://sketchfab.com/3d-models/animated-man-talking-phone-5387-os1-${modelId}`, '_blank')
  }

  const handleViewFullscreen = () => {
    window.open(`https://sketchfab.com/models/${modelId}/embed?autostart=1`, '_blank')
  }

  return (
    <AuthGuard>
      <FitproLayout role="physiotherapist">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Eye className="w-8 h-8 text-[#10B2E3]" />
              پیشاندانی مۆدێلی 3D
            </h1>
            <p className="text-slate-400 mt-2">
              Animated Man Talking Phone - Sketchfab Model
            </p>
          </div>

          {/* Info Alert */}
          <Alert className="border-[#10B2E3] bg-[#10B2E3]/10">
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>تێبینی:</strong> ئەم مۆدێلە لە Sketchfab هێنراوە. بۆ دابەزاندن پێویستە account ـی Sketchfab هەبێت.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Viewer - Left Column */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#10B2E3]" />
                  بینینی مۆدێل
                </CardTitle>
                <CardDescription>
                  مۆدێلێکی 3D بە ئەنیمەیشن
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[600px] bg-slate-900 rounded-lg overflow-hidden">
                  <iframe 
                    title="Animated Man Talking Phone 5387-OS1" 
                    frameBorder="0" 
                    allowFullScreen 
                    // @ts-ignore - Sketchfab specific attributes
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                    allow="autoplay; fullscreen; xr-spatial-tracking" 
                    xr-spatial-tracking="true"
                    execution-while-out-of-viewport="true"
                    execution-while-not-rendered="true"
                    web-share="true"
                    src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&ui_theme=dark`}
                    className="w-full h-full"
                  />
                </div>
                
                {/* Controls */}
                <div className="mt-4 flex gap-3">
                  <Button onClick={handleViewFullscreen} className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    کردنەوە لە پەنجەرەیەکی نوێ
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Info & Actions */}
            <div className="space-y-6">
              {/* Model Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">زانیاری مۆدێل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">ناو</p>
                    <p className="text-white font-medium">Animated Man Talking Phone</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Model ID</p>
                    <p className="text-white font-mono text-xs">{modelId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">دروستکەر</p>
                    <p className="text-white font-medium">Humano3d Official Store</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">سەرچاوە</p>
                    <a 
                      href="https://sketchfab.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#10B2E3] hover:underline text-sm"
                    >
                      Sketchfab.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Download Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#10B2E3]" />
                    دابەزاندن
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      بۆ دابەزاندنی مۆدێل پێویستە لە Sketchfab login بکەیت
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    onClick={handleDownload} 
                    className="w-full"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    بڕۆ بۆ پەیجی دابەزاندن
                  </Button>

                  <div className="space-y-2">
                    <p className="text-sm text-slate-400">فۆرماتەکانی دابەزاندن:</p>
                    <ul className="text-sm space-y-1 text-slate-300">
                      <li>• GLB (Recommended)</li>
                      <li>• FBX</li>
                      <li>• OBJ</li>
                      <li>• GLTF</li>
                      <li>• USDZ</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Guide */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ڕێنمایی بەکارهێنان</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <div>
                    <p className="font-medium text-white mb-1">1. بینین:</p>
                    <p>Mouse بەکاربهێنە بۆ سوڕاندنەوە، zoom، و جووڵاندن</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">2. دابەزاندن:</p>
                    <p>کلیک لەسەر دوگمە و لە Sketchfab login بکە</p>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">3. بەکارهێنان:</p>
                    <p>لە Blender، Unity، یان هەر نەرمەکاڵایەکی 3D import بکە</p>
                  </div>
                </CardContent>
              </Card>

              {/* UniRig Integration */}
              <Card className="border-[#10B2E3]">
                <CardHeader>
                  <CardTitle className="text-lg text-[#10B2E3]">⚡ UniRig Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-300">
                    دوای دابەزاندن، دەتوانیت لە UniRig Demo بەکاری بهێنیت بۆ Auto-Rigging
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.location.href = '/physiotherapist/unirig-demo'}
                  >
                    بڕۆ بۆ UniRig Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}
