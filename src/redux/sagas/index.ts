import { all, fork } from "redux-saga/effects";
import { watchLoadService } from "@/redux/sagas/loadServiceSaga";
import { watchLoadAllServices } from "@/redux/sagas/loadAllServicesSaga";

export default function* rootSaga() {
  yield all([fork(watchLoadAllServices), fork(watchLoadService)]);
}
