"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X } from "lucide-react"

const requests = [
  { id: 1, player: "Player 001", amount: "$500", method: "Bank Transfer", date: "2024-01-13", status: "Pending" },
  { id: 2, player: "Player 002", amount: "$250", method: "E-Wallet", date: "2024-01-12", status: "Approved" },
  { id: 3, player: "Player 003", amount: "$1000", method: "Crypto", date: "2024-01-11", status: "Rejected" },
  { id: 4, player: "Player 004", amount: "$300", method: "Card", date: "2024-01-13", status: "Pending" },
]

export function RedeemRequests() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base md:text-3xl font-bold text-white">Redeem Requests</h2>
        <p className="text-gray-400 mt-1 md:text:base text-xs">Process player withdrawal requests</p>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Pending & Recent Requests</CardTitle>
          <CardDescription className="text-gray-400">Manage player redemption requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <Input placeholder="Search requests..." className="max-w-sm text-white" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-white">Player</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-300">{request.player}</td>
                    <td className="py-3 px-4 font-semibold text-gray-400">{request.amount}</td>
                    <td className="py-3 px-4 text-gray-300">{request.method}</td>
                    <td className="py-3 px-4 text-gray-300">{request.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm font-semibold ${request.status === "Pending" ? "bg-yellow-200 text-yellow-700" : request.status === "Approved" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      {request.status === "Pending" && (
                        <>
                          <Button size="sm" className="gap-1 bg-green-400 hover:bg-green-500 text-white!">
                            <Check className="w-3 h-3" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" className="gap-1 bg-red-500 hover:bg-red-600 text-white">
                            <X className="w-3 h-3" />
                            Reject
                          </Button>
                          
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
