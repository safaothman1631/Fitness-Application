/**
 * Unified Authentication Service
 * Handles login for all user roles using Firebase Authentication
 * Determines user role from Firestore and redirects to appropriate dashboard
 */

import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export interface LoginResult {
  success: boolean
  role?: string
  userId?: string
  redirectUrl?: string
  error?: string
}

// Mock test credentials for development
const MOCK_CREDENTIALS = [
  { email: "user@darinfitness.com", password: "11111111", role: "user" },
  { email: "admin@darinfitness.com", password: "11111111", role: "admin" },
  { email: "superadmin@darinfitness.com", password: "11111111", role: "superadmin" },
  { email: "trainer@darinfitness.com", password: "11111111", role: "trainer" },
  { email: "physio@darinfitness.com", password: "11111111", role: "physiotherapist" },
  { email: "owner@darinfitness.com", password: "11111111", role: "owner" },
  { email: "patient@darinfitness.com", password: "11111111", role: "patient" },
]

/**
 * Universal login function that works for all roles
 * Authenticates with Firebase and checks Firestore for role information
 */
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    // Check mock credentials first (for development/testing)
    const mockUser = MOCK_CREDENTIALS.find(
      (cred) => cred.email === email && cred.password === password
    )
    
    if (mockUser) {
      // Mock successful login
      const redirectUrl = getRedirectUrl(mockUser.role)
      return {
        success: true,
        role: mockUser.role,
        userId: `mock-${mockUser.role}-id`,
        redirectUrl,
      }
    }

    // Try Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const userId = userCredential.user.uid

    // Check in different collections for role information
    const role = await getUserRole(userId)

    if (!role) {
      return {
        success: false,
        error: "User role not found. Please contact administrator.",
      }
    }

    // Determine redirect URL based on role
    const redirectUrl = getRedirectUrl(role)

    return {
      success: true,
      role,
      userId,
      redirectUrl,
    }
  } catch (error: any) {
    console.error("Login error:", error)
    console.error("Error code:", error.code)
    console.error("Error message:", error.message)
    
    // Handle specific Firebase auth errors
    let errorMessage = "Login failed. Please check your credentials."
    
    if (error.code === "auth/user-not-found") {
      errorMessage = "No account found with this email address."
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again."
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email address format."
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled."
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many failed attempts. Please try again later."
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Incorrect email or password. Please try again."
    } else if (error.code === "auth/network-request-failed") {
      errorMessage = "Network error. Please check your connection."
    } else if (error.message) {
      errorMessage = error.message
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

/**
 * Check multiple collections to find user role
 */
async function getUserRole(userId: string): Promise<string | null> {
  // Define collection names and their corresponding roles
  const roleCollections = [
    { collection: "users", role: "user" },
    { collection: "admins", role: "admin" },
    { collection: "superadmins", role: "superadmin" },
    { collection: "trainers", role: "trainer" },
    { collection: "physiotherapists", role: "physiotherapist" },
    { collection: "owners", role: "owner" },
    { collection: "patients", role: "patient" },
  ]

  // Check each collection for the user
  for (const { collection, role } of roleCollections) {
    try {
      const docRef = doc(db, collection, userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        // Some documents might have explicit role field
        return data.role || role
      }
    } catch (error) {
      console.error(`Error checking ${collection}:`, error)
    }
  }

  // If not found in specific collections, check if there's a general users collection with role field
  try {
    const userDocRef = doc(db, "users", userId)
    const userDocSnap = await getDoc(userDocRef)
    
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data()
      if (userData.role) {
        return userData.role
      }
    }
  } catch (error) {
    console.error("Error checking users collection:", error)
  }

  return null
}

/**
 * Get redirect URL based on user role
 */
function getRedirectUrl(role: string): string {
  const redirectMap: Record<string, string> = {
    superadmin: "/superadmin",
    admin: "/admin",
    physiotherapist: "/physiotherapist",
    trainer: "/trainer",
    owner: "/owner",
    patient: "/patient-panel",
    user: "/dashboard",
  }

  return redirectMap[role] || "/dashboard"
}

/**
 * Logout function
 */
export async function logoutUser(): Promise<void> {
  try {
    await auth.signOut()
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userId")
    }
  } catch (error) {
    console.error("Logout error:", error)
    throw error
  }
}
