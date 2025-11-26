# Deploy to Vercel - Quick Start Guide

## Why Vercel?

- ✅ **Made by Next.js creators** - perfect compatibility
- ✅ **Free for personal projects**
- ✅ **All Next.js features work** - API routes, SSR, ISR
- ✅ **Zero configuration** - just connect and deploy
- ✅ **Automatic deployments** - push to git = auto deploy
- ✅ **Fast global CDN**
- ✅ **Built-in analytics**

## Method 1: Using Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

If your code isn't on GitHub yet:

```powershell
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repository at github.com/new

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com/signup)
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Select your repository
5. Vercel will auto-detect Next.js ✅

### Step 3: Configure Environment Variables

Click **"Environment Variables"** and add:

#### Public Variables (Client-side):
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=final-database-51935.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=final-database-51935
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=final-database-51935.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### Private Variables (Server-side):
```
FIREBASE_PROJECT_ID=final-database-51935
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key_with_newlines
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CERT_URL=your_cert_url
```

**Note:** For `FIREBASE_PRIVATE_KEY`, paste the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` with actual newlines.

### Step 4: Deploy

Click **"Deploy"**

Your app will be live at: `https://your-project.vercel.app`

## Method 2: Using Vercel CLI

### Install Vercel CLI

```powershell
npm i -g vercel
```

### Login

```powershell
vercel login
```

### Deploy

```powershell
# First deployment (interactive setup)
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [your account]
# - Link to existing project? N
# - Project name? [enter name]
# - Directory? ./
# - Override settings? N
```

### Set Environment Variables

```powershell
# Add each variable
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Paste value when prompted

# Or use .env file
vercel env pull .env.local
```

### Subsequent Deployments

```powershell
# Deploy to production
vercel --prod

# Or just push to git (if connected to GitHub)
git push
```

## Method 3: Git Push Auto-Deploy (Recommended)

Once connected to Vercel Dashboard:

1. Make changes to your code
2. Commit and push to GitHub:
   ```powershell
   git add .
   git commit -m "Update feature"
   git push
   ```
3. Vercel automatically deploys! ✨

### Preview Deployments

- Push to any branch = preview deployment
- Push to `main` = production deployment
- Each PR gets its own preview URL

## Configuration

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `fitpro.app`)
3. Update DNS records as instructed
4. Automatic SSL certificate

### Build Settings

Vercel auto-detects from `package.json`:
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅
- Install Command: `npm install` ✅

No changes needed!

## Monitoring & Analytics

### View Deployments

```powershell
vercel ls
```

### View Logs

```powershell
vercel logs
```

### Built-in Analytics

- Go to Project → Analytics
- See page views, performance, and more

## Troubleshooting

### Build Fails

Check the build logs in Vercel Dashboard:
- Usually missing environment variables
- Or package installation issues

### API Routes Not Working

Make sure environment variables are set for both:
- Development: `.env.local`
- Production: Vercel Dashboard → Settings → Environment Variables

### Environment Variables Not Loading

- Variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Server-only variables (like Firebase Admin keys) should NOT have `NEXT_PUBLIC_`
- Redeploy after adding variables

## Cost

### Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Built-in CI/CD

### Perfect for:
- Personal projects ✅
- Side projects ✅
- MVPs and prototypes ✅
- Small production apps ✅

### Upgrade needed for:
- Enterprise features
- Team collaboration
- Higher bandwidth (100GB+/month)
- Custom support

## Your Application

After deployment, your app will be available at:
```
https://darinfitpro.vercel.app
```

Or your custom domain!

## Next Steps

1. **Deploy to Vercel** (5 minutes)
2. **Add environment variables** (5 minutes)
3. **Test your app** (verify Firebase connection works)
4. **Add custom domain** (optional)
5. **Set up git auto-deploy** (done automatically)

## Commands Summary

```powershell
# Install CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Environment variables
vercel env add VARIABLE_NAME
vercel env pull .env.local
```

## Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Comparison: Vercel vs Firebase Hosting

| Feature | Vercel | Firebase Hosting |
|---------|--------|------------------|
| API Routes | ✅ Native | ⚠️ Needs Cloud Functions |
| Setup Time | 5 minutes | 30+ minutes |
| Cost | Free tier | Blaze plan required |
| Performance | Excellent | Good |
| Next.js Support | Perfect | Manual setup |
| Recommendation | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

**Bottom line:** Use Vercel for Next.js deployment. Keep Firebase for Firestore, Auth, and Storage.
