const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Creating Test Users...\n');

// Service account configuration
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase Admin
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('✅ Firebase Admin initialized successfully\n');
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin:', error.message);
  process.exit(1);
}

const db = admin.firestore();
const auth = admin.auth();

// Test users data
const testUsers = [
  {
    email: 'superadmin@fitpro.com',
    password: 'SuperAdmin123!',
    userData: {
      name: 'Super Administrator',
      phone: '+1234567890',
      role: 'superadmin',
      membership: 'Pro',
      isActive: true,
      joinDate: new Date().toISOString(),
      profile: {
        firstName: 'Super',
        lastName: 'Administrator',
        gender: 'male',
      },
      subscriptionStatus: 'active',
      subscriptionEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      createdAt: new Date().toISOString(),
    }
  },
  {
    email: 'newuser@fitpro.com',
    password: 'NewUser123!',
    userData: {
      name: 'New User Premium',
      phone: '+1234567891',
      role: 'user',
      membership: 'Premium',
      isActive: true,
      joinDate: new Date().toISOString(),
      profile: {
        firstName: 'New',
        lastName: 'User',
        gender: 'female',
      },
      subscriptionStatus: 'active',
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      createdAt: new Date().toISOString(),
    }
  },
  {
    email: 'miduser@fitpro.com',
    password: 'MidUser123!',
    userData: {
      name: 'Mid User Basic',
      phone: '+1234567892',
      role: 'user',
      membership: 'Basic',
      isActive: true,
      joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      profile: {
        firstName: 'Mid',
        lastName: 'User',
        gender: 'male',
      },
      subscriptionStatus: 'active',
      subscriptionStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      subscriptionEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days remaining
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    }
  },
  {
    email: 'nosubuser@fitpro.com',
    password: 'NoSub123!',
    userData: {
      name: 'No Subscription User',
      phone: '+1234567893',
      role: 'user',
      membership: 'Basic',
      isActive: true,
      joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
      profile: {
        firstName: 'No',
        lastName: 'Subscription',
        gender: 'female',
      },
      subscriptionStatus: 'expired',
      subscriptionStart: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      subscriptionEnd: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // expired 30 days ago
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    }
  }
];

async function createUsers() {
  console.log('📝 Creating users in Firebase Authentication and Firestore...\n');

  for (const user of testUsers) {
    try {
      // Check if user already exists
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(user.email);
        console.log(`⚠️  User ${user.email} already exists in Auth, updating...`);
        // Update password
        await auth.updateUser(userRecord.uid, {
          password: user.password,
        });
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          // Create user in Firebase Auth
          userRecord = await auth.createUser({
            email: user.email,
            password: user.password,
            displayName: user.userData.name,
          });
          console.log(`✅ Created Auth user: ${user.email}`);
        } else {
          throw error;
        }
      }

      // Add/Update user in Firestore
      await db.collection('users').doc(userRecord.uid).set(user.userData, { merge: true });
      console.log(`✅ Saved user data to Firestore for: ${user.email}`);
      console.log(`   UID: ${userRecord.uid}`);
      console.log(`   Role: ${user.userData.role}`);
      console.log(`   Membership: ${user.userData.membership}`);
      console.log(`   Subscription: ${user.userData.subscriptionStatus}`);
      console.log('');

    } catch (error) {
      console.error(`❌ Error creating user ${user.email}:`, error.message);
    }
  }

  console.log('\n🎉 Test users creation completed!\n');
  console.log('📋 LOGIN CREDENTIALS:\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('1. SUPERADMIN (Full Access, Pro Membership)');
  console.log('   Email: superadmin@fitpro.com');
  console.log('   Password: SuperAdmin123!');
  console.log('   Subscription: Active (1 year)');
  console.log('');
  console.log('2. NEW USER (Premium, Full Subscription)');
  console.log('   Email: newuser@fitpro.com');
  console.log('   Password: NewUser123!');
  console.log('   Subscription: Active (30 days remaining)');
  console.log('');
  console.log('3. MID USER (Basic, Half Subscription)');
  console.log('   Email: miduser@fitpro.com');
  console.log('   Password: MidUser123!');
  console.log('   Subscription: Active (15 days remaining)');
  console.log('');
  console.log('4. NO SUBSCRIPTION USER (Expired)');
  console.log('   Email: nosubuser@fitpro.com');
  console.log('   Password: NoSub123!');
  console.log('   Subscription: Expired (30 days ago)');
  console.log('═══════════════════════════════════════════════════════════');

  process.exit(0);
}

createUsers();
