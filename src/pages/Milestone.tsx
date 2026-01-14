"use client"

import { useState } from "react"
import { CheckCircle2, Lock, Trophy, Star, Target, Zap, Crown, Award, TrendingUp, Gift, Medal, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProgressBar from "@/components/ProgressBar"

interface Milestone {
  id: number
  title: string
  description: string
  reward: string
  progress: number
  total: number
  completed: boolean
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export default function Milestone() {
  const [milestones] = useState<Milestone[]>([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first spin",
      reward: "100 Coins",
      progress: 1,
      total: 1,
      completed: true,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      id: 2,
      title: "Spun Master",
      description: "Spin 50 times",
      reward: "500 Coins",
      progress: 42,
      total: 50,
      completed: false,
      icon: Zap,
      color: "text-blue-500",
    },
    {
      id: 3,
      title: "Champion",
      description: "Win 10 times",
      reward: "1000 Coins + Badge",
      progress: 7,
      total: 10,
      completed: false,
      icon: Trophy,
      color: "text-orange-500",
    },
    {
      id: 4,
      title: "Legend",
      description: "Collect 5000 Coins",
      reward: "Exclusive Badge",
      progress: 3200,
      total: 5000,
      completed: false,
      icon: Crown,
      color: "text-purple-500",
    },
    {
      id: 5,
      title: "Elite Member",
      description: "Reach Level 25",
      reward: "VIP Status",
      progress: 18,
      total: 25,
      completed: false,
      icon: Medal,
      color: "text-green-500",
    },
    {
      id: 6,
      title: "Immortal",
      description: "Unlock all achievements",
      reward: "Platinum Badge",
      progress: 3,
      total: 6,
      completed: false,
      icon: Flame,
      color: "text-red-500",
    },
  ])

  const totalProgress =
    milestones.reduce((acc, m) => acc + (m.completed ? 100 : (m.progress / m.total) * 100), 0) / milestones.length
  const completedCount = milestones.filter((m) => m.completed).length

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Milestones</h1>
          </div>
          <p className="text-muted-foreground text-lg">Unlock achievements and earn exclusive rewards</p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{completedCount} Completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-semibold">{Math.round(totalProgress)}% Progress</span>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-12 border-primary/20 bg-gradient-to-r from-card to-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar current={completedCount} total={milestones.length} label="Milestones Completed" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
                <div className="text-2xl font-bold text-primary">{completedCount}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
                <div className="text-2xl font-bold text-blue-500">{milestones.length - completedCount}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
                <div className="text-2xl font-bold text-green-500">{Math.round(totalProgress)}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50 border border-border">
                <div className="text-2xl font-bold text-purple-500">
                  {/* {milestones.reduce((acc, m) => acc + m.reward.split(' ')[0], 0) || '∞'} */}
                  30
                </div>
                <div className="text-xs text-muted-foreground">Rewards</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {milestones.map((milestone) => (
            <Card
              key={milestone.id}
              className={`transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                milestone.completed
                  ? "border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg"
                  : "hover:border-primary/50"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      milestone.completed
                        ? 'bg-primary/20 border-2 border-primary'
                        : 'bg-muted border-2 border-muted-foreground/20'
                    }`}>
                      <milestone.icon className={`w-5 h-5 ${milestone.completed ? 'text-primary' : milestone.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        {milestone.title}
                        {milestone.completed && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  {!milestone.completed && <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ProgressBar current={milestone.progress} total={milestone.total} />

                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 border border-border">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Reward</span>
                  </div>
                  <span className="text-primary font-semibold">{milestone.reward}</span>
                </div>

                <Button
                  disabled={!milestone.completed}
                  variant={milestone.completed ? "default" : "outline"}
                  className={`w-full transition-all duration-200 ${
                    milestone.completed
                      ? 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'
                      : 'hover:border-primary/50'
                  }`}
                >
                  {milestone.completed ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Claimed
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      In Progress
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
