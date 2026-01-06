/**
 * SS Component (Settings Section)
 * Reusable toggle component with RTL/LTR support
 * Supports Kurdish, Arabic (RTL) and English, Turkish (LTR)
 */

"use client"

import { useLanguage } from "@/hooks/useLanguage"
import { ReactNode } from "react"

interface ToggleItemProps {
  label: string
  description: string
  icon?: ReactNode
  emoji?: string
  value: boolean
  onChange: () => void
  gradientFrom?: string
  gradientTo?: string
  iconBgColor?: string
  shadowColor?: string
  borderColor?: string
}

/**
 * Toggle Item Component
 * Automatically adjusts layout based on language direction
 */
export function ToggleItem({
  label,
  description,
  icon,
  emoji,
  value,
  onChange,
  gradientFrom = "blue-500",
  gradientTo = "cyan-500",
  iconBgColor = "blue-500/20",
  shadowColor = "blue-500/50",
  borderColor = "blue-500/30"
}: ToggleItemProps) {
  const { language } = useLanguage()
  const isRTL = language === 'ar' || language === 'ku'

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:scale-[1.01] hover:border-${borderColor} duration-300 group/item ${
      isRTL ? 'flex-row' : 'flex-row-reverse'
    }`}>
      {/* Toggle Button */}
      <button
        onClick={onChange}
        className={`relative w-12 h-7 rounded-full transition-all duration-300 hover:scale-105 shrink-0 ${
          value ? `bg-gradient-to-r from-${gradientFrom} to-${gradientTo} shadow-lg shadow-${shadowColor}` : "bg-slate-700"
        }`}
      >
        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${
          value ? 'left-6' : 'left-1'
        }`} />
      </button>

      {/* Content (Icon + Text) */}
      <div className={`flex items-center gap-3 ${
        isRTL ? 'flex-row' : 'flex-row-reverse'
      }`}>
        {/* Text */}
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <div className="text-white font-semibold">{label}</div>
          <div className="text-xs text-slate-400">{description}</div>
        </div>

        {/* Icon or Emoji */}
        {emoji ? (
          <div className="text-2xl group-hover/item:scale-110 transition-transform duration-300 shrink-0">
            {emoji}
          </div>
        ) : icon ? (
          <div className={`w-10 h-10 rounded-xl bg-${iconBgColor} flex items-center justify-center group-hover/item:scale-105 transition-all duration-300 shrink-0`}>
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
}

/**
 * Section Header Component
 * Automatically adjusts alignment based on language direction
 */
export function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  const { language } = useLanguage()
  const isRTL = language === 'ar' || language === 'ku'

  return (
    <div className={`relative pb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`text-white flex items-center gap-2 text-xl animate-in fade-in slide-in-from-left-4 ${
        isRTL ? 'justify-end flex-row-reverse' : 'justify-start flex-row'
      }`}>
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>
      {description && (
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      )}
    </div>
  )
}

interface CardContainerProps {
  children: ReactNode
  gradientFrom?: string
  gradientTo?: string
  borderColor?: string
  shadowColor?: string
}

/**
 * Card Container Component
 * Provides consistent styling for settings sections
 */
export function CardContainer({
  children,
  gradientFrom = "blue-500/10",
  gradientTo = "cyan-600/10",
  borderColor = "blue-500/30",
  shadowColor = "blue-500/20"
}: CardContainerProps) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-${gradientFrom} to-${gradientTo} backdrop-blur-xl border border-${borderColor} group hover:scale-[1.005] hover:shadow-2xl hover:shadow-${shadowColor} transition-all duration-500 rounded-xl`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}

/**
 * Utility function to get RTL/LTR class
 */
export function useDirectionClass() {
  const { language } = useLanguage()
  const isRTL = language === 'ar' || language === 'ku'
  
  return {
    isRTL,
    textAlign: isRTL ? 'text-right' : 'text-left',
    flexDirection: isRTL ? 'flex-row-reverse' : 'flex-row',
    justify: isRTL ? 'justify-end' : 'justify-start'
  }
}
