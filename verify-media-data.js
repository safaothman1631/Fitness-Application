const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function verifyMediaData() {
  try {
    console.log('🔍 Verifying media data in programs...\n');
    
    // Check workout programs
    console.log('📋 WORKOUT PROGRAMS:');
    console.log('='.repeat(60));
    const workoutSnapshot = await db.collection('programs')
      .where('type', '==', 'workout')
      .get();
    
    workoutSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`\n✨ ${data.title}`);
      
      if (data.weeklySchedule) {
        Object.entries(data.weeklySchedule).forEach(([day, dayData]) => {
          if (dayData.exercises?.length > 0) {
            dayData.exercises.forEach((ex, idx) => {
              console.log(`\n  ${day} - Exercise ${idx + 1}: ${ex.name}`);
              console.log(`    📷 Image: ${ex.imageUrl ? '✅ YES' : '❌ NO'}`);
              console.log(`    🎬 Video: ${ex.videoUrl ? '✅ YES' : '❌ NO'}`);
              console.log(`    📝 Instructions: ${ex.instructions ? '✅ YES' : '❌ NO'}`);
              if (ex.imageUrl) console.log(`       ${ex.imageUrl.substring(0, 50)}...`);
              if (ex.videoUrl) console.log(`       ${ex.videoUrl.substring(0, 50)}...`);
            });
          }
        });
      }
    });
    
    // Check nutrition programs
    console.log('\n\n📋 NUTRITION PROGRAMS:');
    console.log('='.repeat(60));
    const nutritionSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get();
    
    nutritionSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`\n✨ ${data.title}`);
      
      if (data.meals?.length > 0) {
        data.meals.forEach((meal, idx) => {
          console.log(`\n  Meal ${idx + 1}: ${meal.name}`);
          console.log(`    📷 Image: ${meal.imageUrl ? '✅ YES' : '❌ NO'}`);
          console.log(`    🎬 Video: ${meal.videoUrl ? '✅ YES' : '❌ NO'}`);
          console.log(`    📝 Instructions: ${meal.instructions ? '✅ YES' : '❌ NO'}`);
          if (meal.imageUrl) console.log(`       ${meal.imageUrl.substring(0, 50)}...`);
          if (meal.videoUrl) console.log(`       ${meal.videoUrl.substring(0, 50)}...`);
        });
      }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Verification complete!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyMediaData();
