# 🔧 Fixing Firebase Authentication 400 Error

## Problem Identified
The error "auth/api-key-not-valid" means your Firebase API key has restrictions or Email/Password authentication is not enabled.

---

## ✅ Solution Steps

### Step 1: Enable Email/Password Authentication

1. Go to **Firebase Console**: https://console.firebase.google.com/
2. Select your project: **final-database-51935**
3. Click **Authentication** in the left menu
4. Click **Sign-in method** tab
5. Find **Email/Password** in the providers list
6. Click on it and **Enable** it
7. Click **Save**

### Step 2: Check API Key Restrictions

1. Go to **Google Cloud Console**: https://console.cloud.google.com/
2. Select project: **final-database-51935**
3. Go to **APIs & Services** > **Credentials**
4. Find your **Browser key** (API key starting with AIzaSyBUXCa...)
5. Click on it to edit
6. Check **Application restrictions**:
   - Should be set to **None** or
   - Set to **HTTP referrers** and add:
     - `localhost:*`
     - `127.0.0.1:*`
     - Your production domain
7. Check **API restrictions**:
   - Should be **Don't restrict key** or
   - Include these APIs:
     - Identity Toolkit API
     - Cloud Firestore API
     - Firebase Authentication API
8. Click **Save**

### Step 3: Verify Your API Key

Your current API key from `.env.local`:
```
AIzaSyBUXCaDOwPuO5GGwHlGJiwpnrFaFL22Nfg
```

Make sure this matches the key in Firebase Console:
1. Firebase Console > Project Settings (gear icon)
2. Scroll down to **Your apps**
3. Find your Web app
4. Check the **API Key** value

### Step 4: Enable Required APIs

In Google Cloud Console, make sure these APIs are enabled:
1. Go to **APIs & Services** > **Library**
2. Search and enable:
   - ✅ **Identity Toolkit API** (required for auth)
   - ✅ **Cloud Firestore API**
   - ✅ **Firebase Authentication API**

---

## 🧪 After Making Changes

1. Wait 5-10 minutes for changes to propagate
2. Clear your browser cache
3. Restart your dev server:
   ```bash
   npm run dev
   ```
4. Try logging in again at http://localhost:3000/giris

---

## 🔄 Alternative: Generate New API Key

If the above doesn't work, create a new Web app:

1. Firebase Console > Project Settings
2. Scroll to **Your apps**
3. Click **Add app** > Select **Web** (</> icon)
4. Give it a name (e.g., "Fitness App Web")
5. Copy the new config values
6. Update your `.env.local` file with new values

---

## 📞 Quick Check Commands

After fixing, run this to verify:
```bash
node test-client-auth.mjs
```

Should show:
```
✅ Login successful!
User ID: 17ARhkP0NQOT5hW7ZxE1BiXoQDj1
Email: superadmin@fitpro.com
```

---

## Common Issues

### Issue: "auth/admin-restricted-operation"
**Fix**: Enable Email/Password authentication in Firebase Console

### Issue: "auth/api-key-not-valid"
**Fix**: Remove API restrictions in Google Cloud Console

### Issue: "auth/app-not-authorized"
**Fix**: Add your domain to authorized domains in Firebase Console > Authentication > Settings > Authorized domains

### Issue: "auth/network-request-failed"
**Fix**: Check internet connection or firewall settings

---

## 🎯 What This Will Fix

Once you complete these steps:
- ✅ Login page will work with real Firebase authentication
- ✅ No more 400 errors
- ✅ Users can log in with email/password
- ✅ Role-based routing will work
- ✅ Session management will be active

---

## Need Help?

If you still have issues after following these steps, check:
1. Browser console for detailed error messages
2. Network tab for failed requests
3. Firebase Console > Authentication > Users (to see if users exist)

---

**Last Updated:** November 12, 2025
