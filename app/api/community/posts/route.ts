import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

// GET - Fetch all community posts
export async function GET(request: NextRequest) {
  try {
    const postsSnapshot = await adminDb
      .collection('community-posts')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()

    const posts = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
    }))

    return NextResponse.json({ posts }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts", details: error.message }, { status: 500 })
  }
}

// POST - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userName, content } = body

    if (!userId || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newPost = {
      userId,
      userName: userName || "User",
      content,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
      likedBy: [],
    }

    const docRef = await adminDb.collection('community-posts').add(newPost)

    return NextResponse.json({ 
      success: true, 
      postId: docRef.id,
      post: { id: docRef.id, ...newPost }
    }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post", details: error.message }, { status: 500 })
  }
}
