const admin = require('firebase-admin')
const path = require('path')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'final-database-51935.firebasestorage.app'
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function linkStorageImages() {
  try {
    console.log('🔗 Linking Firebase Storage images to meals...\n')

    // Get all files from meals/images/
    const [files] = await bucket.getFiles({ prefix: 'meals/images/' })
    
    const imageFiles = files.filter(file => {
      const name = file.name.toLowerCase()
      return name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')
    })

    console.log(`📦 Found ${imageFiles.length} images in Storage\n`)

    // Create a mapping of food names to image URLs
    const imageMap = {}
    for (const file of imageFiles) {
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-01-2500' // Long expiry
      })
      const fileName = path.basename(file.name, path.extname(file.name))
      imageMap[fileName] = url
      console.log(`✅ ${fileName} -> ${url.substring(0, 80)}...`)
    }

    console.log(`\n📊 Image map created with ${Object.keys(imageMap).length} entries\n`)

    // Get all programs
    const programsSnapshot = await db.collection('programs').get()
    let updateCount = 0

    for (const doc of programsSnapshot.docs) {
      const program = doc.data()
      
      // Only update nutrition programs
      if (program.type !== 'nutrition') continue

      console.log(`\n🍽️ Processing: ${program.name}`)

      let programUpdated = false
      
      // Update meals array
      if (program.meals && Array.isArray(program.meals)) {
        for (let meal of program.meals) {
          if (!meal.foods || !Array.isArray(meal.foods)) continue

          // Try to find matching image for each food
          for (let food of meal.foods) {
            const foodName = food.name.toLowerCase()
            
            // Try exact match or partial match
            for (const [imageName, imageUrl] of Object.entries(imageMap)) {
              if (foodName.includes(imageName.toLowerCase()) || 
                  imageName.toLowerCase().includes(foodName)) {
                
                // Add image to meal if not already set
                if (!meal.imageUrl) {
                  meal.imageUrl = imageUrl
                  console.log(`  ✅ Linked ${imageName} to meal ${meal.name || 'Unnamed'}`)
                  programUpdated = true
                  break
                }
              }
            }
          }
        }
      }

      // Save updates
      if (programUpdated) {
        await db.collection('programs').doc(doc.id).update({
          meals: program.meals
        })
        updateCount++
        console.log(`  💾 Program updated`)
      } else {
        console.log(`  ⏭️ No matches found`)
      }
    }

    console.log(`\n✅ Linking complete!`)
    console.log(`📊 Updated ${updateCount} programs`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

linkStorageImages()
