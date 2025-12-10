const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

db.collection('physiotherapists')
  .doc('physio1')
  .collection('patients')
  .where('name', '==', 'Rashad Ali')
  .get()
  .then(snapshot => {
    const patient = snapshot.docs[0].data();
    console.log('=== Rashad Ali Complete Data ===\n');
    console.log('Sessions Array Length:', patient.sessions?.length || 0);
    console.log('Session Count Field:', patient.sessionCount);
    console.log('Progress:', patient.progress + '%');
    console.log('\nAll Sessions:');
    patient.sessions?.forEach((s, i) => {
      console.log(`  ${i+1}. ${s.date} at ${s.time} - Rating: ${s.progressRating}/10 - Status: ${s.status}`);
      console.log(`     Notes: ${s.sessionNotes.substring(0, 50)}...`);
    });
    process.exit(0);
  });
