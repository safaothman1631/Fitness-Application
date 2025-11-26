import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { GlobalToaster } from "@/components/global-toaster"
import { FloatingLanguageSelector } from "@/components/floating-language-selector"
import { FloatingNotificationButton } from "@/components/floating-notification-button"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "FitPro - Your Personal Fitness App",
  description: "Professional exercise programs, workout tracking, and fitness management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
            <FloatingLanguageSelector />
            <FloatingNotificationButton />
          </LanguageProvider>
          <GlobalToaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
