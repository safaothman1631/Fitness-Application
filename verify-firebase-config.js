// Verify Firebase Configuration
// This script helps diagnose Firebase API key issues

const https = require('https');

// Read from .env file
const fs = require('fs');
const envContent = fs.readFileSync('.env', 'utf8');
const apiKeyMatch = envContent.match(/NEXT_PUBLIC_FIREBASE_API_KEY=(.+)/);
const projectIdMatch = envContent.match(/NEXT_PUBLIC_FIREBASE_PROJECT_ID=(.+)/);

if (!apiKeyMatch || !projectIdMatch) {
  console.error('❌ Could not find Firebase config in .env file');
  process.exit(1);
}

const apiKey = apiKeyMatch[1].trim();
const projectId = projectIdMatch[1].trim();

console.log('🔍 Verifying Firebase Configuration...\n');
console.log('Project ID:', projectId);
console.log('API Key:', apiKey.substring(0, 10) + '...\n');

// Test 1: Verify API key with Firebase Auth REST API
console.log('Test 1: Checking API key validity...');
const testUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;

const postData = JSON.stringify({
  idToken: "test"
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

https.request(testUrl, options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 400) {
      try {
        const response = JSON.parse(data);
        if (response.error && response.error.message === 'API_KEY_INVALID') {
          console.error('❌ API Key is INVALID or restricted');
          console.error('\n📋 To fix this:');
          console.error('1. Go to: https://console.firebase.google.com/project/' + projectId + '/settings/general');
          console.error('2. Scroll to "Your apps" section');
          console.error('3. Find your Web app or create one');
          console.error('4. Copy the apiKey from the config');
          console.error('5. Update NEXT_PUBLIC_FIREBASE_API_KEY in .env file');
          console.error('\n🔑 Or check API key restrictions:');
          console.error('   https://console.cloud.google.com/apis/credentials?project=' + projectId);
        } else if (response.error && (response.error.message === 'INVALID_ID_TOKEN' || response.error.message.includes('INVALID'))) {
          console.log('✅ API Key is VALID (invalid token is expected for this test)');
          console.log('\n🎉 Your Firebase configuration is correct!');
          console.log('\n📝 Next steps:');
          console.log('   1. Restart dev server: Ctrl+C then npm run dev');
          console.log('   2. Hard refresh browser: Ctrl + Shift + R');
          console.log('   3. Clear browser cache or use incognito mode');
        } else {
          console.log('✅ API Key is VALID');
          console.log('   Response:', response.error ? response.error.message : 'Success');
          console.log('\n📝 Restart dev server and hard refresh browser');
        }
      } catch (e) {
        console.error('❌ Could not parse response:', data);
      }
    } else if (res.statusCode === 403) {
      console.error('❌ API Key is restricted or disabled');
      console.error('   Check: https://console.cloud.google.com/apis/credentials?project=' + projectId);
    } else if (res.statusCode === 200) {
      console.log('✅ API Key is VALID');
      console.log('\n🎉 Firebase configuration is correct!');
      console.log('\n📝 Next steps:');
      console.log('   1. Restart dev server: Ctrl+C then npm run dev');
      console.log('   2. Hard refresh browser: Ctrl + Shift + R');
    } else {
      console.log('Status:', res.statusCode);
      console.log('Response:', data);
    }
  });
}).on('error', (e) => {
  console.error('❌ Network error:', e.message);
}).end(postData);
