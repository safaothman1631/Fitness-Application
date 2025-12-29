"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { useLanguage } from "@/hooks/useLanguage"
import { Mail, Phone, MapPin, Save, Loader2, User, Briefcase } from "lucide-react"
import { toast } from "sonner"

export default function PhysiotherapistProfile() {
	const { t } = useLanguage()
	const [isEditingProfile, setIsEditingProfile] = useState(false)
	const [isEditingProfessional, setIsEditingProfessional] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	
	// TODO: Replace with actual physiotherapist ID from auth
	const physiotherapistId = "physio1"

	const [profileData, setProfileData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		licenseNumber: "",
		specialization: "",
		location: ""
	})

	const [professionalData, setProfessionalData] = useState({
		experience: "",
		bio: "",
		certifications: ""
	})

	// Fetch profile data on mount
	useEffect(() => {
		fetchProfile()
	}, [])

	const fetchProfile = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`/api/physiotherapist/profile?id=${physiotherapistId}`, {
				cache: 'no-store'
			})
			
			if (response.ok) {
				const data = await response.json()
				if (data.profile) {
					setProfileData({
						firstName: data.profile.firstName || "",
						lastName: data.profile.lastName || "",
						email: data.profile.email || "",
						phone: data.profile.phone || "",
						licenseNumber: data.profile.licenseNumber || "",
						specialization: data.profile.specialization || "",
						location: data.profile.location || ""
					})
					setProfessionalData({
						experience: data.profile.experience || "",
						bio: data.profile.bio || "",
						certifications: data.profile.certifications || ""
					})
				}
			}
		} catch (error) {
			console.error("Error fetching profile:", error)
			toast.error("Failed to load profile data")
		} finally {
			setIsLoading(false)
		}
	}

	const handleSaveProfile = async () => {
		setIsSaving(true)
		try {
			const response = await fetch("/api/physiotherapist/profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					physiotherapistId,
					...profileData,
					...professionalData
				})
			})

			if (!response.ok) throw new Error("Failed to update profile")

			toast.success(t("profileUpdated"))
			setIsEditingProfile(false)
			fetchProfile()
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
			const response = await fetch("/api/physiotherapist/profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					physiotherapistId,
					...profileData,
					...professionalData
				})
			})

			if (!response.ok) throw new Error("Failed to update professional info")

			toast.success(t("profileUpdated"))
			setIsEditingProfessional(false)
			fetchProfile()
		} catch (error) {
			toast.error("Failed to update professional information")
			console.error(error)
		} finally {
			setIsSaving(false)
		}
	}

	if (isLoading) {
		return (
			<SidebarSleek role="physiotherapist">
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-500 mb-4" />
						<p className="text-gray-400">{t("loading")}...</p>
					</div>
				</div>
			</SidebarSleek>
		)
	}

	return (
		<SidebarSleek role="physiotherapist">
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B2E3] to-[#73E8FF] flex items-center justify-center shadow-lg shadow-[#10B2E3]/30">
						<User className="w-6 h-6 text-white" />
					</div>
					<div>
						<h1 className="text-3xl font-bold text-white">{t("myProfile")}</h1>
						<p className="text-gray-400 text-sm">{t("professionalInfo")}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Profile Card */}
					<Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-cyan-500/30 md:col-span-1">
						<CardContent className="p-6 text-center">
							<div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-3xl text-blue-400 font-bold">
								{profileData.firstName ? profileData.firstName.charAt(0) : "P"}{profileData.lastName ? profileData.lastName.charAt(0) : "T"}
							</div>
							<h2 className="text-xl font-bold text-white mb-1">
								{profileData.firstName || "Physiotherapist"} {profileData.lastName || ""}
							</h2>
							<p className="text-gray-400 text-sm mb-4">{profileData.specialization || t("specialization")}</p>
							<div className="space-y-2 text-left text-sm">
								<div className="flex items-center gap-2 text-gray-400">
									<Phone className="w-4 h-4" />
									{profileData.phone || "Not set"}
								</div>
								<div className="flex items-center gap-2 text-gray-400">
									<Mail className="w-4 h-4" />
									{profileData.email || "Not set"}
								</div>
								<div className="flex items-center gap-2 text-gray-400">
									<MapPin className="w-4 h-4" />
									{profileData.location || "Not set"}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Edit Profile */}
					<Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30 md:col-span-2">
						<CardHeader className="flex items-center justify-between">
							<CardTitle className="text-white">{t("editProfile")}</CardTitle>
							{!isEditingProfile && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => setIsEditingProfile(true)}
									className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-none"
								>
									<User className="w-4 h-4 mr-2" />
									{t("edit")}
								</Button>
							)}
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
									disabled
									className="fitpro-input rounded-xl opacity-60 cursor-not-allowed"									type="email"
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

							<div>
								<Label className="text-gray-300 mb-2 block">{t("location")}</Label>
								<Input
									value={profileData.location}
									onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
									disabled={!isEditingProfile}
									className="fitpro-input rounded-xl"
								/>
							</div>

							{isEditingProfile && (
								<div className="flex gap-2">
									<Button
										onClick={handleSaveProfile}
										disabled={isSaving}
										className="fitpro-button"
									>
										{isSaving ? (
											<>
												<Loader2 className="w-4 h-4 mr-2 animate-spin" />
												{t("saving")}
											</>
										) : (
											<>
												<Save className="w-4 h-4 mr-2" />
												{t("saveChanges")}
											</>
										)}
									</Button>
									<Button
										variant="outline"
										onClick={() => setIsEditingProfile(false)}
										disabled={isSaving}
										className="fitpro-button"
									>
										{t("cancel")}
									</Button>
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Professional Information */}
				<Card className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-amber-500/30">
					<CardHeader className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2 text-white">
							<Briefcase className="w-5 h-5 text-amber-400" />
							{t("professionalInformation")}
						</CardTitle>
						{!isEditingProfessional && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsEditingProfessional(true)}
								className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none"
							>
								<User className="w-4 h-4 mr-2" />
								{t("edit")}
							</Button>
						)}
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
						<div>
							<Label className="text-gray-300 mb-2 block">{t("certifications")}</Label>
							<Input
								value={professionalData.certifications}
								onChange={(e) => setProfessionalData({ ...professionalData, certifications: e.target.value })}
								disabled={!isEditingProfessional}
								className="fitpro-input rounded-xl"
							/>
						</div>
						{isEditingProfessional && (
							<div className="flex gap-2">
								<Button
									onClick={handleSaveProfessional}
									disabled={isSaving}
									className="fitpro-button"
								>
									{isSaving ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											{t("saving")}
										</>
									) : (
										<>
											<Save className="w-4 h-4 mr-2" />
											{t("saveChanges")}
										</>
									)}
								</Button>
								<Button
									variant="outline"
									onClick={() => setIsEditingProfessional(false)}
									disabled={isSaving}
									className="fitpro-button"
								>
									{t("cancel")}
								</Button>
							</div>
						)}
					</CardContent>
				</Card>


			</div>
		</SidebarSleek>
	)
}


