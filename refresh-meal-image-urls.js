/**
 * Refresh all meal image URLs in nutrition programs
 * This script updates expired signed URLs with fresh ones (1 year expiration)
 * 
 * Run: node refresh-meal-image-urls.js
 */

require('dotenv').config()
const admin = require('firebase-admin')
const path = require('path')

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CERT_URL
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'final-database-51935.firebasestorage.app'
  })
}

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function refreshMealImageUrls() {
  try {
    console.log('🔄 Starting meal image URL refresh...')
    
    // Get all nutrition programs
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get()
    
    console.log(`📊 Found ${programsSnapshot.size} nutrition programs`)
    
    let totalUpdated = 0
    let totalErrors = 0
    
    for (const doc of programsSnapshot.docs) {
      const program = doc.data()
      let updated = false
      
      console.log(`\n📋 Processing program: ${program.title}`)
      
      // Check weeklySchedule format
      if (program.weeklySchedule && typeof program.weeklySchedule === 'object') {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
        
        for (const day of days) {
          const dayData = program.weeklySchedule[day]
          if (!dayData || !dayData.meals) continue
          
          for (let i = 0; i < dayData.meals.length; i++) {
            const meal = dayData.meals[i]
            
            if (meal.imageUrl) {
              try {
                console.log(`  🖼️  Refreshing image for meal: ${meal.name}`)
                const refreshedUrl = await refreshImageUrl(meal.imageUrl)
                
                if (refreshedUrl !== meal.imageUrl) {
                  program.weeklySchedule[day].meals[i].imageUrl = refreshedUrl
                  updated = true
                  console.log(`    ✅ Updated`)
                } else {
                  console.log(`    ℹ️  No change needed`)
                }
              } catch (error) {
                console.error(`    ❌ Error:`, error.message)
                totalErrors++
              }
            }
          }
        }
      }
      
      // Check old meals array format
      if (program.meals && Array.isArray(program.meals)) {
        for (let i = 0; i < program.meals.length; i++) {
          const meal = program.meals[i]
          
          if (meal.imageUrl) {
            try {
              console.log(`  🖼️  Refreshing image for meal: ${meal.name}`)
              const refreshedUrl = await refreshImageUrl(meal.imageUrl)
              
              if (refreshedUrl !== meal.imageUrl) {
                program.meals[i].imageUrl = refreshedUrl
                updated = true
                console.log(`    ✅ Updated`)
              } else {
                console.log(`    ℹ️  No change needed`)
              }
            } catch (error) {
              console.error(`    ❌ Error:`, error.message)
              totalErrors++
            }
          }
        }
      }
      
      // Update document if any URLs were refreshed
      if (updated) {
        await doc.ref.update({
          weeklySchedule: program.weeklySchedule || {},
          meals: program.meals || [],
          updatedAt: new Date()
        })
        totalUpdated++
        console.log(`✅ Program updated: ${program.title}`)
      }
    }
    
    console.log(`\n✅ Refresh complete!`)
    console.log(`📊 Updated ${totalUpdated} programs`)
    console.log(`❌ Errors: ${totalErrors}`)
    
  } catch (error) {
    console.error('❌ Error refreshing meal image URLs:', error)
    process.exit(1)
  }
}

async function refreshImageUrl(imageUrl) {
  if (!imageUrl) return imageUrl
  
  // Handle comma-separated URLs
  const urls = imageUrl.split(',').map(u => u.trim())
  const refreshedUrls = []
  
  for (const url of urls) {
    try {
      // Extract file path from URL
      let filePath = ''
      
      if (url.includes('/meals/images/')) {
        const pathMatch = url.match(/\/meals\/images\/[^?]+/)
        if (pathMatch) {
          filePath = pathMatch[0].substring(1) // Remove leading slash
        }
      }
      
      if (!filePath) {
        console.warn('    ⚠️  Could not extract file path from URL, keeping original')
        refreshedUrls.push(url)
        continue
      }
      
      const file = bucket.file(filePath)
      
      // Check if file exists
      const [exists] = await file.exists()
      if (!exists) {
        console.warn(`    ⚠️  File does not exist: ${filePath}`)
        refreshedUrls.push(url)
        continue
      }
      
      // Generate new signed URL (1 year expiration)
      const [newUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000
      })
      
      refreshedUrls.push(newUrl)
      
    } catch (error) {
      console.error(`    ❌ Error processing URL: ${error.message}`)
      refreshedUrls.push(url) // Keep original on error
    }
  }
  
  return refreshedUrls.join(', ')
}

// Run the script
refreshMealImageUrls()
  .then(() => {
    console.log('\n🎉 All done!')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Fatal error:', error)
    process.exit(1)
  })
