# 📱 Mobile App Deployment Guide (iOS & Android)

**Status**: Ready for Native App Store Deployment  
**Framework**: Capacitor 6 (Web → Native iOS/Android)  
**Last Updated**: December 15, 2025

---

## 🎯 Overview

This guide covers converting the Next.js web app into native iOS and Android apps for App Store and Google Play Store distribution.

### Why Capacitor?

- ✅ Keeps existing Next.js/React codebase
- ✅ Native app performance
- ✅ Access to all native device APIs (camera, GPS, notifications, etc.)
- ✅ Submit to iOS App Store & Google Play Store
- ✅ No code rewrite needed
- ✅ Better than PWA (full native features)

---

## 📦 Installation & Setup

### 1. Install Capacitor

```bash
# Install Capacitor core
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init

# When prompted:
# App name: FitPro
# App ID: com.fitpro.app (or your bundle ID)
# Web directory: out (Next.js static export)
```

### 2. Add iOS and Android Platforms

```bash
# Add iOS platform
npx cap add ios

# Add Android platform
npx cap add android

# Install required plugins
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar @capacitor/splash-screen @capacitor/push-notifications
```

### 3. Configure Next.js for Static Export

**Update `next.config.mjs`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better routing for mobile
  // ... existing config
}

export default nextConfig
```

### 4. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:mobile": "next build && npx cap sync",
    "ios": "npx cap open ios",
    "android": "npx cap open android",
    "sync": "npx cap sync"
  }
}
```

---

## 🍎 iOS App Store Deployment

### Prerequisites:
- ✅ macOS computer (required for iOS development)
- ✅ Xcode 15+ installed
- ✅ Apple Developer Account ($99/year)
- ✅ Valid signing certificates

### Steps:

#### 1. Configure iOS Project

```bash
# Build and sync
npm run build:mobile

# Open in Xcode
npm run ios
```

#### 2. Xcode Configuration

**In Xcode:**
1. Select project root → **General** tab
2. **Display Name**: FitPro
3. **Bundle Identifier**: com.fitpro.app
4. **Version**: 1.0.0
5. **Build**: 1
6. **Deployment Target**: iOS 14.0+
7. **Team**: Select your Apple Developer team

**Signing & Capabilities:**
1. Enable **Automatic Signing**
2. Select your **Team**
3. Add capabilities:
   - Push Notifications
   - Background Modes (if needed)
   - App Groups (if needed)

#### 3. App Icons & Launch Screen

**Create App Icon:**
- Size: 1024x1024px (PNG, no transparency)
- Place in: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- Use tool like: https://appicon.co

**Launch Screen:**
- Edit: `ios/App/App/Base.lproj/LaunchScreen.storyboard`
- Add FitPro logo and brand colors

#### 4. Build & Archive

**In Xcode:**
1. Select **Any iOS Device (arm64)** as target
2. **Product → Archive**
3. Wait for build to complete
4. **Distribute App → App Store Connect**
5. Upload to App Store Connect

#### 5. App Store Connect Setup

**Go to**: https://appstoreconnect.apple.com

**Create New App:**
1. **Name**: FitPro - Fitness & Physiotherapy
2. **Primary Language**: English
3. **Bundle ID**: com.fitpro.app
4. **SKU**: FITPRO001

**App Information:**
- **Privacy Policy URL**: https://fitpro.app/privacy
- **Category**: Health & Fitness
- **Subcategory**: Exercise & Fitness
- **Content Rights**: You own the rights

**Screenshots Required:**
- iPhone 6.7" (iPhone 15 Pro Max): 1290x2796px (3-10 images)
- iPhone 6.5" (iPhone 11 Pro Max): 1242x2688px (3-10 images)
- iPhone 5.5" (iPhone 8 Plus): 1242x2208px (3-10 images)
- iPad Pro 12.9": 2048x2732px (3-10 images)

