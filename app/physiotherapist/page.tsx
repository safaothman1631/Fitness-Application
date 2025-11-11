"use client"

import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, MessageCircle, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface SimplePatient {
	id: string
	name: string
	progress: number
	isActive: boolean
}

export default function PhysiotherapistDashboard() {
	const [patients, setPatients] = useState<SimplePatient[]>([])
	const [unreadMessages, setUnreadMessages] = useState(0)
	const physiotherapistId = "physiotherapist_1" // placeholder until auth integrated

	useEffect(() => {
		const load = async () => {
			try {
				const data = await dbService.getPatients(physiotherapistId)
				// Map to simplified structure (fallbacks for missing fields)
				setPatients(
					data.map((p: any) => ({
						id: p.id,
						name: p.name || "Unnamed",
						progress: typeof p.progress === "number" ? p.progress : 0,
						isActive: p.isActive !== false,
					}))
				)
				// Future: fetch messages separately
				setUnreadMessages(0)
			} catch (e) {
				console.error(e)
				toast.error("Failed to load patients")
			}
		}
		load()
	}, [])

	const activeCount = patients.filter((p) => p.isActive).length
	const avgProgress = patients.length ? Math.round(patients.reduce((a, p) => a + p.progress, 0) / patients.length) : 0

	return (
		<AuthGuard requiredRole="physiotherapist">
			<FitproLayout role="physiotherapist">
				<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Physiotherapist Dashboard</h1>
					<p className="text-gray-400">Overview of your patients and recent performance metrics.</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Total Patients</p>
									<p className="text-3xl font-bold text-white">{patients.length}</p>
								</div>
								<Users className="w-10 h-10 text-blue-500" />
							</div>
						</CardContent>
					</Card>
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Active Patients</p>
									<p className="text-3xl font-bold text-white">{activeCount}</p>
								</div>
								<Activity className="w-10 h-10 text-green-500" />
							</div>
						</CardContent>
					</Card>
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Unread Messages</p>
									<p className="text-3xl font-bold text-white">{unreadMessages}</p>
								</div>
								<MessageCircle className="w-10 h-10 text-cyan-500" />
							</div>
						</CardContent>
					</Card>
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Average Progress</p>
									<p className="text-3xl font-bold text-yellow-500">{avgProgress}%</p>
								</div>
								<TrendingUp className="w-10 h-10 text-yellow-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white">Recent Patients</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{patients.slice(0, 6).map((p) => (
							<div key={p.id} className="p-3 bg-slate-800/50 rounded-lg flex items-center justify-between">
								<div>
									<p className="text-white font-semibold text-sm">{p.name}</p>
									<p className="text-gray-400 text-xs">Progress {p.progress}%</p>
								</div>
								<span className={`px-2 py-1 rounded text-xs font-semibold ${p.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>{p.isActive ? "Active" : "Inactive"}</span>
							</div>
						))}
						{patients.length === 0 && <p className="text-gray-400 text-sm">No patients yet.</p>}
					</CardContent>
				</Card>
				</div>
			</FitproLayout>
		</AuthGuard>
	)
}
