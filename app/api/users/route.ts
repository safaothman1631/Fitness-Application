import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"

export const dynamic = 'force-dynamic'

// Get all users or filter by role
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    const usersRef = collection(db, "users")
    let q = usersRef

    if (role) {
      q = query(usersRef, where("role", "==", role))
      const snapshot = await getDocs(q)
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      return NextResponse.json(users)
    }

    const snapshot = await getDocs(usersRef)
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, role, membership } = body

    if (!email || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const usersRef = collection(db, "users")
    const docRef = await addDoc(usersRef, {
      email,
      name,
      phone,
      role,
      membership: membership || "Basic",
      isActive: true,
      joinDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
