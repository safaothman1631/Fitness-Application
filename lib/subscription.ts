// Subscription utility functions

export interface SubscriptionStatus {
  isActive: boolean
  isExpired: boolean
  daysRemaining: number
  expiryDate: Date | null
}

/**
 * Check subscription status based on expiry date
 * Returns subscription status object
 */
export function checkSubscriptionStatus(expiryDateString: string | null): SubscriptionStatus {
  if (!expiryDateString) {
    return {
      isActive: false,
      isExpired: true,
      daysRemaining: 0,
      expiryDate: null,
    }
  }

  const expiryDate = new Date(expiryDateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  expiryDate.setHours(0, 0, 0, 0)

  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return {
    isActive: diffDays > 0,
    isExpired: diffDays <= 0,
    daysRemaining: Math.max(0, diffDays),
    expiryDate,
  }
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
export function setSubscriptionExpiry(date: Date | string): void {
  if (typeof window === 'undefined') return
  const dateString = typeof date === 'string' ? date : date.toISOString()
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
 * Call this after login to set up user-specific subscriptions
 */
export function initializeUserSubscription(email: string): void {
  if (typeof window === 'undefined') return

  console.log('🔐 Initializing subscription for:', email)

  // Check if already initialized for this user
  const lastEmail = localStorage.getItem('lastUserEmail')
  
  // If switching users, clear old subscription data
  if (lastEmail && lastEmail !== email) {
    console.log('👤 Switching users, clearing old data...')
    localStorage.removeItem('subscriptionExpiry')
    localStorage.removeItem('userAccessKey')
    localStorage.removeItem('userJoinDate')
  }

  // Set current user email
  localStorage.setItem('lastUserEmail', email)

  // Set subscription based on email
  if (email === 'premium@darinfitness.com') {
    // Premium user - 30 days subscription
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 30)
    setSubscriptionExpiry(expiry)
    console.log('✅ Premium user initialized with 30 days:', expiry.toISOString())
    
    // Set join date to 3 months ago
    const joinDate = new Date()
    joinDate.setMonth(joinDate.getMonth() - 3)
    localStorage.setItem('userJoinDate', joinDate.toISOString())
  } else if (email === 'warning@darinfitness.com') {
    // Warning user - 15 days subscription (yellow zone)
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + 15)
    setSubscriptionExpiry(expiry)
    console.log('⚠️ Warning user initialized with 15 days:', expiry.toISOString())
    
    // Set join date to 2 months ago
    const joinDate = new Date()
    joinDate.setMonth(joinDate.getMonth() - 2)
    localStorage.setItem('userJoinDate', joinDate.toISOString())
  } else {
    // Free user - expired subscription (including user@darinfitness.com)
    const expiry = new Date()
    expiry.setDate(expiry.getDate() - 5) // Expired 5 days ago
    setSubscriptionExpiry(expiry)
    console.log('❌ Expired user initialized with -5 days:', expiry.toISOString())
    
    // Set join date to 1 month ago
    const joinDate = new Date()
    joinDate.setMonth(joinDate.getMonth() - 1)
    localStorage.setItem('userJoinDate', joinDate.toISOString())
  }

  // Verify what was set
  const storedExpiry = localStorage.getItem('subscriptionExpiry')
  console.log('📦 Stored subscription expiry:', storedExpiry)
}
