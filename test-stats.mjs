// Test database stats
const testStats = async () => {
  try {
    console.log('📊 Testing Database Stats\n');
    
    const response = await fetch('http://localhost:3000/api/database-stats');
    const data = await response.json();
    
    console.log('Summary:');
    console.log(`  Total Records (Users + Trainers): ${data.summary.totalRecords}`);
    console.log(`  Total Size: ${(data.summary.totalSize / 1024).toFixed(2)} KB`);
    console.log(`  Active Users (24h): ${data.summary.activeConnections}`);
    console.log(`  Uptime: ${data.summary.uptime}%`);
    console.log('');
    
    console.log('Collections:');
    data.collections.forEach(col => {
      console.log(`  ${col.name}: ${col.count} records`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testStats();
