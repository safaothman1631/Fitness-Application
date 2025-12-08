import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

// POST - Toggle like on a post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, userId } = body

    if (!postId || !userId) {
      return NextResponse.json({ error: "Missing postId or userId" }, { status: 400 })
    }

    const postRef = adminDb.collection('community-posts').doc(postId)
    const postDoc = await postRef.get()

    if (!postDoc.exists) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const postData = postDoc.data()
    const likedBy = postData?.likedBy || []
    const hasLiked = likedBy.includes(userId)

    if (hasLiked) {
      // Unlike
      await postRef.update({
        likes: FieldValue.increment(-1),
        likedBy: FieldValue.arrayRemove(userId)
      })
      return NextResponse.json({ success: true, liked: false }, { status: 200 })
    } else {
      // Like
      await postRef.update({
        likes: FieldValue.increment(1),
        likedBy: FieldValue.arrayUnion(userId)
      })
      return NextResponse.json({ success: true, liked: true }, { status: 200 })
    }
  } catch (error: any) {
    console.error("Error toggling like:", error)
    return NextResponse.json({ error: "Failed to toggle like", details: error.message }, { status: 500 })
  }
}
