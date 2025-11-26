import { NextRequest, NextResponse } from 'next/server'
import { adminStorage } from '@/lib/firebase-admin'

// GET - List all videos from Firebase Storage
export async function GET(request: NextRequest) {
  console.log("=" .repeat(50))
  console.log("🔍 API ROUTE CALLED: /api/videos")
  console.log("=" .repeat(50))
  
  try {
    console.log("🔍 Fetching videos from Firebase Storage")

    // Get the default bucket
    const bucket = adminStorage.bucket()
    console.log("📦 Bucket name:", bucket.name)
    
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

    // Filter video files and get their metadata
    const videos = await Promise.all(
      files
        .filter(file => {
          const name = file.name.toLowerCase()
          return name.endsWith('.mp4') || 
                 name.endsWith('.mov') || 
                 name.endsWith('.avi') || 
                 name.endsWith('.webm') ||
                 name.endsWith('.mkv')
        })
        .slice(0, 50) // Limit to first 50 videos for performance
        .map(async (file) => {
          try {
            // Generate signed URL for the video (valid for 7 days)
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
            })

            const [metadata] = await file.getMetadata()

            return {
              name: file.name,
              displayName: file.name.split('/').pop(), // Just the filename
              url: url,
              size: metadata.size,
              contentType: metadata.contentType,
              createdAt: metadata.timeCreated,
              updatedAt: metadata.updated,
            }
          } catch (error) {
            console.error("Error processing file:", file.name, error)
            return null
          }
        })
    )

    const validVideos = videos.filter(v => v !== null)

    console.log("✅ Returning", validVideos.length, "videos")
    return NextResponse.json(validVideos)
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

    // Generate signed URL
    const [url] = await fileRef.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
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
