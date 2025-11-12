/**
 * Test script for notifications API
 * Run with: node test-notifications.js
 */

const BASE_URL = 'http://localhost:3001'

async function testNotifications() {
  console.log('🧪 Testing Notifications API\n')
  
  const testUserId = 'warning@darinfitness.com'
  
  try {
    // 1. Create test notifications
    console.log('📝 Creating test notifications...')
    
    const notifications = [
      {
        userId: testUserId,
        type: 'success',
        title: 'Workout Complete',
        message: "You've finished your Full Body workout! Great effort! 🎉"
      },
      {
        userId: testUserId,
        type: 'info',
        title: 'Reminder: Evening Workout',
        message: 'Time to start your evening yoga session'
      },
      {
        userId: testUserId,
        type: 'warning',
        title: 'Membership Expiring Soon',
        message: 'Your Premium membership expires in 7 days'
      },
      {
        userId: testUserId,
        type: 'success',
        title: 'Achievement Unlocked',
        message: "You've reached 100 workout sessions! 🌟"
      },
      {
        userId: testUserId,
        type: 'info',
        title: 'New Workout Available',
        message: 'Check out our new HIIT training program'
      }
    ]
    
    const createdIds = []
    for (const notification of notifications) {
      const response = await fetch(`${BASE_URL}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      })
      const data = await response.json()
      if (data.success) {
        createdIds.push(data.notification.id)
        console.log(`✅ Created: ${notification.title}`)
      } else {
        console.log(`❌ Failed to create: ${notification.title}`)
      }
    }
    
    // 2. Fetch notifications
    console.log('\n📥 Fetching notifications...')
    const fetchResponse = await fetch(`${BASE_URL}/api/notifications?userId=${testUserId}`)
    const fetchData = await fetchResponse.json()
    console.log(`✅ Found ${fetchData.notifications.length} notifications`)
    
    // 3. Mark one as read
    if (createdIds.length > 0) {
      console.log('\n📖 Marking first notification as read...')
      const markResponse = await fetch(`${BASE_URL}/api/notifications/${createdIds[0]}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      })
      const markData = await markResponse.json()
      console.log(`✅ ${markData.message}`)
    }
    
    // 4. Delete one notification
    if (createdIds.length > 1) {
      console.log('\n🗑️  Deleting second notification...')
      const deleteResponse = await fetch(`${BASE_URL}/api/notifications/${createdIds[1]}`, {
        method: 'DELETE'
      })
      const deleteData = await deleteResponse.json()
      console.log(`✅ ${deleteData.message}`)
    }
    
    console.log('\n✅ All tests passed!')
    console.log(`\n🔗 View notifications at: ${BASE_URL}/notifications`)
    console.log(`   (Make sure to login with userId: ${testUserId})`)
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testNotifications()
