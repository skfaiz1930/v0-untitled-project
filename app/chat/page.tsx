"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Search, Plus, MoreHorizontal, Share, MessageSquare, Users } from "lucide-react"
import { mockChatData, mockTeamMembers } from "@/lib/mock-data"

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("direct")
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [chats] = useState(mockChatData)
  const [teamMembers] = useState(mockTeamMembers)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter chats based on search query and active tab
  const filteredChats = chats.filter((chat) => {
    // Filter by direct or group
    if (activeTab === "direct" && chat.type !== "direct") {
      return false
    }
    if (activeTab === "groups" && chat.type !== "group") {
      return false
    }

    // Filter by search query
    if (searchQuery && !chat.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  // Get active chat data
  const currentChat = chats.find((chat) => chat.id === activeChat)

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      const chat = chats.find((c) => c.id === activeChat)
      if (chat) {
        setMessages(chat.messages)
      }
    }
  }, [activeChat, chats])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "current-user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <MainLayout>
      <div className="animate-fade-in h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] flex flex-col">
        <div className="flex flex-col md:flex-row h-full">
          {/* Chat Sidebar */}
          <div className="w-full md:w-80 border-r border-gray-200 dark:border-gray-700 md:h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Tabs defaultValue="direct" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="px-4 pt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="direct" className="flex-1">
                    Direct
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="flex-1">
                    Groups
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value={activeTab} className="m-0 p-0 h-full">
                  {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      <div className="rounded-full bg-primary/10 p-3 mb-4">
                        {activeTab === "direct" ? (
                          <MessageSquare className="h-6 w-6 text-primary" />
                        ) : (
                          <Users className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium">No conversations found</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1">
                        {searchQuery
                          ? "Try a different search term"
                          : activeTab === "direct"
                            ? "Start a new conversation with a team member"
                            : "Create a new group chat"}
                      </p>
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        {activeTab === "direct" ? "New Conversation" : "New Group"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1 p-2">
                      {filteredChats.map((chat) => (
                        <div
                          key={chat.id}
                          className={`flex items-center p-2 rounded-md cursor-pointer ${
                            activeChat === chat.id ? "bg-primary/10" : "hover:bg-secondary"
                          }`}
                          onClick={() => setActiveChat(chat.id)}
                        >
                          {chat.type === "direct" ? (
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="font-medium truncate">{chat.name}</p>
                              <p className="text-xs text-muted-foreground ml-2">{chat.lastMessageTime}</p>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                          </div>
                          {chat.unreadCount > 0 && <Badge className="ml-2">{chat.unreadCount}</Badge>}
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </div>

              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  {activeTab === "direct" ? "New Conversation" : "New Group"}
                </Button>
              </div>
            </Tabs>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col h-full">
            {activeChat && currentChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    {currentChat.type === "direct" ? (
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>{currentChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{currentChat.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentChat.type === "direct" ? "Active now" : `${currentChat.members.length} members`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => {
                    const isCurrentUser = message.sender === "current-user"
                    return (
                      <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-end max-w-[70%]">
                          {!isCurrentUser && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>{currentChat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-3 ${
                                isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                              }`}
                            >
                              {message.text}
                            </div>
                            <div className="flex items-center mt-1">
                              <p className="text-xs text-muted-foreground">{message.time}</p>
                              {isCurrentUser && <p className="text-xs text-muted-foreground ml-2">{message.status}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={newMessage.trim() === ""}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Select a conversation</h2>
                <p className="text-muted-foreground text-center mt-2 max-w-md">
                  Choose a conversation from the sidebar or start a new one to begin chatting with your team members.
                </p>
                <Button className="mt-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Start a New Conversation
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
