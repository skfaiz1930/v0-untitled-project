"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface HeaderProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export default function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  const pathname = usePathname()

  // Listen for toggle sidebar event (from mobile sidebar)
  useEffect(() => {
    const handleToggleSidebar = () => {
      toggleSidebar()
    }

    document.addEventListener("toggle-sidebar", handleToggleSidebar)
    return () => {
      document.removeEventListener("toggle-sidebar", handleToggleSidebar)
    }
  }, [toggleSidebar])

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split("/")[1]
    if (!path) return "Dashboard"
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold hidden md:block">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 rounded-full bg-gray-100 dark:bg-gray-700 border-none"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {i === 1 ? "New badge unlocked!" : i === 2 ? "5-day streak achieved!" : "New nudge available"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {i === 1
                          ? "You've earned the '10 Nudges Completed' badge"
                          : i === 2
                            ? "Keep going to reach your 7-day goal"
                            : "Check out today's leadership nudge"}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {i === 1 ? "2 hours ago" : i === 2 ? "Yesterday" : "Just now"}
                      </p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
