"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"
import { ModeToggle } from "@/components/mode-toggle"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if we're on the onboarding page
  const isOnboarding = pathname.includes("/onboarding")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Don't show sidebar and header on onboarding pages
  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="absolute top-4 right-4 z-50">
          <ModeToggle />
        </div>
        <main className="w-full">{children}</main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} />
      <div className="flex flex-col flex-1">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 pt-20 md:ml-[var(--sidebar-width)]">{children}</main>
      </div>
    </div>
  )
}
