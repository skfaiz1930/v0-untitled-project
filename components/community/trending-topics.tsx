"use client"

import { TrendingUp, Users, Award, Flame, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TrendingTopics() {
  // Mock trending topics
  const trendingTopics = [
    {
      id: "topic-1",
      name: "Team Recognition",
      count: 24,
      type: "praise",
    },
    {
      id: "topic-2",
      name: "Feedback Culture",
      count: 18,
      type: "nudges",
    },
    {
      id: "topic-3",
      name: "Leadership Challenges",
      count: 15,
      type: "badges",
    },
    {
      id: "topic-4",
      name: "Streak Milestones",
      count: 12,
      type: "streaks",
    },
    {
      id: "topic-5",
      name: "Level Up Strategies",
      count: 10,
      type: "levels",
    },
  ]

  const getTopicIcon = (type: string) => {
    switch (type) {
      case "badges":
        return <Award className="h-4 w-4 text-amber-500" />
      case "levels":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "nudges":
        return <Bell className="h-4 w-4 text-green-500" />
      case "streaks":
        return <Flame className="h-4 w-4 text-red-500" />
      case "praise":
        return <Users className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-3">
      {trendingTopics.map((topic) => (
        <div key={topic.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
          <div className="flex items-center gap-2">
            {getTopicIcon(topic.type)}
            <span className="text-sm font-medium">#{topic.name}</span>
          </div>
          <Badge variant="outline">{topic.count} posts</Badge>
        </div>
      ))}
    </div>
  )
}
