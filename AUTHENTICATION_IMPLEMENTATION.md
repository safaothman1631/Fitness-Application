# 🔐 API Authentication - Implementation Guide

## ✅ What's Been Secured

### 1. **Firestore Rules Enabled**
- ✅ Production security rules are now active
- ✅ Development mode disabled
- ✅ All database access now requires authentication
- ✅ Role-based access control in place

### 2. **API Endpoints Secured**
The following critical endpoints now require authentication:
- ✅ `GET /api/users` - Requires admin/superadmin/owner role
- ✅ `POST /api/users` - Requires admin/superadmin/owner role
- ✅ `GET /api/users/[id]` - Requires user to view own profile OR admin
- ✅ `PUT /api/users/[id]` - Requires user to edit own profile OR admin
- ✅ `PATCH /api/users/[id]` - Requires user to edit own profile OR admin
- ✅ `DELETE /api/users/[id]` - Requires admin/superadmin/owner role only

### 3. **Authentication Middleware Created**
New file: `lib/api-auth.ts` provides:
- ✅ `requireAuth()` - Verify user is authenticated
- ✅ `requireRole()` - Verify user has specific role
- ✅ `withAuth()` - Wrapper for authenticated routes
- ✅ `withRole()` - Wrapper for role-based routes
- ✅ Helper functions: `isAdmin()`, `isOwner()`, `isTrainer()`, etc.

---

## 🔧 Frontend Changes Required

### 1. **Add Firebase Token to API Calls**

All API requests now need the Firebase authentication token in headers.

#### **Before (Insecure):**
```typescript
// ❌ Old way - no authentication
const response = await fetch('/api/users')
const users = await response.json()
```

#### **After (Secure):**
```typescript
// ✅ New way - with authentication
import { auth } from '@/lib/firebase'

const user = auth.currentUser
if (!user) {
  throw new Error('Not authenticated')
}

const token = await user.getIdToken()

const response = await fetch('/api/users', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})

if (response.status === 401) {
  // Not authenticated - redirect to login
  window.location.href = '/giris'
  return
}

if (response.status === 403) {
  // Authenticated but insufficient permissions
  alert('You do not have permission to perform this action')
  return
}

const users = await response.json()
```

---

### 2. **Update `lib/db-service.ts`**

This file needs to be updated to include authentication tokens in all API calls.

**Add this helper function at the top:**

```typescript
import { auth } from '@/lib/firebase'

/**
 * Get authorization headers with Firebase token
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const user = auth.currentUser
  
  if (!user) {
    throw new Error('Not authenticated')
  }
  
  const token = await user.getIdToken()
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

/**
 * Fetch wrapper with authentication
 */
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders()
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  })
  
  if (response.status === 401) {
    // Not authenticated - clear storage and redirect
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/giris'
    throw new Error('Authentication required')
  }
  
  if (response.status === 403) {
    throw new Error('Insufficient permissions')
  }
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Request failed')
  }
  
  return response
}
```

**Then update all fetch calls to use `authenticatedFetch`:**

```typescript
// Example: Update getUsers()
export const getUsers = async (role?: string): Promise<User[]> => {
  try {
    const url = role ? `/api/users?role=${role}` : '/api/users'
    const response = await authenticatedFetch(url)
    return await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

// Example: Update deleteUser()
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await authenticatedFetch(`/api/users/${userId}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
```

---

### 3. **Update All Components Using dbService**

Components that call `dbService` functions need to handle authentication errors.

**Example: Update a component that lists users**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { dbService } from '@/lib/db-service'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  
  useEffect(() => {
    // Wait for Firebase auth to be ready
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/giris')
        return
      }
      
      try {
        const data = await dbService.getUsers()
        setUsers(data)
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes('Authentication')) {
            router.push('/giris')
          } else if (err.message.includes('permission')) {
            setError('You do not have permission to view users')
          } else {
            setError('Failed to load users')
          }
        }
      } finally {
        setLoading(false)
      }
    })
    
    return () => unsubscribe()
  }, [router])
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return (
    <div>
      {/* Render users */}
    </div>
  )
}
```

---

## 🚨 Important Notes

### **Authentication Flow:**

