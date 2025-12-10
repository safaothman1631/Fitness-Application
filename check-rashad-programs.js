const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkRashadAliPrograms() {
  console.log('🔍 Checking programs for Rashad Ali (user_rashad_123)...\n');
  
  // Get all programs
  const programsSnapshot = await db.collection('programs').get();
  
  const rashadPrograms = programsSnapshot.docs.filter(doc => {
    const data = doc.data();
    return data.assignedUsers && data.assignedUsers.includes('user_rashad_123');
  });
  
  console.log(`📊 Found ${rashadPrograms.length} programs assigned to Rashad Ali\n`);
  
  rashadPrograms.forEach(doc => {
    const data = doc.data();
    console.log(`${'='.repeat(60)}`);
    console.log(`Program: ${data.title}`);
    console.log(`Type: ${data.type}`);
    console.log(`Difficulty: ${data.difficulty}`);
    
    if (data.type === 'nutrition') {
      console.log(`\n🍽️  Nutrition Program:`);
      console.log(`   Calories: ${data.calories}`);
      console.log(`   Protein: ${data.protein}`);
      console.log(`   Carbs: ${data.carbs}`);
      console.log(`   Fats: ${data.fats}`);
      console.log(`   Duration: ${data.duration}`);
      console.log(`\n   Meals (${data.meals?.length || 0}):`);
      if (data.meals && data.meals.length > 0) {
        data.meals.forEach((meal, idx) => {
          console.log(`   ${idx + 1}. ${meal.name} (${meal.category})`);
          console.log(`      - Calories: ${meal.calories}`);
          console.log(`      - Protein: ${meal.protein}g`);
          console.log(`      - Carbs: ${meal.carbs}g`);
          console.log(`      - Fats: ${meal.fats}g`);
          if (meal.ingredients) {
            console.log(`      - Ingredients: ${meal.ingredients.split('\n').slice(0, 2).join(', ')}...`);
          }
        });
      } else {
        console.log('   ⚠️  No meals in this program!');
      }
    }
    
    if (data.type === 'workout') {
      console.log(`\n💪 Workout Program:`);
      console.log(`   Target Muscles: ${data.targetMuscles}`);
      console.log(`   Duration: ${data.duration}`);
      
      if (data.weeklySchedule) {
        const days = Object.keys(data.weeklySchedule);
        console.log(`\n   Weekly Schedule (${days.length} days):`);
        days.forEach(day => {
          const dayData = data.weeklySchedule[day];
          console.log(`   - ${day}: ${dayData.title || 'Workout'} (${dayData.exercises?.length || 0} exercises)`);
        });
      }
    }
    
    console.log(`\nCreated: ${data.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}`);
    console.log(`${'='.repeat(60)}\n`);
  });
  
  // Summary
  const nutritionPrograms = rashadPrograms.filter(doc => doc.data().type === 'nutrition');
  const workoutPrograms = rashadPrograms.filter(doc => doc.data().type === 'workout');
  
  console.log('✨ Summary for Rashad Ali:');
  console.log(`   Total Programs: ${rashadPrograms.length}`);
  console.log(`   Nutrition Programs: ${nutritionPrograms.length}`);
  console.log(`   Workout Programs: ${workoutPrograms.length}`);
  
  if (nutritionPrograms.length > 0) {
    console.log('\n✅ Yes, Rashad Ali has nutrition programs assigned!');
    nutritionPrograms.forEach(doc => {
      const data = doc.data();
      console.log(`   - "${data.title}" with ${data.meals?.length || 0} meals`);
    });
  } else {
    console.log('\n❌ No nutrition programs assigned to Rashad Ali');
  }
  
  process.exit(0);
}

checkRashadAliPrograms().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
