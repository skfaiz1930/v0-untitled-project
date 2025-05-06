"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Coins, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { CoinDisplay } from "../gamification/coin-display"
import { useGamification } from "@/contexts/gamification-context"

interface ExpiredNudgeRevivalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nudge: {
    id: string
    title: string
    expiredDate: string
  }
  onRevive: (nudgeId: string) => void
}

export function ExpiredNudgeRevival({ open, onOpenChange, nudge, onRevive }: ExpiredNudgeRevivalProps) {
  const [isReviving, setIsReviving] = useState(false)
  const [revived, setRevived] = useState(false)
  const { coins, spendCoins } = useGamification()

  const revivalCost = 30

  const handleRevive = () => {
    setIsReviving(true)

    // Simulate API call
    setTimeout(() => {
      if (spendCoins(revivalCost)) {
        setIsReviving(false)
        setRevived(true)
        onRevive(nudge.id)

        // Close dialog after showing success message
        setTimeout(() => {
          onOpenChange(false)
          setRevived(false)
        }, 2000)
      } else {
        setIsReviving(false)
      }
    }, 1000)
  }

  const canAfford = coins >= revivalCost

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {!revived ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Revive Expired Nudge
              </DialogTitle>
              <DialogDescription>
                This nudge expired on {nudge.expiredDate}. Revive it to complete it now!
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center py-4 space-y-4">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-10 w-10 text-amber-500" />
              </div>

              <div className="text-center">
                <p className="font-medium">{nudge.title}</p>
                <div className="flex items-center justify-center mt-2">
                  <Coins className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-xl font-bold">{revivalCost} coins</span>
                </div>

                {!canAfford && (
                  <div className="flex items-center mt-3 text-red-500 text-sm">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Not enough coins</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 mt-2">
                <p className="text-sm text-muted-foreground">Your balance:</p>
                <CoinDisplay coins={coins} size="sm" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleRevive} disabled={!canAfford || isReviving} className="gap-2">
                {isReviving ? "Reviving..." : "Revive Nudge"}
                <Coins className="h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center py-8 space-y-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Nudge Revived!</h3>
            <p className="text-center text-muted-foreground">You can now complete this nudge and earn rewards.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
