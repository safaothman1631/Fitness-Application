# Firebase/Firestore Database Setup Guide

## 🚀 Quick Start

This guide will help you set up Firebase/Firestore for your DARIN FITNESS VIP application.

## Prerequisites

- Node.js 18+ installed
- A Google account
- Firebase CLI installed (`npm install -g firebase-tools`)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `darin-fitness-vip`
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** (we have custom rules)
4. Select your preferred location (closest to your users)
5. Click "Enable"

## Step 3: Enable Authentication

1. Go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** provider
4. Click "Save"

## Step 4: Get Firebase Configuration

### Client SDK Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the **</>** (Web) icon
4. Register app name: `darin-fitness-web`
5. Copy the `firebaseConfig` object

### Admin SDK Config

1. Go to **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Save the JSON file securely (DO NOT commit to git!)
4. Extract these values for `.env`:
   - `project_id`
   - `private_key`
   - `client_email`

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase credentials in `.env.local`:

```env
# Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=darin-fitness-vip.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=darin-fitness-vip
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=darin-fitness-vip.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Admin SDK
FIREBASE_PROJECT_ID=darin-fitness-vip
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@darin-fitness-vip.iam.gserviceaccount.com
```

**Important:** Replace `\n` in private key with actual newlines in the `.env.local` file, or keep as `\\n` (double backslash).

## Step 6: Deploy Firestore Security Rules

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Firestore (rules and indexes)
# - Use existing project: darin-fitness-vip
# - Keep default files (firestore.rules, firestore.indexes.json)

# Deploy rules
firebase deploy --only firestore:rules
```

## Step 7: Create Firestore Indexes

Some queries require composite indexes. Firebase will prompt you to create them when needed, or you can create them manually:

1. Go to **Firestore Database** → **Indexes**
2. Click "Create Index"
3. Add these composite indexes:

### Index 1: Users by role and status
- Collection: `users`
- Fields: `role` (Ascending), `isActive` (Ascending)

### Index 2: Patients by physiotherapist
- Collection: `patients`
- Fields: `physiotherapistId` (Ascending), `isActive` (Ascending)

### Index 3: Notifications by user
- Collection: `notifications`
- Fields: `userId` (Ascending), `isRead` (Ascending), `createdAt` (Descending)

### Index 4: Workout logs by user
- Collection: `workout-logs`
- Fields: `userId` (Ascending), `completedAt` (Descending)

## Step 8: Initialize Database with Sample Data

Run the initialization script to create:
- Superadmin user
- Sample access keys
- Sample exercises
- Default settings template

```bash
# Install dependencies if needed
npm install

# Run initialization script
npm run db:init
```

You'll see output like:
```
✅ Superadmin created successfully
   📧 Email: admin@darinfitness.com
   🔑 Password: DarinFitness2025!
   🆔 UID: abc123...
```

**Save these credentials!** You'll need them to log in.

## Step 9: Update package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:init": "tsx lib/init-database.ts",
    "db:backup": "firebase firestore:export gs://your-bucket-name/backups",
    "db:restore": "firebase firestore:import gs://your-bucket-name/backups"
  }
}
```

Install tsx if needed:
```bash
npm install --save-dev tsx
```

## Step 10: Verify Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login/superadmin`

3. Log in with superadmin credentials:
   - Email: `admin@darinfitness.com`
   - Password: `DarinFitness2025!`

4. Check Firestore Database in Firebase Console to see created collections

## Database Collections

Your Firestore database includes these collections:

- **users** - All user accounts (users, admins, superadmins)
- **trainers** - Trainer profiles
- **physiotherapists** - Physiotherapist profiles
- **patients** - Patient records
- **workouts** - Workout plans
- **exercises** - Exercise library
- **access-keys** - Membership access keys
- **settings** - User settings
- **notifications** - User notifications
- **workout-logs** - Workout completion logs

See `FIRESTORE_SCHEMA.md` for detailed schema documentation.

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore`
- Use environment variables for all secrets
- Deploy security rules before production
- Enable Firebase App Check for additional security
- Regularly rotate service account keys
- Use Firebase Admin SDK only on server-side

### ❌ DON'T:
- Commit service account JSON files to git
- Expose private keys in client-side code
- Use `allow read, write: if true` in production
- Share admin credentials
- Hardcode API keys in source code

## Backup Strategy

### Automated Backups

Set up automated backups in Firebase Console:
1. Go to **Firestore Database** → **Backups**
2. Click "Set up automated backups"
3. Choose frequency and location

### Manual Backups

```bash
# Export entire database
firebase firestore:export gs://your-bucket-name/backups/$(date +%Y%m%d)

# Export specific collection
firebase firestore:export --collection users gs://your-bucket-name/backups/users
```

## Monitoring and Analytics

1. **Firebase Console Dashboard**
   - Monitor read/write operations
   - Track usage and billing
   - View security rule evaluations

2. **Cloud Logging**
   - View API logs
   - Debug security rule denials
   - Track errors

3. **Performance Monitoring**
   - Install Firebase Performance SDK
   - Monitor query performance
   - Track slow operations

## Troubleshooting

### "Permission denied" errors
- Check Firestore security rules
- Verify user authentication
- Ensure user has correct role in `/users/{userId}`

### "Missing or insufficient permissions"
- Deploy latest security rules: `firebase deploy --only firestore:rules`
- Check if user is authenticated
- Verify API routes use Admin SDK correctly

### "Firebase Admin not initialized"
- Check environment variables in `.env.local`
- Verify `FIREBASE_PRIVATE_KEY` has correct format
- Restart Next.js dev server after env changes

### Slow queries
- Create composite indexes for complex queries
- Avoid fetching entire collections
- Use pagination with `limit()` and `startAfter()`
- Consider denormalizing data for read-heavy operations

## Production Deployment

Before deploying to production:

1. **Update security rules** - Remove any test/development rules
2. **Set up Firebase App Check** - Protect against abuse
3. **Enable Firebase Authentication** - Set up email verification
4. **Configure CORS** - Restrict origins in Firebase Console
5. **Set up monitoring** - Enable Cloud Monitoring and Alerting
6. **Test all API routes** - Ensure CRUD operations work correctly
7. **Create backups** - Set up automated backup schedule
8. **Update environment variables** - Use production Firebase project

## Support

For issues or questions:
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Review `FIRESTORE_SCHEMA.md` for data structure
- Check `firestore.rules` for security rules
- Review API routes in `app/api/**`

## Next Steps

After setup is complete:
1. ✅ Change superadmin password
2. ✅ Create additional admin users
3. ✅ Generate more access keys
4. ✅ Customize security rules for your needs
5. ✅ Set up Firebase Hosting (optional)
6. ✅ Configure custom domain
7. ✅ Enable Firebase Analytics
8. ✅ Set up Cloud Functions (if needed)
