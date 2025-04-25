"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "@/components/dashboard"
import ContentGenerator from "@/components/content-generator"
import TestMessaging from "@/components/test-messaging"
import BulkMessaging from "@/components/bulk-messaging"
import Analytics from "@/components/analytics"
import RecentActivity from "@/components/recent-activity"
import UsersList from "@/components/users-list"

export default function TabsWrapper() {
  return (
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
  )
}
