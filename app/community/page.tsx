"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Users, Award, Flame, Bell, Filter, MessageSquare } from "lucide-react"
import { CommunityFeed } from "@/components/community/community-feed"
import { CreatePostDialog } from "@/components/community/create-post-dialog"
import { TrendingTopics } from "@/components/community/trending-topics"
import { CommunityLeaderboard } from "@/components/community/community-leaderboard"
import { useGamification } from "@/contexts/gamification-context"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const { level, streak } = useGamification()

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Community</h1>
            <p className="text-muted-foreground">Connect, share, and grow with your leadership community</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowCreatePost(true)}>Create Post</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Activity Feed</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="badges">
                      <Award className="h-4 w-4 mr-1" />
                      Badges
                    </TabsTrigger>
                    <TabsTrigger value="levels">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Levels
                    </TabsTrigger>
                    <TabsTrigger value="nudges">
                      <Bell className="h-4 w-4 mr-1" />
                      Nudges
                    </TabsTrigger>
                    <TabsTrigger value="streaks">
                      <Flame className="h-4 w-4 mr-1" />
                      Streaks
                    </TabsTrigger>
                    <TabsTrigger value="praise">
                      <Users className="h-4 w-4 mr-1" />
                      Praise
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <CommunityFeed activeTab={activeTab} searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TrendingTopics />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommunityLeaderboard />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Community Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-3 bg-primary/5">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-primary/10">
                      Active Challenge
                    </Badge>
                    <Badge>3 days left</Badge>
                  </div>
                  <h3 className="font-medium">Team Recognition Week</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Recognize at least 3 team members this week and earn a special badge!
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">1</span> / 3 completed
                    </div>
                    <Button size="sm" variant="outline">
                      Join Challenge
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                  <h3 className="font-medium">Feedback Excellence</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Practice giving constructive feedback to improve team performance.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline">
                      Get Notified
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <CreatePostDialog open={showCreatePost} onOpenChange={setShowCreatePost} />
      </div>
    </MainLayout>
  )
}
