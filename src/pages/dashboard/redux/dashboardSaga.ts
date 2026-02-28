import { call, put } from 'redux-saga/effects';
import { toast } from "react-toastify";
import { getPlayers } from './api';
import { playerListFailure, playerListSuccess } from './dashboardSlice';

function* PlayerListSaga(action: {
    type: string;
    payload: {
        page: number;
        limit: number;
    }
}): Generator {
    try{
        const response = yield call(getPlayers, action.payload);
        const players = response.data;
        yield put(playerListSuccess(players));
    }catch(error: any) {
        toast.error(error.response.data.message);
        yield put(playerListFailure())
    }
}
export default PlayerListSaga;