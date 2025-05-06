"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { BadgeItem, type BadgeItemProps } from "./badge-item"
import { Award, Search } from "lucide-react"

interface BadgesCollectionProps {
  badges: BadgeItemProps[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BadgesCollection({ badges, open, onOpenChange }: BadgesCollectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const earnedBadges = badges.filter((badge) => badge.earned)
  const unearnedBadges = badges.filter((badge) => !badge.earned)

  const filteredBadges = badges.filter(
    (badge) =>
      badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      badge.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getTabBadges = () => {
    let tabBadges = filteredBadges

    if (activeTab === "earned") {
      tabBadges = filteredBadges.filter((badge) => badge.earned)
    } else if (activeTab === "unearned") {
      tabBadges = filteredBadges.filter((badge) => !badge.earned)
    } else if (activeTab !== "all") {
      tabBadges = filteredBadges.filter((badge) => badge.type === activeTab)
    }

    return tabBadges
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Your Badges Collection
          </DialogTitle>
          <DialogDescription>
            You've earned {earnedBadges.length} out of {badges.length} badges
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search badges..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="earned">Earned ({earnedBadges.length})</TabsTrigger>
            <TabsTrigger value="unearned">Unearned ({unearnedBadges.length})</TabsTrigger>
            <TabsTrigger value="streak">Streaks</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 overflow-y-auto pr-2">
            <div className="grid gap-4">
              {getTabBadges().length > 0 ? (
                getTabBadges().map((badge) => <BadgeItem key={badge.id} {...badge} />)
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Award className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground">No badges found</p>
                  {searchQuery && <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
