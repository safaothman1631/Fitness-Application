// Test /api/users endpoint
const testApiUsers = async () => {
  try {
    console.log('🧪 Testing /api/users endpoint...\n');
    
    const response = await fetch('http://localhost:3000/api/users');
    
    console.log('📊 Response Status:', response.status);
    console.log('📊 Response Status Text:', response.statusText);
    console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ API Response Success!');
      console.log(`   Found ${Array.isArray(data) ? data.length : 0} users`);
      
      if (Array.isArray(data) && data.length > 0) {
        console.log('\n👥 Sample users:');
        data.slice(0, 3).forEach(user => {
          console.log(`   - ${user.email} (${user.role})`);
        });
      }
    } else {
      console.log('\n❌ API Error:', data);
    }
    
  } catch (error) {
    console.error('❌ Fetch Error:', error.message);
  }
};

testApiUsers();
