import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const physiotherapistId = searchParams.get("physiotherapistId")
		const patientId = searchParams.get("patientId")

		if (!physiotherapistId) {
			return NextResponse.json({ error: "Physiotherapist ID is required" }, { status: 400 })
		}

		let query = adminDb.collection("progress").where("physiotherapistId", "==", physiotherapistId)

		if (patientId) {
			query = query.where("patientId", "==", patientId)
		}

		const snapshot = await query.get()

		const progressRecords = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		// Sort by date on server side (no index needed)
		progressRecords.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

		return NextResponse.json(progressRecords)
	} catch (error: any) {
		console.error("Error fetching progress:", error)
		return NextResponse.json({ error: "Failed to fetch progress records", details: error.message }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { physiotherapistId, patientId, patientName, date, mobility, strength, pain, notes } = body

		if (!physiotherapistId || !patientId || !date) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		const progressData = {
			physiotherapistId,
			patientId,
			patientName: patientName || "",
			date,
			mobility: mobility || 0,
			strength: strength || 0,
			pain: pain || 0,
			notes: notes || "",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}

		const docRef = await adminDb.collection("progress").add(progressData)

		return NextResponse.json({ id: docRef.id, ...progressData }, { status: 201 })
	} catch (error: any) {
		console.error("Error creating progress record:", error)
		return NextResponse.json({ error: "Failed to create progress record", details: error.message }, { status: 500 })
	}
}
