"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import FitproLayout from "@/components/fitpro-layout"
import { EditButton, SaveButton, CancelButton } from "@/components/buttons"
import { useLanguage } from "@/hooks/useLanguage"
import { Mail, Phone, MapPin, Upload, Lock } from "lucide-react"
import { toast } from "sonner"
import { dbService } from "@/lib/db-service"

export default function PhysiotherapistProfile() {
	const { t } = useLanguage()
	const [isEditingProfile, setIsEditingProfile] = useState(false)
	const [isEditingProfessional, setIsEditingProfessional] = useState(false)
	const [isEditingPassword, setIsEditingPassword] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [physiotherapistId, setPhysiotherapistId] = useState("physiotherapist_1") // Replace with actual user ID from auth

	const [profileData, setProfileData] = useState({
		firstName: "Ayesha",
		lastName: "Khan",
		email: "ayesha@example.com",
		phone: "+92-300-1234567",
		licenseNumber: "PT-2020-1234",
		specialization: "Orthopedic & Sports Rehabilitation",
	})

	const [professionalData, setProfessionalData] = useState({
		experience: "8 years",
		bio: "Experienced physiotherapist specializing in orthopedic rehabilitation and sports injury treatment.",
	})

	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	})

	// Fetch profile data on mount
	useEffect(() => {
		const fetchProfile = async () => {
			setIsLoading(true)
			try {
				const data = await dbService.getPhysiotherapistProfile(physiotherapistId)
				if (data.profile) setProfileData(data.profile)
				if (data.professional) setProfessionalData(data.professional)
			} catch (error) {
				console.error("Error fetching profile:", error)
				toast.error("Failed to load profile data")
			} finally {
				setIsLoading(false)
			}
		}
		fetchProfile()
	}, [physiotherapistId])

	const handleSaveProfile = async () => {
		setIsSaving(true)
		try {
			await dbService.updatePhysiotherapistProfile(physiotherapistId, {
				profileData,
				professionalData,
			})
			toast.success("Profile updated successfully!")
			setIsEditingProfile(false)
		} catch (error) {
			toast.error("Failed to update profile")
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleSaveProfessional = async () => {
		setIsSaving(true)
		try {
			await dbService.updatePhysiotherapistProfile(physiotherapistId, {
				profileData,
				professionalData,
			})
			toast.success("Professional information updated successfully!")
			setIsEditingProfessional(false)
		} catch (error) {
			toast.error("Failed to update professional information")
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleChangePassword = async () => {
		if (!passwordData.currentPassword || !passwordData.newPassword) {
			toast.error("Please fill in all password fields")
			return
		}
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			toast.error("Passwords do not match!")
			return
		}
		if (passwordData.newPassword.length < 8) {
			toast.error("Password must be at least 8 characters long")
			return
		}

		setIsSaving(true)
		try {
			const response = await fetch("/api/auth/change-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: physiotherapistId,
					currentPassword: passwordData.currentPassword,
					newPassword: passwordData.newPassword,
				}),
			})

			if (response.ok) {
				toast.success("Password changed successfully!")
				setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
				setIsEditingPassword(false)
			} else {
				const error = await response.json()
				toast.error(error.message || "Failed to change password")
			}
		} catch (error) {
			toast.error("Error changing password")
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<FitproLayout role="physiotherapist">
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-white mb-2">{t("myProfileHeading")}</h1>
					<p className="text-gray-400">{t("manageFitnessProfileDesc")}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Profile Card */}
					<Card className="fitpro-card md:col-span-1">
						<CardContent className="p-6 text-center">
							<div className="relative w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-3xl text-blue-400 font-bold">
								{profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
								<button className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 hover:bg-blue-700">
									<Upload className="w-4 h-4 text-white" />
								</button>
							</div>
							<h2 className="text-xl font-bold text-white mb-1">{profileData.firstName} {profileData.lastName}</h2>
							<p className="text-gray-400 text-sm mb-4">{t("licensedPhysiotherapist")}</p>
							<div className="space-y-2 text-left text-sm">
								<div className="flex items-center gap-2 text-gray-400">
									<Phone className="w-4 h-4" />
									{profileData.phone}
								</div>
								<div className="flex items-center gap-2 text-gray-400">
									<Mail className="w-4 h-4" />
									{profileData.email}
								</div>
								<div className="flex items-center gap-2 text-gray-400">
									<MapPin className="w-4 h-4" />
									Karachi, Pakistan
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Edit Profile */}
					<Card className="fitpro-card md:col-span-2">
						<CardHeader className="flex items-center justify-between">
							<CardTitle className="text-white">{t("editProfile")}</CardTitle>
							{!isEditingProfile && <EditButton onClick={() => setIsEditingProfile(true)} />}
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-gray-300 mb-2 block">{t("firstName")}</Label>
									<Input
										value={profileData.firstName}
										onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
										disabled={!isEditingProfile}
										className="fitpro-input rounded-xl"
									/>
								</div>
								<div>
									<Label className="text-gray-300 mb-2 block">{t("lastName")}</Label>
									<Input
										value={profileData.lastName}
										onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
										disabled={!isEditingProfile}
										className="fitpro-input rounded-xl"
									/>
								</div>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">{t("email")}</Label>
								<Input
									value={profileData.email}
									onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
									disabled={!isEditingProfile}
									className="fitpro-input rounded-xl"
									type="email"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">{t("phone")}</Label>
								<Input
									value={profileData.phone}
									onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
									disabled={!isEditingProfile}
									className="fitpro-input rounded-xl"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">{t("licenseNumber")}</Label>
								<Input
									value={profileData.licenseNumber}
									onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
									disabled={!isEditingProfile}
									className="fitpro-input rounded-xl"
								/>
							</div>

							<div>
								<Label className="text-gray-300 mb-2 block">{t("specialization")}</Label>
								<Input
									value={profileData.specialization}
									onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
									disabled={!isEditingProfile}
									className="fitpro-input rounded-xl"
								/>
							</div>

							{isEditingProfile && (
								<div className="flex gap-2">
									<SaveButton onClick={handleSaveProfile} label="Save Changes" disabled={isSaving} />
									<CancelButton onClick={() => setIsEditingProfile(false)} disabled={isSaving} />
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Professional Information */}
				<Card className="fitpro-card">
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="text-white">{t("professionalInformation")}</CardTitle>
						{!isEditingProfessional && <EditButton onClick={() => setIsEditingProfessional(true)} />}
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-gray-300 mb-2 block">{t("yearsOfExperience")}</Label>
							<Input
								value={professionalData.experience}
								onChange={(e) => setProfessionalData({ ...professionalData, experience: e.target.value })}
								disabled={!isEditingProfessional}
								className="fitpro-input rounded-xl"
							/>
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("bio")}</Label>
							<textarea
								value={professionalData.bio}
								onChange={(e) => setProfessionalData({ ...professionalData, bio: e.target.value })}
								disabled={!isEditingProfessional}
								className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
								rows={4}
							/>
						</div>
						{isEditingProfessional && (
							<div className="flex gap-2">
								<SaveButton onClick={handleSaveProfessional} label="Save Professional Info" disabled={isSaving} />
								<CancelButton onClick={() => setIsEditingProfessional(false)} disabled={isSaving} />
							</div>
						)}
					</CardContent>
				</Card>

				{/* Change Password */}
				<Card className="fitpro-card">
					<CardHeader className="flex items-center justify-between">
							<CardTitle className="flex items-center gap-2 text-white">
							<Lock className="w-5 h-5" />
							{t("security")}
						</CardTitle>
						{!isEditingPassword && <EditButton onClick={() => setIsEditingPassword(true)} />}
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<Label className="text-gray-300 mb-2 block">{t("currentPassword")}</Label>
							<Input
								type="password"
								value={passwordData.currentPassword}
								onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
								disabled={!isEditingPassword}
								placeholder="Enter current password"
								className="fitpro-input rounded-xl"
							/>
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("newPassword")}</Label>
							<Input
								type="password"
								value={passwordData.newPassword}
								onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
								disabled={!isEditingPassword}
								placeholder="Enter new password"
								className="fitpro-input rounded-xl"
							/>
						</div>
						<div>
							<Label className="text-gray-300 mb-2 block">{t("confirmNewPassword")}</Label>
							<Input
								type="password"
								value={passwordData.confirmPassword}
								onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
								disabled={!isEditingPassword}
								placeholder="Confirm new password"
								className="fitpro-input rounded-xl"
							/>
						</div>
						{isEditingPassword && (
							<div className="flex gap-2">
								<SaveButton onClick={handleChangePassword} label="Change Password" disabled={isSaving} />
								<CancelButton onClick={() => setIsEditingPassword(false)} disabled={isSaving} />
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</FitproLayout>
	)
}

