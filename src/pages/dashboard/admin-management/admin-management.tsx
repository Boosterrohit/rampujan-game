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
import { Trash2, Edit, Plus, AlertTriangle } from "lucide-react";
import { useDialog } from "@/components/dashboard/element/DialogContext";
import AdminForm from "./admin-form";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { useEffect, useState } from "react";
import { dashboardSelector } from "../redux/selector";
import { playerListRequest, deleteAgentRequest } from "../redux/dashboardSlice";
import AppPagination from "@/components/dashboard/element/AppPagination";
import useDebounce from "@/hooks/useDebounce";
// Delete Confirmation Component — uses closeDialog from global context just like AdminForm
function DeleteConfirmDialog({
  agentName,
  agentId,
}: {
  agentName: string;
  agentId: string;
}) {
  const { closeDialog } = useDialog();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(dashboardSelector);

  const handleConfirm = () => {
    dispatch(deleteAgentRequest(agentId));
    closeDialog();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
        <AlertTriangle className="w-7 h-7 text-red-600" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-1">Delete Agent</h3>
        <p className="text-gray-400 text-sm">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">{agentName}</span>? This
          action cannot be undone.
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
      }),
    );
  }, [dispatch, paginationState, debouncedSearchTerm]);

  // when editing, supply existing agent details
  const handleEdit = (agentGroup: any) => {
    const { agent } = agentGroup;
    openDialog(
      <AdminForm
        initialValues={{
          agentId: agent._id,
          username: agent.username,
          email: agent.email,
          walletBalance: 0, // backend doesn't return balance; leave default
          password: "", // blank unless changed
        }}
        isEdit
      />
    );
  };

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
                    <td colSpan={5} className="text-center py-6 text-gray-400">
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
                        <Button
                          className="text-blue-700 bg-blue-200 rounded-full w-9 h-9 hover:bg-blue-300 p-0"
                          onClick={() => handleEdit(admin)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          className="text-red-700 bg-red-200 rounded-full w-9 h-9 hover:bg-red-300 p-0"
                          onClick={() =>
                            openDialog(
                              <DeleteConfirmDialog
                                agentId={admin.agent._id}
                                agentName={admin.agent.username}
                              />,
                            )
                          }
                        >
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
