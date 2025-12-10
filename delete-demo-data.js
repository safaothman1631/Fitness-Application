const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function deleteAllDemoData() {
  console.log('🗑️  Deleting all demo data...\n');
  
  // Delete all meal_plans (direct meal plans)
  console.log('🍽️  Deleting meal_plans collection...');
  const mealsSnapshot = await db.collection('meal_plans').get();
  const mealDeletePromises = mealsSnapshot.docs.map(doc => {
    console.log(`   Deleting: ${doc.data().traineeName} - ${doc.data().mealType}`);
    return doc.ref.delete();
  });
  await Promise.all(mealDeletePromises);
  console.log(`✅ Deleted ${mealsSnapshot.size} meal plans\n`);
  
  // Delete all workout_plans (direct workout plans)
  console.log('💪 Deleting workout_plans collection...');
  const workoutsSnapshot = await db.collection('workout_plans').get();
  const workoutDeletePromises = workoutsSnapshot.docs.map(doc => {
    console.log(`   Deleting: ${doc.data().traineeName} - ${doc.data().workoutType}`);
    return doc.ref.delete();
  });
  await Promise.all(workoutDeletePromises);
  console.log(`✅ Deleted ${workoutsSnapshot.size} workout plans\n`);
  
  console.log('✨ All demo data deleted successfully!');
  console.log('📊 Remaining data:');
  console.log('   - Programs created by superadmin are kept');
  console.log('   - Users data is kept');
  console.log('   - All other data is kept');
}

async function verifyDeletion() {
  console.log('\n🔍 Verifying deletion...\n');
  
  const mealsSnapshot = await db.collection('meal_plans').get();
  console.log(`🍽️  Meal Plans remaining: ${mealsSnapshot.size}`);
  
  const workoutsSnapshot = await db.collection('workout_plans').get();
  console.log(`💪 Workout Plans remaining: ${workoutsSnapshot.size}`);
  
  const programsSnapshot = await db.collection('programs').get();
  console.log(`📚 Programs remaining: ${programsSnapshot.size}`);
  
  if (mealsSnapshot.size === 0 && workoutsSnapshot.size === 0) {
    console.log('\n✅ Deletion verified - all demo data removed!');
  } else {
    console.log('\n⚠️  Warning: Some data still exists');
  }
}

async function main() {
  try {
    await deleteAllDemoData();
    await verifyDeletion();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
