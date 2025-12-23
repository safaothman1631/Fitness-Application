"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { Save, Lock, Bell, Eye, Shield, Loader2 } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface NotificationPreferences {
	patientMessages: boolean
	appointmentReminders: boolean
	progressAlerts: boolean
	emailNotifications: boolean
}

export default function PhysiotherapistSettings() {
	const { t } = useLanguage()
	const router = useRouter()
	
	const [userId, setUserId] = useState<string | null>(null)
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
	
	// TODO: Replace with actual physiotherapist ID from auth
	const physiotherapistId = "physio1"
	
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [updatingPassword, setUpdatingPassword] = useState(false)
	
	const [preferences, setPreferences] = useState<NotificationPreferences>({
		patientMessages: true,
		appointmentReminders: true,
		progressAlerts: true,
		emailNotifications: false,
	})

	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	})

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUserId(user.uid)
				
				// Fetch user data including 2FA status
				const token = await user.getIdToken()
				const userDataResponse = await fetch(`/api/users/${user.uid}`, {
					headers: { 'Authorization': `Bearer ${token}` }
				})
				if (userDataResponse.ok) {
					const userData = await userDataResponse.json()
					setTwoFactorEnabled(userData.twoFactorEnabled ?? false)
				}
				
				await loadPreferences()
			}
		})
		return () => unsubscribe()
	}, [])

	const loadPreferences = async () => {
		try {
			setLoading(true)
			const response = await fetch(`/api/settings?physiotherapistId=${physiotherapistId}`, {
				cache: 'no-store'
			})
			
			if (response.ok) {
				const data = await response.json()
				if (data.preferences) {
					setPreferences(data.preferences)
				}
			}
		} catch (error) {
			console.error("Error loading preferences:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleToggle2FA = async (enabled: boolean) => {
		if (enabled) {
			router.push('/physiotherapist/settings/two-factor')
		} else {
			if (confirm('Are you sure you want to disable Two-Factor Authentication?')) {
				try {
					const token = await auth.currentUser?.getIdToken()
					const response = await fetch(`/api/users/${userId}`, {
						method: 'PATCH',
						headers: { 
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ twoFactorEnabled: false })
					})
					if (response.ok) {
						setTwoFactorEnabled(false)
						toast.success('Two-Factor Authentication disabled!')
					} else {
						const errorData = await response.json()
						toast.error(`Failed to disable 2FA: ${errorData.error || 'Unknown error'}`)
					}
				} catch (error) {
					console.error('Error disabling 2FA:', error)
					toast.error('Error disabling 2FA')
				}
			}
		}
	}

	const handleToggle = (key: keyof NotificationPreferences) => {
		setPreferences(prev => ({
			...prev,
			[key]: !prev[key]
		}))
	}

	const handleSavePreferences = async () => {
		try {
			setSaving(true)
			const response = await fetch("/api/settings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					physiotherapistId,
					preferences
				})
			})

			if (!response.ok) throw new Error("Failed to save preferences")

			toast.success(t("success"))
		} catch (error) {
			console.error("Error saving preferences:", error)
			toast.error("Failed to save preferences")
		} finally {
			setSaving(false)
		}
	}

	const handleUpdatePassword = async () => {
		// Validation
		if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
			toast.error("Please fill all password fields")
			return
		}

		if (passwordData.newPassword !== passwordData.confirmPassword) {
			toast.error("New password and confirm password do not match")
			return
		}

		if (passwordData.newPassword.length < 6) {
			toast.error("Password must be at least 6 characters")
			return
		}

		try {
			setUpdatingPassword(true)
			const response = await fetch("/api/settings/password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					physiotherapistId,
					currentPassword: passwordData.currentPassword,
					newPassword: passwordData.newPassword
				})
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Failed to update password")
			}

			toast.success(t("passwordChanged"))
			// Clear password fields
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: ""
			})
		} catch (error: any) {
			console.error("Error updating password:", error)
			toast.error(error.message || "Failed to update password")
		} finally {
			setUpdatingPassword(false)
		}
	}
	
	return (
		<SidebarSleek role="physiotherapist">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">{t("settings")}</h1>
					<p className="text-gray-400">{t("manageAccountPreferences")}</p>
				</div>

				{/* Account Settings */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<Shield className="w-5 h-5" />
							{t("accountSecurity")}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* 2FA Toggle */}
						<div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/70 transition-colors">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
									<Lock className="w-6 h-6 text-purple-400" />
								</div>
								<div>
									<p className="text-white font-semibold">{t("twoFactorAuth")}</p>
									<p className="text-gray-400 text-sm">{t("addExtraLayer")}</p>
									{twoFactorEnabled && (
										<p className="text-green-400 text-xs mt-1">✓ {t("enabled")}</p>
									)}
								</div>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input 
									type="checkbox" 
									checked={twoFactorEnabled}
									onChange={(e) => handleToggle2FA(e.target.checked)}
									className="sr-only peer" 
								/>
								<div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
							</label>
						</div>

						{/* Password Change */}
						<div>
							<Label className="text-gray-300 mb-2 block">{t("currentPassword")}</Label>
							<Input 
								type="password" 
								placeholder={t("enterCurrentPassword")} 
								className="fitpro-input rounded-xl"
								value={passwordData.currentPassword}
								onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
							/>
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("newPassword")}</Label>
							<Input 
								type="password" 
								placeholder={t("enterNewPassword")} 
								className="fitpro-input rounded-xl"
								value={passwordData.newPassword}
								onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
							/>
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("confirmPassword")}</Label>
							<Input 
								type="password" 
								placeholder={t("confirmNewPassword")} 
								className="fitpro-input rounded-xl"
								value={passwordData.confirmPassword}
								onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
							/>
						</div>
						<Button 
							onClick={handleUpdatePassword}
							disabled={updatingPassword}
							className="w-full fitpro-button rounded-xl gap-2"
						>
							{updatingPassword ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									{t("update")}...
								</>
							) : (
								<>
									<Lock className="w-4 h-4" />
									{t("updatePassword")}
								</>
							)}
						</Button>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<Bell className="w-5 h-5" />
							{t("notificationPreferences")}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{loading ? (
							<div className="text-center py-8">
								<Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
								<p className="text-gray-400 mt-2">{t("loading")}...</p>
							</div>
						) : (
							<>
								<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
									<div>
										<p className="text-white font-semibold">{t("patientMessages")}</p>
										<p className="text-gray-400 text-sm">{t("getNotifiedPatientMessages")}</p>
									</div>
									<button
										onClick={() => handleToggle("patientMessages")}
										className={`relative w-12 h-6 rounded-full transition-colors ${
											preferences.patientMessages ? "bg-blue-500" : "bg-gray-600"
										}`}
									>
										<span
											className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
												preferences.patientMessages ? "translate-x-6" : ""
											}`}
										/>
									</button>
								</div>

								<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
									<div>
										<p className="text-white font-semibold">{t("appointmentRemindersLabel")}</p>
										<p className="text-gray-400 text-sm">{t("reminderBeforeAppointment")}</p>
									</div>
									<button
										onClick={() => handleToggle("appointmentReminders")}
										className={`relative w-12 h-6 rounded-full transition-colors ${
											preferences.appointmentReminders ? "bg-blue-500" : "bg-gray-600"
										}`}
									>
										<span
											className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
												preferences.appointmentReminders ? "translate-x-6" : ""
											}`}
										/>
									</button>
								</div>

								<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
									<div>
										<p className="text-white font-semibold">{t("progressAlertsLabel")}</p>
										<p className="text-gray-400 text-sm">{t("notifyPatientProgress")}</p>
									</div>
									<button
										onClick={() => handleToggle("progressAlerts")}
										className={`relative w-12 h-6 rounded-full transition-colors ${
											preferences.progressAlerts ? "bg-blue-500" : "bg-gray-600"
										}`}
									>
										<span
											className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
												preferences.progressAlerts ? "translate-x-6" : ""
											}`}
										/>
									</button>
								</div>

								<div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
									<div>
										<p className="text-white font-semibold">{t("emailNotifications")}</p>
										<p className="text-gray-400 text-sm">{t("receiveDailyEmails")}</p>
									</div>
									<button
										onClick={() => handleToggle("emailNotifications")}
										className={`relative w-12 h-6 rounded-full transition-colors ${
											preferences.emailNotifications ? "bg-blue-500" : "bg-gray-600"
										}`}
									>
										<span
											className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
												preferences.emailNotifications ? "translate-x-6" : ""
											}`}
										/>
									</button>
								</div>

								<Button 
									onClick={handleSavePreferences}
									disabled={saving}
									className="w-full fitpro-button rounded-xl gap-2"
								>
									{saving ? (
										<>
											<Loader2 className="w-4 h-4 animate-spin" />
											{t("save")}...
										</>
									) : (
										<>
											<Save className="w-4 h-4" />
											{t("savePreferences")}
										</>
									)}
								</Button>
							</>
						)}
					</CardContent>
				</Card>

				{/* Privacy Settings */}
				<Card className="fitpro-card">
					<CardHeader>
						<CardTitle className="text-white flex items-center gap-2">
							<Eye className="w-5 h-5" />
							{t("privacySettings")}
						</CardTitle>
					</CardHeader>
				</Card>

				{/* Danger Zone */}
				<Card className="fitpro-card border-red-500/20">
					<CardHeader>
						<CardTitle className="text-red-400">{t("dangerZone")}</CardTitle>
					</CardHeader>
					<CardContent>
						<Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl">
							{t("deleteAccount")}
						</Button>
					</CardContent>
				</Card>
			</div>
		</SidebarSleek>
	)
}


