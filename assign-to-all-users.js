const admin = require('firebase-admin')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

async function assignToAllUsers() {
  try {
    console.log('🔍 Finding regular users and nutrition programs...\n')

    // Get all regular users (role: user or trainee)
    const usersSnapshot = await db.collection('users').get()
    const regularUsers = usersSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.role === 'user' || user.role === 'trainee' || !user.role)
    
    console.log(`👥 Found ${regularUsers.length} regular users:`)
    regularUsers.forEach(user => {
      console.log(`   - ${user.name || user.email} (${user.id}) - Role: ${user.role || 'none'}`)
    })

    // Get nutrition programs with meals
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get()
    
    const programsWithMeals = programsSnapshot.docs.filter(doc => {
      const data = doc.data()
      return data.meals && data.meals.length > 0
    })

    console.log(`\n🍽️ Found ${programsWithMeals.length} nutrition programs with meals`)
    
    if (programsWithMeals.length === 0) {
      console.log('❌ No nutrition programs with meals found!')
      process.exit(1)
    }

    // Assign first program to all regular users
    const program = programsWithMeals[0]
    const programData = program.data()
    
    console.log(`\n📋 Program: ${program.id}`)
    console.log(`   Meals: ${programData.meals.length}`)
    
    const userIds = regularUsers.map(u => u.id)
    
    console.log(`\n🔗 Assigning to ${userIds.length} users...`)
    
    await db.collection('programs').doc(program.id).update({
      assignedUsers: userIds
    })
    
    console.log('✅ Program assigned successfully!')
    
    // Verify
    const updatedProgram = await db.collection('programs').doc(program.id).get()
    console.log('\n📋 Assigned users:', updatedProgram.data()?.assignedUsers)
    
    console.log('\n✅ All regular users now have meal programs with images!')
    console.log('🎉 You can now visit http://localhost:3000/meals as any user')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

assignToAllUsers()
