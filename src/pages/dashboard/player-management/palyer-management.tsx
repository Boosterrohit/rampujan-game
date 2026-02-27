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
import { Trash2, Edit, Plus, Eye } from "lucide-react";
import { useDialog } from "@/components/dashboard/element/DialogContext";
import PlayerForm from "./playerForm";

const admins = [
  {
    id: 1,
    name: "John Admin",
    email: "john@casino.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Manager",
    email: "sarah@casino.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Mike Operator",
    email: "mike@casino.com",
    role: "Operator",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Lisa Support",
    email: "lisa@casino.com",
    role: "Support",
    status: "Active",
  },
];

export function PlayerManagement() {
  const { openDialog } = useDialog();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base md:text-3xl font-bold text-white">
            Player Management
          </h2>
          <p className="text-gray-400 mt-1 md:text:base text-xs">
            Manage admin users and their permissions
          </p>
        </div>
        <Button
          className="flex items-center !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none w-32 md:w-auto"
          onClick={() => openDialog(<PlayerForm />)}
        >
          <Plus className="w-5 h-5" />
          <span className="md:ml-2 text-sm md:text-base">Add Player</span>
        </Button>
      </div>

      <Card className="bg-[#252937] border-gray-600">
        <CardHeader>
          <CardTitle className="text-white">Players</CardTitle>
          <CardDescription className="text-gray-400">
            List of all players
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            <Input
              placeholder="Search players..."
              className="max-w-sm text-white border-white"
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
                  <th className="text-center py-3 px-4  font-semibold text-white">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b hover:bg-gray-700 border-gray-600"
                  >
                    <td className="py-3 px-4 text-gray-300">{admin.name}</td>
                    <td className="py-3 px-4 text-gray-300">{admin.email}</td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded text-sm ${admin.status === "Active" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex items-center justify-center gap-2">
                      <Button className="text-blue-700 bg-blue-200 rounded-full w-9 h-9 hover:bg-blue-300 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button className="text-green-700 bg-green-200 rounded-full w-9 h-9 hover:bg-green-300 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button className="text-red-700 bg-red-200 rounded-full w-9 h-9 hover:bg-red-300 p-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
