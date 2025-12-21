/**
 * Database Service - Centralized API calls for all database operations
 */

import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// TypeScript interfaces for type safety
export interface CreateUserData {
  name: string
  email: string
  role: string
  phone?: string
  password?: string
}

export interface UpdateUserData {
  name?: string
  email?: string
  role?: string
  phone?: string
  status?: string
}

export interface CreatePatientData {
  name: string
  email?: string
  phone?: string
  age?: number
  condition?: string
  notes?: string
  sessionCount?: number
  [key: string]: any // Allow additional properties for flexibility
}

export interface UpdatePatientData {
  name?: string
  email?: string
  phone?: string
  age?: number
  condition?: string
  notes?: string
  status?: string
  appointment?: any
  [key: string]: any // Allow additional properties for flexibility
}

/**
 * Wait for Firebase auth to initialize
 */
function waitForAuth(): Promise<any> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        resolve(user)
      } else {
        reject(new Error('Not authenticated'))
      }
    }, reject)
    
    // Timeout after 5 seconds
    setTimeout(() => {
      unsubscribe()
      reject(new Error('Auth timeout'))
    }, 5000)
  })
}

/**
 * Get authorization headers with Firebase token
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  try {
    let user = auth.currentUser
    
    // If no current user, try to wait for auth to initialize
    if (!user) {
      console.log('⏳ Waiting for Firebase auth to initialize...')
      try {
        user = await waitForAuth()
      } catch (authError) {
        console.warn('⚠️ Auth not available, continuing without token')
        return {
          'Content-Type': 'application/json'
        }
      }
    }
    
    const token = await user.getIdToken()
    
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  } catch (error) {
    console.warn('⚠️ Failed to get auth token:', error)
    return {
      'Content-Type': 'application/json'
    }
  }
}

/**
 * Fetch wrapper with authentication
 */
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders()
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  })
  
  if (response.status === 401) {
    // Only redirect on POST/PUT/DELETE - GET requests are allowed without auth
    const method = options.method?.toUpperCase() || 'GET'
    if (method !== 'GET') {
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = '/giris'
      throw new Error('Authentication required')
    }
    console.warn('⚠️ Request without authentication, continuing...')
  }
  
  if (response.status === 403) {
    throw new Error('Insufficient permissions')
  }
  
  if (!response.ok) {
    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || 'Request failed')
    } else {
      // Non-JSON response (likely HTML error page)
      const text = await response.text()
      throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }
  }
  
  return response
}

/**
 * Safely parse JSON response with content-type check
 */
async function safeJsonParse(response: Response) {
  const contentType = response.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    const text = await response.text()
    throw new Error(`Expected JSON but received ${contentType || 'unknown'}: ${text.substring(0, 100)}`)
  }
  return response.json()
}

