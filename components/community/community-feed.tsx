"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp, MessageSquare, Share2, Award, TrendingUp, Bell, Flame, Users, Heart } from "lucide-react"
import { mockTeamMembers } from "@/lib/mock-data"
import { useCommunity } from "@/contexts/community-context"
import { formatDistanceToNow } from "date-fns"

interface CommunityFeedProps {
  activeTab: string
  searchQuery: string
}

export function CommunityFeed({ activeTab, searchQuery }: CommunityFeedProps) {
  const { posts, likePost, commentOnPost } = useCommunity()
  const [isLoading, setIsLoading] = useState(true)
  const [showCommentInput, setShowCommentInput] = useState<string | null>(null)
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredPosts = posts
    .filter((post) => {
      if (activeTab === "all") return true
      return post.type === activeTab
    })
    .filter((post) => {
      if (!searchQuery) return true
      return (
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      )
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const handleComment = (postId: string) => {
    if (commentText.trim()) {
      commentOnPost(postId, commentText)
      setCommentText("")
      setShowCommentInput(null)
    }
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case "badges":
        return <Award className="h-5 w-5 text-amber-500" />
      case "levels":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "nudges":
        return <Bell className="h-5 w-5 text-green-500" />
      case "streaks":
        return <Flame className="h-5 w-5 text-red-500" />
      case "praise":
        return <Users className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex justify-between w-full">
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
                <Skeleton className="h-9 w-[100px]" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          {activeTab === "all" ? <MessageSquare className="h-8 w-8 text-muted-foreground" /> : getPostIcon(activeTab)}
        </div>
        <h3 className="text-lg font-medium">No posts found</h3>
        <p className="text-muted-foreground mt-1">
          {searchQuery
            ? `No posts matching "${searchQuery}"`
            : activeTab === "all"
              ? "Be the first to share something with the community!"
              : `No ${activeTab} posts yet. Share your ${activeTab} achievements!`}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getPostIcon(post.type)}
                    <span className="capitalize">{post.type}</span>
                  </Badge>
                </div>

                <div className="mt-3">
                  <p className="text-sm">{post.content}</p>

                  {post.image && (
                    <div className="mt-3 rounded-md overflow-hidden">
                      <img src={post.image || "/placeholder.svg"} alt="Post attachment" className="w-full h-auto" />
                    </div>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {post.type === "praise" && post.mentionedUsers && (
                    <div className="mt-3 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium mb-2">Recognized team members:</p>
                      <div className="flex flex-wrap gap-2">
                        {post.mentionedUsers.map((userId) => {
                          const member = mockTeamMembers.find((m) => m.id === userId)
                          return (
                            <div key={userId} className="flex items-center bg-background rounded-full px-3 py-1">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
                                <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{member?.name}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div className="mt-4 pl-12 space-y-3">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-md">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{comment.author.name}</p>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showCommentInput === post.id && (
              <div className="mt-4 pl-12">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="You" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={2}
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowCommentInput(null)
                          setCommentText("")
                        }}
                      >
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleComment(post.id)}>
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-0 border-t">
            <div className="flex justify-between w-full">
              <Button
                variant="ghost"
                size="sm"
                className={post.liked ? "text-primary" : ""}
                onClick={() => likePost(post.id)}
              >
                {post.liked ? <Heart className="h-4 w-4 mr-1 fill-primary" /> : <ThumbsUp className="h-4 w-4 mr-1" />}
                {post.likes} {post.likes === 1 ? "Like" : "Likes"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCommentInput(post.id === showCommentInput ? null : post.id)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                {post.comments ? post.comments.length : 0} {post.comments?.length === 1 ? "Comment" : "Comments"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
