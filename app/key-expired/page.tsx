"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Key, CreditCard, UserCog, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function KeyExpiredPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [user, setUser] = useState<{
    name?: string
    email: string
    accessKey?: string
    keyExpiryDate?: string
  } | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-red-950 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-500 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-red-500 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="relative max-w-3xl w-full bg-gradient-to-br from-red-900/90 to-red-950/90 backdrop-blur-xl border-2 border-red-500/50 shadow-2xl shadow-red-500/20">
        <div className="p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-50 animate-ping" />

              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl shadow-red-500/50 border-4 border-red-400/30">
                <AlertCircle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white animate-pulse" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg px-4">
              {t("keyExpired") || "Erişim Anahtarı Süresi Doldu"}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-red-200 mb-2 px-4">
              {t("keyExpiredSubtitle") || "Hesabınıza erişim sağlayabilmek için anahtarınızı yenilemeniz gerekmektedir"}
            </p>
          </div>

          <Card className="bg-red-950/50 border-red-500/30 p-4 sm:p-5 md:p-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
                <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-red-300">{t("user") || "Kullanıcı"}</p>
                <p className="text-base sm:text-lg font-bold text-white truncate">{user.name || user.email}</p>
              </div>
            </div>

            {user.accessKey && (
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-red-300">{t("accessKey") || "Erişim Anahtarı"}</p>
                <code className="block px-3 sm:px-4 py-2 sm:py-3 bg-red-950/70 rounded-lg font-mono text-xs sm:text-sm text-red-200 border border-red-500/30 break-all">
                  {user.accessKey}
                </code>
              </div>
            )}

            {user.keyExpiryDate && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-red-500/30">
                <p className="text-xs sm:text-sm text-red-300">{t("keyExpiryDate") || "Son Kullanma Tarihi"}</p>
                <p className="text-base sm:text-lg font-semibold text-red-200">
                  {new Date(user.keyExpiryDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </Card>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 px-4">
              {t("whatToDoNext") || "Ne Yapmalısınız?"}
            </h2>

            <Card className="bg-red-950/30 border-red-500/30 p-4 sm:p-5 hover:bg-red-950/50 transition-colors">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                    {t("makePayment") || "1. Ödeme Yapın"}
                  </h3>
                  <p className="text-sm sm:text-base text-red-200 leading-relaxed">
                    {t("makePaymentDesc") ||
                      "Üyeliğinizi yenilemek için ödeme yapmanız gerekmektedir. Ödeme işlemini tamamladıktan sonra anahtarınız otomatik olarak yenilenecektir."}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-red-950/30 border-red-500/30 p-4 sm:p-5 hover:bg-red-950/50 transition-colors">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center flex-shrink-0">
                  <UserCog className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                    {t("contactAdmin") || "2. Yönetici ile İletişime Geçin"}
                  </h3>
                  <p className="text-sm sm:text-base text-red-200 leading-relaxed">
                    {t("contactAdminDesc") ||
                      "Anahtarınızı yeniden aktifleştirmek için sistem yöneticiniz veya salon sorumlusu ile iletişime geçin. Size yeni bir erişim anahtarı veya mevcut anahtarınızın süresini uzatabilirler."}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={() => router.push("/payment")}
              className="flex-1 h-12 sm:h-14 text-base sm:text-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/30"
            >
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t("goToPayment") || "Ödeme Sayfasına Git"}
            </Button>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="h-12 sm:h-14 text-base sm:text-lg bg-transparent border-2 border-red-500/50 text-white hover:bg-red-950/50"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t("logout") || "Çıkış Yap"}
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-red-500/30 text-center px-4">
            <p className="text-xs sm:text-sm text-red-300">
              {t("needHelp") || "Yardıma mı ihtiyacınız var?"}{" "}
              <a
                href="mailto:support@darinfitness.com"
                className="text-red-400 hover:text-red-300 underline font-semibold break-all"
              >
                support@darinfitness.com
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
