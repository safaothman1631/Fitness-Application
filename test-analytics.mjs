// Test analytics endpoints
const testAnalytics = async () => {
  try {
    console.log('📊 Testing Analytics Endpoints\n');
    
    // Test daily active users
    console.log('🔹 Daily Active Users (last 24 hours):');
    const dailyResponse = await fetch('http://localhost:3000/api/analytics/active-users?period=daily');
    const dailyData = await dailyResponse.json();
    console.log(`   Active: ${dailyData.activeUsers} / ${dailyData.totalUsers} (${dailyData.activePercentage}%)`);
    console.log(`   By Role:`, dailyData.usersByRole);
    console.log('');
    
    // Test weekly active users
    console.log('🔹 Weekly Active Users (last 7 days):');
    const weeklyResponse = await fetch('http://localhost:3000/api/analytics/active-users?period=weekly');
    const weeklyData = await weeklyResponse.json();
    console.log(`   Active: ${weeklyData.activeUsers} / ${weeklyData.totalUsers} (${weeklyData.activePercentage}%)`);
    console.log(`   By Role:`, weeklyData.usersByRole);
    if (weeklyData.usersByDay) {
      console.log(`   By Day:`, weeklyData.usersByDay);
    }
    console.log('');
    
    // Test monthly active users
    console.log('🔹 Monthly Active Users (last 30 days):');
    const monthlyResponse = await fetch('http://localhost:3000/api/analytics/active-users?period=monthly');
    const monthlyData = await monthlyResponse.json();
    console.log(`   Active: ${monthlyData.activeUsers} / ${monthlyData.totalUsers} (${monthlyData.activePercentage}%)`);
    console.log(`   By Role:`, monthlyData.usersByRole);
    if (monthlyData.usersByDay) {
      console.log(`   Daily Breakdown:`, Object.keys(monthlyData.usersByDay).length, 'active days');
    }
    console.log('');
    
    console.log('✅ Analytics test complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testAnalytics();
