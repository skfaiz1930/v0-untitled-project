"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GlobalMetrics } from "@/components/admin/global-metrics"
import { UserManagementTable } from "@/components/admin/user-management-table"
import { ActionCenter } from "@/components/admin/action-center"
import { ReportsSection } from "@/components/admin/reports-section"
import { UserJourneyViewer } from "@/components/admin/user-journey-viewer"
import { AdminHeader } from "@/components/admin/admin-header"
import { mockAdminData } from "@/lib/mock-admin-data"

export default function AdminDashboardPage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <MainLayout>
      <AdminHeader />

      <div className="space-y-6">
        <GlobalMetrics data={mockAdminData.globalMetrics} />

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
            <TabsTrigger value="journey">Journey</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-6">
            <UserManagementTable
              users={mockAdminData.users}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              onViewJourney={(userId) => {
                setSelectedUser(userId)
                document
                  .querySelector('[data-value="journey"]')
                  ?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
              }}
            />
          </TabsContent>

          <TabsContent value="actions" className="mt-6">
            <ActionCenter
              selectedUsers={selectedUsers}
              users={mockAdminData.users.filter((user) => selectedUsers.includes(user.id))}
            />
          </TabsContent>

          <TabsContent value="journey" className="mt-6">
            <UserJourneyViewer
              userId={selectedUser}
              journeyData={mockAdminData.userJourneys.find((j) => j.userId === selectedUser)}
            />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <ReportsSection reports={mockAdminData.availableReports} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
