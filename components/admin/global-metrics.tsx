import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, CheckCircle, Coins, Star, Tag, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react"

interface GlobalMetricsProps {
  data: {
    totalUsers: number
    activeUsers: number
    totalNudgesSent: number
    totalNudgesCompleted: number
    coinsDistributed: number
    premiumNudgesUsed: number
    tagsReceived: number
    tagsSent: number
    averageSentiment: number
    needsAttention: number
  }
}

export function GlobalMetrics({ data }: GlobalMetricsProps) {
  const activePercentage = Math.round((data.activeUsers / data.totalUsers) * 100)
  const completionRate = Math.round((data.totalNudgesCompleted / data.totalNudgesSent) * 100)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Global Metrics Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span>Active</span>
                  <span>{activePercentage}%</span>
                </div>
                <Progress value={activePercentage} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nudges</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalNudgesSent.toLocaleString()}</div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span>Completion Rate</span>
                  <span>{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coins Distributed</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.coinsDistributed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg. {Math.round(data.coinsDistributed / data.totalUsers)} per user
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Nudges</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.premiumNudgesUsed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((data.premiumNudgesUsed / data.totalNudgesSent) * 100)}% of total nudges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peer Tagging</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.tagsSent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round(data.tagsSent / data.totalUsers)} tags per user</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.averageSentiment.toFixed(1)}/10</div>
            <div className="mt-2">
              <Progress
                value={data.averageSentiment * 10}
                className="h-1"
                indicatorColor={
                  data.averageSentiment >= 7
                    ? "bg-green-500"
                    : data.averageSentiment >= 5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.needsAttention.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((data.needsAttention / data.totalUsers) * 100)}% of users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 30 Days</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-10 w-full">
              <div className="flex h-8 items-end gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-primary w-1.5"
                    style={{
                      height: `${Math.max(10, Math.floor(Math.random() * 100))}%`,
                      opacity: 0.1 + (i / 30) * 0.9,
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
