"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Trophy, MessageSquare, Users, LogOut, X, Sparkles } from "lucide-react"
import { Target, LinkIcon, LayoutDashboard, LineChart, Settings } from "lucide-react" // Updated imports
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

interface SidebarProps {
  isOpen: boolean
  isMobile: boolean
}

// Update the navigation items array to include the new features
const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Nudges",
    href: "/nudges",
    icon: Bell,
  },
  {
    title: "Pulse Survey",
    href: "/pulse-survey",
    icon: LineChart,
  },
  {
    title: "AI Insights",
    href: "/ai-insights",
    icon: Sparkles,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: LinkIcon,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    title: "AI Personalization",
    href: "/ai-personalization",
    icon: Settings,
  },
]

export default function Sidebar({ isOpen, isMobile }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const setSidebarWidth = useCallback(() => {
    if (isOpen) {
      document.documentElement.style.setProperty("--sidebar-width", "16rem") // 64px
    } else {
      document.documentElement.style.setProperty("--sidebar-width", isMobile ? "0" : "4rem") // 16px
    }
  }, [isOpen, isMobile])

  // Set CSS variable for sidebar width (used in main layout)
  useEffect(() => {
    setSidebarWidth()
  }, [isOpen, isMobile, setSidebarWidth])

  if (!mounted) return null

  const sidebarClasses = cn(
    "fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-900 shadow-soft transition-all duration-300",
    "flex flex-col border-r border-gray-200 dark:border-gray-800",
    {
      "w-64": isOpen,
      "w-0 -translate-x-full": !isOpen && isMobile,
      "w-16": !isOpen && !isMobile,
    },
  )

  return (
    <aside className={sidebarClasses}>
      {isMobile && isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={() => document.dispatchEvent(new CustomEvent("toggle-sidebar"))}
        >
          <X className="h-5 w-5" />
        </Button>
      )}

      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        {isOpen ? (
          <h1 className="text-xl font-bold text-primary">NudgeManager</h1>
        ) : (
          <span className="text-xl font-bold text-primary">NM</span>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 overflow-y-auto">
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navigationItems.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
                    pathname === link.href ? "bg-blue-50 text-blue-600 dark:bg-gray-800 dark:text-blue-400" : "",
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {isOpen && <span>{link.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800">
          {isOpen ? (
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">john@example.com</p>
              </div>
              <ModeToggle />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <ModeToggle />
            </div>
          )}

          <Button
            variant="ghost"
            className={cn(
              "w-full mt-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
              !isOpen && "p-2 justify-center",
            )}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}
