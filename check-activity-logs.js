const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function checkActivityLogs() {
  console.log('🔍 Checking Activity Logs Collection...\n');

  try {
    // Get all activity logs ordered by timestamp
    const logsSnapshot = await db.collection('activity_logs')
      .orderBy('timestamp', 'desc')
      .limit(20)
      .get();

    if (logsSnapshot.empty) {
      console.log('⚠️  No activity logs found');
      return;
    }

    console.log(`📊 Found ${logsSnapshot.size} activity logs (showing latest 20):\n`);

    const actionColors = {
      'patient_created': '🟢',
      'patient_updated': '🔵',
      'patient_deleted': '🔴',
      'appointment_scheduled': '📅',
      'appointment_confirmed': '✅',
      'session_completed': '🎯',
      'request_accepted': '👍',
      'request_rejected': '❌',
      'settings_changed': '⚙️',
      'profile_updated': '👤'
    };

    logsSnapshot.forEach((doc, index) => {
      const log = doc.data();
      const icon = actionColors[log.action] || '📋';
      const time = new Date(log.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      console.log(`${index + 1}. ${icon} ${log.action.toUpperCase()}`);
      console.log(`   Time: ${time}`);
      console.log(`   Actor: ${log.actorName} (${log.actorRole})`);
      console.log(`   Target: ${log.targetName} (${log.targetType})`);
      console.log(`   Description: ${log.description}`);
      if (log.details) {
        console.log(`   Details:`, JSON.stringify(log.details, null, 2));
      }
      console.log('');
    });

    // Show statistics
    const actionCounts = {};
    logsSnapshot.forEach(doc => {
      const action = doc.data().action;
      actionCounts[action] = (actionCounts[action] || 0) + 1;
    });

    console.log('\n📈 Activity Statistics (last 20 logs):');
    Object.entries(actionCounts).forEach(([action, count]) => {
      const icon = actionColors[action] || '📋';
      console.log(`   ${icon} ${action}: ${count}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }

  process.exit(0);
}

checkActivityLogs();
