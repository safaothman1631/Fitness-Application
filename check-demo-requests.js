const admin = require("firebase-admin")
const serviceAccount = require("./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function checkRequests() {
  try {
    const snapshot = await db.collection("physio-requests").get()
    
    console.log("📊 Total requests in database:", snapshot.size)
    console.log("\n")
    
    if (snapshot.empty) {
      console.log("❌ No requests found!")
    } else {
      snapshot.forEach(doc => {
        const data = doc.data()
        console.log(`✅ ${data.userName}: ${data.injuryType} (${data.status})`)
        console.log(`   physioId: ${data.physioId}`)
      })
    }
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

checkRequests()
