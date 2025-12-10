const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function addMediaToExercises() {
  try {
    console.log('🔄 Adding media (images, videos, instructions) to exercises...\n');
    
    // Sample exercise media data
    const exerciseMedia = {
      // Push-ups
      'push-ups': {
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
        instructions: 'Start in plank position. Lower body until chest nearly touches floor. Push back up. Keep core tight and body straight.'
      },
      'goblet squats': {
        imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=MeHQ3XJ5Ee4',
        instructions: 'Hold dumbbell at chest. Squat down keeping chest up. Push through heels to stand. Keep knees aligned with toes.'
      },
      'dumbbell rows': {
        imageUrl: 'https://images.unsplash.com/photo-1532384305128-54c7ac0d7139?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=XZr85SH0Y-U',
        instructions: 'Bend over at hips. Pull dumbbell to ribcage. Lower with control. Keep back flat and core engaged.'
      },
      'shoulder press': {
        imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
        instructions: 'Press dumbbells overhead from shoulders. Lower with control. Keep core tight and avoid arching back.'
      },
      'plank': {
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
        instructions: 'Hold body in straight line from head to heels. Engage core. Keep hips level. Breathe steadily. Hold for 30-60 seconds.'
      },
      'squats': {
        imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
        instructions: 'Stand with feet shoulder-width. Lower hips back and down. Keep chest up. Push through heels to stand.'
      },
      'deadlifts': {
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
        instructions: 'Hinge at hips with barbell close to shins. Lift by extending hips and knees. Keep back straight. Lower with control.'
      },
      'bench press': {
        imageUrl: 'https://images.unsplash.com/photo-1571388208497-71bedc66e932?w=800',
        videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
        instructions: 'Lie on bench. Lower bar to chest. Press up explosively. Keep feet flat and back slightly arched.'
      }
    };

    // Get workout programs
    const programsSnapshot = await db.collection('programs')
      .where('type', '==', 'workout')
      .get();

    let updatedCount = 0;
    let totalExercises = 0;

    for (const doc of programsSnapshot.docs) {
      const program = doc.data();
      let programUpdated = false;
      const updates = {};

      console.log(`\n📋 Processing: ${program.title}`);

      // Update weeklySchedule exercises
      if (program.weeklySchedule) {
        const newSchedule = { ...program.weeklySchedule };
        
        for (const [day, dayData] of Object.entries(newSchedule)) {
          if (dayData.exercises && dayData.exercises.length > 0) {
            const updatedExercises = dayData.exercises.map(ex => {
              totalExercises++;
              const exerciseName = (ex.name || ex.title || '').toLowerCase();
              
              // Find matching media
              for (const [key, media] of Object.entries(exerciseMedia)) {
                if (exerciseName.includes(key) || key.includes(exerciseName)) {
                  console.log(`  ✅ ${day}: ${ex.name} - Added media`);
                  updatedCount++;
                  return {
                    ...ex,
                    imageUrl: media.imageUrl,
                    videoUrl: media.videoUrl,
                    instructions: media.instructions
                  };
                }
              }
              
              return ex;
            });
            
            newSchedule[day] = {
              ...dayData,
              exercises: updatedExercises
            };
            programUpdated = true;
          }
        }
        
        if (programUpdated) {
          updates.weeklySchedule = newSchedule;
        }
      }

      // Update direct exercises
      if (program.exercises && program.exercises.length > 0) {
        const updatedExercises = program.exercises.map(ex => {
          totalExercises++;
          const exerciseName = (ex.name || ex.title || '').toLowerCase();
          
          for (const [key, media] of Object.entries(exerciseMedia)) {
            if (exerciseName.includes(key) || key.includes(exerciseName)) {
              console.log(`  ✅ Direct: ${ex.name} - Added media`);
              updatedCount++;
              return {
                ...ex,
                imageUrl: media.imageUrl,
                videoUrl: media.videoUrl,
                instructions: media.instructions
              };
            }
          }
          
          return ex;
        });
        
        updates.exercises = updatedExercises;
        programUpdated = true;
      }

      // Save updates
      if (programUpdated) {
        await doc.ref.update(updates);
        console.log(`  💾 Saved updates to: ${program.title}`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`✅ Complete!`);
    console.log(`📊 Total exercises processed: ${totalExercises}`);
    console.log(`🎬 Media added to: ${updatedCount} exercises`);
    console.log('='.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addMediaToExercises();
