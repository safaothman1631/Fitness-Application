const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Physiotherapists in Database...\n');

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

async function checkPhysiotherapists() {
  try {
    const snapshot = await db.collection('physiotherapists').get();
    
    console.log(`📊 Total physiotherapists: ${snapshot.size}\n`);
    
    if (snapshot.size === 0) {
      console.log('❌ No physiotherapists found in database!');
      console.log('\nRun this to create sample data:');
      console.log('  node create-sample-physiotherapists.js');
    } else {
      console.log('✅ Physiotherapists found:\n');
      snapshot.docs.forEach((doc, index) => {
        const data = doc.data();
        console.log(`${index + 1}. ${data.name}`);
        console.log(`   ID: ${doc.id}`);
        console.log(`   Specialization: ${data.specialization || 'N/A'}`);
        console.log(`   Email: ${data.email || 'N/A'}`);
        console.log(`   Active: ${data.active ? 'Yes' : 'No'}`);
        console.log('');
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkPhysiotherapists();
