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
            state.agentPlayers = action.payload;
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