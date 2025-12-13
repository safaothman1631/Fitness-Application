"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UserPlus, UserCheck, UserX, Users, AlertTriangle, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "sonner"

interface RegistrationRequest {
  id: string
  userId: string
  email: string
  name: string
  firstName: string
  lastName: string
  requestDate: any
  status: string
  createdAt: string
  requestType: string
  availableRoles: string[]
}

export default function SuperadminRegistrationRequestsPage() {
  const { t } = useLanguage()
  const [requests, setRequests] = useState<RegistrationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const requestsSnapshot = await getDocs(collection(db, "user_registration_requests"))
      const allRequests: RegistrationRequest[] = []
      
      requestsSnapshot.forEach((doc) => {
        const data = doc.data()
        // Only show pending requests
        if (data.status === "pending") {
          allRequests.push({
            id: doc.id,
            ...data
          } as RegistrationRequest)
        }
      })
      
      setRequests(allRequests)
    } catch (error) {
      console.error("Error fetching requests:", error)
      toast.error(t("errorFetchingData"))
    } finally {
      setLoading(false)
    }
  }

  const approveRequest = async (request: RegistrationRequest, selectedRole: string) => {
    if (!selectedRole) {
      toast.error("Please select a role")
      return
    }

    try {
      setProcessing(request.id)
      
      // 1. Update user role and membership
      await updateDoc(doc(db, "users", request.userId), {
        role: selectedRole,
        membership: selectedRole === "trainer" ? "Pro" : "Free",
        status: "active",
        approvedDate: new Date(),
        approvedBy: "superadmin"
      })
      
      // 2. Update request status
      await updateDoc(doc(db, "user_registration_requests", request.id), {
        status: "approved",
        approvedDate: new Date(),
        approvedBy: "superadmin",
        approvedRole: selectedRole
      })
      
      // 3. Cancel doctor_requests since user is now trainer/user
      try {
        await updateDoc(doc(db, "doctor_requests", request.userId), {
          status: "cancelled",
          cancelledBy: "superadmin",
          cancelledDate: new Date(),
          reason: `User approved as ${selectedRole}`
        })
      } catch (e) {
        console.log("No doctor request found or already processed")
      }
      
      // 4. Send email notification
      console.log("✅ Email notification should be sent to:", request.email)
      console.log("   Approved as:", selectedRole)
      
      toast.success(`User approved as ${selectedRole}`)
      fetchRequests()
    } catch (error) {
      console.error("Error approving request:", error)
      toast.error("Failed to approve request")
    } finally {
      setProcessing(null)
    }
  }

  const rejectRequest = async (request: RegistrationRequest) => {
    try {
      setProcessing(request.id)
      
      // Just update status to rejected, doctor_requests remains
      await updateDoc(doc(db, "user_registration_requests", request.id), {
        status: "rejected",
        rejectedDate: new Date(),
        rejectedBy: "superadmin"
      })
      
      // Send email notification
      console.log("✅ Rejection email should be sent to:", request.email)
      
      toast.success("Request rejected")
      fetchRequests()
    } catch (error) {
      console.error("Error rejecting request:", error)
      toast.error("Failed to reject request")
    } finally {
      setProcessing(null)
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString()
  }

  if (loading) {
    return (
      <AuthGuard allowedRoles={["superadmin"]}>
        <SidebarSleek role="superadmin">
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  const pendingRequests = requests.filter(r => r.status === "pending")

  return (
    <AuthGuard allowedRoles={["superadmin"]}>
      <SidebarSleek role="superadmin">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      Registration Requests
                    </h1>
                    <p className="text-purple-400 mt-1 font-medium">
                      Approve users as Trainer or User
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <span className="text-purple-400 font-bold">{pendingRequests.length} Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requests List */}
          <div className="grid gap-4">
            {pendingRequests.length === 0 ? (
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No pending registration requests</p>
                </CardContent>
              </Card>
            ) : (
              pendingRequests.map((request) => (
                <Card key={request.id} className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white flex items-center gap-2">
                          <UserCheck className="w-5 h-5 text-purple-400" />
                          {request.name}
                        </CardTitle>
                        <p className="text-sm text-slate-400 mt-1">{request.email}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          Requested: {formatDate(request.requestDate)}
                        </p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Role Selection */}
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Select Role:</label>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setSelectedRole({ ...selectedRole, [request.id]: "trainer" })}
                            variant={selectedRole[request.id] === "trainer" ? "default" : "outline"}
                            className="flex-1"
                          >
                            Trainer
                          </Button>
                          <Button
                            onClick={() => setSelectedRole({ ...selectedRole, [request.id]: "user" })}
                            variant={selectedRole[request.id] === "user" ? "default" : "outline"}
                            className="flex-1"
                          >
                            User
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => approveRequest(request, selectedRole[request.id])}
                          disabled={processing === request.id || !selectedRole[request.id]}
                          className="flex-1 bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Approve as {selectedRole[request.id] || "..."}
                        </Button>
                        <Button
                          onClick={() => rejectRequest(request)}
                          disabled={processing === request.id}
                          variant="destructive"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
