const admin = require('firebase-admin');
const serviceAccount = require('./final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();
const db = admin.firestore();

(async () => {
  try {
    const email = 'doctor@fitpro.com';
    const password = 'doctor123456';
    
    let user;
    try {
      user = await auth.getUserByEmail(email);
      console.log('✅ Account already exists');
    } catch {
      user = await auth.createUser({
        email,
        password,
        displayName: 'Dr. Admin'
      });
      console.log('✅ New account created');
    }
    
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email,
      name: 'Dr. Admin',
      role: 'physiotherapist',
      membership: 'Pro',
      subscriptionStatus: 'active',
      isActive: true,
      createdAt: new Date().toISOString(),
      joinDate: new Date().toISOString()
    }, { merge: true });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email: doctor@fitpro.com');
    console.log('🔒 Password: doctor123456');
    console.log('👨‍⚕️ Role: physiotherapist');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
})();
