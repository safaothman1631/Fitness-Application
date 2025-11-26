const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking User Subscription Status...\n');

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

const db = admin.firestore();

async function checkSubscriptions() {
  const users = [
    { email: 'superadmin@fitpro.com', name: 'SuperAdmin' },
    { email: 'newuser@fitpro.com', name: 'New User' },
    { email: 'miduser@fitpro.com', name: 'Mid User' },
    { email: 'nosubuser@fitpro.com', name: 'No Sub User' }
  ];

  console.log('📊 Current Subscription Status:\n');

  for (const user of users) {
    try {
      const userRecord = await admin.auth().getUserByEmail(user.email);
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      
      if (userDoc.exists) {
        const data = userDoc.data();
        const subEnd = data.subscriptionEnd ? new Date(data.subscriptionEnd) : null;
        const now = new Date();
        const daysLeft = subEnd ? Math.ceil((subEnd - now) / (1000 * 60 * 60 * 24)) : 0;
        
        console.log(`👤 ${user.name} (${user.email})`);
        console.log(`   Role: ${data.role}`);
        console.log(`   Membership: ${data.membership}`);
        console.log(`   Status: ${data.subscriptionStatus}`);
        console.log(`   End Date: ${subEnd ? subEnd.toLocaleDateString() : 'N/A'}`);
        console.log(`   Days Left: ${daysLeft > 0 ? daysLeft : 'EXPIRED'}`);
        console.log('');
      }
    } catch (error) {
      console.error(`❌ Error checking ${user.email}:`, error.message);
    }
  }
  
  process.exit(0);
}

checkSubscriptions();
