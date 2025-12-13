# باشترین ڕێگە بۆ دروستکردنی ئەکاونتی فیزیۆتێراپیست

## ١. رێگای یەکەم: لە ڕێگەی Admin-Physiotherapist Panel

### خێراترین و باشترین رێگە ✅

#### هەنگاوەکان:

**١. دروستکردنی ئەکاونتی ئاسایی:**
```
1. بڕۆ بۆ: http://localhost:3000/register
2. پڕکردنەوەی زانیاری:
   - ناوی یەکەم
   - ناوی دووەم
   - ئیمەیڵ
   - وشەی نهێنی
3. کلیک لەسەر "Sign Up"
4. ئەکاونتێک دەدرێت بە role: "user"
```

**٢. گۆڕینی بۆ Physiotherapist:**

**Option A: لە ڕێگەی Firestore Console (خێراترین)**
```
1. بڕۆ بۆ Firebase Console
2. Firestore Database
3. Collection: users
4. دۆزینەوەی user بە email
5. گۆڕینی خانەی "role" لە "user" بۆ "physiotherapist"
6. Save
```

**Option B: لە ڕێگەی Script (ئۆتۆماتیک)**
```javascript
// scripts/make-user-physiotherapist.js
const admin = require('firebase-admin');
const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function makePhysiotherapist(email) {
  try {
    const usersSnapshot = await db.collection('users')
      .where('email', '==', email)
      .get();
    
    if (usersSnapshot.empty) {
      console.log('❌ User not found with email:', email);
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    await userDoc.ref.update({
      role: 'physiotherapist',
      status: 'active',
      updatedAt: new Date().toISOString()
    });
    
    console.log('✅ User converted to physiotherapist successfully!');
    console.log('   Email:', email);
    console.log('   User ID:', userDoc.id);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

// بەکارهێنان:
const email = process.argv[2];
if (!email) {
  console.log('Usage: node scripts/make-user-physiotherapist.js user@example.com');
  process.exit(1);
}

makePhysiotherapist(email);
```

**بەکارهێنان:**
```bash
node scripts/make-user-physiotherapist.js newdoctor@example.com
```

---

## ٢. رێگای دووەم: لە ڕێگەی Doctor Request System

### رێگای فەرمی (پرۆسەی ڕەسمی)

**١. دروستکردنی Doctor Request:**
```javascript
// scripts/create-doctor-request.js
const admin = require('firebase-admin');
const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function createDoctorRequest(email, name, specialization) {
  try {
    const requestData = {
      email: email,
      name: name,
      specialization: specialization || 'Physical Therapy',
      requestDate: new Date(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    const docRef = await db.collection('doctor_requests').add(requestData);
    
    console.log('✅ Doctor request created successfully!');
    console.log('   Request ID:', docRef.id);
    console.log('   Email:', email);
    console.log('   Status: pending');
    console.log('\n📋 Next step: Admin should approve from:');
    console.log('   http://localhost:3000/admin-physiotherapist/manage');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

// بەکارهێنان
const email = process.argv[2];
const name = process.argv[3];
const specialization = process.argv[4];

if (!email || !name) {
  console.log('Usage: node scripts/create-doctor-request.js email name [specialization]');
  console.log('Example: node scripts/create-doctor-request.js doctor@example.com "Dr. Ahmed" "Physical Therapy"');
  process.exit(1);
}

createDoctorRequest(email, name, specialization);
```

**بەکارهێنان:**
```bash
node scripts/create-doctor-request.js doctor@example.com "Dr. Ahmed" "Physical Therapy"
```

**٢. پەسەندکردنی Request:**
- Admin بڕوات بۆ: `http://localhost:3000/admin-physiotherapist/manage`
- کلیک لەسەر "Approve" بۆ request
- خۆکارانە role ی user گۆڕانکاری دەکرێت بۆ "physiotherapist"

---

## ٣. رێگای سێیەم: لە ڕێگەی Firebase Auth Admin

