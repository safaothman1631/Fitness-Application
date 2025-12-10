const admin = require('firebase-admin')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function checkUserAndProgram() {
  try {
    console.log('🔍 Checking Admin user and assigned programs...\n')

    // Find Admin user
    const usersSnapshot = await db.collection('users')
      .where('name', '==', 'Admin')
      .get()
    
    if (usersSnapshot.empty) {
      console.log('❌ Admin user not found!')
      
      // List all users
      const allUsers = await db.collection('users').get()
      console.log('\n👥 All users:')
      allUsers.forEach(doc => {
        const data = doc.data()
        console.log(`   ${doc.id} - ${data.name || data.email}`)
      })
      
      process.exit(1)
    }

    const adminUser = usersSnapshot.docs[0]
    const userId = adminUser.id
    console.log(`✅ Admin user found: ${userId}`)
    console.log(`   Name: ${adminUser.data().name}`)
    console.log(`   Email: ${adminUser.data().email}`)

    // Check programs assigned to this user
    console.log(`\n🔍 Checking programs assigned to ${userId}...`)
    
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get()
    
    console.log(`\n📊 Found ${programsSnapshot.size} nutrition programs:`)
    
    let foundAssigned = false
    programsSnapshot.forEach(doc => {
      const data = doc.data()
      const isAssigned = data.assignedUsers && data.assignedUsers.includes(userId)
      
      console.log(`\n📋 Program: ${doc.id}`)
      console.log(`   Assigned to: ${data.assignedUsers || 'none'}`)
      console.log(`   Has meals: ${data.meals ? data.meals.length : 0}`)
      console.log(`   ✅ Assigned to Admin: ${isAssigned ? 'YES' : 'NO'}`)
      
      if (isAssigned && data.meals) {
        foundAssigned = true
        console.log(`\n🍽️ Meals in this program:`)
        data.meals.forEach((meal, i) => {
          console.log(`   ${i+1}. ${meal.name}`)
          console.log(`      Image: ${meal.imageUrl ? '✅' : '❌'}`)
          console.log(`      Calories: ${meal.calories}`)
        })
      }
    })

    if (!foundAssigned) {
      console.log('\n⚠️ No programs assigned to Admin user!')
    } else {
      console.log('\n✅ Admin has assigned programs with meals!')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkUserAndProgram()
