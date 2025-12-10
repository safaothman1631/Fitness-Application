const admin = require("firebase-admin")
const serviceAccount = require("./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

async function resetDemoData() {
  try {
    const physioId = "physio1"
    
    console.log("🗑️  Deleting old data...\n")
    
    // 1. Delete old requests
    const oldRequests = await db.collection("physio-requests").where("physioId", "==", physioId).get()
    for (const doc of oldRequests.docs) {
      await doc.ref.delete()
    }
    console.log(`✅ Deleted ${oldRequests.size} old requests`)
    
    // 2. Delete old patients
    const oldPatients = await db.collection("physiotherapists").doc(physioId).collection("patients").get()
    for (const doc of oldPatients.docs) {
      await doc.ref.delete()
    }
    console.log(`✅ Deleted ${oldPatients.size} old patients`)
    
    // 3. Delete old notifications
    const oldNotifications = await db.collection("notifications").where("physiotherapistId", "==", physioId).get()
    for (const doc of oldNotifications.docs) {
      await doc.ref.delete()
    }
    console.log(`✅ Deleted ${oldNotifications.size} old notifications`)
    
    console.log("\n🎯 Creating fresh demo data...\n")
    
    // ============================================
    // 1. CREATE PROFILE
    // ============================================
    const profileData = {
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
    await db.collection("physiotherapists").doc(physioId).set(profileData)
    console.log("✅ Created profile: Ahmed Kurdistan")
    
    // ============================================
    // 2. CREATE SETTINGS
    // ============================================
    const settingsData = {
      patientMessages: true,
      appointmentReminders: true,
      progressAlerts: true,
      emailNotifications: false,
      updatedAt: new Date().toISOString(),
    }
    await db.collection("settings").doc(physioId).set(settingsData)
    console.log("✅ Created settings")
    
    // ============================================
    // 3. CREATE USER WITH PASSWORD
    // ============================================
    const bcrypt = require("bcryptjs")
    const hashedPassword = await bcrypt.hash("demo123", 10)
    const userData = {
      email: "ahmed.physio@example.com",
      password: hashedPassword,
      role: "physiotherapist",
      name: "Ahmed Kurdistan",
      createdAt: new Date().toISOString(),
      passwordUpdatedAt: new Date().toISOString(),
    }
    await db.collection("users").doc(physioId).set(userData)
    console.log("✅ Created user with password: demo123")
    
    // ============================================
    // 4. CREATE PENDING REQUESTS (2)
    // ============================================
    const pendingRequests = [
      {
        userId: "user001",
        userName: "Sardar Mohammed",
        userEmail: "sardar@example.com",
        userPhone: "+964 750 111 2222",
        userAge: 35,
        userGender: "Male",
        physioId: physioId,
        physioName: "Ahmed Kurdistan",
        injuryType: "Lower Back Pain",
        painPercent: 75,
        notes: "Chronic lower back pain for 3 months. Pain increases after sitting for long periods.",
        status: "pending",
        completed: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: "user002",
        userName: "Hana Ali",
        userEmail: "hana@example.com",
        userPhone: "+964 770 333 4444",
        userAge: 28,
        userGender: "Female",
        physioId: physioId,
        physioName: "Ahmed Kurdistan",
        injuryType: "Knee Injury",
        painPercent: 60,
        notes: "Knee pain after sports injury. Need rehabilitation program.",
        status: "pending",
        completed: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
    ]
    
    // Create first request as pending
    const request1Ref = await db.collection("physio-requests").add(pendingRequests[0])
    console.log("✅ Created pending request: Sardar Mohammed")
    
    // Create second request as accepted with appointment and patient
    const acceptedRequest = {
      ...pendingRequests[1],
      status: "accepted",
      appointment: {
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
        time: "10:00",
        price: "50",
        notes: "First consultation session"
      },
      updatedAt: new Date().toISOString()
    }
    const request2Ref = await db.collection("physio-requests").add(acceptedRequest)
    console.log("✅ Created accepted request: Hana Ali (with appointment)")
    
    // Create patient record for accepted request
    const patientData = {
      userId: acceptedRequest.userId,
      name: acceptedRequest.userName,
      email: acceptedRequest.userEmail,
      phone: acceptedRequest.userPhone,
      age: acceptedRequest.userAge,
      gender: acceptedRequest.userGender,
      condition: acceptedRequest.injuryType,
      painLevel: acceptedRequest.painPercent,
      notes: acceptedRequest.notes,
      joinDate: new Date().toISOString().split("T")[0],
      sessionCount: 0,
      progress: 0,
      isActive: true,
      physiotherapistId: physioId,
      requestId: request2Ref.id,
      appointment: acceptedRequest.appointment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    await db.collection('physiotherapists').doc(physioId).collection('patients').add(patientData)
    console.log("✅ Created patient record: Hana Ali (with appointment)")
    
    // ============================================
    // 5. CREATE NOTIFICATIONS (6)
    // ============================================
    const notifications = [
      {
        physiotherapistId: physioId,
        type: "message",
        title: "New Message from Patient",
        message: "Sardar Mohammed: I have severe pain in my lower back",
        isRead: false,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        physiotherapistId: physioId,
        type: "appointment",
        title: "Appointment Reminder",
        message: "Hana Ali's appointment is tomorrow at 10:00 AM",
        isRead: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        physiotherapistId: physioId,
        type: "alert",
        title: "Patient Progress Alert",
        message: "Karwan Hassan has not recorded progress in 5 days",
        isRead: false,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      },
      {
        physiotherapistId: physioId,
        type: "message",
        title: "New Message from Patient",
        message: "Aya Ibrahim: Thank you for the session yesterday!",
        isRead: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        physiotherapistId: physioId,
        type: "appointment",
        title: "Appointment Completed",
        message: "Session with Omar Jamal completed successfully",
        isRead: true,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        physiotherapistId: physioId,
        type: "alert",
        title: "System Update",
        message: "New features available in your dashboard",
        isRead: true,
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
    
    for (const notification of notifications) {
      await db.collection("notifications").add(notification)
    }
    console.log("✅ Created 6 notifications (3 unread, 3 read)")
    
    console.log("\n" + "=".repeat(60))
    console.log("🎉 DEMO DATA RESET COMPLETE!")
    console.log("=".repeat(60))
    console.log("\n📊 Summary:")
    console.log("   ✅ Profile: Ahmed Kurdistan")
    console.log("   ✅ Settings: Notification preferences")
    console.log("   ✅ User: ahmed.physio@example.com (password: demo123)")
    console.log("   ✅ Requests: 1 pending + 1 accepted")
    console.log("   ✅ Patients: 1 (Hana Ali with appointment)")
    console.log("   ✅ Notifications: 6 total (3 unread)")
    console.log("\n📅 Sample Appointment:")
    console.log("   Patient: Hana Ali")
    console.log("   Date: Tomorrow")
    console.log("   Time: 10:00 AM")
    console.log("   Price: $50")
    console.log("\n🔗 Test URLs:")
    console.log("   Profile:       http://localhost:3000/physiotherapist/profile")
    console.log("   Settings:      http://localhost:3000/physiotherapist/settings")
    console.log("   Requests:      http://localhost:3000/physiotherapist/requests")
    console.log("   Patients:      http://localhost:3000/physiotherapist/patients")
    console.log("   Notifications: http://localhost:3000/physiotherapist/notifications")
    console.log("\n💡 Test the appointment system:")
    console.log("   1. Go to Requests page")
    console.log("   2. Click Accept on 'Sardar Mohammed' request")
    console.log("   3. Fill appointment details (date, time, price)")
    console.log("   4. Confirm - Patient will be added with appointment!")
    console.log("\n")
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

resetDemoData()
