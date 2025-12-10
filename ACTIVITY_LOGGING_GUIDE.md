/**
 * HOW TO USE ACTIVITY LOGGING IN SUPERADMIN
 * 
 * Add this code to log activities when superadmin performs actions
 */

// 1. Import the logger at the top of your file
import { logActivity, ACTIVITY_TYPES, TARGET_TYPES } from '@/lib/activity-logger'

// 2. Get user info from localStorage
const userId = localStorage.getItem('userId') || ''
const userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'Unknown'
const userRole = localStorage.getItem('userRole') || 'superadmin'

// 3. Use it when saving/creating a program:
const handleSaveProgram = async () => {
  try {
    // Your existing save logic...
    const response = await fetch('/api/programs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(programData)
    })

    if (response.ok) {
      const savedProgram = await response.json()
      
      // LOG THE ACTIVITY
      await logActivity({
        userId,
        userName,
        userRole,
        action: programData.id ? ACTIVITY_TYPES.UPDATE_PROGRAM : ACTIVITY_TYPES.CREATE_PROGRAM,
        details: programData.id 
          ? `Updated program: ${programData.title}`
          : `Created new program: ${programData.title}`,
        targetType: TARGET_TYPES.PROGRAM,
        targetId: savedProgram.id,
        targetName: programData.title
      })

      toast.success('Program saved successfully!')
    }
  } catch (error) {
    console.error('Error saving program:', error)
  }
}

// 4. Use it when deleting a program:
const handleDeleteProgram = async (programId: string, programName: string) => {
  try {
    const response = await fetch(`/api/programs/${programId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      // LOG THE ACTIVITY
      await logActivity({
        userId,
        userName,
        userRole,
        action: ACTIVITY_TYPES.DELETE_PROGRAM,
        details: `Deleted program: ${programName}`,
        targetType: TARGET_TYPES.PROGRAM,
        targetId: programId,
        targetName: programName
      })

      toast.success('Program deleted successfully!')
    }
  } catch (error) {
    console.error('Error deleting program:', error)
  }
}

// 5. Use it when assigning program to users:
const handleAssignProgram = async (programId: string, programName: string, userIds: string[]) => {
  try {
    const response = await fetch(`/api/programs/${programId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userIds })
    })

    if (response.ok) {
      // LOG THE ACTIVITY
      await logActivity({
        userId,
        userName,
        userRole,
        action: ACTIVITY_TYPES.ASSIGN_PROGRAM,
        details: `Assigned program "${programName}" to ${userIds.length} user(s)`,
        targetType: TARGET_TYPES.PROGRAM,
        targetId: programId,
        targetName: programName
      })

      toast.success('Program assigned successfully!')
    }
  } catch (error) {
    console.error('Error assigning program:', error)
  }
}

// 6. Use it for user management:
const handleCreateUser = async (userData: any) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    if (response.ok) {
      const newUser = await response.json()
      
      // LOG THE ACTIVITY
      await logActivity({
        userId,
        userName,
        userRole,
        action: ACTIVITY_TYPES.CREATE_USER,
        details: `Created new user: ${userData.name || userData.email}`,
        targetType: TARGET_TYPES.USER,
        targetId: newUser.id,
        targetName: userData.name || userData.email
      })

      toast.success('User created successfully!')
    }
  } catch (error) {
    console.error('Error creating user:', error)
  }
}

// 7. Use it for access key management:
const handleCreateAccessKey = async (keyData: any) => {
  try {
    const response = await fetch('/api/access-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(keyData)
    })

    if (response.ok) {
      const newKey = await response.json()
      
      // LOG THE ACTIVITY
      await logActivity({
        userId,
        userName,
        userRole,
        action: ACTIVITY_TYPES.CREATE_ACCESS_KEY,
        details: `Created access key for: ${keyData.userName}`,
        targetType: TARGET_TYPES.ACCESS_KEY,
        targetId: newKey.id,
        targetName: keyData.keyValue
      })

      toast.success('Access key created!')
    }
  } catch (error) {
    console.error('Error creating access key:', error)
  }
}

// 8. Use it for database backup:
const handleBackupDatabase = async () => {
  try {
    const response = await fetch('/api/backup', {
      method: 'POST'
    })

    if (response.ok) {
      const result = await response.json()
      
      // LOG THE ACTIVITY
      await logActivity({
        userId,
        userName,
        userRole,
        action: ACTIVITY_TYPES.BACKUP_DATABASE,
        details: `Created database backup`,
        targetType: TARGET_TYPES.SYSTEM,
        targetName: 'Database Backup'
      })

      toast.success('Database backup created!')
    }
  } catch (error) {
    console.error('Error creating backup:', error)
  }
}
