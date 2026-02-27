
"use client"

import { useState, useEffect } from "react"
import { RotateCw, Star, Zap, Trophy, Target, Coins, Sparkles, Crown, Award, TrendingUp, Gift, Timer, Gamepad2, Diamond, Flame, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import RouletteWheel from "./RouletteWheel"
import { spinService } from "@/services/spinService";
// import RouletteWheel from "./webUser/RouletteWheel"

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
  const [spinLoading, setSpinLoading] = useState(false);

  const rewards = selectedCampaign?.rewards || []

  const wheelData = rewards.map(reward => ({
    option: reward.reward
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
        { reward: "$0", amount: 100, rarity: "common", icon: Coins },
        { reward: "$2", amount: 250, rarity: "rare", icon: Gift },
        { reward: "$5", amount: 500, rarity: "epic", icon: Trophy },
        { reward: "$0", amount: 1000, rarity: "legendary", icon: Crown },
        { reward: "$1", amount: 150, rarity: "common", icon: Coins },
        { reward: "$0", amount: 750, rarity: "epic", icon: Target },
        { reward: "$3", amount: 300, rarity: "rare", icon: Sparkles },
        { reward: "$4", amount: 200, rarity: "common", icon: Award },
      ]
    },
    {
      id: "bonus",
      name: "Bonus Spin",
      description: "Special bonus spins with higher rewards",
      icon: Gift,
      color: "from-green-400 to-orange-500",
      difficulty: "Medium",
      spinsRequired: 1,
      rewards: [
        { reward: "5%", amount: 100, rarity: "common", icon: Coins },
        { reward: "50%", amount: 250, rarity: "rare", icon: Gift },
        { reward: "25%", amount: 500, rarity: "epic", icon: Trophy },
        { reward: "70%", amount: 1000, rarity: "legendary", icon: Crown },
        { reward: "60%", amount: 150, rarity: "common", icon: Coins },
        { reward: "30%", amount: 300, rarity: "rare", icon: Sparkles },
        { reward: "40%", amount: 200, rarity: "common", icon: Award },
        { reward: "10%", amount: 750, rarity: "epic", icon: Target },
      ]
    },
  ]

  // Set default campaign on mount
  useEffect(() => {
    if (!selectedCampaign && campaigns.length > 0) {
      setSelectedCampaign(campaigns[0])
    }
  }, [campaigns, selectedCampaign])

  const handleSpin = async () => {
    if (isSpinning || spinLoading) return;

    setSpinLoading(true);
    try {
      let index = Math.floor(Math.random() * rewards.length);

      // for classic campaign, request server to determine win
      if (selectedCampaign?.id === "classic") {
        const resp = await spinService.freeSpin();
        const winAmount = resp.winAmount;

        // attempt to interpret winAmount as the dollar value shown on the wheel
        if (typeof winAmount === "number") {
          const label = `$${winAmount}`;
          const byLabel = rewards.findIndex((r) => r.reward === label);
          if (byLabel !== -1) {
            index = byLabel;
          } else if (winAmount >= 0 && winAmount < rewards.length) {
            // maybe the backend returned an index
            index = winAmount;
          } else {
            // fallback match on internal amount field if it's meaningful
            const match = rewards.findIndex((r) => r.amount === winAmount);
            if (match !== -1) {
              index = match;
            } else {
              console.warn("winAmount not found on wheel, using random index", winAmount);
            }
          }
        }
      }

      setPrizeNumber(index);
    } catch (err) {
      console.error("spin attempt failed", err);
      // could show toast here
    } finally {
      setSpinLoading(false);
      setIsSpinning(true);
    }
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
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">Select Campaign</h2>
                <p className="text-muted-foreground text-sm mt-1">Choose your preferred gaming experience</p>
              </div>

              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-900/40 backdrop-blur-sm border transition-all duration-300 p-4 ${
  campaign.id === "bonus"
    ? "from-green-900/20 via-emerald-500/20 to-green-900/40"
    : "from-purple-500/20 via-pink-500/20 to-purple-900/40"
}`}
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${campaign.color} flex items-center justify-center shadow-lg shadow-purple-500/50`}>
                        <campaign.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-white">{campaign.name}</h3>
                        <p className="text-xs text-gray-300">{campaign.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            campaign.difficulty === 'Easy' ? 'bg-green-400/20 text-green-300 border border-green-400/30' :
                            campaign.difficulty === 'Medium' ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30' :
                            'bg-red-400/20 text-red-300 border border-red-400/30'
                          }`}>
                            {campaign.difficulty}
                          </span>
                          <span className="text-xs text-gray-300">
                            {campaign.spinsRequired} spin{campaign.spinsRequired > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Info */}
            {selectedCampaign && (
              <div className="relative group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-900/40 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 p-6">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                      <selectedCampaign.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{selectedCampaign.name.toUpperCase()}</h3>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4">{selectedCampaign.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Difficulty:</span>
                      <div className={`font-semibold ${
                        selectedCampaign.difficulty === 'Easy' ? 'text-green-400' :
                        selectedCampaign.difficulty === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {selectedCampaign.difficulty}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Spins:</span>
                      <div className="font-semibold text-cyan-400">{selectedCampaign.spinsRequired}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              {selectedCampaign && (
                <>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-2 
            shadow-[0_0_4px_rgba(168,85,247,0.8),0_0_10px_rgba(236,72,153,0.6)]} flex items-center justify-center shadow-xl `}>
                      <selectedCampaign.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500">
                      {selectedCampaign.name}
                    </h1>
                  </div>
                  <p className="text-muted-foreground text-lg font-medium">{selectedCampaign.description}</p>
                </>
              )}
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="flex items-center gap-2 text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/30">
                  <Timer className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">1 spin per day</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-secondary/10 px-4 py-2 rounded-full border border-secondary/30">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <span className="font-semibold text-secondary">Next reset: 24h</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-900/40 backdrop-blur-sm border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 p-6 mb-12 shadow-2xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">YOUR STATISTICS</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-yellow-500/30 hover:border-yellow-500/60">
                    <Coins className="w-6 h-6 text-primary mx-auto mb-2 drop-shadow-lg" />
                    <div className="text-xl font-bold text-primary drop-shadow-md">{coins.toLocaleString()}</div>
                    <div className="text-xs text-primary/80 font-medium">Total Coins</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-purple-500/30 hover:border-purple-500/60">
                    <RotateCw className="w-6 h-6 text-purple-600 mx-auto mb-2 drop-shadow-lg" />
                    <div className="text-xl font-bold text-purple-600 drop-shadow-md">{spinCount}</div>
                    <div className="text-xs text-purple-600 font-medium">Today's Spins</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-yellow-500/30 hover:border-yellow-500/60">
                    <Trophy className="w-6 h-6 text-primary mx-auto mb-2 drop-shadow-lg" />
                    <div className="text-xl font-bold text-primary drop-shadow-md">{bestWin}</div>
                    <div className="text-xs text-primary/80 font-medium">Best Win</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-purple-500/30 hover:border-purple-500/60">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2 drop-shadow-lg" />
                    <div className="text-xl font-bold text-purple-600 drop-shadow-md">{totalSpins}</div>
                    <div className="text-xs text-purple-600 font-medium">Total Spins</div>
                  </div>
                </div>
              </div>
            </div>

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
                    variant="default"
                    size="sm"

                    onClick={handleSpin}
                    disabled={isSpinning || spinLoading || !selectedCampaign}
                    className=" gap-3 px-10 py-2 text-xl font-bold
              bg-gradient-to-r from-purple-600 to-pink-600
drop-shadow-[0_0_1px_#38bdf8]
drop-shadow-[0_0_2px_#a855f7]
drop-shadow-[0_0_3px_#ec4899] text-white
                "
                  >
                    <RotateCw className={`w-7 h-7 ${isSpinning || spinLoading ? "animate-spin" : "hidden"}`} />
                  {spinLoading ? "Processing..." : isSpinning ? "Spinning..." : selectedCampaign ? `SPIN` : "SELECT CAMPAIGN"}
                  {!isSpinning && !spinLoading && selectedCampaign && <Sparkles className="w-6 h-6" />}
                  </Button>
                <p className="text-sm text-muted-foreground font-medium">
                  {isSpinning ? "🎰 Good luck!" : selectedCampaign ? `🎰 ${selectedCampaign.spinsRequired} spin${selectedCampaign.spinsRequired > 1 ? 's' : ''} required • ${3 - (spinCount % selectedCampaign.spinsRequired)} remaining` : "🎰 Choose a campaign to start spinning"}
                </p>
              </div>

              {/* Last Reward */}
              {lastReward && (
                <div className={`w-full max-w-md relative group rounded-2xl overflow-hidden bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-purple-900/40 backdrop-blur-sm border border-green-500/30 hover:border-green-500/60 transition-all duration-300 p-8 shadow-2xl`}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="text-center space-y-4 relative z-10">
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
                    <h3 className="text-4xl gradient-text font-bold drop-shadow-lg">{lastReward.reward}</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                      <Gift className="w-4 h-4" />
                      <span className="font-medium">🎰 Reward claimed successfully!</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}