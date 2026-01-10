"use client"

import { useState } from "react"
import { RotateCw, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SpinResult {
  reward: string
  amount: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

export default function FreeSpin() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastReward, setLastReward] = useState<SpinResult | null>(null)
  const [spinCount, setSpinCount] = useState(0)
  const [coins, setCoins] = useState(2450)

  const rewards: SpinResult[] = [
    { reward: "Coins", amount: 100, rarity: "common" },
    { reward: "Bonus", amount: 250, rarity: "rare" },
    { reward: "Jackpot", amount: 500, rarity: "epic" },
    { reward: "Mega Win", amount: 1000, rarity: "legendary" },
    { reward: "Coins", amount: 150, rarity: "common" },
    { reward: "Lucky Draw", amount: 300, rarity: "rare" },
    { reward: "Prize", amount: 200, rarity: "common" },
    { reward: "Treasure", amount: 750, rarity: "epic" },
  ]

  const rarityColors = {
    common: "from-gray-400 to-gray-500",
    rare: "from-blue-400 to-blue-500",
    epic: "from-purple-400 to-purple-500",
    legendary: "from-primary to-secondary",
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const randomIndex = Math.floor(Math.random() * rewards.length)
    const selectedReward = rewards[randomIndex]
    const finalRotation = randomIndex * 45 + Math.random() * 45

    // Start continuous spinning
    setRotation(prev => prev + 720) // Add base rotations for continuous spin

    setTimeout(() => {
      // Stop continuous spinning and set final position
      setRotation(prev => {
        const currentRotation = prev % 360
        return prev - currentRotation + finalRotation
      })
      setLastReward(selectedReward)
      setCoins(coins + selectedReward.amount)
      setSpinCount(spinCount + 1)
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Free Spins</h1>
          <p className="text-muted-foreground">Spin daily for amazing rewards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">Total Coins</p>
              <p className="text-3xl font-bold gradient-text">{coins.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground text-sm mb-2">Spins Today</p>
              <p className="text-3xl font-bold text-primary">{spinCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Spin Wheel */}
        <div className="flex flex-col items-center space-y-8">
          {/* Wheel Container */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-4 h-8 bg-primary rounded-b-full shadow-lg" />
            </div>

            {/* Wheel */}
            <div
              className={`relative w-full h-full rounded-full border-8 border-primary shadow-2xl spin-wheel ${isSpinning ? 'spin-continuous' : ''}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                background:
                  "conic-gradient(from 0deg, #FF6B35 0deg 45deg, #004E89 45deg 90deg, #F77F00 90deg 135deg, #7209B7 135deg 180deg, #FF006E 180deg 225deg, #00D9FF 225deg 270deg, #FFBE0B 270deg 315deg, #A8DADC 315deg 360deg)",
              }}
            >
              {/* Segment Labels */}
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${index * 45}deg)`,
                  }}
                >
                  <div
                    className="text-center font-bold text-white drop-shadow-lg"
                    style={{
                      transform: `translateY(-130px) rotate(${-index * 45}deg)`,
                      fontSize: "12px",
                    }}
                  >
                    <div>{reward.reward}</div>
                    <div className="text-xs opacity-90">{reward.amount}</div>
                  </div>
                </div>
              ))}

              {/* Center Circle */}
              <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button onClick={handleSpin} disabled={isSpinning} size="lg" className="gap-2">
            <RotateCw className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
            {isSpinning ? "Spinning..." : "Spin Now"}
          </Button>

          {/* Last Reward */}
          {lastReward && (
            <Card className={`w-full border-2 bg-gradient-to-r ${rarityColors[lastReward.rarity]}/10`}>
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-6 h-6 text-primary fill-primary" />
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">{lastReward.rarity}</p>
                  </div>
                  <p className="text-3xl font-bold">{lastReward.reward}</p>
                  <p className="text-2xl gradient-text font-bold">+{lastReward.amount} Coins</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
