const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

const emails = [
  'superadmin@darinfitness.com',
  'admin@darinfitness.com',
  'trainer@darinfitness.com',
  'physio@darinfitness.com',
  'user@darinfitness.com',
  'owner@darinfitness.com',
  'patient@darinfitness.com',
  'superadmin@fitpro.com',
];

async function checkUsers() {
  console.log('🔍 Checking which users exist in Firebase Auth...\n');

  for (const email of emails) {
    try {
      const userRecord = await auth.getUserByEmail(email);
      console.log(`✅ ${email}`);
      console.log(`   UID: ${userRecord.uid}`);
      console.log(`   Created: ${new Date(userRecord.metadata.creationTime).toLocaleDateString()}`);
    } catch (error) {
      console.log(`❌ ${email} - NOT FOUND`);
    }
  }

  console.log('\n✅ Check complete!');
}

checkUsers()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
