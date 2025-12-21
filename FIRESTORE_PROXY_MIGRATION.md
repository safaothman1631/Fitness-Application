/**
 * Migration Guide: Firebase SDK to Proxy
 * 
 * This guide shows how to convert Firebase Firestore SDK calls to use the proxy.
 * The proxy bypasses regional ISP blocks by routing through Vercel Edge.
 */

// ===== BEFORE (Firebase SDK - BLOCKED) =====
import { doc, getDoc, collection, getDocs, updateDoc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Get single document
const userDoc = await getDoc(doc(db, "users", userId))
if (userDoc.exists()) {
  const data = userDoc.data()
}

// Get collection
const snapshot = await getDocs(collection(db, "users"))
const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

// Update document
await updateDoc(doc(db, "users", userId), { name: "New Name" })

// Set document
await setDoc(doc(db, "users", userId), { name: "Name", email: "email@test.com" })

// Delete document
await deleteDoc(doc(db, "users", userId))


// ===== AFTER (Firestore Proxy - WORKS) =====
import { firestoreProxy } from "@/lib/firestore-proxy"

// Get single document
const userData = await firestoreProxy.getDoc("users", userId)
if (userData) {
  // data is already parsed
}

// Get collection
const users = await firestoreProxy.getCollection("users")
// Returns: [{ id: "123", name: "...", email: "..." }, ...]

// Update document
await firestoreProxy.updateDoc("users", userId, { name: "New Name" })

// Set document
await firestoreProxy.setDoc("users", userId, { name: "Name", email: "email@test.com" })

// Delete document (NOT IMPLEMENTED YET - ADD IF NEEDED)
// await firestoreProxy.deleteDoc("users", userId)


// ===== FOR SERVER-SIDE (API Routes) =====
// Keep using Firebase Admin SDK - it works on Vercel servers
import { adminDb } from "@/lib/firebase-admin"

const userDoc = await adminDb.collection("users").doc(userId).get()
const snapshot = await adminDb.collection("users").get()
await adminDb.collection("users").doc(userId).update({ name: "New Name" })
await adminDb.collection("users").doc(userId).set({ name: "Name" })
await adminDb.collection("users").doc(userId).delete()
