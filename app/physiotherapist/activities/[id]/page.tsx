"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Activity, User, DollarSign, FileText, Clock, Stethoscope, TrendingUp } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"

interface ActivityDetail {
	id: string
	physiotherapist: string
	action: string
	patient: string
	timestamp: string
	details: string
	paymentAmount: number
	patientId: string
	patientAge: number
	patientGender: "male" | "female"
	patientEmail: string
	patientPhone: string
	diagnosis: string
	treatmentPlan: string
}

export default function ActivityDetailPage() {
	const router = useRouter()
	const params = useParams()
	const [isAuthorized, setIsAuthorized] = useState(false)
	const [activity, setActivity] = useState<ActivityDetail | null>(null)

	useEffect(() => {
		const physiotherapistAuth = localStorage.getItem("physiotherapist")
		if (!physiotherapistAuth) {
			router.push("/login")
			return
		}
		setIsAuthorized(true)

		// Example data (replace with API/DB fetch when available)
		const activityLogs: ActivityDetail[] = [
			{
				id: "1",
				physiotherapist: "Dr. John Smith",
				action: "New Patient Registered",
				patient: "Alex Johnson",
				timestamp: "2025-11-10 10:30",
				details: "New patient record created - Lumbar disc herniation",
				paymentAmount: 150,
				patientId: "SA1",
				patientAge: 35,
				patientGender: "male",
				patientEmail: "alex.patient@example.com",
				patientPhone: "+1 (555) 123-4567",
				diagnosis: "Lumbar Disc Herniation",
				treatmentPlan: "Physiotherapy and exercise plan, 3 sessions per week",
			},
			{
				id: "2",
				physiotherapist: "Dr. Emily Clark",
				action: "Treatment Plan Updated",
				patient: "Sophia Lee",
				timestamp: "2025-11-10 09:15",
				details: "Manual therapy session completed, exercise plan updated",
				paymentAmount: 120,
				patientId: "SA2",
				patientAge: 28,
				patientGender: "female",
				patientEmail: "sophia.patient@example.com",
				patientPhone: "+1 (555) 987-6543",
				diagnosis: "Shoulder Tendinitis",
				treatmentPlan: "Manual therapy and strengthening exercises",
			},
		]

		const foundActivity = activityLogs.find((log) => log.id === params.id)
		if (foundActivity) setActivity(foundActivity)
	}, [router, params.id])

	if (!isAuthorized || !activity) return null

	return (
		<div className="min-h-screen relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-pink-950" />
			<div className="absolute inset-0 bg-[url('/modern-gym-interior.png')] bg-cover bg-center opacity-5" />

			<div className="relative z-10">
				<header className="border-b border-purple-500/20 glass-effect sticky top-0 z-20">
					<div className="container mx-auto px-4 py-4 flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Link href="/physiotherapist">
								<Button variant="ghost" size="icon" className="hover:bg-purple-500/10">
									<ArrowLeft className="w-5 h-5" />
								</Button>
							</Link>
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
								<Activity className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
									ACTIVITY DETAILS
								</h1>
								<p className="text-xs text-purple-300/70">Patient record and payment information</p>
							</div>
						</div>
						<LanguageSelector />
					</div>
				</header>

				<div className="container mx-auto px-4 py-8">
					{/* Payment Highlight Card */}
					<Card className="p-8 glass-effect border-green-500/30 mb-8 bg-gradient-to-br from-green-950/50 to-emerald-950/50">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-6">
								<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
									<DollarSign className="w-10 h-10 text-white" />
								</div>
								<div>
									<p className="text-sm text-muted-foreground mb-1">Payment Amount</p>
									<p className="text-5xl font-bold text-green-400">${activity.paymentAmount}</p>
									<p className="text-sm text-green-300/70 mt-1">US Dollars (USD)</p>
								</div>
							</div>
							<Badge className="text-lg px-6 py-3 bg-green-600">Payment Received</Badge>
						</div>
					</Card>

					<div className="grid lg:grid-cols-2 gap-6 mb-8">
						{/* Activity Information */}
						<Card className="p-6 glass-effect border-purple-500/30">
							<h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
								<Activity className="w-6 h-6 text-purple-400" />
								Activity Information
							</h2>

							<div className="space-y-4">
								<div className="flex items-start gap-3 p-4 bg-background/30 rounded-lg">
									<Stethoscope className="w-5 h-5 text-purple-400 mt-1" />
									<div className="flex-1">
										<p className="text-sm text-muted-foreground mb-1">Physiotherapist</p>
										<p className="font-semibold text-lg">{activity.physiotherapist}</p>
									</div>
								</div>

								<div className="flex items-start gap-3 p-4 bg-background/30 rounded-lg">
									<TrendingUp className="w-5 h-5 text-purple-400 mt-1" />
									<div className="flex-1">
										<p className="text-sm text-muted-foreground mb-1">Action</p>
										<Badge variant="outline" className="text-sm">
											{activity.action}
										</Badge>
									</div>
								</div>

								<div className="flex items-start gap-3 p-4 bg-background/30 rounded-lg">
									<Clock className="w-5 h-5 text-purple-400 mt-1" />
									<div className="flex-1">
										<p className="text-sm text-muted-foreground mb-1">Date & Time</p>
										<p className="font-semibold">{activity.timestamp}</p>
									</div>
								</div>

								<div className="flex items-start gap-3 p-4 bg-background/30 rounded-lg">
									<FileText className="w-5 h-5 text-purple-400 mt-1" />
									<div className="flex-1">
										<p className="text-sm text-muted-foreground mb-1">Details</p>
										<p className="font-semibold">{activity.details}</p>
									</div>
								</div>
							</div>
						</Card>

						{/* Patient Information */}
						<Card className="p-6 glass-effect border-pink-500/30">
							<h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
								<User className="w-6 h-6 text-pink-400" />
								Patient Information - Extended
							</h2>

							<div className="space-y-4">
								<div className="flex items-center gap-4 p-4 bg-background/30 rounded-lg">
									<div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
										{activity.patient.charAt(0)}
									</div>
									<div className="flex-1">
										<p className="text-sm text-muted-foreground mb-1">Patient Name</p>
										<p className="font-bold text-xl">{activity.patient}</p>
										<div className="flex gap-2 mt-2">
											<Badge variant="outline" className="text-xs">
												{activity.patientAge} years
											</Badge>
											<Badge variant="outline" className="text-xs">
												{activity.patientGender === "male" ? "Male" : "Female"}
											</Badge>
										</div>
									</div>
								</div>

								<div className="p-4 bg-background/30 rounded-lg space-y-3">
									<div className="flex items-center gap-2">
										<span className="text-sm text-muted-foreground">Email:</span>
										<span className="font-medium">{activity.patientEmail}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm text-muted-foreground">Phone:</span>
										<span className="font-medium">{activity.patientPhone}</span>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm text-muted-foreground">Patient ID:</span>
										<span className="font-medium text-pink-400">{activity.patientId}</span>
									</div>
								</div>

								<div className="p-4 bg-background/30 rounded-lg">
									<p className="text-sm text-muted-foreground mb-2">Diagnosis:</p>
									<p className="font-semibold text-orange-400">{activity.diagnosis}</p>
								</div>

								<div className="p-4 bg-background/30 rounded-lg">
									<p className="text-sm text-muted-foreground mb-2">Treatment Plan:</p>
									<p className="font-semibold">{activity.treatmentPlan}</p>
								</div>
							</div>
						</Card>
					</div>

					<div className="flex gap-4">
						<Link href="/physiotherapist" className="flex-1">
							<Button variant="outline" className="w-full bg-transparent border-purple-500/30 hover:border-purple-400/50">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Go Back
							</Button>
						</Link>
						<Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
							<FileText className="w-4 h-4 mr-2" />
							Download Report
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
