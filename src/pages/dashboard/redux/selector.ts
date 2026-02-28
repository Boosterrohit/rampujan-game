import { RootState } from "@/store/store";

export const dashboardSelector = (state: RootState) => state.dashboard;
export const playerSelector = (state: RootState) => state.players;