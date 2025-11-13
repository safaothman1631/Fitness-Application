const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Testing Admin SDK Custom Token Authentication...\n');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('✅ Firebase Admin initialized\n');
} catch (error) {
  console.error('❌ Failed to initialize:', error.message);
  process.exit(1);
}

const auth = admin.auth();

async function createCustomToken() {
  try {
    // Get the superadmin user
    const user = await auth.getUserByEmail('superadmin@fitpro.com');
    console.log('✅ Found user:', user.email);
    console.log('   UID:', user.uid);
    console.log('   Disabled:', user.disabled);
    console.log('');

    // Create a custom token
    const customToken = await auth.createCustomToken(user.uid);
    console.log('✅ Custom token created successfully!');
    console.log('   Token:', customToken.substring(0, 50) + '...');
    console.log('');
    
    console.log('📋 This token can be used for authentication');
    console.log('   Use: signInWithCustomToken(auth, token)');
    console.log('');
    
    // Check if user is disabled
    if (user.disabled) {
      console.log('⚠️  WARNING: User account is disabled!');
      console.log('   Enable it in Firebase Console > Authentication > Users');
    } else {
      console.log('✅ User account is active');
    }
    
    console.log('\n💡 MAIN ISSUE: Email/Password authentication is not enabled or API key is restricted');
    console.log('   Follow steps in FIX_FIREBASE_AUTH_ERROR.md to resolve');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createCustomToken();
