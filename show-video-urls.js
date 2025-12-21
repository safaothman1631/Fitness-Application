const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

// Load .env
const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    line = line.trim()
    if (!line || line.startsWith('#')) return
    
    const equalIndex = line.indexOf('=')
    if (equalIndex === -1) return
    
    const key = line.substring(0, equalIndex).trim()
    let value = line.substring(equalIndex + 1).trim()
    
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    
    process.env[key] = value
  })
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: projectId,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
    }),
    storageBucket: `${projectId}.firebasestorage.app`
  })
}

const db = admin.firestore()

async function showFullVideoURLs() {
  try {
    console.log('='.repeat(80))
    console.log('🔍 Full Video URLs:')
    console.log('='.repeat(80))
    
    // Get the program with videos
    const program = await db.collection('programs').doc('PzDEkX8Mkx8U71T9r1l4').get()
    const data = program.data()
    
    if (data && data.weeklySchedule) {
      for (const [day, dayData] of Object.entries(data.weeklySchedule)) {
        if (dayData.exercises && dayData.exercises.length > 0) {
          console.log(`\n📅 ${day}:`)
          dayData.exercises.forEach((ex, idx) => {
            console.log(`   ${idx + 1}. ${ex.name}`)
            if (ex.videos && ex.videos.length > 0) {
              ex.videos.forEach((video, vIdx) => {
                console.log(`      Video ${vIdx + 1}: ${video.name}`)
                console.log(`      Full URL:\n      ${video.url}`)
                console.log()
              })
            }
          })
        }
      }
    }
    
    console.log('='.repeat(80))
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

showFullVideoURLs()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
