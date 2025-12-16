const admin = require('firebase-admin');

const serviceAccount = require('../final-database-51935-firebase-adminsdk-fbsvc-b6a911c81a.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function getAllPhysioAccounts() {
  try {
    console.log('Getting all physiotherapist accounts...\n');
    
    const snapshot = await db.collection('physiotherapists').get();
    
    console.log('Total:', snapshot.size, 'accounts\n');
    
    const accounts = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      accounts.push({
        id: doc.id,
        name: data.name || 'N/A',
        email: data.email || 'N/A',
        phone: data.phone || 'N/A',
        specialty: data.specialty || 'N/A',
        experience: data.experience || 'N/A',
        bio: data.bio || 'N/A',
        createdAt: data.createdAt || 'N/A',
        updatedAt: data.updatedAt || 'N/A'
      });
    });
    
    console.log(JSON.stringify(accounts, null, 2));
    
    console.log('\n--- Summary ---');
    accounts.forEach((acc, idx) => {
      console.log(`${idx + 1}. ${acc.name} (${acc.specialty})`);
      console.log(`   Email: ${acc.email}`);
      console.log(`   Phone: ${acc.phone}`);
      console.log(`   ID: ${acc.id}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

getAllPhysioAccounts();
