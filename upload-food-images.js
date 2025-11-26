const admin = require('firebase-admin')
const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

// Initialize Firebase Admin
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json')

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'final-database-51935.firebasestorage.app'
  })
}

const bucket = admin.storage().bucket()

// Food images to upload (from Unsplash)
const foodImages = [
  // Fruits
  { url: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800', name: 'red-apple.jpg', folder: 'fruits' },
  { url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800', name: 'banana.jpg', folder: 'fruits' },
  { url: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800', name: 'orange.jpg', folder: 'fruits' },
  { url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800', name: 'strawberry.jpg', folder: 'fruits' },
  { url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800', name: 'mango.jpg', folder: 'fruits' },
  
  // Vegetables
  { url: 'https://images.unsplash.com/photo-1546470427-227ab6e55e93?w=800', name: 'tomato.jpg', folder: 'vegetables' },
  { url: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=800', name: 'carrot.jpg', folder: 'vegetables' },
  { url: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800', name: 'broccoli.jpg', folder: 'vegetables' },
  { url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800', name: 'spinach.jpg', folder: 'vegetables' },
  
  // Meats
  { url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', name: 'chicken-breast.jpg', folder: 'meats' },
  { url: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=800', name: 'salmon.jpg', folder: 'meats' },
  { url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800', name: 'beef-steak.jpg', folder: 'meats' },
  
  // Grains
  { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', name: 'brown-rice.jpg', folder: 'grains' },
  { url: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800', name: 'quinoa.jpg', folder: 'grains' },
  { url: 'https://images.unsplash.com/photo-1574635566542-1b85aa27a99b?w=800', name: 'oats.jpg', folder: 'grains' },
  
  // Drinks
  { url: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800', name: 'green-smoothie.jpg', folder: 'drinks' },
  { url: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800', name: 'orange-juice.jpg', folder: 'drinks' },
  { url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800', name: 'protein-shake.jpg', folder: 'drinks' },
  
  // Meals
  { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', name: 'grilled-chicken-salad.jpg', folder: 'meals' },
  { url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800', name: 'salmon-vegetables.jpg', folder: 'meals' },
  { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', name: 'quinoa-bowl.jpg', folder: 'meals' },
  { url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800', name: 'avocado-toast.jpg', folder: 'meals' },
]

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filepath)
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`))
        return
      }
      
      response.pipe(file)
      
      file.on('finish', () => {
        file.close()
        resolve()
      })
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {})
        reject(err)
      })
    }).on('error', (err) => {
      fs.unlink(filepath, () => {})
      reject(err)
    })
  })
}

// Upload image to Firebase Storage
async function uploadToStorage(localPath, storagePath) {
  await bucket.upload(localPath, {
    destination: storagePath,
    metadata: {
      contentType: 'image/jpeg',
      metadata: {
        firebaseStorageDownloadTokens: Math.random().toString(36).substring(2)
      }
    }
  })
  
  console.log(`✅ Uploaded: ${storagePath}`)
}

// Main function
async function uploadAllImages() {
  console.log('🚀 Starting food images upload to Firebase Storage...\n')
  
  // Create temp directory
  const tempDir = path.join(__dirname, 'temp-food-images')
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }
  
  let successCount = 0
  let failCount = 0
  
  for (const image of foodImages) {
    try {
      console.log(`📥 Downloading: ${image.name}`)
      const localPath = path.join(tempDir, image.name)
      
      // Download image
      await downloadImage(image.url, localPath)
      console.log(`   ✓ Downloaded to temp folder`)
      
      // Upload to Firebase Storage
      const storagePath = `meals/images/${image.folder}/${image.name}`
      await uploadToStorage(localPath, storagePath)
      
      // Delete local file
      fs.unlinkSync(localPath)
      
      successCount++
      console.log(`   ✓ Completed: ${image.name}\n`)
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
      
    } catch (error) {
      console.error(`   ❌ Failed: ${image.name}`)
      console.error(`   Error: ${error.message}\n`)
      failCount++
    }
  }
  
  // Cleanup temp directory
  try {
    fs.rmdirSync(tempDir)
  } catch (e) {
    // Ignore
  }
  
  console.log('\n' + '='.repeat(50))
  console.log(`✅ Upload Complete!`)
  console.log(`📊 Success: ${successCount}/${foodImages.length}`)
  console.log(`❌ Failed: ${failCount}`)
  console.log('='.repeat(50))
  
  process.exit(0)
}

// Run the upload
uploadAllImages().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
