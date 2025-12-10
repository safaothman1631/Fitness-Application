"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Users, ClipboardList, Bone, Activity, Plus, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Appointment {
	id: string
	time: string
	patientName: string
	patientId: string
	type: string
	status: "completed" | "upcoming" | "cancelled"
	date: string
	notes?: string
	price?: string
}

interface Patient {
	id: string
	name: string
	email: string
	phone?: string
	isActive: boolean
}

export default function PhysiotherapistDashboard() {
	const { t } = useLanguage()
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [patients, setPatients] = useState<Patient[]>([])
	const [loading, setLoading] = useState(true)
	const [newAppointment, setNewAppointment] = useState({
		patientId: "",
		date: "",
		time: "",
		type: "Initial Assessment",
		notes: "",
		price: ""
	})
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		try {
			setLoading(true)
			// Load patients with role 'user'
			const usersData = await dbService.getUsers()
			const patientsList = usersData
				.filter((u: any) => u.role === 'user')
				.map((u: any) => ({
					id: u.id,
					name: u.name || u.fullName || u.email?.split('@')[0] || 'Unknown',
					email: u.email || '',
					phone: u.phone || '',
					isActive: u.status === 'active'
				}))
			setPatients(patientsList)

			// TODO: Load real appointments from Firestore when collection is ready
			setAppointments([])
		} catch (error) {
			console.error('Error loading data:', error)
			toast.error('Failed to load data')
		} finally {
			setLoading(false)
		}
	}

	const handleCreateAppointment = async () => {
		if (!newAppointment.patientId || !newAppointment.date || !newAppointment.time) {
			toast.error('Please fill all required fields')
			return
		}

		const patient = patients.find(p => p.id === newAppointment.patientId)
		if (!patient) return

		const appointment: Appointment = {
			id: Date.now().toString(),
			patientId: newAppointment.patientId,
			patientName: patient.name,
			date: newAppointment.date,
			time: newAppointment.time,
			type: newAppointment.type,
			status: "upcoming",
			notes: newAppointment.notes,
			price: newAppointment.price
		}

		setAppointments([...appointments, appointment])
		setIsDialogOpen(false)
		setNewAppointment({ patientId: "", date: "", time: "", type: "Initial Assessment", notes: "", price: "" })
		toast.success('Appointment created successfully')
	}

	const todayAppointments = appointments.filter(apt => {
		const today = new Date().toISOString().split('T')[0]
		return apt.date === today
	})

	const stats = {
		todayAppointments: todayAppointments.length,
		totalPatients: patients.length,
		activePatients: patients.filter(p => p.isActive).length,
		completedToday: todayAppointments.filter(apt => apt.status === 'completed').length
	}

	return (
		<AuthGuard requiredRole="physiotherapist">
			<SidebarSleek role="physiotherapist">
				<div className="space-y-6">
					{/* Welcome Section */}
					<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B2E3] to-[#73E8FF] flex items-center justify-center shadow-lg shadow-[#10B2E3]/30">
							<Activity className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-white">{t("welcomeBack")}, Dr. Admin</h1>
							<p className="text-[#B6C4CF] text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
						</div>
					</div>
				</div>

				{/* Removed Add Appointment Dialog - Use Appointments page instead */}
				{false && (
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button className="bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] hover:from-[#0E9FCC] hover:to-[#5DD5EE] text-white px-6 py-6 text-base font-bold shadow-lg shadow-[#10B2E3]/30">
								<Plus className="w-5 h-5 mr-2" />
								{t("addAppointment")}
							</Button>
						</DialogTrigger>
						<DialogContent className="bg-[#101A23] border-[#2E3944]">
							<DialogHeader>
								<DialogTitle className="text-white">{t("addAppointment")}</DialogTitle>
							</DialogHeader>
							<div className="space-y-4 mt-4">
								<div>
									<Label className="text-[#B6C4CF]">{t("selectPatient")}</Label>
									<select
										className="w-full mt-1 bg-[#0E151B] border-[#2E3944] text-white rounded-lg p-2"
										value={newAppointment.patientId}
										onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
									>
										<option value="">{t("selectPatient")}</option>
										{patients.map(p => (
											<option key={p.id} value={p.id}>{p.name}</option>
										))}
									</select>
								</div>
								<div>
									<Label className="text-[#B6C4CF]">{t("appointmentDate")}</Label>
									<Input
										type="date"
										className="mt-1 bg-[#0E151B] border-[#2E3944] text-white"
										value={newAppointment.date}
										onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
									/>
								</div>
								<div>
									<Label className="text-[#B6C4CF]">{t("appointmentTime")}</Label>
									<Input
										type="time"
										className="mt-1 bg-[#0E151B] border-[#2E3944] text-white"
										value={newAppointment.time}
										onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
									/>
								</div>
								<div>
									<Label className="text-[#B6C4CF]">{t("appointmentType")}</Label>
									<select
										className="w-full mt-1 bg-[#0E151B] border-[#2E3944] text-white rounded-lg p-2"
										value={newAppointment.type}
										onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
									>
										<option>Initial Assessment</option>
										<option>Follow-up</option>
										<option>Therapy Session</option>
										<option>Check-up</option>
										<option>Consultation</option>
									</select>
								</div>
								<div>
									<Label className="text-[#B6C4CF]">{t("appointmentFee")} (IQD)</Label>
									<Input
										type="number"
										className="mt-1 bg-[#0E151B] border-[#2E3944] text-white"
										value={newAppointment.price}
										onChange={(e) => setNewAppointment({ ...newAppointment, price: e.target.value })}
										placeholder="25000"
									/>
								</div>
								<div>
									<Label className="text-[#B6C4CF]">{t("appointmentNotes")}</Label>
									<Input
										className="mt-1 bg-[#0E151B] border-[#2E3944] text-white"
										value={newAppointment.notes}
										onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
										placeholder="Any additional notes..."
									/>
								</div>
								<Button
									className="w-full bg-gradient-to-r from-[#10B2E3] to-[#73E8FF] hover:from-[#0E9FCC] hover:to-[#5DD5EE] text-white"
									onClick={handleCreateAppointment}
								>
									{t("addAppointment")}
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				)}

					{/* Stats Grid */}
					<div className="grid grid-cols-2 gap-4 mb-6">
						<Card className="bg-gradient-to-br from-[#10B2E3]/10 to-[#73E8FF]/5 border-[#10B2E3]/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between mb-2">
									<Calendar className="w-8 h-8 text-[#73E8FF]" />
								</div>
							<p className="text-3xl font-bold text-white mb-1">{loading ? "..." : stats.todayAppointments}</p>
							<p className="text-[#B6C4CF] text-xs">{t("todayAppointments")}</p>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between mb-2">
									<Users className="w-8 h-8 text-green-400" />
								</div>
							<p className="text-3xl font-bold text-white mb-1">{loading ? "..." : stats.totalPatients}</p>
							<p className="text-[#B6C4CF] text-xs">{t("totalPatients")}</p>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between mb-2">
									<Users className="w-8 h-8 text-orange-400" />
								</div>
							<p className="text-3xl font-bold text-white mb-1">{loading ? "..." : stats.activePatients}</p>
							<p className="text-[#B6C4CF] text-xs">{t("activePatients")}</p>
							</CardContent>
						</Card>

						<Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-purple-500/30 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between mb-2">
									<Activity className="w-8 h-8 text-purple-400" />
								</div>
							<p className="text-3xl font-bold text-white mb-1">{loading ? "..." : stats.completedToday}</p>
							<p className="text-[#B6C4CF] text-xs">{t("completedToday")}</p>
							</CardContent>
						</Card>
					</div>

					{/* Quick Actions */}
					<Card className="bg-[#101A23]/95 border-[#2E3944] mb-6">
						<CardContent className="p-5">
						<h2 className="text-white font-semibold mb-4 flex items-center gap-2">
							<Bone className="w-5 h-5 text-[#73E8FF]" />
							{t("quickActions")}
						</h2>
							<div className="grid grid-cols-2 gap-3">
								<button 
									onClick={() => setIsDialogOpen(true)}
									className="p-4 rounded-2xl bg-gradient-to-br from-[#10B2E3]/20 to-[#73E8FF]/10 border border-[#10B2E3]/30 hover:scale-95 active:scale-90 transition-all duration-300"
								>
							<Calendar className="w-6 h-6 text-[#73E8FF] mb-2" />
							<p className="text-white text-sm font-semibold">{t("newAppointment")}</p>
								</button>
								<button 
									onClick={() => toast.info('Patients page coming soon')}
									className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 hover:scale-95 active:scale-90 transition-all duration-300"
								>
							<Users className="w-6 h-6 text-green-400 mb-2" />
							<p className="text-white text-sm font-semibold">{t("viewPatients")}</p>
								</button>
								<button 
									onClick={() => window.location.href = '/physiotherapist/anatomy'}
									className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 hover:scale-95 active:scale-90 transition-all duration-300"
								>
							<Bone className="w-6 h-6 text-orange-400 mb-2" />
							<p className="text-white text-sm font-semibold">{t("anatomyTool")}</p>
								</button>
								<button 
									onClick={() => toast.info('Report writing coming soon')}
									className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 hover:scale-95 active:scale-90 transition-all duration-300"
								>
							<ClipboardList className="w-6 h-6 text-purple-400 mb-2" />
							<p className="text-white text-sm font-semibold">{t("writeReport")}</p>
								</button>
							</div>
						</CardContent>
					</Card>

					{/* Today's Appointments */}
					<Card className="bg-[#101A23]/95 border-[#2E3944]">
						<CardContent className="p-5">
						<h2 className="text-white font-semibold mb-4 flex items-center gap-2">
							<Calendar className="w-5 h-5 text-[#73E8FF]" />
							{t("todayAppointments")}
						</h2>
							<div className="space-y-3">
								{loading ? (
									<p className="text-[#B6C4CF] text-sm text-center py-4">Loading appointments...</p>
								) : todayAppointments.length === 0 ? (
									<div className="text-center py-8">
								<Clock className="w-12 h-12 text-[#B6C4CF] mx-auto mb-3 opacity-50" />
								<p className="text-[#B6C4CF] text-sm">{t("noAppointmentsToday")}</p>
								<p className="text-[#B6C4CF] text-xs mt-1">{t("scheduleFirstAppointment")}</p>
									</div>
								) : (
									todayAppointments.map((apt) => (
										<div key={apt.id} className="p-4 rounded-xl bg-[#0E151B]/50 border border-[#2E3944] hover:border-[#10B2E3]/30 transition-all duration-300">
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B2E3] to-[#73E8FF] flex items-center justify-center">
														<span className="text-white font-bold text-sm">{apt.patientName.charAt(0)}</span>
													</div>
													<div>
														<p className="text-white font-semibold text-sm">{apt.patientName}</p>
														<p className="text-[#B6C4CF] text-xs">{apt.type}</p>
													</div>
												</div>
												<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
													apt.status === 'completed' 
														? 'bg-green-500/20 text-green-400' 
														: 'bg-[#10B2E3]/20 text-[#73E8FF]'
												}`}>
													{apt.status === 'completed' ? 'Completed' : apt.time}
												</span>
											</div>
										</div>
									))
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</SidebarSleek>
		</AuthGuard>
	)
}
