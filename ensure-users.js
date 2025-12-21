require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const admin = require('firebase-admin');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();
const db = admin.firestore();

// All required users
const REQUIRED_USERS = [
  {
    email: 'superadmin@fitpro.com',
    password: '123456',
    displayName: 'Super Admin',
    role: 'superadmin'
  },
  {
    email: 'owner@fitpro.com',
    password: '123456',
    displayName: 'Owner',
    role: 'owner'
  },
  {
    email: 'doctor@fitpro.com',
    password: '123456',
    displayName: 'Doctor',
    role: 'admin'
  },
  {
    email: 'physio@fitpro.com',
    password: '123456',
    displayName: 'Physiotherapist',
    role: 'physiotherapist'
  },
  {
    email: 'trainer@fitpro.com',
    password: '123456',
    displayName: 'Trainer',
    role: 'trainer'
  },
  {
    email: 'user@fitpro.com',
    password: '123456',
    displayName: 'Test User',
    role: 'user',
    approvedDate: new Date().toISOString()
  }
];

async function ensureUserExists(userData) {
  try {
    // Step 1: Check if user exists in Auth
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(userData.email);
      console.log(`✅ Auth: ${userData.email} exists (${userRecord.uid})`);
    } catch (error) {
      // User doesn't exist in Auth, create it
      userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.displayName,
        emailVerified: true,
      });
      console.log(`✅ Created Auth: ${userData.email} (${userRecord.uid})`);
    }

    // Step 2: Check if user document exists in Firestore
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      // Create Firestore document
      await db.collection('users').doc(userRecord.uid).set({
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role,
        createdAt: new Date().toISOString(),
        emailVerified: true,
        ...(userData.approvedDate && { approvedDate: userData.approvedDate })
      });
      console.log(`✅ Created Firestore doc: ${userData.email}`);
    } else {
      // Update if needed
      const docData = userDoc.data();
      if (docData.role !== userData.role || !docData.emailVerified) {
        await db.collection('users').doc(userRecord.uid).update({
          role: userData.role,
          emailVerified: true,
          ...(userData.approvedDate && { approvedDate: userData.approvedDate })
        });
        console.log(`✅ Updated Firestore doc: ${userData.email}`);
      } else {
        console.log(`✅ Firestore: ${userData.email} OK`);
      }
    }

    // Step 3: Verify email is marked as verified
    if (!userRecord.emailVerified) {
      await auth.updateUser(userRecord.uid, {
        emailVerified: true
      });
      console.log(`✅ Verified email: ${userData.email}`);
    }

    return true;
  } catch (error) {
    console.error(`❌ Error with ${userData.email}:`, error.message);
    return false;
  }
}

async function ensureAllUsers() {
  console.log('🔍 Checking and ensuring all required users exist...\n');
  
  let allOk = true;
  
  for (const userData of REQUIRED_USERS) {
    const success = await ensureUserExists(userData);
    if (!success) allOk = false;
    console.log('');
  }
  
  if (allOk) {
    console.log('✅ All users are ready!');
    console.log('\n📋 Login Credentials:');
    console.log('═══════════════════════════════════════');
    REQUIRED_USERS.forEach(u => {
      console.log(`${u.email} / ${u.password}`);
    });
    console.log('═══════════════════════════════════════');
  } else {
    console.log('⚠️  Some users had issues. Please check above.');
  }
}

// Run the check
ensureAllUsers().catch(console.error);
