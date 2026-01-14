"use client"

import { useState } from "react"
import { RotateCw, Star, Zap, Trophy, Target, Coins, Sparkles, Crown, Award, TrendingUp, Gift, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SpinResult {
  reward: string
  amount: number
  rarity: "common" | "rare" | "epic" | "legendary"
  icon: React.ComponentType<{ className?: string }>
}

export default function FreeSpin() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastReward, setLastReward] = useState<SpinResult | null>(null)
  const [spinCount, setSpinCount] = useState(0)
  const [coins, setCoins] = useState(2450)
  const [totalSpins, setTotalSpins] = useState(47)
  const [bestWin, setBestWin] = useState(1000)

  const rewards: SpinResult[] = [
    { reward: "Coins", amount: 100, rarity: "common", icon: Coins },
    { reward: "Bonus", amount: 250, rarity: "rare", icon: Gift },
    { reward: "Jackpot", amount: 500, rarity: "epic", icon: Trophy },
    { reward: "Mega Win", amount: 1000, rarity: "legendary", icon: Crown },
    { reward: "Coins", amount: 150, rarity: "common", icon: Coins },
    { reward: "Lucky Draw", amount: 300, rarity: "rare", icon: Sparkles },
    { reward: "Prize", amount: 200, rarity: "common", icon: Award },
    { reward: "Treasure", amount: 750, rarity: "epic", icon: Target },
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
      setTotalSpins(totalSpins + 1)
      if (selectedReward.amount > bestWin) {
        setBestWin(selectedReward.amount)
      }
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl border-2 border-primary">
              <RotateCw className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text drop-shadow-lg">
              FREE SPINS
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-medium">🎰 Test your luck and win big prizes!</p>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2 text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
              <Timer className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary">3 spins left</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-secondary/10 px-4 py-2 rounded-full border border-secondary/30">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="font-semibold text-secondary">Next reset: 12h</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <Card className="mb-12 border-2 border-primary/30 bg-gradient-to-r from-primary/5 via-card to-secondary/5 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Award className="w-5 h-5" />
              Your Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <Coins className="w-6 h-6 text-primary mx-auto mb-2 drop-shadow-lg" />
                <div className="text-xl font-bold text-primary drop-shadow-md">{coins.toLocaleString()}</div>
                <div className="text-xs text-primary/80 font-medium">Total Coins</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                <RotateCw className="w-6 h-6 text-secondary mx-auto mb-2 drop-shadow-lg" />
                <div className="text-xl font-bold text-secondary drop-shadow-md">{spinCount}</div>
                <div className="text-xs text-secondary/80 font-medium">Today's Spins</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <Trophy className="w-6 h-6 text-primary mx-auto mb-2 drop-shadow-lg" />
                <div className="text-xl font-bold text-primary drop-shadow-md">{bestWin}</div>
                <div className="text-xs text-primary/80 font-medium">Best Win</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
                <Target className="w-6 h-6 text-secondary mx-auto mb-2 drop-shadow-lg" />
                <div className="text-xl font-bold text-secondary drop-shadow-md">{totalSpins}</div>
                <div className="text-xs text-secondary/80 font-medium">Total Spins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spin Wheel */}
        <div className="flex flex-col items-center space-y-8">
          {/* Wheel Container */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Outer Ring */}
          <div className="absolute w-full h-full rounded-full border-4 border-primary shadow-2xl"></div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30">
            <div className="w-8 h-12 bg-gradient-to-b from-primary to-secondary rounded-b-full shadow-2xl border-2 border-primary flex items-end justify-center pb-1">
              <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
            </div>
          </div>

            {/* Wheel */}
            <div
              className={`relative w-full h-full rounded-full shadow-2xl spin-wheel ${isSpinning ? 'spin-continuous' : ''}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                background:
                  "conic-gradient(from 0deg, hsl(45, 93%, 47%) 0deg 45deg, hsl(260, 80%, 50%) 45deg 90deg, hsl(45, 93%, 47%) 90deg 135deg, hsl(260, 80%, 50%) 135deg 180deg, hsl(45, 93%, 47%) 180deg 225deg, hsl(260, 80%, 50%) 225deg 270deg, hsl(45, 93%, 47%) 270deg 315deg, hsl(260, 80%, 50%) 315deg 360deg)",
                border: '8px solid hsl(45, 93%, 40%)',
              }}
            >
              {/* Gold Dividers */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${index * 45}deg)`,
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 w-1 h-8 bg-white shadow-lg"
                    style={{
                      transform: 'translateX(-50%)',
                    }}
                  ></div>
                </div>
              ))}

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
                    className="text-center text-white ml-24 drop-shadow-lg flex flex-col items-center justify-center"
                    style={{
                      transform: `translateY(-130px) rotate(${-index * 45}deg)`,
                    }}
                  >
                    <reward.icon className="w-6 h-6 mb-1 drop-shadow-md" />
                    <div className="font-bold text-sm leading-tight drop-shadow-md">{reward.reward}</div>
                    <div className="text-sm opacity-90 font-bold drop-shadow-md">{reward.amount}</div>
                  </div>
                </div>
              ))}

              {/* Center Circle */}
              <div className="absolute inset-0 m-auto w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-red-500 flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-primary-foreground mx-auto mb-1 drop-shadow-sm" />
                  <div className="text-xs font-bold text-primary-foreground drop-shadow-sm">SPIN</div>
                </div>
              </div>

              {/* Inner Gold Ring */}
              <div className="absolute inset-0 m-auto w-32 h-32 rounded-full border-2 border-primary"></div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center space-y-4">
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              size="lg"
              className="gap-3 px-10 py-6 text-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 border-2 border-primary"
            >
              <RotateCw className={`w-7 h-7 ${isSpinning ? "animate-spin" : ""}`} />
              {isSpinning ? "Spinning..." : "SPIN NOW"}
              {!isSpinning && <Sparkles className="w-6 h-6" />}
            </Button>
            <p className="text-sm text-muted-foreground font-medium">
              {isSpinning ? "🎰 Good luck!" : "🎰 3 free spins remaining today"}
            </p>
          </div>

          {/* Last Reward */}
          {lastReward && (
            <Card className={`w-full max-w-md border-2 bg-gradient-to-r ${rarityColors[lastReward.rarity]}/10 shadow-2xl border-primary/30`}>
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${rarityColors[lastReward.rarity]} flex items-center justify-center shadow-xl border-2 border-primary`}>
                      <lastReward.icon className="w-7 h-7 text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-primary fill-primary drop-shadow-lg" />
                    <p className="text-primary text-sm uppercase tracking-widest font-bold drop-shadow-md">{lastReward.rarity}</p>
                    <Star className="w-5 h-5 text-primary fill-primary drop-shadow-lg" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground drop-shadow-lg">{lastReward.reward}</h3>
                  <p className="text-4xl gradient-text font-bold drop-shadow-lg">+{lastReward.amount} Coins</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Gift className="w-4 h-4" />
                    <span className="font-medium">🎰 Reward claimed successfully!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
