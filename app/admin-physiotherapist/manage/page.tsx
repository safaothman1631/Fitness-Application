"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, UserCheck, UserX, Users, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import { collection, getDocs, query, where, doc, updateDoc, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"

interface DoctorRequest {
  id: string
  email: string
  name: string
  specialization?: string
  requestDate: any
  status: "pending" | "approved" | "rejected"
}

interface Physiotherapist {
  id: string
  email: string
  name: string
  role: string
  status: "active" | "revoked"
  joinDate: any
  specialization?: string
}

export default function AdminPhysioManagePage() {
  const { t } = useLanguage()
  const [requests, setRequests] = useState<DoctorRequest[]>([])
  const [physiotherapists, setPhysiotherapists] = useState<Physiotherapist[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch doctor registration requests
      const requestsSnapshot = await getDocs(collection(db, "doctor_requests"))
      const allRequests: DoctorRequest[] = []
      requestsSnapshot.forEach((doc) => {
        allRequests.push({
          id: doc.id,
          ...doc.data()
        } as DoctorRequest)
      })
      setRequests(allRequests)

      // Fetch all physiotherapists
      const physiosSnapshot = await getDocs(
        query(collection(db, "users"), where("role", "==", "physiotherapist"))
      )
      const allPhysios: Physiotherapist[] = []
      physiosSnapshot.forEach((doc) => {
        const data = doc.data()
        allPhysios.push({
          id: doc.id,
          email: data.email,
          name: data.name || "Unknown",
          role: data.role,
          status: data.status || "active",
          joinDate: data.createdAt,
          specialization: data.specialization
        })
      })
      setPhysiotherapists(allPhysios)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error(t("errorFetchingData"))
    } finally {
      setLoading(false)
    }
  }

  const approveDoctor = async (requestId: string, email: string) => {
    try {
      setProcessing(requestId)
      
      // 1. Update request status in doctor_requests
      await updateDoc(doc(db, "doctor_requests", requestId), {
        status: "approved",
        approvedDate: new Date(),
        approvedBy: "admin-physiotherapist"
      })

      // 2. Find user and update role to physiotherapist
      const usersSnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      )
      
      if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0]
        await updateDoc(doc(db, "users", userDoc.id), {
          role: "physiotherapist",
          membership: "Pro",
          status: "active",
          approvedDate: new Date()
        })

        // Create notification for the new physiotherapist
        try {
          const userData = userDoc.data()
          await addDoc(collection(db, "notifications"), {
            userId: userDoc.id,
            title: "پیرۆزە! ئەکاونتەکەت چالاک کرا",
            message: `بەخێربێیت وەک فیزیۆتێراپیست! ئێستا دەتوانیت دەست بکەیت بە کارکردن لەگەڵ نەخۆشەکان`,
            type: "success",
            category: "doctor",
            metadata: {
              approvedBy: "admin-physiotherapist",
              approvedDate: new Date().toISOString()
            },
            read: false,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        } catch (notifError) {
          console.error("⚠️ Failed to create notification:", notifError)
        }
        
        // 3. Cancel/Remove the superadmin request since user is now physiotherapist
        try {
          await updateDoc(doc(db, "user_registration_requests", userDoc.id), {
            status: "cancelled",
            cancelledBy: "admin-physiotherapist",
            cancelledDate: new Date(),
            reason: "User approved as physiotherapist"
          })
        } catch (e) {
          console.log("No superadmin request found or already processed")
        }
        
        // 4. Send email notification (you can implement email service later)
        console.log("✅ Email notification should be sent to:", email)
      }

      toast.success(t("doctorApprovedSuccess"))
      fetchData()
    } catch (error) {
      console.error("Error approving doctor:", error)
      toast.error(t("errorApprovingDoctor"))
    } finally {
      setProcessing(null)
    }
  }

  const rejectDoctor = async (requestId: string, email: string) => {
    try {
      setProcessing(requestId)
      
      // Just delete this request, superadmin request remains
      const docRef = doc(db, "doctor_requests", requestId)
      const docSnap = await getDocs(query(collection(db, "doctor_requests"), where("email", "==", email)))
      
      if (!docSnap.empty) {
        await updateDoc(docSnap.docs[0].ref, {
          status: "rejected",
          rejectedDate: new Date(),
          rejectedBy: "admin-physiotherapist"
        })
      }
      
      // Send email notification
      console.log("✅ Rejection email should be sent to:", email)

      toast.success(t("doctorRejectedSuccess"))
      fetchData()
    } catch (error) {
      console.error("Error rejecting doctor:", error)
      toast.error(t("errorRejectingDoctor"))
    } finally {
      setProcessing(null)
    }
  }

  const revokePhysioRole = async (userId: string) => {
    try {
      setProcessing(userId)
      
      await updateDoc(doc(db, "users", userId), {
        role: "user",
        status: "revoked",
        revokedDate: new Date()
      })

      toast.success(t("roleRevokedSuccess"))
      fetchData()
    } catch (error) {
      console.error("Error revoking role:", error)
      toast.error(t("errorRevokingRole"))
    } finally {
      setProcessing(null)
    }
  }

  const restorePhysioRole = async (userId: string) => {
    try {
      setProcessing(userId)
      
      await updateDoc(doc(db, "users", userId), {
        role: "physiotherapist",
        status: "active",
        restoredDate: new Date()
      })

      toast.success(t("roleRestoredSuccess"))
      fetchData()
    } catch (error) {
      console.error("Error restoring role:", error)
      toast.error(t("errorRestoringRole"))
    } finally {
      setProcessing(null)
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString()
  }

  const pendingRequests = requests.filter(r => r.status === "pending")
  const activePhysios = physiotherapists.filter(p => p.status === "active")
  const revokedPhysios = physiotherapists.filter(p => p.status === "revoked")

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-50 animate-pulse" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-2xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white tracking-tight">
                    {t("managePhysiotherapists")}
                  </h1>
                  <p className="text-orange-400 mt-1 font-medium">
                    {t("approveAndManageRoles")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-white/10 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-400 font-medium">{t("pendingRequests")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{pendingRequests.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-400 font-medium">{t("activePhysiotherapists")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{activePhysios.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-red-500/10 to-red-500/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-400 font-medium">{t("revokedAccess")}</p>
                    <p className="text-3xl font-bold text-white mt-1">{revokedPhysios.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <UserX className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pending Requests */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  {t("pendingApprovalRequests")} ({pendingRequests.length})
                </h2>
                {pendingRequests.length === 0 ? (
                  <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                    <CardContent className="p-12 text-center">
                      <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <p className="text-slate-400">{t("noPendingRequests")}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {pendingRequests.map((request) => (
                      <Card key={request.id} className="border-yellow-500/20 bg-slate-900/50 backdrop-blur-xl">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-white">{request.name}</CardTitle>
                              <p className="text-sm text-slate-400 mt-1">{request.email}</p>
                              {request.specialization && (
                                <p className="text-sm text-slate-500 mt-1">{request.specialization}</p>
                              )}
                            </div>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              {t("pending")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                              {t("requestDate")}: {formatDate(request.requestDate)}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => approveDoctor(request.id, request.email)}
                                disabled={processing === request.id}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                {t("approve")}
                              </Button>
                              <Button
                                onClick={() => rejectDoctor(request.id, request.email)}
                                disabled={processing === request.id}
                                variant="destructive"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                {t("reject")}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Physiotherapists */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-green-400" />
                  {t("activePhysiotherapists")} ({activePhysios.length})
                </h2>
                <div className="grid gap-4">
                  {activePhysios.map((physio) => (
                    <Card key={physio.id} className="border-green-500/20 bg-slate-900/50 backdrop-blur-xl">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white">{physio.name}</CardTitle>
                            <p className="text-sm text-slate-400 mt-1">{physio.email}</p>
                            {physio.specialization && (
                              <p className="text-sm text-slate-500 mt-1">{physio.specialization}</p>
                            )}
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {t("active")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-500">
                            {t("joinDate")}: {formatDate(physio.joinDate)}
                          </p>
                          <Button
                            onClick={() => revokePhysioRole(physio.id)}
                            disabled={processing === physio.id}
                            variant="destructive"
                            size="sm"
                          >
                            <UserX className="w-4 h-4 mr-2" />
                            {t("revokeRole")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Revoked Access */}
              {revokedPhysios.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <UserX className="w-6 h-6 text-red-400" />
                    {t("revokedAccess")} ({revokedPhysios.length})
                  </h2>
                  <div className="grid gap-4">
                    {revokedPhysios.map((physio) => (
                      <Card key={physio.id} className="border-red-500/20 bg-slate-900/50 backdrop-blur-xl">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-white">{physio.name}</CardTitle>
                              <p className="text-sm text-slate-400 mt-1">{physio.email}</p>
                            </div>
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              {t("revoked")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                              {t("originalJoinDate")}: {formatDate(physio.joinDate)}
                            </p>
                            <Button
                              onClick={() => restorePhysioRole(physio.id)}
                              disabled={processing === physio.id}
                              className="bg-blue-500 hover:bg-blue-600 text-white"
                              size="sm"
                            >
                              <Shield className="w-4 h-4 mr-2" />
                              {t("restoreRole")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