**App Description:**
```
FitPro - Your Complete Fitness & Physiotherapy Solution

🏋️ Personalized Workout Plans
📊 Progress Tracking & Analytics
🍽️ Custom Meal Plans & Nutrition
💪 Exercise Library with Video Guides
🏥 Professional Physiotherapist Access
👨‍⚕️ Expert Trainer Support
🌐 Multi-Language Support (EN/TR/AR/KU)

Features:
✅ Role-based dashboards (Patient, Trainer, Physiotherapist, Admin)
✅ Real-time progress tracking
✅ Appointment scheduling
✅ Secure authentication
✅ Dark mode interface
✅ Offline access (coming soon)

Perfect for:
- Fitness enthusiasts
- Rehabilitation patients
- Professional trainers
- Physiotherapists
- Gym owners

Download now and start your fitness journey!
```

**Keywords:**
fitness, workout, physiotherapy, rehabilitation, exercise, trainer, gym, health, wellness, nutrition

**Submit for Review:**
1. Upload build from Xcode
2. Fill all required fields
3. Add screenshots
4. Submit for review
5. Wait 24-48 hours for approval

---

## 🤖 Google Play Store Deployment

### Prerequisites:
- ✅ Google Play Console account ($25 one-time fee)
- ✅ Android Studio installed
- ✅ Valid signing key

### Steps:

#### 1. Configure Android Project

```bash
# Build and sync
npm run build:mobile

# Open in Android Studio
npm run android
```

#### 2. Android Studio Configuration

**In Android Studio:**

**File: `android/app/build.gradle`:**

```gradle
android {
    namespace "com.fitpro.app"
    compileSdk 34
    
    defaultConfig {
        applicationId "com.fitpro.app"
        minSdk 24
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }
    
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
    
    signingConfigs {
        release {
            storeFile file(RELEASE_STORE_FILE)
            storePassword RELEASE_STORE_PASSWORD
            keyAlias RELEASE_KEY_ALIAS
            keyPassword RELEASE_KEY_PASSWORD
        }
    }
}
```

#### 3. Generate Signing Key

```bash
# Create keystore
keytool -genkey -v -keystore fitpro-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias fitpro

# When prompted:
# - Password: [Choose strong password]
# - Name: FitPro App
# - Organization: Your Company
# - City/Country: Your location
```

**Create `android/keystore.properties`:**

```properties
RELEASE_STORE_FILE=../fitpro-release-key.jks
RELEASE_STORE_PASSWORD=your_keystore_password
RELEASE_KEY_ALIAS=fitpro
RELEASE_KEY_PASSWORD=your_key_password
```

**⚠️ IMPORTANT**: Add to `.gitignore`:
```
android/keystore.properties
android/*.jks
```

#### 4. App Icons & Splash Screen

