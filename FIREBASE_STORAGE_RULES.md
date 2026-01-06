# Firebase Storage Rules - ڕێنماییەکانی Storage

## 🔐 مافەکانی ئێستا

### ✅ Ads Folder (`ads/`)
- **خوێندنەوە**: هەموو کەس (Public)
- **نووسین**: تەنها یوزەرە authenticated ەکان
- **سنوور**: 
  - قەبارە: کەمتر لە 5MB
  - جۆر: تەنها وێنە (image/*)

### ✅ Exercises Folder (`exercises/`)
- **خوێندنەوە**: هەموو کەس
- **نووسین**: تەنها یوزەرە authenticated ەکان
- **سنوور**: 
  - قەبارە: کەمتر لە 10MB
  - جۆر: تەنها وێنە

### ✅ Meals Folder (`meals/`)
- **خوێندنەوە**: هەموو کەس
- **نووسین**: تەنها یوزەرە authenticated ەکان
- **سنوور**: 
  - قەبارە: کەمتر لە 10MB
  - جۆر: تەنها وێنە

### ✅ Users Folder (`users/{userId}/`)
- **خوێندنەوە**: هەموو کەس
- **نووسین**: تەنها خاوەنی فۆڵدەرەکە
- یوزەر تەنها دەتوانێت لە فۆڵدەری خۆی ئەپلۆد بکات

### ✅ Profile Images (`profile-images/`)
- **خوێندنەوە**: هەموو کەس
- **نووسین**: تەنها یوزەرە authenticated ەکان
- **سنوور**: 
  - قەبارە: کەمتر لە 5MB
  - جۆر: تەنها وێنە

---

## 🚀 چۆن دیپلۆی بکەیت

### دیپلۆیکردنی تەنها Storage Rules:
```bash
firebase deploy --only storage
```

### دیپلۆیکردنی هەردووکیان (Firestore + Storage):
```bash
firebase deploy --only firestore,storage
```

### دیپلۆیکردنی هەموو شتێک:
```bash
firebase deploy
```

---

## 📝 گۆڕینی Rules

کاتێک دەتەوێت rules بگۆڕیت:

1. فایلەکە بکەرەوە: `storage.rules`
2. گۆڕانکارییەکان بکە
3. دیپلۆی بکە:
```bash
firebase deploy --only storage
```

---

## 🔍 پشکنینی Rules

لە Firebase Console:
1. بڕۆ بۆ: https://console.firebase.google.com
2. پرۆژەکەت هەڵبژێرە: **final-database-51935**
3. Storage → Rules
4. Rules ەکان دەبینیت

---

## ⚠️ گرنگ!

- تاکو یوزەر **authenticated** نەبێت، ناتوانێت ئەپلۆد بکات
- تەنها فایلە وێنەییەکان (JPG, PNG, GIF, etc.) ڕێگەپێدراون
- قەبارەی وێنە سنوورداره
- خوێندنەوە بۆ هەموو کەس کراوەیە (public read)

---

## 🛠️ چارەسەری کێشە

ئەگەر هەڵەی "unauthorized" دەردەکەوێت:

1. دڵنیابەرەوە یوزەر logged in بێت
2. دڵنیابەرەوە قەبارەی وێنە لە سنوورەکان کەمتر بێت
3. دڵنیابەرەوە فایلەکە وێنە بێت، نەک PDF یان شتی تر
4. دیپلۆی کردنی rules:
   ```bash
   firebase deploy --only storage
   ```

---

## 📅 دواهەمین نوێکردنەوە

تۆمارکراو لە: 2026-01-06
وەشانی Rules: 2

