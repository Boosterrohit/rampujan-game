import { takeLatest } from 'redux-saga/effects';
import { createAgentRequest, deleteAgentRequest, playerListRequest, updateAgentRequest } from './dashboardSlice';
import { CreateAgentSaga, DeleteAgentSaga, PlayerListSaga, UpdateAgentSaga } from './dashboardSaga';

// player management imports
import {
  deletePlayerRequest,
  fetchPlayerByIdRequest,
  fetchPlayersRequest,
  fetchAgentsRequest,
  depositRequest,
  fetchTransactionsRequest,
  suspendPlayerRequest,
  unsuspendPlayerRequest,
} from './playerSlice';
import {
  PlayerMgmtSaga,
  AgentsListSaga,
  DepositSaga,
  TransactionSaga,
  PlayerDetailsSaga,
  SuspendPlayerSaga,
  UnsuspendPlayerSaga,
  DeletePlayerSaga,
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
    yield takeLatest(fetchPlayerByIdRequest.type, PlayerDetailsSaga);
    yield takeLatest(suspendPlayerRequest.type, SuspendPlayerSaga);
    yield takeLatest(unsuspendPlayerRequest.type, UnsuspendPlayerSaga);
    yield takeLatest(deletePlayerRequest.type, DeletePlayerSaga);
}

export default dashboardWatcherSaga;