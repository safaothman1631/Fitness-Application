const admin = require('firebase-admin');
const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function makePhysiotherapist(email) {
  try {
    console.log('🔍 Searching for user with email:', email);
    
    const usersSnapshot = await db.collection('users')
      .where('email', '==', email)
      .get();
    
    if (usersSnapshot.empty) {
      console.log('❌ User not found with email:', email);
      console.log('\n💡 Tip: Make sure the user has registered first at: http://localhost:3000/register');
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    
    console.log('✅ User found!');
    console.log('   Name:', userData.name);
    console.log('   Current role:', userData.role);
    console.log('   User ID:', userDoc.id);
    
    if (userData.role === 'physiotherapist') {
      console.log('\n⚠️  User is already a physiotherapist!');
      return;
    }
    
    console.log('\n🔄 Converting to physiotherapist...');
    
    await userDoc.ref.update({
      role: 'physiotherapist',
      status: 'active',
      specialization: 'Physical Therapy',
      updatedAt: new Date().toISOString()
    });
    
    console.log('✅ User converted to physiotherapist successfully!');
    console.log('\n📋 Updated Account Details:');
    console.log('   Email:', email);
    console.log('   Name:', userData.name);
    console.log('   Role: physiotherapist ✅');
    console.log('   Status: active');
    console.log('   User ID:', userDoc.id);
    console.log('\n🔐 Login at:');
    console.log('   http://localhost:3000/login');
    console.log('   Select: Physiotherapist');
    console.log('   Email:', email);
    console.log('   Password: [existing password]');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
  
  process.exit(0);
}

// بەکارهێنان:
const email = process.argv[2];
if (!email) {
  console.log('❌ Error: Email is required');
  console.log('\n📖 Usage:');
  console.log('   node scripts/make-user-physiotherapist.js user@example.com');
  console.log('\n📝 Example:');
  console.log('   node scripts/make-user-physiotherapist.js doctor@darinfitness.com');
  process.exit(1);
}

makePhysiotherapist(email);
