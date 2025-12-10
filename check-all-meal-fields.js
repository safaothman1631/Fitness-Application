const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkAllMealFields() {
  try {
    console.log('🔍 Checking ALL fields in meal data...\n');
    
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'nutrition')
      .get();
    
    console.log(`Found ${programsSnapshot.size} nutrition programs\n`);
    console.log('='.repeat(80));
    
    programsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`\n📋 Program: ${data.title}`);
      console.log(`   ID: ${doc.id}`);
      console.log(`   Created by: ${data.createdBy || 'Unknown'}`);
      console.log(`   Assigned to: ${data.assignedUsers?.join(', ') || 'None'}`);
      
      if (data.meals && data.meals.length > 0) {
        console.log(`\n   🍽️  Meals (${data.meals.length}):`);
        
        data.meals.forEach((meal, idx) => {
          console.log(`\n   ${idx + 1}. ${meal.name || 'Unnamed'}`);
          console.log('      ────────────────────────────────────────');
          
          // Show ALL fields
          Object.keys(meal).forEach(key => {
            const value = meal[key];
            if (typeof value === 'string') {
              if (value.length > 100) {
                console.log(`      ${key}: ${value.substring(0, 100)}...`);
              } else {
                console.log(`      ${key}: ${value}`);
              }
            } else if (typeof value === 'number') {
              console.log(`      ${key}: ${value}`);
            } else if (Array.isArray(value)) {
              console.log(`      ${key}: [Array with ${value.length} items]`);
            } else if (typeof value === 'object' && value !== null) {
              console.log(`      ${key}: [Object]`);
            } else {
              console.log(`      ${key}: ${value}`);
            }
          });
          
          // Specifically check for image/video fields
          console.log('\n      📷 Media Fields:');
          console.log(`         imageUrl: ${meal.imageUrl || '❌ NOT SET'}`);
          console.log(`         videoUrl: ${meal.videoUrl || '❌ NOT SET'}`);
          console.log(`         image: ${meal.image || '❌ NOT SET'}`);
          console.log(`         video: ${meal.video || '❌ NOT SET'}`);
          console.log(`         images: ${meal.images || '❌ NOT SET'}`);
          console.log(`         videos: ${meal.videos || '❌ NOT SET'}`);
        });
      } else {
        console.log('   ❌ No meals in this program');
      }
      
      console.log('\n' + '='.repeat(80));
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkAllMealFields();
