const admin = require('firebase-admin')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function checkAllData() {
  try {
    console.log("🔍 Checking all data for physio1...\n")
    
    // Check requests
    console.log("📋 ========== REQUESTS ==========")
    const requestsSnapshot = await db
      .collection('physio-requests')
      .where('physioId', '==', 'physio1')
      .get()
    
    if (requestsSnapshot.empty) {
      console.log("  ❌ No requests found!")
    } else {
      requestsSnapshot.forEach(doc => {
        const data = doc.data()
        console.log(`\n  📄 Request ID: ${doc.id}`)
        console.log(`     Name: ${data.userName}`)
        console.log(`     Status: ${data.status}`)
        console.log(`     User ID: ${data.userId}`)
        if (data.appointment) {
          console.log(`     Appointment: ${data.appointment.date} at ${data.appointment.time}`)
          console.log(`     Price: $${data.appointment.price}`)
        }
      })
    }
    
    // Check patients
    console.log("\n\n👥 ========== PATIENTS ==========")
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
        console.log(`\n  👤 Patient ID: ${doc.id}`)
        console.log(`     Name: ${data.name}`)
        console.log(`     Condition: ${data.condition}`)
        console.log(`     User ID: ${data.userId}`)
        if (data.appointment) {
          console.log(`     📅 Appointment: ${data.appointment.date} at ${data.appointment.time}`)
          console.log(`     💰 Price: $${data.appointment.price}`)
          console.log(`     📊 Status: ${data.appointment.status || 'scheduled'}`)
          if (data.appointment.sessionDetails) {
            console.log(`     ✅ Session Confirmed:`)
            console.log(`        Duration: ${data.appointment.sessionDetails.actualDuration} min`)
            console.log(`        Rating: ${data.appointment.sessionDetails.progressRating}/10`)
            console.log(`        Notes: ${data.appointment.sessionDetails.sessionNotes.substring(0, 50)}...`)
          }
        } else {
          console.log(`     Appointment: ❌ None`)
        }
      })
    }
    
    console.log("\n\n✅ Data check complete!")
    
  } catch (error) {
    console.error("\n❌ Error:", error)
  } finally {
    process.exit(0)
  }
}

checkAllData()
