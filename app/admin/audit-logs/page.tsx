"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, RefreshCw } from "lucide-react"
import { mockAuditLogs, auditLogActions } from "@/lib/models/audit-log"
import { useAuth } from "@/contexts/auth-context"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AuditLogsPage() {
  const { hasPermission } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")

  // Check permission
  if (!hasPermission("view_audit_logs")) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to view audit logs.</p>
        </div>
      </MainLayout>
    )
  }

  // Filter logs based on search term and filters
  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesUser = userFilter === "all" || log.userRole === userFilter

    return matchesSearch && matchesAction && matchesUser
  })

  // Get unique user roles for filter
  const uniqueRoles = Array.from(new Set(mockAuditLogs.map((log) => log.userRole)))

  // Get action badge color
  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case auditLogActions.LOGIN:
      case auditLogActions.LOGOUT:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case auditLogActions.CREATE_USER:
      case auditLogActions.UPDATE_USER:
      case auditLogActions.ASSIGN_ROLE:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case auditLogActions.DELETE_USER:
      case auditLogActions.REVOKE_ROLE:
      case auditLogActions.REVOKE_ACCESS:
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case auditLogActions.ASSIGN_NUDGE:
      case auditLogActions.ADD_COINS:
      case auditLogActions.GRANT_PREMIUM:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case auditLogActions.RESTORE_ACCESS:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case auditLogActions.VIEW_USER_PROFILE:
      case auditLogActions.GENERATE_REPORT:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <MainLayout>
      <AdminHeader title="Audit Logs" description="Track all administrative actions in the system" />

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search logs..."
                className="w-full rounded-md pl-8 md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {Object.values(auditLogActions).map((action) => (
                  <SelectItem key={action} value={action}>
                    {action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {uniqueRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh logs</span>
            </Button>

            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>System Audit Logs</CardTitle>
            <CardDescription>
              Showing {filteredLogs.length} of {mockAuditLogs.length} logs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Target</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="font-medium">{log.userEmail}</div>
                        <div className="text-xs text-muted-foreground">
                          {log.userRole.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getActionBadgeColor(log.action)}>
                          {log.action.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                      <TableCell>
                        {log.targetId ? (
                          <div className="text-xs">
                            <span className="font-medium">{log.targetType}: </span>
                            {log.targetId}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">N/A</span>
                        )}
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
