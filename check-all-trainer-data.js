const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkData() {
  console.log('🔍 Checking all trainer-related data...\n');
  
  // Check meal_plans
  const mealsSnapshot = await db.collection('meal_plans').get();
  console.log(`🍽️  Direct Meal Plans: ${mealsSnapshot.size} documents`);
  mealsSnapshot.docs.slice(0, 3).forEach(doc => {
    const data = doc.data();
    console.log(`   - ${data.traineeName}: ${data.mealType} (${data.totalCalories} cal)`);
  });
  
  console.log('');
  
  // Check workout_plans
  const workoutsSnapshot = await db.collection('workout_plans').get();
  console.log(`💪 Direct Workout Plans: ${workoutsSnapshot.size} documents`);
  workoutsSnapshot.docs.slice(0, 3).forEach(doc => {
    const data = doc.data();
    console.log(`   - ${data.traineeName}: ${data.workoutType} (${data.difficulty})`);
  });
  
  console.log('');
  
  // Check programs
  const programsSnapshot = await db.collection('programs').get();
  console.log(`📚 Programs: ${programsSnapshot.size} documents`);
  
  const nutritionPrograms = programsSnapshot.docs.filter(doc => doc.data().type === 'nutrition');
  console.log(`\n🥗 Nutrition Programs: ${nutritionPrograms.length}`);
  nutritionPrograms.forEach(doc => {
    const data = doc.data();
    console.log(`   - "${data.title}"`);
    console.log(`     Assigned: ${data.assignedUsers?.join(', ') || 'None'}`);
    console.log(`     Meals: ${data.meals?.length || 0}`);
  });
  
  const workoutPrograms = programsSnapshot.docs.filter(doc => doc.data().type === 'workout');
  console.log(`\n🏋️  Workout Programs: ${workoutPrograms.length}`);
  workoutPrograms.forEach(doc => {
    const data = doc.data();
    console.log(`   - "${data.title}"`);
    console.log(`     Assigned: ${data.assignedUsers?.join(', ') || 'None'}`);
    console.log(`     Days: ${Object.keys(data.weeklySchedule || {}).length}`);
  });
  
  console.log('\n✨ Data check complete!');
  process.exit(0);
}

checkData().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
