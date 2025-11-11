# 🔥 Quick Firestore Setup Guide

## Your Current Status

✅ Firebase credentials are configured in `.env.local`  
✅ Firebase CLI is installed (v14.24.1)  
❌ **Firestore Database needs to be enabled in Firebase Console**

## Step-by-Step Setup (5 minutes)

### Step 1: Enable Firestore Database

1. **Open Firebase Console:**  
   Go to: https://console.firebase.google.com/project/project-5957524015870233160

2. **Enable Firestore:**
   - Click on **"Build"** in the left sidebar
   - Click on **"Firestore Database"**
   - Click **"Create database"** button
   
3. **Choose Mode:**
   - Select **"Start in production mode"** (we have custom security rules)
   - Click **"Next"**

4. **Choose Location:**
   - Select closest location to your users (e.g., `eur3` for Europe)
   - Click **"Enable"**
   - Wait 1-2 minutes for Firestore to initialize

### Step 2: Enable Authentication

1. **In Firebase Console**, go to **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. Click on **"Email/Password"** provider
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### Step 3: Deploy Security Rules

```powershell
# Login to Firebase (opens browser)
firebase login

# Initialize Firebase in your project
firebase init

# During init, select:
# - Firestore (Space to select, Enter to confirm)
# - Use existing project: project-5957524015870233160
# - Firestore rules file: firestore.rules (press Enter to keep default)
# - Firestore indexes file: firestore.indexes.json (press Enter to keep default)

# Deploy the security rules
firebase deploy --only firestore:rules
```

### Step 4: Initialize Database with Sample Data

```powershell
# Make sure you're in project directory
Set-Location 'c:\Users\SAFA\OneDrive\Desktop\code[2]'

# Run the initialization script
npm run db:init
```

This will create:
- ✅ Superadmin user: `admin@darinfitness.com` / `DarinFitness2025!`
- ✅ 5 sample access keys
- ✅ 3 sample exercises
- ✅ Default settings template

### Step 5: Verify Setup

1. **Start development server:**
   ```powershell
   npm run dev
   ```

2. **Open browser:**
   Go to: http://localhost:3000/login/superadmin

3. **Log in with:**
   - Email: `admin@darinfitness.com`
   - Password: `DarinFitness2025!`

4. **Check Firestore Console:**
   Go back to Firebase Console → Firestore Database  
   You should see collections: `users`, `access-keys`, `exercises`, etc.

## Quick Commands

```powershell
# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Deploy security rules
firebase deploy --only firestore:rules

# Initialize database
npm run db:init

# Start dev server
npm run dev
```

## Troubleshooting

### "No projects found" error
You're not logged in to Firebase CLI.
**Fix:** Run `firebase login` and log in with your Google account

### "Permission denied" in Firestore
Security rules not deployed.
**Fix:** Run `firebase deploy --only firestore:rules`

### "Collection does not exist"
Database not initialized.
**Fix:** Run `npm run db:init`

## Visual Checklist

After completing all steps, you should have:

- ✅ Firestore Database enabled in Firebase Console
- ✅ Email/Password authentication enabled
- ✅ Security rules deployed
- ✅ Sample data created (users, access-keys, exercises)
- ✅ Able to log in to superadmin dashboard

## Next Steps After Setup

1. Change superadmin password
2. Create additional users
3. Generate more access keys
4. Start building features!

---

**Need help?** Check the detailed guides:
- `FIREBASE_SETUP.md` - Complete setup instructions
- `FIRESTORE_SCHEMA.md` - Database structure
- `DATABASE_README.md` - Quick reference
