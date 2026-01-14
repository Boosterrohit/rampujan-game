"use client"

import { useState, useEffect } from "react"
import { RotateCw, Star, Zap, Trophy, Target, Coins, Sparkles, Crown, Award, TrendingUp, Gift, Timer, Gamepad2, Diamond, Flame, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RouletteWheel from "./spinner/RouletteWheel"

interface SpinResult {
  reward: string
  amount: number
  rarity: "common" | "rare" | "epic" | "legendary"
  icon: React.ComponentType<{ className?: string }>
}

interface Campaign {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  rewards: SpinResult[]
  difficulty: "Easy" | "Medium" | "Hard"
  spinsRequired: number
}

export default function FreeSpin() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [lastReward, setLastReward] = useState<SpinResult | null>(null)
  const [spinCount, setSpinCount] = useState(0)
  const [coins, setCoins] = useState(2450)
  const [totalSpins, setTotalSpins] = useState(47)
  const [bestWin, setBestWin] = useState(1000)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const rewards = selectedCampaign?.rewards || []

  const wheelData = rewards.map(reward => ({
    option: `${reward.reward}\n${reward.amount}`
  }))

  const rarityColors = {
    common: "from-gray-400 to-gray-500",
    rare: "from-blue-400 to-blue-500",
    epic: "from-purple-400 to-purple-500",
    legendary: "from-primary to-secondary",
  }

  const campaigns: Campaign[] = [
    {
      id: "classic",
      name: "Classic Spin",
      description: "Traditional spinning experience with balanced rewards",
      icon: Gamepad2,
      color: "from-primary to-secondary",
      difficulty: "Easy",
      spinsRequired: 1,
      rewards: [
        { reward: "Coins", amount: 100, rarity: "common", icon: Coins },
        { reward: "Bonus", amount: 250, rarity: "rare", icon: Gift },
        { reward: "Jackpot", amount: 500, rarity: "epic", icon: Trophy },
        { reward: "Mega Win", amount: 1000, rarity: "legendary", icon: Crown },
        { reward: "Coins", amount: 150, rarity: "common", icon: Coins },
        { reward: "Lucky Draw", amount: 300, rarity: "rare", icon: Sparkles },
        { reward: "Prize", amount: 200, rarity: "common", icon: Award },
        { reward: "Treasure", amount: 750, rarity: "epic", icon: Target },
      ]
    },
    {
      id: "premium",
      name: "Premium Quest",
      description: "High-stakes spinning with exclusive diamond rewards",
      icon: Diamond,
      color: "from-purple-500 to-pink-500",
      difficulty: "Medium",
      spinsRequired: 3,
      rewards: [
        { reward: "Diamond", amount: 50, rarity: "common", icon: Diamond },
        { reward: "Gold Bar", amount: 200, rarity: "rare", icon: Trophy },
        { reward: "VIP Pass", amount: 1, rarity: "epic", icon: Crown },
        { reward: "Legendary Chest", amount: 1, rarity: "legendary", icon: Target },
        { reward: "Diamond", amount: 75, rarity: "common", icon: Diamond },
        { reward: "Mystery Box", amount: 150, rarity: "rare", icon: Sparkles },
        { reward: "Bonus Spin", amount: 5, rarity: "common", icon: RotateCw },
        { reward: "Epic Mount", amount: 1, rarity: "epic", icon: Award },
      ]
    },
    {
      id: "fiery",
      name: "Fiery Challenge",
      description: "Intense spinning with fire-themed rewards",
      icon: Flame,
      color: "from-red-500 to-orange-500",
      difficulty: "Hard",
      spinsRequired: 5,
      rewards: [
        { reward: "Fire Crystal", amount: 25, rarity: "common", icon: Flame },
        { reward: "Phoenix Feather", amount: 100, rarity: "rare", icon: Sparkles },
        { reward: "Dragon Egg", amount: 1, rarity: "epic", icon: Target },
        { reward: "Inferno Sword", amount: 1, rarity: "legendary", icon: Sword },
        { reward: "Fire Crystal", amount: 50, rarity: "common", icon: Flame },
        { reward: "Blaze Potion", amount: 75, rarity: "rare", icon: Trophy },
        { reward: "Ember Shard", amount: 30, rarity: "common", icon: Award },
        { reward: "Volcano Key", amount: 1, rarity: "epic", icon: Crown },
      ]
    }
  ]

  // Set default campaign on mount
  useEffect(() => {
    if (!selectedCampaign && campaigns.length > 0) {
      setSelectedCampaign(campaigns[0])
    }
  }, [campaigns, selectedCampaign])

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const randomIndex = Math.floor(Math.random() * rewards.length)
    setPrizeNumber(randomIndex)
  }

  const handleStopSpinning = () => {
    const selectedReward = rewards[prizeNumber]
    setLastReward(selectedReward)
    setCoins(coins + selectedReward.amount)
    setSpinCount(spinCount + 1)
    setTotalSpins(totalSpins + 1)
    if (selectedReward.amount > bestWin) {
      setBestWin(selectedReward.amount)
    }
    setIsSpinning(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Campaign Selection Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold gradient-text">Select Campaign</h2>
                <p className="text-muted-foreground text-sm mt-1">Choose your preferred gaming experience</p>
              </div>

              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCampaign?.id === campaign.id
                        ? 'border-primary shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${campaign.color} flex items-center justify-center`}>
                          <campaign.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{campaign.name}</h3>
                          <p className="text-xs text-muted-foreground">{campaign.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              campaign.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                              campaign.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {campaign.difficulty}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {campaign.spinsRequired} spin{campaign.spinsRequired > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Campaign Info */}
            {selectedCampaign && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <selectedCampaign.icon className="w-5 h-5 text-primary" />
                    {selectedCampaign.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{selectedCampaign.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Difficulty:</span>
                      <div className={`font-semibold ${
                        selectedCampaign.difficulty === 'Easy' ? 'text-green-600' :
                        selectedCampaign.difficulty === 'Medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedCampaign.difficulty}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spins:</span>
                      <div className="font-semibold text-primary">{selectedCampaign.spinsRequired}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          {selectedCampaign && (
            <>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${selectedCampaign.color} flex items-center justify-center shadow-xl border-2 border-primary`}>
                  <selectedCampaign.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text drop-shadow-lg">
                  {selectedCampaign.name}
                </h1>
              </div>
              <p className="text-muted-foreground text-lg font-medium">{selectedCampaign.description}</p>
            </>
          )}
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
          {/* Roulette Wheel */}
          {wheelData.length > 0 && (
            <RouletteWheel
              data={wheelData}
              mustSpin={isSpinning}
              prizeNumber={prizeNumber}
              onStopSpinning={handleStopSpinning}
            />
          )}

          {/* Spin Button */}
          <div className="text-center space-y-4">
            <Button
              onClick={handleSpin}
              disabled={isSpinning || !selectedCampaign}
              size="lg"
              className="gap-3 px-10 py-6 text-xl font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 border-2 border-primary"
            >
              <RotateCw className={`w-7 h-7 ${isSpinning ? "animate-spin" : ""}`} />
              {isSpinning ? "Spinning..." : selectedCampaign ? `SPIN` : "SELECT CAMPAIGN"}
              {!isSpinning && selectedCampaign && <Sparkles className="w-6 h-6" />}
            </Button>
            <p className="text-sm text-muted-foreground font-medium">
              {isSpinning ? "🎰 Good luck!" : selectedCampaign ? `🎰 ${selectedCampaign.spinsRequired} spin${selectedCampaign.spinsRequired > 1 ? 's' : ''} required • ${3 - (spinCount % selectedCampaign.spinsRequired)} remaining` : "🎰 Choose a campaign to start spinning"}
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
      </div>
      </div>
    </main>
  )
}