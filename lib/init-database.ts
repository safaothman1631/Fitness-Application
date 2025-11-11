/**
 * Database Initialization Script
 * Run this script to seed your Firestore database with initial data
 * 
 * Usage: npm run db:init
 */

import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { adminDb, adminAuth } from "./firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

interface InitResult {
  success: boolean
  message: string
  data?: any
}

/**
 * Create initial superadmin user
 */
async function createSuperadmin(): Promise<InitResult> {
  try {
    const email = "admin@darinfitness.com"
    const password = "DarinFitness2025!"
    const name = "Super Administrator"

    // Create auth user
    let authUser
    try {
      authUser = await adminAuth.createUser({
        email,
        password,
        displayName: name,
        emailVerified: true,
      })
    } catch (error: any) {
      if (error.code === "auth/email-already-exists") {
        authUser = await adminAuth.getUserByEmail(email)
        console.log("⚠️  Superadmin auth user already exists")
      } else {
        throw error
      }
    }

    // Create Firestore user document
    const userRef = adminDb.collection("users").doc(authUser.uid)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      await userRef.set({
        email,
        name,
        phone: "+90 555 000 0000",
        role: "superadmin",
        membership: "VIP",
        avatar: "",
        isActive: true,
        joinDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    return {
      success: true,
      message: "Superadmin created successfully",
      data: { email, password, uid: authUser.uid },
    }
  } catch (error) {
    console.error("Error creating superadmin:", error)
    return {
      success: false,
      message: `Failed to create superadmin: ${error}`,
    }
  }
}

/**
 * Create sample access keys
 */
async function createAccessKeys(): Promise<InitResult> {
  try {
    const keys = [
      { key: "BASIC-2025-001", type: "Basic", duration: 30 },
      { key: "BASIC-2025-002", type: "Basic", duration: 30 },
      { key: "PREMIUM-2025-001", type: "Premium", duration: 90 },
      { key: "PREMIUM-2025-002", type: "Premium", duration: 90 },
      { key: "VIP-2025-001", type: "VIP", duration: 365 },
    ]

    const batch = adminDb.batch()
    const createdKeys: string[] = []

    for (const keyData of keys) {
      const keyRef = adminDb.collection("access-keys").doc()
      
      // Check if key already exists
      const existingKey = await adminDb
        .collection("access-keys")
        .where("key", "==", keyData.key)
        .get()

      if (existingKey.empty) {
        batch.set(keyRef, {
          ...keyData,
          isUsed: false,
          generatedBy: "system",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        createdKeys.push(keyData.key)
      }
    }

    await batch.commit()

    return {
      success: true,
      message: `Created ${createdKeys.length} access keys`,
      data: createdKeys,
    }
  } catch (error) {
    console.error("Error creating access keys:", error)
    return {
      success: false,
      message: `Failed to create access keys: ${error}`,
    }
  }
}

/**
 * Create sample exercises
 */
async function createExercises(): Promise<InitResult> {
  try {
    const exercises = [
      {
        name: "Push-ups",
        description: "Classic bodyweight chest exercise",
        category: "strength",
        muscleGroups: ["chest", "arms", "core"],
        equipment: ["bodyweight"],
        difficulty: "beginner",
        instructions: [
          "Start in a plank position with hands shoulder-width apart",
          "Lower your body until chest nearly touches the floor",
          "Push back up to starting position",
          "Keep your core engaged throughout"
        ],
        caloriesPerMinute: 7,
        tips: ["Keep your body in a straight line", "Don't let your hips sag"],
        warnings: ["Avoid if you have wrist or shoulder injuries"],
      },
      {
        name: "Squats",
        description: "Fundamental lower body exercise",
        category: "strength",
        muscleGroups: ["legs", "core"],
        equipment: ["bodyweight"],
        difficulty: "beginner",
        instructions: [
          "Stand with feet shoulder-width apart",
          "Lower your body by bending knees and hips",
          "Keep chest up and knees tracking over toes",
          "Push through heels to return to start"
        ],
        caloriesPerMinute: 8,
        tips: ["Keep your weight on your heels", "Don't let knees cave inward"],
      },
      {
        name: "Plank",
        description: "Core strengthening isometric exercise",
        category: "strength",
        muscleGroups: ["core", "shoulders"],
        equipment: ["bodyweight"],
        difficulty: "beginner",
        instructions: [
          "Start in a forearm plank position",
          "Keep body in a straight line from head to heels",
          "Engage your core and hold the position",
          "Breathe steadily throughout"
        ],
        caloriesPerMinute: 5,
        tips: ["Don't let hips sag or pike up", "Keep neck neutral"],
      },
    ]

    const batch = adminDb.batch()
    let createdCount = 0

    for (const exercise of exercises) {
      // Check if exercise already exists
      const existingExercise = await adminDb
        .collection("exercises")
        .where("name", "==", exercise.name)
        .get()

      if (existingExercise.empty) {
        const exerciseRef = adminDb.collection("exercises").doc()
        batch.set(exerciseRef, {
          ...exercise,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        createdCount++
      }
    }

    await batch.commit()

    return {
      success: true,
      message: `Created ${createdCount} exercises`,
      data: { count: createdCount },
    }
  } catch (error) {
    console.error("Error creating exercises:", error)
    return {
      success: false,
      message: `Failed to create exercises: ${error}`,
    }
  }
}

/**
 * Create default settings template
 */
async function createDefaultSettings(): Promise<InitResult> {
  try {
    const settingsRef = adminDb.collection("default-settings").doc("template")
    
    await settingsRef.set({
      theme: "dark",
      language: "en",
      notifications: {
        email: true,
        push: true,
        workoutReminders: true,
        appointmentReminders: true,
      },
      privacy: {
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
      },
      preferences: {
        measurementUnit: "metric",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "24h",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return {
      success: true,
      message: "Default settings template created",
    }
  } catch (error) {
    console.error("Error creating default settings:", error)
    return {
      success: false,
      message: `Failed to create default settings: ${error}`,
    }
  }
}

/**
 * Main initialization function
 */
async function initializeDatabase() {
  console.log("🚀 Starting database initialization...")
  console.log("=====================================\n")

  const results: InitResult[] = []

  // Create superadmin
  console.log("1️⃣  Creating superadmin user...")
  const superadminResult = await createSuperadmin()
  results.push(superadminResult)
  if (superadminResult.success) {
    console.log("✅", superadminResult.message)
    if (superadminResult.data) {
      console.log("   📧 Email:", superadminResult.data.email)
      console.log("   🔑 Password:", superadminResult.data.password)
      console.log("   🆔 UID:", superadminResult.data.uid)
    }
  } else {
    console.log("❌", superadminResult.message)
  }
  console.log()

  // Create access keys
  console.log("2️⃣  Creating access keys...")
  const keysResult = await createAccessKeys()
  results.push(keysResult)
  if (keysResult.success) {
    console.log("✅", keysResult.message)
    if (keysResult.data) {
      keysResult.data.forEach((key: string) => console.log("   🔑", key))
    }
  } else {
    console.log("❌", keysResult.message)
  }
  console.log()

  // Create exercises
  console.log("3️⃣  Creating sample exercises...")
  const exercisesResult = await createExercises()
  results.push(exercisesResult)
  if (exercisesResult.success) {
    console.log("✅", exercisesResult.message)
  } else {
    console.log("❌", exercisesResult.message)
  }
  console.log()

  // Create default settings
  console.log("4️⃣  Creating default settings template...")
  const settingsResult = await createDefaultSettings()
  results.push(settingsResult)
  if (settingsResult.success) {
    console.log("✅", settingsResult.message)
  } else {
    console.log("❌", settingsResult.message)
  }
  console.log()

  // Summary
  console.log("=====================================")
  console.log("📊 Initialization Summary:")
  const successCount = results.filter(r => r.success).length
  const totalCount = results.length
  console.log(`   ✅ Successful: ${successCount}/${totalCount}`)
  console.log(`   ❌ Failed: ${totalCount - successCount}/${totalCount}`)
  console.log("=====================================")

  if (successCount === totalCount) {
    console.log("🎉 Database initialization completed successfully!")
  } else {
    console.log("⚠️  Database initialization completed with some errors")
  }
  
  process.exit(successCount === totalCount ? 0 : 1)
}

// Run initialization
initializeDatabase().catch((error) => {
  console.error("💥 Fatal error during initialization:", error)
  process.exit(1)
})
