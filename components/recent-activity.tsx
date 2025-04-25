"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Send,
  Calendar,
  FileText,
  RefreshCw,
  Upload,
  Download,
  Clock,
  Filter,
  Tag,
  UserCog,
} from "lucide-react"

export default function RecentActivity() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "test_message",
      description: "Sent test message to +91 9876543210",
      timestamp: "2025-04-24T13:30:00",
      user: "Faizan",
      details: "Welcome Message template for Senior Executives",
      icon: Send,
    },
    {
      id: 2,
      type: "content_created",
      description: "Created content for Session 1 Summary",
      timestamp: "2025-04-24T12:15:00",
      user: "Maithily",
      details: "Generated 20 versions for different user types",
      icon: FileText,
    },
    {
      id: 3,
      type: "broadcast_scheduled",
      description: "Scheduled broadcast for all delegates",
      timestamp: "2025-04-24T11:45:00",
      user: "Faizan",
      details: "Welcome Message - Scheduled for May 22, 2025 at 7:00 PM",
      icon: Calendar,
    },
    {
      id: 4,
      type: "tags_added",
      description: "Added tags to 15 users",
      timestamp: "2025-04-24T11:15:00",
      user: "Shehbaz",
      details: "Tags: VIP, Speaker, Workshop Attendee",
      icon: Tag,
    },
    {
      id: 5,
      type: "category_changed",
      description: "Changed category for 8 users",
      timestamp: "2025-04-24T10:45:00",
      user: "Rachana",
      details: "New category: Technical Managers",
      icon: UserCog,
    },
    {
      id: 6,
      type: "content_generated",
      description: "Generated personalized content",
      timestamp: "2025-04-24T10:30:00",
      user: "Shehbaz",
      details: "Morning Brief - 20 versions created",
      icon: RefreshCw,
    },
    {
      id: 7,
      type: "user_data_imported",
      description: "Imported user data from CSV",
      timestamp: "2025-04-23T16:20:00",
      user: "Sheshraj",
      details: "823 delegates imported successfully",
      icon: Upload,
    },
    {
      id: 8,
      type: "analytics_exported",
      description: "Exported analytics report",
      timestamp: "2025-04-23T14:10:00",
      user: "Faizan",
      details: "Full engagement report for planning",
      icon: Download,
    },
    {
      id: 9,
      type: "test_message",
      description: "Sent test message to +91 8765432109",
      timestamp: "2025-04-23T11:05:00",
      user: "Maithily",
      details: "Session Notes template for HR Professionals",
      icon: Send,
    },
    {
      id: 10,
      type: "tags_removed",
      description: "Removed tags from 5 users",
      timestamp: "2025-04-23T10:30:00",
      user: "Shehbaz",
      details: "Tags: First-time, Early Bird",
      icon: Tag,
    },
    {
      id: 11,
      type: "broadcast_completed",
      description: "Broadcast completed",
      timestamp: "2025-04-22T19:30:00",
      user: "System",
      details: "Test Broadcast - 50 messages sent, 48 delivered",
      icon: MessageSquare,
    },
    {
      id: 12,
      type: "content_created",
      description: "Created content for Welcome Message",
      timestamp: "2025-04-22T15:45:00",
      user: "Rachana",
      details: "Initial welcome message with event details",
      icon: FileText,
    },
    {
      id: 13,
      type: "template_approved",
      description: "WhatsApp template approved",
      timestamp: "2025-04-22T10:20:00",
      user: "System",
      details: "Welcome Message template approved by WhatsApp",
      icon: MessageSquare,
    },
  ]

  // Filter activities based on selected filter and search query
  const filteredActivities = activities.filter((activity) => {
    const matchesFilter = filter === "all" || activity.type === filter
    const matchesSearch =
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Get activity icon based on type
  const getActivityIcon = (activity) => {
    const IconComponent = activity.icon
    return <IconComponent className="h-4 w-4" />
  }

  // Get activity badge color based on type
  const getActivityBadge = (type) => {
    switch (type) {
      case "test_message":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "content_created":
      case "content_generated":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "broadcast_scheduled":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "broadcast_completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "user_data_imported":
      case "analytics_exported":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      case "template_approved":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
      case "tags_added":
      case "tags_removed":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100"
      case "category_changed":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  // Get human-readable activity type
  const getActivityTypeLabel = (type) => {
    switch (type) {
      case "test_message":
        return "Test Message"
      case "content_created":
        return "Content Created"
      case "content_generated":
        return "Content Generated"
      case "broadcast_scheduled":
        return "Broadcast Scheduled"
      case "broadcast_completed":
        return "Broadcast Completed"
      case "user_data_imported":
        return "Data Import"
      case "analytics_exported":
        return "Export"
      case "template_approved":
        return "Template Approved"
      case "tags_added":
        return "Tags Added"
      case "tags_removed":
        return "Tags Removed"
      case "category_changed":
        return "Category Changed"
      default:
        return type.replace("_", " ")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
          <p className="text-muted-foreground">Track all actions performed in the system</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[250px]"
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter activities" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="test_message">Test Messages</SelectItem>
              <SelectItem value="content_created">Content Creation</SelectItem>
              <SelectItem value="content_generated">Content Generation</SelectItem>
              <SelectItem value="broadcast_scheduled">Scheduled Broadcasts</SelectItem>
              <SelectItem value="broadcast_completed">Completed Broadcasts</SelectItem>
              <SelectItem value="user_data_imported">Data Imports</SelectItem>
              <SelectItem value="tags_added">Tags Added</SelectItem>
              <SelectItem value="tags_removed">Tags Removed</SelectItem>
              <SelectItem value="category_changed">Category Changes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            Showing {filteredActivities.length} {filteredActivities.length === 1 ? "activity" : "activities"}
            {filter !== "all" && ` filtered by ${filter.replace("_", " ")}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="flex space-x-4 border-b pb-4">
                  <div
                    className={`${getActivityBadge(activity.type)} p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0`}
                  >
                    {getActivityIcon(activity)}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                      <Badge variant="outline" className={getActivityBadge(activity.type)}>
                        {getActivityTypeLabel(activity.type)}
                      </Badge>
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{formatTimestamp(activity.timestamp)}</span>
                      <span className="mx-2">•</span>
                      <span>By {activity.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
