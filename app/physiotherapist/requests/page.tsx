"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import FitproLayout from "@/components/fitpro-layout"
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
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()
  const [requests, setRequests] = useState<PhysioRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<PhysioRequest | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [response, setResponse] = useState("")

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      setLoading(true)
      // Get physiotherapist ID from localStorage
      const physioId = localStorage.getItem("userId") || localStorage.getItem("userEmail")
      if (!physioId) {
        toast({
          title: "Error",
          description: "Please login first",
          variant: "destructive"
        })
        return
      }

      const data = await dbService.getPhysioRequestsForPhysiotherapist(physioId)
      setRequests(data)
    } catch (error) {
      console.error("Error loading requests:", error)
      toast({
        title: "Error",
        description: "Failed to load requests. Please try again.",
        variant: "destructive"
      })
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

  const handleUpdateStatus = async (id: string, newStatus: PhysioRequest["status"], responseText?: string) => {
    try {
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

      await dbService.updatePhysioRequest(id, updateData)
      
      toast({
        title: "Success",
        description: `Request ${newStatus} successfully`
      })
      
      setRequests(requests.map(req => 
        req.id === id ? { ...req, ...updateData } : req
      ))
      
      setIsDetailDialogOpen(false)
      setSelectedRequest(null)
      setResponse("")
    } catch (error) {
      console.error("Error updating request:", error)
      toast({
        title: "Error",
        description: "Failed to update request. Please try again.",
        variant: "destructive"
      })
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
      <FitproLayout role="physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Loading requests...</p>
          </div>
        </div>
      </FitproLayout>
    )
  }

  return (
    <FitproLayout role="physiotherapist">
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 p-8 mb-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Patient Requests
              </h1>
              <p className="text-slate-400 text-lg">Manage incoming physiotherapy requests</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.accepted}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Completed</CardTitle>
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
                  placeholder="Search by patient name or injury type..."
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
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                          <span className="text-slate-400">Pain Level: </span>
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
                            <p className="text-cyan-400 font-medium mb-1">Your Response:</p>
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
                        View Details
                      </Button>
                      {request.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, "accepted")}
                            className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, "rejected")}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
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
                          Complete
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
              <p className="text-slate-400 text-lg mb-2">No requests found</p>
              <p className="text-slate-500 text-sm">Patient requests will appear here</p>
            </CardContent>
          </Card>
        )}

        {/* Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl">
            {selectedRequest && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white flex items-center gap-2">
                    <User className="w-6 h-6 text-cyan-400" />
                    {selectedRequest.userName}
                  </DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Request Details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-400 text-sm">Status</Label>
                      <Badge variant="outline" className={cn("border mt-1", statusConfig[selectedRequest.status].color)}>
                        {statusConfig[selectedRequest.status].label}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-slate-400 text-sm">Date</Label>
                      <p className="text-white mt-1">
                        {new Date(selectedRequest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-slate-400 text-sm">Injury Type</Label>
                    <p className="text-white text-lg mt-1">{selectedRequest.injuryType}</p>
                  </div>
                  
                  <div>
                    <Label className="text-slate-400 text-sm">Pain Level</Label>
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
                      <Label className="text-slate-400 text-sm">Patient Notes</Label>
                      <p className="text-white mt-1 p-3 bg-slate-800 rounded-lg">{selectedRequest.notes}</p>
                    </div>
                  )}
                  
                  {selectedRequest.status === "pending" && (
                    <div>
                      <Label htmlFor="response" className="text-slate-400 text-sm">Your Response (Optional)</Label>
                      <Textarea
                        id="response"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder="Add a message for the patient..."
                        rows={3}
                      />
                    </div>
                  )}

                  {selectedRequest.response && (
                    <div>
                      <Label className="text-slate-400 text-sm">Your Previous Response</Label>
                      <p className="text-cyan-400 mt-1 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        {selectedRequest.response}
                      </p>
                    </div>
                  )}
                  
                  {selectedRequest.status === "pending" && (
                    <div className="flex gap-3 mt-6">
                      <Button 
                        onClick={() => handleUpdateStatus(selectedRequest.id, "accepted", response)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Accept Request
                      </Button>
                      <Button 
                        onClick={() => handleUpdateStatus(selectedRequest.id, "rejected", response)}
                        variant="outline"
                        className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Request
                      </Button>
                    </div>
                  )}

                  {selectedRequest.status === "accepted" && (
                    <Button 
                      onClick={() => handleUpdateStatus(selectedRequest.id, "completed")}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </FitproLayout>
  )
}
