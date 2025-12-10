const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkUserUploadedData() {
  try {
    console.log('🔍 Checking what data users have uploaded...\n');
    
    // Get all users
    const usersSnapshot = await db.collection('users').get();
    console.log(`Found ${usersSnapshot.size} users\n`);
    
    // Check each collection for user-created data
    const collections = [
      'meal_plans',
      'workout_plans', 
      'exercises',
      'nutrition_plans',
      'user_workouts',
      'user_meals',
      'personal_workouts',
      'personal_meals'
    ];
    
    console.log('='.repeat(60));
    console.log('📊 CHECKING ALL COLLECTIONS FOR USER DATA');
    console.log('='.repeat(60));
    
    for (const collectionName of collections) {
      try {
        const snapshot = await db.collection(collectionName).get();
        console.log(`\n📁 Collection: ${collectionName}`);
        console.log(`   Documents: ${snapshot.size}`);
        
        if (snapshot.size > 0) {
          snapshot.forEach(doc => {
            const data = doc.data();
            console.log(`\n   📄 Document ID: ${doc.id}`);
            console.log(`      Created by: ${data.createdBy || data.userId || data.trainerId || 'Unknown'}`);
            console.log(`      Title/Name: ${data.title || data.name || data.mealType || data.workoutType || 'N/A'}`);
            console.log(`      Type: ${data.type || 'N/A'}`);
            if (data.imageUrl) console.log(`      📷 Has custom image: ${data.imageUrl.substring(0, 50)}...`);
            if (data.videoUrl) console.log(`      🎬 Has custom video: ${data.videoUrl.substring(0, 50)}...`);
            if (data.exercises) console.log(`      💪 Exercises: ${data.exercises.length}`);
            if (data.meals) console.log(`      🍽️  Meals: ${data.meals.length}`);
            if (data.foods) console.log(`      🥗 Foods: ${data.foods.length}`);
          });
        } else {
          console.log('      ❌ Empty collection');
        }
      } catch (error) {
        console.log(`   ⚠️  Collection doesn't exist or error: ${error.message}`);
      }
    }
    
    // Check programs with assignedUsers
    console.log('\n\n' + '='.repeat(60));
    console.log('📋 PROGRAMS ASSIGNED TO USERS');
    console.log('='.repeat(60));
    
    const programsSnapshot = await db.collection('programs').get();
    
    programsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.assignedUsers && data.assignedUsers.length > 0) {
        console.log(`\n✨ ${data.title} (${data.type})`);
        console.log(`   Created by: ${data.createdBy || 'superadmin'}`);
        console.log(`   Assigned to ${data.assignedUsers.length} users:`);
        data.assignedUsers.forEach(userId => {
          console.log(`      - ${userId}`);
        });
        
        // Show what's inside
        if (data.meals) {
          console.log(`   📦 Contains ${data.meals.length} meals:`);
          data.meals.forEach(meal => {
            console.log(`      • ${meal.name} - ${meal.calories}cal`);
            if (meal.imageUrl) console.log(`        📷 Custom image: YES`);
            if (meal.videoUrl) console.log(`        🎬 Custom video: YES`);
          });
        }
        
        if (data.weeklySchedule) {
          const days = Object.keys(data.weeklySchedule);
          console.log(`   📦 Contains ${days.length} workout days:`);
          days.forEach(day => {
            const dayData = data.weeklySchedule[day];
            if (dayData.exercises && dayData.exercises.length > 0) {
              console.log(`      • ${day}: ${dayData.exercises.length} exercises`);
              dayData.exercises.forEach(ex => {
                console.log(`        - ${ex.name}`);
                if (ex.imageUrl) console.log(`          📷 Custom image: YES`);
                if (ex.videoUrl) console.log(`          🎬 Custom video: YES`);
              });
            }
          });
        }
      }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Check complete!');
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUserUploadedData();
