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
           <div className="rounded-lg p-[2px] bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full rounded-lg bg-background text-foreground shadow-none border-none flex items-center gap-2 hover:bg-background/80 transition-colors"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  </div>

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">Help Center</h1>
        </div>

       

        <div className="grid gap-6 md:grid-cols-2">
  {helpTopics.map((topic, index) => {
    const Icon = topic.icon;
    
    // Define color scheme for each card
    const colorSchemes = [
      {
        bg: "bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-900/40",
        border: "border-orange-500/30 hover:border-orange-500/60",
        iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
        iconShadow: "shadow-orange-500/50",
        glow: "from-orange-500/10"
      },
      {
        bg: "bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40",
        border: "border-purple-500/30 hover:border-purple-500/60",
        iconBg: "bg-gradient-to-br from-pink-400 to-purple-500",
        iconShadow: "shadow-purple-500/50",
        glow: "from-purple-500/10"
      },
      {
        bg: "bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-900/40",
        border: "border-cyan-500/30 hover:border-cyan-500/60",
        iconBg: "bg-gradient-to-br from-cyan-400 to-blue-500",
        iconShadow: "shadow-cyan-500/50",
        glow: "from-cyan-500/10"
      },
      {
        bg: "bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-purple-900/40",
        border: "border-green-500/30 hover:border-green-500/60",
        iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
        iconShadow: "shadow-green-500/50",
        glow: "from-green-500/10"
      }
    ];
    
    const scheme = colorSchemes[index];
    
    return (
      <div 
        key={index} 
        className={`relative group cursor-pointer rounded-2xl overflow-hidden ${scheme.bg} backdrop-blur-sm border ${scheme.border} transition-all duration-300 p-6 md:p-8`}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${scheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl ${scheme.iconBg} flex items-center justify-center mb-4 shadow-lg ${scheme.iconShadow}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {topic.title.toUpperCase()}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">
          {topic.description}
        </p>

        {/* Content */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {topic.content}
        </p>
      </div>
    );
  })}
</div>

        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Still need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact our support team for personalized assistance.
              </p>
            
                 <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate("/prize-chat")}
                    className=" w-full
              bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white
                "
                  >
                    Contact Support
                  </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}