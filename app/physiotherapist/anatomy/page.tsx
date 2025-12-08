"use client"

import { Suspense, useState } from "react"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Eye, RotateCw, Home, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Center } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as THREE from "three"

// 3D Model Component
function SkeletonModel({ rotation, zoom }: { rotation: number; zoom: number }) {
  const { scene } = useGLTF('/skeleton_pre-cut.glb')
  const groupRef = useRef<THREE.Group>(null)
  
  useEffect(() => {
    if (scene) {
      // Calculate bounding box to find center
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      
      // Move the scene so its center is at origin
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
      
      // Calculate scale to fit in view
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 3 / maxDim
      scene.scale.setScalar(scale)
    }
  }, [scene])
  
  return (
    <group 
      ref={groupRef}
      rotation={[0, (rotation * Math.PI) / 180, 0]} 
      scale={zoom / 100}
    >
      <primitive object={scene} />
    </group>
  )
}

// Preload the model
useGLTF.preload('/skeleton_pre-cut.glb')

export default function AnatomyToolPage() {
  const { t } = useLanguage()
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(100)

  const handleResetView = () => {
    setRotation(0)
    setZoom(100)
  }

  return (
    <AuthGuard>
      <FitproLayout role="physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Modern Header with Glassmorphism */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#10B2E3]/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#10B2E3] blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10B2E3] to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      Anatomy 3D Viewer
                    </h1>
                    <p className="text-cyan-400 mt-1 font-medium">
                      بینینی مۆدێلی سێ ڕەهەندی ئیسکەلێتی مرۆڤ
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-semibold">LIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main 3D Viewer with Ultra Modern Design */}
            <Card className="lg:col-span-3 border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                <div className="relative w-full h-[750px] rounded-2xl overflow-hidden group">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none z-10" />
                  
                  {/* 3D Canvas with React Three Fiber */}
                  <Canvas
                    className="w-full h-full"
                    camera={{ position: [0, 0, 5], fov: 75 }}
                  >
                    <color attach="background" args={['#0f172a']} />
                    
                    {/* Lights */}
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 10, 7.5]} intensity={1.2} />
                    <directionalLight position={[-5, -10, -7.5]} intensity={0.8} />
                    <pointLight position={[0, 5, 0]} intensity={0.5} />
                    
                    {/* 3D Model */}
                    <Suspense fallback={null}>
                      <SkeletonModel rotation={rotation} zoom={zoom} />
                    </Suspense>
                    
                    {/* Camera Controls */}
                    <OrbitControls 
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      mouseButtons={{
                        LEFT: 2,    // Pan with left click
                        MIDDLE: 1,  // Zoom with middle click
                        RIGHT: 0    // Rotate with right click
                      }}
                      touches={{
                        ONE: 2,     // Pan with one finger
                        TWO: 0      // Rotate with two fingers
                      }}
                      minDistance={2}
                      maxDistance={10}
                      target={[0, 0, 0]}
                    />
                  </Canvas>

                  {/* Corner Info Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                      <p className="text-cyan-400 text-xs font-bold">3D MODEL LOADED</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modern Control Panel */}
            <div className="space-y-4">
              {/* View Controls Card */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                      کۆنترۆڵی بینین
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Rotation Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-slate-300 font-semibold flex items-center gap-2">
                        <RotateCw className="w-4 h-4 text-cyan-400" />
                        سوڕانەوە
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold">
                        {rotation}°
                      </span>
                    </div>
                    <Slider
                      value={[rotation]}
                      onValueChange={(value) => setRotation(value[0])}
                      min={0}
                      max={360}
                      step={1}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-blue-500 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-cyan-500/50"
                    />
                  </div>

                  {/* Zoom Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-slate-300 font-semibold flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-400" />
                        زووم
                      </label>
                      <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold">
                        {zoom}%
                      </span>
                    </div>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      min={50}
                      max={200}
                      step={5}
                      className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-blue-500 [&_[role=slider]]:to-purple-500 [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-blue-500/50"
                    />
                  </div>

                  {/* Reset Button */}
                  <Button
                    onClick={handleResetView}
                    className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border border-white/10 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    ڕێکخستنەوە
                  </Button>
                </CardContent>
              </Card>

              {/* Model Info Card */}
              <Card className="border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                    زانیاری مۆدێل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">ناو</p>
                    <p className="text-white font-bold">Skeleton Pre-Cut</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">فۆرمات</p>
                    <p className="text-white font-bold">GLB (3D Binary)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">جۆر</p>
                    <p className="text-white font-bold">Human Skeleton</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400 text-xs mb-1">قەبارە</p>
                    <p className="text-cyan-400 font-bold">11.4 MB</p>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions Card */}
              <Card className="border-white/10 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                    ڕێنمایی
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <RotateCw className="w-3 h-3 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">سوڕانەوە</p>
                      <p className="text-slate-400 text-xs">slider بەکاربهێنە بۆ سوڕاندنی مۆدێل</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Eye className="w-3 h-3 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">زووم</p>
                      <p className="text-slate-400 text-xs">slider بەکاربهێنە بۆ نزیک و دوورکردنەوە</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Home className="w-3 h-3 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">ڕێکخستنەوە</p>
                      <p className="text-slate-400 text-xs">دوگمەی Reset بۆ گەڕانەوە بۆ دۆخی یەکەم</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}


