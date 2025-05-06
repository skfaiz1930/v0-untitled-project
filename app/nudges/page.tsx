"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  CheckCircle,
  TagIcon,
  Calendar,
  Clock,
  Filter,
  Sparkles,
  Coins,
  Flame,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { mockNudges, mockTeamMembers } from "@/lib/mock-data"
import NudgeConfetti from "@/components/nudges/nudge-confetti"
import ImplementationSteps from "@/components/nudges/implementation-steps"
import { useGamification } from "@/contexts/gamification-context"
import CoinAnimation from "@/components/gamification/coin-animation"
import { PremiumNudges } from "@/components/gamification/premium-nudges"
import { StreakRevival } from "@/components/gamification/streak-revival"
import { ExpiredNudgeRevival } from "@/components/nudges/expired-nudge-revival"

// Add expired nudges to the mock data
const mockExpiredNudges = [
  {
    id: "expired-1",
    title: "Conduct a Team Retrospective",
    description:
      "Schedule a meeting to reflect on recent projects, discuss what went well, and identify areas for improvement.",
    expiredDate: "April 28, 2023",
    categories: ["Team Building", "Feedback"],
    completed: false,
  },
  {
    id: "expired-2",
    title: "Create a Career Development Plan",
    description:
      "Work with a team member to create a personalized career development plan with clear goals and action items.",
    expiredDate: "April 25, 2023",
    categories: ["Mentoring", "Development"],
    completed: false,
  },
]

