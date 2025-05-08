"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  MoreHorizontal,
  Bell,
  Coins,
  Star,
  Lock,
  Unlock,
  Eye,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { AssignNudgeDialog } from "@/components/admin/assign-nudge-dialog"
import { AddCoinsDialog } from "@/components/admin/add-coins-dialog"

interface User {
  id: string
  name: string
  team: string
  role: string
  lastActive: string
  nudgesCompleted: number
  nudgesMissed: number
  coinsEarned: number
  tagsReceived: number
  tagsSent: number
  status: "active" | "needs_attention" | "suspended"
  isPremium: boolean
}

interface UserManagementTableProps {
  users: User[]
  selectedUsers: string[]
  setSelectedUsers: (users: string[]) => void
  onViewJourney: (userId: string) => void
}

export function UserManagementTable({
  users,
  selectedUsers,
  setSelectedUsers,
  onViewJourney,
}: UserManagementTableProps) {
  const [filter, setFilter] = useState("all")
  const [showAssignNudge, setShowAssignNudge] = useState(false)
  const [showAddCoins, setShowAddCoins] = useState(false)
  const [targetUser, setTargetUser] = useState<User | null>(null)

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true
    if (filter === "active") return user.status === "active"
    if (filter === "needs_attention") return user.status === "needs_attention"
    if (filter === "suspended") return user.status === "suspended"
    if (filter === "premium") return user.isPremium
    return true
  })

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "needs_attention":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "suspended":
        return <Lock className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "needs_attention":
        return "Needs Attention"
      case "suspended":
        return "Suspended"
      default:
        return status
    }
  }

  const handleAssignNudge = (user: User) => {
    setTargetUser(user)
    setShowAssignNudge(true)
  }

  const handleAddCoins = (user: User) => {
    setTargetUser(user)
    setShowAddCoins(true)
  }

  const handleTogglePremium = (user: User) => {
    // Implementation would go here
    console.log(`Toggle premium for ${user.name}`)
  }

  const handleToggleAccess = (user: User) => {
    // Implementation would go here
    console.log(`Toggle access for ${user.name}`)
  }

  const handleSendReminder = (user: User) => {
    // Implementation would go here
    console.log(`Send reminder to ${user.name}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground">
            {selectedUsers.length} of {users.length} users selected
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="needs_attention">Needs Attention</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="premium">Premium Users</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter by name or team..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[250px]"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Nudges</TableHead>
                  <TableHead>Coins</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {user.team} • {user.role}
                        {user.isPremium && (
                          <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                            <Star className="mr-1 h-3 w-3 text-amber-500" />
                            Premium
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{user.lastActive}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="text-green-600">{user.nudgesCompleted}</span>
                        {" / "}
                        <span className="text-red-600">{user.nudgesMissed}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Coins className="mr-1 h-3 w-3 text-amber-500" />
                        <span className="text-sm">{user.coinsEarned}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="text-blue-600">{user.tagsReceived}</span>
                        {" / "}
                        <span className="text-purple-600">{user.tagsSent}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <span className="ml-1 text-sm">{getStatusText(user.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAssignNudge(user)}>
                            <Bell className="mr-2 h-4 w-4" />
                            Assign Nudge
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddCoins(user)}>
                            <Coins className="mr-2 h-4 w-4" />
                            Add Coins
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTogglePremium(user)}>
                            <Star className="mr-2 h-4 w-4" />
                            {user.isPremium ? "Remove Premium" : "Grant Premium"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleAccess(user)}>
                            {user.status === "suspended" ? (
                              <>
                                <Unlock className="mr-2 h-4 w-4" />
                                Restore Access
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Revoke Access
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSendReminder(user)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onViewJourney(user.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Journey
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showAssignNudge && targetUser && (
        <AssignNudgeDialog user={targetUser} open={showAssignNudge} onOpenChange={setShowAssignNudge} />
      )}

      {showAddCoins && targetUser && (
        <AddCoinsDialog user={targetUser} open={showAddCoins} onOpenChange={setShowAddCoins} />
      )}
    </div>
  )
}
