import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UsersIcon, MessageSquareIcon, CheckCircleIcon, ClockIcon } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Delegates</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">823</div>
          <p className="text-xs text-muted-foreground">20 user types identified</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
          <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,468</div>
          <p className="text-xs text-muted-foreground">3 messages per delegate on average</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">96.8%</div>
          <div className="mt-2">
            <Progress value={96.8} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">82.3%</div>
          <div className="mt-2">
            <Progress value={82.3} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Broadcasts</CardTitle>
          <CardDescription>Scheduled messages for the next 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Welcome Message</p>
                <p className="text-sm text-muted-foreground">Today at 7:00 PM • 823 recipients</p>
              </div>
              <div className="text-sm font-medium text-green-500">Ready</div>
            </div>

            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Day 1 Morning Brief</p>
                <p className="text-sm text-muted-foreground">Tomorrow at 8:00 AM • 823 recipients</p>
              </div>
              <div className="text-sm font-medium text-amber-500">Pending Content</div>
            </div>

            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Session 1 Summary</p>
                <p className="text-sm text-muted-foreground">Tomorrow at 10:30 AM • 823 recipients</p>
              </div>
              <div className="text-sm font-medium text-amber-500">Pending Content</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>User Type Distribution</CardTitle>
          <CardDescription>Breakdown of delegates by user type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "Senior Executives", count: 156, percentage: 19 },
              { type: "Middle Managers", count: 247, percentage: 30 },
              { type: "Team Leaders", count: 198, percentage: 24 },
              { type: "HR Professionals", count: 124, percentage: 15 },
              { type: "Other Roles", count: 98, percentage: 12 },
            ].map((item) => (
              <div key={item.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{item.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.count} ({item.percentage}%)
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
