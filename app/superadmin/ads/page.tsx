"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/hooks/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MousePointerClick, 
  TrendingUp, 
  Image as ImageIcon,
  ExternalLink,
  Calendar,
  Users,
  BarChart3,
  Sparkles,
  Target,
  Layout
} from "lucide-react"

interface Ad {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
  targetAudience: 'all' | 'pro' | 'free'
  position: 'top' | 'bottom' | 'sidebar'
  startDate: string
  endDate: string | null
  status: 'active' | 'inactive'
  clicks: number
  views: number
  createdAt: string
  updatedAt: string
}

export default function AdsManagementPage() {
  const { t, language } = useLanguage()
  const isRTL = language === 'ar' || language === 'ku'

  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    targetAudience: 'all' as 'all' | 'pro' | 'free',
    position: 'top' as 'top' | 'bottom' | 'sidebar',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'active' as 'active' | 'inactive'
  })

  useEffect(() => {
    fetchAds()
  }, [filterStatus])

  const fetchAds = async () => {
    try {
      setLoading(true)
      const statusParam = filterStatus !== 'all' ? `?status=${filterStatus}` : ''
      const response = await fetch(`/api/ads${statusParam}`)
      if (response.ok) {
        const data = await response.json()
        setAds(data)
      }
    } catch (error) {
      console.error('Error fetching ads:', error)
      toast.error('Failed to fetch ads')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      targetAudience: 'all',
      position: 'top',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'active'
    })
    setEditingAd(null)
  }

  const handleSubmit = async () => {
    try {
      if (!formData.title || !formData.imageUrl) {
        toast.error('Title and image are required')
        return
      }

      const url = editingAd ? '/api/ads' : '/api/ads'
      const method = editingAd ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAd ? { id: editingAd.id, ...formData } : formData)
      })

      if (response.ok) {
        toast.success(t(editingAd ? 'adUpdatedSuccessfully' : 'adCreatedSuccessfully'))
        setIsDialogOpen(false)
        resetForm()
        fetchAds()
      }
    } catch (error) {
      console.error('Error saving ad:', error)
      toast.error('Failed to save ad')
    }
  }

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad)
    setFormData({
      title: ad.title,
      description: ad.description,
      imageUrl: ad.imageUrl,
      link: ad.link,
      targetAudience: ad.targetAudience,
      position: ad.position,
      startDate: ad.startDate.split('T')[0],
      endDate: ad.endDate ? ad.endDate.split('T')[0] : '',
      status: ad.status
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ad?')) return

    try {
      const response = await fetch(`/api/ads?id=${id}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success(t('adDeletedSuccessfully'))
        fetchAds()
      }
    } catch (error) {
      console.error('Error deleting ad:', error)
      toast.error('Failed to delete ad')
    }
  }

  const filteredAds = ads

  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0)
  const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0)
  const activeAdsCount = ads.filter(ad => ad.status === 'active').length

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with gradient and animation */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">{t('adsManagement')}</h1>
            </div>
            <p className="text-white/80 text-lg">
              {isRTL ? 'بەڕێوەبردن و دروستکردنی ڕێکلامەکان بۆ یوزەرەکان' : 'Create and manage ads for your users'}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-blue-600/20 to-blue-600/5 backdrop-blur-sm overflow-hidden relative group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">{t('activeAds')}</p>
              <p className="text-3xl font-bold text-white">{activeAdsCount}</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-600/20 to-purple-600/5 backdrop-blur-sm overflow-hidden relative group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">{t('adViews')}</p>
              <p className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-600/20 to-pink-600/5 backdrop-blur-sm overflow-hidden relative group hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MousePointerClick className="w-6 h-6 text-pink-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">{t('adClicks')}</p>
              <p className="text-3xl font-bold text-white">{totalClicks.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Create Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-full sm:w-64 bg-slate-900 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRTL ? 'هەموو' : 'All Ads'}</SelectItem>
              <SelectItem value="active">{t('activeAds')}</SelectItem>
              <SelectItem value="inactive">{t('inactiveAds')}</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                <Plus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('createNewAd')}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {editingAd ? t('editAd') : t('createNewAd')}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label className="text-gray-300">{t('adTitle')} *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder={isRTL ? 'ناونیشانی ڕێکلام' : 'Enter ad title'}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label className="text-gray-300">{t('adDescription')}</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white min-h-24"
                    placeholder={isRTL ? 'وەسفی ڕێکلام' : 'Enter ad description'}
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    {t('imageUrl')} *
                  </Label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-slate-700">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                    </div>
                  )}
                </div>

                {/* Link */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    {t('adLink')}
                  </Label>
                  <Input
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                    placeholder="https://example.com"
                  />
                </div>

                {/* Row: Target Audience & Position */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t('adTargetAudience')}
                    </Label>
                    <Select value={formData.targetAudience} onValueChange={(value: any) => setFormData({ ...formData, targetAudience: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('allUsers')}</SelectItem>
                        <SelectItem value="pro">{t('proUsers')}</SelectItem>
                        <SelectItem value="free">{t('freeUsers')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <Layout className="w-4 h-4" />
                      {t('adPosition')}
                    </Label>
                    <Select value={formData.position} onValueChange={(value: any) => setFormData({ ...formData, position: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">{t('topBanner')}</SelectItem>
                        <SelectItem value="bottom">{t('bottomBanner')}</SelectItem>
                        <SelectItem value="sidebar">{t('sidebar')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row: Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t('adStartDate')}
                    </Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {t('adEndDate')}
                    </Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-gray-300">{t('adStatus')}</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t('active')}</SelectItem>
                      <SelectItem value="inactive">{t('rest')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {editingAd ? t('editAd') : t('createNewAd')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Ads List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredAds.length === 0 ? (
          <Card className="border-0 bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('noAdsFound')}</h3>
              <p className="text-gray-400">{isRTL ? 'کلیک لە دوگمەی سەرەوە بکە بۆ دروستکردنی یەکەم ڕێکلام' : 'Click the button above to create your first ad'}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAds.map((ad) => (
              <Card 
                key={ad.id} 
                className="border-0 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-sm overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-purple-500/20"
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={ad.imageUrl} 
                      alt={ad.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ad.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                      }`}>
                        {ad.status === 'active' ? t('active') : t('rest')}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="absolute bottom-4 right-4 flex gap-3">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-white">{ad.views}</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                        <MousePointerClick className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-white">{ad.clicks}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{ad.title}</h3>
                    {ad.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ad.description}</p>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs">
                        {ad.targetAudience === 'all' ? t('allUsers') : ad.targetAudience === 'pro' ? t('proUsers') : t('freeUsers')}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                        {ad.position === 'top' ? t('topBanner') : ad.position === 'bottom' ? t('bottomBanner') : t('sidebar')}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(ad)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {t('editAd')}
                      </Button>
                      <Button
                        onClick={() => handleDelete(ad.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
