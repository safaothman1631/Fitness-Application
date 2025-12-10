# 🎯 Domain Setup - Command Reference (Kurdish)

## ⚡ زووترین ڕێگا - Vercel

### 1. دامەزراندنی Vercel CLI
```bash
npm install -g vercel
```

### 2. چوونەژوورەوە
```bash
vercel login
```
دوگمەی Enter داگرە و لە browser چوونەژوورەوە تەواو بکە

### 3. دیپلۆیکردن
```bash
vercel --prod
```
ئەم فەرمانە پرۆژەکەت دەنێرێتە production

### 4. زیادکردنی Domain
```bash
vercel domains add yourdomain.com
```
یان لە Vercel Dashboard:
- بڕۆ بۆ: https://vercel.com/dashboard
- پرۆژەکەت هەڵبژێرە
- Settings → Domains → Add Domain

---

## 📋 DNS Configuration

لە domain provider ەکەت (Namecheap, GoDaddy, etc.):

### Record 1: A Record
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

### Record 2: CNAME Record
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 🔄 Alternative: Firebase Hosting

### 1. Build کردنی پرۆژە
```bash
npm run build
```

### 2. دیپلۆیکردن
```bash
firebase deploy --only hosting
```

### 3. زیادکردنی Domain
1. بڕۆ بۆ: https://console.firebase.google.com
2. پرۆژەکەت هەڵبژێرە: final-database-51935
3. Hosting → Add custom domain
4. DNS records ەکان کۆپی بکە

---

## ✅ پشکنینی DNS

### کاتێک DNS setup کرد، بیپشکنە:
```bash
nslookup yourdomain.com
```

یان لە ماڵپەڕی ئۆنڵاین:
- https://www.whatsmydns.net/
- https://dnschecker.org/

---

## 🔐 Environment Variables

لە Vercel Dashboard:
1. Settings → Environment Variables
2. ئەم variables ە زیاد بکە لە `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=final-database-51935
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=final-database-51935.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY_ID=...
FIREBASE_PRIVATE_KEY="..."
FIREBASE_CLIENT_EMAIL=...
FIREBASE_CLIENT_ID=...
FIREBASE_CERT_URL=...
```

---

## 📊 پشکنینی دوای دیپلۆیمەنت

### 1. پشکنینی Domain
```bash
# Windows
nslookup yourdomain.com

# یان لە browser
https://yourdomain.com
```

### 2. پشکنینی HTTPS
- دەبێت قفڵێکی سەوز لە browser هەبێت
- URL دەبێت بە `https://` دەست پێبکات

### 3. پشکنینی Features
- [ ] Login کار دەکات
- [ ] Dashboard load دەبێت
- [ ] Database connection کار دەکات
- [ ] هەموو 4 زمانەکان کار دەکەن
- [ ] API routes وەڵام دەدەنەوە

---

## ⏱️ کاتی چاوەڕوان بوون

| مەرحەلە | کات |
|---------|-----|
| Vercel Deploy | 2-3 خولەک |
| DNS Propagation | 5-30 خولەک |
| SSL Certificate | Automatic |
| کۆی گشتی | 10-35 خولەک |

---

## 🆘 چارەسەری کێشەکان

### کێشە: Domain کار ناکات
**چارەسەر:**
```bash
# پاککردنەوەی Cache
# لە browser: Ctrl+Shift+Delete
# یان بە incognito mode هەوڵبدە
```

### کێشە: HTTPS کار ناکات
**چارەسەر:**
- چاوەڕێ بکە 24-48 کاتژمێر
- Vercel automatic SSL دروست دەکات
- ئەگەر کارت نەکرد، لە Vercel Support پرسیار بکە

### کێشە: Environment Variables کار ناکەن
**چارەسەر:**
```bash
# پشکنین بکە لە Vercel Dashboard
# Settings → Environment Variables
# دڵنیابە هەموو variables ەکان دانراون
# Production environment هەڵبژێردراوە
```

---

## 📱 تێست کردنی Mobile

دوای دیپلۆیمەنت، لەسەر mobile تاقیبکەوە:
- Chrome لەسەر Android
- Safari لەسەر iPhone
- پشکنینی RTL بۆ عەرەبی و کوردی

---

## 🎉 تەواوبوون!

کاتێک هەموو شتێک کار دەکات:
1. ✅ Domain کار دەکات
2. ✅ HTTPS چالاکە
3. ✅ هەموو pages load دەبن
4. ✅ Database connection کار دەکات
5. ✅ Login/Register کار دەکەن

**پیرۆزە! ماڵپەڕەکەت ئێستا لە ئینتەرنێت live یە!** 🚀

---

## 📞 پشتیوانی

ئەگەر کێشەت هەبوو:
1. سەیری فایلی `DOMAIN_SETUP_GUIDE.md` بکە
2. لە Vercel docs بخوێنەوە: https://vercel.com/docs
3. لە Firebase docs بخوێنەوە: https://firebase.google.com/docs

---

## 🔄 گۆڕانکاری کردنی داهاتوو

کاتێک کۆدت گۆڕی:
```bash
# Commit بکە
git add .
git commit -m "your changes"
git push origin master

# Vercel automatic deploy دەکات
# یان deploy بکە بە دەستی:
vercel --prod
```

---

**کاتی تەواوکردن: 10-15 خولەک** ⏱️
**تێچوو: بێ پارە (Free tier)** 💰
