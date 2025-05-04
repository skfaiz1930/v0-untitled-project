"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, ThumbsDown, Bookmark, CheckCircle, TagIcon, Calendar, Clock, Filter } from "lucide-react"
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

export default function NudgesPage() {
  const [activeTab, setActiveTab] = useState("today")
  const [nudges, setNudges] = useState(mockNudges)
  const [teamMembers] = useState(mockTeamMembers)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

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
  }

  const handleCompleteNudge = (nudgeId: string) => {
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
    if (!nudges.find((n) => n.id === nudgeId)?.completed) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
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
    setNudges(
      nudges.map((nudge) =>
        nudge.id === nudgeId
          ? {
              ...nudge,
              taggedMembers: [
                ...nudge.taggedMembers,
                ...selectedTeamMembers.filter((id) => !nudge.taggedMembers.includes(id)),
              ],
            }
          : nudge,
      ),
    )
    setSelectedTeamMembers([])
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leadership Nudges</h1>
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
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNudges.length === 0 ? (
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
              filteredNudges.map((nudge) => (
                <Card key={nudge.id} className={`${nudge.completed ? "bg-primary/5" : ""}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{nudge.title}</CardTitle>
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
