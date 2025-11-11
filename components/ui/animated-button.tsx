"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  glow?: boolean
  full?: boolean
}

export function AnimatedButton({ className, glow = true, full = false, children, ...props }: AnimatedButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "relative overflow-hidden rounded-xl px-4 py-3 transition-all duration-300",
        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:ring-offset-0",
        glow && "shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_30px_rgba(88,28,135,0.35)]",
        full && "w-full",
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-white/10 transition-all duration-500 hover:translate-x-0" />
    </Button>
  )
}
