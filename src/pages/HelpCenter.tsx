"use client"

import { ArrowLeft, HelpCircle, MessageCircle, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export default function HelpCenter() {
  const navigate = useNavigate()

  const helpTopics = [
    {
      icon: MessageCircle,
      title: "Getting Started",
      description: "Learn how to create your account and start playing",
      content: "Welcome to RowGaming! To get started, simply sign up for a free account and explore our exciting games. You can earn points, unlock milestones, and claim rewards through our various gaming challenges."
    },
    {
      icon: FileText,
      title: "How to Play",
      description: "Understand the rules and mechanics of our games",
      content: "Our games feature various challenges including milestone progressions, free spins, and prize chats. Each game has its own unique rules, but all are designed to be fair and fun. Check individual game pages for specific instructions."
    },
    {
      icon: Clock,
      title: "Daily Rewards",
      description: "Learn about daily free spins and rewards",
      content: "You can claim up to 3 free spins per day. These spins give you chances to win prizes and progress towards milestones. Make sure to log in daily to maximize your rewards!"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Frequently asked questions",
      content: "Q: How do I claim my prizes? A: Visit the Prize Chat page to chat with our support team and claim your earned rewards. Q: Are the games fair? A: Yes, all our games use certified random number generators."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold gradient-text">Help Center</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {helpTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <topic.icon className="w-6 h-6 text-primary" />
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">{topic.description}</p>
                <p className="text-sm">{topic.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Still need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our support team for personalized assistance.
              </p>
              <Button className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}