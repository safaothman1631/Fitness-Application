const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkData() {
  console.log('🔍 Checking existing data in Firebase...\n');
  
  // Check users
  const usersSnapshot = await db.collection('users').limit(10).get();
  console.log(`📊 Users collection: ${usersSnapshot.size} documents`);
  usersSnapshot.docs.forEach(doc => {
    const data = doc.data();
    console.log(`   - ${doc.id}: ${data.name || data.email} (${data.role})`);
  });
  
  console.log('\n');
  
  // Check meal_plans
  const mealsSnapshot = await db.collection('meal_plans').get();
  console.log(`🍽️  Meal Plans collection: ${mealsSnapshot.size} documents`);
  
  // Check workout_plans
  const workoutsSnapshot = await db.collection('workout_plans').get();
  console.log(`💪 Workout Plans collection: ${workoutsSnapshot.size} documents`);
  
  // Check if we have any trainees (users with role 'user' or 'trainee')
  const traineesSnapshot = await db.collection('users').where('role', '==', 'user').limit(5).get();
  console.log(`\n👤 Trainees found: ${traineesSnapshot.size}`);
  traineesSnapshot.docs.forEach(doc => {
    const data = doc.data();
    console.log(`   - ${doc.id}: ${data.name || data.email}`);
  });
  
  process.exit(0);
}

checkData().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
