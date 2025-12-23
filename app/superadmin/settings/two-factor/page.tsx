"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Smartphone, Key, CheckCircle, Copy, ArrowLeft } from "lucide-react"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function TwoFactorSetup() {
  const { t } = useLanguage()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [qrCode, setQrCode] = useState<string>("")
  const [secret, setSecret] = useState<string>("")
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid)
        await initializeTwoFactor(user.uid)
      }
    })
    return () => unsubscribe()
  }, [])

  const initializeTwoFactor = async (uid: string) => {
    setIsLoading(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: uid })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('2FA Setup Response:', data)
        setQrCode(data.qrCode)
        setSecret(data.secret)
      } else {
        const errorData = await response.json()
        console.error('2FA Setup Error:', errorData)
        setError(errorData.error || 'Failed to initialize 2FA')
      }
    } catch (error) {
      console.error('Error initializing 2FA:', error)
      setError('Failed to connect to server')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!userId || !verificationCode) return

    setIsVerifying(true)
    setError("")

    try {
      const token = await auth.currentUser?.getIdToken()
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          code: verificationCode
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('✅ 2FA Verification successful:', data)
        setBackupCodes(data.backupCodes)
        setStep(3)
      } else {
        console.error('❌ 2FA Verification failed:', data)
        setError(data.error || 'Invalid verification code')
      }
    } catch (error) {
      setError('Failed to verify code')
    } finally {
      setIsVerifying(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('✅ Copied to clipboard!')
  }

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to settings if no history
      router.push('/superadmin/settings')
    }
  }

  const handleComplete = () => {
    router.push('/superadmin/settings')
    router.refresh() // Force refresh the settings page
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-slate-700 text-gray-400 hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Two-Factor Authentication</h1>
                <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                    : 'bg-slate-800 text-gray-400'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step > s ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-slate-800'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Scan QR Code */}
          {step === 1 && (
            <Card className="bg-gradient-to-br from-slate-900/80 via-green-900/10 to-slate-900/80 border-green-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-green-400" />
                  Step 1: Scan QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 shadow-lg shadow-green-500/30"></div>
                    <p className="text-green-300 mt-4 font-medium">Generating QR Code...</p>
                  </div>
                ) : error ? (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <Button
                      onClick={() => userId && initializeTwoFactor(userId)}
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-gray-300 space-y-3">
                      <p>1. Download an authenticator app on your phone:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                        <li>Google Authenticator</li>
                        <li>Microsoft Authenticator</li>
                        <li>Authy</li>
                      </ul>
                      <p>2. Scan this QR code with your authenticator app:</p>
                    </div>

                    {qrCode && (
                      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl">
                        <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                        <div className="text-center w-full">
                          <p className="text-sm text-gray-600 mb-2">Or enter this code manually:</p>
                          <div className="flex items-center justify-center gap-2 bg-gray-100 px-3 py-3 rounded-lg max-w-full">
                            <code className="text-xs font-mono text-gray-800 break-all text-center leading-relaxed">{secret}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(secret)}
                              className="shrink-0"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={() => setStep(2)}
                      disabled={!qrCode}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      Continue to Verification
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Verify Code */}
          {step === 2 && (
            <Card className="bg-gradient-to-br from-slate-900/80 via-blue-900/10 to-slate-900/80 border-blue-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Key className="w-6 h-6 text-blue-400" />
                  Step 2: Verify Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-gray-300 space-y-3">
                  <p>Enter the 6-digit code from your authenticator app:</p>
                </div>

                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest bg-slate-800/50 border-slate-700 text-white"
                  />

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleVerify}
                    disabled={verificationCode.length !== 6 || isVerifying}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Enable 2FA'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Backup Codes */}
          {step === 3 && (
            <Card className="bg-gradient-to-br from-slate-900/80 via-purple-900/10 to-slate-900/80 border-purple-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Step 3: Save Backup Codes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-gray-300 space-y-3">
                  <p className="text-green-400 font-semibold">✅ Two-Factor Authentication Enabled!</p>
                  <p>Save these backup codes in a safe place. You can use them to access your account if you lose your phone:</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-800/50 rounded-xl">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-900/50 px-4 py-2 rounded-lg">
                      <code className="text-sm font-mono text-gray-300">{code}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(code)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => copyToClipboard(backupCodes.join('\n'))}
                    variant="outline"
                    className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Codes
                  </Button>
                  <Button
                    onClick={handleComplete}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
