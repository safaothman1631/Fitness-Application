// Simple Firebase connection test
const { initializeApp } = require("firebase/app")
const { getFirestore, collection, addDoc } = require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBUXCaDOwPuO5GGwHlGJiwpnrFaFL22Nfg",
  authDomain: "final-database-51935.firebaseapp.com",
  projectId: "final-database-51935",
  storageBucket: "final-database-51935.firebasestorage.app",
  messagingSenderId: "683176019395",
  appId: "1:683176019395:web:2b95be616ef73fe9406976",
}

console.log("🔄 Initializing Firebase...")
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log("✅ Firebase initialized")
console.log("📝 Attempting to create test user...")

async function testCreateUser() {
  try {
    const usersRef = collection(db, "users")
    const docRef = await addDoc(usersRef, {
      email: "test@example.com",
      name: "Test User",
      firstName: "Test",
      lastName: "User",
      role: "user",
      membership: "Free",
      subscriptionStatus: "inactive",
      subscriptionEndDate: null,
      isActive: true,
      joinDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })
    
    console.log("✅ Test user created successfully with ID:", docRef.id)
    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating test user:", error)
    console.error("Error code:", error.code)
    console.error("Error message:", error.message)
    process.exit(1)
  }
}

testCreateUser()
