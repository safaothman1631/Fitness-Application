/**
 * Validation Schemas for API Endpoints
 * Using Zod for type-safe request validation
 */

import { z } from 'zod'

// ===== USER SCHEMAS =====

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(['user', 'trainer', 'physiotherapist', 'admin', 'superadmin', 'owner']).optional(),
  membership: z.enum(['Free', 'Pro']).optional(),
  subscriptionStatus: z.enum(['active', 'inactive', 'cancelled']).optional(),
  subscriptionEnd: z.string().datetime().optional().nullable(),
})

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  role: z.enum(['user', 'trainer', 'physiotherapist', 'admin', 'superadmin', 'owner']).optional(),
  membership: z.enum(['Free', 'Pro']).optional(),
  subscriptionStatus: z.enum(['active', 'inactive', 'cancelled']).optional(),
  subscriptionEnd: z.string().datetime().optional().nullable(),
  isActive: z.boolean().optional(),
})

// ===== SETTINGS SCHEMAS =====

export const SettingsPreferencesSchema = z.object({
  patientMessages: z.boolean(),
  appointmentReminders: z.boolean(),
  progressAlerts: z.boolean(),
  emailNotifications: z.boolean(),
})

export const UpdateSettingsSchema = z.object({
  physiotherapistId: z.string().min(1, 'Physiotherapist ID is required'),
  preferences: SettingsPreferencesSchema,
})

// ===== LOG SCHEMAS =====

export const CreateLogSchema = z.object({
  type: z.enum(['info', 'success', 'warning', 'error']),
  message: z.string().min(1, 'Message is required'),
  user: z.string().optional(),
  details: z.string().optional(),
  action: z.string().optional(),
})

// ===== PHYSIOTHERAPIST SCHEMAS =====

export const CreatePhysiotherapistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  specialization: z.string().optional(),
  bio: z.string().optional(),
  experience: z.number().int().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
})

// ===== PATIENT SCHEMAS =====

export const CreatePatientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  age: z.number().int().min(0).max(150).optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  condition: z.string().optional(),
  physiotherapistId: z.string().min(1, 'Physiotherapist ID is required'),
})

// ===== WORKOUT SCHEMAS =====

export const CreateWorkoutSchema = z.object({
  name: z.string().min(2, 'Workout name must be at least 2 characters'),
  description: z.string().optional(),
  duration: z.number().int().min(1).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  category: z.string().optional(),
  exercises: z.array(z.object({
    name: z.string(),
    sets: z.number().int().min(1).optional(),
    reps: z.number().int().min(1).optional(),
    duration: z.number().int().min(1).optional(),
  })).optional(),
})

// ===== APPOINTMENT SCHEMAS =====

export const CreateAppointmentSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().min(1, 'Patient name is required'),
  physiotherapistId: z.string().min(1, 'Physiotherapist ID is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.number().int().min(15).max(240).optional(),
  type: z.enum(['initial', 'followup', 'checkup', 'in-person', 'online']).optional(),
  reason: z.string().min(1, 'Reason is required'),
  location: z.string().optional(),
  notes: z.string().optional(),
  fee: z.number().min(0).optional(),
})

// ===== VALIDATION HELPER FUNCTIONS =====

/**
 * Validate request body against a schema
 * Returns parsed data or throws validation error
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      throw new Error(`Validation failed: ${messages.join(', ')}`)
    }
    throw error
  }
}

/**
 * Validate request body safely
 * Returns success/error object instead of throwing
 */
export function validateRequestSafe<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const parsed = schema.parse(data)
    return { success: true, data: parsed }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      return { success: false, errors }
    }
    return { success: false, errors: ['Unknown validation error'] }
  }
}

/**
 * Sanitize string input (remove potentially dangerous characters)
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj }
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]) as any
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key])
    }
  }
  
  return sanitized
}

// Export types
export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
export type UpdateSettingsInput = z.infer<typeof UpdateSettingsSchema>
export type CreateLogInput = z.infer<typeof CreateLogSchema>
export type CreatePhysiotherapistInput = z.infer<typeof CreatePhysiotherapistSchema>
export type CreatePatientInput = z.infer<typeof CreatePatientSchema>
export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>
export type CreateAppointmentInput = z.infer<typeof CreateAppointmentSchema>
