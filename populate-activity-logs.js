const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function populateActivityLogs() {
  console.log('📝 Populating activity logs with test data...\n');

  const now = Date.now();
  const activities = [
    // Recent activities
    {
      timestamp: new Date(now - 10 * 60000).toISOString(), // 10 min ago
      action: 'session_completed',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'session',
      targetId: 'session_latest',
      targetName: 'Rashad Ali',
      details: {
        progressRating: 9,
        duration: 60,
        condition: 'Shoulder Pain'
      },
      description: 'Completed physiotherapy session with excellent progress (9/10)'
    },
    {
      timestamp: new Date(now - 30 * 60000).toISOString(), // 30 min ago
      action: 'appointment_confirmed',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'appointment',
      targetId: 'apt_002',
      targetName: 'Hana Ali',
      details: {
        date: '2025-12-15',
        time: '14:00',
        price: '60'
      },
      description: 'Confirmed appointment for Hana Ali on 2025-12-15'
    },
    {
      timestamp: new Date(now - 60 * 60000).toISOString(), // 1 hour ago
      action: 'patient_updated',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'patient',
      targetId: '215O89gRIGhMHNExWOND',
      targetName: 'Rashad Ali',
      details: {
        fieldsUpdated: ['progress', 'sessionCount'],
        newProgress: 95,
        newSessionCount: 15
      },
      description: 'Updated patient progress to 95%'
    },
    {
      timestamp: new Date(now - 2 * 3600000).toISOString(), // 2 hours ago
      action: 'request_accepted',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'request',
      targetId: 'req_003',
      targetName: 'Sara Mohammed',
      details: {
        condition: 'Back Pain',
        appointmentScheduled: true
      },
      description: 'Accepted new patient request and scheduled appointment'
    },
    // Earlier today
    {
      timestamp: new Date(now - 4 * 3600000).toISOString(), // 4 hours ago
      action: 'appointment_scheduled',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'appointment',
      targetId: 'apt_003',
      targetName: 'Sardar Mohammed',
      details: {
        date: '2025-12-12',
        time: '09:00',
        price: '50'
      },
      description: 'Scheduled new appointment for follow-up session'
    },
    {
      timestamp: new Date(now - 6 * 3600000).toISOString(), // 6 hours ago
      action: 'profile_updated',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'profile',
      targetId: 'physio1',
      targetName: 'Dr. Ahmad Profile',
      details: {
        fieldsUpdated: ['specialization', 'experience'],
        newSpecialization: 'Sports Injury Rehabilitation'
      },
      description: 'Updated professional profile information'
    },
    // Yesterday
    {
      timestamp: new Date(now - 24 * 3600000).toISOString(),
      action: 'session_completed',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'session',
      targetId: 'session_yesterday',
      targetName: 'Sardar Mohammed',
      details: {
        progressRating: 8,
        duration: 60,
        condition: 'Lower Back Pain'
      },
      description: 'Completed session with good improvement (8/10)'
    },
    {
      timestamp: new Date(now - 30 * 3600000).toISOString(),
      action: 'patient_created',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'patient',
      targetId: 'patient_new',
      targetName: 'Ali Hassan',
      details: {
        email: 'ali.hassan@example.com',
        condition: 'Neck Pain',
        age: 35
      },
      description: 'Added new patient to the system'
    },
    // Admin activities
    {
      timestamp: new Date(now - 2 * 24 * 3600000).toISOString(),
      action: 'settings_changed',
      actorId: 'admin1',
      actorName: 'System Admin',
      actorRole: 'admin',
      targetType: 'settings',
      targetId: 'sys_settings',
      targetName: 'System Settings',
      details: {
        settingChanged: 'notification_frequency',
        oldValue: 'daily',
        newValue: 'realtime'
      },
      description: 'Changed system notification settings to realtime'
    },
    {
      timestamp: new Date(now - 3 * 24 * 3600000).toISOString(),
      action: 'request_rejected',
      actorId: 'physio1',
      actorName: 'Dr. Ahmad',
      actorRole: 'physiotherapist',
      targetType: 'request',
      targetId: 'req_old',
      targetName: 'John Doe',
      details: {
        reason: 'Duplicate request',
        originalRequestId: 'req_001'
      },
      description: 'Rejected duplicate patient request'
    }
  ];

  let addedCount = 0;
  for (const activity of activities) {
    await db.collection('activity_logs').add(activity);
    addedCount++;
  }

  console.log(`✅ Added ${addedCount} activity logs`);
  console.log('\n📊 Activity breakdown:');
  console.log('   - Session completed: 2');
  console.log('   - Appointments: 2');
  console.log('   - Patient operations: 2');
  console.log('   - Requests: 2');
  console.log('   - Settings: 2');
  console.log('\n⏰ Time range: Last 3 days');
  console.log('👤 Actors: Dr. Ahmad (physiotherapist), System Admin');
  console.log('\n🎉 Activity logs ready to view!');
  
  process.exit(0);
}

populateActivityLogs().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
