import { axiosInstance } from "@/utils/axiosInstance";
import { AgentCreationData } from "./types";

const tryRequest = async <T>(requests: Array<() => Promise<T>>) => {
  let lastError: any;

  for (const req of requests) {
    try {
      return await req();
    } catch (error: any) {
      lastError = error;
      if (error?.response?.status !== 404) {
        throw error;
      }
    }
  }

  throw lastError;
};

// --- existing admin endpoint supplying agent list with their players ---
const agentPlayersUrl = `/admin/agents/players`;

export const getPlayers = (body: {
  page: number;
  limit: number;
  search: string;
}) => {
  const { page = 1, limit = 12, search } = body || {};
  return axiosInstance.get(
    `${agentPlayersUrl}?page=${page}&limit=${limit}&search=${search || ""}`,
  );
};

// --- new admin user list endpoint for players (flat) ---
export const getAllPlayers = (params: {
  page?: number;
  limit?: number;
  search?: string;
  assignedAgent?: string;
}) => {
  const { page = 1, limit = 20, search = "", assignedAgent } = params || {};
  let qs = `?page=${page}&limit=${limit}&role=player&search=${search}`;
  if (assignedAgent) qs += `&assignedAgent=${assignedAgent}`;
  return axiosInstance.get(`/admin/users${qs}`);
};

// query agents list for dropdown
export const getAgentsList = (params: { page?: number; limit?: number } = {}) => {
  const { page = 1, limit = 100 } = params;
  return axiosInstance.get(`/admin/users?role=agent&page=${page}&limit=${limit}`);
};

// agent-specific endpoints
export const getAgentPlayers = (params: { page?: number; limit?: number } = {}) => {
  const { page = 1, limit = 20 } = params;
  return axiosInstance.get(`/chat/agent/players?page=${page}&limit=${limit}`);
};

// credit calculation helper
export const calculateCredit = (deposit: number) =>
  axiosInstance.get(`/agent/calculate-credit?deposit=${deposit}`);

export const getPlayerById = (playerId: string, role?: string) => {
  const normalizedRole = String(role || "").toLowerCase();
  if (normalizedRole === "agent") {
    return axiosInstance.get(`/agent/players/${playerId}`);
  }

  return axiosInstance.get(`/admin/users/${playerId}`);
};

// transactions for preview
export const getPlayerTransactions = (
  playerId: string,
  role?: string,
  options: { startDate?: string; endDate?: string } = {},
) => {
  const normalizedRole = String(role || "").toLowerCase();
  const { startDate, endDate } = options;
  let qs = `userId=${encodeURIComponent(playerId)}`;
  if (startDate) qs += `&startDate=${encodeURIComponent(startDate)}`;
  if (endDate) qs += `${qs ? "&" : ""}endDate=${encodeURIComponent(endDate)}`;

  if (normalizedRole === "agent") {
    return axiosInstance.get(`/agent/transactions?${qs}`);
  }

  return axiosInstance.get(`/admin/transactions?${qs}`);
};

// deposit/gamer create
export const addGamerPlayer = (data: any) =>
  axiosInstance.post(`/agent/gamers/add-player`, data);

export const loadWallet = (data: { playerId?: string; playerEmail?: string; amount: number; description?: string; agentId?: string }) =>
  axiosInstance.post(`/agent/load-wallet`, data);

// agent endpoint to list only their assigned players
export const getMyAgentPlayers = (body: { page?: number; limit?: number; search?: string } = {}) => {
  const { page = 1, limit = 10, search = "" } = body || {};
  return axiosInstance.get(
    `/agent/players?page=${page}&limit=${limit}&search=${search}`,
  );
};

export const createAgent = (data: AgentCreationData) =>
  axiosInstance.post(`/admin/create-agents`, data);

export const deleteAgent = (agentId: string) =>
  axiosInstance.delete(`/admin/agents/${agentId}`);

export const updateAgent = (agentId: string, data: AgentCreationData) =>
  axiosInstance.put(`/admin/agents/${agentId}`, data);

export const suspendPlayer = (playerId: string) =>
  axiosInstance.patch(`/admin/users/${playerId}/suspend`);

export const unsuspendPlayer = (playerId: string) =>
  axiosInstance.patch(`/admin/users/${playerId}/unsuspend`);

export const deletePlayerById = (playerId: string) =>
  axiosInstance.delete(`/admin/users/${playerId}`);