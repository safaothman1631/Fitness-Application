# Auto-Update membershipDate for Pro Users

## چی کرا؟

سیستەم چاک کرایەوە بۆ ئەوەی **هەر کاتێک یوزەرێک دەبێت بە Pro یان subscription-ەکەی renew دەکات، بەرواری ئەو رۆژە بە ئۆتۆماتیک دابنرێت**.

## گۆڕانکاریەکان:

### 1. **API: Users Route** (`app/api/users/route.ts`)

#### ✅ کاتی دروستکردنی یوزەری نوێ (POST)
```typescript
membershipDate: membership === "Pro" ? new Date() : null
```
- ئەگەر یوزەر بە Pro دروست بکرێت، بەرواری ئێستا دادەنرێت
- ئەگەر Free بێت، `null` دەبێت

#### ✅ کاتی Renew کردنی Subscription (PUT - extendSubscription)
```typescript
membershipDate: new Date()
```
- هەر جار subscription renew دەکرێت، `membershipDate` نوێ دەکرێتەوە بە بەرواری ئێستا

#### ✅ کاتی گۆڕینی Membership لە Regular Update (PUT)
```typescript
// Check if changing to Pro (wasn't Pro before)
if (updateData.membership === 'Pro' && currentData?.membership !== 'Pro') {
  updateData.membershipDate = new Date()
}
```
- یەکەم جار کە دەبێت بە Pro، بەرواری ئێستا دادەنرێت
- ئەگەر پێشتر Pro بوو، بەرواری کۆن دەمێنێتەوە (تەنها لە renew-دا نوێ دەکرێتەوە)

---

### 2. **API: Pro Requests** (`app/api/pro-requests/[id]/route.ts`)

#### ✅ کاتی پەسەندکردنی داواکاری Pro (PUT - approved)
```typescript
membershipDate: new Date()
```
- کاتێک admin/superadmin داواکاریەک پەسەند دەکات
- یوزەر دەبێت بە Pro و بەرواری ئێستا دادەنرێت

---

### 3. **Superadmin Users Page** (`app/superadmin/users/page.tsx`)

#### ✅ کاتی دەستکاری کردنی یوزەر (Edit Dialog)
```typescript
// Add membershipDate if becoming Pro
if (newMembership === 'Pro') {
  updatePayload.membershipDate = new Date()
}
```
- کاتێک superadmin یوزەرێک دەکات بە Pro
- کاتێک role دەگۆڕێت بۆ trainer/superadmin (ئۆتۆماتیک Pro دەبن)

---

## مۆدێلی داتا:

```typescript
interface User {
  id: string
  name: string
  email: string
  membership: "Free" | "Pro"
  membershipDate?: Date | Timestamp | null  // ⭐ زیادکراو!
  subscriptionStatus?: string
  subscriptionEnd?: string
  // ... other fields
}
```

---

## سیناریۆکان:

### ✅ سیناریۆ ١: دروستکردنی یوزەری Pro
```
POST /api/users
{
  "email": "user@example.com",
  "membership": "Pro"
}
→ membershipDate: 2025-12-14T10:30:00Z ✅
```

### ✅ سیناریۆ ٢: پەسەندکردنی داواکاری Pro
```
PUT /api/pro-requests/[id]
{
  "status": "approved",
  "userId": "abc123"
}
→ User upgraded to Pro
→ membershipDate: 2025-12-14T10:35:00Z ✅
```

### ✅ سیناریۆ ٣: Renew کردنی Subscription
```
PUT /api/users?id=abc123
{
  "extendSubscription": true,
  "additionalDays": 30
}
→ membershipDate: 2025-12-14T10:40:00Z ✅ (نوێکراوە!)
```

### ✅ سیناریۆ ٤: گۆڕینی Free بۆ Pro لە Superadmin Panel
```
Superadmin → Edit User → Change membership to "Pro" → Save
→ membershipDate: 2025-12-14T10:45:00Z ✅
```

### ✅ سیناریۆ ٥: دروستکردنی Trainer/Superadmin
```
POST /api/users
{
  "email": "trainer@example.com",
  "role": "trainer"
}
→ Auto-set membership: "Pro"
→ membershipDate: 2025-12-14T10:50:00Z ✅
```

---

## سوودەکان:

1. **فلتەری بەروار کار دەکات** - ئێستا دەتوانیت بە بەرواری Pro upgrade فلتەر بکەیت
2. **راپۆرتی ورد** - دەزانیت کەی یوزەرێک بووە بە Pro
3. **Renewal Tracking** - هەر جار renew دەکرێت، بەرواری نوێ دادەنرێت
4. **ئۆتۆماتیکە** - بەبێ دەستکاری manual، هەموو شتێک ئۆتۆماتیکە

---

## چۆن تێست بکەیت:

1. **تێستی دروستکردن:**
   ```
   Create new user with Pro membership
   → Check Firestore: membershipDate should exist
   ```

2. **تێستی پەسەندکردن:**
   ```
   Submit Pro request → Admin approves it
   → Check user: membershipDate should be set
   ```

3. **تێستی Renewal:**
   ```
   Renew subscription via owner/admin panel
   → Check user: membershipDate should be updated to today
   ```

4. **تێستی فلتەر:**
   ```
   Owner Dashboard → Patients → Pro Date Filter
   → Select date range → Should show users who upgraded in that period
   ```

---

## کۆدی Legacy:

ئەگەر یوزەرە پێشووەکانت `membershipDate`یان نەبێت، دەتوانیت لە Owner Dashboard:

1. فلتەری بەروار بکەرەوە
2. Debug card-ەکە پیشان دەدات چەند یوزەر `No Date` هەیە
3. کلیک لە **"Set Current Date for All"** بکە
4. هەموو Pro یوزەرەکان بەرواری ئێستایان پێ دەدرێت

---

## پاشەکەوتکردن:

✅ `app/api/users/route.ts` - POST & PUT handlers
✅ `app/api/pro-requests/[id]/route.ts` - Approval handler
✅ `app/superadmin/users/page.tsx` - Edit user handler
✅ `app/owner/page.tsx` - Debug section بۆ چاککردنەوەی یوزەرە legacy

---

**بەروار:** 14 دسامبر 2025
**وەشان:** 1.0
**Status:** ✅ تەواو و تێست کراوە
