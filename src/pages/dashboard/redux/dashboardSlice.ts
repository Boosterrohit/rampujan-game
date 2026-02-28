import { createSlice } from '@reduxjs/toolkit';
import { allDashboardProps } from './types';

const initialState: allDashboardProps = {
    loading: false,
    player: [],
    totalPages: 0,
    nextPage: 0,
    previousPage: 0
}
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers:{
        playerListRequest: (state) => {
            state.loading = true;
        },
        playerListSuccess: (state, action) => {
            state.loading = false;
            state.player = action.payload.players;
            state.totalPages = action.payload.totalPages;
            state.nextPage = action.payload.nextPage;
            state.previousPage = action.payload.previousPage;
        },
        playerListFailure: (state) => {
            state.loading = false;
        }

    }
});
export const { playerListRequest, playerListSuccess, playerListFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;