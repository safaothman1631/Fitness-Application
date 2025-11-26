"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthGuard from "@/components/auth-guard"		<div className="min-h-screen relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-purple-950" />

			<div className="relative z-10">
				<ManagementNotification isFemale={false} />

				<header className="border-b border-blue-500/20 glass-effect sticky top-0 z-20">
					<div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 flex items-center justify-between">
						<div className="flex items-center gap-3 md:gap-4">
							<Logo size="md" href="/" />
							<div>
								<h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
									{t("patientPanelTitle")}
								</h1>
								<p className="text-xs md:text-sm text-blue-300/70">
									{t("welcomeGreeting")}, {patientData?.name}
								</p>
							</div>
						</div>
						<Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-blue-500/10 text-blue-300">
							<LogOut className="w-4 h-4 md:w-5 md:h-5" />
						</Button>
					</div>
				</header>

				<div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
					<div className="max-w-4xl mx-auto">
						<Card className="p-6 md:p-8 glass-effect border-blue-500/30 mb-5 md:mb-6">
							<div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-5 md:mb-6">
								<div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
									<UserCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
								</div>
								<div className="text-center md:text-left">
									<h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{patientData?.name}</h2>
									<Badge className="bg-blue-600">Patient ID: {patientData?.patientId}</Badge>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
								<Card className="p-3 md:p-4 glass-effect border-blue-500/20">
									<div className="flex items-center gap-2 md:gap-3">
										<div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-blue-600/20 flex items-center justify-center flex-shrink-0">
											<Calendar className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
										</div>
										<div>
											<p className="text-xs md:text-sm text-muted-foreground">{t("registrationDate")}</p>
											<p className="text-sm md:text-base font-bold text-blue-400">
												{new Date(patientData?.loginTime).toLocaleDateString("en-US")}
											</p>
										</div>
									</div>
								</Card>

								<Card className="p-3 md:p-4 glass-effect border-purple-500/20">
									<div className="flex items-center gap-2 md:gap-3">
										<div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
											<Activity className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
										</div>
										<div>
											<p className="text-xs md:text-sm text-muted-foreground">{t("status")}</p>
											<p className="text-sm md:text-base font-bold text-purple-400">{t("active")}</p>
										</div>
									</div>
								</Card>

								<Card className="p-3 md:p-4 glass-effect border-violet-500/20">
									<div className="flex items-center gap-2 md:gap-3">
										<div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-violet-600/20 flex items-center justify-center flex-shrink-0">
											<TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
										</div>
										<div>
											<p className="text-xs md:text-sm text-muted-foreground">{t("access")}</p>
											<p className="text-sm md:text-base font-bold text-violet-400">{t("fullPermission")}</p>
										</div>
									</div>
								</Card>
							</div>
						</Card>

						<Card className="p-6 md:p-8 glass-effect border-blue-500/30 text-center">
							<FileText className="w-12 h-12 md:w-16 md:h-16 text-blue-400/50 mx-auto mb-3 md:mb-4" />
							<h3 className="text-lg md:text-xl font-bold mb-2">{t("patientPanelDevelopment")}</h3>
							<p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">{t("patientPanelDescription")}</p>
							<Badge className="bg-blue-600">{t("comingSoon")}</Badge>
						</Card>
					</div>
				</div>
			</div>
		</div>
<<<<<<< HEAD
		</AuthGuard>
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
	)
}

