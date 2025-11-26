"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { AddButton, DeleteButton, EditButton, MessageButton, ProgressButton, CancelButton, SaveButton } from "@/components/buttons"
import { Search, Users, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

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
}

export default function PatientsPage() {
	const [patients, setPatients] = useState<Patient[]>([
		{
			id: "1",
			name: "Ali Khan",
			email: "ali@example.com",
			phone: "+92-300-1234567",
			age: 35,
			condition: "Back Pain",
			joinDate: "2024-01-15",
			sessionCount: 8,
			progress: 65,
			isActive: true,
		},
		{
			id: "2",
			name: "Fatima Ahmed",
			email: "fatima@example.com",
			phone: "+92-300-7654321",
			age: 28,
			condition: "Knee Injury",
			joinDate: "2024-02-01",
			sessionCount: 5,
			progress: 45,
			isActive: true,
		},
	])

	const [searchPatient, setSearchPatient] = useState("")
	const [patientModalOpen, setPatientModalOpen] = useState(false)
	const [editingPatientId, setEditingPatientId] = useState<string | null>(null)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		age: 0,
		condition: "",
	})

	const filteredPatients = patients.filter(
		(p) =>
			p.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
			p.email.toLowerCase().includes(searchPatient.toLowerCase())
	)

	const handleAddPatient = () => {
		setEditingPatientId(null)
		setFormData({ name: "", email: "", phone: "", age: 0, condition: "" })
		setPatientModalOpen(true)
	}

	const handleEditPatient = (patient: Patient) => {
		setEditingPatientId(patient.id)
		setFormData({ name: patient.name, email: patient.email, phone: patient.phone, age: patient.age, condition: patient.condition })
		setPatientModalOpen(true)
	}

	const handleSavePatient = () => {
		if (!formData.name || !formData.email || !formData.phone || formData.age === 0) {
			alert("Please fill all fields")
			return
		}

		if (editingPatientId) {
			setPatients(patients.map((p) => (p.id === editingPatientId ? { ...p, ...formData } : p)))
		} else {
			const newPatient: Patient = {
				id: Date.now().toString(),
				...formData,
				joinDate: new Date().toISOString().split("T")[0],
				sessionCount: 0,
				progress: 0,
				isActive: true,
			}
			setPatients([...patients, newPatient])
		}
		setPatientModalOpen(false)
	}

	const handleDeletePatient = (patientId: string) => {
		if (confirm("Are you sure you want to delete this patient?")) {
			setPatients(patients.filter((p) => p.id !== patientId))
		}
	}

	return (
		<FitproLayout role="physiotherapist">
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Patients</h1>
					<p className="text-gray-400">Manage all your patients</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
									<p className="text-gray-400 text-sm mb-1">Avg Progress</p>
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
						<CardTitle className="text-white">Patient List</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex gap-4">
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
							<AddButton onClick={handleAddPatient} label="Add Patient" className="rounded-xl" />
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
													<div className="text-gray-400">Age: {patient.age}</div>
													<div className="text-gray-400">Condition: {patient.condition}</div>
													<div className="text-gray-400">Sessions: {patient.sessionCount}</div>
												</div>
											</div>

											<div className="flex items-center gap-3">
												<div className="text-center">
													<p className="text-gray-400 text-xs mb-1">Progress</p>
													<div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
														<p className="text-green-400 font-bold text-sm">{patient.progress}%</p>
													</div>
												</div>
												<span className={`px-3 py-1 rounded-full text-sm font-semibold ${patient.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
													{patient.isActive ? "Active" : "Inactive"}
												</span>
											</div>

											<div className="flex gap-2">
												<ProgressButton onClick={() => {}} />
												<MessageButton onClick={() => {}} />
												<EditButton onClick={() => handleEditPatient(patient)} />
												<DeleteButton onClick={() => handleDeletePatient(patient.id)} />
											</div>
										</div>
									</div>
								))
							) : (
								<p className="text-gray-400 text-center py-8">No patients found</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Patient Modal */}
				<Dialog open={patientModalOpen} onOpenChange={setPatientModalOpen}>
					<DialogContent className="bg-slate-900 border-slate-700">
						<DialogHeader>
							<DialogTitle className="text-white">{editingPatientId ? "Edit Patient" : "Add New Patient"}</DialogTitle>
							<DialogDescription className="text-gray-400">Fill in the patient details below</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label className="text-gray-300 mb-2 block">Full Name</Label>
								<Input
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									placeholder="Enter full name"
									className="fitpro-input rounded-xl"
								/>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Email</Label>
								<Input
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									placeholder="Enter email"
									className="fitpro-input rounded-xl"
									type="email"
									disabled={!!editingPatientId}
								/>
								{editingPatientId && <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>}							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Phone</Label>
								<Input
									value={formData.phone}
									onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
									placeholder="Enter phone number"
									className="fitpro-input rounded-xl"
								/>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Age</Label>
								<Input
									type="number"
									value={formData.age}
									onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
									placeholder="Enter age"
									className="fitpro-input rounded-xl"
								/>
							</div>
							<div>
								<Label className="text-gray-300 mb-2 block">Condition</Label>
								<Input
									value={formData.condition}
									onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
									placeholder="Medical condition"
									className="fitpro-input rounded-xl"
								/>
							</div>
						</div>
						<DialogFooter>
							<CancelButton onClick={() => setPatientModalOpen(false)} />
							<SaveButton onClick={handleSavePatient} label={editingPatientId ? "Update Patient" : "Add Patient"} />
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</FitproLayout>
	)
}

