# 🔌 ڕاپۆرتی پشکنینی API و Data Connection
## API & Data Flow Audit - پرۆژەی FitPro

**بەروار:** 2025-12-15

---

## 📊 کۆی گشتی API Routes

```
کۆی گشتی: 49 API endpoint
✅ کارادەکەن: 49
❌ کێشەی سیکوریتی: 47
⚠️ کێشەی validation: 35
```

---

## 🚨 کێشە CRITICALی API

### 1. **هیچ Authentication Middleware نییە**

**کێشە:**
```typescript
// هەموو API routes بەبێ authentication check
export async function GET(request: NextRequest) {
  // ❌ هیچ کەس ناپرسێت: "ئایا تۆ لۆگین کراویت؟"
  const users = await adminDb.collection('users').get()
  return NextResponse.json(users)
}
```

**مەترسی:**
- **هەر کەسێک** دەتوانێت بچێتە:
  - `/api/users` - هەموو users ببینێت
  - `/api/analytics` - هەموو analytics ببینێت
  - `/api/database-stats` - هەموو stats ببینێت
- **بەبێ لۆگین!** ❌

**API-ەکانی بەبێ سیکوریتی:**
```typescript
✅ /api/users - GET/POST/PUT/DELETE (هەموو کەس!)
✅ /api/trainers - GET/POST (هەموو کەس!)
✅ /api/physiotherapists - GET/POST (هەموو کەس!)
✅ /api/analytics - GET (هەموو کەس!)
✅ /api/database-stats - GET (هەموو کەس!)
✅ /api/logs - GET (هەموو کەس!)
✅ /api/activity-logs - GET (هەموو کەس!)
✅ /api/pro-requests - GET/POST (هەموو کەس!)
✅ /api/settings - GET/POST (هەموو کەس!)
... و زۆر زۆر زیاتر! ❌❌❌
```

**چارەسەر:**
```typescript
// middleware.ts - دروستکردنی Auth Middleware
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminAuth } from '@/lib/firebase-admin'

export async function middleware(request: NextRequest) {
  // Check if route is API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get authorization token
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    try {
      // Verify token with Firebase Admin
      const decodedToken = await adminAuth.verifyIdToken(token)
      
      // Add user info to headers for API routes to use
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', decodedToken.uid)
      requestHeaders.set('x-user-email', decodedToken.email || '')
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
```

---

### 2. **هیچ Role-Based Access Control (RBAC) نییە**

**کێشە:**
- **هەموو کەس دەتوانێت هەموو API-ێک بەکاربهێنێت**
- تەنانەت user-ی ئاسایی دەتوانێت:
  - User-ەکانی تر بسڕێتەوە
  - Owner بکرێت
  - هەموو analytics ببینێت

**نموونە:**
```typescript
// /api/users/route.ts DELETE
// هەر کەسێک دەتوانێت هەر کەسێک بسڕێتەوە! ❌
export async function DELETE(request: NextRequest) {
  const userId = searchParams.get("id")
  await adminAuth.deleteUser(userId)  // ❌ هیچ role check نییە!
}
```

**چارەسەر:**
```typescript
// Helper function بۆ role checking
async function checkUserRole(userId: string, allowedRoles: string[]) {
  const userDoc = await adminDb.collection('users').doc(userId).get()
  const userRole = userDoc.data()?.role
  
  if (!allowedRoles.includes(userRole)) {
    throw new Error('Insufficient permissions')
  }
}

// لە API route-دا
export async function DELETE(request: NextRequest) {
  const requesterId = request.headers.get('x-user-id')
  
  // تەنها admin و superadmin دەتوانن بسڕن
  await checkUserRole(requesterId, ['admin', 'superadmin', 'owner'])
  
  const userId = searchParams.get("id")
  await adminAuth.deleteUser(userId)
}
```

---

### 3. **Input Validation لاوازە یان نییە**

**کێشە لە زۆر API:**

