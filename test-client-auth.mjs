// Test Firebase Authentication from client-side
import { initializeApp, getApps } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import dotenv from "dotenv"

dotenv.config({ path: '.env.local' })

const firebaseConfig = {
  apiKey: "AIzaSyAl-J43H10d6ZnaZYKX9GHv8quN80XjqB8",
  authDomain: "final-database-51935.firebaseapp.com",
  projectId: "final-database-51935",
  storageBucket: "final-database-51935.firebasestorage.app",
  messagingSenderId: "434316366627",
  appId: "1:434316366627:web:9ce4eb674a0878a0507296",
}

console.log('🧪 Testing Firebase Client Authentication...\n')
console.log('Config:', {
  apiKey: firebaseConfig.apiKey.substring(0, 10) + '...',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
})

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)

async function testLogin() {
  try {
    console.log('\n🔐 Attempting to login with: superadmin@fitpro.com')
    const userCredential = await signInWithEmailAndPassword(
      auth,
      'superadmin@fitpro.com',
      'SuperAdmin123!'
    )
    
    console.log('✅ Login successful!')
    console.log('User ID:', userCredential.user.uid)
    console.log('Email:', userCredential.user.email)
    console.log('Email Verified:', userCredential.user.emailVerified)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Login failed!')
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    if (error.code === 'auth/api-key-not-valid') {
      console.error('\n⚠️  API Key is invalid or restricted')
      console.error('👉 Check Firebase Console > Project Settings > Web API Key')
    }
    
    if (error.code === 'auth/invalid-api-key') {
      console.error('\n⚠️  API Key format is invalid')
    }
    
    process.exit(1)
  }
}

testLogin()
