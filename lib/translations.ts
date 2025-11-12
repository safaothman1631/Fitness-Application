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
  | "alreadyHaveAccount"
  | "signInLink"
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
    videoGuidance: "Video Guidance",
    videoGuidanceDesc: "Follow professional trainers with detailed video instructions for every exercise",
    personalizedPrograms: "Personalized Programs",
    personalizedProgramsDesc: "Custom workout plans designed based on your fitness level and goals",
    progressTracking: "Progress Tracking",
    progressTrackingDesc: "Monitor your improvement with detailed statistics and progress charts",
    exerciseLibraryFull: "Complete Exercise Library",
    exerciseLibraryFullDesc: "Access thousands of exercises with proper form demonstrations",
    goalOriented: "Goal-Oriented",
    goalOrientedDesc: "Set and achieve your fitness objectives with structured guidance",
    achievementBadges: "Achievement Badges",
    achievementBadgesDesc: "Earn badges and rewards as you reach your fitness milestones",
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
  analytics: "Analytics",
  reports: "Reports",
  management: "Management",
  helpSupport: "Help & Support",
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
  forgotPassword: "Forgot?",
  loginSuccessful: "Login successful!",
  chooseRoleOrSignIn: "Choose your role or sign in",
  pleaseEnterEmail: "Please enter your email address",
  pleaseEnterPassword: "Please enter your password",
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
  copyrightNotice: "© 2024 FitPro. All rights reserved.",
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
  alreadyHaveAccount: "Already have an account?",
  signInLink: "Sign in",
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
  loading: "جارٍ التحميل"
    ,patients: "المرضى"
    ,activities: "الأنشطة"
    ,trainees: "المتدربون"
    ,analytics: "التحليلات"
    ,reports: "التقارير"
    ,management: "الإدارة"
    ,helpSupport: "المساعدة والدعم"
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
  // Auth & Login (AR placeholders)
  ,signIn: "تسجيل الدخول"
  ,signUp: "إنشاء حساب"
  ,emailAddress: "البريد الإلكتروني"
  ,emailOrUsername: "البريد الإلكتروني أو اسم المستخدم"
  ,password: "كلمة المرور"
  ,rememberMe: "تذكرني"
  ,forgotPassword: "هل نسيت؟"
  ,loginSuccessful: "تم تسجيل الدخول بنجاح!"
  ,chooseRoleOrSignIn: "اختر دورك أو سجل الدخول"
  ,pleaseEnterEmail: "الرجاء إدخال عنوان بريدك الإلكتروني"
  ,pleaseEnterPassword: "الرجاء إدخال كلمة المرور"
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
  ,copyrightNotice: "© 2024 فيت برو. جميع الحقوق محفوظة."
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
    ,achievementBadges: "شارات الإنجاز"
    ,achievementBadgesDesc: "الاحتفال بإنجازاتك"
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
      ,alreadyHaveAccount: "لديك حساب بالفعل؟"
      ,signInLink: "سجّل الدخول"
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
  loading: "بارکردن"
    ,patients: "نەخوشەکان"
    ,activities: "چالاکیەکان"
    ,trainees: "فێركراوەکان"
    ,analytics: "ئەنالیتیکس"
    ,reports: "ڕاپۆرتەکان"
    ,management: "بەڕێوەبردن"
    ,helpSupport: "یارمەتی و پاڵپشتی"
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
  // Auth & Login (KU placeholders)
  ,signIn: "چوونەژوورەوە"
  ,signUp: "خۆتۆمارکردن"
  ,emailAddress: "ئیمەیڵ"
  ,emailOrUsername: "ئیمەیڵ یان ناوی بەکارهێنەر"
  ,password: "وشەی نهێنی"
  ,rememberMe: "بیرم بهێنەوە"
  ,forgotPassword: "له‌بیرت چوو؟"
  ,loginSuccessful: "بە سەرکەوتوویی چوویتە ژوورەوە!"
  ,chooseRoleOrSignIn: "رۆڵەکەت هەڵبژێرە یان بچۆ ژوورەوە"
  ,pleaseEnterEmail: "تکایە ئیمەیڵەکەت بنووسە"
  ,pleaseEnterPassword: "تکایە وشەی نهێنیەکەت بنووسە"
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
  ,copyrightNotice: "© 2024 فیتپرو. هەموو مافەکان پارێزراون."
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
  ,min: "خ"
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
    ,achievementBadges: "خەڵاتەکانی دەستووردان"
    ,achievementBadgesDesc: "جژنکردنی کارەکانت"
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
      ,alreadyHaveAccount: "پێشتر هەژمارت هەیە؟"
      ,signInLink: "چوونەژوورەوە"
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
    patients: "Hastalar",
  activities: "Aktiviteler",
  trainees: "Öğrenciler",
  analytics: "Analitik",
  reports: "Raporlar",
  management: "Yönetim",
  helpSupport: "Yardım ve Destek",
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
    emailAddress: "E-posta Adresi",
    emailOrUsername: "E-posta veya kullanıcı adı",
    password: "Parola",
    rememberMe: "Beni hatırla",
    forgotPassword: "Unuttun mu?",
    loginSuccessful: "Giriş başarılı!",
    chooseRoleOrSignIn: "Rolünü seç veya giriş yap",
    pleaseEnterEmail: "Lütfen e-posta adresinizi girin",
    pleaseEnterPassword: "Lütfen parolanızı girin",
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
    copyrightNotice: "© 2024 FitPro. Tüm hakları saklıdır.",
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
  achievementBadges: "Başarı Rozetleri",
  achievementBadgesDesc: "Başarılarınızı kutlayın",
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
  alreadyHaveAccount: "Zaten hesabın var mı?",
  signInLink: "Giriş yap",
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
  },
}
