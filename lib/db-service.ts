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
}
