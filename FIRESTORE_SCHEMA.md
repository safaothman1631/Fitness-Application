# Firestore Database Schema

## Collections Structure

### 1. **users** Collection
Stores all user accounts (regular users, admins, superadmins)

```typescript
{
  id: string (auto-generated doc ID)
  email: string
  name: string
  phone?: string
  role: "user" | "admin" | "superadmin"
  membership?: "Basic" | "Premium" | "VIP"
  avatar?: string (URL)
  isActive: boolean
  accessKeyId?: string (reference to access-keys collection)
  joinDate: string (ISO date)
  expiryDate?: string (ISO date)
  weight?: number
  height?: number
  age?: number
  gender?: "male" | "female" | "other"
  createdAt: string (ISO date)
  updatedAt: string (ISO date)
}
```

### 2. **trainers** Collection
Stores trainer-specific data

```typescript
{
  id: string (auto-generated)
  userId: string (reference to users collection)
  name: string
  email: string
  phone: string
  specialization?: string
  certifications?: string[]
  bio?: string
  avatar?: string
  isActive: boolean
  assignedClients: string[] (array of user IDs)
  createdAt: string
  updatedAt: string
}
```

### 3. **physiotherapists** Collection
Stores physiotherapist-specific data

```typescript
{
  id: string (auto-generated)
  userId: string (reference to users collection)
  name: string
  email: string
  phone: string
  specialization?: string
  licenseNumber?: string
  yearsOfExperience?: number
  bio?: string
  avatar?: string
  clinicName?: string
  clinicAddress?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### 4. **patients** Collection
Stores patient data for physiotherapists

```typescript
{
  id: string (auto-generated)
  physiotherapistId: string (reference to physiotherapists collection)
  name: string
  email?: string
  phone: string
  age: number
  gender?: "male" | "female" | "other"
  medicalCondition: string
  diagnosis?: string
  treatmentPlan?: string
  notes?: string
  appointments: Array<{
    date: string
    time: string
    status: "scheduled" | "completed" | "cancelled"
    notes?: string
  }>
  medicalHistory?: string[]
  allergies?: string[]
  medications?: string[]
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}
```

### 5. **workouts** Collection
Stores workout plans

```typescript
{
  id: string (auto-generated)
  name: string
  description?: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number (minutes)
  category: "strength" | "cardio" | "flexibility" | "sports" | "rehabilitation"
  exercises: Array<{
    exerciseId: string (reference to exercises collection)
    sets?: number
    reps?: number
    duration?: number (seconds)
    rest?: number (seconds)
    notes?: string
  }>
  trainerId?: string (reference to trainers collection)
  assignedTo?: string[] (array of user IDs)
  isPublic: boolean
  tags?: string[]
  imageUrl?: string
  videoUrl?: string
  createdAt: string
  updatedAt: string
}
```

### 6. **exercises** Collection
Stores individual exercises

```typescript
{
  id: string (auto-generated)
  name: string
  description: string
  category: "strength" | "cardio" | "flexibility" | "sports" | "rehabilitation"
  muscleGroups: string[] ("chest", "back", "legs", "arms", "core", "shoulders")
  equipment: string[] ("barbell", "dumbbell", "machine", "bodyweight", "resistance band")
  difficulty: "beginner" | "intermediate" | "advanced"
  instructions: string[]
  imageUrl?: string
  videoUrl?: string
  caloriesPerMinute?: number
  tips?: string[]
  warnings?: string[]
  createdAt: string
  updatedAt: string
}
```

### 7. **access-keys** Collection
Stores membership access keys

```typescript
{
  id: string (auto-generated)
  key: string (unique access key)
  type: "Basic" | "Premium" | "VIP"
  duration: number (days)
  isUsed: boolean
  usedBy?: string (user ID who used the key)
  usedAt?: string (ISO date)
  generatedBy: string (admin/superadmin user ID)
  expiresAt?: string (ISO date)
  notes?: string
  createdAt: string
  updatedAt: string
}
```

### 8. **settings** Collection
Stores user-specific settings

```typescript
{
  id: string (userId)
  userId: string
  theme: "light" | "dark" | "system"
  language: "en" | "tr" | "ar" | "ku"
  notifications: {
    email: boolean
    push: boolean
    workoutReminders: boolean
    appointmentReminders: boolean
  }
  privacy: {
    profileVisibility: "public" | "private" | "friends"
    showEmail: boolean
    showPhone: boolean
  }
  preferences: {
    measurementUnit: "metric" | "imperial"
    dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD"
    timeFormat: "12h" | "24h"
  }
  createdAt: string
  updatedAt: string
}
```

### 9. **notifications** Collection
Stores user notifications

```typescript
{
  id: string (auto-generated)
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  category: "workout" | "appointment" | "system" | "membership" | "social"
  isRead: boolean
  actionUrl?: string
  metadata?: Record<string, any>
  createdAt: string
  expiresAt?: string
}
```

### 10. **workout-logs** Collection
Stores user workout completion logs

```typescript
{
  id: string (auto-generated)
  userId: string
  workoutId: string
  completedAt: string (ISO date)
  duration: number (actual minutes)
  caloriesBurned?: number
  notes?: string
  rating?: number (1-5)
  exercises: Array<{
    exerciseId: string
    completedSets: number
    completedReps: number
    weight?: number
    notes?: string
  }>
}
```

## Indexes

Create composite indexes for optimized queries:

1. **users**: `role` + `isActive`
2. **patients**: `physiotherapistId` + `isActive`
3. **workouts**: `category` + `difficulty`
4. **access-keys**: `isUsed` + `type`
5. **notifications**: `userId` + `isRead` + `createdAt` (descending)
6. **workout-logs**: `userId` + `completedAt` (descending)

## Security Rules

See `firestore.rules` file for complete security rules configuration.