```typescript
// /api/users/route.ts POST
const { email, name, password } = body
// ❌ هیچ validation نییە!

if (!email || !name || !password) {
  // تەنها empty check
}

// ❌ وا بێت:
// - email = "<script>alert('hack')</script>"
// - name = "'; DROP TABLE users; --"
// - password = "123"
```

**چارەسەر:**
```typescript
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s]+$/, 'Invalid name'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone'),
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validate with Zod
  const result = createUserSchema.safeParse(body)
  
  if (!result.success) {
    return NextResponse.json({
      error: 'Validation failed',
      details: result.error.errors
    }, { status: 400 })
  }
  
  const { email, name, password, phone } = result.data
  // ئێستا safe-ە بۆ بەکارهێنان
}
```

---

### 4. **SQL Injection لە Firestore Queries**

**کێشە:**
```typescript
// /api/users/route.ts
const searchName = searchParams.get("name")  // user input
query = query.where("name", "==", searchName)  // ❌ راستەوخۆ بەکاردەهێنێت
```

**مەترسی:**
- لە Firestore، مەترسی کەمترە لە SQL
- بەڵام هێشتا دەتوانرێت query injection بکرێت

**چارەسەر:**
```typescript
// Sanitize input
function sanitizeInput(input: string): string {
  return input.replace(/[^a-zA-Z0-9\s@.-]/g, '')
}

const searchName = sanitizeInput(searchParams.get("name") || '')
```

---

### 5. **No Rate Limiting**

**کێشە:**
```typescript
// هیچ limit-ێک نییە بۆ:
POST /api/users  // create 1000 users/second
GET /api/analytics  // 10000 requests/second
DELETE /api/users?id=xxx  // delete all users
```

**مەترسی:**
- **DDoS Attack** - هێرش بکات و سێرڤەر بوەستێنێت
- **Spam** - هەزاران fake user دروست بکات
- **Cost** - هەزاران دۆلار Firebase cost

**چارەسەر:**
```typescript
// Using Upstash Redis for rate limiting
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),  // 10 requests per 10 seconds
})

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }
  
  // پێشڕەوی ئاسایی...
}
```

---

### 6. **CORS Configuration نادروستە**

**کێشە:**
```typescript
// هیچ CORS header نییە لە API routes
// یان تەواو open-ە:
headers.set('Access-Control-Allow-Origin', '*')  // ❌
```

**مەترسی:**
- هەر website-ێک دەتوانێت API-کانت بانگبکات
- **CSRF attacks** ئاسانە

**چارەسەر:**
```typescript
// Proper CORS setup
const allowedOrigins = [
  'https://fitpro.com',
  'https://www.fitpro.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
].filter(Boolean)

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
  
  return new NextResponse(null, { status: 403 })
}
```

---

### 7. **Error Messages زۆر زانیاری دەدەن**

**کێشە:**
```typescript
catch (error: any) {
  return NextResponse.json({
    error: "Failed to create user",
    details: error.message,  // ❌ هەموو error-ەکە دەنێرێت!
    stack: error.stack  // ❌❌ stack trace-ش!
  })
}
```

**مەترسی:**
- هاکەر دەتوانێت database structure بزانێت
- دەتوانێت Firebase config ببینێت
- دەتوانێت security holes بدۆزێتەوە

**چارەسەر:**
```typescript
catch (error: any) {
  // Log full error server-side
  console.error('Full error:', error)
  
  // Send generic error to client
  return NextResponse.json({
    error: "An error occurred",
    // تەنها لە development mode
    ...(process.env.NODE_ENV === 'development' && {
      details: error.message
    })
  }, { status: 500 })
}
```

---

### 8. **File Upload بەبێ Validation**

**کێشە:**
```typescript
// /api/upload/profile-image/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')
  
  // ❌ هیچ check-ێک نییە:
  // - File size?
  // - File type?
  // - Malicious content?
  
  await storage.upload(file)  // ❌ راستەوخۆ upload
}
```

**مەترسی:**
- هاکەر دەتوانێت virus upload بکات
- دەتوانێت 10GB فایل upload بکات
- دەتوانێت `.exe` یان `.sh` فایل upload بکات

