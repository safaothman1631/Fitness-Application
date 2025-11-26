// Test the API route directly
async function testAPI() {
  console.log('🧪 Testing Physiotherapists API...\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/physiotherapists');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ API Error:', response.statusText);
      const text = await response.text();
      console.error('Response:', text);
      return;
    }
    
    const data = await response.json();
    console.log('✅ API Response:', JSON.stringify(data, null, 2));
    console.log('\n📊 Total:', data.length, 'physiotherapists');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
