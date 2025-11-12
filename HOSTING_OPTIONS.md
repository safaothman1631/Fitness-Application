# Hosting Your Next.js Firebase Application

## ⚠️ Important Discovery

Your application **cannot use Firebase Hosting with static export** because it has:
- API routes in `app/api/**` (access-keys, notifications, physiotherapist, settings, etc.)
- Server-side functionality that requires a Node.js runtime

## ✅ Recommended Hosting Solutions

### Option 1: Vercel (Recommended - Easiest)

Vercel is made by the Next.js team and has native support for all Next.js features including API routes.

**Setup:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" and select your repository
4. Add your environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_CLIENT_ID`
   - `FIREBASE_CERT_URL`
5. Click "Deploy"

**Pros:**
- ✅ Free tier available
- ✅ Zero configuration needed
- ✅ All Next.js features work (API routes, SSR, ISR)
- ✅ Automatic deployments on git push
- ✅ Built-in analytics and monitoring

**Cons:**
- ❌ Requires separate platform (not pure Firebase)

---

### Option 2: Firebase Hosting + Cloud Functions (Advanced)

Use Firebase Hosting for static assets + Cloud Functions for the Next.js server.

**Requirements:**
- Firebase Blaze Plan (pay-as-you-go)
- More complex setup

**Setup Script Added:**
```powershell
npm run deploy:firebase-functions
```

See `FIREBASE_FUNCTIONS_SETUP.md` for detailed instructions.

**Pros:**
- ✅ Everything on Firebase
- ✅ All Next.js features work
- ✅ Good integration with Firestore/Auth

**Cons:**
- ❌ Requires Blaze plan (paid)
- ❌ More complex setup
- ❌ Can be slower than Vercel

---

### Option 3: Railway / Render / Fly.io (Docker-based)

Deploy as a containerized Node.js application.

**Basic Setup:**
1. Create account on Railway/Render/Fly.io
2. Connect your repository
3. Set environment variables
4. Deploy

**Pros:**
- ✅ Full control
- ✅ All Next.js features
- ✅ Can run other services alongside

**Cons:**
- ❌ May require Docker knowledge
- ❌ Paid plans for production usage

---

## Current Configuration Status

✅ Firebase Firestore configured and working
✅ Firebase Admin SDK configured
✅ Environment variables set up
❌ Static export disabled (breaks API routes)
⚠️ Need runtime server for API routes

## Next Steps

### For Vercel Deployment (Quickest):

1. **Create Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI** (optional):
   ```powershell
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Or use Vercel Dashboard:**
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Add environment variables
   - Deploy

### For Firebase Functions Setup:

See the `FIREBASE_FUNCTIONS_SETUP.md` guide (requires Blaze plan).

---

## Firebase Hosting Still Configured For:

- Firestore database ✅
- Authentication (if you add it) ✅
- Storage (if you use it) ✅

Only the **hosting** part needs an alternative solution due to API routes.

## Questions?

- For Firebase-only hosting, you'd need to refactor API routes to Cloud Functions
- For easiest deployment, use Vercel (free tier available)
- For production with high traffic, consider Vercel Pro or Firebase Blaze

## Scripts Available

```powershell
npm run dev              # Development server
npm run build            # Build for production
npm run start            # Start production server locally
npm run deploy           # Would deploy static site (currently disabled)
```
