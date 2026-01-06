import { NextRequest, NextResponse } from "next/server"
import { adminDb, adminStorage } from "@/lib/firebase-admin"

// Cache for video paths - filename -> full path mapping
const videoPathCache = new Map<string, string>()

async function buildVideoCache() {
  console.log('📦 Building video cache from Firebase Storage...')
  const bucket = adminStorage.bucket()
  
  const [files] = await bucket.getFiles({ prefix: 'exercises/videos/' })
  
  files.forEach(file => {
    const fileName = file.name.split('/').pop()
    if (fileName && fileName.match(/\.(mp4|mov|avi|webm)$/i)) {
      if (!videoPathCache.has(fileName)) {
        videoPathCache.set(fileName, file.name)
      }
    }
  })
  
  console.log(`✅ Cached ${videoPathCache.size} unique video filenames`)
  return videoPathCache.size
}

async function getVideoUrl(videoName: string) {
  const bucket = adminStorage.bucket()
  const cleanName = videoName.split('/').pop()
  
  if (!cleanName) return null
  
  const cachedPath = videoPathCache.get(cleanName)
  
  if (cachedPath) {
    try {
      const file = bucket.file(cachedPath)
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      })
      return url
    } catch (err) {
      console.error(`Error getting URL for: ${cleanName}`, err)
      return null
    }
  }
  
  return null
}

export async function GET(request: NextRequest) {
  try {
    // Verify authorization - check for cron secret or admin access
    const authHeader = request.headers.get('authorization')
    const cronSecret = request.headers.get('x-vercel-cron-secret')
    
    // Allow Vercel cron or authorized requests
    if (cronSecret !== process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log('🚀 Starting automatic video URL refresh...')
    const startTime = Date.now()
    
    // Build video cache
    const cachedVideos = await buildVideoCache()
    
    // Get all programs
    const programsSnapshot = await adminDb.collection('programs').get()
    console.log(`📋 Found ${programsSnapshot.size} programs`)
    
    let totalPrograms = 0
    let totalVideosUpdated = 0
    let totalVideosFailed = 0
    
    for (const programDoc of programsSnapshot.docs) {
      const programId = programDoc.id
      const programData = programDoc.data()
      
      if (!programData.weeklySchedule) {
        continue
      }
      
      totalPrograms++
      let programUpdated = false
      const updatedSchedule = { ...programData.weeklySchedule }
      
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      
      for (const day of days) {
        const dayData = updatedSchedule[day]
        
        if (!dayData || !dayData.exercises || dayData.rest) {
          continue
        }
        
        for (let i = 0; i < dayData.exercises.length; i++) {
          const exercise = dayData.exercises[i]
          
          if (!exercise.videos || exercise.videos.length === 0) {
            continue
          }
          
          for (let j = 0; j < exercise.videos.length; j++) {
            const video = exercise.videos[j]
            
            if (!video.name) {
              continue
            }
            
            const newUrl = await getVideoUrl(video.name)
            
            if (newUrl) {
              updatedSchedule[day].exercises[i].videos[j].url = newUrl
              totalVideosUpdated++
              programUpdated = true
            } else {
              totalVideosFailed++
            }
          }
        }
      }
      
      if (programUpdated) {
        await adminDb.collection('programs').doc(programId).update({
          weeklySchedule: updatedSchedule,
          updatedAt: new Date().toISOString()
        })
      }
    }
    
    const duration = Math.round((Date.now() - startTime) / 1000)
    
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      duration: `${duration}s`,
      stats: {
        cachedVideos,
        programsProcessed: totalPrograms,
        videosUpdated: totalVideosUpdated,
        videosFailed: totalVideosFailed
      }
    }
    
    console.log('✅ Refresh complete:', result)
    
    return NextResponse.json(result)
    
  } catch (error: any) {
    console.error('❌ Error refreshing videos:', error)
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to refresh videos",
        details: error.message 
      },
      { status: 500 }
    )
  }
}
