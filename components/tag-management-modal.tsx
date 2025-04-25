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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Loader2 } from "lucide-react"

interface TagManagementModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUsers: string[]
  userTags: Record<string, string[]>
  availableTags: string[]
  onSave: (data: { action: string; tags: string[]; users: string[] }) => void
}

export default function TagManagementModal({
  open,
  onOpenChange,
  selectedUsers,
  userTags,
  availableTags,
  onSave,
}: TagManagementModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [action, setAction] = useState<"add" | "remove">("add")

  // Get common tags among selected users
  const getCommonTags = () => {
    if (selectedUsers.length === 0) return []

    // Get all tags for the first selected user
    const firstUserTags = userTags[selectedUsers[0]] || []

    // Find tags that exist for all selected users
    return firstUserTags.filter((tag) => selectedUsers.every((userId) => userTags[userId]?.includes(tag)))
  }

  const commonTags = getCommonTags()

  // Handle adding a new tag
  const handleAddNewTag = () => {
    if (!newTag.trim() || selectedTags.includes(newTag.trim())) {
      setNewTag("")
      return
    }

    setSelectedTags([...selectedTags, newTag.trim()])
    setNewTag("")
  }

  // Handle removing a tag from selection
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  // Handle selecting an existing tag
  const handleSelectTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Handle save
  const handleSave = () => {
    if (selectedTags.length === 0) return

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      onSave({
        action,
        tags: selectedTags,
        users: selectedUsers,
      })

      setIsProcessing(false)
      setSelectedTags([])
      setAction("add")
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
          <DialogDescription>
            {action === "add"
              ? "Add tags to selected users to better organize and segment your audience."
              : "Remove tags from selected users."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedUsers.length} {selectedUsers.length === 1 ? "user" : "users"} selected
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant={action === "add" ? "default" : "outline"}
              onClick={() => setAction("add")}
              className="flex-1"
            >
              Add Tags
            </Button>
            <Button
              variant={action === "remove" ? "default" : "outline"}
              onClick={() => setAction("remove")}
              className="flex-1"
            >
              Remove Tags
            </Button>
          </div>

          {action === "add" && (
            <div className="grid gap-2">
              <Label htmlFor="new-tag">Add New Tag</Label>
              <div className="flex gap-2">
                <Input
                  id="new-tag"
                  placeholder="Enter new tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddNewTag()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddNewTag} disabled={!newTag.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {action === "remove" && commonTags.length > 0 && (
            <div className="grid gap-2">
              <Label>Common Tags</Label>
              <div className="flex flex-wrap gap-2">
                {commonTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleSelectTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">These tags are applied to all selected users</p>
            </div>
          )}

          <div className="grid gap-2">
            <Label>{action === "add" ? "Available Tags" : "All Tags"}</Label>
            <ScrollArea className="h-[150px] w-full rounded-md border p-2">
              <div className="flex flex-wrap gap-2">
                {availableTags
                  .filter((tag) => action === "remove" || !selectedTags.includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSelectTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </ScrollArea>
          </div>

          {selectedTags.length > 0 && (
            <div className="grid gap-2">
              <Label>Selected Tags</Label>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isProcessing || selectedTags.length === 0}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>{action === "add" ? "Add Tags" : "Remove Tags"}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
