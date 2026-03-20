"use client";
import { CreditCard, Users, Gamepad2, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BarChart from "@/components/dashboard/element/BarChart";
import DoughnutChart from "@/components/dashboard/element/DoughnutChart";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { useAuth } from "@/contexts/AuthContext";
import { dashboardSelector } from "./redux/selector";
import { useEffect, useState } from "react";
import { playerListRequest } from "./redux/dashboardSlice";
import { availableGames } from "@/data/dashboard";
import AppPagination from "@/components/dashboard/element/AppPagination";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [paginationState, setPaginationState] = useState({
    limit: '10',
    page: 1,
  });
  const { agentPlayers, loading, totalPages, totalDepositedByAllAgents } = useAppSelector(dashboardSelector);

  // ensure we always work with an array to avoid runtime errors when API returns null/undefined
  const safeAgentPlayers = Array.isArray(agentPlayers) ? agentPlayers : [];

  const handlePaginationChange = (perPage: string, currentPage: number) => {
    setPaginationState({ limit: perPage, page: currentPage });
  };
  useEffect(() => {
    dispatch(playerListRequest({
      limit: paginationState.limit,
      page: paginationState.page,
      search: '',
      role: user?.role,
    }));
  }, [dispatch, paginationState, user?.role]);

  const totalPlayers = safeAgentPlayers.reduce((acc, group) => acc + group.players.length, 0);
  const totalAgents = safeAgentPlayers.length;
  const netDeposit = Number(totalDepositedByAllAgents ?? 0);
  const formattedNetDeposit = loading
    ? "..."
    : `$${netDeposit.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`;
  const stats = [
     {
    title: "Total Agents",
    value: loading ? "..." : totalAgents.toLocaleString(),
    icon: CreditCard,
    change: "+12.5%",
  },
    {
      title: "Active Players",
      value: loading ? "..." : totalPlayers.toLocaleString(), // toLocaleString adds comma formatting e.g. 1,234
      icon: Users,
      change: "+8.2%",
    },
    { title: "Active Games", value: "26", icon: Gamepad2, change: "+5.1%" },
    {
      title: "Net Deposite",
      value: formattedNetDeposit,
      icon: TrendingUp,
      change: "+23.1%",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-[#252937] border-gray-600">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {stat.title}
                    </p>
                    <p className="text-sm sm:text-2xl font-bold mt-1 sm:mt-2 text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10  opacity-20 flex-shrink-0 text-gray-300" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-[#1e232e] p-4 shadow-md border-2 border-gray-600 w-full rounded-md lg:col-span-2">
          <p className="flex flex-col mb-4">
            <span className="text-xl font-semibold text-white">
              Players per Agent
            </span>
            <span className="text-gray-400 text-sm">
              Total vs Verified players by agent
            </span>
          </p>
          <div className="w-full h-[300px] sm:h-[350px] overflow-auto">
            {totalPlayers === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                No players available
              </div>
            ) : (
              <BarChart />
            )}
          </div>
        </div>
        <div className="bg-[#1e232e] p-4 shadow-md border-2 border-gray-600 rounded-md lg:col-span-1">
          <p className="flex flex-col mb-4">
            <span className="text-xl font-semibold text-white">
              Game Distribution
            </span>
            <span className="text-gray-400 text-sm">
             Games breakdown by category ({availableGames.length} total)
            </span>
          </p>
          <div className="w-full h-[300px] sm:h-[350px] flex items-center justify-center">
            <DoughnutChart />
          </div>
        </div>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl text-white">
            Top Players
          </CardTitle>
          <CardDescription className="text-gray-400">
            Highest performing players by total bets
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm px-4 sm:px-0">
              <thead>
                <tr className="border-b  border-gray-300">
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-white">
                    Player Name
                  </th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-white">
                    Assigned Agent
                  </th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-white">
                    Email
                  </th>
                  <th className="text-left py-2 sm:py-3 px-3 sm:px-4 font-semibold text-white">
                    Status
                  </th>
                </tr>
              </thead>
                {safeAgentPlayers.length === 0 ? (
             <tbody>
    <tr>
      <td
        colSpan={4}
        className="text-center py-6 text-gray-400 w-full"
      >
        No players available
      </td>
    </tr>
  </tbody>
            ) : (
               <tbody>
               
                {safeAgentPlayers.map((group) =>
                  group.players.map((player) => (
                    <tr
                      key={player._id}
                      className="border-b border-gray-600 hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-2 sm:py-3 px-3 sm:px-4 font-medium whitespace-nowrap text-gray-300">
                        {player.username}
                      </td>
                      <td className="py-2 sm:py-3 px-3 sm:px-4 font-semibold whitespace-nowrap text-gray-400">
                        {group.agent.username}{" "}
                        {/* agent name as "Total Bets" column or adjust as needed */}
                      </td>
                      <td className="py-2 sm:py-3 px-3 sm:px-4 font-semibold text-green-300 whitespace-nowrap">
                        {player.email}
                      </td>
                      <td className="py-2 sm:py-3 px-3 sm:px-4">
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            player.isVerified
                              ? "bg-green-200 text-green-800"
                              : "bg-gray-300 text-gray-800"
                          }`}
                        >
                          {player.isVerified ? "Verified" : "Not Verified"}
                        </span>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            )}
             
            </table>
            <AppPagination
              count={totalPages ?? 0}
              currentPage={paginationState.page}
              totalPages={totalPages}
              hasNextPage={paginationState.page < (totalPages ?? 0)}
              hasPreviousPage={paginationState.page > 1}
              onPaginationChange={handlePaginationChange}
            />
                      </div>
        </CardContent>
      </Card>
    </div>
  );
}
