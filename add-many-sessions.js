const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function addManySessions() {
  console.log('📚 Adding many sessions for scroll testing...\n');

  const patientsSnapshot = await db
    .collection('physiotherapists')
    .doc('physio1')
    .collection('patients')
    .where('name', '==', 'Rashad Ali')
    .get();

  if (patientsSnapshot.empty) {
    console.log('❌ Patient not found');
    process.exit(1);
  }

  const patientDoc = patientsSnapshot.docs[0];
  const patient = patientDoc.data();

  // Generate 15 sessions spanning 4 months
  const sessions = [];
  const startDate = new Date('2025-08-01');
  
  for (let i = 0; i < 15; i++) {
    const sessionDate = new Date(startDate);
    sessionDate.setDate(startDate.getDate() + (i * 7)); // Weekly sessions
    
    const progressRatings = [3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10];
    const rating = progressRatings[i];
    
    const notes = [
      'Initial assessment. Patient presents with moderate shoulder pain and limited range of motion. Starting gentle mobility exercises.',
      'Second session. Patient responding well to treatment. Pain reduced slightly. Continuing with mobility work.',
      'Good progress noted. Patient more comfortable with exercises. Introduced resistance band work.',
      'Significant improvement in mobility. Pain level decreasing. Added strengthening exercises.',
      'Excellent session. Patient demonstrates improved strength and flexibility. Increasing exercise intensity.',
      'Milestone reached - 50% pain reduction. Patient very motivated. Expanding exercise repertoire.',
      'Outstanding progress. Range of motion nearly normal. Focusing on functional movements.',
      'Patient performing exercises independently at home. Compliance excellent. Results showing clearly.',
      'Advanced strengthening phase begun. Patient handling increased resistance well.',
      'Functional activities improving. Patient able to perform daily tasks with minimal discomfort.',
      'Sport-specific movements introduced. Patient excited about returning to gym activities.',
      'Near full recovery. Fine-tuning movements and building endurance.',
      'Exceptional progress. Patient pain-free in most positions. Maintenance phase beginning.',
      'Final strengthening and conditioning. Patient ready for discharge soon.',
      'Discharge planning session. Patient fully recovered and equipped with home program.'
    ];

    const exercises = [
      'Pendulum exercises, Wall angels, Gentle shoulder circles',
      'Assisted shoulder flexion, Passive ROM exercises, Light stretching',
      'Resistance band internal/external rotation, Wall push-ups, Scapular retraction',
      'Active shoulder flexion/abduction, Resistance band rows, Doorway stretches',
      'Light dumbbell work (1-2kg), Plank holds, Shoulder blade squeezes',
      'Progressive resistance training, Modified push-ups, Rotator cuff strengthening',
      'Functional reaching exercises, Resistance band diagonals, Core stability work',
      'Sport-specific movements, Plyometric exercises (light), Dynamic stretching',
      'Advanced resistance training, Overhead presses (light), Full ROM exercises',
      'Compound movements, Medicine ball work, Functional training',
      'Sport simulation drills, Power exercises, Advanced conditioning',
      'High-intensity resistance work, Agility drills, Return-to-sport prep',
      'Maintenance program, Self-management techniques, Injury prevention strategies',
      'Final conditioning, Home exercise program review, Activity modifications',
      'Comprehensive home program, Self-monitoring guidelines, Follow-up plan'
    ];

    sessions.push({
      id: `session_${Date.now()}_${i}`,
      date: sessionDate.toISOString().split('T')[0],
      time: `${9 + Math.floor(i / 3)}:00`,
      price: '50',
      status: 'completed',
      duration: 60,
      sessionNotes: notes[i],
      exercisesGiven: exercises[i],
      progressRating: rating,
      confirmedAt: new Date(sessionDate.getTime() + 3600000).toISOString(),
      completedAt: new Date(sessionDate.getTime() + 3600000).toISOString()
    });
  }

  await patientDoc.ref.update({
    sessions: sessions,
    sessionCount: sessions.length,
    progress: 95,
    updatedAt: new Date().toISOString()
  });

  console.log(`✅ Added ${sessions.length} sessions for ${patient.name}`);
  console.log(`   Date range: ${sessions[0].date} to ${sessions[sessions.length - 1].date}`);
  console.log(`   Progress ratings: 3/10 → 10/10`);
  console.log(`   Total progress: 95%`);
  console.log('\n🎉 Test data ready! Sessions list will now scroll.');
  
  process.exit(0);
}

addManySessions().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
