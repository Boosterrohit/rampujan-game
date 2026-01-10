"use client"

import { useState } from "react"
import { Send, Gift, MessageCircle, Clock } from "lucide-react"
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

  const [inputValue, setInputValue] = useState("")
  const [userPoints] = useState(2450)

  const availablePrizes: AvailablePrize[] = [
    { id: 1, name: "Premium Badge", coins: 500, points: "500 pts", time: "Instant" },
    { id: 2, name: "Bonus Coins x2", coins: 1000, points: "1000 pts", time: "Instant" },
    { id: 3, name: "Mystery Box", coins: 1500, points: "1500 pts", time: "2 hours" },
    { id: 4, name: "VIP Membership", coins: 2000, points: "2000 pts", time: "1 day" },
    { id: 5, name: "Jackpot Ticket", coins: 2500, points: "2500 pts", time: "Instant" },
    { id: 6, name: "Legendary Badge", coins: 3000, points: "3000 pts", time: "3 days" },
  ]

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newUserMessage: ChatMessage = {
      id: messages.length + 1,
      sender: "user",
      message: inputValue,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newUserMessage])
    setInputValue("")

    // Simulate system response
    setTimeout(() => {
      const responses = [
        "Great choice! Your prize is ready to claim.",
        "Thanks for playing! Check your rewards.",
        "You are doing amazing! Keep spinning.",
        "Your prize has been added to your account.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const systemMessage: ChatMessage = {
        id: messages.length + 2,
        sender: "system",
        message: randomResponse,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, systemMessage])
    }, 1000)
  }

  const handleClaimPrize = (prize: AvailablePrize) => {
    if (userPoints >= prize.coins) {
      const claimMessage: ChatMessage = {
        id: messages.length + 1,
        sender: "system",
        message: `You claimed "${prize.name}"! ${prize.coins} coins deducted.`,
        prize: prize.name,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages([...messages, claimMessage])
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 h-screen flex flex-col">
        {/* Header */}
        <div className="space-y-2 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
            <MessageCircle className="w-10 h-10 text-primary" />
            Prize Chat
          </h1>
          <p className="text-muted-foreground">Chat, claim, and track your prizes</p>
        </div>

        {/* User Points */}
        <Card className="mb-6 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Coins</p>
                <p className="text-2xl font-bold gradient-text">{userPoints.toLocaleString()}</p>
              </div>
              <Gift className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 grid lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Chat Section */}
          <div className="lg:col-span-2 flex flex-col border border-border rounded-lg bg-card/50 overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    {msg.prize && (
                      <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        <span className="text-xs font-semibold">{msg.prize}</span>
                      </div>
                    )}
                    <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={handleSendMessage} size="sm" className="gap-2">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Available Prizes */}
          <div className="lg:col-span-1 flex flex-col overflow-hidden">
            <h3 className="text-lg font-bold mb-4">Available Prizes</h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {availablePrizes.map((prize) => (
                <Card
                  key={prize.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 ${
                    userPoints < prize.coins ? "opacity-50" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm mb-2">{prize.name}</p>
                    <div className="space-y-2 mb-3">
                      <div className="text-xs text-muted-foreground">
                        <span className="block">{prize.points}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{prize.time}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleClaimPrize(prize)}
                      disabled={userPoints < prize.coins}
                      size="sm"
                      className="w-full text-xs"
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
