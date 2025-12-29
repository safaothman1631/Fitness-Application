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
  | "activityLogs"
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
  | "enabled"
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
  | "allPhysiotherapists"
  | "registrationRequests"
  | "adminPhysiotherapist"
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
  | "traineeMeals"
  | "traineeWorkouts"
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
  | "manageAccountSecurity"
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
  // 2FA Verification
  | "twoFactorAuthentication"
  | "enter6DigitCode"
  | "enterBackupCode"
  | "pleaseEnterComplete6DigitCode"
  | "pleaseEnterBackupCode"
  | "twoFactorVerificationSuccessful"
  | "verificationFailed"
  | "useAuthenticatorCode"
  | "useBackupCode"
  | "backupCode"
  | "verify"
  | "passwordCorrect"
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
  | "emailNotVerified"
  | "pleaseCheckYourEmail"
  | "registrationSuccessVerifyEmail"
  // Subscription Warning
  | "subscriptionExpired"
  | "actionRequired"
  | "subscriptionExpiredMessage"
  | "workoutPrograms"
  | "mealPlans"
  | "progressTracking"
  | "expertSupport"
  | "assignedTo"
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
  | "tapToActivate"
  | "pushNotifications"
  | "applyLanguage"
  | "accountActions"
  | "accountActionsDesc"
  | "logoutButton"
  | "more"
  // Settings Page Specific
  | "customizeYourExperience"
  | "chooseYourPreferredTheme"
  | "selectYourPreferredLanguage"
  | "appInformation"
  | "appVersion"
  | "appBuild"
  | "appPlatform"
  | "mobileAndWeb"
  | "youWillBeRedirectedToLogin"
  | "loggingOut"
  | "manageNotificationSettings"
  | "notificationChannels"
  | "chooseNotificationMethod"
  | "getInstantAlerts"
  | "textMessageAlerts"
  | "activityNotifications"
  | "chooseActivityNotifications"
  | "workoutReminders"
  | "dailyWorkoutNotifications"
  | "mealPlans"
  | "nutritionUpdates"
  | "physioSessions"
  | "therapyAppointments"
  | "activeNotifications"
  | "activeChannels"
  | "activeActivities"
  | "totalActive"
  | "savePreferences"
  | "notificationsSaved"
  | "updatePersonalInfo"
  | "enterYourName"
  | "enterPhoneNumber"
  | "clickCameraToUpload"
  | "userNotFound"
  | "profileSavedSuccessfully"
  | "failedToSaveProfile"
  | "pleaseEnterName"
  | "invalidWeight"
  | "invalidHeight"
  | "saving"
  | "passwordChangedSuccessfully"
  | "currentPasswordIncorrect"
  | "weakPassword"
  | "requiresRecentLogin"
  | "failedToChangePassword"
  | "loggedOutSuccessfully"
  | "joined"
  | "active"
  | "expired"
  | "accessKey"
  | "notSet"
  | "goal"
  | "cancel"
  // More Menu
  | "accessProfileSettings"
  | "viewYourProfile"
  | "managePreferences"
  | "notificationSettingsDesc"
  | "signOutFromAccount"
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
  | "pendingUserApprovals"
  | "emailVerified"
  | "userApproved"
  | "canNowLogin"
  | "user"
  | "joinedDate"
  | "actionsColumn"
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
  | "all"
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
  | "searchPatient"
  | "searchDoctor"
  | "dateFrom"
  | "dateTo"
  | "clearFilters"
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
  // Physiotherapist Dashboard
  | "physioWelcome"
  | "totalPatients"
  | "todayAppointments"
  | "pendingRequests"
  | "completedSessions"
  | "upcomingAppointments"
  | "recentActivities"
  | "patientList"
  | "manageAllPatients"
  | "searchPatients"
  | "addPatient"
  | "activePatients"
  | "avgProgress"
  | "condition"
  | "sessions"
  | "viewDetails"
  | "sendMessage"
  | "editPatient"
  | "deletePatient"
  | "noPatients"
  | "patientName"
  | "patientEmail"
  | "patientPhone"
  | "patientAge"
  | "medicalCondition"
  | "fillAllFields"
  | "patientAdded"
  | "patientUpdated"
  | "patientDeleted"
  | "confirmDelete"
  // Appointments
  | "myAppointments"
  | "scheduleAppointments"
  | "totalAppointments"
  | "todayScheduled"
  | "upcomingCount"
  | "completedCount"
  | "addAppointment"
  | "appointmentDate"
  | "appointmentTime"
  | "duration"
  | "appointmentType"
  | "inPerson"
  | "videoCall"
  | "phoneCall"
  | "appointmentReason"
  | "appointmentLocation"
  | "appointmentNotes"
  | "appointmentFee"
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "noShow"
  | "appointmentScheduled"
  | "appointmentUpdated"
  | "appointmentCancelled"
  | "minutes"
  // Progress Tracking
  | "progressTracking"
  | "monitorRecovery"
  | "totalRecords"
  | "patientsTracked"
  | "addProgressRecord"
  | "selectPatient"
  | "recordDate"
  | "mobilityLevel"
  | "strengthLevel"
  | "painLevel"
  | "clinicalNotes"
  | "progressSaved"
  | "progressDeleted"
  | "noProgressYet"
  // Requests
  | "patientRequests"
  | "manageRequests"
  | "newRequests"
  | "acceptedRequests"
  | "rejectedRequests"
  | "requestFrom"
  | "injuryType"
  | "painLevel"
  | "requestNotes"
  | "acceptRequest"
  | "rejectRequest"
  | "pending"
  | "accepted"
  | "rejected"
  | "requestAccepted"
  | "requestRejected"
  | "requestCompleted"
  | "noRequests"
  | "patientNotes"
  | "yourResponse"
  | "responseRequired"
  | "responseRequiredMessage"
  | "enterResponseMessage"
  | "previousResponse"
  | "markCompleted"
  | "scheduleAppointment"
  | "appointmentDate"
  | "appointmentTime"
  | "sessionPrice"
  | "additionalNotes"
  | "confirmAccept"
  | "appointmentScheduled"
  | "fillAllAppointmentDetails"
  | "patientDetails"
  | "pricePerSession"
  | "appointmentHistory"
  | "assignedPhysiotherapist"
  | "registrationInfo"
  | "createdAt"
  | "requestDetails"
  | "requestsAppearHere"
  | "loadingRequests"
  | "searchRequests"
  | "totalRequests"
  | "viewDetails"
  | "complete"
  | "date"
  | "live"
  | "modelLoaded"
  | "modelName"
  | "skeletonPreCut"
  | "format"
  | "type"
  | "humanSkeleton"
  | "size"
  | "anatomy3DViewer"
  | "view3DSkeletonModel"
  | "viewControl"
  | "rotation"
  | "zoom"
  | "resetView"
  | "modelInfo"
  | "instructions"
  | "useSliderToRotate"
  | "useSliderToZoom"
  | "clickButtonToReset"
  | "selectedParts"
  | "lastSelected"
  | "clickModelToSelect"
  | "selectParts"
  | "clickOnModelToSelect"
  | "allPatients"
  | "viewAllPatientsAndSessions"
  | "patients"
  | "noPatientsFound"
  | "personalInfo"
  | "years"
  | "sessions"
  | "appointmentsSessions"
  | "noAppointments"
  | "physiotherapistProgress"
  | "viewAllPhysioData"
  | "totalPhysiotherapists"
  | "totalPatients"
  | "activeSessions"
  | "completedSessions"
  | "noPhysiotherapistsFound"
  | "completed"
  | "joinDate"
  | "specialization"
  | "workingHours"
  | "managePhysiotherapists"
  | "approveAndManageRoles"
  | "pendingRequests"
  | "activePhysiotherapists"
  | "revokedAccess"
  | "pendingApprovalRequests"
  | "noPendingRequests"
  | "requestDate"
  | "approve"
  | "reject"
  | "revoked"
  | "originalJoinDate"
  | "revokeRole"
  | "restoreRole"
  | "doctorApprovedSuccess"
  | "doctorRejectedSuccess"
  | "roleRevokedSuccess"
  | "roleRestoredSuccess"
  | "errorApprovingDoctor"
  | "errorRejectingDoctor"
  | "errorRevokingRole"
  | "errorRestoringRole"
  | "errorFetchingData"
  | "allRequests"
  | "viewAllPhysiotherapistRequests"
  | "patientInfo"
  | "assignedTo"
  | "approvedDate"
  | "rejectedDate"
  | "adminViewOnly"
  | "cannotModifyRequests"
  | "noRequestsFound"
  | "doctorRequests"
  | "totalAppointments"
  | "totalApprovedRequests"
  | "totalCompletedAppointments"
  | "upcomingAppointments"
  | "quickAccess"
  | "scheduledSessions"
  | "medicalDashboard"
  | "mainMenu"
  | "controlPanel"
  | "appointments"
  | "programs"
  | "viewProgress"
  | "patientProgress"
  | "totalSessions"
  | "typeYourMessage"
  | "pleaseEnterMessage"
  | "messageSent"
  | "to"
  | "enterSessionCount"
  | "sessionCountHint"
  | "success"
  | "patientAddedSuccessfully"
  | "selectFromList"
  | "enterManually"
  | "selectPatient"
  | "noPatientsAvailable"
  | "newPatientInfo"
  | "pleaseCompletePatientInfo"
  | "patientWillBeAddedAutomatically"
  | "enterEmail"
  | "enterPhone"
  | "age"
  | "enterAge"
  | "enterCondition"
  // Appointments missing keys
  | "loadingAppointments"
  | "newAppointment"
  | "enterFullName"
  | "minutes30"
  | "minutes45"
  | "minutes60"
  | "minutes90"
  | "enterReason"
  | "location"
  | "enterLocation"
  | "platformCommission"
  | "notes"
  | "enterNotes"
  | "scheduleAppointment"
  | "totalRevenue"
  | "searchAppointments"
  | "allStatus"
  | "allTypes"
  | "pastAppointments"
  | "noAppointments"
  | "scheduleFirstAppointment"
  | "confirm"
  | "cancel"
  | "appointmentNotes"
  | "initialAssessment"
  | "followUp"
  | "therapySession"
  | "checkUp"
  | "consultation"
  | "completedToday"
  | "viewPatients"
  | "anatomyTool"
  | "writeReport"
  | "noAppointmentsToday"
  // Profile & Settings
  | "myProfile"
  | "professionalInfo"
  | "licenseNumber"
  | "specialization"
  | "yearsExperience"
  | "certifications"
  | "updateProfile"
  | "profileUpdated"
  | "changePassword"
  | "currentPassword"
  | "newPassword"
  | "confirmPassword"
  | "passwordChanged"
  | "languagePreferences"
  | "notificationSettings"
  | "emailNotifications"
  | "smsNotifications"
  | "pushNotificationsLabel"
  | "privacySettings"
  | "showProfile"
  | "allowMessages"
  // Settings Page Keys
  | "manageAccountPreferences"
  | "accountSecurity"
  | "enterCurrentPassword"
  | "enterNewPassword"
  | "confirmNewPassword"
  | "updatePassword"
  | "notificationPreferences"
  | "patientMessages"
  | "getNotifiedPatientMessages"
  | "appointmentRemindersLabel"
  | "reminderBeforeAppointment"
  | "progressAlertsLabel"
  | "notifyPatientProgress"
  | "receiveDailyEmails"
  | "savePreferences"
  | "dangerZone"
  | "deleteAccount"
  // Notifications Page Keys
  | "stayUpdatedMessages"
  | "totalNotifications"
  | "unread"
  | "read"
  | "recentNotifications"
  | "noNotifications"
  | "newMessageFrom"
  | "appointmentReminderTitle"
  | "patientProgressAlertTitle"
  | "severePainLowerBack"
  | "appointmentTomorrow"
  | "hasNotRecordedProgress"
  | "markAsRead"
  | "approvedRequests"
  | "saving"
  | "bioPlaceholder"
  | "noBioYet"
  | "welcome"
  | "welcomeMessage"
  | "minutesAgo"
  | "hoursAgo"
  | "daysAgo"
  | "settingsSaved"
  | "notifyNewRequests"
  | "doctorApprovals"
  | "notifyDoctorApprovals"
  | "systemUpdates"
  | "notifySystemUpdates"
  | "receiveEmailNotifications"
  | "public"
  | "private"
  | "showEmail"
  | "showEmailDesc"
  | "showPhone"
  | "showPhoneDesc"
  | "navigation"
  // Subscription History Dialog
  | "subscriptionHistory"
  | "loadingSubscriptionHistory"
  | "memberSince"
  | "totalPaid"
  | "freeAccess"
  | "iqd"
  | "daysLeft"
  | "day"
  | "paymentHistory"
  | "manuallyUpgradedToPro"
  | "manualProAccessDesc"
  | "adminDirectlyUpgraded"
  | "activeProStatus"
  | "subscriptionInfo"
  | "dinar"
  | "monthDuration"
  | "subscriptionStartDate"
  | "subscriptionEndDate"
  | "calculated"
  | "unlimited"
  | "manualProAccess"
  | "noPaymentHistory"
  | "userHasNoPaymentRecords"
  | "currentSubscriptionDetails"
  | "proStatusInformation"
  | "currentSubscription"
  | "status"
  | "proUpgrade"
  | "amount"
  | "method"
  | "time"
  | "subscriptionCount"
  | "timesSubscribed"
  | "manualUpgrade"
  | "installApp"
  | "installAppDescription"
  | "install"
  | "awaitingReview"
  | "firestoreConnection"
  | "nextjsRuntime"
  | "firebaseStorage"
  | "manageUsers"
  | "reviewRequests"
  | "totalPrograms"

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
    activityLogs: "Activity Logs",
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
    enabled: "Enabled",
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
    allPhysiotherapists: "All Physiotherapists",
    registrationRequests: "Requests",
    adminPhysiotherapist: "Admin Physiotherapist",
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
  traineeMeals: "Trainee Meals",
  traineeWorkouts: "Trainee Workouts",
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
  manageAccountSecurity: "Manage your account security",
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
  redirectingToDashboard: "Redirecting to Dashboard",
  // 2FA Verification
  twoFactorAuthentication: "Two-Factor Authentication",
  enter6DigitCode: "Enter the 6-digit code from your authenticator app",
  enterBackupCode: "Enter your backup code",
  pleaseEnterComplete6DigitCode: "Please enter the complete 6-digit code",
  pleaseEnterBackupCode: "Please enter a backup code",
  twoFactorVerificationSuccessful: "2FA verification successful",
  verificationFailed: "Verification failed",
  useAuthenticatorCode: "Use authenticator code",
  useBackupCode: "Use backup code",
  backupCode: "Backup code",
  verify: "Verify",
  passwordCorrect: "Password correct - please verify 2FA",
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
  emailNotVerified: "Email Not Verified",
  pleaseCheckYourEmail: "Please verify your email before logging in. Check your inbox for the verification link.",
  registrationSuccessVerifyEmail: "Registration successful! Please check your email to verify your account before logging in.",
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
  tapToActivate: "Tap to activate",
  pushNotifications: "Push Notifications",
  applyLanguage: "Apply Language",
  accountActions: "Account Actions",
  accountActionsDesc: "Logging out will clear your session and return you to the login screen.",
  logoutButton: "Logout",
  more: "More",
  // Settings Page Specific
  customizeYourExperience: "Customize your app experience",
  chooseYourPreferredTheme: "Choose your preferred theme",
  selectYourPreferredLanguage: "Select your preferred language",
  appInformation: "App Information",
  appVersion: "Version",
  appBuild: "Build",
  appPlatform: "Platform",
  mobileAndWeb: "Mobile & Web",
  youWillBeRedirectedToLogin: "You will be redirected to the login page",
  loggingOut: "Logging out...",
  manageNotificationSettings: "Manage how you receive notifications",
  notificationChannels: "Notification Channels",
  chooseNotificationMethod: "Choose how you want to be notified",
  getInstantAlerts: "Get instant alerts",
  textMessageAlerts: "Text message alerts",
  activityNotifications: "Activity Notifications",
  chooseActivityNotifications: "Choose what activities to be notified about",
  workoutReminders: "Workout Reminders",
  dailyWorkoutNotifications: "Daily workout notifications",
  mealPlans: "Meal Plans",
  nutritionUpdates: "Nutrition updates",
  physioSessions: "Physio Sessions",
  therapyAppointments: "Therapy appointments",
  activeNotifications: "Active Notifications",
  activeChannels: "Active Channels",
  activeActivities: "Active Activities",
  totalActive: "Total Active",
  savePreferences: "Save Preferences",
  notificationsSaved: "Notification preferences saved successfully!",
  updatePersonalInfo: "Update your personal information",
  enterYourName: "Enter your name",
  enterPhoneNumber: "Enter phone number",
  clickCameraToUpload: "Click the camera icon to upload a photo",
  userNotFound: "Error: User not found",
  profileSavedSuccessfully: "Profile saved successfully!",
  failedToSaveProfile: "Failed to save profile",
  pleaseEnterName: "Please enter your name",
  invalidWeight: "Please enter a valid weight (0-500 kg)",
  invalidHeight: "Please enter a valid height (0-300 cm)",
  saving: "Saving...",
  passwordChangedSuccessfully: "Password changed successfully!",
  currentPasswordIncorrect: "Current password is incorrect",
  weakPassword: "New password is too weak. Use at least 6 characters",
  requiresRecentLogin: "Please log out and log in again before changing password",
  failedToChangePassword: "Failed to change password. Please try again",
  loggedOutSuccessfully: "Logged out successfully",
  joined: "Joined",
  active: "Active",
  expired: "Expired",
  accessKey: "Access Key",
  notSet: "Not Set",
  goal: "Goal",
  cancel: "Cancel",
  // More Menu (English)
  accessProfileSettings: "Access your profile, settings, and notifications",
  viewYourProfile: "View your profile",
  managePreferences: "Manage preferences",
  notificationSettingsDesc: "Notification settings",
  signOutFromAccount: "Sign out from account",
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
  pendingUserApprovals: "Pending User Approvals",
  emailVerified: "Email Verified",
  userApproved: "User Approved",
  canNowLogin: "can now login",
  user: "User",
  joinedDate: "Joined Date",
  actionsColumn: "Actions",
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
  assignedTo: "Assigned to",
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
  all: "All",
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
  searchPatient: "Search patient by name or email",
  searchDoctor: "Search doctor by name",
  dateFrom: "From Date",
  dateTo: "To Date",
  clearFilters: "Clear Filters",
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
  approvedRequests: "Approved Requests",
  saving: "Saving...",
  bioPlaceholder: "Tell us about yourself...",
  noBioYet: "No bio yet",
  welcome: "Welcome",
  welcomeMessage: "Welcome to your notification center. You'll receive updates here.",
  minutesAgo: "minutes ago",
  hoursAgo: "hours ago",
  daysAgo: "days ago",
  settingsSaved: "Settings saved successfully",
  notifyNewRequests: "Get notified when new patient requests arrive",
  doctorApprovals: "Doctor Approvals",
  notifyDoctorApprovals: "Get notified about doctor approval actions",
  systemUpdates: "System Updates",
  notifySystemUpdates: "Get notified about system updates",
  receiveEmailNotifications: "Receive notifications via email",
  public: "Public",
  private: "Private",
  showEmail: "Show Email",
  showEmailDesc: "Display email on profile",
  showPhone: "Show Phone",
  showPhoneDesc: "Display phone number on profile",
  navigation: "Navigation",
  installApp: "Install FitPro App",
  installAppDescription: "Install our app for a better experience with offline access and quick launch.",
  install: "Install",
  awaitingReview: "Awaiting Review",
  firestoreConnection: "Firestore Connection",
  nextjsRuntime: "Next.js Runtime",
  firebaseStorage: "Firebase Storage",
  manageUsers: "Manage Users",
  reviewRequests: "Review Requests",
  totalPrograms: "Total Programs",
  // Subscription History Dialog - English
  subscriptionHistory: "Subscription History",
  loadingSubscriptionHistory: "Loading subscription history...",
  memberSince: "Member Since",
  totalPaid: "Total Paid",
  freeAccess: "Free Access",
  iqd: "IQD",
  daysLeft: "Days Left",
  paymentHistory: "Payment History",
  manuallyUpgradedToPro: "Manually Upgraded to PRO",
  manualProAccessDesc: "This user was manually upgraded to PRO by Super Admin. No payment records were created.",
  adminDirectlyUpgraded: "Admin directly upgraded this user",
  activeProStatus: "Active PRO Status",
  subscriptionInfo: "Subscription Info",
  dinar: "Dinar",
  monthDuration: "Month",
  subscriptionStartDate: "Subscription Start",
  subscriptionEndDate: "Subscription End",
  calculated: "Calculated",
  unlimited: "Unlimited",
  manualProAccess: "Manual PRO Access",
  noPaymentHistory: "No Payment History",
  userHasNoPaymentRecords: "This user has no payment records",
  currentSubscriptionDetails: "Current Subscription Details",
  proStatusInformation: "PRO Status Information",
  currentSubscription: "Current Subscription",
  status: "Status",
  proUpgrade: "Pro Upgrade",
  amount: "Amount",
  method: "Method",
  time: "Time",
  subscriptionCount: "Subscription Count",
  timesSubscribed: "Times Subscribed",
  manualUpgrade: "Manual Upgrade",
  // Physiotherapist English
  physioWelcome: "Welcome to Physiotherapy Dashboard",
  totalPatients: "Total Patients",
  todayAppointments: "Today's Appointments",
  pendingRequests: "Pending Requests",
  completedSessions: "Completed Sessions",
  upcomingAppointments: "Upcoming Appointments",
  recentActivities: "Recent Activities",
  patientList: "Patient List",
  manageAllPatients: "Manage All Your Patients",
  searchPatients: "Search patients...",
  addPatient: "Add Patient",
  activePatients: "Active Patients",
  avgProgress: "Avg Progress",
  condition: "Condition",
  sessions: "Sessions",
  viewDetails: "View Details",
  sendMessage: "Send Message",
  editPatient: "Edit Patient",
  deletePatient: "Delete Patient",
  noPatients: "No patients found",
  patientName: "Patient Name",
  patientEmail: "Patient Email",
  patientPhone: "Phone Number",
  patientAge: "Age",
  medicalCondition: "Medical Condition",
  fillAllFields: "Please fill all fields",
  patientAdded: "Patient added successfully",
  patientUpdated: "Patient updated successfully",
  patientDeleted: "Patient deleted successfully",
  confirmDelete: "Are you sure you want to delete?",
  // Appointments English
  myAppointments: "My Appointments",
  scheduleAppointments: "Schedule & Manage Appointments",
  totalAppointments: "Total Appointments",
  todayScheduled: "Today's Schedule",
  upcomingCount: "Upcoming",
  completedCount: "Completed",
  addAppointment: "Add Appointment",
  appointmentDate: "Appointment Date",
  appointmentTime: "Appointment Time",
  duration: "Duration",
  appointmentType: "Appointment Type",
  inPerson: "In Person",
  videoCall: "Video Call",
  phoneCall: "Phone Call",
  appointmentReason: "Reason for Appointment",
  appointmentLocation: "Location",
  appointmentNotes: "Notes",
  appointmentFee: "Fee",
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  noShow: "No Show",
  appointmentScheduled: "Appointment scheduled successfully",
  appointmentUpdated: "Appointment updated successfully",
  appointmentCancelled: "Appointment cancelled",
  minutes: "minutes",
  // Progress English
  progressTracking: "Progress Tracking",
  monitorRecovery: "Monitor Patient Recovery Progress",
  totalRecords: "Total Records",
  patientsTracked: "Patients Tracked",
  addProgressRecord: "Add Progress Record",
  selectPatient: "Select a Patient",
  recordDate: "Date",
  mobilityLevel: "Mobility",
  strengthLevel: "Strength",
  painLevel: "Pain Level",
  clinicalNotes: "Clinical Notes",
  progressSaved: "Progress record saved",
  progressDeleted: "Progress record deleted",
  noProgressYet: "No progress records yet",
  // Requests English
  patientRequests: "Patient Requests",
  manageRequests: "Manage Patient Requests",
  newRequests: "New Requests",
  acceptedRequests: "Accepted",
  rejectedRequests: "Rejected",
  requestFrom: "Request from",
  injuryType: "Injury Type",
  painLevel: "Pain Level",
  requestNotes: "Request Notes",
  acceptRequest: "Accept",
  rejectRequest: "Reject",
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  requestAccepted: "Request accepted",
  requestRejected: "Request rejected",
  requestCompleted: "Request marked as completed",
  noRequests: "No requests found",
  patientNotes: "Patient Notes",
  yourResponse: "Your Response",
  responseRequired: "Response Required",
  responseRequiredMessage: "Please enter a response message before accepting the request.",
  enterResponseMessage: "Add a message for the patient...",
  previousResponse: "Your Previous Response",
  scheduleAppointment: "Schedule Appointment",
  appointmentDate: "Appointment Date",
  appointmentTime: "Appointment Time",
  sessionPrice: "Session Price",
  additionalNotes: "Additional Notes (Optional)",
  confirmAccept: "Confirm & Accept",
  appointmentScheduled: "Appointment scheduled! Patient added to your list.",
  fillAllAppointmentDetails: "Please fill in all appointment details (date, time, and price)",
  patientDetails: "Patient Details",
  pricePerSession: "Price per Session",
  appointmentHistory: "Appointment History",
  assignedPhysiotherapist: "Assigned Physiotherapist",
  registrationInfo: "Registration Information",
  createdAt: "Created At",
  markCompleted: "Mark as Completed",
  requestDetails: "Request Details",
  requestsAppearHere: "Patient requests will appear here",
  loadingRequests: "Loading requests...",
  searchRequests: "Search by patient name or injury type...",
  totalRequests: "Total Requests",
  viewDetails: "View Details",
  complete: "Complete",
  date: "Date",
  live: "LIVE",
  modelLoaded: "3D MODEL LOADED",
  modelName: "Name",
  skeletonPreCut: "Skeleton Pre-Cut",
  format: "Format",
  type: "Type",
  humanSkeleton: "Human Skeleton",
  size: "Size",
  anatomy3DViewer: "Anatomy 3D Viewer",
  view3DSkeletonModel: "View 3D human skeleton model",
  viewControl: "View Control",
  rotation: "Rotation",
  zoom: "Zoom",
  resetView: "Reset View",
  modelInfo: "Model Info",
  instructions: "Instructions",
  useSliderToRotate: "Use slider to rotate the model",
  useSliderToZoom: "Use slider to zoom in and out",
  clickButtonToReset: "Click button to return to initial view",
  selectedParts: "Selected Parts",
  lastSelected: "Last Selected",
  clickModelToSelect: "Click on the 3D model to select body parts",
  selectParts: "Select Parts",
  clickOnModelToSelect: "Click on model parts to identify them",
  allPatients: "All Patients",
  viewAllPatientsAndSessions: "View all patients with their sessions and appointments",
  patients: "Patients",
  noPatientsFound: "No patients found",
  personalInfo: "Personal Information",
  years: "years",
  sessions: "sessions",
  appointmentsSessions: "Appointments & Sessions",
  noAppointments: "No appointments found",
  physiotherapistProgress: "Physiotherapist Progress",
  viewAllPhysioData: "View all physiotherapist data and progress",
  totalPhysiotherapists: "Total Physiotherapists",
  totalPatients: "Total Patients",
  activeSessions: "Active Sessions",
  completedSessions: "Completed Sessions",
  noPhysiotherapistsFound: "No physiotherapists found",
  completed: "Completed",
  joinDate: "Join Date",
  specialization: "Specialization",
  workingHours: "Working Hours",
  managePhysiotherapists: "Manage Physiotherapists",
  approveAndManageRoles: "Approve doctors and manage roles",
  pendingRequests: "Pending Requests",
  activePhysiotherapists: "Active Physiotherapists",
  revokedAccess: "Revoked Access",
  pendingApprovalRequests: "Pending Approval Requests",
  noPendingRequests: "No pending requests",
  requestDate: "Request Date",
  approve: "Approve",
  reject: "Reject",
  revoked: "Revoked",
  originalJoinDate: "Original Join Date",
  revokeRole: "Revoke Role",
  restoreRole: "Restore Role",
  doctorApprovedSuccess: "Doctor approved successfully",
  doctorRejectedSuccess: "Doctor rejected successfully",
  roleRevokedSuccess: "Role revoked successfully",
  roleRestoredSuccess: "Role restored successfully",
  errorApprovingDoctor: "Error approving doctor",
  errorRejectingDoctor: "Error rejecting doctor",
  errorRevokingRole: "Error revoking role",
  errorRestoringRole: "Error restoring role",
  errorFetchingData: "Error fetching data",
  allRequests: "All Requests",
  viewAllPhysiotherapistRequests: "View all physiotherapist requests",
  patientInfo: "Patient Information",
  assignedTo: "Assigned To",
  approvedDate: "Approved Date",
  rejectedDate: "Rejected Date",
  adminViewOnly: "Admin View Only",
  cannotModifyRequests: "You cannot modify requests - view only",
  noRequestsFound: "No requests found",
  doctorRequests: "Doctor Requests",
  totalAppointments: "Total Appointments",
  totalApprovedRequests: "Total Approved Requests",
  totalCompletedAppointments: "Total Completed Appointments",
  upcomingAppointments: "Upcoming Appointments",
  quickAccess: "Quick Access",
  scheduledSessions: "Scheduled Sessions",
  medicalDashboard: "Medical Dashboard",
  mainMenu: "MAIN MENU",
  controlPanel: "Control Panel",
  appointments: "Appointments",
  programs: "Programs",
  viewProgress: "View Progress",
  patientProgress: "Patient Progress",
  totalSessions: "Total Sessions",
  typeYourMessage: "Type your message here...",
  pleaseEnterMessage: "Please enter a message",
  messageSent: "Message sent successfully",
  to: "To",
  enterSessionCount: "Enter number of sessions",
  sessionCountHint: "How many times the patient has visited the doctor",
  success: "Success",
  patientAddedSuccessfully: "Patient added to your list successfully",
  selectFromList: "Select from List",
  enterManually: "Enter Manually",
  selectPatient: "Select a patient",
  noPatientsAvailable: "No patients available",
  newPatientInfo: "New Patient Information",
  pleaseCompletePatientInfo: "Please complete patient information",
  patientWillBeAddedAutomatically: "This patient will be added to your list automatically",
  enterEmail: "Enter email address",
  enterPhone: "Enter phone number",
  age: "Age",
  enterAge: "Enter age",
  enterCondition: "Enter medical condition",
  loadingAppointments: "Loading appointments...",
  newAppointment: "New Appointment",
  enterFullName: "Enter full name",
  minutes30: "30 minutes",
  minutes45: "45 minutes",
  minutes60: "60 minutes",
  minutes90: "90 minutes",
  enterReason: "e.g., Physical therapy session",
  location: "Location",
  enterLocation: "Room number or location",
  platformCommission: "Platform commission",
  notes: "Notes (Optional)",
  enterNotes: "Additional notes or instructions",
  scheduleAppointment: "Schedule Appointment",
  totalRevenue: "Total Revenue",
  searchAppointments: "Search by patient name or reason...",
  allStatus: "All Status",
  allTypes: "All Types",
  pastAppointments: "Past Appointments",
  noAppointments: "No appointments found",
  scheduleFirstAppointment: "Click \"New Appointment\" to schedule your first appointment",
  confirm: "Confirm",
  cancel: "Cancel",
  appointmentNotes: "Notes",
  initialAssessment: "Initial Assessment",
  followUp: "Follow-up",
  therapySession: "Therapy Session",
  checkUp: "Check-up",
  consultation: "Consultation",
  completedToday: "Completed Today",
  viewPatients: "View Patients",
  anatomyTool: "Anatomy Tool",
  writeReport: "Write Report",
  noAppointmentsToday: "No appointments scheduled for today",
  // Profile & Settings English
  myProfile: "My Profile",
  professionalInfo: "Professional Information",
  licenseNumber: "License Number",
  specialization: "Specialization",
  yearsExperience: "Years of Experience",
  certifications: "Certifications",
  updateProfile: "Update Profile",
  profileUpdated: "Profile updated successfully",
  changePassword: "Change Password",
  currentPassword: "Current Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password",
  passwordChanged: "Password changed successfully",
  languagePreferences: "Language Preferences",
  notificationSettings: "Notification Settings",
  emailNotifications: "Email Notifications",
  smsNotifications: "SMS Notifications",
  pushNotificationsLabel: "Push Notifications",
  privacySettings: "Privacy Settings",
  showProfile: "Show Profile Publicly",
  allowMessages: "Allow Messages",
  // Settings Page Translations
  manageAccountPreferences: "Manage your account preferences and security",
  accountSecurity: "Account Security",
  enterCurrentPassword: "Enter current password",
  enterNewPassword: "Enter new password",
  confirmNewPassword: "Confirm new password",
  updatePassword: "Update Password",
  notificationPreferences: "Notification Preferences",
  patientMessages: "Patient Messages",
  getNotifiedPatientMessages: "Get notified when patients send messages",
  appointmentRemindersLabel: "Appointment Reminders",
  reminderBeforeAppointment: "Reminder before each appointment",
  progressAlertsLabel: "Progress Alerts",
  notifyPatientProgress: "Notify when patient progress is recorded",
  receiveDailyEmails: "Receive daily email summaries",
  savePreferences: "Save Preferences",
  dangerZone: "Danger Zone",
  deleteAccount: "Delete Account",
  // Notifications Page Translations
  stayUpdatedMessages: "Stay updated with patient messages and appointment reminders",
  totalNotifications: "Total Notifications",
  unread: "Unread",
  read: "Read",
  recentNotifications: "Recent Notifications",
  noNotifications: "No notifications",
  newMessageFrom: "New Message from",
  appointmentReminderTitle: "Appointment Reminder",
  patientProgressAlertTitle: "Patient Progress Alert",
  severePainLowerBack: "I have severe pain in my lower back",
  appointmentTomorrow: "appointment is tomorrow at",
  hasNotRecordedProgress: "has not recorded progress in 5 days",
  markAsRead: "Mark as Read",
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
    activityLogs: "سجل النشاطات",
    logout: "تسجيل الخروج",
    accessKeys: "مفاتيح الوصول",
    notifications: "الإشعارات",
    systemSettings: "الإعدادات",
    allPhysiotherapists: "جميع المعالجين الفيزيائيين",
    registrationRequests: "الطلبات",
    adminPhysiotherapist: "مشرف المعالجين الفيزيائيين",
    superadminPanel: "لوحة الإدارة العليا",
  loading: "جارٍ التحميل",
  updating: "جارٍ التحديث...",
    patients: "المرضى"
    ,activities: "الأنشطة"
    ,trainees: "المتدربون"
    ,traineeMeals: "وجبات المتدربين"
    ,traineeWorkouts: "تمارين المتدربين"
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
    ,manageAccountSecurity: "إدارة أمان حسابك"
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
      // 2FA Verification (Arabic)
      ,twoFactorAuthentication: "المصادقة الثنائية"
      ,enter6DigitCode: "أدخل الرمز المكون من 6 أرقام من تطبيق المصادقة"
      ,enterBackupCode: "أدخل رمز النسخ الاحتياطي"
      ,pleaseEnterComplete6DigitCode: "يرجى إدخال الرمز الكامل المكون من 6 أرقام"
      ,pleaseEnterBackupCode: "يرجى إدخال رمز النسخ الاحتياطي"
      ,twoFactorVerificationSuccessful: "نجحت المصادقة الثنائية"
      ,verificationFailed: "فشل التحقق"
      ,useAuthenticatorCode: "استخدم رمز المصادقة"
      ,useBackupCode: "استخدم رمز النسخ الاحتياطي"
      ,backupCode: "رمز النسخ الاحتياطي"
      ,verify: "تحقق"
      ,passwordCorrect: "كلمة المرور صحيحة - يرجى التحقق من المصادقة الثنائية"
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
      ,emailNotVerified: "البريد الإلكتروني غير مُوثَّق"
      ,pleaseCheckYourEmail: "يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول. تحقق من صندوق الوارد للحصول على رابط التحقق."
      ,registrationSuccessVerifyEmail: "تم التسجيل بنجاح! يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك قبل تسجيل الدخول."
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
  ,tapToActivate: "انقر للتفعيل"
  ,pushNotifications: "إشعارات الدفع"
  ,applyLanguage: "تطبيق اللغة"
  ,accountActions: "إجراءات الحساب"
  ,accountActionsDesc: "تسجيل الخروج سيمسح جلستك ويعيدك إلى شاشة تسجيل الدخول."
  ,logoutButton: "تسجيل الخروج"
  ,more: "المزيد"
  // Settings Page Specific
  ,customizeYourExperience: "تخصيص تجربتك في التطبيق"
  ,chooseYourPreferredTheme: "اختر المظهر المفضل لديك"
  ,selectYourPreferredLanguage: "اختر لغتك المفضلة"
  ,appInformation: "معلومات التطبيق"
  ,appVersion: "الإصدار"
  ,appBuild: "البناء"
  ,appPlatform: "المنصة"
  ,mobileAndWeb: "موبايل وويب"
  ,youWillBeRedirectedToLogin: "سيتم توجيهك إلى صفحة تسجيل الدخول"
  ,loggingOut: "جارٍ تسجيل الخروج..."
  ,manageNotificationSettings: "إدارة كيفية تلقي الإشعارات"
  ,notificationChannels: "قنوات الإشعارات"
  ,chooseNotificationMethod: "اختر كيفية تلقي الإشعارات"
  ,getInstantAlerts: "احصل على تنبيهات فورية"
  ,textMessageAlerts: "تنبيهات الرسائل النصية"
  ,activityNotifications: "إشعارات النشاط"
  ,chooseActivityNotifications: "اختر الأنشطة التي تريد تلقي إشعارات عنها"
  ,workoutReminders: "تذكيرات التمرين"
  ,dailyWorkoutNotifications: "إشعارات التمرين اليومية"
  ,mealPlans: "خطط الوجبات"
  ,nutritionUpdates: "تحديثات التغذية"
  ,physioSessions: "جلسات العلاج الطبيعي"
  ,therapyAppointments: "مواعيد العلاج"
  ,activeNotifications: "الإشعارات النشطة"
  ,activeChannels: "القنوات النشطة"
  ,activeActivities: "الأنشطة النشطة"
  ,totalActive: "المجموع النشط"
  ,savePreferences: "حفظ التفضيلات"
  ,notificationsSaved: "تم حفظ تفضيلات الإشعارات بنجاح!"
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
  ,pendingUserApprovals: "موافقات المستخدمين المعلقة"
  ,emailVerified: "البريد الإلكتروني موثق"
  ,userApproved: "تمت الموافقة على المستخدم"
  ,canNowLogin: "يمكنه الآن تسجيل الدخول"
  ,user: "المستخدم"
  ,joinedDate: "تاريخ الانضمام"
  ,actionsColumn: "الإجراءات"
  // Access Keys Page (Arabic)
  ,accessKeysPage: "مفاتيح الوصول"
  ,generateAndManageKeys: "إنشاء وإدارة مفاتيح الوصول"
  ,generateNewKey: "إنشاء مفتاح جديد"
  ,generating: "جارٍ الإنشاء..."
  ,totalKeys: "إجمالي المفاتيح"
  ,expired: "منتهية"
  ,enabled: "مفعل"
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
  ,assignedTo: "معين لـ"
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
  ,all: "الكل"
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
  ,searchPatient: "البحث عن مريض بالاسم أو البريد الإلكتروني"
  ,searchDoctor: "البحث عن طبيب بالاسم"
  ,dateFrom: "من تاريخ"
  ,dateTo: "إلى تاريخ"
  ,clearFilters: "مسح الفلاتر"
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
  ,live: "مباشر"
  ,modelLoaded: "تم تحميل النموذج ثلاثي الأبعاد"
  ,modelName: "الاسم"
  ,skeletonPreCut: "الهيكل العظمي مسبق القطع"
  ,format: "التنسيق"
  ,type: "النوع"
  ,humanSkeleton: "الهيكل العظمي البشري"
  ,size: "الحجم"
  ,anatomy3DViewer: "عارض التشريح ثلاثي الأبعاد"
  ,view3DSkeletonModel: "عرض نموذج الهيكل العظمي البشري ثلاثي الأبعاد"
  ,viewControl: "التحكم بالعرض"
  ,rotation: "الدوران"
  ,zoom: "التكبير"
  ,resetView: "إعادة تعيين العرض"
  ,modelInfo: "معلومات النموذج"
  ,instructions: "التعليمات"
  ,useSliderToRotate: "استخدم شريط التمرير لتدوير النموذج"
  ,useSliderToZoom: "استخدم شريط التمرير للتكبير والتصغير"
  ,clickButtonToReset: "انقر على الزر للعودة إلى العرض الأولي"
  ,selectedParts: "الأجزاء المختارة"
  ,lastSelected: "آخر اختيار"
  ,clickModelToSelect: "انقر على النموذج ثلاثي الأبعاد لاختيار أجزاء الجسم"
  ,selectParts: "اختيار الأجزاء"
  ,clickOnModelToSelect: "انقر على أجزاء النموذج لتحديدها"
  ,allPatients: "جميع المرضى"
  ,viewAllPatientsAndSessions: "عرض جميع المرضى مع جلساتهم ومواعيدهم"
  ,patients: "المرضى"
  ,noPatientsFound: "لم يتم العثور على مرضى"
  ,personalInfo: "المعلومات الشخصية"
  ,years: "سنوات"
  ,sessions: "جلسات"
  ,appointmentsSessions: "المواعيد والجلسات"
  ,noAppointments: "لا توجد مواعيد"
  ,patientDetails: "تفاصيل المريض"
  ,pricePerSession: "السعر لكل جلسة"
  ,appointmentHistory: "سجل المواعيد"
  ,assignedPhysiotherapist: "أخصائي العلاج الطبيعي المعين"
  ,registrationInfo: "معلومات التسجيل"
  ,createdAt: "تاريخ الإنشاء"
  ,physiotherapistProgress: "تقدم المعالجين الفيزيائيين"
  ,viewAllPhysioData: "عرض جميع بيانات وتقدم المعالجين الفيزيائيين"
  ,totalPhysiotherapists: "إجمالي المعالجين الفيزيائيين"
  ,totalPatients: "إجمالي المرضى"
  ,activeSessions: "الجلسات النشطة"
  ,completedSessions: "الجلسات المكتملة"
  ,noPhysiotherapistsFound: "لم يتم العثور على معالجين فيزيائيين"
  ,completed: "مكتمل"
  ,joinDate: "تاريخ الانضمام"
  ,specialization: "التخصص"
  ,workingHours: "ساعات العمل"
  ,managePhysiotherapists: "إدارة المعالجين الفيزيائيين"
  ,approveAndManageRoles: "الموافقة على الأطباء وإدارة الأدوار"
  ,pendingRequests: "الطلبات المعلقة"
  ,activePhysiotherapists: "المعالجون النشطون"
  ,revokedAccess: "الوصول الملغى"
  ,pendingApprovalRequests: "طلبات الموافقة المعلقة"
  ,noPendingRequests: "لا توجد طلبات معلقة"
  ,requestDate: "تاريخ الطلب"
  ,approve: "موافقة"
  ,reject: "رفض"
  ,revoked: "ملغى"
  ,originalJoinDate: "تاريخ الانضمام الأصلي"
  ,revokeRole: "إلغاء الدور"
  ,restoreRole: "استعادة الدور"
  ,doctorApprovedSuccess: "تمت الموافقة على الطبيب بنجاح"
  ,doctorRejectedSuccess: "تم رفض الطبيب بنجاح"
  ,roleRevokedSuccess: "تم إلغاء الدور بنجاح"
  ,roleRestoredSuccess: "تمت استعادة الدور بنجاح"
  ,errorApprovingDoctor: "خطأ في الموافقة على الطبيب"
  ,errorRejectingDoctor: "خطأ في رفض الطبيب"
  ,errorRevokingRole: "خطأ في إلغاء الدور"
  ,errorRestoringRole: "خطأ في استعادة الدور"
  ,errorFetchingData: "خطأ في جلب البيانات"
  ,allRequests: "جميع الطلبات"
  ,viewAllPhysiotherapistRequests: "عرض جميع طلبات المعالجين الفيزيائيين"
  ,patientInfo: "معلومات المريض"
  ,assignedTo: "مخصص لـ"
  ,approvedDate: "تاريخ الموافقة"
  ,rejectedDate: "تاريخ الرفض"
  ,adminViewOnly: "عرض المسؤول فقط"
  ,cannotModifyRequests: "لا يمكنك تعديل الطلبات - عرض فقط"
  ,noRequestsFound: "لم يتم العثور على طلبات"
  ,doctorRequests: "طلبات الأطباء"
  ,totalAppointments: "إجمالي المواعيد"
  ,totalApprovedRequests: "إجمالي الطلبات المعتمدة"
  ,totalCompletedAppointments: "إجمالي المواعيد المكتملة"
  ,upcomingAppointments: "المواعيد القادمة"
  ,quickAccess: "الوصول السريع"
  ,scheduledSessions: "الجلسات المجدولة"
  ,medicalDashboard: "لوحة التحكم الطبية"
  ,mainMenu: "القائمة الرئيسية"
  ,controlPanel: "لوحة التحكم"
  ,appointments: "المواعيد"
  ,programs: "البرامج"
  ,viewProgress: "عرض التقدم"
  ,patientProgress: "تقدم المريض"
  ,totalSessions: "إجمالي الجلسات"
  ,typeYourMessage: "اكتب رسالتك هنا..."
  ,pleaseEnterMessage: "يرجى إدخال رسالة"
  ,messageSent: "تم إرسال الرسالة بنجاح"
  ,to: "إلى"
  ,enterSessionCount: "أدخل عدد الجلسات"
  ,sessionCountHint: "عدد مرات زيارة المريض للطبيب"
  ,success: "نجاح"
  ,patientAddedSuccessfully: "تمت إضافة المريض إلى قائمتك بنجاح"
  ,selectFromList: "اختر من القائمة"
  ,enterManually: "أدخل يدوياً"
  ,selectPatient: "اختر مريض"
  ,noPatientsAvailable: "لا يوجد مرضى متاحون"
  ,newPatientInfo: "معلومات المريض الجديد"
  ,pleaseCompletePatientInfo: "يرجى إكمال معلومات المريض"
  ,patientWillBeAddedAutomatically: "سيتم إضافة هذا المريض إلى قائمتك تلقائياً"
  ,enterEmail: "أدخل البريد الإلكتروني"
  ,enterPhone: "أدخل رقم الهاتف"
  ,age: "العمر"
  ,enterAge: "أدخل العمر"
  ,enterCondition: "أدخل الحالة الطبية"
  // Settings Page Arabic
  ,manageAccountPreferences: "إدارة تفضيلات حسابك والأمان"
  ,accountSecurity: "أمان الحساب"
  ,enterCurrentPassword: "أدخل كلمة المرور الحالية"
  ,enterNewPassword: "أدخل كلمة المرور الجديدة"
  ,confirmNewPassword: "تأكيد كلمة المرور الجديدة"
  ,updatePassword: "تحديث كلمة المرور"
  ,notificationPreferences: "تفضيلات الإشعارات"
  ,patientMessages: "رسائل المرضى"
  ,getNotifiedPatientMessages: "احصل على إشعار عندما يرسل المرضى رسائل"
  ,appointmentRemindersLabel: "تذكيرات المواعيد"
  ,reminderBeforeAppointment: "تذكير قبل كل موعد"
  ,progressAlertsLabel: "تنبيهات التقدم"
  ,notifyPatientProgress: "إشعار عند تسجيل تقدم المريض"
  ,receiveDailyEmails: "استلام ملخصات يومية عبر البريد الإلكتروني"
  ,savePreferences: "حفظ التفضيلات"
  ,dangerZone: "منطقة الخطر"
  ,deleteAccount: "حذف الحساب"
  // Notifications Page Arabic
  ,stayUpdatedMessages: "ابق على اطلاع برسائل المرضى وتذكيرات المواعيد"
  ,totalNotifications: "إجمالي الإشعارات"
  ,unread: "غير مقروءة"
  ,read: "مقروءة"
  ,recentNotifications: "الإشعارات الأخيرة"
  ,noNotifications: "لا توجد إشعارات"
  ,newMessageFrom: "رسالة جديدة من"
  ,appointmentReminderTitle: "تذكير بموعد"
  ,patientProgressAlertTitle: "تنبيه تقدم المريض"
  ,severePainLowerBack: "لدي ألم شديد في أسفل ظهري"
  ,appointmentTomorrow: "موعد غداً في الساعة"
  ,hasNotRecordedProgress: "لم يسجل تقدماً منذ 5 أيام"
  ,markAsRead: "وضع علامة كمقروء"
  ,approvedRequests: "الطلبات الموافق عليها"
  ,saving: "جاري الحفظ..."
  ,bioPlaceholder: "أخبرنا عن نفسك..."
  ,noBioYet: "لا يوجد سيرة ذاتية بعد"
  ,welcome: "مرحباً"
  ,welcomeMessage: "مرحباً بك في مركز الإشعارات. ستتلقى التحديثات هنا."
  ,minutesAgo: "منذ دقائق"
  ,hoursAgo: "منذ ساعات"
  ,daysAgo: "منذ أيام"
  ,settingsSaved: "تم حفظ الإعدادات بنجاح"
  ,notifyNewRequests: "احصل على إشعار عند وصول طلبات مرضى جديدة"
  ,doctorApprovals: "موافقات الأطباء"
  ,notifyDoctorApprovals: "احصل على إشعار حول إجراءات موافقة الأطباء"
  ,systemUpdates: "تحديثات النظام"
  ,notifySystemUpdates: "احصل على إشعار حول تحديثات النظام"
  ,receiveEmailNotifications: "استلام الإشعارات عبر البريد الإلكتروني"
  ,public: "عام"
  ,private: "خاص"
  ,showEmail: "إظهار البريد الإلكتروني"
  ,showEmailDesc: "عرض البريد الإلكتروني في الملف الشخصي"
  ,showPhone: "إظهار الهاتف"
  ,installApp: "تثبيت تطبيق FitPro"
  ,installAppDescription: "قم بتثبيت تطبيقنا للحصول على تجربة أفضل مع الوصول دون اتصال والإطلاق السريع."
  ,install: "تثبيت"
  ,showPhoneDesc: "عرض رقم الهاتف في الملف الشخصي"
  // Subscription History Dialog - Arabic
  ,subscriptionHistory: "سجل الاشتراك"
  ,loadingSubscriptionHistory: "جارٍ تحميل سجل الاشتراك..."
  ,memberSince: "عضو منذ"
  ,totalPaid: "إجمالي المدفوع"
  ,freeAccess: "وصول مجاني"
  ,iqd: "دينار عراقي"
  ,daysLeft: "الأيام المتبقية"
  ,paymentHistory: "سجل الدفعات"
  ,manuallyUpgradedToPro: "تمت الترقية يدويًا إلى PRO"
  ,manualProAccessDesc: "تمت ترقية هذا المستخدم يدويًا إلى PRO من قبل المشرف الأعلى. لم يتم إنشاء سجلات دفع."
  ,adminDirectlyUpgraded: "قام المشرف بترقية هذا المستخدم مباشرة"
  ,activeProStatus: "حالة PRO نشطة"
  ,subscriptionInfo: "معلومات الاشتراك"
  ,dinar: "دينار"
  ,monthDuration: "شهر"
  ,subscriptionStartDate: "بداية الاشتراك"
  ,subscriptionEndDate: "نهاية الاشتراك"
  ,calculated: "محسوب"
  ,unlimited: "غير محدود"
  ,manualProAccess: "وصول PRO يدوي"
  ,noPaymentHistory: "لا يوجد سجل دفعات"
  ,userHasNoPaymentRecords: "هذا المستخدم ليس لديه سجلات دفع"
  ,currentSubscriptionDetails: "تفاصيل الاشتراك الحالي"
  ,proStatusInformation: "معلومات حالة PRO"
  ,currentSubscription: "الاشتراك الحالي"
  ,status: "الحالة"
  ,proUpgrade: "ترقية Pro"
  ,amount: "المبلغ"
  ,method: "الطريقة"
  ,time: "الوقت"
  ,subscriptionCount: "عدد الاشتراكات"
  ,timesSubscribed: "مرات الاشتراك"
  ,manualUpgrade: "ترقية يدوية"
  ,navigation: "التنقل"
  ,updatePersonalInfo: "تحديث معلوماتك الشخصية"
  ,enterYourName: "أدخل اسمك"
  ,enterPhoneNumber: "أدخل رقم الهاتف"
  ,clickCameraToUpload: "انقر على أيقونة الكاميرا لتحميل صورة"
  ,userNotFound: "خطأ: المستخدم غير موجود"
  ,profileSavedSuccessfully: "تم حفظ الملف الشخصي بنجاح!"
  ,failedToSaveProfile: "فشل حفظ الملف الشخصي"
  ,pleaseEnterName: "الرجاء إدخال اسمك"
  ,invalidWeight: "الرجاء إدخال وزن صحيح (0-500 كجم)"
  ,invalidHeight: "الرجاء إدخال طول صحيح (0-300 سم)"
  ,saving: "جارٍ الحفظ..."
  ,passwordChangedSuccessfully: "تم تغيير كلمة المرور بنجاح!"
  ,currentPasswordIncorrect: "كلمة المرور الحالية غير صحيحة"
  ,weakPassword: "كلمة المرور الجديدة ضعيفة جداً. استخدم 6 أحرف على الأقل"
  ,requiresRecentLogin: "يرجى تسجيل الخروج وتسجيل الدخول مرة أخرى قبل تغيير كلمة المرور"
  ,failedToChangePassword: "فشل تغيير كلمة المرور. يرجى المحاولة مرة أخرى"
  ,loggedOutSuccessfully: "تم تسجيل الخروج بنجاح"
  ,joined: "انضم في"
  ,active: "نشط"
  ,expired: "منتهي الصلاحية"
  ,accessKey: "مفتاح الوصول"
  ,notSet: "غير محدد"
  ,goal: "الهدف"
  ,cancel: "إلغاء"
  // More Menu (Arabic)
  ,accessProfileSettings: "الوصول إلى ملفك الشخصي والإعدادات والإشعارات"
  ,viewYourProfile: "عرض ملفك الشخصي"
  ,managePreferences: "إدارة التفضيلات"
  ,notificationSettingsDesc: "إعدادات الإشعارات"
  ,signOutFromAccount: "تسجيل الخروج من الحساب"
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
    activityLogs: "لۆگی چالاکیەکان",
    logout: "دەرچوون",
    accessKeys: "کلیلی دەستگەیشتن",
    notifications: "ئاگانامەکان",
    systemSettings: "ڕێکخستنەکانی سیستەم",
    allPhysiotherapists: "هەموو فیزیۆتێراپیستەکان",
    registrationRequests: "داواکاری",
    adminPhysiotherapist: "سەرپەرشتیاری فیزیۆتێراپیستەکان",
    superadminPanel: "پەنێڵی سوپرئادمین",
  loading: "بارکردن",
  updating: "نوێکردنەوە...",
    patients: "نەخوشەکان"
    ,activities: "چالاکیەکان"
    ,trainees: "فێركراوەکان"
    ,traineeMeals: "خواردنی فێركراوان"
    ,traineeWorkouts: "ڕاهێنانی فێركراوان"
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
  ,email: "ئیمەیڵ"
  ,emailOrUsername: "ئیمەیڵ یان ناوی بەکارهێنەر"
  ,name: "ناو"
  ,phone: "ژمارەی مۆبایل"
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
    ,manageAccountSecurity: "بەڕێوەبردنی ئاسایشی هەژمارەکەت"
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
      // 2FA Verification (Kurdish)
      ,twoFactorAuthentication: "ڕاستکردنەوەی دوو هێڵکی"
      ,enter6DigitCode: "کۆدی 6 ژمارەیی داخڵ بکە لە ئەپی ڕاستکردنەوەکەت"
      ,enterBackupCode: "کۆدی یەدەگی خۆت داخڵ بکە"
      ,pleaseEnterComplete6DigitCode: "تکایە هەموو کۆدی 6 ژمارەیی داخڵ بکە"
      ,pleaseEnterBackupCode: "تکایە کۆدی یەدەگی داخڵ بکە"
      ,twoFactorVerificationSuccessful: "ڕاستکردنەوەی دوو هێڵکی سەرکەوتوو بوو"
      ,verificationFailed: "ڕاستکردنەوە شکستی هێنا"
      ,useAuthenticatorCode: "کۆدی ڕاستکردنەوە بەکاربهێنە"
      ,useBackupCode: "کۆدی یەدەگی بەکاربهێنە"
      ,backupCode: "کۆدی یەدەگی"
      ,verify: "ڕاستکردنەوە"
      ,passwordCorrect: "پاسوۆرد ڕاستە - تکایە ڕاستکردنەوەی دوو هێڵکی بکە"
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
      ,emailNotVerified: "ئیمەیڵەکە پشتڕاست نەکراوەتەوە"
      ,pleaseCheckYourEmail: "تکایە پێش چوونەژوورەوە ئیمەیڵەکەت پشتڕاست بکەرەوە. سەیری inbox-ەکەت بکە بۆ لینکی پشتڕاستکردنەوە."
      ,registrationSuccessVerifyEmail: "تۆمارکردن سەرکەوتوو بوو! تکایە سەیری ئیمەیڵەکەت بکە بۆ پشتڕاستکردنەوەی هەژمارەکەت پێش چوونەژوورەوە."
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
    ,tapToActivate: "کرتە بکە بۆ چالاککردن"
    ,pushNotifications: "ئاگانامەی پێش"
    ,applyLanguage: "جێبەجێکردنی زمان"
    ,accountActions: "کردارەکانی هەژمار"
    ,accountActionsDesc: "دەرچوون دەبێتە هۆی پاککردنەوەی دانیشتنەکەت و گەڕانەوەت بۆ پەڕەی چوونەژوورەوە."
    ,logoutButton: "دەرچوون"
    ,more: "زیاتر"
    // Settings Page Specific
    ,customizeYourExperience: "ئەزموونی ئەپەکەت دڵخواز بکە"
    ,chooseYourPreferredTheme: "ڕوکاری دڵخوازت هەڵبژێرە"
    ,selectYourPreferredLanguage: "زمانی دڵخوازت هەڵبژێرە"
    ,appInformation: "زانیاریی ئەپ"
    ,appVersion: "وەشان"
    ,appBuild: "بیلد"
    ,appPlatform: "پلاتفۆرم"
    ,mobileAndWeb: "مۆبایل و وێب"
    ,youWillBeRedirectedToLogin: "ئاراستە دەکرێیتەوە بۆ پەڕەی چوونەژوورەوە"
    ,loggingOut: "دەرچوون..."
    ,manageNotificationSettings: "بەڕێوەبردنی چۆنیەتی وەرگرتنی ئاگادارییەکان"
    ,notificationChannels: "کەناڵەکانی ئاگادارکردنەوە"
    ,chooseNotificationMethod: "هەڵبژێرە چۆن دەتەوێت ئاگادار بکرێیتەوە"
    ,getInstantAlerts: "ئاگاداریی خێرا وەربگرە"
    ,textMessageAlerts: "ئاگاداریی نامەی دەقی"
    ,activityNotifications: "ئاگاداریی چالاکییەکان"
    ,chooseActivityNotifications: "هەڵبژێرە کام چالاکییەکان ئاگادارت بکەنەوە"
    ,workoutReminders: "بیرخستنەوەی ڕاهێنان"
    ,dailyWorkoutNotifications: "ئاگادارییەکانی ڕاهێنانی ڕۆژانە"
    ,mealPlans: "پلانی خواردن"
    ,nutritionUpdates: "نوێکردنەوەی خۆراک"
    ,physioSessions: "دانیشتنەکانی فیزیۆتێراپی"
    ,therapyAppointments: "کاتی چارەسەرکردن"
    ,activeNotifications: "ئاگاداریی چالاک"
    ,activeChannels: "کەناڵی چالاک"
    ,activeActivities: "چالاکیی چالاک"
    ,totalActive: "کۆی چالاک"
    ,savePreferences: "پاشەکەوتکردنی هەڵبژاردنەکان"
    ,notificationsSaved: "هەڵبژاردنەکانی ئاگادارکردنەوە بە سەرکەوتوویی پاشەکەوت کرا!"
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
    ,allUsers: "بەکارهێنەران"
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
    ,proRequests: "پڕۆ"
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
    ,pendingUserApprovals: "پەسەندکردنی یوزەرە چاوەڕوانکراوەکان"
    ,emailVerified: "ئیمەیڵ پشتڕاستکراوەتەوە"
    ,userApproved: "یوزەر پەسەندکرا"
    ,canNowLogin: "دەتوانێت ئێستا بچێتە ژوورەوە"
    ,user: "یوزەر"
    ,joinedDate: "بەرواری پەیوەندیکردن"
    ,actionsColumn: "کردارەکان"
    // Access Keys Page (Kurdish)
    ,accessKeysPage: "کلیلەکانی دەستگەیشتن"
    ,generateAndManageKeys: "دروستکردن و بەڕێوەبردنی کلیلەکانی دەستگەیشتن"
    ,generateNewKey: "دروستکردنی کلیلی نوێ"
    ,generating: "دروستدەکرێت..."
    ,totalKeys: "کۆی کلیلەکان"
    ,expired: "بەسەرچووە"
    ,enabled: "چالاک"
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
    ,assignedTo: "دیاریکراوە بۆ"
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
    ,all: "هەموو"
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
    ,searchPatient: "گەڕان بە ناوی نەخۆش یان ئیمەیڵ"
    ,searchDoctor: "گەڕان بە ناوی دکتۆر"
    ,dateFrom: "لە بەرواری"
    ,dateTo: "بۆ بەرواری"
    ,clearFilters: "سڕینەوەی فلتەرەکان"
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
    // Physiotherapist Kurdish
    ,physioWelcome: "بەخێربێیت بۆ داشبۆردی فیزۆثێراپی"
    ,totalPatients: "کۆی نەخۆشەکان"
    ,todayAppointments: "نۆرەکانی ئەمڕۆ"
    ,pendingRequests: "داواکارییە چاوەڕوانەکان"
    ,completedSessions: "دانیشتنە تەواوبووەکان"
    ,upcomingAppointments: "نۆرەکانی داهاتوو"
    ,recentActivities: "چالاکییە تازەکان"
    ,patientList: "لیستی نەخۆشەکان"
    ,manageAllPatients: "بەڕێوەبردنی هەموو نەخۆشەکان"
    ,searchPatients: "گەڕان بە دوای نەخۆشەکان..."
    ,addPatient: "زیادکردنی نەخۆش"
    ,activePatients: "نەخۆشە چالاکەکان"
    ,avgProgress: "پێشکەوتنی ناوەند"
    ,condition: "حاڵەت"
    ,sessions: "دانیشتنەکان"
    ,viewDetails: "بینینی وردەکاری"
    ,sendMessage: "ناردنی پەیام"
    ,editPatient: "دەستکاریکردنی نەخۆش"
    ,deletePatient: "سڕینەوەی نەخۆش"
    ,noPatients: "هیچ نەخۆشێک نەدۆزرایەوە"
    ,patientName: "ناوی نەخۆش"
    ,patientEmail: "ئیمەیڵی نەخۆش"
    ,patientPhone: "ژمارە تەلەفۆن"
    ,patientAge: "تەمەن"
    ,medicalCondition: "حاڵەتی تەندروستی"
    ,fillAllFields: "تکایە هەموو خانەکان پڕبکەرەوە"
    ,patientAdded: "نەخۆش بە سەرکەوتوویی زیادکرا"
    ,patientUpdated: "نەخۆش بە سەرکەوتوویی نوێکرایەوە"
    ,patientDeleted: "نەخۆش بە سەرکەوتوویی سڕایەوە"
    ,confirmDelete: "دڵنیایت لە سڕینەوە؟"
    // Appointments Kurdish
    ,myAppointments: "نۆرەکانم"
    ,scheduleAppointments: "خشتەی نۆرەکان"
    ,totalAppointments: "کۆی نۆرەکان"
    ,todayScheduled: "نۆرەکانی ئەمڕۆ"
    ,upcomingCount: "نۆرەکانی داهاتوو"
    ,completedCount: "نۆرە تەواوبووەکان"
    ,addAppointment: "زیادکردنی نۆرە"
    ,appointmentDate: "بەرواری نۆرە"
    ,appointmentTime: "کاتی نۆرە"
    ,duration: "ماوە"
    ,appointmentType: "جۆری نۆرە"
    ,inPerson: "ڕووبەڕوو"
    ,videoCall: "پەیوەندی ڤیدیۆیی"
    ,phoneCall: "پەیوەندی تەلەفۆنی"
    ,appointmentReason: "هۆکاری نۆرە"
    ,appointmentLocation: "شوێنی نۆرە"
    ,appointmentNotes: "تێبینیەکان"
    ,appointmentFee: "نرخی نۆرە"
    ,scheduled: "خشتەکرا"
    ,confirmed: "پشتڕاستکرایەوە"
    ,completed: "تەواوبوو"
    ,cancelled: "هەڵوەشایەوە"
    ,noShow: "نەهات"
    ,appointmentScheduled: "نۆرە بە سەرکەوتوویی خشتەکرا"
    ,appointmentUpdated: "نۆرە بە سەرکەوتوویی نوێکرایەوە"
    ,appointmentCancelled: "نۆرە هەڵوەشایەوە"
    ,minutes: "خولەک"
    // Progress Kurdish
    ,progressTracking: "چاودێری پێشکەوتن"
    ,monitorRecovery: "چاودێری چاکبوونەوە"
    ,totalRecords: "کۆی تۆمارەکان"
    ,patientsTracked: "نەخۆشە چاودێریکراوەکان"
    ,addProgressRecord: "زیادکردنی تۆماری پێشکەوتن"
    ,selectPatient: "هەڵبژاردنی نەخۆش"
    ,recordDate: "بەرواری تۆمار"
    ,mobilityLevel: "ئاستی جموجوڵ"
    ,strengthLevel: "ئاستی هێز"
    ,painLevel: "ئاستی ئازار"
    ,clinicalNotes: "تێبینیەکانی کلینیکی"
    ,progressSaved: "پێشکەوتن تۆمارکرا"
    ,progressDeleted: "پێشکەوتن سڕایەوە"
    ,noProgressYet: "هێشتا هیچ پێشکەوتنێک تۆمار نەکراوە"
    // Requests Kurdish
    ,patientRequests: "داواکارییەکانی نەخۆشەکان"
    ,manageRequests: "بەڕێوەبردنی داواکارییەکان"
    ,newRequests: "داواکارییە تازەکان"
    ,acceptedRequests: "داواکاری قەبووڵکراوەکان"
    ,rejectedRequests: "داواکاری ڕەتکراوەکان"
    ,requestFrom: "داواکاری لە"
    ,injuryType: "جۆری برینداربوون"
    ,painLevel: "ئاستی ئازار"
    ,requestNotes: "تێبینیەکانی داواکاری"
    ,acceptRequest: "قەبووڵکردن"
    ,rejectRequest: "ڕەتکردنەوە"
    ,pending: "چاوەڕوان"
    ,accepted: "قەبووڵکرا"
    ,rejected: "ڕەتکرایەوە"
    ,requestAccepted: "داواکاری قەبووڵکرا"
    ,requestRejected: "داواکاری ڕەتکرایەوە"
    ,requestCompleted: "داواکاری وەک تەواو نیشانکرا"
    ,noRequests: "هیچ داواکارییەک نییە"
    ,patientNotes: "تێبینییەکانی نەخۆش"
    ,yourResponse: "وەڵامی تۆ"
    ,responseRequired: "وەڵام پێویستە"
    ,responseRequiredMessage: "تکایە وەڵامێک بنووسە پێش لە قەبووڵکردنی داواکارییەکە"
    ,responseRequiredMessage: "تکایە وەڵامێک بنووسە پێش لە قەبووڵکردنی داواکاریکە"
    ,enterResponseMessage: "پەیامێک بۆ نەخۆش بنووسە..."
    ,previousResponse: "وەڵامی پێشووت"
    ,markCompleted: "وەک تەواوکراو نیشانبکە"
    ,requestDetails: "وردەکارییەکانی داواکاری"
    ,scheduleAppointment: "دانانی نۆرە"
    ,appointmentDate: "بەرواری نۆرە"
    ,appointmentTime: "کاتژمێری نۆرە"
    ,sessionPrice: "نرخی جلسە"
    ,additionalNotes: "تێبینییە زیادەکان (ئارەزوومەندانە)"
    ,confirmAccept: "دڵنیاکردنەوە و قەبووڵکردن"
    ,appointmentScheduled: "نۆرە دانرا! نەخۆش زیادکرا بۆ لیستەکەت."
    ,fillAllAppointmentDetails: "تکایە هەموو وردەکارییەکانی نۆرە پڕبکەرەوە (بەروار، کاتژمێر و نرخ)"
    ,patientDetails: "وردەکارییەکانی نەخۆش"
    ,pricePerSession: "نرخی هەر سیشنێک"
    ,appointmentHistory: "مێژووی چاوپێکەوتنەکان"
    ,assignedPhysiotherapist: "دکتۆری دیاریکراو"
    ,registrationInfo: "زانیاریی تۆمارکردن"
    ,createdAt: "دروستکراوە لە"
    ,requestsAppearHere: "داواکارییەکانی نەخۆش لێرە دەردەکەون"
    ,loadingRequests: "باریکردنی داواکارییەکان..."
    ,searchRequests: "بگەڕێ بە ناوی نەخۆش یان جۆری برین..."
    ,totalRequests: "کۆی داواکارییەکان"
    ,viewDetails: "وردەکاری ببینە"
    ,complete: "تەواوکردن"
    ,date: "بەروار"
    ,live: "زیندوو"
    ,modelLoaded: "مۆدێلی ٣ڕەهەند باریکرا"
    ,modelName: "ناو"
    ,skeletonPreCut: "ئیسکەلێتی پێش بڕین"
    ,format: "فۆرمات"
    ,type: "جۆر"
    ,humanSkeleton: "ئیسکەلێتی مرۆڤ"
    ,size: "قەبارە"
    ,anatomy3DViewer: "بینەری ئەناتۆمی ٣ ڕەهەندی"
    ,view3DSkeletonModel: "بینینی مۆدێلی سێ ڕەهەندی ئیسکەلێتی مرۆڤ"
    ,viewControl: "کۆنترۆڵی بینین"
    ,rotation: "سوڕانەوە"
    ,zoom: "زووم"
    ,resetView: "ڕێکخستنەوە"
    ,modelInfo: "زانیاری مۆدێل"
    ,instructions: "ڕێنمایی"
    ,useSliderToRotate: "خشۆکە بەکاربهێنە بۆ سوڕاندنی مۆدێل"
    ,useSliderToZoom: "خشۆکە بەکاربهێنە بۆ نزیک و دوورکردنەوە"
    ,clickButtonToReset: "دوگمە بۆ گەڕانەوە بۆ دۆخی یەکەم"
    ,selectedParts: "بەشە هەڵبژێردراوەکان"
    ,lastSelected: "دوایین هەڵبژێردراو"
    ,clickModelToSelect: "کلیک لەسەر مۆدێلی ٣ ڕەهەندی بکە بۆ هەڵبژاردنی بەشەکانی جەستە"
    ,selectParts: "هەڵبژاردنی بەشەکان"
    ,clickOnModelToSelect: "کلیک لەسەر بەشەکانی مۆدێل بکە بۆ دیاریکردنیان"
    ,allPatients: "هەموو نەخۆشەکان"
    ,viewAllPatientsAndSessions: "بینینی هەموو نەخۆشەکان لەگەڵ دانیشتن و چاوپێکەوتنەکانیان"
    ,patients: "نەخۆشەکان"
    ,noPatientsFound: "هیچ نەخۆشێک نەدۆزرایەوە"
    ,personalInfo: "زانیاری کەسی"
    ,years: "ساڵ"
    ,sessions: "دانیشتنەکان"
    ,appointmentsSessions: "چاوپێکەوتن و دانیشتنەکان"
    ,noAppointments: "هیچ چاوپێکەوتنێک نییە"
    ,physiotherapistProgress: "پێشکەوتنی فیزیۆتێراپیستەکان"
    ,viewAllPhysioData: "بینینی هەموو داتا و پێشکەوتنی فیزیۆتێراپیستەکان"
    ,totalPhysiotherapists: "کۆی فیزیۆتێراپیستەکان"
    ,totalPatients: "کۆی نەخۆشەکان"
    ,activeSessions: "دانیشتنە چالاکەکان"
    ,completedSessions: "دانیشتنە تەواوبووەکان"
    ,noPhysiotherapistsFound: "هیچ فیزیۆتێراپیستێک نەدۆزرایەوە"
    ,completed: "تەواوبووە"
    ,joinDate: "بەرواری بەشداربوون"
    ,specialization: "پسپۆڕی"
    ,workingHours: "کاتی کار"
    ,managePhysiotherapists: "بەڕێوەبردنی فیزیۆتێراپیستەکان"
    ,approveAndManageRoles: "پەسەندکردنی دکتۆرەکان و بەڕێوەبردنی رۆڵەکان"
    ,pendingRequests: "داواکاری چاوەڕێ"
    ,activePhysiotherapists: "فیزیۆتێراپیستە چالاکەکان"
    ,revokedAccess: "دەستڕاگەیشتنی هەڵوەشاوە"
    ,pendingApprovalRequests: "داواکاری چاوەڕێی پەسەندکردن"
    ,noPendingRequests: "هیچ داواکاریەکی چاوەڕێ نییە"
    ,requestDate: "بەرواری داواکاری"
    ,approve: "پەسەندکردن"
    ,reject: "ڕەتکردنەوە"
    ,revoked: "هەڵوەشاوە"
    ,originalJoinDate: "بەرواری یەکەمی بەشداربوون"
    ,revokeRole: "هەڵوەشاندنەوەی رۆڵ"
    ,restoreRole: "گەڕاندنەوەی رۆڵ"
    ,doctorApprovedSuccess: "دکتۆرەکە بە سەرکەوتوویی پەسەندکرا"
    ,doctorRejectedSuccess: "دکتۆرەکە بە سەرکەوتوویی ڕەتکرایەوە"
    ,roleRevokedSuccess: "رۆڵەکە بە سەرکەوتوویی هەڵوەشایەوە"
    ,roleRestoredSuccess: "رۆڵەکە بە سەرکەوتوویی گەڕایەوە"
    ,errorApprovingDoctor: "هەڵە لە پەسەندکردنی دکتۆر"
    ,errorRejectingDoctor: "هەڵە لە ڕەتکردنەوەی دکتۆر"
    ,errorRevokingRole: "هەڵە لە هەڵوەشاندنەوەی رۆڵ"
    ,errorRestoringRole: "هەڵە لە گەڕاندنەوەی رۆڵ"
    ,errorFetchingData: "هەڵە لە هێنانی داتا"
    ,allRequests: "هەموو داواکاریەکان"
    ,viewAllPhysiotherapistRequests: "بینینی هەموو داواکاریەکانی فیزیۆتێراپیست"
    ,patientInfo: "زانیاری نەخۆش"
    ,assignedTo: "دیاریکراوە بۆ"
    ,approvedDate: "بەرواری پەسەندکردن"
    ,rejectedDate: "بەرواری ڕەتکردنەوە"
    ,adminViewOnly: "تەنها بینین بۆ سەرپەرشتیار"
    ,cannotModifyRequests: "ناتوانی داواکاریەکان بگۆڕیت - تەنها بینین"
    ,noRequestsFound: "هیچ داواکاریەک نەدۆزرایەوە"
    ,doctorRequests: "داواکاریەکانی دکتۆر"
    ,totalAppointments: "کۆی چاوپێکەوتنەکان"
    ,totalApprovedRequests: "کۆی داواکاری پەسەندکراوەکان"
    ,totalCompletedAppointments: "کۆی چاوپێکەوتنە تەواوبووەکان"
    ,upcomingAppointments: "چاوپێکەوتنە داهاتووەکان"
    ,quickAccess: "دەستڕاگەیشتنی خێرا"
    ,scheduledSessions: "دانیشتنە دیاریکراوەکان"
    ,medicalDashboard: "داشبۆردی پزیشکی"
    ,mainMenu: "لیستی سەرەکی"
    ,controlPanel: "پانیلی کۆنترۆڵ"
    ,appointments: "چاوپێکەوتنەکان"
    ,programs: "بەرنامەکان"
    ,viewProgress: "بینینی پێشکەوتن"
    ,patientProgress: "پێشکەوتنی نەخۆش"
    ,totalSessions: "کۆی دانیشتنەکان"
    ,typeYourMessage: "پەیامەکەت لێرە بنووسە..."
    ,pleaseEnterMessage: "تکایە پەیامێک بنووسە"
    ,messageSent: "پەیامەکە بە سەرکەوتوویی نێردرا"
    ,to: "بۆ"
    ,enterSessionCount: "ژمارەی دانیشتنەکان بنووسە"
    ,sessionCountHint: "چەند جار نەخۆشەکە سەردانی دکتۆری کردووە"
    ,success: "سەرکەوتوو"
    ,patientAddedSuccessfully: "نەخۆشەکە بە سەرکەوتوویی زیادکرا بۆ لیستەکەت"
    ,selectFromList: "لە لیستەکە هەڵبژێرە"
    ,enterManually: "بە دەست بنووسە"
    ,selectPatient: "نەخۆشێک هەڵبژێرە"
    ,noPatientsAvailable: "هیچ نەخۆشێک بەردەست نییە"
    ,newPatientInfo: "زانیاری نەخۆشی نوێ"
    ,pleaseCompletePatientInfo: "تکایە زانیاری نەخۆشەکە تەواو بکە"
    ,patientWillBeAddedAutomatically: "ئەم نەخۆشە بە ئۆتۆماتیک زیاد دەکرێتە لیستەکەت"
    ,enterEmail: "ئیمەیڵ بنووسە"
    ,enterPhone: "ژمارەی تەلەفۆن بنووسە"
    ,age: "تەمەن"
    ,enterAge: "تەمەن بنووسە"
    ,enterCondition: "حاڵەتی تەندروستی بنووسە"
    ,loadingAppointments: "باریکردنی چاوپێکەوتنەکان..."
    ,newAppointment: "چاوپێکەوتنی نوێ"
    ,enterFullName: "ناوی تەواو بنووسە"
    ,minutes30: "٣٠ خولەک"
    ,minutes45: "٤٥ خولەک"
    ,minutes60: "٦٠ خولەک"
    ,minutes90: "٩٠ خولەک"
    ,enterReason: "نموونە: دانیشتنی چارەسەری فیزیۆثێراپی"
    ,location: "شوێن"
    ,enterLocation: "ژمارەی ژوور یان شوێن"
    ,platformCommission: "کۆمیشنی پلاتفۆرم"
    ,notes: "تێبینییەکان (ئیختیاری)"
    ,enterNotes: "تێبینی یان ڕێنمایی زیادە"
    ,scheduleAppointment: "چاوپێکەوتن دیاریبکە"
    ,totalRevenue: "کۆی داهات"
    ,searchAppointments: "بگەڕێ بە ناوی نەخۆش یان هۆکار..."
    ,allStatus: "هەموو دۆخەکان"
    ,allTypes: "هەموو جۆرەکان"
    ,pastAppointments: "چاوپێکەوتنەکانی ڕابردوو"
    ,noAppointments: "هیچ چاوپێکەوتنێک نەدۆزرایەوە"
    ,scheduleFirstAppointment: "کرتە بکە لەسەر \"چاوپێکەوتنی نوێ\" بۆ دیاریکردنی یەکەم چاوپێکەوتن"
    ,confirm: "پشتڕاستکردنەوە"
    ,cancel: "هەڵوەشاندنەوە"
    ,appointmentNotes: "تێبینییەکانی چاوپێکەوتن"
    ,initialAssessment: "هەڵسەنگاندنی سەرەتایی"
    ,followUp: "شوێنکەوتن"
    ,therapySession: "دانیشتنی چارەسەری"
    ,checkUp: "پشکنین"
    ,consultation: "ڕاوێژ"
    ,completedToday: "تەواوکراوی ئەمڕۆ"
    ,viewPatients: "بینینی نەخۆشەکان"
    ,anatomyTool: "ئامرازی ئەناتۆمی"
    ,writeReport: "نووسینی ڕاپۆرت"
    ,noAppointmentsToday: "هیچ چاوپێکەوتنێک بۆ ئەمڕۆ دیارینەکراوە"
    // Profile & Settings Kurdish
    ,myProfile: "پڕۆفایلی من"
    ,professionalInfo: "زانیاری پیشەیی"
    ,licenseNumber: "ژمارەی مۆڵەت"
    ,specialization: "پسپۆڕی"
    ,yearsExperience: "ساڵانی ئەزموون"
    ,certifications: "بڕوانامەکان"
    ,updateProfile: "نوێکردنەوەی پڕۆفایل"
    ,profileUpdated: "پڕۆفایل نوێکرایەوە"
    ,changePassword: "گۆڕینی وشەی نهێنی"
    ,currentPassword: "وشەی نهێنی ئێستا"
    ,newPassword: "وشەی نهێنی نوێ"
    ,confirmPassword: "پشتڕاستکردنەوەی وشەی نهێنی"
    ,passwordChanged: "وشەی نهێنی گۆڕدرا"
    ,languagePreferences: "هەڵبژاردنی زمان"
    ,notificationSettings: "ڕێکخستنەکانی ئاگاداری"
    ,emailNotifications: "ئاگاداریەکانی ئیمەیڵ"
    ,smsNotifications: "ئاگاداریەکانی SMS"
    ,pushNotificationsLabel: "ئاگاداریەکانی Push"
    ,privacySettings: "ڕێکخستنەکانی تایبەتێتی"
    ,showProfile: "پیشاندانی پڕۆفایل"
    ,allowMessages: "ڕێگەدان بە پەیامەکان"
    // Settings Page Kurdish
    ,manageAccountPreferences: "بەڕێوەبردنی ڕێکخستنەکانی ئەکاونت و پاراستن"
    ,accountSecurity: "پاراستنی ئەکاونت"
    ,enterCurrentPassword: "وشەی نهێنی ئێستا بنووسە"
    ,enterNewPassword: "وشەی نهێنی نوێ بنووسە"
    ,confirmNewPassword: "وشەی نهێنی نوێ پشتڕاست بکەرەوە"
    ,updatePassword: "نوێکردنەوەی وشەی نهێنی"
    ,notificationPreferences: "هەڵبژاردنەکانی ئاگاداری"
    ,patientMessages: "پەیامەکانی نەخۆش"
    ,getNotifiedPatientMessages: "ئاگادارم بکەرەوە کاتێک نەخۆشەکان پەیام دەنێرن"
    ,appointmentRemindersLabel: "بیرخستنەوەی چاوپێکەوتن"
    ,reminderBeforeAppointment: "بیرخستنەوە پێش هەر چاوپێکەوتنێک"
    ,progressAlertsLabel: "ئاگاداریەکانی پێشکەوتن"
    ,notifyPatientProgress: "ئاگادارم بکەرەوە کاتێک پێشکەوتنی نەخۆش تۆمار دەکرێت"
    ,receiveDailyEmails: "وەرگرتنی کورتەی ڕۆژانە بە ئیمەیڵ"
    ,savePreferences: "پاشەکەوتکردنی هەڵبژاردنەکان"
    ,dangerZone: "ناوچەی مەترسی"
    ,deleteAccount: "سڕینەوەی ئەکاونت"
    // Notifications Page Kurdish
    ,stayUpdatedMessages: "لەسەر پەیامەکانی نەخۆش و بیرخستنەوەکانی چاوپێکەوتن تازە بە"
    ,totalNotifications: "کۆی گشتی ئاگادارییەکان"
    ,unread: "نەخوێنراوە"
    ,read: "خوێنراوەتەوە"
    ,recentNotifications: "ئاگاداریە تازەکان"
    ,noNotifications: "هیچ ئاگاداریێک نییە"
    ,newMessageFrom: "پەیامی نوێ لە"
    ,appointmentReminderTitle: "بیرخستنەوەی چاوپێکەوتن"
    ,patientProgressAlertTitle: "ئاگاداری پێشکەوتنی نەخۆش"
    ,severePainLowerBack: "ئازاری توندم هەیە لە پشتی خوارەوە"
    ,appointmentTomorrow: "چاوپێکەوتنی بەیانی لە کاتژمێر"
    ,hasNotRecordedProgress: "لە ماوەی 5 ڕۆژدا هیچ پێشکەوتنێکی تۆمار نەکردووە"
    ,markAsRead: "وەک خوێندراوە نیشانی بکە"
    ,approvedRequests: "داواکارییە پەسەندکراوەکان"
    ,saving: "پاشەکەوت دەکرێت..."
    ,bioPlaceholder: "باسی خۆت بکە..."
    ,noBioYet: "هێشتا bio نییە"
    ,welcome: "بەخێربێیت"
    ,welcomeMessage: "بەخێربێیت بۆ ناوەندی ئاگادارکردنەوە. لێرە نوێکردنەوەکان وەردەگریت."
    ,minutesAgo: "خولەک پێش ئێستا"
    ,hoursAgo: "کاتژمێر پێش ئێستا"
    ,daysAgo: "ڕۆژ پێش ئێستا"
    ,settingsSaved: "ڕێکخستنەکان بە سەرکەوتوویی پاشەکەوت کران"
    ,notifyNewRequests: "ئاگاداربە کە داواکاری نەخۆشی نوێ دێت"
    ,doctorApprovals: "پەسەندکردنی دکتۆر"
    ,notifyDoctorApprovals: "ئاگاداربە دەربارەی پەسەندکردنی دکتۆر"
    ,systemUpdates: "نوێکردنەوەکانی سیستەم"
    ,notifySystemUpdates: "ئاگاداربە دەربارەی نوێکردنەوەکانی سیستەم"
    ,receiveEmailNotifications: "وەرگرتنی ئاگادارکردنەوەکان لە ڕێگەی ئیمەیڵەوە"
    ,public: "گشتی"
    ,private: "تایبەت"
    ,showEmail: "پیشاندانی ئیمەیڵ"
    ,showEmailDesc: "نیشاندانی ئیمەیڵ لە پرۆفایل"
    ,showPhone: "پیشاندانی تەلەفۆن"
    ,installApp: "دابەزاندنی ئەپی FitPro"
    ,installAppDescription: "ئەپەکەمان دابەزێنە بۆ ئەزموونێکی باشتر لەگەڵ دەستگەیشتنی ئۆفلاین و کردنەوەی خێرا."
    ,install: "دابەزاندن"
    ,showPhoneDesc: "نیشاندانی ژمارەی تەلەفۆن لە پرۆفایل"
    // Subscription History Dialog - Kurdish
    ,subscriptionHistory: "مێژووی ئیشتراک"
    ,loadingSubscriptionHistory: "باری مێژووی ئیشتراک..."
    ,memberSince: "ئەندام لە"
    ,totalPaid: "کۆی گشتی پارەی دراو"
    ,freeAccess: "بە خۆڕایی"
    ,iqd: "دینار"
    ,daysLeft: "رۆژی ماوە"
    ,paymentHistory: "مێژووی وەرگرتنی پارە"
    ,manuallyUpgradedToPro: "بە دەستی کرابووە بە PRO"
    ,manualProAccessDesc: "ئەم یوزەرە بە دەستی کرابووە بە PRO لەلایەن سوپەر ئەدمین. هیچ زانیاریەکی پارەدانی تۆمار نەکراوە."
    ,adminDirectlyUpgraded: "ئەدمین بە ڕاستەوخۆ ئەم یوزەرەی باڵا برد"
    ,activeProStatus: "دۆخی PRO چالاک"
    ,subscriptionInfo: "زانیاریەکانی ئیشتراک"
    ,dinar: "دینار"
    ,monthDuration: "مانگ"
    ,subscriptionStartDate: "دەستپێکردنی ئیشتراک"
    ,subscriptionEndDate: "کۆتایی هاتنی ئیشتراک"
    ,calculated: "حیساب کراوە"
    ,unlimited: "بێ سنوور"
    ,manualProAccess: "دەستگەیشتنی PRO بە دەستی"
    ,noPaymentHistory: "هیچ مێژوویەکی پارەدان نییە"
    ,userHasNoPaymentRecords: "ئەم یوزەرە هیچ زانیاریەکی پارەدانی تۆمار نەکراوە"
    ,currentSubscriptionDetails: "وردەکارییەکانی ئیشتراکی ئێستا"
    ,proStatusInformation: "زانیاری دۆخی PRO"
    ,currentSubscription: "ئیشتراکی ئێستا"
    ,status: "دۆخ"
    ,proUpgrade: "باڵابردنی Pro"
    ,amount: "بڕ"
    ,method: "شێواز"
    ,time: "کات"
    ,subscriptionCount: "ژمارەی ئیشتراک کردن"
    ,timesSubscribed: "جار بووە بە PRO"
    ,manualUpgrade: "باڵابردنی بە دەستی"
    ,navigation: "گەشتکردن"
    ,userNotFound: "هەڵە: بەکارهێنەر نەدۆزرایەوە"
    ,profileSavedSuccessfully: "پرۆفایل بە سەرکەوتوویی پاشەکەوت کرا!"
    ,failedToSaveProfile: "پاشەکەوتکردنی پرۆفایل سەرکەوتوو نەبوو"
    ,pleaseEnterName: "تکایە ناوت بنووسە"
    ,invalidWeight: "تکایە کێشێکی دروست بنووسە (0-500 کیلۆگرام)"
    ,invalidHeight: "تکایە بڵاوێکی دروست بنووسە (0-300 سەنتیمەتر)"
    ,saving: "پاشەکەوت دەکرێت..."
    ,passwordChangedSuccessfully: "وشەی نهێنی بە سەرکەوتوویی گۆڕدرا!"
    ,currentPasswordIncorrect: "وشەی نهێنیی ئێستا هەڵەیە"
    ,weakPassword: "وشەی نهێنیی نوێ زۆر لاوازە. بەلایەنی کەم 6 پیت بەکار بهێنە"
    ,requiresRecentLogin: "تکایە دەرچوو و دووبارە چوونە ژوورەوە پێش گۆڕینی وشەی نهێنی"
    ,failedToChangePassword: "گۆڕینی وشەی نهێنی سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە"
    ,loggedOutSuccessfully: "بە سەرکەوتوویی دەرچوویت"
    ,joined: "پەیوەندی کرد"
    ,active: "چالاک"
    ,expired: "بەسەرچووە"
    ,accessKey: "کلیلی دەستگەیشتن"
    ,notSet: "دانەنراوە"
    ,goal: "ئامانج"
    ,cancel: "پاشگەزبوونەوە"
    // More Menu (Kurdish)
    ,accessProfileSettings: "دەستگەیشتن بە پرۆفایل، ڕێکخستن و ئاگاداریەکان"
    ,viewYourProfile: "پرۆفایلەکەت ببینە"
    ,managePreferences: "بەڕێوەبردنی هەڵبژاردنەکان"
    ,notificationSettingsDesc: "ڕێکخستنەکانی ئاگاداری"
    ,signOutFromAccount: "دەرچوون لە هەژمار"
    ,awaitingReview: "چاوەڕوانی پێداچوونەوە"
    ,firestoreConnection: "پەیوەندی Firestore"
    ,nextjsRuntime: "Next.js Runtime"
    ,firebaseStorage: "کۆگای Firebase"
    ,manageUsers: "بەڕێوەبردنی بەکارهێنەران"
    ,reviewRequests: "پێداچوونەوە بە داواکاری"
    ,totalPrograms: "کۆی پرۆگرامەکان"
    ,updatePersonalInfo: "زانیاری کەسی خۆت نوێ بکەرەوە"
    ,enterYourName: "ناوت بنووسە"
    ,enterPhoneNumber: "ژمارەی مۆبایل بنووسە"
    ,clickCameraToUpload: "کرتە لە ئایکۆنی کامێرا بکە بۆ بارکردنی وێنە"
    ,userNotFound: "هەڵە: بەکارهێنەر نەدۆزرایەوە"
    ,profileSavedSuccessfully: "پڕۆفایل بە سەرکەوتوویی پاشەکەوت کرا!"
    ,failedToSaveProfile: "پاشەکەوتکردنی پڕۆفایل سەرکەوتوو نەبوو"
    ,cancel: "پاشگەزبوونەوە"
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
    allPhysiotherapists: "Tüm Fizyoterapistler",
    registrationRequests: "İstekler",
    adminPhysiotherapist: "Yönetici Fizyoterapist",
    superadminPanel: "Süper Admin Paneli",
    loading: "Yükleniyor",
    updating: "Güncelleniyor...",
    patients: "Hastalar",
  activities: "Aktiviteler",
  trainees: "Öğrenciler",
  traineeMeals: "Öğrenci Yemekleri",
  traineeWorkouts: "Öğrenci Antrenmanları",
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
  manageAccountSecurity: "Hesap güvenliğinizi yönetin",
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
  // 2FA Verification (Turkish)
  twoFactorAuthentication: "İki Faktörlü Kimlik Doğrulama",
  enter6DigitCode: "Kimlik doğrulama uygulamanızdan 6 haneli kodu girin",
  enterBackupCode: "Yedek kodunuzu girin",
  pleaseEnterComplete6DigitCode: "Lütfen 6 haneli kodu tam olarak girin",
  pleaseEnterBackupCode: "Lütfen bir yedek kod girin",
  twoFactorVerificationSuccessful: "2FA doğrulama başarılı",
  verificationFailed: "Doğrulama başarısız",
  useAuthenticatorCode: "Kimlik doğrulama kodunu kullan",
  useBackupCode: "Yedek kod kullan",
  backupCode: "Yedek kod",
  verify: "Doğrula",
  passwordCorrect: "Şifre doğru - lütfen 2FA'yı doğrulayın",
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
  tapToActivate: "Etkinleştirmek için dokunun",
  pushNotifications: "Bildirimler",
  applyLanguage: "Dili Uygula",
  accountActions: "Hesap İşlemleri",
  accountActionsDesc: "Çıkış yapmak oturumunuzu temizler ve giriş ekranına döndürür.",
  logoutButton: "Çıkış Yap",
  more: "Daha Fazla",
  customizeYourExperience: "Uygulama deneyiminizi özelleştirin",
  chooseYourPreferredTheme: "Tercih ettiğiniz temayı seçin",
  selectYourPreferredLanguage: "Tercih ettiğiniz dili seçin",
  appInformation: "Uygulama Bilgileri",
  appVersion: "Sürüm",
  appBuild: "Yapı",
  appPlatform: "Platform",
  mobileAndWeb: "Mobil ve Web",
  youWillBeRedirectedToLogin: "Giriş sayfasına yönlendirileceksiniz",
  loggingOut: "Çıkış yapılıyor...",
  manageNotificationSettings: "Bildirimleri nasıl alacağınızı yönetin",
  notificationChannels: "Bildirim Kanalları",
  chooseNotificationMethod: "Nasıl bildirim almak istediğinizi seçin",
  getInstantAlerts: "Anında uyarılar alın",
  textMessageAlerts: "Kısa mesaj uyarıları",
  activityNotifications: "Etkinlik Bildirimleri",
  chooseActivityNotifications: "Hangi etkinlikler hakkında bildirim almak istediğinizi seçin",
  workoutReminders: "Antrenman Hatırlatıcıları",
  dailyWorkoutNotifications: "Günlük antrenman bildirimleri",
  mealPlans: "Yemek Planları",
  nutritionUpdates: "Beslenme güncellemeleri",
  physioSessions: "Fizyoterapi Seansları",
  therapyAppointments: "Terapi randevuları",
  activeNotifications: "Aktif Bildirimler",
  activeChannels: "Aktif Kanallar",
  activeActivities: "Aktif Etkinlikler",
  totalActive: "Toplam Aktif",
  savePreferences: "Tercihleri Kaydet",
  notificationsSaved: "Bildirim tercihleri başarıyla kaydedildi!",
  updatePersonalInfo: "Kişisel bilgilerinizi güncelleyin",
  enterYourName: "Adınızı girin",
  enterPhoneNumber: "Telefon numarasını girin",
  clickCameraToUpload: "Fotoğraf yüklemek için kamera simgesine tıklayın",
  userNotFound: "Hata: Kullanıcı bulunamadı",
  profileSavedSuccessfully: "Profil başarıyla kaydedildi!",
  failedToSaveProfile: "Profil kaydedilemedi",
  pleaseEnterName: "Lütfen adınızı girin",
  invalidWeight: "Lütfen geçerli bir kilo girin (0-500 kg)",
  invalidHeight: "Lütfen geçerli bir boy girin (0-300 cm)",
  saving: "Kaydediliyor...",
  passwordChangedSuccessfully: "Şifre başarıyla değiştirildi!",
  currentPasswordIncorrect: "Mevcut şifre yanlış",
  weakPassword: "Yeni şifre çok zayıf. En az 6 karakter kullanın",
  requiresRecentLogin: "Şifre değiştirmeden önce lütfen çıkış yapıp tekrar giriş yapın",
  failedToChangePassword: "Şifre değiştirilemedi. Lütfen tekrar deneyin",
  loggedOutSuccessfully: "Başarıyla çıkış yapıldı",
  joined: "Katıldı",
  active: "Aktif",
  expired: "Süresi Doldu",
  accessKey: "Erişim Anahtarı",
  notSet: "Ayarlanmadı",
  goal: "Hedef",
  cancel: "İptal",
  // More Menu (Turkish)
  accessProfileSettings: "Profilinize, ayarlarınıza ve bildirimlerinize erişin",
  viewYourProfile: "Profilinizi görüntüleyin",
  managePreferences: "Tercihleri yönetin",
  notificationSettingsDesc: "Bildirim ayarları",
  signOutFromAccount: "Hesaptan çıkış yap",
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
  pendingUserApprovals: "Bekleyen Kullanıcı Onayları",
  emailVerified: "E-posta Doğrulandı",
  userApproved: "Kullanıcı Onaylandı",
  canNowLogin: "artık giriş yapabilir",
  user: "Kullanıcı",
  joinedDate: "Katılma Tarihi",
  actionsColumn: "İşlemler",
  rejected: "Reddedildi",
  // Access Keys Page (Turkish)
  accessKeysPage: "Erişim Anahtarları",
  generateAndManageKeys: "Erişim anahtarlarını oluştur ve yönet",
  generateNewKey: "Yeni Anahtar Oluştur",
  generating: "Oluşturuluyor...",
  totalKeys: "Toplam Anahtarlar",
  expired: "Süresi Doldu",
  enabled: "Etkin",
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
  assignedTo: "Atanan",
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
  all: "Tümü",
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
  searchPatient: "Hasta adı veya e-posta ile ara",
  searchDoctor: "Doktor adı ile ara",
  dateFrom: "Başlangıç Tarihi",
  dateTo: "Bitiş Tarihi",
  clearFilters: "Filtreleri Temizle",
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
  live: "CANLI",
  modelLoaded: "3D MODEL YÜKLENDİ",
  modelName: "İsim",
  skeletonPreCut: "Önceden Kesilmiş İskelet",
  format: "Format",
  type: "Tür",
  humanSkeleton: "İnsan İskeleti",
  size: "Boyut",
  anatomy3DViewer: "3D Anatomi Görüntüleyici",
  view3DSkeletonModel: "3D insan iskelet modelini görüntüle",
  viewControl: "Görüntü Kontrolü",
  rotation: "Döndürme",
  zoom: "Yakınlaştırma",
  resetView: "Görünümü Sıfırla",
  modelInfo: "Model Bilgisi",
  instructions: "Talimatlar",
  useSliderToRotate: "Modeli döndürmek için kaydırıcıyı kullanın",
  useSliderToZoom: "Yakınlaştırmak ve uzaklaştırmak için kaydırıcıyı kullanın",
  clickButtonToReset: "Başlangıç görünümüne dönmek için düğmeye tıklayın",
  selectedParts: "Seçili Parçalar",
  lastSelected: "Son Seçilen",
  clickModelToSelect: "Vücut parçalarını seçmek için 3D modele tıklayın",
  selectParts: "Parça Seç",
  clickOnModelToSelect: "Model parçalarına tıklayarak tanımlayın",
  allPatients: "Tüm Hastalar",
  viewAllPatientsAndSessions: "Tüm hastaları seansları ve randevularıyla görüntüle",
  patients: "Hastalar",
  noPatientsFound: "Hasta bulunamadı",
  personalInfo: "Kişisel Bilgiler",
  years: "yıl",
  sessions: "seanslar",
  appointmentsSessions: "Randevular ve Seanslar",
  noAppointments: "Randevu bulunamadı",
  patientDetails: "Hasta Detayları",
  pricePerSession: "Seans Başına Fiyat",
  appointmentHistory: "Randevu Geçmişi",
  assignedPhysiotherapist: "Atanan Fizyoterapist",
  registrationInfo: "Kayıt Bilgileri",
  createdAt: "Oluşturulma Tarihi",
  physiotherapistProgress: "Fizyoterapist İlerlemesi",
  viewAllPhysioData: "Tüm fizyoterapist verilerini ve ilerlemesini görüntüle",
  totalPhysiotherapists: "Toplam Fizyoterapist",
  totalPatients: "Toplam Hasta",
  activeSessions: "Aktif Seanslar",
  completedSessions: "Tamamlanan Seanslar",
  noPhysiotherapistsFound: "Fizyoterapist bulunamadı",
  completed: "Tamamlandı",
  joinDate: "Katılım Tarihi",
  specialization: "Uzmanlık",
  workingHours: "Çalışma Saatleri",
  managePhysiotherapists: "Fizyoterapistleri Yönet",
  approveAndManageRoles: "Doktorları onayla ve rolleri yönet",
  pendingRequests: "Bekleyen Talepler",
  activePhysiotherapists: "Aktif Fizyoterapistler",
  revokedAccess: "İptal Edilmiş Erişim",
  pendingApprovalRequests: "Bekleyen Onay Talepleri",
  noPendingRequests: "Bekleyen talep yok",
  requestDate: "Talep Tarihi",
  approve: "Onayla",
  reject: "Reddet",
  revoked: "İptal Edildi",
  originalJoinDate: "Orijinal Katılım Tarihi",
  revokeRole: "Rolü İptal Et",
  restoreRole: "Rolü Geri Yükle",
  doctorApprovedSuccess: "Doktor başarıyla onaylandı",
  doctorRejectedSuccess: "Doktor başarıyla reddedildi",
  roleRevokedSuccess: "Rol başarıyla iptal edildi",
  roleRestoredSuccess: "Rol başarıyla geri yüklendi",
  errorApprovingDoctor: "Doktor onaylanırken hata",
  errorRejectingDoctor: "Doktor reddedilirken hata",
  errorRevokingRole: "Rol iptal edilirken hata",
  errorRestoringRole: "Rol geri yüklenirken hata",
  errorFetchingData: "Veri alınırken hata",
  allRequests: "Tüm Talepler",
  viewAllPhysiotherapistRequests: "Tüm fizyoterapist taleplerini görüntüle",
  patientInfo: "Hasta Bilgileri",
  assignedTo: "Atandı",
  approvedDate: "Onay Tarihi",
  rejectedDate: "Red Tarihi",
  adminViewOnly: "Sadece Yönetici Görünümü",
  cannotModifyRequests: "Talepleri değiştiremezsiniz - sadece görüntüleme",
  noRequestsFound: "Talep bulunamadı",
  doctorRequests: "Doktor Talepleri",
  totalAppointments: "Toplam Randevular",
  totalApprovedRequests: "Toplam Onaylanan Talepler",
  totalCompletedAppointments: "Toplam Tamamlanan Randevular",
  upcomingAppointments: "Yaklaşan Randevular",
  quickAccess: "Hızlı Erişim",
  scheduledSessions: "Planlanmış Seanslar",
  medicalDashboard: "Tıbbi Kontrol Paneli",
  mainMenu: "ANA MENÜ",
  controlPanel: "Kontrol Paneli",
  appointments: "Randevular",
  programs: "Programlar",
  viewProgress: "İlerlemeyi Görüntüle",
  patientProgress: "Hasta İlerlemesi",
  totalSessions: "Toplam Seans",
  typeYourMessage: "Mesajınızı buraya yazın...",
  pleaseEnterMessage: "Lütfen bir mesaj girin",
  messageSent: "Mesaj başarıyla gönderildi",
  to: "Kime",
  enterSessionCount: "Seans sayısını girin",
  sessionCountHint: "Hastanın kaç kez doktora gittiği",
  success: "Başarılı",
  patientAddedSuccessfully: "Hasta listenize başarıyla eklendi",
  selectFromList: "Listeden Seç",
  enterManually: "Manuel Gir",
  selectPatient: "Hasta seçin",
  noPatientsAvailable: "Mevcut hasta yok",
  newPatientInfo: "Yeni Hasta Bilgileri",
  pleaseCompletePatientInfo: "Lütfen hasta bilgilerini tamamlayın",
  patientWillBeAddedAutomatically: "Bu hasta otomatik olarak listenize eklenecek",
  enterEmail: "E-posta adresini girin",
  enterPhone: "Telefon numarasını girin",
  age: "Yaş",
  enterAge: "Yaşı girin",
  enterCondition: "Tıbbi durumu girin",
  // Settings Page Turkish
  manageAccountPreferences: "Hesap tercihlerinizi ve güvenliğinizi yönetin",
  accountSecurity: "Hesap Güvenliği",
  enterCurrentPassword: "Mevcut şifrenizi girin",
  enterNewPassword: "Yeni şifrenizi girin",
  confirmNewPassword: "Yeni şifreyi onaylayın",
  updatePassword: "Şifreyi Güncelle",
  notificationPreferences: "Bildirim Tercihleri",
  patientMessages: "Hasta Mesajları",
  getNotifiedPatientMessages: "Hastalar mesaj gönderdiğinde bildirim al",
  appointmentRemindersLabel: "Randevu Hatırlatıcıları",
  reminderBeforeAppointment: "Her randevudan önce hatırlatıcı",
  progressAlertsLabel: "İlerleme Uyarıları",
  notifyPatientProgress: "Hasta ilerlemesi kaydedildiğinde bildir",
  receiveDailyEmails: "Günlük e-posta özetleri al",
  savePreferences: "Tercihleri Kaydet",
  dangerZone: "Tehlike Bölgesi",
  deleteAccount: "Hesabı Sil",
  // Notifications Page Turkish
  stayUpdatedMessages: "Hasta mesajları ve randevu hatırlatıcıları ile güncel kalın",
  totalNotifications: "Toplam Bildirimler",
  unread: "Okunmamış",
  read: "Okunmuş",
  recentNotifications: "Son Bildirimler",
  noNotifications: "Bildirim yok",
  newMessageFrom: "Yeni mesaj:",
  appointmentReminderTitle: "Randevu Hatırlatıcısı",
  patientProgressAlertTitle: "Hasta İlerleme Uyarısı",
  severePainLowerBack: "Alt sırtımda şiddetli ağrı var",
  appointmentTomorrow: "randevusu yarın saat",
  hasNotRecordedProgress: "5 gündür ilerleme kaydetmedi",
  markAsRead: "Okundu Olarak İşaretle",
  approvedRequests: "Onaylanan İstekler",
  saving: "Kaydediliyor...",
  bioPlaceholder: "Kendiniz hakkında bilgi verin...",
  noBioYet: "Henüz biyografi yok",
  welcome: "Hoş Geldiniz",
  welcomeMessage: "Bildirim merkezinize hoş geldiniz. Güncellemeleri burada alacaksınız.",
  minutesAgo: "dakika önce",
  hoursAgo: "saat önce",
  daysAgo: "gün önce",
  settingsSaved: "Ayarlar başarıyla kaydedildi",
  notifyNewRequests: "Yeni hasta istekleri geldiğinde bildirim al",
  doctorApprovals: "Doktor Onayları",
  notifyDoctorApprovals: "Doktor onay işlemleri hakkında bildirim al",
  systemUpdates: "Sistem Güncellemeleri",
  notifySystemUpdates: "Sistem güncellemeleri hakkında bildirim al",
  receiveEmailNotifications: "E-posta ile bildirim al",
  public: "Genel",
  private: "Özel",
  showEmail: "E-postayı Göster",
  showEmailDesc: "Profilde e-posta adresini göster",
  showPhone: "Telefonu Göster",
  installApp: "FitPro Uygulamasını Yükle",
  installAppDescription: "Çevrimdışı erişim ve hızlı başlatma ile daha iyi bir deneyim için uygulamamızı yükleyin.",
  install: "Yükle",
  showPhoneDesc: "Profilde telefon numarasını göster",
  // Subscription History Dialog - Turkish
  subscriptionHistory: "Abonelik Geçmişi",
  loadingSubscriptionHistory: "Abonelik geçmişi yükleniyor...",
  memberSince: "Üyelik Başlangıcı",
  totalPaid: "Toplam Ödenen",
  freeAccess: "Ücretsiz Erişim",
  iqd: "IQD",
  daysLeft: "Kalan Gün",
  paymentHistory: "Ödeme Geçmişi",
  manuallyUpgradedToPro: "Manuel Olarak PRO'ya Yükseltildi",
  manualProAccessDesc: "Bu kullanıcı Süper Yönetici tarafından manuel olarak PRO'ya yükseltildi. Ödeme kaydı oluşturulmadı.",
  adminDirectlyUpgraded: "Yönetici bu kullanıcıyı doğrudan yükseltti",
  activeProStatus: "Aktif PRO Durumu",
  subscriptionInfo: "Abonelik Bilgisi",
  dinar: "Dinar",
  monthDuration: "Ay",
  subscriptionStartDate: "Abonelik Başlangıcı",
  subscriptionEndDate: "Abonelik Bitişi",
  calculated: "Hesaplanmış",
  unlimited: "Sınırsız",
  manualProAccess: "Manuel PRO Erişimi",
  noPaymentHistory: "Ödeme Geçmişi Yok",
  userHasNoPaymentRecords: "Bu kullanıcının ödeme kaydı bulunmuyor",
  currentSubscriptionDetails: "Mevcut Abonelik Detayları",
  proStatusInformation: "PRO Durum Bilgisi",
  currentSubscription: "Mevcut Abonelik",
  status: "Durum",
  proUpgrade: "Pro Yükseltme",
  amount: "Tutar",
  method: "Yöntem",
  time: "Zaman",
  subscriptionCount: "Abonelik Sayısı",
  timesSubscribed: "Abone Olunan Kere",
  manualUpgrade: "Manuel Yükseltme",
  navigation: "Navigasyon",
  },
}
