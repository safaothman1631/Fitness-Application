"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteDialogProps {
  isOpen: boolean
  title: string
  description: string
  itemName?: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  isLoading?: boolean
  variant?: "destructive" | "warning"
}

export default function DeleteDialog({
  isOpen,
  title,
  description,
  itemName,
  onConfirm,
  onCancel,
  isLoading = false,
  variant = "destructive",
}: DeleteDialogProps) {
  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <DialogTitle className="text-xl text-white">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-400 mt-3">
            {description}
          </DialogDescription>
          {itemName && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="text-sm font-semibold text-red-400">
                Item: <span className="text-white">{itemName}</span>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 my-4">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-red-400">Warning:</span> This action cannot be undone. Please make sure you want to delete this item.
          </p>
        </div>

        <DialogFooter className="gap-2 flex justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block mr-2">⏳</span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
