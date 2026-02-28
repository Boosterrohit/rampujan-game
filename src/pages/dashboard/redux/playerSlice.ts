import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Agent, Player } from "./types";

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPlayers?: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description?: string;
  createdAt: string;
  // other fields as needed
}

interface FetchPlayersParams {
  page?: number;
  limit?: number | string;
  search?: string;
  assignedAgent?: string;
  role?: string;
}

interface PlayerState {
  loading: boolean;
  players: Player[];
  pagination: Pagination;
  agents: Agent[];
  loadingAgents: boolean;
  depositLoading: boolean;
  depositSuccess: boolean;
  depositError?: string;
  transactions: Transaction[];
  loadingTransactions: boolean;
  lastQuery: FetchPlayersParams;
}

const initialState: PlayerState = {
  loading: false,
  players: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  },
  agents: [],
  loadingAgents: false,
  depositLoading: false,
  depositSuccess: false,
  depositError: undefined,
  transactions: [],
  loadingTransactions: false,
  lastQuery: {},
};

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    fetchPlayersRequest: (
      state,
      action: PayloadAction<FetchPlayersParams>,
    ) => {
      state.loading = true;
      state.lastQuery = action.payload || {};
    },
    fetchPlayersSuccess: (state, action: PayloadAction<{ players: Player[]; pagination: Pagination }>) => {
      state.loading = false;
      state.players = action.payload.players || [];
      state.pagination = action.payload.pagination || state.pagination;
    },
    fetchPlayersFailure: (state) => {
      state.loading = false;
    },
    fetchAgentsRequest: (state) => {
      state.loadingAgents = true;
    },
    fetchAgentsSuccess: (state, action: PayloadAction<Agent[]>) => {
      state.loadingAgents = false;
      state.agents = action.payload;
    },
    fetchAgentsFailure: (state) => {
      state.loadingAgents = false;
    },
    depositRequest: (
      state,
      action: PayloadAction<{ playerId: string; amount: number; description?: string }>,
    ) => {
      state.depositLoading = true;
      state.depositSuccess = false;
      state.depositError = undefined;
    },
    depositSuccess: (state) => {
      state.depositLoading = false;
      state.depositSuccess = true;
    },
    depositFailure: (state, action: PayloadAction<string>) => {
      state.depositLoading = false;
      state.depositError = action.payload;
    },
    depositReset: (state) => {
      state.depositLoading = false;
      state.depositSuccess = false;
      state.depositError = undefined;
    },
    fetchTransactionsRequest: (
      state,
      action: PayloadAction<{
        playerId: string;
        role: string;
        startDate?: string;
        endDate?: string;
      }>,
    ) => {
      state.loadingTransactions = true;
      state.transactions = [];
    },
    fetchTransactionsSuccess: (state, action: PayloadAction<Transaction[]>) => {
      state.loadingTransactions = false;
      state.transactions = action.payload;
    },
    fetchTransactionsFailure: (state) => {
      state.loadingTransactions = false;
    },
  },
});

export const {
  fetchPlayersRequest,
  fetchPlayersSuccess,
  fetchPlayersFailure,
  fetchAgentsRequest,
  fetchAgentsSuccess,
  fetchAgentsFailure,
  depositRequest,
  depositSuccess,
  depositFailure,
  depositReset,
  fetchTransactionsRequest,
  fetchTransactionsSuccess,
  fetchTransactionsFailure,
} = playerSlice.actions;

export default playerSlice.reducer;
