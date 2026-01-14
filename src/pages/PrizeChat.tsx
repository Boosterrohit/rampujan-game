"use client"

import { useState, useEffect, useRef } from "react"
import { Gift, MessageCircle, Clock } from "lucide-react"
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
    <main className="h-screen overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <MessageCircle className="w-10 h-10 text-primary" />
            Prize Chat
          </h1>
          <p className="text-muted-foreground">Chat, claim, and track your prizes</p>
        </div>

        {/* Points */}
        <Card className="mb-6">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Available Coins</p>
              <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
            </div>
            <Gift className="w-8 h-8 text-primary opacity-50" />
          </CardContent>
        </Card>

        {/* Main */}
        <div className="flex-1 grid lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Chat */}
          <div className="lg:col-span-2 flex flex-col border rounded-lg overflow-hidden">
            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    {msg.prize && (
                      <div className="mt-2 pt-2 border-t flex items-center gap-1 text-xs">
                        <Gift className="w-4 h-4" />
                        {msg.prize}
                      </div>
                    )}
                    <p className="text-xs opacity-60 mt-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t p-4 grid grid-cols-2 gap-2">
              {messageOptions.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Prizes */}
          <div className="overflow-y-auto">
            <h3 className="font-bold mb-4">Available Prizes</h3>
            <div className="space-y-3">
              {availablePrizes.map((prize) => (
                <Card key={prize.id} className={userPoints < prize.coins ? "opacity-50" : ""}>
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{prize.name}</p>
                    <p className="text-xs text-muted-foreground">{prize.points}</p>
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <Clock className="w-3 h-3" />
                      {prize.time}
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 text-xs"
                      disabled={userPoints < prize.coins}
                      onClick={() => handleClaimPrize(prize)}
                    >
                      {userPoints < prize.coins ? "Not Enough" : "Claim"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
