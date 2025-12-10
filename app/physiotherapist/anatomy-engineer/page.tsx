"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, Play, Pause, RotateCw, Download, Upload, AlertCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Anatomy3DModel from '@/components/anatomy-3d-model'

export default function AnatomyEngineerPage() {
	const { t } = useLanguage()
	const [showMuscles, setShowMuscles] = useState(true)
	const [showBones, setShowBones] = useState(false)
	const [zoom, setZoom] = useState(100)
	const [rotation, setRotation] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	return (
		<AuthGuard>
			<SidebarSleek role="physiotherapist">
				<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
					<div className="max-w-[1800px] mx-auto">
						{/* Header */}
						<div className="mb-8">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl">
									<Wrench className="w-8 h-8 text-white" />
								</div>
								<div>
									<h1 className="text-4xl font-bold text-white">
										🔧 Anatomy Engineering Lab
									</h1>
									<p className="text-[#B6C4CF] mt-1">
										تاقیگەی ئەندازیاری ئەناتۆمی - بۆ تێست و گەشەپێدان
									</p>
								</div>
							</div>
						</div>

						<div className="grid lg:grid-cols-4 gap-6">
							{/* Main 3D Viewer */}
							<Card className="lg:col-span-3 bg-[#101A23]/95 border-[#2E3944]">
								<CardHeader className="border-b border-[#2E3944]">
									<CardTitle className="text-white flex items-center gap-2">
										<Play className="w-5 h-5 text-purple-400" />
										3D Viewer - مۆدێلی سێ ڕەهەندی
									</CardTitle>
								</CardHeader>
								<CardContent className="p-8">
									<div 
										className="relative w-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl overflow-hidden" 
										style={{ height: '700px' }}
									>
										<Anatomy3DModel 
											showMuscles={showMuscles}
											showBones={showBones}
											showNerves={false}
											rotation={rotation}
											zoom={zoom}
										/>
									</div>
								</CardContent>
							</Card>

							{/* Control Panel */}
							<div className="space-y-6">
								{/* Display Controls */}
								<Card className="bg-[#101A23]/95 border-[#2E3944]">
									<CardHeader className="border-b border-[#2E3944]">
										<CardTitle className="text-white text-lg">
											🎮 Display Controls
										</CardTitle>
									</CardHeader>
									<CardContent className="p-4 space-y-4">
										<div>
											<label className="flex items-center gap-2 text-white cursor-pointer">
												<input 
													type="checkbox" 
													checked={showMuscles}
													onChange={(e) => setShowMuscles(e.target.checked)}
													className="w-4 h-4"
												/>
												<span>💪 Show Muscles</span>
											</label>
										</div>
										<div>
											<label className="flex items-center gap-2 text-white cursor-pointer">
												<input 
													type="checkbox" 
													checked={showBones}
													onChange={(e) => setShowBones(e.target.checked)}
													className="w-4 h-4"
												/>
												<span>🦴 Show Bones</span>
											</label>
										</div>
										<div className="pt-4 border-t border-[#2E3944]">
											<label className="text-sm text-[#B6C4CF] mb-2 block">
												Zoom: {zoom}%
											</label>
											<input 
												type="range" 
												min="50" 
												max="200" 
												value={zoom}
												onChange={(e) => setZoom(Number(e.target.value))}
												className="w-full"
											/>
										</div>
										<div>
											<label className="text-sm text-[#B6C4CF] mb-2 block">
												Rotation: {rotation}°
											</label>
											<input 
												type="range" 
												min="0" 
												max="360" 
												value={rotation}
												onChange={(e) => setRotation(Number(e.target.value))}
												className="w-full"
											/>
										</div>
									</CardContent>
								</Card>

								{/* Animation Controls */}
								<Card className="bg-[#101A23]/95 border-[#2E3944]">
									<CardHeader className="border-b border-[#2E3944]">
										<CardTitle className="text-white text-lg">
											🎬 Animation
										</CardTitle>
									</CardHeader>
									<CardContent className="p-4 space-y-3">
										<Button
											onClick={() => {
												setIsAnimating(!isAnimating)
												toast.success(isAnimating ? "Animation stopped" : "Animation started")
											}}
											className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
										>
											{isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
											{isAnimating ? "Stop" : "Start"} Animation
										</Button>
										<Button
											onClick={() => {
												setRotation(0)
												setZoom(100)
												toast.info("Reset to default")
											}}
											variant="outline"
											className="w-full"
										>
											<RotateCw className="w-4 h-4 mr-2" />
											Reset View
										</Button>
									</CardContent>
								</Card>

								{/* Export/Import */}
								<Card className="bg-[#101A23]/95 border-[#2E3944]">
									<CardHeader className="border-b border-[#2E3944]">
										<CardTitle className="text-white text-lg">
											💾 Export/Import
										</CardTitle>
									</CardHeader>
									<CardContent className="p-4 space-y-3">
										<Button
											onClick={() => toast.info("Export feature coming soon")}
											variant="outline"
											className="w-full"
										>
											<Download className="w-4 h-4 mr-2" />
											Export Model
										</Button>
										<Button
											onClick={() => toast.info("Import feature coming soon")}
											variant="outline"
											className="w-full"
										>
											<Upload className="w-4 h-4 mr-2" />
											Import Model
										</Button>
									</CardContent>
								</Card>

								{/* System Info */}
								<Card className="bg-[#101A23]/95 border-[#2E3944]">
									<CardHeader className="border-b border-[#2E3944]">
										<CardTitle className="text-white text-lg">
											ℹ️ System Info
										</CardTitle>
									</CardHeader>
									<CardContent className="p-4 space-y-2 text-sm">
										<div className="flex justify-between text-[#B6C4CF]">
											<span>3D Engine:</span>
											<span className="text-white">Sketchfab</span>
										</div>
										<div className="flex justify-between text-[#B6C4CF]">
											<span>Models:</span>
											<span className="text-white">34 parts</span>
										</div>
										<div className="flex justify-between text-[#B6C4CF]">
											<span>Status:</span>
											<span className="text-green-400">● Active</span>
										</div>
									</CardContent>
								</Card>

								{/* Warning */}
								<Card className="bg-amber-950/20 border-amber-900/50">
									<CardContent className="p-4">
										<div className="flex gap-2">
											<AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
											<div className="text-sm">
												<p className="text-amber-200 font-semibold mb-1">
													Engineering Mode
												</p>
												<p className="text-amber-300/80">
													This page is for testing and development. Use console (F12) for debugging.
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</SidebarSleek>
		</AuthGuard>
	)
}

