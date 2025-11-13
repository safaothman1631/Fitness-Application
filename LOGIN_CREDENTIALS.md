# 🔐 Login Credentials for Testing

## Test User Accounts in Firebase

All users are now stored in **Firebase Authentication** and **Firestore Database**.

---

## 1. 👑 SUPERADMIN (Full System Access)
- **Email:** `superadmin@fitpro.com`
- **Password:** `SuperAdmin123!`
- **Role:** superadmin
- **Membership:** Pro
- **Subscription:** Active (1 year remaining)
- **Access:** Full control over all system features

---

## 2. 🌟 NEW PREMIUM USER (Full Subscription)
- **Email:** `newuser@fitpro.com`
- **Password:** `NewUser123!`
- **Role:** user
- **Membership:** Premium
- **Subscription:** Active (30 days remaining)
- **Access:** All premium features available

---

## 3. ⚠️ MID USER (Half Subscription)
- **Email:** `miduser@fitpro.com`
- **Password:** `MidUser123!`
- **Role:** user
- **Membership:** Basic
- **Subscription:** Active (15 days remaining - halfway)
- **Access:** Basic features + warning banner

---

## 4. ❌ NO SUBSCRIPTION USER (Expired)
- **Email:** `nosubuser@fitpro.com`
- **Password:** `NoSub123!`
- **Role:** user
- **Membership:** Basic
- **Subscription:** Expired (30 days ago)
- **Access:** Limited features, needs renewal

---

## Quick Login Tips

### Quick Test Buttons
The login page now has quick-fill buttons for all test accounts. Just click the button and then click "Sign In".

### Manual Login
1. Go to `/giris` (login page)
2. Enter email and password from above
3. Click "Sign In"
4. You'll be redirected based on your role:
   - SuperAdmin → `/superadmin`
   - User → `/dashboard`

---

## Authentication Flow

1. **Firebase Authentication**: Validates email/password
2. **Firestore Check**: Retrieves user role and subscription status
3. **Role-Based Redirect**: Sends user to appropriate dashboard
4. **Subscription Check**: Shows banners/warnings based on subscription status

---

## What Was Fixed

✅ Integrated real Firebase Authentication (was using mock login before)
✅ Added proper error handling with user-friendly messages
✅ Updated quick test buttons with actual Firebase credentials
✅ Added error display in UI
✅ Proper role-based routing after login
✅ Toast notifications for success/error feedback

---

## Previous Mock Accounts (Still Work)

These are hardcoded in `auth-service.ts` for development:
- `user@darinfitness.com` / `user1234`
- `admin@darinfitness.com` / `DarinFitness2025!`
- `trainer@darinfitness.com` / `trainer1234`
- `physio@darinfitness.com` / `physio1234`

---

## Testing Scenarios

### ✅ Test Successful Login
Use: `superadmin@fitpro.com` / `SuperAdmin123!`
Expected: Success toast + redirect to superadmin dashboard

### ⚠️ Test Wrong Password
Use: `superadmin@fitpro.com` / `wrongpassword`
Expected: Error message "Incorrect email or password"

### ❌ Test Non-Existent User
Use: `fake@email.com` / `anypassword`
Expected: Error message "No account found with this email address"

### 📅 Test Subscription Status
- Premium User: Green banner, full access
- Mid User: Yellow warning banner
- Expired User: Red alert banner, limited access

---

## Security Notes

⚠️ **IMPORTANT**: 
- These are test credentials for development only
- Remove or disable test accounts before production deployment
- Consider removing the "Quick Test Accounts" card in production
- Change all passwords to more secure ones for production

---

**Last Updated:** November 12, 2025
**Created By:** Database Setup Script