**App Icon:**
- Use: https://romannurik.github.io/AndroidAssetStudio/
- Generate all sizes (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- Place in: `android/app/src/main/res/`

**Splash Screen:**
- Edit: `android/app/src/main/res/values/styles.xml`
- Add custom splash screen with FitPro branding

#### 5. Build Release APK/AAB

```bash
# Build Android App Bundle (AAB) - Required for Play Store
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab

# Or build APK (for testing)
./gradlew assembleRelease
# Output: android/app/build/outputs/apk/release/app-release.apk
```

#### 6. Google Play Console Setup

**Go to**: https://play.google.com/console

**Create New App:**
1. **App name**: FitPro - Fitness & Physiotherapy
2. **Default language**: English (United States)
3. **App or game**: App
4. **Free or paid**: Free (or Paid)

**Store Listing:**

**Short Description** (80 chars):
```
Complete fitness & physiotherapy solution with personalized plans
```

**Full Description** (4000 chars):
```
FitPro - Your Complete Fitness & Physiotherapy Solution

Transform your fitness journey with FitPro, the all-in-one app combining professional workout planning, nutrition guidance, and expert physiotherapy support.

🏋️ PERSONALIZED WORKOUT PLANS
Get custom workout routines tailored to your fitness level, goals, and available equipment. Track your progress with detailed analytics and visual charts.

📊 PROGRESS TRACKING & ANALYTICS
Monitor your fitness journey with comprehensive tracking:
- Weight and body measurements
- Workout completion rates
- Strength gains over time
- Visual progress charts
- Before/after photo comparisons

🍽️ CUSTOM MEAL PLANS & NUTRITION
Receive personalized meal plans based on your dietary preferences, restrictions, and fitness goals. Access a comprehensive food database with nutritional information.

💪 EXERCISE LIBRARY
Browse 500+ exercises with:
- High-quality video demonstrations
- Detailed instructions
- Muscle group targeting
- Difficulty levels
- Equipment requirements

🏥 PROFESSIONAL PHYSIOTHERAPIST ACCESS
Connect with certified physiotherapists for:
- Injury rehabilitation
- Pain management
- Movement assessments
- Exercise modifications
- Recovery protocols

👨‍⚕️ EXPERT TRAINER SUPPORT
Work with professional trainers who provide:
- Custom training programs
- Form correction
- Motivation and accountability
- Goal setting and tracking

🌐 MULTI-LANGUAGE SUPPORT
Available in English, Turkish, Arabic, and Kurdish with full RTL support.

KEY FEATURES:
✅ Role-based dashboards (Patient, Trainer, Physiotherapist, Admin)
✅ Real-time progress synchronization
✅ Appointment scheduling and reminders
✅ Secure authentication and data encryption
✅ Beautiful dark mode interface
✅ Offline access (coming soon)
✅ Push notifications for appointments and milestones
✅ Social sharing of achievements

PERFECT FOR:
- Fitness enthusiasts of all levels
- Rehabilitation patients
- Professional personal trainers
- Licensed physiotherapists
- Gym owners and administrators
- Anyone seeking professional fitness guidance

SUBSCRIPTION OPTIONS:
- Free: Basic features, limited workouts
- Pro: Unlimited workouts, meal plans, trainer access
- Premium: All features + physiotherapist consultations

PRIVACY & SECURITY:
Your data is protected with industry-standard encryption. We never share your personal information with third parties. Read our privacy policy at fitpro.app/privacy

Download FitPro today and take the first step towards a healthier, stronger you!

SUPPORT:
Need help? Contact us at support@fitpro.app
Website: https://fitpro.app
```

**App Category**: Health & Fitness

**Screenshots Required:**
- Phone: 1080x1920px minimum (2-8 images)
- 7" Tablet: 1024x600px minimum (optional)
- 10" Tablet: 1920x1200px minimum (optional)

**Feature Graphic**: 1024x500px (required)

**App Icon**: 512x512px (PNG, 32-bit)

#### 7. Content Rating

**Complete questionnaire:**
- Violence: None
- Sexual Content: None
- Profanity: None
- Controlled Substances: None
- Health information: Yes (fitness and physiotherapy data)

**Expected Rating**: Everyone / PEGI 3

#### 8. Upload Release

1. Go to **Production → Create new release**
2. Upload AAB file: `app-release.aab`
3. **Release name**: 1.0.0
4. **Release notes**:
```
🎉 Welcome to FitPro v1.0.0!

✨ Initial Release Features:
- Personalized workout plans
- Custom meal plans & nutrition tracking
- Exercise library with video guides
- Progress tracking & analytics
- Professional physiotherapist access
- Expert trainer support
- Multi-language support (EN/TR/AR/KU)
- Dark mode interface
- Secure authentication

Thank you for downloading FitPro!
```
5. **Review and rollout to production**
6. Wait for review (typically 2-7 days)

---

## 🔧 Capacitor Configuration

**File: `capacitor.config.ts`**

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fitpro.app',
  appName: 'FitPro',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    // For development (optional)
    // url: 'http://192.168.1.100:3000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0E151B",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      spinnerColor: "#10B2E3",
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0E151B',
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
```

---

## 🎨 Required Assets

### App Icons:

**iOS (all required):**
- 1024x1024 - App Store
- 180x180 - iPhone 3x
- 120x120 - iPhone 2x
- 167x167 - iPad Pro 2x
- 152x152 - iPad 2x
- 76x76 - iPad 1x

**Android (all sizes):**
- xxxhdpi: 192x192
- xxhdpi: 144x144
- xhdpi: 96x96
- hdpi: 72x72
- mdpi: 48x48

### Splash Screens:

**iOS:**
- iPhone 14 Pro Max: 1290x2796
- iPhone 14 Pro: 1179x2556
- iPhone 13: 1170x2532
- iPhone SE: 750x1334
- iPad Pro 12.9": 2048x2732

**Android:**
- xxxhdpi: 1920x1280
- xxhdpi: 1600x960
- xhdpi: 1280x720
- hdpi: 960x640
- mdpi: 640x480

### Marketing Assets:

**iOS:**
- App Preview Video (optional): 15-30 seconds
- Screenshots: 3-10 per device size

**Android:**
- Feature Graphic: 1024x500
- Promo Video (optional): YouTube link
- Screenshots: 2-8 images

---

## 🔌 Essential Capacitor Plugins

### 1. Push Notifications

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

// Request permission
await PushNotifications.requestPermissions();

// Register for push
await PushNotifications.register();

// Listen for token
PushNotifications.addListener('registration', (token) => {
  console.log('Push token:', token.value);
  // Send to your backend
});

// Listen for notifications
PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Push received:', notification);
});
```

### 2. App State

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed. Is active?', isActive);
});

