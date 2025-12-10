# ⚡ Quick Domain Setup - Reference Card

## 🚀 FASTEST METHOD: Vercel

### 1. Install & Deploy (2 minutes)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 2. Add Domain (1 minute)
- Go to https://vercel.com/dashboard
- Select your project
- Settings → Domains → Add Domain
- Enter: `yourdomain.com`

### 3. Configure DNS (2 minutes)
Add to your domain registrar:

```
A Record:
Name: @
Value: 76.76.21.21

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

### 4. Wait (5-30 minutes)
- DNS propagation
- SSL auto-provisioning
- Done! ✅

---

## 🔥 Alternative: Firebase Hosting

### 1. Build & Deploy (3 minutes)
```bash
npm run build
firebase deploy --only hosting
```

### 2. Add Domain (2 minutes)
- Firebase Console → Hosting → Add custom domain
- Enter your domain
- Follow verification steps

### 3. Configure DNS
```
A Records (Firebase provides IPs):
Name: @
Value: [Firebase IP 1]

Name: @
Value: [Firebase IP 2]
```

---

## 📋 DNS Configuration Comparison

| Platform | A Record | CNAME Record | SSL | Time |
|----------|----------|--------------|-----|------|
| Vercel | 76.76.21.21 | cname.vercel-dns.com | Auto | 5-30 min |
| Firebase | Provided by Firebase | yourdomain.com | Auto | 24-48 hrs |
| Custom VPS | Your VPS IP | Your VPS IP | Manual | 1-2 hrs |

---

## 🔐 Environment Variables Checklist

Set these in your hosting platform:

```env
✅ NEXT_PUBLIC_FIREBASE_API_KEY
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
✅ NEXT_PUBLIC_FIREBASE_APP_ID
✅ FIREBASE_PROJECT_ID
✅ FIREBASE_PRIVATE_KEY
✅ FIREBASE_CLIENT_EMAIL
✅ NEXT_PUBLIC_APP_URL
```

---

## ✅ 5-Minute Verification

After setup, check:

1. **Domain resolves**: https://www.whatsmydns.net/
2. **HTTPS works**: Green padlock in browser
3. **App loads**: Visit your domain
4. **Login works**: Test authentication
5. **Database connects**: Check if data loads

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Domain not working | Wait 24-48 hours for DNS |
| SSL not working | Wait for auto-provisioning |
| 404 errors | Check rewrites in config |
| API errors | Verify environment variables |
| Images not loading | Check storage bucket URL |

---

## 💡 Pro Tips

1. **Start with Vercel** - Easiest and fastest
2. **Use www redirect** - Better for SEO
3. **Enable HTTPS** - Always use secure connection
4. **Test mobile** - Check responsive design
5. **Clear cache** - After each update

---

## 📱 Mobile App Domain Setup

If you plan to release mobile apps later:

- Use same domain for API
- Add deep linking support
- Configure CORS properly
- Set up universal links (iOS)
- Configure App Links (Android)

---

## 🎯 Your Next Commands

**For Vercel:**
```bash
vercel --prod
vercel domains add yourdomain.com
```

**For Firebase:**
```bash
firebase deploy --only hosting
```

**Check DNS:**
```bash
nslookup yourdomain.com
```

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs/custom-domains
- Firebase Docs: https://firebase.google.com/docs/hosting/custom-domain
- DNS Checker: https://www.whatsmydns.net/

---

**Estimated Total Time: 10-15 minutes** ⏱️
