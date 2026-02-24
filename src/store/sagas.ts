import {all} from 'redux-saga/effects';
// import authWatcherSaga from '../view/auth/redux/watchers';
// import mapWatcherSaga from '../view/dashboard/map/redux/watchers';
export default function* rootSaga(){
    yield all([
        // authWatcherSaga(),
        // mapWatcherSaga(),
    ]);
}