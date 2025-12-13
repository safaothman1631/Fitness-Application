const admin = require('firebase-admin');
const { readFileSync } = require('fs');
const { join } = require('path');

// Initialize Firebase Admin
let serviceAccount;
try {
  const serviceAccountPath = join(__dirname, '..', 'final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} catch (error) {
  console.error('❌ Error reading service account file:', error.message);
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function cleanPhysiotherapistsCollection() {
  try {
    console.log('🧹 Cleaning physiotherapists collection...\n');
    
    const snapshot = await db.collection('physiotherapists').get();
    let deleted = 0;
    let kept = 0;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      
      // Delete if name is undefined/missing or email is N/A
      if (!data.name || data.name === 'undefined' || data.email === 'N/A' || !data.email) {
        console.log(`🗑️  Deleting: ${doc.id} (name: ${data.name}, email: ${data.email})`);
        await doc.ref.delete();
        deleted++;
      } else {
        console.log(`✅ Keeping: ${doc.id} - ${data.name}`);
        kept++;
      }
    }

    console.log('\n✅ Cleanup complete!');
    console.log(`   Deleted: ${deleted}`);
    console.log(`   Kept: ${kept}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

cleanPhysiotherapistsCollection();
