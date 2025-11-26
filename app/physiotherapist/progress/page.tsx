"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import FitproLayout from "@/components/fitpro-layout"
import { LineChart, Plus, Trash2, Search, TrendingUp, Activity } from "lucide-react"

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
	const [patients] = useState<Patient[]>([
		{ id: "1", name: "Ali Khan", condition: "Back Pain" },
		{ id: "2", name: "Fatima Ahmed", condition: "Knee Injury" },
	])

	const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>([
		{
			id: "1",
			patientId: "1",
			patientName: "Ali Khan",
			date: "2024-11-08",
			mobility: 65,
			strength: 70,
			pain: 35,
			notes: "Good improvement in lower back flexibility",
		},
		{
			id: "2",
			patientId: "1",
			patientName: "Ali Khan",
			date: "2024-11-01",
			mobility: 55,
			strength: 60,
			pain: 55,
			notes: "Initial assessment completed",
		},
		{
			id: "3",
			patientId: "2",
			patientName: "Fatima Ahmed",
			date: "2024-11-07",
			mobility: 45,
			strength: 40,
			pain: 60,
			notes: "Started knee rehabilitation exercises",
		},
	])

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

	const handleSaveProgress = () => {
		if (!progressForm.patientId) {
			alert("Please select a patient")
			return
		}

		const patientName = patients.find((p) => p.id === progressForm.patientId)?.name || "Unknown"
		const newRecord: ProgressRecord = {
			id: Date.now().toString(),
			patientId: progressForm.patientId,
			patientName: patientName,
			date: progressForm.date,
			mobility: progressForm.mobility,
			strength: progressForm.strength,
			pain: progressForm.pain,
			notes: progressForm.notes,
		}
		setProgressRecords([...progressRecords, newRecord])
		setProgressModalOpen(false)
	}

	const handleDeleteProgress = (id: string) => {
		if (confirm("Delete this progress record?")) {
			setProgressRecords(progressRecords.filter((r) => r.id !== id))
		}
	}

	const getPatientProgress = (patientId: string) => {
		return progressRecords.filter((r) => r.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	}

	return (
		<FitproLayout role="physiotherapist">
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Patient Progress Tracking</h1>
					<p className="text-gray-400">Monitor and record patient recovery progress</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Total Records</p>
									<p className="text-3xl font-bold text-white">{progressRecords.length}</p>
								</div>
								<LineChart className="w-10 h-10 text-blue-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Patients Tracked</p>
									<p className="text-3xl font-bold text-white">{new Set(progressRecords.map((r) => r.patientId)).size}</p>
								</div>
								<Activity className="w-10 h-10 text-green-500" />
							</div>
						</CardContent>
					</Card>

					<Card className="fitpro-card">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-gray-400 text-sm mb-1">Avg Improvement</p>
									<p className="text-3xl font-bold text-yellow-500">+18%</p>
								</div>
								<TrendingUp className="w-10 h-10 text-yellow-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Progress by Patient */}
				<Card className="fitpro-card">
					<CardContent className="p-6">
						<div className="flex gap-4 mb-6">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
								<Input
									type="text"
									placeholder="Search patients..."
									value={searchPatient}
									onChange={(e) => setSearchPatient(e.target.value)}
									className="fitpro-input pl-10 rounded-xl"
								/>
							</div>
							<Button className="fitpro-button rounded-xl gap-2" onClick={() => setProgressModalOpen(true)}>
								<Plus className="w-4 h-4" />
								Add Progress
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
																	<p className="text-gray-400 text-xs mb-2">Mobility</p>
																	<div className="flex items-center gap-2">
																		<div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
																			<div className="h-full bg-green-500" style={{ width: `${record.mobility}%` }}></div>
																		</div>
																		<span className="text-green-400 font-bold text-sm min-w-fit">{record.mobility}%</span>
																	</div>
																</div>
																<div>
																	<p className="text-gray-400 text-xs mb-2">Strength</p>
																	<div className="flex items-center gap-2">
																		<div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
																			<div className="h-full bg-blue-500" style={{ width: `${record.strength}%` }}></div>
																		</div>
																		<span className="text-blue-400 font-bold text-sm min-w-fit">{record.strength}%</span>
																	</div>
																</div>
																<div>
																	<p className="text-gray-400 text-xs mb-2">Pain Level</p>
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
								<p className="text-gray-400 text-center py-8">No patients found</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Progress Modal */}
				<Dialog open={progressModalOpen} onOpenChange={setProgressModalOpen}>
					<DialogContent className="bg-slate-900 border-slate-700">
						<DialogHeader>
							<DialogTitle className="text-white">Add Progress Record</DialogTitle>
							<DialogDescription className="text-gray-400">Record patient's recovery progress</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label className="text-gray-300 mb-2 block">Patient</Label>
								<select
									value={progressForm.patientId}
									onChange={(e) => setProgressForm({ ...progressForm, patientId: e.target.value })}
									className="fitpro-input rounded-xl w-full py-2"
								>
									<option value="">Select a patient</option>
									{patients.map((p) => (
										<option key={p.id} value={p.id}>
											{p.name} - {p.condition}
										</option>
									))}
								</select>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">Date</Label>
								<Input
									type="date"
									value={progressForm.date}
									onChange={(e) => setProgressForm({ ...progressForm, date: e.target.value })}
									className="fitpro-input rounded-xl"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">Mobility {progressForm.mobility}%</Label>
								<input
									type="range"
									min="0"
									max="100"
									value={progressForm.mobility}
									onChange={(e) => setProgressForm({ ...progressForm, mobility: parseInt(e.target.value) })}
									className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">Strength {progressForm.strength}%</Label>
								<input
									type="range"
									min="0"
									max="100"
									value={progressForm.strength}
									onChange={(e) => setProgressForm({ ...progressForm, strength: parseInt(e.target.value) })}
									className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">Pain Level {progressForm.pain}%</Label>
								<input
									type="range"
									min="0"
									max="100"
									value={progressForm.pain}
									onChange={(e) => setProgressForm({ ...progressForm, pain: parseInt(e.target.value) })}
									className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">Notes</Label>
								<Input
									value={progressForm.notes}
									onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
									placeholder="Add clinical notes..."
									className="fitpro-input rounded-xl"
								/>
							</div>
						</div>

						<DialogFooter>
							<Button variant="outline" onClick={() => setProgressModalOpen(false)} className="border-slate-600">
								Cancel
							</Button>
							<Button className="fitpro-button" onClick={handleSaveProgress}>
								Save Record
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</FitproLayout>
	)
}

