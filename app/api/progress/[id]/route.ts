import { NextRequest, NextResponse } from "next/server"
import { adminDb } from "@/lib/firebase-admin"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params
		const body = await request.json()

		const updateData = {
			...body,
			updatedAt: new Date().toISOString(),
		}

		await adminDb.collection("progress").doc(id).update(updateData)

		return NextResponse.json({ id, ...updateData })
	} catch (error: any) {
		console.error("Error updating progress:", error)
		return NextResponse.json({ error: "Failed to update progress record", details: error.message }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params
		await adminDb.collection("progress").doc(id).delete()

		return NextResponse.json({ message: "Progress record deleted successfully" })
	} catch (error: any) {
		console.error("Error deleting progress:", error)
		return NextResponse.json({ error: "Failed to delete progress record", details: error.message }, { status: 500 })
	}
}
