# Firebase Hosting with Cloud Functions - Setup Guide

## Prerequisites

- Firebase Blaze Plan (pay-as-you-go)
- Firebase CLI installed: `npm install -g firebase-tools`
- Node.js 18 or higher

## Why Cloud Functions?

Your Next.js app has API routes that need a server runtime. Firebase Cloud Functions provides that runtime while keeping everything on Firebase.

## Setup Steps

### 1. Upgrade to Blaze Plan

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `final-database-51935`
3. Click on "Upgrade" in the left sidebar
4. Select "Blaze Plan"
5. Add payment method

**Note:** You only pay for what you use. Free tier allowances still apply.

### 2. Initialize Firebase Functions

```powershell
# Make sure you're in the project directory
cd 'c:\Users\SAFA\OneDrive\Desktop\code`[2`]'

# Login to Firebase (if not already)
npx firebase login

# Initialize Functions
npx firebase init functions
```

When prompted:
- Language: **TypeScript** (recommended) or JavaScript
- ESLint: **Yes** (recommended)
- Install dependencies: **Yes**

### 3. Install Required Dependencies

```powershell
cd functions
npm install firebase-functions@latest firebase-admin@latest
npm install --save-dev firebase-functions-test
cd ..
```

### 4. Configure Next.js for Cloud Functions

Create `functions/src/index.ts`:

```typescript
import * as functions from 'firebase-functions';
import next from 'next';

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: '.next',
  },
});

const nextjsHandle = nextjsServer.getRequestHandler();

export const nextjsFunc = functions.https.onRequest(async (req, res) => {
  await nextjsServer.prepare();
  return nextjsHandle(req, res);
});
```

### 5. Update firebase.json

Replace your `firebase.json` with:

```json
{
  "firestore": {
    "rules": "firestore.rules"
  },
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "function": "nextjsFunc"
      }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs18",
    "predeploy": [
      "npm --prefix functions run build"
    ]
  }
}
```

### 6. Update package.json Scripts

Add these scripts:

```json
"scripts": {
  "build": "next build",
  "build:functions": "npm run build && cp -r .next functions/ && cp -r public functions/ && cp package.json functions/",
  "deploy:all": "npm run build:functions && firebase deploy",
  "deploy:hosting": "firebase deploy --only hosting",
  "deploy:functions": "firebase deploy --only functions"
}
```

For Windows PowerShell, use:

```json
"scripts": {
  "build": "next build",
  "build:functions": "npm run build && xcopy /E /I /Y .next functions\\.next && xcopy /E /I /Y public functions\\public && copy package.json functions\\",
  "deploy:all": "npm run build:functions && firebase deploy",
  "deploy:hosting": "firebase deploy --only hosting",
  "deploy:functions": "firebase deploy --only functions"
}
```

### 7. Deploy

```powershell
npm run deploy:all
```

## Alternative: Simpler Approach with next-firebase-hosting

Use the community package that automates this:

```powershell
npm install --save-dev next-firebase-hosting
```

Then run:

```powershell
npx next-firebase-hosting
```

This will automatically configure everything for you.

## Costs Estimate (Blaze Plan)

For a typical small-to-medium app:

- **Cloud Functions:**
  - First 2 million invocations/month: FREE
  - 400,000 GB-seconds compute/month: FREE
  - Additional: ~$0.40 per million invocations

- **Hosting:**
  - First 10 GB storage: FREE
  - First 360 MB/day transfer: FREE
  - Additional: $0.026 per GB

**Example:** App with 10,000 page views/month ≈ **$0-5/month**

## Troubleshooting

### Build Errors

If you get errors about missing dependencies:
```powershell
cd functions
npm install
cd ..
```

### Function Timeout

If pages take too long to load, increase timeout in `firebase.json`:

```json
"functions": {
  "runtime": "nodejs18",
  "timeout": "60s"
}
```

### Cold Starts

Cloud Functions have cold starts (1-3 seconds). To minimize:
- Use Firebase Hosting cache
- Enable Cloud Run minimum instances (costs more)

## Recommended: Use Vercel Instead

Unless you specifically need everything on Firebase, **Vercel is much easier**:

- No Blaze plan needed
- Zero configuration
- Faster cold starts
- Free SSL
- Free for hobby projects

See `HOSTING_OPTIONS.md` for Vercel setup.

## Support

- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [Next.js on Firebase](https://github.com/firebase/firebase-tools/blob/master/docs/hosting/frameworks.md)
