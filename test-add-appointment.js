const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function testAddAppointment() {
  console.log('🧪 Testing appointment addition...\n');

  // Get Hana Ali's patient record (she has confirmed status, let's add a new appointment)
  const patientsSnapshot = await db
    .collection('physiotherapists')
    .doc('physio1')
    .collection('patients')
    .where('name', '==', 'Hana Ali')
    .get();

  if (patientsSnapshot.empty) {
    console.log('❌ Patient not found');
    process.exit(1);
  }

  const patientDoc = patientsSnapshot.docs[0];
  const patientData = patientDoc.data();

  console.log('📋 Current Appointment:');
  console.log('   Date:', patientData.appointment?.date);
  console.log('   Time:', patientData.appointment?.time);
  console.log('   Status:', patientData.appointment?.status);
  console.log('');

  // Update with new appointment
  const newAppointment = {
    date: '2025-12-15',
    time: '14:00',
    price: '60',
    notes: 'Follow-up session for knee rehabilitation',
    status: 'scheduled'
  };

  await patientDoc.ref.update({
    appointment: newAppointment,
    updatedAt: new Date().toISOString()
  });

  console.log('✅ New Appointment Added:');
  console.log('   Date:', newAppointment.date);
  console.log('   Time:', newAppointment.time);
  console.log('   Price: $' + newAppointment.price);
  console.log('   Status:', newAppointment.status);
  console.log('');

  // Verify
  const updatedDoc = await patientDoc.ref.get();
  const updated = updatedDoc.data();

  if (updated.appointment.date === '2025-12-15' && updated.appointment.time === '14:00') {
    console.log('🎉 TEST PASSED - Appointment updated successfully in database!');
  } else {
    console.log('❌ TEST FAILED - Appointment not updated correctly');
  }

  process.exit(0);
}

testAddAppointment().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
