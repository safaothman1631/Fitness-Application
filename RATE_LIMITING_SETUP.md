# Rate Limiting Setup Guide

## Overview

Rate limiting has been implemented to protect the API from abuse and brute force attacks. The system uses **Upstash Redis** for distributed rate limiting.

## ✅ Implementation Status

**Rate limiting is implemented but DISABLED by default** until you configure Upstash Redis credentials.

### Current Limits (when enabled):

| Operation Type | Limit | Purpose |
|---------------|-------|---------|
| **Authentication** | 5 per 15 minutes | Prevent brute force attacks |
| **Write Operations** | 20 per minute | Prevent spam and abuse |
| **Read Operations** | 100 per minute | Prevent data scraping |

### Protected Endpoints:

**Write Operations (20/min):**
- ✅ POST `/api/users` - Create user
- ✅ POST `/api/physiotherapists` - Create physiotherapist
- ✅ POST `/api/workouts` - Create workout
- ✅ POST `/api/appointments` - Create appointment
- ✅ POST `/api/patients` - Create patient
- ✅ POST `/api/access-keys` - Create access key
- ✅ POST `/api/physio-requests` - Create request

**Read Operations (100/min):**
- ✅ GET `/api/users` - List users
- ✅ GET `/api/physiotherapists` - List physiotherapists
- ✅ GET `/api/workouts` - List workouts
- ✅ GET `/api/appointments` - List appointments
- ✅ GET `/api/patients` - List patients

---

## 🚀 Setup Instructions

### Step 1: Create Upstash Account

1. Go to [Upstash Console](https://console.upstash.com/)
2. Sign up or log in (free tier available)
3. Click "Create Database"

### Step 2: Configure Redis Database

1. **Name**: `fitpro-ratelimit` (or any name you prefer)
2. **Type**: Select "Global" for best performance across regions
3. **Region**: Choose closest to your deployment (or "Global")
4. **Eviction**: Select "allkeys-lru" (recommended)
5. Click "Create"

### Step 3: Get Connection Details

After creating the database:

1. Click on your database name
2. Scroll to **REST API** section
3. Copy the following credentials:
   - **UPSTASH_REDIS_REST_URL**: `https://your-db.upstash.io`
   - **UPSTASH_REDIS_REST_TOKEN**: `AXXXxxxx...`

### Step 4: Add to Environment Variables

Add these to your `.env.local` file:

```env
# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://your-database-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXxxxxxxxxxxxxxxxxxxxxx
```

### Step 5: Restart Development Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

### Step 6: Verify Setup

Check the console output when the server starts:

**✅ Success (Rate limiting enabled):**
```
✅ Rate limiting enabled: {
  auth: '5 per 15 minutes',
  write: '20 per minute',
  read: '100 per minute'
}
```

**⚠️ Warning (Rate limiting disabled):**
```
⚠️  Rate limiting disabled: Rate limiting is disabled. 
Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to enable.
```

---

## 📊 Testing Rate Limits

### Test Write Limit (20 per minute)

```bash
# Try creating 21 users rapidly
for i in {1..21}; do
  curl -X POST http://localhost:3000/api/users \
    -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@example.com\",\"name\":\"Test $i\",\"password\":\"password123\"}" \
    && echo "\n✅ Request $i succeeded" \
    || echo "\n❌ Request $i failed"
done
```

**Expected result**: First 20 succeed, 21st returns 429:
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please try again later.",
  "limit": 20,
  "reset": 1702345678,
  "resetAt": "2024-12-15T10:30:00.000Z"
}
```

### Test Read Limit (100 per minute)

```bash
# Try reading users 101 times
for i in {1..101}; do
  curl -H "Authorization: Bearer YOUR_TOKEN" \
    http://localhost:3000/api/users \
    && echo "Request $i: OK" \
    || echo "Request $i: FAILED"
done
```

**Expected result**: First 100 succeed, 101st returns 429

---

## 🛡️ Rate Limit Responses

### Successful Request (within limit)
```json
{
  "users": [...],
  "count": 50
}
```

### Rate Limited Request (limit exceeded)
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please try again later.",
  "limit": 20,
  "reset": 1702345678,
  "resetAt": "2024-12-15T10:30:00.000Z"
}
```

**Status Code**: `429 Too Many Requests`

---

## 🔧 Customizing Rate Limits

Edit `lib/rate-limit.ts` to adjust limits:

```typescript
// Authentication: Stricter limits
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"), // 3 per 10 minutes
  prefix: "@auth:",
})

// Write: More relaxed for power users
export const writeRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "1 m"), // 50 per minute
  prefix: "@write:",
})

// Read: Adjust based on usage patterns
export const readRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(200, "1 m"), // 200 per minute
  prefix: "@read:",
})
```

