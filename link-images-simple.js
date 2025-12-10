const admin = require('firebase-admin')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'final-database-51935.firebasestorage.app'
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function linkImages() {
  try {
    console.log('🔗 Linking images to meal plans...\n')

    // Get all files from meals/images/
    const [files] = await bucket.getFiles({ prefix: 'meals/images/' })
    
    const imageFiles = files.filter(file => {
      const name = file.name.toLowerCase()
      return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')
    })

    console.log(`📦 Found ${imageFiles.length} images in Storage\n`)

    // Generate signed URLs
    const images = []
    for (const file of imageFiles) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500'
      })
      const fileName = file.name.split('/').pop().replace(/\.[^/.]+$/, '')
      images.push({ name: fileName, url, fullPath: file.name })
    }

    console.log('📷 Available images:')
    images.forEach((img, i) => console.log(`  ${i+1}. ${img.name}`))
    console.log()

    // Get all programs
    const programsSnapshot = await db.collection('programs').get()
    console.log(`📊 Found ${programsSnapshot.size} programs\n`)

    let updateCount = 0

    for (const doc of programsSnapshot.docs) {
      const data = doc.data()
      console.log(`\n📋 Program ID: ${doc.id}`)
      console.log(`   Type: ${data.type || 'N/A'}`)
      console.log(`   Name: ${data.programName || data.name || 'N/A'}`)
      
      // Skip non-nutrition programs
      if (data.type !== 'nutrition') {
        console.log('   ⏭️ Skipping (not nutrition)')
        continue
      }

      // Check if has meals
      if (!data.meals || !Array.isArray(data.meals) || data.meals.length === 0) {
        console.log('   ⚠️ No meals array found')
        continue
      }

      console.log(`   🍽️ Has ${data.meals.length} meals`)

      // Update each meal with first available image
      let programUpdated = false
      data.meals.forEach((meal, index) => {
        if (!meal.imageUrl && images.length > index) {
          meal.imageUrl = images[index].url
          console.log(`   ✅ Meal ${index+1}: Added ${images[index].name}`)
          programUpdated = true
        }
      })

      // Save if updated
      if (programUpdated) {
        await doc.ref.update({ meals: data.meals })
        updateCount++
        console.log('   💾 Saved')
      }
    }

    console.log(`\n✅ Complete! Updated ${updateCount} programs`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

linkImages()
