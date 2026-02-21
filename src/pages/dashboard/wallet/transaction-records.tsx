"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const transactions = [
  { id: 1, player: "Player 001", type: "Deposit", amount: "$100", date: "2024-01-13", status: "Success" },
  { id: 2, player: "Player 002", type: "Withdrawal", amount: "$250", date: "2024-01-13", status: "Success" },
  { id: 3, player: "Player 003", type: "Bet", amount: "$50", date: "2024-01-13", status: "Success" },
  { id: 4, player: "Player 004", type: "Winnings", amount: "$500", date: "2024-01-13", status: "Success" },
  { id: 5, player: "Player 005", type: "Deposit", amount: "$200", date: "2024-01-12", status: "Failed" },
]

export function TransactionRecords() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base md:text-3xl font-bold text-white">Transaction Records</h2>
        <p className="text-gray-400 mt-1 md:text:base text-xs">View all wallet transactions</p>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">All Transactions</CardTitle>
          <CardDescription className="text-gray-400">Complete transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <Input placeholder="Search transactions..." className="max-w-sm text-white border-white" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-white">Player</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-3 px-4 text-gray-300">{tx.player}</td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">{tx.type}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-400">{tx.amount}</td>
                    <td className="py-3 px-4 text-white">{tx.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${tx.status === "Success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                      >
                        {tx.status}
                      </span>
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
