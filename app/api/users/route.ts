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

    if (role) {
      const q = query(usersRef, where("role", "==", role))
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
    console.log("📝 Creating user with data:", { ...body, password: body.password ? "***" : undefined })
    
    const { email, name, firstName, lastName, phone, role, membership, subscriptionStatus, subscriptionEndDate, password } = body

    if (!email || !name) {
      console.error("❌ Missing required fields:", { email: !!email, name: !!name })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("🔥 Attempting to connect to Firestore...")
    const usersRef = collection(db, "users")
    
    console.log("💾 Adding document to Firestore...")
    const docRef = await addDoc(usersRef, {
      email,
      name,
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || "",
      role: role || "user",
      membership: membership || "Free",
      subscriptionStatus: subscriptionStatus || "inactive",
      subscriptionEndDate: subscriptionEndDate || null,
      isActive: true,
      joinDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    })

    console.log("✅ User created successfully with ID:", docRef.id)

    // Return user data without password
    const userData = {
      id: docRef.id,
      email,
      name,
      firstName,
      lastName,
      phone,
      role: role || "user",
      membership: membership || "Free",
      subscriptionStatus: subscriptionStatus || "inactive",
      subscriptionEndDate,
      isActive: true,
      joinDate: new Date().toISOString(),
    }

    return NextResponse.json(userData, { status: 201 })
  } catch (error: any) {
    console.error("❌ Error creating user:", error)
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    return NextResponse.json({ 
      error: "Failed to create user",
      details: error.message 
    }, { status: 500 })
  }
}
