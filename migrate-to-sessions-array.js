const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function migrateToSessionsArray() {
  console.log('🔄 Migrating patients to sessions array structure...\n');

  const patientsSnapshot = await db
    .collection('physiotherapists')
    .doc('physio1')
    .collection('patients')
    .get();

  let migratedCount = 0;

  for (const doc of patientsSnapshot.docs) {
    const patient = doc.data();
    
    // If patient has an appointment, move it to sessions array
    if (patient.appointment) {
      const sessions = [];
      
      // If it's a confirmed/completed appointment with session details, add to history
      if (patient.appointment.sessionDetails) {
        sessions.push({
          id: `session_${Date.now()}`,
          date: patient.appointment.date,
          time: patient.appointment.time,
          price: patient.appointment.price,
          status: patient.appointment.status || 'completed',
          duration: patient.appointment.sessionDetails.actualDuration || 60,
          sessionNotes: patient.appointment.sessionDetails.sessionNotes || '',
          exercisesGiven: patient.appointment.sessionDetails.exercisesGiven || '',
          progressRating: patient.appointment.sessionDetails.progressRating || 0,
          confirmedAt: patient.appointment.sessionDetails.confirmedAt,
          completedAt: patient.appointment.sessionDetails.confirmedAt
        });
      }

      // Keep current appointment if it's scheduled or confirmed (not yet completed)
      const currentAppointment = patient.appointment.status === 'scheduled' || 
                                 (patient.appointment.status === 'confirmed' && !patient.appointment.sessionDetails)
        ? patient.appointment
        : null;

      // Calculate actual session count from history
      const actualSessionCount = sessions.length;

      await doc.ref.update({
        sessions: sessions,
        currentAppointment: currentAppointment,
        sessionCount: actualSessionCount,
        // Keep old appointment field for now (can remove later)
        appointment: patient.appointment,
        updatedAt: new Date().toISOString()
      });

      console.log(`✅ Migrated ${patient.name}:`);
      console.log(`   Sessions in history: ${sessions.length}`);
      console.log(`   Current appointment: ${currentAppointment ? currentAppointment.date : 'None'}`);
      console.log('');
      
      migratedCount++;
    }
  }

  console.log(`\n🎉 Migrated ${migratedCount} patient records!`);
  process.exit(0);
}

migrateToSessionsArray().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
