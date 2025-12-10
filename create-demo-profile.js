const admin = require("firebase-admin")
const serviceAccount = require("./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json")

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function createDemoProfile() {
  try {
    const physiotherapistId = "physio1"

    const demoProfile = {
      firstName: "Ahmed",
      lastName: "Kurdistan",
      email: "ahmed.physio@example.com",
      phone: "+964 750 123 4567",
      licenseNumber: "PT-2024-001",
      specialization: "Sports Physiotherapy & Rehabilitation",
      location: "Erbil, Kurdistan Region",
      experience: "8",
      bio: "Experienced physiotherapist specializing in sports injuries and rehabilitation. Certified in manual therapy and exercise prescription with a focus on patient-centered care.",
      certifications: "Sports Physiotherapy Certificate, Manual Therapy Diploma, Dry Needling Certification",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await db.collection("physiotherapists").doc(physiotherapistId).set(demoProfile)

    console.log("✅ Demo profile created successfully!")
    console.log("Profile ID:", physiotherapistId)
    console.log("Name:", demoProfile.firstName, demoProfile.lastName)
    console.log("Email:", demoProfile.email)
    console.log("Location:", demoProfile.location)
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating demo profile:", error)
    process.exit(1)
  }
}

createDemoProfile()
