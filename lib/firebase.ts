import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getAuth, connectAuthEmulator, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAl-J43H10d6ZnaZYKX9GHv8quN80XjqB8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "final-database-51935.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "final-database-51935",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "final-database-51935.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "434316366627",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:434316366627:web:9ce4eb674a0878a0507296",
}

console.log("🔑 Firebase Config Check:", {
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : "MISSING",
  projectId: firebaseConfig.projectId || "MISSING",
  fromEnv: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY
})

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("Firebase configuration is missing required fields")
  throw new Error("Firebase configuration error: Missing API key or project ID")
}

// Initialize Firebase (avoid duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Auth
export const auth = getAuth(app)

// Set persistence to LOCAL (keeps user logged in across page refreshes AND browser restarts)
// User stays logged in until they explicitly logout
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("✅ Firebase auth persistence set to LOCAL")
    })
    .catch((error) => {
      console.error("❌ Failed to set auth persistence:", error)
      // Don't throw - persistence is not critical
    })
}

// Initialize Storage
export const storage = getStorage(app)

// Connect to emulators in development if configured
if (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === "true") {
  try {
    connectFirestoreEmulator(db, "localhost", 8080)
    connectAuthEmulator(auth, "http://localhost:9099")
    console.log("🔧 Connected to Firebase emulators")
  } catch (error) {
    console.warn("Firebase emulator connection failed:", error)
  }
}

console.log("✅ Firebase initialized successfully")
