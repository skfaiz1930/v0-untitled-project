"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Trophy, Star, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login
    setTimeout(() => {
      setLoading(false)
      router.push("/assessment")
    }, 1500)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate registration
    setTimeout(() => {
      setLoading(false)
      router.push("/assessment")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full blur opacity-75 bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="relative bg-white dark:bg-gray-800 rounded-full p-3">
                <Trophy className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Manager Nudge</h1>
          <p className="text-muted-foreground mt-2">Gamified leadership development</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Login to continue your leadership journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <div className="flex items-center">
                            <span className="animate-spin mr-2">
                              <Sparkles className="h-4 w-4" />
                            </span>
                            Logging in...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" onClick={() => setActiveTab("register")}>
                    Don't have an account? Register
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Start your leadership development journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <div className="flex items-center">
                            <span className="animate-spin mr-2">
                              <Sparkles className="h-4 w-4" />
                            </span>
                            Creating account...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Register <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" onClick={() => setActiveTab("login")}>
                    Already have an account? Login
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex justify-center gap-4"
        >
          <Badge variant="outline" className="flex items-center gap-1 py-1.5">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span>Earn Badges</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 py-1.5">
            <Star className="h-3.5 w-3.5 text-yellow-500" />
            <span>Collect Coins</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            <span>Level Up</span>
          </Badge>
        </motion.div>
      </div>
    </div>
  )
}
