const admin = require('firebase-admin')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'final-database-51935.firebasestorage.app'
  })
}

const db = admin.firestore()

async function checkMealImages() {
  try {
    console.log('🔍 Checking meal images in database...\n')

    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get()

    console.log(`📊 Found ${programsSnapshot.size} nutrition programs\n`)

    programsSnapshot.forEach(doc => {
      const data = doc.data()
      console.log(`\n📋 Program ID: ${doc.id}`)
      console.log(`   Name: ${data.programName || data.name || 'N/A'}`)
      console.log(`   Meals: ${data.meals?.length || 0}`)
      
      if (data.meals && data.meals.length > 0) {
        data.meals.forEach((meal, i) => {
          console.log(`\n   🍽️ Meal ${i+1}:`)
          console.log(`      Name: ${meal.name || 'N/A'}`)
          console.log(`      Category: ${meal.category || 'N/A'}`)
          console.log(`      Image URL: ${meal.imageUrl ? '✅ EXISTS' : '❌ MISSING'}`)
          if (meal.imageUrl) {
            console.log(`      URL: ${meal.imageUrl.substring(0, 80)}...`)
          }
          console.log(`      Video URL: ${meal.videoUrl ? '✅ EXISTS' : '❌ MISSING'}`)
        })
      }
    })

    console.log('\n✅ Check complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkMealImages()
