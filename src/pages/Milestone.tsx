"use client"

import { useState } from "react"
import { CheckCircle2, Lock } from "lucide-react"
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
    },
    {
      id: 2,
      title: "Spun Master",
      description: "Spin 50 times",
      reward: "500 Coins",
      progress: 42,
      total: 50,
      completed: false,
    },
    {
      id: 3,
      title: "Champion",
      description: "Win 10 times",
      reward: "1000 Coins + Badge",
      progress: 7,
      total: 10,
      completed: false,
    },
    {
      id: 4,
      title: "Legend",
      description: "Collect 5000 Coins",
      reward: "Exclusive Badge",
      progress: 3200,
      total: 5000,
      completed: false,
    },
    {
      id: 5,
      title: "Elite Member",
      description: "Reach Level 25",
      reward: "VIP Status",
      progress: 18,
      total: 25,
      completed: false,
    },
    {
      id: 6,
      title: "Immortal",
      description: "Unlock all achievements",
      reward: "Platinum Badge",
      progress: 3,
      total: 6,
      completed: false,
    },
  ])

  const totalProgress =
    milestones.reduce((acc, m) => acc + (m.completed ? 100 : (m.progress / m.total) * 100), 0) / milestones.length
  const completedCount = milestones.filter((m) => m.completed).length

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="space-y-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Milestones</h1>
          <p className="text-muted-foreground">Unlock achievements and earn exclusive rewards</p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-12 border-primary/20">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressBar current={completedCount} total={milestones.length} label="Milestones Completed" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedCount} of {milestones.length} completed
              </span>
              <span className="text-primary font-semibold">{Math.round(totalProgress)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Milestones Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {milestones.map((milestone) => (
            <Card
              key={milestone.id}
              className={`transition-all duration-300 hover:shadow-lg ${
                milestone.completed ? "border-primary/30 bg-card/50" : "hover:border-primary/50"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {milestone.title}
                      {milestone.completed && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
                  {!milestone.completed && <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ProgressBar current={milestone.progress} total={milestone.total} />

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <span className="text-sm font-medium">Reward</span>
                  <span className="text-primary font-semibold">{milestone.reward}</span>
                </div>

                <Button
                  disabled={!milestone.completed}
                  variant={milestone.completed ? "default" : "outline"}
                  className="w-full"
                >
                  {milestone.completed ? "Claimed" : "In Progress"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
