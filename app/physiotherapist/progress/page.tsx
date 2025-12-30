"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { LineChart, Plus, Trash2, Search, TrendingUp, Activity, Loader2, Calendar, Users, Gauge, Dumbbell, Heart, FileText, Save, X } from "lucide-react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface Patient {
	id: string
	name: string
	condition: string
}

interface ProgressRecord {
	id: string
	patientId: string
	patientName: string
	date: string
	mobility: number
	strength: number
	pain: number
	notes: string
}

export default function PhysiotherapistProgressPage() {
	const { t } = useLanguage()
	// Mock physiotherapist ID - replace with actual auth
	const physiotherapistId = "physio-001"

	const [patients, setPatients] = useState<Patient[]>([])
	const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([])
	const [loading, setLoading] = useState(true)
	const [searchPatient, setSearchPatient] = useState("")
	const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
	const [progressModalOpen, setProgressModalOpen] = useState(false)

	const [progressForm, setProgressForm] = useState({
		patientId: "",
		date: new Date().toISOString().split("T")[0],
		mobility: 50,
		strength: 50,
		pain: 50,
		notes: "",
	})

	// Load patients and progress records
	useEffect(() => {
		loadData()
	}, [])

	const loadData = async () => {
		try {
			setLoading(true)
			// Load patients assigned to this physiotherapist
			const patientsData = await dbService.getPatients(physiotherapistId)
			setPatients(patientsData)

			// Load all progress records for this physiotherapist
			const progressData = await dbService.getProgress(physiotherapistId)
			setProgressRecords(progressData)
		} catch (error: any) {
			console.error("Error loading data:", error)
			toast.error(error.message || "Failed to load data")
		} finally {
			setLoading(false)
		}
	}

	const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(searchPatient.toLowerCase()))

	const handleAddProgress = (patientId: string) => {
		setProgressForm({
			patientId: patientId,
			date: new Date().toISOString().split("T")[0],
			mobility: 50,
			strength: 50,
			pain: 50,
			notes: "",
		})
		setProgressModalOpen(true)
	}

	const handleSaveProgress = async () => {
		if (!progressForm.patientId) {
			toast.error("Please select a patient")
			return
		}

		try {
			const patientName = patients.find((p) => p.id === progressForm.patientId)?.name || "Unknown"
			
			const newRecord = await dbService.createProgress({
				physiotherapistId,
				patientId: progressForm.patientId,
				patientName,
				date: progressForm.date,
				mobility: progressForm.mobility,
				strength: progressForm.strength,
				pain: progressForm.pain,
				notes: progressForm.notes,
			})

			setProgressRecords([newRecord, ...progressRecords])
			setProgressModalOpen(false)
			toast.success("Progress record saved successfully")
			
			// Reset form
			setProgressForm({
				patientId: "",
				date: new Date().toISOString().split("T")[0],
				mobility: 50,
				strength: 50,
				pain: 50,
				notes: "",
			})
		} catch (error: any) {
			console.error("Error saving progress:", error)
			toast.error(error.message || "Failed to save progress record")
		}
	}

	const handleDeleteProgress = async (id: string) => {
		if (!confirm("Delete this progress record?")) return

		try {
			await dbService.deleteProgress(id)
			setProgressRecords(progressRecords.filter((r) => r.id !== id))
			toast.success("Progress record deleted")
		} catch (error: any) {
			console.error("Error deleting progress:", error)
			toast.error(error.message || "Failed to delete progress record")
		}
	}

	const getPatientProgress = (patientId: string) => {
		return progressRecords.filter((r) => r.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
							<TrendingUp className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-3xl font-bold text-white">{t("progressTracking")}</h1>
							<p className="text-gray-400 text-sm">{t("monitorRecovery")}</p>
						</div>
					</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("totalRecords")}</p>
									<p className="text-3xl font-bold text-white">{progressRecords.length}</p>
								</div>
								<div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
									<LineChart className="w-6 h-6 text-blue-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/30">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("patientsTracked")}</p>
									<p className="text-3xl font-bold text-white">{new Set(progressRecords.map((r) => r.patientId)).size}</p>
								</div>
								<div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
									<Activity className="w-6 h-6 text-green-400" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">{t("avgImprovement")}</p>
									<p className="text-3xl font-bold text-yellow-400">+18%</p>
								</div>
								<div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
									<TrendingUp className="w-6 h-6 text-yellow-400" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Progress by Patient */}
				<Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
					<CardContent className="p-6">
						<div className="flex gap-4 mb-6">
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
							<Button className="fitpro-button rounded-xl gap-2" onClick={() => setProgressModalOpen(true)}>
								<Plus className="w-4 h-4" />
								{t("addProgressRecord")}
							</Button>
						</div>

						<div className="space-y-6">
							{filteredPatients.length > 0 ? (
								filteredPatients.map((patient) => {
									const patientRecords = getPatientProgress(patient.id)
									return (
										<div key={patient.id} className="border-b border-slate-700 pb-6 last:border-b-0">
											<div className="flex items-center justify-between mb-4">
												<div>
													<p className="text-white font-semibold text-lg">{patient.name}</p>
													<p className="text-gray-400 text-sm">{patient.condition}</p>
												</div>
												<Button size="sm" className="fitpro-button gap-2" onClick={() => handleAddProgress(patient.id)}>
													<Plus className="w-4 h-4" />
													Record
												</Button>
											</div>

											{patientRecords.length > 0 ? (
												<div className="space-y-3">
													{patientRecords.map((record) => (
														<div key={record.id} className="bg-slate-800/50 rounded-lg p-4">
															<div className="flex items-center justify-between mb-3">
																<p className="text-gray-400 text-sm font-semibold">{record.date}</p>
																<Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteProgress(record.id)}>
																	<Trash2 className="w-4 h-4" />
																</Button>
															</div>

															<div className="grid grid-cols-3 gap-4 mb-3">
																<div>
																	<p className="text-gray-400 text-xs mb-2">{t("mobilityLevel")}</p>
																	<div className="flex items-center gap-2">
																		<div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
																			<div className="h-full bg-green-500" style={{ width: `${record.mobility}%` }}></div>
																		</div>
																		<span className="text-green-400 font-bold text-sm min-w-fit">{record.mobility}%</span>
																	</div>
																</div>
																<div>
																	<p className="text-gray-400 text-xs mb-2">{t("strengthLevel")}</p>
																	<div className="flex items-center gap-2">
																		<div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
																			<div className="h-full bg-blue-500" style={{ width: `${record.strength}%` }}></div>
																		</div>
																		<span className="text-blue-400 font-bold text-sm min-w-fit">{record.strength}%</span>
																	</div>
																</div>
																<div>
																	<p className="text-gray-400 text-xs mb-2">{t("painLevel")}</p>
																	<div className="flex items-center gap-2">
																		<div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
																			<div className="h-full bg-red-500" style={{ width: `${record.pain}%` }}></div>
																		</div>
																		<span className="text-red-400 font-bold text-sm min-w-fit">{record.pain}%</span>
																	</div>
																</div>
															</div>

															{record.notes && <p className="text-gray-400 text-sm bg-slate-700/30 rounded p-2">📝 {record.notes}</p>}
														</div>
													))}
												</div>
											) : (
												<p className="text-gray-400 text-sm italic">No progress records yet</p>
											)}
										</div>
									)
								})
							) : (
								<p className="text-gray-400 text-center py-8">{t("noPatients")}</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Progress Modal */}
				<Dialog open={progressModalOpen} onOpenChange={setProgressModalOpen}>
					<DialogContent className="bg-slate-900 border-slate-700 max-w-[96vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
									<Activity className="w-6 h-6 text-blue-400" />
								</div>
								<div>
									<DialogTitle className="text-xl text-white">{t("addProgressRecord")}</DialogTitle>
									<DialogDescription className="text-gray-400 text-sm">{t("recordRecoveryProgress")}</DialogDescription>
								</div>
							</div>
						</DialogHeader>

						<div className="space-y-6 py-4">
							{/* Patient Selection */}
							<div className="space-y-2">
								<Label className="text-gray-300 flex items-center gap-2">
									<Users className="w-4 h-4 text-blue-400" />
									{t("patient")}
								</Label>
								<select
									value={progressForm.patientId}
									onChange={(e) => setProgressForm({ ...progressForm, patientId: e.target.value })}
									className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
								>
									<option value="">{t("selectPatient")}</option>
									{patients.map((p) => (
										<option key={p.id} value={p.id}>
											{p.name} - {p.condition}
										</option>
									))}
								</select>
							</div>

							{/* Date Selection */}
							<div className="space-y-2">
								<Label className="text-gray-300 flex items-center gap-2">
									<Calendar className="w-4 h-4 text-blue-400" />
									Date
								</Label>
								<Input
									type="date"
									value={progressForm.date}
									onChange={(e) => setProgressForm({ ...progressForm, date: e.target.value })}
									className="fitpro-input rounded-xl"
								/>
							</div>

							{/* Metrics Section */}
							<div className="space-y-5 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
								<h3 className="text-sm font-medium text-gray-300 flex items-center gap-2">
									<Gauge className="w-4 h-4 text-blue-400" />
									Progress Metrics
								</h3>

								{/* Mobility */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Label className="text-gray-300 flex items-center gap-2">
											<Activity className="w-4 h-4 text-green-400" />
											Mobility
										</Label>
										<span className="text-2xl font-bold text-green-400">{progressForm.mobility}%</span>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										value={progressForm.mobility}
										onChange={(e) => setProgressForm({ ...progressForm, mobility: parseInt(e.target.value) })}
										className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-green"
										style={{
											background: `linear-gradient(to right, #10b981 0%, #10b981 ${progressForm.mobility}%, #334155 ${progressForm.mobility}%, #334155 100%)`
										}}
									/>
									<div className="flex justify-between text-xs text-gray-500">
										<span>Low</span>
										<span>Excellent</span>
									</div>
								</div>

								{/* Strength */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Label className="text-gray-300 flex items-center gap-2">
											<Dumbbell className="w-4 h-4 text-blue-400" />
											Strength
										</Label>
										<span className="text-2xl font-bold text-blue-400">{progressForm.strength}%</span>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										value={progressForm.strength}
										onChange={(e) => setProgressForm({ ...progressForm, strength: parseInt(e.target.value) })}
										className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-blue"
										style={{
											background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progressForm.strength}%, #334155 ${progressForm.strength}%, #334155 100%)`
										}}
									/>
									<div className="flex justify-between text-xs text-gray-500">
										<span>Weak</span>
										<span>Strong</span>
									</div>
								</div>

								{/* Pain Level */}
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										<Label className="text-gray-300 flex items-center gap-2">
											<Heart className="w-4 h-4 text-red-400" />
											Pain Level
										</Label>
										<span className="text-2xl font-bold text-red-400">{progressForm.pain}%</span>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										value={progressForm.pain}
										onChange={(e) => setProgressForm({ ...progressForm, pain: parseInt(e.target.value) })}
										className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-red"
										style={{
											background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${progressForm.pain}%, #334155 ${progressForm.pain}%, #334155 100%)`
										}}
									/>
									<div className="flex justify-between text-xs text-gray-500">
										<span>No Pain</span>
										<span>Severe</span>
									</div>
								</div>
							</div>

							{/* Clinical Notes */}
							<div className="space-y-2">
								<Label className="text-gray-300 flex items-center gap-2">
									<FileText className="w-4 h-4 text-blue-400" />
									{t("clinicalNotes")}
								</Label>
								<textarea
									value={progressForm.notes}
									onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
									placeholder={t("enterNotes")}
									className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 min-h-[100px] resize-none"
									rows={4}
								/>
							</div>
						</div>

						<DialogFooter className="gap-2">
							<Button 
								variant="outline" 
								onClick={() => setProgressModalOpen(false)} 
								className="border-slate-600 hover:bg-slate-800"
							>
								<X className="w-4 h-4 mr-2" />
								{t("cancel")}
							</Button>
							<Button 
								className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" 
								onClick={handleSaveProgress}
							>
								<Save className="w-4 h-4 mr-2" />
								{t("saveRecord")}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				</div>
			)}
		</SidebarSleek>
	)
}


