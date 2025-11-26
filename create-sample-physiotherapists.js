const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🏥 Creating sample physiotherapists...\n');

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const samplePhysiotherapists = [
  {
    name: "Dr. Aylin Yılmaz",
    specialization: "Sports Injury",
    email: "aylin@darinfitness.com",
    phone: "+90 555 123 4567",
    experience: "8 years",
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Dr. Kemal Öztürk",
    specialization: "Orthopedic Rehabilitation",
    email: "kemal@darinfitness.com",
    phone: "+90 555 234 5678",
    experience: "12 years",
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    name: "Dr. Rana Ahmad",
    specialization: "Manual Therapy",
    email: "rana@darinfitness.com",
    phone: "+90 555 345 6789",
    experience: "5 years",
    active: true,
    createdAt: new Date().toISOString(),
  },
];

async function createPhysiotherapists() {
  try {
    console.log('📋 Creating physiotherapists...\n');
    
    for (const physio of samplePhysiotherapists) {
      const docRef = await db.collection('physiotherapists').add(physio);
      console.log(`✅ Created: ${physio.name} (ID: ${docRef.id})`);
    }
    
    console.log('\n🎉 All physiotherapists created successfully!');
    console.log('\n📊 Summary:');
    const snapshot = await db.collection('physiotherapists').get();
    console.log(`Total physiotherapists: ${snapshot.size}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createPhysiotherapists();
