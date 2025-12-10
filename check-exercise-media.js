const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkExerciseMedia() {
  try {
    const snapshot = await db.collection('programs').where('type', '==', 'workout').get();
    
    console.log('Total workout programs:', snapshot.size);
    console.log('\n' + '='.repeat(60));
    
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log('\n📋 Program:', data.title);
      console.log('👥 Assigned users:', data.assignedUsers?.length || 0);
      console.log('📝 Description:', data.description || 'N/A');
      
      if (data.weeklySchedule) {
        console.log('\n📅 Weekly Schedule:');
        Object.entries(data.weeklySchedule).forEach(([day, dayData]) => {
          console.log(`\n  🗓️  ${day}:`);
          console.log(`  Title: ${dayData.title || 'N/A'}`);
          console.log(`  Exercises: ${dayData.exercises?.length || 0}`);
          
          if (dayData.exercises?.length > 0) {
            dayData.exercises.forEach((ex, idx) => {
              console.log(`\n    ${idx + 1}. ${ex.name || ex.title || 'Unnamed'}`);
              console.log(`       Sets: ${ex.sets || 'N/A'}, Reps: ${ex.reps || 'N/A'}`);
              console.log(`       Video: ${ex.videoUrl || 'NONE'}`);
              console.log(`       Image: ${ex.imageUrl || 'NONE'}`);
              console.log(`       Instructions: ${ex.instructions || 'N/A'}`);
            });
          }
        });
      }
      
      if (data.exercises && data.exercises.length > 0) {
        console.log('\n💪 Direct Exercises:');
        data.exercises.forEach((ex, idx) => {
          console.log(`\n  ${idx + 1}. ${ex.name || ex.title || 'Unnamed'}`);
          console.log(`     Sets: ${ex.sets || 'N/A'}, Reps: ${ex.reps || 'N/A'}`);
          console.log(`     Video: ${ex.videoUrl || 'NONE'}`);
          console.log(`     Image: ${ex.imageUrl || 'NONE'}`);
          console.log(`     Instructions: ${ex.instructions || 'N/A'}`);
        });
      }
      
      console.log('\n' + '='.repeat(60));
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkExerciseMedia();
