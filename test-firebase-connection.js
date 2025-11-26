const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Testing Firebase Connection...\n');

// Service account configuration
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

console.log('📋 Configuration:');
console.log('  Project ID:', serviceAccount.projectId || '❌ MISSING');
console.log('  Client Email:', serviceAccount.clientEmail || '❌ MISSING');
console.log('  Private Key:', serviceAccount.privateKey ? '✅ Present' : '❌ MISSING');
console.log('');

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('✅ Firebase Admin initialized successfully\n');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
  process.exit(1);
}

// Test Firestore connection
async function testFirestore() {
  try {
    console.log('🔍 Testing Firestore collections:\n');

    // Test users collection
    const usersSnapshot = await admin.firestore().collection('users').limit(3).get();
    console.log(`✅ Users collection: ${usersSnapshot.size} documents found`);
    if (usersSnapshot.size > 0) {
      usersSnapshot.docs.forEach(doc => {
        const data = doc.data();
        console.log(`   - ${doc.id}: ${data.name || data.email || 'No name'}`);
      });
    }
    console.log('');

    // Test workouts collection
    const workoutsSnapshot = await admin.firestore().collection('workouts').limit(3).get();
    console.log(`✅ Workouts collection: ${workoutsSnapshot.size} documents found`);
    console.log('');

    // Test access-keys collection
    const keysSnapshot = await admin.firestore().collection('access-keys').limit(3).get();
    console.log(`✅ Access Keys collection: ${keysSnapshot.size} documents found`);
    console.log('');

    // Test physiotherapists collection
    const physioSnapshot = await admin.firestore().collection('physiotherapists').limit(3).get();
    console.log(`✅ Physiotherapists collection: ${physioSnapshot.size} documents found`);
    console.log('');

    console.log('🎉 All Firestore tests passed!\n');
    console.log('✅ Firebase is properly configured and connected');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Firestore test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

testFirestore();
