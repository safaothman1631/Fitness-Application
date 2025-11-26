"use client"

<<<<<<< HEAD
import { useEffect, useState } from "react"
=======
import { useEffect } from "react"
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
<<<<<<< HEAD
  requiredRole?: "admin" | "superadmin" | "trainer" | "physiotherapist" | "user" | "owner" | "patient"
  redirectTo?: string
}

/**
 * Verify authentication is valid
 * Checks that required localStorage items exist
 */
function verifyAuthentication(): boolean {
  if (typeof window === 'undefined') return false
  
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const userRole = localStorage.getItem("userRole")
  const userEmail = localStorage.getItem("userEmail")
  
  // Must have all required authentication data
  return (
    isAuthenticated === "true" && 
    userRole !== null && 
    userRole.trim() !== "" &&
    userEmail !== null && 
    userEmail.trim() !== ""
  )
}

export default function AuthGuard({ children, requiredRole, redirectTo }: AuthGuardProps) {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    // Verify authentication
    const isValid = verifyAuthentication()
    
    if (!isValid) {
      // Not authenticated or missing required data - redirect to login
      console.warn("⚠️ Authentication failed: Missing or invalid credentials")
      localStorage.clear() // Clear any partial/invalid data
      const loginPath = requiredRole 
        ? `/login/${requiredRole}` 
        : redirectTo || "/giris"
      router.replace(loginPath)
      return
    }

=======
  requiredRole?: "admin" | "superadmin" | "trainer" | "physiotherapist" | "user"
  redirectTo?: string
}

export default function AuthGuard({ children, requiredRole, redirectTo }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || isAuthenticated !== "true") {
      // Not authenticated - redirect to login
<<<<<<< HEAD
      localStorage.clear()
      const loginPath = requiredRole 
        ? `/login/${requiredRole}` 
        : redirectTo || "/giris"
      router.replace(loginPath)
=======
      const loginPath = requiredRole 
        ? `/login/${requiredRole}` 
        : redirectTo || "/login"
      router.push(loginPath)
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
      return
    }

    // Check if user has required role
    if (requiredRole && userRole !== requiredRole) {
      // Wrong role - redirect to their proper dashboard
<<<<<<< HEAD
      console.warn(`⚠️ Role mismatch: Expected ${requiredRole}, got ${userRole}`)
      switch (userRole) {
        case "admin":
          router.replace("/admin")
          break
        case "superadmin":
          router.replace("/superadmin")
          break
        case "trainer":
          router.replace("/trainer")
          break
        case "physiotherapist":
          router.replace("/physiotherapist")
          break
        case "owner":
          router.replace("/owner")
          break
        case "patient":
          router.replace("/patient-panel")
          break
        default:
          router.replace("/dashboard")
      }
      return
    }
    
    // All checks passed
    setIsVerified(true)
  }, [requiredRole, redirectTo, router])

  // Only render if verified
  if (!isVerified) {
    return null // Don't render anything while verifying/redirecting
=======
      switch (userRole) {
        case "admin":
          router.push("/admin")
          break
        case "superadmin":
          router.push("/superadmin")
          break
        case "trainer":
          router.push("/trainer")
          break
        case "physiotherapist":
          router.push("/physiotherapist")
          break
        default:
          router.push("/dashboard")
      }
    }
  }, [requiredRole, redirectTo, router])

  // Check authentication before rendering
  if (typeof window !== "undefined") {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated || isAuthenticated !== "true") {
      return null // Don't render anything while redirecting
    }
>>>>>>> 9c460f7163f178fc6d372d6f20b4eaf84840edbf
  }

  return <>{children}</>
}
