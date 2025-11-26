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
<<<<<<< HEAD
  renewSubscription: "Visit Office to Renew Subscription",
=======
  renewSubscription: "Renew Subscription",
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
<<<<<<< HEAD
  renewSubscriptionNow: "Visit Office to Renew Subscription",
=======
  renewSubscriptionNow: "Renew Subscription Now",
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
<<<<<<< HEAD
      ,renewSubscription: "قم بزيارة المكتب لتجديد الاشتراك"
=======
      ,renewSubscription: "تجديد الاشتراك"
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
<<<<<<< HEAD
      ,renewSubscriptionNow: "قم بزيارة المكتب لتجديد الاشتراك"
=======
      ,renewSubscriptionNow: "جدّد الاشتراك الآن"
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
<<<<<<< HEAD
      ,renewSubscription: "سەردانی ئۆفیس بکە بۆ نوێکردنەوەی ئیشتراک"
=======
      ,renewSubscription: "نوێکردنەوەی بەشداری"
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
<<<<<<< HEAD
      ,renewSubscriptionNow: "سەردانی ئۆفیس بکە بۆ نوێکردنەوەی ئیشتراک"
=======
      ,renewSubscriptionNow: "نوێکردنەوەی بەشداری ئێستا"
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
<<<<<<< HEAD
  renewSubscription: "Aboneliği Yenilemek İçin Ofise Gelin",
=======
  renewSubscription: "Aboneliği Yenile",
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
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
  },
}
