"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, User, Mail, Phone, Clock, Heart, Activity, DollarSign, FileText, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Patient {
  id: string
  name: string
  email: string
  phone?: string
  age?: number
  condition?: string
  physiotherapistId: string
  physiotherapistName: string
  sessions: number
  createdAt: any
  sessionPrice?: number
  notes?: string
  status?: string
}

interface Appointment {
  id: string
  patientId: string
  patientName: string
  physiotherapistId: string
  physiotherapistName: string
  date: any
  time: string
  duration: string
  status: string
  notes?: string
  price?: number
}

export default function AdminPhysioPatientsPage() {
  const { t } = useLanguage()
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedPatientDetail, setSelectedPatientDetail] = useState<Patient | null>(null)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      
      // Fetch all patients
      const patientsSnapshot = await getDocs(collection(db, "physiotherapist_patients"))
      const allPatients: Patient[] = []
      patientsSnapshot.forEach((doc) => {
        allPatients.push({
          id: doc.id,
          ...doc.data()
        } as Patient)
      })
      setPatients(allPatients)

      // Fetch all appointments
      const appointmentsSnapshot = await getDocs(collection(db, "appointments"))
      const allAppointments: Appointment[] = []
      appointmentsSnapshot.forEach((doc) => {
        allAppointments.push({
          id: doc.id,
          ...doc.data()
        } as Appointment)
      })
      setAppointments(allAppointments)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.physiotherapistName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPatientAppointments = (patientId: string) => {
    return appointments.filter(apt => apt.patientId === patientId)
  }

  const formatDate = (date: any) => {
    if (!date) return "-"
    const d = date.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Cancelled</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">{status}</Badge>
    }
  }

  return (
    <AuthGuard allowedRoles={["admin-physiotherapist"]}>
      <SidebarSleek role="admin-physiotherapist">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-xl border border-white/10 p-8 mb-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-50 animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {t("allPatients")}
                    </h1>
                    <p className="text-purple-400 mt-1 font-medium">
                      {t("viewAllPatientsAndSessions")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <span className="text-purple-400 font-bold">{patients.length} {t("patients")}</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
                    <span className="text-pink-400 font-bold">{appointments.length} {t("appointments")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder={t("searchPatients") + "..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Patients List */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-slate-400 mt-4">{t("loading")}...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredPatients.length === 0 ? (
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">{t("noPatientsFound")}</p>
                  </CardContent>
                </Card>
              ) : (
                filteredPatients.map((patient) => {
                  const patientAppointments = getPatientAppointments(patient.id)
                  const isExpanded = selectedPatient === patient.id

                  return (
                    <Card key={patient.id} className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all">
                      <CardHeader 
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedPatientDetail(patient)
                          setDetailModalOpen(true)
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white flex items-center gap-2">
                              <User className="w-5 h-5 text-purple-400" />
                              {patient.name}
                            </CardTitle>
                            <p className="text-sm text-slate-400 mt-1">Patient ID: {patient.id}</p>
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {patient.sessions || 0} {t("sessions")}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Patient Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-sm font-semibold text-purple-400 mb-3">{t("personalInfo")}</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-500" />
                                <span className="text-sm text-slate-300">{patient.email}</span>
                              </div>
                              {patient.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-slate-500" />
                                  <span className="text-sm text-slate-300">{patient.phone}</span>
                                </div>
                              )}
                              {patient.age && (
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-slate-500" />
                                  <span className="text-sm text-slate-300">{patient.age} {t("years")}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                            <h3 className="text-sm font-semibold text-cyan-400 mb-3">{t("physiotherapist")}</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-cyan-400" />
                                <span className="text-white font-medium">{patient.physiotherapistName}</span>
                              </div>
                              {patient.condition && (
                                <div className="flex items-center gap-2">
                                  <Heart className="w-4 h-4 text-slate-500" />
                                  <span className="text-sm text-slate-300">{patient.condition}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Appointments/Sessions */}
                        {isExpanded && (
                          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                            <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center gap-2">
                              <Calendar className="w-5 h-5" />
                              {t("appointmentsSessions")} ({patientAppointments.length})
                            </h3>
                            
                            {patientAppointments.length === 0 ? (
                              <p className="text-center text-slate-500 py-8">{t("noAppointments")}</p>
                            ) : (
                              <div className="space-y-3">
                                {patientAppointments.map((apt) => (
                                  <div key={apt.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                        <span className="text-white font-medium">{formatDate(apt.date)}</span>
                                      </div>
                                      {getStatusBadge(apt.status)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-300">{apt.time}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-slate-500" />
                                        <span className="text-slate-300">{apt.duration}</span>
                                      </div>
                                    </div>
                                    {apt.notes && (
                                      <div className="mt-3 p-2 rounded bg-white/5">
                                        <p className="text-xs text-slate-400">{apt.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          )}

          {/* Patient Detail Modal */}
          <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10">
              {selectedPatientDetail && (
                <>
                  <DialogHeader className="flex-shrink-0 border-b border-white/10 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50" />
                          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-2xl">
                            {selectedPatientDetail.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <DialogTitle className="text-3xl font-black text-white tracking-tight">
                            {selectedPatientDetail.name}
                          </DialogTitle>
                          <DialogDescription className="text-purple-400 font-medium mt-1">
                            {t("patientDetails")} • ID: {selectedPatientDetail.id.substring(0, 8)}
                          </DialogDescription>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setDetailModalOpen(false)}
                        className="hover:bg-white/10"
                      >
                        <X className="w-5 h-5 text-slate-400" />
                      </Button>
                    </div>
                  </DialogHeader>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-6 py-6 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-800/50">
                    {/* Personal Information Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-400" />
                        {t("personalInfo")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-sm text-slate-400 mb-1">{t("email")}</p>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-purple-400" />
                            <p className="text-white font-medium">{selectedPatientDetail.email}</p>
                          </div>
                        </div>
                        {selectedPatientDetail.phone && (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-sm text-slate-400 mb-1">{t("phone")}</p>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-purple-400" />
                              <p className="text-white font-medium">{selectedPatientDetail.phone}</p>
                            </div>
                          </div>
                        )}
                        {selectedPatientDetail.age && (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-sm text-slate-400 mb-1">{t("age")}</p>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-purple-400" />
                              <p className="text-white font-medium">{selectedPatientDetail.age} {t("years")}</p>
                            </div>
                          </div>
                        )}
                        {selectedPatientDetail.condition && (
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-sm text-slate-400 mb-1">{t("condition")}</p>
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4 text-purple-400" />
                              <p className="text-white font-medium">{selectedPatientDetail.condition}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Physiotherapist Information */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-cyan-400" />
                        {t("physiotherapist")}
                      </h3>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {selectedPatientDetail.physiotherapistName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg">{selectedPatientDetail.physiotherapistName}</p>
                          <p className="text-cyan-400 text-sm">{t("assignedPhysiotherapist")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Session Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-6 h-6 text-green-400" />
                          <p className="text-sm text-slate-400">{t("totalSessions")}</p>
                        </div>
                        <p className="text-3xl font-black text-white">{selectedPatientDetail.sessions || 0}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-6 h-6 text-blue-400" />
                          <p className="text-sm text-slate-400">{t("appointments")}</p>
                        </div>
                        <p className="text-3xl font-black text-white">{getPatientAppointments(selectedPatientDetail.id).length}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="w-6 h-6 text-yellow-400" />
                          <p className="text-sm text-slate-400">{t("pricePerSession")}</p>
                        </div>
                        <p className="text-3xl font-black text-white">${selectedPatientDetail.sessionPrice || 0}</p>
                      </div>
                    </div>

                    {/* Appointments History */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 backdrop-blur-xl border border-violet-500/20">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-violet-400" />
                        {t("appointmentHistory")} ({getPatientAppointments(selectedPatientDetail.id).length})
                      </h3>
                      
                      {getPatientAppointments(selectedPatientDetail.id).length === 0 ? (
                        <div className="text-center py-8">
                          <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400">{t("noAppointments")}</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-800/50">
                          {getPatientAppointments(selectedPatientDetail.id).map((apt) => (
                            <div 
                              key={apt.id} 
                              className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-white font-bold text-lg">{formatDate(apt.date)}</p>
                                    <p className="text-slate-400 text-sm">{apt.time} • {apt.duration}</p>
                                  </div>
                                </div>
                                {getStatusBadge(apt.status)}
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-slate-500" />
                                  <span className="text-sm text-slate-300">{apt.physiotherapistName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-slate-500" />
                                  <span className="text-sm text-slate-300">${apt.price ? apt.price : (selectedPatientDetail.sessionPrice || 50)}</span>
                                </div>
                              </div>

                              {apt.notes && (
                                <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                  <div className="flex items-start gap-2">
                                    <FileText className="w-4 h-4 text-purple-400 mt-0.5" />
                                    <div>
                                      <p className="text-xs text-purple-400 font-semibold mb-1">{t("notes")}</p>
                                      <p className="text-sm text-slate-300">{apt.notes}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Additional Notes */}
                    {selectedPatientDetail.notes && (
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-amber-400" />
                          {t("additionalNotes")}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">{selectedPatientDetail.notes}</p>
                      </div>
                    )}

                    {/* Registration Info */}
                    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-400" />
                        {t("registrationInfo")}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400 mb-1">{t("createdAt")}</p>
                          <p className="text-white font-medium">{formatDate(selectedPatientDetail.createdAt)}</p>
                        </div>
                        <Badge className={
                          selectedPatientDetail.status === 'active' 
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                        }>
                          {selectedPatientDetail.status === 'active' ? t("active") : selectedPatientDetail.status || t("active")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </SidebarSleek>
    </AuthGuard>
  )
}
