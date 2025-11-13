"use client"
import { useState } from "react"
import { dbService } from "@/lib/db-service"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

export default function AddPremiumUser() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAddUser = async () => {
    setLoading(true)
    setSuccess(false)
    try {
      // Step 1: Create user in Firebase Authentication
      const email = "premiumuser@example.com"
      const password = "PremiumUser1234" // Default password
      await createUserWithEmailAndPassword(auth, email, password)

      // Step 2: Add user data to Firestore
      await dbService.createUser({
        email,
        name: "Premium User",
        phone: "+964-750-0000000",
        role: "user",
        membership: "Premium",
      })
      setSuccess(true)
      toast.success("یوزەری بەشداری مانگانە زیادکرا!\nئیمەیل: premiumuser@example.com\nپاسوۆرد: PremiumUser1234")
    } catch (error) {
      toast.error("هەڵە لە زیادکردنی یوزەر!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 text-slate-800">زیادکردنی یوزەری بەشداری مانگانە</h2>
      <button
        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition-transform duration-150 disabled:opacity-50"
        onClick={handleAddUser}
        disabled={loading}
      >
        {loading ? "...چاوەڕوانبە" : "زیادکردن"}
      </button>
      {success && (
        <div className="mt-4 text-green-600 font-medium">یوزەر بەسەرکەوتوویی زیادکرا!</div>
      )}
    </div>
  )
}
