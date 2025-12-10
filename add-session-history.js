const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function addMoreSessions() {
  console.log('📚 Adding more session history for testing...\n');

  const patientsSnapshot = await db
    .collection('physiotherapists')
    .doc('physio1')
    .collection('patients')
    .get();

  for (const doc of patientsSnapshot.docs) {
    const patient = doc.data();
    
    if (patient.name === 'Rashad Ali') {
      // Add 3 more sessions for Rashad
      const moreSessions = [
        {
          id: `session_${Date.now()}_1`,
          date: '2025-11-15',
          time: '09:00',
          price: '50',
          status: 'completed',
          duration: 60,
          sessionNotes: 'Initial assessment completed. Patient has moderate shoulder pain. Starting basic mobility exercises.',
          exercisesGiven: 'Pendulum exercises, Wall angels, Gentle stretches',
          progressRating: 3,
          confirmedAt: '2025-11-15T10:00:00.000Z',
          completedAt: '2025-11-15T10:00:00.000Z'
        },
        {
          id: `session_${Date.now()}_2`,
          date: '2025-11-22',
          time: '10:00',
          price: '50',
          status: 'completed',
          duration: 60,
          sessionNotes: 'Good progress. Pain reduced to 5/10. Patient is more comfortable with exercises.',
          exercisesGiven: 'Resistance band rotations, Shoulder blade squeezes, Wall push-ups',
          progressRating: 4,
          confirmedAt: '2025-11-22T11:00:00.000Z',
          completedAt: '2025-11-22T11:00:00.000Z'
        },
        {
          id: `session_${Date.now()}_3`,
          date: '2025-11-29',
          time: '11:00',
          price: '50',
          status: 'completed',
          duration: 60,
          sessionNotes: 'Excellent improvement. Range of motion significantly better. Patient following home exercise program.',
          exercisesGiven: 'Advanced resistance band work, Light dumbbell exercises, Stretching routine',
          progressRating: 5,
          confirmedAt: '2025-11-29T12:00:00.000Z',
          completedAt: '2025-11-29T12:00:00.000Z'
        }
      ];

      const existingSessions = patient.sessions || [];
      const allSessions = [...moreSessions, ...existingSessions];

      await doc.ref.update({
        sessions: allSessions,
        sessionCount: allSessions.length,
        progress: 40,
        updatedAt: new Date().toISOString()
      });

      console.log(`✅ Added 3 sessions for ${patient.name} (Total: ${allSessions.length})`);
    }
    
    if (patient.name === 'Sardar Mohammed') {
      // Add 2 more sessions for Sardar
      const moreSessions = [
        {
          id: `session_${Date.now()}_4`,
          date: '2025-11-10',
          time: '09:00',
          price: '45',
          status: 'completed',
          duration: 60,
          sessionNotes: 'Initial back assessment. Patient has chronic lower back pain. Started core strengthening.',
          exercisesGiven: 'Cat-cow stretches, Pelvic tilts, Knee-to-chest stretches',
          progressRating: 4,
          confirmedAt: '2025-11-10T10:00:00.000Z',
          completedAt: '2025-11-10T10:00:00.000Z'
        },
        {
          id: `session_${Date.now()}_5`,
          date: '2025-11-17',
          time: '10:00',
          price: '45',
          status: 'completed',
          duration: 60,
          sessionNotes: 'Good response to treatment. Pain level decreased. Core strength improving.',
          exercisesGiven: 'Bird-dog exercises, Planks (modified), Bridge exercises',
          progressRating: 6,
          confirmedAt: '2025-11-17T11:00:00.000Z',
          completedAt: '2025-11-17T11:00:00.000Z'
        }
      ];

      const existingSessions = patient.sessions || [];
      const allSessions = [...moreSessions, ...existingSessions];

      await doc.ref.update({
        sessions: allSessions,
        sessionCount: allSessions.length,
        progress: 60,
        updatedAt: new Date().toISOString()
      });

      console.log(`✅ Added 2 sessions for ${patient.name} (Total: ${allSessions.length})`);
    }
  }

  console.log('\n🎉 Session history added successfully!');
  console.log('\n📊 Summary:');
  console.log('   Rashad Ali: 4 completed sessions');
  console.log('   Sardar Mohammed: 3 completed sessions');
  console.log('   Hana Ali: 1 scheduled appointment (no history yet)');
  
  process.exit(0);
}

addMoreSessions().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
