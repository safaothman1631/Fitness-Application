const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Verifying Test User Login Credentials...\n');

// Service account configuration
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('✅ Firebase Admin initialized\n');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
  process.exit(1);
}

const auth = admin.auth();
const db = admin.firestore();

async function verifyUsers() {
  const testEmails = [
    'superadmin@fitpro.com',
    'newuser@fitpro.com',
    'miduser@fitpro.com',
    'nosubuser@fitpro.com'
  ];

  console.log('📋 Checking Firebase Authentication Users:\n');

  for (const email of testEmails) {
    try {
      // Check Auth
      const userRecord = await auth.getUserByEmail(email);
      console.log(`✅ Auth User: ${email}`);
      console.log(`   UID: ${userRecord.uid}`);
      
      // Check Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      if (userDoc.exists) {
        const data = userDoc.data();
        console.log(`   Name: ${data.name}`);
        console.log(`   Role: ${data.role}`);
        console.log(`   Membership: ${data.membership}`);
        console.log(`   Subscription: ${data.subscriptionStatus}`);
      } else {
        console.log('   ⚠️  User data not found in Firestore');
      }
      console.log('');
    } catch (error) {
      console.log(`❌ User ${email}: ${error.message}\n`);
    }
  }

  console.log('✅ Verification complete!\n');
  console.log('🔐 You can now login with these credentials at /giris\n');
  
  process.exit(0);
}

verifyUsers();
