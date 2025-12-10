const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function setupActivityLog() {
  console.log('🔧 Setting up activity log collection...\n');

  // Create sample activity logs
  const activities = [
    {
      timestamp: new Date().toISOString(),
      action: 'patient_created',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'patient',
      targetId: '215O89gRIGhMHNExWOND',
      targetName: 'Rashad Ali',
      details: {
        patientEmail: 'rashad.ali@gmail.com',
        condition: 'Shoulder Pain'
      },
      description: 'Created new patient record'
    },
    {
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      action: 'appointment_scheduled',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'appointment',
      targetId: 'apt_001',
      targetName: 'Rashad Ali',
      details: {
        date: '2025-12-11',
        time: '09:00',
        price: '50'
      },
      description: 'Scheduled appointment for Rashad Ali'
    },
    {
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      action: 'session_completed',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'session',
      targetId: 'session_123',
      targetName: 'Rashad Ali',
      details: {
        progressRating: 8,
        duration: 60,
        sessionNotes: 'Patient showed great improvement'
      },
      description: 'Completed session with progress rating 8/10'
    }
  ];

  for (const activity of activities) {
    await db.collection('activity_logs').add(activity);
  }

  console.log('✅ Created activity_logs collection');
  console.log(`   Added ${activities.length} sample activities`);
  console.log('\n📋 Activity Types:');
  console.log('   - patient_created, patient_updated, patient_deleted');
  console.log('   - appointment_scheduled, appointment_confirmed, appointment_cancelled');
  console.log('   - session_completed, session_updated');
  console.log('   - request_accepted, request_rejected');
  console.log('   - profile_updated, settings_changed');
  
  console.log('\n🎉 Activity log system ready!');
  process.exit(0);
}

setupActivityLog().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
