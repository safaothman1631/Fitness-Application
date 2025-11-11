# Firebase Firestore Database Schema

## Collections Structure

### 1. **users** Collection
```
users/
├── {userId}/
│   ├── email: string
│   ├── name: string
│   ├── phone: string
│   ├── role: "user" | "physiotherapist" | "trainer" | "admin" | "superadmin"
│   ├── membership: "Basic" | "Premium" | "Pro"
│   ├── avatar: string (URL)
│   ├── joinDate: timestamp
│   ├── isActive: boolean
│   ├── profile: {
│   │   ├── firstName: string
│   │   ├── lastName: string
│   │   ├── dateOfBirth: string
│   │   ├── gender: string
│   │   ├── address: string
│   │   ├── height: number
│   │   ├── weight: number
│   │   └── bloodType: string
│   └── createdAt: timestamp
```

### 2. **physiotherapists** Collection
```
physiotherapists/
├── {physiotherapistId}/
│   ├── profile: {
│   │   ├── firstName: string
│   │   ├── lastName: string
│   │   ├── email: string
│   │   ├── phone: string
│   │   ├── licenseNumber: string
│   │   └── specialization: string
│   ├── professional: {
│   │   ├── experience: string
│   │   ├── bio: string
│   │   └── certifications: array
│   ├── updatedAt: timestamp
│   └── createdAt: timestamp
```

### 3. **patients** Collection (Under Physiotherapist)
```
physiotherapists/{physiotherapistId}/patients/
├── {patientId}/
│   ├── name: string
│   ├── email: string
│   ├── phone: string
│   ├── condition: string
│   ├── startDate: timestamp
│   ├── status: "active" | "inactive"
│   └── joinedAt: timestamp
```

### 4. **trainees** Collection (Under Trainer)
```
trainers/{trainerId}/trainees/
├── {traineeId}/
│   ├── name: string
│   ├── email: string
│   ├── phone: string
│   ├── goal: string
│   ├── joinDate: timestamp
│   ├── progress: number
│   ├── sessionsCompleted: number
│   └── isActive: boolean
```

### 5. **workouts** Collection
```
workouts/
├── {workoutId}/
│   ├── name: string
│   ├── category: string
│   ├── duration: string
│   ├── difficulty: "Easy" | "Medium" | "Hard"
│   ├── description: string
│   ├── exercises: array
│   ├── createdBy: string (userId)
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp
```

### 6. **accessKeys** Collection
```
accessKeys/
├── {keyId}/
│   ├── key: string (unique)
│   ├── name: string
│   ├── membership: "Basic" | "Premium" | "Pro"
│   ├── createdAt: timestamp
│   ├── usedBy: string (optional, userId)
│   ├── usedDate: timestamp (optional)
│   └── isActive: boolean
```

### 7. **admin** Collection
```
admins/
├── {adminId}/
│   ├── name: string
│   ├── email: string
│   ├── role: "admin" | "superadmin" | "owner"
│   ├── permissions: array
│   ├── joinDate: timestamp
│   └── isActive: boolean
```

### 8. **notifications** Collection
```
notifications/
├── {userId}/
│   ├── {notificationId}/
│   │   ├── title: string
│   │   ├── message: string
│   │   ├── type: "info" | "warning" | "success" | "error"
│   │   ├── read: boolean
│   │   ├── createdAt: timestamp
│   │   └── action: string (optional)
```

### 9. **settings** Collection
```
settings/
├── {userId}/
│   ├── notifications: {
│   │   ├── email: boolean
│   │   ├── push: boolean
│   │   └── sms: boolean
│   ├── privacy: {
│   │   ├── profileVisible: boolean
│   │   └── dataCollection: boolean
│   └── updatedAt: timestamp
```

## Firebase Rules (Security)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read/write their own documents
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Physiotherapists can read/write their own profiles
    match /physiotherapists/{physioId} {
      allow read, write: if request.auth.uid == physioId;
      
      // Patients under physiotherapist
      match /patients/{patientId} {
        allow read, write: if request.auth.uid == physioId;
      }
    }
    
    // Trainers can read/write their own profiles and trainees
    match /trainers/{trainerId} {
      allow read, write: if request.auth.uid == trainerId;
      
      match /trainees/{traineeId} {
        allow read, write: if request.auth.uid == trainerId;
      }
    }
    
    // Admin/SuperAdmin operations
    match /admins/{adminId} {
      allow read, write: if request.auth.uid == adminId && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role in ['admin', 'superadmin'];
    }
    
    // Access keys - only superadmin can manage
    match /accessKeys/{keyId} {
      allow read: if get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'superadmin';
      allow write: if get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'superadmin';
    }
    
    // Settings - users can only access their own
    match /settings/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## API Routes to Create

1. `/api/users` - User CRUD
2. `/api/physiotherapists` - Physiotherapist profile
3. `/api/physiotherapists/[id]/patients` - Patient management
4. `/api/trainers/[id]/trainees` - Trainee management
5. `/api/workouts` - Workout CRUD
6. `/api/access-keys` - Access key management
7. `/api/admins` - Admin user management
8. `/api/notifications/[userId]` - Notification management
9. `/api/settings/[userId]` - User settings
