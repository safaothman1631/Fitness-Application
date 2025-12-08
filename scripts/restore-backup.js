const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🔄 Starting Database Restore...\n');

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function restoreCollection(collectionName, documents) {
  console.log(`📦 Restoring collection: ${collectionName}...`);
  
  let restoredCount = 0;
  const batchSize = 500; // Firestore batch limit
  
  // Process in batches
  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = db.batch();
    const batchDocs = documents.slice(i, i + batchSize);
    
    batchDocs.forEach(doc => {
      const ref = db.collection(collectionName).doc(doc.id);
      batch.set(ref, doc.data, { merge: true }); // merge: true to avoid overwriting
    });
    
    try {
      await batch.commit();
      restoredCount += batchDocs.length;
      console.log(`   📝 Progress: ${restoredCount}/${documents.length} documents`);
    } catch (error) {
      console.error(`   ❌ Batch error:`, error.message);
    }
  }
  
  console.log(`   ✅ Restored ${restoredCount} documents to ${collectionName}\n`);
  return restoredCount;
}

async function restoreBackup(backupFilePath, options = {}) {
  try {
    // Check if file exists
    if (!fs.existsSync(backupFilePath)) {
      console.error(`❌ Backup file not found: ${backupFilePath}`);
      process.exit(1);
    }
    
    // Read backup file
    console.log(`📂 Reading backup file: ${backupFilePath}\n`);
    const backupData = JSON.parse(fs.readFileSync(backupFilePath, 'utf8'));
    
    // Display backup info
    console.log('📊 Backup Information:');
    console.log(`   Date: ${backupData.date}`);
    console.log(`   Project: ${backupData.projectId}`);
    console.log(`   Collections: ${backupData.collections.length}`);
    console.log(`   Total Documents: ${backupData.summary?.totalDocuments || 'N/A'}\n`);
    
    // Confirm restore
    if (!options.skipConfirm) {
      console.log('⚠️  WARNING: This will restore/overwrite data in Firestore!');
      console.log('⚠️  Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    console.log('🚀 Starting restore process...\n');
    
    let totalRestored = 0;
    const results = [];
    
    // Restore each collection
    for (const collection of backupData.collections) {
      if (collection.error) {
        console.log(`⏭️  Skipping ${collection.collection} (had backup error)\n`);
        results.push({ collection: collection.collection, restored: 0, skipped: true });
        continue;
      }
      
      if (collection.documents.length === 0) {
        console.log(`⏭️  Skipping ${collection.collection} (empty)\n`);
        results.push({ collection: collection.collection, restored: 0, empty: true });
        continue;
      }
      
      const restored = await restoreCollection(collection.collection, collection.documents);
      totalRestored += restored;
      results.push({ collection: collection.collection, restored });
    }
    
    // Print summary
    console.log('='.repeat(50));
    console.log('📊 RESTORE SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Documents Restored: ${totalRestored}`);
    console.log(`Collections Processed: ${results.length}`);
    console.log('='.repeat(50));
    
    results.forEach(r => {
      if (r.skipped) {
        console.log(`⏭️  ${r.collection}: Skipped (backup error)`);
      } else if (r.empty) {
        console.log(`⏭️  ${r.collection}: Skipped (empty)`);
      } else {
        console.log(`✅ ${r.collection}: ${r.restored} documents`);
      }
    });
    
    console.log('='.repeat(50));
    console.log('\n✅ Restore completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Restore failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Get backup file from command line
const backupFile = process.argv[2];

if (!backupFile) {
  console.error('❌ Usage: node restore-backup.js <backup-file.json>');
  console.error('\nExample:');
  console.error('   node scripts/restore-backup.js backups/backup_2025-12-08_03-00.json');
  console.error('\nAvailable backups:');
  
  const backupsDir = path.join(__dirname, '..', 'backups');
  if (fs.existsSync(backupsDir)) {
    const files = fs.readdirSync(backupsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
      .slice(0, 5);
    
    files.forEach(f => console.error(`   - backups/${f}`));
  }
  
  process.exit(1);
}

// Run restore
restoreBackup(backupFile);
