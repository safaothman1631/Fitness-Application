"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Plus, Printer, Calendar, Activity, AlertCircle, Target } from "lucide-react"

export default function TreatmentProgramPage() {
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

	const program = {
		patientName: "Ahmet Yılmaz",
		diagnosis: "Disc Herniation",
		startDate: "2024-01-10",
		expectedDuration: "12",
		shortTermGoals: [
			"Reduce pain level from 7 to 4",
			"Improve mobility in daily activities",
			"Enhance sleep quality",
		],
		longTermGoals: [
			"Return to normal life activities without pain",
			"Regain full range of motion",
			"Restore muscle strength",
		],
		exercises: [
			{
				name: "Pelvic Tilt",
				frequency: "2x per day",
				sets: "3",
				reps: "10",
				restTime: "30 sec",
				instructions: "Lie on your back, bend knees. Tighten core and tilt pelvis up.",
			},
			{
				name: "Cat-Cow Stretch",
				frequency: "3x per day",
				sets: "2",
				reps: "15",
				restTime: "20 sec",
				instructions: "On all fours, round and arch the back alternately.",
			},
			{
				name: "Bird Dog",
				frequency: "2x per day",
				sets: "3",
				reps: "8 (each side)",
				restTime: "45 sec",
				instructions: "On all fours, extend opposite arm and leg while keeping balance.",
			},
		],
		precautions: [
			"Avoid movements that increase pain",
			"Avoid sudden, jerky motions",
			"Warm up before exercises",
		],
		contraindications: ["Heavy lifting during acute pain", "Deep forward bending", "High-impact activities"],
		progressNotes: [
			{
				date: "2024-01-20",
				note: "Patient exercises regularly. Pain reduced from 7 to 4. Mobility improved.",
			},
			{
				date: "2024-01-15",
				note: "Initial evaluation completed. Treatment program started.",
			},
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
							<Link href={`/physiotherapist/patients/${patientId}`}>
								<Button variant="ghost" size="icon" className="hover:bg-green-500/10">
									<ArrowLeft className="w-5 h-5" />
								</Button>
							</Link>
							<div>
								<h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
											{"TREATMENT PROGRAM"}
								</h1>
								<p className="text-xs text-green-300/70">{program.patientName}</p>
							</div>
						</div>
						<Button variant="outline" className="gap-2 bg-transparent border-green-500/30">
							<Printer className="w-4 h-4" />
									{"Print Program"}
						</Button>
					</div>
				</header>

				<div className="container mx-auto px-4 py-8">
					{/* Program Overview */}
					<Card className="p-6 glass-effect border-green-500/30 mb-6">
								<h2 className="text-2xl font-bold mb-4">{"Program Details"}</h2>
						<div className="grid md:grid-cols-3 gap-6">
							<div>
										<p className="text-sm text-muted-foreground mb-1">{"Diagnosis"}</p>
								<Badge className="bg-green-600">{program.diagnosis}</Badge>
							</div>
							<div>
										<p className="text-sm text-muted-foreground mb-1">{"Start"}</p>
								<p className="font-medium">{program.startDate}</p>
							</div>
							<div>
										<p className="text-sm text-muted-foreground mb-1">{"Expected Duration"}</p>
								<p className="font-medium">
											{program.expectedDuration} {"weeks"}
								</p>
							</div>
						</div>
					</Card>

					{/* Goals */}
					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<Card className="p-6 glass-effect border-green-500/30">
							<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
								<Target className="w-5 h-5 text-green-400" />
										{"Short-term Goals"}
							</h3>
							<ul className="space-y-2">
								{program.shortTermGoals.map((goal, index) => (
									<li key={index} className="flex items-start gap-2">
										<span className="text-green-400 mt-1">•</span>
										<span>{goal}</span>
									</li>
								))}
							</ul>
						</Card>

						<Card className="p-6 glass-effect border-teal-500/30">
							<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
								<Target className="w-5 h-5 text-teal-400" />
										{"Long-term Goals"}
							</h3>
							<ul className="space-y-2">
								{program.longTermGoals.map((goal, index) => (
									<li key={index} className="flex items-start gap-2">
										<span className="text-teal-400 mt-1">•</span>
										<span>{goal}</span>
									</li>
								))}
							</ul>
						</Card>
					</div>

					{/* Exercise Plan */}
					<Card className="p-6 glass-effect border-green-500/30 mb-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-xl font-bold flex items-center gap-2">
								<Activity className="w-5 h-5 text-green-400" />
										{"Exercise Plan"}
							</h3>
							<Button className="bg-green-600 hover:bg-green-700">
								<Plus className="w-4 h-4 mr-2" />
										{"Add Exercise"}
							</Button>
						</div>

						<div className="space-y-4">
							{program.exercises.map((exercise, index) => (
								<Card key={index} className="p-5 glass-effect border-border/50">
									<h4 className="font-bold text-lg mb-3">{exercise.name}</h4>
									<div className="grid md:grid-cols-4 gap-4 mb-3">
										<div>
													<p className="text-xs text-muted-foreground mb-1">{"Frequency"}</p>
											<p className="font-medium text-sm">{exercise.frequency}</p>
										</div>
										<div>
													<p className="text-xs text-muted-foreground mb-1">{"Sets"}</p>
											<p className="font-medium text-sm">{exercise.sets}</p>
										</div>
										<div>
													<p className="text-xs text-muted-foreground mb-1">{"Reps"}</p>
											<p className="font-medium text-sm">{exercise.reps}</p>
										</div>
										<div>
													<p className="text-xs text-muted-foreground mb-1">{"Rest Time"}</p>
											<p className="font-medium text-sm">{exercise.restTime}</p>
										</div>
									</div>
									<div>
												<p className="text-xs text-muted-foreground mb-1">{"Instructions"}</p>
										<p className="text-sm">{exercise.instructions}</p>
									</div>
								</Card>
							))}
						</div>
					</Card>

					{/* Precautions & Contraindications */}
					<div className="grid md:grid-cols-2 gap-6 mb-6">
						<Card className="p-6 glass-effect border-yellow-500/30">
							<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
								<AlertCircle className="w-5 h-5 text-yellow-400" />
										{"Precautions"}
							</h3>
							<ul className="space-y-2">
								{program.precautions.map((precaution, index) => (
									<li key={index} className="flex items-start gap-2">
										<span className="text-yellow-400 mt-1">⚠</span>
										<span>{precaution}</span>
									</li>
								))}
							</ul>
						</Card>

						<Card className="p-6 glass-effect border-red-500/30">
							<h3 className="text-xl font-bold mb-4 flex items-center gap-2">
								<AlertCircle className="w-5 h-5 text-red-400" />
										{"Contraindications"}
							</h3>
							<ul className="space-y-2">
								{program.contraindications.map((contraindication, index) => (
									<li key={index} className="flex items-start gap-2">
										<span className="text-red-400 mt-1">✕</span>
										<span>{contraindication}</span>
									</li>
								))}
							</ul>
						</Card>
					</div>

					{/* Progress Notes */}
					<Card className="p-6 glass-effect border-green-500/30">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-xl font-bold flex items-center gap-2">
								<FileText className="w-5 h-5 text-green-400" />
										{"Progress Notes"}
							</h3>
							<Button className="bg-green-600 hover:bg-green-700">
								<Plus className="w-4 h-4 mr-2" />
										{"Add Note"}
							</Button>
						</div>
						<div className="space-y-3">
							{program.progressNotes.map((note, index) => (
								<Card key={index} className="p-4 glass-effect border-border/50">
									<div className="flex items-center gap-2 mb-2">
										<Calendar className="w-4 h-4 text-green-400" />
										<p className="text-sm font-medium text-green-400">{note.date}</p>
									</div>
									<p className="text-sm">{note.note}</p>
								</Card>
							))}
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
