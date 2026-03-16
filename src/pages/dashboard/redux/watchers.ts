import { takeLatest } from 'redux-saga/effects';
import { createAgentRequest, deleteAgentRequest, playerListRequest, updateAgentRequest } from './dashboardSlice';
import { CreateAgentSaga, DeleteAgentSaga, PlayerListSaga, UpdateAgentSaga } from './dashboardSaga';

// player management imports
import {
  fetchPlayersRequest,
  fetchAgentsRequest,
  depositRequest,
  fetchTransactionsRequest,
} from './playerSlice';
import {
  PlayerMgmtSaga,
  AgentsListSaga,
  DepositSaga,
  TransactionSaga,
} from './playerSaga';

function* dashboardWatcherSaga(){
    yield takeLatest(playerListRequest.type, PlayerListSaga);
    yield takeLatest(createAgentRequest.type, CreateAgentSaga);
    yield takeLatest(deleteAgentRequest.type, DeleteAgentSaga);
    yield takeLatest(updateAgentRequest.type, UpdateAgentSaga);

    // player management watchers
    yield takeLatest(fetchPlayersRequest.type, PlayerMgmtSaga);
    yield takeLatest(fetchAgentsRequest.type, AgentsListSaga);
    yield takeLatest(depositRequest.type, DepositSaga);
    yield takeLatest(fetchTransactionsRequest.type, TransactionSaga);
}

export default dashboardWatcherSaga;