"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Activity, Flame, Calendar, Target, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { exercises } from "@/lib/exercises-data"

interface Member {
	id: string
	name: string
	email: string
	gender: "male" | "female"
	membershipType: "Basic" | "Premium" | "Pro"
	joinDate: string
	lastActive: string
	totalWorkouts: number
	weeklyWorkouts: number
	streak: number
	caloriesBurned: number
}

interface Workout {
	id: string
	memberId: string
	name: string
	date: string
	duration: string
	calories: number
	exercises: string[]
}

export default function MemberDetailPage({ params }: { params: { id: string } }) {
	const { id } = params

	const members: Member[] = [
		{
			id: "1",
			name: "John Carter",
			email: "john@example.com",
			gender: "male",
			membershipType: "Premium",
			joinDate: "2025-01-15",
			lastActive: "Today",
			totalWorkouts: 45,
			weeklyWorkouts: 5,
			streak: 12,
			caloriesBurned: 15600,
		},
		{
			id: "2",
			name: "Emily Rose",
			email: "emily@example.com",
			gender: "female",
			membershipType: "Premium",
			joinDate: "2025-01-16",
			lastActive: "Yesterday",
			totalWorkouts: 38,
			weeklyWorkouts: 4,
			streak: 8,
			caloriesBurned: 12400,
		},
	]

	const workouts: Workout[] = [
		{
			id: "1",
			memberId: "1",
			name: "Chest & Triceps",
			date: "2025-03-15",
			duration: "45 min",
			calories: 320,
			exercises: ["Bench Press", "Incline Press", "Tricep Dips", "Cable Flyes"],
		},
		{
			id: "2",
			memberId: "1",
			name: "Leg Day",
			date: "2025-03-14",
			duration: "60 min",
			calories: 450,
			exercises: ["Squat", "Leg Press", "Lunges", "Leg Curl"],
		},
		{
			id: "3",
			memberId: "2",
			name: "Core & Conditioning",
			date: "2025-03-14",
			duration: "30 min",
			calories: 180,
			exercises: ["Plank", "Leg Raises", "Russian Twist", "Mountain Climbers"],
		},
	]

	const member = members.find((m) => m.id === id)
	const memberWorkouts = workouts.filter((w) => w.memberId === id)

	if (!member) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card className="p-8 glass-effect text-center">
					<h2 className="text-2xl font-bold mb-4">Member Not Found</h2>
					<Link href="/admin">
						<Button>Back to Admin</Button>
					</Link>
				</Card>
			</div>
		)
	}

	return (
		<div className="min-h-screen relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />

			<div className="relative z-10 container mx-auto px-4 py-8">
				<div className="mb-8">
					<Link href="/admin">
						<Button variant="outline" className="gap-2 mb-4 bg-transparent">
							<ArrowLeft className="w-4 h-4" />
							Back to Admin
						</Button>
					</Link>

					<div className="flex items-center gap-4">
						<Avatar className="w-20 h-20 border-4 border-primary/30">
							<AvatarFallback className="bg-gradient-to-br from-primary via-secondary to-accent text-white text-3xl font-bold">
								{member.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
								{member.name}
							</h1>
							<p className="text-muted-foreground">{member.email}</p>
							<div className="flex gap-2 mt-2">
								<Badge>{member.membershipType}</Badge>
								<Badge variant="outline">{member.gender === "male" ? "Male" : "Female"}</Badge>
								<Badge variant={member.lastActive === "Today" ? "default" : "secondary"}>{member.lastActive}</Badge>
							</div>
						</div>
					</div>
				</div>

				<div className="grid lg:grid-cols-4 gap-6 mb-8">
					<Card className="p-6 glass-effect border-primary/30">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
								<Activity className="w-6 h-6 text-primary" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Total Workouts</p>
								<p className="text-2xl font-bold">{member.totalWorkouts}</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 glass-effect border-secondary/30">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
								<TrendingUp className="w-6 h-6 text-secondary" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Weekly</p>
								<p className="text-2xl font-bold">{member.weeklyWorkouts}</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 glass-effect border-accent/30">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
								<Flame className="w-6 h-6 text-accent" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Streak</p>
								<p className="text-2xl font-bold">{member.streak} days</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 glass-effect border-primary/30">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
								<Flame className="w-6 h-6 text-white" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Calories</p>
								<p className="text-2xl font-bold">{(member.caloriesBurned / 1000).toFixed(1)}k</p>
							</div>
						</div>
					</Card>
				</div>

				<div className="grid lg:grid-cols-2 gap-6">
					<Card className="p-6 glass-effect border-primary/30">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							<Target className="w-6 h-6 text-primary" />
							Today's Suggested Exercises
						</h2>
						<div className="grid grid-cols-2 gap-4">
							{exercises.slice(0, 4).map((exercise) => (
								<Card key={exercise.id} className="overflow-hidden glass-effect border-border/50 hover:border-primary/50 transition-all group">
									<div className="relative h-40 bg-muted">
										<Image
											src={exercise.videoUrl || "/placeholder.svg"}
											alt={exercise.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform"
										/>
									</div>
									<div className="p-4">
										<h4 className="font-semibold mb-2 line-clamp-1">{exercise.title}</h4>
										<p className="text-sm text-muted-foreground mb-3">{exercise.duration || "--"}</p>
										<div className="flex flex-wrap gap-1">
											{exercise.targetMuscles?.slice(0, 2).map((muscle, idx) => (
												<span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
													{muscle}
												</span>
											))}
										</div>
									</div>
								</Card>
							))}
						</div>
					</Card>

					<Card className="p-6 glass-effect border-primary/30">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
							<Calendar className="w-6 h-6 text-primary" />
							Recent Workouts
						</h2>
						<div className="space-y-4">
							{memberWorkouts.map((workout) => (
								<div key={workout.id} className="p-4 rounded-lg bg-muted/50 border border-border/50">
									<div className="flex items-center justify-between mb-3">
										<h4 className="font-semibold">{workout.name}</h4>
										<span className="text-sm text-muted-foreground">{workout.date}</span>
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
										<span className="flex items-center gap-1">
											<Calendar className="w-4 h-4" />
											{workout.duration}
										</span>
										<span className="flex items-center gap-1">
											<Flame className="w-4 h-4" />
											{workout.calories} kcal
										</span>
									</div>
									<div className="flex flex-wrap gap-2">
										{workout.exercises.map((exercise, idx) => (
											<Badge key={idx} variant="secondary" className="text-xs">
												{exercise}
											</Badge>
										))}
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>

				<Card className="p-6 glass-effect border-primary/30 mt-6">
					<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
						<User className="w-6 h-6 text-primary" />
						Membership Information
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
								<span className="text-muted-foreground">Joined</span>
								<span className="font-semibold">{member.joinDate}</span>
							</div>
							<div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
								<span className="text-muted-foreground">Last Active</span>
								<span className="font-semibold">{member.lastActive}</span>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
								<span className="text-muted-foreground">Membership</span>
								<Badge>{member.membershipType}</Badge>
							</div>
							<div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
								<span className="text-muted-foreground">Gender</span>
								<Badge variant="outline">{member.gender === "male" ? "Male" : "Female"}</Badge>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
