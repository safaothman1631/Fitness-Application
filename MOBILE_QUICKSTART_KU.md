# 🚀 Quick Start: Mobile App Deployment (کوردی / English)

## پێشەکی / Overview

ئەم ڕێنماییە یارمەتیت دەدات **FitPro** لە iOS App Store و Google Play Store پەبلیش بکەیت بە بەکارهێنانی **Capacitor**.

This guide helps you publish **FitPro** to iOS App Store and Google Play Store using **Capacitor**.

---

## 🔧 Step 1: سەتئەپی سەرەتایی / Initial Setup

### Install Capacitor

```bash
# Capacitor دابمەزرێنە
npm install

# Capacitor سەتئەپ بکە
npx cap init

# کاتێک پرسیارەکان دەکات:
# App name: FitPro
# App ID: com.fitpro.app
# Web directory: out
```

---

## 📱 Step 2: iOS سەتئەپ / iOS Setup

### Prerequisites (پێداویستییەکان):

✅ کۆمپیوتەری macOS (ناچارە بۆ iOS)  
✅ Xcode 15+ دامەزراوە  
✅ Apple Developer Account ($99/year)

### Commands:

```bash
# iOS پلاتفۆرم زیاد بکە
npx cap add ios

# بیلد بکە و بۆ iOS sync بکە  
npm run build:mobile

# Xcode بکەرەوە
npm run ios
```

### لە Xcode:

1. **General** تابەکە بکەرەوە
2. **Display Name**: FitPro
3. **Bundle ID**: com.fitpro.app  
4. **Version**: 1.0.0
5. **Deployment Target**: iOS 14.0+
6. **Signing**: تیمی Apple Developer دیاری بکە

### ناردن بۆ App Store:

1. **Product → Archive**
2. **Distribute App → App Store Connect**
3. بیناردە بۆ App Store Connect
4. لە https://appstoreconnect.apple.com ئەپەکەت سەتئەپ بکە
5. سکرینشۆتەکان و وێنەکان زیاد بکە
6. بۆ Review پێش بکە

---

## 🤖 Step 3: Android سەتئەپ / Android Setup

### Prerequisites (پێداویستییەکان):

✅ Google Play Console account ($25 one-time)  
✅ Android Studio دامەزراوە

### Commands:

```bash
# Android پلاتفۆرم زیاد بکە
npx cap add android

# بیلد بکە و بۆ Android sync بکە
npm run build:mobile

# Android Studio بکەرەوە  
npm run android
```

### Signing Key دروست بکە:

```bash
keytool -genkey -v -keystore fitpro-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias fitpro

# پاسوۆردێکی بەهێز دیاری بکە!
```

### AAB بیلد بکە بۆ Play Store:

```bash
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### ناردن بۆ Play Store:

1. بڕۆ بۆ https://play.google.com/console
2. ئەپێکی نوێ دروست بکە
3. AAB فایلەکە باربکە
4. سکرینشۆتەکان و وێنەکان زیاد بکە
5. بۆ Review پێش بکە (2-7 ڕۆژ)

---

## 🎨 Step 4: وێنەکان / Assets Needed

### ئایکۆنی ئەپ / App Icon:

**iOS:**
- 1024x1024 PNG (بێ شەففافیەت)

**Android:**
- 512x512 PNG  
- Use tool: https://appicon.co

### Splash Screen:

- iPhone 14 Pro Max: 1290x2796
- Android: 1920x1280

### سکرینشۆتەکان / Screenshots:

**iOS:**
- iPhone 6.7": 1290x2796 (3-10 وێنە)
- iPad Pro 12.9": 2048x2732

**Android:**
- Phone: 1080x1920 minimum (2-8 وێنە)  
- Feature Graphic: 1024x500 (ناچارە)

---

## 🚀 Step 5: بیلدکردن و ناردن / Build & Deploy

### بۆ iOS:

```bash
# بیلد بکە
npm run build:mobile

# Xcode بکەرەوە
npm run ios

# لە Xcode:
# Product → Archive → Distribute → App Store Connect
```

### بۆ Android:

```bash
# بیلد بکە
npm run build:mobile

# AAB دروست بکە
cd android
./gradlew bundleRelease

# AAB فایلەکە باربکە بۆ Play Console
```

---

## ✅ چێککردنی کۆتایی / Final Checklist

### پێش ناردن:

- [ ] تاقیکردنەوە لەسەر دەستگای ڕاستەقینە
- [ ] ژمارەی version نوێ بکەرەوە
- [ ] ئایکۆن و splash screen دروست بکە
- [ ] سکرینشۆتەکان ئامادە بکە  
- [ ] Privacy Policy URL دیاری بکە
- [ ] تاقیکردنەوەی ئەدای کار (Performance)

### دوای پەسەندکردن:

- [ ] چاودێریی کراش ریپۆرتەکان بکە
- [ ] وەڵامی ریڤیوەکان بدەرەوە
- [ ] پلانی یەکەمین ئەپدەیت

---

## 📞 یارمەتی / Help

**Capacitor Docs**: https://capacitorjs.com/docs  
**iOS Guidelines**: https://developer.apple.com/app-store/review/guidelines/  
**Android Policy**: https://play.google.com/about/developer-content-policy/

---

## ⏱️ کاتی چاوەڕوانکراو / Expected Timeline

- **سەتئەپ**: 2-4 کاتژمێر
- **iOS Review**: 24-48 کاتژمێر  
- **Android Review**: 2-7 ڕۆژ

---

## 📚 دۆکیومێنتی تەواو / Full Documentation

بۆ زانیاری زیاتر، [MOBILE_APP_DEPLOYMENT_GUIDE.md](MOBILE_APP_DEPLOYMENT_GUIDE.md) ببینە.

For complete details, see [MOBILE_APP_DEPLOYMENT_GUIDE.md](MOBILE_APP_DEPLOYMENT_GUIDE.md).

---

**سەرکەوتوو بیت! / Good luck! 🚀**
