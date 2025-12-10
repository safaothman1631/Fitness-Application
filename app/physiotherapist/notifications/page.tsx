"use client"
import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle2, AlertCircle, MessageSquare, Calendar } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Notification {
	id: string
	type: "message" | "appointment" | "alert"
	title: string
	message: string
	timestamp: string
	isRead: boolean
}

export default function PhysiotherapistNotifications() {
	const { t } = useLanguage()
	const [notifications, setNotifications] = useState<Notification[]>([])
	const [loading, setLoading] = useState(true)
	
	// TODO: Replace with actual physiotherapist ID from auth
	const physiotherapistId = "physio1"

	useEffect(() => {
		loadNotifications()
	}, [])

	const loadNotifications = async () => {
		try {
			setLoading(true)
			const data = await dbService.getNotifications(physiotherapistId)
			setNotifications(data.notifications || [])
		} catch (error) {
			console.error("Error loading notifications:", error)
			toast.error("Failed to load notifications")
		} finally {
			setLoading(false)
		}
	}

	const handleMarkAsRead = async (id: string) => {
		try {
			await dbService.markNotificationAsRead(id)
			setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
			toast.success(t("success"))
		} catch (error) {
			console.error("Error marking notification as read:", error)
			toast.error("Failed to mark as read")
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await dbService.deleteNotification(id)
			setNotifications(notifications.filter((n) => n.id !== id))
			toast.success(t("success"))
		} catch (error) {
			console.error("Error deleting notification:", error)
			toast.error("Failed to delete notification")
		}
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
		<SidebarSleek role="physiotherapist">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">{t("notifications")}</h1>
					<p className="text-gray-400">{t("stayUpdatedMessages")}</p>
				</div>

				{loading && (
					<div className="text-center py-8">
						<p className="text-gray-400">{t("loading")}...</p>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("totalNotifications")}</p>
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
									<p className="text-gray-400 text-sm mb-1">{t("unread")}</p>
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
									<p className="text-gray-400 text-sm mb-1">{t("read")}</p>
									<p className="text-3xl font-bold text-green-500">{notifications.filter((n) => n.isRead).length}</p>
								</div>
								<CheckCircle2 className="w-10 h-10 text-green-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white">{t("recentNotifications")}</CardTitle>
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
														title={t("markAsRead")}
													>
														<CheckCircle2 className="w-4 h-4" />
													</Button>
												)}
												<Button 
													size="sm" 
													variant="ghost" 
													className="text-gray-400 hover:text-red-400" 
													onClick={() => handleDelete(notif.id)}
													title={t("delete")}
												>
													<Trash2 className="w-4 h-4" />
												</Button>
											</div>
										</div>
									))
								) : (
									<p className="text-gray-400 text-center py-8">{t("noNotifications")}</p>
								)}
							</div>
						</CardContent>
				</Card>
			</div>
		</SidebarSleek>
	)
}

