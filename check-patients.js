const admin = require("firebase-admin")
const serviceAccount = require("./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function testPatientCreation() {
  try {
    const physioId = "physio1"
    
    console.log("📋 Checking patients for physioId:", physioId)
    
    const patientsSnapshot = await db
      .collection("physiotherapists")
      .doc(physioId)
      .collection("patients")
      .get()
    
    console.log("\n📊 Total patients:", patientsSnapshot.size)
    console.log("\n")
    
    if (patientsSnapshot.empty) {
      console.log("❌ No patients found!")
    } else {
      patientsSnapshot.forEach(doc => {
        const data = doc.data()
        console.log(`✅ ${data.name}`)
        console.log(`   Condition: ${data.condition}`)
        console.log(`   Phone: ${data.phone}`)
        console.log(`   Email: ${data.email}`)
        console.log(`   Pain Level: ${data.painLevel}%`)
        console.log(`   Join Date: ${data.joinDate}`)
        console.log(`   Active: ${data.isActive}`)
        if (data.requestId) {
          console.log(`   From Request: ${data.requestId}`)
        }
        console.log("")
      })
    }
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

testPatientCreation()
