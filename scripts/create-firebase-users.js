/**
 * دروستکردنی Test Users لە Firebase Authentication
 * Run: node scripts/create-firebase-users.js
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/^"|"$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const testUsers = [
  {
    email: 'superadmin@darinfitness.com',
    password: 'DarinFitness2025!',
    displayName: 'Super Admin',
    role: 'superadmin'
  },
  {
    email: 'admin@darinfitness.com',
    password: 'DarinFitness2025!',
    displayName: 'Admin User',
    role: 'admin'
  },
  {
    email: 'trainer@darinfitness.com',
    password: 'trainer1234',
    displayName: 'Trainer',
    role: 'trainer'
  },
  {
    email: 'physio@darinfitness.com',
    password: 'physio1234',
    displayName: 'Physiotherapist',
    role: 'physiotherapist'
  },
  {
    email: 'owner@darinfitness.com',
    password: 'owner1234',
    displayName: 'Owner',
    role: 'owner'
  },
  {
    email: 'patient@darinfitness.com',
    password: 'patient1234',
    displayName: 'Patient',
    role: 'patient'
  },
  {
    email: 'user@darinfitness.com',
    password: 'user1234',
    displayName: 'Regular User',
    role: 'user'
  }
];

async function createUsers() {
  console.log('🚀 Starting user creation...\n');

  for (const userData of testUsers) {
    try {
      // Check if user already exists
      try {
        const existingUser = await admin.auth().getUserByEmail(userData.email);
        console.log(`⚠️  User already exists: ${userData.email} (UID: ${existingUser.uid})`);
        continue;
      } catch (error) {
        // User doesn't exist, create it
      }

      // Create user in Firebase Auth
      const userRecord = await admin.auth().createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
        emailVerified: true,
      });

      console.log(`✅ Created user: ${userData.email}`);
      console.log(`   UID: ${userRecord.uid}`);
      console.log(`   Role: ${userData.role}\n`);

      // Create user document in Firestore
      await admin.firestore().collection('users').doc(userRecord.uid).set({
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`✅ Created Firestore document for: ${userData.email}\n`);

    } catch (error) {
      console.error(`❌ Error creating user ${userData.email}:`, error.message);
    }
  }

  console.log('\n🎉 User creation completed!');
  console.log('\n📋 Test Credentials:');
  testUsers.forEach(user => {
    console.log(`\n${user.role.toUpperCase()}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: ${user.password}`);
  });

  process.exit(0);
}

createUsers().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
