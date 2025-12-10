const admin = require('firebase-admin')
const bcrypt = require('bcrypt')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function createRealUser() {
  try {
    console.log("👤 Creating real user account...\n")
    
    const userId = "user_rashad_123"
    const password = "rashad2025"
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user in users collection
    const userData = {
      id: userId,
      email: "rashad.ali@gmail.com",
      password: hashedPassword,
      role: "user",
      name: "Rashad Ali",
      phone: "+964 750 555 6677",
      age: 32,
      gender: "Male",
      createdAt: new Date().toISOString(),
      passwordUpdatedAt: new Date().toISOString(),
    }
    
    await db.collection("users").doc(userId).set(userData)
    console.log("✅ Created user account")
    console.log("   📧 Email: rashad.ali@gmail.com")
    console.log("   🔑 Password: rashad2025")
    console.log("   👤 Name: Rashad Ali")
    console.log("   📱 Phone: +964 750 555 6677")
    
    // Create a pending request to physiotherapist
    const requestData = {
      userId: userId,
      userName: "Rashad Ali",
      userEmail: "rashad.ali@gmail.com",
      userPhone: "+964 750 555 6677",
      userAge: 32,
      userGender: "Male",
      physioId: "physio1",
      physioName: "Ahmed Kurdistan",
      injuryType: "Shoulder Pain",
      painPercent: 65,
      notes: "I have shoulder pain after gym workout. Need professional consultation and treatment plan.",
      status: "pending",
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    const requestRef = await db.collection("physio-requests").add(requestData)
    console.log("\n✅ Created pending request")
    console.log("   📋 Request ID:", requestRef.id)
    console.log("   🏥 Injury: Shoulder Pain")
    console.log("   💯 Pain Level: 65%")
    console.log("   📝 Status: Pending")
    
    console.log("\n" + "=".repeat(60))
    console.log("🎉 REAL USER CREATED SUCCESSFULLY!")
    console.log("=".repeat(60))
    
    console.log("\n📋 Login Credentials:")
    console.log("   Email: rashad.ali@gmail.com")
    console.log("   Password: rashad2025")
    
    console.log("\n🔗 Test Flow:")
    console.log("   1. User can login at: http://localhost:3000/login")
    console.log("   2. Physiotherapist can see request at: http://localhost:3000/physiotherapist/requests")
    console.log("   3. Accept the request with appointment details")
    console.log("   4. User will become a patient!")
    
    console.log("\n")
    
    process.exit(0)
  } catch (error) {
    console.error("\n❌ Error:", error)
    process.exit(1)
  }
}

createRealUser()
