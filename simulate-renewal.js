const admin = require('firebase-admin');
require('dotenv').config({ path: '.env.local' });

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    })
  });
}

const db = admin.firestore();

async function simulateRenewalLogic() {
  try {
    console.log('🧪 Simulating Renewal Logic\n');

    // Get Darin's user data
    const usersSnapshot = await db.collection('users')
      .where('email', '==', 'darinvipapp@gmail.com')
      .get();

    if (usersSnapshot.empty) {
      console.log('❌ User not found');
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    const userData = userDoc.data();
    const userId = userDoc.id;

    console.log('👤 User:', userData.name || userData.firstName);
    console.log('   Email:', userData.email);
    console.log('   Membership:', userData.membership);

    // Get subscription end date
    let currentEnd = null;
    if (userData.subscriptionEnd) {
      if (userData.subscriptionEnd.toDate) {
        currentEnd = userData.subscriptionEnd.toDate();
      } else if (userData.subscriptionEnd._seconds) {
        currentEnd = new Date(userData.subscriptionEnd._seconds * 1000);
      }
    }

    const now = new Date();
    
    console.log('\n📅 Subscription Status:');
    console.log('   Current End:', currentEnd ? currentEnd.toLocaleDateString() : 'N/A');
    console.log('   Now:', now.toLocaleDateString());

    // Check if subscription is still active (THIS IS THE NEW LOGIC)
    if (currentEnd && currentEnd > now) {
      const daysRemaining = Math.ceil((currentEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      console.log('\n❌ RENEWAL BLOCKED!');
      console.log('   Reason: ئیشتراک هێشتا چالاکە');
      console.log('   Details:', `${daysRemaining} ڕۆژ ماوە تا کۆتایی بێت. ناتوانیت نوێی بکەیتەوە تا کۆتایی ناهێنێت.`);
      console.log('   Days Remaining:', daysRemaining);
      console.log('   Expiry Date:', currentEnd.toISOString());
      console.log('\n✅ SUCCESS: Renewal restriction is working correctly!');
      
      return;
    }

    // If we get here, subscription is expired or not set
    console.log('\n✅ RENEWAL ALLOWED');
    console.log('   Reason: Subscription is expired or not set');
    
    // Calculate new dates
    const additionalDays = 30;
    const baseDate = currentEnd && currentEnd > now ? currentEnd : now;
    const newEndDate = new Date(baseDate.getTime() + additionalDays * 24 * 60 * 60 * 1000);
    
    console.log('\n📝 New Subscription:');
    console.log('   Start:', now.toLocaleDateString());
    console.log('   End:', newEndDate.toLocaleDateString());
    console.log('   Duration:', additionalDays, 'days');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

simulateRenewalLogic();
