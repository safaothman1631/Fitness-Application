"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import FitproLayout from "@/components/fitpro-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Clock, User, MapPin, FileText, Plus, Search, Filter, CheckCircle2, XCircle, AlertCircle, Video, Phone, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  date: string
  time: string
  duration: number
  type: "in-person" | "video" | "phone"
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  reason: string
  notes?: string
  location?: string
  fee?: number // Appointment fee
  platformCommission?: number // 15% commission
  createdAt?: string
  updatedAt?: string
}

export default function AppointmentsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    date: "",
    time: "",
    duration: 60,
    type: "in-person" as const,
    reason: "",
    location: "",
    notes: "",
    fee: 50 // Default fee
  })

  // Load appointments from Firebase
  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const appointmentsRef = collection(db, "appointments")
      // Only order by date, then sort by time in JavaScript to avoid index requirement
      const q = query(appointmentsRef, orderBy("date", "desc"))
      const snapshot = await getDocs(q)
      
      const loadedAppointments: Appointment[] = []
      snapshot.forEach((doc) => {
        loadedAppointments.push({
          id: doc.id,
          ...doc.data()
        } as Appointment)
      })
      
      // Sort by time in JavaScript
      loadedAppointments.sort((a, b) => {
        // First compare dates
        if (a.date !== b.date) {
          return b.date.localeCompare(a.date)
        }
        // Then compare times
        return b.time.localeCompare(a.time)
      })
      
      setAppointments(loadedAppointments)
    } catch (error) {
      console.error("Error loading appointments:", error)
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const statusConfig = {
    scheduled: { label: "Scheduled", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Clock },
    confirmed: { label: "Confirmed", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
    completed: { label: "Completed", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
    "no-show": { label: "No Show", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", icon: AlertCircle }
  }

  const typeConfig = {
    "in-person": { label: "In Person", icon: User, color: "text-cyan-400" },
    video: { label: "Video Call", icon: Video, color: "text-purple-400" },
    phone: { label: "Phone Call", icon: Phone, color: "text-green-400" }
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.reason.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus
    const matchesType = filterType === "all" || apt.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  const todayAppointments = filteredAppointments.filter(apt => apt.date === new Date().toISOString().split('T')[0])
  const upcomingAppointments = filteredAppointments.filter(apt => new Date(apt.date) > new Date() && apt.status !== "cancelled")
  const pastAppointments = filteredAppointments.filter(apt => new Date(apt.date) < new Date() || apt.status === "completed")

  const stats = {
    total: appointments.length,
    today: todayAppointments.length,
    upcoming: upcomingAppointments.length,
    completed: appointments.filter(a => a.status === "completed").length,
    totalRevenue: appointments
      .filter(a => a.status === "completed" && a.fee)
      .reduce((sum, a) => sum + (a.fee || 0), 0),
    totalCommission: appointments
      .filter(a => a.status === "completed" && a.platformCommission)
      .reduce((sum, a) => sum + (a.platformCommission || 0), 0)
  }

  const handleAddAppointment = async () => {
    if (!newAppointment.patientName || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const fee = newAppointment.fee || 50
      const platformCommission = Math.round(fee * 0.15) // 15% commission
      
      const appointmentData = {
        patientName: newAppointment.patientName,
        patientId: `P${String(appointments.length + 1).padStart(3, '0')}`,
        date: newAppointment.date,
        time: newAppointment.time,
        duration: newAppointment.duration,
        type: newAppointment.type,
        status: "scheduled",
        reason: newAppointment.reason,
        location: newAppointment.location || "",
        notes: newAppointment.notes || "",
        fee: fee,
        platformCommission: platformCommission,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await addDoc(collection(db, "appointments"), appointmentData)
      
      toast({
        title: "Success",
        description: "Appointment scheduled successfully"
      })
      
      setIsAddDialogOpen(false)
      setNewAppointment({
        patientName: "",
        date: "",
        time: "",
        duration: 60,
        type: "in-person",
        reason: "",
        location: "",
        notes: "",
        fee: 50
      })
      
      // Reload appointments
      loadAppointments()
    } catch (error) {
      console.error("Error adding appointment:", error)
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive"
      })
    }
  }

  const updateAppointmentStatus = async (id: string, newStatus: Appointment["status"]) => {
    try {
      const appointmentRef = doc(db, "appointments", id)
      await updateDoc(appointmentRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      })
      
      toast({
        title: "Success",
        description: `Appointment ${newStatus}`
      })
      
      // Update local state
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      ))
    } catch (error) {
      console.error("Error updating appointment:", error)
      toast({
        title: "Error",
        description: "Failed to update appointment. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <FitproLayout role="physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Loading appointments...</p>
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
                Appointments Management
              </h1>
              <p className="text-slate-400 text-lg">Schedule and manage patient appointments</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/20">
                  <Plus className="w-5 h-5 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white">Schedule New Appointment</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Fill in the details to create a new appointment
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="patientName" className="text-slate-300">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={newAppointment.patientName}
                      onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-slate-300">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-slate-300">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration" className="text-slate-300">Duration (minutes)</Label>
                      <Select value={String(newAppointment.duration)} onValueChange={(v) => setNewAppointment({...newAppointment, duration: Number(v)})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type" className="text-slate-300">Appointment Type</Label>
                      <Select value={newAppointment.type} onValueChange={(v: any) => setNewAppointment({...newAppointment, type: v})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="in-person">In Person</SelectItem>
                          <SelectItem value="video">Video Call</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reason" className="text-slate-300">Reason for Visit</Label>
                    <Input
                      id="reason"
                      value={newAppointment.reason}
                      onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder="e.g., Physical therapy session"
                    />
                  </div>
                  {newAppointment.type === "in-person" && (
                    <div>
                      <Label htmlFor="location" className="text-slate-300">Location</Label>
                      <Input
                        id="location"
                        value={newAppointment.location}
                        onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder="Room number or location"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="fee" className="text-slate-300">Appointment Fee ($)</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={newAppointment.fee}
                      onChange={(e) => setNewAppointment({...newAppointment, fee: Number(e.target.value)})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder="50"
                      min="0"
                    />
                    <p className="text-xs text-slate-500 mt-1">Platform commission: 15% (${Math.round((newAppointment.fee || 0) * 0.15)})</p>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-slate-300">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder="Additional notes or instructions"
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleAddAppointment}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    Schedule Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.today}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{stats.upcoming}</div>
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
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">${stats.totalRevenue}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Platform Commission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400">${stats.totalCommission}</div>
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
                  placeholder="Search by patient name or reason..."
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="in-person">In Person</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        {todayAppointments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-cyan-400" />
              Today's Appointments
            </h2>
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  statusConfig={statusConfig}
                  typeConfig={typeConfig}
                  onUpdateStatus={updateAppointmentStatus}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  statusConfig={statusConfig}
                  typeConfig={typeConfig}
                  onUpdateStatus={updateAppointmentStatus}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-400 mb-4">Past Appointments</h2>
            <div className="space-y-4 opacity-60">
              {pastAppointments.slice(0, 5).map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  statusConfig={statusConfig}
                  typeConfig={typeConfig}
                  onUpdateStatus={updateAppointmentStatus}
                  isPast
                />
              ))}
            </div>
          </div>
        )}

        {filteredAppointments.length === 0 && !loading && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-lg">
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg mb-2">No appointments found</p>
              <p className="text-slate-500 text-sm">Click "New Appointment" to schedule your first appointment</p>
            </CardContent>
          </Card>
        )}
      </div>
    </FitproLayout>
  )
}

function AppointmentCard({ 
  appointment, 
  statusConfig, 
  typeConfig, 
  onUpdateStatus,
  isPast = false 
}: { 
  appointment: Appointment
  statusConfig: any
  typeConfig: any
  onUpdateStatus: (id: string, status: Appointment["status"]) => void
  isPast?: boolean
}) {
  const status = statusConfig[appointment.status]
  const StatusIcon = status.icon
  const type = typeConfig[appointment.type]
  const TypeIcon = type.icon

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-lg hover:border-cyan-500/30 transition-all group">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {appointment.patientName}
                  </h3>
                  <Badge variant="outline" className={cn("border", status.color)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <p className="text-slate-400 mb-2">{appointment.reason}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{appointment.time} ({appointment.duration} min)</span>
              </div>
              <div className="flex items-center gap-2">
                <TypeIcon className={cn("w-4 h-4", type.color)} />
                <span className="text-slate-400">{type.label}</span>
              </div>
              {appointment.location && (
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{appointment.location}</span>
                </div>
              )}
            </div>

            {appointment.notes && (
              <div className="flex items-start gap-2 text-sm mt-2 p-3 bg-slate-800/50 rounded-lg">
                <FileText className="w-4 h-4 text-slate-400 mt-0.5" />
                <p className="text-slate-400">{appointment.notes}</p>
              </div>
            )}
          </div>

          {!isPast && appointment.status !== "completed" && appointment.status !== "cancelled" && (
            <div className="flex flex-row lg:flex-col gap-2">
              {appointment.status === "scheduled" && (
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(appointment.id, "confirmed")}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Confirm
                </Button>
              )}
              {appointment.status === "confirmed" && (
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(appointment.id, "completed")}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Complete
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => onUpdateStatus(appointment.id, "cancelled")}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
