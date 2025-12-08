const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('🔄 Starting Daily Firebase Backup...\n');

// Initialize Firebase Admin
let serviceAccount;

// Try to load from environment variables first
if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
  serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  console.log('✅ Using Firebase credentials from .env.local\n');
} else {
  // Fallback to service account JSON file
  const serviceAccountPath = 'C:\\A\\final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json';
  
  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log('✅ Using Firebase credentials from service account file\n');
  } else {
    console.error('❌ No Firebase credentials found!');
    console.error('   Service account file not found at:', serviceAccountPath);
    console.error('   See BACKUP_CREDENTIALS_SETUP.md for details');
    process.exit(1);
  }
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id || serviceAccount.projectId}.firebasestorage.app`
    });
    console.log(`📊 Connected to project: ${serviceAccount.project_id || serviceAccount.projectId}\n`);
  } catch (error) {
    console.error('❌ Failed to initialize Firebase Admin:', error.message);
    process.exit(1);
  }
}

const db = admin.firestore();

// Initialize Storage (optional - for cloud backups)
let storage = null;
try {
  const projectId = serviceAccount.project_id || serviceAccount.projectId;
  storage = new Storage({
    projectId: projectId,
    credentials: serviceAccount
  });
} catch (error) {
  console.log('⚠️  Cloud Storage not available, backups will be local only\n');
}

// Get current date for backup naming
const getBackupDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}_${hours}-${minutes}`;
};

// Collections to backup
const COLLECTIONS_TO_BACKUP = [
  'users',
  'trainers',
  'physiotherapists',
  'patients',
  'physio-requests',
  'appointments',
  'workouts',
  'exercises',
  'workout-programs',
  'nutrition-programs',
  'access-keys',
  'settings',
  'notifications',
  'community-posts',
  'payments',
  'subscriptions',
  'workout-logs',
  'meal-logs',
  'progress',
  'videos',
  'system-logs'
];

// Backup a single collection
async function backupCollection(collectionName) {
  try {
    console.log(`📦 Backing up collection: ${collectionName}...`);
    
    const snapshot = await db.collection(collectionName).get();
    const documents = [];
    
    snapshot.forEach(doc => {
      documents.push({
        id: doc.id,
        data: doc.data()
      });
    });
    
    console.log(`   ✅ ${documents.length} documents backed up from ${collectionName}`);
    return { collection: collectionName, documents, count: documents.length };
    
  } catch (error) {
    console.error(`   ❌ Error backing up ${collectionName}:`, error.message);
    return { collection: collectionName, documents: [], count: 0, error: error.message };
  }
}

// Create backup
async function createBackup() {
  const backupDate = getBackupDate();
  const backupFileName = `backup_${backupDate}.json`;
  const backupDir = path.join(__dirname, 'backups');
  const backupPath = path.join(backupDir, backupFileName);
  
  // Create backups directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  console.log(`📅 Backup Date: ${backupDate}`);
  console.log(`📁 Backup File: ${backupFileName}\n`);
  
  const backup = {
    timestamp: new Date().toISOString(),
    date: backupDate,
    projectId: process.env.FIREBASE_PROJECT_ID,
    collections: []
  };
  
  // Backup all collections
  for (const collectionName of COLLECTIONS_TO_BACKUP) {
    const collectionBackup = await backupCollection(collectionName);
    backup.collections.push(collectionBackup);
  }
  
  // Calculate totals
  const totalDocuments = backup.collections.reduce((sum, col) => sum + col.count, 0);
  const successfulCollections = backup.collections.filter(col => !col.error).length;
  
  backup.summary = {
    totalCollections: COLLECTIONS_TO_BACKUP.length,
    successfulCollections,
    failedCollections: COLLECTIONS_TO_BACKUP.length - successfulCollections,
    totalDocuments
  };
  
  // Save to local file
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
  const fileSizeMB = (fs.statSync(backupPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n💾 Local backup saved: ${backupPath}`);
  console.log(`   File size: ${fileSizeMB} MB`);
  
  // Upload to Firebase Storage (if available)
  if (storage) {
    try {
      const projectId = serviceAccount.project_id || serviceAccount.projectId;
      const bucket = storage.bucket(`${projectId}.firebasestorage.app`);
      const destination = `backups/${backupFileName}`;
      
      await bucket.upload(backupPath, {
        destination,
        metadata: {
          contentType: 'application/json',
          metadata: {
            backupDate,
            totalDocuments: totalDocuments.toString()
          }
        }
      });
      
      console.log(`☁️  Cloud backup saved: gs://${bucket.name}/${destination}`);
    } catch (error) {
      console.error(`⚠️  Cloud upload failed: ${error.message}`);
      console.log('   💾 Local backup is still saved');
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 BACKUP SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Collections: ${backup.summary.totalCollections}`);
  console.log(`✅ Successful: ${backup.summary.successfulCollections}`);
  console.log(`❌ Failed: ${backup.summary.failedCollections}`);
  console.log(`📄 Total Documents: ${backup.summary.totalDocuments}`);
  console.log('='.repeat(50));
  
  // Keep only last 7 days of local backups
  cleanOldBackups(backupDir);
  
  return backup;
}

// Clean old local backups (keep last 7 days)
function cleanOldBackups(backupDir) {
  try {
    const files = fs.readdirSync(backupDir);
    const backupFiles = files.filter(f => f.startsWith('backup_') && f.endsWith('.json'));
    
    if (backupFiles.length > 7) {
      // Sort by date (oldest first)
      backupFiles.sort();
      
      // Delete old backups
      const toDelete = backupFiles.slice(0, backupFiles.length - 7);
      toDelete.forEach(file => {
        const filePath = path.join(backupDir, file);
        fs.unlinkSync(filePath);
        console.log(`🗑️  Deleted old backup: ${file}`);
      });
    }
  } catch (error) {
    console.error('⚠️  Error cleaning old backups:', error.message);
  }
}

// Run backup
createBackup()
  .then(backup => {
    console.log('\n✅ Backup completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Backup failed:', error);
    process.exit(1);
  });