export default function NudgesPage() {
  const [activeTab, setActiveTab] = useState("today")
  const [nudges, setNudges] = useState(mockNudges)
  const [expiredNudges, setExpiredNudges] = useState(mockExpiredNudges)
  const [teamMembers] = useState(mockTeamMembers)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showStreakRevival, setShowStreakRevival] = useState(false)
  const [showExpiredNudgeRevival, setShowExpiredNudgeRevival] = useState(false)
  const [selectedExpiredNudge, setSelectedExpiredNudge] = useState<any>(null)

  const {
    coins,
    addCoins,
    premiumNudges,
    unlockPremiumNudge,
    streak,
    reviveStreak,
    incrementStreak,
    showCoinAnimation,
    setShowCoinAnimation,
    animationAmount,
    earnBadge,
  } = useGamification()

  // Check if streak needs revival
  useEffect(() => {
    if (streak.canRevive) {
      const timer = setTimeout(() => {
        setShowStreakRevival(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [streak.canRevive])

  const handleLikeNudge = (nudgeId: string) => {
    setNudges(
      nudges.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              liked: !nudge.liked,
              disliked: nudge.disliked ? false : nudge.disliked,
            }
          : nudge,
      ),
    )

    // Award coins for feedback
    if (!nudges.find((n) => n.id === nudgeId)?.liked) {
      addCoins(5)
    }
  }

  const handleDislikeNudge = (nudgeId: string) => {
    setNudges(
      nudges.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              disliked: !nudge.disliked,
              liked: nudge.liked ? false : nudge.liked,
            }
          : nudge,
      ),
    )

    // Award coins for feedback
    if (!nudges.find((n) => n.id === nudgeId)?.disliked) {
      addCoins(5)
    }
  }

  const handleSaveNudge = (nudgeId: string) => {
    setNudges(
      nudges.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              saved: !nudge.saved,
            }
          : nudge,
      ),
    )

    // Award coins for saving
    if (!nudges.find((n) => n.id === nudgeId)?.saved) {
      addCoins(3)
    }
  }

  const handleCompleteNudge = (nudgeId: string) => {
    const nudge = nudges.find((n) => n.id === nudgeId)
    const wasCompleted = nudge?.completed || false

    setNudges(
      nudges.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              completed: !nudge.completed,
            }
          : nudge,
      ),
    )

    // Show confetti animation when completing a nudge
    if (!wasCompleted) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      // Award coins for completion
      addCoins(10)

      // Increment streak
      incrementStreak()

      // Check for completion badges
      const completedCount = nudges.filter((n) => n.completed).length + 1
      if (completedCount === 1) {
        earnBadge("badge-1") // First Nudge badge
      } else if (completedCount === 10) {
        earnBadge("badge-3") // 10 Nudges Completed badge
      }
    }
  }

  const handleTagTeamMember = (nudgeId: string, memberId: string) => {
    const isSelected = selectedTeamMembers.includes(memberId)

    if (isSelected) {
      setSelectedTeamMembers(selectedTeamMembers.filter((id) => id !== memberId))
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, memberId])
    }
  }

  const confirmTagTeamMembers = (nudgeId: string) => {
    const newTaggedMembers = [
      ...(nudges.find((n) => n.id === nudgeId)?.taggedMembers || []),
      ...selectedTeamMembers.filter((id) => !nudges.find((n) => n.id === nudgeId)?.taggedMembers.includes(id)),
    ]

    setNudges(
      nudges.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              taggedMembers: newTaggedMembers,
            }
          : nudge,
      ),
    )

    // Award coins for tagging team members
    if (selectedTeamMembers.length > 0) {
      addCoins(selectedTeamMembers.length * 2)

      // Check for team badge
      const totalTagged = new Set([...nudges.flatMap((n) => n.taggedMembers), ...selectedTeamMembers]).size

      if (totalTagged >= 5) {
        earnBadge("badge-4") // Team Player badge
      }
    }

    setSelectedTeamMembers([])
  }

  const handleUnlockPremiumNudge = (nudgeId: string, cost: number) => {
    unlockPremiumNudge(nudgeId)
  }

  const handleReviveStreak = () => {
    reviveStreak()
  }

  const handleReviveExpiredNudge = (nudgeId: string) => {
    // Find the expired nudge
    const expiredNudge = expiredNudges.find((n) => n.id === nudgeId)
    if (!expiredNudge) return

    // Remove from expired nudges
    setExpiredNudges(expiredNudges.filter((n) => n.id !== nudgeId))

    // Add to active nudges with today's date
    setNudges([
      ...nudges,
      {
        id: expiredNudge.id,
        title: expiredNudge.title,
        description: expiredNudge.description,
        date: "Today",
        categories: expiredNudge.categories,
        completed: false,
        liked: false,
        disliked: false,
        saved: false,
        taggedMembers: [],
        wasExpired: true,
      },
    ])
  }

  const openExpiredNudgeRevival = (nudge: any) => {
    setSelectedExpiredNudge(nudge)
    setShowExpiredNudgeRevival(true)
  }

  const filteredNudges = nudges
    .filter((nudge) => {
      if (activeTab === "today") {
        return nudge.date === "Today"
      } else if (activeTab === "upcoming") {
        return nudge.date !== "Today" && !nudge.completed
      } else if (activeTab === "completed") {
        return nudge.completed
      } else if (activeTab === "saved") {
        return nudge.saved
      } else if (activeTab === "expired") {
        return false // Expired nudges are in a separate array
      }
      return true
    })
    .filter(
      (nudge) =>
        searchQuery === "" ||
        nudge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        nudge.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {showConfetti && <NudgeConfetti />}
        {showCoinAnimation && <CoinAnimation amount={animationAmount} onComplete={() => setShowCoinAnimation(false)} />}

        <StreakRevival
          open={showStreakRevival}
          onOpenChange={setShowStreakRevival}
          currentCoins={coins}
          streakLength={streak.current}
          revivalCost={50}
          onRevive={handleReviveStreak}
        />

        {selectedExpiredNudge && (
          <ExpiredNudgeRevival
            open={showExpiredNudgeRevival}
            onOpenChange={setShowExpiredNudgeRevival}
            nudge={selectedExpiredNudge}
            onRevive={handleReviveExpiredNudge}
          />
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Leadership Nudges</h1>
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                <Flame className="h-4 w-4" />
                <span className="font-medium">{streak.current}-day streak</span>
              </div>
            </div>
            <p className="text-muted-foreground">Daily prompts to help you become a better leader</p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Input
                type="search"
                placeholder="Search nudges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Nudges</DropdownMenuItem>
                <DropdownMenuItem>Team Related</DropdownMenuItem>
                <DropdownMenuItem>Communication</DropdownMenuItem>
                <DropdownMenuItem>Leadership</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="expired" className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-500" />
              Expired
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="premium">
            <PremiumNudges nudges={premiumNudges} userCoins={coins} onUnlock={handleUnlockPremiumNudge} />
          </TabsContent>

          <TabsContent value="expired">
            {expiredNudges.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">No expired nudges</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                    You don't have any expired nudges at the moment. Great job staying on top of things!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {expiredNudges.map((nudge) => (
                  <Card key={nudge.id} className="bg-muted/30 border-amber-200 dark:border-amber-800">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl flex items-center gap-2">
                            {nudge.title}
                            <Badge variant="outline" className="text-amber-600 border-amber-300 dark:border-amber-700">
                              <AlertTriangle className="mr-1 h-3 w-3" /> Expired
                            </Badge>
                          </CardTitle>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="outline" className="text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" /> Expired on {nudge.expiredDate}
                            </Badge>
                            {nudge.categories.map((category, index) => (
                              <Badge key={index} variant="secondary">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{nudge.description}</p>

                      <div className="mt-4 flex items-center justify-between p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Revive this nudge for 30 coins</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-0">
                      <Button
                        variant="default"
                        onClick={() => openExpiredNudgeRevival(nudge)}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        Revive Nudge
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value={activeTab} className="space-y-4">
            {activeTab !== "premium" && activeTab !== "expired" && filteredNudges.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    {activeTab === "saved" ? (
                      <Bookmark className="h-6 w-6 text-primary" />
                    ) : activeTab === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <Calendar className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium">No nudges found</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mt-1">
                    {activeTab === "saved"
                      ? "You haven't saved any nudges yet. Save nudges to revisit them later."
                      : activeTab === "completed"
                        ? "You haven't completed any nudges yet. Complete nudges to track your progress."
                        : activeTab === "upcoming"
                          ? "No upcoming nudges found. Check back later for new leadership prompts."
                          : "No nudges found for today. Check back later or try a different filter."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              activeTab !== "premium" &&
              activeTab !== "expired" &&
              filteredNudges.map((nudge) => (
                <Card
                  key={nudge.id}
                  className={`${nudge.completed ? "bg-primary/5" : ""} ${nudge.wasExpired ? "border-amber-200 dark:border-amber-800" : ""}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {nudge.title}
                          {nudge.wasExpired && (
                            <Badge
                              variant="outline"
                              className="ml-2 text-amber-600 border-amber-300 dark:border-amber-700"
                            >
                              Revived
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center mt-1 space-x-2">
                          {nudge.date === "Today" ? (
                            <Badge variant="default" className="bg-primary">
                              Today
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" /> {nudge.date}
                            </Badge>
                          )}
                          {nudge.categories.map((category, index) => (
                            <Badge key={index} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant={nudge.liked ? "default" : "ghost"}
                          size="icon"
                          onClick={() => handleLikeNudge(nudge.id)}
                          className={nudge.liked ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={nudge.disliked ? "default" : "ghost"}
                          size="icon"
                          onClick={() => handleDislikeNudge(nudge.id)}
                          className={nudge.disliked ? "bg-red-500 hover:bg-red-600" : ""}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={nudge.saved ? "default" : "ghost"}
                          size="icon"
                          onClick={() => handleSaveNudge(nudge.id)}
                          className={nudge.saved ? "bg-amber-500 hover:bg-amber-600" : ""}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{nudge.description}</p>

                    {nudge.taggedMembers.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Tagged Team Members:</p>
                        <div className="flex flex-wrap gap-2">
                          {nudge.taggedMembers.map((memberId) => {
                            const member = teamMembers.find((m) => m.id === memberId)
                            return (
                              <div key={memberId} className="flex items-center bg-secondary rounded-full px-3 py-1">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                                  <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs">{member?.name}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    <ImplementationSteps
                      nudgeId={nudge.id}
                      nudgeTitle={nudge.title}
                      nudgeDescription={nudge.description}
                    />

                    {!nudge.completed && (
                      <div className="mt-4 flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Coins className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Complete this nudge to earn 10 coins</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <TagIcon className="h-4 w-4 mr-2" />
                          Tag Team Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tag Team Members</DialogTitle>
                          <DialogDescription>Select team members to associate with this nudge.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            {teamMembers.map((member) => (
                              <div
                                key={member.id}
                                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                                  selectedTeamMembers.includes(member.id) ? "bg-primary/10" : "hover:bg-secondary"
                                }`}
                                onClick={() => handleTagTeamMember(nudge.id, member.id)}
                              >
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">{member.name}</p>
                                    <p className="text-xs text-muted-foreground">{member.role}</p>
                                  </div>
                                </div>
                                <div
                                  className={`h-5 w-5 rounded-full border ${
                                    selectedTeamMembers.includes(member.id)
                                      ? "bg-primary border-primary"
                                      : "border-gray-300 dark:border-gray-600"
                                  }`}
                                >
                                  {selectedTeamMembers.includes(member.id) && (
                                    <CheckCircle className="h-5 w-5 text-white" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => confirmTagTeamMembers(nudge.id)}
                            disabled={selectedTeamMembers.length === 0}
                          >
                            Confirm
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant={nudge.completed ? "outline" : "default"}
                      onClick={() => handleCompleteNudge(nudge.id)}
                      className="animate-scale-up"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {nudge.completed ? "Completed" : "Mark as Done"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
