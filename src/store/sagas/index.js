import { all } from "redux-saga/effects";

import schedules from "./schedules";

export default function* rootSaga() {
  yield all([schedules]);
}
