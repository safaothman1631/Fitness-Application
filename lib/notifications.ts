import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export type NotificationType = "info" | "success" | "warning" | "error"
export type NotificationCategory = "request" | "appointment" | "progress" | "system" | "doctor"

interface CreateNotificationParams {
  userId: string
  title: string
  message: string
  type?: NotificationType
  category?: NotificationCategory
  metadata?: Record<string, any>
}

/**
 * Create a notification for a specific user
 */
export async function createNotification({
  userId,
  title,
  message,
  type = "info",
  category = "system",
  metadata = {}
}: CreateNotificationParams) {
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      title,
      message,
      type,
      category,
      metadata,
      read: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    console.log(`✅ Notification created for user ${userId}`)
  } catch (error) {
    console.error("❌ Error creating notification:", error)
    throw error
  }
}

/**
 * Create notification when a patient sends request to a physiotherapist
 */
export async function notifyPhysioNewRequest(
  physioId: string,
  patientName: string,
  patientEmail: string
) {
  return createNotification({
    userId: physioId,
    title: "ریکوێستی نەخۆشی نوێ",
    message: `${patientName} (${patientEmail}) ریکوێستی ناردووە بۆ تۆ`,
    type: "info",
    category: "request",
    metadata: {
      patientEmail,
      patientName
    }
  })
}

/**
 * Create notification when appointment is scheduled
 */
export async function notifyPhysioAppointment(
  physioId: string,
  patientName: string,
  appointmentDate: Date
) {
  return createNotification({
    userId: physioId,
    title: "چاوپێکەوتنی نوێ",
    message: `چاوپێکەوتنێکی نوێ لەگەڵ ${patientName} دانراوە بۆ ${appointmentDate.toLocaleDateString()}`,
    type: "success",
    category: "appointment",
    metadata: {
      patientName,
      appointmentDate: appointmentDate.toISOString()
    }
  })
}

/**
 * Create notification when patient progress is updated
 */
export async function notifyPhysioProgress(
  physioId: string,
  patientName: string,
  progressNote: string
) {
  return createNotification({
    userId: physioId,
    title: "نوێکردنەوەی پرۆگرێس",
    message: `پرۆگرێسی ${patientName} نوێکرایەوە: ${progressNote}`,
    type: "info",
    category: "progress",
    metadata: {
      patientName,
      progressNote
    }
  })
}

/**
 * Create notification for admin-physiotherapist when new doctor is approved
 */
export async function notifyAdminDoctorApproved(
  adminId: string,
  doctorName: string,
  doctorEmail: string
) {
  return createNotification({
    userId: adminId,
    title: "دکتۆرێکی نوێ چالاک کرا",
    message: `${doctorName} (${doctorEmail}) بەسەرکەوتوویی approve کرا`,
    type: "success",
    category: "doctor",
    metadata: {
      doctorName,
      doctorEmail
    }
  })
}

/**
 * Create notification for admin-physiotherapist when new doctor requests
 */
export async function notifyAdminNewDoctorRequest(
  adminId: string,
  doctorName: string,
  doctorEmail: string
) {
  return createNotification({
    userId: adminId,
    title: "ریکوێستی دکتۆری نوێ",
    message: `${doctorName} (${doctorEmail}) ریکوێستی کردووە بۆ بوون بە دکتۆر`,
    type: "info",
    category: "doctor",
    metadata: {
      doctorName,
      doctorEmail
    }
  })
}

/**
 * Create system notification for user
 */
export async function notifySystemUpdate(
  userId: string,
  title: string,
  message: string
) {
  return createNotification({
    userId,
    title,
    message,
    type: "info",
    category: "system"
  })
}
