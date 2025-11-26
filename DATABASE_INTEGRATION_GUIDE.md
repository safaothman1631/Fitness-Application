# Database Integration Guide - Firebase Firestore

## Setup Completed

### ✅ Environment Configuration
- Firebase credentials added to `.env.local`
- Firebase SDK installed (`npm install firebase`)
- Firebase config file created (`lib/firebase.ts`)

### ✅ API Routes Created
1. `/api/users` - User management (GET, POST)
2. `/api/users/[id]` - Single user operations (GET, PUT, DELETE)
3. `/api/physiotherapist/profile` - Physiotherapist profile (GET, POST)
4. `/api/workouts` - Workout management (GET, POST)
5. `/api/workouts/[id]` - Single workout operations (GET, PUT, DELETE)
6. `/api/access-keys` - Access key management (GET, POST)
7. `/api/access-keys/[id]` - Single key operations (GET, PUT, DELETE)
8. `/api/settings/[userId]` - User settings (GET, PUT)

### ✅ Database Service Layer Created
- `lib/db-service.ts` - Centralized API calls for all database operations

## How to Use Database Service

### Example 1: Fetch All Users
```tsx
import { dbService } from "@/lib/db-service"

const users = await dbService.getUsers()
const admins = await dbService.getUsers("admin")
```

### Example 2: Create a New User
```tsx
const newUser = await dbService.createUser({
  email: "user@example.com",
  name: "John Doe",
  phone: "+92-300-1234567",
  role: "user",
  membership: "Premium",
})
```

### Example 3: Update User
```tsx
await dbService.updateUser(userId, {
  name: "Updated Name",
  phone: "+92-300-9876543",
})
```

### Example 4: Delete User
```tsx
await dbService.deleteUser(userId)
```

## Integrating Into Pages

### Update Admin Page (app/admin/page.tsx)

Replace the static state with Firebase:

```tsx
"use client"
import { useState, useEffect } from "react"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, workoutsData] = await Promise.all([
          dbService.getUsers(),
          dbService.getWorkouts(),
        ])
        setUsers(usersData)
        setWorkouts(workoutsData)
      } catch (error) {
        toast.error("Failed to load data")
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleDeleteUser = async (userId: string) => {
    try {
      await dbService.deleteUser(userId)
      setUsers(users.filter(u => u.id !== userId))
      toast.success("User deleted successfully")
    } catch (error) {
      toast.error("Failed to delete user")
    }
  }

  // Rest of component...
}
```

### Update Trainer Page (app/trainer/page.tsx)

```tsx
"use client"
import { useState, useEffect } from "react"
import { dbService } from "@/lib/db-service"

export default function TrainerPage() {
  const [trainees, setTrainees] = useState([])
  const trainerId = "trainer_id" // Get from auth

  useEffect(() => {
    loadTrainees()
  }, [])

  const loadTrainees = async () => {
    try {
      // For trainees, create similar API:
      // /api/trainers/[id]/trainees
      const response = await fetch(`/api/trainers/${trainerId}/trainees`)
      const data = await response.json()
      setTrainees(data)
    } catch (error) {
      console.error("Failed to load trainees", error)
    }
  }

  const handleAddTrainee = async (traineeData) => {
    try {
      const response = await fetch(`/api/trainers/${trainerId}/trainees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(traineeData),
      })
      const newTrainee = await response.json()
      setTrainees([...trainees, newTrainee])
      toast.success("Trainee added successfully")
    } catch (error) {
      toast.error("Failed to add trainee")
    }
  }

  // Rest of component...
}
```

### Update SuperAdmin Page (app/superadmin/page.tsx)

```tsx
"use client"
import { useState, useEffect } from "react"
import { dbService } from "@/lib/db-service"

export default function SuperAdminPage() {
  const [users, setUsers] = useState([])
  const [accessKeys, setAccessKeys] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [usersData, keysData] = await Promise.all([
        dbService.getUsers(),
        dbService.getAccessKeys(),
      ])
      setUsers(usersData)
      setAccessKeys(keysData)
    } catch (error) {
      console.error("Failed to load data", error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await dbService.deleteUser(userId)
      setUsers(users.filter(u => u.id !== userId))
      toast.success("User deleted")
    } catch (error) {
      toast.error("Failed to delete user")
    }
  }

  const handleGenerateKey = async (keyName: string, membership: string) => {
    try {
      const newKey = await dbService.createAccessKey({
        name: keyName,
        membership,
      })
      setAccessKeys([...accessKeys, newKey])
      toast.success("Key generated successfully")
    } catch (error) {
      toast.error("Failed to generate key")
    }
  }

  // Rest of component...
}
```

## Creating Additional API Routes

### Example: Trainers/Trainees API

Create `/app/api/trainers/[id]/trainees/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const traineesRef = collection(db, `trainers/${params.id}/trainees`)
    const snapshot = await getDocs(traineesRef)
    const trainees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(trainees)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trainees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const traineesRef = collection(db, `trainers/${params.id}/trainees`)
    const docRef = await addDoc(traineesRef, {
      ...body,
      joinDate: new Date().toISOString(),
    })
    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trainee" }, { status: 500 })
  }
}
```

## Testing Database Connection

1. Go to Firebase Console → Firestore Database
2. Create a test document in the `users` collection
3. Run your app: `npm run dev`
4. Open browser console and run:

```javascript
fetch('/api/users')
  .then(r => r.json())
  .then(data => console.log(data))
```

You should see your test user data logged.

## Step-by-Step Integration Checklist

- [ ] Update `/app/admin/page.tsx` to use dbService
- [ ] Update `/app/trainer/page.tsx` to use dbService
- [ ] Update `/app/superadmin/page.tsx` to use dbService
- [ ] Create `/api/trainers/[id]/trainees/route.ts`
- [ ] Create `/api/physiotherapist/[id]/patients/route.ts`
- [ ] Create `/api/notifications/[userId]/route.ts`
- [ ] Update `/app/user-dashboard/page.tsx` to use dbService
- [ ] Test all CRUD operations
- [ ] Set up Firebase security rules

## Common Errors & Solutions

### Error: "Missing Firebase Config"
**Solution:** Check `.env.local` has all required Firebase variables

### Error: "Permission denied" when accessing Firestore
**Solution:** Update Firebase security rules in Firestore console

### Error: "Document not found"
**Solution:** Make sure document ID exists before updating/deleting

## Next Steps

1. Integrate database service into all pages
2. Set up Firebase security rules for production
3. Implement user authentication with Firebase Auth
4. Create backup and recovery procedures
5. Set up logging and monitoring

## Need More Help?

Refer to:
- `/DATABASE_SCHEMA.md` - Database structure
- `/lib/db-service.ts` - Available API methods
- `/app/api/` - All API route examples