App.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    App.exitApp();
  } else {
    window.history.back();
  }
});
```

### 3. Status Bar

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// Set dark theme
await StatusBar.setStyle({ style: Style.Dark });
await StatusBar.setBackgroundColor({ color: '#0E151B' });
```

### 4. Haptics

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Light haptic feedback
await Haptics.impact({ style: ImpactStyle.Light });

// Medium haptic
await Haptics.impact({ style: ImpactStyle.Medium });

// Heavy haptic
await Haptics.impact({ style: ImpactStyle.Heavy });
```

---

## 🧪 Testing Checklist

### Pre-Release Testing:

**iOS:**
- [ ] Test on iPhone SE (small screen)
- [ ] Test on iPhone 14 Pro (notch)
- [ ] Test on iPhone 15 Pro Max (Dynamic Island)
- [ ] Test on iPad
- [ ] Test all user flows
- [ ] Test push notifications
- [ ] Test deep linking
- [ ] Verify no console errors
- [ ] Test offline behavior
- [ ] Performance test (FPS, memory)

**Android:**
- [ ] Test on Android 9 (API 28)
- [ ] Test on Android 12 (API 31)
- [ ] Test on Android 14 (API 34)
- [ ] Test on small phone (5")
- [ ] Test on large phone (6.7")
- [ ] Test on tablet
- [ ] Test back button behavior
- [ ] Test permissions (camera, location, etc.)
- [ ] Test push notifications
- [ ] Performance test

---

## 📊 App Store Optimization (ASO)

### Keywords (iOS App Store):

**High Priority:**
- fitness app
- workout planner
- physiotherapy
- personal trainer
- exercise guide
- meal planner
- gym tracker
- health fitness

**Medium Priority:**
- workout tracker
- fitness coach
- rehabilitation
- exercise program
- nutrition app
- fitness goals
- workout routine

**Long Tail:**
- physiotherapy exercises
- custom workout plans
- fitness meal planning
- professional trainer app

### Store Listing Tips:

1. **App Name**: Keep under 30 characters
   - Good: "FitPro - Fitness & Physio"
   - Bad: "FitPro - Complete Fitness, Physiotherapy, and Wellness Solution"

2. **Icon**: 
   - Simple and recognizable
   - Works at small sizes
   - Unique color scheme
   - No text (or minimal)

3. **Screenshots**:
   - Show key features
   - Use captions
   - Include phone frame
   - Consistent branding
   - First 2-3 most important

4. **Video Preview**:
   - 15-30 seconds
   - Show core features
   - No sound needed (auto-muted)
   - End with CTA

---

## 🚀 Deployment Workflow

### Standard Release Process:

```bash
# 1. Update version
# Edit version in package.json, ios/App/App/Info.plist, android/app/build.gradle

