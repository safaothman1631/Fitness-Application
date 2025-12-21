/**
 * Activity Logger - Client Side
 * Logs all database changes for reporting and auditing
 */

export type ActivityType = 
  | 'user_created'
  | 'user_updated'
  | 'user_deleted'
  | 'user_approved'
  | 'user_rejected'
  | 'pro_approved'
  | 'pro_rejected'
  | 'subscription_renewed'
  | 'subscription_expired'
  | 'payment_recorded'
  | 'expense_added'
  | 'expense_updated'
  | 'expense_deleted'
  | 'workout_created'
  | 'workout_updated'
  | 'workout_deleted'
  | 'patient_added'
  | 'patient_updated'
  | 'patient_deleted'
  | 'settings_updated'
  | 'program_created'
  | 'program_updated'
  | 'program_deleted'
  | 'access_key_created'
  | 'access_key_deleted'

export interface ActivityLogParams {
  type: ActivityType
  performedBy: string
  performedByName?: string
  performedByRole?: string
  targetUserId?: string
  targetUserName?: string
  targetUserEmail?: string
  description: string
  metadata?: Record<string, any>
  amount?: number
  currency?: string
  category?: string
}

// Utility function to log activities
export async function logActivity(params: ActivityLogParams) {
  try {
    const response = await fetch('/api/activity-logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      console.error('Failed to log activity:', await response.text())
    }
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}

// Common activity types (for backward compatibility)
export const ACTIVITY_TYPES = {
  // Programs
  CREATE_PROGRAM: 'program_created' as ActivityType,
  UPDATE_PROGRAM: 'program_updated' as ActivityType,
  DELETE_PROGRAM: 'program_deleted' as ActivityType,
  
  // Users
  CREATE_USER: 'user_created' as ActivityType,
  UPDATE_USER: 'user_updated' as ActivityType,
  DELETE_USER: 'user_deleted' as ActivityType,
  
  // Access Keys
  CREATE_ACCESS_KEY: 'access_key_created' as ActivityType,
  DELETE_ACCESS_KEY: 'access_key_deleted' as ActivityType,
  
  // Workouts
  CREATE_WORKOUT: 'workout_created' as ActivityType,
  UPDATE_WORKOUT: 'workout_updated' as ActivityType,
  DELETE_WORKOUT: 'workout_deleted' as ActivityType,
  
  // Patients
  CREATE_PATIENT: 'patient_added' as ActivityType,
  UPDATE_PATIENT: 'patient_updated' as ActivityType,
  DELETE_PATIENT: 'patient_deleted' as ActivityType,
  
  // PRO
  APPROVE_PRO: 'pro_approved' as ActivityType,
  REJECT_PRO: 'pro_rejected' as ActivityType,
  
  // Subscription
  RENEW_SUBSCRIPTION: 'subscription_renewed' as ActivityType,
  
  // Payment
  RECORD_PAYMENT: 'payment_recorded' as ActivityType,
  
  // Expense
  ADD_EXPENSE: 'expense_added' as ActivityType,
  UPDATE_EXPENSE: 'expense_updated' as ActivityType,
  DELETE_EXPENSE: 'expense_deleted' as ActivityType,
}
