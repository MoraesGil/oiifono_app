import { all } from "redux-saga/effects";

import sagasSchedules from "./schedules";

export default function* rootSaga() {
  yield all([sagasSchedules()]);
}
