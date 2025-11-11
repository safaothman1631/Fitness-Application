"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"
import Link from "next/link"

interface LoginErrorModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginErrorModal({ isOpen, onClose }: LoginErrorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="relative w-full max-w-md bg-slate-900 border-t border-slate-700 rounded-t-3xl shadow-2xl animate-slide-up">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Login Failed</h3>
                <p className="text-sm text-gray-400">Invalid credentials</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Message */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              The email or password you entered is incorrect. Please check your credentials and try again.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            >
              Try Again
            </Button>
            <Link href="/forgot-password" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Reset Password
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LoginInputErrorProps {
  message: string
}

export function LoginInputError({ message }: LoginInputErrorProps) {
  if (!message) return null
  
  return (
    <div className="flex items-center gap-2 text-red-400 text-xs px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}
