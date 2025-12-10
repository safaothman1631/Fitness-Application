// Test script to update a request directly
const admin = require("firebase-admin")
const serviceAccount = require("./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function testUpdateRequest() {
  try {
    const physioId = "physio1"
    
    // Get first pending request
    const requestsSnapshot = await db
      .collection("physio-requests")
      .where("physioId", "==", physioId)
      .where("status", "==", "pending")
      .limit(1)
      .get()
    
    if (requestsSnapshot.empty) {
      console.log("❌ No pending requests found")
      process.exit(1)
    }
    
    const requestDoc = requestsSnapshot.docs[0]
    const requestData = requestDoc.data()
    
    console.log("📋 Found request:")
    console.log("   ID:", requestDoc.id)
    console.log("   Patient:", requestData.userName)
    console.log("   Injury:", requestData.injuryType)
    console.log("   Status:", requestData.status)
    console.log("")
    
    // Update to accepted with response
    const updateData = {
      status: "accepted",
      response: "TEST: I'll help you with your recovery program",
      updatedAt: new Date().toISOString()
    }
    
    console.log("🔄 Updating request to 'accepted'...")
    await db.collection("physio-requests").doc(requestDoc.id).update(updateData)
    console.log("✅ Request updated successfully")
    console.log("")
    
    // Check if patient was created
    console.log("🔍 Checking if patient was created...")
    const patientsSnapshot = await db
      .collection("physiotherapists")
      .doc(physioId)
      .collection("patients")
      .where("userId", "==", requestData.userId)
      .get()
    
    if (patientsSnapshot.empty) {
      console.log("❌ Patient was NOT created automatically")
      console.log("ℹ️  This means the API endpoint logic needs to be triggered")
    } else {
      console.log("✅ Patient created successfully!")
      const patientData = patientsSnapshot.docs[0].data()
      console.log("   Name:", patientData.name)
      console.log("   Condition:", patientData.condition)
    }
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

testUpdateRequest()
