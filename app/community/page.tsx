"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import FitproLayout from "@/components/fitpro-layout"
import { Heart, MessageCircle, Share2, User, Award, Zap } from "lucide-react"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  achievement: string
  timestamp: string
  likes: number
  comments: number
  liked: boolean
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "John Doe",
      avatar: "JD",
      achievement: "Finished a 10K run today! Feeling amazing 🏃",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 12,
      liked: false,
    },
    {
      id: "2",
      author: "Sara",
      avatar: "S",
      achievement: "Just completed a jog session! 💪",
      timestamp: "1 hour ago",
      likes: 156,
      comments: 8,
      liked: false,
    },
    {
      id: "3",
      author: "Mike Johnson",
      avatar: "MJ",
      achievement: "Personal best on bench press! 150 lbs 🎯",
      timestamp: "45 minutes ago",
      likes: 89,
      comments: 5,
      liked: false,
    },
  ])

  const toggleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    )
  }

  return (
    <FitproLayout role="user">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
          <p className="text-gray-400">Share your fitness journey with others</p>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="fitpro-card overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {post.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{post.author}</p>
                      <p className="text-gray-500 text-sm">{post.timestamp}</p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-400">•••</button>
                </div>

                {/* Achievement Text */}
                <p className="text-white mb-6">{post.achievement}</p>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <Button
                    onClick={() => toggleLike(post.id)}
                    variant="ghost"
                    className="text-gray-400 hover:text-red-500 flex-1 justify-start"
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${post.liked ? "fill-red-500 text-red-500" : ""}`}
                    />
                    <span className="text-sm">{post.likes}</span>
                  </Button>

                  <Button variant="ghost" className="text-gray-400 hover:text-blue-500 flex-1 justify-start">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">{post.comments}</span>
                  </Button>

                  <Button variant="ghost" className="text-gray-400 hover:text-green-500 flex-1 justify-start">
                    <Share2 className="w-5 h-5 mr-2" />
                    <span className="text-sm">Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Users */}
        <Card className="fitpro-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Featured Users
            </h3>

            <div className="space-y-3">
              {[
                { name: "Alex Turner", achievement: "500+ workouts", badge: "🏆" },
                { name: "Emma Wilson", achievement: "100-day streak", badge: "🔥" },
                { name: "Chris Anderson", achievement: "Top contributor", badge: "⭐" },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg">
                      {user.badge}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.achievement}</p>
                    </div>
                  </div>
                  <Button className="fitpro-button text-xs px-3 py-1 rounded-lg">Follow</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FitproLayout>
  )
}