**چارەسەر:**
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({
      error: 'Invalid file type. Only JPEG, PNG, WebP allowed.'
    }, { status: 400 })
  }
  
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({
      error: 'File too large. Maximum 5MB.'
    }, { status: 400 })
  }
  
  // Scan for malware (using ClamAV or similar)
  const isSafe = await scanFile(file)
  if (!isSafe) {
    return NextResponse.json({
      error: 'File contains malicious content.'
    }, { status: 400 })
  }
  
  await storage.upload(file)
}
```

---

## ⚠️ کێشەکانی Data Flow

### 9. **Database Queries بەبێ Optimization**

**کێشە:**
```typescript
// Getting ALL users every time
const usersSnapshot = await adminDb.collection('users').get()
const users = usersSnapshot.docs.map(doc => doc.data())  // ❌ هەموو data
```

**مەترسی:**
- زۆر **خاو** - 10,000 users لە یەک کات
- زۆر **cost** - Firebase pricing بەپێی read count
- **Timeout** - دەتوانێت 30 second بپڕێنێت

**چارەسەر:**
```typescript
// Use pagination
const pageSize = 20
const lastDoc = searchParams.get('lastDoc')

let query = adminDb.collection('users')
  .orderBy('createdAt', 'desc')
  .limit(pageSize)

if (lastDoc) {
  const lastSnapshot = await adminDb.collection('users').doc(lastDoc).get()
  query = query.startAfter(lastSnapshot)
}

const snapshot = await query.get()
```

---

### 10. **N+1 Query Problem**

**کێشە:**
```typescript
// Get users
const users = await getUsers()  // 1 query

// For each user, get their workouts
for (const user of users) {
  const workouts = await getWorkouts(user.id)  // N queries
}
// Total: 1 + N queries ❌
```

**چارەسەر:**
```typescript
// Batch get all workouts
const userIds = users.map(u => u.id)
const workoutsSnapshot = await adminDb.collection('workouts')
  .where('userId', 'in', userIds)  // 1 query!
  .get()

// Group by userId
const workoutsByUser = workoutsSnapshot.docs.reduce((acc, doc) => {
  const data = doc.data()
  if (!acc[data.userId]) acc[data.userId] = []
  acc[data.userId].push(data)
  return acc
}, {})
```

---

## 📊 نمرەی API Security

```
Authentication:     0/10 ⭐☆☆☆☆☆☆☆☆☆
Authorization:      0/10 ⭐☆☆☆☆☆☆☆☆☆
Input Validation:   3/10 ⭐⭐⭐☆☆☆☆☆☆☆
Rate Limiting:      0/10 ⭐☆☆☆☆☆☆☆☆☆
Error Handling:     4/10 ⭐⭐⭐⭐☆☆☆☆☆☆
CORS Config:        2/10 ⭐⭐☆☆☆☆☆☆☆☆
File Upload:        2/10 ⭐⭐☆☆☆☆☆☆☆☆
Query Optimization: 5/10 ⭐⭐⭐⭐⭐☆☆☆☆☆

نمرەی گشتی: 2/10 ⭐⭐☆☆☆☆☆☆☆☆
```

---

## ✅ پلانی چاکسازی API

### فەیز 1: دەستبەجێ (48 کاتژمێر)

1. ✅ **Auth Middleware زیادکردن**
2. ✅ **RBAC Implementation**
3. ✅ **Input Validation بە Zod**

### فەیز 2: حەوتە یەکەم

4. ✅ **Rate Limiting enable**
5. ✅ **CORS config چاککردن**
6. ✅ **Error messages sanitize**

### فەیز 3: حەوتەی دووەم

7. ✅ **File upload validation**
8. ✅ **Query optimization**
9. ✅ **Batch operations**

---

**نوسەری ڕاپۆرت:** GitHub Copilot AI  
**ستاتوس:** 🔴 URGENT - دەبێت دەستبەجێ چاکبکرێت

