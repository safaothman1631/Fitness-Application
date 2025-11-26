"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { Save, Lock, Bell, Eye, Shield } from "lucide-react"

export default function PhysiotherapistSettings() {
	return (
		<FitproLayout role="physiotherapist">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
					<p className="text-gray-400">Manage your account preferences and security</p>
				</div>

				{/* Account Settings */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<Shield className="w-5 h-5" />
							Account Security
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-gray-300 mb-2 block">Current Password</Label>
							<Input type="password" placeholder="Enter current password" className="fitpro-input rounded-xl" />
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">New Password</Label>
							<Input type="password" placeholder="Enter new password" className="fitpro-input rounded-xl" />
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">Confirm Password</Label>
							<Input type="password" placeholder="Confirm new password" className="fitpro-input rounded-xl" />
						</div>
						<Button className="w-full fitpro-button rounded-xl gap-2">
							<Lock className="w-4 h-4" />
							Update Password
						</Button>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<Bell className="w-5 h-5" />
							Notification Preferences
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
							<div>
								<p className="text-white font-semibold">Patient Messages</p>
								<p className="text-gray-400 text-sm">Get notified when patients send messages</p>
							</div>
							<input type="checkbox" defaultChecked className="w-5 h-5" />
						</div>

						<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
							<div>
								<p className="text-white font-semibold">Appointment Reminders</p>
								<p className="text-gray-400 text-sm">Reminder before each appointment</p>
							</div>
							<input type="checkbox" defaultChecked className="w-5 h-5" />
						</div>

						<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
							<div>
								<p className="text-white font-semibold">Progress Alerts</p>
								<p className="text-gray-400 text-sm">Notify when patient progress is recorded</p>
							</div>
							<input type="checkbox" defaultChecked className="w-5 h-5" />
						</div>

						<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
							<div>
								<p className="text-white font-semibold">Email Notifications</p>
								<p className="text-gray-400 text-sm">Receive daily email summaries</p>
							</div>
							<input type="checkbox" className="w-5 h-5" />
						</div>

						<Button className="w-full fitpro-button rounded-xl gap-2">
							<Save className="w-4 h-4" />
							Save Preferences
						</Button>
					</CardContent>
				</Card>

				{/* Privacy Settings */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<Eye className="w-5 h-5" />
							Privacy Settings
						</CardTitle>
					</CardHeader>
				</Card>

				{/* Danger Zone */}
				<Card className="fitpro-card border-red-500/20">
					<CardHeader>
						<CardTitle className="text-red-400">Danger Zone</CardTitle>
					</CardHeader>
					<CardContent>
						<Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
							Delete Account
						</Button>
					</CardContent>
				</Card>
			</div>
		</FitproLayout>
	)
}

