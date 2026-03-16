import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  fetchPlayersFailure,
  fetchPlayersSuccess,
  fetchAgentsFailure,
  fetchAgentsSuccess,
  depositFailure,
  depositSuccess,
  fetchTransactionsFailure,
  fetchTransactionsSuccess,
  fetchPlayersRequest,
} from './playerSlice';
import {
  getAllPlayers,
  getAgentsList,
  loadWallet,
  getPlayerTransactions,
  getMyAgentPlayers,
} from './api';

function* PlayerMgmtSaga(action: any): Generator {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      assignedAgent,
      role,
    } = action.payload || {};

    let response: any;
    if (role === 'agent') {
      // call agent-specific endpoint
      response = yield call(getMyAgentPlayers, { page, limit, search });
    } else {
      response = yield call(getAllPlayers, { page, limit, search, assignedAgent });
    }

    const responseData = response.data.data || {};
    // Ensure players array is always present
    const players = Array.isArray(responseData.users) 
      ? responseData.users 
      : Array.isArray(responseData.players)
      ? responseData.players
      : Array.isArray(responseData)
      ? responseData
      : [];
    
    yield put(fetchPlayersSuccess({
      players,
      pagination: responseData.pagination || {
        currentPage: 1,
        totalPages: 0,
        totalPlayers: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    }));
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to load players');
    yield put(fetchPlayersFailure());
  }
}

function* AgentsListSaga(): Generator {
  try {
    const response: any = yield call(getAgentsList, { page: 1, limit: 100 });
    const agents = Array.isArray(response.data.data?.users)
      ? response.data.data.users
      : Array.isArray(response.data.data)
      ? response.data.data
      : [];
    yield put(fetchAgentsSuccess(agents));
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to load agents');
    yield put(fetchAgentsFailure());
  }
}

function* DepositSaga(action: any): Generator {
  try {
    const { playerId, amount } = action.payload || {};
    if (!playerId || !amount) {
      throw new Error("Invalid deposit parameters");
    }
    const response: any = yield call(loadWallet, action.payload);
    toast.success('Deposit successful');
    yield put(depositSuccess());

    // replay last query (pagination/search/filter) so UI doesn't reset to defaults
    const lastQuery = yield select((state: any) => state.players.lastQuery || {});
    yield put(fetchPlayersRequest({
      page: lastQuery.page || 1,
      limit: lastQuery.limit || 10,
      search: lastQuery.search || '',
      assignedAgent: lastQuery.assignedAgent,
      role: lastQuery.role,
    }));
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || 'Deposit failed';
    toast.error(msg);
    yield put(depositFailure(msg));
  }
}

function* TransactionSaga(action: any): Generator {
  try {
    const { playerId, role, startDate, endDate } = action.payload;
    const response: any = yield call(getPlayerTransactions, playerId, role, {
      startDate,
      endDate,
    });
    const transactions = Array.isArray(response.data.data)
      ? response.data.data.filter((t: any) => t != null)
      : [];
    yield put(fetchTransactionsSuccess(transactions));
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to load transactions');
    yield put(fetchTransactionsFailure());
  }
}

export { PlayerMgmtSaga, AgentsListSaga, DepositSaga, TransactionSaga };
