"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export function LoadWallet() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-3xl font-bold text-white">Load Wallet</h2>
          <p className="text-gray-400 mt-1 md:text:base text-xs">Add funds to player wallets</p>
        </div>
        <Button className="gap-2 bg-[#615ed6] hover:bg-[#4e48c9] w-32 md:w-auto">
          <Plus className="w-4 h-4" />
         <span className="md:ml-2 text-sm md:text-base">Load Wallet</span>
        </Button>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Wallet Loading Form</CardTitle>
          <CardDescription className="text-gray-400">Enter player details to load funds</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white">Player ID / Email</label>
              <Input placeholder="Enter player ID or email" className="text-white border-white"/>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white">Amount to Load</label>
              <div className="flex gap-2">
                <Input placeholder="Enter amount" type="number" className="text-white border-white"/>
                <Button type="button" className="bg-[#615ed6] hover:bg-[#4e48c9]">USD</Button>
              </div>
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-semibold text-white">Description</label>
              <textarea placeholder="Optional description" className="text-white border-gray-300 border p-3 rounded-md bg-transparent" cols={3} rows={4}/>
            </div>
            <Button className="w-full bg-[#615ed6] hover:bg-[#4e48c9]">Load Wallet</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Recent Loading History</CardTitle>
          <CardDescription className="text-gray-400">Last 5 wallet loads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-gray-600 rounded">
                <div>
                  <p className="font-semibold text-white">Player {String(i).padStart(3, "0")}</p>
                  <p className="text-sm text-gray-400">2024-01-13</p>
                </div>
                <p className="font-bold text-lg text-gray-300">+${100 * i}.00</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
