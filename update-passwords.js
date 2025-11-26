const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Updating All User Passwords...\n');

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
  console.error('❌ Failed:', error.message);
  process.exit(1);
}

const auth = admin.auth();

// New unified password
const NEW_PASSWORD = '123456';

const users = [
  'superadmin@fitpro.com',
  'newuser@fitpro.com',
  'miduser@fitpro.com',
  'nosubuser@fitpro.com'
];

async function updatePasswords() {
  console.log(`🔑 Setting all passwords to: ${NEW_PASSWORD}\n`);

  for (const email of users) {
    try {
      const userRecord = await auth.getUserByEmail(email);
      
      await auth.updateUser(userRecord.uid, {
        password: NEW_PASSWORD
      });
      
      console.log(`✅ Updated password for: ${email}`);
    } catch (error) {
      console.error(`❌ Error updating ${email}:`, error.message);
    }
  }

  console.log('\n🎉 All passwords updated!\n');
  console.log('═══════════════════════════════════════════════');
  console.log('📋 NEW LOGIN CREDENTIALS:\n');
  console.log('All users now use password: 123456\n');
  console.log('1. superadmin@fitpro.com / 123456');
  console.log('2. newuser@fitpro.com / 123456');
  console.log('3. miduser@fitpro.com / 123456');
  console.log('4. nosubuser@fitpro.com / 123456');
  console.log('═══════════════════════════════════════════════');

  process.exit(0);
}

updatePasswords();
