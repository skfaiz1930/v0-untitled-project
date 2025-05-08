"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Award, TrendingUp, Bell, Flame, Share2 } from "lucide-react"
import { useCommunity } from "@/contexts/community-context"

export function SharingPrompt() {
  const { showSharingPrompt, setShowSharingPrompt, sharingData, createPost } = useCommunity()

  if (!sharingData) return null

  const handleShare = () => {
    createPost({
      type: sharingData.type,
      content: sharingData.content,
    })
    setShowSharingPrompt(false)
  }

  const getIcon = () => {
    switch (sharingData.type) {
      case "badges":
        return <Award className="h-5 w-5 text-amber-500" />
      case "levels":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "nudges":
        return <Bell className="h-5 w-5 text-green-500" />
      case "streaks":
        return <Flame className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <Dialog open={showSharingPrompt} onOpenChange={setShowSharingPrompt}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            Share Your Achievement
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <h3 className="font-medium text-lg mb-2">{sharingData.title}</h3>
          <p className="text-muted-foreground mb-4">Would you like to share this with the community?</p>
          <div className="p-3 border rounded-md bg-muted/50">
            <p>{sharingData.content}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowSharingPrompt(false)}>
            Not Now
          </Button>
          <Button onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
