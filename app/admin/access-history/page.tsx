"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, RefreshCw, AlertTriangle } from "lucide-react"
import { mockAccessHistory } from "@/lib/models/access-history"
import { useAuth } from "@/contexts/auth-context"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AccessHistoryPage() {
  const { hasPermission } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Check permission
  if (!hasPermission("view_access_history")) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to view access history.</p>
        </div>
      </MainLayout>
    )
  }

  // Filter sessions based on search term and filters
  const filteredSessions = mockAccessHistory.filter((session) => {
    const matchesSearch =
      searchTerm === "" ||
      session.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.location && session.location.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || session.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "ended":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "expired":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "suspicious":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <MainLayout>
      <AdminHeader title="Access History" description="Track user login sessions and device information" />

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search sessions..."
                className="w-full rounded-md pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="suspicious">Suspicious</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh sessions</span>
            </Button>

            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Access Sessions</CardTitle>
            <CardDescription>
              Showing {filteredSessions.length} of {mockAccessHistory.length} sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Logout Time</TableHead>
                    <TableHead>Device / Location</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="font-medium">{session.userEmail}</div>
                        <div className="text-xs text-muted-foreground">{session.userId}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {new Date(session.loginTime).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {session.logoutTime ? new Date(session.logoutTime).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{session.device}</div>
                        <div className="text-xs text-muted-foreground">{session.location || "Unknown location"}</div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{session.ip}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(session.status)}>
                          {session.status === "suspicious" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
