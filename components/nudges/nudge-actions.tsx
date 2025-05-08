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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Coins, Sparkles, Zap, SkipForward, MessageSquare, ArrowUp } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import { useToast } from "@/hooks/use-toast"

interface NudgeActionsProps {
  nudgeId: string
  nudgeTitle: string
}

export function NudgeActions({ nudgeId, nudgeTitle }: NudgeActionsProps) {
  const [showSkipDialog, setShowSkipDialog] = useState(false)
  const [showBoostDialog, setShowBoostDialog] = useState(false)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { coins, spendCoins, useFreezePass, freezePasses, addXp } = useGamification()
  const { toast } = useToast()

  const handleSkipDay = (useCoins: boolean) => {
    setIsProcessing(true)

    setTimeout(() => {
      let success = false
      let freezePassUsed = false
      let coinsUsed = false

      if (useCoins) {
        // Skip using coins (costs 40 coins)
        coinsUsed = spendCoins(40)
        success = coinsUsed
        if (success) {
          toast({
            title: "Day Skipped Successfully",
            description: "You've used 40 coins to skip today without losing your streak.",
          })
        } else {
          toast({
            title: "Not Enough Coins",
            description: "You need 40 coins to skip a day.",
            variant: "destructive",
          })
        }
      } else {
        // Skip using freeze pass
        freezePassUsed = useFreezePass()
        success = freezePassUsed
        if (success) {
          toast({
            title: "Freeze Pass Used",
            description: "You've used a freeze pass to skip today without losing your streak.",
          })
        } else {
          toast({
            title: "No Freeze Passes",
            description: "You don't have any freeze passes available.",
            variant: "destructive",
          })
        }
      }

      setIsProcessing(false)
      if (success) {
        setShowSkipDialog(false)
      }
    }, 1000)
  }

  const handleBoostNudge = () => {
    setIsProcessing(true)

    // Boost costs 25 coins
    if (spendCoins(25)) {
      setTimeout(() => {
        toast({
          title: "Nudge Boosted!",
          description: "This nudge will now have higher visibility and impact.",
        })

        // Add XP for using the boost feature
        addXp(10)

        setIsProcessing(false)
        setShowBoostDialog(false)
      }, 1000)
    } else {
      toast({
        title: "Not Enough Coins",
        description: "You need 25 coins to boost this nudge.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  const handleGetAIFeedback = () => {
    setIsProcessing(true)

    // AI Feedback costs 30 coins
    if (spendCoins(30)) {
      setTimeout(() => {
        toast({
          title: "AI Feedback Generated",
          description: "Check your insights for personalized feedback on this nudge.",
        })

        // Add XP for using the AI feedback feature
        addXp(15)

        setIsProcessing(false)
        setShowFeedbackDialog(false)
      }, 1500)
    } else {
      toast({
        title: "Not Enough Coins",
        description: "You need 30 coins to get AI feedback.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Power Actions
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="start">
          <div className="grid gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => setShowSkipDialog(true)}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip Day
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => setShowBoostDialog(true)}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Boost Nudge
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => setShowFeedbackDialog(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Get AI Feedback
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Skip Day Dialog */}
      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skip a Day Without Losing Streak</DialogTitle>
            <DialogDescription>
              Use coins or a freeze pass to maintain your streak even if you miss a day.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-primary mr-2" />
                <span>Today's Date: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3 flex flex-col items-center justify-between">
                <div className="text-center mb-2">
                  <Coins className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                  <h3 className="font-medium">Use Coins</h3>
                </div>
                <div className="text-center text-sm text-muted-foreground mb-2">
                  <p>Cost: 40 coins</p>
                  <p>Your balance: {coins} coins</p>
                </div>
                <Button
                  onClick={() => handleSkipDay(true)}
                  disabled={coins < 40 || isProcessing}
                  size="sm"
                  className="w-full"
                >
                  {isProcessing ? "Processing..." : "Use Coins"}
                </Button>
              </div>

              <div className="border rounded-lg p-3 flex flex-col items-center justify-between">
                <div className="text-center mb-2">
                  <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <h3 className="font-medium">Use Freeze Pass</h3>
                </div>
                <div className="text-center text-sm text-muted-foreground mb-2">
                  <p>Available: {freezePasses} passes</p>
                  <p>Earned through challenges</p>
                </div>
                <Button
                  onClick={() => handleSkipDay(false)}
                  disabled={freezePasses < 1 || isProcessing}
                  size="sm"
                  className="w-full"
                  variant="outline"
                >
                  {isProcessing ? "Processing..." : "Use Pass"}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Boost Nudge Dialog */}
      <Dialog open={showBoostDialog} onOpenChange={setShowBoostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Boost This Nudge</DialogTitle>
            <DialogDescription>Increase this nudge's visibility and impact score.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-primary/5 rounded-lg">
              <h3 className="font-medium mb-1">{nudgeTitle}</h3>
              <p className="text-sm text-muted-foreground">
                Boosting this nudge will prioritize it in your dashboard and increase its impact on your leadership
                metrics.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Visibility</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">Normal</span>
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-sm font-medium text-primary">Boosted</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center">
                <Coins className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="font-medium">Cost: 25 coins</span>
              </div>
              <div className="text-sm">Your balance: {coins} coins</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBoostDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBoostNudge} disabled={coins < 25 || isProcessing} className="gap-2">
              {isProcessing ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              Boost Nudge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Get AI Feedback</DialogTitle>
            <DialogDescription>
              Receive personalized AI feedback on your implementation of this nudge.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-primary/5 rounded-lg">
              <h3 className="font-medium mb-1">{nudgeTitle}</h3>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your implementation notes and provide personalized feedback to improve your
                leadership approach.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10">
                  <Sparkles className="h-3 w-3 mr-1 text-primary" />
                  AI-Powered
                </Badge>
                <Badge variant="outline">Personalized</Badge>
                <Badge variant="outline">Actionable</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Feedback will include strengths, areas for improvement, and specific suggestions tailored to your
                leadership style.
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center">
                <Coins className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="font-medium">Cost: 30 coins</span>
              </div>
              <div className="text-sm">Your balance: {coins} coins</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleGetAIFeedback} disabled={coins < 30 || isProcessing} className="gap-2">
              {isProcessing ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <MessageSquare className="h-4 w-4" />
              )}
              Get AI Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
