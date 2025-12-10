const admin = require("firebase-admin")
const serviceAccount = require("./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json")

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function createDemoRequests() {
  try {
    const physioId = "physio1"
    const physioName = "Ahmed Kurdistan"

    // Delete old demo requests
    const oldRequests = await db
      .collection("physio-requests")
      .where("physioId", "==", physioId)
      .get()

    const deletePromises = oldRequests.docs.map((doc) => doc.ref.delete())
    await Promise.all(deletePromises)
    console.log(`🗑️  Deleted ${oldRequests.size} old requests`)

    const demoRequests = [
      {
        userId: "user001",
        userName: "Sardar Mohammed",
        userEmail: "sardar@example.com",
        userPhone: "+964 750 111 2222",
        userAge: 35,
        physioId: physioId,
        physioName: physioName,
        injuryType: "Lower Back Pain",
        painPercent: 75,
        notes: "Chronic lower back pain for 3 months. Pain increases after sitting for long periods.",
        status: "pending",
        completed: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: "user002",
        userName: "Hana Ali",
        userEmail: "hana@example.com",
        userPhone: "+964 770 333 4444",
        userAge: 28,
        physioId: physioId,
        physioName: physioName,
        injuryType: "Knee Injury",
        painPercent: 60,
        notes: "Knee pain after sports injury. Need rehabilitation program.",
        status: "pending",
        completed: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: "user003",
        userName: "Karwan Hassan",
        userEmail: "karwan@example.com",
        userPhone: "+964 750 555 6666",
        userAge: 42,
        physioId: physioId,
        physioName: physioName,
        injuryType: "Shoulder Pain",
        painPercent: 50,
        notes: "Rotator cuff injury. Difficulty raising arm above shoulder level.",
        status: "accepted",
        completed: false,
        response: "I'll be happy to help you with your shoulder rehabilitation. Let's schedule your first session.",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), // 20 hours ago
      },
      {
        userId: "user004",
        userName: "Aya Ibrahim",
        userEmail: "aya@example.com",
        userPhone: "+964 770 777 8888",
        userAge: 32,
        physioId: physioId,
        physioName: physioName,
        injuryType: "Neck Pain",
        painPercent: 40,
        notes: "Neck stiffness and headaches. Working long hours at desk.",
        status: "accepted",
        completed: false,
        response: "Your symptoms suggest posture-related issues. I'll create a program for you.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: "user005",
        userName: "Omar Jamal",
        userEmail: "omar@example.com",
        userPhone: "+964 750 999 0000",
        userAge: 45,
        physioId: physioId,
        physioName: physioName,
        injuryType: "Hip Pain",
        painPercent: 85,
        notes: "Severe hip pain affecting mobility. Need urgent consultation.",
        status: "rejected",
        completed: false,
        response: "I recommend seeing an orthopedic specialist first for proper diagnosis. Your condition may require medical imaging.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: "user006",
        userName: "Layla Ahmed",
        userEmail: "layla@example.com",
        userPhone: "+964 770 111 3333",
        userAge: 29,
        physioId: physioId,
        physioName: physioName,
        injuryType: "Ankle Sprain",
        painPercent: 30,
        notes: "Sprained ankle 2 weeks ago. Swelling has reduced but still painful.",
        status: "completed",
        completed: true,
        response: "Your treatment program is complete. Continue with home exercises for another 2 weeks.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    for (const request of demoRequests) {
      await db.collection("physio-requests").add(request)
      console.log(`✅ Created request: ${request.userName} - ${request.injuryType} (${request.status})`)
    }

    console.log("\n🎉 Successfully created 6 demo requests!")
    console.log("📊 Status breakdown:")
    console.log("   - Pending: 2")
    console.log("   - Accepted: 2")
    console.log("   - Rejected: 1")
    console.log("   - Completed: 1")
    console.log("\n✅ Navigate to http://localhost:3000/physiotherapist/requests to view them")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating demo requests:", error)
    process.exit(1)
  }
}

createDemoRequests()
