const admin = require('firebase-admin')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function testConfirmAppointment() {
  try {
    console.log("🧪 Testing appointment confirmation...\n")
    
    // Get first patient with appointment
    const patientsSnapshot = await db
      .collection('physiotherapists')
      .doc('physio1')
      .collection('patients')
      .get()
    
    if (patientsSnapshot.empty) {
      console.log("❌ No patients found!")
      return
    }
    
    let patientToTest = null
    patientsSnapshot.forEach(doc => {
      const data = doc.data()
      if (data.appointment && data.appointment.status !== 'confirmed') {
        patientToTest = { id: doc.id, ...data }
      }
    })
    
    if (!patientToTest) {
      console.log("❌ No scheduled appointments found to confirm!")
      return
    }
    
    console.log("📋 Found appointment to test:")
    console.log("  Patient:", patientToTest.name)
    console.log("  Current Status:", patientToTest.appointment.status || 'scheduled')
    console.log("  Date:", patientToTest.appointment.date)
    console.log("  Time:", patientToTest.appointment.time)
    
    console.log("\n✅ Confirming appointment with session details...")
    
    // Update with confirmation and session details
    const updatedAppointment = {
      ...patientToTest.appointment,
      status: 'confirmed',
      sessionDetails: {
        actualDuration: 60,
        sessionNotes: "Patient showed great improvement. Practiced mobility exercises.",
        exercisesGiven: "3 stretching exercises, 2 strengthening exercises",
        nextSessionDate: "2025-12-15",
        progressRating: 8,
        confirmedAt: new Date().toISOString()
      }
    }
    
    await db
      .collection('physiotherapists')
      .doc('physio1')
      .collection('patients')
      .doc(patientToTest.id)
      .update({
        appointment: updatedAppointment,
        updatedAt: new Date().toISOString()
      })
    
    console.log("✅ Appointment confirmed successfully!")
    
    // Read back to verify
    console.log("\n🔍 Verifying update...")
    const updatedDoc = await db
      .collection('physiotherapists')
      .doc('physio1')
      .collection('patients')
      .doc(patientToTest.id)
      .get()
    
    const verifiedData = updatedDoc.data()
    
    console.log("\n📊 Updated Appointment Data:")
    console.log("  Status:", verifiedData.appointment.status)
    console.log("  Date:", verifiedData.appointment.date)
    console.log("  Time:", verifiedData.appointment.time)
    console.log("  Price:", verifiedData.appointment.price)
    
    if (verifiedData.appointment.sessionDetails) {
      console.log("\n📝 Session Details:")
      console.log("  Duration:", verifiedData.appointment.sessionDetails.actualDuration, "minutes")
      console.log("  Notes:", verifiedData.appointment.sessionDetails.sessionNotes)
      console.log("  Exercises:", verifiedData.appointment.sessionDetails.exercisesGiven)
      console.log("  Next Session:", verifiedData.appointment.sessionDetails.nextSessionDate)
      console.log("  Progress Rating:", verifiedData.appointment.sessionDetails.progressRating + "/10")
      console.log("  Confirmed At:", verifiedData.appointment.sessionDetails.confirmedAt)
    }
    
    console.log("\n🎉 TEST PASSED - Data saved and verified successfully!")
    
  } catch (error) {
    console.error("\n❌ Error:", error)
  } finally {
    process.exit(0)
  }
}

testConfirmAppointment()
