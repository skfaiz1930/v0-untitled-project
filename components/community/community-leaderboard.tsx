"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, MessageSquare, ThumbsUp } from "lucide-react"

export function CommunityLeaderboard() {
  // Mock leaderboard data
  const leaderboardData = [
    {
      id: "user-1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 1250,
      posts: 24,
      likes: 87,
      position: 1,
    },
    {
      id: "user-2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 980,
      posts: 18,
      likes: 65,
      position: 2,
    },
    {
      id: "user-3",
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 840,
      posts: 15,
      likes: 52,
      position: 3,
    },
    {
      id: "user-4",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 720,
      posts: 12,
      likes: 43,
      position: 4,
    },
    {
      id: "user-5",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      points: 650,
      posts: 10,
      likes: 38,
      position: 5,
      isCurrentUser: true,
    },
  ]

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "text-yellow-500"
      case 2:
        return "text-gray-400"
      case 3:
        return "text-amber-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-3">
      {leaderboardData.map((user) => (
        <div
          key={user.id}
          className={`flex items-center justify-between p-2 rounded-md ${
            user.isCurrentUser ? "bg-primary/10" : "hover:bg-muted"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`font-bold ${getPositionColor(user.position)}`}>{user.position}</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {user.posts}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {user.likes}
                </span>
              </div>
            </div>
          </div>
          <Badge className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            {user.points}
          </Badge>
        </div>
      ))}
    </div>
  )
}
