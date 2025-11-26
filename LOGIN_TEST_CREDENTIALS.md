# 🔐 Test Login Credentials

## Universal Login System
**Login URL:** http://localhost:3000/login

All users login at the same page. The system automatically detects the user role from credentials and redirects to the appropriate dashboard.

---

## Test Accounts

### 👑 Superadmin
- **Email:** `superadmin@darinfitness.com`
- **Password:** `DarinFitness2025!`
- **Dashboard:** `/superadmin`

### 🛡️ Admin
- **Email:** `admin@darinfitness.com`
- **Password:** `DarinFitness2025!`
- **Dashboard:** `/admin`

### 💪 Trainer
- **Email:** `trainer@darinfitness.com`
- **Password:** `trainer1234`
- **Dashboard:** `/trainer`

### 🏥 Physiotherapist
- **Email:** `physio@darinfitness.com`
- **Password:** `physio1234`
- **Dashboard:** `/physiotherapist`

### 👔 Owner
- **Email:** `owner@darinfitness.com`
- **Password:** `owner1234`
- **Dashboard:** `/owner`

### 🤕 Patient
- **Email:** `patient@darinfitness.com`
- **Password:** `patient1234`
- **Dashboard:** `/patient-panel`

### 👤 Regular User
- **Email:** `user@darinfitness.com`
- **Password:** `user1234`
- **Dashboard:** `/dashboard`

---

## How It Works

1. **Go to:** http://localhost:3000/login
2. **Enter** any of the test credentials above
3. **System automatically:**
   - Validates credentials
   - Detects user role
   - Redirects to appropriate dashboard

## For Development

These are **mock credentials** built into the system for testing. They work without needing Firebase Authentication or Firestore database.

When you're ready for production:
1. Set up Firebase Authentication
2. Create users in Firebase Auth
3. Add corresponding user documents in Firestore collections
4. The system will automatically switch to Firebase authentication

---

**Last Updated:** November 11, 2025
