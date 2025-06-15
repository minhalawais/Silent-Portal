"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Shield,
  Users,
  MessageCircle,
  Send,
  Eye,
  Clock,
  Lock,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Filter,
  Search,
  Home,
  BarChart3,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

interface Story {
  id: string
  content: string
  timestamp: number
  category: string
  isAnonymous: boolean
  likes: number
  mood: string
  tags: string[]
}

interface Reaction {
  storyId: string
  type: "like" | "support" | "relate"
  timestamp: number
}

export default function Portal() {
  const [stories, setStories] = useState<Story[]>([])
  const [reactions, setReactions] = useState<Reaction[]>([])
  const [newStory, setNewStory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [selectedMood, setSelectedMood] = useState("neutral")
  const [storyTags, setStoryTags] = useState("")
  const [activeTab, setActiveTab] = useState("share")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const categories = [
    { id: "general", label: "General Support", color: "bg-blue-100 text-blue-800" },
    { id: "addiction", label: "Addiction Recovery", color: "bg-purple-100 text-purple-800" },
    { id: "mental-health", label: "Mental Health", color: "bg-green-100 text-green-800" },
    { id: "family", label: "Family Issues", color: "bg-orange-100 text-orange-800" },
    { id: "workplace", label: "Workplace Stress", color: "bg-red-100 text-red-800" },
    { id: "financial", label: "Financial Struggles", color: "bg-yellow-100 text-yellow-800" },
    { id: "relationships", label: "Relationships", color: "bg-pink-100 text-pink-800" },
    { id: "education", label: "Education", color: "bg-indigo-100 text-indigo-800" },
  ]

  const moods = [
    { id: "hopeful", label: "Hopeful", emoji: "🌟", color: "text-yellow-600" },
    { id: "struggling", label: "Struggling", emoji: "😔", color: "text-blue-600" },
    { id: "grateful", label: "Grateful", emoji: "🙏", color: "text-green-600" },
    { id: "anxious", label: "Anxious", emoji: "😰", color: "text-orange-600" },
    { id: "determined", label: "Determined", emoji: "💪", color: "text-purple-600" },
    { id: "neutral", label: "Neutral", emoji: "😐", color: "text-gray-600" },
  ]

  useEffect(() => {
    const savedStories = localStorage.getItem("silentPortalStories")
    const savedReactions = localStorage.getItem("silentPortalReactions")
    if (savedStories) {
      setStories(JSON.parse(savedStories))
    }
    if (savedReactions) {
      setReactions(JSON.parse(savedReactions))
    }
  }, [])

  const saveStories = (updatedStories: Story[]) => {
    localStorage.setItem("silentPortalStories", JSON.stringify(updatedStories))
    setStories(updatedStories)
  }

  const saveReactions = (updatedReactions: Reaction[]) => {
    localStorage.setItem("silentPortalReactions", JSON.stringify(updatedReactions))
    setReactions(updatedReactions)
  }

  const handleSubmitStory = () => {
    if (!newStory.trim()) {
      toast({
        title: "Story Required",
        description: "Please write your story before submitting.",
        variant: "destructive",
      })
      return
    }

    const tags = storyTags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    const story: Story = {
      id: Date.now().toString(),
      content: newStory,
      timestamp: Date.now(),
      category: selectedCategory,
      isAnonymous: true,
      likes: 0,
      mood: selectedMood,
      tags: tags,
    }

    const updatedStories = [story, ...stories]
    saveStories(updatedStories)
    setNewStory("")
    setStoryTags("")

    toast({
      title: "Story Shared Successfully",
      description: "Your anonymous story has been shared. Thank you for your courage.",
    })
  }

  const handleReaction = (storyId: string, type: "like" | "support" | "relate") => {
    const reaction: Reaction = {
      storyId,
      type,
      timestamp: Date.now(),
    }

    const updatedReactions = [...reactions, reaction]
    saveReactions(updatedReactions)

    // Update story likes count
    const updatedStories = stories.map((story) => (story.id === storyId ? { ...story, likes: story.likes + 1 } : story))
    saveStories(updatedStories)

    toast({
      title: "Reaction Added",
      description: `You've shown ${type} for this story.`,
    })
  }

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    return "Just now"
  }

  const getCategoryStyle = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.color || "bg-gray-100 text-gray-800"
  }

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.label || "General"
  }

  const getMoodInfo = (moodId: string) => {
    return moods.find((mood) => mood.id === moodId) || moods[5]
  }

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === "all" || story.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center cursor-pointer">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Silent Portal
                </h1>
                <p className="text-sm text-slate-600">Your safe space for anonymous sharing</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Lock className="w-4 h-4" />
                <span>100% Anonymous</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">You Are Not Alone</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Share your story anonymously, find support, and help others on their journey. This is a safe space where
            your voice matters and your privacy is protected.
          </p>
          <div className="flex justify-center space-x-8 text-slate-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Completely Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Judgment-Free Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Community Support</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            <Button
              variant={activeTab === "share" ? "default" : "ghost"}
              onClick={() => setActiveTab("share")}
              className="rounded-md"
            >
              <Send className="w-4 h-4 mr-2" />
              Share Your Story
            </Button>
            <Button
              variant={activeTab === "read" ? "default" : "ghost"}
              onClick={() => setActiveTab("read")}
              className="rounded-md"
            >
              <Eye className="w-4 h-4 mr-2" />
              Read Stories ({stories.length})
            </Button>
            <Button
              variant={activeTab === "trending" ? "default" : "ghost"}
              onClick={() => setActiveTab("trending")}
              className="rounded-md"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
          </div>
        </div>

        {/* Share Story Tab */}
        {activeTab === "share" && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-slate-800">Share Your Story</CardTitle>
                <CardDescription className="text-slate-600">
                  Your story is completely anonymous and can help others who are going through similar experiences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Choose a category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="text-xs"
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">How are you feeling?</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {moods.map((mood) => (
                      <Button
                        key={mood.id}
                        variant={selectedMood === mood.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedMood(mood.id)}
                        className="text-xs flex flex-col h-auto py-2"
                      >
                        <span className="text-lg mb-1">{mood.emoji}</span>
                        <span>{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tags (optional)</label>
                  <Input
                    placeholder="e.g., recovery, hope, support (separate with commas)"
                    value={storyTags}
                    onChange={(e) => setStoryTags(e.target.value)}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Story Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Story</label>
                  <Textarea
                    placeholder="Share your experience, struggles, hopes, or anything you'd like others to know. Remember, this is completely anonymous and your privacy is protected."
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                    className="min-h-[200px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-slate-500 mt-2">{newStory.length}/2000 characters</p>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmitStory}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Share Anonymously
                </Button>

                {/* Privacy Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Your Privacy is Protected</p>
                      <p>
                        No personal information is collected or stored. Your story is completely anonymous and cannot be
                        traced back to you.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Read Stories Tab */}
        {(activeTab === "read" || activeTab === "trending") && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {activeTab === "trending" ? "Trending Stories" : "Community Stories"}
              </h3>
              <p className="text-slate-600">Read anonymous stories from others who have shared their experiences</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search stories or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredStories.length === 0 ? (
              <Card className="text-center py-12 bg-white/80 backdrop-blur-sm">
                <CardContent>
                  <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">
                    {stories.length === 0 ? "No Stories Yet" : "No Stories Found"}
                  </h3>
                  <p className="text-slate-500 mb-4">
                    {stories.length === 0
                      ? "Be the first to share your story and help build this supportive community."
                      : "Try adjusting your search or filter criteria."}
                  </p>
                  {stories.length === 0 && (
                    <Button
                      onClick={() => setActiveTab("share")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Share Your Story
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredStories
                  .sort((a, b) => (activeTab === "trending" ? b.likes - a.likes : b.timestamp - a.timestamp))
                  .map((story) => {
                    const moodInfo = getMoodInfo(story.mood)
                    return (
                      <Card
                        key={story.id}
                        className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Badge className={getCategoryStyle(story.category)}>
                                {getCategoryLabel(story.category)}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <span className="text-lg">{moodInfo.emoji}</span>
                                <span className={`text-sm ${moodInfo.color}`}>{moodInfo.label}</span>
                              </div>
                            </div>
                            <div className="flex items-center text-sm text-slate-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatTimeAgo(story.timestamp)}
                            </div>
                          </div>

                          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap mb-4">{story.content}</p>

                          {story.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {story.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <Separator className="my-4" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(story.id, "like")}
                                className="text-slate-600 hover:text-red-600"
                              >
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {story.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(story.id, "support")}
                                className="text-slate-600 hover:text-blue-600"
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Support
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReaction(story.id, "relate")}
                                className="text-slate-600 hover:text-green-600"
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />I Relate
                              </Button>
                            </div>
                            <div className="flex items-center text-sm text-slate-500">
                              <Shield className="w-4 h-4 mr-1" />
                              Anonymous
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            )}
          </div>
        )}

        {/* Resources Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">Get Help & Support</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Crisis Helpline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">24/7 support available</p>
                <Button variant="outline" className="w-full">
                  Call Now: 1-800-HELP
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Support Groups</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">Connect with others</p>
                <Button variant="outline" className="w-full">
                  Find Groups
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Professional Help</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">Find therapists & counselors</p>
                <Button variant="outline" className="w-full">
                  Get Referrals
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-6 h-6" />
            <span className="text-xl font-semibold">Silent Portal</span>
          </div>
          <p className="text-slate-300 mb-4">A safe, anonymous space for sharing and healing</p>
          <p className="text-sm text-slate-400">Remember: You are not alone. Help is available. Your story matters.</p>
        </div>
      </footer>
    </div>
  )
}
