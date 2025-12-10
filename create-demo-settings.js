/**
 * Create Demo Settings for Physiotherapist
 * Run: node create-demo-settings.js
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

async function createDemoSettings() {
  console.log('⚙️  Creating demo settings...\n')

  const physiotherapistId = "physio1"

  const demoSettings = {
    physiotherapistId,
    preferences: {
      patientMessages: true,
      appointmentReminders: true,
      progressAlerts: true,
      emailNotifications: false
    },
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }

  try {
    console.log(`📝 Creating settings for ${physiotherapistId}...`)
    
    await db.collection('settings').doc(physiotherapistId).set(demoSettings)
    
    console.log(`✅ Settings created successfully!`)
    console.log(`\nPreferences:`)
    console.log(`  ✅ Patient Messages: ${demoSettings.preferences.patientMessages ? 'ON' : 'OFF'}`)
    console.log(`  ✅ Appointment Reminders: ${demoSettings.preferences.appointmentReminders ? 'ON' : 'OFF'}`)
    console.log(`  ✅ Progress Alerts: ${demoSettings.preferences.progressAlerts ? 'ON' : 'OFF'}`)
    console.log(`  ❌ Email Notifications: ${demoSettings.preferences.emailNotifications ? 'ON' : 'OFF'}`)
    console.log(`\n💡 View them at: /physiotherapist/settings`)

  } catch (error) {
    console.error('❌ Error creating settings:', error)
  }

  process.exit(0)
}

createDemoSettings()
