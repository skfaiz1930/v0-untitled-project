import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export default function Analytics() {
  const userTypeData = [
    { name: "Senior Executives", value: 156, color: "#8884d8" },
    { name: "Middle Managers", value: 247, color: "#83a6ed" },
    { name: "Team Leaders", value: 198, color: "#8dd1e1" },
    { name: "HR Professionals", value: 124, color: "#82ca9d" },
    { name: "Other Roles", value: 98, color: "#a4de6c" },
  ]

  const engagementData = [
    { name: "Welcome", delivered: 823, read: 780, feedback: 312 },
    { name: "Morning Brief", delivered: 823, read: 756, feedback: 289 },
    { name: "Session 1", delivered: 823, read: 720, feedback: 267 },
    { name: "Session 2", delivered: 823, read: 698, feedback: 245 },
    { name: "Session 3", delivered: 823, read: 685, feedback: 230 },
    { name: "Closing", delivered: 823, read: 710, feedback: 275 },
  ]

  const userTypeEngagementData = [
    { name: "Senior Executives", readRate: 92, feedbackRate: 45 },
    { name: "Middle Managers", readRate: 88, feedbackRate: 37 },
    { name: "Team Leaders", readRate: 85, feedbackRate: 32 },
    { name: "HR Professionals", readRate: 90, feedbackRate: 41 },
    { name: "Other Roles", readRate: 78, feedbackRate: 28 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track message delivery, engagement, and feedback rates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,938</div>
            <p className="text-xs text-muted-foreground">+12% from previous event</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <Progress value={96.8} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.3%</div>
            <Progress value={82.3} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.7%</div>
            <Progress value={34.7} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="by-message">By Message</TabsTrigger>
          <TabsTrigger value="by-user-type">By User Type</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Message Engagement</CardTitle>
                <CardDescription>Delivery, read, and feedback rates by message</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="delivered" fill="#8884d8" name="Delivered" />
                    <Bar dataKey="read" fill="#82ca9d" name="Read" />
                    <Bar dataKey="feedback" fill="#ffc658" name="Feedback" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Type Distribution</CardTitle>
                <CardDescription>Breakdown of delegates by user type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement by User Type</CardTitle>
              <CardDescription>Read and feedback rates across different user types</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userTypeEngagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="readRate" fill="#82ca9d" name="Read Rate (%)" />
                  <Bar dataKey="feedbackRate" fill="#ffc658" name="Feedback Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-message">
          <Card>
            <CardHeader>
              <CardTitle>Message Performance</CardTitle>
              <CardDescription>Detailed analytics for each message sent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {engagementData.map((message, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{message.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString()} {index % 2 === 0 ? "08:00 AM" : "02:30 PM"}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Delivered</span>
                        <span>
                          {message.delivered} ({((message.delivered / 823) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={(message.delivered / 823) * 100} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Read</span>
                        <span>
                          {message.read} ({((message.read / 823) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={(message.read / 823) * 100} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Feedback</span>
                        <span>
                          {message.feedback} ({((message.feedback / 823) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={(message.feedback / 823) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-user-type">
          <Card>
            <CardHeader>
              <CardTitle>User Type Analysis</CardTitle>
              <CardDescription>Engagement metrics broken down by user type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {userTypeEngagementData.map((userType, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium">{userType.name}</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Read Rate</span>
                          <span>{userType.readRate}%</span>
                        </div>
                        <Progress value={userType.readRate} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Feedback Rate</span>
                          <span>{userType.feedbackRate}%</span>
                        </div>
                        <Progress value={userType.feedbackRate} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analysis</CardTitle>
              <CardDescription>Analysis of feedback received from delegates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">Positive Feedback</h4>
                    <div className="text-2xl font-bold text-green-500">78%</div>
                    <Progress value={78} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Negative Feedback</h4>
                    <div className="text-2xl font-bold text-red-500">22%</div>
                    <Progress value={22} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Feedback by Session</h4>
                  <div className="space-y-4">
                    {engagementData.map((session, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{session.name}</span>
                          <span>{Math.floor(Math.random() * 30) + 70}% positive</span>
                        </div>
                        <Progress
                          value={Math.floor(Math.random() * 30) + 70}
                          className="h-2 bg-gray-200"
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                    ))}
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
