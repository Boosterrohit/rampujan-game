import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { createAgent, deleteAgent, getPlayers, getMyAgentPlayers, updateAgent } from './api';
import { createAgentFailure, createAgentSuccess, deleteAgentFailure, deleteAgentSuccess, playerListFailure, playerListRequest, playerListSuccess, updateAgentFailure, updateAgentSuccess } from './dashboardSlice';
import { AgentCreationData } from './types';

const getApiMessage = (payload: any, fallback: string) => {
    return payload?.data?.message || payload?.message || fallback;
};

function* PlayerListSaga(action: {
    type: string;
    payload: {
        page: number;
        limit: number | string;
        search: string;
        role?: string;
    }
}): Generator {
    try{
        const { role, ...params } = action.payload;
        let response: any;
        
        // If agent, use their own players endpoint; otherwise admin sees all agents-with-players
        if (role === 'agent') {
            response = yield call(getMyAgentPlayers, { 
                page: Number(params.page), 
                limit: Number(params.limit), 
                search: params.search 
            });
            // Transform flat players list into the grouped format for dashboard
            const responseData = response.data.data;
            const playersList = responseData.players || [];
            // Use single "Self" agent entry for agents viewing their own dashboard
            const transformedData = {
                agents: [{
                    agent: { _id: "self", username: 'Your Players', email: '' },
                    players: playersList
                }],
                pagination: responseData.pagination,
            };
            yield put(playerListSuccess(transformedData));
        } else {
            // Admin gets agents with players
            response = yield call(getPlayers, { 
                page: Number(params.page), 
                limit: Number(params.limit), 
                search: params.search 
            });
            yield put(playerListSuccess(response.data.data));
        }
    }catch(error: any) {
        toast.error(error.response?.data?.message || 'Failed to load players');
        yield put(playerListFailure())
    }
}

function* CreateAgentSaga(action: {
    type: string;
    payload: AgentCreationData;
}): Generator {
    try {
        const response: any = yield call(createAgent as any, action.payload);
        toast.success(getApiMessage(response, "Agent created successfully!"));
        yield put(createAgentSuccess(response.data));
        yield put(playerListRequest({ page: 1, limit: '10', search: '' }));
        action.payload.onSuccess?.();
    } catch (error: any) {
        toast.error(getApiMessage(error?.response, "Failed to create agent"));
        yield put(createAgentFailure());
    }
}
// agent delete
function* DeleteAgentSaga(action: {
    type: string;
    payload: string; // agentId
}): Generator {
    try {        const response: any = yield call(deleteAgent, action.payload);
        toast.success(getApiMessage(response, "Agent deleted successfully!"));
        yield put(deleteAgentSuccess(response.data));
        yield put(playerListRequest({ page: 1, limit: '10', search: '' }));
    } catch (error: any) {
        toast.error(getApiMessage(error?.response, "Failed to delete agent"));
        yield put(deleteAgentFailure());
    }
}
// agent update
function* UpdateAgentSaga(action: {
    type: string;
    payload: AgentCreationData;
}): Generator {
    try {
        // payload.agentId must be supplied when editing
        const { agentId, ...data } = action.payload as any;
        const response: any = yield call(updateAgent as any, agentId, data);
        toast.success(getApiMessage(response, "Agent updated successfully!"));
        yield put(updateAgentSuccess(response.data));
        yield put(playerListRequest({ page: 1, limit: '10', search: '' }));
        action.payload.onSuccess?.();
    } catch (error: any) {
        toast.error(getApiMessage(error?.response, "Failed to update agent"));
        yield put(updateAgentFailure());
    }
}
export  {PlayerListSaga, CreateAgentSaga, DeleteAgentSaga, UpdateAgentSaga};