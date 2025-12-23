"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { dbService } from "@/lib/db-service"
import { useLanguage } from "@/hooks/useLanguage"
import { toast } from "sonner"
import { Search, Activity, User, Calendar, FileText, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityLog {
	id: string
	timestamp: string
	action: string
	actorId: string
	actorName: string
	actorRole: string
	targetType: string
	targetId: string
	targetName: string
	details: any
	description: string
}

export default function ActivityLogsPage() {
	const { t } = useLanguage()
	const [logs, setLogs] = useState<ActivityLog[]>([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState("")
	const [filterAction, setFilterAction] = useState<string>("all")

	useEffect(() => {
		loadLogs()
	}, [])

	const loadLogs = async () => {
		try {
			setLoading(true)
			const data = await dbService.getActivityLogs({ limit: 100 })
			setLogs(data)
		} catch (error: any) {
			console.error("Error loading activity logs:", error)
			toast.error("Failed to load activity logs")
		} finally {
			setLoading(false)
		}
	}

	const filteredLogs = logs.filter((log) => {
		const matchesSearch =
			log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			log.description.toLowerCase().includes(searchTerm.toLowerCase())

		const matchesFilter = filterAction === "all" || log.action === filterAction

		return matchesSearch && matchesFilter
	})

	const getActionIcon = (action: string) => {
		if (action.includes("patient")) return <User className="w-4 h-4" />
		if (action.includes("appointment") || action.includes("session")) return <Calendar className="w-4 h-4" />
		if (action.includes("request")) return <FileText className="w-4 h-4" />
		return <Activity className="w-4 h-4" />
	}

	const getActionColor = (action: string) => {
		if (action.includes("created") || action.includes("scheduled")) return "bg-green-500/20 text-green-400 border-green-500/30"
		if (action.includes("updated") || action.includes("confirmed")) return "bg-blue-500/20 text-blue-400 border-blue-500/30"
		if (action.includes("deleted") || action.includes("cancelled")) return "bg-red-500/20 text-red-400 border-red-500/30"
		if (action.includes("completed")) return "bg-purple-500/20 text-purple-400 border-purple-500/30"
		return "bg-gray-500/20 text-gray-400 border-gray-500/30"
	}

	const getRoleColor = (role: string) => {
		switch (role) {
			case "admin":
				return "bg-orange-500/20 text-orange-400"
			case "superadmin":
				return "bg-red-500/20 text-red-400"
			case "trainer":
				return "bg-purple-500/20 text-purple-400"
			default:
				return "bg-gray-500/20 text-gray-400"
		}
	}

	const actionTypes = [
		{ value: "all", label: "All Actions" },
		{ value: "patient_created", label: "Patient Created" },
		{ value: "patient_updated", label: "Patient Updated" },
		{ value: "patient_deleted", label: "Patient Deleted" },
		{ value: "appointment_scheduled", label: "Appointment Scheduled" },
		{ value: "appointment_confirmed", label: "Appointment Confirmed" },
		{ value: "session_completed", label: "Session Completed" },
		{ value: "request_accepted", label: "Request Accepted" },
	]

	return (
		<SidebarSleek role="superadmin">
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
						<p className="text-gray-400">Loading activity logs...</p>
					</div>
				</div>
			) : (
				<div className="p-8 space-y-6">
					{/* Header */}
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
								Activity Logs
							</h1>
							<p className="text-gray-400 mt-2">Monitor all system activities and changes</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="text-right">
								<p className="text-2xl font-bold text-cyan-400">{filteredLogs.length}</p>
								<p className="text-sm text-gray-400">Total Activities</p>
							</div>
						</div>
					</div>

					{/* Filters */}
					<Card className="bg-slate-800/50 border-cyan-500/20">
						<CardContent className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="relative">
									<Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
									<Input
										type="text"
										placeholder="Search by actor, target, or description..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10 bg-slate-900/50 border-slate-700 text-white"
									/>
								</div>
								<select
									value={filterAction}
									onChange={(e) => setFilterAction(e.target.value)}
									className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
								>
									{actionTypes.map((type) => (
										<option key={type.value} value={type.value}>
											{type.label}
										</option>
									))}
								</select>
							</div>
						</CardContent>
					</Card>

					{/* Activity Timeline */}
					<Card className="bg-slate-800/50 border-cyan-500/20">
						<CardHeader>
							<CardTitle className="text-white flex items-center gap-2">
								<Activity className="w-5 h-5 text-cyan-400" />
								Activity Timeline
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-800/50">
							{filteredLogs.length === 0 ? (
								<div className="text-center py-12">
									<AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
									<p className="text-gray-400">No activity logs found</p>
								</div>
							) : (
								filteredLogs.map((log) => (
									<div
										key={log.id}
										className="p-4 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-cyan-500/30 transition-all"
									>
										<div className="flex items-start justify-between mb-2">
											<div className="flex items-center gap-3">
												<div className={cn("p-2 rounded-lg", getActionColor(log.action))}>
													{getActionIcon(log.action)}
												</div>
												<div>
													<div className="flex items-center gap-2 mb-1">
														<span className="text-white font-medium">{log.actorName || log.actorId}</span>
														<Badge className={cn("text-xs", getRoleColor(log.actorRole))}>
															{log.actorRole}
														</Badge>
													</div>
													<p className="text-sm text-gray-400">{log.description}</p>
												</div>
											</div>
											<div className="text-right">
												<p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
												<Badge className={cn("mt-1 text-xs border", getActionColor(log.action))}>
													{log.action.replace(/_/g, " ")}
												</Badge>
											</div>
										</div>

										{/* Target Info */}
										{log.targetName && (
											<div className="mt-2 pt-2 border-t border-slate-700">
												<div className="flex items-center gap-2 text-sm">
													<span className="text-gray-500">Target:</span>
													<span className="text-cyan-400">{log.targetName}</span>
													{log.targetType && (
														<Badge variant="outline" className="text-xs">
															{log.targetType}
														</Badge>
													)}
												</div>
											</div>
										)}

										{/* Details */}
										{log.details && Object.keys(log.details).length > 0 && (
											<div className="mt-2 pt-2 border-t border-slate-700">
												<details className="text-sm">
													<summary className="text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors">
														View Details
													</summary>
													<div className="mt-2 p-3 rounded bg-slate-800/50">
														<pre className="text-xs text-gray-300 overflow-x-auto">
															{JSON.stringify(log.details, null, 2)}
														</pre>
													</div>
												</details>
											</div>
										)}
									</div>
								))
							)}
						</CardContent>
					</Card>
				</div>
			)}
		</SidebarSleek>
	)
}
