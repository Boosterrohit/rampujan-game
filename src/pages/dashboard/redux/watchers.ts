import { takeLatest } from 'redux-saga/effects';
import { playerListRequest } from './dashboardSlice';
import PlayerListSaga from './dashboardSaga';
function* dashboardWatcherSaga(){
    yield takeLatest(playerListRequest.type, PlayerListSaga);
}

export default dashboardWatcherSaga;