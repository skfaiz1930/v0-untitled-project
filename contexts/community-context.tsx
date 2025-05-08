"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Types
export interface CommunityPost {
  id: string
  type: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: string
  likes: number
  liked?: boolean
  comments?: {
    id: string
    content: string
    author: {
      id: string
      name: string
      avatar?: string
    }
    timestamp: string
  }[]
  image?: string
  tags?: string[]
  mentionedUsers?: string[]
}

interface CreatePostParams {
  type: string
  content: string
  image?: string
  tags?: string[]
  mentionedUsers?: string[]
}

interface CommunityContextType {
  posts: CommunityPost[]
  createPost: (params: CreatePostParams) => void
  likePost: (postId: string) => void
  commentOnPost: (postId: string, content: string) => void
  sharePost: (postId: string) => void
  showSharingPrompt: boolean
  setShowSharingPrompt: (show: boolean) => void
  sharingData: {
    type: string
    title: string
    content: string
  } | null
  setSharingData: (
    data: {
      type: string
      title: string
      content: string
    } | null,
  ) => void
}

// Mock initial posts
const initialPosts: CommunityPost[] = [
  {
    id: "post-1",
    type: "badges",
    content: "Just earned the Team Player badge! Excited to continue collaborating with this amazing team.",
    author: {
      id: "member-2",
      name: "Michael Chen",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 12,
    comments: [
      {
        id: "comment-1",
        content: "Congratulations! Well deserved.",
        author: {
          id: "member-3",
          name: "Emily Rodriguez",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
    ],
    tags: ["teamwork", "achievement", "leadership"],
  },
  {
    id: "post-2",
    type: "levels",
    content: "Just reached Skilled Leader level! The journey continues with new challenges and opportunities.",
    author: {
      id: "member-1",
      name: "Sarah Johnson",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likes: 18,
    comments: [
      {
        id: "comment-2",
        content: "Amazing progress! What's your favorite feature at this level?",
        author: {
          id: "member-4",
          name: "David Kim",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
      },
      {
        id: "comment-3",
        content: "Definitely the advanced analytics. It's been a game-changer for my team meetings.",
        author: {
          id: "member-1",
          name: "Sarah Johnson",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
    ],
    tags: ["levelup", "leadership", "growth"],
  },
  {
    id: "post-3",
    type: "nudges",
    content:
      "The 'Effective 1:1 Meetings' nudge has transformed how I connect with my team members. Highly recommend trying it!",
    author: {
      id: "member-3",
      name: "Emily Rodriguez",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    likes: 9,
    tags: ["meetings", "teamdevelopment", "communication"],
  },
  {
    id: "post-4",
    type: "streaks",
    content: "7-day streak achieved! Consistency is key to building better leadership habits.",
    author: {
      id: "member-4",
      name: "David Kim",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likes: 15,
    comments: [
      {
        id: "comment-4",
        content: "That's impressive! What's your strategy for maintaining the streak?",
        author: {
          id: "member-5",
          name: "John Doe",
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // 20 hours ago
      },
    ],
    tags: ["consistency", "habits", "discipline"],
  },
  {
    id: "post-5",
    type: "praise",
    content:
      "I want to recognize @Alex and @Emily for their exceptional work on the quarterly planning session. Your preparation and facilitation made all the difference!",
    author: {
      id: "member-5",
      name: "John Doe",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
    likes: 22,
    mentionedUsers: ["member-3", "member-6"],
    tags: ["recognition", "teamwork", "planning"],
  },
]

const CommunityContext = createContext<CommunityContextType | undefined>(undefined)

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts)
  const [showSharingPrompt, setShowSharingPrompt] = useState(false)
  const [sharingData, setSharingData] = useState<{
    type: string
    title: string
    content: string
  } | null>(null)

  const { toast } = useToast()

  const createPost = ({ type, content, image, tags, mentionedUsers }: CreatePostParams) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      type,
      content,
      author: {
        id: "current-user",
        name: "John Doe", // Current user
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
      image,
      tags,
      mentionedUsers,
    }

    setPosts((prev) => [newPost, ...prev])

    toast({
      title: "Post created!",
      description: "Your post has been shared with the community.",
    })
  }

  const likePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = post.liked || false
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            liked: !isLiked,
          }
        }
        return post
      }),
    )
  }

  const commentOnPost = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            content,
            author: {
              id: "current-user",
              name: "John Doe", // Current user
            },
            timestamp: new Date().toISOString(),
          }

          return {
            ...post,
            comments: [...(post.comments || []), newComment],
          }
        }
        return post
      }),
    )

    toast({
      title: "Comment added",
      description: "Your comment has been added to the post.",
    })
  }

  const sharePost = (postId: string) => {
    toast({
      title: "Post shared",
      description: "The post has been shared.",
    })
  }

  return (
    <CommunityContext.Provider
      value={{
        posts,
        createPost,
        likePost,
        commentOnPost,
        sharePost,
        showSharingPrompt,
        setShowSharingPrompt,
        sharingData,
        setSharingData,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  const context = useContext(CommunityContext)
  if (context === undefined) {
    throw new Error("useCommunity must be used within a CommunityProvider")
  }
  return context
}
