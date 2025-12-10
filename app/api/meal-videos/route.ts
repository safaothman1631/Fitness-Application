import { NextRequest, NextResponse } from 'next/server'
import { adminStorage } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    console.log('🎬 Fetching meal videos from Firebase Storage...')
    
    const bucket = adminStorage.bucket()
    const folderPath = 'meals/videos/'
    
    // Set timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    )

    const [files] = await Promise.race([
      bucket.getFiles({ prefix: folderPath }),
      timeoutPromise
    ]) as any

    console.log(`📦 Found ${files.length} files in ${folderPath}`)

    // Filter only video files
    const videoFiles = files.filter((file: any) => {
      const name = file.name.toLowerCase()
      return (
        name !== folderPath && // Exclude the folder itself
        (name.endsWith('.mp4') || 
         name.endsWith('.webm') || 
         name.endsWith('.mov') || 
         name.endsWith('.avi'))
      )
    })

    console.log(`🎬 Found ${videoFiles.length} video files`)

    // Limit to first 50 videos for performance
    const limitedFiles = videoFiles.slice(0, 50)

    // Generate signed URLs for each video
    const videosWithUrls = await Promise.all(
      limitedFiles.map(async (file: any) => {
        try {
          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
          })

          const [metadata] = await file.getMetadata()
          const fileName = file.name.split('/').pop() || file.name
          const displayName = fileName.replace(/\.[^/.]+$/, '') // Remove extension

          return {
            name: fileName,
            displayName: displayName,
            url: url,
            size: parseInt(metadata.size) || 0,
            contentType: metadata.contentType || 'video/mp4',
            createdAt: metadata.timeCreated,
            updatedAt: metadata.updated
          }
        } catch (error) {
          console.error(`❌ Error processing video ${file.name}:`, error)
          return null
        }
      })
    )

    // Filter out failed videos
    const validVideos = videosWithUrls.filter(vid => vid !== null)

    console.log(`✅ Successfully processed ${validVideos.length} videos`)

    return NextResponse.json(validVideos)
  } catch (error: any) {
    console.error('❌ Error fetching meal videos:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch meal videos', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fileName, base64Data, contentType } = body

    if (!fileName || !base64Data) {
      return NextResponse.json(
        { error: 'fileName and base64Data are required' },
        { status: 400 }
      )
    }

    const bucket = adminStorage.bucket()
    const filePath = `meals/videos/${fileName}`
    const file = bucket.file(filePath)

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data.replace(/^data:video\/\w+;base64,/, ''), 'base64')

    // Upload the file
    await file.save(buffer, {
      metadata: {
        contentType: contentType || 'video/mp4',
      },
      public: false,
    })

    // Generate signed URL
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    console.log(`✅ Uploaded meal video: ${fileName}`)

    return NextResponse.json({
      success: true,
      fileName,
      url,
      path: filePath
    })
  } catch (error: any) {
    console.error('❌ Error uploading meal video:', error)
    return NextResponse.json(
      { error: 'Failed to upload meal video', details: error.message },
      { status: 500 }
    )
  }
}
