"use client"
import { useState } from "react"
import FitproLayout from "@/components/fitpro-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle2, AlertCircle, MessageSquare, Calendar } from "lucide-react"

interface Notification {
	id: string
	type: "message" | "appointment" | "alert"
	title: string
	message: string
	timestamp: string
	isRead: boolean
}

export default function PhysiotherapistNotifications() {
	const [notifications, setNotifications] = useState<Notification[]>([
		{
			id: "1",
			type: "message",
			title: "New Message from Ali Khan",
			message: "I have severe pain in my lower back",
			timestamp: "2025-11-10 10:30",
			isRead: false,
		},
		{
			id: "2",
			type: "appointment",
			title: "Appointment Reminder",
			message: "Fatima Ahmed's appointment is tomorrow at 2:00 PM",
			timestamp: "2025-11-09 14:20",
			isRead: false,
		},
		{
			id: "3",
			type: "alert",
			title: "Patient Progress Alert",
			message: "Ali Khan has not recorded progress in 5 days",
			timestamp: "2025-11-08 09:15",
			isRead: true,
		},
	])

	const handleMarkAsRead = (id: string) => {
		setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
	}

	const handleDelete = (id: string) => {
		setNotifications(notifications.filter((n) => n.id !== id))
	}

	const getIcon = (type: string) => {
		switch (type) {
			case "message":
				return <MessageSquare className="w-5 h-5 text-blue-400" />
			case "appointment":
				return <Calendar className="w-5 h-5 text-green-400" />
			case "alert":
				return <AlertCircle className="w-5 h-5 text-yellow-400" />
			default:
				return <MessageSquare className="w-5 h-5 text-gray-400" />
		}
	}

	return (
		<FitproLayout role="physiotherapist">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
					<p className="text-gray-400">Stay updated with patient messages and appointment reminders</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Total Notifications</p>
									<p className="text-3xl font-bold text-white">{notifications.length}</p>
								</div>
								<MessageSquare className="w-10 h-10 text-blue-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Unread</p>
									<p className="text-3xl font-bold text-yellow-500">{notifications.filter((n) => !n.isRead).length}</p>
								</div>
								<AlertCircle className="w-10 h-10 text-yellow-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Read</p>
									<p className="text-3xl font-bold text-green-500">{notifications.filter((n) => n.isRead).length}</p>
								</div>
								<CheckCircle2 className="w-10 h-10 text-green-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white">Recent Notifications</CardTitle>
					</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{notifications.length > 0 ? (
									notifications.map((notif) => (
										<div
											key={notif.id}
											className={`rounded-lg p-4 flex items-start gap-4 ${notif.isRead ? "bg-slate-800/30 border border-slate-700" : "bg-slate-800/50 border border-slate-600"}`}
										>
											<div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>

											<div className="flex-1">
												<h3 className="font-semibold text-white">{notif.title}</h3>
												<p className="text-gray-400 text-sm mt-1">{notif.message}</p>
												<p className="text-gray-500 text-xs mt-2">{notif.timestamp}</p>
											</div>

											<div className="flex gap-2 flex-shrink-0">
												{!notif.isRead && (
													<Button
														size="sm"
														variant="ghost"
														className="text-gray-400 hover:text-green-400"
														onClick={() => handleMarkAsRead(notif.id)}
													>
														<CheckCircle2 className="w-4 h-4" />
													</Button>
												)}
												<Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400" onClick={() => handleDelete(notif.id)}>
													<Trash2 className="w-4 h-4" />
												</Button>
											</div>
										</div>
									))
								) : (
									<p className="text-gray-400 text-center py-8">No notifications</p>
								)}
							</div>
						</CardContent>
				</Card>
			</div>
		</FitproLayout>
	)
}
