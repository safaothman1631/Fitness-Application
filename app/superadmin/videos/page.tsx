"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/useLanguage"
import { Button } from "@/components/ui/button"
import { Video, RefreshCw, Download } from "lucide-react"

interface VideoData {
  name: string
  displayName: string
  url: string
  size: number
  contentType: string
  createdAt: string
  updatedAt: string
}

export default function VideosTestPage() {
  const { t } = useLanguage()
  const [videos, setVideos] = useState<VideoData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('🔄 Fetching videos from API...')
      const response = await fetch('/api/videos')
      console.log('📡 Response status:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Videos received:', data.length)
        setVideos(data)
      } else {
        try {
          const errorData = await response.json()
          console.error('❌ API Error:', errorData)
          setError(`${errorData.error || 'Failed to fetch videos'}\n\nDetails: ${errorData.details || 'Unknown'}\n\nCode: ${errorData.errorCode || 'N/A'}`)
        } catch (parseError) {
          console.error('❌ Failed to parse error response:', parseError)
          setError(`HTTP Error ${response.status}: ${response.statusText}`)
        }
      }
    } catch (error: any) {
      console.error('❌ Error fetching videos:', error)
      setError(`Error connecting to server: ${error.message || error}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Video className="w-10 h-10 text-blue-400" />
              {t("firebaseVideos")}
            </h1>
            <p className="text-gray-400">{t("checkFirebaseVideos")}</p>
          </div>
          <Button 
            onClick={fetchVideos} 
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {t("refreshVideos")}
          </Button>
        </div>

        {isLoading ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">{t("loadingAnalytics")}</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="bg-red-900/20 border-red-500/50">
            <CardContent className="p-8">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-red-400 font-bold mb-2 text-xl">{t("error")}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 text-left">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap break-words">{error}</pre>
              </div>
              <div className="mt-4 text-center">
                <Button onClick={fetchVideos} className="bg-blue-500 hover:bg-blue-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("refreshVideos")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : videos.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Video className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <p className="text-xl font-bold text-white mb-2">{t("noVideosFound")}</p>
              <p className="text-gray-400">{t("uploadVideosFirst")}</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">{videos.length}</p>
                    <p className="text-blue-400">{t("totalWorkouts")}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">
                      {formatFileSize(videos.reduce((sum, v) => sum + v.size, 0))}
                    </p>
                    <p className="text-green-400">{t("fileSize")}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">
                      {new Set(videos.map(v => v.contentType)).size}
                    </p>
                    <p className="text-purple-400">جۆری فایل</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4">
              {videos.map((video, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-lg truncate">{video.displayName}</p>
                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="text-gray-400">
                            📦 {formatFileSize(video.size)}
                          </span>
                          <span className="text-gray-400">
                            🎬 {video.contentType}
                          </span>
                          <span className="text-gray-400">
                            📅 {new Date(video.createdAt).toLocaleDateString('ku')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 truncate">{video.name}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          onClick={() => window.open(video.url, '_blank')}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          {t("view")}
                        </Button>
                        <Button
                          onClick={() => {
                            const a = document.createElement('a')
                            a.href = video.url
                            a.download = video.displayName || 'video.mp4'
                            a.click()
                          }}
                          variant="outline"
                          className="border-slate-600"
                        >
                          <Download className="w-4 h-4" aria-label={t("download")} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
