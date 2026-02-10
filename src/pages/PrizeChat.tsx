
"use client"

import { useState, useEffect, useRef } from "react"
import { Gift, MessageCircle, Clock, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ChatMessage {
  id: number
  sender: "user" | "system"
  message: string
  prize?: string
  timestamp: string
}

interface AvailablePrize {
  id: number
  name: string
  coins: number
  points: string
  time: string
}

interface MessageOption {
  id: number
  text: string
  response: string
}

export default function PrizeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "system",
      message: "Welcome to Prize Chat! You have 2,450 coins available to claim prizes.",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "system",
      message: 'You earned "Spun Master" milestone! Claim your 500 coins reward.',
      prize: "500 Coins",
      timestamp: "10:35 AM",
    },
  ])

  const [userPoints] = useState(2450)

  // ✅ THIS REF CONTROLS MESSAGE SCROLL ONLY
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // ✅ AUTO-SCROLL TO LATEST MESSAGE (CHAT ONLY)
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    container.scrollTop = container.scrollHeight
  }, [messages])

  const messageOptions: MessageOption[] = [
    { id: 1, text: "How do I earn more coins?", response: "You can earn coins by completing daily tasks, spinning the wheel, and reaching milestones!" },
    { id: 2, text: "What prizes are available?", response: "Check the Available Prizes section on the right to see all prizes you can claim with your coins." },
    { id: 3, text: "How do I claim a prize?", response: "Simply click the 'Claim' button on any prize you have enough coins for. The prize will be added to your account!" },
    { id: 4, text: "Check my balance", response: `You currently have ${userPoints} coins available to spend on amazing prizes!` },
    { id: 5, text: "Tell me about VIP Membership", response: "VIP Membership gives you exclusive benefits, bonus spins, and priority support. It costs 2,000 coins and activates within 1 day!" },
    { id: 6, text: "Help & Support", response: "Need help? Contact our support team at support@prizechat.com or check our FAQ section for common questions." },
  ]

  const availablePrizes: AvailablePrize[] = [
    { id: 1, name: "Premium Badge", coins: 500, points: "500 pts", time: "Instant" },
    { id: 2, name: "Bonus Coins x2", coins: 1000, points: "1000 pts", time: "Instant" },
    { id: 3, name: "Mystery Box", coins: 1500, points: "1500 pts", time: "2 hours" },
    { id: 4, name: "VIP Membership", coins: 2000, points: "2000 pts", time: "1 day" },
    { id: 5, name: "Jackpot Ticket", coins: 2500, points: "2500 pts", time: "Instant" },
    { id: 6, name: "Legendary Badge", coins: 3000, points: "3000 pts", time: "3 days" },
  ]

  const prizeColorSchemes = [
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
    },
    {
      bg: "bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-purple-900/40",
      border: "border-pink-500/30 hover:border-pink-500/60",
      iconBg: "bg-gradient-to-br from-pink-400 to-rose-500",
      iconShadow: "shadow-pink-500/50",
      glow: "from-pink-500/10"
    },
    {
      bg: "bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-purple-900/40",
      border: "border-yellow-500/30 hover:border-yellow-500/60",
      iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
      iconShadow: "shadow-yellow-500/50",
      glow: "from-yellow-500/10"
    }
  ]

  const handleOptionClick = (option: MessageOption) => {
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        message: option.text,
        timestamp: time,
      },
    ])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "system",
          message: option.response,
          timestamp: time,
        },
      ])
    }, 800)
  }

  const handleClaimPrize = (prize: AvailablePrize) => {
    if (userPoints < prize.coins) return

    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "system",
        message: `You claimed "${prize.name}"! ${prize.coins} coins deducted.`,
        prize: prize.name,
        timestamp: time,
      },
    ])
  }

  return (
    <main className=" overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <MessageCircle className="w-10 h-10 text-primary" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
              Prize Chat
            </span>
          </h1>
          <p className="text-muted-foreground">Chat, claim, and track your prizes</p>
        </div>

        {/* Points */}
        <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 p-6 mb-6">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex justify-between items-center relative z-10">
            <div>
              <p className="text-sm text-gray-300 mb-1">Available Coins</p>
              <p className="text-3xl font-bold text-white">{userPoints.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Gift className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 h-screen grid lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Chat */}
          <div className="h-[100vh] lg:col-span-2 flex flex-col border-2 border-primary/20 rounded-2xl overflow-hidden bg-card/50">
            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {/* Agent Avatar */}
                  {msg.sender === "system" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className="max-w-[70%]">
                    {msg.sender === "system" ? (
                      // Agent Message - Dark style
                      <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-gray-700/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-600/30 p-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <p className="text-sm text-white leading-relaxed">{msg.message}</p>
                          {msg.prize && (
                            <div className="mt-3 pt-3 border-t border-gray-600/50 flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                                <Gift className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs font-semibold text-yellow-400">{msg.prize}</span>
                            </div>
                          )}
                          <p className="text-xs text-gray-400 mt-2">{msg.timestamp}</p>
                        </div>
                      </div>
                    ) : (
                      // User Message - Gradient style
                      <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/80 via-yellow-500/80 to-orange-600/80 backdrop-blur-sm p-4 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="relative z-10">
                          <p className="text-sm text-white font-medium leading-relaxed">{msg.message}</p>
                          <p className="text-xs text-white/80 mt-2 text-right">{msg.timestamp}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {msg.sender === "user" && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-primary/20 p-4 bg-card/30">
              <p className="text-xs text-muted-foreground mb-3 font-semibold">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {messageOptions.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    variant="outline"
                    size="sm"
                    className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Prizes */}
          <div className="overflow-y-auto pr-2 h-[100vh]">
            <h3 className="font-bold text-xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
              Available Prizes
            </h3>
            <div className="space-y-4">
              {availablePrizes.map((prize, index) => {
                const scheme = prizeColorSchemes[index % prizeColorSchemes.length]
                const canAfford = userPoints >= prize.coins
                
                return (
                  <div 
                    key={prize.id} 
                    className={`relative group rounded-2xl overflow-hidden ${scheme.bg} backdrop-blur-sm border ${scheme.border} transition-all duration-300 p-4 ${!canAfford ? 'opacity-50' : ''}`}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${scheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${scheme.iconBg} flex items-center justify-center shadow-lg ${scheme.iconShadow}`}>
                          <Gift className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white text-sm mb-1">{prize.name}</p>
                          <p className="text-xs text-gray-300">{prize.points}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{prize.time}</span>
                      </div>
                      
                      {/* <Button
                        size="sm"
                        className="w-full text-xs font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        disabled={!canAfford}
                        onClick={() => handleClaimPrize(prize)}
                      >
                        {canAfford ? "Claim Prize" : `Need ${prize.coins - userPoints} more`}
                      </Button> */}
                       <Button
                    variant="default"
                    size="sm"
                    disabled={!canAfford}
                    onClick={() => handleClaimPrize(prize)}
                    className=" w-full text-xs font-semibold
              bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white
                "
                  >
                    {canAfford ? "Claim Prize" : `Need ${prize.coins - userPoints} more`}
                  </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}