import dashboardWatcherSaga from '@/pages/dashboard/redux/watchers';
import {all} from 'redux-saga/effects';
export default function* rootSaga(){
    yield all([
        dashboardWatcherSaga(),
    ]);
}