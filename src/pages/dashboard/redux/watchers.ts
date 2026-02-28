import { takeLatest } from 'redux-saga/effects';
import { createAgentRequest, deleteAgentRequest, playerListRequest, updateAgentRequest } from './dashboardSlice';
import { CreateAgentSaga, DeleteAgentSaga, PlayerListSaga, UpdateAgentSaga } from './dashboardSaga';
function* dashboardWatcherSaga(){
    yield takeLatest(playerListRequest.type, PlayerListSaga);
    yield takeLatest(createAgentRequest.type, CreateAgentSaga);
    yield takeLatest(deleteAgentRequest.type, DeleteAgentSaga);
    yield takeLatest(updateAgentRequest.type, UpdateAgentSaga);
}

export default dashboardWatcherSaga;