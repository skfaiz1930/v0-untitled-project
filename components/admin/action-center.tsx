"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Coins, Star, Mail, AlertTriangle, Lock, Unlock, Download, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockNudges } from "@/lib/mock-data"

interface ActionCenterProps {
  selectedUsers: string[]
  users: {
    id: string
    name: string
    status: string
  }[]
}

export function ActionCenter({ selectedUsers, users }: ActionCenterProps) {
  const [selectedNudge, setSelectedNudge] = useState("")
  const [coinsAmount, setCoinsAmount] = useState("50")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageBody, setMessageBody] = useState("")

  const handleAssignNudge = () => {
    // Implementation would go here
    console.log(`Assigned nudge ${selectedNudge} to ${selectedUsers.length} users`)
  }

  const handleAddCoins = () => {
    // Implementation would go here
    console.log(`Added ${coinsAmount} coins to ${selectedUsers.length} users`)
  }

  const handleGrantPremium = () => {
    // Implementation would go here
    console.log(`Granted premium access to ${selectedUsers.length} users`)
  }

  const handleSendMessage = () => {
    // Implementation would go here
    console.log(`Sent message to ${selectedUsers.length} users: ${messageSubject}`)
  }

  const handleRevokeAccess = () => {
    // Implementation would go here
    console.log(`Revoked access for ${selectedUsers.length} users`)
  }

  const handleRestoreAccess = () => {
    // Implementation would go here
    console.log(`Restored access for ${selectedUsers.length} users`)
  }

  const handleExportData = () => {
    // Implementation would go here
    console.log(`Exported data for ${selectedUsers.length} users`)
  }

  const suspendedCount = users.filter((user) => user.status === "suspended").length
  const activeCount = users.filter((user) => user.status === "active").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Action Center</h2>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{selectedUsers.length} users selected</span>
        </div>
      </div>

      {selectedUsers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
            <p className="text-center text-muted-foreground">
              No users selected. Please select users from the Users tab to perform actions.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Assign Nudge</CardTitle>
              <CardDescription>Send a nudge to all selected users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedNudge} onValueChange={setSelectedNudge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a nudge" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockNudges.map((nudge) => (
                      <SelectItem key={nudge.id} value={nudge.id}>
                        {nudge.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button className="w-full" onClick={handleAssignNudge} disabled={!selectedNudge}>
                  <Bell className="mr-2 h-4 w-4" />
                  Assign to {selectedUsers.length} Users
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Coins</CardTitle>
              <CardDescription>Award coins to all selected users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="number"
                  min="1"
                  value={coinsAmount}
                  onChange={(e) => setCoinsAmount(e.target.value)}
                  placeholder="Amount of coins"
                />

                <Button
                  className="w-full"
                  onClick={handleAddCoins}
                  disabled={!coinsAmount || Number.parseInt(coinsAmount) < 1}
                >
                  <Coins className="mr-2 h-4 w-4" />
                  Award to {selectedUsers.length} Users
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premium Access</CardTitle>
              <CardDescription>Grant premium access to selected users</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={handleGrantPremium}>
                <Star className="mr-2 h-4 w-4" />
                Grant Premium to {selectedUsers.length} Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
              <CardDescription>Send a notification to selected users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  placeholder="Message subject"
                />

                <Textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Message body"
                  className="min-h-[80px]"
                />

                <Button className="w-full" onClick={handleSendMessage} disabled={!messageSubject || !messageBody}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send to {selectedUsers.length} Users
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage access for selected users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={handleRevokeAccess}
                  disabled={activeCount === 0}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Revoke Access ({activeCount})
                </Button>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleRestoreAccess}
                  disabled={suspendedCount === 0}
                >
                  <Unlock className="mr-2 h-4 w-4" />
                  Restore Access ({suspendedCount})
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>Download user data in CSV format</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export {selectedUsers.length} Users
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
