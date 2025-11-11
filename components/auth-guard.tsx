"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "admin" | "superadmin" | "trainer" | "physiotherapist" | "user"
  redirectTo?: string
}

export default function AuthGuard({ children, requiredRole, redirectTo }: AuthGuardProps) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const userRole = localStorage.getItem("userRole")

    if (!isAuthenticated || isAuthenticated !== "true") {
      // Not authenticated - redirect to login
      const loginPath = requiredRole 
        ? `/login/${requiredRole}` 
        : redirectTo || "/login"
      router.push(loginPath)
      return
    }

    // Check if user has required role
    if (requiredRole && userRole !== requiredRole) {
      // Wrong role - redirect to their proper dashboard
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
  }

  return <>{children}</>
}
