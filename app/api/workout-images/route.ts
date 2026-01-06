import { NextRequest, NextResponse } from 'next/server'
import { adminStorage } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
  try {
    console.log('💪 Fetching workout images from Firebase Storage...')
    
    const bucket = adminStorage.bucket()
    const folderPath = 'workouts/images/'
    
    // Set timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    )

    const [files] = await Promise.race([
      bucket.getFiles({ prefix: folderPath }),
      timeoutPromise
    ]) as any

    console.log(`📦 Found ${files.length} files in ${folderPath}`)

    // Filter only image files
    const imageFiles = files.filter((file: any) => {
      const name = file.name.toLowerCase()
      return (
        name !== folderPath && // Exclude the folder itself
        (name.endsWith('.jpg') || 
         name.endsWith('.jpeg') || 
         name.endsWith('.png') || 
         name.endsWith('.webp') ||
         name.endsWith('.gif'))
      )
    })

    console.log(`🖼️ Found ${imageFiles.length} image files`)

    // Limit to first 100 images for performance
    const limitedFiles = imageFiles.slice(0, 100)

    // Generate signed URLs for each image
    const imagesWithUrls = await Promise.all(
      limitedFiles.map(async (file: any) => {
        try {
          const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
          })

          const [metadata] = await file.getMetadata()
          const fileName = file.name.split('/').pop() || file.name
          const displayName = fileName.replace(/\.[^/.]+$/, '') // Remove extension

          return {
            name: fileName,
            displayName: displayName,
            url: url,
            size: parseInt(metadata.size) || 0,
            contentType: metadata.contentType || 'image/jpeg',
            createdAt: metadata.timeCreated,
            updatedAt: metadata.updated
          }
        } catch (error) {
          console.error(`❌ Error processing image ${file.name}:`, error)
          return null
        }
      })
    )

    // Filter out failed images
    const validImages = imagesWithUrls.filter(img => img !== null)

    console.log(`✅ Successfully processed ${validImages.length} images`)

    return NextResponse.json(validImages)
  } catch (error: any) {
    console.error('❌ Error fetching workout images:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch workout images', 
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
    const filePath = `workouts/images/${fileName}`
    const file = bucket.file(filePath)

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ''), 'base64')

    // Upload the file
    await file.save(buffer, {
      metadata: {
        contentType: contentType || 'image/jpeg',
      },
      public: false,
    })

    // Generate signed URL with 1 year expiration
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
    })

    console.log(`✅ Uploaded workout image: ${fileName}`)

    return NextResponse.json({
      success: true,
      fileName,
      url,
      path: filePath
    })
  } catch (error: any) {
    console.error('❌ Error uploading workout image:', error)
    return NextResponse.json(
      { error: 'Failed to upload workout image', details: error.message },
      { status: 500 }
    )
  }
}
