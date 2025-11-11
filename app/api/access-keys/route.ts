import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"

// Get all access keys
export async function GET(request: NextRequest) {
  try {
    const keysRef = collection(db, "accessKeys")
    const snapshot = await getDocs(keysRef)
    const keys = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(keys)
  } catch (error) {
    console.error("Error fetching access keys:", error)
    return NextResponse.json({ error: "Failed to fetch access keys" }, { status: 500 })
  }
}

// Create new access key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, membership } = body

    if (!name || !membership) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate unique key
    const key = `KEY-${Date.now().toString().slice(-6).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const keysRef = collection(db, "accessKeys")
    const docRef = await addDoc(keysRef, {
      key,
      name,
      membership,
      createdAt: new Date().toISOString(),
      isActive: true,
    })

    return NextResponse.json({ id: docRef.id, key, name, membership }, { status: 201 })
  } catch (error) {
    console.error("Error creating access key:", error)
    return NextResponse.json({ error: "Failed to create access key" }, { status: 500 })
  }
}
