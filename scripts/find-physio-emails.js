const admin = require('firebase-admin');

const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function findPhysioEmails() {
  try {
    const emails = [
      'physio@darinfitness.com',
      'physio2@darinfitness.com',
      'physio3@darinfitness.com'
    ];
    
    console.log('Searching for these emails in users collection...\n');
    
    for (const email of emails) {
      const snapshot = await db.collection('users')
        .where('email', '==', email)
        .get();
      
      if (snapshot.empty) {
        console.log(`❌ NOT FOUND: ${email}`);
      } else {
        snapshot.forEach(doc => {
          const data = doc.data();
          console.log('✅ FOUND:', email);
          console.log('   ID:', doc.id);
          console.log('   Name:', data.name || 'No name');
          console.log('   Role:', data.role || 'No role');
          console.log('   Created:', data.createdAt || 'No date');
        });
      }
      console.log('');
    }
    
    console.log('\nNow checking ALL users with physiotherapist-related roles...\n');
    
    const allUsers = await db.collection('users').get();
    let count = 0;
    
    allUsers.forEach(doc => {
      const data = doc.data();
      const role = (data.role || '').toLowerCase();
      
      if (role.includes('physio')) {
        count++;
        console.log(`${count}. ${data.name || 'No name'}`);
        console.log('   Email:', data.email);
        console.log('   Role:', data.role);
        console.log('   ID:', doc.id);
        console.log('');
      }
    });
    
    console.log(`Total physio-related users: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

findPhysioEmails();