1. User logs in → Firebase Auth creates session
2. Frontend stores user info in localStorage (for UI purposes only)
3. Frontend gets Firebase token: `await user.getIdToken()`
4. Frontend includes token in API request headers
5. Backend verifies token with Firebase Admin SDK
6. Backend checks user role and permissions
7. Backend returns data OR 401/403 error

### **Security Rules:**

- **401 Unauthorized** = No valid token (not logged in)
- **403 Forbidden** = Valid token but wrong role (e.g., regular user trying to delete users)

### **What's Protected:**

✅ **Users API** - Only admins can list/create/delete users  
✅ **User Profile** - Users can only edit their own profile (unless admin)  
⏳ **Other endpoints** - Still need to be secured (next step)

### **What's NOT Protected Yet:**

⚠️ `/api/trainers/*` - Anyone can still access  
⚠️ `/api/physiotherapists/*` - Anyone can still access  
⚠️ `/api/workouts/*` - Anyone can still access  
⚠️ `/api/meals/*` - Anyone can still access  
⚠️ `/api/settings/*` - Anyone can still access  
⚠️ 40+ other endpoints - Still need authentication

---

## 📝 Testing Instructions

### **Test 1: Verify Authentication Works**

```bash
# Try to access API without token (should fail)
curl http://localhost:3000/api/users

# Expected response:
# {"error":"Authentication required"}
# Status: 401
```

### **Test 2: Access API With Token**

```typescript
// In browser console (while logged in):
const user = firebase.auth().currentUser
const token = await user.getIdToken()
console.log('Token:', token)

// Copy token and use in curl:
// curl http://localhost:3000/api/users \
//   -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **Test 3: Test Role Permissions**

Log in as regular user, try to list all users:
```typescript
// Should fail with 403 Forbidden
const response = await dbService.getUsers()
```

Log in as admin, try to list all users:
```typescript
// Should succeed
const response = await dbService.getUsers()
```

---

## 🔄 Rollback Instructions

If something breaks, you can rollback:

### **1. Restore Development Firestore Rules**
```bash
# Copy backup file
cp firestore.rules.backup firestore.rules

# Deploy to Firebase
firebase deploy --only firestore:rules
```

### **2. Remove Authentication from API Routes**

Comment out the authentication checks:
```typescript
// export async function GET(request: NextRequest) {
//   const user = await requireRole(request, ['admin', 'superadmin', 'owner'])
  
  // Rest of the code...
// }
```

---

## ✅ Next Steps

1. **Update `lib/db-service.ts`** with `authenticatedFetch()`
2. **Test users API** with authentication
3. **Secure remaining critical endpoints:**
   - `/api/settings/*`
   - `/api/database-stats`
   - `/api/logs`
   - `/api/trainers/*`
   - `/api/physiotherapists/*`
4. **Add rate limiting** (Phase 1, Step 7)
5. **Add input validation with Zod** (Phase 1, Step 8)

---

## 🆘 Troubleshooting

### **Problem: Getting 401 on all requests**

**Solution:** Make sure user is logged in via Firebase Auth first:
```typescript
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in:', user.uid)
  } else {
    console.log('No user logged in')
  }
})
```

### **Problem: Getting 403 Forbidden**

**Solution:** Check user role in Firestore:
```typescript
// Make sure user document has correct role field
{
  uid: "user-id",
  role: "admin", // Must be "admin", "superadmin", or "owner"
  email: "user@example.com"
}
```

### **Problem: Token expired**

**Solution:** Tokens expire after 1 hour. Get fresh token:
```typescript
const user = auth.currentUser
const token = await user.getIdToken(true) // Force refresh
```

---

## 📊 Security Status

### **Before:**
- 🔴 Database: OPEN to public
- 🔴 APIs: NO authentication
- 🔴 Security Score: 2/10

### **After Phase 1 (Current):**
- ✅ Database: PROTECTED with rules
- ✅ Users API: AUTHENTICATED
- 🟡 Other APIs: Still need protection
- 🟡 Security Score: 5/10

### **After Phase 1 Complete:**
- ✅ Database: PROTECTED
- ✅ All APIs: AUTHENTICATED
- ✅ RBAC: Implemented
- ✅ Rate Limiting: Active
- ✅ Input Validation: Active
- ✅ Security Score: 8/10

---

**Created:** December 15, 2025  
**Status:** Phase 1 - Step 3 of 8 Complete  
**Next:** Update remaining API endpoints
