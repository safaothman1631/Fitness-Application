const admin = require('firebase-admin')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function assignMealPrograms() {
  try {
    console.log('🔍 Looking for users and meal programs...\n')

    // Get all users
    const usersSnapshot = await db.collection('users').get()
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    
    console.log(`👥 Found ${users.length} users`)
    users.forEach(user => {
      console.log(`   - ${user.name || user.email} (${user.id})`)
    })

    // Get nutrition programs
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get()
    
    console.log(`\n🍽️ Found ${programsSnapshot.size} nutrition programs`)
    
    if (programsSnapshot.empty) {
      console.log('❌ No nutrition programs found!')
      process.exit(1)
    }

    // Assign first nutrition program to first user
    const firstUser = users[0]
    const firstProgram = programsSnapshot.docs[0]
    
    console.log(`\n🔗 Assigning program "${firstProgram.id}" to user "${firstUser.name || firstUser.email}"`)
    
    await db.collection('programs').doc(firstProgram.id).update({
      assignedUsers: admin.firestore.FieldValue.arrayUnion(firstUser.id)
    })
    
    console.log('✅ Program assigned successfully!')
    
    // Verify
    const updatedProgram = await db.collection('programs').doc(firstProgram.id).get()
    console.log('\n📋 Assigned users:', updatedProgram.data()?.assignedUsers)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

assignMealPrograms()
