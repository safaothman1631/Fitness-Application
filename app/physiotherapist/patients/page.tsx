"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { AddButton, DeleteButton, EditButton, MessageButton, ProgressButton, CancelButton, SaveButton } from "@/components/buttons"
import { Search, Users, Phone, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Session {
	id: string
	date: string
	time: string
	price: string
	status: "scheduled" | "confirmed" | "completed"
	duration: number
	sessionNotes?: string
	exercisesGiven?: string
	progressRating?: number
	confirmedAt?: string
	completedAt?: string
}

interface Patient {
	id: string
	name: string
	email: string
	phone: string
	age: number
	condition: string
	joinDate: string
	sessionCount: number
	progress: number
	isActive: boolean
	sessions?: Session[]
	currentAppointment?: {
		date: string
		time: string
		price: string
		notes?: string
		status?: "scheduled" | "confirmed" | "completed"
		sessionDetails?: {
			actualDuration: number
			sessionNotes: string
			exercisesGiven?: string
			nextSessionDate?: string
			progressRating: number
			confirmedAt: string
		}
	}
	// Keep old appointment field for backward compatibility
	appointment?: {
		date: string
		time: string
		price: string
		notes?: string
		status?: "scheduled" | "confirmed" | "completed"
		sessionDetails?: {
			actualDuration: number
			sessionNotes: string
			exercisesGiven?: string
			nextSessionDate?: string
			progressRating: number
			confirmedAt: string
		}
	}
}

export default function PatientsPage() {
	const { t } = useLanguage()

	const [patients, setPatients] = useState<Patient[]>([])
	const [loading, setLoading] = useState(true)
	const [searchPatient, setSearchPatient] = useState("")
	const [patientModalOpen, setPatientModalOpen] = useState(false)
	const [progressModalOpen, setProgressModalOpen] = useState(false)
	const [messageModalOpen, setMessageModalOpen] = useState(false)
	const [sessionViewModalOpen, setSessionViewModalOpen] = useState(false)
	const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
	const [selectedSession, setSelectedSession] = useState<Session | null>(null)
	const [editingPatientId, setEditingPatientId] = useState<string | null>(null)
	const [message, setMessage] = useState("")
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		age: 0,
		condition: "",
		sessionCount: 0,
	})

	// Get physiotherapist ID from localStorage
	const [physioId, setPhysioId] = useState<string>("physio1")

	useEffect(() => {
		const id = localStorage.getItem("userId") || localStorage.getItem("userEmail") || "physio1"
		setPhysioId(id)
	}, [])

	// Load patients
	useEffect(() => {
		if (physioId) {
			loadPatients()
		}
	}, [physioId])

	const loadPatients = async () => {
		try {
			setLoading(true)
			console.log("🔍 Loading patients for physioId:", physioId)
			const data = await dbService.getPatients(physioId)
			console.log("✅ Loaded", data.length, "patients:", data)
			setPatients(data)
		} catch (error: any) {
			console.error("Error loading patients:", error)
			toast.error(error.message || "Failed to load patients")
		} finally {
			setLoading(false)
		}
	}

	const filteredPatients = patients.filter(
		(p) =>
			p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
			p.email.toLowerCase().includes(searchPatient.toLowerCase())
	)

	const handleAddPatient = () => {
		setEditingPatientId(null)
		setFormData({ name: "", email: "", phone: "", age: 0, condition: "", sessionCount: 0 })
		setPatientModalOpen(true)
	}

	const handleEditPatient = (patient: Patient) => {
		setEditingPatientId(patient.id)
		setFormData({ name: patient.name, email: patient.email, phone: patient.phone, age: patient.age, condition: patient.condition, sessionCount: patient.sessionCount })
		setPatientModalOpen(true)
	}

	const handleSavePatient = async () => {
		if (!formData.name || !formData.email || !formData.phone || formData.age === 0) {
			toast.error("Please fill all fields")
			return
		}

		try {
			if (editingPatientId) {
				const updated = await dbService.updatePatient(physioId, editingPatientId, formData)
				setPatients(patients.map((p) => (p.id === editingPatientId ? { ...p, ...formData } : p)))
				toast.success("Patient updated successfully")
			} else {
				const newPatient = await dbService.createPatient(physioId, {
				...formData,
				joinDate: new Date().toISOString().split("T")[0],
				progress: 0,
					isActive: true,
				})
				setPatients([newPatient, ...patients])
				toast.success("Patient added successfully")
			}
			setPatientModalOpen(false)
			setFormData({ name: "", email: "", phone: "", age: 0, condition: "", sessionCount: 0 })
		} catch (error: any) {
			console.error("Error saving patient:", error)
			toast.error(error.message || "Failed to save patient")
		}
	}

	const handleDeletePatient = async (patientId: string) => {
		if (!confirm(t("confirmDelete"))) return

		try {
			await dbService.deletePatient(physioId, patientId)
			setPatients(patients.filter((p) => p.id !== patientId))
			toast.success("Patient deleted successfully")
		} catch (error: any) {
			console.error("Error deleting patient:", error)
			toast.error(error.message || "Failed to delete patient")
		}
	}

	const handleViewProgress = (patient: Patient) => {
		setSelectedPatient(patient)
		setProgressModalOpen(true)
	}

	const handleSendMessage = (patient: Patient) => {
		setSelectedPatient(patient)
		setMessage("")
		setMessageModalOpen(true)
	}

	const handleSendMessageSubmit = () => {
		if (!message.trim()) {
			toast.error(t("pleaseEnterMessage"))
			return
		}
		toast.success(t("messageSent"))
		setMessageModalOpen(false)
		setMessage("")
	}

	const handleViewSession = (session: Session, patient: Patient) => {
		setSelectedSession(session)
		setSelectedPatient(patient)
		setSessionViewModalOpen(true)
	}

	return (
		<SidebarSleek role="physiotherapist">
			{loading ? (
				<div className="flex items-center justify-center min-h-screen">
					<Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
				</div>
			) : (
				<div className="space-y-6">
					{/* Header */}
					<div>
						<h1 className="text-3xl font-bold text-white mb-2">{t("patientList")}</h1>
						<p className="text-gray-400">{t("manageAllPatients")}</p>
					</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("totalPatients")}</p>
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
									<p className="text-gray-400 text-sm mb-1">{t("activePatients")}</p>
									<p className="text-3xl font-bold text-white">{patients.filter((p) => p.isActive).length}</p>
								</div>
								<Users className="w-10 h-10 text-green-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("avgProgress")}</p>
									<p className="text-3xl font-bold text-yellow-500">
										{Math.round(patients.reduce((acc, p) => acc + p.progress, 0) / patients.length || 0)}%
									</p>
								</div>
								<Users className="w-10 h-10 text-yellow-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Patients List */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white">{t("patientList")}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex gap-4">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
								<Input
									type="text"
									placeholder={t("searchPatients")}
									value={searchPatient}
									onChange={(e) => setSearchPatient(e.target.value)}
									className="fitpro-input pl-10 rounded-xl"
								/>
							</div>
							<AddButton onClick={handleAddPatient} label={t("addPatient")} className="rounded-xl" />
						</div>

						<div className="space-y-3">
							{filteredPatients.length > 0 ? (
								filteredPatients.map((patient) => (
									<div key={patient.id} className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
											<div className="flex-1">
												<div className="flex items-center gap-4 mb-2">
													<div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
														{patient.name.charAt(0)}
													</div>
													<div>
														<p className="text-white font-semibold">{patient.name}</p>
														<p className="text-gray-400 text-sm">{patient.email}</p>
													</div>
												</div>
												<div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
													<div className="flex items-center gap-1 text-gray-400">
														<Phone className="w-4 h-4" />
														{patient.phone}
													</div>
													<div className="text-gray-400">{t("patientAge")}: {patient.age}</div>
													<div className="text-gray-400">{t("condition")}: {patient.condition}</div>
													<div className="text-gray-400">{t("sessions")}: {patient.sessionCount}</div>
												</div>
												{patient.appointment && (
													<div className="mt-2 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
														<div className="flex items-center justify-between mb-1">
															<p className="text-cyan-400 text-sm font-semibold">📅 Current Appointment</p>
															{patient.appointment.status && (
																<span className={cn(
																	"px-2 py-0.5 rounded-full text-xs font-semibold",
																	patient.appointment.status === "confirmed" ? "bg-green-500/20 text-green-400" :
																	patient.appointment.status === "completed" ? "bg-purple-500/20 text-purple-400" :
																	"bg-blue-500/20 text-blue-400"
																)}>
																	{patient.appointment.status}
																</span>
															)}
														</div>
														<div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
															<div>📆 {new Date(patient.appointment.date).toLocaleDateString()}</div>
															<div>⏰ {patient.appointment.time}</div>
															<div>💰 ${patient.appointment.price}</div>
															<div>🔢 Total Sessions: {patient.sessionCount || 0}</div>
															{patient.appointment.sessionDetails && (
																<div className="col-span-2 mt-1 pt-1 border-t border-cyan-500/20">
																	<p className="text-cyan-300 font-semibold mb-1">Last Session:</p>
																	<p className="text-gray-400">⭐ Progress: {patient.appointment.sessionDetails.progressRating}/10</p>
																	{patient.appointment.sessionDetails.sessionNotes && (
																		<p className="text-gray-400 mt-1">📝 {patient.appointment.sessionDetails.sessionNotes.substring(0, 60)}...</p>
																	)}
																</div>
															)}
														</div>
													</div>
												)}
											</div>

											<div className="flex items-center gap-3">
												<div className="text-center">
													<p className="text-gray-400 text-xs mb-1">{t("progress")}</p>
													<div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
														<p className="text-green-400 font-bold text-sm">{patient.progress}%</p>
													</div>
												</div>
												<span className={`px-3 py-1 rounded-full text-sm font-semibold ${patient.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
													{patient.isActive ? "Active" : "Inactive"}
												</span>
											</div>

											<div className="flex gap-2">
												<button
													onClick={() => handleViewProgress(patient)}
													className="group relative p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
													title={t("viewProgress")}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 group-hover:text-blue-300 transition-colors">
														<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
													</svg>
												</button>
												<button
													onClick={() => handleSendMessage(patient)}
													className="group relative p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
													title={t("sendMessage")}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 group-hover:text-purple-300 transition-colors">
														<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
													</svg>
												</button>
												<button
													onClick={() => handleEditPatient(patient)}
													className="group relative p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
													title={t("edit")}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 group-hover:text-amber-300 transition-colors">
														<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
														<path d="m15 5 4 4"></path>
													</svg>
												</button>
												<button
													onClick={() => handleDeletePatient(patient.id)}
													className="group relative p-2.5 rounded-xl bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
													title={t("delete")}
												>
													<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 group-hover:text-red-300 transition-colors">
														<path d="M3 6h18"></path>
														<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
														<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
														<line x1="10" x2="10" y1="11" y2="17"></line>
														<line x1="14" x2="14" y1="11" y2="17"></line>
													</svg>
												</button>
											</div>
										</div>
									</div>
								))
							) : (
								<p className="text-gray-400 text-center py-8">{t("noPatients")}</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Patient Modal */}
				<Dialog open={patientModalOpen} onOpenChange={setPatientModalOpen}>
					<DialogContent className="bg-slate-900 border-slate-700">
						<DialogHeader>
							<DialogTitle className="text-white">{editingPatientId ? t("editPatient") : t("addPatient")}</DialogTitle>
							<DialogDescription className="text-gray-400">{t("fillAllFields")}</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label className="text-gray-300 mb-2 block">{t("patientName")}</Label>
								<Input
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									placeholder={t("enterFullName")}
									className="fitpro-input rounded-xl"
								/>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Email</Label>
							<Input
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								placeholder={t("enterEmail")}
								className="fitpro-input rounded-xl"
									type="email"
									disabled={!!editingPatientId}
								/>
								{editingPatientId && <p className="text-xs text-gray-500 mt-1">{t("emailCannotChange")}</p>}							</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("patientPhone")}</Label>
							<Input
								value={formData.phone}
								onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
								placeholder={t("enterPhone")}
								className="fitpro-input rounded-xl"
							/>
							</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("patientAge")}</Label>
							<Input
								type="number"
								value={formData.age || ''}
								onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
								placeholder={t("enterAge")}
								className="fitpro-input rounded-xl"
							/>
							</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("medicalCondition")}</Label>
							<Input
								value={formData.condition}
								onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
								placeholder={t("enterCondition")}
								className="fitpro-input rounded-xl"
							/>
							</div>
						{editingPatientId && (
							<div>
								<Label className="text-gray-300 mb-2 block">{t("totalSessions")}</Label>
								<Input
									type="number"
									value={formData.sessionCount || 0}
									onChange={(e) => setFormData({ ...formData, sessionCount: parseInt(e.target.value) || 0 })}
									placeholder={t("enterSessionCount")}
									className="fitpro-input rounded-xl"
									min="0"
								/>
								<p className="text-xs text-gray-500 mt-1">{t("sessionCountHint")}</p>
							</div>
						)}
						</div>
						<DialogFooter>
							<CancelButton onClick={() => setPatientModalOpen(false)} />
							<SaveButton onClick={handleSavePatient} label={editingPatientId ? t("updatePatient") : t("addPatient")} />
						</DialogFooter>
					</DialogContent>
				</Dialog>

			{/* Progress Modal */}
			<Dialog open={progressModalOpen} onOpenChange={setProgressModalOpen}>
				<DialogContent className="fitpro-card border-cyan-500/20 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
					<DialogHeader className="flex-shrink-0">
						<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							{t("patientProgress")}
						</DialogTitle>
						<DialogDescription className="text-gray-400">
							{selectedPatient?.name}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-6 py-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-800/50 hover:scrollbar-thumb-cyan-500/70">
							<div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("overallProgress")}</p>
									<p className="text-3xl font-bold text-cyan-400">{selectedPatient?.progress}%</p>
								</div>
								<div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
									<svg className="w-12 h-12 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
									</svg>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
									<p className="text-gray-400 text-sm mb-2">{t("totalSessions")}</p>
									<p className="text-2xl font-bold text-green-400">{selectedPatient?.sessionCount}</p>
								</div>
								<div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
									<p className="text-gray-400 text-sm mb-2">{t("status")}</p>
									<span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedPatient?.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
										{selectedPatient?.isActive ? t("active") : t("inactive")}
									</span>
								</div>
							</div>
						<div className="p-4 rounded-xl bg-slate-800/50 border border-white/10">
							<p className="text-gray-400 text-sm mb-2">{t("medicalCondition")}</p>
							<p className="text-white font-medium">{selectedPatient?.condition}</p>
						</div>
						
						{/* Current Appointment Section */}
						{(selectedPatient?.currentAppointment || selectedPatient?.appointment) && (
							<div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
								<div className="flex items-center justify-between mb-3">
									<p className="text-cyan-400 font-semibold">📅 Current Appointment</p>
									{(selectedPatient.currentAppointment?.status || selectedPatient.appointment?.status) && (
										<span className={cn(
											"px-2 py-1 rounded-full text-xs font-medium",
											(selectedPatient.currentAppointment?.status || selectedPatient.appointment?.status) === "confirmed" 
												? "bg-green-500/20 text-green-400 border border-green-500/30"
												: "bg-blue-500/20 text-blue-400 border border-blue-500/30"
										)}>
											{selectedPatient.currentAppointment?.status || selectedPatient.appointment?.status}
										</span>
									)}
								</div>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">📆 Date:</span>
										<span className="text-white">{selectedPatient.currentAppointment?.date || selectedPatient.appointment?.date}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">⏰ Time:</span>
										<span className="text-white">{selectedPatient.currentAppointment?.time || selectedPatient.appointment?.time}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">💰 Price:</span>
										<span className="text-white">${selectedPatient.currentAppointment?.price || selectedPatient.appointment?.price}</span>
									</div>
									{(selectedPatient.currentAppointment?.notes || selectedPatient.appointment?.notes) && (
										<div className="mt-2 pt-2 border-t border-cyan-500/20">
											<span className="text-gray-400 block mb-1">📝 Notes:</span>
											<p className="text-white text-xs">{selectedPatient.currentAppointment?.notes || selectedPatient.appointment?.notes}</p>
										</div>
									)}
								</div>
							</div>
						)}

					{/* Sessions History Section */}
					{selectedPatient?.sessions && selectedPatient.sessions.length > 0 && (
						<div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
							<div className="flex items-center justify-between mb-3">
								<p className="text-purple-400 font-semibold">📚 Sessions History</p>
								<span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
									{selectedPatient.sessions.length} {selectedPatient.sessions.length === 1 ? 'Session' : 'Sessions'}
								</span>
							</div>
						<div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-800/50 hover:scrollbar-thumb-purple-500/70">
								{selectedPatient.sessions.map((session, index) => (
									<div 
										key={session.id} 
										onClick={() => handleViewSession(session, selectedPatient)}
										className="p-3 rounded-lg bg-slate-800/50 border border-purple-500/20 hover:bg-slate-800/80 hover:border-purple-500/40 transition-all cursor-pointer group"
									>
										<div className="flex items-center justify-between mb-2">
										<span className="text-white font-medium group-hover:text-cyan-400 transition-colors">Session #{selectedPatient.sessions.length - index}</span>
											<div className="flex items-center gap-2">
												<span className={cn(
													"px-2 py-0.5 rounded-full text-xs",
													session.status === "completed" 
														? "bg-green-500/20 text-green-400"
														: "bg-blue-500/20 text-blue-400"
												)}>
													{session.status}
												</span>
												<svg className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
													<path d="m9 18 6-6-6-6"/>
												</svg>
											</div>
											</div>
											<div className="space-y-1 text-xs">
												<div className="flex justify-between text-gray-400">
													<span>📆 {session.date} at {session.time}</span>
													<span>⏱️ {session.duration} min</span>
												</div>
												{session.progressRating && (
													<div className="flex justify-between">
														<span className="text-gray-400">⭐ Progress:</span>
														<span className="text-yellow-400 font-medium">{session.progressRating}/10</span>
													</div>
												)}
											{session.sessionNotes && (
												<div className="mt-2 pt-2 border-t border-purple-500/20">
													<p className="text-gray-400 mb-1">📝 Notes Preview:</p>
													<p className="text-white line-clamp-2">{session.sessionNotes}</p>
												</div>
											)}
										</div>
										<div className="mt-2 pt-2 border-t border-purple-500/20">
											<p className="text-xs text-cyan-400 group-hover:text-cyan-300 transition-colors">Click to view full details →</p>
										</div>
									</div>
									))}
								</div>
							</div>
						)}
					</div>
					<DialogFooter>
						<Button onClick={() => setProgressModalOpen(false)} className="w-full fitpro-button rounded-xl">
							{t("close")}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* Message Modal */}
				<Dialog open={messageModalOpen} onOpenChange={setMessageModalOpen}>
					<DialogContent className="fitpro-card border-purple-500/20">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
								{t("sendMessage")}
							</DialogTitle>
							<DialogDescription className="text-gray-400">
								{t("to")}: {selectedPatient?.name}
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
								<div className="flex items-center gap-3 mb-3">
									<svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<circle cx="12" cy="12" r="4"></circle>
										<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
									</svg>
									<div>
										<p className="text-white font-medium">{selectedPatient?.email}</p>
										<p className="text-gray-400 text-sm">{selectedPatient?.phone}</p>
									</div>
								</div>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">{t("message")}</Label>
								<textarea
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									placeholder={t("typeYourMessage")}
									className="w-full min-h-[150px] p-4 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
								/>
							</div>
						</div>
						<DialogFooter className="gap-2">
							<CancelButton onClick={() => setMessageModalOpen(false)} />
							<Button onClick={handleSendMessageSubmit} className="fitpro-button rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
								<svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M22 2 11 13"></path>
									<path d="m22 2-7 20-4-9-9-4 20-7z"></path>
								</svg>
								{t("send")}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

			{/* Session View Modal */}
			<Dialog open={sessionViewModalOpen} onOpenChange={setSessionViewModalOpen}>
				<DialogContent className="fitpro-card border-cyan-500/20 max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
							Session Details
						</DialogTitle>
						<DialogDescription className="text-gray-400">
							{selectedPatient?.name} - {selectedSession?.date} at {selectedSession?.time}
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4 py-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-800/50 hover:scrollbar-thumb-cyan-500/70">
							{/* Status & Info Bar */}
							<div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
								<div className="flex items-center gap-6">
									<div>
										<p className="text-gray-400 text-xs mb-1">Status</p>
										<span className={cn(
											"px-3 py-1 rounded-full text-sm font-medium",
											selectedSession?.status === "completed" 
												? "bg-green-500/20 text-green-400 border border-green-500/30"
												: "bg-blue-500/20 text-blue-400 border border-blue-500/30"
										)}>
											{selectedSession?.status}
										</span>
									</div>
									<div>
										<p className="text-gray-400 text-xs mb-1">Duration</p>
										<p className="text-white font-semibold">{selectedSession?.duration} minutes</p>
									</div>
									<div>
										<p className="text-gray-400 text-xs mb-1">Price</p>
										<p className="text-cyan-400 font-semibold">${selectedSession?.price}</p>
									</div>
								</div>
								{selectedSession?.progressRating && (
									<div className="text-right">
										<p className="text-gray-400 text-xs mb-1">Progress Rating</p>
										<div className="flex items-center gap-2">
											<div className="flex gap-0.5">
												{[...Array(10)].map((_, i) => (
													<div
														key={i}
														className={cn(
															"w-2 h-6 rounded-sm",
															i < (selectedSession?.progressRating || 0)
																? "bg-gradient-to-t from-yellow-500 to-yellow-300"
																: "bg-slate-700"
														)}
													/>
												))}
											</div>
											<span className="text-2xl font-bold text-yellow-400">{selectedSession?.progressRating}/10</span>
										</div>
									</div>
								)}
							</div>

							{/* Session Notes */}
							{selectedSession?.sessionNotes && (
								<div className="p-4 rounded-xl bg-slate-800/50 border border-cyan-500/20">
									<div className="flex items-center gap-2 mb-3">
										<svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
										<h3 className="text-cyan-400 font-semibold">Session Notes</h3>
									</div>
									<p className="text-white leading-relaxed whitespace-pre-wrap">{selectedSession.sessionNotes}</p>
								</div>
							)}

							{/* Exercises Given */}
							{selectedSession?.exercisesGiven && (
								<div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
									<div className="flex items-center gap-2 mb-3">
										<svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
											<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
										</svg>
										<h3 className="text-purple-400 font-semibold">Exercises Prescribed</h3>
									</div>
									<p className="text-white leading-relaxed whitespace-pre-wrap">{selectedSession.exercisesGiven}</p>
								</div>
							)}

							{/* Timestamps */}
							<div className="grid grid-cols-2 gap-4">
								{selectedSession?.confirmedAt && (
									<div className="p-3 rounded-lg bg-slate-800/50 border border-white/10">
										<p className="text-gray-400 text-xs mb-1">Confirmed At</p>
										<p className="text-white text-sm">{new Date(selectedSession.confirmedAt).toLocaleString()}</p>
									</div>
								)}
								{selectedSession?.completedAt && (
									<div className="p-3 rounded-lg bg-slate-800/50 border border-white/10">
										<p className="text-gray-400 text-xs mb-1">Completed At</p>
										<p className="text-white text-sm">{new Date(selectedSession.completedAt).toLocaleString()}</p>
									</div>
								)}
							</div>
						</div>
						<DialogFooter>
							<Button onClick={() => setSessionViewModalOpen(false)} className="w-full fitpro-button rounded-xl">
								Close
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				</div>
			)}
		</SidebarSleek>
	)
}


