# Test Credentials for Login

## ⚠️ IMPORTANT: Login Validation Now Active

All login pages now require valid email and password. You cannot login with empty fields or invalid credentials.

## Test Accounts

### Superadmin Account
- **Email:** `admin@darinfitness.com`
- **Password:** `DarinFitness2025!`
- **Access:** Full system control - user management, access keys, settings
- **Login URL:** http://localhost:3000/login/superadmin

### Admin Account
- **Email:** `admin@darinfitness.com`
- **Password:** `DarinFitness2025!`
- **Access:** User and workout management
- **Login URL:** http://localhost:3000/login/admin

### Trainer Account
- **Email:** `trainer@darinfitness.com`
- **Password:** `trainer123`
- **Access:** Trainee management and progress tracking
- **Login URL:** http://localhost:3000/login/trainer

### Physiotherapist Account
- **Email:** `physio@darinfitness.com`
- **Password:** `physio123`
- **Access:** Patient management and treatment plans
- **Login URL:** http://localhost:3000/login/physiotherapist

### User Account
- **Email:** `user@darinfitness.com`
- **Password:** `user1234`
- **Access:** Personal dashboard, workouts, and meal plans
- **Login URL:** http://localhost:3000/login

## Validation Rules

All login forms now validate:
1. ✅ **Email is required** - Cannot be empty
2. ✅ **Email format** - Must be valid email (user@domain.com)
3. ✅ **Password is required** - Cannot be empty
4. ✅ **Password length** - Must be at least 6 characters
5. ✅ **Credentials match** - Email and password must match test accounts above

## Error Messages

You will see these error messages if validation fails:
- "Please enter your email" - Email field is empty
- "Please enter a valid email address" - Email format is invalid
- "Please enter your password" - Password field is empty
- "Password must be at least 6 characters" - Password too short
- "Invalid email or password" - Credentials don't match

## Success Message

When login is successful, you'll see:
- "Login successful!" - Green toast notification
- Automatic redirect to your role's dashboard

## Testing the Login

### Test 1: Empty Fields
1. Go to any login page
2. Click "Login" without entering anything
3. ✅ Should show error: "Please enter your email"

### Test 2: Invalid Email Format
1. Enter: `notanemail`
2. Enter password: `test123`
3. Click "Login"
4. ✅ Should show error: "Please enter a valid email address"

### Test 3: Short Password
1. Enter valid email: `admin@darinfitness.com`
2. Enter password: `12345` (only 5 characters)
3. Click "Login"
4. ✅ Should show error: "Password must be at least 6 characters"

### Test 4: Wrong Credentials
1. Enter: `wrong@email.com`
2. Enter password: `wrongpassword`
3. Click "Login"
4. ✅ Should show error: "Invalid email or password"

### Test 5: Correct Login
1. Enter: `admin@darinfitness.com`
2. Enter password: `DarinFitness2025!`
3. Click "Login"
4. ✅ Should show success message and redirect to dashboard

## For Production

These are **mock credentials** for development only. When you integrate Firebase Authentication:

1. **Remove mock validation** from login pages
2. **Replace with Firebase Auth:**
```tsx
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Keep validation...
  if (!formData.email.trim()) {
    toast.error("Please enter your email")
    return
  }
  
  setLoading(true)
  try {
    // Use Firebase Auth instead of mock
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
    
    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
    const userRole = userDoc.data()?.role
    
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userRole", userRole)
    toast.success("Login successful!")
    router.push(`/${userRole}`)
  } catch (error) {
    toast.error("Invalid email or password")
  } finally {
    setLoading(false)
  }
}
```

3. **Create real users** in Firebase Authentication
4. **Store roles** in Firestore `users` collection

## Next Steps

1. ✅ **Login validation complete** - Can't login without credentials
2. ⏳ **Enable Firebase Auth** in Firebase Console (see ENABLE_AUTH.md)
3. ⏳ **Integrate Firebase Auth** in login pages
4. ⏳ **Create real user accounts** with proper roles
5. ⏳ **Add logout functionality** throughout the app

## Summary

🔒 **Security is now active!** You must enter valid email and password to login. Empty fields or wrong credentials will be rejected with clear error messages.

Test with the credentials above to access different role dashboards.
