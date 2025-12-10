import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export const dynamic = 'force-dynamic'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params
		const body = await request.json()

		const updateData = {
			...body,
			updatedAt: new Date().toISOString(),
		}

		await adminDb.collection("appointments").doc(id).update(updateData)

		const updatedDoc = await adminDb.collection("appointments").doc(id).get()

		return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() })
	} catch (error: any) {
		console.error("Error updating appointment:", error)
		return NextResponse.json({ error: "Failed to update appointment", details: error.message }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params
		await adminDb.collection("appointments").doc(id).delete()

		return NextResponse.json({ message: "Appointment deleted successfully" })
	} catch (error: any) {
		console.error("Error deleting appointment:", error)
		return NextResponse.json({ error: "Failed to delete appointment", details: error.message }, { status: 500 })
	}
}
