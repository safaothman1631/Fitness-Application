/**
 * Quick test to verify Firebase Admin credentials
 */
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import { adminDb } from "./firebase-admin"

async function testConnection() {
  console.log("🔍 Testing Firebase Admin connection...")
  
  try {
    // Try to get a simple document count
    const testRef = adminDb.collection("users").limit(1)
    const snapshot = await testRef.get()
    
    console.log("✅ Firebase Admin connection successful!")
    console.log(`📊 Found ${snapshot.size} document(s) in 'users' collection`)
    console.log("\n🎉 Your credentials are working correctly!")
    console.log("\nYou can now run: npm run db:init")
    
    process.exit(0)
  } catch (error: any) {
    console.error("❌ Firebase Admin connection failed!")
    console.error("Error:", error.message)
    console.error("\n🔧 Troubleshooting:")
    console.error("1. Check that all env vars are set in .env.local")
    console.error("2. Verify FIREBASE_PRIVATE_KEY has correct format with \\n")
    console.error("3. Make sure FIREBASE_CLIENT_EMAIL matches your project")
    console.error("\nSee GET_SERVICE_ACCOUNT.md for instructions.")
    
    process.exit(1)
  }
}

testConnection()
