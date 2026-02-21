"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2 } from "lucide-react"

const gifts = [
  { id: 1, name: "Silver Prize", value: "$50", rarity: "Common", enabled: true },
  { id: 2, name: "Gold Prize", value: "$100", rarity: "Rare", enabled: true },
  { id: 3, name: "Platinum Prize", value: "$500", rarity: "Epic", enabled: true },
  { id: 4, name: "Diamond Prize", value: "$1000", rarity: "Legendary", enabled: false },
]

export function RouletteGifts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-3xl font-bold text-white">Roulette Gifts</h2>
          <p className="text-gray-400 mt-1 md:text:base text-xs">Manage roulette gift types and values</p>
        </div>
        <Button className="gap-2 bg-[#615ed6]! hover:bg-[#4e48c9]! outline-none! w-32 md:w-auto">
          <Plus className="w-4 h-4" />
          <span className="md:ml-2 text-sm md:text-base">Add Gift Type</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gifts.map((gift) => (
          <Card key={gift.id} className="bg-[#252937] border-gray-600">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Gift Type</p>
                  <p className="text-lg font-bold text-white">{gift.name}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{gift.value}</p>
                    <p className="text-xs text-gray-400">{gift.rarity}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${gift.enabled ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                  >
                    {gift.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-blue-200 hover:bg-blue-300 text-blue-600">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-red-600 bg-red-200 hover:bg-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
