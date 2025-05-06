"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, ThumbsUp, MessageCircle, Award, Users } from "lucide-react"
import { mockTeamMembers } from "@/lib/mock-data"
import { useGamification } from "@/contexts/gamification-context"

// Mock peer activity data
const mockPeerActivity = [
  {
    id: "activity-1",
    userId: "member-1",
    type: "completed",
    nudgeId: "nudge-1",
    nudgeTitle: "Recognize a Team Member",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    liked: false,
    comments: 2,
  },
  {
    id: "activity-2",
    userId: "member-2",
    type: "saved",
    nudgeId: "nudge-3",
    nudgeTitle: "Delegate a Task",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    liked: true,
    comments: 0,
  },
  {
    id: "activity-3",
    userId: "member-3",
    type: "completed",
    nudgeId: "nudge-2",
    nudgeTitle: "Schedule a 1:1 Meeting",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    liked: true,
    comments: 1,
  },
  {
    id: "activity-4",
    userId: "member-1",
    type: "badge_earned",
    badgeId: "badge-2",
    badgeName: "3-Day Streak",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    liked: false,
    comments: 3,
  },
  {
    id: "activity-5",
    userId: "member-4",
    type: "completed",
    nudgeId: "nudge-5",
    nudgeTitle: "Provide Constructive Feedback",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 26 hours ago
    liked: false,
    comments: 0,
  },
  {
    id: "activity-6",
    userId: "member-5",
    type: "streak",
    streakCount: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    liked: true,
    comments: 2,
  },
]

export function PeerActivityFeed() {
  const [activities, setActivities] = useState(mockPeerActivity)
  const [activeTab, setActiveTab] = useState("all")
  const { addCoins } = useGamification()

  const handleLike = (activityId: string) => {
    setActivities(
      activities.map((activity) =>
        activity.id === activityId
          ? {
              ...activity,
              liked: !activity.liked,
            }
          : activity,
      ),
    )

    // Award coins for social engagement
    if (!activities.find((a) => a.id === activityId)?.liked) {
      addCoins(2)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min ago`
    } else if (diffHours < 24) {
      return `${diffHours} hr ago`
    } else {
      return `${diffDays} day ago`
    }
  }

  const filteredActivities = activities.filter((activity) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return activity.type === "completed"
    if (activeTab === "badges") return activity.type === "badge_earned"
    if (activeTab === "streaks") return activity.type === "streak"
    return true
  })

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "saved":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "badge_earned":
        return <Award className="h-5 w-5 text-amber-500" />
      case "streak":
        return <Users className="h-5 w-5 text-purple-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getActivityText = (activity: any) => {
    const user = mockTeamMembers.find((member) => member.id === activity.userId)
    const userName = user?.name || "A team member"

    switch (activity.type) {
      case "completed":
        return (
          <>
            <span className="font-medium">{userName}</span> completed the nudge{" "}
            <span className="font-medium">"{activity.nudgeTitle}"</span>
          </>
        )
      case "saved":
        return (
          <>
            <span className="font-medium">{userName}</span> saved the nudge{" "}
            <span className="font-medium">"{activity.nudgeTitle}"</span> for later
          </>
        )
      case "badge_earned":
        return (
          <>
            <span className="font-medium">{userName}</span> earned the{" "}
            <span className="font-medium">"{activity.badgeName}"</span> badge
          </>
        )
      case "streak":
        return (
          <>
            <span className="font-medium">{userName}</span> reached a{" "}
            <span className="font-medium">{activity.streakCount}-day</span> streak
          </>
        )
      default:
        return "Activity completed"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No activities to display in this category</div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={mockTeamMembers.find((member) => member.id === activity.userId)?.name}
                  />
                  <AvatarFallback>
                    {mockTeamMembers.find((member) => member.id === activity.userId)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getActivityIcon(activity.type)}
                    <p className="text-sm">{getActivityText(activity)}</p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleLike(activity.id)}
                      >
                        <ThumbsUp className={`h-3.5 w-3.5 mr-1 ${activity.liked ? "fill-primary text-primary" : ""}`} />
                        {activity.liked ? "Liked" : "Like"}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>

                  {activity.comments > 0 && (
                    <div className="mt-1">
                      <Badge variant="outline" className="text-xs font-normal">
                        {activity.comments} comment{activity.comments !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
