import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// GET - Fetch activity logs with advanced filtering
export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams
		const limit = parseInt(searchParams.get("limit") || "100")
		const period = searchParams.get("period") || "all" // today, week, month, all
		const type = searchParams.get("type")
		const performedBy = searchParams.get("performedBy")
		const category = searchParams.get("category")

		let query = adminDb.collection("activity-logs").orderBy("timestamp", "desc") as any

		// Filter by period
		const now = new Date()
		if (period === "today") {
			const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			query = query.where("timestamp", ">=", startOfDay)
		} else if (period === "week") {
			const startOfWeek = new Date(now)
			startOfWeek.setDate(now.getDate() - 7)
			query = query.where("timestamp", ">=", startOfWeek)
		} else if (period === "month") {
			const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
			query = query.where("timestamp", ">=", startOfMonth)
		}

		// Filter by type
		if (type) {
			query = query.where("type", "==", type)
		}

		// Filter by performer
		if (performedBy) {
			query = query.where("performedBy", "==", performedBy)
		}

		// Filter by category
		if (category) {
			query = query.where("category", "==", category)
		}

		const snapshot = await query.limit(limit).get()

		const logs = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
			timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || doc.data().timestamp,
			createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
		}))

		return NextResponse.json({ logs, count: logs.length })
	} catch (error: any) {
		console.error("Error fetching activity logs:", error)
		return NextResponse.json(
			{ error: "Failed to fetch activity logs", details: error.message },
			{ status: 500 }
		)
	}
}

// POST - Create activity log
export async function POST(request: NextRequest) {
	try {
		const body = await request.json()

		const {
			type,
			performedBy,
			performedByName,
			performedByRole,
			targetUserId,
			targetUserName,
			targetUserEmail,
			description,
			metadata,
			amount,
			currency,
			category,
		} = body

		if (!type || !performedBy || !description) {
			return NextResponse.json(
				{ error: "Missing required fields: type, performedBy, description" },
				{ status: 400 }
			)
		}

		const now = new Date()
		const logData = {
			type,
			performedBy,
			performedByName: performedByName || "Unknown",
			performedByRole: performedByRole || "user",
			targetUserId: targetUserId || null,
			targetUserName: targetUserName || null,
			targetUserEmail: targetUserEmail || null,
			description,
			metadata: metadata || {},
			amount: amount || null,
			currency: currency || null,
			category: category || null,
			timestamp: now,
			createdAt: now,
			year: now.getFullYear(),
			month: now.getMonth() + 1,
			day: now.getDate(),
			week: getWeekNumber(now),
			dayOfWeek: now.getDay(),
		}

		const docRef = await adminDb.collection("activity-logs").add(logData)

		return NextResponse.json({ 
			id: docRef.id, 
			...logData,
			timestamp: logData.timestamp.toISOString(),
			createdAt: logData.createdAt.toISOString()
		}, { status: 201 })
	} catch (error: any) {
		console.error("Error creating activity log:", error)
		return NextResponse.json(
			{ error: "Failed to create activity log", details: error.message },
			{ status: 500 }
		)
	}
}
