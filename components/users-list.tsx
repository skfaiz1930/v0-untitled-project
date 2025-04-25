"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  User,
  MoreHorizontal,
  CheckCircle,
  Tag,
  UserCog,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import SendMessageModal from "./send-message-modal"
import TagManagementModal from "./tag-management-modal"
import CategoryChangeModal from "./category-change-modal"

export default function UsersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const { toast } = useToast()

  const itemsPerPage = 10

  // Available tags
  const availableTags = [
    "VIP",
    "Speaker",
    "Early Bird",
    "Sponsor",
    "International",
    "Local",
    "First-time",
    "Returning",
    "Leadership Track",
    "Technical Track",
    "HR Track",
    "Networking Focus",
    "Workshop Attendee",
    "Panel Moderator",
    "Special Diet",
    "Accommodation Required",
  ]

  // User types
  const userTypes = [
    "Senior Executives",
    "Middle Managers",
    "Team Leaders",
    "HR Professionals",
    "Technical Managers",
    "First-time Attendees",
    "Returning Attendees",
    "Speakers",
    "Sponsors",
    "VIPs",
  ]

  // Mock user data
  const generateMockUsers = () => {
    const cities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Lucknow",
    ]

    const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Bengali", "Marathi", "Gujarati"]

    const interests = [
      "Leadership",
      "Innovation",
      "Team Building",
      "Digital Transformation",
      "AI & ML",
      "Career Development",
      "Work-Life Balance",
      "Sustainability",
    ]

    const users = []

    for (let i = 1; i <= 50; i++) {
      const firstName = ["Amit", "Priya", "Rahul", "Neha", "Vikram", "Anjali", "Raj", "Meera", "Sanjay", "Divya"][
        Math.floor(Math.random() * 10)
      ]
      const lastName = ["Sharma", "Patel", "Singh", "Gupta", "Kumar", "Reddy", "Joshi", "Verma", "Malhotra", "Iyer"][
        Math.floor(Math.random() * 10)
      ]

      // Generate random tags for each user
      const numTags = Math.floor(Math.random() * 3) + 1
      const userTags = []
      for (let j = 0; j < numTags; j++) {
        const randomTag = availableTags[Math.floor(Math.random() * availableTags.length)]
        if (!userTags.includes(randomTag)) {
          userTags.push(randomTag)
        }
      }

      users.push({
        id: `USR${1000 + i}`,
        name: `${firstName} ${lastName}`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        userType: userTypes[Math.floor(Math.random() * userTypes.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        language: languages[Math.floor(Math.random() * languages.length)],
        interests: [
          interests[Math.floor(Math.random() * interests.length)],
          interests[Math.floor(Math.random() * interests.length)],
        ].filter((v, i, a) => a.indexOf(v) === i), // Remove duplicates
        tags: userTags,
        messagesDelivered: Math.floor(Math.random() * 5),
        messagesRead: Math.floor(Math.random() * 5),
        lastActive:
          Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)) : null,
      })
    }

    return users
  }

  const users = generateMockUsers()

  // Get user tags map
  const getUserTagsMap = () => {
    const tagsMap: Record<string, string[]> = {}

    users.forEach((user) => {
      tagsMap[user.id] = user.tags || []
    })

    return tagsMap
  }

  // Filter users based on search query, user type filter, and tag filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesUserType = userTypeFilter === "all" || user.userType === userTypeFilter

    const matchesTag = tagFilter === "all" || (user.tags && user.tags.includes(tagFilter))

    return matchesSearch && matchesUserType && matchesTag
  })

  // Paginate users
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle checkbox selection
  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id))
    }
  }

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return "Never"
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get user types for selected users
  const getSelectedUserTypes = () => {
    const userTypesMap: Record<string, string> = {}

    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId)
      if (user) {
        userTypesMap[userId] = user.userType
      }
    })

    return userTypesMap
  }

  // Handle message send
  const handleMessageSend = (data: any) => {
    // In a real app, this would send the message via an API
    console.log("Sending message:", data)

    // Show success toast
    toast({
      title: data.scheduled ? "Message Scheduled" : "Message Sent",
      description: data.scheduled
        ? `Message scheduled to ${data.recipients.length} recipients for ${new Date(data.scheduledTime).toLocaleString()}`
        : `Message sent successfully to ${data.recipients.length} recipients`,
      variant: "success",
    })

    // Clear selection after sending
    setSelectedUsers([])
  }

  // Handle tag management
  const handleTagManagement = (data: any) => {
    // In a real app, this would update tags via an API
    console.log("Managing tags:", data)

    // Show success toast
    toast({
      title: data.action === "add" ? "Tags Added" : "Tags Removed",
      description: `Successfully ${data.action === "add" ? "added" : "removed"} ${data.tags.length} ${
        data.tags.length === 1 ? "tag" : "tags"
      } for ${data.users.length} ${data.users.length === 1 ? "user" : "users"}`,
      variant: "success",
    })
  }

  // Handle category change
  const handleCategoryChange = (data: any) => {
    // In a real app, this would update categories via an API
    console.log("Changing category:", data)

    // Show success toast
    toast({
      title: "Category Updated",
      description: `Successfully updated category to "${data.category}" for ${data.users.length} ${
        data.users.length === 1 ? "user" : "users"
      }`,
      variant: "success",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage and view all delegates</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2" disabled={selectedUsers.length === 0}>
                Bulk Actions
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsMessageModalOpen(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsTagModalOpen(true)}>
                <Tag className="h-4 w-4 mr-2" />
                Manage Tags
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsCategoryModalOpen(true)}>
                <UserCog className="h-4 w-4 mr-2" />
                Change Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <CardTitle>All Delegates</CardTitle>
              <CardDescription>
                {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} found
                {userTypeFilter !== "all" && ` in ${userTypeFilter}`}
                {tagFilter !== "all" && ` with tag "${tagFilter}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full sm:w-[250px]"
                />
              </div>

              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All User Types</SelectItem>
                  {userTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by tag" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedUsers.length > 0 && (
            <div className="bg-primary/5 rounded-md p-3 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {selectedUsers.length} {selectedUsers.length === 1 ? "user" : "users"} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setSelectedUsers([])}>
                  Clear Selection
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm">
                      Actions
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsMessageModalOpen(true)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsTagModalOpen(true)}>
                      <Tag className="h-4 w-4 mr-2" />
                      Manage Tags
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsCategoryModalOpen(true)}>
                      <UserCog className="h-4 w-4 mr-2" />
                      Change Category
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>User Type</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.userType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.tags && user.tags.length > 0 ? (
                        user.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">No tags</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{user.messagesDelivered} sent</span>
                      <span className="text-xs text-muted-foreground">{user.messagesRead} read</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUsers([user.id])
                            setIsMessageModalOpen(true)
                          }}
                        >
                          Send Test Message
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUsers([user.id])
                            setIsTagModalOpen(true)
                          }}
                        >
                          Manage Tags
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Remove User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

              {paginatedUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)}-
            {Math.min(filteredUsers.length, currentPage * itemsPerPage)} of {filteredUsers.length} users
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <SendMessageModal
        open={isMessageModalOpen}
        onOpenChange={setIsMessageModalOpen}
        selectedUsers={selectedUsers}
        userTypes={getSelectedUserTypes()}
        onSend={handleMessageSend}
      />

      <TagManagementModal
        open={isTagModalOpen}
        onOpenChange={setIsTagModalOpen}
        selectedUsers={selectedUsers}
        userTags={getUserTagsMap()}
        availableTags={availableTags}
        onSave={handleTagManagement}
      />

      <CategoryChangeModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        selectedUsers={selectedUsers}
        userTypes={userTypes}
        onSave={handleCategoryChange}
      />
    </div>
  )
}
