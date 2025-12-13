const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function displayAllData() {
  console.log('📊 DISPLAYING ALL REAL DATABASE DATA\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  try {
    // 1. Display all requests
    console.log('📝 PHYSIOTHERAPIST REQUESTS:');
    console.log('───────────────────────────────────────────────────────────');
    const requestsSnapshot = await db.collection('physiotherapist_requests').orderBy('requestDate', 'desc').get();
    
    if (requestsSnapshot.empty) {
      console.log('   ❌ NO DATA FOUND\n');
    } else {
      requestsSnapshot.forEach((doc, index) => {
        const data = doc.data();
        console.log(`\n   Request ${index + 1}:`);
        console.log(`   • Patient: ${data.patientName}`);
        console.log(`   • Email: ${data.patientEmail}`);
        console.log(`   • Phone: ${data.patientPhone || 'N/A'}`);
        console.log(`   • Assigned to: ${data.physiotherapistName}`);
        console.log(`   • Status: ${data.status.toUpperCase()}`);
        console.log(`   • Message: ${data.message || 'N/A'}`);
        if (data.requestDate) {
          const date = data.requestDate.toDate();
          console.log(`   • Request Date: ${date.toLocaleDateString()}`);
        }
      });
      console.log(`\n   Total: ${requestsSnapshot.size} requests\n`);
    }

    // 2. Display all patients
    console.log('👥 PATIENTS:');
    console.log('───────────────────────────────────────────────────────────');
    const patientsSnapshot = await db.collection('physiotherapist_patients').get();
    
    if (patientsSnapshot.empty) {
      console.log('   ❌ NO DATA FOUND\n');
    } else {
      patientsSnapshot.forEach((doc, index) => {
        const data = doc.data();
        console.log(`\n   Patient ${index + 1}:`);
        console.log(`   • Name: ${data.name}`);
        console.log(`   • Email: ${data.email}`);
        console.log(`   • Phone: ${data.phone || 'N/A'}`);
        console.log(`   • Age: ${data.age || 'N/A'}`);
        console.log(`   • Condition: ${data.condition || 'N/A'}`);
        console.log(`   • Physiotherapist: ${data.physiotherapistName}`);
        console.log(`   • Sessions: ${data.sessions || 0}`);
      });
      console.log(`\n   Total: ${patientsSnapshot.size} patients\n`);
    }

    // 3. Display appointments
    console.log('📅 APPOINTMENTS:');
    console.log('───────────────────────────────────────────────────────────');
    const appointmentsSnapshot = await db.collection('appointments').get();
    
    if (appointmentsSnapshot.empty) {
      console.log('   ❌ NO DATA FOUND\n');
    } else {
      let scheduled = 0, completed = 0, cancelled = 0;
      appointmentsSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.status === 'scheduled') scheduled++;
        if (data.status === 'completed') completed++;
        if (data.status === 'cancelled') cancelled++;
      });
      
      console.log(`\n   📊 Breakdown:`);
      console.log(`   • Scheduled: ${scheduled}`);
      console.log(`   • Completed: ${completed}`);
      console.log(`   • Cancelled: ${cancelled}`);
      console.log(`   • Total: ${appointmentsSnapshot.size} appointments\n`);
      
      // Show first 5 appointments as examples
      console.log('   📋 Sample Appointments (first 5):');
      appointmentsSnapshot.docs.slice(0, 5).forEach((doc, index) => {
        const data = doc.data();
        console.log(`\n      ${index + 1}. ${data.patientName} - ${data.status}`);
        console.log(`         • Physiotherapist: ${data.physiotherapistName}`);
        console.log(`         • Time: ${data.time}`);
        console.log(`         • Duration: ${data.duration}`);
        if (data.notes) console.log(`         • Notes: ${data.notes}`);
      });
      console.log('');
    }

    // 4. Display doctor requests
    console.log('👨‍⚕️ DOCTOR REGISTRATION REQUESTS:');
    console.log('───────────────────────────────────────────────────────────');
    const doctorRequestsSnapshot = await db.collection('doctor_requests').get();
    
    if (doctorRequestsSnapshot.empty) {
      console.log('   ❌ NO DATA FOUND\n');
    } else {
      doctorRequestsSnapshot.forEach((doc, index) => {
        const data = doc.data();
        console.log(`\n   Request ${index + 1}:`);
        console.log(`   • Name: ${data.name}`);
        console.log(`   • Email: ${data.email}`);
        console.log(`   • Specialization: ${data.specialization || 'N/A'}`);
        console.log(`   • Status: ${data.status.toUpperCase()}`);
      });
      console.log(`\n   Total: ${doctorRequestsSnapshot.size} requests\n`);
    }

    // 5. Display physiotherapists
    console.log('🏥 PHYSIOTHERAPISTS:');
    console.log('───────────────────────────────────────────────────────────');
    const physiosSnapshot = await db.collection('users').where('role', '==', 'physiotherapist').get();
    
    if (physiosSnapshot.empty) {
      console.log('   ❌ NO DATA FOUND\n');
    } else {
      physiosSnapshot.forEach((doc, index) => {
        const data = doc.data();
        console.log(`\n   Physiotherapist ${index + 1}:`);
        console.log(`   • Name: ${data.name || 'N/A'}`);
        console.log(`   • Email: ${data.email}`);
        console.log(`   • Status: ${data.status || 'active'}`);
        console.log(`   • Specialization: ${data.specialization || 'N/A'}`);
      });
      console.log(`\n   Total: ${physiosSnapshot.size} physiotherapists\n`);
    }

    // Summary
    console.log('═══════════════════════════════════════════════════════════');
    console.log('✅ ALL REAL DATA DISPLAYED ABOVE');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('💡 This is the ACTUAL data from your Firestore database.');
    console.log('💡 If you see different data in the app, check browser cache.\n');

  } catch (error) {
    console.error('❌ Error displaying data:', error);
  }
}

displayAllData()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
