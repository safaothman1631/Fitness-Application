import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Get activity logs
export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const limit = parseInt(searchParams.get("limit") || "50")
		const actorId = searchParams.get("actorId")
		const action = searchParams.get("action")

		let query = adminDb.collection("activity_logs").orderBy("timestamp", "desc")

		if (actorId) {
			query = query.where("actorId", "==", actorId) as any
		}

		if (action) {
			query = query.where("action", "==", action) as any
		}

		const snapshot = await query.limit(limit).get()

		const logs = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))

		return NextResponse.json(logs)
	} catch (error: any) {
		console.error("Error fetching activity logs:", error)
		return NextResponse.json(
			{ error: "Failed to fetch activity logs", details: error.message },
			{ status: 500 }
		)
	}
}

// Create activity log
export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const {
			action,
			actorId,
			actorName,
			actorRole,
			targetType,
			targetId,
			targetName,
			details,
			description,
		} = body

		if (!action || !actorId || !actorRole) {
			return NextResponse.json(
				{ error: "Missing required fields: action, actorId, actorRole" },
				{ status: 400 }
			)
		}

		const logData = {
			timestamp: new Date().toISOString(),
			action,
			actorId,
			actorName: actorName || "",
			actorRole,
			targetType: targetType || "",
			targetId: targetId || "",
			targetName: targetName || "",
			details: details || {},
			description: description || "",
		}

		const docRef = await adminDb.collection("activity_logs").add(logData)

		return NextResponse.json({ id: docRef.id, ...logData }, { status: 201 })
	} catch (error: any) {
		console.error("Error creating activity log:", error)
		return NextResponse.json(
			{ error: "Failed to create activity log", details: error.message },
			{ status: 500 }
		)
	}
}
