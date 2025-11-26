"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Calendar, Phone, Mail, Activity, FileText, Clock, TrendingUp } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

export default function PatientDetailPage() {
	const { t } = useLanguage()
	const router = useRouter()
	const params = useParams()
	const patientId = params.id as string

	const [isPhysiotherapist, setIsPhysiotherapist] = useState(false)

	useEffect(() => {
		const physiotherapistAuth = localStorage.getItem("physiotherapist")
		if (!physiotherapistAuth) {
			router.push("/login")
		} else {
			setIsPhysiotherapist(true)
		}
	}, [router])

	// Mock patient data - in real app, fetch from API
		const patient = {
			id: patientId,
			name: "John Smith",
			age: 35,
			gender: "male",
				diagnosis: "Disc Herniation",
			phone: "+1 555 123 4567",
			email: "john.smith@example.com",
			bloodType: "A+",
			emergencyContact: "+1 555 987 6543",
			firstVisit: "2024-01-10",
			lastVisit: "2024-01-20",
			nextAppointment: "2024-01-25 14:00",
			sessions: 12,
			completedSessions: 8,
			painLevel: 4,
			mobility: 70,
			allergies: "None",
			medications: "Ibuprofen 400mg",
			chronicConditions: "None",
			notes: [
				{
					date: "2024-01-20",
					note: "Patient reports reduced pain level. Continuing exercises consistently.",
				},
				{
					date: "2024-01-15",
					note: "Observed improvement in mobility. Responding positively to treatment.",
				},
			],
			appointments: [
				{ date: "2024-01-25 14:00", status: "scheduled", type: "Physical Therapy" },
				{ date: "2024-01-20 14:00", status: "completed", type: "Physical Therapy" },
				{ date: "2024-01-15 14:00", status: "completed", type: "Initial Assessment" },
			],
		}

	if (!isPhysiotherapist) return null

	return (
		<div className="min-h-screen relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-green-950 via-black to-teal-950" />

			<div className="relative z-10">
				<header className="border-b border-green-500/20 glass-effect sticky top-0 z-20">
					<div className="container mx-auto px-4 py-4 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Link href="/physiotherapist">
								<Button variant="ghost" size="icon" className="hover:bg-green-500/10">
									<ArrowLeft className="w-5 h-5" />
								</Button>
							</Link>
							<div>
												<h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">PATIENT DETAILS</h1>
								<p className="text-xs text-green-300/70">{patient.name}</p>
							</div>
						</div>
					</div>
				</header>

				<div className="container mx-auto px-4 py-8">
					{/* Patient Header */}
					<Card className="p-6 glass-effect border-green-500/30 mb-6">
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-4">
								<div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center text-white font-bold text-3xl">
									{patient.name.charAt(0)}
								</div>
								<div>
									<h2 className="text-3xl font-bold mb-2">{patient.name}</h2>
									<div className="flex items-center gap-3 mb-2">
															<Badge variant="outline">{patient.age} years</Badge>
															<Badge variant="outline">{patient.gender === "male" ? "Male" : "Female"}</Badge>
															<Badge className="bg-green-600">{patient.diagnosis}</Badge>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<span className="flex items-center gap-1">
											<Phone className="w-4 h-4" />
											{patient.phone}
										</span>
										<span className="flex items-center gap-1">
											<Mail className="w-4 h-4" />
											{patient.email}
										</span>
									</div>
								</div>
							</div>
											<Link href={`/physiotherapist/program/${patient.id}`}>
												<Button className="bg-green-600 hover:bg-green-700">
													<FileText className="w-4 h-4 mr-2" />
													Treatment Program
												</Button>
											</Link>
						</div>
					</Card>

					{/* Stats */}
					<div className="grid md:grid-cols-4 gap-4 mb-6">
						<Card className="p-4 glass-effect border-green-500/30">
							<div className="flex items-center gap-3">
								<Activity className="w-8 h-8 text-green-400" />
								<div>
									  <p className="text-sm text-muted-foreground">Sessions</p>
									<p className="text-xl font-bold">
										{patient.completedSessions}/{patient.sessions}
									</p>
								</div>
							</div>
						</Card>
						<Card className="p-4 glass-effect border-teal-500/30">
							<div className="flex items-center gap-3">
								<TrendingUp className="w-8 h-8 text-teal-400" />
								<div>
									  <p className="text-sm text-muted-foreground">Pain Level</p>
									<p className="text-xl font-bold">{patient.painLevel}/10</p>
								</div>
							</div>
						</Card>
						<Card className="p-4 glass-effect border-blue-500/30">
							<div className="flex items-center gap-3">
								<Activity className="w-8 h-8 text-blue-400" />
								<div>
									  <p className="text-sm text-muted-foreground">Mobility</p>
									<p className="text-xl font-bold">{patient.mobility}%</p>
								</div>
							</div>
						</Card>
						<Card className="p-4 glass-effect border-cyan-500/30">
							<div className="flex items-center gap-3">
								<Calendar className="w-8 h-8 text-cyan-400" />
								<div>
									  <p className="text-sm text-muted-foreground">Next Appointment</p>
									<p className="text-sm font-bold">{patient.nextAppointment}</p>
								</div>
							</div>
						</Card>
					</div>

					{/* Tabs */}
					<Tabs defaultValue="info" className="space-y-6">
						<TabsList className="glass-effect border border-green-500/20 p-1">
										<TabsTrigger value="info" className="gap-2">
											<User className="w-4 h-4" />
											Personal Info
										</TabsTrigger>
											<TabsTrigger value="history" className="gap-2">
												<FileText className="w-4 h-4" />
												Medical History
											</TabsTrigger>
											<TabsTrigger value="appointments" className="gap-2">
												<Calendar className="w-4 h-4" />
												Appointments
											</TabsTrigger>
											<TabsTrigger value="notes" className="gap-2">
												<FileText className="w-4 h-4" />
												Notes
											</TabsTrigger>
						</TabsList>

						<TabsContent value="info">
											<Card className="p-6 glass-effect border-green-500/30">
												<h3 className="text-xl font-bold mb-4">Personal Info</h3>
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<p className="text-sm text-muted-foreground mb-1">Phone</p>
										<p className="font-medium">{patient.phone}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground mb-1">Email</p>
										<p className="font-medium">{patient.email}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground mb-1">Blood Type</p>
										<p className="font-medium">{patient.bloodType}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground mb-1">Emergency Contact</p>
										<p className="font-medium">{patient.emergencyContact}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground mb-1">First Visit</p>
										<p className="font-medium">{patient.firstVisit}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground mb-1">Last Visit</p>
										<p className="font-medium">{patient.lastVisit}</p>
									</div>
								</div>
							</Card>
						</TabsContent>

						<TabsContent value="history">
											<Card className="p-6 glass-effect border-green-500/30">
												<h3 className="text-xl font-bold mb-4">Medical History</h3>
								<div className="space-y-4">
									<div>
														<p className="text-sm text-muted-foreground mb-1">Diagnosis</p>
										<p className="font-medium">{patient.diagnosis}</p>
									</div>
									<div>
														<p className="text-sm text-muted-foreground mb-1">Allergies</p>
										<p className="font-medium">{patient.allergies}</p>
									</div>
									<div>
														<p className="text-sm text-muted-foreground mb-1">Medications</p>
										<p className="font-medium">{patient.medications}</p>
									</div>
									<div>
														<p className="text-sm text-muted-foreground mb-1">Chronic Conditions</p>
										<p className="font-medium">{patient.chronicConditions}</p>
									</div>
								</div>
							</Card>
						</TabsContent>

						<TabsContent value="appointments">
											<Card className="p-6 glass-effect border-green-500/30">
												<h3 className="text-xl font-bold mb-4">Appointments</h3>
								<div className="space-y-3">
									{patient.appointments.map((appointment, index) => (
										<Card key={index} className="p-4 glass-effect border-border/50">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<Clock className="w-5 h-5 text-green-400" />
													<div>
														<p className="font-medium">{appointment.date}</p>
														<p className="text-sm text-muted-foreground">{appointment.type}</p>
													</div>
												</div>
												<Badge variant={appointment.status === "completed" ? "default" : "outline"}>
													{appointment.status === "completed" ? t("completed") : "Scheduled"}
												</Badge>
											</div>
										</Card>
									))}
								</div>
							</Card>
						</TabsContent>

						<TabsContent value="notes">
											<Card className="p-6 glass-effect border-green-500/30">
												<div className="flex items-center justify-between mb-4">
													<h3 className="text-xl font-bold">Notes</h3>
													<Button className="bg-green-600 hover:bg-green-700">Add Note</Button>
								</div>
								<div className="space-y-3">
									{patient.notes.map((note, index) => (
										<Card key={index} className="p-4 glass-effect border-border/50">
											<p className="text-sm text-muted-foreground mb-2">{note.date}</p>
											<p>{note.note}</p>
										</Card>
									))}
								</div>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	)
}
