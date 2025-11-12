const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Physio Requests in Database...\n');

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

async function checkRequests() {
  try {
    const snapshot = await db.collection('physio-requests').get();
    
    console.log(`📊 Total physio requests: ${snapshot.size}\n`);
    
    if (snapshot.size === 0) {
      console.log('❌ No physio requests found in database!');
      console.log('\nThis means either:');
      console.log('1. No requests have been created yet');
      console.log('2. The userId used when creating doesn\'t match what you\'re querying');
    } else {
      console.log('✅ Physio Requests found:\n');
      
      // Group by userId
      const byUser = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!byUser[data.userId]) {
          byUser[data.userId] = [];
        }
        byUser[data.userId].push({ id: doc.id, ...data });
      });
      
      // Display by user
      Object.keys(byUser).forEach((userId, index) => {
        const userRequests = byUser[userId];
        console.log(`User ${index + 1}: ${userId}`);
        console.log(`  Total requests: ${userRequests.length}`);
        userRequests.forEach((req, i) => {
          console.log(`  ${i + 1}. ${req.injuryType} (${req.status})`);
          console.log(`     Physio: ${req.physioName}`);
          console.log(`     Created: ${req.createdAt}`);
          console.log(`     ID: ${req.id}`);
        });
        console.log('');
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkRequests();
