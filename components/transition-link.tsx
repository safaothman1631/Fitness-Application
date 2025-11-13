"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ComponentProps } from "react"

interface TransitionLinkProps extends Omit<ComponentProps<typeof Link>, "onClick"> {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't prevent default for external links or # links
    if (typeof href === "string" && (href.startsWith("http") || href.startsWith("#"))) {
      onClick?.(e)
      return
    }

    e.preventDefault()
    
    // Call custom onClick if provided
    onClick?.(e)

    // Add Blur Fade out effect (Modern Blur style)
    const mainContent = document.querySelector("main")
    if (mainContent) {
      const transitionDiv = mainContent.querySelector("div[style*='opacity']") as HTMLElement
      if (transitionDiv) {
        transitionDiv.style.transition = "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        transitionDiv.style.opacity = "0"
        transitionDiv.style.transform = "scale(0.95)"
        transitionDiv.style.filter = "blur(12px)"
      }
    }

    // Navigate after animation
    setTimeout(() => {
      router.push(href.toString())
    }, 300)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
