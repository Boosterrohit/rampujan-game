import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "../pages/dashboard/redux/dashboardSlice";

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
});
export default rootReducer