import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"
import { requireAuth } from '@/lib/api-auth'
import { CreateAppointmentSchema, validateRequestSafe, sanitizeObject } from '@/lib/validation'
import { readRateLimit, writeRateLimit, checkRateLimit, getUserIdentifier, formatRateLimitError } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)
    await checkRateLimit(getUserIdentifier(request, user.uid), readRateLimit)
    
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
		if (error?.code === 'RATE_LIMIT_EXCEEDED') {
			return NextResponse.json(formatRateLimitError(error), { status: 429 })
		}
		if (error === 'UNAUTHORIZED') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		if (error === 'FORBIDDEN') {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}
		console.error("Error fetching appointments:", error)
		return NextResponse.json({ error: "Failed to fetch appointments", details: error.message }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		const user = await requireAuth(request)
		await checkRateLimit(getUserIdentifier(request, user.uid), writeRateLimit)
		
		const rawBody = await request.json()
		const validation = validateRequestSafe(CreateAppointmentSchema, rawBody)
		
		if (!validation.success) {
			return NextResponse.json({ 
				error: 'Validation failed', 
				details: validation.errors 
			}, { status: 400 })
		}
		
		const body = sanitizeObject(validation.data)
		
		const appointmentFee = body.fee || 50
		const platformCommission = Math.round(appointmentFee * 0.15) // 15% commission

		const appointmentData = {
			...body,
			patientId: body.patientId || "",
			duration: body.duration || 60,
			type: body.type || "in-person",
			status: "scheduled",
			location: body.location || "",
			notes: body.notes || "",
			fee: appointmentFee,
			platformCommission,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		}

		const docRef = await adminDb.collection("appointments").add(appointmentData)

		return NextResponse.json({ id: docRef.id, ...appointmentData }, { status: 201 })
	} catch (error: any) {
		if (error?.code === 'RATE_LIMIT_EXCEEDED') {
			return NextResponse.json(formatRateLimitError(error), { status: 429 })
		}
		if (error === 'UNAUTHORIZED') {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
		if (error === 'FORBIDDEN') {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}
		console.error("Error creating appointment:", error)
		return NextResponse.json({ error: "Failed to create appointment", details: error.message }, { status: 500 })
	}
}
