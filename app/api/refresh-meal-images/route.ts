import { NextRequest, NextResponse } from 'next/server'
import { adminStorage } from '@/lib/firebase-admin'

/**
 * Refresh expired signed URLs for meal images
 * This endpoint regenerates signed URLs for meal images stored in Firebase Storage
 * 
 * Accepts: { imageUrls: string[] } - array of image URLs (can be expired)
 * Returns: { refreshedUrls: string[] } - array of fresh signed URLs
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrls } = body

    if (!imageUrls || !Array.isArray(imageUrls)) {
      return NextResponse.json(
        { error: 'imageUrls array is required' },
        { status: 400 }
      )
    }

    console.log('🔄 Refreshing meal image URLs:', imageUrls.length)

    const bucket = adminStorage.bucket()
    const refreshedUrls: string[] = []

    for (const url of imageUrls) {
      try {
        // Extract file path from URL
        // URL format: https://storage.googleapis.com/BUCKET/meals/images/filename.jpg?...
        // OR signed URL: https://storage.googleapis.com/final-database-51935.firebasestorage.app/...
        let filePath = ''
        
        if (url.includes('/meals/images/')) {
          // Extract path after bucket name
          const pathMatch = url.match(/\/meals\/images\/[^?]+/)
          if (pathMatch) {
            filePath = pathMatch[0].substring(1) // Remove leading slash
          }
        } else if (url.includes('storage.googleapis.com')) {
          // Try to extract from different URL formats
          const urlParts = url.split('/')
          const mealsIndex = urlParts.indexOf('meals')
          if (mealsIndex !== -1 && mealsIndex + 1 < urlParts.length) {
            const remainingPath = urlParts.slice(mealsIndex).join('/')
            filePath = remainingPath.split('?')[0] // Remove query params
          }
        }

        if (!filePath) {
          console.warn('⚠️ Could not extract file path from URL:', url)
          refreshedUrls.push(url) // Keep original if extraction fails
          continue
        }

        console.log('📝 Extracted file path:', filePath)

        const file = bucket.file(filePath)
        
        // Check if file exists
        const [exists] = await file.exists()
        if (!exists) {
          console.warn('⚠️ File does not exist:', filePath)
          refreshedUrls.push(url) // Keep original if file doesn't exist
          continue
        }

        // Generate new signed URL with 1 year expiration
        const [newUrl] = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
        })

        refreshedUrls.push(newUrl)
        console.log('✅ Refreshed URL for:', filePath)
      } catch (error: any) {
        console.error('❌ Error refreshing URL:', url, error.message)
        refreshedUrls.push(url) // Keep original on error
      }
    }

    console.log('✅ Refreshed', refreshedUrls.length, 'URLs')

    return NextResponse.json({
      success: true,
      refreshedUrls
    })
  } catch (error: any) {
    console.error('❌ Error refreshing meal images:', error)
    return NextResponse.json(
      { error: 'Failed to refresh meal images', details: error.message },
      { status: 500 }
    )
  }
}
