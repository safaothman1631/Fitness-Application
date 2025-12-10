const admin = require('firebase-admin')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function testAcceptRequest() {
  try {
    console.log("🔍 Finding first pending request...")
    
    const requestsSnapshot = await db
      .collection('physio-requests')
      .where('physioId', '==', 'physio1')
      .where('status', '==', 'pending')
      .limit(1)
      .get()
    
    if (requestsSnapshot.empty) {
      console.log("❌ No pending requests found!")
      return
    }
    
    const requestDoc = requestsSnapshot.docs[0]
    const requestId = requestDoc.id
    const requestData = requestDoc.data()
    
    console.log("\n📋 Request Details:")
    console.log("  ID:", requestId)
    console.log("  User:", requestData.userName)
    console.log("  Status:", requestData.status)
    console.log("  User ID:", requestData.userId)
    
    console.log("\n✅ Accepting request...")
    
    // Update request to accepted
    await db.collection('physio-requests').doc(requestId).update({
      status: 'accepted',
      response: 'تێستی قەبووڵکردن - Test acceptance',
      updatedAt: new Date().toISOString()
    })
    
    console.log("✅ Request updated to 'accepted'")
    
    // Check if patient exists
    const patientsSnapshot = await db
      .collection('physiotherapists')
      .doc('physio1')
      .collection('patients')
      .where('userId', '==', requestData.userId)
      .get()
    
    if (patientsSnapshot.empty) {
      console.log("\n🆕 Creating patient record...")
      
      const patientData = {
        userId: requestData.userId,
        name: requestData.userName || "Unknown User",
        email: requestData.userEmail || "",
        phone: requestData.userPhone || "",
        age: requestData.userAge || 0,
        gender: requestData.userGender || "",
        condition: requestData.injuryType || "Unknown",
        painLevel: requestData.painPercent || 0,
        notes: requestData.notes || "",
        joinDate: new Date().toISOString().split("T")[0],
        sessionCount: 0,
        progress: 0,
        isActive: true,
        physiotherapistId: 'physio1',
        requestId: requestId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      const newPatientRef = await db
        .collection('physiotherapists')
        .doc('physio1')
        .collection('patients')
        .add(patientData)
      
      console.log("✅ Patient created with ID:", newPatientRef.id)
      console.log("  Name:", patientData.name)
      console.log("  Condition:", patientData.condition)
    } else {
      console.log("\nℹ️  Patient already exists!")
      const existingPatient = patientsSnapshot.docs[0]
      console.log("  Patient ID:", existingPatient.id)
      console.log("  Name:", existingPatient.data().name)
    }
    
    console.log("\n🎉 TEST COMPLETE!")
    
  } catch (error) {
    console.error("\n❌ Error:", error)
  } finally {
    process.exit(0)
  }
}

testAcceptRequest()
