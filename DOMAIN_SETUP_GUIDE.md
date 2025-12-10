# 🌐 Domain Setup Guide for Fitness Application

## Quick Start

Your application is production-ready and can be deployed with a custom domain. Choose your preferred platform below.

---

## 🚀 Option 1: Vercel (RECOMMENDED)

### Why Vercel?
- ✅ Easiest setup (5 minutes)
- ✅ Free SSL certificate (automatic HTTPS)
- ✅ Global CDN for fast loading
- ✅ Automatic deployments from GitHub
- ✅ Zero configuration needed

### Step-by-Step Setup:

#### 1. Install Vercel CLI
```bash
npm i -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy Your App
```bash
vercel --prod
```

#### 4. Add Custom Domain

**Option A: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Click "Add Domain"
5. Enter your domain (e.g., `fitnessapp.com`)
6. Follow the DNS configuration instructions

**Option B: Using CLI**
```bash
vercel domains add fitnessapp.com
```

#### 5. Configure DNS Records

Add these records to your domain provider (e.g., Namecheap, GoDaddy, Cloudflare):

**For Root Domain (fitnessapp.com):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For WWW Subdomain (www.fitnessapp.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### 6. Wait for DNS Propagation
- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status: https://www.whatsmydns.net/

#### 7. SSL Certificate
- Vercel automatically provisions SSL certificate
- HTTPS will be enabled automatically
- No manual configuration needed

---

## 🔥 Option 2: Firebase Hosting

### Prerequisites
```bash
npm install -g firebase-tools
firebase login
```

### Step-by-Step Setup:

#### 1. Build Your App
```bash
npm run build
```

#### 2. Initialize Firebase Hosting (if not done)
```bash
firebase init hosting
```

Select these options:
- **Public directory**: `out` (for Next.js export) or `.next` (for SSR)
- **Configure as SPA**: Yes
- **Set up automatic builds**: No (we'll do manual)
- **Overwrite index.html**: No

#### 3. Update firebase.json
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

#### 4. Deploy to Firebase
```bash
firebase deploy --only hosting
```

#### 5. Add Custom Domain

**In Firebase Console:**
1. Go to https://console.firebase.google.com
2. Select your project: `final-database-51935`
3. Go to "Hosting" → "Add custom domain"
4. Enter your domain: `fitnessapp.com`
5. Follow the verification steps

**DNS Configuration:**
```
Type: A
Name: @
Value: (Firebase will provide IP addresses)

Type: A
Name: @
Value: (Firebase will provide IP addresses)
```

**For WWW:**
```
Type: CNAME
Name: www
Value: fitnessapp.com
```

#### 6. SSL Certificate
- Firebase automatically provisions SSL
- Takes 24-48 hours to activate
- Free and auto-renewing

---

## 🔧 Option 3: Custom VPS/Cloud Server

### Prerequisites
- VPS with Node.js installed (DigitalOcean, AWS, etc.)
- Domain purchased from any registrar

### Step-by-Step Setup:

#### 1. Build Production Bundle
```bash
npm run build
```

#### 2. Install PM2 (Process Manager)
```bash
npm install -g pm2
```

#### 3. Start Application
```bash
pm2 start npm --name "fitness-app" -- start
pm2 save
pm2 startup
```

#### 4. Install Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 5. Configure Nginx
Create file: `/etc/nginx/sites-available/fitnessapp.com`

```nginx
server {
    listen 80;
    server_name fitnessapp.com www.fitnessapp.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/fitnessapp.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 6. Configure DNS
Point your domain to your VPS IP:

```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 3600

Type: A
Name: www
Value: YOUR_VPS_IP
TTL: 3600
```

#### 7. Install SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d fitnessapp.com -d www.fitnessapp.com
```

Follow prompts and choose:
- Email for urgent renewal notices
- Agree to terms
- Redirect HTTP to HTTPS: Yes

#### 8. Auto-renewal
Certbot automatically sets up auto-renewal. Test it:
```bash
sudo certbot renew --dry-run
```

---

## 📝 Environment Variables for Production

Create a `.env.production` file or set these in your hosting platform:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=final-database-51935
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=final-database-51935.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=final-database-51935
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CERT_URL=your_cert_url

# Production Domain
NEXT_PUBLIC_APP_URL=https://fitnessapp.com
NODE_ENV=production
```

### Setting Environment Variables:

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Or use Vercel Dashboard → Settings → Environment Variables
```

**Firebase:**
```bash
firebase functions:config:set app.url="https://fitnessapp.com"
```

**VPS:**
Add to `.env.production` file in your app directory

---

## 🔍 DNS Propagation Check

After configuring DNS, check propagation status:

**Online Tools:**
- https://www.whatsmydns.net/
- https://dnschecker.org/

**Command Line:**
```bash
# Windows
nslookup fitnessapp.com

# Linux/Mac
dig fitnessapp.com
```

---

## ✅ Post-Deployment Checklist

After domain is live, verify:

- [ ] Domain resolves to your application
- [ ] HTTPS is working (green padlock)
- [ ] All pages load correctly
- [ ] API endpoints are accessible
- [ ] Firebase connection works
- [ ] Authentication functions properly
- [ ] Images and assets load
- [ ] All 4 languages work (EN, AR, KU, TR)
- [ ] Mobile responsiveness
- [ ] RTL layout for Arabic

---

## 🐛 Troubleshooting

### Domain not resolving
- Wait 24-48 hours for full DNS propagation
- Clear browser cache
- Try incognito/private mode
- Check DNS configuration at domain registrar

### SSL Certificate Issues
- Wait for automatic provisioning (can take 24-48 hours)
- Verify domain ownership
- Check if DNS records are correct
- Try forcing SSL renewal

### Application not loading
- Check environment variables are set correctly
- Verify Firebase credentials
- Check server logs
- Ensure port 3000 is accessible (if VPS)

### API Errors
- Verify Firebase Admin SDK credentials
- Check CORS settings
- Ensure API routes are deployed
- Verify database rules

---

## 📞 Support Resources

**Vercel:**
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

**Firebase:**
- Documentation: https://firebase.google.com/docs/hosting
- Support: https://firebase.google.com/support

**Community:**
- Stack Overflow: Tag with `next.js`, `firebase`, `vercel`
- GitHub Issues: Your repository

---

## 🎯 Recommended Setup for Your App

Based on your project requirements:

1. **Start with Vercel** (fastest and easiest)
2. Connect GitHub repository for auto-deployments
3. Add your custom domain
4. Set environment variables in Vercel dashboard
5. Deploy and test

**Estimated Time:** 15-30 minutes for complete setup

**Cost:** Free tier is sufficient for your application

---

## 🚀 Next Steps After Domain Setup

1. Set up monitoring (Vercel Analytics or Google Analytics)
2. Configure email service (for notifications)
3. Set up backup strategy
4. Implement error tracking (Sentry)
5. Add performance monitoring
6. Set up CI/CD pipeline
7. Configure staging environment

---

## 📊 Current Project Status

- ✅ Production build: Working
- ✅ Database: Connected (Firebase)
- ✅ API endpoints: 52 operational
- ✅ Pages: 102 generated
- ✅ Authentication: Complete
- ✅ Multi-language: Active (4 languages)
- ✅ Code: Committed to GitHub
- 🎯 Ready for domain setup and deployment!

---

**Need help? Contact your development team or refer to platform-specific documentation.**
