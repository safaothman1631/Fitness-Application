/**
 * Database Service - Centralized API calls for all database operations
 */

export const dbService = {
  // ===== USERS =====
  async getUsers(role?: string) {
    const query = role ? `?role=${role}` : ""
    const response = await fetch(`/api/users${query}`)
    if (!response.ok) throw new Error("Failed to fetch users")
    return response.json()
  },

  async getUserById(id: string) {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) throw new Error("Failed to fetch user")
    return response.json()
  },

  async createUser(userData: any) {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error("Failed to create user")
    return response.json()
  },

  async updateUser(id: string, userData: any) {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
    if (!response.ok) throw new Error("Failed to update user")
    return response.json()
  },

  async deleteUser(id: string) {
    const response = await fetch(`/api/users/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete user")
    return response.json()
  },

  // ===== PHYSIOTHERAPIST PROFILE =====
  async getPhysiotherapistProfile(id: string) {
    try {
      const response = await fetch(`/api/physiotherapist/profile?id=${id}`, {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to fetch profile")
      }
      
      return response.json()
    } catch (error: any) {
      console.error("Error fetching physiotherapist profile:", error)
      throw error
    }
  },

  async updatePhysiotherapistProfile(id: string, profileData: any) {
    const response = await fetch("/api/physiotherapist/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        physiotherapistId: id,
        ...profileData,
      }),
    })
    if (!response.ok) throw new Error("Failed to update profile")
    return response.json()
  },

  // ===== WORKOUTS =====
  async getWorkouts() {
    const response = await fetch("/api/workouts")
    if (!response.ok) throw new Error("Failed to fetch workouts")
    return response.json()
  },

  async getWorkoutById(id: string) {
    const response = await fetch(`/api/workouts/${id}`)
    if (!response.ok) throw new Error("Failed to fetch workout")
    return response.json()
  },

  async createWorkout(workoutData: any) {
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    })
    if (!response.ok) throw new Error("Failed to create workout")
    return response.json()
  },

  async updateWorkout(id: string, workoutData: any) {
    const response = await fetch(`/api/workouts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    })
    if (!response.ok) throw new Error("Failed to update workout")
    return response.json()
  },

  async deleteWorkout(id: string) {
    const response = await fetch(`/api/workouts/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete workout")
    return response.json()
  },

  // ===== ACCESS KEYS =====
  async getAccessKeys() {
    const response = await fetch("/api/access-keys")
    if (!response.ok) throw new Error("Failed to fetch access keys")
    return response.json()
  },

  async getAccessKeyById(id: string) {
    const response = await fetch(`/api/access-keys/${id}`)
    if (!response.ok) throw new Error("Failed to fetch access key")
    return response.json()
  },

  async createAccessKey(keyData: any) {
    const response = await fetch("/api/access-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(keyData),
    })
    if (!response.ok) throw new Error("Failed to create access key")
    return response.json()
  },

  async updateAccessKey(id: string, keyData: any) {
    const response = await fetch(`/api/access-keys/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(keyData),
    })
    if (!response.ok) throw new Error("Failed to update access key")
    return response.json()
  },

  async deleteAccessKey(id: string) {
    const response = await fetch(`/api/access-keys/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error("Failed to delete access key")
    return response.json()
  },

  // ===== SETTINGS =====
  async getUserSettings(userId: string) {
    const response = await fetch(`/api/settings/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch settings")
    return response.json()
  },

  async updateUserSettings(userId: string, settings: any) {
    const response = await fetch(`/api/settings/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })
    if (!response.ok) throw new Error("Failed to update settings")
    return response.json()
  },

  // ===== PATIENTS =====
  async getPatients(physiotherapistId: string) {
    const response = await fetch(`/api/physiotherapist/${physiotherapistId}/patients`)
    if (!response.ok) throw new Error("Failed to fetch patients")
    return response.json()
  },

  async getPatientById(physiotherapistId: string, patientId: string) {
    const response = await fetch(`/api/physiotherapist/${physiotherapistId}/patients/${patientId}`)
    if (!response.ok) throw new Error("Failed to fetch patient")
    return response.json()
  },

  async createPatient(physiotherapistId: string, patientData: any) {
    const response = await fetch(`/api/physiotherapist/${physiotherapistId}/patients`, {
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
      } catch {
        throw new Error(`Failed to create patient (Status ${response.status}): ${errorText}`)
      }
    }
    return response.json()
  },

  async updatePatient(physiotherapistId: string, patientId: string, patientData: any) {
    const response = await fetch(`/api/physiotherapist/${physiotherapistId}/patients/${patientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData),
    })
    if (!response.ok) throw new Error("Failed to update patient")
    return response.json()
  },

  async deletePatient(physiotherapistId: string, patientId: string) {
    const response = await fetch(`/api/physiotherapist/${physiotherapistId}/patients/${patientId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Delete patient error - Status:", response.status, "Body:", errorText)
      try {
        const errorData = JSON.parse(errorText)
        throw new Error(`Failed to delete patient: ${errorData.error} ${errorData.details || ""}`)
      } catch {
        throw new Error(`Failed to delete patient (Status ${response.status}): ${errorText}`)
      }
    }
    return response.json()
  },

  // ===== PHYSIOTHERAPISTS =====
  async getPhysiotherapists() {
    const response = await fetch("/api/physiotherapists")
    if (!response.ok) throw new Error("Failed to fetch physiotherapists")
    return response.json()
  },

  // ===== PHYSIO REQUESTS =====
  async getPhysioRequests(userId: string) {
    const response = await fetch(`/api/physio-requests?userId=${userId}`)
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
    return response.json()
  },

  async getPhysioRequestsForPhysiotherapist(physioId: string) {
    const response = await fetch(`/api/physio-requests?physioId=${physioId}`)
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
    return response.json()
  },

  async createPhysioRequest(requestData: any) {
    const response = await fetch("/api/physio-requests", {
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
    return response.json()
  },

  async updatePhysioRequest(id: string, updateData: any) {
    const response = await fetch(`/api/physio-requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    })
    if (!response.ok) throw new Error("Failed to update physio request")
    return response.json()
  },

  async deletePhysioRequest(id: string) {
    const response = await fetch(`/api/physio-requests/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete physio request")
    return response.json()
  },

  // ===== NOTIFICATIONS =====
  async getNotifications(userId: string) {
    const response = await fetch(`/api/notifications?userId=${userId}`)
    if (!response.ok) throw new Error("Failed to fetch notifications")
    return response.json()
  },

  async createNotification(notificationData: {
    userId: string
    type: "success" | "warning" | "info"
    title: string
    message: string
  }) {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    })
    if (!response.ok) throw new Error("Failed to create notification")
    return response.json()
  },

  async markNotificationAsRead(id: string) {
    const response = await fetch(`/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    })
    if (!response.ok) throw new Error("Failed to mark notification as read")
    return response.json()
  },

  async deleteNotification(id: string) {
    const response = await fetch(`/api/notifications/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete notification")
    return response.json()
  },

  // ===== PROGRESS TRACKING =====
  async getProgress(physiotherapistId: string, patientId?: string) {
    const query = patientId 
      ? `?physiotherapistId=${physiotherapistId}&patientId=${patientId}`
      : `?physiotherapistId=${physiotherapistId}`
    const response = await fetch(`/api/progress${query}`)
    if (!response.ok) throw new Error("Failed to fetch progress records")
    return response.json()
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
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressData),
    })
    if (!response.ok) throw new Error("Failed to create progress record")
    return response.json()
  },

  async updateProgress(id: string, progressData: any) {
    const response = await fetch(`/api/progress/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressData),
    })
    if (!response.ok) throw new Error("Failed to update progress record")
    return response.json()
  },

  async deleteProgress(id: string) {
    const response = await fetch(`/api/progress/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete progress record")
    return response.json()
  },

  // ===== APPOINTMENTS =====
  async getAppointments(physiotherapistId: string) {
    const response = await fetch(`/api/appointments?physiotherapistId=${physiotherapistId}`)
    if (!response.ok) throw new Error("Failed to fetch appointments")
    return response.json()
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
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
    if (!response.ok) throw new Error("Failed to create appointment")
    return response.json()
  },

  async updateAppointment(id: string, appointmentData: any) {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData),
    })
    if (!response.ok) throw new Error("Failed to update appointment")
    return response.json()
  },

  async deleteAppointment(id: string) {
    const response = await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete appointment")
    return response.json()
  },

  // ===== NOTIFICATIONS =====
  async getNotifications(physiotherapistId: string) {
    const response = await fetch(`/api/notifications?physiotherapistId=${physiotherapistId}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error("Failed to fetch notifications")
    return response.json()
  },

  async createNotification(notificationData: {
    physiotherapistId: string
    type: "message" | "appointment" | "alert"
    title: string
    message: string
    isRead?: boolean
  }) {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notificationData),
    })
    if (!response.ok) throw new Error("Failed to create notification")
    return response.json()
  },

  async markNotificationAsRead(id: string) {
    const response = await fetch(`/api/notifications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    })
    if (!response.ok) throw new Error("Failed to mark notification as read")
    return response.json()
  },

  async deleteNotification(id: string) {
    const response = await fetch(`/api/notifications/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete notification")
    return response.json()
  },

  // ===== ACTIVITY LOGS =====
  async getActivityLogs(options?: { limit?: number; actorId?: string; action?: string }) {
    const params = new URLSearchParams()
    if (options?.limit) params.append("limit", options.limit.toString())
    if (options?.actorId) params.append("actorId", options.actorId)
    if (options?.action) params.append("action", options.action)
    
    const query = params.toString() ? `?${params.toString()}` : ""
    const response = await fetch(`/api/activity-logs${query}`, { cache: 'no-store' })
    if (!response.ok) throw new Error("Failed to fetch activity logs")
    return response.json()
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
    const response = await fetch("/api/activity-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    })
    if (!response.ok) throw new Error("Failed to create activity log")
    return response.json()
  },

  // ===== MEAL PLANS =====
  async getMealPlans(traineeId?: string) {
    const query = traineeId ? `?traineeId=${traineeId}` : ""
    const response = await fetch(`/api/meals${query}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error("Failed to fetch meal plans")
    return response.json()
  },

  async createMealPlan(mealData: any) {
    const response = await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mealData),
    })
    if (!response.ok) throw new Error("Failed to create meal plan")
    return response.json()
  },

  // ===== WORKOUT PLANS =====
  async getWorkoutPlans(traineeId?: string) {
    const query = traineeId ? `?traineeId=${traineeId}` : ""
    const response = await fetch(`/api/workout-plans${query}`, {
      cache: 'no-store'
    })
    if (!response.ok) throw new Error("Failed to fetch workout plans")
    return response.json()
  },

  async createWorkoutPlan(workoutData: any) {
    const response = await fetch("/api/workout-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData),
    })
    if (!response.ok) throw new Error("Failed to create workout plan")
    return response.json()
  },
}
