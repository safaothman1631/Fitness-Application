# 🔧 Setting Up Firebase Credentials for Backups

## Issue
The backup script needs Firebase Admin credentials but they're not in `.env.local`.

## Solution

### Option 1: Add to .env.local (Recommended)

Add these lines to your `.env.local` file:

```env
# Firebase Admin SDK (for backups and server-side operations)
FIREBASE_PROJECT_ID=final-database-51935
FIREBASE_PRIVATE_KEY_ID=your_private_key_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_private_key_here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@final-database-51935.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id_here
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx@final-database-51935.iam.gserviceaccount.com
```

### Option 2: Get Credentials from Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select Your Project**: final-database-51935
3. **Project Settings** (gear icon) → **Service accounts** tab
4. **Click "Generate new private key"**
5. **Download JSON file**
6. **Extract values**:
   ```json
   {
     "project_id": "final-database-51935",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@final-database-51935.iam.gserviceaccount.com",
     "client_id": "123456789",
     "auth_uri": "...",
     "token_uri": "...",
     "auth_provider_x509_cert_url": "...",
     "client_x509_cert_url": "..."
   }
   ```

7. **Add to .env.local**:
   - Copy `project_id` → `FIREBASE_PROJECT_ID`
   - Copy `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
   - Copy `private_key` → `FIREBASE_PRIVATE_KEY` (keep quotes!)
   - Copy `client_email` → `FIREBASE_CLIENT_EMAIL`
   - Copy `client_id` → `FIREBASE_CLIENT_ID`
   - Copy `client_x509_cert_url` → `FIREBASE_CERT_URL`

### Option 3: Check Existing Service Account Files

You may already have these files in your project:
- `final-database-51935-firebase-adminsdk-fbsvc-1673dfa1f6.json`
- `final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json`

**To use:**
```bash
# View the file content
cat final-database-51935-firebase-adminsdk-*.json

# Extract and add to .env.local manually
```

### Option 4: Use Service Account File Directly

Modify `daily-backup.js` to use JSON file:

```javascript
// Instead of:
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  ...
};

// Use:
const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-1673dfa1f6.json');
```

## After Adding Credentials

Test the backup:
```bash
node scripts/daily-backup.js
```

You should see:
```
🔄 Starting Daily Firebase Backup...
📅 Backup Date: 2025-12-08_15-30
📦 Backing up collection: users...
   ✅ X documents backed up from users
...
✅ Backup completed successfully!
```

## Security Notes

⚠️ **Important:**
1. **Never commit** `.env.local` or service account JSON files to git
2. `.gitignore` should include:
   ```
   .env.local
   *.json (service account files)
   backups/
   ```
3. Keep credentials secure and private
4. Rotate keys periodically (Firebase Console → Service Accounts → Manage Keys)

## Troubleshooting

### "Missing Firebase credentials"
- ✅ Check `.env.local` exists in project root
- ✅ Verify all required variables are set
- ✅ Check for typos in variable names
- ✅ Restart terminal after editing .env.local

### "Invalid private key"
- ✅ Private key must include `\n` characters
- ✅ Wrap in quotes: `"-----BEGIN PRIVATE KEY-----\n..."`
- ✅ No extra spaces or line breaks

### "Permission denied"
- ✅ Service account needs Firestore permissions
- ✅ Check Firebase Console → IAM & Admin
- ✅ Service account should have "Cloud Datastore User" role

## Quick Test

After setup:
```powershell
# Test backup
.\run-backup.bat

# Or directly
node scripts/daily-backup.js
```

Success means you'll see a new file in `backups/` folder!
