"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Eye } from "lucide-react";
import { useDialog } from "@/components/dashboard/element/DialogContext";
import PlayerForm from "./playerForm";
import PlayerPreview from "./PlayerPreview";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import AppPagination from "@/components/dashboard/element/AppPagination";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { playerSelector } from "../redux/selector";
import { fetchPlayersRequest, fetchAgentsRequest } from "../redux/playerSlice";
import { useAuth } from "@/contexts/AuthContext";

export function PlayerManagement() {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const { players, pagination, agents, loading } = useAppSelector(playerSelector);
  const { user } = useAuth();

  const [searchTerm, setSearch] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  // use the shared pagination component so the UI behaves like other
  // lists (dashboard, admin-management, etc.).  AppPagination passes back a
  // per-page/ current-page pair, which we track in local state.
  const [paginationState, setPaginationState] = useState({
    limit: "10",
    page: 1,
  });

  // whenever search, agent filter or pagination changes we re-query
  useEffect(() => {
    const params: any = {
      page: paginationState.page,
      limit: paginationState.limit,
      search: debouncedSearchTerm,
      role: user?.role,
    };
    if (user?.role === "agent") {
      params.assignedAgent = user.userId;
    } else if (agentFilter) {
      params.assignedAgent = agentFilter;
    }
    dispatch(fetchPlayersRequest(params));
  }, [dispatch, paginationState, debouncedSearchTerm, agentFilter, user]);

  useEffect(() => {
    if (user?.role !== "agent") {
      dispatch(fetchAgentsRequest());
    }
  }, [dispatch, user]);

  const openDeposit = () => {
    openDialog(<PlayerForm />);
  };

  const openPreview = (playerId: string) => {
    openDialog(<PlayerPreview playerId={playerId} />);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-3xl font-bold text-white">
            Player Management
          </h2>
          <p className="text-gray-400 mt-1 md:text:base text-xs">
            Manage player deposits and history
          </p>
        </div>
        <Button
          className="flex items-center !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none w-32 md:w-auto"
          onClick={openDeposit}
        >
          <Plus className="w-5 h-5" />
          <span className="md:ml-2 text-sm md:text-base">Add Deposit</span>
        </Button>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Players</CardTitle>
          <CardDescription className="text-gray-400">
            List of {user?.role === "agent" ? "your" : "all"} players
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6 flex flex-wrap gap-2">
            <Input
              placeholder="Search players..."
              className="max-w-sm text-white border-white"
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
            />
            {user?.role !== "agent" && (
              <select
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="bg-gray-800 text-white rounded p-1"
              >
                <option value="">All agents</option>
                {agents.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.username}
                  </option>
                ))}
              </select>
            )}
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-10">Loading players...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-white">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-white">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-white">
                        Assigned Agent
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center py-10 text-gray-400"
                        >
                          No players found.
                        </td>
                      </tr>
                    ) : (
                      players.map((p) => (
                        <tr
                          key={p._id}
                          className="border-b hover:bg-gray-700 border-gray-600"
                        >
                          <td className="py-3 px-4 text-gray-300">
                            {p.username}
                          </td>
                          <td className="py-3 px-4 text-gray-300">{p.email}</td>
                          <td className="py-3 px-4 text-gray-300">
                            {p.assignedAgent
                              ? typeof p.assignedAgent === 'object'
                                ? p.assignedAgent.username
                                : p.assignedAgent
                              : '-'}
                          </td>
                          <td className="py-3 px-4 flex items-center justify-center gap-2">
                            <Button
                              className="text-blue-700 bg-blue-200 rounded-full w-9 h-9 hover:bg-blue-300 p-0"
                              onClick={() => openPreview(p._id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* use shared pagination component for consistency */}
              <AppPagination
                count={pagination.totalPlayers ?? 0}
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPrevPage}
                onPaginationChange={(perPage, page) =>
                  setPaginationState({ limit: perPage, page })
                }
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}