### Available Time Windows:
- `"10 s"` - 10 seconds
- `"1 m"` - 1 minute
- `"5 m"` - 5 minutes
- `"15 m"` - 15 minutes
- `"1 h"` - 1 hour
- `"1 d"` - 1 day

---

## 📈 Monitoring Rate Limits

### Check Rate Limiting Status

Create a monitoring endpoint:

```typescript
// app/api/admin/rate-limit-status/route.ts
import { NextResponse } from 'next/server'
import { getRateLimitingStatus } from '@/lib/rate-limit'
import { requireRole } from '@/lib/api-auth'

export async function GET(request: Request) {
  try {
    await requireRole(request, ['admin', 'superadmin'])
    const status = getRateLimitingStatus()
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}
```

### Upstash Dashboard

1. Go to [Upstash Console](https://console.upstash.com/)
2. Click on your database
3. View **Analytics** tab for:
   - Total requests
   - Hit/miss ratio
   - Memory usage
   - Top keys (rate limit identifiers)

---

## 🎯 Best Practices

### 1. Per-User vs Per-IP Limiting

The system intelligently applies limits:

- **Authenticated users**: Rate limited by `user:USER_ID`
- **Unauthenticated**: Rate limited by `ip:IP_ADDRESS`

This prevents a single malicious user from exhausting the rate limit for all users on the same IP.

### 2. Whitelist Internal IPs

For internal services, you can skip rate limiting:

```typescript
// lib/rate-limit.ts
export async function checkRateLimit(
  identifier: string, 
  limiter: Ratelimit | null
): Promise<void> {
  // Skip rate limiting for internal IPs
  if (identifier.includes('10.0.0.') || identifier.includes('192.168.')) {
    return
  }
  
  // ... rest of function
}
```

### 3. Gradual Rollout

Start with generous limits and gradually reduce:

**Week 1**: 100 writes/min, 500 reads/min (observe)  
**Week 2**: 50 writes/min, 200 reads/min (monitor abuse)  
**Week 3**: 20 writes/min, 100 reads/min (production limits)

---

## 🚨 Troubleshooting

### Issue: Rate limiting not working

**Check 1**: Environment variables set?
```bash
echo $UPSTASH_REDIS_REST_URL
echo $UPSTASH_REDIS_REST_TOKEN
```

**Check 2**: Server restarted after adding env vars?
```bash
# Stop server and restart
npm run dev
```

**Check 3**: Console shows enabled?
Look for: `✅ Rate limiting enabled`

### Issue: All requests returning 429

**Possible causes:**
1. Rate limits too strict
2. Multiple users on same IP
3. Redis connection issues

**Solution:**
```typescript
// Temporarily increase limits in lib/rate-limit.ts
export const writeRateLimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(100, "1 m"), // Increased from 20
})
```

### Issue: Redis connection timeout

**Check**: Upstash database is active
**Solution**: Verify credentials or recreate database

---

## 💰 Upstash Pricing

**Free Tier** (Sufficient for most projects):
- 10,000 commands/day
- 256 MB storage
- 1 database
- Global replication

**Pay-as-you-go**:
- $0.2 per 100,000 commands
- $0.25 per GB storage
- No minimum fee

**Estimate**: With current limits, ~50 active users = ~500,000 requests/month = **$1-2/month**

---

## 🎓 Next Steps

1. ✅ Create Upstash account
2. ✅ Configure Redis database
3. ✅ Add credentials to `.env.local`
4. ✅ Restart server and verify
5. ⏳ Monitor usage in Upstash dashboard
6. ⏳ Adjust limits based on actual traffic
7. ⏳ Set up alerts for rate limit abuse

---

## 📚 Additional Resources

- [Upstash Documentation](https://docs.upstash.com/)
- [Rate Limiting Best Practices](https://blog.upstash.com/rate-limiting-best-practices)
- [Redis Ratelimit GitHub](https://github.com/upstash/ratelimit)

---

## ⚙️ Production Deployment

### Vercel

Upstash credentials are automatically injected if you use the Vercel integration:

1. Go to Vercel dashboard → Your project → Settings → Integrations
2. Search for "Upstash"
3. Click "Add Integration"
4. Select your Redis database
5. Vercel automatically adds environment variables

### Other Platforms (Netlify, Railway, etc.)

Add environment variables manually in platform settings:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

---

**Status**: Rate limiting implementation complete. Waiting for Upstash configuration to enable.
