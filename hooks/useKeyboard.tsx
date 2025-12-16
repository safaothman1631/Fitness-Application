/**
 * Keyboard Behavior Handler
 * Manages keyboard appearance on mobile devices
 * Pushes content up when keyboard appears
 */

"use client"

import { useEffect, useState } from 'react'

/**
 * Hook to detect keyboard visibility and adjust UI
 */
export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    // Only run on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return

    let initialHeight = window.visualViewport?.height || window.innerHeight

    const handleResize = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight
      const heightDiff = initialHeight - currentHeight

      if (heightDiff > 150) {
        // Keyboard is visible
        setKeyboardHeight(heightDiff)
        setIsKeyboardVisible(true)
        
        // Add class to body for global styles
        document.body.classList.add('keyboard-visible')
        
        // Scroll focused element into view
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && activeElement.tagName !== 'BODY') {
          setTimeout(() => {
            activeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            })
          }, 100)
        }
      } else {
        // Keyboard is hidden
        setKeyboardHeight(0)
        setIsKeyboardVisible(false)
        document.body.classList.remove('keyboard-visible')
      }
    }

    // Listen to visual viewport resize
    window.visualViewport?.addEventListener('resize', handleResize)
    window.addEventListener('resize', handleResize)

    // Listen to focus events on inputs
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        // Wait for keyboard to appear
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          })
        }, 300)
      }
    }

    document.addEventListener('focusin', handleFocus)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('focusin', handleFocus)
      document.body.classList.remove('keyboard-visible')
    }
  }, [])

  return { keyboardHeight, isKeyboardVisible }
}

/**
 * Component that pushes content up when keyboard appears
 */
export function KeyboardAvoidingView({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight()

  return (
    <div
      className={`transition-all duration-300 ${className}`}
      style={{
        paddingBottom: isKeyboardVisible ? `${keyboardHeight}px` : '0px',
      }}
    >
      {children}
    </div>
  )
}
