"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
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

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || isAuthenticated !== "true") {
      // Not authenticated - redirect to login
      localStorage.clear()
      const loginPath = requiredRole 
        ? `/login/${requiredRole}` 
        : redirectTo || "/giris"
      router.replace(loginPath)
      return
    }

    // Check if user has required role
    if (requiredRole && userRole !== requiredRole) {
      // Wrong role - redirect to their proper dashboard
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
  }

  return <>{children}</>
}
