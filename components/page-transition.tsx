"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(false)
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      className={`transition-all duration-500 ${className}`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0px) scale(1)" : "translateY(20px) scale(0.98)",
      }}
    >
      {children}
    </div>
  )
}
