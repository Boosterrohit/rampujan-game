import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allDashboardProps, AgentCreationData } from './types';

const initialState: allDashboardProps = {
    loading: false,
    agentPlayers: [],
    totalPages: 0,
    nextPage: 0,
    previousPage: 0
}
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        playerListRequest: (state, action: PayloadAction<{ limit: string; page: number, search: string }>) => {
  state.loading = true;
},
        playerListSuccess: (state, action) => {
            state.loading = false;
            // payload contains { agents: AgentWithPlayers[], pagination: {...}, depositSummary: {...} }
            state.agentPlayers = action.payload?.agents || [];
            if (action.payload?.pagination) {
              state.totalPages = action.payload.pagination.totalPages || state.totalPages;
              state.nextPage = action.payload.pagination.hasNextPage ? (state.nextPage ?? 0) + 1 : (state.nextPage ?? 0);
              state.previousPage = action.payload.pagination.hasPrevPage ? (state.previousPage ?? 0) + 1 : (state.previousPage ?? 0);
            }
        },
        playerListFailure: (state) => {
            state.loading = false;
        },
        // create agent reducers
        createAgentRequest: (state, action: PayloadAction<AgentCreationData>) => {
            state.loading = true;
        },
        createAgentSuccess: (state) => {
            state.loading = false;
        },
        createAgentFailure: (state) => {
            state.loading = false;
        }

    }
});
export const { playerListRequest, playerListSuccess, playerListFailure, createAgentRequest, createAgentSuccess, createAgentFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;