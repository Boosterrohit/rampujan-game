"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

const campaigns = [
  { id: 1, name: "Weekend Bonus", startDate: "2024-01-13", endDate: "2024-01-15", status: "Active", players: 234 },
  {
    id: 2,
    name: "New Year Special",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "Completed",
    players: 567,
  },
  { id: 3, name: "VIP Exclusive", startDate: "2024-01-20", endDate: "2024-02-20", status: "Scheduled", players: 0 },
]

export function RouletteCampaigns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-3xl font-bold text-white">Roulette Campaigns</h2>
          <p className="text-gray-400 mt-1 md:text:base text-xs">Create and manage promotional campaigns</p>
        </div>
        <Button className="gap-2 bg-[#615ed6]! hover:bg-[#4e48c9]! outline-none! w-32 md:w-auto">
          <Plus className="w-4 h-4" />
          <span className="md:ml-2 text-sm md:text-base">Campaign</span>
        </Button>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Active Campaigns</CardTitle>
          <CardDescription className="text-gray-400">All promotional campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 border border-gray-600 rounded-lg hover:bg-gray-700"
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{campaign.name}</p>
                  <p className="text-sm text-gray-400">
                    {campaign.startDate} to {campaign.endDate}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-gray-400">Players: </span>
                    <span className="font-semibold text-white">{campaign.players}</span>
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${campaign.status === "Active" ? "bg-green-200 text-green-700" : campaign.status === "Completed" ? "bg-gray-200 text-gray-700" : "bg-blue-200 text-blue-700"}`}
                  >
                    {campaign.status}
                  </span>
                      <Button className="text-green-700 bg-green-200 rounded-full w-9 h-9 hover:bg-green-300 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button className="text-red-700 bg-red-200 rounded-full w-9 h-9 hover:bg-red-300 p-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
