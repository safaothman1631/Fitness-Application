const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'final-database-51935.firebasestorage.app'
  });
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

async function addStorageImagesToMeals() {
  try {
    console.log('🔄 Adding Firebase Storage images to meals...\n');
    
    // Get all meal images from storage
    const [files] = await bucket.getFiles({ prefix: 'meals/images/' });
    console.log(`📦 Found ${files.length} files in meals/images/`);
    
    // Generate signed URLs
    const imageUrls = [];
    for (const file of files) {
      const fileName = file.name.toLowerCase();
      if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
        });
        const name = file.name.split('/').pop().replace(/\.[^/.]+$/, '');
        imageUrls.push({ name, url, path: file.name });
      }
    }
    
    console.log(`🖼️  Generated ${imageUrls.length} image URLs\n`);
    
    // Map meal types to images
    const mealImageMap = {
      breakfast: imageUrls.filter(img => img.path.includes('breakfast') || img.path.includes('pancake') || img.path.includes('oatmeal')),
      lunch: imageUrls.filter(img => img.path.includes('lunch') || img.path.includes('chicken') || img.path.includes('salad')),
      dinner: imageUrls.filter(img => img.path.includes('dinner') || img.path.includes('steak') || img.path.includes('fish')),
      snack: imageUrls.filter(img => img.path.includes('snack') || img.path.includes('fruits') || img.path.includes('yogurt')),
      protein: imageUrls.filter(img => img.path.includes('protein') || img.path.includes('chicken') || img.path.includes('beef')),
      default: imageUrls.slice(0, 5) // First 5 images as fallback
    };
    
    // Get nutrition programs
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get();
    
    let updatedCount = 0;
    
    for (const doc of programsSnapshot.docs) {
      const program = doc.data();
      console.log(`\n📋 Processing: ${program.title}`);
      
      if (program.meals && program.meals.length > 0) {
        const updatedMeals = program.meals.map((meal, index) => {
          const category = meal.category || 'breakfast';
          const availableImages = mealImageMap[category] || mealImageMap.default;
          
          if (availableImages.length > 0) {
            // Use different image for each meal (rotate through available images)
            const selectedImage = availableImages[index % availableImages.length];
            console.log(`  ✅ ${meal.name} → ${selectedImage.name}`);
            updatedCount++;
            
            return {
              ...meal,
              imageUrl: selectedImage.url,
              imageName: selectedImage.name
            };
          }
          
          return meal;
        });
        
        await doc.ref.update({ meals: updatedMeals });
        console.log(`  💾 Saved updates`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log(`✅ Complete!`);
    console.log(`🖼️  Added images to: ${updatedCount} meals`);
    console.log(`📌 Images from Firebase Storage are now linked`);
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addStorageImagesToMeals();
