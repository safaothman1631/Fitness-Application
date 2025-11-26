"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import DeleteDialog from "@/components/delete-dialog"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function DeleteExample() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      // Simulate API call to delete
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Replace with your actual delete API call:
      // const response = await fetch("/api/delete", { method: "DELETE" })
      
      toast.success("Item deleted successfully!")
      setIsDeleteDialogOpen(false)
    } catch (error) {
      toast.error("Failed to delete item")
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDeleteClick}
        className="flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Delete Item
      </Button>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Item?"
        description="Are you sure you want to delete this item? This action cannot be undone."
        itemName="Example Item Name"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        isLoading={isDeleting}
      />
    </>
  )
}
