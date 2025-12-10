const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'final-database-51935.firebasestorage.app'
  });
}

const bucket = admin.storage().bucket();

async function checkFirebaseStorage() {
  try {
    console.log('🔍 Checking Firebase Storage for meal images...\n');
    console.log('📦 Storage Bucket:', bucket.name);
    console.log('='.repeat(60));
    
    // Check meals/images folder
    const [mealFiles] = await bucket.getFiles({ prefix: 'meals/images/' });
    console.log(`\n📁 meals/images/ folder:`);
    console.log(`   Found ${mealFiles.length} files`);
    
    if (mealFiles.length > 0) {
      for (const file of mealFiles.slice(0, 10)) { // Show first 10
        console.log(`\n   📄 ${file.name}`);
        const [metadata] = await file.getMetadata();
        console.log(`      Size: ${(metadata.size / 1024).toFixed(2)} KB`);
        console.log(`      Type: ${metadata.contentType}`);
        console.log(`      Created: ${metadata.timeCreated}`);
      }
      if (mealFiles.length > 10) {
        console.log(`\n   ... and ${mealFiles.length - 10} more files`);
      }
    }
    
    // Check workouts/images folder
    const [workoutFiles] = await bucket.getFiles({ prefix: 'workouts/images/' });
    console.log(`\n\n📁 workouts/images/ folder:`);
    console.log(`   Found ${workoutFiles.length} files`);
    
    if (workoutFiles.length > 0) {
      for (const file of workoutFiles.slice(0, 10)) {
        console.log(`\n   📄 ${file.name}`);
        const [metadata] = await file.getMetadata();
        console.log(`      Size: ${(metadata.size / 1024).toFixed(2)} KB`);
        console.log(`      Type: ${metadata.contentType}`);
      }
      if (workoutFiles.length > 10) {
        console.log(`\n   ... and ${workoutFiles.length - 10} more files`);
      }
    }
    
    // Check root level
    const [rootFiles] = await bucket.getFiles({ maxResults: 20 });
    console.log(`\n\n📁 Root level (first 20 files):`);
    console.log(`   Total files: ${rootFiles.length}`);
    
    const folders = new Set();
    for (const file of rootFiles) {
      const parts = file.name.split('/');
      if (parts.length > 1) {
        folders.add(parts[0]);
      }
      if (rootFiles.indexOf(file) < 10) {
        console.log(`\n   📄 ${file.name}`);
      }
    }
    
    console.log(`\n\n📂 Available folders:`);
    folders.forEach(folder => {
      console.log(`   - ${folder}/`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Storage check complete!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('\nNote: Make sure storageBucket is correctly configured in firebase-admin initialization');
    process.exit(1);
  }
}

checkFirebaseStorage();
