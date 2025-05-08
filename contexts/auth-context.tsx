"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export type UserRole = "user" | "department_admin" | "hr_admin" | "super_admin"

interface User {
  email: string
  name?: string
  role: UserRole
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  isAdmin: () => boolean
  getHighestRole: () => string
}

// Define permissions for each role
const rolePermissions: Record<UserRole, string[]> = {
  user: ["view_own_profile", "complete_nudges", "view_leaderboard"],
  department_admin: [
    "view_own_profile",
    "complete_nudges",
    "view_leaderboard",
    "view_department_users",
    "assign_nudges",
    "view_department_reports",
    "add_coins",
  ],
  hr_admin: [
    "view_own_profile",
    "complete_nudges",
    "view_leaderboard",
    "view_all_users",
    "assign_nudges",
    "view_all_reports",
    "add_coins",
    "grant_premium",
    "revoke_access",
    "view_audit_logs",
  ],
  super_admin: [
    "view_own_profile",
    "complete_nudges",
    "view_leaderboard",
    "view_all_users",
    "assign_nudges",
    "view_all_reports",
    "add_coins",
    "grant_premium",
    "revoke_access",
    "view_audit_logs",
    "manage_admins",
    "manage_permissions",
    "view_access_history",
    "system_settings",
  ],
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedRole = localStorage.getItem("userRole")
      const storedEmail = localStorage.getItem("userEmail")

      if (storedRole && storedEmail) {
        const role = storedRole as UserRole
        setUser({
          email: storedEmail,
          role,
          permissions: rolePermissions[role],
        })
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Protect admin routes
  useEffect(() => {
    if (!isLoading) {
      // If not logged in and trying to access protected route
      if (!user && pathname !== "/login" && !pathname.startsWith("/onboarding")) {
        router.push("/login")
      }

      // If logged in but trying to access admin routes without permission
      if (
        user &&
        pathname.startsWith("/admin") &&
        !["super_admin", "hr_admin", "department_admin"].includes(user.role)
      ) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router, toast])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, this would validate credentials with a backend
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create audit log entry
      const loginData = {
        email,
        timestamp: new Date().toISOString(),
        action: "login",
        ip: "192.168.1.1", // In a real app, this would be the actual IP
        device: navigator.userAgent,
        success: true,
      }

      console.log("Login audit:", loginData)

      // Set user data
      setUser({
        email,
        role,
        permissions: rolePermissions[role],
      })

      // Store in localStorage (in a real app, this would be a secure HTTP-only cookie)
      localStorage.setItem("userRole", role)
      localStorage.setItem("userEmail", email)

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const logout = () => {
    // Create audit log entry
    if (user) {
      const logoutData = {
        email: user.email,
        timestamp: new Date().toISOString(),
        action: "logout",
        ip: "192.168.1.1", // In a real app, this would be the actual IP
        device: navigator.userAgent,
      }

      console.log("Logout audit:", logoutData)
    }

    // Clear user data
    setUser(null)
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const isAdmin = (): boolean => {
    if (!user) return false
    return ["department_admin", "hr_admin", "super_admin"].includes(user.role)
  }

  const getHighestRole = (): string => {
    if (!user) return "Guest"
    switch (user.role) {
      case "super_admin":
        return "Super Admin"
      case "hr_admin":
        return "HR Admin"
      case "department_admin":
        return "Department Admin"
      default:
        return "User"
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasPermission,
        isAdmin,
        getHighestRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
