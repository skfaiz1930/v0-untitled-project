"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Award, Calendar, Search, TrendingUp, TrendingDown, Minus, Crown, Medal, Clock } from "lucide-react"
import { mockLeaderboardData } from "@/lib/mock-data"

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("overall")
  const [timeFrame, setTimeFrame] = useState("all-time")
  const [searchQuery, setSearchQuery] = useState("")
  const [leaderboardData] = useState(mockLeaderboardData)

  const filteredData = leaderboardData.filter((user) => {
    // Filter by company or overall
    if (activeTab === "company" && !user.isInMyCompany) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !user.company.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Sort by points
  const sortedData = [...filteredData].sort((a, b) => b.points - a.points)

  // Add rank to each user
  const rankedData = sortedData.map((user, index) => ({
    ...user,
    rank: index + 1,
  }))

  // Find current user
  const currentUser = rankedData.find((user) => user.isCurrentUser)

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank against other managers</p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search users or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8"
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="overall" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <TabsList>
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>

            <div className="mt-4 md:mt-0 flex space-x-2">
              <Button
                variant={timeFrame === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFrame("weekly")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Weekly
              </Button>
              <Button
                variant={timeFrame === "all-time" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFrame("all-time")}
              >
                <Clock className="h-4 w-4 mr-2" />
                All Time
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab}>
            {currentUser && (
              <Card className="mb-4 border-primary/50 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold mr-4">
                        {currentUser.rank}
                      </div>
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{currentUser.name}</p>
                          <Badge variant="outline" className="ml-2">
                            You
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{currentUser.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-6">
                        {currentUser.rankChange < 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : currentUser.rankChange > 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <Minus className="h-4 w-4 text-gray-500 mr-1" />
                        )}
                        <span
                          className={`text-sm ${
                            currentUser.rankChange < 0
                              ? "text-green-500"
                              : currentUser.rankChange > 0
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                        >
                          {currentUser.rankChange === 0
                            ? "No change"
                            : currentUser.rankChange < 0
                              ? `+${Math.abs(currentUser.rankChange)}`
                              : `-${currentUser.rankChange}`}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-primary mr-2" />
                        <span className="font-bold text-lg">{currentUser.points}</span>
                        <span className="text-sm text-muted-foreground ml-1">pts</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>{activeTab === "overall" ? "Overall Leaderboard" : "Company Leaderboard"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {rankedData.slice(0, 10).map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-3 rounded-md ${
                        user.isCurrentUser ? "bg-primary/5 border border-primary/50" : "hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 ${
                            user.rank === 1
                              ? "bg-amber-500"
                              : user.rank === 2
                                ? "bg-gray-400"
                                : user.rank === 3
                                  ? "bg-amber-700"
                                  : "bg-gray-200 dark:bg-gray-700"
                          } text-white font-bold`}
                        >
                          {user.rank === 1 ? (
                            <Crown className="h-4 w-4" />
                          ) : user.rank === 2 || user.rank === 3 ? (
                            <Medal className="h-4 w-4" />
                          ) : (
                            user.rank
                          )}
                        </div>
                        <Avatar className="h-8 w-8 mr-4">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{user.name}</p>
                            {user.isCurrentUser && (
                              <Badge variant="outline" className="ml-2">
                                You
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{user.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          {user.rankChange < 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : user.rankChange > 0 ? (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          ) : (
                            <Minus className="h-4 w-4 text-gray-500 mr-1" />
                          )}
                          <span
                            className={`text-xs ${
                              user.rankChange < 0
                                ? "text-green-500"
                                : user.rankChange > 0
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }`}
                          >
                            {user.rankChange === 0
                              ? "-"
                              : user.rankChange < 0
                                ? `+${Math.abs(user.rankChange)}`
                                : `-${user.rankChange}`}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-primary mr-2" />
                          <span className="font-bold">{user.points}</span>
                          <span className="text-xs text-muted-foreground ml-1">pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
