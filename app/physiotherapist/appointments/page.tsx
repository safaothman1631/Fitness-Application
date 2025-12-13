"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
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
import { dbService } from "@/lib/db-service"
import { toast } from "sonner"

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
  
  const [physioId, setPhysioId] = useState<string>("physio1")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Get physiotherapist ID from localStorage
  useEffect(() => {
    const id = localStorage.getItem("userId") || localStorage.getItem("userEmail") || "physio1"
    setPhysioId(id)
  }, [])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [patientInputMode, setPatientInputMode] = useState<"select" | "manual">("select")
  
  // Confirmation form data
  const [confirmData, setConfirmData] = useState({
    actualDuration: 60,
    sessionNotes: "",
    exercisesGiven: "",
    nextSessionDate: "",
    progressRating: 5
  })

  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    date: "",
    time: "",
    duration: 60,
    type: "in-person" as const,
    reason: "",
    location: "",
    notes: "",
    fee: 50 // Default fee
  })

  // New patient info for manual entry
  const [newPatientInfo, setNewPatientInfo] = useState({
    email: "",
    phone: "",
    age: 0,
    condition: ""
  })

  // Load appointments and patients from Firebase
  useEffect(() => {
    if (physioId) {
      loadAppointments()
      loadPatients()
    }
  }, [physioId])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      console.log("📅 Loading appointments from patients for physioId:", physioId)
      
      // Get all patients
      const patientsData = await dbService.getPatients(physioId)
      console.log("✅ Loaded", patientsData.length, "patients")
      
      // Extract appointments from patients
      const appointmentsFromPatients: Appointment[] = []
      patientsData.forEach((patient: any) => {
        if (patient.appointment) {
          appointmentsFromPatients.push({
            id: patient.id,
            patientName: patient.name,
            patientId: patient.id,
            date: patient.appointment.date,
            time: patient.appointment.time,
            duration: patient.appointment.sessionDetails?.actualDuration || 60,
            type: "in-person",
            status: patient.appointment.status || "scheduled",
            reason: patient.condition || "Consultation",
            notes: patient.appointment.notes || patient.appointment.sessionDetails?.sessionNotes || "",
            fee: parseFloat(patient.appointment.price) || 0,
            platformCommission: parseFloat(patient.appointment.price) * 0.15 || 0
          })
        }
      })
      
      console.log("✅ Found", appointmentsFromPatients.length, "appointments")
      setAppointments(appointmentsFromPatients)
    } catch (error: any) {
      console.error("Error loading appointments:", error)
      toast.error(error.message || "Failed to load appointments")
    } finally {
      setLoading(false)
    }
  }

  const loadPatients = async () => {
    try {
      const data = await dbService.getPatients(physioId)
      setPatients(data)
    } catch (error: any) {
      console.error("Error loading patients:", error)
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
      toast.error("Please fill in all required fields")
      return
    }

    try {
      let patientIdToUpdate = newAppointment.patientId

      // If manual entry mode and patient doesn't exist, create new patient first
      if (patientInputMode === "manual" && !newAppointment.patientId) {
        if (!newPatientInfo.email || !newPatientInfo.phone || !newPatientInfo.condition) {
          toast.error(t("pleaseCompletePatientInfo"))
          return
        }

        try {
          const newPatient = await dbService.createPatient(physioId, {
            name: newAppointment.patientName,
            email: newPatientInfo.email,
            phone: newPatientInfo.phone,
            age: newPatientInfo.age || 0,
            condition: newPatientInfo.condition,
            sessionCount: 0,
            sessionPrice: newAppointment.fee || 50,
            status: "active",
            notes: "",
            joinDate: new Date().toISOString().split("T")[0],
            progress: 0,
            isActive: true,
            appointment: {
              date: newAppointment.date,
              time: newAppointment.time,
              price: String(newAppointment.fee || 50),
              notes: newAppointment.notes || "",
              status: "scheduled"
            }
          })
          
          patientIdToUpdate = newPatient.id
          
          // Add to local patients list
          setPatients([newPatient, ...patients])
          
          toast.success(t("patientAddedSuccessfully"))
        } catch (patientError: any) {
          console.error("Error creating patient:", patientError)
          toast.error(patientError.message || "Failed to create patient")
          return
        }
      } else if (patientIdToUpdate) {
        // Update existing patient's appointment
        try {
          const appointmentData = {
            date: newAppointment.date,
            time: newAppointment.time,
            price: String(newAppointment.fee || 50),
            notes: newAppointment.notes || "",
            status: "scheduled"
          }

          await dbService.updatePatient(physioId, patientIdToUpdate, {
            appointment: appointmentData,
            updatedAt: new Date().toISOString(),
            actorName: "Dr. Ahmad", // TODO: Get from auth context
            actorRole: "physiotherapist"
          })
          
          // Log appointment scheduling
          await dbService.createActivityLog({
            action: "appointment_scheduled",
            actorId: physioId,
            actorName: "Dr. Ahmad", // TODO: Get from auth context
            actorRole: "physiotherapist",
            targetType: "appointment",
            targetId: `${patientIdToUpdate}_${newAppointment.date}_${newAppointment.time}`,
            targetName: newAppointment.patientName,
            details: {
              date: newAppointment.date,
              time: newAppointment.time,
              price: newAppointment.fee,
              type: newAppointment.type,
              reason: newAppointment.reason
            },
            description: `Scheduled appointment for ${newAppointment.patientName} on ${newAppointment.date} at ${newAppointment.time}`
          })

          console.log("✅ Updated patient appointment:", patientIdToUpdate)
          toast.success("Appointment scheduled successfully")
        } catch (updateError: any) {
          console.error("Error updating patient appointment:", updateError)
          toast.error(updateError.message || "Failed to update appointment")
          return
        }
      }

      // Reload appointments to show the new one
      await loadAppointments()
      
      setIsAddDialogOpen(false)
      setNewAppointment({
        patientName: "",
        patientId: "",
        date: "",
        time: "",
        duration: 60,
        type: "in-person",
        reason: "",
        location: "",
        notes: "",
        fee: 50
      })
      setNewPatientInfo({
        email: "",
        phone: "",
        age: 0,
        condition: ""
      })
    } catch (error: any) {
      console.error("Error adding appointment:", error)
      toast.error(error.message || "Failed to schedule appointment")
    }
  }

  const handleConfirmClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setConfirmData({
      actualDuration: appointment.duration || 60,
      sessionNotes: "",
      exercisesGiven: "",
      nextSessionDate: "",
      progressRating: 5
    })
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmAppointmentWithDetails = async () => {
    if (!selectedAppointment) return
    
    // Validate session notes
    if (!confirmData.sessionNotes.trim()) {
      toast.error("Session notes are required!")
      return
    }
    
    try {
      console.log("✅ Confirming appointment with details")
      console.log("📋 Selected Appointment:", selectedAppointment)
      console.log("📋 Selected Appointment ID:", selectedAppointment.id)
      console.log("📋 Selected Appointment Patient ID:", selectedAppointment.patientId)
      console.log("👥 All Patients:", patients)
      console.log("📝 Session Notes:", confirmData.sessionNotes)
      console.log("💪 Exercises:", confirmData.exercisesGiven)
      console.log("⭐ Progress Rating:", confirmData.progressRating)
      
      // Find the patient (use patientId which is the actual patient.id)
      const patient = patients.find(p => p.id === selectedAppointment.patientId || p.id === selectedAppointment.id)
      console.log("🔍 Found Patient:", patient)
      
      if (!patient || !patient.appointment) {
        console.error("❌ Patient not found or no appointment data")
        console.error("   Looking for ID:", selectedAppointment.patientId, "or", selectedAppointment.id)
        console.error("   Available patient IDs:", patients.map(p => p.id))
        toast.error("Patient or appointment not found")
        return
      }
      
      console.log("✅ Found patient:", patient.name)
      console.log("📅 Current appointment status:", patient.appointment.status)
      
      // Update patient with confirmed status and session details
      const updatedAppointment = {
        ...patient.appointment,
        status: "confirmed",
        sessionDetails: {
          actualDuration: confirmData.actualDuration,
          sessionNotes: confirmData.sessionNotes,
          exercisesGiven: confirmData.exercisesGiven,
          nextSessionDate: confirmData.nextSessionDate,
          progressRating: confirmData.progressRating,
          confirmedAt: new Date().toISOString()
        }
      }
      
      console.log("📤 Sending update to database...")
      console.log("   Physio ID:", physioId)
      console.log("   Patient ID (using patient.id):", patient.id)
      console.log("   Updated Appointment:", updatedAppointment)
      
      await dbService.updatePatient(physioId, patient.id, {
        appointment: updatedAppointment,
        updatedAt: new Date().toISOString(),
        actorName: "Dr. Ahmad", // TODO: Get from auth context
        actorRole: "physiotherapist"
      })
      
      // Log appointment confirmation
      await dbService.createActivityLog({
        action: "appointment_confirmed",
        actorId: physioId,
        actorName: "Dr. Ahmad", // TODO: Get from auth context
        actorRole: "physiotherapist",
        targetType: "appointment",
        targetId: `${patient.id}_${patient.appointment.date}_${patient.appointment.time}`,
        targetName: patient.name,
        details: {
          date: patient.appointment.date,
          time: patient.appointment.time,
          duration: confirmData.actualDuration,
          progressRating: confirmData.progressRating,
          hasNotes: !!confirmData.sessionNotes,
          hasExercises: !!confirmData.exercisesGiven
        },
        description: `Confirmed appointment for ${patient.name} with progress rating ${confirmData.progressRating}/10`
      })
      
      console.log("✅ Database updated successfully!")
      
      toast.success("Appointment confirmed with session details!")
      
      // Close dialog
      setIsConfirmDialogOpen(false)
      setSelectedAppointment(null)
      
      // Reload data
      console.log("🔄 Reloading appointments and patients...")
      await loadAppointments()
      await loadPatients()
      console.log("✅ Data reloaded!")
    } catch (error: any) {
      console.error("Error confirming appointment:", error)
      toast.error(error.message || "Failed to confirm appointment")
    }
  }

  const updateAppointmentStatus = async (id: string, newStatus: Appointment["status"]) => {
    try {
      console.log("📝 Updating appointment status for patient:", id, "to:", newStatus)
      
      // Find the patient
      const patient = patients.find(p => p.id === id)
      if (!patient || !patient.appointment) {
        toast.error("Patient or appointment not found")
        return
      }
      
      // Update patient with new appointment status
      const updatedAppointment = {
        ...patient.appointment,
        status: newStatus
      }
      
      await dbService.updatePatient(physioId, id, {
        appointment: updatedAppointment
      })
      
      toast.success(`Appointment ${newStatus}`)
      
      // Reload data
      await loadAppointments()
      await loadPatients()
      
      // Update local state
      setAppointments(appointments.map(apt => 
        apt.id === id ? { ...apt, status: newStatus } : apt
      ))
    } catch (error: any) {
      console.error("Error updating appointment:", error)
      toast.error(error.message || "Failed to update appointment")
    }
  }

  if (loading) {
    return (
      <SidebarSleek role="physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 text-lg">{t("loadingAppointments")}</p>
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
                {t("myAppointments")}
              </h1>
              <p className="text-slate-400 text-lg">{t("scheduleAppointments")}</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/20">
                  <Plus className="w-5 h-5 mr-2" />
                  {t("newAppointment")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-white">{t("newAppointment")}</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    {t("fillAllFields")}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-slate-300">{t("patientName")}</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={patientInputMode === "select" ? "default" : "outline"}
                          onClick={() => setPatientInputMode("select")}
                          className="text-xs"
                        >
                          {t("selectFromList")}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={patientInputMode === "manual" ? "default" : "outline"}
                          onClick={() => {
                            setPatientInputMode("manual")
                            setNewAppointment({...newAppointment, patientName: "", patientId: ""})
                          }}
                          className="text-xs"
                        >
                          {t("enterManually")}
                        </Button>
                      </div>
                    </div>
                    {patientInputMode === "select" ? (
                      <Select
                        value={newAppointment.patientId}
                        onValueChange={(value) => {
                          const patient = patients.find(p => p.id === value)
                          setNewAppointment({
                            ...newAppointment, 
                            patientId: value,
                            patientName: patient?.name || ""
                          })
                        }}
                      >
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue placeholder={t("selectPatient")} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          {patients.length > 0 ? (
                            patients.map((patient) => (
                              <SelectItem key={patient.id} value={patient.id} className="text-white hover:bg-slate-700">
                                {patient.name} - {patient.condition}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled className="text-slate-400">
                              {t("noPatientsAvailable")}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="patientName"
                        value={newAppointment.patientName}
                        onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value, patientId: ""})}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder={t("enterFullName")}
                      />
                    )}
                  </div>
                  
                  {/* Additional patient info for manual entry with animations */}
                  {patientInputMode === "manual" && newAppointment.patientName && (
                    <div className="relative overflow-hidden animate-in slide-in-from-top-2 fade-in duration-500">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 animate-pulse"></div>
                      
                      {/* Glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                      
                      {/* Main content */}
                      <div className="relative p-5 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 shadow-lg shadow-blue-500/10 space-y-4 backdrop-blur-sm">
                        {/* Header with icon animation */}
                        <div className="flex items-center gap-2 pb-2 border-b border-blue-500/20">
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 animate-ping"></div>
                            <svg className="relative w-5 h-5 text-blue-400 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <line x1="19" x2="19" y1="8" y2="14"></line>
                              <line x1="22" x2="16" y1="11" y2="11"></line>
                            </svg>
                          </div>
                          <p className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-in fade-in duration-700">
                            {t("newPatientInfo")}
                          </p>
                          <div className="ml-auto">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                            </span>
                          </div>
                        </div>
                        
                        {/* Input fields with staggered animation */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="animate-in slide-in-from-left duration-500 delay-100">
                            <Label className="text-slate-300 text-xs font-medium flex items-center gap-1">
                              <svg className="w-3 h-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                              </svg>
                              {t("email")}
                            </Label>
                            <Input
                              value={newPatientInfo.email}
                              onChange={(e) => setNewPatientInfo({...newPatientInfo, email: e.target.value})}
                              className="bg-slate-800/50 border-slate-700 text-white mt-1.5 h-10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-500/30"
                              placeholder={t("enterEmail")}
                              type="email"
                            />
                          </div>
                          <div className="animate-in slide-in-from-right duration-500 delay-100">
                            <Label className="text-slate-300 text-xs font-medium flex items-center gap-1">
                              <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                              </svg>
                              {t("phone")}
                            </Label>
                            <Input
                              value={newPatientInfo.phone}
                              onChange={(e) => setNewPatientInfo({...newPatientInfo, phone: e.target.value})}
                              className="bg-slate-800/50 border-slate-700 text-white mt-1.5 h-10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/30"
                              placeholder={t("enterPhone")}
                            />
                          </div>
                          <div className="animate-in slide-in-from-left duration-500 delay-200">
                            <Label className="text-slate-300 text-xs font-medium flex items-center gap-1">
                              <svg className="w-3 h-3 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 2v4"></path>
                                <path d="M16 2v4"></path>
                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                <path d="M3 10h18"></path>
                              </svg>
                              {t("age")}
                            </Label>
                            <Input
                              type="number"
                              value={newPatientInfo.age || ''}
                              onChange={(e) => setNewPatientInfo({...newPatientInfo, age: parseInt(e.target.value) || 0})}
                              className="bg-slate-800/50 border-slate-700 text-white mt-1.5 h-10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-500/30"
                              placeholder={t("enterAge")}
                            />
                          </div>
                          <div className="animate-in slide-in-from-right duration-500 delay-200">
                            <Label className="text-slate-300 text-xs font-medium flex items-center gap-1">
                              <svg className="w-3 h-3 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                              </svg>
                              {t("medicalCondition")}
                            </Label>
                            <Input
                              value={newPatientInfo.condition}
                              onChange={(e) => setNewPatientInfo({...newPatientInfo, condition: e.target.value})}
                              className="bg-slate-800/50 border-slate-700 text-white mt-1.5 h-10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-cyan-500/30"
                              placeholder={t("enterCondition")}
                            />
                          </div>
                        </div>
                        
                        {/* Info message with animation */}
                        <div className="flex items-start gap-2 p-3 rounded-md bg-blue-500/5 border border-blue-500/20 animate-in fade-in duration-700 delay-300">
                          <svg className="w-4 h-4 text-blue-400 mt-0.5 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                          </svg>
                          <p className="text-xs text-blue-300/80 leading-relaxed">{t("patientWillBeAddedAutomatically")}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-slate-300">{t("appointmentDate")}</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-slate-300">{t("appointmentTime")}</Label>
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
                      <Label htmlFor="duration" className="text-slate-300">{t("duration")}</Label>
                      <Select value={String(newAppointment.duration)} onValueChange={(v) => setNewAppointment({...newAppointment, duration: Number(v)})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="30">{t("minutes30")}</SelectItem>
                          <SelectItem value="45">{t("minutes45")}</SelectItem>
                          <SelectItem value="60">{t("minutes60")}</SelectItem>
                          <SelectItem value="90">{t("minutes90")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type" className="text-slate-300">{t("appointmentType")}</Label>
                      <Select value={newAppointment.type} onValueChange={(v: any) => setNewAppointment({...newAppointment, type: v})}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="in-person">{t("inPerson")}</SelectItem>
                          <SelectItem value="video">{t("videoCall")}</SelectItem>
                          <SelectItem value="phone">{t("phoneCall")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reason" className="text-slate-300">{t("appointmentReason")}</Label>
                    <Input
                      id="reason"
                      value={newAppointment.reason}
                      onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder={t("enterReason")}
                    />
                  </div>
                  {newAppointment.type === "in-person" && (
                    <div>
                      <Label htmlFor="location" className="text-slate-300">{t("location")}</Label>
                      <Input
                        id="location"
                        value={newAppointment.location}
                        onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                        className="bg-slate-800 border-slate-700 text-white mt-1"
                        placeholder={t("enterLocation")}
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="fee" className="text-slate-300">{t("appointmentFee")}</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={newAppointment.fee}
                      onChange={(e) => setNewAppointment({...newAppointment, fee: Number(e.target.value)})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder="50"
                      min="0"
                    />
                    <p className="text-xs text-slate-500 mt-1">{t("platformCommission")}: 15% (${Math.round((newAppointment.fee || 0) * 0.15)})</p>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-slate-300">{t("notes")}</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white mt-1"
                      placeholder={t("enterNotes")}
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleAddAppointment}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    {t("scheduleAppointment")}
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
              <CardTitle className="text-sm font-medium text-slate-400">{t("totalAppointments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("todayAppointments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{stats.today}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("upcomingAppointments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{stats.upcoming}</div>
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
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("totalRevenue")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">${stats.totalRevenue}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">{t("platformCommission")}</CardTitle>
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
                  placeholder={t("searchAppointments")}
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
                  <SelectItem value="scheduled">{t("scheduled")}</SelectItem>
                  <SelectItem value="confirmed">{t("confirmed")}</SelectItem>
                  <SelectItem value="completed">{t("completed")}</SelectItem>
                  <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">{t("allTypes")}</SelectItem>
                  <SelectItem value="in-person">{t("inPerson")}</SelectItem>
                  <SelectItem value="video">{t("videoCall")}</SelectItem>
                  <SelectItem value="phone">{t("phoneCall")}</SelectItem>
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
              {t("todayAppointments")}
            </h2>
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  statusConfig={statusConfig}
                  typeConfig={typeConfig}
                  onUpdateStatus={updateAppointmentStatus}
                  onConfirmClick={handleConfirmClick}
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
              {t("upcomingAppointments")}
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  statusConfig={statusConfig}
                  typeConfig={typeConfig}
                  onUpdateStatus={updateAppointmentStatus}
                  onConfirmClick={handleConfirmClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-400 mb-4">{t("pastAppointments")}</h2>
            <div className="space-y-4 opacity-60">
              {pastAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  statusConfig={statusConfig}
                  typeConfig={typeConfig}
                  onUpdateStatus={updateAppointmentStatus}
                  onConfirmClick={handleConfirmClick}
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
              <p className="text-slate-400 text-lg mb-2">{t("noAppointments")}</p>
              <p className="text-slate-500 text-sm">{t("scheduleFirstAppointment")}</p>
            </CardContent>
          </Card>
        )}

        {/* Confirm Appointment Dialog with Session Details */}
        <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
          <DialogContent className="bg-slate-900 border-cyan-500/30 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                Confirm Appointment & Add Session Details
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Record session information for {selectedAppointment?.patientName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Appointment Info Summary */}
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-400">Patient:</span>
                    <span className="text-white ml-2 font-semibold">{selectedAppointment?.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Date:</span>
                    <span className="text-white ml-2">{selectedAppointment && new Date(selectedAppointment.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Time:</span>
                    <span className="text-white ml-2">{selectedAppointment?.time}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Reason:</span>
                    <span className="text-white ml-2">{selectedAppointment?.reason}</span>
                  </div>
                </div>
              </div>

              {/* Actual Duration */}
              <div>
                <Label htmlFor="actualDuration" className="text-slate-400 text-sm">
                  Actual Session Duration (minutes)
                </Label>
                <Input
                  id="actualDuration"
                  type="number"
                  value={confirmData.actualDuration}
                  onChange={(e) => setConfirmData({ ...confirmData, actualDuration: parseInt(e.target.value) })}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="60"
                />
              </div>

              {/* Session Notes */}
              <div>
                <Label htmlFor="sessionNotes" className="text-slate-400 text-sm">
                  Session Notes <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="sessionNotes"
                  value={confirmData.sessionNotes}
                  onChange={(e) => setConfirmData({ ...confirmData, sessionNotes: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="What was covered in this session? Patient response, techniques used..."
                  rows={4}
                />
              </div>

              {/* Exercises Given */}
              <div>
                <Label htmlFor="exercisesGiven" className="text-slate-400 text-sm">
                  Exercises/Homework Given
                </Label>
                <Textarea
                  id="exercisesGiven"
                  value={confirmData.exercisesGiven}
                  onChange={(e) => setConfirmData({ ...confirmData, exercisesGiven: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                  placeholder="List exercises prescribed for home practice..."
                  rows={3}
                />
              </div>

              {/* Progress Rating */}
              <div>
                <Label className="text-slate-400 text-sm block mb-2">
                  Progress Rating (1-10)
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={confirmData.progressRating}
                    onChange={(e) => setConfirmData({ ...confirmData, progressRating: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold text-green-400 w-12 text-center">
                    {confirmData.progressRating}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Next Session Date */}
              <div>
                <Label htmlFor="nextSessionDate" className="text-slate-400 text-sm">
                  Next Session Date (Optional)
                </Label>
                <Input
                  id="nextSessionDate"
                  type="date"
                  value={confirmData.nextSessionDate}
                  onChange={(e) => setConfirmData({ ...confirmData, nextSessionDate: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleConfirmAppointmentWithDetails}
                  disabled={!confirmData.sessionNotes.trim()}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm Appointment
                </Button>
                <Button
                  onClick={() => setIsConfirmDialogOpen(false)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-400 hover:bg-slate-800"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarSleek>
  )
}

function AppointmentCard({ 
  appointment, 
  statusConfig, 
  typeConfig, 
  onUpdateStatus,
  onConfirmClick,
  isPast = false 
}: { 
  appointment: Appointment
  statusConfig: any
  typeConfig: any
  onUpdateStatus: (id: string, status: Appointment["status"]) => void
  onConfirmClick?: (appointment: Appointment) => void
  isPast?: boolean
}) {
  const { t } = useLanguage()
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
                  onClick={() => onConfirmClick?.(appointment)}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  {t("confirm")}
                </Button>
              )}
              {appointment.status === "confirmed" && (
                <Button
                  size="sm"
                  onClick={() => onUpdateStatus(appointment.id, "completed")}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  {t("complete")}
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => onUpdateStatus(appointment.id, "cancelled")}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <XCircle className="w-4 h-4 mr-1" />
                {t("cancel")}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

