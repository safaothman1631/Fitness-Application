import { NextRequest, NextResponse } from 'next/server'
import { adminStorage } from '@/lib/firebase-admin'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!userId) {
      return NextResponse.json({ error: "No user ID provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, and WebP are allowed" }, { status: 400 })
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 2MB limit" }, { status: 400 })
    }

    const bucket = adminStorage.bucket('final-database-51935.firebasestorage.app')
    const fileName = `profile-images/${userId}-${Date.now()}.${file.name.split('.').pop()}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const fileRef = bucket.file(fileName)

    await fileRef.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    })

    // Make file publicly accessible
    await fileRef.makePublic()

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`

    console.log("✅ Profile image uploaded:", fileName)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName
    }, { status: 200 })
  } catch (error: any) {
    console.error("❌ Error uploading profile image:", error)
    return NextResponse.json({
      error: "Failed to upload profile image",
      details: error.message
    }, { status: 500 })
  }
}

// DELETE - Remove profile image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get('fileName')

    if (!fileName) {
      return NextResponse.json({ error: "No file name provided" }, { status: 400 })
    }

    const bucket = adminStorage.bucket('final-database-51935.firebasestorage.app')
    await bucket.file(fileName).delete()

    console.log("✅ Profile image deleted:", fileName)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error("❌ Error deleting profile image:", error)
    return NextResponse.json({
      error: "Failed to delete profile image",
      details: error.message
    }, { status: 500 })
  }
}
