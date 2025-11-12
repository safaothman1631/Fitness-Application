"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, MessageCircle, LineChart, Send } from "lucide-react"

// Primary action buttons with professional animations
export const AddButton = ({ onClick, label = "Add", className = "" }) => (
  <Button 
    className={`fitpro-button rounded-xl gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95 ${className}`} 
    onClick={onClick}
  >
    <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
    {label}
  </Button>
)

// Icon buttons (Ghost variant) with animations
export const IconButton = ({
  icon: Icon,
  onClick,
  variant = "ghost" as const,
  colorClass = "text-gray-400",
  hoverClass = "hover:text-blue-400",
  size = "sm" as const,
  tooltip = "",
}: {
  icon: any;
  onClick?: () => void;
  variant?: "ghost" | "link" | "default" | "destructive" | "outline" | "secondary" | null;
  colorClass?: string;
  hoverClass?: string;
  size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" | null;
  tooltip?: string;
}) => (
  <Button
    variant={variant}
    size={size}
    className={`${colorClass} ${hoverClass} transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-90 active:rotate-0`}
    onClick={onClick}
    title={tooltip}
  >
    <Icon className="w-4 h-4 transition-all duration-300" />
  </Button>
)

// Delete button with shake animation
export const DeleteButton = ({ onClick, size = "sm" as const }: { onClick?: () => void; size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" }) => (
  <IconButton
    icon={Trash2}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-red-400 hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]"
    size={size}
    tooltip="Delete"
  />
)

// Edit button with glow
export const EditButton = ({ onClick, size = "sm" as const }: { onClick?: () => void; size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" }) => (
  <IconButton
    icon={Edit2}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]"
    size={size}
    tooltip="Edit"
  />
)

// Message button with pulse
export const MessageButton = ({ onClick, size = "sm" as const }: { onClick?: () => void; size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" }) => (
  <IconButton
    icon={MessageCircle}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] hover:animate-pulse"
    size={size}
    tooltip="Messages"
  />
)

// Progress button with bounce
export const ProgressButton = ({ onClick, size = "sm" as const }: { onClick?: () => void; size?: "icon" | "sm" | "default" | "lg" | "icon-sm" | "icon-lg" }) => (
  <IconButton
    icon={LineChart}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] hover:animate-bounce"
    size={size}
    tooltip="Add Progress"
  />
)

// Send button with slide animation
export const SendButton = ({ onClick, label = "Send", className = "" }) => (
  <Button 
    className={`fitpro-button transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95 ${className}`} 
    onClick={onClick}
  >
    {label}
  </Button>
)

// Reply button with smooth transition
export const ReplyButton = ({ onClick, className = "" }) => (
  <Button
    variant="ghost"
    size="sm"
    className={`text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] active:scale-95 ${className}`}
    onClick={onClick}
  >
    <MessageCircle className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
    Reply
  </Button>
)

// Cancel button with hover effect
export const CancelButton = ({ onClick, className = "", disabled = false }) => (
  <Button 
    variant="outline" 
    onClick={onClick} 
    disabled={disabled} 
    className={`border-slate-600 transition-all duration-300 hover:scale-105 hover:border-slate-500 hover:shadow-[0_0_15px_rgba(100,116,139,0.3)] active:scale-95 ${className}`}
  >
    Cancel
  </Button>
)

// Save button with glow animation
export const SaveButton = ({ onClick, label = "Save", className = "", disabled = false }) => (
  <Button 
    className={`fitpro-button transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] active:scale-95 ${className}`} 
    onClick={onClick} 
    disabled={disabled}
  >
    {label}
  </Button>
)

// Start button with icon and professional animation
export const StartButton = ({ onClick, icon: Icon, label = "Start", className = "" }: { onClick?: () => void; icon?: any; label?: string; className?: string }) => (
  <Button 
    className={`fitpro-button gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] active:scale-95 group ${className}`} 
    onClick={onClick}
  >
    {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />}
    {label}
  </Button>
)

// Edit profile button with smooth animation
export const EditProfileButton = ({ onClick, label = "Edit", className = "" }) => (
  <Button 
    onClick={onClick} 
    className={`gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95 ${className}`}
  >
    {label}
  </Button>
)
