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
import { Textarea } from "@/components/ui/textarea"
import { Coins } from "lucide-react"

interface AddCoinsDialogProps {
  user: {
    id: string
    name: string
    coinsEarned: number
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCoinsDialog({ user, open, onOpenChange }: AddCoinsDialogProps) {
  const [coinsAmount, setCoinsAmount] = useState("50")
  const [reason, setReason] = useState("")

  const handleAddCoins = () => {
    // Implementation would go here
    console.log(`Added ${coinsAmount} coins to ${user.name} for reason: ${reason}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Coins to {user.name}</DialogTitle>
          <DialogDescription>Award coins to this user as a reward or incentive.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium">Current Balance: {user.coinsEarned} coins</span>
          </div>

          <div className="space-y-2">
            <label htmlFor="coins" className="text-sm font-medium">
              Coins Amount
            </label>
            <Input
              id="coins"
              type="number"
              min="1"
              value={coinsAmount}
              onChange={(e) => setCoinsAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              Reason (Optional)
            </label>
            <Textarea
              id="reason"
              placeholder="Why are you awarding these coins?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCoins} disabled={!coinsAmount || Number.parseInt(coinsAmount) < 1}>
            Add Coins
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
