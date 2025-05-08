"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, Search, Upload, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockTeamMembers } from "@/lib/mock-data"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

interface AddTeamMembersProps {
  surveyData: any
  updateSurveyData: (data: any) => void
}

export default function AddTeamMembers({ surveyData, updateSurveyData }: AddTeamMembersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>(surveyData.teamMembers || [])
  const [availableMembers, setAvailableMembers] = useState<TeamMember[]>([])
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    // Filter out already selected members
    const selectedIds = selectedMembers.map((member) => member.id)
    const filtered = mockTeamMembers.filter((member) => !selectedIds.includes(member.id))
    setAvailableMembers(filtered)
  }, [selectedMembers])

  useEffect(() => {
    // Update parent component with selected members
    updateSurveyData({ teamMembers: selectedMembers })
  }, [selectedMembers, updateSurveyData])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMembers((prev) => [...prev, member])
  }

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers((prev) => prev.filter((member) => member.id !== memberId))
  }

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember({ ...newMember, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleAddNewMember = () => {
    const newErrors: Record<string, string> = {}

    if (!newMember.name) newErrors.name = "Name is required"
    if (!newMember.email) newErrors.email = "Email is required"
    else if (!validateEmail(newMember.email)) newErrors.email = "Email is invalid"
    if (!newMember.role) newErrors.role = "Role is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newTeamMember: TeamMember = {
      id: `member-${Date.now()}`,
      ...newMember,
    }

    setSelectedMembers((prev) => [...prev, newTeamMember])
    setNewMember({ name: "", email: "", role: "" })
    setErrors({})
  }

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setSelectedMembers([])
    } else {
      // Select all available members
      const allMembers = [...selectedMembers, ...availableMembers]
      setSelectedMembers(allMembers)
    }
    setSelectAll(!selectAll)
  }

  const filteredMembers = availableMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search team members..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>Add a new team member to include in your survey.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={newMember.name}
                      onChange={handleNewMemberChange}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={newMember.email}
                      onChange={handleNewMemberChange}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="Developer, Designer, etc."
                      value={newMember.role}
                      onChange={handleNewMemberChange}
                    />
                    {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddNewMember}>Add Member</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="select-all" checked={selectAll} onCheckedChange={handleSelectAll} />
          <Label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </Label>
        </div>

        <div className="border rounded-md">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="font-medium">Available Team Members</h3>
          </div>
          <div className="p-4 max-h-60 overflow-y-auto">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                {searchQuery ? "No team members found matching your search" : "No team members available"}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => handleSelectMember(member)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Selected Team Members ({selectedMembers.length})</h3>
          {selectedMembers.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={() => setSelectedMembers([])}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove All
            </Button>
          )}
        </div>

        {selectedMembers.length === 0 ? (
          <div className="border rounded-md p-8 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-muted p-2">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-sm font-medium mb-1">No team members selected</h3>
            <p className="text-xs text-muted-foreground">
              Select team members from the list above or add new members to include in your survey.
            </p>
          </div>
        ) : (
          <div className="border rounded-md divide-y">
            {selectedMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{member.email}</span>
                      <span className="mx-2">•</span>
                      <span>{member.role}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
