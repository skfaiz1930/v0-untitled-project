"use client"

import type React from "react"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Mail, User, Briefcase, MessageSquare, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockTeamMembers } from "@/lib/mock-data"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  nudgesCompleted?: number
  nudgesTagged?: number
  lastActive?: string
}

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    mockTeamMembers.map((member) => ({
      ...member,
      nudgesCompleted: Math.floor(Math.random() * 20),
      nudgesTagged: Math.floor(Math.random() * 15),
      lastActive: ["Today", "Yesterday", "3 days ago", "1 week ago", "2 weeks ago"][Math.floor(Math.random() * 5)],
    })),
  )
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Filter team members based on search query and active tab
  const filteredMembers = teamMembers.filter((member) => {
    // Filter by search query
    if (
      searchQuery &&
      !member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !member.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !member.role.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by active tab (in a real app, you would have more data to filter by)
    if (activeTab === "active" && member.lastActive !== "Today" && member.lastActive !== "Yesterday") {
      return false
    }

    return true
  })

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember({ ...newMember, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleEditMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingMember) return

    const { name, value } = e.target
    setEditingMember({ ...editingMember, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateMemberForm = (member: { name: string; email: string; role: string }) => {
    const newErrors: Record<string, string> = {}

    if (!member.name) newErrors.name = "Name is required"
    if (!member.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(member.email)) newErrors.email = "Email is invalid"
    if (!member.role) newErrors.role = "Role is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddMember = () => {
    if (!validateMemberForm(newMember)) return

    const member: TeamMember = {
      id: `member-${Date.now()}`,
      ...newMember,
      nudgesCompleted: 0,
      nudgesTagged: 0,
      lastActive: "Today",
    }

    setTeamMembers([...teamMembers, member])
    setNewMember({ name: "", email: "", role: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditMember = () => {
    if (!editingMember || !validateMemberForm(editingMember)) return

    setTeamMembers(teamMembers.map((member) => (member.id === editingMember.id ? editingMember : member)))

    setEditingMember(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteMember = () => {
    if (!memberToDelete) return

    setTeamMembers(teamMembers.filter((member) => member.id !== memberToDelete))
    setMemberToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
            <p className="text-muted-foreground">Manage your team and track their progress</p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex items-center space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>Add a new team member to your leadership nudge platform.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="pl-10"
                        value={newMember.name}
                        onChange={handleNewMemberChange}
                      />
                    </div>
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        value={newMember.email}
                        onChange={handleNewMemberChange}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="role"
                        name="role"
                        placeholder="Developer, Designer, etc."
                        className="pl-10"
                        value={newMember.role}
                        onChange={handleNewMemberChange}
                      />
                    </div>
                    {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMember}>Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>{activeTab === "all" ? "All Team Members" : "Active Team Members"}</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredMembers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">No team members found</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      {searchQuery ? "Try a different search term" : "Add team members to start collaborating"}
                    </p>
                    <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center mb-4 md:mb-0">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{member.name}</h3>
                              {member.lastActive === "Today" && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                  Active Today
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center text-sm text-muted-foreground">
                              <span>{member.email}</span>
                              <span className="hidden md:inline mx-2">•</span>
                              <span>{member.role}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm">{member.nudgesCompleted} nudges</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 text-primary mr-1" />
                            <span className="text-sm">{member.nudgesTagged} tags</span>
                          </div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="text-xs">
                              {member.lastActive}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-2 ml-auto">
                            <Dialog
                              open={isEditDialogOpen && editingMember?.id === member.id}
                              onOpenChange={(open) => {
                                setIsEditDialogOpen(open)
                                if (!open) setEditingMember(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setEditingMember(member)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Team Member</DialogTitle>
                                  <DialogDescription>Update team member information.</DialogDescription>
                                </DialogHeader>
                                {editingMember && (
                                  <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-name">Full Name</Label>
                                      <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                          id="edit-name"
                                          name="name"
                                          placeholder="John Doe"
                                          className="pl-10"
                                          value={editingMember.name}
                                          onChange={handleEditMemberChange}
                                        />
                                      </div>
                                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-email">Email Address</Label>
                                      <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                          id="edit-email"
                                          name="email"
                                          type="email"
                                          placeholder="john@example.com"
                                          className="pl-10"
                                          value={editingMember.email}
                                          onChange={handleEditMemberChange}
                                        />
                                      </div>
                                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-role">Role</Label>
                                      <div className="relative">
                                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                          id="edit-role"
                                          name="role"
                                          placeholder="Developer, Designer, etc."
                                          className="pl-10"
                                          value={editingMember.role}
                                          onChange={handleEditMemberChange}
                                        />
                                      </div>
                                      {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditMember}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Dialog
                              open={isDeleteDialogOpen && memberToDelete === member.id}
                              onOpenChange={(open) => {
                                setIsDeleteDialogOpen(open)
                                if (!open) setMemberToDelete(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setMemberToDelete(member.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Team Member</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove this team member? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 my-4">
                                  <Avatar className="h-10 w-10 mr-4">
                                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium">{member.name}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <span>{member.email}</span>
                                      <span className="mx-2">•</span>
                                      <span>{member.role}</span>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={handleDeleteMember}>
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
