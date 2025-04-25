"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface CategoryChangeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUsers: string[]
  userTypes: string[]
  onSave: (data: { category: string; users: string[] }) => void
}

export default function CategoryChangeModal({
  open,
  onOpenChange,
  selectedUsers,
  userTypes,
  onSave,
}: CategoryChangeModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Handle save
  const handleSave = () => {
    if (!selectedCategory) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      onSave({
        category: selectedCategory,
        users: selectedUsers,
      })

      setIsProcessing(false)
      setSelectedCategory("")
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Change User Category</DialogTitle>
          <DialogDescription>
            Update the category for selected users. This will change how they are segmented and what content they
            receive.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedUsers.length} {selectedUsers.length === 1 ? "user" : "users"} selected
            </span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">New Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-amber-50 p-4 rounded-md text-amber-800 text-sm">
            <p className="font-medium">Important</p>
            <p className="mt-1">
              Changing user categories will affect what content they receive. Make sure this is the correct action.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isProcessing || !selectedCategory}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Update Category</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
