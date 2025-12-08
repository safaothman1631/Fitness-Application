export type Language = "en" | "ar" | "ku" | "tr"

export type TranslationKey =
  | "heroTitle"
  | "heroSubtitle"
  | "transformYourBody"
  | "heroDescription"
  | "learnMore"
  | "activeUsers"
  | "exercises"
  | "rating"
  | "featuresTitle"
  | "professionalSolutions"
  | "videoGuidance"
  | "videoGuidanceDesc"
  | "personalizedPrograms"
  | "personalizedProgramsDesc"
  | "progressTracking"
  | "progressTrackingDesc"
  | "exerciseLibraryFull"
  | "exerciseLibraryFullDesc"
  | "goalOriented"
  | "goalOrientedDesc"
  | "achievementBadges"
  | "achievementBadgesDesc"
  | "priorityCustomerSupport"
  | "exclusiveCommunityAccess"
  | "startToday"
  | "first7DaysFree"
  | "allRightsReserved"
  | "patientLogin"
  | "tapTheButtonToLogin"
  | "loggingIn"
  | "loginButton"
  | "youWillBeLoggedInAutomatically"
  | "login"
  | "dashboard"
  | "todayExercises"
  | "todayMeals"
  | "physiotherapist"
  | "progress"
  | "profile"
  | "requests"
  | "anatomy3D"
  | "anatomyEngineer"
  | "unirigDemo"
  | "3dModelViewer"
  | "breakfast"
  | "lunch"
  | "snacks"
  | "dinner"
  | "snack"
  | "welcomeBack"
  | "athlete"
  | "greatWorkoutDay"
  | "muscleGrowthTracking"
  | "seeYourProgress"
  | "edit"
  | "accessKey"
  | "expired"
  | "active"
  | "keyExpiredMessage"
  | "editProfile"
  | "firstName"
  | "lastName"
  | "firstNamePlaceholder"
  | "lastNamePlaceholder"
  | "email"
  | "phone"
  | "dateOfBirth"
  | "height"
  | "weight"
  | "bio"
  | "fitnessGoal"
  | "profilePhoto"
  | "uploadPhoto"
  | "saveChanges"
  | "cancel"
  | "profileInfo"
  | "appTitle"
  | "logout"
  | "day"
  | "month"
  | "year"
  | "superadminPanel"
  | "fullSystemControl"
  | "menu"
  | "userManagement"
  | "adminManagement"
  | "patientRecords"
  | "accessKeys"
  | "exerciseManagement"
  | "workoutManagement"
  | "fitnessGuides"
  | "banners"
  | "passwordManagement"
  | "systemSettings"
  | "notifications"
  | "add"
  | "update"
  | "updating"
  | "delete"
  | "save"
  | "back"
  | "confirm"
  | "superadmin"
  | "loading"
  | "onlyAuthorizedSuperadmin"
  | "patients"
  | "activities"
  | "trainees"
  | "analytics"
  | "reports"
  | "management"
  | "helpSupport"
  | "helpDescription"
  | "helpContactInfo"
  | "close"
  | "availableWorkouts"
  | "searchWorkoutsPlaceholder"
  | "noWorkoutsFound"
  | "settings" // simple settings label separate from systemSettings
  | "languageSettings"
  | "selectLanguage"
  | "workouts"
  | "categories"
  | "start"
  | "browseWorkoutsSubtitle"
  | "signInToAccount"
  | "owner"
  | "trainer"
  // Auth & Login
  | "signIn"
  | "signUp"
  | "emailAddress"
  | "emailOrUsername"
  | "password"
  | "rememberMe"
  | "forgotPassword"
  | "loginSuccessful"
  | "chooseRoleOrSignIn"
  | "pleaseEnterEmail"
  | "pleaseEnterPassword"
  | "incorrectCredentials"
  | "resetPassword"
  | "resetPasswordTitle"
  | "resetPasswordDesc"
  | "enterEmailToReset"
  | "sendResetLink"
  | "sendingResetLink"
  | "resetLinkSent"
  | "checkYourEmail"
  | "resetEmailSentMessage"
  | "help"
  | "orContinueAs"
  | "admin"
  | "physiotherapistLogin"
  | "trainerLogin"
  | "adminLogin"
  | "superAdminLogin"
  | "ownerLogin"
  | "signInAsAdmin"
  | "signInAsPhysiotherapist"
  | "signInAsTrainer"
  | "signInAsSuperAdmin"
  | "signInAsOwner"
  | "dontHaveAccount"
  | "copyrightNotice"
  // Dashboard
  | "welcomeBackUser"
  | "readyForToday"
  | "trackFitnessDesc"
  | "totalWorkouts"
  | "activeStreak"
  | "caloriesToday"
  | "days"
  | "min"
  | "kcal"
  | "currentStreak"
  | "overallProgress"
  | "quickActions"
  | "recentActivity"
  | "todaysTimeline"
  | "todaysSchedule"
  | "startWorkout"
  | "setGoal"
  | "viewAchievements"
  | "completed"
  | "upperBodyWorkout"
  | "completedOnDate"
  | "addWorkout"
  | "logMeal"
  | "title"
  | "duration"
  | "meals"
  | "saveWorkout"
  | "saveMeal"
  | "minutes"
  | "min"
  | "limitedOffer"
  | "upgradeToday"
  | "now"
  | "todaysWorkout"
  | "workoutDetails"
  | "breakfastItem"
  | "breakfastDetails"
  | "lunchItem"
  | "lunchDetails"
  | "snackItem"
  | "snackDetails"
  | "hydratePro"
  | "hydrateProDesc"
  | "fitWatch"
  | "fitWatchDesc"
  | "gymBeats"
  | "gymBeatsDesc"
  | "tapToNext"
  | "fullBodyStrength"
  | "workoutMinExercises"
  | "mealPlan"
  | "mealsAndSnacks"
  | "physiotherapy"
  | "mobilitySession"
  // Profile & Fitness Info
  | "myProfileHeading"
  | "manageFitnessProfileDesc"
  | "premiumMember"
  | "fitnessInformation"
  | "primaryGoal"
  | "activityLevel"
  | "buildMuscle"
  | "weightLoss"
  | "endurance"
  | "flexibility"
  | "sedentary"
  | "lightlyActive"
  | "moderatelyActive"
  | "veryActive"
  | "saveFitnessInfo"
  // Settings page keys
  | "accountSecurityTitle"
  | "notificationPreferencesTitle"
  | "privacySettingsTitle"
  | "workoutReminders"
  | "workoutRemindersDesc"
  | "progressUpdates"
  | "progressUpdatesDesc"
  | "achievementBadges"
  | "achievementBadgesDesc"
  | "emailNotifications"
  | "emailNotificationsDesc"
  | "updatePassword"
  | "savePreferences"
  | "savePrivacySettings"
  | "dangerZone"
  | "deleteAccount"
  | "profileVisibility"
  | "profileVisibilityDesc"
  | "showProgress"
  | "showProgressDesc"
  | "currentPassword"
  | "newPassword"
  | "confirmPassword"
  | "enterCurrentPassword"
  | "enterNewPassword"
  | "confirmNewPassword"
  // Membership / Pricing
  | "membershipPlans"
  | "monthly"
  | "yearly"
  | "savePercent"
  | "freePlan"
  | "premiumPlan"
  | "proPlan"
  | "idealForBeginners"
  | "mostPopularChoice"
  | "forProfessionalAthletes"
  | "ultimateFitnessTransformation"
  | "oneMonth"
  | "threeMonths"
  | "sixMonths"
  | "oneYear"
  | "mostPopularBadge"
  | "limitations"
  | "faqTitle"
  | "getStarted"
  | "subscribeNow"
  | "frequentlyAskedQuestions"
  | "faqChangePlanQ"
  | "faqChangePlanA"
  | "faqFreeTrialQ"
  | "faqFreeTrialA"
  | "faqPaymentMethodsQ"
  | "faqPaymentMethodsA"
  | "faqDataSecureQ"
  | "faqDataSecureA"
  // Payment Page
  | "payment"
  | "paymentInformation"
  | "cardInformation"
  | "cardholderName"
  | "cardNumber"
  | "expiration"
  | "cvv"
  | "billingAddress"
  | "address"
  | "city"
  | "postalCode"
  | "processing"
  | "pay"
  | "securePayment"
  | "securePaymentSSL"
  | "orderSummary"
  | "oneTimePayment"
  | "subtotal"
  | "tax"
  | "total"
  | "includedInPlan"
  | "completeExerciseLibrary"
  | "detailedProgressTracking"
  | "prioritySupport"
  | "securePaymentInfo"
  | "cardInfoNotStored"
  // Payment Placeholders
  | "cardholderNamePlaceholder"
  | "streetNeighborhoodPlaceholder"
  | "cityPlaceholder"
  | "postalCodePlaceholder"
  // Membership Page
  | "chooseYourPlan"
  | "selectPerfectPlan"
  // Premium Feature Locked
  | "premiumFeatureLocked"
  | "featureRequiresSubscription"
  | "renewSubscription"
  | "backToDashboard"
  | "redirectingToDashboard"
  // Signup / Registration
  | "backToLogin"
  | "createAccountTitle"
  | "signupSubtitle"
  | "mustBeAtLeast8Chars"
  | "termsAgreement"
  | "termsOfService"
  | "privacyPolicy"
  | "creatingAccount"
  | "passwordsDoNotMatch"
  | "pleaseFillAllFields"
  | "pleaseAgreeTerms"
  | "registrationFailed"
  | "emailAlreadyInUse"
  | "passwordTooWeak"
  | "invalidEmail"
  | "alreadyHaveAccount"
  | "signInLink"
  // Subscription Warning
  | "subscriptionExpired"
  | "actionRequired"
  | "subscriptionExpiredMessage"
  | "workoutPrograms"
  | "mealPlans"
  | "progressTracking"
  | "expertSupport"
  | "renewSubscriptionNow"
  | "subscriptionExpiringSoon"
  | "subscriptionExpiresInDays"
  | "renewNow"
  // Extended Profile / Admin / Trainer
  | "professionalInformation"
  | "yearsOfExperience"
  | "certification"
  | "specialization"
  | "saveProfessionalInfo"
  | "security"
  | "changePassword"
  | "administratorPrivileges"
  | "adminProfile"
  | "editAdminProfile"
  | "licensedPhysiotherapist"
  | "certifiedFitnessTrainer"
  | "department"
  | "licenseNumber"
  // Patient panel keys
  | "patientPanelTitle"
  | "welcomeGreeting"
  | "registrationDate"
  | "status"
  | "access"
  | "fullPermission"
  | "patientPanelDevelopment"
  | "patientPanelDescription"
  | "comingSoon"
  // Physiotherapist login page extras
  | "authorizedAccessOnly"
  | "onlyRegisteredPhysiotherapists"
  | "accessPatientManagement"
  | "physiotherapistPortalFooter"
  // Workout Center & Schedule
  | "workoutCenter"
  | "workoutCenterSubtitle"
  | "buildYourStrength"
  | "buildYourStrengthDesc"
  | "todaysWorkoutWednesday"
  | "schedule"
  | "today"
  | "week"
  | "monthView"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun"
  | "chest"
  | "backMuscle"
  | "legs"
  | "shoulders"
  | "arms"
  | "core"
  | "restAndRecovery"
  | "exercises"
  | "exercisesCount"
  | "rest"
  | "todaysWorkout"
  | "workout"
  | "exerciseFirst"
  | "exerciseSecond"
  | "exerciseThird"
  | "exerciseFourth"
  | "exerciseFifth"
  | "exerciseSixth"
  | "exerciseSeventh"
  | "exerciseEighth"
  | "exerciseNinth"
  | "exerciseTenth"
  | "keepBackStraightEngageCore"
  | "goDeepKeepChestUp"
  | "lightStretchingYogaWalking"
  | "sets"
  | "reps"
  | "duration"
  | "meals"
  | "calories"
  | "carbs"
  | "fat"
  | "kcal"
  | "ingredients"
  | "recipe"
  | "recipeInstructions"
  | "mealType"
  | "mealImage"
  | "mealPhoto"
  | "todaysMeals"
  | "importantNotes"
  // Meals & Nutrition
  | "mealsAndNutrition"
  | "trackDailyMealsDesc"
  | "fuelYourBodyRight"
  | "fuelYourBodyRightDesc"
  | "protein"
  | "caloriesTodayLabel"
  | "dailyGoal"
  | "mealsLogged"
  // Physio Panel
  | "physiotherapyTitle"
  | "physioSubtitle"
  | "recoverAndHeal"
  | "recoverAndHealDesc"
  | "completedLabel"
  | "requestsLabel"
  | "totalRequests"
  | "recoveryRate"
  | "pendingLabel"
  | "sendRequest"
  | "selectPhysiotherapist"
  | "injuryType"
  | "injuryTypePlaceholder"
  | "painPercentage"
  | "notesOptional"
  | "notesPlaceholder"
  | "yourRequests"
  | "noRequestsYet"
  // Profile Section
  | "subscriptionAndAccessKey"
  | "yourAccessKey"
  | "personalIdentifier"
  | "statusLabel"
  | "remainingLabel"
  | "joinedLabel"
  | "expiresLabel"
  | "accessKeyNote"
  | "account"
  | "manageLabel"
  | "stats"
  | "goalLabel"
  | "heightLabel"
  | "weightLabel"
  | "shortcuts"
  | "physioLabel"
  | "mealsLabel"
  | "workoutLabel"
  | "preferences"
  | "appearance"
  | "light"
  | "dark"
  | "system"
  | "systemFollowsOS"
  | "pushNotifications"
  | "applyLanguage"
  | "accountActions"
  | "accountActionsDesc"
  | "logoutButton"
  // Manage Profile Dialog
  | "manageProfile"
  | "changeAvatar"
  | "avatarSizeNote"
  | "personal"
  | "fullName"
  | "phoneLabel"
  | "joinDate"
  | "goal"
  | "goalLabel"
  | "experience"
  | "physical"
  | "security"
  | "current"
  | "new"
  | "confirm"
  | "changePasswordLabel"
  | "currentPasswordLabel"
  | "newPasswordLabel"
  | "confirmPasswordLabel"
  | "saved"
  // Dashboard Stats
  | "totalTime"
  | "caloriesBurned"
  // Workout Exercise Names
  | "barbellBenchPress"
  | "inclineDumbbellPress"
  | "cableFlyes"
  | "focusControlledMovement"
  | "squeezeAtPeak"
  // Notifications Dialog
  | "notificationsTitle"
  | "milestoneReached"
  | "milestoneReachedDesc"
  | "workoutReminder"
  | "workoutReminderDesc"
  | "progressUpdate"
  | "progressUpdateDesc"
  | "close"
  // Superadmin Dashboard
  | "superadminDashboard"
  | "systemManagementControl"
  | "users"
  | "keys"
  | "activeNow"
  | "growth"
  | "totalActive"
  | "accessKeysLabel"
  | "onlineNow"
  | "thisMonth"
  | "quickActions"
  | "manageUsers"
  | "generateKeys"
  | "viewReports"
  | "systemStatus"
  | "database"
  | "apiServer"
  | "storage"
  | "healthy"
  | "running"
  | "percentUsed"
  | "trainers"
  | "totalTrainers"
  // Users Management
  | "userManagementTitle"
  | "manageYourUsers"
  | "statistics"
  | "allUsers"
  | "searchUsers"
  | "addNewUser"
  | "viewProfile"
  | "editUser"
  | "deleteUser"
  | "active"
  | "inactive"
  | "membership"
  | "accountSettings"
  | "personalInformation"
  | "fullNameLabel"
  | "emailAddressLabel"
  | "phoneNumberLabel"
  | "locationLabel"
  | "roleLabel"
  | "passwordLabel"
  | "trainersAlwaysActive"
  | "saveChanges"
  | "cancelAction"
  | "deleteUserTitle"
  | "areYouSure"
  | "actionCannotBeUndone"
  | "confirmDelete"
  | "proRequests"
  | "proRequestsDescription"
  | "upgradeRequests"
  | "noPendingRequests"
  | "requestFrom"
  | "requestDetails"
  | "approve"
  | "reject"
  | "pending"
  | "approved"
  | "rejected"
  // Access Keys Page
  | "accessKeysPage"
  | "generateAndManageKeys"
  | "generateNewKey"
  | "generating"
  | "totalKeys"
  | "expired"
  | "quickKeyGenerator"
  | "generateKeysInstantly"
  | "trialOneUse"
  | "standardFiveUses"
  | "premiumTenUses"
  | "allAccessKeys"
  | "keyColumn"
  | "typeColumn"
  | "usesColumn"
  | "statusColumn"
  | "expiresColumn"
  | "actionsColumn"
  | "trial"
  | "standard"
  | "premium"
  | "used"
  | "copyKey"
  // Analytics Page
  | "analyticsDashboard"
  | "trackPerformance"
  | "loadingAnalytics"
  | "keyMetrics"
  | "totalUsers"
  | "activeUsers24h"
  | "proMembers"
  | "totalWorkouts"
  | "userGrowth"
  | "userDistribution"
  | "recentActivity"
  | "newUserRegistered"
  // Database Page
  | "databaseManagement"
  | "monitorDatabase"
  | "refresh"
  | "backup"
  | "creatingBackup"
  | "healthStatus"
  | "databaseStatus"
  | "allSystemsOperational"
  | "lastChecked"
  | "justNow"
  | "uptime"
  | "storageUsed"
  | "totalRecords"
  | "activeConnections"
  | "collectionsColumn"
  | "collectionsOverview"
  | "loadingCollections"
  | "documents"
  | "view"
  | "recentBackups"
  | "noBackupsYet"
  | "createFirstBackup"
  | "success"
  | "maintenance"
  | "optimizeDatabase"
  | "optimizing"
  | "createBackupNow"
  | "restoreFromBackup"
  | "clearCache"
  | "clearing"
  // Programs Page
  | "programsManagement"
  | "createAndManagePrograms"
  | "nutritionPrograms"
  | "workoutPrograms"
  | "searchPrograms"
  | "createNewProgram"
  | "createNutritionProgram"
  | "programName"
  | "description"
  | "assignToUsers"
  | "selectUsers"
  | "searchByName"
  | "searchByNameOrEmail"
  | "selected"
  | "weeklySchedule"
  | "addMeal"
  | "addExercise"
  | "mealLibrary"
  | "exerciseLibrary"
  | "calories"
  | "protein"
  | "carbs"
  | "fats"
  | "sets"
  | "reps"
  | "rest"
  | "instructions"
  | "ingredients"
  | "noProgramsFound"
  | "createFirstProgram"
  | "imageUrl"
  | "userSelection"
  | "onlyProUsers"
  | "selectAllUsers"
  | "clearAll"
  | "noteLabel"
  | "onlyProUsersShown"
  | "freeUsersHidden"
  | "adminsHidden"
  | "setMealsForEachDay"
  | "restDay"
  | "noMealsAdded"
  | "copyToAnotherDay"
  | "weekSummary"
  | "activeDays"
  | "restDays"
  | "totalMeals"
  | "uniqueMeals"
  | "fillBasicInfo"
  | "whenComplete"
  | "clickSave"
  | "level"
  | "beginner"
  | "intermediate"
  | "advanced"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "selectDayFrom7Days"
  | "clickAddExercise"
  | "canAddMultipleExercises"
  | "ifRestDayTurnOn"
  | "noPROusers"
  | "noUsersFound"
  | "freeUsersNotShown"
  | "programWillBeSentTo"
  | "PROusers"
  | "setMealsDescription"
  | "targetMuscles"
  | "noExercisesAdded"
  | "addExerciseButton"
  | "copyToDay"
  | "weekSummaryLabel"
  | "activeLabel"
  | "restLabel"
  | "exercisesLabel"
  | "uniqueLabel"
  | "noMealsAdded"
  | "addMeal"
  | "copyMealToOtherDay"
  | "restDayMessage"
  | "timeForRestAndRecovery"
  | "weekSummary"
  | "active"
  | "rest"
  | "meals"
  | "different"
  | "weekUniqueMeals"
  | "types"
  | "mealLibrary"
  | "savedMeals"
  | "saveMealToLibrary"
  | "weekUniqueExercises"
  | "setMealsForEachDay"
  | "setExercisesForEachDay"
  | "mealName"
  | "mealCategory"
  | "macros"
  | "caloriesRequired"
  | "proteinG"
  | "carbsG"
  | "fatsG"
  | "ingredients"
  | "ingredientsOptional"
  | "instructionsOptional"
  | "notesOptional"
  | "mealImage"
  | "mealImageOptional"
  | "selectFromGallery"
  | "orEnterImageLink"
  | "importantNote"
  | "onlyNameCaloriesRequired"
  | "ingredientsInstructionsNotesOptional"
  | "canAddMultipleMealsPerDay"
  | "addAction"
  | "exampleGrilledChicken"
  | "exampleCalories450"
  | "exampleProtein35"
  | "exampleCarbs50"
  | "exampleFats12"
  | "exampleIngredients"
  | "exampleInstructions"
  | "specialNotes"
  | "pleaseEnterMealName"
  | "mealImageGallery"
  | "imagesInStorage"
  | "searchByImageName"
  | "imagesFound"
  | "pageOf"
  | "previousPage"
  | "nextPage"
  | "cancelAction"
  | "saveProgram"
  | "addExerciseTitle"
  | "exerciseLibraryButton"
  | "saveToLibrary"
  | "exerciseName"
  | "exerciseVideos"
  | "selectVideoFromStorage"
  | "notesOptional"
  | "additionalNotesPlaceholder"
  | "addButton"
  | "optional"
  | "addAnotherVideo"
  | "preview"
  | "videosSelected"
  | "selectVideo"
  | "videosInStorage"
  | "noVideosAvailable"
  | "uploadVideosToFirebase"
  | "searchByVideoName"
  | "allGenders"
  | "allLevels"
  | "allBodyParts"
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "core"
  | "videosFound"
  | "selected"
  | "select"
  | "previous"
  | "next"
  | "saveWithCount"
  | "videoDetails"
  | "setsCount"
  | "repsCount"
  | "videoSpecificNotes"
  | "savedSuccessfully"
  | "exerciseLibrary"
  | "savedExercises"
  | "libraryEmpty"
  | "saveYourExercisesForLater"
  | "searchInLibrary"
  | "videos"
  | "close"
  // Placeholders for Create Program dialogs
  | "exampleKetoDiet"
  | "exampleFullBodyWorkout"
  | "enterProgramDescription"
  | "example30mins"
  | "example2000"
  | "example150"
  | "example200"
  | "example60"
  | "exampleChestShouldersTriceps"
  | "exampleImageUrl"
  // Videos Page
  | "firebaseVideos"
  | "checkFirebaseVideos"
  | "refreshVideos"
  | "videoName"
  | "fileSize"
  | "uploadDate"
  | "download"
  | "noVideosFound"
  | "uploadVideosFirst"
  // Logs Page
  | "systemLogs"
  | "monitorSystemActivity"
  | "searchLogs"
  | "filterByType"
  | "exportLogs"
  | "allLogs"
  | "errors"
  | "warnings"
  | "infoLogs"
  | "timestamp"
  | "message"
  | "details"
  | "noLogsFound"
  | "error"
  | "warning"
  | "info"
  // Profile Page
  | "myProfile"
  | "manageAccountInfo"
  | "systemAdministrator"
  | "editProfile"
  | "cancelEdit"
  | "personalInfo"
  | "firstName"
  | "lastName"
  | "fullAccess"
  | "accountInfo"
  | "joinedDate"
  | "lastLogin"
  | "securitySettings"
  | "changePassword"
  | "currentPasswordPlaceholder"
  | "newPasswordPlaceholder"
  | "confirmPasswordPlaceholder"
  | "updatePassword"
  // Settings Page
  | "settingsPage"
  | "customizePreferences"
  | "securityAndPrivacy"
  | "addExtraLayer"
  | "twoFactorAuth"
  | "notificationsSettings"
  | "systemNotifications"
  | "receiveSystemAlerts"
  | "emailNotifs"
  | "getEmailUpdates"
  | "appearance"
  | "darkModeLabel"
  | "darkModeDesc"
  | "languagePreference"
  | "chooseLanguage"
  | "systemPreferences"
  | "autoBackup"
  | "autoBackupDesc"
  | "maintenanceMode"
  | "maintenanceModeDesc"
  // Notifications Page
  | "notificationsPage"
  | "stayUpdated"
  | "markAllRead"
  | "clearAll"
  | "unreadNotifications"
  | "allNotifications"
  | "failedLoginAttempt"
  | "newAdminCreated"
  | "highServerLoad"
  | "markAsRead"
  | "deleteNotification"
  | "noNotifications"
  | "allCaughtUp"

export const languages: Record<Language, string> = {
  en: "English",
  ar: "العربية",
  ku: "کوردی",
  tr: "Türkçe",
}

