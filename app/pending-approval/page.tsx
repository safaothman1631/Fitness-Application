"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle2, XCircle, LogOut } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { doc, getDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

export default function PendingApprovalPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const isRTL = language === "ar" || language === "ku"
  const [userEmail, setUserEmail] = useState("")
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    checkApprovalStatus()
    // Check every 10 seconds
    const interval = setInterval(checkApprovalStatus, 10000)
    return () => clearInterval(interval)
  }, [])

  const checkApprovalStatus = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const email = localStorage.getItem("userEmail")
      
      if (!userId) {
        router.push("/login")
        return
      }

      setUserEmail(email || "")
      
      // Check user status
      const userDoc = await getDoc(doc(db, "users", userId))
      
      if (userDoc.exists()) {
        const userData = userDoc.data()
        
        // If user has a role other than "user", they're approved
        if (userData.role && userData.role !== "user") {
          // Redirect to appropriate dashboard based on role
          switch (userData.role) {
            case "physiotherapist":
            case "admin-physiotherapist":
              router.push("/physiotherapist")
              break
            case "trainer":
              router.push("/trainer")
              break
            case "superadmin":
              router.push("/superadmin")
              break
            default:
              router.push("/user-dashboard")
          }
          return
        }
        
        // Check if approved by checking status
        if (userData.status === "active" && userData.approvedDate) {
          router.push("/user-dashboard")
          return
        }
      }
      
      setChecking(false)
    } catch (error) {
      console.error("Error checking approval status:", error)
      setChecking(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl bottom-20 right-10 animate-pulse"></div>
      </div>

      <Card className="relative z-10 max-w-md w-full border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto shadow-xl">
              <Clock className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h1 
            className="text-3xl font-bold text-white mb-4"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            {language === "ku" && "چاوەڕوانی پەسەندکردن"}
            {language === "ar" && "في انتظار الموافقة"}
            {language === "en" && "Pending Approval"}
            {language === "tr" && "Onay Bekleniyor"}
          </h1>

          {/* Message */}
          <p 
            className="text-slate-300 mb-6 text-lg leading-relaxed"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
          >
            {language === "ku" && "چاوەڕوان بە تا ئەکاونتەکەت لەلایەن بەڕێوەبەران پەسەند دەکرێت. ئیمەیڵێکت بۆ دەنێردرێت کاتێک ئەکاونتەکەت پەسەند کرا."}
            {language === "ar" && "يرجى الانتظار حتى تتم الموافقة على حسابك من قبل المسؤولين. سيتم إرسال بريد إلكتروني إليك عند الموافقة على حسابك."}
            {language === "en" && "Please wait until your account is approved by administrators. You will receive an email when your account is approved."}
            {language === "tr" && "Hesabınız yöneticiler tarafından onaylanana kadar lütfen bekleyin. Hesabınız onaylandığında size bir e-posta gönderilecektir."}
          </p>

          {/* Email display */}
          {userEmail && (
            <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <p className="text-sm text-slate-400 mb-1">
                {language === "ku" && "ئیمەیڵ"}
                {language === "ar" && "البريد الإلكتروني"}
                {language === "en" && "Email"}
                {language === "tr" && "E-posta"}
              </p>
              <p className="text-white font-medium">{userEmail}</p>
            </div>
          )}

          {/* Status indicators */}
          <div className="space-y-3 mb-8">
            <div 
              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <span className="text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                {language === "ku" && "تۆمارکردن تەواو بوو"}
                {language === "ar" && "التسجيل مكتمل"}
                {language === "en" && "Registration Complete"}
                {language === "tr" && "Kayıt Tamamlandı"}
              </span>
            </div>
            <div 
              className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30"
              style={{ direction: isRTL ? "rtl" : "ltr" }}
            >
              <span className="text-yellow-400 flex items-center gap-2">
                <Clock className="w-5 h-5 animate-pulse" />
                {language === "ku" && "چاوەڕوانی پەسەندکردن..."}
                {language === "ar" && "في انتظار الموافقة..."}
                {language === "en" && "Awaiting Approval..."}
                {language === "tr" && "Onay Bekleniyor..."}
              </span>
            </div>
          </div>

          {/* Logout button */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/10 hover:bg-white/5"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t("logout")}
          </Button>

          {/* Auto-refresh notice */}
          <p className="text-xs text-slate-500 mt-4">
            {language === "ku" && "ئەم پەڕەیە بە خۆکاری نوێ دەبێتەوە"}
            {language === "ar" && "يتم تحديث هذه الصفحة تلقائياً"}
            {language === "en" && "This page refreshes automatically"}
            {language === "tr" && "Bu sayfa otomatik olarak yenilenir"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
