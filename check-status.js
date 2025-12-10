const admin = require('firebase-admin')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function checkStatus() {
  try {
    console.log("📊 Checking current status...\n")
    
    // Check requests
    console.log("📋 REQUESTS:")
    const requestsSnapshot = await db
      .collection('physio-requests')
      .where('physioId', '==', 'physio1')
      .get()
    
    if (requestsSnapshot.empty) {
      console.log("  ❌ No requests found!")
    } else {
      requestsSnapshot.forEach(doc => {
        const data = doc.data()
        console.log(`  • ${data.userName} - Status: ${data.status}`)
      })
    }
    
    // Check patients
    console.log("\n👥 PATIENTS:")
    const patientsSnapshot = await db
      .collection('physiotherapists')
      .doc('physio1')
      .collection('patients')
      .get()
    
    if (patientsSnapshot.empty) {
      console.log("  ❌ No patients found!")
    } else {
      patientsSnapshot.forEach(doc => {
        const data = doc.data()
        console.log(`  • ${data.name} - Condition: ${data.condition}`)
      })
    }
    
    console.log("\n✅ Status check complete!")
    
  } catch (error) {
    console.error("\n❌ Error:", error)
  } finally {
    process.exit(0)
  }
}

checkStatus()
