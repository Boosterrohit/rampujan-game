import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "../pages/dashboard/redux/dashboardSlice";
import playerReducer from "../pages/dashboard/redux/playerSlice";

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    players: playerReducer,
});
export default rootReducer