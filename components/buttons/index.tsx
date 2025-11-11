"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, MessageCircle, LineChart, Send } from "lucide-react"

// Primary action buttons
export const AddButton = ({ onClick, label = "Add", className = "" }) => (
  <Button className={`fitpro-button rounded-xl gap-2 ${className}`} onClick={onClick}>
    <Plus className="w-4 h-4" />
    {label}
  </Button>
)

// Icon buttons (Ghost variant)
export const IconButton = ({
  icon: Icon,
  onClick,
  variant = "ghost",
  colorClass = "text-gray-400",
  hoverClass = "hover:text-blue-400",
  size = "sm",
  tooltip = "",
}) => (
  <Button
    variant={variant}
    size={size}
    className={`${colorClass} ${hoverClass}`}
    onClick={onClick}
    title={tooltip}
  >
    <Icon className="w-4 h-4" />
  </Button>
)

// Delete button
export const DeleteButton = ({ onClick, size = "sm" }) => (
  <IconButton
    icon={Trash2}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-red-400"
    size={size}
    tooltip="Delete"
  />
)

// Edit button
export const EditButton = ({ onClick, size = "sm" }) => (
  <IconButton
    icon={Edit2}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-blue-400"
    size={size}
    tooltip="Edit"
  />
)

// Message button
export const MessageButton = ({ onClick, size = "sm" }) => (
  <IconButton
    icon={MessageCircle}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-cyan-400"
    size={size}
    tooltip="Messages"
  />
)

// Progress button
export const ProgressButton = ({ onClick, size = "sm" }) => (
  <IconButton
    icon={LineChart}
    onClick={onClick}
    colorClass="text-gray-400"
    hoverClass="hover:text-yellow-400"
    size={size}
    tooltip="Add Progress"
  />
)

// Send button
export const SendButton = ({ onClick, label = "Send", className = "" }) => (
  <Button className={`fitpro-button ${className}`} onClick={onClick}>
    {label}
  </Button>
)

// Reply button
export const ReplyButton = ({ onClick, className = "" }) => (
  <Button
    variant="ghost"
    size="sm"
    className={`text-cyan-400 hover:text-cyan-300 ${className}`}
    onClick={onClick}
  >
    <MessageCircle className="w-4 h-4 mr-2" />
    Reply
  </Button>
)

// Cancel button
export const CancelButton = ({ onClick, className = "", disabled = false }) => (
  <Button variant="outline" onClick={onClick} disabled={disabled} className={`border-slate-600 ${className}`}>
    Cancel
  </Button>
)

// Save button
export const SaveButton = ({ onClick, label = "Save", className = "", disabled = false }) => (
  <Button className={`fitpro-button ${className}`} onClick={onClick} disabled={disabled}>
    {label}
  </Button>
)

// Start button with icon
export const StartButton = ({ onClick, icon: Icon, label = "Start", className = "" }: { onClick?: () => void; icon?: any; label?: string; className?: string }) => (
  <Button className={`fitpro-button gap-2 ${className}`} onClick={onClick}>
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </Button>
)

// Edit profile button
export const EditProfileButton = ({ onClick, label = "Edit", className = "" }) => (
  <Button onClick={onClick} className={`gap-2 ${className}`}>
    {label}
  </Button>
)
