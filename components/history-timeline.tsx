"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NudgeItem {
  id: string
  date: string
  title: string
  category: string
  emoji: string
  reflection?: string
  completed: boolean
}

const nudgeHistory: NudgeItem[] = [
  {
    id: "1",
    date: "Today",
    title: "Practice active listening",
    category: "Leadership",
    emoji: "🌟",
    reflection:
      "I tried this in my team meeting and noticed people were more engaged when I focused on understanding before responding.",
    completed: true,
  },
  {
    id: "2",
    date: "Yesterday",
    title: "Practice gratitude",
    category: "Wellbeing",
    emoji: "🌱",
    reflection: "Wrote down three things I'm grateful for this morning.",
    completed: true,
  },
  {
    id: "3",
    date: "2 days ago",
    title: "Set clear boundaries",
    category: "Productivity",
    emoji: "💪",
    reflection: "I declined a meeting that wasn't relevant to my priorities.",
    completed: true,
  },
  {
    id: "4",
    date: "3 days ago",
    title: "Try a new learning method",
    category: "Growth",
    emoji: "🧠",
    completed: false,
  },
  {
    id: "5",
    date: "4 days ago",
    title: "Practice mindfulness for 5 minutes",
    category: "Wellbeing",
    emoji: "🧘",
    reflection: "Did a quick breathing exercise before an important call.",
    completed: true,
  },
  {
    id: "6",
    date: "5 days ago",
    title: "Give someone specific praise",
    category: "Leadership",
    emoji: "👏",
    reflection: "Thanked my colleague for their detailed analysis on the project.",
    completed: true,
  },
]

export function HistoryTimeline() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNudges = nudgeHistory.filter(
    (nudge) =>
      nudge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nudge.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (nudge.reflection && nudge.reflection.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container max-w-md space-y-6 p-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Your Nudge History</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search your nudges..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          {filteredNudges.length > 0 ? (
            filteredNudges.map((nudge) => <NudgeHistoryCard key={nudge.id} nudge={nudge} />)
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-8 text-center">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-2 text-lg font-medium">No results found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-4 space-y-4">
          {filteredNudges
            .filter((nudge) => nudge.completed)
            .map((nudge) => (
              <NudgeHistoryCard key={nudge.id} nudge={nudge} />
            ))}
        </TabsContent>
        <TabsContent value="missed" className="mt-4 space-y-4">
          {filteredNudges
            .filter((nudge) => !nudge.completed)
            .map((nudge) => (
              <NudgeHistoryCard key={nudge.id} nudge={nudge} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NudgeHistoryCard({ nudge }: { nudge: NudgeItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className={`border ${nudge.completed ? "border-primary/10" : "border-muted"}`}>
      <CardHeader className="flex flex-row items-center gap-3 p-3">
        <div className="text-2xl">{nudge.emoji}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {nudge.category}
            </div>
            <div className="text-xs text-muted-foreground">{nudge.date}</div>
          </div>
          <h3 className="mt-1 font-medium">{nudge.title}</h3>
        </div>
      </CardHeader>
      {nudge.reflection && (
        <CardContent className="px-3 pb-3 pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 h-7 w-full justify-between px-2 text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            <span>{expanded ? "Hide reflection" : "Show reflection"}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </Button>
          {expanded && (
            <div className="rounded-lg bg-muted/50 p-3 text-sm">
              <p className="text-muted-foreground">{nudge.reflection}</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
