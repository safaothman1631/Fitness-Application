const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function updateSessionNotes() {
  console.log('🔄 Updating session notes for all confirmed appointments...\n');

  const patientsSnapshot = await db
    .collection('physiotherapists')
    .doc('physio1')
    .collection('patients')
    .get();

  let updateCount = 0;

  for (const doc of patientsSnapshot.docs) {
    const patient = doc.data();
    
    if (patient.appointment?.status === 'confirmed' || patient.appointment?.status === 'completed') {
      const detailedNotes = {
        'Rashad Ali': 'Patient showed good response to shoulder exercises. Completed range of motion assessment. Pain level reduced from 7/10 to 4/10. Recommended daily stretching routine for next week.',
        'Hana Ali': 'Excellent progress on knee rehabilitation. Completed all prescribed exercises. Strength improving steadily. Patient is very motivated and following treatment plan carefully.',
        'Sardar Mohammed': 'Patient showed great improvement in back mobility. Practiced all mobility exercises correctly. Pain reduced significantly. Core strengthening exercises are working well.'
      };

      const exercises = {
        'Rashad Ali': 'Shoulder pendulum exercises, Wall slides, Resistance band rotations (3 sets of 10 reps each)',
        'Hana Ali': 'Leg raises, Hamstring stretches, Mini squats, Balance exercises (2 sets of 15 reps)',
        'Sardar Mohammed': 'Cat-cow stretches, Bird-dog exercises, Pelvic tilts, Core planks (3 sets of 12 reps)'
      };

      const updatedAppointment = {
        ...patient.appointment,
        sessionDetails: {
          ...patient.appointment.sessionDetails,
          sessionNotes: detailedNotes[patient.name] || patient.appointment.sessionDetails?.sessionNotes || 'Session completed successfully',
          exercisesGiven: exercises[patient.name] || patient.appointment.sessionDetails?.exercisesGiven || 'Standard exercise routine'
        }
      };

      await doc.ref.update({
        appointment: updatedAppointment,
        updatedAt: new Date().toISOString()
      });

      console.log(`✅ Updated ${patient.name}:`);
      console.log(`   Notes: ${updatedAppointment.sessionDetails.sessionNotes.substring(0, 60)}...`);
      console.log(`   Exercises: ${updatedAppointment.sessionDetails.exercisesGiven.substring(0, 50)}...\n`);
      updateCount++;
    }
  }

  console.log(`\n🎉 Updated ${updateCount} patient records with detailed session notes!`);
  process.exit(0);
}

updateSessionNotes().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
