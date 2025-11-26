# 🔐 Get Service Account Credentials for final-database-51935

## Step 1: Go to Firebase Console
Open this URL in your browser:
```
https://console.firebase.google.com/project/final-database-51935/settings/serviceaccounts/adminsdk
```

## Step 2: Generate New Private Key

1. You'll see a page titled **"Service accounts"**
2. Click the button that says **"Generate new private key"**
3. A dialog will appear - click **"Generate key"**
4. A JSON file will download (e.g., `final-database-51935-firebase-adminsdk-xxxxx.json`)

## Step 3: Extract Values from JSON File

Open the downloaded JSON file and find these values:

```json
{
  "type": "service_account",
  "project_id": "final-database-51935",                    // ← Copy this
  "private_key_id": "...",                                  // ← Copy this
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",  // ← Copy this (entire key with \n)
  "client_email": "firebase-adminsdk-xxxxx@final-database-51935.iam.gserviceaccount.com",  // ← Copy this
  "client_id": "...",                                       // ← Copy this
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."                            // ← Copy this
}
```

## Step 4: Update .env.local

Replace the Firebase Admin section in your `.env.local` file with the new values:

```env
# Firebase Admin SDK (Server-side only - KEEP SECURE!)
FIREBASE_PROJECT_ID=final-database-51935
FIREBASE_PRIVATE_KEY_ID=paste_private_key_id_here
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\npaste_entire_private_key_here_with_newlines\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@final-database-51935.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=paste_client_id_here
FIREBASE_CERT_URL=paste_client_x509_cert_url_here
```

## Step 5: Run Database Initialization

After updating `.env.local`:

```powershell
# Initialize database
npm run db:init

# Start development server
npm run dev
```

## ⚠️ IMPORTANT: Security

1. **DO NOT** commit the downloaded JSON file to git
2. **DO NOT** share your private key publicly
3. **DELETE** the downloaded JSON file after extracting values
4. The `.env.local` file is already in `.gitignore` - never commit it!

---

**After completing these steps, run `npm run db:init` to create your superadmin account!**
