const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

const users = [
  { email: 'superadmin@fitpro.com', password: '11111111' },
  { email: 'newuser@fitpro.com', password: '11111111' },
  { email: 'miduser@fitpro.com', password: '11111111' },
  { email: 'nosubuser@fitpro.com', password: '11111111' },
  { email: 'superadmin@darinfitness.com', password: '11111111' },
  { email: 'admin@darinfitness.com', password: '11111111' },
  { email: 'trainer@darinfitness.com', password: '11111111' },
  { email: 'physio@darinfitness.com', password: '11111111' },
  { email: 'user@darinfitness.com', password: '11111111' },
  { email: 'owner@darinfitness.com', password: '11111111' },
  { email: 'patient@darinfitness.com', password: '11111111' },
];

async function resetPasswords() {
  console.log('🔐 Resetting passwords for all test users...\n');

  for (const user of users) {
    try {
      // Get user by email
      const userRecord = await auth.getUserByEmail(user.email);
      
      // Update password
      await auth.updateUser(userRecord.uid, {
        password: user.password,
      });

      console.log(`✅ Password updated for: ${user.email}`);
      console.log(`   New password: ${user.password}\n`);
    } catch (error) {
      console.error(`❌ Error updating ${user.email}:`, error.message);
    }
  }

  console.log('\n✅ All passwords have been reset to: 11111111');
  console.log('\n📋 You can now login with:');
  console.log('   superadmin@fitpro.com / 11111111');
  console.log('   newuser@fitpro.com / 11111111');
  console.log('   miduser@fitpro.com / 11111111');
  console.log('   nosubuser@fitpro.com / 11111111');
}

resetPasswords()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
