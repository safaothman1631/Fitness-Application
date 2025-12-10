/**
 * Create Demo Notifications for Physiotherapist
 * Run: node create-demo-notifications.js
 */

const admin = require('firebase-admin')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function createDemoNotifications() {
  console.log('🔔 Creating demo notifications...\n')

  const physiotherapistId = "physio1" // Default test physiotherapist ID

  const demoNotifications = [
    {
      physiotherapistId,
      type: "message",
      title: "New Message from Ali Khan",
      message: "I have severe pain in my lower back",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      physiotherapistId,
      type: "appointment",
      title: "Appointment Reminder",
      message: "Fatima Ahmed's appointment is tomorrow at 2:00 PM",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      physiotherapistId,
      type: "alert",
      title: "Patient Progress Alert",
      message: "Ali Khan has not recorded progress in 5 days",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      isRead: true,
      createdAt: new Date().toISOString()
    },
    {
      physiotherapistId,
      type: "message",
      title: "New Message from Sara Ahmed",
      message: "Thank you for the exercises! Feeling much better",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      isRead: true,
      createdAt: new Date().toISOString()
    },
    {
      physiotherapistId,
      type: "appointment",
      title: "Appointment Completed",
      message: "Session with Mohammed Ali was completed successfully",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      isRead: true,
      createdAt: new Date().toISOString()
    },
    {
      physiotherapistId,
      type: "alert",
      title: "New Patient Request",
      message: "New therapy request from Layla Hassan",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ]

  try {
    // Delete existing notifications for this physiotherapist
    console.log(`📋 Deleting old notifications for ${physiotherapistId}...`)
    const oldNotifications = await db.collection('notifications')
      .where('physiotherapistId', '==', physiotherapistId)
      .get()
    
    const deletePromises = oldNotifications.docs.map(doc => doc.ref.delete())
    await Promise.all(deletePromises)
    console.log(`✅ Deleted ${oldNotifications.size} old notifications\n`)

    // Create new demo notifications
    console.log('📝 Creating new demo notifications...')
    for (const notification of demoNotifications) {
      const docRef = await db.collection('notifications').add(notification)
      console.log(`✅ Created ${notification.type} notification: ${notification.title}`)
      console.log(`   ID: ${docRef.id}`)
      console.log(`   Status: ${notification.isRead ? 'Read' : 'Unread'}`)
      console.log(`   Time: ${new Date(notification.timestamp).toLocaleString()}\n`)
    }

    console.log(`\n🎉 Successfully created ${demoNotifications.length} demo notifications!`)
    console.log(`   Unread: ${demoNotifications.filter(n => !n.isRead).length}`)
    console.log(`   Read: ${demoNotifications.filter(n => n.isRead).length}`)
    console.log(`\n💡 View them at: /physiotherapist/notifications`)

  } catch (error) {
    console.error('❌ Error creating notifications:', error)
  }

  process.exit(0)
}

createDemoNotifications()