# 2. Build Next.js app
npm run build

# 3. Sync with native projects
npx cap sync

# 4. iOS (macOS only)
npm run ios
# Then in Xcode: Product → Archive → Distribute

# 5. Android
cd android
./gradlew bundleRelease
# Upload AAB to Google Play Console

# 6. Tag release
git tag v1.0.0
git push origin v1.0.0
```

### Quick Commands:

```bash
# Development
npm run dev                    # Web development
npm run build:mobile          # Build for mobile
npm run ios                   # Open iOS project
npm run android               # Open Android project

# Syncing
npx cap sync                  # Sync web → native
npx cap sync ios              # Sync iOS only
npx cap sync android          # Sync Android only

# Plugins
npx cap ls                    # List installed plugins
npm install @capacitor/[plugin]  # Install plugin
npx cap sync                  # Sync after plugin install

# Clean build
rm -rf out .next
npm run build:mobile
```

---

## 🛡️ Security Considerations

### iOS:

1. **App Transport Security (ATS)**:
   - All API calls must use HTTPS
   - Add exceptions in Info.plist if needed

2. **Keychain Access**:
   - Store sensitive data in Keychain
   - Use @capacitor/preferences for secure storage

3. **Code Signing**:
   - Use automatic signing (recommended)
   - Or manage certificates manually

### Android:

1. **Network Security Config**:
   - Define allowed domains
   - Require HTTPS

2. **ProGuard Rules**:
   - Minimize and obfuscate code
   - Protect API keys

3. **Signing Key**:
   - Keep keystore safe (backup!)
   - Never commit to git
   - Use environment variables

---

## 📱 Firebase Integration (Optional)

If using Firebase for analytics, push, etc:

```bash
# iOS
pod install --project-directory=ios

# Android
# Add google-services.json to android/app/
```

---

## 🎯 Launch Checklist

### Before Submission:

- [ ] Test on real devices (iOS + Android)
- [ ] Update version numbers
- [ ] Create release notes
- [ ] Generate all required screenshots
- [ ] Create feature graphics
- [ ] Write app descriptions
- [ ] Set up privacy policy URL
- [ ] Configure in-app purchases (if any)
- [ ] Set up analytics (Google Analytics, Firebase)
- [ ] Configure push notifications
- [ ] Test deep linking
- [ ] Review app permissions
- [ ] Run security audit
- [ ] Performance optimization
- [ ] Backup signing keys

### After Approval:

- [ ] Monitor crash reports (Crashlytics)
- [ ] Check user reviews
- [ ] Respond to feedback
- [ ] Plan first update
- [ ] Marketing campaign
- [ ] Social media announcement

---

## 📞 Support & Resources

**Capacitor Docs**: https://capacitorjs.com/docs  
**iOS Human Interface Guidelines**: https://developer.apple.com/design/  
**Android Material Design**: https://material.io/design  
**App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/  
**Google Play Policy**: https://play.google.com/about/developer-content-policy/

---

## 🎉 Summary

Your app is now ready for mobile deployment! Follow the steps above to:

1. ✅ Convert Next.js app to native iOS/Android with Capacitor
2. ✅ Build and sign for production
3. ✅ Submit to App Store and Play Store
4. ✅ Launch and monitor

**Estimated Timeline:**
- Setup: 2-4 hours
- App Store submission: 24-48 hours review
- Play Store submission: 2-7 days review

**Good luck with your launch! 🚀**
