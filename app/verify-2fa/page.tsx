"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Shield, ArrowLeft, Loader2 } from "lucide-react"
import { auth } from "@/lib/firebase"

export default function Verify2FAPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [backupCode, setBackupCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [useBackupCode, setUseBackupCode] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Check if user has pending 2FA verification
    const pending2FA = localStorage.getItem("pending2FA")
    const userId = localStorage.getItem("pending2FAUserId")
    
    if (!pending2FA || !userId) {
      router.push("/login")
    }

    // Focus first input
    inputRefs.current[0]?.focus()
  }, [router])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    if (!/^\d*$/.test(value)) {
      return
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all 6 digits entered
    if (index === 5 && value && newCode.every(c => c)) {
      handleVerify(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const newCode = [...code]
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }
    
    setCode(newCode)
    
    if (pastedData.length === 6) {
      handleVerify(pastedData)
    }
  }

  const handleVerify = async (codeToVerify?: string) => {
    const verificationCode = codeToVerify || code.join("")
    
    if (!useBackupCode && verificationCode.length !== 6) {
      toast.error(t("pleaseEnterComplete6DigitCode") || "Please enter the complete 6-digit code")
      return
    }

    if (useBackupCode && !backupCode.trim()) {
      toast.error(t("pleaseEnterBackupCode") || "Please enter a backup code")
      return
    }

    setLoading(true)

    try {
      const userId = localStorage.getItem("pending2FAUserId")
      const userEmail = localStorage.getItem("pending2FAEmail")
      const userRole = localStorage.getItem("pending2FARole")
      const redirectUrl = localStorage.getItem("pending2FARedirect")

      if (!userId) {
        throw new Error("No pending verification")
      }

      // Get ID token
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error("Not authenticated")
      }

      const idToken = await currentUser.getIdToken()

      // Verify the code
      const response = await fetch("/api/auth/2fa/verify-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({
          userId,
          code: useBackupCode ? backupCode.trim() : verificationCode,
          isBackupCode: useBackupCode
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Verification failed")
      }

      // Clear pending 2FA data
      localStorage.removeItem("pending2FA")
      localStorage.removeItem("pending2FAUserId")
      localStorage.removeItem("pending2FAEmail")
      localStorage.removeItem("pending2FARole")
      localStorage.removeItem("pending2FARedirect")

      // Set authenticated data
      localStorage.setItem("userEmail", userEmail || "")
      localStorage.setItem("userId", userId)
      localStorage.setItem("userRole", userRole || "user")
      localStorage.setItem("isAuthenticated", "true")

      toast.success(t("twoFactorVerificationSuccessful") || "2FA verification successful")

      // Redirect to dashboard
      setTimeout(() => {
        router.push(redirectUrl || "/dashboard")
      }, 500)

    } catch (error: any) {
      console.error("2FA verification error:", error)
      toast.error(error.message || t("verificationFailed") || "Verification failed")
      
      // Clear code inputs
      setCode(["", "", "", "", "", ""])
      setBackupCode("")
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    // Clear pending data
    localStorage.removeItem("pending2FA")
    localStorage.removeItem("pending2FAUserId")
    localStorage.removeItem("pending2FAEmail")
    localStorage.removeItem("pending2FARole")
    localStorage.removeItem("pending2FARedirect")
    
    // Sign out
    auth.signOut()
    
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("twoFactorAuthentication") || "Two-Factor Authentication"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {useBackupCode
                ? (t("enterBackupCode") || "Enter your backup code")
                : (t("enter6DigitCode") || "Enter the 6-digit code from your authenticator app")}
            </p>
          </div>

          {/* Code Input */}
          {!useBackupCode ? (
            <div className="flex gap-2 justify-center" dir="ltr">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-2xl font-bold"
                  disabled={loading}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder={t("backupCode") || "Backup code"}
                value={backupCode}
                onChange={(e) => setBackupCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono"
                disabled={loading}
              />
            </div>
          )}

          {/* Verify Button (only for backup code) */}
          {useBackupCode && (
            <Button
              onClick={() => handleVerify()}
              disabled={loading || !backupCode.trim()}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("verify") || "Verify"}
            </Button>
          )}

          {/* Toggle Backup Code */}
          <div className="text-center">
            <button
              onClick={() => {
                setUseBackupCode(!useBackupCode)
                setCode(["", "", "", "", "", ""])
                setBackupCode("")
                if (!useBackupCode) {
                  setTimeout(() => inputRefs.current[0]?.focus(), 100)
                }
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              disabled={loading}
            >
              {useBackupCode
                ? (t("useAuthenticatorCode") || "Use authenticator code")
                : (t("useBackupCode") || "Use backup code")}
            </button>
          </div>

          {/* Back to Login */}
          <Button
            onClick={handleBackToLogin}
            variant="outline"
            className="w-full"
            disabled={loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToLogin") || "Back to Login"}
          </Button>
        </div>
      </div>
    </div>
  )
}