export const dbService = {
  // ===== USERS =====
  async getUsers(role?: string) {
    const query = role ? `?role=${role}` : ""
    const response = await authenticatedFetch(`/api/users${query}`)
    return safeJsonParse(response)
  },

  async getUserById(id: string) {
    const response = await authenticatedFetch(`/api/users/${id}`)
    return safeJsonParse(response)
  },

  async createUser(userData: CreateUserData) {
    const response = await authenticatedFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
    return safeJsonParse(response)
  },

  async updateUser(id: string, userData: UpdateUserData) {
    const response = await authenticatedFetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
    return safeJsonParse(response)
  },

  async deleteUser(id: string) {
    const response = await authenticatedFetch(`/api/users/${id}`, { 
      method: "DELETE" 
    })
    return safeJsonParse(response)
  },

  // ===== PHYSIOTHERAPIST PROFILE =====
  async getPhysiotherapistProfile(id: string) {
    try {
      const response = await authenticatedFetch(`/api/physiotherapist/profile?id=${id}`, {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        const error = await safeJsonParse(response)
        throw new Error(error.error || "Failed to fetch profile")
      }
      
      return safeJsonParse(response)
    } catch (error: any) {
      console.error("Error fetching physiotherapist profile:", error)
      throw error
    }
  },

  async updatePhysiotherapistProfile(id: string, profileData: any) {
    const response = await authenticatedFetch("/api/physiotherapist/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        physiotherapistId: id,
        ...profileData,
      }),
    })
    if (!response.ok) throw new Error("Failed to update profile")
    return safeJsonParse(response)
  },

  // ===== WORKOUTS =====
  async getWorkouts() {
    const response = await authenticatedFetch("/api/workouts")
    if (!response.ok) throw new Error("Failed to fetch workouts")
    return safeJsonParse(response)
  },

  async getWorkoutById(id: string) {
    const response = await authenticatedFetch(`/api/workouts/${id}`)
    if (!response.ok) throw new Error("Failed to fetch workout")
    return safeJsonParse(response)
  },

  async createWorkout(workoutData: any) {
    const response = await authenticatedFetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    })
    if (!response.ok) throw new Error("Failed to create workout")
    return safeJsonParse(response)
  },

  async updateWorkout(id: string, workoutData: any) {
    const response = await authenticatedFetch(`/api/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    })
    if (!response.ok) throw new Error("Failed to update workout")
    return safeJsonParse(response)
  },

  async deleteWorkout(id: string) {
    const response = await authenticatedFetch(`/api/workouts/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete workout")
    return safeJsonParse(response)
  },

  // ===== ACCESS KEYS =====
  async getAccessKeys() {
    const response = await authenticatedFetch("/api/access-keys")
    if (!response.ok) throw new Error("Failed to fetch access keys")
    return safeJsonParse(response)
  },

  async getAccessKeyById(id: string) {
    const response = await authenticatedFetch(`/api/access-keys/${id}`)
    if (!response.ok) throw new Error("Failed to fetch access key")
    return safeJsonParse(response)
  },

  async createAccessKey(keyData: any) {
    const response = await authenticatedFetch("/api/access-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(keyData),
    })
    if (!response.ok) throw new Error("Failed to create access key")
    return safeJsonParse(response)
  },

  async updateAccessKey(id: string, keyData: any) {
    const response = await authenticatedFetch(`/api/access-keys/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(keyData),
    })
    if (!response.ok) throw new Error("Failed to update access key")
    return safeJsonParse(response)
  },

  async deleteAccessKey(id: string) {
    const response = await authenticatedFetch(`/api/access-keys/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete access key")
    return safeJsonParse(response)
  },

  // ===== SETTINGS =====
  async getUserSettings(userId: string) {
    const response = await authenticatedFetch(`/api/settings/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch settings")
    return safeJsonParse(response)
  },

  async updateUserSettings(userId: string, settings: any) {
    const response = await authenticatedFetch(`/api/settings/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    if (!response.ok) throw new Error("Failed to update settings")
    return safeJsonParse(response)
  },

  // ===== PATIENTS =====
  async getPatients(physiotherapistId: string) {
    const response = await authenticatedFetch(`/api/physiotherapist/${physiotherapistId}/patients`)
    if (!response.ok) throw new Error("Failed to fetch patients")
    return safeJsonParse(response)
  },

  async getPatientById(physiotherapistId: string, patientId: string) {
    const response = await authenticatedFetch(`/api/physiotherapist/${physiotherapistId}/patients/${patientId}`)
    if (!response.ok) throw new Error("Failed to fetch patient")
    return safeJsonParse(response)
  },

  async createPatient(physiotherapistId: string, patientData: CreatePatientData) {
    const response = await authenticatedFetch(`/api/physiotherapist/${physiotherapistId}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Create patient error - Status:", response.status, "Body:", errorText)
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(`Failed to create patient: ${errorData.error} ${errorData.details || ""}`)
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
        throw new Error(`Failed to create patient (Status ${response.status}): ${errorText}`)
      }
    }
    return safeJsonParse(response)
  },

  async updatePatient(physiotherapistId: string, patientId: string, patientData: UpdatePatientData) {
    const response = await authenticatedFetch(`/api/physiotherapist/${physiotherapistId}/patients/${patientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    if (!response.ok) throw new Error("Failed to update patient")
    return safeJsonParse(response)
  },

  async deletePatient(physiotherapistId: string, patientId: string) {
    const response = await authenticatedFetch(`/api/physiotherapist/${physiotherapistId}/patients/${patientId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Delete patient error - Status:", response.status, "Body:", errorText)
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(`Failed to delete patient: ${errorData.error} ${errorData.details || ""}`)
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
        throw new Error(`Failed to delete patient (Status ${response.status}): ${errorText}`)
      }
    }
    return safeJsonParse(response)
  },

  // ===== PHYSIOTHERAPISTS =====
  async getPhysiotherapists() {
    const response = await authenticatedFetch("/api/physiotherapists")
    if (!response.ok) throw new Error("Failed to fetch physiotherapists")
    return safeJsonParse(response)
  },

  // ===== PHYSIO REQUESTS =====
  async getPhysioRequests(userId: string) {
    const response = await authenticatedFetch(`/api/physio-requests?userId=${userId}`)
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fetch physio requests error - Status:", response.status, "Body:", errorText)
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(`Failed to fetch physio requests: ${errorData.error} ${errorData.details || ""}`)
      } catch {
        throw new Error(`Failed to fetch physio requests (Status ${response.status}): ${errorText}`)
      }
    }
    return safeJsonParse(response)
  },

  async getPhysioRequestsForPhysiotherapist(physioId: string) {
    const response = await authenticatedFetch(`/api/physio-requests?physioId=${physioId}`)
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fetch physio requests error - Status:", response.status, "Body:", errorText)
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(`Failed to fetch physio requests: ${errorData.error} ${errorData.details || ""}`)
      } catch {
        throw new Error(`Failed to fetch physio requests (Status ${response.status}): ${errorText}`)
      }
    }
    return safeJsonParse(response)
  },

  async createPhysioRequest(requestData: any) {
    const response = await authenticatedFetch("/api/physio-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Create physio request error - Status:", response.status, "Body:", errorText)
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(`Failed to create physio request: ${errorData.error} ${errorData.details || ""}`)
      } catch {
        throw new Error(`Failed to create physio request (Status ${response.status}): ${errorText}`)
      }
    }
    return safeJsonParse(response)
  },

  async updatePhysioRequest(id: string, updateData: any) {
    const response = await authenticatedFetch(`/api/physio-requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
    if (!response.ok) throw new Error("Failed to update physio request")
    return safeJsonParse(response)
  },

  async deletePhysioRequest(id: string) {
    const response = await authenticatedFetch(`/api/physio-requests/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete physio request")
    return safeJsonParse(response)
  },

  // ===== NOTIFICATIONS =====
  async getNotifications(userId: string) {
    const response = await authenticatedFetch(`/api/notifications?userId=${userId}`)
    if (!response.ok) throw new Error("Failed to fetch notifications")
    return safeJsonParse(response)
  },

  async createNotification(notificationData: {
    userId: string
    type: "success" | "warning" | "info"
    title: string
    message: string
  }) {
    const response = await authenticatedFetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    })
    if (!response.ok) throw new Error("Failed to create notification")
    return safeJsonParse(response)
  },

  async markNotificationAsRead(id: string) {
    const response = await authenticatedFetch(`/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    })
    if (!response.ok) throw new Error("Failed to mark notification as read")
    return safeJsonParse(response)
  },

  async deleteNotification(id: string) {
    const response = await authenticatedFetch(`/api/notifications/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete notification")
    return safeJsonParse(response)
  },

  // ===== PROGRESS TRACKING =====
  async getProgress(physiotherapistId: string, patientId?: string) {
    const query = patientId 
      ? `?physiotherapistId=${physiotherapistId}&patientId=${patientId}`
      : `?physiotherapistId=${physiotherapistId}`
    const response = await authenticatedFetch(`/api/progress${query}`)
    if (!response.ok) throw new Error("Failed to fetch progress records")
    return safeJsonParse(response)
  },

  async createProgress(progressData: {
    physiotherapistId: string
    patientId: string
    patientName: string
    date: string
    mobility: number
    strength: number
    pain: number
    notes: string
  }) {
    const response = await authenticatedFetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressData),
    })
    if (!response.ok) throw new Error("Failed to create progress record")
    return safeJsonParse(response)
  },

  async updateProgress(id: string, progressData: any) {
    const response = await authenticatedFetch(`/api/progress/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressData),
    })
    if (!response.ok) throw new Error("Failed to update progress record")
    return safeJsonParse(response)
  },

  async deleteProgress(id: string) {
    const response = await authenticatedFetch(`/api/progress/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete progress record")
    return safeJsonParse(response)
  },

  // ===== APPOINTMENTS =====
  async getAppointments(physiotherapistId: string) {
    const response = await authenticatedFetch(`/api/appointments?physiotherapistId=${physiotherapistId}`)
    if (!response.ok) throw new Error("Failed to fetch appointments")
    return safeJsonParse(response)
  },

  async createAppointment(appointmentData: {
    physiotherapistId: string
    patientName: string
    patientId?: string
    date: string
    time: string
    duration: number
    type: "in-person" | "video" | "phone"
    reason: string
    location?: string
    notes?: string
    fee?: number
  }) {
    const response = await authenticatedFetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
    if (!response.ok) throw new Error("Failed to create appointment")
    return safeJsonParse(response)
  },

  async updateAppointment(id: string, appointmentData: any) {
    const response = await authenticatedFetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
    if (!response.ok) throw new Error("Failed to update appointment")
    return safeJsonParse(response)
  },

  async deleteAppointment(id: string) {
    const response = await authenticatedFetch(`/api/appointments/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete appointment")
    return safeJsonParse(response)
  },

  // ===== NOTIFICATIONS =====
  async getNotifications(physiotherapistId: string) {
    const response = await authenticatedFetch(`/api/notifications?physiotherapistId=${physiotherapistId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error("Failed to fetch notifications")
    return safeJsonParse(response)
  },

  async createNotification(notificationData: {
    physiotherapistId: string
    type: "message" | "appointment" | "alert"
    title: string
    message: string
    isRead?: boolean
  }) {
    const response = await authenticatedFetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    })
    if (!response.ok) throw new Error("Failed to create notification")
    return safeJsonParse(response)
  },

  async markNotificationAsRead(id: string) {
    const response = await authenticatedFetch(`/api/notifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    })
    if (!response.ok) throw new Error("Failed to mark notification as read")
    return safeJsonParse(response)
  },

  async deleteNotification(id: string) {
    const response = await authenticatedFetch(`/api/notifications/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete notification")
    return safeJsonParse(response)
  },

  // ===== ACTIVITY LOGS =====
  async getActivityLogs(options?: { limit?: number; actorId?: string; action?: string }) {
    const params = new URLSearchParams()
    if (options?.limit) params.append("limit", options.limit.toString())
    if (options?.actorId) params.append("actorId", options.actorId)
    if (options?.action) params.append("action", options.action)
    
    const query = params.toString() ? `?${params.toString()}` : ""
    const response = await authenticatedFetch(`/api/activity-logs${query}`, { cache: 'no-store' })
    if (!response.ok) throw new Error("Failed to fetch activity logs")
    return safeJsonParse(response)
  },

  async createActivityLog(logData: {
    action: string
    actorId: string
    actorName?: string
    actorRole: string
    targetType?: string
    targetId?: string
    targetName?: string
    details?: any
    description?: string
  }) {
    const response = await authenticatedFetch("/api/activity-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    })
    if (!response.ok) throw new Error("Failed to create activity log")
    return safeJsonParse(response)
  },

  // ===== MEAL PLANS =====
  async getMealPlans(traineeId?: string) {
    const query = traineeId ? `?traineeId=${traineeId}` : ""
    const response = await authenticatedFetch(`/api/meals${query}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error("Failed to fetch meal plans")
    return safeJsonParse(response)
  },

  async createMealPlan(mealData: any) {
    const response = await authenticatedFetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mealData),
    })
    if (!response.ok) throw new Error("Failed to create meal plan")
    return safeJsonParse(response)
  },

  // ===== WORKOUT PLANS =====
  async getWorkoutPlans(traineeId?: string) {
    const query = traineeId ? `?traineeId=${traineeId}` : ""
    const response = await authenticatedFetch(`/api/workout-plans${query}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error("Failed to fetch workout plans")
    return safeJsonParse(response)
  },

  async createWorkoutPlan(workoutData: any) {
    const response = await authenticatedFetch("/api/workout-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    })
    if (!response.ok) throw new Error("Failed to create workout plan")
    return safeJsonParse(response)
  },
}
