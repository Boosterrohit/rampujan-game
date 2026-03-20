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
import { Plus, Eye, UserX, UserCheck, Trash2, AlertTriangle } from "lucide-react";
import { useDialog } from "@/components/dashboard/element/DialogContext";
import PlayerForm from "./playerForm";
import PlayerPreview from "./PlayerPreview";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import AppPagination from "@/components/dashboard/element/AppPagination";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { playerSelector } from "../redux/selector";
import {
  fetchPlayersRequest,
  fetchAgentsRequest,
  suspendPlayerRequest,
  unsuspendPlayerRequest,
  deletePlayerRequest,
} from "../redux/playerSlice";
import { useAuth } from "@/contexts/AuthContext";

function DeletePlayerConfirmDialog({
  playerId,
  playerName,
}: {
  playerId: string;
  playerName: string;
}) {
  const { closeDialog } = useDialog();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(playerSelector);

  const handleConfirm = () => {
    dispatch(deletePlayerRequest(playerId));
    closeDialog();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
        <AlertTriangle className="w-7 h-7 text-red-600" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-1">Delete Player</h3>
        <p className="text-gray-400 text-sm">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">{playerName}</span>? This action cannot be undone.
        </p>
      </div>
      <div className="flex gap-3 w-full mt-2">
        <Button
          className="flex-1 rounded-md bg-gray-600 hover:bg-gray-500 text-white"
          onClick={closeDialog}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 rounded-md !bg-red-600 hover:!bg-red-700 text-white"
          disabled={loading}
          onClick={handleConfirm}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}

export function PlayerManagement() {
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();
  const { players, pagination, agents, loading } = useAppSelector(playerSelector);
  const safePlayers = Array.isArray(players) ? players : [];
  const { user } = useAuth();
  const normalizedRole = user?.role?.toLowerCase();

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
    if (!normalizedRole) return;

    const params: any = {
      page: paginationState.page,
      limit: paginationState.limit,
      search: debouncedSearchTerm,
      role: normalizedRole,
    };
    if (normalizedRole === "agent") {
      params.assignedAgent = user.userId;
    } else if (agentFilter) {
      params.assignedAgent = agentFilter;
    }
    dispatch(fetchPlayersRequest(params));
  }, [dispatch, paginationState, debouncedSearchTerm, agentFilter, normalizedRole, user?.userId]);

  useEffect(() => {
    if (normalizedRole && normalizedRole !== "agent") {
      dispatch(fetchAgentsRequest());
    }
  }, [dispatch, normalizedRole]);

  const openDeposit = () => {
    openDialog(
      <ErrorBoundary>
        <PlayerForm />
      </ErrorBoundary>
    );
  };

  const openPreview = (playerId: string) => {
    openDialog(
      <ErrorBoundary>
        <PlayerPreview playerId={playerId} />
      </ErrorBoundary>
    );
  };

  const handleSuspendToggle = (playerId: string, isSuspended: boolean) => {
    if (user?.role !== "admin") return;

    if (isSuspended) {
      dispatch(unsuspendPlayerRequest(playerId));
    } else {
      dispatch(suspendPlayerRequest(playerId));
    }
  };

  const handleDeletePlayer = (playerId: string, playerName: string) => {
    if (user?.role !== "admin") return;

    openDialog(
      <DeletePlayerConfirmDialog
        playerId={playerId}
        playerName={playerName}
      />,
    );
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
          <div className="space-y-4 mb-6 flex flex-wrap items-center gap-2">
            <Input
              placeholder="Search players..."
              className="max-w-sm text-white border-white"
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
            />
           <div className="pb-3 md:w-auto w-full">
             {user?.role !== "agent" && (
              <select
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="bg-gray-800 bg-transparent outline-none text-white w-full rounded border-white border p-1 px-2 "
              >
                <option value="" className="bg-gray-600">All agents</option>
                {(Array.isArray(agents) ? agents : []).map((a) => (
                  <option key={a._id} value={a._id} className="bg-gray-600">
                    {a.username}
                  </option>
                ))}
              </select>
            )}
           </div>
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
                      <th className="text-left py-3 px-4 font-semibold text-white">
                        Status
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {safePlayers.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-10 text-gray-400"
                        >
                          No players found.
                        </td>
                      </tr>
                    ) : (
                      safePlayers.map((p) => (
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
                          <td className="py-3 px-4 text-gray-300">
                            {p.isSuspended ? "Suspended" : "Active"}
                          </td>
                          <td className="py-3 px-4 flex items-center justify-center gap-2">
                            <Button
                              className="text-blue-700 bg-blue-200 rounded-full w-9 h-9 hover:bg-blue-300 p-0"
                              onClick={() => openPreview(p._id)}
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {user?.role === "admin" && (
                              <>
                                <Button
                                  className={`rounded-full w-9 h-9 p-0 ${
                                    p.isSuspended
                                      ? "text-emerald-700 bg-emerald-200 hover:bg-emerald-300"
                                      : "text-amber-700 bg-amber-200 hover:bg-amber-300"
                                  }`}
                                  onClick={() => handleSuspendToggle(p._id, !!p.isSuspended)}
                                  title={p.isSuspended ? "Unsuspend" : "Suspend"}
                                >
                                  {p.isSuspended ? (
                                    <UserCheck className="w-4 h-4" />
                                  ) : (
                                    <UserX className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  className="text-red-700 bg-red-200 rounded-full w-9 h-9 hover:bg-red-300 p-0"
                                  onClick={() => handleDeletePlayer(p._id, p.username)}
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )}
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