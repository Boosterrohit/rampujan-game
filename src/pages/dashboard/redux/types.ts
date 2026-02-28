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
  assignedAgent: string
  isVerified: boolean
  isSuspended: boolean
  createdAt: string
}
// player and agent types end
export interface allDashboardProps {
    player: Player[];
    loading?: boolean;
    totalPages?: number,
    nextPage?: number,
    previousPage?: number
}