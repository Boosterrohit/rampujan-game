import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { createAgent, getPlayers } from './api';
import { createAgentFailure, createAgentSuccess, playerListFailure, playerListRequest, playerListSuccess } from './dashboardSlice';
import { AgentCreationData } from './types';

function* PlayerListSaga(action: {
    type: string;
    payload: {
        page: number;
        limit: number;
        search: string;
    }
}): Generator {
    try{
        const response = yield call(getPlayers, action.payload);
        // const players = response.data;
        yield put(playerListSuccess(response.data.data));
    }catch(error: any) {
        toast.error(error.response.data.message);
        yield put(playerListFailure())
    }
}

function* CreateAgentSaga(action: {
    type: string;
    payload: AgentCreationData;
}): Generator {
    try {
        const response: any = yield call(createAgent as any, action.payload);
        toast.success("Agent created successfully!");
        yield put(createAgentSuccess(response.data));
        yield put(playerListRequest({ page: 1, limit: '10', search: '' }));
        action.payload.onSuccess?.();
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to create agent");
        yield put(createAgentFailure());
    }
}
export  {PlayerListSaga, CreateAgentSaga};