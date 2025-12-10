import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const physiotherapistId = searchParams.get("physiotherapistId")

		if (!physiotherapistId) {
			return NextResponse.json({ error: "Physiotherapist ID is required" }, { status: 400 })
		}

		const snapshot = await adminDb
			.collection("appointments")
			.where("physiotherapistId", "==", physiotherapistId)
			.get()

		const appointments = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		// Sort by date and time in JavaScript
		appointments.sort((a: any, b: any) => {
			if (a.date !== b.date) {
				return b.date.localeCompare(a.date)
			}
			return b.time.localeCompare(a.time)
		})

		return NextResponse.json(appointments)
	} catch (error: any) {
		console.error("Error fetching appointments:", error)
		return NextResponse.json({ error: "Failed to fetch appointments", details: error.message }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { 
			physiotherapistId,
			patientName, 
			patientId,
			date, 
			time, 
			duration, 
			type, 
			reason, 
			location, 
			notes, 
			fee 
		} = body

		if (!physiotherapistId || !patientName || !date || !time || !reason) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
		}

		const appointmentFee = fee || 50
		const platformCommission = Math.round(appointmentFee * 0.15) // 15% commission

		const appointmentData = {
			physiotherapistId,
			patientName,
			patientId: patientId || "",
			date,
			time,
			duration: duration || 60,
			type: type || "in-person",
			status: "scheduled",
			reason,
			location: location || "",
			notes: notes || "",
			fee: appointmentFee,
			platformCommission,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}

		const docRef = await adminDb.collection("appointments").add(appointmentData)

		return NextResponse.json({ id: docRef.id, ...appointmentData }, { status: 201 })
	} catch (error: any) {
		console.error("Error creating appointment:", error)
		return NextResponse.json({ error: "Failed to create appointment", details: error.message }, { status: 500 })
	}
}
