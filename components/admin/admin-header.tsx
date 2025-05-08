"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, RefreshCw } from "lucide-react"

interface AdminHeaderProps {
  title?: string
  description?: string
  showSearch?: boolean
  showExport?: boolean
  showRefresh?: boolean
  onRefresh?: () => void
  onExport?: () => void
  searchPlaceholder?: string
  onSearch?: (term: string) => void
}

export function AdminHeader({
  title = "Admin Dashboard",
  description = "Comprehensive analytics and management for your leadership platform",
  showSearch = true,
  showExport = true,
  showRefresh = true,
  onRefresh,
  onExport,
  searchPlaceholder = "Search users...",
  onSearch,
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center gap-2">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        )}

        {showRefresh && (
          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
        )}

        {showExport && (
          <Button onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
      </div>
    </div>
  )
}
