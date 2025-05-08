"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Search, Shield, Save } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { AdminHeader } from "@/components/admin/admin-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock permissions data
const mockPermissions = [
  {
    id: "perm-1",
    name: "view_own_profile",
    description: "View own user profile",
    category: "user",
    roles: {
      user: true,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-2",
    name: "complete_nudges",
    description: "Complete assigned nudges",
    category: "nudges",
    roles: {
      user: true,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-3",
    name: "view_leaderboard",
    description: "View the leaderboard",
    category: "gamification",
    roles: {
      user: true,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-4",
    name: "view_department_users",
    description: "View users in own department",
    category: "user",
    roles: {
      user: false,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-5",
    name: "assign_nudges",
    description: "Assign nudges to users",
    category: "nudges",
    roles: {
      user: false,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-6",
    name: "view_department_reports",
    description: "View reports for own department",
    category: "reports",
    roles: {
      user: false,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-7",
    name: "add_coins",
    description: "Add coins to users",
    category: "gamification",
    roles: {
      user: false,
      department_admin: true,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-8",
    name: "view_all_users",
    description: "View all users in the system",
    category: "user",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-9",
    name: "view_all_reports",
    description: "View all reports in the system",
    category: "reports",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-10",
    name: "grant_premium",
    description: "Grant premium access to users",
    category: "user",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-11",
    name: "revoke_access",
    description: "Revoke user access",
    category: "user",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-12",
    name: "view_audit_logs",
    description: "View system audit logs",
    category: "admin",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: true,
      super_admin: true,
    },
  },
  {
    id: "perm-13",
    name: "manage_admins",
    description: "Manage admin users",
    category: "admin",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: false,
      super_admin: true,
    },
  },
  {
    id: "perm-14",
    name: "manage_permissions",
    description: "Manage system permissions",
    category: "admin",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: false,
      super_admin: true,
    },
  },
  {
    id: "perm-15",
    name: "view_access_history",
    description: "View user access history",
    category: "admin",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: false,
      super_admin: true,
    },
  },
  {
    id: "perm-16",
    name: "system_settings",
    description: "Modify system settings",
    category: "admin",
    roles: {
      user: false,
      department_admin: false,
      hr_admin: false,
      super_admin: true,
    },
  },
]

// Mock admin users
const mockAdminUsers = [
  {
    id: "admin-1",
    name: "John Admin",
    email: "admin@example.com",
    role: "super_admin",
    department: "Executive",
    lastActive: "Today, 10:30 AM",
  },
  {
    id: "admin-2",
    name: "Jane HR",
    email: "hr@example.com",
    role: "hr_admin",
    department: "Human Resources",
    lastActive: "Yesterday, 4:15 PM",
  },
  {
    id: "admin-3",
    name: "Mike Manager",
    email: "dept@example.com",
    role: "department_admin",
    department: "Engineering",
    lastActive: "Today, 9:45 AM",
  },
  {
    id: "admin-4",
    name: "Sarah Leader",
    email: "sarah@example.com",
    role: "department_admin",
    department: "Marketing",
    lastActive: "3 days ago",
  },
]

export default function PermissionsPage() {
  const { hasPermission } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [permissions, setPermissions] = useState(mockPermissions)
  const [adminUsers, setAdminUsers] = useState(mockAdminUsers)
  const [activeTab, setActiveTab] = useState("roles")

  // Check permission
  if (!hasPermission("manage_permissions")) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to manage system permissions.</p>
        </div>
      </MainLayout>
    )
  }

  // Filter permissions based on search term and category
  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      searchTerm === "" ||
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || permission.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Filter admin users based on search term
  const filteredAdmins = adminUsers.filter(
    (admin) =>
      searchTerm === "" ||
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get unique categories for filter
  const uniqueCategories = Array.from(new Set(permissions.map((permission) => permission.category)))

  // Handle permission toggle
  const handlePermissionToggle = (permissionId: string, role: string) => {
    setPermissions(
      permissions.map((permission) => {
        if (permission.id === permissionId) {
          return {
            ...permission,
            roles: {
              ...permission.roles,
              [role]: !permission.roles[role as keyof typeof permission.roles],
            },
          }
        }
        return permission
      }),
    )
  }

  // Handle save changes
  const handleSaveChanges = () => {
    // In a real app, this would save to the backend
    console.log("Saving permission changes:", permissions)
    // Show success message
    alert("Permissions saved successfully!")
  }

  return (
    <MainLayout>
      <AdminHeader title="Permissions Management" description="Manage roles and permissions in the system" />

      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="roles">Role Permissions</TabsTrigger>
            <TabsTrigger value="admins">Admin Users</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search permissions..."
                    className="w-full rounded-md pl-8 md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background sm:w-[180px]"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleSaveChanges}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Role-Based Permissions</CardTitle>
                <CardDescription>Configure which permissions are available to each role in the system</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Permission</TableHead>
                        <TableHead className="w-[100px] text-center">User</TableHead>
                        <TableHead className="w-[100px] text-center">Department Admin</TableHead>
                        <TableHead className="w-[100px] text-center">HR Admin</TableHead>
                        <TableHead className="w-[100px] text-center">Super Admin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>
                            <div className="font-medium">
                              {permission.name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </div>
                            <div className="text-xs text-muted-foreground">{permission.description}</div>
                            <Badge variant="outline" className="mt-1">
                              {permission.category.charAt(0).toUpperCase() + permission.category.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={permission.roles.user}
                              onCheckedChange={() => handlePermissionToggle(permission.id, "user")}
                              disabled={["view_own_profile", "complete_nudges"].includes(permission.name)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={permission.roles.department_admin}
                              onCheckedChange={() => handlePermissionToggle(permission.id, "department_admin")}
                              disabled={["view_own_profile", "complete_nudges", "view_leaderboard"].includes(
                                permission.name,
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={permission.roles.hr_admin}
                              onCheckedChange={() => handlePermissionToggle(permission.id, "hr_admin")}
                              disabled={["view_own_profile", "complete_nudges", "view_leaderboard"].includes(
                                permission.name,
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={permission.roles.super_admin}
                              onCheckedChange={() => handlePermissionToggle(permission.id, "super_admin")}
                              disabled={true} // Super admin always has all permissions
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search admin users..."
                  className="w-full rounded-md pl-8 md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button>
                <Shield className="mr-2 h-4 w-4" />
                Add Admin User
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Admin Users</CardTitle>
                <CardDescription>Manage users with administrative privileges</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAdmins.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell className="font-medium">{admin.name}</TableCell>
                          <TableCell>{admin.email}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                admin.role === "super_admin"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                  : admin.role === "hr_admin"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              }
                            >
                              {admin.role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Badge>
                          </TableCell>
                          <TableCell>{admin.department}</TableCell>
                          <TableCell>{admin.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                              Revoke
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
