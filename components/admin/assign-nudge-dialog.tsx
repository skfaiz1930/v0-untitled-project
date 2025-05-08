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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { mockNudges } from "@/lib/mock-data"

interface AssignNudgeDialogProps {
  user: {
    id: string
    name: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssignNudgeDialog({ user, open, onOpenChange }: AssignNudgeDialogProps) {
  const [selectedNudge, setSelectedNudge] = useState("")
  const [customMessage, setCustomMessage] = useState("")

  const handleAssign = () => {
    // Implementation would go here
    console.log(`Assigned nudge ${selectedNudge} to ${user.name} with message: ${customMessage}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Nudge to {user.name}</DialogTitle>
          <DialogDescription>
            Select a nudge to assign to this user. You can also add a custom message.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label htmlFor="nudge" className="text-sm font-medium">
              Select Nudge
            </label>
            <Select value={selectedNudge} onValueChange={setSelectedNudge}>
              <SelectTrigger>
                <SelectValue placeholder="Select a nudge" />
              </SelectTrigger>
              <SelectContent>
                {mockNudges.map((nudge) => (
                  <SelectItem key={nudge.id} value={nudge.id}>
                    {nudge.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Custom Message (Optional)
            </label>
            <Textarea
              id="message"
              placeholder="Add a personal message to accompany this nudge..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedNudge}>
            Assign Nudge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
