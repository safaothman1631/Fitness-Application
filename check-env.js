// Quick script to check if environment variables are loaded
console.log('🔍 Checking Environment Variables:')
console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Found' : '❌ Missing')
console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Found' : '❌ Missing')
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Found' : '❌ Missing')
console.log('\nFull API Key (first 10 chars):', process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) || 'Not found')
