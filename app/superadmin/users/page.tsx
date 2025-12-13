"use client"

import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, Search, Plus, Filter, UserCheck, UserX, Crown, Activity, Mail, Phone, MapPin, X, Save, UserPlus, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"

export default function UsersPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'users' | 'requests' | 'renewals'>('users')
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [proRequests, setProRequests] = useState<any[]>([])
  const [pendingUsers, setPendingUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showProDialog, setShowProDialog] = useState(false)
  const [selectedProRequest, setSelectedProRequest] = useState<any>(null)
  const [proFormData, setProFormData] = useState({ amount: '', duration: '1' })
  const [isProcessingPro, setIsProcessingPro] = useState(false)
  const [showDuplicateEmailDialog, setShowDuplicateEmailDialog] = useState(false)
  const [duplicateEmail, setDuplicateEmail] = useState('')
  const [showProErrorDialog, setShowProErrorDialog] = useState(false)
  const [proErrorMessage, setProErrorMessage] = useState('')
  const [showProSuccessDialog, setShowProSuccessDialog] = useState(false)
  const [proSuccessData, setProSuccessData] = useState<any>(null)
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0
  })
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "User",
    location: "",
    password: ""
  })

  // Fetch users from database
  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        
        // Filter to show only user and trainer roles
        const filteredData = data.filter((u: any) => {
          const role = u.role?.toLowerCase()
          return role === "user" || role === "trainer"
        })
        
        // Calculate stats - trainer and superadmin are always active
        const total = filteredData.length
        const active = filteredData.filter((u: any) => {
          const role = u.role?.toLowerCase()
          // Trainers and superadmins are always considered active
          if (role === "trainer" || role === "superadmin") return true
          return u.isActive
        }).length
        const inactive = total - active
        const admins = 0 // No admins shown in this view
        
        setStats({ total, active, inactive, admins })
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch pending user approvals
  const fetchPendingUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (response.ok) {
        const data = await response.json()
        // Filter users with pending approval status
        const pending = data.filter((u: any) => u.approvalStatus === 'pending' && u.emailVerified)
        setPendingUsers(pending)
      }
    } catch (error) {
      console.error("Error fetching pending users:", error)
    }
  }

  // Fetch Pro upgrade requests
  const fetchProRequests = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/pro-requests")
      if (response.ok) {
        const data = await response.json()
        setProRequests(data)
      }
    } catch (error) {
      console.error("Error fetching Pro requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Delete user function
  const handleDeleteUser = async () => {
    if (!userToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/users?id=${userToDelete.id || userToDelete.uid}`, {
        method: "DELETE"
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.details || "Failed to delete user")
      }

      console.log("✅ User deleted successfully")
      
      // Refresh users list
      fetchUsers()
      
      // Close dialog
      setDeleteDialogOpen(false)
      setUserToDelete(null)
      
      // Show success message
      const successDiv = document.createElement('div')
      successDiv.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] animate-in fade-in zoom-in duration-300'
      successDiv.innerHTML = `
        <div class="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-3xl shadow-2xl p-8 max-w-md border border-red-400/30">
          <div class="text-center">
            <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-bold mb-3">🗑️ User Deleted!</h3>
            <p class="text-red-100 mb-2 text-lg">The user has been successfully deleted</p>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4 border border-white/20">
              <p class="text-sm text-red-50 mb-1">👤 Deleted User</p>
              <p class="font-semibold text-white">${userToDelete.name}</p>
              <p class="font-mono text-sm text-red-100 mt-1">${userToDelete.email}</p>
            </div>
          </div>
        </div>
      `
      document.body.appendChild(successDiv)
      
      setTimeout(() => {
        successDiv.style.animation = 'fade-out 300ms ease-out'
        setTimeout(() => successDiv.remove(), 300)
      }, 3000)
      
      successDiv.addEventListener('click', () => {
        successDiv.style.animation = 'fade-out 300ms ease-out'
        setTimeout(() => successDiv.remove(), 300)
      })
    } catch (error: any) {
      console.error("❌ Error deleting user:", error)
      alert(`Failed to delete user: ${error.message}`)
    } finally {
      setIsDeleting(false)
    }
  }

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers()
    } else {
      fetchProRequests()
      fetchPendingUsers()
    }
  }, [activeTab])

  // Load pro requests and pending users on mount to show badge count
  useEffect(() => {
    fetchProRequests()
    fetchPendingUsers()
  }, [])

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{t("userManagementTitle")}</h1>
                  <p className="text-gray-400 text-sm">{t("manageYourUsers")}</p>
                </div>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("addNewUser")}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-white" />
                    </div>
                    {t("addNewUser")}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  {/* Profile Preview */}
                  <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/50">
                          {newUser.firstName.charAt(0) || "U"}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold text-lg">
                            {newUser.firstName || newUser.lastName 
                              ? `${newUser.firstName} ${newUser.lastName}`.trim()
                              : "New User"}
                          </p>
                          <p className="text-gray-400 text-sm">{newUser.email || "email@example.com"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-400" />
                      </div>
                      {t("personalInformation")}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("firstName")} *</Label>
                        <Input
                          value={newUser.firstName}
                          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                          placeholder="Ahmad"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("lastName")} *</Label>
                        <Input
                          value={newUser.lastName}
                          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                          placeholder="Hassan"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-cyan-400" />
                      </div>
                      {t("personalInfo")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("emailAddressLabel")} *</Label>
                        <Input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="ahmad@example.com"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("phoneNumberLabel")}</Label>
                        <Input
                          type="tel"
                          value={newUser.phone}
                          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          placeholder="+964 750 123 4567"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("locationLabel")}</Label>
                        <Input
                          value={newUser.location}
                          onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                          placeholder="Erbil, Kurdistan"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div>
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Crown className="w-4 h-4 text-green-400" />
                      </div>
                      {t("accountSettings")}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("roleLabel")} *</Label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                          className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-lg px-4 py-2.5"
                        >
                          <option value="User">User</option>
                          <option value="Trainer">Trainer</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm mb-2 block">{t("passwordLabel")} *</Label>
                        <Input
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                          placeholder="Min 8 characters"
                          className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                      </div>
                    </div>
                  </div>

                  {/* Role Badge Preview */}
                  <Card className="bg-slate-800/30 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">{t("roleLabel")}</p>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${
                              newUser.role === "Trainer" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                              "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            }`}>
                              {newUser.role}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-1">{t("membership")}</p>
                            <span className="px-4 py-2 rounded-full text-sm font-semibold inline-block bg-slate-700/50 text-gray-400 border border-slate-600">
                              Free
                            </span>
                          </div>
                        </div>
                        <Crown className="w-10 h-10 text-gray-600" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => setIsDialogOpen(false)}
                      variant="outline"
                      className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t("cancelAction")}
                    </Button>
                    <Button
                      onClick={async () => {
                        if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password) {
                          alert("تکایە هەموو خانە پێویستەکان پڕبکەرەوە")
                          return
                        }

                        // Normalize email: treat .co and .com as the same
                        const normalizeEmail = (email: string) => {
                          return email.toLowerCase().replace(/\.co$/, '.com')
                        }

                        // Check if email already exists
                        const normalizedNewEmail = normalizeEmail(newUser.email)
                        const existingUser = users.find(u => normalizeEmail(u.email) === normalizedNewEmail)
                        
                        if (existingUser) {
                          setDuplicateEmail(newUser.email)
                          setShowDuplicateEmailDialog(true)
                          return
                        }

                        setIsCreating(true)
                        try {
                          const response = await fetch("/api/users", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              name: `${newUser.firstName} ${newUser.lastName}`,
                              firstName: newUser.firstName,
                              lastName: newUser.lastName,
                              email: newUser.email,
                              phone: newUser.phone,
                              role: newUser.role.toLowerCase(),
                              membership: "Free",
                              subscriptionStatus: "inactive",
                              subscriptionEnd: null,
                              password: newUser.password
                            })
                          })

                          if (!response.ok) {
                            const error = await response.json()
                            throw new Error(error.details || "Failed to create user")
                          }

                          const createdUser = await response.json()
                          console.log("✅ User created successfully:", createdUser)
                          
                          // Create Pro upgrade request for the new user
                          try {
                            await fetch("/api/pro-requests", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                userId: createdUser.id,
                                userEmail: newUser.email,
                                userName: `${newUser.firstName} ${newUser.lastName}`,
                                requestedDuration: 30
                              })
                            })
                            console.log("✅ Pro request created for new user")
                          } catch (error) {
                            console.error("Error creating Pro request:", error)
                          }
                          
                          // Refresh users and pro requests lists
                          fetchUsers()
                          fetchProRequests()
                          
                          // Close dialog first
                          setIsDialogOpen(false)
                          
                          // Show beautiful success message
                          setTimeout(() => {
                            const successDiv = document.createElement('div')
                            successDiv.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] animate-in fade-in zoom-in duration-300'
                            successDiv.innerHTML = `
                              <div class="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-8 max-w-md border border-green-400/30">
                                <div class="text-center">
                                  <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6 animate-bounce">
                                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  </div>
                                  <h3 class="text-3xl font-bold mb-3">✨ Account Created!</h3>
                                  <p class="text-green-100 mb-2 text-lg">The account has been successfully created</p>
                                  <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4 border border-white/20">
                                    <p class="text-sm text-green-50 mb-1">📧 Email</p>
                                    <p class="font-mono font-semibold text-white">${newUser.email}</p>
                                  </div>
                                  <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-3 border border-white/20">
                                    <p class="text-sm text-green-50 mb-1">👤 Name</p>
                                    <p class="font-semibold text-white">${newUser.firstName} ${newUser.lastName}</p>
                                  </div>
                                  <p class="text-green-100 text-sm mt-6">User can now log in to their account</p>
                                </div>
                              </div>
                            `
                            document.body.appendChild(successDiv)
                            
                            // Auto remove after 5 seconds
                            setTimeout(() => {
                              successDiv.style.animation = 'fade-out 300ms ease-out'
                              setTimeout(() => successDiv.remove(), 300)
                            }, 5000)
                            
                            // Click to close
                            successDiv.addEventListener('click', () => {
                              successDiv.style.animation = 'fade-out 300ms ease-out'
                              setTimeout(() => successDiv.remove(), 300)
                            })
                          }, 100)
                          
                          // Reset form
                          setNewUser({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            role: "User",
                            location: "",
                            password: ""
                          })
                        } catch (error: any) {
                          console.error("❌ Error creating user:", error)
                          alert(`Failed to create user: ${error.message}`)
                        } finally {
                          setIsCreating(false)
                        }
                      }}
                      disabled={isCreating}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isCreating ? t("loading") + "..." : t("addNewUser")}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-semibold transition-all duration-300 ${
                activeTab === 'users'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gradient-to-t from-cyan-500/10 to-transparent'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t("allUsers")}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
                activeTab === 'requests'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gradient-to-t from-cyan-500/10 to-transparent'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                {t("proRequests")}
                {(proRequests.filter(r => r.status === 'pending').length + pendingUsers.length) > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {proRequests.filter(r => r.status === 'pending').length + pendingUsers.length}
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('renewals')}
              className={`relative px-6 py-3 font-semibold transition-all duration-300 ${
                activeTab === 'renewals'
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gradient-to-t from-cyan-500/10 to-transparent'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {t("renewSubscription")}
                {users.filter(u => u.role === 'user' && (u.membership === 'Free' || !u.membership)).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 rounded-full text-xs text-white flex items-center justify-center">
                    {users.filter(u => u.role === 'user' && (u.membership === 'Free' || !u.membership)).length}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Stats Grid - Only show for users tab */}
          {activeTab === 'users' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-500/5 border-blue-500/40 hover:border-blue-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">{stats.total}</p>
                    <p className="text-xs text-blue-300 font-medium">{t("totalUsers")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 via-green-600/10 to-green-500/5 border-green-500/40 hover:border-green-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <UserCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">{stats.active}</p>
                    <p className="text-xs text-green-300 font-medium">{t("active")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/20 via-red-600/10 to-red-500/5 border-red-500/40 hover:border-red-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                    <UserX className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent">{stats.inactive}</p>
                    <p className="text-xs text-red-300 font-medium">Inactive</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-500/5 border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">{stats.admins}</p>
                    <p className="text-xs text-purple-300 font-medium">Trainers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          )}

          {/* Search & Filter - Only for users tab */}
          {activeTab === 'users' && (
          <Card className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <Input
                    placeholder={t("searchUsers")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-slate-800/80 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <Button variant="outline" className="h-12 border-slate-600 text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border-cyan-500/50 transition-all">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Users Table */}
          {activeTab === 'users' && (
          <Card className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t("allUsers")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">{t("loading")}...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg mb-2">No users found</p>
                  <p className="text-gray-500 text-sm">Create your first user to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">User</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">Role</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">Membership</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">Status</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">Days Left</th>
                        <th className="text-left text-gray-400 text-sm font-semibold p-3">Joined</th>
                        <th className="text-right text-gray-400 text-sm font-semibold p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((user) => {
                          // Only show user and trainer roles
                          const role = user.role?.toLowerCase()
                          if (role !== "user" && role !== "trainer") {
                            return false
                          }
                          // Search filter
                          return user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 user.email?.toLowerCase().includes(searchQuery.toLowerCase())
                        })
                        .map((user) => (
                        <tr key={user.id || user.uid} className="border-b border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/40 hover:via-slate-800/30 hover:to-slate-800/20 hover:scale-[1.01] transition-all duration-300">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/20">
                                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                              </div>
                              <div>
                                <p className="text-white font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{user.name || "No Name"}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize shadow-lg ${
                              user.role === "trainer" ? "bg-gradient-to-r from-blue-500/30 via-blue-600/20 to-blue-500/10 text-blue-300 border border-blue-400/40 shadow-blue-500/20" :
                              "bg-gradient-to-r from-purple-500/30 via-purple-600/20 to-purple-500/10 text-purple-300 border border-purple-400/40 shadow-purple-500/20"
                            }`}>
                              {user.role || "user"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                              (user.role === "trainer" || user.role === "superadmin" || user.membership === "Pro")
                                ? "bg-gradient-to-r from-yellow-500/40 via-amber-500/30 to-orange-500/20 text-yellow-300 border border-yellow-400/50 shadow-yellow-500/30"
                                : "bg-gradient-to-r from-slate-700/50 to-slate-800/30 text-gray-400 border border-slate-600/50"
                            }`}>
                              {(user.role === "trainer" || user.role === "superadmin") ? "Pro" : (user.membership || "Free")}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                              (user.role === "trainer" || user.role === "superadmin" || user.isActive)
                                ? "bg-gradient-to-r from-green-500/30 via-green-600/20 to-green-500/10 text-green-300 border border-green-400/40 shadow-green-500/20"
                                : "bg-gradient-to-r from-red-500/30 via-red-600/20 to-red-500/10 text-red-300 border border-red-400/40 shadow-red-500/20"
                            }`}>
                              {(user.role === "trainer" || user.role === "superadmin" || user.isActive) ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="p-4">
                            {(() => {
                              if (user.membership !== "Pro" && user.role !== "trainer" && user.role !== "superadmin") {
                                return <span className="text-gray-500 text-sm">-</span>
                              }
                              
                              const expiryDate = user.subscriptionEnd ? new Date(user.subscriptionEnd) : null
                              if (!expiryDate) {
                                return <span className="text-gray-500 text-sm">∞</span>
                              }
                              
                              const daysLeft = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                              const isExpired = daysLeft <= 0
                              const isExpiringSoon = daysLeft <= 7 && daysLeft > 0
                              
                              return (
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    isExpired 
                                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                      : isExpiringSoon
                                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                                      : 'bg-green-500/20 text-green-300 border border-green-500/40'
                                  }`}>
                                    {isExpired ? `${Math.abs(daysLeft)}d ago` : `${daysLeft}d`}
                                  </span>
                                </div>
                              )
                            })()}
                          </td>
                          <td className="p-4 text-gray-400 text-sm font-medium">
                            {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "-"}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setUserToEdit(user)
                                  setEditDialogOpen(true)
                                }}
                                className="border-slate-700 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/10 hover:border-blue-500/50 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  setUserToDelete(user)
                                  setDeleteDialogOpen(true)
                                }}
                                className="border-red-700/50 text-red-400 hover:bg-gradient-to-r hover:from-red-600/30 hover:to-red-700/20 hover:border-red-500/60 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          )}

          {/* Subscription Renewals Tab */}
          {activeTab === 'renewals' && (
          <Card className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{t("renewSubscription")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400">{t("loading")}...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/50">
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">User</th>
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">Current Plan</th>
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">Expires On</th>
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">Status</th>
                        <th className="text-right p-4 text-gray-400 font-semibold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((user) => user.role === 'user' && (user.membership === 'Free' || !user.membership))
                        .map((user) => {
                          const expiryDate = user.subscriptionEnd ? new Date(user.subscriptionEnd) : null
                          const daysLeft = expiryDate ? Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0
                          const isExpiringSoon = daysLeft <= 7 && daysLeft > 0
                          const isExpired = daysLeft <= 0

                          return (
                            <tr key={user.id || user.uid} className="border-b border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/40 hover:via-slate-800/30 hover:to-slate-800/20 transition-all duration-300">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-green-500/30 ring-2 ring-green-400/20">
                                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                                  </div>
                                  <div>
                                    <p className="text-white font-semibold">{user.name || "No Name"}</p>
                                    <p className="text-gray-400 text-sm">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg bg-gradient-to-r from-gray-500/40 via-slate-500/30 to-gray-500/20 text-gray-300 border border-gray-400/50 shadow-gray-500/30">
                                  FREE
                                </span>
                              </td>
                              <td className="p-4">
                                {expiryDate ? (
                                  <div>
                                    <p className="text-white font-semibold text-sm">
                                      {expiryDate.toLocaleDateString()}
                                    </p>
                                    <p className={`text-xs mt-1 ${
                                      isExpired ? 'text-red-400' : 
                                      isExpiringSoon ? 'text-orange-400' : 
                                      'text-gray-400'
                                    }`}>
                                      {isExpired ? 'Expired' : isExpiringSoon ? `${daysLeft} days left` : `${daysLeft} days left`}
                                    </p>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </td>
                              <td className="p-4">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                                  isExpired
                                    ? "bg-gradient-to-r from-red-500/30 via-red-600/20 to-red-500/10 text-red-300 border border-red-400/40 shadow-red-500/20"
                                    : isExpiringSoon
                                    ? "bg-gradient-to-r from-orange-500/30 via-orange-600/20 to-orange-500/10 text-orange-300 border border-orange-400/40 shadow-orange-500/20"
                                    : "bg-gradient-to-r from-green-500/30 via-green-600/20 to-green-500/10 text-green-300 border border-green-400/40 shadow-green-500/20"
                                }`}>
                                  {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedProRequest({ ...user, userId: user.id || user.uid, userEmail: user.email, userName: user.name })
                                    setProFormData({ amount: '', duration: '1' })
                                    setShowProDialog(true)
                                  }}
                                  className="border-green-700/50 text-green-400 hover:bg-gradient-to-r hover:from-green-600/30 hover:to-green-700/20 hover:border-green-500/60 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                                >
                                  <Activity className="w-4 h-4 mr-1" />
                                  نوێکردنەوە
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          )}

          {/* Pending User Approvals */}
          {activeTab === 'requests' && pendingUsers.length > 0 && (
          <Card className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 border-cyan-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t("pendingUserApprovals")}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                  {pendingUsers.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800/50">
                      <th className="text-left p-4 text-gray-400 font-semibold text-sm">{t("user")}</th>
                      <th className="text-left p-4 text-gray-400 font-semibold text-sm">{t("emailAddressLabel")}</th>
                      <th className="text-left p-4 text-gray-400 font-semibold text-sm">{t("joinedDate")}</th>
                      <th className="text-right p-4 text-gray-400 font-semibold text-sm">{t("actionsColumn")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((user) => (
                      <tr key={user.id || user.uid} className="border-b border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/40 hover:via-slate-800/30 hover:to-slate-800/20 transition-all duration-300">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/20">
                              {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="text-white font-semibold">{user.name || "No Name"}</p>
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                                {t("emailVerified")} ✓
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-300 text-sm">{user.email}</p>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">
                          {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "-"}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={async () => {
                                try {
                                  const response = await fetch('/api/users/approve', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      userId: user.id || user.uid,
                                      action: 'approve',
                                      adminId: 'superadmin'
                                    })
                                  })
                                  
                                  if (response.ok) {
                                    // Success animation
                                    const successDiv = document.createElement('div')
                                    successDiv.className = 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] animate-in fade-in zoom-in duration-300'
                                    successDiv.innerHTML = `
                                      <div class="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-8 max-w-md border border-green-400/30">
                                        <div class="text-center">
                                          <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-6">
                                            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                          </div>
                                          <h3 class="text-3xl font-bold mb-3">✅ ${t("userApproved")}!</h3>
                                          <p class="text-green-100 mb-2 text-lg">${user.name || user.email} ${t("canNowLogin")}</p>
                                        </div>
                                      </div>
                                    `
                                    document.body.appendChild(successDiv)
                                    setTimeout(() => {
                                      successDiv.style.animation = 'fade-out 300ms ease-out'
                                      setTimeout(() => successDiv.remove(), 300)
                                    }, 3000)
                                    
                                    fetchPendingUsers()
                                    fetchUsers()
                                  }
                                } catch (error) {
                                  console.error('Error approving user:', error)
                                }
                              }}
                              className="border-green-700/50 text-green-400 hover:bg-gradient-to-r hover:from-green-600/30 hover:to-green-700/20 hover:border-green-500/60 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              {t("approve")}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={async () => {
                                try {
                                  const response = await fetch('/api/users/approve', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      userId: user.id || user.uid,
                                      action: 'reject',
                                      adminId: 'superadmin'
                                    })
                                  })
                                  
                                  if (response.ok) {
                                    fetchPendingUsers()
                                    fetchUsers()
                                  }
                                } catch (error) {
                                  console.error('Error rejecting user:', error)
                                }
                              }}
                              className="border-red-700/50 text-red-400 hover:bg-gradient-to-r hover:from-red-600/30 hover:to-red-700/20 hover:border-red-500/60 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                            >
                              <X className="w-4 h-4 mr-1" />
                              {t("reject")}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Pro Requests Table */}
          {activeTab === 'requests' && (
          <Card className="bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/40 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-slate-800/30">
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{t("upgradeRequests")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-400 text-sm">{t("loading")}...</p>
                </div>
              ) : proRequests.length === 0 ? (
                <div className="text-center py-16">
                  <Crown className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <p className="text-xl text-gray-400 mb-2">{t("noPendingRequests")}</p>
                  <p className="text-gray-500 text-sm">{t("proRequestsDescription")}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/50">
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">User</th>
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">Requested Duration</th>
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">Status</th>
                        <th className="text-left p-4 text-gray-400 font-semibold text-sm">Date</th>
                        <th className="text-right p-4 text-gray-400 font-semibold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proRequests.map((request) => (
                        <tr key={request.id} className="border-b border-slate-800/50 hover:bg-gradient-to-r hover:from-slate-800/40 hover:via-slate-800/30 hover:to-slate-800/20 hover:scale-[1.01] transition-all duration-300">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-yellow-500/30 ring-2 ring-yellow-400/20">
                                {request.userName?.charAt(0) || request.userEmail?.charAt(0) || "U"}
                              </div>
                              <div>
                                <p className="text-white font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{request.userName || "No Name"}</p>
                                <p className="text-gray-400 text-sm">{request.userEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg bg-gradient-to-r from-cyan-500/30 via-cyan-600/20 to-cyan-500/10 text-cyan-300 border border-cyan-400/40 shadow-cyan-500/20">
                              {request.duration ? `${Math.floor(request.duration / 30)} ${Math.floor(request.duration / 30) === 1 ? 'Month' : 'Months'}` : `${request.requestedDuration || 30} Days`}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                              request.status === 'pending' 
                                ? "bg-gradient-to-r from-yellow-500/30 via-yellow-600/20 to-yellow-500/10 text-yellow-300 border border-yellow-400/40 shadow-yellow-500/20"
                                : request.status === 'approved'
                                ? "bg-gradient-to-r from-green-500/30 via-green-600/20 to-green-500/10 text-green-300 border border-green-400/40 shadow-green-500/20"
                                : "bg-gradient-to-r from-red-500/30 via-red-600/20 to-red-500/10 text-red-300 border border-red-400/40 shadow-red-500/20"
                            }`}>
                              {request.status || 'pending'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400 text-sm font-medium">
                            {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "-"}
                          </td>
                          <td className="p-4 text-right">
                            {request.status === 'pending' && (
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedProRequest(request)
                                    setProFormData({ amount: '', duration: '1' })
                                    setShowProDialog(true)
                                  }}
                                  className="border-green-700/50 text-green-400 hover:bg-gradient-to-r hover:from-green-600/30 hover:to-green-700/20 hover:border-green-500/60 hover:text-green-300 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                                >
                                  پەسەندکردن
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={async () => {
                                    try {
                                      const response = await fetch(`/api/pro-requests/${request.id}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                          status: 'rejected',
                                          userId: request.userId
                                        })
                                      })
                                      
                                      if (response.ok) {
                                        fetchProRequests()
                                      }
                                    } catch (error) {
                                      console.error('Error rejecting request:', error)
                                    }
                                  }}
                                  className="border-red-700/50 text-red-400 hover:bg-gradient-to-r hover:from-red-600/30 hover:to-red-700/20 hover:border-red-500/60 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                            {request.status !== 'pending' && (
                              <span className="text-gray-500 text-sm">Processed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          )}
        </div>

        {/* Edit User Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 border-2 border-blue-600/40 text-white shadow-2xl shadow-blue-500/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
                  <UserPlus className="w-6 h-6" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{t("editUser")}</span>
              </DialogTitle>
            </DialogHeader>
            {userToEdit && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 font-semibold">{t("firstName")}</Label>
                    <Input 
                      value={userToEdit.firstName || userToEdit.name?.split(' ')[0] || ''}
                      onChange={(e) => setUserToEdit({...userToEdit, firstName: e.target.value})}
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 font-semibold">{t("lastName")}</Label>
                    <Input 
                      value={userToEdit.lastName || userToEdit.name?.split(' ').slice(1).join(' ') || ''}
                      onChange={(e) => setUserToEdit({...userToEdit, lastName: e.target.value})}
                      className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 font-semibold">{t("emailAddressLabel")}</Label>
                  <Input
                    type="email"
                    value={userToEdit.email || ''}
                    onChange={(e) => setUserToEdit({...userToEdit, email: e.target.value})}
                    className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 font-semibold">{t("phoneNumberLabel")}</Label>
                  <Input 
                    value={userToEdit.phone || ''}
                    onChange={(e) => setUserToEdit({...userToEdit, phone: e.target.value})}
                    className="bg-slate-800/50 border-slate-700 text-white focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 font-semibold">{t("roleLabel")}</Label>
                    <select 
                      value={userToEdit.role || 'user'}
                      onChange={(e) => setUserToEdit({...userToEdit, role: e.target.value})}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-md px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    >
                      <option value="user">User</option>
                      <option value="trainer">Trainer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 font-semibold">{t("statusColumn")}</Label>
                    <select 
                      value={userToEdit.isActive ? 'active' : 'inactive'}
                      onChange={(e) => setUserToEdit({...userToEdit, isActive: e.target.value === 'active'})}
                      disabled={userToEdit.role === 'trainer' || userToEdit.role === 'superadmin'}
                      className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-md px-3 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="active">{t("active")}</option>
                      <option value="inactive">{t("inactive")}</option>
                    </select>
                    {(userToEdit.role === 'trainer' || userToEdit.role === 'superadmin') && (
                      <p className="text-xs text-cyan-400 mt-1">{t("trainersAlwaysActive")}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => {
                      setEditDialogOpen(false)
                      setUserToEdit(null)
                    }}
                    variant="outline"
                    className="flex-1 border-2 border-slate-700 text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 hover:border-slate-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
                    disabled={isUpdating}
                  >
                    {t("cancelAction")}
                  </Button>
                  <Button
                    onClick={async () => {
                      setIsUpdating(true)
                      try {
                        // Auto-set trainer and superadmin to Pro and Active
                        const isPrivilegedRole = userToEdit.role === 'trainer' || userToEdit.role === 'superadmin'
                        const newMembership = isPrivilegedRole ? 'Pro' : userToEdit.membership
                        
                        // If changing to Pro, add membershipDate
                        const updatePayload: any = {
                          firstName: userToEdit.firstName,
                          lastName: userToEdit.lastName,
                          email: userToEdit.email,
                          phone: userToEdit.phone,
                          role: userToEdit.role,
                          isActive: isPrivilegedRole ? true : userToEdit.isActive,
                          membership: newMembership
                        }
                        
                        // Add membershipDate if becoming Pro
                        if (newMembership === 'Pro') {
                          updatePayload.membershipDate = new Date()
                        }
                        
                        const response = await fetch(`/api/users?id=${userToEdit.id || userToEdit.uid}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updatePayload)
                        })

                        if (!response.ok) {
                          throw new Error('Failed to update user')
                        }

                        await fetchUsers()
                        setEditDialogOpen(false)
                        setUserToEdit(null)
                      } catch (error) {
                        console.error('Error updating user:', error)
                      } finally {
                        setIsUpdating(false)
                      }
                    }}
                    disabled={isUpdating}
                    className="flex-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                  >
                    {isUpdating ? t("updating") + '...' : t("saveChanges")}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 border-2 border-red-600/40 text-white shadow-2xl shadow-red-500/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 via-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/40">
                  <span className="text-2xl">⚠️</span>
                </div>
                <span className="bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">{t("deleteUserTitle")}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-gradient-to-br from-red-950/40 via-red-900/20 to-red-950/30 border-2 border-red-700/40 rounded-xl p-5 shadow-lg">
                <p className="text-gray-200 mb-5 text-base font-medium">
                  {t("areYouSure")} {t("actionCannotBeUndone")}.
                </p>
                {userToDelete && (
                  <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/50 rounded-xl p-4 space-y-3 border border-slate-700/50 shadow-lg">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Name</p>
                      <p className="text-white font-bold text-lg mt-1">{userToDelete.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email</p>
                      <p className="text-gray-300 font-mono text-sm mt-1">{userToDelete.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Role</p>
                      <p className="text-gray-300 capitalize font-medium mt-1 px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full inline-block text-purple-300">{userToDelete.role}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setDeleteDialogOpen(false)
                    setUserToDelete(null)
                  }}
                  variant="outline"
                  className="flex-1 border-2 border-slate-700 text-gray-300 hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/40 hover:border-slate-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold"
                  disabled={isDeleting}
                >
                  {t("cancelAction")}
                </Button>
                <Button
                  onClick={handleDeleteUser}
                  disabled={isDeleting}
                  className="flex-1 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:via-rose-700 hover:to-red-800 text-white shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  {isDeleting ? t("loading") + "..." : t("deleteUser")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* PRO Approval Dialog */}
        <Dialog open={showProDialog} onOpenChange={setShowProDialog}>
          <DialogContent className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 border-4 border-purple-500/50 shadow-2xl max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white">{selectedProRequest?.id ? 'پەسەندکردن بۆ PRO' : 'نوێکردنەوەی ئیشتراک'}</div>
                  {selectedProRequest && (
                    <div className="text-sm text-purple-300 font-normal mt-1">
                      {selectedProRequest.userName}
                    </div>
                  )}
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Amount */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400">💵</span>
                  </div>
                  بڕی پارە
                </Label>
                <Input
                  type="number"
                  value={proFormData.amount}
                  onChange={(e) => setProFormData({ ...proFormData, amount: e.target.value })}
                  placeholder="نموونە: 50000"
                  className="bg-slate-800/50 border-slate-700 text-white h-12 text-lg"
                />
                <p className="text-xs text-gray-400">بڕی پارەی پێدراو بە دینار (IQD)</p>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label className="text-white font-bold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400">📅</span>
                  </div>
                  ماوەکە (مانگ)
                </Label>
                <Input
                  type="number"
                  min="1"
                  value={proFormData.duration}
                  onChange={(e) => setProFormData({ ...proFormData, duration: e.target.value })}
                  placeholder="1"
                  className="bg-slate-800/50 border-slate-700 text-white h-12 text-lg"
                />
                <p className="text-xs text-gray-400">کەمترین ماوە: 1 مانگ</p>
              </div>

              {/* Preview */}
              {proFormData.amount && proFormData.duration && (
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-gray-400">پوختە:</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">بڕی پارە:</span>
                        <span className="text-lg font-black text-green-400">{proFormData.amount} IQD</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">ماوەکە:</span>
                        <span className="text-lg font-black text-blue-400">{proFormData.duration} مانگ</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-purple-500/30">
                        <span className="text-sm text-gray-400">کۆتایی:</span>
                        <span className="text-sm font-bold text-purple-300">
                          {new Date(Date.now() + parseInt(proFormData.duration) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => setShowProDialog(false)}
                variant="outline"
                disabled={isProcessingPro}
                className="flex-1 border-slate-700 text-gray-300 hover:bg-slate-800 h-12"
              >
                <X className="w-4 h-4 mr-2" />
                پاشگەزبوونەوە
              </Button>
              <Button
                onClick={async () => {
                  if (!selectedProRequest || !proFormData.amount || !proFormData.duration) {
                    alert('تکایە هەموو خانەکان پڕبکەرەوە!')
                    return
                  }

                  const duration = parseInt(proFormData.duration)
                  if (duration < 1) {
                    alert('کەمترین ماوە 1 مانگە!')
                    return
                  }

                  try {
                    setIsProcessingPro(true)
                    
                    console.log('📤 Sending Pro approval request:', {
                      requestId: selectedProRequest.id,
                      userId: selectedProRequest.userId,
                      duration: duration,
                      amount: proFormData.amount
                    })
                    
                    // Check if this is a renewal (no request ID) or new approval
                    const isRenewal = !selectedProRequest.id
                    
                    const response = isRenewal 
                      ? await fetch(`/api/users?id=${selectedProRequest.userId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            extendSubscription: true,
                            additionalDays: duration * 30,
                            amount: proFormData.amount
                          })
                        })
                      : await fetch(`/api/pro-requests/${selectedProRequest.id}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            status: 'approved',
                            proDuration: duration * 30, // Convert months to days
                            userId: selectedProRequest.userId,
                            amount: proFormData.amount
                          })
                        })
                    
                    console.log('📥 Pro approval response status:', response.status, response.statusText)
                    
                    if (response.ok) {
                      console.log('✅ Pro approval successful!')
                      setShowProDialog(false)
                      setProSuccessData({
                        userName: selectedProRequest.userName,
                        duration: duration,
                        amount: proFormData.amount
                      })
                      setSelectedProRequest(null)
                      setShowProSuccessDialog(true)
                      fetchProRequests()
                    } else {
                      const errorData = await response.json()
                      console.error('❌ Pro approval failed:', errorData)
                      setProErrorMessage(errorData.error || 'هەڵە لە پەسەندکردنی ئەندامێتی PRO')
                      setShowProErrorDialog(true)
                    }
                  } catch (error) {
                    console.error('Error approving PRO:', error)
                    setProErrorMessage('هەڵە لە پەیوەندی بە ئینتەرنێتەوە')
                    setShowProErrorDialog(true)
                  } finally {
                    setIsProcessingPro(false)
                  }
                }}
                disabled={isProcessingPro || !proFormData.amount || !proFormData.duration}
                className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg font-bold shadow-lg"
              >
                {isProcessingPro ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    پەسەندکردن...
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 mr-2" />
                    پەسەندکردن
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Duplicate Email Error Dialog */}
        <Dialog open={showDuplicateEmailDialog} onOpenChange={setShowDuplicateEmailDialog}>
          <DialogContent className="bg-gradient-to-br from-red-950 via-orange-900 to-red-950 border-4 border-red-500/50 shadow-2xl max-w-xl">
            <DialogHeader className="sr-only">
              <DialogTitle>ئیمەیڵی دووبارە</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8 space-y-6">
              {/* Animated Warning Icon */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" />
                <div className="absolute inset-4 bg-red-500/40 rounded-full animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-400">
                  <Mail className="w-16 h-16 text-white animate-bounce" />
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white">
                  ⚠️ هەڵە!
                </h2>
                <p className="text-2xl font-bold text-red-300">
                  ئەم ئیمەیڵە پێشتر بەکارهاتووە
                </p>
              </div>

              {/* Email Display */}
              <Card className="bg-white/10 border-2 border-red-500/30 backdrop-blur">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Email Info */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-red-300 mb-1">ئیمەیڵی دووبارە</p>
                        <p className="text-lg font-black text-white break-all">{duplicateEmail}</p>
                      </div>
                    </div>

                    {/* Warning Message */}
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm text-orange-300 text-center leading-relaxed">
                        🚨 هەر ئیمەیڵێک تەنها جارێک دەتوانرێت بەکاربهێنرێت.<br/>
                        تکایە ئیمەیڵێکی دیکە هەڵبژێرە بۆ دروستکردنی ئەکاونتێکی نوێ.
                      </p>
                    </div>

                    {/* Suggestions */}
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">💡</span>
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-sm text-blue-300 font-bold mb-2">پێشنیار:</p>
                          <ul className="text-xs text-blue-200 space-y-1">
                            <li>• ژمارەیەک زیاد بکە لە کۆتایی ئیمەیڵەکە</li>
                            <li>• پیتێکی دیکە بەکاربهێنە</li>
                            <li>• دۆمەینێکی دیکە هەڵبژێرە (@gmail, @yahoo, @outlook)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Close Button */}
              <Button
                onClick={() => {
                  setShowDuplicateEmailDialog(false)
                  setDuplicateEmail('')
                }}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg font-bold shadow-lg"
              >
                <X className="w-5 h-5 mr-2" />
                تێگەیشتم، با ئیمەیڵێکی دیکە بەکاربهێنم
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pro Approval Error Dialog */}
        <Dialog open={showProErrorDialog} onOpenChange={setShowProErrorDialog}>
          <DialogContent className="bg-gradient-to-br from-red-950 via-rose-900 to-red-950 border-4 border-red-500/50 shadow-2xl max-w-xl">
            <DialogHeader className="sr-only">
              <DialogTitle>هەڵە لە پەسەندکردن</DialogTitle>
            </DialogHeader>
            <div className="text-center py-8 space-y-6">
              {/* Animated Error Icon */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping" />
                <div className="absolute inset-4 bg-red-500/40 rounded-full animate-pulse" />
                <div className="relative w-32 h-32 bg-gradient-to-br from-red-600 to-rose-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-400">
                  <X className="w-20 h-20 text-white animate-bounce" />
                </div>
              </div>

              {/* Error Title */}
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white">
                  ❌ هەڵە!
                </h2>
                <p className="text-2xl font-bold text-red-300">
                  هەڵە لە پەسەندکردنی PRO
                </p>
              </div>

              {/* Error Message Card */}
              <Card className="bg-white/10 border-2 border-red-500/30 backdrop-blur">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Error Details */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm text-red-300 mb-1">وردەکاری هەڵە</p>
                        <p className="text-base font-bold text-white leading-relaxed">{proErrorMessage}</p>
                      </div>
                    </div>

                    {/* Warning Message */}
                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm text-orange-300 text-center leading-relaxed">
                        🚨 تکایە دڵنیابەوە لە:<br/>
                        • پەیوەندی بە ئینتەرنێت هەیە<br/>
                        • هەموو زانیاریەکان ڕاستن<br/>
                        • پارە و ماوە بە دروستی نووسراون
                      </p>
                    </div>

                    {/* Suggestion */}
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">💡</span>
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-sm text-blue-300 font-bold mb-2">پێشنیار:</p>
                          <ul className="text-xs text-blue-200 space-y-1">
                            <li>• دووبارە هەوڵبدەرەوە</li>
                            <li>• پەیوەندی ئینتەرنێت بپشکنە</li>
                            <li>• ئەگەر کێشەکە مایەوە، پەیوەندی بە تیمی تەکنیکی بکە</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Close Button */}
              <Button
                onClick={() => {
                  setShowProErrorDialog(false)
                  setProErrorMessage('')
                }}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-lg font-bold shadow-lg"
              >
                <X className="w-5 h-5 mr-2" />
                تێگەیشتم، دەگەڕێمەوە
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pro Approval Success Dialog */}
        <Dialog open={showProSuccessDialog} onOpenChange={setShowProSuccessDialog}>
          <DialogContent className="bg-gradient-to-br from-purple-950 via-pink-900 to-purple-950 border-4 border-purple-500/50 shadow-2xl max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sr-only">
              <DialogTitle>پەسەندکردنی PRO سەرکەوتوو بوو</DialogTitle>
            </DialogHeader>
            <div className="text-center py-4 space-y-4">
              {/* Animated Success Icon */}
              <div className="relative mx-auto w-28 h-28">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-30" />
                <div className="absolute inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-40" />
                <div className="relative w-28 h-28 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-400 animate-bounce">
                  <Crown className="w-14 h-14 text-yellow-300" />
                </div>
                {/* Sparkles */}
                <div className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
                <div className="absolute -bottom-1 -left-1 text-2xl animate-bounce delay-100">⭐</div>
              </div>

              {/* Success Title */}
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 animate-pulse">
                  🎉 پیرۆزە! 🎉
                </h2>
                <p className="text-xl font-bold text-purple-200">
                  بەسەرکەوتوویی بوو بە PRO
                </p>
              </div>

              {/* Success Details Card */}
              {proSuccessData && (
                <Card className="bg-white/10 border-2 border-purple-500/30 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* User Info */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                        <div className="flex items-center gap-3 justify-center">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0 animate-pulse border-2 border-white/30">
                            <Crown className="w-7 h-7 text-white" />
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-purple-300 mb-1">بەکارهێنەر</p>
                            <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                              {proSuccessData.userName}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Duration */}
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-2">
                              <Activity className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-xs text-blue-300 mb-1">ماوە</p>
                            <p className="text-xl font-black text-white">{proSuccessData.duration}</p>
                            <p className="text-xs text-blue-200">مانگ</p>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30">
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-2">
                              <span className="text-lg font-bold text-white">💰</span>
                            </div>
                            <p className="text-xs text-green-300 mb-1">بڕی پارە</p>
                            <p className="text-xl font-black text-white">{parseInt(proSuccessData.amount).toLocaleString()}</p>
                            <p className="text-xs text-green-200">دینار</p>
                          </div>
                        </div>
                      </div>

                      {/* Success Message */}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-400/30">
                        <p className="text-center text-purple-200 text-sm leading-relaxed">
                          ✨ ئێستا دەتوانێت سوود لە PRO وەربگرێت بۆ {proSuccessData.duration} مانگ 💎
                        </p>
                      </div>

                      {/* Expense Note */}
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-xl">📊</span>
                          <p className="text-xs text-orange-300 text-center">
                            پارەکە تۆمارکرا لە بەشی خەرجی
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Close Button */}
              <Button
                onClick={() => {
                  setShowProSuccessDialog(false)
                  setProSuccessData(null)
                }}
                className="w-full h-12 bg-gradient-to-r from-purple-500 via-pink-600 to-purple-500 hover:from-purple-600 hover:via-pink-700 hover:to-purple-600 text-lg font-bold shadow-lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                زۆر باشە! 🎉
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarSleek>
    </AuthGuard>
  )
}
