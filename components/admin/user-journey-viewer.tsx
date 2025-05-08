"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  CheckCircle,
  X,
  Coins,
  Award,
  Tag,
  MessageSquare,
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Download,
  User,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimelineEvent {
  id: string
  date: string
  time: string
  type: string
  title: string
  description: string
  metadata?: any
}

interface UserJourneyData {
  userId: string
  userName: string
  userRole: string
  userTeam: string
  timeline: TimelineEvent[]
  stats: {
    nudgesCompleted: number
    nudgesMissed: number
    coinsEarned: number
    tagsReceived: number
    tagsSent: number
    averageSentiment: number
    loginFrequency: number
    responseTime: number
  }
  comparisonToTeam: {
    nudgesCompleted: number
    coinsEarned: number
    engagement: number
    sentiment: number
  }
}

interface UserJourneyViewerProps {
  userId: string | null
  journeyData?: UserJourneyData
}

export function UserJourneyViewer({ userId, journeyData }: UserJourneyViewerProps) {
  const [timeRange, setTimeRange] = useState("30")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 10

  if (!userId || !journeyData) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <User className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No User Selected</h3>
          <p className="text-center text-muted-foreground max-w-md">
            Select a user from the Users tab to view their detailed journey and analytics.
          </p>
        </CardContent>
      </Card>
    )
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "nudge_completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "nudge_missed":
        return <X className="h-5 w-5 text-red-500" />
      case "nudge_assigned":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "coins_earned":
        return <Coins className="h-5 w-5 text-amber-500" />
      case "badge_earned":
        return <Award className="h-5 w-5 text-purple-500" />
      case "tag_received":
        return <Tag className="h-5 w-5 text-indigo-500" />
      case "tag_sent":
        return <Tag className="h-5 w-5 text-cyan-500" />
      case "feedback_given":
        return <MessageSquare className="h-5 w-5 text-teal-500" />
      case "login":
        return <User className="h-5 w-5 text-gray-500" />
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />
    }
  }

  const filteredEvents = journeyData.timeline.slice(0, Number.parseInt(timeRange))
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const currentEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  const getComparisonIcon = (value: number) => {
    if (value > 10) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (value < -10) return <TrendingDown className="h-4 w-4 text-red-500" />
    return null
  }

  const getComparisonText = (value: number) => {
    if (value > 0) return `+${value}% above team average`
    if (value < 0) return `${value}% below team average`
    return "Same as team average"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">User Journey</h2>
          <p className="text-sm text-muted-foreground">
            Detailed activity timeline and analytics for {journeyData.userName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nudges</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {journeyData.stats.nudgesCompleted}/{journeyData.stats.nudgesCompleted + journeyData.stats.nudgesMissed}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getComparisonIcon(journeyData.comparisonToTeam.nudgesCompleted)}
              <span className="ml-1">{getComparisonText(journeyData.comparisonToTeam.nudgesCompleted)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coins Earned</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journeyData.stats.coinsEarned}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getComparisonIcon(journeyData.comparisonToTeam.coinsEarned)}
              <span className="ml-1">{getComparisonText(journeyData.comparisonToTeam.coinsEarned)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journeyData.stats.loginFrequency}/week</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getComparisonIcon(journeyData.comparisonToTeam.engagement)}
              <span className="ml-1">{getComparisonText(journeyData.comparisonToTeam.engagement)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{journeyData.stats.averageSentiment.toFixed(1)}/10</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getComparisonIcon(journeyData.comparisonToTeam.sentiment)}
              <span className="ml-1">{getComparisonText(journeyData.comparisonToTeam.sentiment)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="comparison">Team Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>User's activity over the past {timeRange} days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {currentEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-8">
                    {index < currentEvents.length - 1 && (
                      <div className="absolute left-4 top-6 bottom-0 w-px bg-border" />
                    )}
                    <div className="absolute left-0 top-1 rounded-full bg-background p-1 shadow-sm ring-1 ring-border">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                        <Clock className="ml-2 h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredEvents.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-center text-muted-foreground">
                      No activity data available for this time period.
                    </p>
                  </div>
                )}
              </div>

              {filteredEvents.length > eventsPerPage && (
                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed metrics and trends for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Nudge Completion Rate</h4>
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <PieChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Login Frequency</h4>
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sentiment Trend</h4>
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Coins Earned Over Time</h4>
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Comparison</CardTitle>
              <CardDescription>How this user compares to team averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Performance Metrics</h4>
                  <div className="h-60 w-full bg-muted rounded-md flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Engagement Comparison</h4>
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sentiment Comparison</h4>
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
