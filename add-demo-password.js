/**
 * Add demo password to physiotherapist user
 * Run: node add-demo-password.js
 */

const admin = require('firebase-admin')
const bcrypt = require('bcryptjs')
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function addDemoPassword() {
  console.log('🔐 Adding demo password to physiotherapist...\n')

  const physiotherapistId = "physio1"
  const demoPassword = "demo123"

  try {
    // Hash the password
    console.log(`🔒 Hashing password...`)
    const hashedPassword = await bcrypt.hash(demoPassword, 10)
    
    console.log(`📝 Updating user document for ${physiotherapistId}...`)
    
    // Check if user exists
    const userDoc = await db.collection('users').doc(physiotherapistId).get()
    
    if (!userDoc.exists) {
      // Create user document if it doesn't exist
      console.log(`👤 User not found, creating new user...`)
      await db.collection('users').doc(physiotherapistId).set({
        id: physiotherapistId,
        email: 'physio1@fitpro.com',
        role: 'physiotherapist',
        name: 'Dr. Ahmed Hassan',
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        passwordUpdatedAt: new Date().toISOString()
      })
    } else {
      // Update existing user
      await db.collection('users').doc(physiotherapistId).update({
        password: hashedPassword,
        passwordUpdatedAt: new Date().toISOString()
      })
    }
    
    console.log(`✅ Password added successfully!`)
    console.log(`\n📋 Login Credentials:`)
    console.log(`   Email/ID: physio1`)
    console.log(`   Password: ${demoPassword}`)
    console.log(`\n💡 Use these credentials to test password update at: /physiotherapist/settings`)

  } catch (error) {
    console.error('❌ Error adding password:', error)
  }

  process.exit(0)
}

addDemoPassword()
