// Load environment variables first (for scripts like tsx)
if (typeof window === "undefined" && !process.env.NEXT_RUNTIME) {
  try {
    const dotenv = require("dotenv")
    dotenv.config({ path: ".env.local" })
  } catch (e) {
    // dotenv not available, that's ok in Next.js runtime
  }
}

import * as admin from "firebase-admin"
import { getApps } from "firebase-admin/app"

// Service account configuration from environment variables
const serviceAccountKey: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "",
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
}

// Validate that required fields are present
if (!serviceAccountKey.projectId || !serviceAccountKey.privateKey || !serviceAccountKey.clientEmail) {
  console.error("❌ Missing Firebase Admin SDK credentials in environment variables")
  console.error("Required env vars: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL")
  throw new Error("Firebase Admin SDK configuration error")
}

// Initialize Firebase Admin SDK (avoid duplicate initialization)
try {
  if (getApps().length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
      databaseURL: `https://${serviceAccountKey.projectId}.firebaseio.com`,
    })
    console.log("✅ Firebase Admin SDK initialized successfully")
  }
} catch (error) {
  console.error("❌ Error initializing Firebase Admin SDK:", error)
  throw error
}

// Export Firestore instance
export const adminDb = admin.firestore()

// Export Auth instance
export const adminAuth = admin.auth()

// Export Storage instance
export const adminStorage = admin.storage()

// Helper function to verify Firebase Admin is ready
export function isFirebaseAdminInitialized(): boolean {
  return getApps().length > 0
}

// Firestore settings for better performance
adminDb.settings({
  ignoreUndefinedProperties: true,
})
