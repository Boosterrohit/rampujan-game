import { axiosInstance } from "@/utils/axiosInstance";
import { AgentCreationData } from "./types";
const baseUrl = `/admin/agents/players`;

export const getPlayers = (body: {
  page: number;
  limit: number;
  search: string;
}) => {
  const { page = 1, limit = 12, search } = body || {};
  return axiosInstance.get(
    `${baseUrl}?page=${page}&limit=${limit}&search=${search || ""}`,
  );
};

export const createAgent = (data: AgentCreationData) =>
  axiosInstance.post(`admin/create-agents`, data);

export const deleteAgent = (agentId: string) =>
  axiosInstance.delete(`admin/agents/${agentId}`);

export const updateAgent = (agentId: string, data: AgentCreationData) =>
  axiosInstance.put(`admin/agents/${agentId}`, data);