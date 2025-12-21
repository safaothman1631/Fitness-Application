const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  })
});

const db = admin.firestore();

async function cleanDuplicateLogs() {
  try {
    console.log('🧹 Cleaning duplicate activity logs...\n');
    
    // Get all activity logs
    const logsSnapshot = await db.collection('activity-logs').get();
    
    console.log(`📊 Found ${logsSnapshot.size} total activity logs`);
    
    // Group by unique key (type + targetUserId + amount + timestamp day)
    const logsByKey = new Map();
    const duplicates = [];
    
    logsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const timestamp = data.timestamp?.toDate?.() || new Date(data.timestamp);
      const dateKey = timestamp.toISOString().split('T')[0]; // Just the date
      
      const key = `${data.type}_${data.targetUserId}_${data.amount}_${dateKey}`;
      
      if (logsByKey.has(key)) {
        // This is a duplicate
        duplicates.push({ id: doc.id, data });
      } else {
        logsByKey.set(key, { id: doc.id, data });
      }
    });
    
    console.log(`\n🔍 Found ${duplicates.length} duplicate logs\n`);
    
    if (duplicates.length > 0) {
      console.log('Duplicates to remove:');
      duplicates.forEach(dup => {
        console.log(`   ❌ ${dup.data.description}`);
      });
      
      // Delete duplicates
      console.log('\n🗑️  Deleting duplicates...\n');
      const batch = db.batch();
      duplicates.forEach(dup => {
        batch.delete(db.collection('activity-logs').doc(dup.id));
      });
      
      await batch.commit();
      console.log(`✅ Deleted ${duplicates.length} duplicate logs`);
    } else {
      console.log('✅ No duplicates found!');
    }
    
    // Show final count
    const finalSnapshot = await db.collection('activity-logs').get();
    console.log(`\n📊 Final count: ${finalSnapshot.size} unique activity logs\n`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

cleanDuplicateLogs();
