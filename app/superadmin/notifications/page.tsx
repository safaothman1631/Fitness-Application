"use client"

import { useState, useEffect } from "react"
import SidebarSleek from "@/components/layouts/sidebar-sleek"
import AuthGuard from "@/components/auth-guard"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Bell, Trash2, CheckCircle2, AlertCircle, Shield, Activity, Info, Send, Users, UserCheck, Plus, Pencil } from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  type: "alert" | "activity" | "security"
  title: string
  message: string
  timestamp: string
  isRead: boolean
}

export default function SuperAdminNotifications() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar' || language === 'ku'
  
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    targetAudience: 'all' as 'all' | 'user' | 'trainer' | 'physiotherapist' | 'admin',
    type: 'info' as 'info' | 'alert' | 'security' | 'activity',
    title: '',
    message: ''
  })

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/notifications')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications || [])
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendNotification = async () => {
    if (!formData.title || !formData.message) {
      toast.error(isRTL ? 'تکایە هەموو خانەکان پڕبکەرەوە' : 'Please fill all required fields')
      return
    }

    setSending(true)
    try {
      const response = await fetch('/api/admin/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        toast.success(isRTL ? `ئاگاداری نێردرا بۆ ${data.sentCount} یوزەر` : `Notification sent to ${data.sentCount} users`)
        setIsDialogOpen(false)
        setFormData({
          targetAudience: 'all',
          type: 'info',
          title: '',
          message: ''
        })
        fetchNotifications()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to send notification')
      }
    } catch (error) {
      console.error('Error sending notification:', error)
      toast.error(isRTL ? 'هەڵە لە ناردنی ئاگاداری' : 'Error sending notification')
    } finally {
      setSending(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notifications/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setNotifications(notifications.filter((n) => n.id !== id))
        toast.success(isRTL ? 'ئاگاداری سڕایەوە' : 'Notification deleted')
      } else {
        const error = await response.json()
        toast.error(error.error || (isRTL ? 'هەڵە لە سڕینەوە' : 'Failed to delete'))
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error(isRTL ? 'هەڵە ڕوویدا' : 'An error occurred')
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notifications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      })
      
      if (response.ok) {
        setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
        toast.success(isRTL ? 'وەک خوێنراو نیشانکرا' : 'Marked as read')
      } else {
        toast.error(isRTL ? 'هەڵە لە نیشانکردن' : 'Failed to mark as read')
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
      toast.error(isRTL ? 'هەڵە ڕوویدا' : 'An error occurred')
    }
  }

  const handleMarkAllRead = async () => {
    try {
      const response = await fetch('/api/admin/notifications/mark-all-read', {
        method: 'POST'
      })
      
      if (response.ok) {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
        toast.success(isRTL ? 'هەموو ئاگادارییەکان وەک خوێندراوە نیشانکران' : 'All marked as read')
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const handleEdit = (notif: Notification) => {
    setEditingId(notif.id)
    setFormData({
      targetAudience: (notif as any).targetAudience || 'all',
      type: notif.type === 'info' ? 'info' : notif.type,
      title: notif.title,
      message: notif.message
    })
    setIsDialogOpen(true)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="w-5 h-5 text-red-400" />
      case "activity":
        return <Activity className="w-5 h-5 text-blue-400" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <AuthGuard requiredRole="superadmin">
        <SidebarSleek role="superadmin">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="inline-block w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">{t("loading")}...</p>
            </div>
          </div>
        </SidebarSleek>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard requiredRole="superadmin">
      <SidebarSleek role="superadmin">
        <div className={`space-y-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Modern Header with Gradient */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Bell className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {isRTL ? 'ئاگادارییەکان' : 'Notifications'}
                    </h1>
                    <p className="text-white/80">
                      {isRTL ? 'ناردن و بەڕێوەبردنی ئاگادارییەکان بۆ یوزەرەکان' : 'Send and manage notifications for users'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) { setEditingId(null); setFormData({ targetAudience: 'all', type: 'info', title: '', message: '' }); } }}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white shadow-lg">
                        <Plus className="w-4 h-4 mr-2" />
                        {isRTL ? 'ئاگاداری نوێ' : 'New Notification'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-[95vw] md:max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                          {editingId ? (isRTL ? '✏️ دەستکاریکردنی ئاگاداری' : '✏️ Edit Notification') : (isRTL ? '🔔 ناردنی ئاگاداری نوێ' : '🔔 Send New Notification')}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 mt-4 px-1">
                        {/* Target Audience */}
                        <div className="space-y-2">
                          <Label className="text-gray-300 flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-purple-400" />
                            {isRTL ? 'ئامانج' : 'Target Audience'} <span className="text-red-400">*</span>
                          </Label>
                          <Select value={formData.targetAudience} onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-purple-400" />
                                  {isRTL ? 'هەموو یوزەرەکان' : 'All Users'}
                                </div>
                              </SelectItem>
                              <SelectItem value="user">
                                <div className="flex items-center gap-2">
                                  <UserCheck className="w-4 h-4 text-blue-400" />
                                  {isRTL ? 'تەنها یوزەرەکان' : 'Users Only'}
                                </div>
                              </SelectItem>
                              <SelectItem value="trainer">
                                <div className="flex items-center gap-2">
                                  <Activity className="w-4 h-4 text-green-400" />
                                  {isRTL ? 'تەنها ڕاهێنەرەکان' : 'Trainers Only'}
                                </div>
                              </SelectItem>
                              <SelectItem value="physiotherapist">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-cyan-400" />
                                  {isRTL ? 'تەنها فیزیۆتێرابیستەکان' : 'Physiotherapists Only'}
                                </div>
                              </SelectItem>
                              <SelectItem value="admin">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-yellow-400" />
                                  {isRTL ? 'تەنها ئەدمینەکان' : 'Admins Only'}
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Type */}
                        <div className="space-y-2">
                          <Label className="text-gray-300 text-sm flex items-center gap-2">
                            <Bell className="w-4 h-4 text-yellow-400" />
                            {isRTL ? 'جۆری ئاگاداری' : 'Notification Type'} <span className="text-red-400">*</span>
                          </Label>
                          <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-white h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="info">
                                <div className="flex items-center gap-2">
                                  <Info className="w-4 h-4 text-blue-400" />
                                  {isRTL ? '💡 زانیاری' : '💡 Info'}
                                </div>
                              </SelectItem>
                              <SelectItem value="alert">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                                  {isRTL ? '⚠️ ئاگاداری' : '⚠️ Alert'}
                                </div>
                              </SelectItem>
                              <SelectItem value="security">
                                <div className="flex items-center gap-2">
                                  <Shield className="w-4 h-4 text-red-400" />
                                  {isRTL ? '🔒 ئاسایش' : '🔒 Security'}
                                </div>
                              </SelectItem>
                              <SelectItem value="activity">
                                <div className="flex items-center gap-2">
                                  <Activity className="w-4 h-4 text-green-400" />
                                  {isRTL ? '📊 چالاکی' : '📊 Activity'}
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                          <Label className="text-gray-300 text-sm">
                            {isRTL ? 'ناونیشان' : 'Title'} <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="bg-slate-800 border-slate-700 text-white h-12"
                            placeholder={isRTL ? 'ناونیشانی ئاگاداری بنووسە...' : 'Enter notification title...'}
                          />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <Label className="text-gray-300 text-sm">
                            {isRTL ? 'نامە' : 'Message'} <span className="text-red-400">*</span>
                          </Label>
                          <Textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="bg-slate-800 border-slate-700 text-white min-h-32"
                            placeholder={isRTL ? 'نامەی ئاگاداری بنووسە...' : 'Enter notification message...'}
                          />
                        </div>
                      </div>

                      <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          className="w-full sm:w-auto border-slate-700 text-gray-300 hover:bg-slate-800"
                        >
                          {isRTL ? 'پاشگەزبوونەوە' : 'Cancel'}
                        </Button>
                        <Button
                          onClick={handleSendNotification}
                          disabled={sending}
                          className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 text-white shadow-lg"
                        >
                          {sending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              {isRTL ? 'دەنێردرێت...' : 'Sending...'}
                            </>
                          ) : (
                            <>
                              {editingId ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                              {editingId ? (isRTL ? 'نوێکردنەوە' : 'Update') : (isRTL ? 'ناردن' : 'Send Notification')}
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => fetchNotifications()}
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30 text-white"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    {isRTL ? 'نوێکردنەوە' : 'Refresh'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{notifications.length}</p>
                    <p className="text-xs text-gray-400">{t("total")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/20 rounded-full blur-2xl" />
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{notifications.filter((n) => !n.isRead).length}</p>
                    <p className="text-xs text-gray-400">{t("unreadNotifications")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/20 rounded-full blur-2xl" />
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{notifications.filter((n) => n.isRead).length}</p>
                    <p className="text-xs text-gray-400">{t("read")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl" />
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{notifications.filter((n) => n.type === 'security').length}</p>
                    <p className="text-xs text-gray-400">{t("securitySettings")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List - Modern & Mobile Optimized */}
          <Card className="relative overflow-hidden bg-slate-900/70 border-slate-800 backdrop-blur-sm shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
            <CardHeader className="border-b border-slate-800/50 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-yellow-400" />
                  </div>
                  {t("allNotifications")}
                </CardTitle>
                {notifications.filter((n) => !n.isRead).length > 0 && (
                  <Button
                    onClick={handleMarkAllRead}
                    size="sm"
                    className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-400"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {isRTL ? 'هەموویان وەک خوێنراو' : 'Mark All as Read'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              {notifications.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <Bell className="w-12 h-12 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-lg mb-2 font-medium">No notifications</p>
                  <p className="text-gray-500 text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => {
                    const typeColors = {
                      security: { bg: "from-red-500/10 to-red-600/10", border: "border-red-500/30", icon: "text-red-400", iconBg: "bg-red-500/20" },
                      activity: { bg: "from-blue-500/10 to-blue-600/10", border: "border-blue-500/30", icon: "text-blue-400", iconBg: "bg-blue-500/20" },
                      alert: { bg: "from-yellow-500/10 to-yellow-600/10", border: "border-yellow-500/30", icon: "text-yellow-400", iconBg: "bg-yellow-500/20" },
                    }
                    const colors = typeColors[notif.type] || typeColors.alert
                    
                    return (
                      <div
                        key={notif.id}
                        className={`relative rounded-2xl p-4 md:p-5 flex items-start gap-3 md:gap-4 border transition-all duration-300 ${
                          notif.isRead 
                            ? "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50" 
                            : `bg-gradient-to-r ${colors.bg} ${colors.border} shadow-lg hover:shadow-xl`
                        }`}
                      >
                        {!notif.isRead && (
                          <div className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        )}
                        
                        <div className={`w-12 h-12 rounded-2xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                          {getIcon(notif.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-white text-sm md:text-base">{notif.title}</h3>
                            {!notif.isRead && (
                              <span className="px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold whitespace-nowrap">
                                {t("new")}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm mb-2 leading-relaxed">{notif.message}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span>{notif.timestamp}</span>
                            <span className={`px-2 py-0.5 rounded-full ${colors.iconBg} ${colors.icon}`}>
                              {notif.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-shrink-0">
                          {!notif.isRead && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-9 w-9 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/10"
                              onClick={() => handleMarkAsRead(notif.id)}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-9 w-9 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => handleEdit(notif)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-9 w-9 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                            onClick={() => handleDelete(notif.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarSleek>
    </AuthGuard>  )
}
