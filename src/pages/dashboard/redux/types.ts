// player and agent types start
export interface Agent {
  _id: string
  username: string
  email: string
}

export interface Player {
  _id: string
  username: string
  email: string
  assignedAgent?: Agent | string | null
  isVerified: boolean
  isSuspended: boolean
  createdAt: string
  walletBalance?: number
}

export interface AgentWithPlayers {
  agent: Agent
  players: Player[]
}
// player and agent types end

// transaction & pagination
export interface Transaction {
  _id: string;
  type: string;
  amount: number;
  status?: string;
  createdAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// player management state (used by player management page)
export interface PlayerManagementState {
  players: Player[];
  pagination: Pagination;
  transactions: Transaction[];
  agents: Agent[]; // agents for filter dropdown (admin view)
  playersLoading: boolean;
  transactionsLoading: boolean;
  agentsLoading: boolean;
  creditCalc?: { deposit: number; creditAmount: number; pct: number };
}

// create agent
export interface AgentCreationData {
  agentId?: string
  username: string
  email: string
  password: string
  walletBalance: number
  onSuccess?: () => void
}

export interface allDashboardProps {
    agentPlayers: AgentWithPlayers[];
    loading?: boolean;
    totalPages?: number,
    nextPage?: number,
    previousPage?: number,
    // optional metadata from response
    totalAgents?: number;
    totalDepositedByAllAgents?: number;

    // data for the player management page
    playerManagement?: PlayerManagementState;
}