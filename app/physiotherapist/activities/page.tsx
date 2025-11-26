"use client"

import { useState } from "react"
import FitproLayout from "@/components/fitpro-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddButton, DeleteButton, EditButton, CancelButton, SaveButton } from "@/components/buttons"
import { LineChart, Activity, TrendingUp, Users, Calendar, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityLog {
	id: string
	patientName: string
	type: "progress" | "message" | "session" | "assessment"
	description: string
	timestamp: string
}

export default function ActivitiesPage() {
	const [activities, setActivities] = useState<ActivityLog[]>([
		{
			id: "1",
			patientName: "Ali Khan",
			type: "progress",
			description: "Completed mobility assessment - improved by 10%",
			timestamp: "2025-11-10 10:30",
		},
		{
			id: "2",
			patientName: "Fatima Ahmed",
			type: "session",
			description: "Attended rehabilitation session",
			timestamp: "2025-11-10 09:15",
		},
		{
			id: "3",
			patientName: "Ali Khan",
			type: "message",
			description: "Sent message: Hi, I have some pain in my lower back",
			timestamp: "2025-11-10 08:45",
		},
		{
			id: "4",
			patientName: "Fatima Ahmed",
			type: "assessment",
			description: "Knee injury assessment - initial evaluation completed",
			timestamp: "2025-11-09 14:20",
		},
		{
			id: "5",
			patientName: "Ali Khan",
			type: "session",
			description: "Attended rehabilitation session",
			timestamp: "2025-11-09 10:00",
		},
	])

	const [searchActivity, setSearchActivity] = useState("")
	const [filterType, setFilterType] = useState<string>("all")
	const [activityModalOpen, setActivityModalOpen] = useState(false)
	const [editingActivityId, setEditingActivityId] = useState<string | null>(null)
		const [formData, setFormData] = useState<{
			patientName: string
			type: ActivityLog["type"]
			description: string
		}>({
			patientName: "",
			type: "session",
			description: "",
		})

	const filteredActivities = activities.filter((a) => {
		const matchesSearch = a.patientName.toLowerCase().includes(searchActivity.toLowerCase()) || a.description.toLowerCase().includes(searchActivity.toLowerCase())
		const matchesFilter = filterType === "all" || a.type === filterType
		return matchesSearch && matchesFilter
	})

	const handleAddActivity = () => {
		setEditingActivityId(null)
		setFormData({ patientName: "", type: "session", description: "" })
		setActivityModalOpen(true)
	}

	const handleEditActivity = (activity: ActivityLog) => {
		setEditingActivityId(activity.id)
		setFormData({ patientName: activity.patientName, type: activity.type, description: activity.description })
		setActivityModalOpen(true)
	}

	const handleSaveActivity = () => {
		if (!formData.patientName || !formData.description) {
			alert("Please fill all fields")
			return
		}

		if (editingActivityId) {
			setActivities(
				activities.map((a) =>
					a.id === editingActivityId
						? { ...a, patientName: formData.patientName, type: formData.type, description: formData.description }
						: a
				)
			)
		} else {
			const newActivity: ActivityLog = {
				id: Date.now().toString(),
				patientName: formData.patientName,
				type: formData.type,
				description: formData.description,
				timestamp: new Date().toLocaleString(),
			}
			setActivities([newActivity, ...activities])
		}
		setActivityModalOpen(false)
	}

	const handleDeleteActivity = (activityId: string) => {
		if (confirm("Delete this activity?")) {
			setActivities(activities.filter((a) => a.id !== activityId))
		}
	}

	const getActivityIcon = (type: string) => {
		switch (type) {
			case "progress":
				return <TrendingUp className="w-5 h-5 text-green-400" />
			case "message":
				return <Activity className="w-5 h-5 text-blue-400" />
			case "session":
				return <Calendar className="w-5 h-5 text-purple-400" />
			case "assessment":
				return <LineChart className="w-5 h-5 text-yellow-400" />
			default:
				return <Activity className="w-5 h-5 text-gray-400" />
		}
	}

	const getActivityColor = (type: string) => {
		switch (type) {
			case "progress":
				return "bg-green-500/10 border-green-500/30"
			case "message":
				return "bg-blue-500/10 border-blue-500/30"
			case "session":
				return "bg-purple-500/10 border-purple-500/30"
			case "assessment":
				return "bg-yellow-500/10 border-yellow-500/30"
			default:
				return "bg-gray-500/10 border-gray-500/30"
		}
	}

	const stats = [
		{ label: "Total Activities", value: activities.length, icon: Activity, color: "text-blue-400" },
		{ label: "Sessions Completed", value: activities.filter((a) => a.type === "session").length, icon: Calendar, color: "text-purple-400" },
		{ label: "Progress Updates", value: activities.filter((a) => a.type === "progress").length, icon: TrendingUp, color: "text-green-400" },
		{ label: "Active Patients", value: 2, icon: Users, color: "text-cyan-400" },
	]

	return (
		<FitproLayout role="physiotherapist">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Activities</h1>
					<p className="text-gray-400">Track all patient activities and progress</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{stats.map((stat) => {
						const Icon = stat.icon
						return (
							<Card key={stat.label} className="fitpro-card">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-gray-400 text-sm mb-1">{stat.label}</p>
											<p className="text-3xl font-bold text-white">{stat.value}</p>
										</div>
										<Icon className={`w-10 h-10 ${stat.color}`} />
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>

				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-white">
							<Activity className="w-5 h-5 text-blue-400" />
							Recent Activities
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col md:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
									<Input
										type="text"
										placeholder="Search activities..."
										value={searchActivity}
										onChange={(e) => setSearchActivity(e.target.value)}
										className="fitpro-input pl-10 rounded-xl"
									/>
								</div>
								<Select value={filterType} onValueChange={setFilterType}>
									<SelectTrigger className="w-full md:w-48 fitpro-input rounded-xl">
										<SelectValue placeholder="Filter by type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Activities</SelectItem>
										<SelectItem value="progress">Progress</SelectItem>
										<SelectItem value="session">Session</SelectItem>
										<SelectItem value="message">Message</SelectItem>
										<SelectItem value="assessment">Assessment</SelectItem>
									</SelectContent>
								</Select>
								<AddButton onClick={handleAddActivity} label="Add Activity" className="rounded-xl" />
							</div>
						</div>

						<div className="space-y-4">
							{filteredActivities.map((activity) => (
								<div key={activity.id} className={cn("p-4 rounded-lg border", getActivityColor(activity.type))}>
									<div className="flex gap-4 items-start">
										<div className="flex flex-col items-center pt-1">{getActivityIcon(activity.type)}</div>
										<div className="flex-1">
											<div className="flex items-center justify-between mb-1">
												<p className="text-white font-semibold">{activity.patientName}</p>
												<span className="text-xs text-gray-400">{activity.timestamp}</span>
											</div>
											<p className="text-gray-300 text-sm">{activity.description}</p>
											<div className="mt-2 inline-block">
												<span
													className={cn(
														"text-xs font-semibold px-2 py-1 rounded",
														activity.type === "progress"
															? "bg-green-500/20 text-green-400"
															: activity.type === "message"
															? "bg-blue-500/20 text-blue-400"
															: activity.type === "session"
															? "bg-purple-500/20 text-purple-400"
															: "bg-yellow-500/20 text-yellow-400"
													)}
												>
													{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
												</span>
											</div>
										</div>
										<div className="flex gap-2 flex-shrink-0">
											<EditButton onClick={() => handleEditActivity(activity)} />
											<DeleteButton onClick={() => handleDeleteActivity(activity.id)} />
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white">Activity Types</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							{[
								{ label: "Progress Updates", count: activities.filter((a) => a.type === "progress").length, color: "bg-green-500/20", textColor: "text-green-400" },
								{ label: "Sessions", count: activities.filter((a) => a.type === "session").length, color: "bg-purple-500/20", textColor: "text-purple-400" },
								{ label: "Messages", count: activities.filter((a) => a.type === "message").length, color: "bg-blue-500/20", textColor: "text-blue-400" },
								{ label: "Assessments", count: activities.filter((a) => a.type === "assessment").length, color: "bg-yellow-500/20", textColor: "text-yellow-400" },
							].map((type) => (
								<div key={type.label} className={cn("p-4 rounded-lg", type.color)}>
									<p className={cn("text-sm font-semibold mb-2", type.textColor)}>{type.label}</p>
									<p className="text-2xl font-bold text-white">{type.count}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Dialog open={activityModalOpen} onOpenChange={setActivityModalOpen}>
					<DialogContent className="bg-slate-900 border-slate-700">
						<DialogHeader>
							<DialogTitle className="text-white">{editingActivityId ? "Edit Activity" : "Add New Activity"}</DialogTitle>
							<DialogDescription className="text-gray-400">Create or update activity record</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label className="text-gray-300 mb-2 block">Patient Name</Label>
								<Input
									value={formData.patientName}
									onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
									placeholder="Enter patient name"
									className="fitpro-input rounded-xl"
								/>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Activity Type</Label>
								<Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
									<SelectTrigger className="fitpro-input rounded-xl">
										<SelectValue placeholder="Select activity type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="progress">Progress</SelectItem>
										<SelectItem value="session">Session</SelectItem>
										<SelectItem value="message">Message</SelectItem>
										<SelectItem value="assessment">Assessment</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Description</Label>
								<Input
									value={formData.description}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
									placeholder="Enter activity description"
									className="fitpro-input rounded-xl"
								/>
							</div>
						</div>
						<DialogFooter>
							<CancelButton onClick={() => setActivityModalOpen(false)} />
							<SaveButton onClick={handleSaveActivity} label={editingActivityId ? "Update Activity" : "Add Activity"} />
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</FitproLayout>
	)
}
