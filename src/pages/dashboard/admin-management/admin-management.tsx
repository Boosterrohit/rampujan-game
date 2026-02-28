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
import { Trash2, Edit, Plus } from "lucide-react";
import { useDialog } from "@/components/dashboard/element/DialogContext";
import AdminForm from "./admin-form";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { useEffect, useState } from "react";
import { dashboardSelector } from "../redux/selector";
import { playerListRequest } from "../redux/dashboardSlice";
import AppPagination from "@/components/dashboard/element/AppPagination";
import useDebounce from "@/hooks/useDebounce";

export function AdminManagement() {
  const { openDialog } = useDialog();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

  const [paginationState, setPaginationState] = useState({
    limit: "10",
    page: 1,
  });

  const { agentPlayers, loading, totalPages } =
    useAppSelector(dashboardSelector);

  const safeAgentPlayers = Array.isArray(agentPlayers) ? agentPlayers : [];

  const handlePaginationChange = (perPage: string, currentPage: number) => {
    setPaginationState({ limit: perPage, page: currentPage });
  };

  useEffect(() => {
    dispatch(
      playerListRequest({
        limit: paginationState.limit,
        page: paginationState.page,
        search: debouncedSearchTerm,
      })
    );
  }, [dispatch, paginationState, debouncedSearchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-base md:text-3xl font-bold text-white">
            Agent Management
          </h2>
          <p className="text-gray-400 mt-1 md:text:base text-xs">
            Manage agent users and their permissions
          </p>
        </div>
        <Button
          className="flex items-center !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none w-32 md:w-auto"
          onClick={() => openDialog(<AdminForm />)}
        >
          <Plus className="w-5 h-5" />
          <span className="md:ml-2 text-sm md:text-base">Add Agent</span>
        </Button>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Agent Users</CardTitle>
          <CardDescription className="text-gray-400">
            List of all agent accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <Input
              placeholder="Search agents..."
              className="max-w-sm text-white border-white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                    Role
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-white">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {safeAgentPlayers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-6 text-gray-400"
                    >
                      No agents available
                    </td>
                  </tr>
                ) : (
                  safeAgentPlayers.map((admin) => (
                    <tr
                      key={admin.agent._id}
                      className="border-b hover:bg-gray-700 border-gray-600"
                    >
                      <td className="py-3 px-4 text-gray-300">
                        {admin.agent.username}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {admin.agent.email.length > 25
                          ? admin.agent.email.slice(0, 25) + "..."
                          : admin.agent.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">
                          Agent
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 rounded text-sm bg-green-200 text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4 flex items-center justify-center gap-2">
                        <Button className="text-blue-700 bg-blue-200 rounded-full w-9 h-9 hover:bg-blue-300 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button className="text-red-700 bg-red-200 rounded-full w-9 h-9 hover:bg-red-300 p-0">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
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