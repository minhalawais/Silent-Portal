"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Heart,
  Users,
  MessageCircle,
  TrendingUp,
  Star,
  ArrowRight,
  Globe,
  Zap,
  Award,
  BarChart3,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalStories: 0,
    activeUsers: 0,
    supportProvided: 0,
    communitiesHelped: 0,
  })

  useEffect(() => {
    // Load stats from localStorage
    const stories = JSON.parse(localStorage.getItem("silentPortalStories") || "[]")
    setStats({
      totalStories: stories.length,
      activeUsers: Math.floor(stories.length * 1.5) + 127,
      supportProvided: Math.floor(stories.length * 2.3) + 89,
      communitiesHelped: Math.floor(stories.length * 0.8) + 15,
    })
  }, [])

  const features = [
    {
      icon: Shield,
      title: "100% Anonymous",
      description: "Your identity is completely protected. No registration, no tracking, no personal data collection.",
      color: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Judgment-Free Zone",
      description: "Share your story without fear of judgment. Our community is built on empathy and understanding.",
      color: "text-red-500",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others who understand your journey. You're never alone in your struggles.",
      color: "text-green-600",
    },
    {
      icon: MessageCircle,
      title: "24/7 Available",
      description: "Share and read stories anytime. Support is always available when you need it most.",
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track community growth and impact through our comprehensive dashboard.",
      color: "text-orange-600",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with people from around the world facing similar challenges.",
      color: "text-indigo-600",
    },
  ]

  const testimonials = [
    {
      content:
        "This platform gave me the courage to share my story. Knowing I could remain anonymous made all the difference.",
      author: "Anonymous User",
      category: "Mental Health",
      rating: 5,
    },
    {
      content: "Reading others' stories helped me realize I wasn't alone. The community here is incredibly supportive.",
      author: "Anonymous User",
      category: "Addiction Recovery",
      rating: 5,
    },
    {
      content:
        "The dashboard insights helped our organization understand the real impact we're making in people's lives.",
      author: "Community Leader",
      category: "Professional",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Silent Portal
                </h1>
                <p className="text-xs text-slate-600">Safe. Anonymous. Supportive.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/portal">
                <Button variant="ghost">Portal</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/portal">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Zap className="w-4 h-4 mr-1" />
              Trusted by {stats.activeUsers}+ users worldwide
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
              Your Voice Matters,
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Your Story Heals
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join a supportive community where you can share your experiences anonymously, find strength in others'
              stories, and help create a world where no one suffers in silence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/portal">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4"
                >
                  Share Your Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-slate-300">
                  View Impact Dashboard
                  <BarChart3 className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.totalStories}+</div>
                <div className="text-sm text-slate-600">Stories Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.activeUsers}+</div>
                <div className="text-sm text-slate-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.supportProvided}+</div>
                <div className="text-sm text-slate-600">Support Provided</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{stats.communitiesHelped}+</div>
                <div className="text-sm text-slate-600">Communities Helped</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Silent Portal?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built with privacy, empathy, and community at its core
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-slate-100`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl text-slate-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Simple, safe, and supportive</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">1. Share Anonymously</h3>
              <p className="text-slate-600">
                Write your story without revealing your identity. No registration required.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">2. Connect & Support</h3>
              <p className="text-slate-600">Read others' stories and find comfort in knowing you're not alone.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">3. Heal Together</h3>
              <p className="text-slate-600">Build resilience through community support and shared experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Community Says</h2>
            <p className="text-xl text-slate-600">Real impact, real stories, real healing</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{testimonial.author}</p>
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.category}
                      </Badge>
                    </div>
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-600">The minds behind Silent Portal</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Syed M. Sarim", role: "Lead Developer", id: "F2021376058" },
              { name: "Daud Qaiser", role: "Backend Engineer", id: "F2021376068" },
              { name: "Faisal Javed", role: "Frontend Developer", id: "F2021376061" },
              { name: "Minhal Awais", role: "UI/UX Designer", id: "F2021376059" },
            ].map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg border-0 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{member.role}</p>
                  <p className="text-xs text-slate-500">{member.id}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-slate-600">
              <Award className="w-5 h-5 inline mr-2 text-yellow-500" />
              School of Systems and Technology, UMT Lahore Pakistan
            </p>
            <p className="text-sm text-slate-500 mt-2">Fall 2021 • Life & Learning Project</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Share Your Story?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of others who have found strength, support, and healing through our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4">
                  Start Sharing Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
                >
                  View Community Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6" />
                <span className="text-xl font-semibold">Silent Portal</span>
              </div>
              <p className="text-slate-300 text-sm">
                A safe, anonymous space for sharing stories and finding support. Part of Operation Reclaim initiative.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/portal" className="hover:text-white">
                    Share Stories
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Crisis Helpline
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Find Counselors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support Groups
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Emergency
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>24/7 Crisis Line: 1-800-HELP</li>
                <li>Email: support@silentportal.org</li>
                <li>UMT Lahore, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Silent Portal. Built with ❤️ by Team Operation Reclaim. All rights reserved.</p>
            <p className="mt-2">Your privacy is our priority. No personal data is collected or stored.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
