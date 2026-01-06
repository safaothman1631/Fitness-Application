import { NextRequest, NextResponse } from 'next/server'
import { adminStorage, adminDb } from '@/lib/firebase-admin'

// GET - List all videos from Firebase Storage or get a specific video by name
export async function GET(request: NextRequest) {
  console.log("=" .repeat(50))
  console.log("🔍 API ROUTE CALLED: /api/videos")
  console.log("=" .repeat(50))
  
  try {
    // Check if requesting a specific video by name
    const searchParams = request.nextUrl.searchParams
    const videoName = searchParams.get('name')
    
    // Get the default bucket
    const bucket = adminStorage.bucket()
    console.log("📦 Bucket name:", bucket.name)
    
    // If specific video requested, return just that one
    if (videoName) {
      console.log("🔍 Looking for specific video:", videoName)
      
      // Try different paths
      const paths = [
        `exercises/videos/${videoName}`,
        `exercises/${videoName}`,
        videoName
      ]
      
      for (const path of paths) {
        try {
          const file = bucket.file(path)
          const [exists] = await file.exists()
          
          if (exists) {
            console.log("✅ Found video at:", path)
            const [metadata] = await file.getMetadata()
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days instead of 7
            })
            
            return NextResponse.json({
              videos: [{
                name: file.name.split('/').pop(),
                displayName: file.name.split('/').pop()?.replace(/\.[^/.]+$/, ''),
                url: url,
                size: parseInt(metadata.size || '0'),
                contentType: metadata.contentType,
                createdAt: metadata.timeCreated,
                updatedAt: metadata.updated
              }]
            })
          }
        } catch (err) {
          console.warn(`⚠️ Not found at ${path}`)
        }
      }
      
      console.error("❌ Video not found:", videoName)
      return NextResponse.json({ error: 'Video not found', videos: [] }, { status: 404 })
    }
    
    console.log("🔍 Fetching all videos from Firebase Storage")
    
    // Get all files from exercises/videos folder with timeout
    console.log("🔍 Looking in: exercises/videos/")
    
    const files: any[] = []
    try {
      const [videoFiles] = await Promise.race([
        bucket.getFiles({ prefix: 'exercises/videos/' }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 10s')), 10000))
      ]) as any
      
      console.log("📊 Found", videoFiles.length, "files in exercises/videos folder")
      files.push(...videoFiles)
    } catch (timeoutError: any) {
      console.warn("⚠️ Timeout or error getting files from exercises/videos/:", timeoutError.message)
    }
    
    // Also try just 'exercises/' if no files found
    if (files.length === 0) {
      console.log("🔍 No files in exercises/videos/, trying exercises/")
      try {
        const [exercisesFiles] = await Promise.race([
          bucket.getFiles({ prefix: 'exercises/' }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 10s')), 10000))
        ]) as any
        
        console.log("📊 Found", exercisesFiles.length, "files in exercises/ folder")
        files.push(...exercisesFiles)
      } catch (timeoutError: any) {
        console.warn("⚠️ Timeout or error getting files from exercises/:", timeoutError.message)
      }
    }

    // Filter video files
    const videoFiles = files.filter(file => {
      const name = file.name.toLowerCase()
      return (name.endsWith('.mp4') || 
              name.endsWith('.mov') || 
              name.endsWith('.avi') || 
              name.endsWith('.webm') ||
              name.endsWith('.mkv')) &&
             !name.includes('/.') // Exclude hidden files
    })

    console.log("🎬 Total video files found:", videoFiles.length)
    if (videoFiles.length > 0) {
      console.log("📹 Sample file names:", videoFiles.slice(0, 3).map(f => f.name))
    }

    // Get page and limit from query params (searchParams already defined at top)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    console.log(`📄 Page: ${page}, Limit: ${limit}`)
    console.log(`📊 Returning videos ${startIndex + 1} to ${Math.min(endIndex, videoFiles.length)}`)

    // Get metadata for requested page
    const pageVideos = videoFiles.slice(startIndex, endIndex)
    console.log(`🎥 Processing ${pageVideos.length} videos for current page`)
    
    // Get all exercises from Firestore to match categories
    const exercisesSnapshot = await adminDb.collection('exercises').get()
    const exerciseCategories = new Map()
    exercisesSnapshot.forEach(doc => {
      const data = doc.data()
      if (data.videoUrl && data.videoUrl.high) {
        const videoName = data.videoUrl.high.split('/').pop()
        exerciseCategories.set(videoName, data.category || 'uncategorized')
      }
    })
    console.log(`📋 Loaded ${exerciseCategories.size} exercise categories from Firestore`)
    
    const videos = await Promise.all(
      pageVideos.map(async (file, index) => {
        try {
          console.log(`🔄 Processing video ${index + 1}/${pageVideos.length}: ${file.name}`)
          
          // Generate signed URL for the video (valid for 30 days)
          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
          })

          const [metadata] = await file.getMetadata()

          // Get category from Firestore by matching video filename
          const videoFileName = file.name.split('/').pop()
          const category = exerciseCategories.get(videoFileName) || 'uncategorized'

          const videoData = {
            name: file.name,
            displayName: file.name.split('/').pop(), // Just the filename
            url: url,
            size: metadata.size,
            contentType: metadata.contentType,
            createdAt: metadata.timeCreated,
            updatedAt: metadata.updated,
            category: category, // Add category from folder name
          }
          
          console.log(`✅ Successfully processed: ${videoData.displayName}`)
          return videoData
        } catch (error: any) {
          console.error("❌ Error processing file:", file.name)
          console.error("   Error details:", error.message)
          return null
        }
      })
    )

    const validVideos = videos.filter(v => v !== null)

    console.log("=" .repeat(50))
    console.log("✅ Successfully processed", validVideos.length, "videos")
    console.log("❌ Failed to process", videos.length - validVideos.length, "videos")
    console.log("📊 Page", page, "of", Math.ceil(videoFiles.length / limit))
    console.log("=" .repeat(50))
    
    return NextResponse.json({
      videos: validVideos,
      pagination: {
        page,
        limit,
        total: videoFiles.length,
        totalPages: Math.ceil(videoFiles.length / limit),
        hasMore: endIndex < videoFiles.length
      }
    })
  } catch (error: any) {
    console.error("❌ Error fetching videos:", error)
    console.error("❌ Error message:", error?.message)
    console.error("❌ Error stack:", error?.stack)
    return NextResponse.json({ 
      error: "Failed to fetch videos", 
      details: error?.message || String(error),
      errorCode: error?.code,
      message: "Make sure Firebase Storage is properly configured and the bucket exists"
    }, { status: 500 })
  }
}

// POST - Upload a new video (optional - for future use)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bucket = adminStorage.bucket('final-database-51935.firebasestorage.app')
    const fileName = `exercises/videos/${Date.now()}-${file.name}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    
    const fileRef = bucket.file(fileName)
    
    await fileRef.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    })

    // Generate signed URL with 1 year expiration
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
    })

    console.log("✅ Video uploaded successfully:", fileName)
    
    return NextResponse.json({ 
      success: true, 
      fileName,
      url,
      message: "Video uploaded successfully"
    })
  } catch (error) {
    console.error("❌ Error uploading video:", error)
    return NextResponse.json({ 
      error: "Failed to upload video", 
      details: String(error) 
    }, { status: 500 })
  }
}
