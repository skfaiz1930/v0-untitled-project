"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, Bell, Flame, Users, ImageIcon, X, Hash } from "lucide-react"
import { mockTeamMembers } from "@/lib/mock-data"
import { useCommunity } from "@/contexts/community-context"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialType?: string
  initialContent?: string
  prefilledData?: {
    badgeName?: string
    levelName?: string
    nudgeTitle?: string
    streakCount?: number
  }
}

export function CreatePostDialog({
  open,
  onOpenChange,
  initialType = "nudges",
  initialContent = "",
  prefilledData,
}: CreatePostDialogProps) {
  const [postType, setPostType] = useState(initialType)
  const [content, setContent] = useState(initialContent)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { createPost } = useCommunity()

  const handleSubmit = () => {
    if (!content.trim()) return

    setIsSubmitting(true)

    // Create the post
    createPost({
      type: postType,
      content,
      mentionedUsers: postType === "praise" ? selectedTeamMembers : undefined,
      tags: tags.length > 0 ? tags : undefined,
    })

    // Reset form and close dialog
    setTimeout(() => {
      setIsSubmitting(false)
      setContent("")
      setSelectedTeamMembers([])
      setTags([])
      setCurrentTag("")
      onOpenChange(false)
    }, 1000)
  }

  const handleTagTeamMember = (memberId: string) => {
    setSelectedTeamMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId],
    )
  }

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      addTag()
    }
  }

  const getPostTypeIcon = () => {
    switch (postType) {
      case "badges":
        return <Award className="h-5 w-5 text-amber-500" />
      case "levels":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "nudges":
        return <Bell className="h-5 w-5 text-green-500" />
      case "streaks":
        return <Flame className="h-5 w-5 text-red-500" />
      case "praise":
        return <Users className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPlaceholderText = () => {
    switch (postType) {
      case "badges":
        return prefilledData?.badgeName
          ? `I just earned the ${prefilledData.badgeName} badge! 🎉`
          : "Share your badge achievement with the community..."
      case "levels":
        return prefilledData?.levelName
          ? `I just reached ${prefilledData.levelName} level! 🚀`
          : "Share your level up with the community..."
      case "nudges":
        return prefilledData?.nudgeTitle
          ? `I just completed the "${prefilledData.nudgeTitle}" nudge!`
          : "Share your thoughts about a nudge you completed..."
      case "streaks":
        return prefilledData?.streakCount
          ? `I'm on a ${prefilledData.streakCount}-day streak! 🔥`
          : "Share your streak milestone with the community..."
      case "praise":
        return "Recognize a team member for their great work..."
      default:
        return "What would you like to share with the community?"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getPostTypeIcon()}
            Create a Post
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs defaultValue={postType} value={postType} onValueChange={setPostType} className="w-full">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="badges" className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Badge</span>
              </TabsTrigger>
              <TabsTrigger value="levels" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Level</span>
              </TabsTrigger>
              <TabsTrigger value="nudges" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Nudge</span>
              </TabsTrigger>
              <TabsTrigger value="streaks" className="flex items-center gap-1">
                <Flame className="h-4 w-4" />
                <span className="hidden sm:inline">Streak</span>
              </TabsTrigger>
              <TabsTrigger value="praise" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Praise</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Your avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                className="w-full p-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
                placeholder={getPlaceholderText()}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          {postType === "praise" && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Tag team members:</p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                {mockTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      selectedTeamMembers.includes(member.id) ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                    onClick={() => handleTagTeamMember(member.id)}
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
                      {selectedTeamMembers.includes(member.id) && <Check className="h-5 w-5 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center">
              <Hash className="h-4 w-4 mr-1 text-muted-foreground" />
              <p className="text-sm font-medium">Add tags:</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add a tag and press Enter"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button size="sm" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <ImageIcon className="h-4 w-4" />
              Add Image
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Missing Check icon component
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
