"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FitproLayout from "@/components/fitpro-layout"
import AuthGuard from "@/components/auth-guard"
import DeleteDialog from "@/components/delete-dialog"
import { Users, Dumbbell, BarChart3, Plus, Trash2, Edit2, Search, Award } from "lucide-react"
import { toast } from "sonner"

interface User {
  id: string
  name: string
  email: string
  membership: "Basic" | "Premium" | "Pro"
  joinDate: string
  isActive: boolean
}

interface Workout {
  id: string
  name: string
  category: string
  duration: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      membership: "Premium",
      joinDate: "2024-01-15",
      isActive: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      membership: "Pro",
      joinDate: "2024-01-10",
      isActive: true,
    },
  ])

  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: "1", name: "Full Body", category: "Strength", duration: "45 mins", difficulty: "Medium" },
    { id: "2", name: "Fat Burning", category: "Cardio", duration: "30 mins", difficulty: "Hard" },
    { id: "3", name: "Morning Stretch", category: "Yoga", duration: "20 mins", difficulty: "Easy" },
  ])

  const [searchUser, setSearchUser] = useState("")
  const [searchWorkout, setSearchWorkout] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteType, setDeleteType] = useState<"user" | "workout" | null>(null)
  const [itemToDelete, setItemToDelete] = useState<User | Workout | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchUser.toLowerCase()) || u.email.toLowerCase().includes(searchUser.toLowerCase()))

  const filteredWorkouts = workouts.filter((w) => w.name.toLowerCase().includes(searchWorkout.toLowerCase()) || w.category.toLowerCase().includes(searchWorkout.toLowerCase()))

  const handleDeleteUser = (user: User) => {
    setItemToDelete(user)
    setDeleteType("user")
    setDeleteDialogOpen(true)
  }

  const handleDeleteWorkout = (workout: Workout) => {
    setItemToDelete(workout)
    setDeleteType("workout")
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
      } else if (deleteType === "workout") {
        setWorkouts(workouts.filter((w) => w.id !== (itemToDelete as Workout).id))
        toast.success("Workout deleted successfully")
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
    <AuthGuard requiredRole="admin">
      <FitproLayout role="admin">
        <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users and workout programs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-white">{users.filter((u) => u.isActive).length}</p>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Workouts</p>
                  <p className="text-3xl font-bold text-white">{workouts.length}</p>
                </div>
                <Dumbbell className="w-10 h-10 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="fitpro-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-green-500">87%</p>
                </div>
                <BarChart3 className="w-10 h-10 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                value="workouts"
                className="data-[state=active]:bg-blue-500/10 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-400 data-[state=active]:text-blue-400"
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                Workouts
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-blue-500/10 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none text-gray-400 data-[state=active]:text-blue-400"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Reports
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
                <Button className="fitpro-button rounded-xl gap-2">
                  <Plus className="w-4 h-4" />
                  Add User
                </Button>
              </div>

              <div className="space-y-3">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors">
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
                        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold">{user.membership}</span>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">Active</span>
                      </div>

                      <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                      <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteUser(user)}>
                      <Trash2 className="w-4 h-4" />
                      </Button>
                      </div>
                      </div>
                      ))
                      ) : (
                      <p className="text-gray-400 text-center py-8">No users found</p>
                      )}
                      </div>
                      </TabsContent>

            {/* Workouts Tab */}
            <TabsContent value="workouts" className="space-y-4 p-6">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search workouts..."
                    value={searchWorkout}
                    onChange={(e) => setSearchWorkout(e.target.value)}
                    className="fitpro-input pl-10 rounded-xl"
                  />
                </div>
                <Button className="fitpro-button rounded-xl gap-2">
                  <Plus className="w-4 h-4" />
                  Add Workout
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWorkouts.length > 0 ? (
                  filteredWorkouts.map((workout) => (
                    <Card key={workout.id} className="fitpro-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-semibold text-lg">{workout.name}</h3>
                            <p className="text-gray-400 text-sm">{workout.category}</p>
                          </div>
                          <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400">
                          <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteWorkout(workout)}>
                          <Trash2 className="w-4 h-4" />
                          </Button>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">{workout.duration}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            workout.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : workout.difficulty === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}>
                            {workout.difficulty}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400 text-center col-span-2 py-8">No workouts found</p>
                )}
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-4 p-6">
              <Card className="bg-slate-800/30 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-2">Total Workouts Completed</p>
                      <p className="text-3xl font-bold text-blue-400">1,234</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-2">Total Exercise Sessions</p>
                      <p className="text-3xl font-bold text-cyan-400">5,678</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-2">Avg Session Duration</p>
                      <p className="text-3xl font-bold text-green-400">42 mins</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-2">User Retention Rate</p>
                      <p className="text-3xl font-bold text-yellow-400">92%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </Card>

             <DeleteDialog
                 isOpen={deleteDialogOpen}
          title={deleteType === "user" ? "Delete User?" : "Delete Workout?"}
          description={
            deleteType === "user"
              ? "Are you sure you want to delete this user? All user data will be removed permanently."
              : "Are you sure you want to delete this workout? It cannot be recovered."
          }
          itemName={itemToDelete ? (deleteType === "user" ? (itemToDelete as User).name : (itemToDelete as Workout).name) : ""}
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
