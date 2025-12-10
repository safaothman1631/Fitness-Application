const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'final-database-51935.firebasestorage.app'
  });
}

const db = admin.firestore();

async function removeAllDemoImages() {
  try {
    console.log('🧹 Removing all demo images from meals and exercises...\n');
    
    // Remove images from nutrition programs
    console.log('📋 Cleaning nutrition programs...');
    const nutritionSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get();
    
    let mealsCleaned = 0;
    for (const doc of nutritionSnapshot.docs) {
      const program = doc.data();
      console.log(`\n  Processing: ${program.title}`);
      
      if (program.meals && program.meals.length > 0) {
        const cleanedMeals = program.meals.map(meal => {
          const cleaned = { ...meal };
          
          // Remove all image/video fields
          if (cleaned.imageUrl) {
            delete cleaned.imageUrl;
            delete cleaned.imageName;
            console.log(`    🧹 Removed image from: ${meal.name}`);
            mealsCleaned++;
          }
          if (cleaned.videoUrl) delete cleaned.videoUrl;
          if (cleaned.instructions) delete cleaned.instructions;
          
          return cleaned;
        });
        
        await doc.ref.update({ meals: cleanedMeals });
        console.log(`  ✅ Saved: ${program.title}`);
      }
    }
    
    // Remove images from workout programs
    console.log('\n\n📋 Cleaning workout programs...');
    const workoutSnapshot = await db.collection('programs')
      .where('type', '==', 'workout')
      .get();
    
    let exercisesCleaned = 0;
    for (const doc of workoutSnapshot.docs) {
      const program = doc.data();
      console.log(`\n  Processing: ${program.title}`);
      
      let updated = false;
      const updates = {};
      
      // Clean weeklySchedule exercises
      if (program.weeklySchedule) {
        const newSchedule = { ...program.weeklySchedule };
        
        for (const [day, dayData] of Object.entries(newSchedule)) {
          if (dayData.exercises && dayData.exercises.length > 0) {
            const cleanedExercises = dayData.exercises.map(ex => {
              const cleaned = { ...ex };
              
              if (cleaned.imageUrl) {
                delete cleaned.imageUrl;
                delete cleaned.videoUrl;
                delete cleaned.instructions;
                console.log(`    🧹 Removed media from: ${ex.name}`);
                exercisesCleaned++;
              }
              
              return cleaned;
            });
            
            newSchedule[day] = {
              ...dayData,
              exercises: cleanedExercises
            };
            updated = true;
          }
        }
        
        if (updated) {
          updates.weeklySchedule = newSchedule;
        }
      }
      
      // Clean direct exercises
      if (program.exercises && program.exercises.length > 0) {
        const cleanedExercises = program.exercises.map(ex => {
          const cleaned = { ...ex };
          
          if (cleaned.imageUrl) {
            delete cleaned.imageUrl;
            delete cleaned.videoUrl;
            delete cleaned.instructions;
            console.log(`    🧹 Removed media from: ${ex.name}`);
            exercisesCleaned++;
          }
          
          return cleaned;
        });
        
        updates.exercises = cleanedExercises;
        updated = true;
      }
      
      if (updated) {
        await doc.ref.update(updates);
        console.log(`  ✅ Saved: ${program.title}`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Complete!');
    console.log(`🧹 Cleaned ${mealsCleaned} meals`);
    console.log(`🧹 Cleaned ${exercisesCleaned} exercises`);
    console.log('📌 All demo images and videos have been removed');
    console.log('📌 Only user-uploaded content will be shown now');
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

removeAllDemoImages();
