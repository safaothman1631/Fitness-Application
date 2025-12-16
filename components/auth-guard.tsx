"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "superadmin" | "trainer" | "physiotherapist" | "user" | "owner" | "patient" | "admin-physiotherapist"
  allowedRoles?: string[]
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

export default function AuthGuard({ children, requiredRole, allowedRoles, redirectTo }: AuthGuardProps) {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [hasCheckedOnce, setHasCheckedOnce] = useState(false)

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 Firebase auth state changed:', user ? user.email : 'No user')
      setHasCheckedOnce(true)
      
      // If Firebase says user is logged in
      if (user) {
        // Verify localStorage also has the data
        const isValid = verifyAuthentication()
        
        if (!isValid) {
          console.warn("⚠️ Firebase authenticated but localStorage missing - this is a page refresh")
          // User is logged in Firebase but localStorage cleared (page refresh)
          // Allow them to stay - set verified to true
          setIsVerified(true)
          setIsCheckingAuth(false)
          return
        }
        
        // Check role requirements
        const userRole = localStorage.getItem("userRole")
        
        // Check if user is pending approval
        if (userRole === "pending") {
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = "/pending-approval"
            }, 100)
          }
          return
        }
        
        // Check if user has required role
        const hasRequiredRole = requiredRole ? userRole === requiredRole : true
        const hasAllowedRole = allowedRoles ? allowedRoles.includes(userRole || "") : true
        
        if (!hasRequiredRole && !hasAllowedRole) {
          // Wrong role - redirect to their proper dashboard
          console.warn(`⚠️ Role mismatch: Expected ${requiredRole}, got ${userRole}`)
          setIsCheckingAuth(false)
          
          if (typeof window !== 'undefined') {
            const redirectPath = userRole === "admin" ? "/admin"
              : userRole === "superadmin" ? "/superadmin"
              : userRole === "trainer" ? "/trainer"
              : userRole === "physiotherapist" ? "/physiotherapist"
              : userRole === "owner" ? "/owner"
              : userRole === "patient" ? "/patient-panel"
              : "/dashboard"
            
            setTimeout(() => {
              window.location.href = redirectPath
            }, 100)
          }
        } else {
          // All checks passed
          setIsVerified(true)
          setIsCheckingAuth(false)
        }
      } else {
        // Firebase says no user
        // Only redirect if we've actually checked (not just initializing)
        if (hasCheckedOnce) {
          console.warn("⚠️ No Firebase user after check - redirecting to login")
          const loginPath = redirectTo || "/login"
          
          setIsCheckingAuth(false)
          
          // Use setTimeout to avoid race conditions with router
          if (typeof window !== 'undefined') {
            setTimeout(() => {
              window.location.href = loginPath
            }, 100)
          }
        } else {
          console.log("⏳ Waiting for Firebase to initialize...")
        }
      }
    })
    
    // Cleanup subscription
    return () => unsubscribe()
  }, [requiredRole, allowedRoles, redirectTo, router, hasCheckedOnce])

  // Show loading while checking
  if (isCheckingAuth) {
    return null
  }

  // Only render if verified
  if (!isVerified) {
    return null
  }

  return <>{children}</>
}
