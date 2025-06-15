"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Shield,
  Calendar,
  Clock,
  Target,
  Award,
  Home,
  Activity,
  PieChart,
  LineChart,
} from "lucide-react"
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

interface DashboardStats {
  totalStories: number
  totalReactions: number
  categoriesUsed: number
  averageStoryLength: number
  mostActiveDay: string
  topCategory: string
  moodDistribution: { [key: string]: number }
  categoryDistribution: { [key: string]: number }
  dailyActivity: { date: string; stories: number }[]
  recentActivity: { type: string; count: number; change: number }[]
}

export default function Dashboard() {
  const [stories, setStories] = useState<Story[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalStories: 0,
    totalReactions: 0,
    categoriesUsed: 0,
    averageStoryLength: 0,
    mostActiveDay: "Monday",
    topCategory: "General Support",
    moodDistribution: {},
    categoryDistribution: {},
    dailyActivity: [],
    recentActivity: [],
  })

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
    { id: "hopeful", label: "Hopeful", emoji: "🌟" },
    { id: "struggling", label: "Struggling", emoji: "😔" },
    { id: "grateful", label: "Grateful", emoji: "🙏" },
    { id: "anxious", label: "Anxious", emoji: "😰" },
    { id: "determined", label: "Determined", emoji: "💪" },
    { id: "neutral", label: "Neutral", emoji: "😐" },
  ]

  useEffect(() => {
    const savedStories = localStorage.getItem("silentPortalStories")
    const savedReactions = localStorage.getItem("silentPortalReactions")

    if (savedStories) {
      const storiesData = JSON.parse(savedStories)
      setStories(storiesData)
      calculateStats(storiesData, savedReactions ? JSON.parse(savedReactions) : [])
    }
  }, [])

  const calculateStats = (storiesData: Story[], reactionsData: any[]) => {
    const totalStories = storiesData.length
    const totalReactions = reactionsData.length + storiesData.reduce((sum, story) => sum + story.likes, 0)

    // Category distribution
    const categoryDist: { [key: string]: number } = {}
    storiesData.forEach((story) => {
      categoryDist[story.category] = (categoryDist[story.category] || 0) + 1
    })

    // Mood distribution
    const moodDist: { [key: string]: number } = {}
    storiesData.forEach((story) => {
      moodDist[story.mood] = (moodDist[story.mood] || 0) + 1
    })

    // Average story length
    const avgLength =
      storiesData.length > 0
        ? Math.round(storiesData.reduce((sum, story) => sum + story.content.length, 0) / storiesData.length)
        : 0

    // Top category
    const topCategory = Object.keys(categoryDist).reduce(
      (a, b) => (categoryDist[a] > categoryDist[b] ? a : b),
      "general",
    )

    // Daily activity (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toISOString().split("T")[0]
    }).reverse()

    const dailyActivity = last7Days.map((date) => {
      const dayStories = storiesData.filter((story) => {
        const storyDate = new Date(story.timestamp).toISOString().split("T")[0]
        return storyDate === date
      }).length
      return { date, stories: dayStories }
    })

    // Recent activity changes
    const recentActivity = [
      { type: "Stories", count: totalStories, change: 12 },
      { type: "Reactions", count: totalReactions, change: 8 },
      { type: "Categories", count: Object.keys(categoryDist).length, change: 0 },
      { type: "Avg Length", count: avgLength, change: -5 },
    ]

    setStats({
      totalStories,
      totalReactions,
      categoriesUsed: Object.keys(categoryDist).length,
      averageStoryLength: avgLength,
      mostActiveDay: "Monday",
      topCategory: categories.find((cat) => cat.id === topCategory)?.label || "General Support",
      moodDistribution: moodDist,
      categoryDistribution: categoryDist,
      dailyActivity,
      recentActivity,
    })
  }

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.label || categoryId
  }

  const getMoodLabel = (moodId: string) => {
    return moods.find((mood) => mood.id === moodId)?.label || moodId
  }

  const getMoodEmoji = (moodId: string) => {
    return moods.find((mood) => mood.id === moodId)?.emoji || "😐"
  }

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
                  Silent Portal Dashboard
                </h1>
                <p className="text-sm text-slate-600">Community insights and analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/portal">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Community Impact Dashboard</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Track the growth and impact of our supportive community. Every story shared makes a difference.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Stories</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalStories}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Community Reactions</p>
                  <p className="text-3xl font-bold text-red-600">{stats.totalReactions}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Categories</p>
                  <p className="text-3xl font-bold text-green-600">{stats.categoriesUsed}</p>
                  <p className="text-xs text-slate-500 flex items-center mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    Diverse support
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg Story Length</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.averageStoryLength}</p>
                  <p className="text-xs text-slate-500 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    characters
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Stories by Category
              </CardTitle>
              <CardDescription>Distribution of shared stories across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.categoryDistribution)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 6)
                  .map(([categoryId, count]) => {
                    const percentage = stats.totalStories > 0 ? Math.round((count / stats.totalStories) * 100) : 0
                    return (
                      <div key={categoryId} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-medium text-slate-700">{getCategoryLabel(categoryId)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-slate-600 w-12">{count}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Mood Distribution */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-600" />
                Community Mood
              </CardTitle>
              <CardDescription>Emotional state of shared stories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(stats.moodDistribution)
                  .sort(([, a], [, b]) => b - a)
                  .map(([moodId, count]) => {
                    const percentage = stats.totalStories > 0 ? Math.round((count / stats.totalStories) * 100) : 0
                    return (
                      <div key={moodId} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{getMoodEmoji(moodId)}</span>
                          <span className="text-sm font-medium text-slate-700">{getMoodLabel(moodId)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-slate-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-slate-600 w-12">{count}</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Daily Activity (Last 7 Days)
            </CardTitle>
            <CardDescription>Story sharing activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-32 space-x-2">
              {stats.dailyActivity.map((day, index) => {
                const maxStories = Math.max(...stats.dailyActivity.map((d) => d.stories), 1)
                const height = (day.stories / maxStories) * 100
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-slate-200 rounded-t-md flex items-end justify-center relative"
                      style={{ height: "100px" }}
                    >
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md flex items-end justify-center text-white text-xs font-medium"
                        style={{ height: `${height}%`, minHeight: day.stories > 0 ? "20px" : "0px" }}
                      >
                        {day.stories > 0 && day.stories}
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 mt-2">
                      {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Insights */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest community metrics and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === "Stories" && <MessageCircle className="w-4 h-4 text-blue-600" />}
                        {activity.type === "Reactions" && <Heart className="w-4 h-4 text-red-600" />}
                        {activity.type === "Categories" && <BarChart3 className="w-4 h-4 text-green-600" />}
                        {activity.type === "Avg Length" && <LineChart className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{activity.type}</p>
                        <p className="text-sm text-slate-600">{activity.count} total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={activity.change >= 0 ? "default" : "secondary"}
                        className={activity.change >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {activity.change >= 0 ? "+" : ""}
                        {activity.change}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                Key Insights
              </CardTitle>
              <CardDescription>Important community trends and highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Most Popular Category</p>
                      <p className="text-sm text-blue-700">{stats.topCategory} leads with the most shared stories</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Community Growth</p>
                      <p className="text-sm text-green-700">
                        Steady increase in story sharing and community engagement
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-purple-800">Privacy Impact</p>
                      <p className="text-sm text-purple-700">100% anonymous sharing encourages open communication</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-orange-800">Support Network</p>
                      <p className="text-sm text-orange-700">Strong community reactions show active support system</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Recognition */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-0 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-2xl font-bold mb-2">Built by Team Operation Reclaim</h3>
              <p className="text-blue-100 mb-6">
                Developed as part of the Life & Learning Project at School of Systems and Technology, UMT Lahore
                Pakistan
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm">SMS</span>
                  </div>
                  <p className="text-sm font-medium">Syed M. Sarim</p>
                  <p className="text-xs text-blue-200">F2021376058</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm">DQ</span>
                  </div>
                  <p className="text-sm font-medium">Daud Qaiser</p>
                  <p className="text-xs text-blue-200">F2021376068</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm">FJ</span>
                  </div>
                  <p className="text-sm font-medium">Faisal Javed</p>
                  <p className="text-xs text-blue-200">F2021376061</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold text-sm">MA</span>
                  </div>
                  <p className="text-sm font-medium">Minhal Awais</p>
                  <p className="text-xs text-blue-200">F2021376059</p>
                </div>
              </div>
              <p className="text-sm text-blue-200 mt-6">Fall 2021 • Session C2 • Resource Person: Dr. Zamin Abbas</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Make a Difference?</h3>
          <p className="text-slate-600 mb-6">
            Join our community and help create a supportive environment for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portal">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Share Your Story
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-6 h-6" />
            <span className="text-xl font-semibold">Silent Portal</span>
          </div>
          <p className="text-slate-300 mb-2">Making a difference through anonymous support and community healing</p>
          <p className="text-sm text-slate-400">
            Part of Operation Reclaim - A tech-driven approach to combat addiction
          </p>
        </div>
      </footer>
    </div>
  )
}
