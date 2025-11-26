const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🧪 Testing Firebase Read/Write Operations\n');

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function runTests() {
  try {
    console.log('1️⃣ Testing READ operations...\n');
    
    // Read users
    const usersSnapshot = await db.collection('users').limit(5).get();
    console.log(`✅ Read ${usersSnapshot.size} users`);
    
    // Read access keys
    const keysSnapshot = await db.collection('access-keys').limit(5).get();
    console.log(`✅ Read ${keysSnapshot.size} access keys`);
    
    // Read workouts
    const workoutsSnapshot = await db.collection('workouts').get();
    console.log(`✅ Read ${workoutsSnapshot.size} workouts`);
    
    console.log('\n2️⃣ Testing WRITE operations...\n');
    
    // Test creating a document
    const testDoc = await db.collection('_test').add({
      message: 'Test document',
      createdAt: new Date().toISOString(),
      test: true,
    });
    console.log(`✅ Created test document: ${testDoc.id}`);
    
    // Test reading back
    const readDoc = await db.collection('_test').doc(testDoc.id).get();
    console.log(`✅ Read back test document: ${readDoc.data().message}`);
    
    // Test updating
    await db.collection('_test').doc(testDoc.id).update({
      updated: true,
      updatedAt: new Date().toISOString(),
    });
    console.log(`✅ Updated test document`);
    
    // Test deleting
    await db.collection('_test').doc(testDoc.id).delete();
    console.log(`✅ Deleted test document`);
    
    console.log('\n3️⃣ Testing SUBCOLLECTION operations...\n');
    
    // Check if physiotherapists exist
    const physioSnapshot = await db.collection('physiotherapists').limit(1).get();
    
    if (physioSnapshot.size > 0) {
      const physioId = physioSnapshot.docs[0].id;
      console.log(`Found physiotherapist: ${physioId}`);
      
      // Test subcollection read
      const patientsSnapshot = await db
        .collection(`physiotherapists/${physioId}/patients`)
        .limit(5)
        .get();
      console.log(`✅ Read ${patientsSnapshot.size} patients for physiotherapist`);
      
      // Test subcollection write
      const testPatient = await db
        .collection(`physiotherapists/${physioId}/patients`)
        .add({
          name: 'Test Patient',
          createdAt: new Date().toISOString(),
          isTest: true,
        });
      console.log(`✅ Created test patient: ${testPatient.id}`);
      
      // Delete test patient
      await db
        .collection(`physiotherapists/${physioId}/patients`)
        .doc(testPatient.id)
        .delete();
      console.log(`✅ Deleted test patient`);
    } else {
      console.log('⚠️  No physiotherapists found, skipping subcollection test');
    }
    
    console.log('\n🎉 ALL TESTS PASSED!\n');
    console.log('✅ Firebase connection is working perfectly');
    console.log('✅ Read operations: OK');
    console.log('✅ Write operations: OK');
    console.log('✅ Update operations: OK');
    console.log('✅ Delete operations: OK');
    console.log('✅ Subcollection operations: OK');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

runTests();
