const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkSessions() {
  console.log('🔍 Checking sessions data...\n');

  const patientsSnapshot = await db
    .collection('physiotherapists')
    .doc('physio1')
    .collection('patients')
    .get();

  patientsSnapshot.docs.forEach(doc => {
    const patient = doc.data();
    console.log(`👤 ${patient.name}:`);
    console.log(`   📊 Total Sessions: ${patient.sessionCount || 0}`);
    console.log(`   📈 Progress: ${patient.progress}%`);
    
    if (patient.currentAppointment) {
      console.log(`   📅 Current Appointment: ${patient.currentAppointment.date} at ${patient.currentAppointment.time} (${patient.currentAppointment.status})`);
    } else if (patient.appointment && patient.appointment.status === 'scheduled') {
      console.log(`   📅 Current Appointment: ${patient.appointment.date} at ${patient.appointment.time} (${patient.appointment.status})`);
    }
    
    if (patient.sessions && patient.sessions.length > 0) {
      console.log(`   📚 Sessions History: ${patient.sessions.length} sessions`);
      patient.sessions.forEach((session, i) => {
        console.log(`      ${i + 1}. ${session.date} - ⭐${session.progressRating}/10 - ${session.status}`);
      });
    } else {
      console.log(`   📚 Sessions History: No sessions yet`);
    }
    console.log('');
  });

  console.log('✅ Check complete!');
  process.exit(0);
}

checkSessions().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
