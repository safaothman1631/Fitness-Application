"use client"

import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`transition-all duration-[400ms] ease-out ${className}`}
      style={{
        opacity: isLoaded ? 1 : 0,
        filter: isLoaded ? "blur(0px)" : "blur(8px)",
        transform: isLoaded ? "scale(1)" : "scale(1.02)"
      }}
    >
      {children}
    </div>
  )
}
