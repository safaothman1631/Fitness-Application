/**
 * Script to refresh all video URLs in Firestore programs
 * This will update all expired video links with fresh signed URLs
 */

require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: "https://accounts.google.com/o/oauth2/auth",
      tokenUri: "https://oauth2.googleapis.com/token",
      authProviderX509CertUrl: "https://www.googleapis.com/oauth2/v1/certs",
      clientX509CertUrl: process.env.FIREBASE_CERT_URL,
    }),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
  });
}

const db = admin.firestore();
const storage = admin.storage();

// Cache for video paths - filename -> full path mapping
const videoPathCache = new Map();

async function buildVideoCache() {
  console.log('📦 Building video cache from Firebase Storage...\n');
  const bucket = storage.bucket();
  
  const [files] = await bucket.getFiles({ prefix: 'exercises/videos/' });
  
  files.forEach(file => {
    const fileName = file.name.split('/').pop();
    if (fileName && fileName.match(/\.(mp4|mov|avi|webm)$/i)) {
      // Store full path by filename
      if (!videoPathCache.has(fileName)) {
        videoPathCache.set(fileName, file.name);
      }
    }
  });
  
  console.log(`✅ Cached ${videoPathCache.size} unique video filenames\n`);
}

async function getVideoUrl(videoName) {
  const bucket = storage.bucket();
  
  // Clean the video name
  const cleanName = videoName.split('/').pop();
  
  // Check cache first
  const cachedPath = videoPathCache.get(cleanName);
  
  if (cachedPath) {
    try {
      const file = bucket.file(cachedPath);
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      });
      console.log(`         ✅ Found: ${cleanName}`);
      return url;
    } catch (err) {
      console.log(`         ❌ Error getting URL for: ${cleanName} - ${err.message}`);
      return null;
    }
  }
  
  console.log(`         ❌ Not in cache: ${cleanName}`);
  return null;
}

async function refreshAllVideoUrls() {
  try {
    console.log('🚀 Starting video URL refresh...\n');
    
    // Build video cache first
    await buildVideoCache();
    
    // Get all programs
    const programsSnapshot = await db.collection('programs').get();
    console.log(`📋 Found ${programsSnapshot.size} programs\n`);
    
    let totalPrograms = 0;
    let totalVideosUpdated = 0;
    let totalVideosFailed = 0;
    
    for (const programDoc of programsSnapshot.docs) {
      const programId = programDoc.id;
      const programData = programDoc.data();
      
      console.log(`\n📦 Processing program: ${programId}`);
      console.log(`   Name: ${programData.name || 'Unnamed'}`);
      
      if (!programData.weeklySchedule) {
        console.log(`   ⏭️  No weeklySchedule, skipping...`);
        continue;
      }
      
      totalPrograms++;
      let programUpdated = false;
      const updatedSchedule = { ...programData.weeklySchedule };
      
      // Process each day
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      
      for (const day of days) {
        const dayData = updatedSchedule[day];
        
        if (!dayData || !dayData.exercises || dayData.rest) {
          continue;
        }
        
        console.log(`\n   📅 ${day.toUpperCase()}: ${dayData.exercises.length} exercises`);
        
        // Process each exercise
        for (let i = 0; i < dayData.exercises.length; i++) {
          const exercise = dayData.exercises[i];
          
          if (!exercise.videos || exercise.videos.length === 0) {
            continue;
          }
          
          console.log(`      🏋️ Exercise: ${exercise.name}`);
          
          // Update each video
          for (let j = 0; j < exercise.videos.length; j++) {
            const video = exercise.videos[j];
            
            if (!video.name) {
              console.log(`         ⚠️  Video ${j + 1}: No name, skipping`);
              continue;
            }
            
            console.log(`         🎬 Video ${j + 1}: ${video.name}`);
            
            const newUrl = await getVideoUrl(video.name);
            
            if (newUrl) {
              updatedSchedule[day].exercises[i].videos[j].url = newUrl;
              totalVideosUpdated++;
              programUpdated = true;
            } else {
              totalVideosFailed++;
            }
          }
        }
      }
      
      // Update program if any videos were refreshed
      if (programUpdated) {
        await db.collection('programs').doc(programId).update({
          weeklySchedule: updatedSchedule,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`\n   ✅ Program updated!`);
      } else {
        console.log(`\n   ⏭️  No videos to update`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ REFRESH COMPLETE!');
    console.log('='.repeat(60));
    console.log(`📊 Programs processed: ${totalPrograms}`);
    console.log(`🎬 Videos updated: ${totalVideosUpdated}`);
    console.log(`❌ Videos failed: ${totalVideosFailed}`);
    console.log('='.repeat(60) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error);
    process.exit(1);
  }
}

// Run the script
refreshAllVideoUrls();
