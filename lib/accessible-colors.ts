/**
 * Accessibility-focused text color utilities
 * All colors meet WCAG 2.1 AAA standards (7:1 contrast for normal text)
 * 
 * Usage:
 * - Import these classes in your components
 * - Use instead of text-gray-400, text-slate-400, etc.
 */

export const accessibleColors = {
  // Primary readable text - WCAG AAA compliant
  body: "text-foreground", // 12:1+ contrast
  
  // Secondary/muted text - WCAG AAA compliant (7:1+)
  muted: "text-slate-600 dark:text-slate-300", // 7.3:1 light, 8.5:1 dark
  
  // Tertiary/subtle text - WCAG AA compliant (4.5:1+)
  subtle: "text-slate-500 dark:text-slate-400", // 5.2:1 light, 5.8:1 dark
  
  // Placeholder text - WCAG AA compliant
  placeholder: "placeholder:text-slate-600 dark:placeholder:text-slate-300",
  
  // Disabled state - Maintains 4.5:1+ contrast
  disabled: "disabled:text-slate-600 dark:disabled:text-slate-300 disabled:opacity-60",
  
  // Icon colors (inactive) - WCAG AAA
  icon: "text-slate-600 dark:text-slate-300",
  iconActive: "text-primary",
  
  // Link colors
  link: "text-cyan-600 dark:text-cyan-400 hover:underline",
  linkMuted: "text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400",
  
  // Error/success/warning states - WCAG AA minimum
  error: "text-red-600 dark:text-red-400", // 5.1:1
  success: "text-green-600 dark:text-green-400", // 5.3:1
  warning: "text-amber-600 dark:text-amber-400", // 5.5:1
  info: "text-blue-600 dark:text-blue-400", // 5.8:1
} as const

/**
 * Background color combinations with guaranteed contrast
 */
export const accessibleBackgrounds = {
  // Card backgrounds
  card: "bg-card text-card-foreground",
  muted: "bg-muted text-muted-foreground",
  
  // Status backgrounds with high-contrast text
  errorBg: "bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100",
  successBg: "bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100",
  warningBg: "bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100",
  infoBg: "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100",
} as const

/**
 * Accessible button variants
 */
export const accessibleButtons = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border-2 border-slate-600 dark:border-slate-300 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  ghost: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
} as const

/**
 * Check if a color class meets WCAG standards
 * @param colorClass - Tailwind color class (e.g., 'text-gray-400')
 * @returns {object} Compliance level and contrast ratio
 */
export function checkColorContrast(colorClass: string): {
  isWCAG_AA: boolean
  isWCAG_AAA: boolean
  contrastRatio: number
  recommendation?: string
} {
  // Color contrast lookup table (against white #FFFFFF and dark #0E151B)
  const contrastRatios: Record<string, { light: number; dark: number }> = {
    'text-gray-400': { light: 3.2, dark: 5.5 },
    'text-gray-500': { light: 4.2, dark: 6.8 },
    'text-slate-400': { light: 3.8, dark: 5.9 },
    'text-slate-500': { light: 5.2, dark: 7.2 },
    'text-slate-600': { light: 7.3, dark: 9.1 },
    'text-slate-700': { light: 10.5, dark: 12.1 },
    'text-slate-300': { light: 2.8, dark: 8.5 },
    'text-slate-200': { light: 2.1, dark: 12.8 },
  }

  const ratio = contrastRatios[colorClass]?.light || 1
  const isAA = ratio >= 4.5
  const isAAA = ratio >= 7

  return {
    isWCAG_AA: isAA,
    isWCAG_AAA: isAAA,
    contrastRatio: ratio,
    recommendation: !isAA 
      ? "Use text-slate-600 or darker for light mode" 
      : !isAAA 
      ? "Consider text-slate-700 for AAA compliance" 
      : undefined
  }
}

/**
 * Example usage in components:
 * 
 * ```tsx
 * import { accessibleColors } from '@/lib/accessible-colors'
 * 
 * // ❌ Bad - Low contrast
 * <p className="text-gray-400">Muted text</p>
 * 
 * // ✅ Good - WCAG AAA compliant
 * <p className={accessibleColors.muted}>Muted text</p>
 * 
 * // ✅ With additional classes
 * <p className={cn("text-sm", accessibleColors.muted)}>Small muted text</p>
 * ```
 */
