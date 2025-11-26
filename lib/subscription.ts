// Subscription utility functions

export interface SubscriptionStatus {
  isActive: boolean
  isExpired: boolean
  daysRemaining: number
  expiryDate: Date | null
  type: 'FREE' | 'PRO' // جۆری بەشداریکردن    }
  }

  const expiryDate = new Date(expiryDateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  expiryDate.setHours(0, 0, 0, 0)

  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const isActive = diffDays > 0
  const isExpired = diffDays <= 0
  const daysRemaining = Math.max(0, diffDays)
  
  // جۆری بەشداریکردن بەپێی رۆژەکانی ماوە
  const type = daysRemaining > 30 ? 'PRO' : 'FREE'

  return {
    isActive,
    isExpired,
    daysRemaining,
    expiryDate,
    type,  }
}

/**
 * Get subscription expiry date from localStorage
 */
export function getSubscriptionExpiry(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('subscriptionExpiry')
}

/**
 * Set subscription expiry date in localStorage
 */
export function setSubscriptionExpiry(date: Date | string | any): void {
  if (typeof window === 'undefined') return
  
  let dateString: string
  
  if (typeof date === 'string') {
    dateString = date
  } else if (date && typeof date.toDate === 'function') {
    // Firestore Timestamp
    dateString = date.toDate().toISOString()
  } else if (date && typeof date.toISOString === 'function') {
    // JavaScript Date
    dateString = date.toISOString()
  } else {
    console.warn('Invalid date format:', date)
    return
  }
    localStorage.setItem('subscriptionExpiry', dateString)
}

/**
 * Check if user has access to premium features
 */
export function hasPremiumAccess(): boolean {
  const expiry = getSubscriptionExpiry()
  const status = checkSubscriptionStatus(expiry)
  return status.isActive
}

/**
<<<<<<< HEAD
 * Get subscription type (FREE or PRO)
 */
export function getSubscriptionType(): 'FREE' | 'PRO' {
  const expiry = getSubscriptionExpiry()
  const status = checkSubscriptionStatus(expiry)
  return status.type
}

/**
 * Check if user is PRO member
 */
export function isProMember(): boolean {
  return getSubscriptionType() === 'PRO'
}

/**
=======
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
 * Mock function to set a test subscription
 * For development/testing only
 */
export function setTestSubscription(daysFromNow: number): void {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  setSubscriptionExpiry(date)
}

/**
 * Generate a unique access key for user
 */
export function generateAccessKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments = 4
  const segmentLength = 4
  
  const keySegments: string[] = []
  
  for (let i = 0; i < segments; i++) {
    let segment = ''
    for (let j = 0; j < segmentLength; j++) {
      segment += chars[Math.floor(Math.random() * chars.length)]
    }
    keySegments.push(segment)
  }
  
  return keySegments.join('-')
}

/**
 * Get user's access key from localStorage
 * If not exists, generate a new one
 */
export function getUserAccessKey(): string {
  if (typeof window === 'undefined') return 'XXXX-XXXX-XXXX-XXXX'
  
  let key = localStorage.getItem('userAccessKey')
  if (!key) {
    key = generateAccessKey()
    localStorage.setItem('userAccessKey', key)
  }
  return key
}

/**
 * Get user's join date from localStorage
 */
export function getUserJoinDate(): string {
  if (typeof window === 'undefined') return new Date().toISOString()
  
  let joinDate = localStorage.getItem('userJoinDate')
  if (!joinDate) {
    joinDate = new Date().toISOString()
    localStorage.setItem('userJoinDate', joinDate)
  }
  return joinDate
}

/**
 * Initialize subscription for specific user accounts
 * Call this after login to set up user-specific subscriptions from Firestore
 */
export async function initializeUserSubscription(userId?: string, email?: string): Promise<void> {
  if (typeof window === 'undefined') return

  console.log('🔐 Initializing subscription for user:', userId || email)

  // Check if already initialized for this user
  const lastEmail = localStorage.getItem('lastUserEmail')
  
  // If switching users, clear old subscription data
  if (email && lastEmail && lastEmail !== email) {
    console.log('👤 Switching users, clearing old data...')
    localStorage.removeItem('subscriptionExpiry')
    localStorage.removeItem('userAccessKey')
    localStorage.removeItem('userJoinDate')
  }

  // Set current user email
  if (email) {
    localStorage.setItem('lastUserEmail', email)
  }

  // If we have userId, fetch subscription data from Firestore
  if (userId) {
    try {
      const { doc, getDoc } = await import('firebase/firestore')
      const { db } = await import('@/lib/firebase')
      
      const userDoc = await getDoc(doc(db, 'users', userId))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        
        // Set subscription expiry from Firestore
        if (userData.subscriptionEnd) {
          setSubscriptionExpiry(userData.subscriptionEnd)
          console.log('✅ Subscription loaded from Firestore:', userData.subscriptionEnd)
        }
        
        // Set join date from Firestore
        if (userData.joinDate) {
          localStorage.setItem('userJoinDate', userData.joinDate)
        }
        
        console.log('📊 Subscription status:', userData.subscriptionStatus)
        console.log('📦 Days remaining:', checkSubscriptionStatus(userData.subscriptionEnd).daysRemaining)
        
        return
      }
    } catch (error) {
      console.error('❌ Error fetching subscription from Firestore:', error)
    }
  }

  // Fallback: Set subscription based on email (for backward compatibility)
  if (email === 'premium@darinfitness.com' || email === 'newuser@fitpro.com') {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)
    setSubscriptionExpiry(expiry)
    console.log('✅ Premium user initialized with 30 days')
  } else if (email === 'warning@darinfitness.com' || email === 'miduser@fitpro.com') {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 15)
    setSubscriptionExpiry(expiry)
    console.log('⚠️ Mid-tier user initialized with 15 days')
  } else if (email === 'superadmin@fitpro.com') {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 365)
    setSubscriptionExpiry(expiry)
    console.log('👑 Superadmin initialized with 365 days')
  } else {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() - 5)
    setSubscriptionExpiry(expiry)
    console.log('❌ Expired user initialized')
  }
}
