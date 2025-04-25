import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "@/components/dashboard"
import ContentGenerator from "@/components/content-generator"
import TestMessaging from "@/components/test-messaging"
import BulkMessaging from "@/components/bulk-messaging"
import Analytics from "@/components/analytics"
import RecentActivity from "@/components/recent-activity"
import UsersList from "@/components/users-list"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">GML Summit WhatsApp Engagement Bot</h1>
          <p className="text-muted-foreground">
            Manage content generation, testing, and message delivery for the Great Managers League Summit 2025
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid grid-cols-7 w-full md:w-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="test">Test</TabsTrigger>
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <ContentGenerator />
          </TabsContent>

          <TabsContent value="test" className="space-y-4">
            <TestMessaging />
          </TabsContent>

          <TabsContent value="send" className="space-y-4">
            <BulkMessaging />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Analytics />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <RecentActivity />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <UsersList />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
