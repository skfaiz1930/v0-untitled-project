"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Report {
  id: string
  name: string
  description: string
  type: "csv" | "pdf" | "excel"
  lastGenerated?: string
  category: "user" | "nudge" | "engagement" | "team"
}

interface ReportsSectionProps {
  reports: Report[]
}

export function ReportsSection({ reports }: ReportsSectionProps) {
  const [category, setCategory] = useState("all")

  const filteredReports = reports.filter((report) => {
    if (category === "all") return true
    return report.category === category
  })

  const handleGenerateReport = (reportId: string) => {
    // Implementation would go here
    console.log(`Generating report ${reportId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-sm text-muted-foreground">Generate and download reports for your leadership platform</p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="user">User Reports</SelectItem>
              <SelectItem value="nudge">Nudge Reports</SelectItem>
              <SelectItem value="engagement">Engagement Reports</SelectItem>
              <SelectItem value="team">Team Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="available">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="font-medium">{report.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">{report.description}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-sm uppercase">{report.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.lastGenerated ? (
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{report.lastGenerated}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleGenerateReport(report.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Generate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Scheduled Reports</h3>
              <p className="text-center text-muted-foreground max-w-md">
                You haven't scheduled any reports yet. Schedule reports to receive them automatically on a regular
                basis.
              </p>
              <Button className="mt-4">Schedule a Report</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create custom reports with specific metrics and filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="user">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User Report</SelectItem>
                        <SelectItem value="nudge">Nudge Report</SelectItem>
                        <SelectItem value="engagement">Engagement Report</SelectItem>
                        <SelectItem value="team">Team Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Time Period</label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Metrics to Include</label>
                  <div className="grid gap-2 mt-2 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-1" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="metric-1" className="text-sm">
                        User Activity
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-2" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="metric-2" className="text-sm">
                        Nudge Completion
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-3" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="metric-3" className="text-sm">
                        Coins Earned
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-4" className="rounded border-gray-300" />
                      <label htmlFor="metric-4" className="text-sm">
                        Peer Tagging
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-5" className="rounded border-gray-300" />
                      <label htmlFor="metric-5" className="text-sm">
                        Sentiment Analysis
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-6" className="rounded border-gray-300" />
                      <label htmlFor="metric-6" className="text-sm">
                        Premium Usage
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Additional Filters</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-3 w-3" />
                      Add Filter
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Report Format</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm" className="bg-primary/10">
                      <FileText className="mr-2 h-3 w-3" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-3 w-3" />
                      Excel
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Generate Custom Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