// Each language can be partial; missing keys will fall back to English.
export const translations: Record<Language, Partial<Record<TranslationKey, string>>> = {
  en: {
    heroTitle: "FitPro",
    heroSubtitle: "Your Personal Fitness Coach",
    transformYourBody: "Transform Your Body, Transform Your Life",
    heroDescription: "Access professional fitness programs, personalized nutrition guidance, and expert coaching to achieve your health goals",
    learnMore: "Learn More",
    activeUsers: "Active Users",
    exercises: "Exercises",
    rating: "Rating",
    featuresTitle: "Why Choose FitPro",
    professionalSolutions: "Professional fitness solutions tailored for your goals",
    videoGuidance: "Video Guidance 🎥",
    videoGuidanceDesc: "Follow professional trainers with detailed video instructions for every exercise",
    personalizedPrograms: "Personalized Programs 🧩",
    personalizedProgramsDesc: "Custom workout plans designed based on your fitness level and goals",
    progressTracking: "Progress Tracking 📈",
    progressTrackingDesc: "Monitor your improvement with detailed statistics and progress charts",
    exerciseLibraryFull: "Complete Exercise Library 📘",
    exerciseLibraryFullDesc: "Access thousands of exercises with proper form demonstrations",
    goalOriented: "Goal-Oriented 🎯",
    goalOrientedDesc: "Set and achieve your fitness objectives with structured guidance",
    achievementBadges: "Achievement Badges 🏆",
    achievementBadgesDesc: "Earn badges and rewards as you reach your fitness milestones",
    priorityCustomerSupport: "Priority customer support 💬",
    exclusiveCommunityAccess: "Exclusive community access 👥",
    startToday: "Start Your Transformation Today",
    first7DaysFree: "Get 7 days free access to all Premium features. No credit card required.",
    allRightsReserved: "All rights reserved",
    patientLogin: "Patient Login",
    tapTheButtonToLogin: "Tap the login button to access your account",
    loggingIn: "Logging in...",
    loginButton: "Login",
    youWillBeLoggedInAutomatically: "You will be logged in automatically",
    login: "Login",
    dashboard: "Dashboard",
    todayExercises: "Today's Exercises",
    todayMeals: "Today's Meals",
    physiotherapist: "Doctor",
    progress: "Progress",
    profile: "Profile",
    requests: "Requests",
    anatomy3D: "🦴 Anatomy 3D Viewer",
    anatomyEngineer: "🔧 Anatomy Lab",
    unirigDemo: "⚡ UniRig Demo",
    "3dModelViewer": "👁️ 3D Model Viewer",
    breakfast: "Breakfast",
    lunch: "Lunch",
    snacks: "Snacks",
    dinner: "Dinner",
    snack: "Snack",
    welcomeBack: "Welcome Back",
    athlete: "Athlete",
    greatWorkoutDay: "Great workout day ahead! Let's crush your fitness goals.",
    muscleGrowthTracking: "Muscle Growth Tracking",
    seeYourProgress: "Monitor your progress over time",
    edit: "Edit",
    accessKey: "Access Key",
    expired: "Expired",
    active: "Active",
    keyExpiredMessage: "Your access key has expired. Please renew your subscription.",
    editProfile: "Edit Profile",
    firstName: "First Name",
    lastName: "Last Name",
    firstNamePlaceholder: "Enter your first name",
    lastNamePlaceholder: "Enter your last name",
    email: "Email",
    phone: "Phone",
    dateOfBirth: "Date of Birth",
    height: "Height",
    weight: "Weight",
    bio: "Bio",
    fitnessGoal: "Fitness Goal",
    profilePhoto: "Profile Photo",
    uploadPhoto: "Upload Photo",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    profileInfo: "Profile Information",
    appTitle: "FitPro",
    logout: "Logout",
    day: "Day",
    month: "Month",
    year: "Year",
    superadminPanel: "Super Admin Panel",
    fullSystemControl: "Full system access and management authority",
    menu: "Menu",
    userManagement: "User Management",
    adminManagement: "Admin Management",
    patientRecords: "Patient Records",
    accessKeys: "Access Keys",
    exerciseManagement: "Exercise Management",
    workoutManagement: "Workout Management",
    fitnessGuides: "Fitness Guides",
    banners: "Banners",
    passwordManagement: "Password Management",
    systemSettings: "System Settings",
    notifications: "Notifications",
    add: "Add",
    update: "Update",
    updating: "Updating...",
    delete: "Delete",
    save: "Save",
    back: "Back",
    confirm: "Confirm",
    superadmin: "Super Admin",
    loading: "Loading",
    onlyAuthorizedSuperadmin: "Only authorized",
  patients: "Patients",
  activities: "Activities",
  trainees: "Trainees",
  analytics: "📊 Analytics",
  reports: "Reports",
  management: "Management",
  helpSupport: "🆘 Help & Support",
  helpDescription: "If you need assistance, please contact our support team at support@fitpro.com. We are here to help you with any issues or questions.",
  helpContactInfo: "For urgent matters, please email support@fitpro.com or call +1 (555) 123-4567.",
  availableWorkouts: "Available Workouts",
  searchWorkoutsPlaceholder: "Search workouts...",
  noWorkoutsFound: "No workouts found matching your search",
  settings: "Settings",
  languageSettings: "Language Settings",
  selectLanguage: "Select your preferred language",
  workouts: "Workouts",
  categories: "Categories",
  start: "Start",
  browseWorkoutsSubtitle: "Browse and start your favorite workouts",
  signInToAccount: "Sign in to your FitPro account",
  owner: "Owner",
  trainer: "Trainer",
  // Auth & Login (EN)
  signIn: "Sign In",
  signUp: "Sign Up",
  emailAddress: "Email Address",
  emailOrUsername: "Email or username",
  password: "Password",
  rememberMe: "Remember me",
  forgotPassword: "Did you forget your account password?",
  loginSuccessful: "Login successful!",
  chooseRoleOrSignIn: "Choose your role or sign in",
  pleaseEnterEmail: "Please enter your email address",
  pleaseEnterPassword: "Please enter your password",
  incorrectCredentials: "Incorrect email or password. Please try again.",
  resetPassword: "Reset Password",
  resetPasswordTitle: "Forgot Your Password?",
  resetPasswordDesc: "No worries! Enter your email address and we'll send you a link to reset your password.",
  enterEmailToReset: "Enter your email address",
  sendResetLink: "Send Reset Link",
  sendingResetLink: "Sending...",
  resetLinkSent: "Reset Link Sent!",
  checkYourEmail: "Check Your Email",
  resetEmailSentMessage: "We've sent a password reset link to your email. Please check your inbox and follow the instructions.",
  help: "Help",
  orContinueAs: "Or continue as",
  admin: "Admin",
  physiotherapistLogin: "Physiotherapist Login",
  trainerLogin: "Trainer Login",
  adminLogin: "Admin Login",
  superAdminLogin: "SuperAdmin Login",
  ownerLogin: "Owner Login",
  signInAsAdmin: "Sign In as Admin",
  signInAsPhysiotherapist: "Sign In as Physiotherapist",
  signInAsTrainer: "Sign In as Trainer",
  signInAsSuperAdmin: "Sign In as SuperAdmin",
  signInAsOwner: "Sign In as Owner",
  dontHaveAccount: "Don't have an account?",
  copyrightNotice: "© 2025 FitPro. All rights reserved.",
  // Dashboard (EN)
  welcomeBackUser: "Welcome Back, User",
  trackFitnessDesc: "Track your fitness journey and achieve your goals",
  totalWorkouts: "Total Workouts",
  currentStreak: "Current Streak",
  overallProgress: "Overall Progress",
  quickActions: "Quick Actions",
  recentActivity: "Recent Activity",
  startWorkout: "Start Workout",
  setGoal: "Set Goal",
  viewAchievements: "View Achievements",
  completed: "Completed",
  upperBodyWorkout: "Upper Body Workout",
  completedOnDate: "Completed on",
  readyForToday: "Welcome back, ready for today's plan?",
  activeStreak: "Active Streak",
  caloriesToday: "Calories Today",
  days: "days",
  kcal: "kcal",
  todaysTimeline: "Today's Timeline",
  todaysSchedule: "Today's Schedule",
  addWorkout: "Add Workout",
  logMeal: "Log Meal",
  title: "Title",
  duration: "Duration",
  meals: "Meals",
  saveWorkout: "Save Workout",
  saveMeal: "Save Meal",
  minutes: "minutes",
  min: "min",
  limitedOffer: "Limited Offer: 20% off Premium",
  upgradeToday: "Upgrade today to unlock custom plans",
  now: "Now",
  todaysWorkout: "Today's Workout: Full Body Strength",
  workoutDetails: "8 exercises • 45 min • Intermediate",
  breakfastItem: "Breakfast",
  breakfastDetails: "Oats + Berries • 420 kcal",
  lunchItem: "Lunch",
  lunchDetails: "Grilled Chicken Salad • 560 kcal",
  snackItem: "Snack",
  snackDetails: "Greek Yogurt • 180 kcal",
  hydratePro: "Hydrate Pro",
  hydrateProDesc: "Smart reminders and intake tracking",
  fitWatch: "Fit Watch",
  fitWatchDesc: "Real-time stats on your wrist",
  gymBeats: "Gym Beats",
  gymBeatsDesc: "Curated playlists for workouts",
  tapToNext: "tap to next",
  fullBodyStrength: "Full Body Strength",
  workoutMinExercises: "8 exercises • 45 min",
  mealPlan: "Meal Plan",
  mealsAndSnacks: "3 meals • 2 snacks",
  physiotherapy: "Physiotherapy",
  mobilitySession: "Mobility session • 20 min",
  // Profile & Fitness Info (EN)
  myProfileHeading: "My Profile",
  manageFitnessProfileDesc: "Manage your fitness profile and goals",
  premiumMember: "Premium Member",
  fitnessInformation: "Fitness Information",
  primaryGoal: "Primary Goal",
  activityLevel: "Activity Level",
  buildMuscle: "Build Muscle",
  weightLoss: "Weight Loss",
  endurance: "Endurance",
  flexibility: "Flexibility",
  sedentary: "Sedentary",
  lightlyActive: "Lightly Active",
  moderatelyActive: "Moderately Active",
  veryActive: "Very Active",
  saveFitnessInfo: "Save Fitness Info",
  // Settings page (EN)
  accountSecurityTitle: "Account Security",
  notificationPreferencesTitle: "Notification Preferences",
  privacySettingsTitle: "Privacy Settings",
  workoutReminders: "Workout Reminders",
  workoutRemindersDesc: "Get reminded to complete workouts",
  progressUpdates: "Progress Updates",
  progressUpdatesDesc: "Notify about your fitness progress",
  // achievementBadges & achievementBadgesDesc already declared earlier in this object; avoid duplicates
  emailNotifications: "Email Notifications",
  emailNotificationsDesc: "Receive weekly fitness summaries",
  updatePassword: "Update Password",
  savePreferences: "Save Preferences",
  savePrivacySettings: "Save Privacy Settings",
  dangerZone: "Danger Zone",
  deleteAccount: "Delete Account",
  profileVisibility: "Profile Visibility",
  profileVisibilityDesc: "Allow other users to see your profile",
  showProgress: "Show Progress",
  showProgressDesc: "Display your fitness stats publicly",
  currentPassword: "Current Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
  enterCurrentPassword: "Enter current password",
  enterNewPassword: "Enter new password",
  confirmNewPassword: "Confirm new password",
  // Membership
  membershipPlans: "Membership Plans",
  monthly: "Monthly",
  yearly: "Yearly",
  savePercent: "Save 17%",
  freePlan: "Free",
  premiumPlan: "Premium",
  proPlan: "Pro",
  idealForBeginners: "Ideal for beginners",
  mostPopularChoice: "Most popular choice",
  forProfessionalAthletes: "For professional athletes",
  ultimateFitnessTransformation: "Ultimate fitness transformation",
  oneMonth: "1 Month",
  threeMonths: "3 Months",
  sixMonths: "6 Months",
  oneYear: "1 Year",
  mostPopularBadge: "Most Popular",
  limitations: "Limitations",
  faqTitle: "Frequently Asked Questions",
  getStarted: "Get Started",
  subscribeNow: "Subscribe Now",
  frequentlyAskedQuestions: "Frequently Asked Questions",
  faqChangePlanQ: "Can I change my plan anytime?",
  faqChangePlanA: "Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the next billing cycle.",
  faqFreeTrialQ: "Is there a free trial?",
  faqFreeTrialA: "Yes! New members get 7 days free access to all Premium features. No credit card required.",
  faqPaymentMethodsQ: "What payment methods do you accept?",
  faqPaymentMethodsA: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.",
  faqDataSecureQ: "Is my data secure?",
  faqDataSecureA: "Your data is protected with 256-bit SSL encryption and backed up daily for security.",
  // Payment Page
  payment: "Payment",
  paymentInformation: "Payment Information",
  cardInformation: "Card Information",
  cardholderName: "Cardholder Name",
  cardNumber: "Card Number",
  expiration: "Expiration",
  cvv: "CVV",
  billingAddress: "Billing Address",
  address: "Address",
  city: "City",
  postalCode: "Postal Code",
  processing: "Processing...",
  pay: "Pay",
  securePayment: "Secure Payment",
  securePaymentSSL: "Secure payment - Protected with SSL encryption",
  orderSummary: "Order Summary",
  oneTimePayment: "One-time payment",
  subtotal: "Subtotal",
  platformFee: "Platform Fee",
  tax: "Tax",
  total: "Total",
  includedInPlan: "Included in this Plan:",
  completeExerciseLibrary: "Complete exercise library",
  detailedProgressTracking: "Detailed progress tracking",
  prioritySupport: "Priority support",
  securePaymentInfo: "Your payment information is protected with 256-bit SSL encryption. Card information is not stored.",
  cardInfoNotStored: "Card information is not stored",
  // Payment Placeholders
  cardholderNamePlaceholder: "First Last Name",
  streetNeighborhoodPlaceholder: "Street, Neighborhood",
  cityPlaceholder: "Istanbul",
  postalCodePlaceholder: "34000",
  // Membership Page
  chooseYourPlan: "Choose Your Plan",
  selectPerfectPlan: "Select the perfect plan for your fitness journey",
  // Premium Feature Locked
  premiumFeatureLocked: "Premium Feature Locked",
  featureRequiresSubscription: "This feature requires an active subscription. Please renew your subscription to continue accessing premium content.",
  renewSubscription: "Renewals",
  backToDashboard: "Back to Dashboard",
  redirectingToDashboard: "Redirecting to dashboard in 3 seconds...",
  // Signup
  backToLogin: "Back to Login",
  createAccountTitle: "Create Account",
  signupSubtitle: "Start your fitness journey with FitPro",
  mustBeAtLeast8Chars: "Must be at least 8 characters",
  termsAgreement: "I agree to the",
  termsOfService: "Terms of Service",
  privacyPolicy: "Privacy Policy",
  creatingAccount: "Creating Account...",
  passwordsDoNotMatch: "Passwords do not match",
  pleaseFillAllFields: "Please fill in all fields",
  pleaseAgreeTerms: "Please agree to the terms and conditions",
  registrationFailed: "Registration failed. Please try again.",
  emailAlreadyInUse: "This email is already registered",
  passwordTooWeak: "Password should be at least 6 characters",
  invalidEmail: "Invalid email address",
  alreadyHaveAccount: "Already have an account?",
  signInLink: "Sign in",
  // Subscription Warning
  subscriptionExpired: "Subscription Expired",
  actionRequired: "Action Required",
  subscriptionExpiredMessage: "Your monthly subscription has ended. Renew now to continue accessing premium features including personalized meal plans and workout programs.",
  workoutPrograms: "Workout Programs 💪",
  mealPlans: "Meal Plans 🍽️",
  expertSupport: "Expert Support 👨‍⚕️",
  renewSubscriptionNow: "Visit Office to Renew Subscription",
  subscriptionExpiringSoon: "Subscription Expiring Soon",
  subscriptionExpiresInDays: "Your subscription expires in",
  renewNow: "Renew Now",
  // Extended Profile
  professionalInformation: "Professional Information",
  yearsOfExperience: "Years of Experience",
  certification: "Certification",
  specialization: "Specialization",
  saveProfessionalInfo: "Save Professional Info",
  security: "Security",
  changePassword: "Change Password",
  administratorPrivileges: "Administrator Privileges",
  adminProfile: "Admin Profile",
  editAdminProfile: "Edit Admin Profile",
  licensedPhysiotherapist: "Licensed Physiotherapist",
  certifiedFitnessTrainer: "Certified Fitness Trainer",
  department: "Department",
  licenseNumber: "License Number",
  // Patient panel (EN)
  patientPanelTitle: "Patient Panel",
  welcomeGreeting: "Welcome",
  registrationDate: "Registration Date",
  status: "Status",
  access: "Access",
  fullPermission: "Full Permission",
  patientPanelDevelopment: "Patient Panel Under Development",
  patientPanelDescription: "Soon you will be able to view prescriptions, assigned exercises, recovery progress and communication tools with your physiotherapist.",
  comingSoon: "Coming Soon",
  authorizedAccessOnly: "Authorized Access Only",
  onlyRegisteredPhysiotherapists: "Only registered physiotherapists can access this portal",
  accessPatientManagement: "Access your patient management",
  physiotherapistPortalFooter: "© 2024 FitPro Physiotherapist Portal",
  // Workout Center & Schedule (English)
  workoutCenter: "Workout Center",
  workoutCenterSubtitle: "Plan, start, and review your training sessions",
  buildYourStrength: "Build Your Strength",
  buildYourStrengthDesc: "Track your progress and achieve your fitness goals",
  todaysWorkoutWednesday: "Today's Workout - Wednesday",
  schedule: "Schedule",
  today: "TODAY",
  week: "WEEK",
  monthView: "MONTH",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
  chest: "Chest",
  backMuscle: "Back",
  legs: "Legs",
  shoulders: "Shoulders",
  arms: "Arms",
  core: "Core",
  restAndRecovery: "Rest & Recovery",
  exercisesCount: "exercises",
  rest: "Rest",
  workout: "Workout",
  exerciseFirst: "First Exercise",
  exerciseSecond: "Second Exercise",
  exerciseThird: "Third Exercise",
  exerciseFourth: "Fourth Exercise",
  exerciseFifth: "Fifth Exercise",
  exerciseSixth: "Sixth Exercise",
  exerciseSeventh: "Seventh Exercise",
  exerciseEighth: "Eighth Exercise",
  exerciseNinth: "Ninth Exercise",
  exerciseTenth: "Tenth Exercise",
  sets: "sets",
  reps: "reps",
  calories: "Calories",
  carbs: "Carbs",
  fat: "Fat",
  ingredients: "Ingredients",
  recipe: "Recipe",
  recipeInstructions: "Recipe Instructions",
  mealType: "Meal Type",
  mealImage: "Meal Image",
  mealPhoto: "Meal photo",
  todaysMeals: "Today's Meals",
  importantNotes: "Important Notes",
  // Meals & Nutrition (English)
  mealsAndNutrition: "Meals & Nutrition",
  trackDailyMealsDesc: "Track daily meals and macro goals",
  fuelYourBodyRight: "Fuel Your Body Right",
  fuelYourBodyRightDesc: "Balance your nutrition and reach your fitness goals",
  protein: "PROTEIN",
  caloriesTodayLabel: "CALORIES TODAY",
  dailyGoal: "DAILY GOAL",
  mealsLogged: "MEALS LOGGED",
  // Physio Panel (English)
  physiotherapyTitle: "Physiotherapy",
  physioSubtitle: "Request a queue slot and track your injury recovery",
  recoverAndHeal: "Recover & Heal",
  recoverAndHealDesc: "Expert physiotherapy support for your recovery journey",
  completedLabel: "COMPLETED",
  requestsLabel: "Requests",
  totalRequests: "TOTAL REQUESTS",
  recoveryRate: "RECOVERY RATE",
  pendingLabel: "PENDING",
  sendRequest: "Send Request",
  selectPhysiotherapist: "Select a physiotherapist",
  injuryType: "INJURY TYPE",
  injuryTypePlaceholder: "e.g. Knee ligament strain",
  painPercentage: "PAIN PERCENTAGE",
  notesOptional: "NOTES (OPTIONAL)",
  notesPlaceholder: "...Extra context",
  yourRequests: "Your Requests",
  noRequestsYet: "No requests yet.",
  // Profile Section (English)
  subscriptionAndAccessKey: "Subscription & Access Key",
  yourAccessKey: "YOUR ACCESS KEY",
  personalIdentifier: "Personal Identifier",
  statusLabel: "STATUS",
  remainingLabel: "REMAINING",
  joinedLabel: "Joined",
  expiresLabel: "Expires",
  accessKeyNote: "Note: Your access key is unique to your account. Keep it secure and use it when contacting support or accessing premium features.",
  account: "Account",
  manageLabel: "Manage",
  stats: "Stats",
  heightLabel: "Height",
  weightLabel: "Weight",
  shortcuts: "Shortcuts",
  physioLabel: "Physio",
  mealsLabel: "Meals",
  workoutLabel: "Workout",
  appearance: "Appearance",
  light: "Light",
  dark: "Dark",
  system: "System",
  systemFollowsOS: "System follows your OS theme.",
  pushNotifications: "Push Notifications",
  applyLanguage: "Apply Language",
  accountActions: "Account Actions",
  accountActionsDesc: "Logging out will clear your session and return you to the login screen.",
  logoutButton: "Logout",
  // Manage Profile Dialog (English)
  manageProfile: "Manage Profile",
  changeAvatar: "Change Avatar",
  avatarSizeNote: "PNG/JPG up to 2MB.",
  personal: "Personal",
  fullName: "Full Name",
  phoneLabel: "Phone",
  joinDate: "Join Date",
  goal: "Goal",
  experience: "Experience",
  physical: "Physical",
  current: "Current",
  new: "New",
  changePasswordLabel: "Change Password",
  currentPasswordLabel: "Current",
  newPasswordLabel: "New",
  confirmPasswordLabel: "Confirm",
  saved: "Saved",
  // Dashboard Stats (English)
  totalTime: "TOTAL TIME",
  caloriesBurned: "CALORIES BURNED",
  // Workout Exercise Names (English)
  barbellBenchPress: "Barbell Bench Press",
  inclineDumbbellPress: "Incline Dumbbell Press",
  cableFlyes: "Cable Flyes",
  focusControlledMovement: "Focus on controlled movement",
  squeezeAtPeak: "Squeeze at the peak",
  keepBackStraightEngageCore: "Keep back straight, engage core",
  goDeepKeepChestUp: "Go deep, keep chest up",
  lightStretchingYogaWalking: "Light stretching, yoga, or walking",
  // Notifications Dialog (English)
  notificationsTitle: "Notifications",
  milestoneReached: "Milestone Reached",
  milestoneReachedDesc: "You've completed 20 workouts! Keep up the great work!",
  workoutReminder: "Workout Reminder",
  workoutReminderDesc: "Don't forget to complete your evening workout",
  progressUpdate: "Progress Update",
  progressUpdateDesc: "You've lost 2kg this month. Great progress!",
  close: "Close",
  // Placeholders for Create Program dialogs (English)
  exampleKetoDiet: "Example: Keto Diet Plan",
  exampleFullBodyWorkout: "Example: Full Body Workout",
  enterProgramDescription: "Enter program description...",
  example30mins: "Example: 30 mins",
  example2000: "Example: 2000",
  example150: "Example: 150",
  example200: "Example: 200",
  example60: "Example: 60",
  exampleChestShouldersTriceps: "Example: Chest, Shoulders, Triceps",
  exampleImageUrl: "https://example.com/image.jpg",
  // Superadmin Dashboard (English)
  superadminDashboard: "Superadmin Dashboard",
  systemManagementControl: "System Management & Control",
  users: "Users",
  keys: "Keys",
  activeNow: "Active",
  growth: "Growth",
  totalActive: "Total Active",
  accessKeysLabel: "Access Keys",
  onlineNow: "Online Now",
  thisMonth: "This Month",
  quickActions: "Quick Actions",
  manageUsers: "Manage Users",
  generateKeys: "Generate Keys",
  viewReports: "View Reports",
  systemStatus: "System Status",
  database: "Database",
  apiServer: "API Server",
  storage: "Storage",
  healthy: "Healthy",
  running: "Running",
  percentUsed: "Used",
  trainers: "Trainers",
  totalTrainers: "Total Trainers",
  // Users Management (English)
  userManagementTitle: "User Management",
  manageYourUsers: "Manage and monitor all users",
  statistics: "Statistics",
  allUsers: "All Users",
  searchUsers: "Search users...",
  addNewUser: "Add New User",
  viewProfile: "View Profile",
  editUser: "Edit User",
  deleteUser: "Delete User",
  active: "Active",
  inactive: "Inactive",
  membership: "Membership",
  accountSettings: "Account Settings",
  personalInformation: "Personal Information",
  fullNameLabel: "Full Name",
  emailAddressLabel: "Email Address",
  phoneNumberLabel: "Phone Number",
  locationLabel: "Location",
  roleLabel: "Role",
  passwordLabel: "Password",
  trainersAlwaysActive: "Trainers and Superadmins are always active",
  saveChanges: "Save Changes",
  cancelAction: "Cancel",
  deleteUserTitle: "Delete User",
  areYouSure: "Are you sure?",
  actionCannotBeUndone: "This action cannot be undone",
  confirmDelete: "Confirm Delete",
  proRequests: "Pro Requests",
  proRequestsDescription: "Review and approve Pro upgrade requests",
  upgradeRequests: "Upgrade Requests",
  noPendingRequests: "No pending requests",
  requestFrom: "Request from",
  requestDetails: "Request Details",
  approve: "Approve",
  reject: "Reject",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  // Access Keys Page (English)
  accessKeysPage: "Access Keys",
  generateAndManageKeys: "Generate and manage access keys",
  generateNewKey: "Generate New Key",
  generating: "Generating...",
  totalKeys: "Total Keys",
  expired: "Expired",
  quickKeyGenerator: "Quick Key Generator",
  generateKeysInstantly: "Generate access keys for new members instantly",
  trialOneUse: "Trial (1 use)",
  standardFiveUses: "Standard (5 uses)",
  premiumTenUses: "Premium (10 uses)",
  allAccessKeys: "All Access Keys",
  keyColumn: "Key",
  typeColumn: "Type",
  usesColumn: "Uses",
  statusColumn: "Status",
  expiresColumn: "Expires",
  actionsColumn: "Actions",
  trial: "Trial",
  standard: "Standard",
  premium: "Premium",
  used: "Used",
  copyKey: "Copy Key",
  // Analytics Page (English)
  analyticsDashboard: "Analytics Dashboard",
  trackPerformance: "Track performance and insights",
  loadingAnalytics: "Loading analytics...",
  keyMetrics: "Key Metrics",
  totalUsers: "Total Users",
  activeUsers24h: "Active Users (24h)",
  proMembers: "Pro Members",
  totalWorkouts: "Total Workouts",
  userGrowth: "User Growth",
  userDistribution: "User Distribution",
  recentActivity: "Recent Activity",
  newUserRegistered: "New user registered",
  // Database Page (English)
  databaseManagement: "Database Management",
  monitorDatabase: "Monitor and manage database operations",
  refresh: "Refresh",
  backup: "Backup",
  creatingBackup: "Creating Backup...",
  healthStatus: "Health Status",
  databaseStatus: "Database Status",
  allSystemsOperational: "All systems operational",
  lastChecked: "Last checked",
  justNow: "Just now",
  uptime: "Uptime",
  storageUsed: "Storage Used",
  totalRecords: "Total Records",
  activeConnections: "Active Users",
  collectionsColumn: "Collections",
  collectionsOverview: "Collections Overview",
  loadingCollections: "Loading collections...",
  documents: "documents",
  view: "View",
  recentBackups: "Recent Backups",
  noBackupsYet: "No backups yet",
  createFirstBackup: "Create your first backup above",
  success: "Success",
  maintenance: "Maintenance",
  optimizeDatabase: "Optimize Database",
  optimizing: "Optimizing...",
  createBackupNow: "Create Backup Now",
  restoreFromBackup: "Restore from Backup",
  clearCache: "Clear Cache",
  clearing: "Clearing...",
  // Programs Page (English)
  programsManagement: "Programs Management",
  createAndManagePrograms: "Create and manage workout & nutrition programs",
  nutritionPrograms: "Nutrition Programs",
  workoutPrograms: "Workout Programs",
  searchPrograms: "Search programs...",
  createNewProgram: "Create New Program",
  createNutritionProgram: "Create Nutrition Program",
  programName: "Program Name",
  description: "Description",
  assignToUsers: "Assign to Users",
  selectUsers: "Select Users",
  searchByName: "Search by name...",
  searchByNameOrEmail: "Search by name or email...",
  selected: "selected",
  weeklySchedule: "Weekly Schedule",
  addMeal: "Add Meal",
  addExercise: "Add Exercise",
  mealLibrary: "Meal Library",
  exerciseLibrary: "Exercise Library",
  calories: "Calories",
  protein: "Protein",
  carbs: "Carbs",
  fats: "Fats",
  sets: "Sets",
  reps: "Reps",
  rest: "Rest",
  instructions: "Instructions",
  ingredients: "Ingredients",
  noProgramsFound: "No programs found",
  createFirstProgram: "Create your first program above",
  imageUrl: "Image URL",
  userSelection: "User Selection",
  onlyProUsers: "Only PRO users (excluding free and admins)",
  selectAllUsers: "Select All",
  clearAll: "Clear All",
  noteLabel: "Note:",
  onlyProUsersShown: "Only PRO users are shown",
  freeUsersHidden: "Free users are hidden",
  adminsHidden: "Admins, Superadmins, Physios, Trainers are hidden",
  setMealsForEachDay: "Set meals for each day",
  restDay: "Rest day?",
  noMealsAdded: "No meals added",
  copyToAnotherDay: "Copy to another day",
  weekSummary: "Week summary:",
  activeDays: "Active",
  restDays: "Rest",
  totalMeals: "Meals",
  uniqueMeals: "Unique",
  fillBasicInfo: "Fill in basic information (name, description, duration...)",
  whenComplete: "When complete, click Save",
  clickSave: "Click Save",
  level: "Level",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
  selectDayFrom7Days: "Select a day from the 7 days (Monday to Sunday)",
  clickAddExercise: "Click 'Add Exercise' to add exercises",
  canAddMultipleExercises: "You can add multiple exercises per day",
  ifRestDayTurnOn: "If it's a rest day, turn on 'Rest Day'",
  noPROusers: "No regular users (user) with PRO",
  noUsersFound: "No users found",
  freeUsersNotShown: "Free users and admin/physio are not shown",
  programWillBeSentTo: "This program will be sent to",
  PROusers: "PRO users",
  setMealsDescription: "Set meals for each day",
  targetMuscles: "Target Muscles",
  noExercisesAdded: "No exercises added",
  addExerciseButton: "Add Exercise",
  copyToDay: "Copy to another day",
  weekSummaryLabel: "Week summary:",
  activeLabel: "Active",
  restLabel: "Rest",
  exercisesLabel: "Exercises",
  uniqueLabel: "Unique",
  noMealsAdded: "No meals added",
  addMeal: "Add Meal",
  copyMealToOtherDay: "Copy to Another Day",
  restDayMessage: "It's a rest day 😴",
  timeForRestAndRecovery: "Time for rest and recovery",
  weekSummary: "Week Summary:",
  active: "Active",
  rest: "Rest",
  meals: "Meals",
  different: "Different",
  weekUniqueMeals: "Week's Unique Meals",
  types: "types",
  mealLibrary: "Meal Library",
  savedMeals: "Saved Meals",
  saveMealToLibrary: "Save to Library",
  weekUniqueExercises: "Week's Unique Exercises",
  setMealsForEachDay: "Set meals for each day",
  setExercisesForEachDay: "Set exercises for each day",
  mealName: "Meal Name",
  mealCategory: "Meal Category",
  macros: "Macros",
  caloriesRequired: "Calories *",
  proteinG: "Protein (g)",
  carbsG: "Carbs (g)",
  fatsG: "Fats (g)",
  ingredients: "Ingredients",
  ingredientsOptional: "Ingredients (Optional)",
  instructionsOptional: "Instructions (Optional)",
  notesOptional: "Notes (Optional)",
  mealImage: "Meal Image",
  mealImageOptional: "Meal Image (Optional)",
  selectFromGallery: "Select from Gallery",
  orEnterImageLink: "Or enter image link...",
  importantNote: "Important Note:",
  onlyNameCaloriesRequired: "Only name and calories are required",
  ingredientsInstructionsNotesOptional: "Ingredients, instructions and notes are optional",
  canAddMultipleMealsPerDay: "You can add multiple meals for each day",
  addAction: "Add",
  exampleGrilledChicken: "Example: Grilled Chicken & Rice",
  exampleCalories450: "Example: 450",
  exampleProtein35: "Example: 35",
  exampleCarbs50: "Example: 50",
  exampleFats12: "Example: 12",
  exampleIngredients: "Example:\n- Chicken breast 150g\n- Rice 200g\n- Vegetables 100g\n- Olive oil 1 tsp",
  exampleInstructions: "Example:\n1. Grill chicken until fully cooked\n2. Cook rice separately\n3. Mix all ingredients in a bowl...",
  specialNotes: "Special notes...",
  pleaseEnterMealName: "Please enter meal name",
  mealImageGallery: "Meal Image Gallery",
  imagesInStorage: "images in storage",
  searchByImageName: "Search by image name...",
  imagesFound: "images found",
  pageOf: "Page {current} of {total}",
  previousPage: "Previous",
  nextPage: "Next",
  cancelAction: "Cancel",
  saveProgram: "Save",
  addExerciseTitle: "Add Exercise",
  exerciseLibraryButton: "Exercise Library",
  saveToLibrary: "Save to Library",
  exerciseName: "Exercise Name",
  exerciseVideos: "Exercise Videos",
  selectVideoFromStorage: "Select Video from Storage",
  notesOptional: "Notes (Optional)",
  additionalNotesPlaceholder: "Additional notes for the exercise...",
  addButton: "Add",
  optional: "Optional",
  addAnotherVideo: "Add Another Video",
  preview: "Preview:",
  videosSelected: "videos selected",
  selectVideo: "Select Video",
  videosInStorage: "videos in storage",
  noVideosAvailable: "No Videos Available",
  uploadVideosToFirebase: "Upload videos to Firebase Storage",
  searchByVideoName: "Search by video name...",
  allGenders: "All Genders",
  allLevels: "All Levels",
  allBodyParts: "All Body Parts",
  chest: "Chest",
  back: "Back",
  legs: "Legs",
  shoulders: "Shoulders",
  arms: "Arms",
  core: "Core",
  videosFound: "videos found",
  selected: "Selected",
  select: "Select",
  previous: "Previous",
  next: "Next",
  saveWithCount: "Save",
  videoDetails: "Video Details",
  setsCount: "Sets Count",
  repsCount: "Reps",
  videoSpecificNotes: "Specific notes for this video...",
  savedSuccessfully: "Saved Successfully",
  exerciseLibrary: "Exercise Library",
  savedExercises: "saved exercises",
  libraryEmpty: "Library is Empty",
  saveYourExercisesForLater: "Save your exercises for later",
  searchInLibrary: "Search in library...",
  videos: "videos",
  close: "Close",
  // Videos Page (English)
  firebaseVideos: "Firebase Storage Videos",
  checkFirebaseVideos: "Check Firebase Storage videos (exercises/ & videos/)",
  refreshVideos: "Refresh",
  videoName: "Video Name",
  fileSize: "File Size",
  uploadDate: "Upload Date",
  download: "Download",
  noVideosFound: "No videos found",
  uploadVideosFirst: "Upload videos to Firebase Storage first",
  // Logs Page (English)
  systemLogs: "System Logs",
  monitorSystemActivity: "Monitor system activity and events",
  searchLogs: "Search logs...",
  filterByType: "Filter by Type",
  exportLogs: "Export Logs",
  allLogs: "All Logs",
  errors: "Errors",
  warnings: "Warnings",
  infoLogs: "Info",
  timestamp: "Timestamp",
  message: "Message",
  details: "Details",
  noLogsFound: "No logs found",
  error: "Error",
  warning: "Warning",
  info: "Info",
  // Profile Page (English)
  myProfile: "My Profile",
  manageAccountInfo: "Manage your account information",
  systemAdministrator: "System Administrator",
  editProfile: "Edit Profile",
  cancelEdit: "Cancel",
  personalInfo: "Personal Information",
  firstName: "First Name",
  lastName: "Last Name",
  fullAccess: "Full Access",
  accountInfo: "Account Information",
  joinedDate: "Joined Date",
  lastLogin: "Last Login",
  securitySettings: "Security Settings",
  changePassword: "Change Password",
  currentPasswordPlaceholder: "Enter current password",
  newPasswordPlaceholder: "Enter new password",
  confirmPasswordPlaceholder: "Confirm new password",
  updatePassword: "Update Password",
  // Settings Page (English)
  settingsPage: "Settings",
  customizePreferences: "Customize your preferences and security",
  securityAndPrivacy: "Security & Privacy",
  addExtraLayer: "Add an extra layer of security",
  twoFactorAuth: "Two-Factor Authentication",
  notificationsSettings: "Notifications",
  systemNotifications: "System Notifications",
  receiveSystemAlerts: "Receive system alerts and updates",
  emailNotifs: "Email Notifications",
  getEmailUpdates: "Get important updates via email",
  appearance: "Appearance",
  darkModeLabel: "Dark Mode",
  darkModeDesc: "Use dark theme for better visibility",
  languagePreference: "Language Preference",
  chooseLanguage: "Choose your preferred language",
  systemPreferences: "System Preferences",
  autoBackup: "Automatic Backup",
  autoBackupDesc: "Backup database automatically every day",
  maintenanceMode: "Maintenance Mode",
  maintenanceModeDesc: "Enable maintenance mode for system updates",
  // Notifications Page (English)
  notificationsPage: "Notifications",
  stayUpdated: "Stay updated with system alerts",
  markAllRead: "Mark All Read",
  clearAll: "Clear All",
  unreadNotifications: "Unread",
  allNotifications: "All",
  failedLoginAttempt: "Failed Login Attempt",
  newAdminCreated: "New Admin Created",
  highServerLoad: "High Server Load",
  markAsRead: "Mark as Read",
  deleteNotification: "Delete",
  noNotifications: "No notifications",
  allCaughtUp: "You're all caught up!",
  },
  // Minimal Arabic placeholders (update with full translations later)
  ar: {
    heroTitle: "فيت برو",
    heroSubtitle: "مدرب اللياقة الشخصي",
    login: "تسجيل الدخول",
    dashboard: "لوحة التحكم",
    physiotherapist: "طبيب",
    progress: "التقدم",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    accessKeys: "مفاتيح الوصول",
    notifications: "الإشعارات",
    systemSettings: "الإعدادات",
    superadminPanel: "لوحة الإدارة العليا",
  loading: "جارٍ التحميل",
  updating: "جارٍ التحديث...",
    patients: "المرضى"
    ,activities: "الأنشطة"
    ,trainees: "المتدربون"
    ,analytics: "التحليلات 📊"
    ,reports: "التقارير"
    ,management: "الإدارة"
    ,helpSupport: "المساعدة والدعم 🆘"
    ,helpDescription: "إذا كنت بحاجة إلى مساعدة، يرجى التواصل مع فريق الدعم لدينا على support@fitpro.com. نحن هنا لمساعدتك في أي مشاكل أو أسئلة."
    ,helpContactInfo: "للأمور العاجلة، يرجى إرسال بريد إلكتروني إلى support@fitpro.com أو الاتصال على +1 (555) 123-4567."
    ,availableWorkouts: "التمارين المتاحة"
    ,searchWorkoutsPlaceholder: "ابحث عن التمارين..."
    ,noWorkoutsFound: "لا توجد تمارين مطابقة للبحث"
    ,settings: "الإعدادات"
    ,languageSettings: "إعدادات اللغة"
    ,selectLanguage: "اختر لغتك المفضلة"
    ,workouts: "التمارين"
    ,categories: "الفئات"
    ,start: "ابدأ"
  ,browseWorkoutsSubtitle: "تصفح وابدأ تمارينك المفضلة"
  ,signInToAccount: "سجّل الدخول إلى حسابك في فيت برو"
  ,owner: "مالك"
  ,trainer: "مدرب"
  ,requests: "الطلبات"
  ,anatomy3D: "🦴 عارض التشريح ثلاثي الأبعاد"
  ,anatomyEngineer: "🔧 مختبر التشريح"
  ,unirigDemo: "⚡ عرض UniRig"
  ,"3dModelViewer": "👁️ عارض النماذج 3D"
  ,breakfast: "فطور"
  ,lunch: "غداء"
  ,snacks: "وجبات خفيفة"
  ,dinner: "عشاء"
  ,snack: "وجبة خفيفة"
  // Auth & Login (AR placeholders)
  ,signIn: "تسجيل الدخول"
  ,signUp: "إنشاء حساب"
  ,firstName: "الاسم الأول"
  ,lastName: "الاسم الأخير"
  ,firstNamePlaceholder: "أدخل اسمك الأول"
  ,lastNamePlaceholder: "أدخل اسمك الأخير"
  ,emailAddress: "البريد الإلكتروني"
  ,emailOrUsername: "البريد الإلكتروني أو اسم المستخدم"
  ,password: "كلمة المرور"
  ,rememberMe: "تذكرني"
  ,forgotPassword: "هل نسيت كلمة مرور حسابك؟"
  ,loginSuccessful: "تم تسجيل الدخول بنجاح!"
  ,chooseRoleOrSignIn: "اختر دورك أو سجل الدخول"
  ,pleaseEnterEmail: "الرجاء إدخال عنوان بريدك الإلكتروني"
  ,pleaseEnterPassword: "الرجاء إدخال كلمة المرور"
  ,incorrectCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى."
  ,resetPassword: "إعادة تعيين كلمة المرور"
  ,resetPasswordTitle: "هل نسيت كلمة المرور؟"
  ,resetPasswordDesc: "لا تقلق! أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور."
  ,enterEmailToReset: "أدخل عنوان بريدك الإلكتروني"
  ,sendResetLink: "إرسال رابط إعادة التعيين"
  ,sendingResetLink: "جارٍ الإرسال..."
  ,resetLinkSent: "تم إرسال رابط إعادة التعيين!"
  ,checkYourEmail: "تحقق من بريدك الإلكتروني"
  ,resetEmailSentMessage: "لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد واتباع التعليمات."
  ,help: "مساعدة"
  ,orContinueAs: "أو المتابعة كـ"
  ,admin: "مسؤول"
  ,physiotherapistLogin: "تسجيل دخول أخصائي العلاج الطبيعي"
  ,trainerLogin: "تسجيل دخول المدرب"
  ,adminLogin: "تسجيل دخول المسؤول"
  ,superAdminLogin: "تسجيل دخول السوبر أدمن"
  ,ownerLogin: "تسجيل دخول المالك"
  ,signInAsAdmin: "تسجيل الدخول كمسؤول"
  ,signInAsPhysiotherapist: "تسجيل الدخول كأخصائي علاج طبيعي"
  ,signInAsTrainer: "تسجيل الدخول كمدرب"
  ,signInAsSuperAdmin: "تسجيل الدخول كسوبر أدمن"
  ,signInAsOwner: "تسجيل الدخول كمالك"
  ,dontHaveAccount: "ليس لديك حساب؟"
  ,copyrightNotice: "© 2025 فيت برو. جميع الحقوق محفوظة."
  // Feature Descriptions (Arabic)
  ,featuresTitle: "لماذا فيت برو"
  ,professionalSolutions: "حلول لياقة احترافية مصممة خصيصاً لأهدافك"
  ,videoGuidance: "إرشاد بالفيديو 🎥"
  ,videoGuidanceDesc: "تابع المدربين المحترفين مع تعليمات فيديو مفصلة لكل تمرين"
  ,personalizedPrograms: "برامج شخصية 🧩"
  ,personalizedProgramsDesc: "خطط تمارين مخصصة مصممة بناءً على مستوى لياقتك وأهدافك"
  ,progressTracking: "تتبع التقدم 📈"
  ,progressTrackingDesc: "راقب تحسنك مع إحصائيات مفصلة ومخططات التقدم"
  ,exerciseLibraryFull: "مكتبة تمارين كاملة 📘"
  ,exerciseLibraryFullDesc: "الوصول إلى آلاف التمارين مع عروض توضيحية للشكل الصحيح"
  ,goalOriented: "موجه نحو الهدف 🎯"
  ,goalOrientedDesc: "حدد وحقق أهدافك الرياضية مع إرشادات منظمة"
  ,achievementBadges: "شارات الإنجاز 🏆"
  ,achievementBadgesDesc: "احصل على شارات ومكافآت عند بلوغ معالم اللياقة الخاصة بك"
  ,priorityCustomerSupport: "دعم العملاء ذو الأولوية 💬"
  ,exclusiveCommunityAccess: "الوصول الحصري للمجتمع 👥"
  // Dashboard (AR placeholders)
  ,welcomeBackUser: "مرحباً بعودتك"
  ,trackFitnessDesc: "تتبع رحلتك الرياضية وحقق أهدافك"
  ,totalWorkouts: "إجمالي التمارين"
  ,currentStreak: "السلسلة الحالية"
  ,overallProgress: "التقدم العام"
  ,quickActions: "إجراءات سريعة"
  ,recentActivity: "النشاط الأخير"
  ,startWorkout: "ابدأ التمرين"
  ,setGoal: "حدد هدفًا"
  ,viewAchievements: "عرض الإنجازات"
  ,completed: "مكتمل"
  ,upperBodyWorkout: "تمرين الجزء العلوي"
  ,completedOnDate: "اكتمل في"
  ,readyForToday: "مرحباً بعودتك، هل أنت مستعد لخطة اليوم؟"
  ,activeStreak: "سلسلة النشاط"
  ,caloriesToday: "سعرات اليوم"
  ,days: "أيام"
  ,kcal: "سعرة"
  ,todaysTimeline: "جدول اليوم"
  ,todaysSchedule: "برنامج اليوم"
  ,addWorkout: "إضافة تمرين"
  ,logMeal: "تسجيل وجبة"
  ,title: "العنوان"
  ,duration: "المدة"
  ,meals: "الوجبات"
  ,saveWorkout: "حفظ التمرين"
  ,saveMeal: "حفظ الوجبة"
  ,minutes: "دقائق"
  ,min: "د"
  ,limitedOffer: "عرض محدود: خصم 20٪ على البريميوم"
  ,upgradeToday: "قم بالترقية اليوم لفتح الخطط المخصصة"
  ,now: "الآن"
  ,todaysWorkout: "تمرين اليوم: القوة للجسم بالكامل"
  ,workoutDetails: "8 تمارين • 45 دقيقة • متوسط"
  ,breakfastItem: "الإفطار"
  ,breakfastDetails: "الشوفان + التوت • 420 سعرة"
  ,lunchItem: "الغداء"
  ,lunchDetails: "سلطة الدجاج المشوي • 560 سعرة"
  ,snackItem: "وجبة خفيفة"
  ,snackDetails: "الزبادي اليوناني • 180 سعرة"
  ,hydratePro: "هيدرات برو"
  ,hydrateProDesc: "تذكيرات ذكية وتتبع الاستهلاك"
  ,fitWatch: "فيت ووتش"
  ,fitWatchDesc: "إحصائيات في الوقت الفعلي على معصمك"
  ,gymBeats: "جيم بيتس"
  ,gymBeatsDesc: "قوائم تشغيل منسقة للتمارين"
  ,tapToNext: "اضغط للتالي"
  ,fullBodyStrength: "قوة الجسم بالكامل"
  ,workoutMinExercises: "8 تمارين • 45 دقيقة"
  ,mealPlan: "خطة الوجبات"
  ,mealsAndSnacks: "3 وجبات • 2 وجبات خفيفة"
  ,physiotherapy: "العلاج الطبيعي"
  ,mobilitySession: "جلسة حركية • 20 دقيقة"
  // Profile & Fitness Info (AR placeholders)
  ,myProfileHeading: "ملفي الشخصي"
  ,manageFitnessProfileDesc: "إدارة ملفك الرياضي وأهدافك"
  ,premiumMember: "عضو مميز"
  ,fitnessInformation: "معلومات اللياقة"
  ,primaryGoal: "الهدف الأساسي"
  ,activityLevel: "مستوى النشاط"
  ,buildMuscle: "بناء العضلات"
  ,weightLoss: "فقدان الوزن"
  ,endurance: "التحمل"
  ,flexibility: "المرونة"
  ,sedentary: "خامل"
  ,lightlyActive: "نشط قليلاً"
  ,moderatelyActive: "نشط متوسط"
  ,veryActive: "نشط جدًا"
  ,saveFitnessInfo: "حفظ معلومات اللياقة"
    // Settings page (AR placeholders)
    ,accountSecurityTitle: "أمان الحساب"
    ,notificationPreferencesTitle: "تفضيلات الإشعارات"
    ,privacySettingsTitle: "إعدادات الخصوصية"
    ,workoutReminders: "تذكيرات التمرين"
    ,workoutRemindersDesc: "تذكيرك بإكمال التمارين"
    ,progressUpdates: "تحديثات التقدم"
    ,progressUpdatesDesc: "إشعار حول تقدمك"
    ,emailNotifications: "إشعارات البريد الإلكتروني"
    ,emailNotificationsDesc: "تلقي ملخصات أسبوعية"
    ,updatePassword: "تحديث كلمة المرور"
    ,savePreferences: "حفظ التفضيلات"
    ,savePrivacySettings: "حفظ إعدادات الخصوصية"
    ,dangerZone: "منطقة الخطر"
    ,deleteAccount: "حذف الحساب"
    ,profileVisibility: "ظهور الملف الشخصي"
    ,profileVisibilityDesc: "السماح للمستخدمين الآخرين برؤية ملفك"
    ,showProgress: "عرض التقدم"
    ,showProgressDesc: "عرض إحصاءات لياقتك علنًا"
    ,currentPassword: "كلمة المرور الحالية"
    ,newPassword: "كلمة مرور جديدة"
    ,confirmPassword: "تأكيد كلمة المرور"
    ,enterCurrentPassword: "أدخل كلمة المرور الحالية"
    ,enterNewPassword: "أدخل كلمة المرور الجديدة"
      ,confirmNewPassword: "أكد كلمة المرور الجديدة"
      ,membershipPlans: "خطط الاشتراك"
      ,monthly: "شهري"
      ,yearly: "سنوي"
      ,savePercent: "وفر 17%"
      ,freePlan: "مجاني"
      ,premiumPlan: "بريميوم"
      ,proPlan: "احترافي"
      ,idealForBeginners: "مثالي للمبتدئين"
      ,mostPopularChoice: "الأكثر شعبية"
      ,forProfessionalAthletes: "للاعبين المحترفين"
      ,ultimateFitnessTransformation: "التحول النهائي للياقة البدنية"
      ,oneMonth: "شهر واحد"
      ,threeMonths: "٣ أشهر"
      ,sixMonths: "٦ أشهر"
      ,oneYear: "سنة واحدة"
      ,mostPopularBadge: "الأكثر شعبية"
      ,limitations: "القيود"
      ,faqTitle: "الأسئلة الشائعة"
      ,getStarted: "ابدأ الآن"
      ,subscribeNow: "اشترك الآن"
      ,frequentlyAskedQuestions: "الأسئلة الشائعة"
      ,faqChangePlanQ: "هل يمكنني تغيير خطتي في أي وقت؟"
      ,faqChangePlanA: "نعم، يمكنك الترقية أو التخفيض في أي وقت وستنطبق التغييرات على دورة الفوترة التالية."
      ,faqFreeTrialQ: "هل هناك تجربة مجانية؟"
      ,faqFreeTrialA: "نعم! يحصل الأعضاء الجدد على 7 أيام وصول مجاني لكل ميزات البريميوم دون الحاجة لبطاقة."
      ,faqPaymentMethodsQ: "ما طرق الدفع المتوفرة؟"
      ,faqPaymentMethodsA: "نقبل جميع البطاقات الرئيسية (Visa, Mastercard, American Express) و PayPal."
      ,faqDataSecureQ: "هل بياناتي آمنة؟"
      ,faqDataSecureA: "بياناتك محمية بتشفير SSL 256-bit ويتم نسخها احتياطيًا يوميًا."
      // Payment Page (Arabic)
      ,payment: "الدفع"
      ,paymentInformation: "معلومات الدفع"
      ,cardInformation: "معلومات البطاقة"
      ,cardholderName: "اسم حامل البطاقة"
      ,cardNumber: "رقم البطاقة"
      ,expiration: "تاريخ الانتهاء"
      ,cvv: "رمز الأمان"
      ,billingAddress: "عنوان إرسال الفواتير"
      ,address: "العنوان"
      ,city: "المدينة"
      ,postalCode: "الرمز البريدي"
      ,processing: "جارٍ المعالجة..."
      ,pay: "ادفع"
      ,securePayment: "دفع آمن"
      ,securePaymentSSL: "دفع آمن - محمي بتشفير SSL"
      ,orderSummary: "ملخص الطلب"
      ,oneTimePayment: "دفعة واحدة"
      ,subtotal: "المجموع الفرعي"
      ,platformFee: "رسوم المنصة"
      ,tax: "الضريبة"
      ,total: "الإجمالي"
      ,includedInPlan: "مشمول في الخطة:"
      ,completeExerciseLibrary: "مكتبة تمارين كاملة"
      ,detailedProgressTracking: "تتبع مفصل للتقدم"
      ,prioritySupport: "دعم ذو أولوية"
      ,securePaymentInfo: "معلومات الدفع الخاصة بك محمية بتشفير SSL 256-bit. لا يتم تخزين معلومات البطاقة."
      ,cardInfoNotStored: "لا يتم تخزين معلومات البطاقة"
      // Payment Placeholders (Arabic)
      ,cardholderNamePlaceholder: "الاسم الأول الاسم الأخير"
      ,streetNeighborhoodPlaceholder: "الشارع، الحي"
      ,cityPlaceholder: "إسطنبول"
      ,postalCodePlaceholder: "٣٤٠٠٠"
      // Membership Page (Arabic)
      ,chooseYourPlan: "اختر خطتك"
      ,selectPerfectPlan: "اختر الخطة المثالية لرحلتك الرياضية"
      // Premium Feature Locked (Arabic)
      ,premiumFeatureLocked: "ميزة بريميوم مقفلة"
      ,featureRequiresSubscription: "تتطلب هذه الميزة اشتراكًا نشطًا. يرجى تجديد اشتراكك للاستمرار في الوصول إلى المحتوى المميز."
      ,renewSubscription: "التجديدات"
      ,backToDashboard: "العودة إلى لوحة التحكم"
      ,redirectingToDashboard: "إعادة التوجيه إلى لوحة التحكم خلال ٣ ثوانٍ..."
      ,backToLogin: "العودة لتسجيل الدخول"
      ,createAccountTitle: "إنشاء حساب"
      ,signupSubtitle: "ابدأ رحلتك الرياضية مع FitPro"
      ,mustBeAtLeast8Chars: "يجب أن تكون 8 أحرف على الأقل"
      ,termsAgreement: "أوافق على"
      ,termsOfService: "شروط الخدمة"
      ,privacyPolicy: "سياسة الخصوصية"
      ,creatingAccount: "جارٍ إنشاء الحساب..."
      ,passwordsDoNotMatch: "كلمات المرور غير متطابقة"
      ,pleaseFillAllFields: "يرجى ملء جميع الحقول"
      ,pleaseAgreeTerms: "يرجى الموافقة على الشروط"
      ,registrationFailed: "فشل التسجيل. يرجى المحاولة مرة أخرى."
      ,emailAlreadyInUse: "هذا البريد الإلكتروني مسجل بالفعل"
      ,passwordTooWeak: "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      ,invalidEmail: "عنوان البريد الإلكتروني غير صالح"
      ,alreadyHaveAccount: "لديك حساب بالفعل؟"
      ,signInLink: "سجّل الدخول"
      // Subscription Warning (Arabic)
      ,subscriptionExpired: "انتهى الاشتراك"
      ,actionRequired: "يتطلب إجراء"
      ,subscriptionExpiredMessage: "انتهى اشتراكك الشهري. جدّد الآن للاستمرار في الوصول إلى الميزات المميزة بما في ذلك خطط الوجبات الشخصية وبرامج التمارين."
      ,workoutPrograms: "برامج التمارين 💪"
      ,mealPlans: "خطط الوجبات 🍽️"
      ,expertSupport: "دعم الخبراء 👨‍⚕️"
      ,renewSubscriptionNow: "قم بزيارة المكتب لتجديد الاشتراك"
      ,subscriptionExpiringSoon: "الاشتراك ينتهي قريباً"
      ,subscriptionExpiresInDays: "ينتهي اشتراكك خلال"
      ,renewNow: "جدّد الآن"
      ,professionalInformation: "المعلومات المهنية"
      ,yearsOfExperience: "سنوات الخبرة"
      ,certification: "الشهادة"
      ,specialization: "التخصص"
      ,saveProfessionalInfo: "حفظ المعلومات المهنية"
      ,security: "الأمان"
      ,changePassword: "تغيير كلمة المرور"
      ,administratorPrivileges: "صلاحيات المدير"
      ,adminProfile: "ملف المدير"
      ,editAdminProfile: "تعديل ملف المدير"
      ,licensedPhysiotherapist: "أخصائي علاج طبيعي مرخّص"
      ,certifiedFitnessTrainer: "مدرب لياقة معتمد"
      ,department: "القسم"
      ,licenseNumber: "رقم الترخيص"
  ,patientPanelTitle: "لوحة المريض"
  ,welcomeGreeting: "مرحباً"
  ,registrationDate: "تاريخ التسجيل"
  ,status: "الحالة"
  ,access: "الوصول"
  ,fullPermission: "صلاحية كاملة"
  ,patientPanelDevelopment: "لوحة المريض قيد التطوير"
  ,patientPanelDescription: "قريباً ستتمكن من عرض الوصفات والتمارين والتقدم والتواصل مع الأخصائي."
  ,comingSoon: "قريباً"
  ,authorizedAccessOnly: "وصول مرخّص فقط"
  ,onlyRegisteredPhysiotherapists: "فقط الأخصائيون المسجلون يمكنهم دخول هذه البوابة"
  ,accessPatientManagement: "الوصول إلى إدارة المرضى الخاصة بك"
  ,physiotherapistPortalFooter: "© 2024 فيت برو بوابة أخصائي العلاج الطبيعي"
  // Workout Center & Schedule (Arabic)
  ,workoutCenter: "مركز التمارين"
  ,workoutCenterSubtitle: "خطط، ابدأ، وراجع جلساتك التدريبية"
  ,buildYourStrength: "ابنِ قوتك"
  ,buildYourStrengthDesc: "تتبع تقدمك وحقق أهداف اللياقة"
  ,todaysWorkoutWednesday: "تمرين اليوم - الأربعاء"
  ,schedule: "الجدول"
  ,today: "اليوم"
  ,week: "أسبوع"
  ,monthView: "شهر"
  ,monday: "الاثنين"
  ,tuesday: "الثلاثاء"
  ,wednesday: "الأربعاء"
  ,thursday: "الخميس"
  ,friday: "الجمعة"
  ,saturday: "السبت"
  ,sunday: "الأحد"
  ,mon: "اثنين"
  ,tue: "ثلاثاء"
  ,wed: "أربعاء"
  ,thu: "خميس"
  ,fri: "جمعة"
  ,sat: "سبت"
  ,sun: "أحد"
  ,chest: "صدر"
  ,backMuscle: "ظهر"
  ,legs: "ساقان"
  ,shoulders: "أكتاف"
  ,arms: "ذراعان"
  ,core: "عضلات البطن"
  ,restAndRecovery: "راحة وتعافي"
  ,exercisesCount: "تمارين"
  ,rest: "راحة"
  ,workout: "تمرين"
  ,exerciseFirst: "التمرين الأول"
  ,exerciseSecond: "التمرين الثاني"
  ,exerciseThird: "التمرين الثالث"
  ,exerciseFourth: "التمرين الرابع"
  ,exerciseFifth: "التمرين الخامس"
  ,exerciseSixth: "التمرين السادس"
  ,exerciseSeventh: "التمرين السابع"
  ,exerciseEighth: "التمرين الثامن"
  ,exerciseNinth: "التمرين التاسع"
  ,exerciseTenth: "التمرين العاشر"
  ,sets: "مجموعات"
  ,reps: "تكرارات"
  ,calories: "السعرات"
  ,carbs: "الكربوهيدرات"
  ,fat: "الدهون"
  ,ingredients: "المكونات"
  ,recipe: "الوصفة"
  ,recipeInstructions: "تعليمات الوصفة"
  ,mealType: "نوع الوجبة"
  ,mealImage: "صورة الوجبة"
  ,mealPhoto: "صورة الوجبة"
  ,todaysMeals: "وجبات اليوم"
  ,importantNotes: "ملاحظات مهمة"
  // Meals & Nutrition (Arabic)
  ,mealsAndNutrition: "الوجبات والتغذية"
  ,trackDailyMealsDesc: "تتبع الوجبات اليومية وأهداف المغذيات الكبرى"
  ,fuelYourBodyRight: "غذِّ جسمك بشكل صحيح"
  ,fuelYourBodyRightDesc: "وازن تغذيتك وحقق أهداف اللياقة"
  ,protein: "البروتين"
  ,caloriesTodayLabel: "السعرات اليوم"
  ,dailyGoal: "الهدف اليومي"
  ,mealsLogged: "الوجبات المسجلة"
  // Physio Panel (Arabic)
  ,physiotherapyTitle: "العلاج الطبيعي"
  ,physioSubtitle: "اطلب موعداً وتتبع تعافيك من الإصابة"
  ,recoverAndHeal: "تعافَ واشفَ"
  ,recoverAndHealDesc: "دعم خبراء العلاج الطبيعي لرحلة تعافيك"
  ,completedLabel: "مكتمل"
  ,requestsLabel: "الطلبات"
  ,totalRequests: "إجمالي الطلبات"
  ,recoveryRate: "معدل التعافي"
  ,pendingLabel: "قيد الانتظار"
  ,sendRequest: "إرسال طلب"
  ,selectPhysiotherapist: "اختر أخصائي علاج طبيعي"
  ,injuryType: "نوع الإصابة"
  ,injuryTypePlaceholder: "مثلاً: إجهاد رباط الركبة"
  ,painPercentage: "نسبة الألم"
  ,notesOptional: "ملاحظات (اختياري)"
  ,notesPlaceholder: "...سياق إضافي"
  ,yourRequests: "طلباتك"
  ,noRequestsYet: "لا توجد طلبات بعد."
  // Profile Section (Arabic)
  ,subscriptionAndAccessKey: "الاشتراك ومفتاح الوصول"
  ,yourAccessKey: "مفتاح الوصول الخاص بك"
  ,personalIdentifier: "المعرّف الشخصي"
  ,statusLabel: "الحالة"
  ,remainingLabel: "المتبقي"
  ,joinedLabel: "انضممت"
  ,expiresLabel: "ينتهي"
  ,accessKeyNote: "ملاحظة: مفتاح الوصول فريد لحسابك. احتفظ به آمناً واستخدمه عند الاتصال بالدعم أو الوصول للميزات المميزة."
  ,account: "الحساب"
  ,manageLabel: "إدارة"
  ,stats: "الإحصائيات"
  ,heightLabel: "الطول"
  ,weightLabel: "الوزن"
  ,shortcuts: "الاختصارات"
  ,physioLabel: "علاج طبيعي"
  ,mealsLabel: "وجبات"
  ,workoutLabel: "تمرين"
  ,appearance: "المظهر"
  ,light: "فاتح"
  ,dark: "داكن"
  ,system: "نظام"
  ,systemFollowsOS: "يتبع النظام موضوع نظام التشغيل."
  ,pushNotifications: "إشعارات الدفع"
  ,applyLanguage: "تطبيق اللغة"
  ,accountActions: "إجراءات الحساب"
  ,accountActionsDesc: "تسجيل الخروج سيمسح جلستك ويعيدك إلى شاشة تسجيل الدخول."
  ,logoutButton: "تسجيل الخروج"
  // Manage Profile Dialog (Arabic)
  ,manageProfile: "إدارة الملف الشخصي"
  ,changeAvatar: "تغيير الصورة"
  ,avatarSizeNote: "PNG/JPG حتى 2MB."
  ,personal: "شخصي"
  ,fullName: "الاسم الكامل"
  ,phoneLabel: "الهاتف"
  ,joinDate: "تاريخ الانضمام"
  ,goal: "الهدف"
  ,experience: "الخبرة"
  ,physical: "جسدي"
  ,weight: "الوزن"
  ,height: "الطول"
  ,current: "الحالية"
  ,new: "الجديدة"
  ,changePasswordLabel: "تغيير كلمة المرور"
  ,currentPasswordLabel: "الحالية"
  ,newPasswordLabel: "الجديدة"
  ,confirmPasswordLabel: "تأكيد"
  ,saved: "محفوظ"
  ,welcomeBack: "مرحباً بعودتك"
  // Dashboard Stats (Arabic)
  ,totalTime: "الوقت الإجمالي"
  ,caloriesBurned: "السعرات المحروقة"
  // Workout Exercise Names (Arabic - kept in English)
  ,barbellBenchPress: "Barbell Bench Press"
  ,inclineDumbbellPress: "Incline Dumbbell Press"
  ,cableFlyes: "Cable Flyes"
  ,focusControlledMovement: "ركز على الحركة المنضبطة"
  ,squeezeAtPeak: "اضغط في القمة"
  ,keepBackStraightEngageCore: "حافظ على استقامة الظهر، شد عضلات البطن"
  ,goDeepKeepChestUp: "انزل عميقاً، أبقِ الصدر مرفوعاً"
  ,lightStretchingYogaWalking: "تمدد خفيف، يوغا، أو مشي"
  // Notifications Dialog (Arabic)
  ,notificationsTitle: "الإشعارات"
  ,milestoneReached: "إنجاز تم الوصول إليه"
  ,milestoneReachedDesc: "أكملت 20 تمريناً! استمر في العمل الرائع!"
  ,workoutReminder: "تذكير بالتمرين"
  ,workoutReminderDesc: "لا تنسَ إكمال تمرين المساء"
  ,progressUpdate: "تحديث التقدم"
  ,progressUpdateDesc: "فقدت 2 كجم هذا الشهر. تقدم رائع!"
  ,close: "إغلاق"
  // Placeholders for Create Program dialogs (Arabic)
  ,exampleKetoDiet: "مثال: خطة حمية الكيتو"
  ,exampleFullBodyWorkout: "مثال: تمرين كامل الجسم"
  ,enterProgramDescription: "أدخل وصف البرنامج..."
  ,example30mins: "مثال: 30 دقيقة"
  ,example2000: "مثال: 2000"
  ,example150: "مثال: 150"
  ,example200: "مثال: 200"
  ,example60: "مثال: 60"
  ,exampleChestShouldersTriceps: "مثال: الصدر، الأكتاف، العضلة ثلاثية الرؤوس"
  ,exampleImageUrl: "https://example.com/image.jpg"
  // Superadmin Dashboard (Arabic)
  ,superadminDashboard: "لوحة تحكم المسؤول الأعلى"
  ,systemManagementControl: "إدارة النظام والتحكم"
  ,users: "المستخدمون"
  ,keys: "المفاتيح"
  ,activeNow: "نشط"
  ,growth: "النمو"
  ,totalActive: "النشط الإجمالي"
  ,accessKeysLabel: "مفاتيح الوصول"
  ,onlineNow: "متصل الآن"
  ,thisMonth: "هذا الشهر"
  ,quickActions: "إجراءات سريعة"
  ,manageUsers: "إدارة المستخدمين"
  ,generateKeys: "إنشاء المفاتيح"
  ,viewReports: "عرض التقارير"
  ,systemStatus: "حالة النظام"
  ,database: "قاعدة البيانات"
  ,apiServer: "خادم API"
  ,storage: "التخزين"
  ,healthy: "سليم"
  ,running: "يعمل"
  ,percentUsed: "مستخدم"
  ,trainers: "المدربون"
  ,totalTrainers: "إجمالي المدربين"
  // Users Management (Arabic)
  ,userManagementTitle: "إدارة المستخدمين"
  ,manageYourUsers: "إدارة ومراقبة جميع المستخدمين"
  ,statistics: "الإحصائيات"
  ,allUsers: "جميع المستخدمين"
  ,searchUsers: "البحث عن المستخدمين..."
  ,addNewUser: "إضافة مستخدم جديد"
  ,viewProfile: "عرض الملف الشخصي"
  ,editUser: "تعديل المستخدم"
  ,deleteUser: "حذف المستخدم"
  ,active: "نشط"
  ,inactive: "غير نشط"
  ,membership: "العضوية"
  ,accountSettings: "إعدادات الحساب"
  ,personalInformation: "المعلومات الشخصية"
  ,fullNameLabel: "الاسم الكامل"
  ,emailAddressLabel: "عنوان البريد الإلكتروني"
  ,phoneNumberLabel: "رقم الهاتف"
  ,locationLabel: "الموقع"
  ,roleLabel: "الدور"
  ,passwordLabel: "كلمة المرور"
  ,trainersAlwaysActive: "المدربون والمسؤولون نشطون دائماً"
  ,saveChanges: "حفظ التغييرات"
  ,cancelAction: "إلغاء"
  ,deleteUserTitle: "حذف المستخدم"
  ,areYouSure: "هل أنت متأكد؟"
  ,actionCannotBeUndone: "لا يمكن التراجع عن هذا الإجراء"
  ,confirmDelete: "تأكيد الحذف"
  ,proRequests: "طلبات الترقية"
  ,proRequestsDescription: "مراجعة والموافقة على طلبات الترقية إلى Pro"
  ,upgradeRequests: "طلبات الترقية"
  ,noPendingRequests: "لا توجد طلبات معلقة"
  ,requestFrom: "طلب من"
  ,requestDetails: "تفاصيل الطلب"
  ,approve: "موافقة"
  ,reject: "رفض"
  ,pending: "قيد الانتظار"
  ,approved: "تمت الموافقة"
  ,rejected: "مرفوض"
  // Access Keys Page (Arabic)
  ,accessKeysPage: "مفاتيح الوصول"
  ,generateAndManageKeys: "إنشاء وإدارة مفاتيح الوصول"
  ,generateNewKey: "إنشاء مفتاح جديد"
  ,generating: "جارٍ الإنشاء..."
  ,totalKeys: "إجمالي المفاتيح"
  ,expired: "منتهية"
  ,quickKeyGenerator: "مولد المفاتيح السريع"
  ,generateKeysInstantly: "إنشاء مفاتيح الوصول للأعضاء الجدد فوراً"
  ,trialOneUse: "تجريبي (استخدام واحد)"
  ,standardFiveUses: "قياسي (5 استخدامات)"
  ,premiumTenUses: "مميز (10 استخدامات)"
  ,allAccessKeys: "جميع مفاتيح الوصول"
  ,keyColumn: "المفتاح"
  ,typeColumn: "النوع"
  ,usesColumn: "الاستخدامات"
  ,statusColumn: "الحالة"
  ,expiresColumn: "تنتهي"
  ,actionsColumn: "الإجراءات"
  ,trial: "تجريبي"
  ,standard: "قياسي"
  ,premium: "مميز"
  ,used: "مستخدم"
  ,copyKey: "نسخ المفتاح"
  // Analytics Page (Arabic)
  ,analyticsDashboard: "لوحة التحليلات"
  ,trackPerformance: "تتبع الأداء والرؤى"
  ,loadingAnalytics: "جارٍ تحميل التحليلات..."
  ,keyMetrics: "المقاييس الرئيسية"
  ,totalUsers: "إجمالي المستخدمين"
  ,activeUsers24h: "المستخدمون النشطون (24 ساعة)"
  ,proMembers: "الأعضاء المميزون"
  ,totalWorkouts: "إجمالي التمارين"
  ,userGrowth: "نمو المستخدمين"
  ,userDistribution: "توزيع المستخدمين"
  ,recentActivity: "النشاط الأخير"
  ,newUserRegistered: "تسجيل مستخدم جديد"
  // Database Page (Arabic)
  ,databaseManagement: "إدارة قاعدة البيانات"
  ,monitorDatabase: "مراقبة وإدارة عمليات قاعدة البيانات"
  ,refresh: "تحديث"
  ,backup: "نسخة احتياطية"
  ,creatingBackup: "جارٍ إنشاء النسخة..."
  ,healthStatus: "حالة الصحة"
  ,databaseStatus: "حالة قاعدة البيانات"
  ,allSystemsOperational: "جميع الأنظمة تعمل"
  ,lastChecked: "آخر فحص"
  ,justNow: "الآن"
  ,uptime: "وقت التشغيل"
  ,storageUsed: "المساحة المستخدمة"
  ,totalRecords: "إجمالي السجلات"
  ,activeConnections: "المستخدمون النشطون"
  ,collectionsColumn: "المجموعات"
  ,collectionsOverview: "نظرة عامة على المجموعات"
  ,loadingCollections: "جارٍ تحميل المجموعات..."
  ,documents: "مستندات"
  ,view: "عرض"
  ,recentBackups: "النسخ الاحتياطية الأخيرة"
  ,noBackupsYet: "لا توجد نسخ احتياطية بعد"
  ,createFirstBackup: "قم بإنشاء نسختك الاحتياطية الأولى أعلاه"
  ,success: "نجح"
  ,maintenance: "الصيانة"
  ,optimizeDatabase: "تحسين قاعدة البيانات"
  ,optimizing: "جارٍ التحسين..."
  ,createBackupNow: "إنشاء نسخة احتياطية الآن"
  ,restoreFromBackup: "استعادة من نسخة احتياطية"
  ,clearCache: "مسح ذاكرة التخزين المؤقت"
  ,clearing: "جارٍ المسح..."
  // Programs Page (Arabic)
  ,programsManagement: "إدارة البرامج"
  ,createAndManagePrograms: "إنشاء وإدارة برامج التمارين والتغذية"
  ,nutritionPrograms: "برامج التغذية"
  ,workoutPrograms: "برامج التمارين"
  ,searchPrograms: "البحث عن البرامج..."
  ,createNewProgram: "إنشاء برنامج جديد"
  ,createNutritionProgram: "إنشاء برنامج تغذية"
  ,programName: "اسم البرنامج"
  ,description: "الوصف"
  ,assignToUsers: "تعيين للمستخدمين"
  ,selectUsers: "اختر المستخدمين"
  ,searchByName: "البحث بالاسم..."
  ,searchByNameOrEmail: "البحث بالاسم أو البريد الإلكتروني..."
  ,selected: "محدد"
  ,weeklySchedule: "الجدول الأسبوعي"
  ,addMeal: "إضافة وجبة"
  ,addExercise: "إضافة تمرين"
  ,mealLibrary: "مكتبة الوجبات"
  ,exerciseLibrary: "مكتبة التمارين"
  ,calories: "السعرات"
  ,protein: "البروتين"
  ,carbs: "الكربوهيدرات"
  ,fats: "الدهون"
  ,sets: "المجموعات"
  ,reps: "التكرارات"
  ,rest: "الراحة"
  ,instructions: "التعليمات"
  ,ingredients: "المكونات"
  ,noProgramsFound: "لا توجد برامج"
  ,createFirstProgram: "قم بإنشاء برنامجك الأول أعلاه"
  ,imageUrl: "رابط الصورة"
  ,userSelection: "اختيار المستخدمين"
  ,onlyProUsers: "المستخدمون المميزون فقط (باستثناء المجانيين والمشرفين)"
  ,selectAllUsers: "تحديد الكل"
  ,clearAll: "مسح الكل"
  ,noteLabel: "ملاحظة:"
  ,onlyProUsersShown: "يتم عرض المستخدمين المميزين فقط"
  ,freeUsersHidden: "المستخدمون المجانيون مخفيون"
  ,adminsHidden: "المشرفون والمدربون مخفيون"
  ,setMealsForEachDay: "تحديد الوجبات لكل يوم"
  ,restDay: "يوم راحة؟"
  ,noMealsAdded: "لم تتم إضافة وجبات"
  ,copyToAnotherDay: "نسخ إلى يوم آخر"
  ,weekSummary: "ملخص الأسبوع:"
  ,activeDays: "نشط"
  ,restDays: "راحة"
  ,totalMeals: "وجبات"
  ,uniqueMeals: "فريد"
  ,fillBasicInfo: "املأ المعلومات الأساسية (الاسم، الوصف، المدة...)"
  ,whenComplete: "عند الانتهاء، انقر على حفظ"
  ,clickSave: "انقر على حفظ"
  ,level: "المستوى"
  ,beginner: "مبتدئ"
  ,intermediate: "متوسط"
  ,advanced: "متقدم"
  ,monday: "الاثنين"
  ,tuesday: "الثلاثاء"
  ,wednesday: "الأربعاء"
  ,thursday: "الخميس"
  ,friday: "الجمعة"
  ,saturday: "السبت"
  ,sunday: "الأحد"
  ,selectDayFrom7Days: "اختر يومًا من الأيام السبعة (الاثنين إلى الأحد)"
  ,clickAddExercise: "انقر على 'إضافة تمرين' لإضافة التمارين"
  ,canAddMultipleExercises: "يمكنك إضافة عدة تمارين لكل يوم"
  ,ifRestDayTurnOn: "إذا كان يوم راحة، قم بتشغيل 'يوم راحة'"
  ,noPROusers: "لا يوجد مستخدمون عاديون (user) مع PRO"
  ,noUsersFound: "لم يتم العثور على مستخدمين"
  ,freeUsersNotShown: "المستخدمون المجانيون والمشرفون غير معروضين"
  ,programWillBeSentTo: "سيتم إرسال هذا البرنامج إلى"
  ,PROusers: "مستخدمي PRO"
  ,setMealsDescription: "تحديد الوجبات لكل يوم"
  ,targetMuscles: "العضلات المستهدفة"
  ,noExercisesAdded: "لم تتم إضافة تمارين"
  ,addExerciseButton: "إضافة تمرين"
  ,copyToDay: "نسخ إلى يوم آخر"
  ,weekSummaryLabel: "ملخص الأسبوع:"
  ,activeLabel: "نشط"
  ,restLabel: "راحة"
  ,exercisesLabel: "تمارين"
  ,uniqueLabel: "فريد"
  ,noMealsAdded: "لم تتم إضافة وجبات"
  ,addMeal: "إضافة وجبة"
  ,copyMealToOtherDay: "نسخ إلى يوم آخر"
  ,restDayMessage: "إنه يوم راحة 😴"
  ,timeForRestAndRecovery: "وقت الراحة والتعافي"
  ,weekSummary: "ملخص الأسبوع:"
  ,active: "نشط"
  ,rest: "راحة"
  ,meals: "وجبات"
  ,different: "مختلف"
  ,weekUniqueMeals: "وجبات الأسبوع الفريدة"
  ,types: "أنواع"
  ,mealLibrary: "مكتبة الوجبات"
  ,savedMeals: "الوجبات المحفوظة"
  ,saveMealToLibrary: "حفظ في المكتبة"
  ,weekUniqueExercises: "تمارين الأسبوع الفريدة"
  ,setMealsForEachDay: "حدد الوجبات لكل يوم"
  ,setExercisesForEachDay: "حدد التمارين لكل يوم"
  ,mealName: "اسم الوجبة"
  ,mealCategory: "فئة الوجبة"
  ,macros: "المغذيات الكبرى"
  ,caloriesRequired: "السعرات *"
  ,proteinG: "البروتين (g)"
  ,carbsG: "الكربوهيدرات (g)"
  ,fatsG: "الدهون (g)"
  ,ingredients: "المكونات"
  ,ingredientsOptional: "المكونات (اختياري)"
  ,instructionsOptional: "التعليمات (اختياري)"
  ,notesOptional: "ملاحظات (اختياري)"
  ,mealImage: "صورة الوجبة"
  ,mealImageOptional: "صورة الوجبة (اختياري)"
  ,selectFromGallery: "اختر من المعرض"
  ,orEnterImageLink: "أو أدخل رابط الصورة..."
  ,importantNote: "ملاحظة مهمة:"
  ,onlyNameCaloriesRequired: "فقط الاسم والسعرات مطلوبة"
  ,ingredientsInstructionsNotesOptional: "المكونات والتعليمات والملاحظات اختيارية"
  ,canAddMultipleMealsPerDay: "يمكنك إضافة وجبات متعددة لكل يوم"
  ,addAction: "إضافة"
  ,exampleGrilledChicken: "مثال: دجاج مشوي وأرز"
  ,exampleCalories450: "مثال: 450"
  ,exampleProtein35: "مثال: 35"
  ,exampleCarbs50: "مثال: 50"
  ,exampleFats12: "مثال: 12"
  ,exampleIngredients: "مثال:\n- صدر دجاج 150 جرام\n- أرز 200 جرام\n- خضروات 100 جرام\n- زيت زيتون 1 ملعقة صغيرة"
  ,exampleInstructions: "مثال:\n1. اشوِ الدجاج حتى ينضج تماماً\n2. اطبخ الأرز بشكل منفصل\n3. اخلط جميع المكونات في وعاء..."
  ,specialNotes: "ملاحظات خاصة..."
  ,pleaseEnterMealName: "الرجاء إدخال اسم الوجبة"
  ,mealImageGallery: "معرض صور الوجبات"
  ,imagesInStorage: "صور في التخزين"
  ,searchByImageName: "البحث باسم الصورة..."
  ,imagesFound: "صور موجودة"
  ,pageOf: "صفحة {current} من {total}"
  ,previousPage: "السابق"
  ,nextPage: "التالي"
  ,cancelAction: "إلغاء"
  ,saveProgram: "حفظ"
  ,addExerciseTitle: "إضافة تمرين"
  ,exerciseLibraryButton: "مكتبة التمارين"
  ,saveToLibrary: "حفظ في المكتبة"
  ,exerciseName: "اسم التمرين"
  ,exerciseVideos: "فيديوهات التمرين"
  ,selectVideoFromStorage: "اختر فيديو من التخزين"
  ,notesOptional: "ملاحظات (اختياري)"
  ,additionalNotesPlaceholder: "ملاحظات إضافية للتمرين..."
  ,addButton: "إضافة"
  ,optional: "اختياري"
  ,addAnotherVideo: "إضافة فيديو آخر"
  ,preview: "معاينة:"
  ,videosSelected: "فيديو محدد"
  ,selectVideo: "اختيار الفيديو"
  ,videosInStorage: "فيديو في التخزين"
  ,noVideosAvailable: "لا توجد فيديوهات متاحة"
  ,uploadVideosToFirebase: "رفع الفيديوهات إلى Firebase Storage"
  ,searchByVideoName: "البحث باسم الفيديو..."
  ,allGenders: "كل الأجناس"
  ,allLevels: "كل المستويات"
  ,allBodyParts: "كل أجزاء الجسم"
  ,chest: "صدر"
  ,back: "ظهر"
  ,legs: "أرجل"
  ,shoulders: "أكتاف"
  ,arms: "ذراعان"
  ,core: "الوسط"
  ,videosFound: "فيديو تم العثور عليه"
  ,selected: "محدد"
  ,select: "اختيار"
  ,previous: "السابق"
  ,next: "التالي"
  ,saveWithCount: "حفظ"
  ,videoDetails: "تفاصيل الفيديو"
  ,setsCount: "عدد المجموعات"
  ,repsCount: "التكرارات"
  ,videoSpecificNotes: "ملاحظات خاصة بهذا الفيديو..."
  ,savedSuccessfully: "تم الحفظ بنجاح"
  ,exerciseLibrary: "مكتبة التمارين"
  ,savedExercises: "تمرين محفوظ"
  ,libraryEmpty: "المكتبة فارغة"
  ,saveYourExercisesForLater: "احفظ تمارينك للاستخدام لاحقًا"
  ,searchInLibrary: "البحث في المكتبة..."
  ,videos: "فيديوهات"
  ,close: "إغلاق"
  // Videos Page (Arabic)
  ,firebaseVideos: "فيديوهات Firebase"
  ,checkFirebaseVideos: "التحقق من فيديوهات Firebase (exercises/ & videos/)"
  ,refreshVideos: "تحديث"
  ,videoName: "اسم الفيديو"
  ,fileSize: "حجم الملف"
  ,uploadDate: "تاريخ الرفع"
  ,download: "تحميل"
  ,noVideosFound: "لا توجد فيديوهات"
  ,uploadVideosFirst: "قم برفع الفيديوهات إلى Firebase أولاً"
  // Logs Page (Arabic)
  ,systemLogs: "سجلات النظام"
  ,monitorSystemActivity: "مراقبة نشاط النظام والأحداث"
  ,searchLogs: "البحث في السجلات..."
  ,filterByType: "التصفية حسب النوع"
  ,exportLogs: "تصدير السجلات"
  ,allLogs: "جميع السجلات"
  ,errors: "الأخطاء"
  ,warnings: "التحذيرات"
  ,infoLogs: "معلومات"
  ,timestamp: "الوقت"
  ,message: "الرسالة"
  ,details: "التفاصيل"
  ,noLogsFound: "لا توجد سجلات"
  ,error: "خطأ"
  ,warning: "تحذير"
  ,info: "معلومات"
  // Profile Page (Arabic)
  ,myProfile: "ملفي الشخصي"
  ,manageAccountInfo: "إدارة معلومات حسابك"
  ,systemAdministrator: "مسؤول النظام"
  ,editProfile: "تعديل الملف"
  ,cancelEdit: "إلغاء"
  ,personalInfo: "المعلومات الشخصية"
  ,firstName: "الاسم الأول"
  ,lastName: "اسم العائلة"
  ,fullAccess: "وصول كامل"
  ,accountInfo: "معلومات الحساب"
  ,joinedDate: "تاريخ الانضمام"
  ,lastLogin: "آخر تسجيل دخول"
  ,securitySettings: "إعدادات الأمان"
  ,changePassword: "تغيير كلمة المرور"
  ,currentPasswordPlaceholder: "أدخل كلمة المرور الحالية"
  ,newPasswordPlaceholder: "أدخل كلمة المرور الجديدة"
  ,confirmPasswordPlaceholder: "تأكيد كلمة المرور الجديدة"
  ,updatePassword: "تحديث كلمة المرور"
  // Settings Page (Arabic)
  ,settingsPage: "الإعدادات"
  ,customizePreferences: "تخصيص تفضيلاتك والأمان"
  ,securityAndPrivacy: "الأمان والخصوصية"
  ,addExtraLayer: "إضافة طبقة إضافية من الأمان"
  ,twoFactorAuth: "المصادقة الثنائية"
  ,notificationsSettings: "الإشعارات"
  ,systemNotifications: "إشعارات النظام"
  ,receiveSystemAlerts: "تلقي تنبيهات وتحديثات النظام"
  ,emailNotifs: "إشعارات البريد الإلكتروني"
  ,getEmailUpdates: "احصل على التحديثات المهمة عبر البريد"
  ,appearance: "المظهر"
  ,darkModeLabel: "الوضع الداكن"
  ,darkModeDesc: "استخدم السمة الداكنة لرؤية أفضل"
  ,languagePreference: "تفضيل اللغة"
  ,chooseLanguage: "اختر لغتك المفضلة"
  ,systemPreferences: "تفضيلات النظام"
  ,autoBackup: "النسخ الاحتياطي التلقائي"
  ,autoBackupDesc: "نسخ قاعدة البيانات تلقائياً كل يوم"
  ,maintenanceMode: "وضع الصيانة"
  ,maintenanceModeDesc: "تفعيل وضع الصيانة لتحديثات النظام"
  // Notifications Page (Arabic)
  ,notificationsPage: "الإشعارات"
  ,stayUpdated: "ابق على اطلاع بتنبيهات النظام"
  ,markAllRead: "تمييز الكل كمقروء"
  ,clearAll: "مسح الكل"
  ,unreadNotifications: "غير مقروء"
  ,allNotifications: "الكل"
  ,failedLoginAttempt: "محاولة تسجيل دخول فاشلة"
  ,newAdminCreated: "تم إنشاء مسؤول جديد"
  ,highServerLoad: "حمل عالٍ على الخادم"
  ,markAsRead: "تمييز كمقروء"
  ,deleteNotification: "حذف"
  ,noNotifications: "لا توجد إشعارات"
  ,allCaughtUp: "أنت على اطلاع على كل شيء!"
  },
  // Minimal Kurdish (Sorani) placeholders
  ku: {
    heroTitle: "فیتپرو",
    heroSubtitle: "مڕەببی تایبەتی تەندروستی",
    login: "چوونەژوورەوە",
    dashboard: "داشبۆرد",
    physiotherapist: "دکتۆر",
    progress: "پێشکەوتن",
    profile: "پڕۆفایل",
    logout: "دەرچوون",
    accessKeys: "کلیلی دەستگەیشتن",
    notifications: "ئاگانامەکان",
    systemSettings: "ڕێکخستنەکانی سیستەم",
    superadminPanel: "پەنێڵی سوپرئادمین",
  loading: "بارکردن",
  updating: "نوێکردنەوە...",
    patients: "نەخوشەکان"
    ,activities: "چالاکیەکان"
    ,trainees: "فێركراوەکان"
    ,analytics: "ئەنالیتیکس 📊"
    ,reports: "ڕاپۆرتەکان"
    ,management: "بەڕێوەبردن"
    ,helpSupport: "یارمەتی و پاڵپشتی 🆘"
    ,helpDescription: "ئەگەر پێویستیت بە یارمەتیە، تکایە پەیوەندی بە تیمی پاڵپشتیمان بکە لە support@fitpro.com. ئێمە لێرەین بۆ یارمەتیدانت لە هەر کێشە یان پرسیارێک."
    ,helpContactInfo: "بۆ کێشە پەلەیەکان، تکایە ئیمەیڵ بنێرە بۆ support@fitpro.com یان پەیوەندی بکە بە +1 (555) 123-4567."
    ,availableWorkouts: "وەرزشی بەردەست"
    ,searchWorkoutsPlaceholder: "گەڕانی وەرزش..."
    ,noWorkoutsFound: "هیچ وەرزشی نەدۆزرایەوە بەپێی گەڕان"
    ,settings: "ڕێکخستنەکان"
    ,languageSettings: "ڕێکخستنەکانی زمان"
    ,selectLanguage: "زمانی دڵخوازت دیاری بکە"
    ,workouts: "وەرزشەکان"
    ,categories: "هاوپۆلەکان"
    ,start: "دەستپێک"
  ,browseWorkoutsSubtitle: "گەڕان بکە و دەست پێ بکە بە وەرزشە دڵخوازەکانت"
  ,signInToAccount: "چوونەژوورەوە بۆ هەژماری فیتپرو"
  ,owner: "خاوەن"
  ,trainer: "ڕاهێنەر"
  ,requests: "داواکاریەکان"
  ,anatomy3D: "🦴 بینەری 3D ی ئەناتۆمی"
  ,anatomyEngineer: "🔧 تاقیگەی ئەناتۆمی"
  ,unirigDemo: "⚡ دیمۆی UniRig"
  ,"3dModelViewer": "👁️ بینەری مۆدێلی 3D"
  ,breakfast: "تایە بەیانی"
  ,lunch: "نانی نیوەڕۆ"
  ,snacks: "خواردنی سووک"
  ,dinner: "نانی ئێوارە"
  ,snack: "خواردنی سووک"
  // Auth & Login (KU placeholders)
  ,signIn: "چوونەژوورەوە"
  ,signUp: "خۆتۆمارکردن"
  ,firstName: "ناوی یەکەم"
  ,lastName: "ناوی کۆتایی"
  ,firstNamePlaceholder: "ناوی یەکەمت بنووسە"
  ,lastNamePlaceholder: "ناوی کۆتاییت بنووسە"
  ,emailAddress: "ئیمەیڵ"
  ,emailOrUsername: "ئیمەیڵ یان ناوی بەکارهێنەر"
  ,password: "وشەی نهێنی"
  ,rememberMe: "بیرم بهێنەوە"
  ,forgotPassword: "ئایا پاسوۆردی هەژمارەکەت بیرت چووە؟"
  ,loginSuccessful: "بە سەرکەوتوویی چوویتە ژوورەوە!"
  ,chooseRoleOrSignIn: "رۆڵەکەت هەڵبژێرە یان بچۆ ژوورەوە"
  ,pleaseEnterEmail: "تکایە ئیمەیڵەکەت بنووسە"
  ,pleaseEnterPassword: "تکایە وشەی نهێنیەکەت بنووسە"
  ,incorrectCredentials: "ئیمەیڵ یان وشەی نهێنی هەڵەیە. تکایە دووبارە هەوڵ بدەرەوە."
  ,resetPassword: "دووبارە دانانەوەی پاسوۆرد"
  ,resetPasswordTitle: "پاسوۆردەکەت بیرت چووە؟"
  ,resetPasswordDesc: "نیگەران مەبە! ئیمەیڵەکەت بنووسە و لینکێکت بۆ دەنێرین بۆ دووبارە دانانەوەی پاسوۆردەکەت."
  ,enterEmailToReset: "ئیمەیڵەکەت بنووسە"
  ,sendResetLink: "لینکی دووبارە دانانەوە بنێرە"
  ,sendingResetLink: "دەنێردرێت..."
  ,resetLinkSent: "لینکی دووبارە دانانەوە نێردرا!"
  ,checkYourEmail: "ئیمەیڵەکەت چێک بکە"
  ,resetEmailSentMessage: "لینکێکی دووبارە دانانەوەی پاسوۆردمان بۆ ئیمەیڵەکەت ناردووە. تکایە inbox ەکەت چێک بکە و ڕێنماییەکان جێبەجێ بکە."
  ,help: "یارمەتی"
  ,orContinueAs: "یان بەردەوام بە وەک"
  ,admin: "ئەدمین"
  ,physiotherapistLogin: "چوونەژوورەوەی فیزیۆتەراپیست"
  ,trainerLogin: "چوونەژوورەوەی ڕاهێنەر"
  ,adminLogin: "چوونەژوورەوەی ئەدمین"
  ,superAdminLogin: "چوونەژوورەوەی سوپر ئەدمین"
  ,ownerLogin: "چوونەژوورەوەی خاوەن"
  ,signInAsAdmin: "چوونەژوورەوە وەک ئەدمین"
  ,signInAsPhysiotherapist: "چوونەژوورەوە وەک فیزیۆتەراپیست"
  ,signInAsTrainer: "چوونەژوورەوە وەک ڕاهێنەر"
  ,signInAsSuperAdmin: "چوونەژوورەوە وەک سوپر ئەدمین"
  ,signInAsOwner: "چوونەژوورەوە وەک خاوەن"
  ,dontHaveAccount: "هەژمارت نییە؟"
  ,copyrightNotice: "© 2025 فیتپرو. هەموو مافەکان پارێزراون."
  // Feature Descriptions (Kurdish)
  ,featuresTitle: "بۆچی فیتپرۆ"
  ,professionalSolutions: "چارەسەری پڕۆفیشناڵی تەندروستی تایبەتکراو بۆ ئامانجەکانت"
  ,videoGuidance: "ڕێنمایی ڤیدیۆیی 🎥"
  ,videoGuidanceDesc: "شوێن ڕاهێنەرە پسپۆڕەکان بکەوە لەگەڵ ڕێنماییی ڤیدیۆیی ورد بۆ هەموو وەرزشێک"
  ,personalizedPrograms: "بەرنامە تایبەتی‌کراوەکان 🧩"
  ,personalizedProgramsDesc: "پلانی وەرزشی تایبەتی دروستکراو لەسەر بنەمای ئاستی تەندروستی و ئامانجەکانت"
  ,progressTracking: "شوێنکەوتنی پێشکەوتن 📈"
  ,progressTrackingDesc: "چاودێری پێشکەوتنەکەت بکە لەگەڵ ئاماری ورد و هێلکاری پێشکەوتن"
  ,exerciseLibraryFull: "کۆگەی تەواوی وەرزشی 📘"
  ,exerciseLibraryFullDesc: "دەستگەیشتن بە بە هەزاران وەرزش لەگەڵ پیشاندانی شێوازی دروست"
  ,goalOriented: "سەرلەبەرامبەر ئامانج 🎯"
  ,goalOrientedDesc: "ئامانجەکانی تەندروستی خۆت دابنێ و بەدیبهێنە لەگەڵ ڕێنماییی ڕێکخراو"
  ,achievementBadges: "خەڵاتەکانی دەستووردان 🏆"
  ,achievementBadgesDesc: "خەڵات و پاداشت بەدەست بهێنە کاتێک بە ئامانجەکانی تەندروستیت دەگەیت"
  ,priorityCustomerSupport: "پشتیوانی بەرامبەرەکان بە پێشگرتن 💬"
  ,exclusiveCommunityAccess: "دەستگەیشتن بە کۆمەڵگای تایبەتی 👥"
  // Dashboard (KU placeholders)
  ,welcomeBackUser: "بەخێربێیتەوە، بەکارهێنەر"
  ,trackFitnessDesc: "گەشتە تەندروستیەکەت ببینە و ئامانجەکانت بگەیەنە"
  ,totalWorkouts: "کۆی گشتی وەرزش"
  ,currentStreak: "زنجیرەی ئێستا"
  ,overallProgress: "پێشکەوتنی گشتی"
  ,quickActions: "کاری خێرا"
  ,recentActivity: "چالاکیی دواتر"
  ,startWorkout: "دەست پێ بکە بە وەرزش"
  ,setGoal: "ئامانج دابنێ"
  ,viewAchievements: "خەڵاتەکان ببینە"
  ,completed: "تەواو کرا"
  ,upperBodyWorkout: "وەرزش بۆ بەشی سەرەوەی جەستە"
  ,completedOnDate: "تەواو کرا لە"
  ,readyForToday: "بەخێربێیتەوە، ئامادەیت بۆ پلانی ئەمڕۆ؟"
  ,activeStreak: "زنجیرەی چالاک"
  ,caloriesToday: "کالۆری ئەمڕۆ"
  ,days: "ڕۆژ"
  ,kcal: "کالۆری"
  ,todaysTimeline: "کاتی ئەمڕۆ"
  ,todaysSchedule: "خشتەی ئەمڕۆ"
  ,addWorkout: "زیادکردنی وەرزش"
  ,logMeal: "تۆمارکردنی خواردن"
  ,title: "ناونیشان"
  ,duration: "ماوە"
  ,meals: "خواردنەکان"
  ,saveWorkout: "پاشەکەوتکردنی وەرزش"
  ,saveMeal: "پاشەکەوتکردنی خواردن"
  ,minutes: "خولەک"
  ,min: "خولەک"
  ,limitedOffer: "پێشکەشکراوی کاتی: 20% داشکاندن لە پریمیەم"
  ,upgradeToday: "ئەمڕۆ بەرزبکەرەوە بۆ کردنەوەی پلانە تایبەتەکان"
  ,now: "ئێستا"
  ,todaysWorkout: "وەرزشی ئەمڕۆ: هێزی تەواوی جەستە"
  ,workoutDetails: "8 وەرزش • 45 خولەک • ناوەند"
  ,breakfastItem: "نانی بەیانی"
  ,breakfastDetails: "یولاف + گڵۆپک • 420 کالۆری"
  ,lunchItem: "نانی نیوەڕۆ"
  ,lunchDetails: "زەڵاتەی مریشکی برژاو • 560 کالۆری"
  ,snackItem: "خواردنەوەی سووک"
  ,snackDetails: "ماستی یۆنانی • 180 کالۆری"
  ,hydratePro: "هایدرەیت پرۆ"
  ,hydrateProDesc: "بیرخستنەوەی زیرەک و شوێنکەوتنی خواردنەوە"
  ,fitWatch: "فیت وۆچ"
  ,fitWatchDesc: "ئاماری کاتی ڕاستەقینە لەسەر مەچەکەت"
  ,gymBeats: "جیم بیتس"
  ,gymBeatsDesc: "لیستی گۆرانی هەڵبژێردراو بۆ وەرزش"
  ,tapToNext: "دەست لێبدە بۆ دواتر"
  ,fullBodyStrength: "هێزی تەواوی جەستە"
  ,workoutMinExercises: "8 وەرزش • 45 خولەک"
  ,mealPlan: "پلانی خواردن"
  ,mealsAndSnacks: "3 خواردن • 2 خواردنەوەی سووک"
  ,physiotherapy: "فیزیۆتەراپی"
  ,mobilitySession: "دانیشتنی جوڵە • 20 خولەک"
  // Profile & Fitness Info (KU placeholders)
  ,myProfileHeading: "پڕۆفایلی من"
  ,manageFitnessProfileDesc: "پڕۆفایل و ئامانجە تەندروستییەکانت بەڕێوەبەرێ"
  ,premiumMember: "ئەندامی پریمێم"
  ,fitnessInformation: "زانیاری تەندروستی"
  ,primaryGoal: "ئامانجی سەرەکی"
  ,activityLevel: "ئاستی چالاکی"
  ,buildMuscle: "چوونی ماسولە"
  ,weightLoss: "کەمکردنەوەی کێش"
  ,endurance: "بەردەوامی"
  ,flexibility: "نرمی"
  ,sedentary: "بێ جوڵە"
  ,lightlyActive: "هەندێک چالاک"
  ,moderatelyActive: "ناوەند چالاک"
  ,veryActive: "زۆر چالاک"
  ,saveFitnessInfo: "خەزنکردنی زانیاری تەندروستی"
    // Settings page (KU placeholders)
    ,accountSecurityTitle: "ئاسایشەکانی هەژمار"
    ,notificationPreferencesTitle: "هەڵبژاردەکانی ئاگانامە"
    ,privacySettingsTitle: "ڕێکخستنەکانی تایبەتمەندی"
    ,workoutReminders: "بیرخەرەوەکانی وەرزش"
    ,workoutRemindersDesc: "بیرت بکرێنەوە بۆ تەواوکردنی وەرزش"
    ,progressUpdates: "نوێکارییەکانی پێشکەوتن"
    ,progressUpdatesDesc: "ئاگانامە دەربارەی پێشکەوتنت"
    ,emailNotifications: "ئاگانامەی ئیمەیڵ"
    ,emailNotificationsDesc: "پوختەی هەفتانەی تەندروستی وەرگرە"
    ,updatePassword: "نوێکردنەوەی وشەی نهێنی"
    ,savePreferences: "هەلگرتنی هەڵبژاردەکان"
    ,savePrivacySettings: "هەلگرتنی ڕێکخستنەکانی تایبەتمەندی"
    ,dangerZone: "ناوچەی مەترسیدار"
    ,deleteAccount: "سڕینەوەی هەژمار"
    ,profileVisibility: "دەرکەوتنی پڕۆفایل"
    ,profileVisibilityDesc: "ڕێگە بە کەسانی تر بدە بینینی پڕۆفایلەکەت"
    ,showProgress: "پیشاندانی پێشکەوتن"
    ,showProgressDesc: "ئامارەکانی تەندروستی بە ئاشکرا پیشان بدە"
    ,currentPassword: "وشەی نهێنیی ئێستا"
    ,newPassword: "وشەی نهێنیی نوێ"
    ,confirmPassword: "دڵنیاکردنەوەی وشەی نهێنی"
    ,enterCurrentPassword: "وشەی نهێنیی ئێستا بنووسە"
    ,enterNewPassword: "وشەی نهێنیی نوێ بنووسە"
      ,confirmNewPassword: "وشەی نهێنیی نوێ پشتڕاست بکەرەوە"
      ,membershipPlans: "پلانی ئەنەندامێتی"
      ,monthly: "مانگانە"
      ,yearly: "ساڵانە"
      ,savePercent: "17٪ پاشەکەوت بکە"
      ,freePlan: "بێ‌بەرامبەر"
      ,premiumPlan: "پریمێم"
      ,proPlan: "پڕۆ"
      ,idealForBeginners: "گونجاو بۆ دەستپێکەران"
      ,mostPopularChoice: "زۆرترین هەڵبژاردە"
      ,forProfessionalAthletes: "بۆ وەرزشکارانی پڕۆفیشنال"
      ,ultimateFitnessTransformation: "گۆڕانی کۆتایی تەندروستی"
      ,oneMonth: "١ مانگ"
      ,threeMonths: "٣ مانگ"
      ,sixMonths: "٦ مانگ"
      ,oneYear: "١ ساڵ"
      ,mostPopularBadge: "زۆرترین بەناوبانگ"
      ,limitations: "سنوورەکان"
      ,faqTitle: "پرسیارە دووبارە بووەکان"
      ,getStarted: "دەست پێ بکە"
      ,subscribeNow: "ئاڕاستەی بەشداریکردن"
      ,frequentlyAskedQuestions: "پرسیارە دووبارە بووەکان"
      ,faqChangePlanQ: "دەمە توانم پلانی بگۆڕم؟"
      ,faqChangePlanA: "بەڵێ، دەتوانیت هەر کاتێک پلانی بەرز یان نزم بکەیت و گۆڕانکاری لە مانگی داهاتوو دەچێت."
      ,faqFreeTrialQ: "تاقیکردنەوەی خۆرای هەیە؟"
      ,faqFreeTrialA: "بەڵێ! ئەندامانی نوێ 7 ڕۆژ دەستگەیشتن دەبێت بە تایبەتمەندیەکانی پریمێم بە بێ کارت."
      ,faqPaymentMethodsQ: "کام ڕێگا پارەدان هەن؟"
      ,faqPaymentMethodsA: "هەموو کارتە گەورەکان دەگرینەوە و PayPal."
      ,faqDataSecureQ: "داتاکەم ئاسایە؟"
      ,faqDataSecureA: "داتاکەت بە SSL 256-bit پارێزراوە و ڕۆژانە باکئەپ دەکرێت."
      // Payment Page (Kurdish)
      ,payment: "پارەدان"
      ,paymentInformation: "زانیاری پارەدان"
      ,cardInformation: "زانیاری کارت"
      ,cardholderName: "ناوی خاوەنی کارت"
      ,cardNumber: "ژمارەی کارت"
      ,expiration: "بەسەرچوون"
      ,cvv: "کۆدی ئاسایش"
      ,billingAddress: "ناونیشانی وەسڵ"
      ,address: "ناونیشان"
      ,city: "شار"
      ,postalCode: "کۆدی پۆستە"
      ,processing: "پڕۆسەکردن..."
      ,pay: "پارەدان"
      ,securePayment: "پارەدانی پارێزراو"
      ,securePaymentSSL: "پارەدانی پارێزراو - پارێزراوە بە شفرەکردنی SSL"
      ,orderSummary: "کورتەی داواکاری"
      ,oneTimePayment: "پارەدانی یەکجارەکی"
      ,subtotal: "کۆی گشتی"
      ,platformFee: "کرێی پلاتفۆرم"
      ,tax: "باج"
      ,total: "کۆی گشتی"
      ,includedInPlan: "لەم پلانەدا:"
      ,completeExerciseLibrary: "کۆگەی تەواوی وەرزشی"
      ,detailedProgressTracking: "شوێنکەوتنی ورد بۆ پێشکەوتن"
      ,prioritySupport: "پشتیوانی پێشگرتن"
      ,securePaymentInfo: "زانیاری پارەدانەکەت بە شفرەکردنی SSL 256-bit پارێزراوە. زانیاری کارت هەڵناگیرێت."
      ,cardInfoNotStored: "زانیاری کارت هەڵناگیرێت"
      // Payment Placeholders (Kurdish)
      ,cardholderNamePlaceholder: "ناوی یەکەم ناوی کۆتایی"
      ,streetNeighborhoodPlaceholder: "شەقام، گەڕەک"
      ,cityPlaceholder: "هەولێر"
      ,postalCodePlaceholder: "٤٤٠٠١"
      // Membership Page (Kurdish)
      ,chooseYourPlan: "پلانەکەت هەڵبژێرە"
      ,selectPerfectPlan: "باشترین پلان هەڵبژێرە بۆ گەشتی تەندروستیت"
      // Premium Feature Locked (Kurdish)
      ,premiumFeatureLocked: "تایبەتمەندی پریمیەم داخراوە"
      ,featureRequiresSubscription: "ئەم تایبەتمەندیە پێویستی بە بەشداریی چالاک هەیە. تکایە بەشداریەکەت نوێ بکەرەوە بۆ بەردەوامبوون لە دەستگەیشتن بە ناوەڕۆکی پریمیەم."
      ,renewSubscription: "نوێکردنەوە"
      ,backToDashboard: "گەڕانەوە بۆ داشبۆرد"
      ,redirectingToDashboard: "گواستنەوە بۆ داشبۆرد لە ماوەی ٣ چرکەدا..."
      ,backToLogin: "گەڕانەوە بۆ چوونەژوورەوە"
      ,createAccountTitle: "دروستکردنی هەژمار"
      ,signupSubtitle: "دەست بکە بە گەشتێکی تەندروستی لەگەڵ FitPro"
      ,mustBeAtLeast8Chars: "بە دەیترین 8 پیت بێت"
      ,termsAgreement: "ڕازی دەبم بە"
      ,termsOfService: "مەرجەکانی خزمەتگوزاری"
      ,privacyPolicy: "سیاسەتی تایبەتمەندی"
      ,creatingAccount: "دروستکردنی هەژمار..."
      ,passwordsDoNotMatch: "وشە نهێنییەکان ناکۆن"
      ,pleaseFillAllFields: "تکایە هەموو خانەکان پڕبکە"
      ,pleaseAgreeTerms: "تکایە ڕازی بە مەرجەکان ببە"
      ,registrationFailed: "تۆمارکردن سەرکەوتوو نەبوو. تکایە دووبارە هەوڵبدەرەوە."
      ,emailAlreadyInUse: "ئەم ئیمەیڵە پێشتر تۆمارکراوە"
      ,passwordTooWeak: "وشەی نهێنی دەبێت لانیکەم ٦ پیت بێت"
      ,invalidEmail: "ئیمەیڵەکە دروست نییە"
      ,alreadyHaveAccount: "پێشتر هەژمارت هەیە؟"
      ,signInLink: "چوونەژوورەوە"
      // Subscription Warning (Kurdish)
      ,subscriptionExpired: "بەشداریت بەسەرچووە"
      ,actionRequired: "کردار پێویستە"
      ,subscriptionExpiredMessage: "بەشداریی مانگانەت کۆتایی هاتووە. نوێکردنەوە بکە بۆ بەردەوامی دەستگەیشتن بە تایبەتمەندیە پریمیەمەکان وەک پلانی خۆراک و پڕۆگرامی وەرزش."
      ,workoutPrograms: "پڕۆگرامی وەرزش 💪"
      ,mealPlans: "پلانی خۆراک 🍽️"
      ,expertSupport: "پشتگیری پسپۆڕان 👨‍⚕️"
      ,renewSubscriptionNow: "سەردانی ئۆفیس بکە بۆ نوێکردنەوەی ئیشتراک"
      ,subscriptionExpiringSoon: "بەشداری بە زوویی بەسەردەچێت"
      ,subscriptionExpiresInDays: "بەشداریەکەت لە ماوەی"
      ,renewNow: "نوێکردنەوە ئێستا"
      ,professionalInformation: "زانیاری پڕۆفیشنال"
      ,yearsOfExperience: "ساڵانی ئەزموون"
      ,certification: "بەڵگەنامە"
      ,specialization: "تایبەتمەندی"
      ,saveProfessionalInfo: "خەزنکردنی زانیاری پڕۆفیشنال"
      ,security: "ئاسایش"
      ,changePassword: "گۆڕینی وشەی نهێنی"
      ,administratorPrivileges: "مافی بەڕێوەبەر"
      ,adminProfile: "پڕۆفایلی ئەدمین"
      ,editAdminProfile: "دەستکاری پڕۆفایلی ئەدمین"
      ,licensedPhysiotherapist: "فیزیۆتەراپیستی مۆڵەتدار"
      ,certifiedFitnessTrainer: "ڕاهێنەری تەندروستی بەڵگەدار"
      ,department: "دەپارتەمێنت"
      ,licenseNumber: "ژمارەی مۆڵەت"
      ,patientPanelTitle: "پەنێڵی نەخوش"
      ,welcomeGreeting: "بەخێربێیت"
      ,registrationDate: "بەرواری تۆمارکردن"
      ,status: "بارودۆخ"
      ,access: "دەستگەیشتن"
      ,fullPermission: "دەسەڵاتی تەواو"
      ,patientPanelDevelopment: "پەنێڵی نەخوش لە پەرەپێدایدە"
      ,patientPanelDescription: "بە زوویدا دەتوانیت وەسفەکان، وەرزشە دیاریکراوەکان و پێشکەوتن ببینیت و پەیوەندی بکەیت."
      ,comingSoon: "بە زوویدا"
    ,authorizedAccessOnly: "تەنیا دەسەڵاتی پێدراو"
    ,onlyRegisteredPhysiotherapists: "تەنیا فیزیۆتەراپیستانی تۆماربوو دەستگەیشتن هەیە"
    ,accessPatientManagement: "دەستگەیشتن بە بەڕێوەبردنی نەخوشەکانت"
    ,physiotherapistPortalFooter: "© 2024 فیتپرو پورتالی فیزیۆتەراپیست"
    // Workout Center & Schedule (Kurdish)
    ,workoutCenter: "ناوەندی وەرزش"
    ,workoutCenterSubtitle: "پلان دروست بکە، دەست پێ بکە و پێداچوونەوەی ڕاهێنانەکانت بکە"
    ,buildYourStrength: "هێزەکەت بنیات بنێ"
    ,buildYourStrengthDesc: "پێداچوونەوە بکە بۆ پێشکەوتنەکەت و ئامانجە تەندروستییەکانت بگەیەنە"
    ,todaysWorkoutWednesday: "وەرزشی ئەمڕۆ - چوارشەممە"
    ,schedule: "خشتە"
    ,today: "ئەمڕۆ"
    ,week: "هەفتە"
    ,monthView: "مانگ"
    ,monday: "دووشەممە"
    ,tuesday: "سێشەممە"
    ,wednesday: "چوارشەممە"
    ,thursday: "پێنجشەممە"
    ,friday: "هەینی"
    ,saturday: "شەممە"
    ,sunday: "یەکشەممە"
    ,mon: "دوو"
    ,tue: "سێ"
    ,wed: "چوار"
    ,thu: "پێنج"
    ,fri: "هەینی"
    ,sat: "شەممە"
    ,sun: "یەک"
    ,chest: "سنگ"
    ,backMuscle: "پشت"
    ,legs: "قاچەکان"
    ,shoulders: "شان"
    ,arms: "باڵ"
    ,core: "ناوەند"
    ,restAndRecovery: "پشوو و چاککردنەوە"
    ,exercisesCount: "وەرزش"
    ,rest: "پشوو"
    ,workout: "وەرزش"
    ,exerciseFirst: "یاری یەکەم"
    ,exerciseSecond: "یاری دووەم"
    ,exerciseThird: "یاری سێیەم"
    ,exerciseFourth: "یاری چوارەم"
    ,exerciseFifth: "یاری پێنجەم"
    ,exerciseSixth: "یاری شەشەم"
    ,exerciseSeventh: "یاری حەوتەم"
    ,exerciseEighth: "یاری هەشتەم"
    ,exerciseNinth: "یاری نۆیەم"
    ,exerciseTenth: "یاری دەیەم"
    ,sets: "سێت"
    ,reps: "دووبارە"
    ,calories: "کالۆری"
    ,carbs: "کاربۆ"
    ,fat: "چەوری"
    ,ingredients: "پێکهاتەکان"
    ,recipe: "ڕێچکە"
    ,recipeInstructions: "ڕێنماییەکانی ڕێچکە"
    ,mealType: "جۆری خواردن"
    ,mealImage: "وێنەی خواردن"
    ,mealPhoto: "وێنەی خواردن"
    ,todaysMeals: "خواردنی ئەمڕۆ"
    ,importantNotes: "تێبینییە گرنگەکان"
    // Meals & Nutrition (Kurdish)
    ,mealsAndNutrition: "خواردن و خۆراکی تەندروستی"
    ,trackDailyMealsDesc: "پێداچوونەوە بکە بۆ خواردنی ڕۆژانە و ئامانجی ماکرۆکان"
    ,fuelYourBodyRight: "سووتەمەنی جەستەت بە باشی دابین بکە"
    ,fuelYourBodyRightDesc: "هاوسەنگی بخە بەسەر خۆراکەکەتدا و ئامانجە تەندروستییەکانت بگەیەنە"
    ,protein: "پرۆتین"
    ,caloriesTodayLabel: "کالۆریی ئەمڕۆ"
    ,dailyGoal: "ئامانجی ڕۆژانە"
    ,mealsLogged: "خواردنی تۆمارکراو"
    // Physio Panel (Kurdish)
    ,physiotherapyTitle: "فیزیۆتەراپی"
    ,physioSubtitle: "داوای نۆبە بکە و پێداچوونەوە بکە بۆ چاکبوونەوەی برینەکەت"
    ,recoverAndHeal: "چاکبوونەوە و ساڕێژبوون"
    ,recoverAndHealDesc: "پشتگیری پسپۆڕانەی فیزیۆتەراپی بۆ گەشتی چاکبوونەوەت"
    ,completedLabel: "تەواوکراوەکان"
    ,requestsLabel: "داواکاریەکان"
    ,totalRequests: "کۆی داواکاریەکان"
    ,recoveryRate: "ڕێژەی چاکبوونەوە"
    ,pendingLabel: "چاوەڕوان"
    ,sendRequest: "ناردنی داواکاری"
    ,selectPhysiotherapist: "فیزیۆتەراپیستێک هەڵبژێرە"
    ,injuryType: "جۆری برین"
    ,injuryTypePlaceholder: "وەک: برینی بەستەری ئەژنۆ"
    ,painPercentage: "ڕێژەی ئازار"
    ,notesOptional: "تێبینیەکان (دڵخواز)"
    ,notesPlaceholder: "زانیاری زیاتر..."
    ,yourRequests: "داواکاریەکانت"
    ,noRequestsYet: "هێشتا داواکاریەک نییە"
    // Profile Section (Kurdish)
    ,subscriptionAndAccessKey: "بەشداری و کلیلی دەستگەیشتن"
    ,yourAccessKey: "کلیلی دەستگەیشتنت"
    ,personalIdentifier: "ناسنامەی تایبەتی"
    ,statusLabel: "بارودۆخ"
    ,remainingLabel: "ماوە"
    ,joinedLabel: "بەشداربوویت"
    ,expiresLabel: "بەسەردەچێت"
    ,accessKeyNote: "تێبینی: کلیلی دەستگەیشتنەکەت تایبەتە بە هەژمارەکەت. پارێزگاری لێ بکە و بەکاری بهێنە کاتێک پەیوەندی دەکەیت بە پشتیوانی یان دەستگەیشتن بە تایبەتمەندیە پریمیەمەکان."
    ,account: "هەژمار"
    ,manageLabel: "بەڕێوەبردن"
    ,stats: "ئامارەکان"
    ,goalLabel: "ئامانج"
    ,heightLabel: "باڵا"
    ,weightLabel: "کێش"
    ,shortcuts: "کورتکردنەوەکان"
    ,physioLabel: "فیزیۆ"
    ,mealsLabel: "خواردن"
    ,workoutLabel: "وەرزش"
    ,preferences: "هەڵبژاردنەکان"
    ,appearance: "دەرکەوتن"
    ,light: "ڕووناک"
    ,dark: "تاریک"
    ,system: "سیستەم"
    ,systemFollowsOS: "سیستەم شوێن ڕوکاری سیستەمی کارگێڕەکەت دەکەوێت."
    ,pushNotifications: "ئاگانامەی پێش"
    ,applyLanguage: "جێبەجێکردنی زمان"
    ,accountActions: "کردارەکانی هەژمار"
    ,accountActionsDesc: "دەرچوون دەبێتە هۆی پاککردنەوەی دانیشتنەکەت و گەڕانەوەت بۆ پەڕەی چوونەژوورەوە."
    ,logoutButton: "دەرچوون"
    // Manage Profile Dialog (Kurdish)
    ,manageProfile: "بەڕێوەبردنی پڕۆفایل"
    ,changeAvatar: "گۆڕینی وێنە"
    ,avatarSizeNote: "PNG/JPG تا 2MB."
    ,personal: "تایبەتی"
    ,fullName: "ناوی تەواو"
    ,phoneLabel: "تەلەفۆن"
    ,joinDate: "بەرواری پەیوەندی"
    ,goal: "ئامانج"
    ,experience: "ئەزموون"
    ,physical: "جەستەیی"
    ,weight: "کێلۆ"
    ,height: "باڵایی"
    ,current: "ئێستا"
    ,new: "نوێ"
    ,confirm: "دڵنیاکردنەوە"
    ,changePasswordLabel: "گۆڕینی وشەی نهێنی"
    ,currentPasswordLabel: "ئێستا"
    ,newPasswordLabel: "نوێ"
    ,confirmPasswordLabel: "پشتڕاستکردنەوە"
    ,saved: "پاشەکەوتکرا"
    ,welcomeBack: "بەخێربێیتەوە"
    // Dashboard Stats (Kurdish)
    ,totalTime: "کاتی گشتی"
    ,caloriesBurned: "کالۆری سووتاو"
    // Workout Exercise Names (Kurdish - kept in English)
    ,barbellBenchPress: "Barbell Bench Press"
    ,inclineDumbbellPress: "Incline Dumbbell Press"
    ,cableFlyes: "Cable Flyes"
    ,focusControlledMovement: "سەرنج بدە بە جووڵەی کۆنترۆڵکراو"
    ,squeezeAtPeak: "لە بەرزترین خاڵدا فشاری بدە"
    ,keepBackStraightEngageCore: "پشتت ڕاست بگرە، ناوەند بەهێز بکە"
    ,goDeepKeepChestUp: "قووڵ ببەرەوە خوارەوە، سنگ بەرز بگرەوە"
    ,lightStretchingYogaWalking: "درێژکردنەوەی سووک، یۆگا، یان ڕێگرتن"
    // Notifications Dialog (Kurdish)
    ,notificationsTitle: "ئاگانامەکان"
    ,milestoneReached: "گەیشتن بە خاڵی گرنگ"
    ,milestoneReachedDesc: "تۆ 20 وەرزشت تەواو کرد! بەردەوام بە لەسەر کارە نایابەکەت!"
    ,workoutReminder: "بیرخستنەوەی وەرزش"
    ,workoutReminderDesc: "لەبیرت مەکەیت بۆ تەواوکردنی وەرزشی ئێوارەکەت"
    ,progressUpdate: "نوێکردنەوەی پێشکەوتن"
    ,progressUpdateDesc: "تۆ 2kg لەم مانگەدا لەدەست داوە. پێشکەوتنێکی نایاب!"
    ,close: "داخستن"
    // Placeholders for Create Program dialogs (Kurdish)
    ,exampleKetoDiet: "نموونە: پلانی خۆراکی کیتۆ"
    ,exampleFullBodyWorkout: "نموونە: وەرزشی هەموو جەستە"
    ,enterProgramDescription: "پێناسەی بەرنامە بنووسە..."
    ,example30mins: "نموونە: 30 خولەک"
    ,example2000: "نموونە: 2000"
    ,example150: "نموونە: 150"
    ,example200: "نموونە: 200"
    ,example60: "نموونە: 60"
    ,exampleChestShouldersTriceps: "نموونە: سنگ، شان، ترایسێپس"
    ,exampleImageUrl: "https://example.com/image.jpg"
    // Superadmin Dashboard (Kurdish)
    ,superadminDashboard: "داشبۆردی سوپەرئادمین"
    ,systemManagementControl: "بەڕێوەبردن و کۆنترۆڵی سیستەم"
    ,users: "بەکارهێنەران"
    ,keys: "کلیلەکان"
    ,activeNow: "چالاک"
    ,growth: "گەشەکردن"
    ,totalActive: "کۆی چالاک"
    ,accessKeysLabel: "کلیلەکانی دەستگەیشتن"
    ,onlineNow: "ئێستا سەرهێڵ"
    ,thisMonth: "ئەم مانگە"
    ,quickActions: "کردارە خێراکان"
    ,manageUsers: "بەڕێوەبردنی بەکارهێنەران"
    ,generateKeys: "دروستکردنی کلیل"
    ,viewReports: "بینینی ڕاپۆرتەکان"
    ,systemStatus: "دۆخی سیستەم"
    ,database: "بنکەی دراوە"
    ,apiServer: "سێرڤەری API"
    ,storage: "کۆگا"
    ,healthy: "تەندروست"
    ,running: "کاردەکات"
    ,percentUsed: "بەکارهاتوو"
    ,trainers: "ترەینەرەکان"
    ,totalTrainers: "کۆی گشتی ترەینەرەکان"
    // Users Management (Kurdish)
    ,userManagementTitle: "بەڕێوەبردنی بەکارهێنەران"
    ,manageYourUsers: "بەڕێوەبردن و چاودێریکردنی هەموو بەکارهێنەران"
    ,statistics: "ئامارەکان"
    ,allUsers: "هەموو بەکارهێنەران"
    ,searchUsers: "گەڕان بۆ بەکارهێنەران..."
    ,addNewUser: "زیادکردنی بەکارهێنەری نوێ"
    ,viewProfile: "بینینی پڕۆفایل"
    ,editUser: "دەستکاریکردنی بەکارهێنەر"
    ,deleteUser: "سڕینەوەی بەکارهێنەر"
    ,active: "چالاک"
    ,inactive: "ناچالاک"
    ,membership: "ئەندامیەتی"
    ,accountSettings: "ڕێکخستنەکانی هەژمار"
    ,personalInformation: "زانیاری کەسی"
    ,fullNameLabel: "ناوی تەواو"
    ,emailAddressLabel: "ئیمەیڵ"
    ,phoneNumberLabel: "ژمارەی تەلەفۆن"
    ,locationLabel: "شوێن"
    ,roleLabel: "ڕۆڵ"
    ,passwordLabel: "وشەی نهێنی"
    ,trainersAlwaysActive: "مڕەببی و سوپەرئادمین هەمیشە چالاکن"
    ,saveChanges: "پاشەکەوتکردنی گۆڕانکاریەکان"
    ,cancel: "پاشگەزبوونەوە"
    ,cancelAction: "پاشگەزبوونەوە"
    ,deleteUserTitle: "سڕینەوەی بەکارهێنەر"
    ,areYouSure: "دڵنیایت؟"
    ,actionCannotBeUndone: "ئەم کردارە ناگەڕێتەوە"
    ,confirmDelete: "پشتڕاستکردنەوەی سڕینەوە"
    ,proRequests: "داواکارییەکانی پڕۆ"
    ,proRequestsDescription: "پێداچوونەوە و پەسەندکردنی داواکارییەکانی بەرزکردنەوە بۆ پڕۆ"
    ,upgradeRequests: "داواکارییەکانی بەرزکردنەوە"
    ,noPendingRequests: "هیچ داواکارییەکی چاوەڕوانکراو نییە"
    ,requestFrom: "داواکاری لە"
    ,requestDetails: "وردەکاریەکانی داواکاری"
    ,approve: "پەسەندکردن"
    ,reject: "ڕەتکردنەوە"
    ,pending: "چاوەڕوانکراو"
    ,approved: "پەسەندکراو"
    ,rejected: "ڕەتکراوەتەوە"
    // Access Keys Page (Kurdish)
    ,accessKeysPage: "کلیلەکانی دەستگەیشتن"
    ,generateAndManageKeys: "دروستکردن و بەڕێوەبردنی کلیلەکانی دەستگەیشتن"
    ,generateNewKey: "دروستکردنی کلیلی نوێ"
    ,generating: "دروستدەکرێت..."
    ,totalKeys: "کۆی کلیلەکان"
    ,expired: "بەسەرچووە"
    ,quickKeyGenerator: "دروستکەری خێرای کلیل"
    ,generateKeysInstantly: "دروستکردنی کلیلەکانی دەستگەیشتن بۆ ئەندامانی نوێ بە خێرایی"
    ,trialOneUse: "تاقیکردنەوە (1 بەکارهێنان)"
    ,standardFiveUses: "ئاسایی (5 بەکارهێنان)"
    ,premiumTenUses: "پڕۆ (10 بەکارهێنان)"
    ,allAccessKeys: "هەموو کلیلەکانی دەستگەیشتن"
    ,keyColumn: "کلیل"
    ,typeColumn: "جۆر"
    ,usesColumn: "بەکارهێنان"
    ,statusColumn: "دۆخ"
    ,expiresColumn: "بەسەردەچێت"
    ,actionsColumn: "کردارەکان"
    ,trial: "تاقیکردنەوە"
    ,standard: "ئاسایی"
    ,premium: "پڕۆ"
    ,used: "بەکارهاتوو"
    ,copyKey: "کۆپی کردنی کلیل"
    // Analytics Page (Kurdish)
    ,analyticsDashboard: "داشبۆردی شیکاری"
    ,trackPerformance: "چاودێریکردنی کارکرد و تێگەیشتنەکان"
    ,loadingAnalytics: "بارکردنی شیکاری..."
    ,keyMetrics: "پێوەرە سەرەکیەکان"
    ,totalUsers: "کۆی بەکارهێنەران"
    ,activeUsers24h: "بەکارهێنەرە چالاکەکان (24 کاتژمێر)"
    ,proMembers: "ئەندامانی پڕۆ"
    ,totalWorkouts: "کۆی وەرزشەکان"
    ,userGrowth: "گەشەی بەکارهێنەران"
    ,userDistribution: "دابەشبوونی بەکارهێنەران"
    ,recentActivity: "چالاکی دواییان"
    ,newUserRegistered: "بەکارهێنەری نوێ تۆمارکرا"
    // Database Page (Kurdish)
    ,databaseManagement: "بەڕێوەبردنی بنکەی دراوە"
    ,monitorDatabase: "چاودێری و بەڕێوەبردنی کردارەکانی بنکەی دراوە"
    ,refresh: "نوێکردنەوە"
    ,backup: "کۆپی پاشەکەوت"
    ,creatingBackup: "دروستکردنی کۆپی پاشەکەوت..."
    ,healthStatus: "دۆخی تەندروستی"
    ,databaseStatus: "دۆخی بنکەی دراوە"
    ,allSystemsOperational: "هەموو سیستەمەکان کاردەکەن"
    ,lastChecked: "دوایین پشکنین"
    ,justNow: "هەر ئێستا"
    ,uptime: "کاتی کارکردن"
    ,storageUsed: "کۆگای بەکارهاتوو"
    ,totalRecords: "کۆی تۆمارەکان"
    ,activeConnections: "بەکارهێنەرە چالاکەکان"
    ,collectionsColumn: "کۆمەڵەکان"
    ,collectionsOverview: "سەرنجی کۆمەڵەکان"
    ,loadingCollections: "بارکردنی کۆمەڵەکان..."
    ,documents: "بەڵگەنامەکان"
    ,view: "بینین"
    ,recentBackups: "کۆپی پاشەکەوتە دواییەکان"
    ,noBackupsYet: "هێشتا کۆپی پاشەکەوت نییە"
    ,createFirstBackup: "یەکەم کۆپی پاشەکەوتت دروست بکە لە سەرەوە"
    ,success: "سەرکەوتوو"
    ,maintenance: "چاککردنەوە"
    ,optimizeDatabase: "باشترکردنی بنکەی دراوە"
    ,optimizing: "باشتردەکرێت..."
    ,createBackupNow: "ئێستا کۆپی پاشەکەوت دروست بکە"
    ,restoreFromBackup: "گەڕانەوە لە کۆپی پاشەکەوت"
    ,clearCache: "پاککردنەوەی کاش"
    ,clearing: "پاکدەکرێتەوە..."
    // Programs Page (Kurdish)
    ,programsManagement: "بەڕێوەبردنی پرۆگرامەکان"
    ,createAndManagePrograms: "دروستکردن و بەڕێوەبردنی پرۆگرامەکانی ڕاهێنان و خۆراک"
    ,nutritionPrograms: "پرۆگرامەکانی خۆراک"
    ,workoutPrograms: "پرۆگرامەکانی ڕاهێنان"
    ,searchPrograms: "گەڕان بۆ پرۆگرامەکان..."
    ,createNewProgram: "دروستکردنی پرۆگرامی نوێ"
    ,createNutritionProgram: "دروستکردنی بەرنامەی خواردن"
    ,programName: "ناوی پرۆگرام"
    ,description: "وەسف"
    ,assignToUsers: "دیاریکردن بۆ بەکارهێنەران"
    ,selectUsers: "بەکارهێنەران هەڵبژێرە"
    ,searchByName: "گەڕان بە ناو..."
    ,searchByNameOrEmail: "گەڕان بە ناو یان ئیمەیڵ..."
    ,selected: "هەڵبژێردراو"
    ,weeklySchedule: "خشتەی هەفتانە"
    ,addMeal: "زیادکردنی ژەمی خۆراک"
    ,addExercise: "زیادکردنی ڕاهێنان"
    ,mealLibrary: "کتێبخانەی ژەمە خۆراکەکان"
    ,exerciseLibrary: "کتێبخانەی ڕاهێنانەکان"
    ,calories: "کالۆری"
    ,protein: "پرۆتین"
    ,carbs: "کاربۆهایدرات"
    ,fats: "چەوری"
    ,sets: "سێتەکان"
    ,reps: "دووبارەکردنەوەکان"
    ,rest: "پشوو"
    ,instructions: "ڕێنماییەکان"
    ,ingredients: "پێکهاتەکان"
    ,noProgramsFound: "هیچ پرۆگرامێک نەدۆزرایەوە"
    ,createFirstProgram: "یەکەم پرۆگرامەکەت لە سەرەوە دروست بکە"
    ,imageUrl: "لینکی وێنە"
    ,userSelection: "هەڵبژاردنی یوزەرەکان"
    ,onlyProUsers: "تەنها یوزەرە پرۆکان (بەبێ فریی و ئەدمین)"
    ,selectAllUsers: "هەڵبژاردنی هەموو"
    ,clearAll: "سڕینەوەی هەموو"
    ,noteLabel: "تێبینی:"
    ,onlyProUsersShown: "تەنها یوزەرە پرۆکان پیشان دەدرێن"
    ,freeUsersHidden: "یوزەری فریی شاراوەیە"
    ,adminsHidden: "ئەدمین، سوپەرئەدمین، فیزیۆ، تریینەر شاراوەن"
    ,setMealsForEachDay: "خواردنەکانی هەر رۆژێک دیاری بکە"
    ,restDay: "رۆژی پشوو؟"
    ,noMealsAdded: "هیچ خواردنێک زیاد نەکراوە"
    ,copyToAnotherDay: "کۆپی بۆ رۆژی تر"
    ,weekSummary: "پوختەی هەفتە:"
    ,activeDays: "چالاک"
    ,restDays: "پشوو"
    ,totalMeals: "خواردن"
    ,uniqueMeals: "جیاواز"
    ,fillBasicInfo: "زانیاریەکانی سەرەتایی پڕبکەرەوە (ناو، وەسف، کات...)"
    ,whenComplete: "کاتێک تەواو بووی کلیک لە پاشەکەوتکردن بکە"
    ,clickSave: "کلیک لە پاشەکەوتکردن بکە"
    ,level: "ئاست"
    ,beginner: "سەرەتایی"
    ,intermediate: "مامناوەند"
    ,advanced: "پێشکەوتوو"
    ,monday: "دووشەممە"
    ,tuesday: "سێشەممە"
    ,wednesday: "چوارشەممە"
    ,thursday: "پێنجشەممە"
    ,friday: "هەینی"
    ,saturday: "شەممە"
    ,sunday: "یەکشەممە"
    ,selectDayFrom7Days: "رۆژێک هەڵبژێرە لە 7 رۆژەکە (دووشەممە تا یەکشەممە)"
    ,clickAddExercise: "کلیک لە 'زیادکردنی یاری' بکە بۆ زیادکردنی یاری"
    ,canAddMultipleExercises: "دەتوانی چەند یارییەک زیاد بکەیت بۆ هەر رۆژێک"
    ,ifRestDayTurnOn: "ئەگەر رۆژێک پشوو بێت، 'رۆژی پشوو' لەسەر ON بکە"
    ,noPROusers: "هیچ یوزەرێکی ئاسایی (user) بە PRO نییە"
    ,noUsersFound: "هیچ یوزەرێک نەدۆزرایەوە"
    ,freeUsersNotShown: "یوزەرە فریەکان و ئەدمین/فیزیۆ پیشان نادرێن"
    ,programWillBeSentTo: "ئەم بەرنامەیە بۆ"
    ,PROusers: "یوزەری PRO دەنێردرێت"
    ,setMealsDescription: "خواردنەکانی هەر رۆژێک دیاری بکە"
    ,targetMuscles: "ماسوولکەی ئامانج"
    ,noExercisesAdded: "هیچ یارییەک زیاد نەکراوە"
    ,addExerciseButton: "زیادکردنی یاری"
    ,copyToDay: "کۆپی بۆ رۆژی تر"
    ,weekSummaryLabel: "پوختەی هەفتە:"
    ,activeLabel: "چالاک"
    ,restLabel: "پشوو"
    ,exercisesLabel: "یاری"
    ,uniqueLabel: "جیاواز"
    ,noMealsAdded: "هیچ خواردنێک زیاد نەکراوە"
    ,addMeal: "زیادکردنی خواردن"
    ,copyMealToOtherDay: "کۆپی بۆ ڕۆژی تر"
    ,restDayMessage: "ڕۆژی پشووە 😴"
    ,timeForRestAndRecovery: "کاتی ئاسایش و باشبوونەوەیە"
    ,weekSummary: "پوختەی هەفتە:"
    ,active: "چالاک"
    ,rest: "پشوو"
    ,meals: "خواردن"
    ,different: "جیاواز"
    ,weekUniqueMeals: "خواردنە جیاوازەکانی هەفتە"
    ,types: "جۆر"
    ,mealLibrary: "کتێبخانەی خواردن"
    ,savedMeals: "خواردنە هەڵگیراوەکان"
    ,saveMealToLibrary: "خەزنکردن بۆ کتێبخانە"
    ,weekUniqueExercises: "یارییە جیاوازەکانی هەفتە"
    ,setMealsForEachDay: "خواردنەکانی هەر رۆژێک دیاری بکە"
    ,setExercisesForEachDay: "یارییەکانی هەر رۆژێک دیاری بکە"
    ,mealName: "ناوی خواردن"
    ,mealCategory: "پۆلی خواردن"
    ,macros: "ماکرۆکان"
    ,caloriesRequired: "کالۆری *"
    ,proteinG: "پرۆتین (g)"
    ,carbsG: "کاربز (g)"
    ,fatsG: "چەورە (g)"
    ,ingredients: "پێکهاتەکان"
    ,ingredientsOptional: "پێکهاتەکان (ئیختیاری)"
    ,instructionsOptional: "ڕێنمایی (ئیختیاری)"
    ,notesOptional: "تێبینی (ئیختیاری)"
    ,mealImage: "وێنەی خواردن"
    ,mealImageOptional: "وێنەی خواردن (ئیختیاری)"
    ,selectFromGallery: "هەڵبژاردن لە گالەری"
    ,orEnterImageLink: "یان لینکی وێنە بنووسە..."
    ,importantNote: "تێبینی گرنگ:"
    ,onlyNameCaloriesRequired: "تەنها ناو و کالۆری پێویستە"
    ,ingredientsInstructionsNotesOptional: "پێکهاتە، ڕێنمایی و تێبینی ئیختیاریە"
    ,canAddMultipleMealsPerDay: "دەتوانی زیاتر لە خواردنێک زیاد بکەیت بۆ هەر رۆژێک"
    ,addAction: "زیادکردن"
    ,exampleGrilledChicken: "نموونە: مریشکی برژاو و برنج"
    ,exampleCalories450: "نموونە: 450"
    ,exampleProtein35: "نموونە: 35"
    ,exampleCarbs50: "نموونە: 50"
    ,exampleFats12: "نموونە: 12"
    ,exampleIngredients: "نموونە:\n- سنگی مریشک 150g\n- برنج 200g\n- سەوزە 100g\n- ڕۆنی زەیتوون 1 کەوچک"
    ,exampleInstructions: "نموونە:\n1. مریشک بە تەواوی برژێنە\n2. برنج بە جیاکاری لێبنێ\n3. هەموو پێکهاتەکان لە قاپێکدا تێکەڵ بکە..."
    ,specialNotes: "تێبینی تایبەت..."
    ,pleaseEnterMealName: "تکایە ناوی خواردن بنووسە"
    ,mealImageGallery: "گالەریی وێنەکانی خواردن"
    ,imagesInStorage: "وێنە لە ستۆرج"
    ,searchByImageName: "گەڕان بە ناوی وێنە..."
    ,imagesFound: "وێنە دۆزرایەوە"
    ,pageOf: "پەڕەی {current} لە {total}"
    ,previousPage: "پێشوو"
    ,nextPage: "دواتر"
    ,cancelAction: "پاشگەزبوونەوە"
    ,saveProgram: "پاشەکەوتکردن"
    ,addExerciseTitle: "زیادکردنی یاری"
    ,exerciseLibraryButton: "کتێبخانەی یاری"
    ,saveToLibrary: "خەزنکردن بۆ کتێبخانە"
    ,exerciseName: "ناوی یاری"
    ,exerciseVideos: "ڤیدیۆکانی یاری"
    ,selectVideoFromStorage: "هەڵبژاردنی ڤیدیۆ لە ستۆرج"
    ,notesOptional: "تێبینی"
    ,additionalNotesPlaceholder: "تێبینی زیاتر بۆ یارییەکە..."
    ,addButton: "زیادکردن"
    ,optional: "ئیختیاری"
    ,addAnotherVideo: "زیادکردنی ڤیدیۆی تر"
    ,preview: "پێشبینین:"
    ,videosSelected: "ڤیدیۆ هەڵبژێردراوە"
    ,selectVideo: "هەڵبژاردنی ڤیدیۆ"
    ,videosInStorage: "ڤیدیۆ لە ستۆرج"
    ,noVideosAvailable: "هیچ ڤیدیۆیەک نییە"
    ,uploadVideosToFirebase: "ڤیدیۆکان بۆ فایربەیس ستۆرج ئەپلۆد بکە"
    ,searchByVideoName: "گەڕان بە ناوی ڤیدیۆ..."
    ,allGenders: "هەموو ڕەگەزەکان"
    ,allLevels: "هەموو ئاستەکان"
    ,allBodyParts: "هەموو بەشەکان"
    ,chest: "سنگ"
    ,back: "پشت"
    ,legs: "قاچ"
    ,shoulders: "شان"
    ,arms: "باڵ"
    ,core: "ناوەڕاست"
    ,videosFound: "ڤیدیۆ دۆزرایەوە"
    ,selected: "هەڵبژێردراوە"
    ,select: "هەڵبژاردن"
    ,previous: "پێشوو"
    ,next: "دواتر"
    ,saveWithCount: "پاشەکەوتکردن"
    ,videoDetails: "وردەکاری ڤیدیۆ"
    ,setsCount: "ژمارەی سێت"
    ,repsCount: "دووبارەکردنەوە"
    ,videoSpecificNotes: "تێبینی تایبەت بەم ڤیدیۆیە..."
    ,savedSuccessfully: "پاشەکەوتکرا بە سەرکەوتوویی"
    ,exerciseLibrary: "کتێبخانەی یاری"
    ,savedExercises: "یاریی خەزێنکراو"
    ,libraryEmpty: "کتێبخانە بەتاڵە"
    ,saveYourExercisesForLater: "یارییەکانی خۆت خەزێنە کردنی دواتر"
    ,searchInLibrary: "گەڕان لە کتێبخانە..."
    ,videos: "ڤیدیۆ"
    ,close: "داخستن"
    // Videos Page (Kurdish)
    ,firebaseVideos: "ڤیدیۆکانی Firebase"
    ,checkFirebaseVideos: "پشکنینی ڤیدیۆکانی Firebase (exercises/ & videos/)"
    ,refreshVideos: "نوێکردنەوە"
    ,videoName: "ناوی ڤیدیۆ"
    ,fileSize: "قەبارەی فایل"
    ,uploadDate: "بەرواری بارکردن"
    ,download: "داگرتن"
    ,noVideosFound: "هیچ ڤیدیۆیەک نەدۆزرایەوە"
    ,uploadVideosFirst: "سەرەتا ڤیدیۆکان بار بکە بۆ Firebase"
    // Logs Page (Kurdish)
    ,systemLogs: "تۆمارەکانی سیستم"
    ,monitorSystemActivity: "چاودێری چالاکی سیستم و ڕووداوەکان"
    ,searchLogs: "گەڕان لە تۆمارەکان..."
    ,filterByType: "فلتەرکردن بەپێی جۆر"
    ,exportLogs: "هەناردەکردنی تۆمارەکان"
    ,allLogs: "هەموو تۆمارەکان"
    ,errors: "هەڵەکان"
    ,warnings: "ئاگاداریەکان"
    ,infoLogs: "زانیاری"
    ,timestamp: "کاتژمێر"
    ,message: "پەیام"
    ,details: "وردەکارییەکان"
    ,noLogsFound: "هیچ تۆمارێک نەدۆزرایەوە"
    ,error: "هەڵە"
    ,warning: "ئاگاداری"
    ,info: "زانیاری"
    // Profile Page (Kurdish)
    ,myProfile: "پرۆفایلی من"
    ,manageAccountInfo: "بەڕێوەبردنی زانیاریەکانی هەژمار"
    ,systemAdministrator: "بەڕێوەبەری سیستم"
    ,editProfile: "دەستکاری پرۆفایل"
    ,cancelEdit: "هەڵوەشاندنەوە"
    ,personalInfo: "زانیاری کەسی"
    ,firstName: "ناوی یەکەم"
    ,lastName: "ناوی کۆتایی"
    ,fullAccess: "دەستگەیشتنی تەواو"
    ,accountInfo: "زانیاری هەژمار"
    ,joinedDate: "بەرواری وەرگرتن"
    ,lastLogin: "دوایین چوونەژوورەوە"
    ,securitySettings: "ڕێکخستنەکانی پاراستن"
    ,changePassword: "گۆڕینی وشەی نهێنی"
    ,currentPasswordPlaceholder: "وشەی نهێنی ئێستا بنووسە"
    ,newPasswordPlaceholder: "وشەی نهێنی نوێ بنووسە"
    ,confirmPasswordPlaceholder: "پشتڕاستکردنەوەی وشەی نهێنی نوێ"
    ,updatePassword: "نوێکردنەوەی وشەی نهێنی"
    // Settings Page (Kurdish)
    ,settingsPage: "ڕێکخستنەکان"
    ,customizePreferences: "ڕێکخستنی پەسەند و پاراستن"
    ,securityAndPrivacy: "پاراستن و تایبەتمەندی"
    ,addExtraLayer: "زیادکردنی توێژێکی زیادە بۆ پاراستن"
    ,twoFactorAuth: "پشتڕاستکردنەوەی دوو هێما"
    ,notificationsSettings: "ئاگادارییەکان"
    ,systemNotifications: "ئاگادارییەکانی سیستم"
    ,receiveSystemAlerts: "وەرگرتنی ئاماژەکان و نوێکارییەکانی سیستم"
    ,emailNotifs: "ئاگادارییەکانی ئیمەیڵ"
    ,getEmailUpdates: "وەرگرتنی نوێکارییە گرنگەکان لە ڕێگەی ئیمەیڵ"
    ,appearance: "دیمەن"
    ,darkModeLabel: "دۆخی تاریک"
    ,darkModeDesc: "بەکارهێنانی ڕووکاری تاریک بۆ بینینی باشتر"
    ,languagePreference: "پەسەندی زمان"
    ,chooseLanguage: "زمانی پەسەندت هەڵبژێرە"
    ,systemPreferences: "پەسەندەکانی سیستم"
    ,autoBackup: "پاشەکەوتی خۆکار"
    ,autoBackupDesc: "پاشەکەوتکردنی بنکەدراوە بە شێوەیەکی خۆکار هەموو ڕۆژێک"
    ,maintenanceMode: "دۆخی چاککردنەوە"
    ,maintenanceModeDesc: "چالاککردنی دۆخی چاککردنەوە بۆ نوێکارییەکانی سیستم"
    // Notifications Page (Kurdish)
    ,notificationsPage: "ئاگادارییەکان"
    ,stayUpdated: "بە نوێکاری بمێنەوە لەگەڵ ئاماژەکانی سیستم"
    ,markAllRead: "نیشانکردنی هەموو وەک خوێندراوە"
    ,clearAll: "پاککردنەوەی هەموو"
    ,unreadNotifications: "نەخوێندراوە"
    ,allNotifications: "هەموو"
    ,failedLoginAttempt: "هەوڵی چوونەژوورەوەی سەرکەوتوو نەبوو"
    ,newAdminCreated: "بەڕێوەبەری نوێ دروستکرا"
    ,highServerLoad: "باری زۆری سێرڤەر"
    ,markAsRead: "نیشانکردن وەک خوێندراوە"
    ,deleteNotification: "سڕینەوە"
    ,noNotifications: "هیچ ئاگادارییەک نییە"
    ,allCaughtUp: "تۆ لەسەر هەموو شتێک نوێی!"
  },
  // Minimal Turkish placeholders
  tr: {
    heroTitle: "FitPro",
    heroSubtitle: "Kişisel Fitness Koçun",
    login: "Giriş Yap",
    dashboard: "Panel",
    physiotherapist: "Doktor",
    progress: "İlerleme",
    profile: "Profil",
    logout: "Çıkış",
    accessKeys: "Erişim Anahtarları",
    notifications: "Bildirimler",
    systemSettings: "Sistem Ayarları",
    superadminPanel: "Süper Admin Paneli",
    loading: "Yükleniyor",
    updating: "Güncelleniyor...",
    patients: "Hastalar",
  activities: "Aktiviteler",
  trainees: "Öğrenciler",
  analytics: "📊 Analitik",
  reports: "Raporlar",
  management: "Yönetim",
  helpSupport: "🆘 Yardım ve Destek",
  helpDescription: "Yardıma ihtiyacınız varsa, lütfen destek ekibimizle support@fitpro.com adresinden iletişime geçin. Herhangi bir sorun veya sorunuz için buradayız.",
  helpContactInfo: "Acil durumlar için lütfen support@fitpro.com adresine e-posta gönderin veya +1 (555) 123-4567 numaralı telefonu arayın.",
  availableWorkouts: "Mevcut Antrenmanlar",
  searchWorkoutsPlaceholder: "Antrenman ara...",
  noWorkoutsFound: "Aramanıza uygun antrenman bulunamadı",
  settings: "Ayarlar",
  languageSettings: "Dil Ayarları",
  selectLanguage: "Tercih ettiğiniz dili seçin",
  workouts: "Antrenmanlar",
  categories: "Kategoriler",
    start: "Başlat",
    browseWorkoutsSubtitle: "Favori antrenmanlarını keşfet ve başlat",
    signInToAccount: "FitPro hesabına giriş yap",
    owner: "Sahip",
    trainer: "Antrenör",
    requests: "Talepler",
    anatomy3D: "🦴 Anatomi 3D Görüntüleyici",
    anatomyEngineer: "🔧 Anatomi Laboratuvarı",
    unirigDemo: "⚡ UniRig Demo",
    "3dModelViewer": "👁️ 3D Model Görüntüleyici",
  // Auth & Login (TR placeholders)
    signIn: "Giriş Yap",
    signUp: "Kayıt Ol",
    firstName: "Ad",
    lastName: "Soyad",
    firstNamePlaceholder: "Adınızı girin",
    lastNamePlaceholder: "Soyadınızı girin",
    emailAddress: "E-posta Adresi",
    emailOrUsername: "E-posta veya kullanıcı adı",
    password: "Parola",
    rememberMe: "Beni hatırla",
    forgotPassword: "Hesap şifrenizi mi unuttunuz?",
    loginSuccessful: "Giriş başarılı!",
    chooseRoleOrSignIn: "Rolünü seç veya giriş yap",
    pleaseEnterEmail: "Lütfen e-posta adresinizi girin",
    pleaseEnterPassword: "Lütfen parolanızı girin",
    incorrectCredentials: "E-posta veya parola yanlış. Lütfen tekrar deneyin.",
    resetPassword: "Parolayı Sıfırla",
    resetPasswordTitle: "Parolanızı mı Unuttunuz?",
    resetPasswordDesc: "Endişelenmeyin! E-posta adresinizi girin, size parolanızı sıfırlamak için bir bağlantı gönderelim.",
    enterEmailToReset: "E-posta adresinizi girin",
    sendResetLink: "Sıfırlama Bağlantısı Gönder",
    sendingResetLink: "Gönderiliyor...",
    resetLinkSent: "Sıfırlama Bağlantısı Gönderildi!",
    checkYourEmail: "E-postanızı Kontrol Edin",
    resetEmailSentMessage: "E-postanıza bir parola sıfırlama bağlantısı gönderdik. Lütfen gelen kutunuzu kontrol edin ve talimatları izleyin.",
    help: "Yardım",
    orContinueAs: "Veya şöyle devam et",
    admin: "Yönetici",
    physiotherapistLogin: "Fizyoterapist Girişi",
    trainerLogin: "Antrenör Girişi",
    adminLogin: "Yönetici Girişi",
    superAdminLogin: "Süper Admin Girişi",
    ownerLogin: "Sahip Girişi",
    signInAsAdmin: "Yönetici olarak giriş yap",
    signInAsPhysiotherapist: "Fizyoterapist olarak giriş yap",
    signInAsTrainer: "Antrenör olarak giriş yap",
    signInAsSuperAdmin: "Süper Admin olarak giriş yap",
    signInAsOwner: "Sahip olarak giriş yap",
    dontHaveAccount: "Hesabın yok mu?",
    copyrightNotice: "© 2025 FitPro. Tüm hakları saklıdır.",
  // Feature Descriptions (Turkish)
  featuresTitle: "Neden FitPro",
  professionalSolutions: "Hedeflerinize özel profesyonel fitness çözümleri",
  videoGuidance: "Video Rehberliği 🎥",
  videoGuidanceDesc: "Her egzersiz için detaylı video talimatlarıyla profesyonel antrenörleri takip edin",
  personalizedPrograms: "Kişiselleştirilmiş Programlar 🧩",
  personalizedProgramsDesc: "Fitness seviyeniz ve hereflerinize göre tasarlanmış özel antrenman planları",
  progressTracking: "İlerleme Takibi 📈",
  progressTrackingDesc: "Detaylı istatistikler ve ilerleme grafikleriyle gelişiminizi izleyin",
  exerciseLibraryFull: "Tam Egzersiz Kütüphanesi 📘",
  exerciseLibraryFullDesc: "Doğru form gösterimleriyle binlerce egzersize erişin",
  goalOriented: "Hedefe Yönelik 🎯",
  goalOrientedDesc: "Yapılandırılmış rehberlikle fitness hedeflerinizi belirleyin ve başarın",
  achievementBadges: "Başarı Rozetleri 🏆",
  achievementBadgesDesc: "Fitness kilometre taşlarınıza ulaştıkça rozet ve ödüller kazanın",
  priorityCustomerSupport: "Öncelikli müşteri desteği 💬",
  exclusiveCommunityAccess: "Özel topluluk erişimi 👥",
  breakfast: "Kahvaltı",
  lunch: "Öğle Yemeği",
  snacks: "Atıştırmalıklar",
  dinner: "Akşam Yemeği",
  snack: "Atıştırmalık",
  // Dashboard (TR placeholders)
    welcomeBackUser: "Tekrar Hoş Geldin, Kullanıcı",
    trackFitnessDesc: "Fitness yolculuğunu takip et ve hedeflerine ulaş",
    totalWorkouts: "Toplam Antrenman",
    currentStreak: "Mevcut Seri",
    overallProgress: "Genel İlerleme",
    quickActions: "Hızlı İşlemler",
    recentActivity: "Son Aktivite",
    startWorkout: "Antrenman Başlat",
    setGoal: "Hedef Belirle",
    viewAchievements: "Başarıları Gör",
    completed: "Tamamlandı",
    upperBodyWorkout: "Üst Vücut Antrenmanı",
    completedOnDate: "Tamamlanma tarihi",
    readyForToday: "Tekrar hoş geldin, bugünün planına hazır mısın?",
    activeStreak: "Aktif Seri",
    caloriesToday: "Bugün Kalori",
    days: "gün",
    kcal: "kcal",
    todaysTimeline: "Bugünün Zaman Çizelgesi",
    todaysSchedule: "Bugünün Programı",
    addWorkout: "Antrenman Ekle",
    logMeal: "Yemek Kaydet",
    title: "Başlık",
    duration: "Süre",
    meals: "Yemekler",
    saveWorkout: "Antrenmanı Kaydet",
    saveMeal: "Yemeği Kaydet",
    minutes: "dakika",
    min: "dk",
    limitedOffer: "Sınırlı Teklif: Premium'da %20 İndirim",
    upgradeToday: "Özel planları açmak için bugün yükseltin",
    now: "Şimdi",
    todaysWorkout: "Bugünün Antrenmanı: Tüm Vücut Gücü",
    workoutDetails: "8 egzersiz • 45 dakika • Orta seviye",
    breakfastItem: "Kahvaltı",
    breakfastDetails: "Yulaf + Meyveler • 420 kalori",
    lunchItem: "Öğle Yemeği",
    lunchDetails: "Izgara Tavuk Salatası • 560 kalori",
    snackItem: "Atıştırmalık",
    snackDetails: "Yunan Yoğurdu • 180 kalori",
    hydratePro: "Hydrate Pro",
    hydrateProDesc: "Akıllı hatırlatıcılar ve tüketim takibi",
    fitWatch: "Fit Watch",
    fitWatchDesc: "Bileğinizdeki gerçek zamanlı istatistikler",
    gymBeats: "Gym Beats",
    gymBeatsDesc: "Antrenmanlar için seçilmiş çalma listeleri",
    tapToNext: "sonraki için dokun",
    fullBodyStrength: "Tüm Vücut Gücü",
    workoutMinExercises: "8 egzersiz • 45 dakika",
    mealPlan: "Yemek Planı",
    mealsAndSnacks: "3 öğün • 2 atıştırmalık",
    physiotherapy: "Fizyoterapi",
    mobilitySession: "Hareketlilik seansı • 20 dakika",
  // Profile & Fitness Info (TR placeholders)
    myProfileHeading: "Profilim",
    manageFitnessProfileDesc: "Fitness profilini ve hedeflerini yönet",
    premiumMember: "Premium Üye",
    fitnessInformation: "Fitness Bilgileri",
    primaryGoal: "Ana Hedef",
    activityLevel: "Aktivite Seviyesi",
    buildMuscle: "Kas Yap",
    weightLoss: "Kilo Verme",
    endurance: "Dayanıklılık",
    flexibility: "Esneklik",
    sedentary: "Hareketsiz",
    lightlyActive: "Az Aktif",
    moderatelyActive: "Orta Aktif",
    veryActive: "Çok Aktif",
    saveFitnessInfo: "Fitness Bilgilerini Kaydet",
  // Settings page (TR placeholders)
  accountSecurityTitle: "Hesap Güvenliği",
  notificationPreferencesTitle: "Bildirim Tercihleri",
  privacySettingsTitle: "Gizlilik Ayarları",
  workoutReminders: "Antrenman Hatırlatıcıları",
  workoutRemindersDesc: "Antrenmanları tamamlamanız için hatırlatmalar alın",
  progressUpdates: "İlerleme Güncellemeleri",
  progressUpdatesDesc: "Fitness ilerlemeniz hakkında bildirim alın",
  emailNotifications: "E-posta Bildirimleri",
  emailNotificationsDesc: "Haftalık özetler alın",
  updatePassword: "Parolayı Güncelle",
  savePreferences: "Tercihleri Kaydet",
  savePrivacySettings: "Gizlilik Ayarlarını Kaydet",
  dangerZone: "Tehlikeli Bölge",
  deleteAccount: "Hesabı Sil",
  profileVisibility: "Profil Görünürlüğü",
  profileVisibilityDesc: "Diğer kullanıcıların profilinizi görmesine izin verin",
  showProgress: "İlerlemeyi Göster",
  showProgressDesc: "Fitness istatistiklerinizi herkese açık gösterin",
  currentPassword: "Mevcut Parola",
  newPassword: "Yeni Parola",
  confirmPassword: "Parolayı Doğrula",
  enterCurrentPassword: "Mevcut parolayı girin",
  enterNewPassword: "Yeni parolayı girin",
  confirmNewPassword: "Yeni parolayı doğrulayın",
  membershipPlans: "Üyelik Planları",
  monthly: "Aylık",
  yearly: "Yıllık",
  savePercent: "%17 Tasarruf",
  freePlan: "Ücretsiz",
  premiumPlan: "Premium",
  proPlan: "Pro",
  idealForBeginners: "Yeni başlayanlar için ideal",
  mostPopularChoice: "En popüler tercih",
  forProfessionalAthletes: "Profesyonel sporcular için",
  ultimateFitnessTransformation: "Nihai fitness dönüşümü",
  oneMonth: "1 Ay",
  threeMonths: "3 Ay",
  sixMonths: "6 Ay",
  oneYear: "1 Yıl",
  mostPopularBadge: "En Popüler",
  limitations: "Kısıtlamalar",
  faqTitle: "Sıkça Sorulan Sorular",
  getStarted: "Başla",
  subscribeNow: "Hemen Abone Ol",
  frequentlyAskedQuestions: "Sıkça Sorulan Sorular",
  faqChangePlanQ: "Planımı istediğim zaman değiştirebilir miyim?",
  faqChangePlanA: "Evet, istediğiniz zaman yükseltebilir veya düşürebilirsiniz. Değişiklikler bir sonraki fatura döneminde etkili olur.",
  faqFreeTrialQ: "Ücretsiz deneme var mı?",
  faqFreeTrialA: "Evet! Yeni üyeler Premium özelliklere 7 gün ücretsiz erişim elde eder. Kart gerekmez.",
  faqPaymentMethodsQ: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
  faqPaymentMethodsA: "Tüm büyük kredi kartları (Visa, Mastercard, American Express) ve PayPal'ı kabul ediyoruz.",
  faqDataSecureQ: "Verilerim güvende mi?",
  faqDataSecureA: "Verileriniz 256-bit SSL şifreleme ile korunur ve günlük yedeklenir.",
  // Payment Page (Turkish)
  payment: "Ödeme",
  paymentInformation: "Ödeme Bilgileri",
  cardInformation: "Kart Bilgileri",
  cardholderName: "Kart Sahibinin Adı",
  cardNumber: "Kart Numarası",
  expiration: "Son Kullanma Tarihi",
  cvv: "Güvenlik Kodu",
  billingAddress: "Fatura Adresi",
  address: "Adres",
  city: "Şehir",
  postalCode: "Posta Kodu",
  processing: "İşleniyor...",
  pay: "Öde",
  securePayment: "Güvenli Ödeme",
  securePaymentSSL: "Güvenli Ödeme - SSL Şifreleme ile Korunur",
  orderSummary: "Sipariş Özeti",
  oneTimePayment: "Tek Seferlik Ödeme",
  subtotal: "Ara Toplam",
  platformFee: "Platform Ücreti",
  tax: "Vergi",
  total: "Toplam",
  includedInPlan: "Planda Dahil:",
  completeExerciseLibrary: "Tam Egzersiz Kütüphanesi",
  detailedProgressTracking: "Detaylı İlerleme Takibi",
  prioritySupport: "Öncelikli Destek",
  securePaymentInfo: "Ödeme bilgileriniz 256-bit SSL şifreleme ile korunur. Kart bilgileri saklanmaz.",
  cardInfoNotStored: "Kart bilgileri saklanmaz",
  // Payment Placeholders (Turkish)
  cardholderNamePlaceholder: "Ad Soyad",
  streetNeighborhoodPlaceholder: "Sokak, Mahalle",
  cityPlaceholder: "İstanbul",
  postalCodePlaceholder: "34000",
  // Membership Page (Turkish)
  chooseYourPlan: "Planını Seç",
  selectPerfectPlan: "Fitness yolculuğunuz için mükemmel planı seçin",
  // Premium Feature Locked (Turkish)
  premiumFeatureLocked: "Premium Özellik Kilitli",
  featureRequiresSubscription: "Bu özellik aktif bir abonelik gerektirir. Premium içeriğe erişmeye devam etmek için lütfen aboneliğinizi yenileyin.",
  renewSubscription: "Yenilemeler",
  backToDashboard: "Panele Dön",
  redirectingToDashboard: "3 saniye içinde panele yönlendiriliyorsunuz...",
  backToLogin: "Girişe Dön",
  createAccountTitle: "Hesap Oluştur",
  signupSubtitle: "FitPro ile fitness yolculuğuna başla",
  mustBeAtLeast8Chars: "En az 8 karakter olmalı",
  termsAgreement: "Şunları kabul ediyorum:",
  termsOfService: "Hizmet Şartları",
  privacyPolicy: "Gizlilik Politikası",
  creatingAccount: "Hesap Oluşturuluyor...",
  passwordsDoNotMatch: "Parolalar eşleşmiyor",
  pleaseFillAllFields: "Lütfen tüm alanları doldurun",
  pleaseAgreeTerms: "Lütfen şartları kabul edin",
  registrationFailed: "Kayıt başarısız oldu. Lütfen tekrar deneyin.",
  emailAlreadyInUse: "Bu e-posta zaten kayıtlı",
  passwordTooWeak: "Parola en az 6 karakter olmalıdır",
  invalidEmail: "Geçersiz e-posta adresi",
  alreadyHaveAccount: "Zaten hesabın var mı?",
  signInLink: "Giriş yap",
  // Subscription Warning (Turkish)
  subscriptionExpired: "Abonelik Süresi Doldu",
  actionRequired: "İşlem Gerekli",
  subscriptionExpiredMessage: "Aylık aboneliğiniz sona erdi. Premium özelliklere, kişiselleştirilmiş yemek planlarına ve egzersiz programlarına erişmeye devam etmek için şimdi yenileyin.",
  workoutPrograms: "Egzersiz Programları 💪",
  mealPlans: "Yemek Planları 🍽️",
  expertSupport: "Uzman Desteği 👨‍⚕️",
  renewSubscriptionNow: "Aboneliği Yenilemek İçin Ofise Gelin",
  subscriptionExpiringSoon: "Abonelik Yakında Sona Eriyor",
  subscriptionExpiresInDays: "Aboneliğiniz",
  renewNow: "Şimdi Yenile",
  professionalInformation: "Profesyonel Bilgiler",
  yearsOfExperience: "Deneyim Yılı",
  certification: "Sertifikasyon",
  specialization: "Uzmanlık",
  saveProfessionalInfo: "Profesyonel Bilgileri Kaydet",
  security: "Güvenlik",
  changePassword: "Parola Değiştir",
  administratorPrivileges: "Yönetici Ayrıcalıkları",
  adminProfile: "Yönetici Profili",
  editAdminProfile: "Yönetici Profilini Düzenle",
  licensedPhysiotherapist: "Lisanslı Fizyoterapist",
  certifiedFitnessTrainer: "Sertifikalı Fitness Eğitmeni",
  department: "Departman",
  licenseNumber: "Lisans Numarası",
  patientPanelTitle: "Hasta Paneli",
  welcomeGreeting: "Hoş geldin",
  registrationDate: "Kayıt Tarihi",
  status: "Durum",
  access: "Erişim",
  fullPermission: "Tam Yetki",
  patientPanelDevelopment: "Hasta paneli geliştiriliyor",
  patientPanelDescription: "Yakında reçeteleri, atanmış egzersizleri, iyileşme sürecini ve fizyoterapistinle iletişimi görebileceksin.",
  comingSoon: "Çok Yakında",
  authorizedAccessOnly: "Yalnızca Yetkili Erişim",
  onlyRegisteredPhysiotherapists: "Yalnızca kayıtlı fizyoterapistler bu portala erişebilir",
  accessPatientManagement: "Hasta yönetimine eriş",
  physiotherapistPortalFooter: "© 2024 FitPro Fizyoterapist Portalı",
  // Workout Center & Schedule (Turkish)
  workoutCenter: "Antrenman Merkezi",
  workoutCenterSubtitle: "Antrenman seanslarını planla, başlat ve gözden geçir",
  buildYourStrength: "Gücünü Oluştur",
  buildYourStrengthDesc: "İlerlemenizi takip edin ve fitness hedeflerinize ulaşın",
  todaysWorkoutWednesday: "Bugünün Antrenmanı - Çarşamba",
  schedule: "Program",
  today: "BUGÜN",
  week: "HAFTA",
  monthView: "AY",
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
  saturday: "Cumartesi",
  sunday: "Pazar",
  mon: "Pzt",
  tue: "Sal",
  wed: "Çar",
  thu: "Per",
  fri: "Cum",
  sat: "Cmt",
  sun: "Paz",
  chest: "Göğüs",
  backMuscle: "Sırt",
  legs: "Bacaklar",
  shoulders: "Omuzlar",
  arms: "Kollar",
  core: "Karın",
  restAndRecovery: "Dinlenme ve Toparlanma",
  exercisesCount: "egzersizler",
  rest: "Dinlenme",
  workout: "Antrenman",
  exerciseFirst: "Birinci Egzersiz",
  exerciseSecond: "İkinci Egzersiz",
  exerciseThird: "Üçüncü Egzersiz",
  exerciseFourth: "Dördüncü Egzersiz",
  exerciseFifth: "Beşinci Egzersiz",
  exerciseSixth: "Altıncı Egzersiz",
  exerciseSeventh: "Yedinci Egzersiz",
  exerciseEighth: "Sekizinci Egzersiz",
  exerciseNinth: "Dokuzuncu Egzersiz",
  exerciseTenth: "Onuncu Egzersiz",
  sets: "setler",
  reps: "tekrarlar",
  calories: "Kaloriler",
  carbs: "Karbonhidratlar",
  fat: "Yağ",
  ingredients: "Malzemeler",
  recipe: "Tarif",
  recipeInstructions: "Tarif Talimatları",
  mealType: "Öğün Türü",
  mealImage: "Öğün Resmi",
  mealPhoto: "Öğün fotoğrafı",
  todaysMeals: "Bugünün Öğünleri",
  importantNotes: "Önemli Notlar",
  // Meals & Nutrition (Turkish)
  mealsAndNutrition: "Yemekler ve Beslenme",
  trackDailyMealsDesc: "Günlük yemekleri ve makro hedefleri takip et",
  fuelYourBodyRight: "Vücudunu Doğru Besle",
  fuelYourBodyRightDesc: "Beslenmeni dengele ve fitness hedeflerine ulaş",
  protein: "PROTEİN",
  caloriesTodayLabel: "BUGÜNÜN KALORİLERİ",
  dailyGoal: "GÜNLÜK HEDEF",
  mealsLogged: "KAYITLI ÖĞÜNLER",
  // Physio Panel (Turkish)
  physiotherapyTitle: "Fizyoterapi",
  physioSubtitle: "Sıra talebi yap ve sakatlık iyileşmeni takip et",
  recoverAndHeal: "İyileş ve Sağal",
  recoverAndHealDesc: "İyileşme yolculuğun için uzman fizyoterapi desteği",
  completedLabel: "TAMAMLANDI",
  requestsLabel: "Talepler",
  totalRequests: "TOPLAM TALEPLER",
  recoveryRate: "İYİLEŞME ORANI",
  pendingLabel: "BEKLİYOR",
  sendRequest: "Talep Gönder",
  selectPhysiotherapist: "Fizyoterapist seç",
  injuryType: "SAKATLIK TÜRÜ",
  injuryTypePlaceholder: "ör. Diz bağ zorlanması",
  painPercentage: "AĞRI YÜZDESİ",
  notesOptional: "NOTLAR (OPSİYONEL)",
  notesPlaceholder: "...Ekstra bilgi",
  yourRequests: "Talepleriniz",
  noRequestsYet: "Henüz talep yok.",
  // Profile Section (Turkish)
  subscriptionAndAccessKey: "Abonelik ve Erişim Anahtarı",
  yourAccessKey: "ERİŞİM ANAHTARIN",
  personalIdentifier: "Kişisel Tanımlayıcı",
  statusLabel: "DURUM",
  remainingLabel: "KALAN",
  joinedLabel: "Katıldı",
  expiresLabel: "Sona Eriyor",
  accessKeyNote: "Not: Erişim anahtarınız hesabınıza özeldir. Güvenli tutun ve destek ile iletişime geçerken veya premium özelliklere erişirken kullanın.",
  account: "Hesap",
  manageLabel: "Yönet",
  stats: "İstatistikler",
  heightLabel: "Boy",
  weightLabel: "Kilo",
  shortcuts: "Kısayollar",
  physioLabel: "Fizyoterapi",
  mealsLabel: "Yemekler",
  workoutLabel: "Antrenman",
  appearance: "Görünüm",
  light: "Açık",
  dark: "Koyu",
  system: "Sistem",
  systemFollowsOS: "Sistem, işletim sisteminizin temasını takip eder.",
  pushNotifications: "Bildirimler",
  applyLanguage: "Dili Uygula",
  accountActions: "Hesap İşlemleri",
  accountActionsDesc: "Çıkış yapmak oturumunuzu temizler ve giriş ekranına döndürür.",
  logoutButton: "Çıkış Yap",
  // Manage Profile Dialog (Turkish)
  manageProfile: "Profili Yönet",
  changeAvatar: "Avatarı Değiştir",
  avatarSizeNote: "2MB'a kadar PNG/JPG.",
  personal: "Kişisel",
  fullName: "Tam Ad",
  phoneLabel: "Telefon",
  joinDate: "Katılım Tarihi",
  goal: "Hedef",
  experience: "Deneyim",
  physical: "Fiziksel",
  weight: "Kilo",
  height: "Boy",
  current: "Mevcut",
  new: "Yeni",
  changePasswordLabel: "Parola Değiştir",
  currentPasswordLabel: "Mevcut",
  newPasswordLabel: "Yeni",
  confirmPasswordLabel: "Onayla",
  saved: "Kaydedildi",
  welcomeBack: "Tekrar Hoş Geldiniz",
  // Dashboard Stats (Turkish)
  totalTime: "TOPLAM SÜRE",
  caloriesBurned: "YAKILAN KALORİ",
  // Workout Exercise Names (Turkish - kept in English)
  barbellBenchPress: "Barbell Bench Press",
  inclineDumbbellPress: "Incline Dumbbell Press",
  cableFlyes: "Cable Flyes",
  focusControlledMovement: "Kontrollü harekete odaklan",
  squeezeAtPeak: "Tepe noktasında sıkın",
  keepBackStraightEngageCore: "Sırtı düz tut, karın kaslarını sıkı tut",
  goDeepKeepChestUp: "Derine in, göğsü yukarıda tut",
  lightStretchingYogaWalking: "Hafif germe, yoga veya yürüyüş",
  // Notifications Dialog (Turkish)
  notificationsTitle: "Bildirimler",
  milestoneReached: "Kilometre Taşına Ulaşıldı",
  milestoneReachedDesc: "20 antrenmanı tamamladın! Harika işe devam et!",
  workoutReminder: "Antrenman Hatırlatıcısı",
  workoutReminderDesc: "Akşam antrenmanını tamamlamayı unutma",
  progressUpdate: "İlerleme Güncellemesi",
  progressUpdateDesc: "Bu ay 2kg kaybettin. Harika ilerleme!",
  close: "Kapat",
  // Placeholders for Create Program dialogs (Turkish)
  exampleKetoDiet: "Örnek: Keto Diyet Planı",
  exampleFullBodyWorkout: "Örnek: Tam Vücut Antrenmanı",
  enterProgramDescription: "Program açıklamasını girin...",
  example30mins: "Örnek: 30 dakika",
  example2000: "Örnek: 2000",
  example150: "Örnek: 150",
  example200: "Örnek: 200",
  example60: "Örnek: 60",
  exampleChestShouldersTriceps: "Örnek: Göğüs, Omuzlar, Triseps",
  exampleImageUrl: "https://example.com/image.jpg",
  // Superadmin Dashboard (Turkish)
  superadminDashboard: "Süper Yönetici Paneli",
  systemManagementControl: "Sistem Yönetimi ve Kontrolü",
  users: "Kullanıcılar",
  keys: "Anahtarlar",
  activeNow: "Aktif",
  growth: "Büyüme",
  totalActive: "Toplam Aktif",
  accessKeysLabel: "Erişim Anahtarları",
  onlineNow: "Şu Anda Çevrimiçi",
  thisMonth: "Bu Ay",
  quickActions: "Hızlı İşlemler",
  manageUsers: "Kullanıcıları Yönet",
  generateKeys: "Anahtar Oluştur",
  viewReports: "Raporları Görüntüle",
  systemStatus: "Sistem Durumu",
  database: "Veritabanı",
  apiServer: "API Sunucusu",
  storage: "Depolama",
  healthy: "Sağlıklı",
  running: "Çalışıyor",
  percentUsed: "Kullanılıyor",
  trainers: "Antrenörler",
  totalTrainers: "Toplam Antrenörler",
  // Users Management (Turkish)
  userManagementTitle: "Kullanıcı Yönetimi",
  manageYourUsers: "Tüm kullanıcıları yönet ve izle",
  statistics: "İstatistikler",
  allUsers: "Tüm Kullanıcılar",
  searchUsers: "Kullanıcıları ara...",
  addNewUser: "Yeni Kullanıcı Ekle",
  viewProfile: "Profili Görüntüle",
  editUser: "Kullanıcıyı Düzenle",
  deleteUser: "Kullanıcıyı Sil",
  active: "Aktif",
  inactive: "Pasif",
  membership: "Üyelik",
  accountSettings: "Hesap Ayarları",
  personalInformation: "Kişisel Bilgiler",
  fullNameLabel: "Tam Ad",
  emailAddressLabel: "E-posta Adresi",
  phoneNumberLabel: "Telefon Numarası",
  locationLabel: "Konum",
  roleLabel: "Rol",
  passwordLabel: "Şifre",
  trainersAlwaysActive: "Antrenörler ve Süper Yöneticiler her zaman aktiftir",
  saveChanges: "Değişiklikleri Kaydet",
  cancel: "İptal",
  cancelAction: "İptal",
  deleteUserTitle: "Kullanıcıyı Sil",
  areYouSure: "Emin misiniz?",
  actionCannotBeUndone: "Bu işlem geri alınamaz",
  confirmDelete: "Silmeyi Onayla",
  proRequests: "Pro Talepleri",
  proRequestsDescription: "Pro yükseltme taleplerini incele ve onayla",
  upgradeRequests: "Yükseltme Talepleri",
  noPendingRequests: "Bekleyen talep yok",
  requestFrom: "Talep gönderen",
  requestDetails: "Talep Detayları",
  approve: "Onayla",
  reject: "Reddet",
  pending: "Beklemede",
  approved: "Onaylandı",
  rejected: "Reddedildi",
  // Access Keys Page (Turkish)
  accessKeysPage: "Erişim Anahtarları",
  generateAndManageKeys: "Erişim anahtarlarını oluştur ve yönet",
  generateNewKey: "Yeni Anahtar Oluştur",
  generating: "Oluşturuluyor...",
  totalKeys: "Toplam Anahtarlar",
  expired: "Süresi Doldu",
  quickKeyGenerator: "Hızlı Anahtar Oluşturucu",
  generateKeysInstantly: "Yeni üyeler için anında erişim anahtarları oluştur",
  trialOneUse: "Deneme (1 kullanım)",
  standardFiveUses: "Standart (5 kullanım)",
  premiumTenUses: "Premium (10 kullanım)",
  allAccessKeys: "Tüm Erişim Anahtarları",
  keyColumn: "Anahtar",
  typeColumn: "Tip",
  usesColumn: "Kullanım",
  statusColumn: "Durum",
  expiresColumn: "Bitiş",
  actionsColumn: "İşlemler",
  trial: "Deneme",
  standard: "Standart",
  premium: "Premium",
  used: "Kullanıldı",
  copyKey: "Anahtarı Kopyala",
  // Analytics Page (Turkish)
  analyticsDashboard: "Analitik Paneli",
  trackPerformance: "Performansı ve içgörüleri takip et",
  loadingAnalytics: "Analitikler yükleniyor...",
  keyMetrics: "Anahtar Metrikler",
  totalUsers: "Toplam Kullanıcı",
  activeUsers24h: "Aktif Kullanıcılar (24s)",
  proMembers: "Pro Üyeler",
  totalWorkouts: "Toplam Antrenman",
  userGrowth: "Kullanıcı Artışı",
  userDistribution: "Kullanıcı Dağılımı",
  recentActivity: "Son Aktivite",
  newUserRegistered: "Yeni kullanıcı kaydedildi",
  // Database Page (Turkish)
  databaseManagement: "Veritabanı Yönetimi",
  monitorDatabase: "Veritabanı işlemlerini izle ve yönet",
  refresh: "Yenile",
  backup: "Yedekle",
  creatingBackup: "Yedek Oluşturuluyor...",
  healthStatus: "Sağlık Durumu",
  databaseStatus: "Veritabanı Durumu",
  allSystemsOperational: "Tüm sistemler çalışıyor",
  lastChecked: "Son kontrol",
  justNow: "Şimdi",
  uptime: "Çalışma Süresi",
  storageUsed: "Kullanılan Depolama",
  totalRecords: "Toplam Kayıt",
  activeConnections: "Aktif Kullanıcılar",
  collectionsColumn: "Koleksiyonlar",
  collectionsOverview: "Koleksiyonlara Genel Bakış",
  loadingCollections: "Koleksiyonlar yükleniyor...",
  documents: "belgeler",
  view: "Görüntüle",
  recentBackups: "Son Yedekler",
  noBackupsYet: "Henüz yedek yok",
  createFirstBackup: "Yukarıdan ilk yedeğinizi oluşturun",
  success: "Başarılı",
  maintenance: "Bakım",
  optimizeDatabase: "Veritabanını Optimize Et",
  optimizing: "Optimize ediliyor...",
  createBackupNow: "Şimdi Yedekle",
  restoreFromBackup: "Yedekten Geri Yükle",
  clearCache: "Önbelleği Temizle",
  clearing: "Temizleniyor...",
  // Programs Page (Turkish)
  programsManagement: "Program Yönetimi",
  createAndManagePrograms: "Antrenman ve beslenme programları oluştur ve yönet",
  nutritionPrograms: "Beslenme Programları",
  workoutPrograms: "Antrenman Programları",
  searchPrograms: "Program ara...",
  createNewProgram: "Yeni Program Oluştur",
  createNutritionProgram: "Beslenme Programı Oluştur",
  programName: "Program Adı",
  description: "Açıklama",
  assignToUsers: "Kullanıcılara Ata",
  selectUsers: "Kullanıcıları Seç",
  searchByName: "İsme göre ara...",
  searchByNameOrEmail: "İsim veya e-posta ile ara...",
  selected: "Seçildi",
  weeklySchedule: "Haftalık Program",
  addMeal: "Öğün Ekle",
  addExercise: "Egzersiz Ekle",
  mealLibrary: "Öğün Kütüphanesi",
  exerciseLibrary: "Egzersiz Kütüphanesi",
  calories: "Kalori",
  protein: "Protein",
  carbs: "Karbonhidrat",
  fats: "Yağ",
  sets: "Set",
  reps: "Tekrar",
  rest: "Dinlenme",
  instructions: "Talimatlar",
  ingredients: "İçindekiler",
  noProgramsFound: "Program bulunamadı",
  createFirstProgram: "Yukarıdan ilk programınızı oluşturun",
  imageUrl: "Görsel URL",
  userSelection: "Kullanıcı Seçimi",
  onlyProUsers: "Sadece PRO kullanıcılar (ücretsiz ve yöneticiler hariç)",
  selectAllUsers: "Tümünü Seç",
  clearAll: "Tümünü Temizle",
  noteLabel: "Not:",
  onlyProUsersShown: "Sadece PRO kullanıcılar gösterilir",
  freeUsersHidden: "Ücretsiz kullanıcılar gizlidir",
  adminsHidden: "Yöneticiler, eğitmenler gizlidir",
  setMealsForEachDay: "Her gün için öğünleri ayarla",
  restDay: "Dinlenme günü?",
  noMealsAdded: "Öğün eklenmedi",
  copyToAnotherDay: "Başka güne kopyala",
  weekSummary: "Hafta özeti:",
  activeDays: "Aktif",
  restDays: "Dinlenme",
  totalMeals: "Öğün",
  uniqueMeals: "Benzersiz",
  fillBasicInfo: "Temel bilgileri doldurun (ad, açıklama, süre...)",
  whenComplete: "Tamamlandığında, Kaydet'e tıklayın",
  clickSave: "Kaydet'e tıklayın",
  level: "Seviye",
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
  saturday: "Cumartesi",
  sunday: "Pazar",
  selectDayFrom7Days: "7 günden birini seçin (Pazartesi'den Pazar'a)",
  clickAddExercise: "Egzersiz eklemek için 'Egzersiz Ekle'ye tıklayın",
  canAddMultipleExercises: "Her gün için birden fazla egzersiz ekleyebilirsiniz",
  ifRestDayTurnOn: "Dinlenme günü ise, 'Dinlenme günü'nü açın",
  noPROusers: "PRO'ya sahip normal kullanıcı yok",
  noUsersFound: "Kullanıcı bulunamadı",
  freeUsersNotShown: "Ücretsiz kullanıcılar ve admin/fizyoterapist gösterilmez",
  programWillBeSentTo: "Bu program",
  PROusers: "PRO kullanıcılara gönderilecek",
  setMealsDescription: "Her gün için öğünleri ayarla",
  targetMuscles: "Hedef Kaslar",
  noExercisesAdded: "Egzersiz eklenmedi",
  addExerciseButton: "Egzersiz Ekle",
  copyToDay: "Başka güne kopyala",
  weekSummaryLabel: "Hafta özeti:",
  activeLabel: "Aktif",
  restLabel: "Dinlenme",
  exercisesLabel: "Egzersizler",
  uniqueLabel: "Benzersiz",
  noMealsAdded: "Öğün eklenmedi",
  addMeal: "Öğün Ekle",
  copyMealToOtherDay: "Başka Güne Kopyala",
  restDayMessage: "Dinlenme günü 😴",
  timeForRestAndRecovery: "Dinlenme ve toparlanma zamanı",
  weekSummary: "Hafta Özeti:",
  active: "Aktif",
  rest: "Dinlenme",
  meals: "Öğünler",
  different: "Farklı",
  weekUniqueMeals: "Haftanın Benzersiz Öğünleri",
  types: "tür",
  mealLibrary: "Öğün Kütüphanesi",
  savedMeals: "Kaydedilen Öğünler",
  saveMealToLibrary: "Kütüphaneye Kaydet",
  weekUniqueExercises: "Haftanın Benzersiz Egzersizleri",
  setMealsForEachDay: "Her gün için öğünleri belirle",
  setExercisesForEachDay: "Her gün için egzersizleri belirle",
  mealName: "Öğün Adı",
  mealCategory: "Öğün Kategorisi",
  macros: "Makrolar",
  caloriesRequired: "Kalori *",
  proteinG: "Protein (g)",
  carbsG: "Karbonhidrat (g)",
  fatsG: "Yağ (g)",
  ingredients: "Malzemeler",
  ingredientsOptional: "Malzemeler (İsteğe bağlı)",
  instructionsOptional: "Talimatlar (İsteğe bağlı)",
  notesOptional: "Notlar (İsteğe bağlı)",
  mealImage: "Öğün Resmi",
  mealImageOptional: "Öğün Resmi (İsteğe bağlı)",
  selectFromGallery: "Galeriden Seç",
  orEnterImageLink: "Veya resim bağlantısı girin...",
  importantNote: "Önemli Not:",
  onlyNameCaloriesRequired: "Sadece ad ve kalori gerekli",
  ingredientsInstructionsNotesOptional: "Malzemeler, talimatlar ve notlar isteğe bağlı",
  canAddMultipleMealsPerDay: "Her gün için birden fazla öğün ekleyebilirsiniz",
  addAction: "Ekle",
  exampleGrilledChicken: "Örnek: Izgara Tavuk ve Pilav",
  exampleCalories450: "Örnek: 450",
  exampleProtein35: "Örnek: 35",
  exampleCarbs50: "Örnek: 50",
  exampleFats12: "Örnek: 12",
  exampleIngredients: "Örnek:\n- Tavuk göğsü 150g\n- Pilav 200g\n- Sebzeler 100g\n- Zeytinyağı 1 çay kaşığı",
  exampleInstructions: "Örnek:\n1. Tavuğu tamamen pişene kadar ızgarada pişirin\n2. Pilavı ayrı olarak pişirin\n3. Tüm malzemeleri bir kasede karıştırın...",
  specialNotes: "Özel notlar...",
  pleaseEnterMealName: "Lütfen öğün adını girin",
  mealImageGallery: "Öğün Resim Galerisi",
  imagesInStorage: "depolamada resim",
  searchByImageName: "Resim adına göre ara...",
  imagesFound: "resim bulundu",
  pageOf: "Sayfa {current} / {total}",
  previousPage: "Önceki",
  nextPage: "Sonraki",
  cancelAction: "İptal",
  saveProgram: "Kaydet",
  addExerciseTitle: "Egzersiz Ekle",
  exerciseLibraryButton: "Egzersiz Kütüphanesi",
  saveToLibrary: "Kütüphaneye Kaydet",
  exerciseName: "Egzersiz Adı",
  exerciseVideos: "Egzersiz Videoları",
  selectVideoFromStorage: "Depolamadan Video Seç",
  notesOptional: "Notlar",
  additionalNotesPlaceholder: "Egzersiz için ek notlar...",
  addButton: "Ekle",
  optional: "İsteğe bağlı",
  addAnotherVideo: "Başka Video Ekle",
  preview: "Önizleme:",
  videosSelected: "video seçildi",
  selectVideo: "Video Seç",
  videosInStorage: "depolamada video",
  noVideosAvailable: "Video Yok",
  uploadVideosToFirebase: "Firebase Storage'a video yükleyin",
  searchByVideoName: "Video adına göre ara...",
  allGenders: "Tüm Cinsiyetler",
  allLevels: "Tüm Seviyeler",
  allBodyParts: "Tüm Vücut Bölgeleri",
  chest: "Göğüs",
  back: "Sırt",
  legs: "Bacaklar",
  shoulders: "Omuzlar",
  arms: "Kollar",
  core: "Karın",
  videosFound: "video bulundu",
  selected: "Seçildi",
  select: "Seç",
  previous: "Önceki",
  next: "Sonraki",
  saveWithCount: "Kaydet",
  videoDetails: "Video Detayları",
  setsCount: "Set Sayısı",
  repsCount: "Tekrarlar",
  videoSpecificNotes: "Bu videoya özel notlar...",
  savedSuccessfully: "Başarıyla Kaydedildi",
  exerciseLibrary: "Egzersiz Kütüphanesi",
  savedExercises: "kaydedilmiş egzersiz",
  libraryEmpty: "Kütüphane Boş",
  saveYourExercisesForLater: "Egzersizlerinizi daha sonra kullanmak için kaydedin",
  searchInLibrary: "Kütüphanede ara...",
  videos: "video",
  close: "Kapat",
  // Videos Page (Turkish)
  firebaseVideos: "Firebase Videoları",
  checkFirebaseVideos: "Firebase videolarını kontrol et (exercises/ & videos/)",
  refreshVideos: "Yenile",
  videoName: "Video Adı",
  fileSize: "Dosya Boyutu",
  uploadDate: "Yükleme Tarihi",
  download: "İndir",
  noVideosFound: "Video bulunamadı",
  uploadVideosFirst: "Önce videoları Firebase'e yükleyin",
  // Logs Page (Turkish)
  systemLogs: "Sistem Günlükleri",
  monitorSystemActivity: "Sistem aktivitesini ve olaylarını izle",
  searchLogs: "Günlüklerde ara...",
  filterByType: "Türe göre filtrele",
  exportLogs: "Günlükleri Dışa Aktar",
  allLogs: "Tüm Günlükler",
  errors: "Hatalar",
  warnings: "Uyarılar",
  infoLogs: "Bilgi",
  timestamp: "Zaman",
  message: "Mesaj",
  details: "Detaylar",
  noLogsFound: "Günlük bulunamadı",
  error: "Hata",
  warning: "Uyarı",
  info: "Bilgi",
  // Profile Page (Turkish)
  myProfile: "Profilim",
  manageAccountInfo: "Hesap bilgilerini yönet",
  systemAdministrator: "Sistem Yöneticisi",
  editProfile: "Profili Düzenle",
  cancelEdit: "İptal",
  personalInfo: "Kişisel Bilgi",
  firstName: "Ad",
  lastName: "Soyad",
  fullAccess: "Tam Erişim",
  accountInfo: "Hesap Bilgisi",
  joinedDate: "Katılım Tarihi",
  lastLogin: "Son Giriş",
  securitySettings: "Güvenlik Ayarları",
  changePassword: "Şifre Değiştir",
  currentPasswordPlaceholder: "Mevcut şifrenizi girin",
  newPasswordPlaceholder: "Yeni şifrenizi girin",
  confirmPasswordPlaceholder: "Yeni şifrenizi onaylayın",
  updatePassword: "Şifreyi Güncelle",
  // Settings Page (Turkish)
  settingsPage: "Ayarlar",
  customizePreferences: "Tercihlerinizi ve güvenliği özelleştirin",
  securityAndPrivacy: "Güvenlik ve Gizlilik",
  addExtraLayer: "Güvenlik için ekstra katman ekle",
  twoFactorAuth: "İki Faktörlü Kimlik Doğrulama",
  notificationsSettings: "Bildirimler",
  systemNotifications: "Sistem Bildirimleri",
  receiveSystemAlerts: "Sistem uyarıları ve güncellemeleri al",
  emailNotifs: "E-posta Bildirimleri",
  getEmailUpdates: "Önemli güncellemeleri e-postayla al",
  appearance: "Görünüm",
  darkModeLabel: "Karanlık Mod",
  darkModeDesc: "Daha iyi görünüm için koyu tema kullan",
  languagePreference: "Dil Tercihi",
  chooseLanguage: "Tercih ettiğiniz dili seçin",
  systemPreferences: "Sistem Tercihleri",
  autoBackup: "Otomatik Yedekleme",
  autoBackupDesc: "Veritabanını her gün otomatik olarak yedekle",
  maintenanceMode: "Bakım Modu",
  maintenanceModeDesc: "Sistem güncellemeleri için bakım modunu etkinleştir",
  // Notifications Page (Turkish)
  notificationsPage: "Bildirimler",
  stayUpdated: "Sistem uyarılarıyla güncel kalın",
  markAllRead: "Tümünü Okundu İşaretle",
  clearAll: "Tümünü Temizle",
  unreadNotifications: "Okunmamış",
  allNotifications: "Tümü",
  failedLoginAttempt: "Başarısız giriş denemesi",
  newAdminCreated: "Yeni yönetici oluşturuldu",
  highServerLoad: "Yüksek sunucu yükü",
  markAsRead: "Okundu İşaretle",
  deleteNotification: "Sil",
  noNotifications: "Bildirim yok",
  allCaughtUp: "Her şey tamam!",
  },
}
