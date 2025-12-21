# 🔧 چارەسەری کێشەکانی Browser

## 🚫 Firestore ERR_BLOCKED_BY_CLIENT

ئەگەر ئەم ئیرۆرە دەبینیت:
```
net::ERR_BLOCKED_BY_CLIENT
Failed to load resource: firestore.googleapis.com
```

### ✅ چارەسەر:

#### 1️⃣ Ad Blocker بکاتەوە (Disable)

**uBlock Origin:**
- کلیک لە icon ـی extension بکە
- کلیک لە دوگمەی گەورەی power بکە بۆ ئەم سایتە
- Refresh بکە

**Brave Browser:**
```
Settings → Shields → Shields for this site → Off
```

**Adblock Plus:**
- کلیک لە icon
- "Pause on this site" 
- Refresh

#### 2️⃣ Browser Extensions ـەکان بپشکنە

Extensions ـانەی کە Firestore بلۆک دەکەن:
- ❌ uBlock Origin
- ❌ Adblock Plus
- ❌ Privacy Badger
- ❌ Ghostery
- ❌ NoScript
- ❌ Brave Shields

**چارەسەر:**
1. سایتەکە زیاد بکە بۆ **whitelist**
2. یان extension ـەکە بکاتەوە بۆ ئەم سایتە

#### 3️⃣ تاقیکردنەوە لە Private/Incognito Mode

```
Chrome:     Ctrl + Shift + N
Firefox:    Ctrl + Shift + P
Edge:       Ctrl + Shift + N
Safari:     Cmd + Shift + N
```

ئەم mode ـە extensions ـەکان بە default ناچالاک دەکات.

#### 4️⃣ Browser ـێکی تر تاقی بکەرەوە

تاقیکردنەوە لە:
- Chrome (بەبێ extensions)
- Firefox
- Edge
- Safari

---

## 📝 favicon.ico 404

✅ **چارەسەر کرا!** favicon.ico زیاد کرا بۆ پرۆژە.

---

## 🔥 چارەسەری پێشکەوتوو - Network Level Blocking

### ⚠️ ئەگەر هەموو شتەکانی سەرەوە کردیت و هێشتا ERR_BLOCKED_BY_CLIENT هەیە:

#### 1️⃣ تاقیکردنەوەی پەیوەندی بە Firebase

لە Browser Console (F12) ئەم کۆدە بنووسە:

```javascript
fetch('https://firestore.googleapis.com/')
  .then(r => console.log('✅ Firestore accessible'))
  .catch(e => console.log('❌ Firestore blocked:', e))
```

ئەگەر "blocked" بینیت، ئەوا **Network blocking** ـە.

#### 2️⃣ DNS بگۆڕە

**Windows:**
```powershell
# Google DNS
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2

# یان Cloudflare DNS
netsh interface ip set dns "Wi-Fi" static 1.1.1.1
netsh interface ip add dns "Wi-Fi" 1.0.0.1 index=2
```

**یان لە Settings:**
```
Settings → Network → Change adapter options
→ Right-click Wi-Fi → Properties
→ IPv4 → Properties
→ Use the following DNS:
   Preferred:  8.8.8.8
   Alternate:  8.8.4.4
```

#### 3️⃣ VPN بەکاربهێنە

ئەگەر لە وڵاتێکی بلۆککەردا بیت:
- **Cloudflare WARP** (خۆڕایی)
- **Proton VPN** (خۆڕایی)
- **Windscribe** (خۆڕایی - 10GB)

#### 4️⃣ Mobile Data تاقی بکەرەوە

```
Phone → Settings → Hotspot
Computer → Connect to phone hotspot
```

ئەگەر لە mobile data کار بکات، ئەوا **ISP blocking** ـە.

#### 5️⃣ Antivirus/Firewall پشکنینی بکە

**Windows Defender:**
```
Settings → Privacy & Security
→ Windows Security → Firewall
→ Allow an app → Chrome/Firefox
```

**Third-party Antivirus:**
- Kaspersky, Avast, Norton, McAfee
- Temporarily disable
- یان whitelist: `firestore.googleapis.com`

#### 6️⃣ Network ـی تر تاقی بکەرەوە

- ☕ Café Wi-Fi
- 📱 Mobile data
- 🏠 ماڵەوەی برا/هاوڕێ

---

## 🎯 ئەگەر هێشتا کێشە هەیە

1. **Cache بسڕەوە:**
   ```
   Ctrl + Shift + Delete
   → Clear cache and cookies
   ```

2. **Hard Refresh:**
   ```
   Ctrl + Shift + R  (Windows/Linux)
   Cmd + Shift + R   (Mac)
   ```

3. **Developer Tools بکەرەوە:**
   ```
   F12 → Console
   ```
   هەر ئیرۆرێک کۆپی بکە و بنێرە.

4. **تاقیکردنەوەی تەواو:**
   ```javascript
   // لە Console (F12) بنووسە:
   console.log('Browser:', navigator.userAgent);
   console.log('Online:', navigator.onLine);
   fetch('https://firestore.googleapis.com/').then(r => console.log('Firestore:', r.status)).catch(e => console.log('Error:', e));
   ```

---

## ✅ پشکنینی سەرکەوتوو

ئەگەر هیچ ئیرۆرێکت نەبینی لە Console:
- ✅ Firestore پەیوەست بووە
- ✅ Firebase Auth کار دەکات
- ✅ Icons باشە
- ✅ هەموو شت ڕێکە!

---

## 🔗 لینکەکانی سودمەند

- [Firebase Console](https://console.firebase.google.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Browser Extensions Guide](https://support.google.com/chrome/answer/187443)

---

*Last Updated: December 19, 2025*
