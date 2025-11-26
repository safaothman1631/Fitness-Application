// Test if Firebase API key is working
const https = require('https');

const API_KEY = 'AIzaSyAl-J43H10d6ZnaZYKX9GHv8quN80XjqB8';

const testData = JSON.stringify({
  email: 'test@test.com',
  password: 'test123',
  returnSecureToken: true
});

const options = {
  hostname: 'identitytoolkit.googleapis.com',
  path: `/v1/accounts:signInWithPassword?key=${API_KEY}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': testData.length
  }
};

console.log('🔑 Testing Firebase API Key...\n');
console.log('API Key:', API_KEY);
console.log('');

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const response = JSON.parse(data);
    
    if (res.statusCode === 400) {
      if (response.error && response.error.message === 'API key not valid. Please pass a valid API key.') {
        console.log('❌ API KEY IS INVALID OR RESTRICTED\n');
        console.log('🔧 SOLUTION:');
        console.log('');
        console.log('Option 1: Remove API Key Restrictions');
        console.log('1. Go to: https://console.cloud.google.com/apis/credentials?project=final-database-51935');
        console.log('2. Find your Browser API key (AIzaSyBUXCa...)');
        console.log('3. Click "Edit API key"');
        console.log('4. Under "API restrictions": Select "Don\'t restrict key"');
        console.log('5. Click SAVE');
        console.log('6. Wait 2-5 minutes');
        console.log('');
        console.log('Option 2: Create New Web App');
        console.log('1. Go to: https://console.firebase.google.com/project/final-database-51935/settings/general');
        console.log('2. Scroll to "Your apps"');
        console.log('3. Click "Add app" → Web');
        console.log('4. Register new app');
        console.log('5. Copy the NEW API key');
        console.log('6. Update .env file');
      } else if (response.error && response.error.message.includes('EMAIL_NOT_FOUND')) {
        console.log('✅ API KEY IS VALID!');
        console.log('(The test login failed because the email doesn\'t exist, but that\'s expected)');
      } else {
        console.log('Response:', response);
      }
    } else {
      console.log('✅ API KEY IS WORKING!');
      console.log('Response:', response);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Network Error:', error);
});

req.write(testData);
req.end();
