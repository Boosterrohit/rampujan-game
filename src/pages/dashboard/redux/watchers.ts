import { takeLatest } from 'redux-saga/effects';
import { createAgentRequest, playerListRequest } from './dashboardSlice';
import { CreateAgentSaga, PlayerListSaga } from './dashboardSaga';
function* dashboardWatcherSaga(){
    yield takeLatest(playerListRequest.type, PlayerListSaga);
    yield takeLatest(createAgentRequest.type, CreateAgentSaga);
}

export default dashboardWatcherSaga;