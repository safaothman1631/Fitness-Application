# 🔐 زانیاری چوونەژوورەوە - Login Credentials

## 📋 هەموو رۆڵەکان / All Roles

### 👑 Owner (خاوەنی سیستەم)
```
Email:    owner@darinfitness.com
Password: 123456
Role:     owner
```

### ⚡ Super Admin (بەڕێوەبەری گشتی)
```
Email:    superadmin@darinfitness.com
Password: 123456
Role:     superadmin
```

### 👨‍⚕️ Admin Doctor (پزیشک - بەڕێوەبەر)
```
Email:    doctor@darinfitness.com
Password: 123456
Role:     admin-physiotherapist
```

### 💪 Physiotherapist (فیزیۆتەرابیست)
```
Email:    physio@darinfitness.com
Password: 123456
Role:     physiotherapist
```

### 🏋️ Trainer (ڕاهێنەر)
```
Email:    trainer@darinfitness.com
Password: 123456
Role:     trainer
```

### 👤 User (بەکارهێنەر)
```
Email:    user@darinfitness.com
Password: 123456
Role:     user
```

---

## 🌐 Production URL
**Live Site:** https://fitness-n6s7w75k7-safaothman1631s-projects.vercel.app

---

## 📝 تێبینیەکان / Notes

1. **هەموو پاسوۆردەکان یەکسانن:** `123456`
2. **دووبارە لێپرسینەوە:** پاسوۆردەکە بە نهێنی بپارێزە
3. **رۆڵی جیاواز:** هەر رۆڵێک دەسەڵاتی تایبەتی خۆی هەیە
4. **چوونەژوورەوە:** لە لاپەڕەی `/login` وەرگرە

---

## 🔄 گۆڕینی پاسوۆرد / Change Password

ئەگەر دەتەوێ پاسوۆردێک بگۆڕیت، بەکارهێنانی سکریپتی:
```bash
node scripts/reset-all-passwords.js
```

یان بۆ تاکە بەکارهێنەرێک:
```bash
node scripts/reset-password.js [email]
```

---

## ⚠️ ئاگاداری

**تێبینی گرنگ:** ئەم زانیاریانە تەنها بۆ گەشەپێدان و تاقیکردنەوەن. 
لە پرۆداکشن دا **دڵنیابە** پاسوۆردی بەهێز بەکاربهێنیت!

**Security Note:** These credentials are for development and testing only.
In production, **ALWAYS** use strong, unique passwords!

---

*Created: December 19, 2025*
*Last Updated: After successful Vercel deployment*
