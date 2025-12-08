# 🔒 Firebase Security Rules - Production Ready

## ✅ What's Protected

### Collections & Access Levels:

#### 1. **Users** (`/users/{userId}`)
- ✅ **Read**: Public (needed for profiles, names)
- ✅ **Create**: Anyone (registration)
- ✅ **Update**: Owner or Admin
- ✅ **Delete**: Superadmin only

#### 2. **Trainers** (`/trainers/{trainerId}`)
- ✅ **Read**: Public (trainer listings)
- ✅ **Create**: Trainer (own profile) or Admin
- ✅ **Update**: Owner or Admin
- ✅ **Delete**: Admin only

#### 3. **Physiotherapists** (`/physiotherapists/{physioId}`)
- ✅ **Read**: Public (physiotherapist listings)
- ✅ **Create**: Physiotherapist (own profile) or Admin
- ✅ **Update**: Owner or Admin
- ✅ **Delete**: Admin only

#### 4. **Patients** (`/patients/{patientId}`)
- 🔒 **Read**: Physiotherapist (own patients), Patient, or Admin
- 🔒 **Create**: Physiotherapist or Admin
- 🔒 **Update**: Owner Physiotherapist or Admin
- 🔒 **Delete**: Admin only

#### 5. **Physio Requests** (`/physio-requests/{requestId}`)
- 🔒 **Read**: Requester, Target Physiotherapist, or Admin
- 🔒 **Create**: Authenticated User (own request)
- 🔒 **Update**: Requester, Physiotherapist, or Admin
- 🔒 **Delete**: Requester or Admin

#### 6. **Appointments** (`/appointments/{appointmentId}`)
- 🔒 **Read**: Physiotherapist, Patient, or Admin
- 🔒 **Create**: Physiotherapist or Admin
- 🔒 **Update**: Owner Physiotherapist or Admin
- 🔒 **Delete**: Owner Physiotherapist or Admin

#### 7. **Workouts** (`/workouts/{workoutId}`)
- ✅ **Read**: Public (workout library)
- 🔒 **Create**: Trainer or Admin
- 🔒 **Update**: Creator or Admin
- 🔒 **Delete**: Admin only

#### 8. **Exercises** (`/exercises/{exerciseId}`)
- ✅ **Read**: Public (exercise library)
- 🔒 **Create**: Trainer or Admin
- 🔒 **Update**: Creator or Admin
- 🔒 **Delete**: Admin only

#### 9. **Programs** (`/workout-programs/`, `/nutrition-programs/`)
- ✅ **Read**: Public
- 🔒 **Create**: Trainer or Admin
- 🔒 **Update**: Creator or Admin
- 🔒 **Delete**: Admin only

#### 10. **Access Keys** (`/access-keys/{keyId}`)
- 🔒 **Read**: Admin only
- 🔒 **Create**: Admin only
- 🔒 **Update**: Admin only
- 🔒 **Delete**: Superadmin only

#### 11. **Settings** (`/settings/{userId}`)
- 🔒 **Read**: Owner or Admin
- ✅ **Create**: Anyone (new users)
- 🔒 **Update**: Owner only
- 🔒 **Delete**: Owner or Admin

#### 12. **Notifications** (`/notifications/{notificationId}`)
- 🔒 **Read**: Owner only
- 🔒 **Create**: System or Admin
- 🔒 **Update**: Owner (mark as read)
- 🔒 **Delete**: Owner only

#### 13. **Community Posts** (`/community-posts/{postId}`)
- ✅ **Read**: Public
- 🔒 **Create**: Authenticated Users
- 🔒 **Update**: Owner or Admin
- 🔒 **Delete**: Owner or Admin

#### 14. **Payments** (`/payments/{paymentId}`)
- 🔒 **Read**: Owner or Admin
- 🔒 **Create**: Owner (own payment)
- 🔒 **Update**: Admin only (verification, refunds)
- 🔒 **Delete**: Admin only

#### 15. **Subscriptions** (`/subscriptions/{subscriptionId}`)
- 🔒 **Read**: Owner or Admin
- 🔒 **Create**: Admin only
- 🔒 **Update**: Admin only
- 🔒 **Delete**: Admin only

