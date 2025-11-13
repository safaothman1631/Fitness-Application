const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Firebase Configuration...\n');

// Show what we have in env
console.log('📋 Environment Variables:');
console.log('NEXT_PUBLIC_FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 20) + '...');
console.log('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log('NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log('');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('✅ Firebase Admin SDK initialized\n');
} catch (error) {
  console.error('❌ Failed:', error.message);
  process.exit(1);
}

async function checkConfig() {
  try {
    // Get project config from Admin SDK
    const app = admin.app();
    const projectId = app.options.projectId;
    
    console.log('📊 Admin SDK Config:');
    console.log('Project ID:', projectId);
    console.log('Service Account:', serviceAccount.clientEmail);
    console.log('');
    
    // Try to get a user to verify Admin SDK works
    const user = await admin.auth().getUserByEmail('superadmin@fitpro.com');
    console.log('✅ Admin SDK is working correctly');
    console.log('   Can access user:', user.email);
    console.log('');
    
    console.log('⚠️  ISSUE: Client-side API Key');
    console.log('');
    console.log('Your API key needs to be unrestricted or have these APIs allowed:');
    console.log('  1. Identity Toolkit API');
    console.log('  2. Token Service API');
    console.log('');
    console.log('🔧 TO FIX:');
    console.log('1. Go to: https://console.cloud.google.com/apis/credentials?project=' + projectId);
    console.log('2. Click on "Browser key" (API key: AIzaSyBUXCa...)');
    console.log('3. Under "API restrictions": Select "Don\'t restrict key"');
    console.log('4. Click SAVE');
    console.log('5. Wait 2-5 minutes for changes to propagate');
    console.log('');
    console.log('OR');
    console.log('');
    console.log('1. Create a NEW Web App in Firebase Console');
    console.log('2. Copy the NEW API key');
    console.log('3. Update .env.local with the new key');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

checkConfig();
