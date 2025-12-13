"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Clock, CheckCircle2, XCircle, User, Mail, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Request {
  id: string
  userName: string
  userEmail: string
  userPhone?: string
  physioId: string
  physioName: string
  physioEmail: string
  status: "pending" | "approved" | "rejected" | "accepted"
  requestDate: any
  message?: string
  approvedDate?: any
  rejectedDate?: any
  acceptedDate?: any
}

export default function AdminPhysioRequestsPage() {
  const { t } = useLanguage()
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [searchPatient, setSearchPatient] = useState("")
  const [searchDoctor, setSearchDoctor] = useState("")
  const [requestDate, setRequestDate] = useState("")
  const [selectedPhysio, setSelectedPhysio] = useState<string>("all")
  const [physiotherapists, setPhysiotherapists] = useState<{id: string, name: string}[]>([])

  useEffect(() => {
    fetchAllRequests()
  }, [])

  const fetchAllRequests = async () => {
    try {
      setLoading(true)
      
      // Try without orderBy first to see if index is the issue
      const snapshot = await getDocs(collection(db, "physio-requests"))
      
      console.log("📊 Total requests found:", snapshot.size)
      
      const allRequests: Request[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        console.log("📋 Request:", doc.id, data)
        allRequests.push({
          id: doc.id,
          ...data
        } as Request)
      })
      
      // Sort by requestDate manually
      allRequests.sort((a, b) => {
        const dateA = a.requestDate?.toDate ? a.requestDate.toDate() : new Date(a.requestDate)
        const dateB = b.requestDate?.toDate ? b.requestDate.toDate() : new Date(b.requestDate)
        return dateB.getTime() - dateA.getTime()
      })
      
      console.log("✅ All requests loaded:", allRequests.length)
      setRequests(allRequests)

      // Get unique physiotherapists from requests
      const uniquePhysios = new Map<string, string>()
      allRequests.forEach(req => {
        if (req.physioId && req.physioName) {
          uniquePhysios.set(req.physioId, req.physioName)
        }
      })
      
      const physioList = Array.from(uniquePhysios.entries()).map(([id, name]) => ({
        id,
        name
      }))
      
      setPhysiotherapists(physioList)
      console.log("📋 Found physiotherapists:", physioList.length)
    } catch (error) {
      console.error("❌ Error fetching requests:", error)
      alert("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests = requests.filter(req => {
    // Filter by status
    if (filter !== "all" && req.status !== filter) return false
    
    // Filter by physiotherapist
    if (selectedPhysio !== "all" && req.physioId !== selectedPhysio) return false
    
    // Filter by patient name/email
    if (searchPatient) {
      const search = searchPatient.toLowerCase()
      const matchName = req.userName?.toLowerCase().includes(search)
      const matchEmail = req.userEmail?.toLowerCase().includes(search)
      if (!matchName && !matchEmail) return false
    }
    
    // Filter by doctor name
    if (searchDoctor) {
      const search = searchDoctor.toLowerCase()
      const matchName = req.physioName?.toLowerCase().includes(search)
      if (!matchName) return false
    }
    
    // Filter by request date
    if (requestDate) {
      const reqDate = req.requestDate?.toDate ? req.requestDate.toDate() : new Date(req.requestDate)
      const filterDate = new Date(requestDate)
      
      // Compare only the date part (ignore time)
      const reqDateOnly = new Date(reqDate.getFullYear(), reqDate.getMonth(), reqDate.getDate())
      const filterDateOnly = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate())
      
      if (reqDateOnly.getTime() !== filterDateOnly.getTime()) return false
    }
    
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" />{t("pending")}</Badge>
      case "approved":
      case "accepted":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle2 className="w-3 h-3 mr-1" />{t("approved")}</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />{t("rejected")}</Badge>
      default:
        return null
    }
  }

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString() + " " + d.toLocaleTimeString()
  }

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {t("allRequests")}
                    </h1>
                    <p className="text-cyan-400 mt-1 font-medium">
                      {t("viewAllPhysiotherapistRequests")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-400 font-bold">{filteredRequests.length} {t("requests")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <Button
              onClick={() => setFilter("all")}
              variant={filter === "all" ? "default" : "outline"}
              className={filter === "all" ? "bg-gradient-to-r from-cyan-500 to-blue-500" : ""}
            >
              {t("all")} ({requests.length})
            </Button>
            <Button
              onClick={() => setFilter("pending")}
              variant={filter === "pending" ? "default" : "outline"}
              className={filter === "pending" ? "bg-yellow-500" : ""}
            >
              {t("pending")} ({requests.filter(r => r.status === "pending").length})
            </Button>
            <Button
              onClick={() => setFilter("approved")}
              variant={filter === "approved" ? "default" : "outline"}
              className={filter === "approved" ? "bg-green-500" : ""}
            >
              {t("approved")} ({requests.filter(r => r.status === "approved" || r.status === "accepted").length})
            </Button>
            <Button
              onClick={() => setFilter("rejected")}
              variant={filter === "rejected" ? "default" : "outline"}
              className={filter === "rejected" ? "bg-red-500" : ""}
            >
              {t("rejected")} ({requests.filter(r => r.status === "rejected").length})
            </Button>
          </div>

          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Physiotherapist Filter */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <select
                value={selectedPhysio}
                onChange={(e) => setSelectedPhysio(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:border-cyan-500 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">هەموو دکتۆرەکان (All Doctors)</option>
                {physiotherapists.map(physio => (
                  <option key={physio.id} value={physio.id}>{physio.name}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("searchPatient") || "Search patient..."}
                value={searchPatient}
                onChange={(e) => setSearchPatient(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("searchDoctor") || "Search doctor..."}
                value={searchDoctor}
                onChange={(e) => setSearchDoctor(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                placeholder={t("requestDate") || "Request date"}
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedPhysio !== "all" || searchPatient || searchDoctor || requestDate) && (
            <div className="mb-6">
              <Button
                onClick={() => {
                  setSelectedPhysio("all")
                  setSearchPatient("")
                  setSearchDoctor("")
                  setRequestDate("")
                }}
                variant="outline"
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="w-4 h-4 mr-2" />
                {t("clearFilters") || "Clear Filters"}
              </Button>
            </div>
          )}

          {/* Requests List */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredRequests.length === 0 ? (
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <Eye className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">{t("noRequestsFound")}</p>
                  </CardContent>
                </Card>
              ) : (
                filteredRequests.map((request) => (
                  <Card key={request.id} className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-cyan-400" />
                            {request.userName}
                          </CardTitle>
                          <p className="text-sm text-slate-400 mt-1">Request ID: {request.id}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Patient Info */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-3">{t("patientInfo")}</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-300">{request.userEmail}</span>
                          </div>
                          {request.userPhone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-slate-500" />
                              <span className="text-sm text-slate-300">{request.userPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Assigned Physiotherapist */}
                      <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                        <h3 className="text-sm font-semibold text-cyan-400 mb-3">{t("assignedTo")}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-cyan-400" />
                            <span className="text-white font-medium">{request.physioName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-300">{request.physioEmail}</span>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-white/5">
                          <p className="text-xs text-slate-500 mb-1">{t("requestDate")}</p>
                          <p className="text-sm text-white">{formatDate(request.requestDate)}</p>
                        </div>
                        {(request.approvedDate || request.acceptedDate) && (
                          <div className="p-3 rounded-lg bg-green-500/10">
                            <p className="text-xs text-green-400 mb-1">{t("approvedDate")}</p>
                            <p className="text-sm text-white">{formatDate(request.approvedDate || request.acceptedDate)}</p>
                          </div>
                        )}
                        {request.rejectedDate && (
                          <div className="p-3 rounded-lg bg-red-500/10">
                            <p className="text-xs text-red-400 mb-1">{t("rejectedDate")}</p>
                            <p className="text-sm text-white">{formatDate(request.rejectedDate)}</p>
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      {request.message && (
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <h3 className="text-sm font-semibold text-slate-400 mb-2">{t("message")}</h3>
                          <p className="text-sm text-slate-300">{request.message}</p>
                        </div>
                      )}

                      {/* Note for Admin */}
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <p className="text-xs text-yellow-400">
                          ℹ️ {t("adminViewOnly")} - {t("cannotModifyRequests")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