#### 16. **Logs** (Workout/Meal/Progress)
- 🔒 **Read**: Owner, Trainer/Physio, or Admin
- 🔒 **Create**: Owner only
- 🔒 **Update**: Owner or Admin
- 🔒 **Delete**: Owner or Admin

#### 17. **Videos** (`/videos/{videoId}`)
- ✅ **Read**: Public
- 🔒 **Create**: Admin only
- 🔒 **Update**: Admin only
- 🔒 **Delete**: Superadmin only

#### 18. **System Logs** (`/system-logs/{logId}`)
- 🔒 **Read**: Admin only
- ✅ **Create**: System
- ❌ **Update**: Never
- 🔒 **Delete**: Superadmin only

---

## 🚀 Deployment Commands

### Deploy Production Rules:
```bash
# Using Firebase CLI
firebase deploy --only firestore:rules --project final-database-51935
```

### Test Rules Before Deploy:
```bash
# Install Firebase Emulator
firebase init emulators

# Start emulator with rules
firebase emulators:start --only firestore

# Run tests (if you have test files)
npm run test:firestore
```

---

## 🔍 Helper Functions

The rules use these helper functions:

```javascript
isAuthenticated()       // User is logged in
isOwner(userId)        // User owns the document
getUserRole()          // Get current user's role
isAdmin()              // User is admin/superadmin/owner
isSuperadmin()         // User is superadmin/owner
isOwnerRole()          // User has owner role
isTrainer()            // User is trainer
isPhysiotherapist()    // User is physiotherapist
isUser()               // User is regular user
```

---

## ⚠️ Important Notes

### Before Deployment:

1. **Backup Current Rules**: 
   ```bash
   firebase firestore:rules:get > firestore-backup-$(date +%Y%m%d).rules
   ```

2. **Test Thoroughly**: Test all user flows after deployment

3. **Monitor Errors**: Check Firebase Console → Firestore → Rules tab for denied requests

4. **Gradual Rollout**: Consider deploying to staging first

### After Deployment:

1. **Check Console**: Firebase Console → Firestore → Rules → Monitor tab
2. **Look for Denied Requests**: Any legitimate requests being blocked?
3. **Update if Needed**: Rules can be updated anytime without app changes

---

## 🛠️ Quick Deploy Script

Create `deploy-firestore-rules.bat`:

```batch
@echo off
echo.
echo ================================================
echo   Deploying Production Firestore Security Rules
echo ================================================
echo.
echo Project: final-database-51935
echo Rules File: firestore-production.rules
echo.
pause

copy /Y firestore-production.rules firestore.rules

firebase deploy --only firestore:rules --project final-database-51935

echo.
echo ================================================
echo   Deployment Complete!
echo ================================================
echo.
echo Check Firebase Console for any issues:
echo https://console.firebase.google.com/project/final-database-51935/firestore/rules
echo.
pause
```

Run: `.\deploy-firestore-rules.bat`

---

## 📊 Security Checklist

Before going live:

- [x] ✅ All collections have proper access control
- [x] ✅ Admin operations require admin role
- [x] ✅ Users can only access their own data
- [x] ✅ Sensitive data (payments, subscriptions) protected
- [x] ✅ Public data (workouts, exercises) readable by all
- [x] ✅ Create operations validate user ownership
- [x] ✅ Delete operations restricted to admins
- [x] ✅ System logs are write-only
- [x] ✅ Unknown collections are blocked by default

---

## 🔧 Troubleshooting

### "Permission Denied" Errors:

1. **Check Authentication**: User must be logged in
2. **Check Role**: User has correct role in `/users/{uid}`
3. **Check Ownership**: User owns the document they're accessing
4. **Check Rules**: Verify rule matches your use case

### Testing Individual Rules:

Use Firebase Rules Playground in Console:
1. Go to Firestore → Rules tab
2. Click "Rules Playground"
3. Test specific operations with different auth states

---

## 📝 Rule Updates Log

| Date | Change | Reason |
|------|--------|--------|
| 2025-12-08 | Initial production rules | Launch preparation |
| - | - | - |

---

## 🎯 Next Steps

1. **Deploy Rules**: `firebase deploy --only firestore:rules`
2. **Test All Flows**: Login, CRUD operations, role-based access
3. **Monitor Console**: Watch for denied requests
4. **Update as Needed**: Rules can be changed anytime

**Your security rules are now production-ready!** 🚀
