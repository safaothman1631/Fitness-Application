"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import DeleteDialog from "@/components/delete-dialog"
import {
  AddButton,
  DeleteButton,
  EditButton,
  CancelButton,
  SaveButton,
} from "@/components/buttons"
import { Users, UserCog, Key, Settings, BarChart3, Search, Shield, Zap, X, Dumbbell, Apple, Calendar, CheckCircle2 } from "lucide-react"
import { getMealSubmissions, getWorkoutSubmissions } from "@/lib/submissions"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "physiotherapist" | "admin"
  membership: "Basic" | "Premium" | "Pro"
  joinDate: string
  isActive: boolean
}

interface AccessKey {
  id: string
  key: string
  name: string
  membership: "Basic" | "Premium" | "Pro"
  createdAt: string
  usedBy?: string
  isActive: boolean
}

export default function SuperAdminPage() {
  const [mealSubs, setMealSubs] = useState<any[]>([])
  const [workoutSubs, setWorkoutSubs] = useState<any[]>([])
  useEffect(() => {
    setMealSubs(getMealSubmissions().slice(-10).reverse())
    setWorkoutSubs(getWorkoutSubmissions().slice(-10).reverse())
  }, [])
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      membership: "Premium",
      joinDate: "2024-01-15",
      isActive: true,
    },
    {
      id: "2",
      name: "Dr. Sarah",
      email: "sarah@example.com",
      role: "physiotherapist",
      membership: "Pro",
      joinDate: "2024-01-10",
      isActive: true,
    },
  ])

  const [accessKeys, setAccessKeys] = useState<AccessKey[]>([
    { id: "1", key: "KEY-2024-001", name: "Premium Key", membership: "Premium", createdAt: "2024-01-20", isActive: true },
    { id: "2", key: "KEY-2024-002", name: "Pro Key", membership: "Pro", createdAt: "2024-01-21", usedBy: "john@example.com", isActive: true },
  ])

  const [searchUser, setSearchUser] = useState("")
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyMembership, setNewKeyMembership] = useState<"Basic" | "Premium" | "Pro">("Premium")

  // User Modal State
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", role: "user" as "user" | "physiotherapist" | "admin", membership: "Basic" as "Basic" | "Premium" | "Pro" })

  // Key Modal State
  const [keyModalOpen, setKeyModalOpen] = useState(false)

  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteType, setDeleteType] = useState<"user" | "key" | null>(null)
  const [itemToDelete, setItemToDelete] = useState<User | AccessKey | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase()))

  // User Functions
  const handleAddUser = () => {
    setEditingUserId(null)
    setFormData({ name: "", email: "", role: "user", membership: "Basic" })
    setUserModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id)
    setFormData({ name: user.name, email: user.email, role: user.role, membership: user.membership })
    setUserModalOpen(true)
  }

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill all fields")
      return
    }

    if (editingUserId) {
      setUsers(users.map((u) => (u.id === editingUserId ? { ...u, ...formData } : u)))
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        isActive: true,
      }
      setUsers([...users, newUser])
    }
    setUserModalOpen(false)
  }

  const handleDeleteUserClick = (user: User) => {
    setItemToDelete(user)
    setDeleteType("user")
    setDeleteDialogOpen(true)
  }

  // Key Functions
  const handleGenerateKey = () => {
    if (!newKeyName) {
      alert("Please enter key name")
      return
    }

    const newKey: AccessKey = {
      id: Date.now().toString(),
      key: `KEY-${Date.now().toString().slice(-6).toUpperCase()}`,
      name: newKeyName,
      membership: newKeyMembership,
      createdAt: new Date().toISOString().split("T")[0],
      isActive: true,
    }
    setAccessKeys([...accessKeys, newKey])
    setNewKeyName("")
    setNewKeyMembership("Premium")
    setKeyModalOpen(false)
  }

  const handleDeleteKeyClick = (key: AccessKey) => {
    setItemToDelete(key)
    setDeleteType("key")
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (deleteType === "user") {
        setUsers(users.filter((u) => u.id !== (itemToDelete as User).id))
        toast.success("User deleted successfully")
      } else if (deleteType === "key") {
        setAccessKeys(accessKeys.filter((k) => k.id !== (itemToDelete as AccessKey).id))
        toast.success("Access key deleted successfully")
      }
      setDeleteDialogOpen(false)
    } catch (error) {
      toast.error("Failed to delete item")
      console.error(error)
    } finally {
      setIsDeleting(false)
      setItemToDelete(null)
      setDeleteType(null)
    }
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <FitproLayout role="superadmin">
        <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Management</h1>
          <p className="text-gray-400">Manage users, access keys, and system settings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-white">{users.filter((u) => u.isActive).length}</p>
                </div>
                <Zap className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Access Keys</p>
                  <p className="text-3xl font-bold text-white">{accessKeys.length}</p>
                </div>
                <Key className="w-10 h-10 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">System Health</p>
                  <p className="text-3xl font-bold text-green-500">100%</p>
                </div>
                <BarChart3 className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card className="fitpro-card">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-white font-semibold">Recent User Submissions</h2>
              <span className="text-xs text-gray-400">Today & recent days</span>
            </div>
            {mealSubs.length === 0 && workoutSubs.length === 0 && (
              <p className="text-gray-400 text-sm">No submissions yet.</p>
            )}
            {[...workoutSubs.map(s => ({...s, _type: 'workout'})), ...mealSubs.map(s => ({...s, _type:'meals'}))]
              .sort((a,b)=>b.timestamp-a.timestamp)
              .slice(0,10)
              .map((s,idx)=> (
              <div key={idx} className="flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-slate-700/60 flex items-center justify-center">
                    {s._type==='workout' ? <Dumbbell className="w-4 h-4 text-blue-400"/> : <Apple className="w-4 h-4 text-green-400"/>}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium capitalize">{s.userName || 'User'} {s._type} submission</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1"><Calendar className="w-3 h-3"/> {s.date} • {s.tasks?.length || 0} items</p>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400"/>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="fitpro-card">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="border-b border-slate-700 bg-transparent p-0 rounded-none">
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-blue-500/10 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-400 data-[state=active]:text-blue-400"
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger
                value="keys"
                className="data-[state=active]:bg-blue-500/10 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-400 data-[state=active]:text-blue-400"
              >
                <Key className="w-4 h-4 mr-2" />
                Access Keys
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-blue-500/10 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-400 data-[state=active]:text-blue-400"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4 p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="fitpro-input pl-10 rounded-xl"
                  />
                </div>
                <AddButton onClick={handleAddUser} label="Add User" className="rounded-xl" />
              </div>

              <div className="space-y-3">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{user.name}</p>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mr-4">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-semibold capitalize">
                          {user.membership}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                       <EditButton onClick={() => handleEditUser(user)} />
                       <DeleteButton onClick={() => handleDeleteUserClick(user)} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-8">No users found</p>
                )}
              </div>
            </TabsContent>

            {/* Access Keys Tab */}
            <TabsContent value="keys" className="space-y-4 p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <Label className="text-gray-300 mb-2 block">Key Name</Label>
                  <Input value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="Enter key name" className="fitpro-input rounded-xl" />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Membership Type</Label>
                  <select
                    value={newKeyMembership}
                    onChange={(e) => setNewKeyMembership(e.target.value as "Basic" | "Premium" | "Pro")}
                    className="fitpro-input rounded-xl w-full py-2"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Pro">Pro</option>
                  </select>
                </div>

                <AddButton onClick={handleGenerateKey} label="Generate New Key" className="w-full rounded-xl" />
              </div>

              <div className="space-y-3">
                {accessKeys.map((key) => (
                  <div key={key.id} className="bg-slate-800/50 rounded-lg p-4 hover:bg-slate-800/70 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-semibold">{key.name}</p>
                        <p className="text-gray-400 text-sm font-mono">{key.key}</p>
                        {key.usedBy && <p className="text-gray-500 text-xs mt-1">Used by: {key.usedBy}</p>}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold">{key.membership}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${key.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {key.isActive ? "Active" : "Inactive"}
                        </span>

                        <DeleteButton onClick={() => handleDeleteKeyClick(key)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 p-6">
              <div className="space-y-4">
                <Card className="bg-slate-800/30 border-slate-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white font-semibold mb-2 block">Site Name</Label>
                        <Input defaultValue="FitPro" className="fitpro-input rounded-xl" />
                      </div>

                      <div>
                        <Label className="text-white font-semibold mb-2 block">Maintenance Mode</Label>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" className="w-5 h-5" />
                          <span className="text-gray-400">Enable maintenance mode</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-white font-semibold mb-2 block">Email Notifications</Label>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="w-5 h-5" />
                          <span className="text-gray-400">Send email notifications</span>
                        </div>
                      </div>

                      <Button className="w-full fitpro-button rounded-xl mt-4" onClick={() => alert("Settings saved successfully")}>Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* User Modal */}
        <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
          <DialogContent className="bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">{editingUserId ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription className="text-gray-400">Fill in the user details below</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Full Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="fitpro-input rounded-xl"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Email</Label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                  className="fitpro-input rounded-xl"
                  type="email"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Role</Label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "user" | "physiotherapist" | "admin" })}
                  className="fitpro-input rounded-xl w-full py-2"
                >
                  <option value="user">User</option>
                  <option value="physiotherapist">Physiotherapist</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Membership</Label>
                <select
                  value={formData.membership}
                  onChange={(e) => setFormData({ ...formData, membership: e.target.value as "Basic" | "Premium" | "Pro" })}
                  className="fitpro-input rounded-xl w-full py-2"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Pro">Pro</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <CancelButton onClick={() => setUserModalOpen(false)} />
              <SaveButton onClick={handleSaveUser} label={editingUserId ? "Update User" : "Add User"} />
            </DialogFooter>
          </DialogContent>
          </Dialog>

             <DeleteDialog
                 isOpen={deleteDialogOpen}
          title={deleteType === "user" ? "Delete User?" : "Delete Access Key?"}
          description={
            deleteType === "user"
              ? "Are you sure you want to delete this user? All user data will be removed permanently."
              : "Are you sure you want to delete this access key? It cannot be recovered."
          }
          itemName={itemToDelete ? (deleteType === "user" ? (itemToDelete as User).name : (itemToDelete as AccessKey).name) : ""}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setDeleteDialogOpen(false)
            setItemToDelete(null)
            setDeleteType(null)
          }}
          isLoading={isDeleting}
        />
        </div>
      </FitproLayout>
    </AuthGuard>
  )
}