### دروستکردنی ڕاستەوخۆ لە Database

```javascript
// scripts/create-physiotherapist-directly.js
const admin = require('firebase-admin');
const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();
const db = admin.firestore();

async function createPhysiotherapist(email, password, name, specialization) {
  try {
    console.log('1️⃣ Creating Firebase Auth user...');
    
    // Create auth user
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
      emailVerified: false
    });
    
    console.log('✅ Auth user created:', userRecord.uid);
    
    console.log('2️⃣ Creating Firestore document...');
    
    // Create Firestore document
    const userData = {
      email: email,
      name: name,
      role: 'physiotherapist',
      status: 'active',
      specialization: specialization || 'Physical Therapy',
      membership: 'Pro',
      subscriptionStatus: 'active',
      isActive: true,
      emailVerified: false,
      joinDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    await db.collection('users').doc(userRecord.uid).set(userData);
    
    console.log('✅ Physiotherapist created successfully!');
    console.log('\n📋 Account Details:');
    console.log('   User ID:', userRecord.uid);
    console.log('   Email:', email);
    console.log('   Name:', name);
    console.log('   Role: physiotherapist');
    console.log('   Specialization:', specialization || 'Physical Therapy');
    console.log('\n🔐 Login:');
    console.log('   http://localhost:3000/login');
    console.log('   Email:', email);
    console.log('   Password:', password);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

// بەکارهێنان
const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4];
const specialization = process.argv[5];

if (!email || !password || !name) {
  console.log('Usage: node scripts/create-physiotherapist-directly.js email password name [specialization]');
  console.log('Example: node scripts/create-physiotherapist-directly.js doctor@example.com 123456 "Dr. Ahmed" "Physical Therapy"');
  process.exit(1);
}

createPhysiotherapist(email, password, name, specialization);
```

**بەکارهێنان:**
```bash
node scripts/create-physiotherapist-directly.js newdoctor@example.com 123456 "Dr. Ahmed" "Physical Therapy"
```

---

## 📊 بەراوردکردنی رێگەکان:

| رێگە | خێرایی | ئاسانی | فەرمی | پێشنیاری |
|------|--------|--------|-------|-----------|
| **1. Firestore Console** | ⚡⚡⚡ | ⭐⭐⭐ | ❌ | ✅ بۆ تاقیکردنەوە |
| **2. make-user-physiotherapist Script** | ⚡⚡ | ⭐⭐⭐ | ✅ | ✅✅ **باشترین** |
| **3. Doctor Request System** | ⚡ | ⭐⭐ | ✅✅ | ✅ بۆ پرۆداکشن |
| **4. create-physiotherapist-directly** | ⚡⚡⚡ | ⭐⭐ | ✅ | ✅ بۆ setup |

---

## 🎯 پێشنیاری باشترین:

### بۆ Development/Testing:
```bash
# 1. دروستکردنی user لە register page
# 2. بەکارهێنانی script:
node scripts/make-user-physiotherapist.js doctor@example.com
```

### بۆ Production:
```bash
# 1. دروستکردنی doctor request
node scripts/create-doctor-request.js doctor@example.com "Dr. Ahmed" "Physical Therapy"

# 2. Admin approve بکات لە panel
http://localhost:3000/admin-physiotherapist/manage
```

---

## ✅ ئەنجام:

**باشترین رێگە بۆ تۆ:**

1. **Register** کردنی ئەکاونتێک لە app (`/register`)
2. بەکارهێنانی **`make-user-physiotherapist.js`** script
3. Login بکە بە role: physiotherapist

**سەرنج:**
- هەموو رێگەکان کاردەکەن
- رێگای یەکەم (script) خێراترین و ئاسانترینە
- رێگای دووەم (doctor request) فەرمیترە بۆ production
- رێگای سێیەم (direct creation) باشە بۆ bulk creation

دەتوانیت لە هەر کام لە رێگەکان بەکاری بهێنیت بەپێی پێداویستیت! 🎉
