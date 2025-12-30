"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  HeartPulse, 
  User, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock,
  FileText,
  Search,
  Filter,
  Loader2,
  ActivitySquare
} from "lucide-react"
import { cn } from "@/lib/utils"
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

interface PhysioRequest {
  id: string
  userId: string
  userName: string
  physioId: string
  physioName: string
  injuryType: string
  painPercent: number
  notes?: string
  status: "pending" | "accepted" | "rejected" | "completed"
  completed?: boolean
  createdAt: string
  updatedAt?: string
  response?: string
}

export default function PhysiotherapistRequestsPage() {
  const { t } = useLanguage()
  const [physioId, setPhysioId] = useState<string>("physio1")
  const [requests, setRequests] = useState<PhysioRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<PhysioRequest | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [response, setResponse] = useState("")
  
  // Appointment dialog state
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false)
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [appointmentPrice, setAppointmentPrice] = useState("")
  const [appointmentNotes, setAppointmentNotes] = useState("")

  useEffect(() => {
    // Get physiotherapist ID from localStorage
    const storedPhysioId = localStorage.getItem("userId") || localStorage.getItem("userEmail") || "physio1"
    setPhysioId(storedPhysioId)
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      // Get physiotherapist ID from localStorage or use default
      const physioId = localStorage.getItem("userId") || localStorage.getItem("userEmail") || "physio1"
      
      console.log("🔍 Loading requests for physioId:", physioId)

      const data = await dbService.getPhysioRequestsForPhysiotherapist(physioId)
      console.log("✅ Loaded", data.length, "requests:", data)
      setRequests(data)
    } catch (error) {
      console.error("❌ Error loading requests:", error)
      toast.error("Failed to load requests. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.injuryType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || req.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    accepted: requests.filter(r => r.status === "accepted").length,
    completed: requests.filter(r => r.status === "completed").length
  }

  const handleViewDetails = (request: PhysioRequest) => {
    setSelectedRequest(request)
    setResponse(request.response || "")
    setIsDetailDialogOpen(true)
  }

  const handleAcceptClick = (request: PhysioRequest) => {
    setSelectedRequest(request)
    setIsDetailDialogOpen(false)
    setIsAppointmentDialogOpen(true)
    // Set default date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setAppointmentDate(tomorrow.toISOString().split('T')[0])
    setAppointmentTime("09:00")
    setAppointmentPrice("")
    setAppointmentNotes("")
  }

  const handleConfirmAppointment = async () => {
    if (!selectedRequest) return
    
    // Validate appointment data
    if (!appointmentDate || !appointmentTime || !appointmentPrice) {
      toast.error(t("fillAllAppointmentDetails"))
      return
    }
    
    try {
      console.log("📅 Creating appointment for request:", selectedRequest.id)
      console.log("📋 Selected Request Data:", selectedRequest)
      console.log("🕐 Appointment Date:", appointmentDate)
      console.log("⏰ Appointment Time:", appointmentTime)
      console.log("💰 Appointment Price:", appointmentPrice)
      console.log("📝 Appointment Notes:", appointmentNotes)
      
      // Update request status to accepted with appointment info
      const updateData = {
        status: "accepted" as PhysioRequest["status"],
        updatedAt: new Date().toISOString(),
        appointment: {
          date: appointmentDate,
          time: appointmentTime,
          price: appointmentPrice,
          notes: appointmentNotes
        }
      }
      
      console.log("📤 Sending update data:", updateData)
      const result = await dbService.updatePhysioRequest(selectedRequest.id, updateData)
      console.log("✅ API Response:", result)
      
      // Log request acceptance
      await dbService.createActivityLog({
        action: "request_accepted",
        actorId: physioId,
        actorName: "Dr. Ahmad", // TODO: Get from auth context
        actorRole: "physiotherapist",
        targetType: "request",
        targetId: selectedRequest.id,
        targetName: selectedRequest.userName || "Unknown",
        details: {
          userId: selectedRequest.userId,
          injuryType: selectedRequest.injuryType,
          appointmentDate: appointmentDate,
          appointmentTime: appointmentTime,
          price: appointmentPrice
        },
        description: `Accepted request from ${selectedRequest.userName} and scheduled appointment`
      })
      
      // Reload requests
      await loadRequests()
      
      toast.success(t("appointmentScheduled"))
      
      // Close dialog and reset
      setIsAppointmentDialogOpen(false)
      setSelectedRequest(null)
      setAppointmentDate("")
      setAppointmentTime("")
      setAppointmentPrice("")
      setAppointmentNotes("")
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      toast.error("Failed to schedule appointment. Please try again.")
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: PhysioRequest["status"], responseText?: string) => {
    console.log("🚀 FUNCTION CALLED! handleUpdateStatus")
    console.log("  📌 ID:", id)
    console.log("  📌 New Status:", newStatus)
    console.log("  📌 Response Text:", responseText)
    console.log("  📌 Response Length:", responseText?.length || 0)
    
    try {
      console.log("🔄 Updating request:", id, "to status:", newStatus, "with response:", responseText)
      
      // For rejection, no validation needed
      if (newStatus === "rejected") {
        // Allow rejection without response
      }

      const updateData: any = { 
        status: newStatus,
        updatedAt: new Date().toISOString()
      }
      
      if (responseText) {
        updateData.response = responseText
      }
      
      if (newStatus === "completed") {
        updateData.completed = true
      }

      console.log("📤 Sending update:", updateData)
      const result = await dbService.updatePhysioRequest(id, updateData)
      console.log("✅ Update successful, result:", result)
      
      // Log activity
      if (newStatus === "rejected") {
        const request = requests.find(r => r.id === id)
        await dbService.createActivityLog({
          action: "request_rejected",
          actorId: physioId,
          actorName: "Dr. Ahmad", // TODO: Get from auth context
          actorRole: "physiotherapist",
          targetType: "request",
          targetId: id,
          targetName: request?.userName || "Unknown",
          details: {
            userId: request?.userId,
            injuryType: request?.injuryType,
            reason: responseText || "No reason provided"
          },
          description: `Rejected request from ${request?.userName || "Unknown"}`
        })
      }
      
      // Reload requests to show updated data
      console.log("🔄 Reloading requests...")
      await loadRequests()
      console.log("✅ Requests reloaded")
      
      // Show appropriate success message
      let description = ""
      if (newStatus === "accepted") {
        description = t("patientAddedSuccessfully") || "Request accepted! Patient added to your list."
      } else if (newStatus === "rejected") {
        description = t("requestRejected") || "Request rejected successfully."
      } else if (newStatus === "completed") {
        description = t("requestCompleted") || "Request marked as completed."
      } else {
        description = `Request ${newStatus} successfully`
      }
      
      console.log("🎉 Showing success toast:", description)
      toast.success(description)
      
      console.log("🔄 Updating local state...")
      setRequests(requests.map(req => 
        req.id === id ? { ...req, ...updateData } : req
      ))
      
      console.log("❌ Closing dialog...")
      setIsDetailDialogOpen(false)
      setSelectedRequest(null)
      setResponse("")
      console.log("✅ All done!")
    } catch (error) {
      console.error("Error updating request:", error)
      toast.error("Failed to update request. Please try again.")
    }
  }

  const statusConfig = {
    pending: { 
      label: "Pending", 
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", 
      icon: Clock 
    },
    accepted: { 
      label: "Accepted", 
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30", 
      icon: CheckCircle2 
    },
    completed: { 
      label: "Completed", 
      color: "bg-green-500/20 text-green-400 border-green-500/30", 
      icon: CheckCircle2 
    },
    rejected: { 
      label: "Rejected", 
      color: "bg-red-500/20 text-red-400 border-red-500/30", 
      icon: XCircle 
    }
  }

  if (loading) {
    return (
      <SidebarSleek role="physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-lg">{t("loadingRequests")}</p>
          </div>
        </div>
      </SidebarSleek>
    )
  }

  return (
    <SidebarSleek role="physiotherapist">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 p-8 mb-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {t("patientRequests")}
              </h1>
              <p className="text-slate-400 text-lg">{t("manageRequests")}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("totalRequests")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("pendingRequests")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("acceptedRequests")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.accepted}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("completedSessions")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder={t("searchRequests")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">{t("allStatus")}</SelectItem>
                  <SelectItem value="pending">{t("pending")}</SelectItem>
                  <SelectItem value="accepted">{t("accepted")}</SelectItem>
                  <SelectItem value="completed">{t("completed")}</SelectItem>
                  <SelectItem value="rejected">{t("rejected")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const status = statusConfig[request.status]
            const StatusIcon = status.icon
            const painColor = 
              request.painPercent >= 75 ? "text-red-400" :
              request.painPercent >= 50 ? "text-orange-400" :
              request.painPercent >= 25 ? "text-yellow-400" :
              "text-green-400"

            return (
              <Card 
                key={request.id} 
                className="bg-slate-900/50 border-slate-800 backdrop-blur-lg hover:border-cyan-500/30 transition-all group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                              {request.userName}
                            </h3>
                            <Badge variant="outline" className={cn("border", status.color)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <HeartPulse className="w-4 h-4 text-red-400" />
                            <span className="font-medium">{request.injuryType}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-4 h-4 text-cyan-400" />
                          <span>{new Date(request.createdAt).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ActivitySquare className={cn("w-4 h-4", painColor)} />
                          <span className="text-slate-400">{t("painLevel")}: </span>
                          <span className={cn("font-bold", painColor)}>{request.painPercent}%</span>
                        </div>
                      </div>

                      {request.notes && (
                        <div className="flex items-start gap-2 text-sm mt-2 p-3 bg-slate-800/50 rounded-lg">
                          <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                          <p className="text-slate-400">{request.notes}</p>
                        </div>
                      )}

                      {request.response && (
                        <div className="flex items-start gap-2 text-sm mt-2 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5" />
                          <div>
                            <p className="text-cyan-400 font-medium mb-1">{t("yourResponse")}:</p>
                            <p className="text-slate-300">{request.response}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row lg:flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                        className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                      >
                        {t("viewDetails")}
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptClick(request)}
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            {t("acceptRequest")}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, "rejected")}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            {t("rejectRequest")}
                          </Button>
                        </>
                      )}
                      {request.status === "accepted" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(request.id, "completed")}
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          {t("complete")}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-lg">
            <CardContent className="p-12 text-center">
              <HeartPulse className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">{t("noRequests")}</p>
              <p className="text-slate-500 text-sm">{t("requestsAppearHere")}</p>
            </CardContent>
          </Card>
        )}

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-[96vw] sm:max-w-2xl">
            {selectedRequest && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white flex items-center gap-2">
                    <User className="w-6 h-6 text-cyan-400" />
                    {selectedRequest.userName}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {t("requestDetails")}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-400 text-sm">{t("status")}</Label>
                      <Badge variant="outline" className={cn("border mt-1", statusConfig[selectedRequest.status].color)}>
                        {statusConfig[selectedRequest.status].label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm">{t("date")}</Label>
                      <p className="text-white mt-1">
                        {new Date(selectedRequest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-slate-400 text-sm">{t("injuryType")}</Label>
                    <p className="text-white text-lg mt-1">{selectedRequest.injuryType}</p>
                  </div>
                  
                  <div>
                    <Label className="text-slate-400 text-sm">{t("painLevel")}</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all",
                            selectedRequest.painPercent >= 75 ? "bg-red-400" :
                            selectedRequest.painPercent >= 50 ? "bg-orange-400" :
                            selectedRequest.painPercent >= 25 ? "bg-yellow-400" :
                            "bg-green-400"
                          )}
                          style={{ width: `${selectedRequest.painPercent}%` }}
                        />
                      </div>
                      <span className="text-white font-bold">{selectedRequest.painPercent}%</span>
                    </div>
                  </div>
                  
                  {selectedRequest.notes && (
                    <div>
                      <Label className="text-slate-400 text-sm">{t("patientNotes")}</Label>
                      <p className="text-white mt-1 p-3 bg-slate-800 rounded-lg">{selectedRequest.notes}</p>
                    </div>
                  )}
                  
                  {selectedRequest.status === "pending" && (
                    <div>
                      <Label htmlFor="response" className="text-slate-400 text-sm flex items-center gap-2">
                        {t("yourResponse")}
                        <span className="text-red-400 text-xs">*Required for accepting</span>
                      </Label>
                      <Textarea
                        id="response"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder={t("enterResponseMessage")}
                        rows={3}
                      />
                    </div>
                  )}

                  {selectedRequest.response && (
                    <div>
                      <Label className="text-slate-400 text-sm">{t("previousResponse")}</Label>
                      <p className="text-cyan-400 mt-1 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        {selectedRequest.response}
                      </p>
                    </div>
                  )}
                  
                  {selectedRequest.status === "pending" && (
                    <div className="flex gap-3 mt-6">
                      <Button 
                        onClick={() => handleAcceptClick(selectedRequest)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {t("acceptRequest")}
                      </Button>
                      <Button 
                        onClick={() => handleUpdateStatus(selectedRequest.id, "rejected", response)}
                        variant="outline"
                        className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        {t("rejectRequest")}
                      </Button>
                    </div>
                  )}

                  {selectedRequest.status === "accepted" && (
                    <Button 
                      onClick={() => handleUpdateStatus(selectedRequest.id, "completed")}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {t("markCompleted")}
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Appointment Scheduling Dialog */}
        <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
          <DialogContent className="bg-slate-900 border-cyan-500/30 max-w-[92vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                <Calendar className="w-6 h-6 text-cyan-400" />
                {t("scheduleAppointment")}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {selectedRequest?.userName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Date */}
              <div>
                <Label htmlFor="appointmentDate" className="text-slate-400 text-sm">
                  {t("appointmentDate")} <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>

              {/* Time */}
              <div>
                <Label htmlFor="appointmentTime" className="text-slate-400 text-sm">
                  {t("appointmentTime")} <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="appointmentTime"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="appointmentPrice" className="text-slate-400 text-sm">
                  {t("sessionPrice")} <span className="text-red-400">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <Input
                    id="appointmentPrice"
                    type="number"
                    placeholder="50"
                    value={appointmentPrice}
                    onChange={(e) => setAppointmentPrice(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white mt-1 pl-8"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="appointmentNotes" className="text-slate-400 text-sm">
                  {t("additionalNotes")}
                </Label>
                <Textarea
                  id="appointmentNotes"
                  value={appointmentNotes}
                  onChange={(e) => setAppointmentNotes(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder={t("enterResponseMessage")}
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleConfirmAppointment}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t("confirmAccept")}
                </Button>
                <Button
                  onClick={() => setIsAppointmentDialogOpen(false)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-400 hover:bg-slate-800"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  {t("cancel")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarSleek>
  )
}

