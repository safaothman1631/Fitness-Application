const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkProgramsInDetail() {
  console.log('🔍 Checking all programs in database...\n');
  
  const programsSnapshot = await db.collection('programs').get();
  console.log(`📚 Total Programs: ${programsSnapshot.size}\n`);
  
  programsSnapshot.docs.forEach((doc, index) => {
    const data = doc.data();
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Program ${index + 1}: ${doc.id}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Title: ${data.title}`);
    console.log(`Type: ${data.type}`);
    console.log(`Difficulty: ${data.difficulty || 'N/A'}`);
    console.log(`Assigned Users: ${data.assignedUsers?.length || 0} users`);
    if (data.assignedUsers) {
      data.assignedUsers.forEach(userId => {
        console.log(`  - ${userId}`);
      });
    }
    
    if (data.type === 'nutrition') {
      console.log(`\n🍽️  Meals: ${data.meals?.length || 0}`);
      if (data.meals && data.meals.length > 0) {
        data.meals.forEach((meal, idx) => {
          console.log(`  ${idx + 1}. ${meal.name || meal.category}`);
          console.log(`     Category: ${meal.category}`);
          console.log(`     Calories: ${meal.calories}`);
          console.log(`     Protein: ${meal.protein}g`);
          if (meal.ingredients) {
            const ingLines = meal.ingredients.split('\n').slice(0, 2);
            console.log(`     Ingredients: ${ingLines.join(', ')}...`);
          }
        });
      } else {
        console.log('  ⚠️  No meals found in this program!');
      }
      
      console.log(`\nNutrition Info:`);
      console.log(`  Calories: ${data.calories || 'N/A'}`);
      console.log(`  Protein: ${data.protein || 'N/A'}`);
      console.log(`  Carbs: ${data.carbs || 'N/A'}`);
      console.log(`  Fats: ${data.fats || 'N/A'}`);
    }
    
    if (data.type === 'workout') {
      console.log(`\n💪 Target Muscles: ${data.targetMuscles || 'N/A'}`);
      
      if (data.weeklySchedule) {
        const days = Object.keys(data.weeklySchedule);
        console.log(`\n📅 Weekly Schedule: ${days.length} days`);
        days.forEach(day => {
          const dayData = data.weeklySchedule[day];
          console.log(`\n  ${day}: ${dayData.title || 'Workout'}`);
          console.log(`    Exercises: ${dayData.exercises?.length || 0}`);
          if (dayData.exercises && dayData.exercises.length > 0) {
            dayData.exercises.slice(0, 3).forEach((ex, idx) => {
              console.log(`      ${idx + 1}. ${ex.name} - ${ex.sets}x${ex.reps}${ex.weight ? ` @ ${ex.weight}kg` : ''}`);
            });
            if (dayData.exercises.length > 3) {
              console.log(`      ... and ${dayData.exercises.length - 3} more exercises`);
            }
          }
        });
      } else if (data.exercises) {
        console.log(`\n🏋️  Exercises: ${data.exercises.length}`);
        data.exercises.slice(0, 3).forEach((ex, idx) => {
          console.log(`  ${idx + 1}. ${ex.name || ex.title} - ${ex.sets}x${ex.reps}`);
        });
        if (data.exercises.length > 3) {
          console.log(`  ... and ${data.exercises.length - 3} more exercises`);
        }
      } else {
        console.log('  ⚠️  No exercises or schedule found!');
      }
    }
    
    console.log(`\nCreated: ${data.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}`);
    console.log(`Duration: ${data.duration || 'N/A'}`);
  });
  
  console.log(`\n${'='.repeat(60)}`);
  console.log('\n✨ Detailed check complete!\n');
  
  // Summary
  const nutritionPrograms = programsSnapshot.docs.filter(doc => doc.data().type === 'nutrition');
  const workoutPrograms = programsSnapshot.docs.filter(doc => doc.data().type === 'workout');
  const nutritionWithMeals = nutritionPrograms.filter(doc => doc.data().meals?.length > 0);
  const workoutWithExercises = workoutPrograms.filter(doc => 
    doc.data().weeklySchedule || doc.data().exercises?.length > 0
  );
  
  console.log('📊 Summary:');
  console.log(`  Total Programs: ${programsSnapshot.size}`);
  console.log(`  Nutrition Programs: ${nutritionPrograms.length} (${nutritionWithMeals.length} with meals)`);
  console.log(`  Workout Programs: ${workoutPrograms.length} (${workoutWithExercises.length} with exercises)`);
  
  process.exit(0);
}

checkProgramsInDetail().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
