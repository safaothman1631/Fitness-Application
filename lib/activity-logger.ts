// Utility function to log activities
export async function logActivity(params: {
  userId: string
  userName: string
  userRole: string
  action: string
  details: string
  targetType?: string
  targetId?: string
  targetName?: string
}) {
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

// Common activity types
export const ACTIVITY_TYPES = {
  // Programs
  CREATE_PROGRAM: 'create_program',
  UPDATE_PROGRAM: 'update_program',
  DELETE_PROGRAM: 'delete_program',
  ASSIGN_PROGRAM: 'assign_program',
  
  // Users
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  RESET_PASSWORD: 'reset_password',
  
  // Access Keys
  CREATE_ACCESS_KEY: 'create_access_key',
  DELETE_ACCESS_KEY: 'delete_access_key',
  EXTEND_ACCESS_KEY: 'extend_access_key',
  
  // Exercises
  CREATE_EXERCISE: 'create_exercise',
  UPDATE_EXERCISE: 'update_exercise',
  DELETE_EXERCISE: 'delete_exercise',
  
  // System
  BACKUP_DATABASE: 'backup_database',
  RESTORE_DATABASE: 'restore_database',
  UPDATE_SETTINGS: 'update_settings',
  
  // Authentication
  LOGIN: 'login',
  LOGOUT: 'logout',
}

// Target types
export const TARGET_TYPES = {
  PROGRAM: 'program',
  USER: 'user',
  ACCESS_KEY: 'access_key',
  EXERCISE: 'exercise',
  SYSTEM: 'system',
}
